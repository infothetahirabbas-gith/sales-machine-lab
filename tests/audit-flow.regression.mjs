#!/usr/bin/env node
/**
 * Static end-to-end guard for the Store Audit flow.
 *
 * Verifies:
 *  1. The audit form has all 3 dropdowns (revenue, ad spend, country).
 *  2. The country dropdown contains the full international list.
 *  3. The progress UI exposes elapsed/remaining countdown + timeout fallback.
 *  4. The server function uses local analysis and validates its report.
 *  5. Both result charts (Radar + Pie) are rendered when a report is present.
 *  6. Confidence drivers and client export controls are present.
 *
 * Run: node tests/audit-flow.regression.mjs
 */
import { readFileSync } from "node:fs";

const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };

const audit = readFileSync("src/routes/audit.tsx", "utf8");
const fn = readFileSync("src/lib/store-audit.functions.ts", "utf8");

// ---------- Form dropdowns ----------
check(/value={revenue}\s+onChange/.test(audit), "Revenue dropdown is missing");
check(/value={adSpend}\s+onChange/.test(audit), "Ad-spend dropdown is missing");
check(/value={country}\s+onChange/.test(audit), "Country dropdown is missing");

// ---------- Country coverage ----------
const REQUIRED_COUNTRIES = [
  "Global", "United States", "United Kingdom", "Canada", "Australia",
  "Germany", "France", "Spain", "Italy", "Netherlands",
  "UAE", "Saudi Arabia", "India", "Pakistan", "Singapore",
  "Japan", "South Korea", "Mexico", "Brazil", "South Africa",
];
for (const c of REQUIRED_COUNTRIES) {
  check(
    new RegExp(`<option value="${c.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")}"`).test(audit),
    `Country dropdown is missing required option: "${c}"`
  );
}

// ---------- Progress + countdown + timeout ----------
check(/TIMEOUT_SECONDS\s*=\s*9\d/.test(audit), "Audit page must define TIMEOUT_SECONDS (~90s)");
check(/setElapsed\(/.test(audit) && /remaining/.test(audit), "Audit progress must show elapsed + remaining countdown");
check(/data-testid="audit-progress"/.test(audit), "Audit progress panel must expose data-testid='audit-progress' for tests");
check(/timedOut/.test(audit), "Audit page must expose a timedOut fallback branch");
check(/longer than 90 seconds/i.test(audit), "Audit timeout fallback message (>90s) is missing");

// ---------- Charts ----------
check(/<RadarChart\b/.test(audit), "Result Radar chart is missing");
check(/<PieChart\b/.test(audit), "Result Pie chart (issue mix) is missing");
check(/from "recharts"/.test(audit), "recharts import is missing");

// ---------- Free local engine + validation ----------
check(/analyzeHtml\(html, normalized, status\)/.test(fn),
  "Server function must analyze fetched HTML locally");
check(/auditReportSchema\.safeParse\(report\)/.test(fn),
  "Server function must validate the locally generated report");
check(!/generateText|ai\/v1|gemini|openai/i.test(fn),
  "Audit engine must not call paid AI services");

// ---------- Client-side error logging ----------
check(/console\.error\(\"\[audit:client\]/.test(audit),
  "Client must log audit failures with [audit:client] prefix");

// ---------- Confidence + exports ----------
check(/confidenceBreakdown/.test(fn) && /confidenceCategorySchema/.test(fn),
  "Server report must include a validated confidence breakdown");
check(/Recommendation Confidence/.test(audit) && /category\.drivers\.map/.test(audit),
  "Audit UI must render recommendation confidence and signal drivers");
check(/downloadCSV\(report, auditedUrl\)/.test(audit), "CSV export control is missing");
check(/downloadPDF\(report, auditedUrl\)/.test(audit), "PDF export control is missing");
check(!/AI credits exhausted/i.test(audit + fn), "Credit exhaustion message must not remain in audit flow");

if (failures.length) {
  console.error("✗ Audit flow regression check FAILED:\n");
  for (const f of failures) console.error("  • " + f);
  process.exit(1);
}
console.log(`✓ Audit flow regression check passed (${REQUIRED_COUNTRIES.length + 18}+ assertions).`);
