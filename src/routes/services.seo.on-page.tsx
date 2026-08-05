import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../components/site/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd, type FAQ } from "../lib/seo";
import heroImg from "../assets/hero-seo-growth.jpg";

const FAQ_LIST: FAQ[] = [
  { q: "What does on-page SEO cover for an ecommerce store?", a: "Title tags, meta descriptions, H-structure, unique product/collection copy, internal linking, image alts and Product/Review/FAQ schema - the on-site levers Google actually ranks." },
  { q: "How long until on-page changes move rankings?", a: "Most product and collection pages move within 4-8 weeks once titles, schema and internal links are rebuilt cleanly." },
  { q: "Do you rewrite product descriptions?", a: "Yes - unique, buyer-intent copy with USPs, FAQs and schema, not manufacturer boilerplate." },
  { q: "Will you fix duplicate collection and filter pages?", a: "Yes - canonicalisation, faceted-nav rules and unique intros so collections stop cannibalising each other." },
  { q: "Do you handle Shopify and WooCommerce equally?", a: "Yes - Shopify metafields/OS 2.0 and WooCommerce/Yoast/RankMath, both to the same standard." },
  { q: "What makes BeingEcom a good choice for ecommerce on-page work?", a: "We're a specialist Ecommerce Marketing Agency UK. Every on-page rebuild is led by a senior UK SEO director who has shipped 7-figure Shopify and WooCommerce stores - not templated by a junior." },
  { q: "How do you approach product title tags?", a: "Buyer-intent modifier + product + brand + differentiator, tested for SERP CTR - not just keyword-stuffed. We A/B title formats at the template level." },
  { q: "Do you handle schema markup?", a: "Yes - Product, AggregateRating, Review, FAQ, HowTo, Breadcrumb and Organisation JSON-LD, validated in Google's Rich Results Test and monitored in Search Console." },
  { q: "How do you avoid keyword cannibalisation?", a: "We map every keyword to exactly one canonical URL, redirect or canonical the duplicates, and rewrite title/H1/copy so each page owns its intent." },
  { q: "Do you optimise images for SEO?", a: "Yes - descriptive filenames, keyword-aware alt text, WebP/AVIF conversion, responsive srcset and lazy loading. Images drive organic traffic through Google Images too." },
  { q: "What is a collection page intro and why does it matter?", a: "A 100-200 word above-the-fold or above-the-footer intro that gives Google unique, intent-matched copy to rank the category page - most Shopify stores skip this entirely." },
  { q: "How many URLs can you rewrite per month?", a: "Bulk on-page rebuilds routinely cover 200-2,000 URLs per month using Shopify metafields, WooCommerce ACF or bulk CSV workflows - senior-reviewed, never AI-spun." },
  { q: "Do you handle internal linking too?", a: "Yes - hub-and-spoke internal linking between collections, PDPs and blog hubs, plus orphan-page rescue and anchor diversification." },
  { q: "Will on-page SEO alone rank a new store?", a: "It's necessary but rarely sufficient. On-page + technical usually gets you into striking distance; authority (links) and content velocity finish the job. As an Ecommerce Growth Agency we sequence all three." },
  { q: "How does on-page SEO integrate with AI Overviews?", a: "FAQ + HowTo schema, direct-answer copy blocks and quotable definitions make PDPs and collection pages citable inside Google AI Overviews, ChatGPT and Perplexity." },
  { q: "Do you rework meta descriptions at scale?", a: "Yes - rewritten for CTR with brand, benefit and modifier, then monitored in Search Console. Higher CTR is a ranking factor Google won't admit but everyone measures." },
  { q: "Can you audit before we commit?", a: "Yes - free 40-point on-page audit across your top 50 URLs. You'll see exactly what's leaking before you spend a penny." },
];

export const Route = createFileRoute("/services/seo/on-page")({
  head: () => ({
    meta: [
      { title: "On-Page SEO Agency UK | Shopify Product & Category" },
      { name: "description", content: "Titles, schema, copy and internal links that rank Shopify and WooCommerce product and collection pages, built by senior UK ecommerce SEOs." },
      { property: "og:title", content: "On-Page SEO Agency UK | Shopify Product & Category" },
      { property: "og:description", content: "Titles, schema, copy and internal links that rank Shopify and WooCommerce product and collection pages, built by senior UK ecommerce SEOs." },
      { property: "og:url", content: "https://beingecom.com/services/seo/on-page" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://beingecom.com/services/seo/on-page" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({ slug: "seo/on-page", name: "On-Page SEO Agency UK", description: "On-page SEO for ecommerce - titles, metas, schema, copy and internal linking by a specialist UK Ecommerce SEO Agency." })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Ecommerce SEO", path: "/services/seo" }, { name: "On-Page SEO", path: "/services/seo/on-page" }])) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQ_LIST, "/services/seo/on-page")) },
    ],
  }),
  component: () => (
    <ServicePage cfg={{
      slug: "seo-on-page",
      eyebrow: "On-Page SEO Agency UK",
      heroImage: heroImg,
      heroTitle: "Specialist Ecommerce Agency UK for on-page SEO that ranks every product and collection you already own.",
      heroSub: "As a specialist UK ecommerce SEO agency, we turn thin product pages into ranking, converting assets - titles, schema, copy and internal links, done properly.",
      problemTitle: "Why on-page SEO quietly kills ecommerce rankings.",
      problemBullets: [
        "Product titles that read 'Buy Now - Free Shipping' instead of the keyword.",
        "Manufacturer copy pasted on 400 PDPs - duplicate content everywhere.",
        "Zero Product/Review/FAQ schema, so no rich snippets in the SERP.",
      ],
      whatIsTitle: "On-page SEO is where ecommerce wins are cheapest.",
      whatIsBody: "You already have the pages. As the specialist Ecommerce Growth Agency for on-page work, we turn existing product and collection URLs into ranking, click-worthy results - no new content required for the first wave of wins. Titles, schema, unique copy, internal links: fix the templates once, rank everywhere.",
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
        { title: "Schema", body: "Product, Review, FAQ, Breadcrumb, Organisation." },
        { title: "Links", body: "Anchor-rich internal links between hubs." },
      ],
      deepBlocks: [
        { title: "Title & meta rewrites", body: "Bulk-generated, CTR-tested titles and metas across PDPs, collections and blog.", tags: ["CTR","Intent","Bulk"] },
        { title: "PDP content blocks", body: "USPs, FAQs, size/spec, comparison - unique blocks per product.", tags: ["USPs","FAQ","Spec"] },
        { title: "Collection intros & outros", body: "Above and below the grid - intent-matched copy Google can rank.", tags: ["Intro","Outro","Intent"] },
        { title: "Schema markup", body: "Product, AggregateRating, Review, FAQ, Breadcrumb, Organisation JSON-LD.", tags: ["JSON-LD","Rich results"] },
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
      ctaTitle: "Turn your existing pages into ranking assets - with the specialist Ecommerce SEO Agency.",
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
      relatedServices: [
        { to: "/services/seo", title: "Ecommerce SEO", body: "The parent SEO service that houses on-page work inside a wider strategy." },
        { to: "/services/seo/technical", title: "Technical SEO", body: "Site speed, indexation and schema fixes that let on-page work rank." },
        { to: "/services/seo/off-page", title: "Off-Page SEO", body: "Editorial links that compound on-page rewrites into top-3 rankings." },
        { to: "/services/seo/aeo", title: "AEO / AI Search", body: "Turn on-page copy into AI-Overview-quotable answer blocks." },
        { to: "/services/cro", title: "Conversion Rate Optimisation", body: "Ranking is worthless if the page does not convert - CRO ships next." },
        { to: "/methodology", title: "The BeingEcom Growth System", body: "Where on-page rewrites sit in our 6-stage growth methodology." },
      ],
    }} />
  ),
});
