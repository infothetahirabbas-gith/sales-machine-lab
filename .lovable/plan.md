# Site-wide consistency + governance pass

Five parallel workstreams, in dependency order. Each ships a concrete artifact and a re-run instruction so drift is catchable, not just fixable once.

## 1. Single source of truth for SERVICES + SITE_STATS

**New files**
- `src/config/services.ts` — canonical list of the 10 services. One record per service: `slug`, `to` (route path), `label` (canonical UK-English name), `shortLabel`, `blurb`, `tag`, `icon` key. Nested `children` for SEO / Performance Marketing / Store Dev sub-routes.
- `src/config/site-stats.ts` (extends existing `src/lib/stats.ts`) — one `SITE_STATS` object: `trackedRevenue: "£48M+"`, `brandsScaled: "120+"`, `caseStudies: "39"`, `adSpend`, `avgRoas`, `retentionLift`, plus a `HERO_STATS` array derived from it. All strings; currency prefix `£`.

**Files that switch to importing from those configs (no duplicate literals)**
- `src/components/site/Header.tsx` — replace hard-coded `services` array (lines 26–66).
- `src/components/site/Footer.tsx` — replace hard-coded `<Link>` list (lines 42–51).
- `src/routes/services.index.tsx` — replace `all` array; keep sub-service entries derived from `SERVICES[i].children`.
- `src/routes/index.tsx` — replace mid-page service grid (lines 66–70+).
- `src/components/site/WelcomeBanner.tsx`, `src/routes/$lang.$location.$industry.$service.tsx`, `src/lib/seo.ts` `organizationJsonLd` service offers.
- `src/components/site/ServicePage.tsx`, `src/routes/contact.tsx`, `src/routes/about.tsx` — swap `{v:"£48M+"}` literals for `SITE_STATS.trackedRevenue.v`.

## 2. Automated parity checks (guards against future drift)

**New file**: `src/config/__tests__/parity.test.ts` (Vitest — already in devDeps).

Tests:
- `SERVICES` slug list appears verbatim as `<Link to>` in Header source and Footer source (regex read of the files at test time).
- Every `SERVICES[i].label` appears in both Header and Footer source.
- No occurrence of "Creative Testing", "Conversion Optimization" (US), "Email Marketing"(without "Automation") anywhere under `src/routes/` or `src/components/`.
- No `\$\d` currency literal anywhere under `src/` except an allowlist (`useCountUp.tsx` comment, `store-audit.functions.ts` regex, `services.seo.international.tsx` copy about US market, `blog.$slug.tsx` prose, `api.chat.ts` system prompt).
- `INDUSTRIES` from `src/lib/locations-industries.ts` is a superset of every `industrySlug` used by case studies.

Run with `bunx vitest run src/config/__tests__/parity.test.ts`. Add npm script `parity` in `package.json`.

## 3. Schema audit + standardization

**New file**: `src/lib/schema.ts` — thin wrappers around existing helpers in `src/lib/seo.ts` so every route uses the same shape:
- `orgSchema()` — Organization + LocalBusiness combined (single graph object with `@id` self-references), used only in `__root.tsx`.
- `pageSchema({ url, breadcrumbs, faqs?, article? })` — always emits BreadcrumbList; optionally stacks Article / FAQPage / Service.
- `serviceSchema({ slug })` — pulls name/description from `SERVICES` config so schema name always matches the visible page.

**Audit + fix per route**:
| Route | Current | Fix |
|---|---|---|
| `__root.tsx` | Organization only | Combined Organization + LocalBusiness graph, `@id` self-references, `areaServed` from `SITE.positioning` |
| `services.*.tsx` (10) | `serviceJsonLd()` name literal | Call `serviceSchema({ slug })` — name is auto-pulled from SERVICES |
| `case-studies.$id.tsx` | Article + Breadcrumb + FAQ (good) | Add `image` absolute URL check |
| `industries.$slug.tsx` | Breadcrumb only | Add CollectionPage + BreadcrumbList |
| `locations.$slug.tsx` | LocalBusiness (duplicate of root) | Drop — root owns LocalBusiness; keep BreadcrumbList only |
| `blog.$slug.tsx` | Article | Verify `datePublished` + `author.@type` |
| `contact.tsx`, `about.tsx`, `pricing.tsx`, `audit.tsx` | Breadcrumb only | Add `WebPage` + `mainEntity` |

## 4. Industry taxonomy — `industrySlug` on case studies + filterable /industries/$slug

**Data change** in `src/routes/case-studies.index.tsx`:
Extend `Study` type with required `industrySlug: string` field. Map each of the 39 existing studies to a slug from the canonical `INDUSTRIES` list in `src/lib/locations-industries.ts` (`fashion-apparel`, `beauty-personal-care`, `electronics-technology`, `home-garden`, `food-beverage`, `health-wellness`, `sports-fitness`, `furniture-interiors`, `baby-kids`, `jewellery-watches`, `pets-supplies`, `arts-prints-stationery`).

Existing free-text `industry` field ("Shopify · Apparel") stays as display label — no visual regression.

**`src/routes/industries.$slug.tsx` rebuild** (only the case-study section — hero + copy blocks stay):
Replace hard-coded illustrative case-study cards with a filter over `studies.filter(s => s.industrySlug === params.slug)`. Empty-state card when an industry has no studies yet ("Playbook available on request"). Cards link to `/case-studies/$id`.

**`/case-studies` filter chip row**: add industry chip filter (search param) alongside category, driven from `INDUSTRIES`.

## 5. Accessibility + Lighthouse sweep

Playwright script `scripts/a11y-sweep.mjs` (new) that:
1. Iterates 8 key routes: `/`, `/services`, `/services/seo`, `/services/cro`, `/case-studies`, `/case-studies/a1`, `/industries/fashion-apparel`, `/contact`.
2. Runs `axe-core` (via CDN, no install) against each at 375×812 and 1280×800.
3. Screenshots each viewport.
4. Prints violation summary; exits non-zero on any critical/serious.

**Fix in same pass** (from prior audits, not yet re-verified):
- Icon-only buttons in `Header.tsx` mobile menu toggle, `CaseStudyExtras.tsx` prev/next testimonial buttons — verify `aria-label` present.
- `GrowthChart.tsx` — already has `role="img"` + `aria-label`; add `<title>` + `<desc>` inside `<svg>` for AT.
- CTA buttons that use `<a>` styled as buttons: ensure `role="button"` isn't misapplied; native `<a>` is correct.
- Focus-visible ring audit on `src/styles.css` — confirm `:focus-visible` selector present on all interactive tokens.

Lighthouse: run `bunx lighthouse http://localhost:8080 --preset=desktop --only-categories=accessibility,performance,seo,best-practices --output=json --output-path=/tmp/lh.json --chrome-flags="--headless"` for `/` and one leaf. Report scores; don't chase to 100 if the remaining diff is dev-server unminified-bundle noise.

---

## What ships in a single pass

- 3 new config files, 1 new schema helper, 1 new parity test, 1 new a11y script.
- ~15 files touched to switch to the shared imports.
- All case studies get `industrySlug`; `industries.$slug.tsx` filter section rebuilt.
- Playwright + Lighthouse run logs attached to the reply.

## Explicit non-goals (say the word to include)

- Rewriting `industry-content.ts` sub-industry blocks (10K+ lines of curated copy).
- Migrating the marquee to a non-cloned implementation (visual regression risk; clone is already `aria-hidden` for AT/crawlers).
- Adding a CI pipeline for the parity test (Lovable projects don't run one; the script is available via `bun run parity`).
- Rewriting `case-studies` fabricated-data disclaimer copy (was flagged in an earlier round but not in this ask).

## Technical notes

- Vitest is already installed. Parity test uses `fs.readFileSync` on source files — no rendering needed, so runs in <1s.
- Schema `@id` self-reference pattern: `{ "@id": "https://beingecom.com/#organization" }` so search engines merge Organization + LocalBusiness into one entity.
- Case-study `industrySlug` migration is additive (new required field); TypeScript will surface any missed studies at build time — that's the guard.
- `industries.$slug.tsx` filter is client-cheap: 39 studies × filter = trivial.

Awaiting approval — this touches ~25 files and adds guardrails, so I want confirmation before ripping the config shims across the codebase.
