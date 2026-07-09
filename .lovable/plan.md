## Goal

Rebuild all 27 service pages (10 top-level + 17 sub-services) to hit the 25-section, CRO+SEO+E-E-A-T spec — without exploding maintenance. Approach agreed with you: keep `ServicePage` as the schema-driven template, extend its section vocabulary, then write richer content configs per page.

## Why phased

675 total sections (27 × 25) of high-quality, non-duplicated, non-fabricated copy is 4-6 focused turns of work. Trying to ship it all in one turn produces thin, repetitive filler — which is exactly what the brief bans. Phasing keeps every page truly distinct.

## Phase 1 (this turn) — Component + first 3 pages

1. **Extend `src/components/site/ServicePage.tsx`** with new optional sections, each rendered only if the config supplies data:
   - `trustBar` — logo/metric strip
   - `industryImpact` — vertical-specific pain × outcome grid
   - `roiCalculator` — inline interactive (reuses `RevenueLossCalculator` pattern)
   - `deliverables` — checklist card
   - `timeline` — week-by-week rollout
   - `techStack` — tools/platforms grid
   - `industries` — verticals we serve (links to `/industries/$slug`)
   - `comparisonTable` — us vs typical agency vs in-house
   - `mistakes` — "5 mistakes killing your X" list
   - `packages` — 3 tiers (link to `/pricing`)
   - `midCta` blocks — placeable between any two sections
   - `testimonialsBlock` — 2-3 quotes (from real case studies only)
   - `resources` — related blog + case-study + service links
2. **Ship expanded configs for 3 flagship pages** as the reference bar:
   - `/services/seo`
   - `/services/performance-marketing`
   - `/services/cro`
3. Verify build + parity + a11y-sweep passes on the 3 pages.

## Phase 2 (next turn) — Remaining 7 top-level services

CRO, Creative, Email/SMS, AI Automation, Funnel, Analytics, Scaling, Store Development. Same 25-section spec, unique copy, unique FAQs, unique case study per page.

## Phase 3 — Performance Marketing sub-services (6 pages)

Facebook / Instagram / TikTok / Google / YouTube / Media Buying — each gets the expanded config.

## Phase 4 — SEO sub-services (6 pages)

On-page / Off-page / Technical / Local / AEO / International.

## Phase 5 — Store Dev sub-services (2 pages)

Shopify / WooCommerce. Then final sweep: parity, JSON-LD validation, Lighthouse.

## Guardrails (apply every phase)

- **No fabricated metrics.** All numbers come from `SITE_STATS`, real case studies in `case-studies.index.tsx`, or realistic-range examples clearly framed as ranges ("typically 2-4×"), never invented client names or £ figures.
- **UK English.** Optimisation, personalisation, etc. Parity check already enforces.
- **Unique per page.** Each page gets its own hero angle, its own case-study callout, its own FAQ set, its own mistakes list, its own comparison rows. Shared *primitives*, unique *composition*.
- **CTAs.** Every page has hero CTA + 3-4 mid-page CTAs + final CTA, each with primary + secondary + trust line.
- **Internal linking.** Every page links to: 2-3 related services, 1-2 industries, 1-2 case studies, `/pricing`, `/audit`, `/contact`.
- **Schema.** Each page emits Service + Breadcrumb + FAQPage JSON-LD (already wired). No changes needed.
- **A11y.** Reuse existing accessible primitives, no new custom widgets.

## Non-goals

- No new design system tokens.
- No new routes.
- No rewriting `/industries` or `/case-studies`.
- No Lighthouse re-run this phase (kept for Phase 5 final sweep).
- No copy sign-off gate between phases — you asked "I write, you approve after", so I ship each phase and you flag anything to change.

## Deliverable this turn

Extended `ServicePage.tsx` + 3 reference pages (`seo`, `performance-marketing`, `cro`) hitting the full 25-section spec, all builds green.