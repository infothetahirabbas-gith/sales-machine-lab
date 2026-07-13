#!/usr/bin/env node
/**
 * Regenerate scripts/seo-baseline.json for a chosen env by crawling the live
 * site and recording current status + canonical per known route.
 *
 * Safe by default: writes a *proposed* baseline to a side file and prints a
 * diff. Overwriting the real baseline requires BOTH:
 *   • --approve                (explicit CLI flag)
 *   • SEO_BASELINE_APPROVE=1   (env var — CI must set this deliberately)
 *
 * Usage:
 *   node scripts/regen-baseline.mjs --env=staging
 *   node scripts/regen-baseline.mjs --env=production --approve   # writes proposal only unless env var set
 *   SEO_BASELINE_APPROVE=1 node scripts/regen-baseline.mjs --env=production --approve
 *
 * Exit codes:
 *   0 — proposal written (or baseline updated when approved)
 *   1 — fetch error / no routes reachable
 *   2 — bad args
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASELINE_PATH = resolve(__dirname, "seo-baseline.json");
const baseline = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));

const args = process.argv.slice(2);
const envArg = args.find((a) => a.startsWith("--env="))?.split("=")[1] ?? "production";
const approveFlag = args.includes("--approve");
const approveEnv = process.env.SEO_BASELINE_APPROVE === "1";
const APPROVED = approveFlag && approveEnv;

const envCfg = baseline.environments?.[envArg];
if (!envCfg) {
  console.error(`Unknown env "${envArg}". Known: ${Object.keys(baseline.environments ?? {}).join(", ")}`);
  process.exit(2);
}
const BASE = envCfg.base.replace(/\/$/, "");
const templatize = (u) => u?.replace(BASE, "{{BASE}}");

async function probe(route) {
  const url = `${BASE}${route}`;
  try {
    const res = await fetch(url, { redirect: "manual", headers: { "user-agent": "beingecom-baseline-regen/1.0" } });
    let canonical;
    if (res.status === 200) {
      const html = await res.text();
      canonical = /<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']*)["']/i.exec(html)?.[1];
    }
    return { route, status: res.status, canonical, location: res.headers.get("location") ?? undefined };
  } catch (err) {
    return { route, error: err.message };
  }
}

const routeKeys = Object.keys(baseline.routes);
const results = [];
for (const r of routeKeys) results.push(await probe(r));

const reachable = results.filter((r) => !r.error);
if (!reachable.length) {
  console.error("No routes reachable — aborting.");
  process.exit(1);
}

const proposed = JSON.parse(JSON.stringify(baseline));
const changes = [];
for (const r of results) {
  if (r.error) { changes.push(`⚠ ${r.route}: fetch error ${r.error}`); continue; }
  const prev = baseline.routes[r.route];
  const next = { status: r.status, canonical: r.canonical ? templatize(r.canonical) : prev.canonical };
  const prevCanonExpanded = prev.canonical?.replace("{{BASE}}", BASE);
  const changed = prev.status !== r.status || prevCanonExpanded !== r.canonical;
  if (changed) {
    changes.push(`~ ${r.route}: status ${prev.status}→${r.status}, canonical ${prev.canonical} → ${next.canonical}`);
  }
  proposed.routes[r.route] = next;
}

console.log(`\nBaseline regen — [${envArg}] ${BASE}`);
console.log("=".repeat(60));
if (!changes.length) {
  console.log("✅ No drift — proposed baseline identical to current.\n");
} else {
  console.log(`${changes.length} change${changes.length === 1 ? "" : "s"} detected:\n`);
  for (const c of changes) console.log("  " + c);
}

const proposalPath = BASELINE_PATH.replace(/\.json$/, `.proposed.${envArg}.json`);
writeFileSync(proposalPath, JSON.stringify(proposed, null, 2) + "\n");
console.log(`\nProposal → ${proposalPath}`);

if (!APPROVED) {
  console.log(`\n🔒 Not overwriting baseline.`);
  console.log(`   Requires BOTH --approve AND SEO_BASELINE_APPROVE=1.`);
  console.log(`   Flag: ${approveFlag ? "✓" : "✗"}   Env: ${approveEnv ? "✓" : "✗"}`);
  process.exit(0);
}

writeFileSync(BASELINE_PATH, JSON.stringify(proposed, null, 2) + "\n");
console.log(`\n✅ Baseline updated: ${BASELINE_PATH}`);
