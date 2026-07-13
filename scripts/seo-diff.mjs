#!/usr/bin/env node
/**
 * Redirect / canonical drift detector.
 *
 * Compares live HTTP status + <link rel="canonical"> against
 * scripts/seo-baseline.json. Exits 1 on any drift so CI can gate deploys.
 *
 * Usage:
 *   node scripts/seo-diff.mjs                    # against baseline.base
 *   node scripts/seo-diff.mjs https://preview... # override base
 *   node scripts/seo-diff.mjs --json
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const baseline = JSON.parse(readFileSync(resolve(__dirname, "seo-baseline.json"), "utf8"));

const args = process.argv.slice(2);
const jsonOut = args.includes("--json");
const baseArg = args.find((a) => a.startsWith("http"));
const BASE = (baseArg ?? baseline.base).replace(/\/$/, "");

async function check(route, expected) {
  const url = `${BASE}${route}`;
  const drift = [];
  let res;
  try {
    res = await fetch(url, {
      redirect: "manual",
      headers: { "user-agent": "beingecom-seo-diff/1.0" },
    });
  } catch (err) {
    return { route, url, drift: [`fetch failed: ${err.message}`] };
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

  return { route, url, status, location, canonical, drift };
}

const results = [];
for (const [route, expected] of Object.entries(baseline.routes)) {
  results.push(await check(route, expected));
}

const failed = results.filter((r) => r.drift.length);

if (jsonOut) {
  console.log(JSON.stringify({ base: BASE, results, failed: failed.length }, null, 2));
} else {
  console.log(`\nRedirect/canonical diff — ${BASE}\n${"=".repeat(60)}`);
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
