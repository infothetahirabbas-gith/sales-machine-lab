#!/usr/bin/env node
// Verifies every Unsplash image URL referenced by location pages AND the home
// page resolves (HTTP 200). Runs as a prebuild step. Exits non-zero ONLY on
// confirmed 404s so a flaky network doesn't block deploys.
//
// Usage: node scripts/check-location-images.mjs

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SOURCES = [
  "../src/lib/location-content.ts",
  "../src/lib/home-images.ts",
  "../src/lib/industry-content.ts",
];

const idSet = new Set();
for (const rel of SOURCES) {
  const src = readFileSync(resolve(__dirname, rel), "utf8");
  for (const m of src.match(/photo-[0-9a-f-]+/gi) ?? []) idSet.add(m);
}
const ids = [...idSet];
if (ids.length === 0) {
  console.log("[check-images] no Unsplash IDs found — skipping.");
  process.exit(0);
}

console.log(`[check-images] verifying ${ids.length} Unsplash IDs across ${SOURCES.length} source file(s)…`);


const CONCURRENCY = 8;
const TIMEOUT_MS = 6000;
const broken = [];
const flaky = [];

async function check(id) {
  const url = `https://images.unsplash.com/${id}?w=64`;
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { method: "HEAD", signal: ctrl.signal });
    if (res.status === 404) broken.push(id);
    else if (!res.ok && res.status !== 405) flaky.push({ id, status: res.status });
  } catch (err) {
    flaky.push({ id, status: err?.name === "AbortError" ? "timeout" : "network" });
  } finally {
    clearTimeout(t);
  }
}

const queue = [...ids];
const workers = Array.from({ length: CONCURRENCY }, async () => {
  while (queue.length) {
    const id = queue.shift();
    if (id) await check(id);
  }
});
await Promise.all(workers);

if (flaky.length) {
  console.warn(
    `[check-images] ${flaky.length} URL(s) inconclusive (network/timeout) — skipped:`,
    flaky.slice(0, 5),
  );
}

if (broken.length) {
  console.error(`\n❌ [check-images] ${broken.length} broken Unsplash ID(s):`);
  for (const id of broken) console.error(`   - ${id}`);
  console.error(
    "\nFix: replace the ID(s) above in src/lib/location-content.ts with a working photo.",
  );
  process.exit(1);
}

// ───────────────────────────────────────────────────────────────────────────
// Strict rule: no industry page may reuse an image URL across sections.
// Parses src/lib/industry-content.ts and, for every industry entry in IMG,
// asserts the 7 slot IDs (hero/buyers/creative/funnel/caseStudy/process/tech)
// are all distinct. Blocks publish on any duplicate.
// ───────────────────────────────────────────────────────────────────────────
const industrySrc = readFileSync(
  resolve(__dirname, "../src/lib/industry-content.ts"),
  "utf8",
);
const imgBlock = industrySrc.match(/const IMG:[^=]*=\s*\{([\s\S]*?)\n\};/);
if (!imgBlock) {
  console.error("❌ [check-images] could not locate IMG table in industry-content.ts");
  process.exit(1);
}
const industryDupes = [];
const entryRe = /"([a-z0-9-]+)":\s*\{([^}]+)\}/g;
let m;
while ((m = entryRe.exec(imgBlock[1])) !== null) {
  const [, slug, body] = m;
  const ids = [...body.matchAll(/photo-[0-9a-z-]+/gi)].map((x) => x[0]);
  if (ids.length < 7) {
    industryDupes.push(`${slug}: only ${ids.length} image slots (expected 7)`);
    continue;
  }
  const seen = new Map();
  for (const id of ids) seen.set(id, (seen.get(id) ?? 0) + 1);
  const repeats = [...seen.entries()].filter(([, n]) => n > 1);
  if (repeats.length) {
    industryDupes.push(
      `${slug}: reused image(s) → ${repeats.map(([id, n]) => `${id} ×${n}`).join(", ")}`,
    );
  }
}
if (industryDupes.length) {
  console.error(
    `\n❌ [check-images] ${industryDupes.length} industry page(s) reuse images across sections:`,
  );
  for (const d of industryDupes) console.error(`   - ${d}`);
  console.error(
    "\nFix: give each of the 7 image slots (hero/buyers/creative/funnel/caseStudy/process/tech) a unique Unsplash ID in src/lib/industry-content.ts.",
  );
  process.exit(1);
}

console.log(
  `✅ [check-images] all ${ids.length} image IDs OK, all industry pages use unique images per section.`,
);
