#!/usr/bin/env python3
"""
Smoke tests:
  1. Floating WhatsApp button opens https://wa.me/447882743592 in a new tab
     with rel=noopener; wa.me responds 2xx/3xx.
  2. /case-studies and a sample /case-studies/{id} load every <img> with no
     4xx/5xx responses.

Run: python3 tests/smoke_whatsapp_and_case_study_images.py
Requires the dev server on http://localhost:8080 (already running in sandbox).
"""
import asyncio, os, re, sys, urllib.request
from playwright.async_api import async_playwright

BASE = os.environ.get("BASE_URL", "http://localhost:8080")
failures: list[str] = []

def ok(msg): print(f"✓ {msg}")
def bad(msg): failures.append(msg); print(f"✗ {msg}")

async def scroll_all(page):
    await page.evaluate("""async () => {
      await new Promise(res => {
        let y = 0;
        const step = () => {
          window.scrollTo(0, y += 500);
          if (y < document.body.scrollHeight) setTimeout(step, 80);
          else { window.scrollTo(0, 0); setTimeout(res, 500); }
        };
        step();
      });
    }""")

async def main():
    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=True)
        ctx = await browser.new_context(viewport={"width": 1280, "height": 1800})
        page = await ctx.new_page()

        bad_images: list[tuple[int, str, str]] = []
        def on_response(res):
            if res.request.resource_type == "image" and res.status >= 400:
                bad_images.append((res.status, res.url, page.url))
        page.on("response", on_response)

        # 1. WhatsApp
        await page.goto(f"{BASE}/", wait_until="domcontentloaded")
        wa = page.locator('a[aria-label="Chat with BeingEcom on WhatsApp"]').first
        if await wa.count() == 0:
            bad("WhatsApp floating button not present on homepage")
        else:
            href = await wa.get_attribute("href") or ""
            target = await wa.get_attribute("target") or ""
            rel = await wa.get_attribute("rel") or ""
            if not re.match(r"^https://wa\.me/447882743592(\?|$)", href):
                bad(f"WhatsApp href unexpected: {href}")
            else:
                ok(f"WhatsApp href → {href}")
            if target != "_blank": bad(f"WhatsApp target={target!r}, expected _blank")
            else: ok("WhatsApp opens in new tab")
            if "noopener" not in rel: bad(f"WhatsApp rel missing noopener: {rel!r}")
            else: ok("WhatsApp rel includes noopener")
            try:
                req = urllib.request.Request(href, method="GET",
                        headers={"User-Agent": "Mozilla/5.0 smoke-test"})
                with urllib.request.urlopen(req, timeout=10) as r:
                    if r.status >= 400: bad(f"wa.me returned {r.status}")
                    else: ok(f"wa.me reachable ({r.status})")
            except Exception as e:
                bad(f"wa.me fetch failed: {e}")

        # 2. Case studies images
        await page.goto(f"{BASE}/case-studies", wait_until="networkidle")
        await scroll_all(page)
        try: await page.wait_for_load_state("networkidle", timeout=5000)
        except Exception: pass
        idx_imgs = await page.locator("img").count()
        if idx_imgs == 0: bad("/case-studies has no <img> elements")
        else: ok(f"/case-studies rendered {idx_imgs} images")

        detail = await page.locator('a[href^="/case-studies/"]').first.get_attribute("href")
        if detail and detail != "/case-studies":
            await page.goto(f"{BASE}{detail}", wait_until="networkidle")
            await scroll_all(page)
            d_imgs = await page.locator("img").count()
            ok(f"{detail} rendered {d_imgs} images")

        if bad_images:
            for status, url, where in bad_images:
                bad(f"Image {status}: {url} (on {where})")
        else:
            ok("No image 404s across visited case study pages")

        await browser.close()

asyncio.run(main())

if failures:
    print(f"\n{len(failures)} failure(s)", file=sys.stderr)
    sys.exit(1)
print("\nAll smoke checks passed")
