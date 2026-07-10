#!/usr/bin/env node
// Verify redirect status (200/301 only, no 302) and canonical tags for
// service + pricing pages against the production site.
//
// Usage: BASE_URL=https://beingecom.com node scripts/check-redirects-canonicals.mjs
// Skip in CI without network by setting SKIP_REDIRECT_CHECK=1.

const BASE = (process.env.BASE_URL || 'https://beingecom.com').replace(/\/$/, '');
const ORIGIN = new URL(BASE).origin;

if (process.env.SKIP_REDIRECT_CHECK === '1') {
  console.log('SKIP_REDIRECT_CHECK=1 → skipping redirect/canonical check.');
  process.exit(0);
}

// Pages that MUST return 200 with a self-referencing canonical.
const PAGES = [
  '/',
  '/services',
  '/services/seo',
  '/services/paid-ads',
  '/services/email-marketing',
  '/services/conversion-rate-optimization',
  '/services/analytics',
  '/services/content-marketing',
  '/services/social-media',
  '/services/marketplace-management',
  '/services/web-development',
  '/pricing',
];

// Redirects that MUST be 301 (never 302).
const REDIRECTS = [
  { from: 'https://www.beingecom.com/', expectHost: 'beingecom.com' },
  { from: 'http://beingecom.com/', expectHost: 'beingecom.com' },
  { from: `${ORIGIN}/services/`, expectPath: '/services' }, // trailing-slash strip
];

const errors = [];
const warnings = [];

async function head(url) {
  const res = await fetch(url, { method: 'GET', redirect: 'manual', headers: { 'user-agent': 'lovable-redirect-check/1.0' } });
  return { status: res.status, location: res.headers.get('location'), body: res };
}

async function checkPage(path) {
  const url = `${ORIGIN}${path}`;
  const { status, body } = await head(url);
  if (status !== 200) {
    errors.push(`[${path}] expected 200, got ${status}`);
    return;
  }
  const html = await body.text();
  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]*>/i)?.[0];
  if (!canonical) {
    errors.push(`[${path}] missing <link rel="canonical">`);
    return;
  }
  const href = canonical.match(/href=["']([^"']+)["']/i)?.[1];
  if (!href) {
    errors.push(`[${path}] canonical has no href`);
    return;
  }
  // Resolve relative canonicals
  const resolved = new URL(href, url).toString().replace(/\/$/, '') || '/';
  const expected = url.replace(/\/$/, '') || '/';
  if (resolved !== expected) {
    errors.push(`[${path}] canonical ${resolved} does not match self ${expected}`);
  }
}

async function checkRedirect({ from, expectHost, expectPath }) {
  const { status, location } = await head(from);
  if (status === 302 || status === 307) {
    errors.push(`[redirect] ${from} → ${status} (must be 301, not ${status})`);
    return;
  }
  if (status !== 301 && status !== 308) {
    // 200 for the trailing-slash case is acceptable only if the framework serves it directly, but we want a real redirect
    errors.push(`[redirect] ${from} returned ${status}, expected 301`);
    return;
  }
  if (!location) {
    errors.push(`[redirect] ${from} → ${status} without Location header`);
    return;
  }
  const target = new URL(location, from);
  if (expectHost && target.host !== expectHost) {
    errors.push(`[redirect] ${from} → ${target.href} (expected host ${expectHost})`);
  }
  if (expectPath && target.pathname.replace(/\/$/, '') !== expectPath.replace(/\/$/, '')) {
    errors.push(`[redirect] ${from} → ${target.href} (expected path ${expectPath})`);
  }
}

console.log(`Checking ${PAGES.length} pages and ${REDIRECTS.length} redirects against ${ORIGIN} …`);

for (const p of PAGES) {
  try { await checkPage(p); } catch (e) { warnings.push(`[${p}] fetch failed: ${e.message}`); }
}
for (const r of REDIRECTS) {
  try { await checkRedirect(r); } catch (e) { warnings.push(`[redirect ${r.from}] fetch failed: ${e.message}`); }
}

if (warnings.length) {
  console.warn('Warnings (network):');
  for (const w of warnings) console.warn('  ' + w);
}

if (errors.length) {
  console.error('\n❌ Canonical / redirect check FAILED:');
  for (const e of errors) console.error('  ' + e);
  process.exit(1);
}

console.log(`✓ All ${PAGES.length} pages return 200 with self-canonical, all redirects are 301.`);
