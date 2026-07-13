#!/usr/bin/env node
/**
 * Redirect / canonical drift detector — env-aware.
 *
 * Compares live HTTP status + <link rel="canonical"> against
 * scripts/seo-baseline.json. Exits 1 on drift so CI can gate deploys.
 *
 * The baseline defines per-environment base URLs. Pick one with --env, or
 * override entirely with a positional URL argument.
 *
 * Usage:
 *   node scripts/seo-diff.mjs                       # defaultEnv
 *   node scripts/seo-diff.mjs --env=staging
 *   node scripts/seo-diff.mjs --env=production
 *   node scripts/seo-diff.mjs https://preview...    # explicit URL override
 *   node scripts/seo-diff.mjs --json
 *   node scripts/seo-diff.mjs --out /tmp/diff.json  # write JSON to file
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const baseline = JSON.parse(readFileSync(resolve(__dirname, "seo-baseline.json"), "utf8"));

const args = process.argv.slice(2);
const jsonOut = args.includes("--json");
const outIdx = args.indexOf("--out");
const outPath = outIdx >= 0 ? args[outIdx + 1] : null;
const envArg = args.find((a) => a.startsWith("--env="))?.split("=")[1]
  ?? (args.includes("--env") ? args[args.indexOf("--env") + 1] : null);
const baseArg = args.find((a) => a.startsWith("http"));

const envName = envArg ?? process.env.SEO_DIFF_ENV ?? baseline.defaultEnv ?? "production";
const envCfg = baseline.environments?.[envName];
if (!baseArg && !envCfg) {
  console.error(`Unknown env "${envName}". Known: ${Object.keys(baseline.environments ?? {}).join(", ")}`);
  process.exit(2);
}
const BASE = (baseArg ?? envCfg.base ?? baseline.base).replace(/\/$/, "");

function expand(v) {
  return typeof v === "string" ? v.replace(/\{\{\s*BASE\s*\}\}/g, BASE) : v;
}

async function check(route, expectedRaw) {
  const expected = { status: expectedRaw.status, canonical: expand(expectedRaw.canonical) };
  const url = `${BASE}${route}`;
  const drift = [];
  let res;
  try {
    res = await fetch(url, {
      redirect: "manual",
      headers: { "user-agent": "beingecom-seo-diff/1.0" },
    });
  } catch (err) {
    return { route, url, drift: [`fetch failed: ${err.message}`], expected };
  }

  const status = res.status;
  const location = res.headers.get("location") ?? undefined;

  if (status !== expected.status) {
    drift.push(
      `status ${status}${location ? ` → ${location}` : ""} · expected ${expected.status}`,
    );
  }

  let canonical;
  if (status === 200) {
    const html = await res.text();
    canonical = /<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']*)["']/i.exec(html)?.[1];
    if (expected.canonical && canonical !== expected.canonical) {
      drift.push(`canonical ${canonical ?? "(missing)"} · expected ${expected.canonical}`);
    }
  }

  return { route, url, status, location, canonical, drift, expected };
}

const results = [];
for (const [route, expected] of Object.entries(baseline.routes)) {
  results.push(await check(route, expected));
}

const failed = results.filter((r) => r.drift.length);
const payload = { env: envName, base: BASE, results, failed: failed.length };

if (outPath) {
  writeFileSync(outPath, JSON.stringify(payload, null, 2));
  console.log(`JSON report → ${outPath}`);
}

if (jsonOut) {
  console.log(JSON.stringify(payload, null, 2));
} else {
  console.log(`\nRedirect/canonical diff — [${envName}] ${BASE}\n${"=".repeat(60)}`);
  if (!failed.length) {
    console.log(`✅ ${results.length} routes match baseline.\n`);
  } else {
    for (const r of failed) {
      console.log(`\n❌ ${r.route}`);
      for (const d of r.drift) console.log(`   • ${d}`);
    }
    console.log(`\n${results.length - failed.length}/${results.length} match · ${failed.length} drifted\n`);
  }
}

process.exit(failed.length ? 1 : 0);
