#!/usr/bin/env node
// CI: run Lighthouse against every /industries/<slug> page and fail the build
// if performance metrics exceed the budgets defined in lighthouse-budgets.json.
//
// Usage: BASE_URL=http://localhost:8080 node scripts/lighthouse-industries.mjs
//   • BASE_URL should point at a production build (`npm run build && npm run preview`).
//   • BUDGET_LCP_MS / BUDGET_CLS / BUDGET_TBT_MS env vars override the defaults.
//   • INDUSTRY_SAMPLE=N runs the first N industries (default: all).

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { chromium } from "@playwright/test";
import lighthouse from "lighthouse";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = process.env.BASE_URL ?? "http://localhost:8080";

const budgets = JSON.parse(
  readFileSync(resolve(__dirname, "./lighthouse-budgets.json"), "utf8"),
);
const LCP_MAX = Number(process.env.BUDGET_LCP_MS ?? budgets.lcpMs);
const CLS_MAX = Number(process.env.BUDGET_CLS ?? budgets.cls);
const TBT_MAX = Number(process.env.BUDGET_TBT_MS ?? budgets.tbtMs);
const PERF_MIN = Number(process.env.BUDGET_PERF_SCORE ?? budgets.perfScore);

const src = readFileSync(resolve(__dirname, "../src/lib/locations-industries.ts"), "utf8");
const industriesBlock = src.split("INDUSTRIES:")[1] ?? "";
let slugs = [...industriesBlock.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]);
const sample = Number(process.env.INDUSTRY_SAMPLE ?? 0);
if (sample > 0) slugs = slugs.slice(0, sample);

const browser = await chromium.launch({
  args: ["--remote-debugging-port=9222"],
});
const port = 9222;

const failures = [];
const rows = [];

for (const slug of slugs) {
  const url = `${BASE_URL}/industries/${slug}`;
  try {
    const runnerResult = await lighthouse(
      url,
      {
        port,
        output: "json",
        logLevel: "error",
        onlyCategories: ["performance"],
        formFactor: "mobile",
        screenEmulation: {
          mobile: true,
          width: 412,
          height: 823,
          deviceScaleFactor: 1.75,
          disabled: false,
        },
        throttling: {
          rttMs: 150,
          throughputKbps: 1638.4,
          cpuSlowdownMultiplier: 4,
          requestLatencyMs: 0,
          downloadThroughputKbps: 0,
          uploadThroughputKbps: 0,
        },
      },
    );
    const lhr = runnerResult.lhr;
    const perfScore = Math.round((lhr.categories.performance.score ?? 0) * 100);
    const lcp = lhr.audits["largest-contentful-paint"].numericValue ?? 0;
    const cls = lhr.audits["cumulative-layout-shift"].numericValue ?? 0;
    const tbt = lhr.audits["total-blocking-time"].numericValue ?? 0;
    rows.push({ slug, perfScore, lcp: Math.round(lcp), cls: cls.toFixed(3), tbt: Math.round(tbt) });

    const local = [];
    if (perfScore < PERF_MIN) local.push(`perfScore ${perfScore} < ${PERF_MIN}`);
    if (lcp > LCP_MAX) local.push(`LCP ${Math.round(lcp)}ms > ${LCP_MAX}ms`);
    if (cls > CLS_MAX) local.push(`CLS ${cls.toFixed(3)} > ${CLS_MAX}`);
    if (tbt > TBT_MAX) local.push(`TBT ${Math.round(tbt)}ms > ${TBT_MAX}ms`);
    if (local.length) failures.push(`${slug}: ${local.join("; ")}`);
  } catch (err) {
    failures.push(`${slug}: lighthouse error → ${err.message}`);
  }
}
await browser.close();

console.table(rows);
console.log(
  `Budgets — perf≥${PERF_MIN}, LCP≤${LCP_MAX}ms, CLS≤${CLS_MAX}, TBT≤${TBT_MAX}ms`,
);

if (failures.length) {
  console.error(`\n❌ [lighthouse] ${failures.length} page(s) over budget:`);
  for (const f of failures) console.error(`   - ${f}`);
  process.exit(1);
}
console.log(`✅ [lighthouse] all ${slugs.length} industry pages within budget.`);
