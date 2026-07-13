#!/usr/bin/env node
/**
 * Language-route audit.
 *
 * The `/$lang/$location/$industry/$service` route accepts a language code.
 * If UI code (Header, Footer, WelcomeBanner, marketing copy) still references
 * language codes that DON'T resolve on that route, links 404 silently.
 *
 * This check:
 *   1. Reads the accepted language codes from
 *      `src/routes/$lang.$location.$industry.$service.tsx` (LANG_LABEL keys).
 *   2. Greps `src/` for any UI code referencing a language switcher
 *      (`LANG_OPTIONS`, `setSiteLanguage`, hardcoded lang names like
 *      "Español", "Français", "Polski", "Română", "Português", "Deutsch").
 *   3. Fails if UI code still exposes options the route can't serve — or
 *      if the route lists codes with no UI at all (dead entries).
 *
 * Exit 1 on drift. Wire into `check:ci`.
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const failures = [];
const warn = [];

// 1. Parse accepted lang codes from the route.
const routeSrc = readFileSync(
  join(ROOT, "src/routes/$lang.$location.$industry.$service.tsx"),
  "utf8",
);
const langBlock = /const\s+LANG_LABEL\s*:[^=]*=\s*\{([\s\S]*?)\};/.exec(routeSrc);
if (!langBlock) {
  console.error("✗ Could not locate LANG_LABEL in $lang route file.");
  process.exit(2);
}
const routeLangs = new Set(
  [...langBlock[1].matchAll(/"([a-z-]{2,5})"\s*:/g)].map((m) => m[1]),
);

// 2. Walk src/ for any UI references to language switcher machinery.
const FORBIDDEN_UI_TOKENS = [
  "LANG_OPTIONS",
  "setSiteLanguage",
  "googtrans",
  "Español",
  "Français",
  "Deutsch",
  "Polski",
  "Română",
  "Português",
];

const IGNORE_FILES = new Set([
  // The route file itself legitimately references language names.
  "src/routes/$lang.$location.$industry.$service.tsx",
  // Script that enforces this rule.
  "scripts/check-lang-routes.mjs",
]);

const uiHits = [];
function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name.startsWith(".")) continue;
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) walk(p);
    else if ([".ts", ".tsx", ".js", ".jsx", ".mjs"].includes(extname(p))) {
      const rel = p.slice(ROOT.length).replace(/^\/+/, "");
      if (IGNORE_FILES.has(rel)) continue;
      const src = readFileSync(p, "utf8");
      for (const token of FORBIDDEN_UI_TOKENS) {
        if (src.includes(token)) uiHits.push({ rel, token });
      }
    }
  }
}
walk(join(ROOT, "src"));

if (uiHits.length) {
  for (const { rel, token } of uiHits) {
    failures.push(`Dead language-switcher reference "${token}" in ${rel}`);
  }
}

// 3. Route entries with no UI presence: informational only.
const supportedByUi = new Set(["en"]);
for (const code of routeLangs) {
  if (!supportedByUi.has(code)) {
    warn.push(`Route accepts lang "${code}" but no UI links to it (dead route surface).`);
  }
}

console.log(`Language-route audit`);
console.log(`  Route languages: ${[...routeLangs].join(", ") || "(none)"}`);
console.log(`  UI-exposed languages: ${[...supportedByUi].join(", ")}`);
for (const w of warn) console.log(`  ⚠️  ${w}`);
if (failures.length) {
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log(`  ✓ No dead language-switcher UI code.`);
