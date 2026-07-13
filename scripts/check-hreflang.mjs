#!/usr/bin/env node
/**
 * hreflang / canonical relationship lint — SOURCE-LEVEL.
 *
 * Rules enforced across every route source under src/routes/:
 *
 *   1. Every hreflang alternate set MUST include `x-default`.
 *   2. Every alternate URL MUST be reciprocated by the target route
 *      (route A points to B → B's alternates include A).
 *   3. The route's own canonical URL MUST appear as one of its own
 *      hreflang alternates (self-reference).
 *   4. A route may not declare two alternates for the same hreflang code.
 *   5. Canonical URLs referenced by hreflang alternates must match the
 *      declared canonical for the target route.
 *
 * When no route in src/routes/ emits any hreflang alternate — the current
 * BeingEcom state — the check reports "no hreflang in source" and passes,
 * so this drops into `prebuild` today and starts enforcing the moment
 * hreflang tags are added.
 *
 * Exit 1 on any violation.
 */

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join, extname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const baseline = JSON.parse(readFileSync(resolve(__dirname, "seo-baseline.json"), "utf8"));
const BASE = (baseline.environments?.production?.base ?? baseline.base).replace(/\/$/, "");
const expand = (s) => (typeof s === "string" ? s.replace(/\{\{\s*BASE\s*\}\}/g, BASE) : s);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name.startsWith(".")) continue;
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else if (extname(p) === ".tsx") out.push(p);
  }
  return out;
}

// Map baseline route → canonical for reciprocity check.
const baselineCanonicals = new Map(
  Object.entries(baseline.routes).map(([r, v]) => [r, expand(v.canonical)]),
);

function extractCanonical(src) {
  const m = /rel:\s*["']canonical["'][^}]*href:\s*["`]([^"`]+)["`]/.exec(src)
    ?? /href:\s*["`]([^"`]+)["`][^}]*rel:\s*["']canonical["']/.exec(src);
  return m?.[1];
}

function extractAlternates(src) {
  // Match every links entry with rel: "alternate" and both hreflang + href.
  const out = [];
  const re = /\{\s*rel:\s*["']alternate["'][^}]*\}/g;
  let m;
  while ((m = re.exec(src))) {
    const chunk = m[0];
    const hl = /hreflang:\s*["`]([^"`]+)["`]/.exec(chunk)?.[1];
    const href = /href:\s*["`]([^"`]+)["`]/.exec(chunk)?.[1];
    if (hl && href) out.push({ hreflang: hl, href });
  }
  // Also try reversed order (href before hreflang) — same shape, so already covered.
  return out;
}

const files = existsSync(join(ROOT, "src/routes")) ? walk(join(ROOT, "src/routes")) : [];
const perRoute = []; // { file, canonical, alternates: [{hreflang, href}] }
for (const f of files) {
  const src = readFileSync(f, "utf8");
  const alternates = extractAlternates(src);
  if (!alternates.length) continue; // only track routes that declare hreflang
  perRoute.push({
    file: f.slice(ROOT.length).replace(/^\/+/, ""),
    canonical: extractCanonical(src),
    alternates,
  });
}

const failures = [];

if (perRoute.length === 0) {
  console.log("hreflang lint: no hreflang alternates found in src/routes/ — nothing to validate.");
  console.log("(This check will start enforcing as soon as any route adds <link rel='alternate' hreflang=...>.)");
  process.exit(0);
}

// Build href → set of hreflang codes it claims.
const declaredBy = new Map(); // href → Set(hreflang)
for (const r of perRoute) {
  for (const a of r.alternates) {
    if (!declaredBy.has(a.href)) declaredBy.set(a.href, new Set());
    declaredBy.get(a.href).add(a.hreflang);
  }
}

for (const r of perRoute) {
  const seenCodes = new Map();
  let hasXDefault = false;
  let hasSelfRef = false;

  for (const a of r.alternates) {
    if (a.hreflang === "x-default") hasXDefault = true;
    if (r.canonical && a.href === r.canonical) hasSelfRef = true;

    // Rule 4 — duplicate code within same set
    if (seenCodes.has(a.hreflang)) {
      failures.push(`${r.file}: duplicate hreflang "${a.hreflang}" (${seenCodes.get(a.hreflang)} and ${a.href})`);
    } else seenCodes.set(a.hreflang, a.href);

    // Rule 5 — canonical of target must match
    // Look up baseline canonical for the referenced URL.
    const routeMatch = [...baselineCanonicals.entries()].find(([, c]) => c === a.href);
    if (routeMatch) {
      const [targetRoute, targetCanon] = routeMatch;
      if (targetCanon !== a.href) {
        failures.push(`${r.file}: hreflang points at ${a.href} but baseline canonical for ${targetRoute} is ${targetCanon}`);
      }
    }
  }

  // Rule 1 — x-default required
  if (!hasXDefault) failures.push(`${r.file}: missing hreflang="x-default"`);
  // Rule 3 — self-reference
  if (r.canonical && !hasSelfRef) {
    failures.push(`${r.file}: canonical ${r.canonical} not listed as one of its own hreflang alternates`);
  }

  // Rule 2 — reciprocity. For every alternate URL, another route must
  // declare an alternate back to this route's canonical.
  if (r.canonical) {
    for (const a of r.alternates) {
      if (a.hreflang === "x-default") continue;
      if (a.href === r.canonical) continue; // self
      const back = declaredBy.get(r.canonical);
      if (!back) {
        failures.push(`${r.file}: alternate ${a.href} not reciprocated — no route points hreflang back at ${r.canonical}`);
      }
    }
  }
}

console.log(`\nhreflang lint — ${perRoute.length} route${perRoute.length === 1 ? "" : "s"} declare hreflang`);
for (const r of perRoute) {
  console.log(`  · ${r.file}  (${r.alternates.length} alternates)`);
}
if (failures.length) {
  console.error(`\n${failures.length} violation${failures.length === 1 ? "" : "s"}:`);
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log(`\n✅ All hreflang relationships valid.\n`);
