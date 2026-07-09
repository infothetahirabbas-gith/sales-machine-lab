import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../components/site/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd, type FAQ } from "../lib/seo";
import heroImg from "../assets/hero-seo-growth.jpg";

const FAQ_LIST: FAQ[] = [
  { q: "What does on-page SEO cover for an ecommerce store?", a: "Title tags, meta descriptions, H-structure, unique product/collection copy, internal linking, image alts and Product/Review/FAQ schema - the on-site levers Google actually ranks." },
  { q: "How long until on-page changes move rankings?", a: "Most product and collection pages move within 4–8 weeks once titles, schema and internal links are rebuilt cleanly." },
  { q: "Do you rewrite product descriptions?", a: "Yes - unique, buyer-intent copy with USPs, FAQs and schema, not manufacturer boilerplate." },
  { q: "Will you fix duplicate collection and filter pages?", a: "Yes - canonicalisation, faceted-nav rules and unique intros so collections stop cannibalising each other." },
  { q: "Do you handle Shopify and WooCommerce equally?", a: "Yes - Shopify metafields/OS 2.0 and WooCommerce/Yoast/RankMath, both to the same standard." },
];

export const Route = createFileRoute("/services/seo/on-page")({
  head: () => ({
    meta: [
      { title: "On-Page SEO Services UK - Ecommerce On-Page Optimisation | BeingEcom" },
      { name: "description", content: "On-page SEO for Shopify and WooCommerce stores. Titles, metas, schema, unique product & collection copy and internal linking that ranks in the UK." },
      { property: "og:title", content: "On-Page SEO Services UK - Ecommerce On-Page Optimisation | BeingEcom" },
      { property: "og:description", content: "On-page SEO for Shopify and WooCommerce stores. Titles, metas, schema, unique product & collection copy and internal linking that ranks in the UK." },
      { property: "og:url", content: "https://beingecom.com/services/seo/on-page" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://beingecom.com/services/seo/on-page" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({ slug: "seo/on-page", name: "On-Page SEO", description: "On-page SEO for ecommerce - titles, metas, schema, copy and internal linking." })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Ecommerce SEO", path: "/services/seo" }, { name: "On-Page SEO", path: "/services/seo/on-page" }])) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQ_LIST, "/services/seo/on-page")) },
    ],
  }),
  component: () => (
    <ServicePage cfg={{
      slug: "seo-on-page",
      eyebrow: "On-Page SEO",
      heroImage: heroImg,
      heroTitle: "Rank every product and collection you already own.",
      heroSub: "On-page SEO that turns thin product pages into ranking, converting assets - titles, schema, copy and internal links, done properly.",
      problemTitle: "Why on-page SEO quietly kills ecommerce rankings.",
      problemBullets: [
        "Product titles that read 'Buy Now - Free Shipping' instead of the keyword.",
        "Manufacturer copy pasted on 400 PDPs - duplicate content everywhere.",
        "Zero Product/Review/FAQ schema, so no rich snippets in the SERP.",
      ],
      whatIsTitle: "On-page SEO is where ecommerce wins are cheapest.",
      whatIsBody: "You already have the pages. On-page fixes turn existing product and collection URLs into ranking, click-worthy results - no new content required for the first wave of wins.",
      systemTitle: "Our on-page system.",
      systemSteps: [
        { title: "Template audit", body: "PDP, PLP, blog and static templates scored against a 40-point checklist." },
        { title: "Titles & metas", body: "Rewritten at scale with intent, brand and CTR modifiers." },
        { title: "Content & schema", body: "Unique copy blocks, FAQs, Product/Review schema on every PDP." },
        { title: "Internal linking", body: "Collection ↔ PDP ↔ blog links wired for topical authority." },
      ],
      pillarsTitle: "Pillars of on-page SEO.",
      pillars: [
        { title: "Templates", body: "Fix once, rank everywhere." },
        { title: "Copy", body: "Unique, intent-led, benefits-first." },
        { title: "Schema", body: "Product, Review, FAQ, Breadcrumb, Organization." },
        { title: "Links", body: "Anchor-rich internal links between hubs." },
      ],
      deepBlocks: [
        { title: "Title & meta rewrites", body: "Bulk-generated, CTR-tested titles and metas across PDPs, collections and blog.", tags: ["CTR","Intent","Bulk"] },
        { title: "PDP content blocks", body: "USPs, FAQs, size/spec, comparison - unique blocks per product.", tags: ["USPs","FAQ","Spec"] },
        { title: "Collection intros & outros", body: "Above and below the grid - intent-matched copy Google can rank.", tags: ["Intro","Outro","Intent"] },
        { title: "Schema markup", body: "Product, AggregateRating, Review, FAQ, Breadcrumb, Organization JSON-LD.", tags: ["JSON-LD","Rich results"] },
        { title: "Image SEO", body: "Alt text, filenames, next-gen formats, responsive srcset.", tags: ["Alt","WebP","Srcset"] },
        { title: "Internal linking", body: "Contextual anchors, hub-and-spoke links, orphaned-page rescue.", tags: ["Anchors","Hubs","Orphans"] },
      ],
      triggersTitle: "On-page elements that move CTR.",
      triggers: ["Keyword in title","Brand in title","Modifiers (best, cheap, UK)","Emoji-free meta","FAQ rich result","Review stars","Breadcrumbs","Sitelinks"],
      beforeAfter: {
        before: ["Generic titles across 400 PDPs","Duplicate manufacturer copy","No schema","No internal links from blog"],
        after: ["Intent-led titles per PDP","Unique USP + FAQ blocks","Product/Review/FAQ schema live","Hub blogs linking to collections"],
      },
      caseStudy: {
        title: "Home goods brand: on-page-only lift of 62% organic",
        problem: "300 PDPs with duplicate copy, no schema, generic titles.",
        strategy: "Bulk title rewrites, unique USP+FAQ blocks, Product+Review schema, internal linking.",
        result: "Organic sessions +62%, PDP-driven revenue +48% in 90 days - no new content.",
        metrics: [{ label: "Organic", value: "+62%" }, { label: "PDP revenue", value: "+48%" }, { label: "Days", value: "90" }],
      },
      ctaTitle: "Turn your existing pages into ranking assets.",
      impactStats: [
        { value: "+62%", label: "Organic sessions" },
        { value: "+38%", label: "SERP CTR" },
        { value: "90d", label: "Time to lift" },
      ],
      metricBars: [
        { label: "Organic sessions", before: 100, after: 162, unit: "%", description: "Indexed baseline vs 90 days post on-page rebuild." },
        { label: "SERP CTR", before: 1.6, after: 2.9, unit: "%", description: "Average CTR from Search Console after title/meta rewrites." },
        { label: "Pages with schema", before: 4, after: 100, unit: "%", description: "PDPs with valid Product + Review + FAQ JSON-LD." },
        { label: "Unique PDP copy", before: 12, after: 100, unit: "%", description: "PDPs with unique USP + FAQ blocks vs manufacturer text." },
      ],
      faqs: FAQ_LIST,
    }} />
  ),
});
