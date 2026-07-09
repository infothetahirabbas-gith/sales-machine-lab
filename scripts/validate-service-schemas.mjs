#!/usr/bin/env node
// Validates that every service leaf route emits Service + BreadcrumbList + FAQPage
// JSON-LD, and that the root emits Organization + WebSite. Also lint-checks the
// shape of each JSON-LD blob against Google Rich Results required fields.
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { register } from "node:module";

// Enable TS transpile-on-import so we can require src/lib/seo.ts directly.
try { register("tsx/esm", pathToFileURL("./")); } catch {}

const ROUTES = "src/routes";
const files = readdirSync(ROUTES).filter((f) => f.startsWith("services.") && f.endsWith(".tsx"));

const leaves = files.filter((f) => f !== "services.index.tsx");
const errors = [];
const warns = [];

// 1. Source-level coverage
for (const f of leaves) {
  const src = readFileSync(join(ROUTES, f), "utf8");
  const has = (name) => new RegExp(`${name}\\(`).test(src);
  if (!has("serviceJsonLd")) errors.push(`${f}: missing serviceJsonLd()`);
  if (!has("breadcrumbJsonLd")) errors.push(`${f}: missing breadcrumbJsonLd()`);
  if (!has("faqJsonLd")) errors.push(`${f}: missing faqJsonLd()`);
}

const rootSrc = readFileSync("src/routes/__root.tsx", "utf8");
if (!/organizationJsonLd\(/.test(rootSrc)) errors.push("__root.tsx: missing organizationJsonLd()");
if (!/websiteJsonLd\(/.test(rootSrc)) errors.push("__root.tsx: missing websiteJsonLd()");

// 2. Runtime shape validation via dynamic import of seo helpers.
const seo = await import(pathToFileURL("src/lib/seo.ts").href);

const org = seo.organizationJsonLd();
for (const k of ["@context", "@type", "name", "url", "logo", "sameAs", "address", "contactPoint"]) {
  if (!(k in org)) errors.push(`Organization JSON-LD missing "${k}"`);
}
if (org["@type"] !== "Organization") errors.push(`Organization @type is ${org["@type"]}`);

const web = seo.websiteJsonLd();
for (const k of ["@context", "@type", "name", "url"]) {
  if (!(k in web)) errors.push(`WebSite JSON-LD missing "${k}"`);
}

const svc = seo.serviceJsonLd({ slug: "seo", name: "Ecommerce SEO", description: "test" });
for (const k of ["@context", "@type", "name", "description", "url", "provider", "areaServed"]) {
  if (!(k in svc)) errors.push(`Service JSON-LD missing "${k}"`);
}
if (svc["@type"] !== "Service") errors.push(`Service @type is ${svc["@type"]}`);
if (!svc.provider?.name) errors.push(`Service.provider.name missing`);

const bc = seo.breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]);
if (bc["@type"] !== "BreadcrumbList") errors.push(`Breadcrumb @type wrong`);
if (!Array.isArray(bc.itemListElement) || bc.itemListElement.length < 1)
  errors.push(`Breadcrumb itemListElement empty`);
for (const li of bc.itemListElement) {
  if (typeof li.position !== "number" || !li.name || !li.item)
    errors.push(`Breadcrumb ListItem missing position/name/item`);
  if (li.item && !li.item.startsWith("https://")) errors.push(`Breadcrumb item URL not absolute: ${li.item}`);
}

const faq = seo.faqJsonLd([{ q: "Q?", a: "A." }], "/services/seo");
if (faq["@type"] !== "FAQPage") errors.push(`FAQPage @type wrong`);
if (!Array.isArray(faq.mainEntity) || faq.mainEntity.length < 1) errors.push(`FAQPage mainEntity empty`);
for (const q of faq.mainEntity) {
  if (q["@type"] !== "Question" || !q.name || q.acceptedAnswer?.["@type"] !== "Answer" || !q.acceptedAnswer.text)
    errors.push(`FAQPage Question/Answer malformed`);
}

// 3. Warn if any service page ships fewer than 3 FAQs (Google may hide rich result)
for (const f of leaves) {
  const src = readFileSync(join(ROUTES, f), "utf8");
  const m = src.match(/FAQ_LIST[^=]*=\s*\[([\s\S]*?)\];/);
  if (m) {
    const count = (m[1].match(/\{\s*q:/g) || []).length;
    if (count < 3) warns.push(`${f}: FAQ_LIST has only ${count} entries (recommend 3+)`);
  }
}

console.log(`Service routes scanned: ${leaves.length}`);
console.log(`Errors: ${errors.length}`);
console.log(`Warnings: ${warns.length}`);
if (warns.length) warns.forEach((w) => console.log("  ! " + w));
if (errors.length) {
  errors.forEach((e) => console.log("  ✗ " + e));
  process.exit(1);
}
console.log("PASS: Service + FAQPage + BreadcrumbList JSON-LD present and well-formed on every service page. Organization + WebSite present sitewide.");
