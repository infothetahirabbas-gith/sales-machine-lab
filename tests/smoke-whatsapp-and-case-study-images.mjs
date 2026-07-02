#!/usr/bin/env node
/**
 * Smoke tests:
 *  1. Floating WhatsApp button links to wa.me/447882743592 and opens externally.
 *  2. Case studies index + a sample detail page load all <img> resources with no 404s.
 *
 * Run: node tests/smoke-whatsapp-and-case-study-images.mjs
 * Requires the dev server running on http://localhost:8080.
 */
import { chromium } from "playwright";

const BASE = process.env.BASE_URL || "http://localhost:8080";
const failures = [];
const fail = (msg) => { failures.push(msg); console.error("✗", msg); };
const pass = (msg) => console.log("✓", msg);

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();

// Track failed image requests across all navigations.
const badImages = [];
page.on("response", (res) => {
  const req = res.request();
  if (req.resourceType() === "image" && res.status() >= 400) {
    badImages.push({ url: res.url(), status: res.status(), on: page.url() });
  }
});

// ---- 1. WhatsApp button ----
await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
const wa = page.locator('a[aria-label="Chat with BeingEcom on WhatsApp"]');
if (!(await wa.count())) fail("WhatsApp floating button not found on homepage");
else {
  const href = await wa.first().getAttribute("href");
  const target = await wa.first().getAttribute("target");
  const rel = await wa.first().getAttribute("rel");
  if (!href || !/^https:\/\/wa\.me\/447882743592(\?|$)/.test(href))
    fail(`WhatsApp href wrong: ${href}`);
  else pass(`WhatsApp href → ${href}`);
  if (target !== "_blank") fail(`WhatsApp target should be _blank, got ${target}`);
  else pass("WhatsApp opens in new tab");
  if (!rel || !rel.includes("noopener")) fail(`WhatsApp rel missing noopener: ${rel}`);
  else pass("WhatsApp rel includes noopener");

  // Verify wa.me actually resolves (HEAD, follow redirects).
  try {
    const r = await fetch(href, { method: "GET", redirect: "follow" });
    if (r.status >= 400) fail(`wa.me returned ${r.status}`);
    else pass(`wa.me reachable (${r.status})`);
  } catch (e) {
    fail(`wa.me fetch failed: ${e.message}`);
  }
}

// ---- 2. Case studies images ----
await page.goto(`${BASE}/case-studies`, { waitUntil: "networkidle" });

// Scroll to force lazy images to load.
await page.evaluate(async () => {
  await new Promise((resolve) => {
    let y = 0;
    const step = () => {
      window.scrollTo(0, (y += 400));
      if (y < document.body.scrollHeight) setTimeout(step, 60);
      else { window.scrollTo(0, 0); setTimeout(resolve, 400); }
    };
    step();
  });
});
await page.waitForLoadState("networkidle").catch(() => {});

const imgCount = await page.locator("img").count();
if (imgCount === 0) fail("Case studies index has no <img> elements");
else pass(`Case studies index rendered ${imgCount} images`);

// Also check one detail page (first card link).
const firstDetail = await page.locator('a[href^="/case-studies/"]').first().getAttribute("href");
if (firstDetail && firstDetail !== "/case-studies") {
  await page.goto(`${BASE}${firstDetail}`, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    await new Promise((r) => { window.scrollTo(0, document.body.scrollHeight); setTimeout(r, 600); });
  });
  const detailImgs = await page.locator("img").count();
  pass(`Detail ${firstDetail} rendered ${detailImgs} images`);
}

if (badImages.length) {
  for (const b of badImages) fail(`Image ${b.status}: ${b.url} (on ${b.on})`);
} else {
  pass("No image 404s across visited case study pages");
}

await browser.close();

if (failures.length) {
  console.error(`\n${failures.length} failure(s)`);
  process.exit(1);
}
console.log("\nAll smoke checks passed");
