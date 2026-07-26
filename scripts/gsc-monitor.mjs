#!/usr/bin/env node
/**
 * GSC monitoring: inspects the top pages and lists sitemap status.
 *
 * Requires GSC_ACCESS_TOKEN with `https://www.googleapis.com/auth/webmasters`.
 * Run manually every few days for the next 7–14 days, or wire into cron.
 *
 *   GSC_ACCESS_TOKEN=... node scripts/gsc-monitor.mjs
 */
const SITE = "https://beingecom.com/";
const PAGES = [
  "https://beingecom.com/",
  "https://beingecom.com/services",
  "https://beingecom.com/services/seo",
  "https://beingecom.com/services/performance-marketing",
  "https://beingecom.com/case-studies",
  "https://beingecom.com/pricing",
];
const SITEMAPS = [
  "https://beingecom.com/sitemap.xml",
  "https://beingecom.com/sitemap-pages.xml",
  "https://beingecom.com/sitemap-services.xml",
  "https://beingecom.com/sitemap-locations.xml",
  "https://beingecom.com/sitemap-industries.xml",
  "https://beingecom.com/sitemap-case-studies.xml",
];

const token = process.env.GSC_ACCESS_TOKEN;
if (!token) { console.error("Set GSC_ACCESS_TOKEN"); process.exit(1); }
const auth = { Authorization: `Bearer ${token}` };
const enc = encodeURIComponent;

console.log("== Sitemap status ==");
for (const sm of SITEMAPS) {
  const r = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${enc(SITE)}/sitemaps/${enc(sm)}`,
    { headers: auth },
  );
  if (!r.ok) { console.log(`  ${sm}  HTTP ${r.status}`); continue; }
  const j = await r.json();
  const c = (j.contents ?? []).reduce((n, x) => n + Number(x.submitted ?? 0), 0);
  const idx = (j.contents ?? []).reduce((n, x) => n + Number(x.indexed ?? 0), 0);
  console.log(`  ${sm.replace(SITE, "")}  submitted=${c} indexed=${idx} warnings=${j.warnings} errors=${j.errors}`);
}

console.log("\n== URL inspection ==");
let failed = 0;
for (const url of PAGES) {
  const r = await fetch("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
    method: "POST", headers: { ...auth, "Content-Type": "application/json" },
    body: JSON.stringify({ inspectionUrl: url, siteUrl: SITE }),
  });
  if (!r.ok) { console.log(`  ${url}  HTTP ${r.status}`); failed++; continue; }
  const j = (await r.json()).inspectionResult ?? {};
  const s = j.indexStatusResult ?? {};
  const rr = j.richResultsResult?.verdict ?? "—";
  const marker = s.verdict === "PASS" ? "✓" : "✗";
  console.log(`  ${marker} ${url.padEnd(50)} ${s.coverageState ?? "?"} | rich=${rr}`);
  if (s.verdict !== "PASS") failed++;
}
process.exit(failed ? 1 : 0);
