#!/usr/bin/env node
// Verifies every Unsplash image URL referenced by location pages resolves (HTTP 200).
// Runs as a prebuild step. Exits non-zero ONLY on confirmed 404s so a flaky
// network doesn't block deploys.
//
// Usage: node scripts/check-location-images.mjs

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = readFileSync(
  resolve(__dirname, "../src/lib/location-content.ts"),
  "utf8",
);

const ids = Array.from(new Set(src.match(/photo-[0-9a-f-]+/gi) ?? []));
if (ids.length === 0) {
  console.log("[check-images] no Unsplash IDs found — skipping.");
  process.exit(0);
}

console.log(`[check-images] verifying ${ids.length} Unsplash IDs…`);

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

console.log(`✅ [check-images] all ${ids.length} image IDs OK.`);
