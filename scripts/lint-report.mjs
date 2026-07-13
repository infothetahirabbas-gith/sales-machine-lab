#!/usr/bin/env node
/**
 * Combined lint report generator.
 *
 * Runs check-lang-routes, lint-canonicals, check-hreflang,
 * validate-structured-data, and (optionally) a fresh seo-diff, captures
 * stdout+stderr+exit codes, and emits HTML + Markdown reports.
 *
 * The report now includes a **structured findings table** per job with
 * columns for route, expected value, actual value, and a "what to change"
 * hint — so you can jump straight to the fix without hunting through raw
 * stdout.
 *
 * Usage:
 *   node scripts/lint-report.mjs                              # /tmp
 *   node scripts/lint-report.mjs --out-dir dist/lint
 *   node scripts/lint-report.mjs --with-seo-diff --env=production
 *
 * Always exits 0 so it can run as a reporting-only CI step; underlying
 * lint scripts run in their own steps to gate the build.
 */

import { spawnSync } from "node:child_process";
import { writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const args = process.argv.slice(2);
const outDirIdx = args.indexOf("--out-dir");
const OUT_DIR = outDirIdx >= 0 ? resolve(args[outDirIdx + 1]) : "/tmp";
const withDiff = args.includes("--with-seo-diff");
const envArg = args.find((a) => a.startsWith("--env="))?.split("=")[1] ?? "production";
mkdirSync(OUT_DIR, { recursive: true });

const DIFF_JSON = resolve(OUT_DIR, `seo-diff-${envArg}.json`);

const JOBS = [
  { id: "lang-routes",     label: "Language routes", script: "scripts/check-lang-routes.mjs", args: [] },
  { id: "canonicals",      label: "Canonicals",      script: "scripts/lint-canonicals.mjs",   args: [] },
  { id: "hreflang",        label: "hreflang",        script: "scripts/check-hreflang.mjs",    args: [] },
  { id: "structured-data", label: "Structured data", script: "scripts/validate-structured-data.mjs", args: [] },
];
if (withDiff) {
  JOBS.push({
    id: "seo-diff",
    label: `SEO diff (${envArg})`,
    script: "scripts/seo-diff.mjs",
    args: [`--env=${envArg}`, "--out", DIFF_JSON],
  });
}

const results = JOBS.map((j) => {
  const r = spawnSync("node", [j.script, ...j.args], { cwd: ROOT, encoding: "utf8" });
  return { ...j, status: r.status ?? -1, stdout: (r.stdout ?? "").trim(), stderr: (r.stderr ?? "").trim() };
});

// -------- Structured findings extraction --------
// Each returns { headers: string[], rows: string[][] } or null.

function findingsForSeoDiff() {
  if (!existsSync(DIFF_JSON)) return null;
  const payload = JSON.parse(readFileSync(DIFF_JSON, "utf8"));
  const rows = payload.results
    .filter((r) => r.drift?.length)
    .map((r) => {
      const expected = `${r.expected.status} · ${r.expected.canonical ?? "-"}`;
      const actual = `${r.status ?? "?"}${r.location ? ` → ${r.location}` : ""} · ${r.canonical ?? "(missing)"}`;
      const hint = r.status !== r.expected.status
        ? `Return HTTP ${r.expected.status} at ${r.route} (currently ${r.status}${r.location ? ` → ${r.location}` : ""}).`
        : `Set <link rel="canonical" href="${r.expected.canonical}"> on ${r.route}.`;
      return [r.route, expected, actual, hint];
    });
  return { headers: ["Route", "Expected", "Actual", "What to change"], rows };
}

function findingsForCanonicals(stdout) {
  // lint-canonicals prints "  ✗ <route>: canonical <actual> · expected <expected>"
  const rows = [];
  for (const line of stdout.split("\n")) {
    const m = /✗\s+(\S+):\s*canonical\s+(.+?)\s+·\s+expected\s+(.+)$/.exec(line);
    if (m) rows.push([m[1], m[3], m[2], `Update canonical href to ${m[3]}.`]);
  }
  return rows.length ? { headers: ["Route", "Expected", "Actual", "What to change"], rows } : null;
}

function findingsForHreflang(stdout) {
  // check-hreflang prints "  ✗ <file>: <message>" with structured messages.
  const rows = [];
  for (const line of stdout.split("\n")) {
    const m = /✗\s+([^:]+):\s+(.+)$/.exec(line);
    if (!m) continue;
    const [, file, msg] = m;
    let expected = "-", actual = "-", hint = msg;
    let mm;
    if ((mm = /missing hreflang="x-default"/.exec(msg))) {
      expected = "x-default present"; actual = "missing";
      hint = `Add <link rel="alternate" hreflang="x-default" href="…"> to ${file}.`;
    } else if ((mm = /duplicate hreflang "([^"]+)" \(([^ ]+) and ([^)]+)\)/.exec(msg))) {
      expected = `1 alternate for ${mm[1]}`; actual = `2 (${mm[2]}, ${mm[3]})`;
      hint = `Remove one of the duplicate ${mm[1]} alternates in ${file}.`;
    } else if ((mm = /canonical (\S+) not listed as one of its own hreflang alternates/.exec(msg))) {
      expected = `alternate href=${mm[1]}`; actual = "missing self-ref";
      hint = `Add self-referencing alternate hreflang for ${mm[1]} in ${file}.`;
    } else if ((mm = /alternate (\S+) not reciprocated — no route points hreflang back at (\S+)/.exec(msg))) {
      expected = `route with alternate href=${mm[2]}`; actual = "no reciprocal";
      hint = `Add a reciprocal <link rel="alternate"> pointing at ${mm[2]} from the route that owns ${mm[1]}.`;
    } else if ((mm = /hreflang points at (\S+) but baseline canonical for (\S+) is (\S+)/.exec(msg))) {
      expected = mm[3]; actual = mm[1];
      hint = `Align hreflang href on ${file} with baseline canonical ${mm[3]} for ${mm[2]}.`;
    }
    rows.push([file, expected, actual, hint]);
  }
  return rows.length ? { headers: ["File", "Expected", "Actual", "What to change"], rows } : null;
}

function findingsForStructuredData(stdout) {
  const rows = [];
  for (const line of stdout.split("\n")) {
    const m = /✗\s+(\S+):\s+(.+)$/.exec(line);
    if (m) rows.push([m[1], "valid JSON-LD block", m[2], `Fix schema in ${m[1]}: ${m[2]}`]);
  }
  return rows.length ? { headers: ["File", "Expected", "Actual", "What to change"], rows } : null;
}

const findingsByJob = {
  "seo-diff": findingsForSeoDiff(),
  "canonicals": findingsForCanonicals(results.find((r) => r.id === "canonicals")?.stdout ?? ""),
  "hreflang": findingsForHreflang(results.find((r) => r.id === "hreflang")?.stdout ?? ""),
  "structured-data": findingsForStructuredData(results.find((r) => r.id === "structured-data")?.stdout ?? ""),
};

const generatedAt = new Date().toISOString();
const failedCount = results.filter((r) => r.status !== 0).length;

// --- Markdown ---
const md = [];
md.push(`# SEO / route lint report`, ``, `_Generated ${generatedAt}_`, ``);
md.push(`**${results.length - failedCount}/${results.length} jobs passing**${failedCount ? ` — **${failedCount} failing**` : ""}`, ``);
for (const r of results) {
  md.push(`## ${r.status === 0 ? "✅" : "❌"} ${r.label} (\`${r.script}\`)`, ``);
  md.push(`Exit code: **${r.status}**`, ``);
  const f = findingsByJob[r.id];
  if (f && f.rows.length) {
    md.push(`| ${f.headers.join(" | ")} |`);
    md.push(`| ${f.headers.map(() => "---").join(" | ")} |`);
    for (const row of f.rows) md.push(`| ${row.map((c) => String(c).replace(/\|/g, "\\|")).join(" | ")} |`);
    md.push(``);
  }
  if (r.stdout) md.push(`<details><summary>stdout</summary>\n\n\`\`\`\n${r.stdout}\n\`\`\`\n</details>\n`);
  if (r.stderr) md.push(`<details><summary>stderr</summary>\n\n\`\`\`\n${r.stderr}\n\`\`\`\n</details>\n`);
}

function esc(s = "") {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

const html = `<!doctype html><html><head><meta charset="utf-8"><title>SEO lint report</title>
<style>
  body{font:14px/1.5 -apple-system,system-ui,sans-serif;margin:2rem;color:#111;max-width:1100px}
  h1{margin:0 0 .25rem} .meta{color:#666;margin-bottom:1.5rem}
  .summary{display:flex;gap:.75rem;margin-bottom:1.5rem;flex-wrap:wrap}
  .card{padding:.6rem .9rem;border-radius:8px;background:#f4f4f5;font-weight:600}
  .card.bad{background:#fee2e2;color:#991b1b} .card.ok{background:#dcfce7;color:#166534}
  details{border:1px solid #e5e7eb;border-radius:8px;margin-bottom:.75rem;background:#fff}
  summary{padding:.75rem 1rem;cursor:pointer;font-weight:600;display:flex;align-items:center;gap:.5rem}
  summary::-webkit-details-marker{display:none}
  .badge{padding:2px 8px;border-radius:999px;font-size:12px}
  .badge.ok{background:#dcfce7;color:#166534} .badge.bad{background:#fee2e2;color:#991b1b}
  pre{margin:0;padding:1rem;background:#0b1020;color:#e5e7eb;border-radius:0 0 8px 8px;overflow:auto;font:12px ui-monospace,monospace;white-space:pre-wrap;word-break:break-word}
  code.script{background:#f4f4f5;padding:1px 6px;border-radius:4px;font-size:12px;color:#374151}
  table{border-collapse:collapse;width:100%;margin:0 1rem 1rem;font-size:13px}
  th,td{border:1px solid #e5e7eb;padding:.4rem .6rem;text-align:left;vertical-align:top}
  th{background:#f9fafb} td.hint{color:#065f46;background:#ecfdf5}
  td.actual{color:#991b1b;background:#fef2f2;font-family:ui-monospace,monospace;font-size:12px}
  td.expected{color:#166534;font-family:ui-monospace,monospace;font-size:12px}
</style></head><body>
<h1>SEO / route lint report</h1>
<div class="meta">Generated ${esc(generatedAt)}</div>
<div class="summary">
  <div class="card ok"><strong>${results.length - failedCount}</strong> passing</div>
  <div class="card ${failedCount ? "bad" : ""}"><strong>${failedCount}</strong> failing</div>
</div>
${results.map((r) => {
  const f = findingsByJob[r.id];
  const table = f && f.rows.length ? `
    <table>
      <thead><tr>${f.headers.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead>
      <tbody>${f.rows.map((row) => `<tr>
        <td>${esc(row[0])}</td>
        <td class="expected">${esc(row[1])}</td>
        <td class="actual">${esc(row[2])}</td>
        <td class="hint">${esc(row[3])}</td>
      </tr>`).join("")}</tbody>
    </table>` : "";
  return `
<details ${r.status === 0 && !table ? "" : "open"}>
  <summary>
    <span class="badge ${r.status === 0 ? "ok" : "bad"}">${r.status === 0 ? "PASS" : "FAIL"}</span>
    ${esc(r.label)}
    <code class="script">${esc(r.script)}</code>
    <span style="margin-left:auto;color:#6b7280;font-weight:400">exit ${r.status}</span>
  </summary>
  ${table}
  ${r.stdout ? `<pre>${esc(r.stdout)}</pre>` : ""}
  ${r.stderr ? `<pre style="background:#450a0a">${esc(r.stderr)}</pre>` : ""}
</details>`;
}).join("")}
</body></html>`;

const htmlPath = resolve(OUT_DIR, "lint-report.html");
const mdPath = resolve(OUT_DIR, "lint-report.md");
writeFileSync(htmlPath, html);
writeFileSync(mdPath, md.join("\n"));
console.log(`HTML → ${htmlPath}`);
console.log(`MD   → ${mdPath}`);
console.log(`\n${results.length - failedCount}/${results.length} jobs passing${failedCount ? ` · ${failedCount} failing` : ""}`);
