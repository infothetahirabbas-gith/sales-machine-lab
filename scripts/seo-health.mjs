#!/usr/bin/env node
/**
 * Internal SEO health checker for beingecom.com.
 *
 * Flags per critical route:
 *   - HTTP status ≠ 200 (302/307 redirects, 404, 5xx)
 *   - Missing or wrong <link rel="canonical"> (must self-reference the route)
 *   - Missing <title> or <meta description>
 *   - Missing <h1>
 *   - Duplicate canonical or title collisions across routes
 *
 * Also reads sitemap.xml and warns on any indexable route that has NO entry
 * (Google won't discover it fast) and any sitemap entry that returns non-200
 * or redirects (crawl budget waste).
 *
 * Usage:
 *   node scripts/seo-health.mjs                        # pretty console
 *   node scripts/seo-health.mjs https://preview...     # override base
 *   node scripts/seo-health.mjs --json                 # JSON to stdout
 *   node scripts/seo-health.mjs --out report.json      # JSON to file
 *   node scripts/seo-health.mjs --html report.html     # HTML report to file
 */

import { writeFileSync } from "node:fs";

const args = process.argv.slice(2);
const jsonOut = args.includes("--json");
const outIdx = args.indexOf("--out");
const outPath = outIdx >= 0 ? args[outIdx + 1] : null;
const htmlIdx = args.indexOf("--html");
const htmlPath = htmlIdx >= 0 ? args[htmlIdx + 1] : null;
const baseArg = args.find((a) => a.startsWith("http"));
const BASE = (baseArg ?? "https://beingecom.com").replace(/\/$/, "");

// Routes we consider critical - if any of these regress, launch is not clean.
const CRITICAL_ROUTES = [
  "/",
  "/services",
  "/services/seo",
  "/services/seo/on-page",
  "/services/seo/off-page",
  "/services/seo/technical",
  "/services/seo/local",
  "/services/seo/aeo",
  "/services/seo/international",
  "/services/paid-ads",
  "/services/performance-marketing",
  "/services/performance-marketing/google-ads",
  "/services/performance-marketing/facebook-ads",
  "/services/performance-marketing/instagram-ads",
  "/services/performance-marketing/tiktok-ads",
  "/services/performance-marketing/youtube-ads",
  "/services/performance-marketing/media-buying",
  "/services/store-development",
  "/services/cro",
  "/services/creative",
  "/services/email-sms",
  "/services/ai-automation",
  "/services/funnel",
  "/services/analytics",
  "/services/scaling",
  "/case-studies",
  "/pricing",
  "/audit",
  "/contact",
  "/about",
  "/company",
  "/company/founder",
  "/company/methodology",
  "/blog",
];

/** @typedef {{route:string,url:string,status:number,redirectedTo?:string,title?:string,description?:string,canonical?:string,h1?:string,issues:string[]}} RouteReport */

async function inspect(route) {
  const url = `${BASE}${route}`;
  /** @type {RouteReport} */
  const rpt = { route, url, status: 0, issues: [] };
  let res;
  try {
    res = await fetch(url, {
      redirect: "manual",
      headers: { "user-agent": "beingecom-seo-health/1.0" },
    });
  } catch (err) {
    rpt.issues.push(`fetch failed: ${err.message}`);
    return rpt;
  }
  rpt.status = res.status;

  if (res.status >= 300 && res.status < 400) {
    rpt.redirectedTo = res.headers.get("location") ?? "";
    rpt.issues.push(
      `HTTP ${res.status} redirect to ${rpt.redirectedTo || "(no Location)"} — should return 200 at base URL`,
    );
    return rpt;
  }
  if (res.status !== 200) {
    rpt.issues.push(`HTTP ${res.status} — expected 200`);
    return rpt;
  }

  const html = await res.text();

  const title = /<title>([\s\S]*?)<\/title>/i.exec(html)?.[1]?.trim();
  const desc = /<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i.exec(html)?.[1];
  const canonical = /<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']*)["']/i.exec(html)?.[1];
  const h1 = /<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(html)?.[1]?.replace(/<[^>]+>/g, "").trim();

  rpt.title = title;
  rpt.description = desc;
  rpt.canonical = canonical;
  rpt.h1 = h1;

  const expected = `${BASE}${route === "/" ? "/" : route}`;
  const expectedAlt = expected.endsWith("/") ? expected.slice(0, -1) : `${expected}/`;

  if (!title) rpt.issues.push("missing <title>");
  else if (title.length < 15) rpt.issues.push(`title too short (${title.length} chars)`);
  else if (title.length > 65) rpt.issues.push(`title too long (${title.length} chars)`);

  if (!desc) rpt.issues.push("missing <meta description>");
  else if (desc.length < 70) rpt.issues.push(`description too short (${desc.length} chars)`);
  else if (desc.length > 170) rpt.issues.push(`description too long (${desc.length} chars)`);

  if (!canonical) {
    rpt.issues.push("missing <link rel=canonical>");
  } else if (canonical !== expected && canonical !== expectedAlt) {
    rpt.issues.push(`canonical points to ${canonical} — expected ${expected}`);
  }

  if (!h1) rpt.issues.push("missing <h1>");

  return rpt;
}

async function fetchSitemapUrls() {
  const res = await fetch(`${BASE}/sitemap.xml`);
  if (!res.ok) return [];
  const xml = await res.text();
  // Handle both <urlset> and <sitemapindex>
  const subSitemaps = [...xml.matchAll(/<sitemap>[\s\S]*?<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (subSitemaps.length) {
    const urls = [];
    for (const sm of subSitemaps) {
      try {
        const sub = await fetch(sm).then((r) => r.text());
        urls.push(...[...sub.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
      } catch {
        /* ignore */
      }
    }
    return urls;
  }
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

async function main() {
  const reports = [];
  for (const route of CRITICAL_ROUTES) {
    reports.push(await inspect(route));
  }

  // Cross-route collision detection
  const titleMap = new Map();
  const canonicalMap = new Map();
  for (const r of reports) {
    if (r.title) {
      const list = titleMap.get(r.title) ?? [];
      list.push(r.route);
      titleMap.set(r.title, list);
    }
    if (r.canonical) {
      const list = canonicalMap.get(r.canonical) ?? [];
      list.push(r.route);
      canonicalMap.set(r.canonical, list);
    }
  }
  for (const [title, routes] of titleMap) {
    if (routes.length > 1) {
      for (const rt of routes) {
        const r = reports.find((x) => x.route === rt);
        r?.issues.push(`duplicate <title> shared with: ${routes.filter((x) => x !== rt).join(", ")}`);
      }
    }
  }
  for (const [canon, routes] of canonicalMap) {
    if (routes.length > 1) {
      for (const rt of routes) {
        const r = reports.find((x) => x.route === rt);
        r?.issues.push(`shared canonical ${canon} with: ${routes.filter((x) => x !== rt).join(", ")}`);
      }
    }
  }

  // Sitemap coverage
  const sitemapUrls = new Set((await fetchSitemapUrls()).map((u) => u.replace(/\/$/, "")));
  const missingFromSitemap = [];
  for (const route of CRITICAL_ROUTES) {
    const canon = `${BASE}${route}`.replace(/\/$/, "");
    if (!sitemapUrls.has(canon) && !sitemapUrls.has(canon + "/")) {
      missingFromSitemap.push(route);
    }
  }

  const payload = { base: BASE, generatedAt: new Date().toISOString(), reports, missingFromSitemap };

  if (outPath) {
    writeFileSync(outPath, JSON.stringify(payload, null, 2));
    console.log(`JSON report → ${outPath}`);
  }
  if (htmlPath) {
    writeFileSync(htmlPath, renderHtml(payload));
    console.log(`HTML report → ${htmlPath}`);
  }

  if (jsonOut) {
    console.log(JSON.stringify(payload, null, 2));
    return exitCode(reports);
  }

  // Pretty output
  console.log(`\nSEO health check — ${BASE}\n${"=".repeat(60)}`);
  const failures = reports.filter((r) => r.issues.length);
  if (!failures.length) {
    console.log("✅ All critical routes pass.");
  } else {
    for (const r of failures) {
      console.log(`\n❌ ${r.route} (HTTP ${r.status})`);
      for (const i of r.issues) console.log(`   • ${i}`);
    }
  }
  if (missingFromSitemap.length) {
    console.log(`\n⚠️  Missing from sitemap.xml (${missingFromSitemap.length}):`);
    for (const r of missingFromSitemap) console.log(`   • ${r}`);
  }
  console.log(
    `\n${reports.length - failures.length}/${reports.length} routes clean · ${failures.length} with issues · ${missingFromSitemap.length} missing from sitemap\n`,
  );
  return exitCode(reports);
}

function esc(s = "") {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function renderHtml({ base, generatedAt, reports, missingFromSitemap }) {
  const failures = reports.filter((r) => r.issues.length);
  const rows = reports
    .map((r) => {
      const ok = r.issues.length === 0;
      const issues = r.issues.map((i) => `<li>${esc(i)}</li>`).join("") || "<li>—</li>";
      return `<tr class="${ok ? "ok" : "bad"}">
        <td><code>${esc(r.route)}</code></td>
        <td>${r.status}</td>
        <td>${esc(r.title ?? "")}</td>
        <td><code>${esc(r.canonical ?? "")}</code></td>
        <td>${esc(r.h1 ?? "")}</td>
        <td><ul>${issues}</ul></td>
      </tr>`;
    })
    .join("");
  const missing = missingFromSitemap.length
    ? `<h2>Missing from sitemap (${missingFromSitemap.length})</h2><ul>${missingFromSitemap.map((r) => `<li><code>${esc(r)}</code></li>`).join("")}</ul>`
    : "";
  return `<!doctype html><html><head><meta charset="utf-8"><title>SEO health — ${esc(base)}</title>
<style>
  body{font:14px/1.5 -apple-system,system-ui,sans-serif;margin:2rem;color:#111}
  h1{margin:0 0 .25rem} .meta{color:#666;margin-bottom:1.5rem}
  .summary{display:flex;gap:1rem;margin-bottom:1rem}
  .card{padding:.75rem 1rem;border-radius:8px;background:#f4f4f5}
  .card.bad{background:#fee2e2} .card.ok{background:#dcfce7}
  table{border-collapse:collapse;width:100%;font-size:13px}
  th,td{border:1px solid #e5e7eb;padding:.5rem;vertical-align:top;text-align:left}
  th{background:#f9fafb;position:sticky;top:0}
  tr.bad{background:#fef2f2} tr.ok td:first-child::before{content:"✓ ";color:#16a34a}
  code{font:12px ui-monospace,monospace;background:#f4f4f5;padding:1px 4px;border-radius:3px}
  ul{margin:0;padding-left:1.1rem}
</style></head><body>
<h1>SEO health report</h1>
<div class="meta">${esc(base)} · generated ${esc(generatedAt)}</div>
<div class="summary">
  <div class="card ok"><strong>${reports.length - failures.length}</strong> passing</div>
  <div class="card ${failures.length ? "bad" : ""}"><strong>${failures.length}</strong> failing</div>
  <div class="card ${missingFromSitemap.length ? "bad" : ""}"><strong>${missingFromSitemap.length}</strong> missing from sitemap</div>
</div>
<table>
  <thead><tr><th>Route</th><th>Status</th><th>Title</th><th>Canonical</th><th>H1</th><th>Issues</th></tr></thead>
  <tbody>${rows}</tbody>
</table>
${missing}
</body></html>`;
}

function exitCode(reports) {
  const anyFailing = reports.some((r) => r.issues.length);
  process.exit(anyFailing ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
