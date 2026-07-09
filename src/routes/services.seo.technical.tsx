import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../components/site/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd, type FAQ } from "../lib/seo";
import heroImg from "../assets/hero-seo-growth.jpg";

const FAQ_LIST: FAQ[] = [
  { q: "What is technical SEO for ecommerce?", a: "Everything that lets Google crawl, render and index your store — Core Web Vitals, crawl budget, faceted-nav indexing, canonicals, sitemaps, schema and JS rendering." },
  { q: "Do you fix Core Web Vitals?", a: "Yes — LCP, INP, CLS on mobile until they're green in field data (CrUX)." },
  { q: "Will you fix Shopify's duplicate URL issues?", a: "Yes — /products/ vs /collections/x/products/, ?variant params, faceted-nav pages and pagination." },
  { q: "What about JavaScript rendering?", a: "We audit render-blocking JS, hydration issues and pre-render hero content so Google sees it in the initial HTML." },
  { q: "Do you handle migrations?", a: "Yes — full technical migration plan with 301 mapping, staging QA and post-launch monitoring." },
];

export const Route = createFileRoute("/services/seo/technical")({
  head: () => ({
    meta: [
      { title: "Technical SEO Agency UK — Ecommerce Technical SEO Services | BeingEcom" },
      { name: "description", content: "Technical SEO for Shopify and WooCommerce in the UK. Core Web Vitals, crawl budget, faceted nav, schema and migration SEO — fixed properly." },
      { property: "og:title", content: "Technical SEO Agency UK — Ecommerce Technical SEO Services | BeingEcom" },
      { property: "og:description", content: "Technical SEO for Shopify and WooCommerce in the UK. Core Web Vitals, crawl budget, faceted nav, schema and migration SEO — fixed properly." },
      { property: "og:url", content: "https://beingecom.com/services/seo/technical" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://beingecom.com/services/seo/technical" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({ slug: "seo/technical", name: "Technical SEO", description: "Technical SEO for ecommerce — CWV, crawl, indexation, schema and migrations." })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Ecommerce SEO", path: "/services/seo" }, { name: "Technical SEO", path: "/services/seo/technical" }])) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQ_LIST, "/services/seo/technical")) },
    ],
  }),
  component: () => (
    <ServicePage cfg={{
      slug: "seo-technical",
      eyebrow: "Technical SEO",
      heroImage: heroImg,
      heroTitle: "A crawlable, fast, indexable store — the boring foundation that unlocks everything.",
      heroSub: "Technical SEO that turns Shopify and WooCommerce stores into machines Google can actually rank.",
      problemTitle: "Why technical debt caps ecommerce SEO.",
      problemBullets: [
        "Faceted-nav URLs wasting 60% of crawl budget.",
        "Red Core Web Vitals — mobile LCP over 4 seconds.",
        "Duplicate product URLs cannibalising each other.",
      ],
      whatIsTitle: "Technical SEO is force-multiplier work.",
      whatIsBody: "You can write the best content on earth — if Google can't crawl, render or trust your store, none of it ranks. We fix the plumbing so everything else compounds.",
      systemTitle: "Our technical SEO system.",
      systemSteps: [
        { title: "Crawl & log audit", body: "Screaming Frog + log-file analysis to find waste and orphans." },
        { title: "Index hygiene", body: "Canonicals, robots, noindex, faceted-nav and pagination cleanup." },
        { title: "Core Web Vitals", body: "LCP, INP and CLS fixed until CrUX turns green." },
        { title: "Schema & rendering", body: "JSON-LD across templates, JS render checks and pre-render where needed." },
      ],
      pillarsTitle: "Technical pillars.",
      pillars: [
        { title: "Crawl", body: "Budget, depth, orphans, redirects." },
        { title: "Index", body: "Canonicals, faceted nav, dupes." },
        { title: "Speed", body: "CWV, LCP, INP, CLS." },
        { title: "Schema", body: "Product, Review, FAQ, Breadcrumb, Org." },
      ],
      deepBlocks: [
        { title: "Log-file analysis", body: "See exactly which URLs Googlebot crawls and wastes budget on.", tags: ["Logs","Crawl","Budget"] },
        { title: "Faceted navigation", body: "Rules for filters, colours, sizes — indexable vs canonicalised.", tags: ["Facets","Canonical"] },
        { title: "Core Web Vitals", body: "Image, JS, CSS, font and third-party fixes until CrUX passes.", tags: ["LCP","INP","CLS"] },
        { title: "Duplicate content", body: "Product URL patterns, params, variants and pagination normalised.", tags: ["Params","Variants","Pagination"] },
        { title: "Migration SEO", body: "Full 301 map, staging QA, GSC handover, post-launch monitoring.", tags: ["301","Staging","GSC"] },
        { title: "Rendering & JS SEO", body: "SSR vs CSR audits, hydration issues, prerender for Google.", tags: ["SSR","Hydration","Prerender"] },
      ],
      triggersTitle: "Technical wins that show fast.",
      triggers: ["Green CWV","Zero 4xx in Frontier","Clean canonicals","Faceted-nav rules","Valid JSON-LD","Fast TTFB","No orphan URLs","Clean sitemap"],
      beforeAfter: {
        before: ["4.2s mobile LCP","Red CWV in CrUX","280k faceted URLs indexed","No schema"],
        after: ["1.4s mobile LCP","Green CWV in CrUX","12k clean URLs indexed","Product+Review+FAQ schema"],
      },
      caseStudy: {
        title: "Fashion brand: technical rebuild → +81% organic in 120 days",
        problem: "280k junk faceted URLs, mobile LCP 4.2s, no schema.",
        strategy: "Faceted-nav rules, image + JS cleanup, JSON-LD across templates.",
        result: "CWV green, crawl waste cut 92%, non-brand organic +81%.",
        metrics: [{ label: "Organic", value: "+81%" }, { label: "LCP", value: "1.4s" }, { label: "Crawl waste", value: "-92%" }],
      },
      ctaTitle: "Fix the technical debt capping your growth.",
      impactStats: [
        { value: "1.4s", label: "Mobile LCP" },
        { value: "-92%", label: "Crawl waste" },
        { value: "+81%", label: "Organic sessions" },
      ],
      metricBars: [
        { label: "Mobile LCP", before: 4.2, after: 1.4, unit: "s", description: "Largest Contentful Paint on mobile 4G." },
        { label: "Crawl waste", before: 100, after: 8, unit: "%", description: "Junk URLs as % of crawled URLs pre/post cleanup." },
        { label: "Indexed URLs", before: 280, after: 12, unit: "k", description: "Total indexed URLs — thinner, higher-quality index." },
        { label: "Non-brand organic", before: 100, after: 181, unit: "%", description: "Non-brand organic sessions vs baseline." },
      ],
      faqs: FAQ_LIST,
    }} />
  ),
});
