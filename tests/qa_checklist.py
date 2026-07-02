#!/usr/bin/env python3
"""
Post-edit QA checklist. Crawls every page route against the running dev server
and asserts three site-wide invariants:

  1. Currency: no stray "$" in rendered text (British £ is the standard).
     Ignored: URLs, code/pre blocks, script/style, TanStack $-param names.
  2. Taxonomy: header/footer nav uses "Performance Marketing" and never the
     legacy "Paid Advertising" label. The /services/paid-ads legacy page is
     exempt (kept for backwards compatibility).
  3. Footer social links: LinkedIn (linkedin.com/company/beingecom),
     Instagram (instagram.com/beingecom), X (x.com/beingecom) present on
     every page.

Run: python3 tests/qa_checklist.py
Requires the dev server on http://localhost:8080.
"""
import asyncio, os, re, sys
from playwright.async_api import async_playwright

BASE = os.environ.get("BASE_URL", "http://localhost:8080")

ROUTES = [
    "/", "/about", "/services", "/services/seo", "/services/paid-ads",
    "/services/performance-marketing",
    "/services/performance-marketing/facebook-ads",
    "/services/performance-marketing/google-ads",
    "/services/performance-marketing/tiktok-ads",
    "/services/performance-marketing/media-buying",
    "/services/creative", "/services/cro", "/services/email-sms",
    "/services/funnel", "/services/scaling", "/services/analytics",
    "/services/ai-automation", "/services/store-development",
    "/case-studies", "/case-studies/s1", "/case-studies/a1",
    "/pricing", "/audit", "/contact", "/glossary",
    "/privacy", "/terms", "/cookies",
]

# "Paid Advertising" is allowed only on its legacy overview page.
PAID_ADVERTISING_ALLOWED = {"/services/paid-ads"}

failures: list[str] = []
def bad(route, msg): failures.append(f"[{route}] {msg}"); print(f"✗ [{route}] {msg}")
def ok(msg): print(f"✓ {msg}")

async def visible_text_and_html(page):
    return await page.evaluate("""() => {
      // Clone body, strip elements whose text should not be linted.
      const clone = document.body.cloneNode(true);
      clone.querySelectorAll('script,style,noscript,code,pre,svg').forEach(el => el.remove());
      return { text: clone.innerText, html: document.documentElement.outerHTML };
    }""")

def find_dollar_hits(text: str) -> list[str]:
    # Any $ followed by digit / k / M / whitespace-digit within visible text.
    return re.findall(r"\$\s?\d[\d,\.]*[kKmM]?|\$\s?\d", text)

async def check_route(page, route):
    resp = await page.goto(f"{BASE}{route}", wait_until="networkidle")
    if not resp or resp.status >= 400:
        bad(route, f"HTTP {resp.status if resp else 'no response'}"); return
    data = await visible_text_and_html(page)
    text, html = data["text"], data["html"]

    # 1. Currency
    hits = find_dollar_hits(text)
    if hits: bad(route, f"$ currency in visible text: {sorted(set(hits))[:5]}")

    # 2. Taxonomy — nav/header/footer regions
    header_footer = await page.evaluate("""() => {
      const parts = [];
      document.querySelectorAll('header, footer, nav').forEach(el => parts.push(el.innerText));
      return parts.join('\\n');
    }""")
    if "Performance Marketing" not in header_footer:
        bad(route, "'Performance Marketing' missing from header/footer/nav")
    if route not in PAID_ADVERTISING_ALLOWED and "Paid Advertising" in header_footer:
        bad(route, "Legacy 'Paid Advertising' label present in header/footer/nav")

    # 3. Footer socials
    for label, needle in [
        ("LinkedIn",  "linkedin.com/company/beingecom"),
        ("Instagram", "instagram.com/beingecom"),
        ("X",         "x.com/beingecom"),
    ]:
        if needle not in html:
            bad(route, f"Footer social link missing: {label} ({needle})")

async def main():
    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=True)
        ctx = await browser.new_context(viewport={"width": 1280, "height": 1800})
        page = await ctx.new_page()
        for r in ROUTES:
            try:
                await check_route(page, r)
                if not any(f.startswith(f"[{r}]") for f in failures):
                    ok(r)
            except Exception as e:
                bad(r, f"exception: {e}")
        await browser.close()

asyncio.run(main())

print("\n" + ("=" * 60))
if failures:
    print(f"{len(failures)} failure(s):")
    for f in failures: print(" -", f)
    sys.exit(1)
print(f"All {len(ROUTES)} routes passed the QA checklist.")
