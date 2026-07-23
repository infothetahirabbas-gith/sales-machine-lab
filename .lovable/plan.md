# Phase 2: Topical Authority Clusters

Build 4 topical clusters, each with a pillar page (broad, ~2,500 words) plus 5 supporting articles (deep, ~1,200 words each) that interlink tightly. This gives Google clear topical ownership signals for our highest-commercial-intent themes.

## Cluster selection

Chosen to reinforce commercial pages already suffering low CTR / weak rankings from the last GSC pull:

1. **Ecommerce SEO for UK Shopify stores** — supports `/services/seo` + all city pages
2. **Paid media for UK DTC brands** — supports `/services/paid-ads` + `/services/performance-marketing/*`
3. **Conversion rate optimisation for ecommerce** — supports `/services/cro` + hub `/hub/cro`
4. **Ecommerce email & retention (Klaviyo)** — supports `/services/email-sms`

## Structure per cluster

```text
/hub/{pillar-slug}                   (existing pillar page — expand + link down)
  ├─ /blog/{cluster}-guide           (new: 2,500-word pillar article)
  ├─ /blog/{supporting-1}            (new: 1,200-word deep dive)
  ├─ /blog/{supporting-2}
  ├─ /blog/{supporting-3}
  ├─ /blog/{supporting-4}
  └─ /blog/{supporting-5}
```

Each supporting post links up to the pillar and sideways to 2 sibling posts. Pillar links down to all 5. Every post also links to the related commercial `/services/*` route.

## Deliverables

1. **Content data model**: extend `src/lib/blog-content.ts` (create if missing) with `cluster`, `pillarSlug`, `relatedPosts`, `relatedService` fields.
2. **Pillar + 20 supporting articles** as MDX-in-TSX under `src/routes/blog.$slug.tsx` (already dynamic).
3. **Cluster nav component** `src/components/site/ClusterNav.tsx` — renders "Part of the {cluster} guide" box with pillar + siblings.
4. **Schema**: `Article` + `BreadcrumbList` per post; `TechArticle` for how-to guides where appropriate.
5. **Sitemap**: update `src/routes/sitemap-pages[.]xml.ts` (or add `sitemap-blog.xml`) with all 24 new URLs and lastmod 2026-07-23.
6. **Internal links from commercial pages**: add "Deep dives" module on `/services/seo`, `/services/paid-ads`, `/services/cro`, `/services/email-sms` linking to that cluster's pillar + top 3 posts.
7. **Hub page expansion**: append "Full guide" CTA on the 4 supporting hub pages pointing to the pillar article.

## Titles (all UK-targeted, £/UK terminology)

Cluster 1 — Ecommerce SEO
- Pillar: The UK Ecommerce SEO Playbook for Shopify (2026)
- How to fix Shopify duplicate content and faceted URLs
- Product page SEO for UK Shopify stores
- Collection page SEO: templates that rank
- Technical SEO checklist for Shopify Plus
- Local SEO for multi-location UK ecommerce brands

Cluster 2 — Paid media
- Pillar: The UK DTC Paid Media Playbook (Meta + Google + TikTok)
- Meta Ads creative testing framework for UK DTC
- Google Shopping feed optimisation for Shopify UK
- TikTok Ads for UK beauty and fashion brands
- iOS 17 attribution: what UK ecommerce should do now
- MER vs ROAS: the metric UK DTC founders should track

Cluster 3 — CRO
- Pillar: Ecommerce CRO Playbook for UK Shopify Stores
- PDP CRO: 14 tests that move revenue
- Cart and checkout CRO for Shopify UK
- Mobile CRO: fixing the 68% mobile drop-off
- Site search CRO for UK ecommerce
- Trust signals that convert UK shoppers

Cluster 4 — Email & retention
- Pillar: Ecommerce Email & Retention Playbook (Klaviyo, UK)
- Klaviyo welcome flow: the UK DTC template
- Abandoned cart flows that recover 15%+
- Post-purchase flows for repeat revenue
- Winback flows for lapsed UK customers
- SMS + email: the UK compliance-safe combo

## Rollout order

1. Data model + `ClusterNav` component + one full cluster (Ecommerce SEO: pillar + 5 posts + linking).
2. Ship, then repeat for clusters 2, 3, 4 in that order.
3. After all 4 shipped: update all sitemaps + submit to GSC.

## Non-goals

- No new city/location pages (Phase 1 handled).
- No E-E-A-T author bios (that's Phase 4).
- No backlink outreach (Phase 7).
