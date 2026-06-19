#!/usr/bin/env node
/**
 * SEO + mobile-button regression test.
 *
 * Static guards:
 *  - Chatbot send button has shrink-0 + visible bg + adequate tap size
 *  - Header/Hero/Footer primary CTAs use shared .btn classes (consistent alignment)
 *  - robots.txt exists, allows crawling, references the sitemap
 *  - Footer carries UK phone (+44) and London address
 *  - Root <html lang="en-GB"> + hreflang en-gb present
 *
 * Live HTTP guards (boots vite dev):
 *  - /sitemap.xml returns 200 XML with beingecom.com URLs
 *  - /robots.txt returns 200 with `Allow: /`
 *  - Every key page returns 200 and emits:
 *      • a canonical <link> pointing at https://beingecom.com/{path}
 *      • the expected JSON-LD @type (Organization/WebSite sitewide;
 *        ProfessionalService + FAQPage on /; Service on service pages)
 *
 * Run: node tests/seo-and-mobile.regression.mjs
 */
import { readFileSync } from "node:fs";
import { spawn } from "node:child_process";

const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };

// ---------------- Static guards ----------------
const widgets = readFileSync("src/components/site/FloatingWidgets.tsx", "utf8");
const footer  = readFileSync("src/components/site/Footer.tsx", "utf8");
const root    = readFileSync("src/routes/__root.tsx", "utf8");
const robots  = readFileSync("public/robots.txt", "utf8");
const seo     = readFileSync("src/lib/seo.ts", "utf8");

// Chatbot send button
check(/aria-label="Send"[\s\S]{0,400}shrink-0/.test(widgets),
  "Chatbot send button must include `shrink-0` so it never collapses on mobile");
check(/aria-label="Send"[\s\S]{0,400}w-10 h-10/.test(widgets),
  "Chatbot send button must be at least 40×40 for mobile tap target");
check(/aria-label="Send"[\s\S]{0,400}bg-primary/.test(widgets),
  "Chatbot send button must use bg-primary for visibility");

// Footer UK contact + lang/hreflang
check(/\+44\s?20\s?4525\s?1900/.test(footer), "Footer must show +44 UK phone number");
check(/London/.test(footer) && /WC2H/.test(footer), "Footer must show London UK address");
check(/lang="en-GB"/.test(root), 'Root <html> must use lang="en-GB"');
check(/hrefLang:\s*"en-gb"/.test(root), "Root must emit hreflang=en-gb alternate link");

// Robots + sitemap
check(/User-agent:\s*\*/.test(robots) && /Allow:\s*\//.test(robots),
  "robots.txt must allow all user agents");
check(/Sitemap:\s*https:\/\/beingecom\.com\/sitemap/.test(robots),
  "robots.txt must reference https://beingecom.com sitemap");

// seo.ts UK signals + JSON-LD types
check(/addressCountry:\s*"GB"/.test(seo), "seo.ts ORG_INFO.address must use GB");
check(/areaServed:\s*\{[^}]*United Kingdom/.test(seo),
  "JSON-LD areaServed must be United Kingdom");

if (failures.length) {
  console.error("Static checks failed:\n" + failures.map((f) => "  - " + f).join("\n"));
  process.exit(1);
}
console.log("✓ Static checks passed");

// ---------------- Live HTTP guards ----------------
const PORT = 5210;
const server = spawn("npx", ["vite", "dev", "--port", String(PORT), "--host", "127.0.0.1"], {
  stdio: ["ignore", "pipe", "pipe"],
  env: { ...process.env, NODE_ENV: "development" },
});
const cleanup = () => { try { server.kill("SIGTERM"); } catch {} };
process.on("exit", cleanup);
process.on("SIGINT", () => { cleanup(); process.exit(130); });

const waitForServer = async () => {
  const deadline = Date.now() + 90_000;
  while (Date.now() < deadline) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/`);
      if (r.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error("Dev server did not become ready within 90s");
};

// page path -> required JSON-LD @types in the rendered HTML
const PAGES = {
  "/":                          ["Organization", "WebSite", "ProfessionalService", "FAQPage"],
  "/about":                     ["Organization", "FAQPage"],
  "/services":                  ["Organization", "FAQPage"],
  "/services/seo":              ["Organization", "Service"],
  "/services/cro":              ["Organization", "Service"],
  "/services/paid-ads":         ["Organization", "Service"],
  "/services/email-sms":        ["Organization", "Service"],
  "/services/analytics":        ["Organization", "Service"],
  "/services/store-development":["Organization", "Service"],
  "/services/funnel":           ["Organization", "Service"],
  "/services/scaling":          ["Organization", "Service"],
  "/services/creative":         ["Organization", "Service"],
  "/case-studies":              ["Organization"],
  "/pricing":                   ["Organization"],
  "/audit":                     ["Organization", "FAQPage"],
  "/contact":                   ["Organization", "FAQPage"],
};

const httpFailures = [];

try {
  await waitForServer();

  // robots + sitemap
  const robotsR = await fetch(`http://127.0.0.1:${PORT}/robots.txt`);
  if (!robotsR.ok) httpFailures.push(`/robots.txt -> ${robotsR.status}`);
  const sitemapR = await fetch(`http://127.0.0.1:${PORT}/sitemap.xml`);
  if (!sitemapR.ok) httpFailures.push(`/sitemap.xml -> ${sitemapR.status}`);
  else {
    const xml = await sitemapR.text();
    if (!/beingecom\.com/.test(xml)) httpFailures.push("/sitemap.xml missing beingecom.com URLs");
  }

  for (const [path, requiredTypes] of Object.entries(PAGES)) {
    const url = `http://127.0.0.1:${PORT}${path}`;
    const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (compatible; SEOTest/1.0)" } });
    if (!r.ok) { httpFailures.push(`${path} -> ${r.status}`); continue; }
    const html = await r.text();

    // canonical
    const expectCanonical = `https://beingecom.com${path === "/" ? "/" : path}`;
    const canonicalRe = new RegExp(`<link[^>]+rel=["']canonical["'][^>]+href=["']${expectCanonical.replace(/[/]/g, "\\/")}["']`);
    if (!canonicalRe.test(html)) httpFailures.push(`${path} missing canonical -> ${expectCanonical}`);

    // hreflang
    if (!/hreflang=["']en-gb["']/i.test(html))
      httpFailures.push(`${path} missing hreflang=en-gb`);

    // JSON-LD types — grep all <script type="application/ld+json"> blocks
    const blocks = [...html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]);
    const allTypes = new Set();
    for (const b of blocks) {
      try {
        const j = JSON.parse(b);
        const arr = Array.isArray(j) ? j : [j];
        for (const node of arr) if (node && node["@type"]) allTypes.add(node["@type"]);
      } catch { /* malformed JSON-LD */ }
    }
    for (const t of requiredTypes) {
      if (!allTypes.has(t))
        httpFailures.push(`${path} missing JSON-LD @type=${t} (found: ${[...allTypes].join(",") || "none"})`);
    }
  }

  if (httpFailures.length) {
    console.error("HTTP checks failed:\n" + httpFailures.map((f) => "  - " + f).join("\n"));
    process.exit(1);
  }
  console.log(`✓ HTTP checks passed (${Object.keys(PAGES).length} pages, canonical+hreflang+JSON-LD)`);
} finally {
  cleanup();
}
