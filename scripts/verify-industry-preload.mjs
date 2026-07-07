#!/usr/bin/env node
// CI: for every /industries/<slug> route, assert that exactly one
// <link rel="preload" as="image"> exists in <head>, that its href matches the
// hero <img> currentSrc, and that imagesrcset/imagesizes align with the
// rendered <img srcset>/<img sizes>. Fails on missing, duplicate, or drift.
//
// Usage: BASE_URL=http://localhost:8080 node scripts/verify-industry-preload.mjs

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
    const preloads = await page.$$eval(
      'head link[rel="preload"][as="image"]',
      (els) => els.map((e) => ({
        href: e.getAttribute("href"),
        imagesrcset: e.getAttribute("imagesrcset"),
        imagesizes: e.getAttribute("imagesizes"),
        fetchpriority: e.getAttribute("fetchpriority"),
      })),
    );
    if (preloads.length === 0) {
      failures.push(`${slug}: no <link rel=preload as=image> in <head>`);
      continue;
    }
    if (preloads.length > 1) {
      failures.push(`${slug}: ${preloads.length} preload image links (must be exactly 1)`);
      continue;
    }
    const p = preloads[0];
    if (!p.href || !p.imagesrcset || !p.imagesizes) {
      failures.push(`${slug}: preload missing href/imagesrcset/imagesizes`);
      continue;
    }
    if (p.fetchpriority !== "high") {
      failures.push(`${slug}: preload fetchpriority="${p.fetchpriority}" (expected "high")`);
    }
    // Hero <img> — the first <img> whose alt mentions "ecommerce growth".
    const hero = await page.$$eval("img", (els) => {
      const h = els.find((e) => (e.alt || "").toLowerCase().includes("ecommerce growth"));
      return h ? { src: h.getAttribute("src"), srcset: h.getAttribute("srcset"), sizes: h.getAttribute("sizes") } : null;
    });
    if (!hero) {
      failures.push(`${slug}: hero <img> not found in DOM`);
      continue;
    }
    if (hero.src !== p.href) {
      failures.push(`${slug}: preload href does not match hero src (${p.href} vs ${hero.src})`);
    }
    if (hero.srcset !== p.imagesrcset) {
      failures.push(`${slug}: preload imagesrcset does not match hero srcset`);
    }
    if (hero.sizes !== p.imagesizes) {
      failures.push(`${slug}: preload imagesizes does not match hero sizes (${p.imagesizes} vs ${hero.sizes})`);
    }
  } catch (err) {
    failures.push(`${slug}: navigation error → ${err.message}`);
  } finally {
    await page.close();
  }
}
await browser.close();

if (failures.length) {
  console.error(`\n❌ [verify-preload] ${failures.length} failure(s):`);
  for (const f of failures) console.error(`   - ${f}`);
  process.exit(1);
}
console.log(`✅ [verify-preload] hero preload matches hero image on all ${slugs.length} industry pages.`);
