#!/usr/bin/env node
/**
 * Build-time guard: fails the build if the home-page entry chunk pulls in
 * any /audit route chunk. We keep the /audit bundle off the initial home
 * load because it's ~350 KiB of Recharts + audit UI that only ever runs
 * on /audit itself.
 *
 * Runs against the Vite manifest (dist/client/.vite/manifest.json). Home
 * entry = src/routes/index.tsx. We walk its imports transitively and
 * flag any chunk whose source file lives under src/routes/audit or whose
 * emitted filename contains "audit".
 */
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const MANIFEST = resolve("dist/client/.vite/manifest.json");
const HOME_KEY_HINTS = ["routes/index.tsx", "routes/index.jsx"];
const AUDIT_PATTERNS = [/routes\/audit(\.|\/)/i, /(^|\/)audit-[A-Za-z0-9_-]+\.(m?js|css)$/i];

async function main() {
  if (!existsSync(MANIFEST)) {
    console.warn(`[check:bundle] manifest not found at ${MANIFEST} — skipping (run vite build first).`);
    return;
  }
  const manifest = JSON.parse(await readFile(MANIFEST, "utf8"));
  const entries = Object.entries(manifest);

  const homeKey = entries.find(([k]) => HOME_KEY_HINTS.some((h) => k.endsWith(h)))?.[0];
  if (!homeKey) {
    console.warn("[check:bundle] could not locate home route entry in manifest — skipping.");
    return;
  }

  const seen = new Set();
  const stack = [homeKey];
  while (stack.length) {
    const key = stack.pop();
    if (seen.has(key)) continue;
    seen.add(key);
    const node = manifest[key];
    if (!node) continue;
    for (const imp of node.imports ?? []) stack.push(imp);
    for (const imp of node.dynamicImports ?? []) {
      // dynamicImports are lazy — skip; they're allowed on the home page
      // (they're what makes `lazy()` work). We only fail on static graph.
    }
  }

  const offenders = [];
  for (const key of seen) {
    const node = manifest[key];
    if (!node) continue;
    const sourcePath = key;
    const filePath = node.file ?? "";
    if (AUDIT_PATTERNS.some((r) => r.test(sourcePath) || r.test(filePath))) {
      offenders.push({ source: sourcePath, file: filePath });
    }
  }

  if (offenders.length) {
    console.error("\n[check:bundle] ❌ /audit chunks reached the homepage's static import graph:");
    for (const o of offenders) console.error(`  - ${o.source}  →  dist/client/${o.file}`);
    console.error("\nThe /audit route bundle must stay lazy. Import it via a route-level");
    console.error("<Link to='/audit'> (already lazy) or React.lazy(), not a static import\n");
    process.exit(1);
  }
  console.log(`[check:bundle] ✅ home entry is clean — no /audit chunks in the initial graph (${seen.size} modules scanned).`);
}

main().catch((err) => { console.error(err); process.exit(1); });
