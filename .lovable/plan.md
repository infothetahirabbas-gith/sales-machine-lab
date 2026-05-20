# Performance & SEO Hardening Pass

Goal: Push Lighthouse Performance and SEO as close to 100 as realistically achievable on mobile + desktop, verify every internal link works, and cut first-paint toward ~1s on a warm cache.

> Note: A literal "100/100" on every run isn't guaranteeable — scores depend on network, device, and third-party scripts. I'll target ≥95 on both categories and fix every actionable issue.

## 1. Audit (read-only, no code changes yet)

- Run the built-in SEO scanner (`seo_chat--trigger_scan`) and list findings.
- Crawl every route in `src/routes/` and:
  - Verify each `<Link to="...">` target resolves to an existing route file.
  - Verify each route has unique `head()` metadata (title, description, og:*).
  - Confirm JSON-LD renders on the routes it should.
- Run `browser--performance_profile` on `/`, `/services`, `/case-studies`, `/about`, `/audit`, `/contact` at mobile (390px) and desktop (1366px) viewports.
- Inventory images, fonts, and third-party scripts that block paint.

## 2. Performance fixes

- **Images**: convert hero/LCP images to AVIF+WebP via `vite-imagetools`, add explicit `width`/`height` to prevent CLS, mark non-LCP images `loading="lazy"` + `decoding="async"`.
- **LCP preload**: add `<link rel="preload" as="image" fetchpriority="high">` for each route's LCP image inside its `head().links`.
- **Fonts**: ensure `font-display: swap`, preconnect to font origin, subset where possible.
- **Code splitting**: confirm route components are not exported (TanStack auto-splits only non-exported components). Convert any oversized client component to a `.lazy.tsx` split.
- **Third-party scripts**: defer/async, or move below-the-fold.
- **Bundle**: check for accidental large imports (full lodash, full icon packs) and switch to per-file imports.

## 3. SEO fixes

- Per-route `head()` with unique title/description/og:title/og:description/og:image/twitter:image.
- Canonical link per route.
- Validate sitemap.xml index + per-section sitemaps return 200 and list every public route.
- Validate robots.txt references the sitemap.
- Validate all JSON-LD (Organization, FAQ, BreadcrumbList) with schema.org rules.
- Single `<h1>` per page, semantic heading order, descriptive `alt` text on every image, descriptive link text (no "click here").

## 4. Link & data integrity

- Script that walks every route, extracts every `<Link to>` / `<a href>`, and reports broken or missing targets.
- Spot-check each page renders all expected sections (no empty arrays, no missing copy).

## 5. Verify

- Re-run `browser--performance_profile` per route at both viewports, capture before/after.
- Re-run SEO scan, mark findings fixed.
- Report what improved and what's blocked by external factors (e.g. third-party embeds).

## What I need from you

1. Are there any **third-party scripts** (analytics, chat widget, pixel, embedded video) you require? Some can't be made fully non-blocking.
2. Any specific routes you've noticed feel slow or have wrong/missing data? That helps me prioritize.
3. OK to **remove or defer** anything purely decorative (large background videos, heavy animations on mobile) if it costs performance?

Once you confirm, I'll run the audit and start the fixes in batches so each step is reviewable.
