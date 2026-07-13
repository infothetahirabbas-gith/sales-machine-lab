#!/usr/bin/env node
/**
 * Post a concise SEO summary (seo-diff + hreflang + structured-data + runtime
 * JSON-LD) as a comment on the associated PR. Idempotent: replaces its own
 * prior comment (identified by an HTML marker) instead of stacking.
 *
 * Inputs come from artifacts written by earlier CI steps:
 *   --diff <path>           artifacts/seo-diff-*.json   (repeatable)
 *   --jsonld <path>         runtime JSON-LD report      (optional)
 *   --lint-md <path>        lint-report.md              (optional; used for hreflang/sd tails)
 *
 * Env: GITHUB_TOKEN, GITHUB_REPOSITORY, PR_NUMBER (or GITHUB_REF for pull_request events).
 *
 * Runs no-op (exit 0) when there's no PR context — safe on push-to-main.
 */

import { readFileSync, existsSync } from "node:fs";

const MARKER = "<!-- lovable-seo-summary -->";
const args = process.argv.slice(2);
function all(flag) { return args.reduce((acc, a, i) => (a === flag && args[i + 1] ? [...acc, args[i + 1]] : acc), []); }
function one(flag) { const i = args.indexOf(flag); return i >= 0 ? args[i + 1] : null; }

const diffPaths = all("--diff");
const jsonldPath = one("--jsonld");
const lintMdPath = one("--lint-md");

const token = process.env.GITHUB_TOKEN;
const repo = process.env.GITHUB_REPOSITORY;
let prNumber = process.env.PR_NUMBER;
if (!prNumber && process.env.GITHUB_REF?.startsWith("refs/pull/")) {
  prNumber = process.env.GITHUB_REF.split("/")[2];
}

function readJson(p) { try { return JSON.parse(readFileSync(p, "utf8")); } catch { return null; } }

// --- Compose summary ---
const lines = [MARKER, "## 🔎 SEO CI summary", ""];

// seo-diff blocks
for (const p of diffPaths) {
  const d = readJson(p);
  if (!d) { lines.push(`- ⚠️ could not read ${p}`); continue; }
  const failed = d.results.filter((r) => r.drift?.length);
  lines.push(`### Redirect / canonical diff — \`${d.env}\``);
  lines.push(`Base: ${d.base}`);
  lines.push(`**${d.results.length - failed.length}/${d.results.length}** routes match baseline${failed.length ? ` · **${failed.length} drifted**` : ""}.`);
  if (failed.length) {
    lines.push("");
    lines.push("| Route | Expected | Actual | Fix |");
    lines.push("|---|---|---|---|");
    for (const r of failed.slice(0, 25)) {
      const exp = `${r.expected.status} · ${r.expected.canonical ?? "-"}`;
      const act = `${r.status ?? "?"}${r.location ? ` → ${r.location}` : ""} · ${r.canonical ?? "(missing)"}`;
      const fix = r.status !== r.expected.status
        ? `Return ${r.expected.status} at \`${r.route}\``
        : `Set canonical to \`${r.expected.canonical}\``;
      lines.push(`| \`${r.route}\` | ${exp} | ${act} | ${fix} |`);
    }
    if (failed.length > 25) lines.push(`_…and ${failed.length - 25} more_`);
  }
  lines.push("");
}

// runtime JSON-LD
if (jsonldPath && existsSync(jsonldPath)) {
  const j = readJson(jsonldPath);
  if (j) {
    const bad = j.results.filter((r) => r.parseErrors.length);
    const warn = j.results.filter((r) => r.warnings.length);
    lines.push(`### Runtime JSON-LD — \`${j.env}\``);
    lines.push(`**${j.results.length - bad.length}/${j.results.length}** routes parse-clean${bad.length ? ` · **${bad.length} parse errors**` : ""}${warn.length ? ` · ${warn.length} warnings` : ""}.`);
    if (bad.length) {
      lines.push("");
      for (const r of bad.slice(0, 15)) {
        lines.push(`- ❌ \`${r.route}\` — ${r.parseErrors.join("; ")}`);
      }
    }
    lines.push("");
  }
}

// hreflang + structured-data tails from lint-report.md
if (lintMdPath && existsSync(lintMdPath)) {
  const md = readFileSync(lintMdPath, "utf8");
  for (const label of ["hreflang", "Structured data"]) {
    const re = new RegExp(`## (✅|❌) ${label}[\\s\\S]*?(?=\\n## |$)`);
    const m = re.exec(md);
    if (m) {
      lines.push(`### ${label}`);
      // trim the noisy header lines
      const body = m[0].split("\n").slice(1, 10).join("\n").trim();
      lines.push(body);
      lines.push("");
    }
  }
}

lines.push("---");
lines.push(`_Artifacts: seo-diff, lint-report, runtime-jsonld. Regenerate baseline with \`node scripts/regen-baseline.mjs --env=<env> --approve\` (also needs \`SEO_BASELINE_APPROVE=1\`)._`);

const body = lines.join("\n");

if (!token || !repo || !prNumber) {
  console.log("No PR context (need GITHUB_TOKEN, GITHUB_REPOSITORY, PR_NUMBER). Printing preview:\n");
  console.log(body);
  process.exit(0);
}

// --- Upsert PR comment ---
const gh = async (path, init = {}) => {
  const res = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...(init.headers ?? {}),
    },
  });
  if (!res.ok) throw new Error(`${init.method ?? "GET"} ${path} → ${res.status} ${await res.text()}`);
  return res.status === 204 ? null : res.json();
};

const list = await gh(`/repos/${repo}/issues/${prNumber}/comments?per_page=100`);
const existing = list.find((c) => c.body?.includes(MARKER));
if (existing) {
  await gh(`/repos/${repo}/issues/comments/${existing.id}`, { method: "PATCH", body: JSON.stringify({ body }) });
  console.log(`Updated PR #${prNumber} comment ${existing.id}.`);
} else {
  await gh(`/repos/${repo}/issues/${prNumber}/comments`, { method: "POST", body: JSON.stringify({ body }) });
  console.log(`Posted PR #${prNumber} comment.`);
}
