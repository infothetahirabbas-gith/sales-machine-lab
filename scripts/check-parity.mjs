#!/usr/bin/env node
// Parity guardrail — prevents component drift.
//
// Verifies that:
//  1. Every canonical service in `src/config/services.ts` appears in
//     `Header.tsx` AND `Footer.tsx` (by both URL and label).
//  2. No banned/legacy service string ("Creative Testing",
//     "Conversion Optimization", …) reappears anywhere under src/.
//  3. No `$<digit>` currency literal appears anywhere under src/ outside
//     a small explicit allowlist of files where a `$` prefix is legitimate
//     (regex patterns, US-market copy, chat system prompts, prose blog
//     content, useCountUp doc comment).
//  4. Every `industrySlug` used by a case study exists in the canonical
//     INDUSTRIES list in `src/lib/locations-industries.ts`.
//
// Exits non-zero on any violation — wire into `check:ci` so drift fails
// the build.
//
// Run: `npm run check:parity`

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const rd = (p) => readFileSync(join(ROOT, p), "utf8");

const failures = [];
const pass = (msg) => console.log(`  \x1b[32m✓\x1b[0m ${msg}`);
const fail = (msg) => { failures.push(msg); console.log(`  \x1b[31m✗\x1b[0m ${msg}`); };

// ---------- 1. SERVICES parity across Header + Footer ----------

const servicesSrc = rd("src/config/services.ts");
const serviceRecords = [...servicesSrc.matchAll(/slug:\s*"([^"]+)"[\s\S]*?to:\s*"([^"]+)"[\s\S]*?label:\s*"([^"]+)"/g)]
  .map((m) => ({ slug: m[1], to: m[2], label: m[3] }))
  // The first record is the top-level canonical list; child records also match
  // the regex, but they don't have a `slug:` field before their `to:`. Filter
  // to just those where the match starts on a `slug:` line (top-level).
  .filter((r) => r.slug && r.to.startsWith("/services/"));

const headerSrc = rd("src/components/site/Header.tsx");
const footerSrc = rd("src/components/site/Footer.tsx");

console.log("\n[1] SERVICES parity across Header + Footer");
for (const s of serviceRecords) {
  const inHeader = headerSrc.includes(`"${s.to}"`) && headerSrc.includes(`"${s.label}"`);
  const inFooter = footerSrc.includes(`"${s.to}"`) && footerSrc.includes(`>${s.label}<`);
  if (inHeader && inFooter) pass(`${s.label} — nav + footer`);
  else {
    if (!inHeader) fail(`Header missing "${s.label}" (${s.to})`);
    if (!inFooter) fail(`Footer missing "${s.label}" (${s.to})`);
  }
}

// ---------- 2. Banned legacy service strings ----------

const BANNED = ["Creative Testing", "Conversion Optimization"];

console.log("\n[2] Banned service strings anywhere under src/");
const allSrcFiles = walk(join(ROOT, "src")).filter(
  (p) =>
    (p.endsWith(".ts") || p.endsWith(".tsx")) &&
    !p.endsWith("check-parity.mjs") &&
    !p.includes("routeTree.gen.ts") &&
    !p.includes("/config/services.ts") // banned list lives here
);

let banHits = 0;
for (const file of allSrcFiles) {
  const txt = readFileSync(file, "utf8");
  for (const banned of BANNED) {
    if (txt.includes(banned)) {
      fail(`"${banned}" found in ${file.replace(ROOT, "")}`);
      banHits++;
    }
  }
}
if (banHits === 0) pass("no banned service names in source");

// ---------- 3. Currency literals ($<digit>) ----------

const CURRENCY_ALLOWLIST = new Set([
  "src/hooks/useCountUp.tsx",                             // doc-comment example
  "src/lib/store-audit.functions.ts",                     // regex `[/USD|\$\s?\d/, ...]`
  "src/routes/services.seo.international.tsx",            // US-market copy ("USD + US CRO")
  "src/routes/blog.$slug.tsx",                            // prose: "USD and duties…"
  "src/routes/api.chat.ts",                               // system prompt describing locales
]);

console.log("\n[3] No US-dollar currency literals outside allowlist");
let dollarHits = 0;
for (const file of allSrcFiles) {
  const rel = file.replace(ROOT, "").replace(/^\/+/, "");
  if (CURRENCY_ALLOWLIST.has(rel)) continue;
  const txt = readFileSync(file, "utf8");
  // Match $ immediately followed by a digit (avoids $variable / ${})
  const bad = txt.match(/\$\d/g);
  if (bad) {
    fail(`${rel} contains ${bad.length} `+"`$"+`<digit>` + " occurrence" + (bad.length > 1 ? "s" : ""));
    dollarHits++;
  }
}
if (dollarHits === 0) pass("no unauthorized US-dollar literals");

// ---------- 4. Case-study industrySlug ⊆ INDUSTRIES ----------

console.log("\n[4] Case-study industrySlug ⊆ canonical INDUSTRIES");
const industrySrc = rd("src/lib/locations-industries.ts");
const canonicalSlugs = new Set(
  [...industrySrc.matchAll(/^\s*slug:\s*"([^"]+)"/gm)].map((m) => m[1])
);

const csSrc = rd("src/routes/case-studies.index.tsx");
const usedSlugs = new Set(
  [...csSrc.matchAll(/industrySlug:\s*"([^"]+)"/g)].map((m) => m[1])
);

const missing = [...usedSlugs].filter((s) => !canonicalSlugs.has(s));
if (missing.length === 0)
  pass(`${usedSlugs.size} industry slug${usedSlugs.size === 1 ? "" : "s"} all resolve to INDUSTRIES`);
else missing.forEach((s) => fail(`case-study industrySlug "${s}" is not in INDUSTRIES`));

// ---------- summary ----------

console.log();
if (failures.length === 0) {
  console.log("\x1b[32mparity OK\x1b[0m — nav / footer / services / stats / industries are in sync");
  process.exit(0);
}
console.log(`\x1b[31mparity FAILED\x1b[0m — ${failures.length} violation${failures.length === 1 ? "" : "s"}:`);
failures.forEach((f) => console.log(`  • ${f}`));
process.exit(1);

// ---------- utils ----------

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}
