#!/usr/bin/env node
/**
 * Submit https://beingecom.com/sitemap.xml (and segment sitemaps) to Google
 * Search Console.
 *
 * Requires either:
 *   GSC_ACCESS_TOKEN  – a short-lived OAuth2 token with scope
 *                       https://www.googleapis.com/auth/webmasters
 *   GSC_SERVICE_ACCOUNT_JSON – path to a service-account key JSON file that
 *                       has been added as an Owner of the Search Console
 *                       property `https://beingecom.com/`.
 *
 * Steps run by this script:
 *   1. Fetch each sitemap URL directly and assert HTTP 200 + valid <urlset>.
 *   2. PUT each sitemap to the Search Console Sitemaps API:
 *        PUT /webmasters/v3/sites/{siteUrl}/sitemaps/{feedpath}
 *   3. GET each sitemap status back from the API and print warnings/errors.
 *
 * Run:  node scripts/submit-sitemap-to-gsc.mjs
 */
import { readFileSync } from "node:fs";

const SITE = "https://beingecom.com/";
const SITEMAPS = [
  "https://beingecom.com/sitemap.xml",
  "https://beingecom.com/sitemap-pages.xml",
  "https://beingecom.com/sitemap-services.xml",
];

const enc = encodeURIComponent;
const die = (m) => { console.error("✗ " + m); process.exit(1); };

// ---------- 1. Verify each sitemap is reachable + well-formed ----------
for (const url of SITEMAPS) {
  const r = await fetch(url, { redirect: "follow" });
  if (!r.ok) die(`Sitemap ${url} returned ${r.status}`);
  const body = await r.text();
  if (!/<urlset[\s>]/.test(body) && !/<sitemapindex[\s>]/.test(body))
    die(`Sitemap ${url} is not valid XML (missing <urlset>/<sitemapindex>)`);
  console.log(`✓ Fetched ${url} (${(body.length / 1024).toFixed(1)} KB)`);
}

// ---------- 2. Resolve an access token ----------
async function getAccessToken() {
  if (process.env.GSC_ACCESS_TOKEN) return process.env.GSC_ACCESS_TOKEN.trim();

  const saPath = process.env.GSC_SERVICE_ACCOUNT_JSON;
  if (!saPath) die("Set GSC_ACCESS_TOKEN or GSC_SERVICE_ACCOUNT_JSON before running.");
  const sa = JSON.parse(readFileSync(saPath, "utf8"));

  // Minimal JWT bearer flow (RFC 7523) — uses Web Crypto for RS256.
  const now = Math.floor(Date.now() / 1000);
  const header  = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/webmasters",
    aud: "https://oauth2.googleapis.com/token",
    iat: now, exp: now + 3600,
  };
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const unsigned = `${b64(header)}.${b64(payload)}`;

  const pem = sa.private_key.replace(/-----[^-]+-----|\s+/g, "");
  const keyBytes = Uint8Array.from(Buffer.from(pem, "base64"));
  const key = await crypto.subtle.importKey(
    "pkcs8", keyBytes,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"],
  );
  const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(unsigned));
  const jwt = `${unsigned}.${Buffer.from(sig).toString("base64url")}`;

  const tokenR = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  if (!tokenR.ok) die(`Token exchange failed: ${tokenR.status} ${await tokenR.text()}`);
  return (await tokenR.json()).access_token;
}

const token = await getAccessToken();
const auth  = { Authorization: `Bearer ${token}` };

// ---------- 3. PUT + GET each sitemap on the Search Console API ----------
let failed = 0;
for (const sm of SITEMAPS) {
  const submit = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${enc(SITE)}/sitemaps/${enc(sm)}`,
    { method: "PUT", headers: auth },
  );
  if (!submit.ok) {
    console.error(`✗ Submit ${sm} -> ${submit.status} ${await submit.text()}`);
    failed++;
    continue;
  }
  console.log(`✓ Submitted ${sm}`);

  const status = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${enc(SITE)}/sitemaps/${enc(sm)}`,
    { headers: auth },
  );
  if (status.ok) {
    const j = await status.json();
    console.log(`  ↳ lastDownloaded=${j.lastDownloaded ?? "—"} ` +
                `warnings=${j.warnings ?? 0} errors=${j.errors ?? 0} ` +
                `urls=${(j.contents ?? []).reduce((n, c) => n + Number(c.submitted ?? 0), 0)}`);
  }
}

process.exit(failed ? 1 : 0);
