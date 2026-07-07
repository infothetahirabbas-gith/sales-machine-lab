#!/usr/bin/env node
// CI: automated a11y sweep of every /industries/<slug> route.
// Asserts:
//   • every <img> has non-empty alt (or role="presentation"/aria-hidden="true")
//   • every <button> and <a> has an accessible name (text, aria-label, or aria-labelledby)
//   • no interactive element uses aria-hidden="true"
//   • every aria-* attribute value is non-empty
//
// Usage: BASE_URL=http://localhost:8080 node scripts/verify-industry-a11y.mjs

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { chromium } from "@playwright/test";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = process.env.BASE_URL ?? "http://localhost:8080";

const src = readFileSync(resolve(__dirname, "../src/lib/locations-industries.ts"), "utf8");
const industriesBlock = src.split("INDUSTRIES:")[1] ?? "";
const slugs = [...industriesBlock.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]);

const failures = [];
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 1800 } });

for (const slug of slugs) {
  const url = `${BASE_URL}/industries/${slug}`;
  const page = await ctx.newPage();
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });

    const report = await page.evaluate(() => {
      const problems = [];
      const nameOf = (el) => {
        const t = (el.textContent || "").trim();
        return (
          el.getAttribute("aria-label")?.trim() ||
          (el.getAttribute("aria-labelledby") ? "labelledby" : "") ||
          el.getAttribute("title")?.trim() ||
          t ||
          ""
        );
      };
      // Images
      document.querySelectorAll("img").forEach((el, i) => {
        const alt = el.getAttribute("alt");
        const decorative =
          el.getAttribute("role") === "presentation" ||
          el.getAttribute("aria-hidden") === "true";
        if (decorative) return;
        if (alt === null) problems.push(`img#${i} missing alt attribute (src=${el.src.slice(0, 80)})`);
        else if (alt.trim() === "") problems.push(`img#${i} has empty alt but is not marked decorative`);
        else if (alt.length < 4) problems.push(`img#${i} alt too short: "${alt}"`);
      });
      // Buttons & links
      document.querySelectorAll("button, a[href]").forEach((el, i) => {
        const tag = el.tagName.toLowerCase();
        if (el.getAttribute("aria-hidden") === "true") {
          problems.push(`${tag}#${i} is interactive but has aria-hidden="true"`);
        }
        if (!nameOf(el)) {
          problems.push(`${tag}#${i} has no accessible name (empty text + no aria-label/labelledby/title)`);
        }
      });
      // Empty aria-* attributes
      document.querySelectorAll("*").forEach((el, i) => {
        for (const attr of el.attributes) {
          if (attr.name.startsWith("aria-") && attr.value.trim() === "" && attr.name !== "aria-hidden") {
            problems.push(`${el.tagName.toLowerCase()}#${i} has empty ${attr.name}`);
          }
        }
      });
      return problems;
    });

    if (report.length) {
      failures.push(`${slug}: ${report.length} a11y issue(s)\n     ${report.slice(0, 10).map((r) => "· " + r).join("\n     ")}`);
    }
  } catch (err) {
    failures.push(`${slug}: navigation error → ${err.message}`);
  } finally {
    await page.close();
  }
}
await browser.close();

if (failures.length) {
  console.error(`\n❌ [verify-a11y] ${failures.length} page(s) failed a11y assertions:`);
  for (const f of failures) console.error(`   - ${f}`);
  process.exit(1);
}
console.log(`✅ [verify-a11y] alt text + accessible names OK on all ${slugs.length} industry pages.`);
