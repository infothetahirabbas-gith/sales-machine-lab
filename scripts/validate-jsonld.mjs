#!/usr/bin/env node
/**
 * JSON-LD + Rich Results validation for every key BeingEcom route.
 *
 * What it does:
 *   1. Boots `vite dev` (or hits BASE_URL if set, e.g. the live site after deploy).
 *   2. For each route, asserts the page emits the JSON-LD @types it should
 *      (Organization / WebSite / ProfessionalService / Service / FAQPage /
 *      BreadcrumbList) AND that each block satisfies Google's Rich Results
 *      required-field expectations:
 *        Organization        → @context, @type, name, url, logo
 *        Service             → @context, @type, name, provider.name, areaServed
 *        FAQPage             → @context, @type, mainEntity[≥1] each with
 *                              name + acceptedAnswer.text
 *        Article             → @context, @type, headline, image, datePublished,
 *                              author.name, publisher.name + publisher.logo.url
 *        BreadcrumbList      → @context, @type, itemListElement[≥2] with
 *                              position + name + item
 *
 *   3. Prints a per-page report and exits non-zero on any failure so it
 *      drops cleanly into CI after deploy.
 *
 * Run locally:           node scripts/validate-jsonld.mjs
 * Run against prod:      BASE_URL=https://beingecom.com node scripts/validate-jsonld.mjs
 */
import { spawn } from "node:child_process";

const PORT = 5210;
const BASE_URL = process.env.BASE_URL?.replace(/\/$/, "") ?? `http://127.0.0.1:${PORT}`;
const useLocal = !process.env.BASE_URL;

// path -> required JSON-LD @types
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

// Rich Results required-field validators
const RR = {
  Organization: (n) => req(n, ["@context", "@type", "name", "url", "logo"]),
  WebSite:      (n) => req(n, ["@context", "@type", "name", "url"]),
  ProfessionalService: (n) =>
    [...req(n, ["@context", "@type", "name", "url"]),
     ...(n.address ? [] : ["missing address"])],
  Service: (n) =>
    [...req(n, ["@context", "@type", "name"]),
     ...(n.provider?.name ? [] : ["missing provider.name"]),
     ...(n.areaServed ? [] : ["missing areaServed"])],
  FAQPage: (n) => {
    const errs = req(n, ["@context", "@type"]);
    const arr = Array.isArray(n.mainEntity) ? n.mainEntity : [];
    if (arr.length < 1) errs.push("mainEntity must have ≥1 question");
    arr.forEach((q, i) => {
      if (!q.name) errs.push(`mainEntity[${i}].name missing`);
      const text = q.acceptedAnswer?.text;
      if (!text || String(text).length < 10)
        errs.push(`mainEntity[${i}].acceptedAnswer.text missing/too-short`);
    });
    return errs;
  },
  Article: (n) =>
    [...req(n, ["@context", "@type", "headline", "image", "datePublished"]),
     ...(n.author?.name ? [] : ["missing author.name"]),
     ...(n.publisher?.name ? [] : ["missing publisher.name"]),
     ...(n.publisher?.logo?.url ? [] : ["missing publisher.logo.url"])],
  BreadcrumbList: (n) => {
    const errs = req(n, ["@context", "@type"]);
    const arr = Array.isArray(n.itemListElement) ? n.itemListElement : [];
    if (arr.length < 2) errs.push("itemListElement must have ≥2 entries");
    arr.forEach((it, i) => {
      if (it.position == null) errs.push(`itemListElement[${i}].position missing`);
      if (!it.name) errs.push(`itemListElement[${i}].name missing`);
      if (!it.item) errs.push(`itemListElement[${i}].item missing`);
    });
    return errs;
  },
};
function req(node, fields) {
  return fields.filter((f) => node?.[f] == null || node?.[f] === "").map((f) => `missing ${f}`);
}

function extractLd(html) {
  const blocks = [...html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]);
  const nodes = [];
  for (const raw of blocks) {
    try {
      const j = JSON.parse(raw);
      const arr = Array.isArray(j) ? j : (j["@graph"] ? j["@graph"] : [j]);
      for (const n of arr) if (n && n["@type"]) nodes.push(n);
    } catch (e) {
      nodes.push({ __parseError: e.message, __raw: raw.slice(0, 120) });
    }
  }
  return nodes;
}

// ---------- Boot local dev server if needed ----------
let server;
if (useLocal) {
  server = spawn("npx", ["vite", "dev", "--port", String(PORT), "--host", "127.0.0.1"],
    { stdio: ["ignore", "pipe", "pipe"], env: { ...process.env, NODE_ENV: "development" } });
  process.on("exit", () => { try { server.kill("SIGTERM"); } catch {} });
  const deadline = Date.now() + 90_000;
  while (Date.now() < deadline) {
    try { if ((await fetch(`${BASE_URL}/`)).ok) break; } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
}

// ---------- Validate ----------
let failed = 0;
for (const [path, required] of Object.entries(PAGES)) {
  const url = `${BASE_URL}${path}`;
  const r = await fetch(url, { headers: { "User-Agent": "Googlebot/2.1 (+http://www.google.com/bot.html)" } });
  if (!r.ok) { console.error(`✗ ${path} HTTP ${r.status}`); failed++; continue; }
  const nodes = extractLd(await r.text());
  const types = new Set();
  for (const n of nodes) {
    const t = n["@type"];
    if (Array.isArray(t)) t.forEach((x) => types.add(x));
    else if (t) types.add(t);
  }

  const errs = [];
  for (const t of required) if (!types.has(t)) errs.push(`@type=${t} not found`);
  for (const node of nodes) {
    if (node.__parseError) { errs.push(`malformed JSON-LD: ${node.__parseError}`); continue; }
    const nodeTypes = Array.isArray(node["@type"]) ? node["@type"] : [node["@type"]];
    for (const nt of nodeTypes) {
      const fn = RR[nt];
      if (!fn) continue;
      for (const e of fn(node)) errs.push(`${nt}: ${e}`);
    }
  }

  if (errs.length) {
    failed++;
    console.error(`✗ ${path}\n  - ${errs.join("\n  - ")}`);
  } else {
    console.log(`✓ ${path}  [${[...types].join(", ")}]`);
  }
}

if (server) server.kill("SIGTERM");
if (failed) { console.error(`\n${failed} page(s) failed Rich Results validation.`); process.exit(1); }
console.log(`\nAll ${Object.keys(PAGES).length} pages pass Rich Results expectations.`);
console.log(`Spot-check in Google's tool: https://search.google.com/test/rich-results?url=${encodeURIComponent(BASE_URL + "/")}`);
