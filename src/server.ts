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

export const CONSOLIDATED_REDIRECTS: Record<string, string> = {
  "/ecommerce-marketing-agency-uk": "/",
  "/ecommerce-growth-agency-uk": "/",
  "/ecommerce-seo-pricing": "/pricing",
  "/shopify-seo-packages": "/shopify-seo-agency-uk",
  "/enterprise-ecommerce-seo": "/services/seo",
  "/ecommerce-seo-consultant": "/services/seo",
  "/compare/shopify-vs-woocommerce": "/blog/shopify-vs-woocommerce-uk",
  "/agency-vs-inhouse-seo": "/compare/in-house-vs-agency",
  "/author/tahir-abbas": "/about/tahir-abbas",
  "/company/founder": "/about/tahir-abbas",
  "/founder": "/about/tahir-abbas",
  "/company/methodology": "/methodology",
};

function canonicalRedirect(request: Request): Response | null {
  const url = new URL(request.url);
  const host = url.hostname.toLowerCase();
  const legacyPublishHost = ["sales-machine-lab", "lovable", "app"].join(".");
  const shouldCanonicalizeHost = host === "www.beingecom.com" || host === legacyPublishHost;
  const shouldNormalizePath = shouldCanonicalizeHost || host === "beingecom.com";
  const isPagePath = !/\.[a-z0-9]{2,8}$/i.test(url.pathname);
  let changed = false;

  if (shouldCanonicalizeHost) {
    url.protocol = "https:";
    url.hostname = "beingecom.com";
    changed = true;
  }

  if (shouldNormalizePath && isPagePath && url.pathname.length > 1 && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.replace(/\/+$/, "");
    changed = true;
  }

  if (shouldNormalizePath && isPagePath && /[A-Z]/.test(url.pathname)) {
    url.pathname = url.pathname.toLowerCase();
    changed = true;
  }

  // SEO audit 2026-10-16: one URL per search intent. Duplicates 301 to the owner.
  const consolidated = CONSOLIDATED_REDIRECTS[url.pathname.toLowerCase().replace(/\/+$/, "")];
  if (isPagePath && consolidated) {
    url.protocol = "https:";
    url.hostname = shouldCanonicalizeHost || host === "beingecom.com" ? "beingecom.com" : url.hostname;
    url.pathname = consolidated;
    changed = true;
  }

  if (!changed) return null;
  return new Response(null, { status: 301, headers: { location: url.toString() } });
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
      const redirect = canonicalRedirect(request);
      if (redirect) return redirect;
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
  // Vite emits hashed filenames like `styles-BO_2nt2C.css` / `index-Qfyts7iA.js`
  // under `/assets/`. Hashes use base64url characters (A-Z, a-z, 0-9, _, -), so a
  // simple lowercase-hex check misses them and drops assets down to the default
  // short TTL. Cache everything under `/assets/` immutably; the hash in the
  // filename guarantees safe long-term caching.
  const isHashedAsset =
    /^\/assets\/.+\.(?:js|mjs|css|woff2?|ttf|otf|png|jpg|jpeg|webp|avif|svg|gif|ico)$/i.test(pathname) ||
    /\.[0-9A-Za-z_-]{8,}\.(?:js|mjs|css|woff2?|ttf|otf|png|jpg|jpeg|webp|avif|svg|gif|ico)$/i.test(pathname);
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
