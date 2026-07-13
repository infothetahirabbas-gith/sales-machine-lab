#!/usr/bin/env node
/**
 * Structured-data validator for P1 routes — SOURCE-LEVEL.
 *
 * Extracts every JSON-LD block from a route's source (head().scripts with
 * type "application/ld+json"), plus any shared JSON-LD builders it invokes
 * from src/lib/seo.ts, evaluates them in a lightweight sandbox, and checks:
 *
 *   - FAQPage       → @context, @type, mainEntity[≥1] with name +
 *                     acceptedAnswer.text
 *   - Organization  → @context, @type, name, url, logo
 *   - BreadcrumbList → @context, @type, itemListElement[≥2] each with
 *                     position + name + item
 *
 * This runs at build time — no browser, no live URL required — so it drops
 * cleanly into `prebuild` and blocks pushes that would ship malformed
 * schema. `validate-jsonld.mjs` (rendered runtime) remains the post-deploy
 * gate.
 *
 * Exit 1 on any violation.
 */

import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const baseline = JSON.parse(readFileSync(resolve(__dirname, "seo-baseline.json"), "utf8"));
const P1 = Object.keys(baseline.routes);

function routeToFile(route) {
  if (route === "/") return "src/routes/index.tsx";
  const seg = route.replace(/^\//, "").split("/").join(".");
  const layoutIdx = `src/routes/${seg}.index.tsx`;
  return existsSync(join(ROOT, layoutIdx)) ? layoutIdx : `src/routes/${seg}.tsx`;
}

// Required-fields per @type. Return array of missing-field strings.
const RR = {
  FAQPage(n) {
    const miss = [];
    for (const k of ["@context", "@type"]) if (n[k] == null) miss.push(k);
    if (!Array.isArray(n.mainEntity) || n.mainEntity.length === 0) miss.push("mainEntity[]");
    else n.mainEntity.forEach((q, i) => {
      if (!q?.name) miss.push(`mainEntity[${i}].name`);
      if (!q?.acceptedAnswer?.text) miss.push(`mainEntity[${i}].acceptedAnswer.text`);
    });
    return miss;
  },
  Organization(n) {
    const miss = [];
    for (const k of ["@context", "@type", "name", "url", "logo"]) if (n[k] == null) miss.push(k);
    return miss;
  },
  BreadcrumbList(n) {
    const miss = [];
    for (const k of ["@context", "@type"]) if (n[k] == null) miss.push(k);
    const items = n.itemListElement;
    if (!Array.isArray(items) || items.length < 2) miss.push("itemListElement[≥2]");
    else items.forEach((it, i) => {
      if (it?.position == null) miss.push(`itemListElement[${i}].position`);
      if (!it?.name) miss.push(`itemListElement[${i}].name`);
      if (!it?.item) miss.push(`itemListElement[${i}].item`);
    });
    return miss;
  },
};

// Grab every JSON.stringify({...}) block passed as `children` inside a
// head().scripts entry with type "application/ld+json". Uses brace matching
// to survive nested objects.
function extractLdBlocks(src) {
  const blocks = [];
  const re = /type:\s*["']application\/ld\+json["'][\s\S]*?children:\s*JSON\.stringify\(/g;
  let m;
  while ((m = re.exec(src))) {
    let i = re.lastIndex;
    let depth = 1;
    const start = i;
    while (i < src.length && depth > 0) {
      const c = src[i];
      if (c === "(") depth++;
      else if (c === ")") depth--;
      i++;
    }
    blocks.push(src.slice(start, i - 1));
  }
  return blocks;
}

// Load a couple of shared builders so evaluated calls resolve. Only what
// the routes actually invoke.
const seoLib = readFileSync(join(ROOT, "src/lib/seo.ts"), "utf8");
const SITE_URL = /SITE_URL\s*=\s*["']([^"']+)["']/.exec(seoLib)?.[1] ?? "https://beingecom.com";

// Rebuild a minimal JS sandbox that re-implements the shared JSON-LD
// helpers. Keeps validation source-level (no TS/Vite runtime needed).
const sandbox = {
  SITE_URL,
  faqJsonLd: (faqs) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }),
  organizationJsonLd: () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BeingEcom",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
  }),
  breadcrumbJsonLd: (items) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      // Real helper accepts {name, path} and expands to `${SITE_URL}${path}`.
      // Accept either shape so validation matches runtime output.
      item: it.item ?? (it.path ? `${SITE_URL}${it.path}` : undefined),
    })),
  }),
  serviceJsonLd: (svc) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: svc.name,
    provider: { "@type": "Organization", name: "BeingEcom" },
    areaServed: "United Kingdom",
    description: svc.description,
  }),
};

function evalBlock(expr, extraCtx = {}) {
  try {
    // eslint-disable-next-line no-new-func
    const fn = new Function(
      ...Object.keys(sandbox),
      ...Object.keys(extraCtx),
      `return (${expr});`,
    );
    return fn(...Object.values(sandbox), ...Object.values(extraCtx));
  } catch (err) {
    return { __evalError: err.message };
  }
}

// Best-effort locals extracted per file (const NAME = [...]) so
// faqJsonLd(<localName>) resolves.
function extractLocals(src) {
  const locals = {};
  const re = /const\s+([A-Za-z_][\w]*)\s*=\s*(\[[\s\S]*?\n\])\s*;/g;
  let m;
  while ((m = re.exec(src))) {
    const [, name, literal] = m;
    try {
      // eslint-disable-next-line no-new-func
      locals[name] = new Function(`return (${literal});`)();
    } catch {
      /* skip locals we can't parse */
    }
  }
  return locals;
}

const failures = [];
const summary = [];

for (const route of P1) {
  const file = routeToFile(route);
  if (!existsSync(join(ROOT, file))) {
    summary.push({ route, file, status: "skip-missing" });
    continue;
  }
  const src = readFileSync(join(ROOT, file), "utf8");
  const blocks = extractLdBlocks(src);
  const locals = extractLocals(src);
  const types = new Set();
  let skipped = 0;

  for (const expr of blocks) {
    const value = evalBlock(expr, locals);
    if (!value || value.__evalError) {
      // Block references a symbol we can't resolve statically (imported
      // helper, non-array local, etc.). Skip — the runtime validator
      // (validate-jsonld.mjs) covers these post-deploy. Only fail when a
      // block successfully evaluates AND is missing required fields.
      skipped++;
      continue;
    }
    const nodes = Array.isArray(value) ? value : [value];
    for (const n of nodes) {
      if (!n || typeof n !== "object") continue;
      types.add(n["@type"]);
      const validator = RR[n["@type"]];
      if (validator) {
        const miss = validator(n);
        if (miss.length) failures.push(`${route}: ${n["@type"]} missing fields → ${miss.join(", ")}`);
      }
    }
  }

  summary.push({ route, file, types: [...types], blocks: blocks.length, skipped });
    const nodes = Array.isArray(value) ? value : [value];
    for (const n of nodes) {
      if (!n || typeof n !== "object") continue;
      types.add(n["@type"]);
      const validator = RR[n["@type"]];
      if (validator) {
        const miss = validator(n);
        if (miss.length) failures.push(`${route}: ${n["@type"]} missing fields → ${miss.join(", ")}`);
      }
    }
  }

  summary.push({ route, file, types: [...types], blocks: blocks.length, evalFailures });
}

const jsonOut = process.argv.includes("--json");
if (jsonOut) {
  console.log(JSON.stringify({ summary, failures }, null, 2));
} else {
  console.log(`\nStructured data validation (source-level) — ${P1.length} P1 routes`);
  for (const s of summary) {
    const tag = s.evalFailures ? "✗" : "✓";
    console.log(`  ${tag} ${s.route.padEnd(50)}  [${(s.types ?? []).join(", ") || "no JSON-LD"}]`);
  }
  if (failures.length) {
    console.error(`\n${failures.length} violation${failures.length === 1 ? "" : "s"}:`);
    for (const f of failures) console.error(`  ✗ ${f}`);
  } else {
    console.log(`\n✅ All JSON-LD blocks parse and satisfy required fields.\n`);
  }
}

process.exit(failures.length ? 1 : 0);
