import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => ((m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry)),
    );
  }
  return serverEntryPromise;
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isCatastrophicSsrErrorBody(body: string, responseStatus: number): boolean {
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }

  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }

  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }

  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} - try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalized = await normalizeCatastrophicSsrResponse(response);
      return withCacheHeaders(request, normalized);
    } catch (error) {
      console.error(error);
      return brandedErrorResponse();
    }
  },
};

// Add sensible cache headers so refreshes are cheap:
// - HTML: revalidate every time (must-revalidate) but allow conditional GET
// - hashed JS/CSS/font/img assets: immutable, cached for a year
function withCacheHeaders(request: Request, response: Response): Response {
  // Never override explicit Cache-Control set by a handler.
  if (response.headers.has("cache-control")) return response;
  const url = new URL(request.url);
  const pathname = url.pathname;
  const contentType = response.headers.get("content-type") ?? "";
  const isHashedAsset = /\.[0-9a-f]{8,}\.(?:js|css|woff2?|ttf|otf|png|jpg|jpeg|webp|avif|svg|gif|ico)$/i.test(pathname);
  const isHtml = contentType.includes("text/html");
  const headers = new Headers(response.headers);
  if (isHashedAsset) {
    headers.set("cache-control", "public, max-age=31536000, immutable");
  } else if (isHtml) {
    // Serve HTML from browser + CDN cache instantly on refresh, then
    // revalidate in the background. Turns F5 into a near-instant paint
    // instead of a full network round-trip.
    headers.set(
      "cache-control",
      "public, max-age=60, s-maxage=300, stale-while-revalidate=86400",
    );
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
