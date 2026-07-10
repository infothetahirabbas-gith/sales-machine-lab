## Company Hub — Build Plan

Create a new **Company** section: a nav dropdown + 14 new authoritative pages, wired into sitemap, footer, and schema. About Us / Contact are left untouched.

### 1. Navigation & Config

- New file `src/config/company.ts` — single source of truth for the 15 Company links (label, URL, blurb, icon key). Every menu/footer/hub imports from here.
- Update `src/components/site/Header.tsx` — add a **Company** dropdown between existing top-level items (Services, Industries, Locations, Company, Blog, Contact). Mobile drawer gets a collapsible Company group.
- Update `src/components/site/Footer.tsx` — add a Company column listing all 15 links.

### 2. Route Files (TanStack Start, flat dot-convention)

Create under `src/routes/`:

```
company.tsx                    → /company            (hub landing, lists all 15 with cards)
company.founder.tsx            → /company/founder    (Meet the Founder — Tahir Abbas)
company.team.tsx               → /company/team
company.careers.tsx            → /company/careers
company.methodology.tsx        → /company/methodology
company.industries.tsx         → /company/industries (links to existing /industries/* leaves)
company.why-us.tsx             → /company/why-us
company.technology.tsx         → /company/technology
company.certifications.tsx     → /company/certifications
company.success-stories.tsx    → /company/success-stories (links to /case-studies/*)
company.reviews.tsx            → /company/reviews
company.press.tsx              → /company/press
company.community.tsx          → /company/community
company.resources.tsx          → /company/resources
company.legal.tsx              → /company/legal      (index linking to /privacy, /terms, /cookies + new /accessibility, /disclaimer, /gdpr)
```

Plus three tiny legal leaves not yet in the tree:
```
accessibility.tsx, disclaimer.tsx, gdpr.tsx
```

The About Us page already lives at `/about` — leave as-is; the Company dropdown links to it directly.

### 3. Shared page primitive

New `src/components/site/CompanyPage.tsx` — reusable layout consumed by all 14 leaves:
- Breadcrumb (Home → Company → Page)
- Hero (H1, intro paragraph, meta line: "Last updated · reading time · author")
- Sticky TOC on desktop
- Sectioned long-form body with H2/H3, bullet lists, `<table>` blocks (AI-parseable)
- FAQ section (accordion) driven by `FAQ_LIST`
- CTA card (audit + contact)
- "Related in Company" strip (auto-pulled from `company.ts`, excluding self)
- JSON-LD scripts: `WebPage` + `BreadcrumbList` + `FAQPage` on every page; extra types per page (Person on founder, Organization+ProfessionalService on why-us, ItemList on industries/team/technology/certifications, CollectionPage on hub/success-stories/resources, Article on methodology).

### 4. Head metadata per page

Every leaf sets in its own `head()`:
- Unique `title` (≤60 chars, keyword-led)
- `description` (≤160)
- `og:title`, `og:description`, `og:type` (`website` for hubs, `profile` for founder, `article` for methodology)
- `og:url` self-referential
- `twitter:card = summary_large_image`
- `<link rel="canonical">` self-referential (leaf only, per project head-meta rules)

### 5. Content depth (per page — hand-written, no AI fluff)

Each page ships with 900–1500 words of original copy, 4–6 sectioned blocks, 5–8 FAQs, at least one table or comparison list, and 3–6 internal links to services / industries / case studies / other Company pages. Highlights:

- **Founder** — Tahir Abbas bio, 8-stage career timeline table, expertise matrix (SEO / Paid / CRO / AI), speaking + publications list, Person schema with `sameAs` LinkedIn/X.
- **Team** — role families with counts, seniority mix table, culture pillars, hiring bar.
- **Careers** — perks grid, hiring stages, current openings list (data-driven from array; empty state = "no active roles" CTA to talent pool).
- **Methodology** — 13-phase framework table + timeline diagram (ASCII/SVG), each phase 60–100 words.
- **Industries** — 12 industry cards (Fashion, Beauty, Health, Jewelry, Home, Furniture, Electronics, Food, Pet, Luxury, Automotive, B2B) each linking to `/industries/{slug}`, plus challenges/solutions bullets.
- **Why Choose Us** — 8 differentiators, side-by-side "us vs typical agency" table, proof stats pulled from `SITE_STATS`.
- **Technology Stack** — categorized grid (Ecom platforms / Analytics / Ads / Email / SEO / AI / Automation), each with 1-line "why we use it".
- **Certifications & Partnerships** — grouped list (Google, Meta, Shopify, WooCommerce, HubSpot, memberships), disclaimer that logos are property of owners.
- **Client Success Stories** — hub linking to existing `/case-studies/*`, sortable by industry/service; CollectionPage schema.
- **Reviews & Testimonials** — pull 6–8 real quotes from existing case-studies where present + placeholder-safe review count; AggregateRating schema only if user later confirms real ratings — otherwise omit AggregateRating (avoids fake stars).
- **Media & Press** — press mentions list, podcast appearances, guest posts (starter set, easy to extend).
- **Community & Events** — workshops, webinars, upcoming/past events table.
- **Resources & Downloads** — links to existing `/blog`, `/glossary`, and 6–8 gated/free download cards (link out to `/contact` if asset doesn't exist yet, no fake PDFs).
- **Legal & Policies** — index of `/privacy`, `/terms`, `/cookies`, new `/accessibility`, `/disclaimer`, `/gdpr`. The three new legal pages get real, review-safe content sourced from `src/lib/seo.ts` ORG_INFO.

### 6. Sitemaps

- New `src/routes/sitemap-company[.]xml.ts` emitting all 15 Company URLs + 3 new legal URLs.
- Update `src/routes/sitemap[.]xml.ts` (index) to reference the new sitemap.

### 7. Guards & validation

- Extend `scripts/check-parity.mjs` (or add `scripts/check-company-parity.mjs`) to assert every `company.ts` entry has a matching route file and appears in Header + Footer + hub page.
- Reuse the existing `scripts/validate-service-schemas.mjs` pattern with a Company variant that checks BreadcrumbList + FAQPage JSON-LD emitted on every `/company/*` route.

### 8. Performance guardrails

Follow the recent LCP work: no hero image preloads on Company pages, `content-visibility: auto` on below-fold sections, defer any icon libraries, no client-side effects on first paint. Company pages are text-heavy — ideal for the inlined critical CSS path already set up in `__root.tsx`.

### 9. What I will NOT do

- Not touch `/about` or `/contact` (already done).
- Not fabricate client logos, Google/Meta partner badges, review counts, or press quotes. Where a real asset is missing, the section renders a labelled placeholder + CTA rather than a fake claim (per the trust-page guidance).
- Not add heavy JS — no carousels/animation libs on these routes.

### 10. Delivery order

1. `company.ts` config + Header + Footer wiring + `CompanyPage.tsx` primitive.
2. Hub `company.tsx` + `company.founder.tsx` + `company.why-us.tsx` + `company.methodology.tsx` (the 4 highest-authority pages).
3. Remaining 10 leaves in parallel batches.
4. Sitemap file + sitemap index update.
5. Parity + schema validators.
6. Manual verify: build passes, `/company` renders, dropdown works on mobile+desktop, one leaf's JSON-LD parses via Rich Results test URL.

Approve and I'll start with step 1.
