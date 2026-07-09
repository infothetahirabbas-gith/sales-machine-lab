# Verification-pass fixes — one source of truth

Everything below fixes the root cause in a shared component or config; individual pages then inherit. No page-level hardcoded values.

## What I already verified is fixed (no action needed)
- Contact page uses `£48M+` (not `$48M+`) — line 115 of `src/routes/contact.tsx`. The audit report is stale on this one; I'll re-verify the DOM after deploy.
- Footer contact block already reads from `SITE` (address, email, phone, socials).
- Homepage currency is £ throughout.

## Batch 1 — Service taxonomy (one canonical list)

Root cause: Header, Footer, homepage, and `services.index` each hold their own array. Fix by creating a single source.

- New `src/config/services.ts` exporting `SERVICES` with `{ slug, path, label, shortLabel, tagline, Icon, group, children? }` for all 9 top-level services + SEO/Perf/Store children.
- Canonical labels (UK English, one name everywhere):
  - Ecommerce SEO
  - Performance Marketing
  - Store Development
  - Conversion Rate Optimisation
  - Creative Production *(renamed from "Creative Testing" in Header)*
  - Email Marketing Automation
  - AI Automation
  - Funnel & Landing Pages
  - Analytics & Tracking
  - Scaling & Retention
- Refactor `Header.tsx`, `Footer.tsx`, `src/routes/index.tsx` services grid, `services.index.tsx`, breadcrumbs, and `RelatedServices` component to import from `SERVICES`. Homepage grid shows all 10 (adds AI Automation card — currently missing).
- Update sitemap + `organizationJsonLd.serviceCatalog` to iterate `SERVICES`.

## Batch 2 — Testimonials (component, not page)

Root cause: homepage `Section` inlines a marquee that duplicates the array with `Array.from({length:2}).flatMap(...)` and exposes both copies to the a11y tree, so screen readers and crawlers see every quote twice.

- Extract to `src/components/site/TestimonialsMarquee.tsx` reading from `src/config/testimonials.ts` (single array of quotes).
- Render two tracks: first with real content, second with `aria-hidden="true"` + `data-nosnippet` and every focusable stripped, so the visual loop continues but a11y/SEO see the list once.
- Wrap the whole marquee in a `<ul role="list">`, each quote as `<li>` with a `<blockquote>` + `<figcaption>`.
- Reuse the same component on any other page that shows testimonials.

## Batch 3 — Revenue chart (`GrowthChart.tsx`)

Root cause: axis label built as `{t}{v.yLabel}` so `£K` becomes `100£K`. X labels also render in a single line with no spacing on narrow SVG viewBox.

- Add `formatTick(value, unit)` that puts currency prefix before the number (`£100K`, `£75K`, `88%`, `4.2×`) and unit suffix after non-currency units.
- Give the SVG `preserveAspectRatio="xMidYMid meet"` and add `<title>`/`<desc>` for a11y (chart already has `role="img" aria-label` — extend with description of the trend).
- Bump `PAD_L` to fit `£100K`, right-align tick text at `PAD_L - 6`.
- Show every 3rd x-tick on `<640px` viewports via a `useMediaQuery`-free approach: emit both label sets and toggle via CSS `.hidden md:inline`.

## Batch 4 — Global stats config

Root cause: numbers duplicated across `src/lib/stats.ts`, `ServicePage.tsx`, `contact.tsx`, other pages.

- Extend `src/lib/stats.ts` (already exports `HERO_STATS` + `trackedRevenue`) into a full `SITE_STATS` object: tracked revenue, brands scaled, case studies, ad spend, average ROAS, retention.
- Refactor `ServicePage`, `contact.tsx`, `about.tsx`, homepage bento to import from `SITE_STATS`. No page keeps its own literal.

## Batch 5 — Industry taxonomy alignment

Root cause: `INDUSTRIES` in `locations-industries.ts` has 12 entries; `case-studies.index.tsx` only maps 8; nav dropdown hardcodes its own list.

- Make `INDUSTRIES` the single source. Header industry dropdown iterates it (currently hardcoded 12 entries — replace with `INDUSTRIES.map`).
- Add one illustrative case-study card per missing industry (Electronics & Technology, Sports & Fitness, Baby & Kids, Health & Wellness, Arts/Prints/Stationery) using the "representative anonymised UK engagement" wording.
- Add `industrySlug` on each case-study entry and filter case-studies by slug on `/industries/$slug` for real cross-linking.

## Batch 6 — Footer positioning + org narrative

Root cause: Footer shows "Remote • Global" tag above the London address, contradicting itself.

- Replace "Remote • Global" chip with a single line: "Headquartered in London — remote team serving UK & global DTC brands." Same line reused on About hero and Contact hero via `SITE.positioning`.
- Update `organizationJsonLd` in `src/lib/seo.ts` to include `areaServed: ["GB","EU","US","AE"]` and keep the London `PostalAddress`.

## Batch 7 — QA sweep

- Playwright script hits homepage, contact, pricing, about, /services, /services/seo, /industries, /industries/fashion-apparel, /case-studies, /audit at 375×812 + 1280×800. Screenshots + `grep` DOM for `$`, `Creative Testing`, `Conversion Optimization`, duplicate quote text, `100£K`. Any hit → open ticket.
- Re-run typecheck (auto).
- Trigger fresh SEO scan at the end.

## Files touched

```text
src/config/services.ts               (new)
src/config/testimonials.ts           (new)
src/components/site/TestimonialsMarquee.tsx (new)
src/lib/stats.ts                     (expand)
src/lib/seo.ts                       (org schema + services from config)
src/lib/locations-industries.ts      (add industrySlug hooks)
src/components/site/GrowthChart.tsx  (label + a11y)
src/components/site/Header.tsx       (import SERVICES + INDUSTRIES)
src/components/site/Footer.tsx       (SERVICES + SITE.positioning)
src/components/site/ServicePage.tsx  (SITE_STATS)
src/components/site/RelatedServices.tsx (SERVICES)
src/routes/index.tsx                 (SERVICES + TestimonialsMarquee + SITE_STATS)
src/routes/services.index.tsx        (SERVICES)
src/routes/contact.tsx               (SITE_STATS + SITE.positioning)
src/routes/about.tsx                 (SITE_STATS + SITE.positioning)
src/routes/case-studies.index.tsx    (add 5 industry cards + industrySlug)
src/routes/industries.$slug.tsx      (filter case studies by industrySlug)
public/sitemap.xml                   (regen from SERVICES + INDUSTRIES)
```

## Batch order + gating

Batches are independent enough to ship in one pass, but I'll commit in order 1 → 2 → 3 → 4 → 5 → 6 → 7 so each intermediate build is green. Total: ~17 files touched, all root-cause fixes, no per-page patches.

**Confirm** and I'll execute all 7 batches, then run the Playwright sweep and post a before/after report.