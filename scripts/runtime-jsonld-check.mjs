#!/usr/bin/env node
/**
 * Post-deploy runtime JSON-LD checker.
 *
 * Fetches each P1 route from the live site and parses every
 * <script type="application/ld+json"> block. FAILS CI **only** on parse
 * errors (invalid JSON, unterminated script) — missing @type or schema
 * shape issues are reported as warnings and do not fail. Source-level
 * validate-structured-data.mjs already handles shape.
 *
 * Usage:
 *   node scripts/runtime-jsonld-check.mjs                      # defaultEnv
 *   node scripts/runtime-jsonld-check.mjs --env=production
 *   node scripts/runtime-jsonld-check.mjs --out /tmp/jsonld.json
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const baseline = JSON.parse(readFileSync(resolve(__dirname, "seo-baseline.json"), "utf8"));

const args = process.argv.slice(2);
const envArg = args.find((a) => a.startsWith("--env="))?.split("=")[1]
  ?? process.env.SEO_DIFF_ENV ?? baseline.defaultEnv ?? "production";
const outIdx = args.indexOf("--out");
const outPath = outIdx >= 0 ? args[outIdx + 1] : null;

const envCfg = baseline.environments?.[envArg];
if (!envCfg) { console.error(`Unknown env "${envArg}"`); process.exit(2); }
const BASE = envCfg.base.replace(/\/$/, "");

const LD_RE = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

async function check(route) {
  const url = `${BASE}${route}`;
  const parseErrors = [];
  const warnings = [];
  const blocks = [];
  let res;
  try {
    res = await fetch(url, { headers: { "user-agent": "beingecom-jsonld-runtime/1.0" } });
  } catch (err) {
    return { route, url, parseErrors: [`fetch: ${err.message}`], warnings, blocks: 0 };
  }
  if (!res.ok) {
    warnings.push(`http ${res.status}`);
    return { route, url, parseErrors, warnings, blocks: 0 };
  }
  const html = await res.text();
  let m; let idx = 0;
  while ((m = LD_RE.exec(html))) {
    idx++;
    const raw = m[1].trim();
    if (!raw) { warnings.push(`block #${idx}: empty`); continue; }
    try {
      const parsed = JSON.parse(raw);
      const items = Array.isArray(parsed) ? parsed : [parsed];
      for (const it of items) {
        if (!it || typeof it !== "object") { warnings.push(`block #${idx}: not an object`); continue; }
        if (!it["@type"]) warnings.push(`block #${idx}: missing @type`);
      }
      blocks.push({ index: idx, types: items.map((i) => i?.["@type"] ?? "?") });
    } catch (err) {
      parseErrors.push(`block #${idx}: ${err.message}`);
    }
  }
  return { route, url, parseErrors, warnings, blocks: blocks.length, types: blocks };
}

const results = [];
for (const route of Object.keys(baseline.routes)) results.push(await check(route));

const parseFailed = results.filter((r) => r.parseErrors.length);
const warned = results.filter((r) => r.warnings.length);

console.log(`\nRuntime JSON-LD check — [${envArg}] ${BASE}\n${"=".repeat(60)}`);
for (const r of results) {
  const flag = r.parseErrors.length ? "❌" : r.warnings.length ? "⚠️ " : "✅";
  console.log(`${flag} ${r.route} — ${r.blocks} block${r.blocks === 1 ? "" : "s"}`);
  for (const e of r.parseErrors) console.log(`     ERROR ${e}`);
  for (const w of r.warnings) console.log(`     warn  ${w}`);
}
console.log(`\n${results.length - parseFailed.length}/${results.length} parse-clean · ${warned.length} with warnings\n`);

if (outPath) {
  writeFileSync(outPath, JSON.stringify({ env: envArg, base: BASE, results }, null, 2));
  console.log(`JSON → ${outPath}`);
}

process.exit(parseFailed.length ? 1 : 0);
