#!/usr/bin/env node
/**
 * Source-level canonical lint for P1 pages.
 *
 * The seo-diff.mjs script catches drift AFTER deploy by fetching live HTML.
 * This one catches it BEFORE — during dev/build — by parsing route source
 * files and confirming their <link rel="canonical"> href (declared in the
 * route's head() `links` array) self-references the route path.
 *
 * Baseline lives in scripts/seo-baseline.json (shared with seo-diff).
 *
 * Also blocks route files that declare a hard redirect (loader `redirect()`
 * with permanent/status 301/307) for P1 routes — those should render 200,
 * not redirect.
 *
 * Exit 1 on any mismatch. Wire into `prebuild` so bad canonicals never ship.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const baseline = JSON.parse(readFileSync(resolve(__dirname, "seo-baseline.json"), "utf8"));
const BASE = baseline.base.replace(/\/$/, "");
const ROOT = resolve(__dirname, "..");

const SITE_URL = BASE;

// Map baseline route → source file (dots for slashes, .tsx or .index.tsx).
import { existsSync } from "node:fs";
function routeToFile(route) {
  if (route === "/") return "src/routes/index.tsx";
  const seg = route.replace(/^\//, "").split("/").join(".");
  const flat = `src/routes/${seg}.tsx`;
  const layoutIdx = `src/routes/${seg}.index.tsx`;
  if (existsSync(join(ROOT, layoutIdx))) return layoutIdx;
  return flat;
}

// Resolve `${SITE_URL}` and a local `const URL = ...` template into a
// concrete string for comparison.
function resolveHref(rawHref, src) {
  let out = rawHref.replace(/\$\{\s*SITE_URL\s*\}/g, SITE_URL);
  const urlConst = /const\s+URL\s*=\s*`([^`]+)`/.exec(src);
  if (urlConst) {
    const resolved = urlConst[1].replace(/\$\{\s*SITE_URL\s*\}/g, SITE_URL);
    out = out.replace(/\$\{\s*URL\s*\}/g, resolved);
    if (out === "URL") out = resolved; // bare identifier reference
  }
  return out;
}

const failures = [];
for (const [route, expected] of Object.entries(baseline.routes)) {
  const file = routeToFile(route);
  let src;
  try {
    src = readFileSync(join(ROOT, file), "utf8");
  } catch {
    failures.push(`${route}: source file ${file} not found`);
    continue;
  }

  // Detect loader-level hard redirects (redirect({ to: ..., permanent: true / statusCode: 301|307 }))
  if (/\bredirect\s*\(\s*\{[^}]*(?:permanent\s*:\s*true|statusCode\s*:\s*30[17])/s.test(src)) {
    failures.push(`${route}: source uses loader-level 301/307 redirect but baseline expects HTTP ${expected.status}`);
  }

  // Extract canonical href — supports string literals, template literals, and bare identifier `URL`.
  const rawHrefs = [
    ...src.matchAll(/rel:\s*["']canonical["'][^}]*href:\s*["`]([^"`]+)["`]/g),
    ...src.matchAll(/href:\s*["`]([^"`]+)["`][^}]*rel:\s*["']canonical["']/g),
    ...src.matchAll(/rel:\s*["']canonical["'][^}]*href:\s*(URL)\b/g),
    ...src.matchAll(/href:\s*(URL)\b[^}]*rel:\s*["']canonical["']/g),
  ].map((m) => m[1]);

  const canonicals = rawHrefs.map((h) => resolveHref(h, src));

  if (!canonicals.length) {
    failures.push(`${route}: no <link rel="canonical"> declared in ${file}`);
    continue;
  }

  const expectedHref = expected.canonical;
  const bad = canonicals.filter((h) => h !== expectedHref);
  if (bad.length) {
    failures.push(
      `${route}: canonical drift in ${file} — declares ${bad.join(", ")}, expected ${expectedHref}`,
    );
  }
}

if (failures.length) {
  console.error("Canonical lint FAILED:");
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log(`✓ Canonical lint passed for ${Object.keys(baseline.routes).length} P1 routes.`);
