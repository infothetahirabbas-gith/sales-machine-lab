#!/usr/bin/env node
// Accessibility sweep — runs axe-core against 8 key routes at mobile + desktop
// viewports. Prints violation counts; exits non-zero on any critical/serious.
//
// Uses Playwright (bundled Chromium via PLAYWRIGHT_BROWSERS_PATH) and pulls
// axe-core off the JSDelivr CDN inside the page context — no extra install.
//
// Run: `npm run check:a11y-sweep`
// Pre-req: dev server on http://localhost:8080 (start with `npm run dev`).

import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:8080";
const AXE_CDN = "https://cdn.jsdelivr.net/npm/axe-core@4.10.2/axe.min.js";

const ROUTES = [
  "/",
  "/services",
  "/services/seo",
  "/services/cro",
  "/case-studies",
  "/case-studies/a1",
  "/industries/fashion-apparel",
  "/contact",
];

const VIEWPORTS = [
  { name: "mobile", width: 375, height: 812 },
  { name: "desktop", width: 1280, height: 1800 },
];

const results = [];

const browser = await chromium.launch({ headless: true });
try {
  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    for (const route of ROUTES) {
      const page = await context.newPage();
      const url = `${BASE}${route}`;
      try {
        await page.goto(url, { waitUntil: "networkidle", timeout: 30_000 });
        await page.addScriptTag({ url: AXE_CDN });
        const report = await page.evaluate(async () => {
          // eslint-disable-next-line no-undef
          return await axe.run(document, { resultTypes: ["violations"] });
        });
        const bySeverity = { critical: 0, serious: 0, moderate: 0, minor: 0 };
        for (const v of report.violations) bySeverity[v.impact ?? "minor"]++;
        results.push({ vp: vp.name, route, ok: report.violations.length === 0, bySeverity, violations: report.violations });
      } catch (err) {
        results.push({ vp: vp.name, route, ok: false, error: String(err.message || err) });
      } finally {
        await page.close();
      }
    }
    await context.close();
  }
} finally {
  await browser.close();
}

console.log("\nAccessibility sweep results\n");
console.log("VP       Route                                     C  S  M  m");
console.log("-------  ----------------------------------------  -  -  -  -");
let hardFail = 0;
for (const r of results) {
  if (r.error) {
    console.log(`${r.vp.padEnd(7)} ${r.route.padEnd(41)} ERR ${r.error}`);
    hardFail++;
    continue;
  }
  const { critical, serious, moderate, minor } = r.bySeverity;
  const line = `${r.vp.padEnd(7)} ${r.route.padEnd(41)} ${String(critical).padStart(2)} ${String(serious).padStart(2)} ${String(moderate).padStart(2)} ${String(minor).padStart(2)}`;
  console.log((critical + serious) > 0 ? `\x1b[31m${line}\x1b[0m` : line);
  if (critical + serious > 0) {
    r.violations
      .filter((v) => v.impact === "critical" || v.impact === "serious")
      .forEach((v) => console.log(`         • [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} node${v.nodes.length === 1 ? "" : "s"})`));
    hardFail++;
  }
}
console.log();
if (hardFail === 0) {
  console.log("\x1b[32ma11y sweep OK\x1b[0m — no critical or serious violations");
  process.exit(0);
}
console.log(`\x1b[31ma11y sweep FAILED\x1b[0m — ${hardFail} route/viewport pair${hardFail === 1 ? "" : "s"} with critical or serious violations`);
process.exit(1);
