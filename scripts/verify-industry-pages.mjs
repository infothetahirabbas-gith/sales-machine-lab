#!/usr/bin/env node
// CI step: render every /industries/<slug> page in a real browser and confirm
// each expected image element exists and resolves to a valid, non-fallback src.
//
// Usage:
//   BASE_URL=http://localhost:8080 node scripts/verify-industry-pages.mjs
//
// Defaults BASE_URL to http://localhost:8080 (vite dev). In CI, run this after
// `npm run build && npm run preview &` and wait for the port.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { chromium } from "@playwright/test";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = process.env.BASE_URL ?? "http://localhost:8080";

// Extract industry slugs from the source of truth.
const src = readFileSync(
  resolve(__dirname, "../src/lib/locations-industries.ts"),
  "utf8",
);
const industriesBlock = src.split("INDUSTRIES:")[1] ?? "";
const slugs = [...industriesBlock.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map(
  (m) => m[1],
);
if (slugs.length === 0) {
  console.error("[verify-industries] no industry slugs found — aborting.");
  process.exit(1);
}

// Sections we require an <img> for on every industry page.
const REQUIRED_ALT_KEYWORDS = [
  "ecommerce growth", // hero
  "shopper research", // buyers
  "growth engine process", // process
  "creative studio", // creative
  "tech stack", // tech
  "case study", // caseStudy
];

const FALLBACK_PREFIX = "data:image/svg+xml";

const failures = [];
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 1800 } });

for (const slug of slugs) {
  const url = `${BASE_URL}/industries/${slug}`;
  const page = await ctx.newPage();
  const badReqs = [];
  page.on("response", (res) => {
    if (res.url().includes("images.unsplash.com") && res.status() >= 400) {
      badReqs.push(`${res.status()} ${res.url()}`);
    }
  });
  try {
    const resp = await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
    if (!resp || !resp.ok()) {
      failures.push(`${slug}: page returned ${resp?.status() ?? "no response"}`);
      await page.close();
      continue;
    }
    const imgs = await page.$$eval("img", (els) =>
      els.map((e) => ({ src: e.currentSrc || e.src, alt: e.alt, w: e.naturalWidth })),
    );
    const missingAlts = REQUIRED_ALT_KEYWORDS.filter(
      (kw) => !imgs.some((i) => i.alt.toLowerCase().includes(kw)),
    );
    if (missingAlts.length) {
      failures.push(`${slug}: missing image section(s) → ${missingAlts.join(", ")}`);
    }
    const brokenSrcs = imgs.filter(
      (i) =>
        !i.src ||
        i.src.startsWith(FALLBACK_PREFIX) ||
        (i.src.includes("images.unsplash.com") && i.w === 0),
    );
    if (brokenSrcs.length) {
      failures.push(
        `${slug}: ${brokenSrcs.length} image(s) fell back or failed to load (alt: ${brokenSrcs.map((b) => b.alt || "∅").join(" | ")})`,
      );
    }
    if (badReqs.length) {
      failures.push(`${slug}: image HTTP errors → ${badReqs.slice(0, 3).join("; ")}`);
    }
  } catch (err) {
    failures.push(`${slug}: navigation error → ${err.message}`);
  } finally {
    await page.close();
  }
}
await browser.close();

if (failures.length) {
  console.error(`\n❌ [verify-industries] ${failures.length} failure(s):`);
  for (const f of failures) console.error(`   - ${f}`);
  process.exit(1);
}
console.log(`✅ [verify-industries] ${slugs.length} industry page(s) rendered with all required images loaded.`);
