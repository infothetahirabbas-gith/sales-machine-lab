#!/usr/bin/env node
/**
 * Combined lint report generator.
 *
 * Runs check-lang-routes, lint-canonicals, check-hreflang, and
 * validate-structured-data as child processes, captures stdout+stderr and
 * exit codes, and emits a human-readable HTML AND Markdown report showing
 * exactly what to change.
 *
 * Usage:
 *   node scripts/lint-report.mjs                       # writes /tmp/lint-report.{html,md}
 *   node scripts/lint-report.mjs --out-dir dist/lint   # custom out dir
 *
 * Always exits 0 so it can run as a reporting-only CI step; the underlying
 * lint scripts run in their own steps to gate the build.
 */

import { spawnSync } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const args = process.argv.slice(2);
const outDirIdx = args.indexOf("--out-dir");
const OUT_DIR = outDirIdx >= 0 ? resolve(args[outDirIdx + 1]) : "/tmp";
mkdirSync(OUT_DIR, { recursive: true });

const JOBS = [
  { id: "lang-routes",       label: "Language routes",   script: "scripts/check-lang-routes.mjs" },
  { id: "canonicals",        label: "Canonicals",        script: "scripts/lint-canonicals.mjs" },
  { id: "hreflang",          label: "hreflang",          script: "scripts/check-hreflang.mjs" },
  { id: "structured-data",   label: "Structured data",   script: "scripts/validate-structured-data.mjs" },
];

const results = JOBS.map((j) => {
  const r = spawnSync("node", [j.script], { cwd: ROOT, encoding: "utf8" });
  return {
    ...j,
    status: r.status ?? -1,
    stdout: (r.stdout ?? "").trim(),
    stderr: (r.stderr ?? "").trim(),
  };
});

const generatedAt = new Date().toISOString();
const failedCount = results.filter((r) => r.status !== 0).length;

// --- Markdown ---
const md = [
  `# SEO / route lint report`,
  ``,
  `_Generated ${generatedAt}_`,
  ``,
  `**${results.length - failedCount}/${results.length} jobs passing**` +
    (failedCount ? ` — **${failedCount} failing**` : ""),
  ``,
  ...results.flatMap((r) => [
    `## ${r.status === 0 ? "✅" : "❌"} ${r.label} (\`${r.script}\`)`,
    ``,
    `Exit code: **${r.status}**`,
    ``,
    r.stdout ? "### stdout\n\n```\n" + r.stdout + "\n```\n" : "",
    r.stderr ? "### stderr\n\n```\n" + r.stderr + "\n```\n" : "",
  ]),
].join("\n");

function esc(s = "") {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// --- HTML ---
const html = `<!doctype html><html><head><meta charset="utf-8"><title>SEO lint report</title>
<style>
  body{font:14px/1.5 -apple-system,system-ui,sans-serif;margin:2rem;color:#111;max-width:960px}
  h1{margin:0 0 .25rem}
  .meta{color:#666;margin-bottom:1.5rem}
  .summary{display:flex;gap:.75rem;margin-bottom:1.5rem;flex-wrap:wrap}
  .card{padding:.6rem .9rem;border-radius:8px;background:#f4f4f5;font-weight:600}
  .card.bad{background:#fee2e2;color:#991b1b}
  .card.ok{background:#dcfce7;color:#166534}
  details{border:1px solid #e5e7eb;border-radius:8px;margin-bottom:.75rem;background:#fff}
  details[open]{box-shadow:0 1px 3px rgba(0,0,0,.05)}
  summary{padding:.75rem 1rem;cursor:pointer;font-weight:600;display:flex;align-items:center;gap:.5rem}
  summary::-webkit-details-marker{display:none}
  .badge{padding:2px 8px;border-radius:999px;font-size:12px}
  .badge.ok{background:#dcfce7;color:#166534}
  .badge.bad{background:#fee2e2;color:#991b1b}
  pre{margin:0;padding:1rem;background:#0b1020;color:#e5e7eb;border-radius:0 0 8px 8px;overflow:auto;font:12px ui-monospace,monospace;white-space:pre-wrap;word-break:break-word}
  pre + pre{border-top:1px solid #1f2937}
  code.script{background:#f4f4f5;padding:1px 6px;border-radius:4px;font-size:12px;color:#374151}
</style></head><body>
<h1>SEO / route lint report</h1>
<div class="meta">Generated ${esc(generatedAt)}</div>
<div class="summary">
  <div class="card ok"><strong>${results.length - failedCount}</strong> passing</div>
  <div class="card ${failedCount ? "bad" : ""}"><strong>${failedCount}</strong> failing</div>
</div>
${results.map((r) => `
<details ${r.status === 0 ? "" : "open"}>
  <summary>
    <span class="badge ${r.status === 0 ? "ok" : "bad"}">${r.status === 0 ? "PASS" : "FAIL"}</span>
    ${esc(r.label)}
    <code class="script">${esc(r.script)}</code>
    <span style="margin-left:auto;color:#6b7280;font-weight:400">exit ${r.status}</span>
  </summary>
  ${r.stdout ? `<pre>${esc(r.stdout)}</pre>` : ""}
  ${r.stderr ? `<pre style="background:#450a0a">${esc(r.stderr)}</pre>` : ""}
</details>`).join("")}
</body></html>`;

const htmlPath = resolve(OUT_DIR, "lint-report.html");
const mdPath = resolve(OUT_DIR, "lint-report.md");
writeFileSync(htmlPath, html);
writeFileSync(mdPath, md);
console.log(`HTML → ${htmlPath}`);
console.log(`MD   → ${mdPath}`);
console.log(`\n${results.length - failedCount}/${results.length} jobs passing${failedCount ? ` · ${failedCount} failing` : ""}`);
