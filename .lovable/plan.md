## What this covers

Your site has ~55 indexable page templates across services, locations (dynamic), industries (dynamic), company, and commercial pages. Applying the full keyword framework (title, H1, first-100-words, supporting keyword mentions, "Best" variations, internal linking, FAQ tuning) to every one of those pages in a single turn would be a large, high-risk edit. I want to agree on the mapping and rollout order before touching files.

## Phase 1 — Master keyword map (no code yet)

I'll produce one canonical file, `src/lib/seo-keywords.ts`, that lists per-URL:

- Primary keyword
- 3–5 supporting variations (including a "Best …" variant on commercial pages)
- Suggested SEO title (`Primary | Secondary | BeingEcom`, ≤65 chars)
- Suggested meta description (≤160 chars)
- Suggested H1

Every subsequent page edit reads from this file, so there is one source of truth and zero cannibalisation.

## Phase 2 — Static commercial pages (highest priority, 12 files)

Apply title, description, H1, first-100-words rewrite, and 3 internal links (to sibling money pages) on:

```text
/                              Ecommerce Marketing Agency UK          (already done last turn)
/about                         Ecommerce Marketing Agency UK — About team
/contact                       Contact Ecommerce Marketing Agency UK
/pricing                       Ecommerce Marketing Agency Pricing UK
/case-studies                  Ecommerce Growth Case Studies UK
/services                      Ecommerce Services UK
/services/seo                  Ecommerce SEO Agency UK
/services/cro                  Ecommerce CRO Agency UK
/services/performance-marketing  Ecommerce PPC Agency UK
/services/store-development/shopify     Shopify Marketing Agency UK
/services/store-development/woocommerce WooCommerce Marketing Agency UK
/services/email-sms            Ecommerce Email Marketing Agency UK
```

## Phase 3 — Remaining service leaf pages (17 files)

Every `services.*.tsx` leaf gets its own primary keyword (e.g. `services/seo/local` → "Local Ecommerce SEO Agency UK", `services/performance-marketing/google-ads` → "Google Ads Agency for Ecommerce UK"). Same treatment as Phase 2 but scoped.

## Phase 4 — Dynamic templates (2 files, cover every location & industry)

`src/routes/locations.$slug.tsx` and `src/routes/industries.$slug.tsx` render N pages from a data file. I'll update:

- The `head()` builders so every location page uses `Ecommerce Agency {City}` / `Best Ecommerce Agency {City}` naturally in title, description, H1, first paragraph, and adds internal links to `London Shopify Agency`, `London Ecommerce SEO Agency`, `London PPC Agency` style siblings.
- Industry template so every niche uses `{Industry} Ecommerce Agency UK` as primary + the 5 supporting variations.

This one edit fans out to every city and industry page automatically.

## Phase 5 — Company sub-pages (12 files)

`company.team`, `company.founder`, `company.methodology`, `company.why-us`, etc. — each gets a targeted primary keyword (Team → "Ecommerce Experts UK", Founder → "Ecommerce Marketing Consultant UK", etc.) and title/description/H1 update.

## Phase 6 — Verification

I'll run:

1. `rg` audit — confirm every route's file contains its primary keyword in title, meta description, H1, and body copy.
2. `node scripts/validate-jsonld.mjs` — schema still valid.
3. `bun run build` (harness auto-runs) — no TS/route errors.
4. A small custom script that opens each route with Playwright headless, reads `<title>` and `<h1>`, and asserts the mapping matches `seo-keywords.ts`. Result printed as a table.

## Approvals I need from you

1. **Scope.** OK to touch ~44 route files across Phases 2–5? (Phase 1 = 1 new file, Phase 6 = read-only verification.)
2. **URLs.** Your prompt suggests new URLs like `/ecommerce-seo-agency/`, `/uk/london/ecommerce-agency/`, `/fashion-ecommerce-agency/`. The site already ships `/services/seo`, `/locations/london`, `/industries/fashion` — all indexed. Migrating URLs would need 301s, sitemap rewrites, and would lose current rankings. My recommendation: **keep current URLs, apply keyword targeting to them**. Confirm, or tell me to migrate.
3. **Rollout.** Ship all six phases in one go, or phase-by-phase so you can review each batch?

Once you confirm those three, I'll execute end-to-end and report the verification table.
