import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../components/site/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd, type FAQ } from "../lib/seo";
import heroImg from "../assets/hero-seo-growth.jpg";

const FAQ_LIST: FAQ[] = [
  { q: "What is technical SEO for ecommerce?", a: "Everything that lets Google crawl, render and index your store - Core Web Vitals, crawl budget, faceted-nav indexing, canonicals, sitemaps, schema and JS rendering." },
  { q: "Do you fix Core Web Vitals?", a: "Yes - LCP, INP, CLS on mobile until they're green in field data (CrUX)." },
  { q: "Will you fix Shopify's duplicate URL issues?", a: "Yes - /products/ vs /collections/x/products/, ?variant params, faceted-nav pages and pagination." },
  { q: "What about JavaScript rendering?", a: "We audit render-blocking JS, hydration issues and pre-render hero content so Google sees it in the initial HTML." },
  { q: "Do you handle migrations?", a: "Yes - full technical migration plan with 301 mapping, staging QA and post-launch monitoring." },
  { q: "What makes you the best Ecommerce SEO Agency UK for technical work?", a: "We combine senior UK SEO leadership with in-house Shopify + WooCommerce developers, so technical fixes actually ship - not just get 'recommended' in a PDF." },
  { q: "How do you audit a Shopify store technically?", a: "Screaming Frog + Sitebulb crawl, log-file analysis, Chrome DevTools Lighthouse, WebPageTest, GSC coverage report and a manual JS-render QA - all cross-referenced." },
  { q: "How long do technical SEO fixes take to impact rankings?", a: "Crawl and indexation cleanups can move rankings in 2-4 weeks. Core Web Vitals improvements typically show in CrUX after 28 days of green field data." },
  { q: "What is crawl budget and does it matter?", a: "Yes - especially on Shopify stores with faceted nav or WooCommerce sites with filters. We often cut crawl waste by 80%+ so Google spends budget on money URLs." },
  { q: "Do you handle hreflang for international stores?", a: "Yes - sitemap-based hreflang, x-default, self-referencing, validated end-to-end. See our International SEO service for full multi-region setups." },
  { q: "Will you work with our existing Shopify or Woo dev team?", a: "Yes - we brief, PR-review and QA. Or we ship it ourselves. Whichever gets it live faster." },
  { q: "Do you fix redirect chains and 404s?", a: "Yes - full redirect audit, chain collapsing, 404 recovery via 301s, and monthly monitoring against ongoing product deletions." },
  { q: "How is BeingEcom different from a generalist Ecommerce Agency UK?", a: "We're an Ecommerce Growth Agency built for Shopify and WooCommerce specifically - we know the platforms' quirks, and our recommendations survive contact with Shopify's Liquid templating and Woo's plugin chaos." },
  { q: "What schema do you implement?", a: "Product, Offer, AggregateRating, Review, FAQ, HowTo, Breadcrumb, Organization, WebSite and SearchAction - validated in the Rich Results Test." },
  { q: "Do you use Cloudflare Workers or edge SEO?", a: "Yes when useful - edge-based meta rewrites, header injection, hreflang and 301 handling on stores where the CMS can't do it cleanly." },
  { q: "What tools do you use for technical SEO?", a: "Screaming Frog, Sitebulb, Ahrefs Site Audit, Semrush, Google Search Console, Bing Webmaster, PageSpeed Insights, WebPageTest, Chrome DevTools, and CDN log analysers." },
];

export const Route = createFileRoute("/services/seo/technical")({
  head: () => ({
    meta: [
      { title: "Technical SEO Agency UK | No.1 Shopify & Woo CWV, Crawl & Schema | BeingEcom" },
      { name: "description", content: "BeingEcom is a leading Technical SEO Agency UK and specialist Ecommerce SEO Agency UK. Core Web Vitals, crawl, indexation and schema fixed properly for Shopify and WooCommerce stores by senior ecommerce SEOs." },
      { property: "og:title", content: "Technical SEO Agency UK | No.1 Shopify & Woo CWV, Crawl & Schema | BeingEcom" },
      { property: "og:description", content: "Technical SEO Agency UK. Core Web Vitals, crawl, indexation and schema fixed properly for Shopify and WooCommerce stores by senior ecommerce SEOs." },
      { property: "og:url", content: "https://beingecom.com/services/seo/technical" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://beingecom.com/services/seo/technical" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({ slug: "seo/technical", name: "Technical SEO Agency UK", description: "Technical SEO for ecommerce - CWV, crawl, indexation, schema and migrations by an award-winning UK Ecommerce SEO Agency." })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Ecommerce SEO", path: "/services/seo" }, { name: "Technical SEO", path: "/services/seo/technical" }])) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQ_LIST, "/services/seo/technical")) },
    ],
  }),
  component: () => (
    <ServicePage cfg={{
      slug: "seo-technical",
      eyebrow: "Technical SEO Agency UK",
      heroImage: heroImg,
      heroTitle: "UK's leading Ecommerce Agency for technical SEO - crawlable, fast, indexable Shopify & WooCommerce stores.",
      heroSub: "As an award-winning Ecommerce Marketing Agency UK and trusted Ecommerce Growth Agency, we turn broken technical foundations into machines Google can actually rank.",
      problemTitle: "Why technical debt caps ecommerce SEO.",
      problemBullets: [
        "Faceted-nav URLs wasting 60% of crawl budget.",
        "Red Core Web Vitals - mobile LCP over 4 seconds.",
        "Duplicate product URLs cannibalising each other.",
      ],
      whatIsTitle: "Technical SEO is force-multiplier work.",
      whatIsBody: "You can write the best content on earth - if Google can't crawl, render or trust your store, none of it ranks. As a specialist Ecommerce SEO Agency UK we fix the plumbing so every other channel compounds: SEO, paid, email and CRO all get faster pages and cleaner data on top.",
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
        { title: "Faceted navigation", body: "Rules for filters, colours, sizes - indexable vs canonicalised.", tags: ["Facets","Canonical"] },
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
      ctaTitle: "Fix the technical debt capping your growth - with the UK's leading Ecommerce SEO Agency.",
      impactStats: [
        { value: "1.4s", label: "Mobile LCP" },
        { value: "-92%", label: "Crawl waste" },
        { value: "+81%", label: "Organic sessions" },
      ],
      metricBars: [
        { label: "Mobile LCP", before: 4.2, after: 1.4, unit: "s", description: "Largest Contentful Paint on mobile 4G." },
        { label: "Crawl waste", before: 100, after: 8, unit: "%", description: "Junk URLs as % of crawled URLs pre/post cleanup." },
        { label: "Indexed URLs", before: 280, after: 12, unit: "k", description: "Total indexed URLs - thinner, higher-quality index." },
        { label: "Non-brand organic", before: 100, after: 181, unit: "%", description: "Non-brand organic sessions vs baseline." },
      ],
      faqs: FAQ_LIST,
    }} />
  ),
});
