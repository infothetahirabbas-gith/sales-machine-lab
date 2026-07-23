import { createFileRoute, Link } from "@tanstack/react-router";
import PageLayout from "../components/site/PageLayout";
import { Section, Card, CTA } from "../components/site/Section";
import { breadcrumbJsonLd, SITE_URL, ORG_INFO } from "../lib/seo";

type PostMeta = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readMins: number;
  datePublished: string;
};

const POSTS: PostMeta[] = [
  {
    slug: "shopify-plus-migration-uk",
    title: "Shopify Plus migration for UK brands: WooCommerce to Shopify Plus without losing rankings",
    description:
      "A UK-specific Shopify Plus migration guide - when to move from WooCommerce, VAT and Markets setup, 301 redirect strategy, and a technical checklist that protects SEO and revenue.",
    category: "Ecommerce strategy",
    readMins: 12,
    datePublished: "2026-07-08",
  },
  {
    slug: "shopify-vs-woocommerce-uk",
    title: "Shopify vs WooCommerce UK 2026: honest comparison for growing DTC brands",
    description:
      "Shopify or WooCommerce for a UK ecommerce brand in 2026? Real total cost of ownership, SEO, checkout, VAT, apps, scaling limits - decided by revenue stage, not marketing copy.",
    category: "Ecommerce strategy",
    readMins: 14,
    datePublished: "2026-07-07",
  },
  {
    slug: "uk-ecommerce-seo-playbook-shopify",
    title: "The UK ecommerce SEO playbook for Shopify (2026)",
    description:
      "The complete UK Shopify SEO playbook: technical, on-page, content and local. What actually moves organic revenue for £1M-£15M UK DTC stores.",
    category: "Ecommerce SEO",
    readMins: 18,
    datePublished: "2026-07-23",
  },
  {
    slug: "shopify-duplicate-content-faceted-urls",
    title: "How to fix Shopify duplicate content and faceted URLs",
    description:
      "Collection filters, tags and vendor URLs quietly duplicate your Shopify store. Here's the canonical, robots and metafield fix that recovers wasted crawl budget.",
    category: "Ecommerce SEO",
    readMins: 10,
    datePublished: "2026-07-23",
  },
  {
    slug: "shopify-product-page-seo-uk",
    title: "Product page SEO for UK Shopify stores",
    description:
      "The PDP template that ranks and converts for UK Shopify brands - copy structure, schema, reviews, UK signals and internal linking.",
    category: "Ecommerce SEO",
    readMins: 11,
    datePublished: "2026-07-23",
  },
  {
    slug: "shopify-collection-page-seo",
    title: "Collection page SEO: templates that rank",
    description:
      "Why Shopify collection pages under-rank and the on-page template that fixes it - intro copy, faceted-nav strategy, schema and internal linking.",
    category: "Ecommerce SEO",
    readMins: 10,
    datePublished: "2026-07-23",
  },
  {
    slug: "shopify-plus-technical-seo-checklist",
    title: "Technical SEO checklist for Shopify Plus",
    description:
      "Crawl budget, canonicals, hreflang, Core Web Vitals, JSON-LD and international - the technical SEO checklist we run on every Shopify Plus audit.",
    category: "Ecommerce SEO",
    readMins: 12,
    datePublished: "2026-07-23",
  },
  {
    slug: "local-seo-multi-location-uk-ecommerce",
    title: "Local SEO for multi-location UK ecommerce brands",
    description:
      "How UK ecommerce brands with showrooms, pickup points or regional fulfilment rank in local packs - GBP, schema, city pages and review strategy.",
    category: "Ecommerce SEO",
    readMins: 11,
    datePublished: "2026-07-23",
  },
  { slug: "uk-dtc-paid-media-playbook", title: "The UK DTC paid media playbook (Meta, Google, TikTok, 2026)", description: "The full paid media playbook for UK DTC brands - Meta creative, Google Shopping, TikTok, iOS 17 attribution and MER-led budgeting.", category: "Paid media", readMins: 18, datePublished: "2026-07-23" },
  { slug: "meta-ads-creative-testing-uk-dtc", title: "Meta Ads creative testing framework for UK DTC", description: "The creative testing framework we use on Meta for UK DTC brands - concepts, angles, hooks and the statistical signal you need before killing an ad.", category: "Paid media", readMins: 11, datePublished: "2026-07-23" },
  { slug: "google-shopping-feed-optimisation-shopify-uk", title: "Google Shopping feed optimisation for Shopify UK", description: "How to structure Shopify's Google Shopping feed for UK - titles, GTINs, GBP pricing, custom labels and the PMax structure that actually scales.", category: "Paid media", readMins: 11, datePublished: "2026-07-23" },
  { slug: "tiktok-ads-uk-beauty-fashion-brands", title: "TikTok Ads for UK beauty and fashion brands", description: "The TikTok Ads playbook for UK beauty and fashion DTC - Spark Ads, UGC creators, Shop integration and creative formats that convert.", category: "Paid media", readMins: 10, datePublished: "2026-07-23" },
  { slug: "ios17-attribution-uk-ecommerce", title: "iOS 17 attribution: what UK ecommerce should do now", description: "iOS 17 Link Tracking Protection broke another chunk of ecommerce attribution. Here's what UK Shopify brands should measure and how.", category: "Paid media", readMins: 9, datePublished: "2026-07-23" },
  { slug: "mer-vs-roas-uk-dtc-founders", title: "MER vs ROAS: the metric UK DTC founders should track", description: "Why MER beats platform ROAS as the north-star metric for UK DTC brands - definitions, targets by margin, and how to structure your dashboard.", category: "Paid media", readMins: 9, datePublished: "2026-07-23" },
  { slug: "uk-ecommerce-cro-playbook-shopify", title: "Ecommerce CRO playbook for UK Shopify stores (2026)", description: "The conversion rate optimisation playbook for UK Shopify brands - PDP, checkout, mobile, site search and trust signals that actually move revenue.", category: "CRO", readMins: 17, datePublished: "2026-07-23" },
  { slug: "pdp-cro-14-tests-that-move-revenue", title: "PDP CRO: 14 tests that move revenue", description: "The 14 product page CRO tests we run first on UK Shopify stores - hero, ATC placement, reviews, sticky ATC, mobile gallery and trust signals.", category: "CRO", readMins: 11, datePublished: "2026-07-23" },
  { slug: "cart-checkout-cro-shopify-uk", title: "Cart and checkout CRO for Shopify UK", description: "How UK Shopify brands recover the 68% cart abandonment - Shop Pay, express checkout, delivery clarity, trust badges and the one-page checkout upgrade.", category: "CRO", readMins: 10, datePublished: "2026-07-23" },
  { slug: "mobile-cro-fixing-mobile-dropoff", title: "Mobile CRO: fixing the mobile drop-off", description: "UK Shopify stores lose 60%+ of mobile sessions between PDP and cart. The mobile-CRO checklist that closes the gap: LCP, sticky ATC, thumb zones and forms.", category: "CRO", readMins: 10, datePublished: "2026-07-23" },
  { slug: "site-search-cro-uk-ecommerce", title: "Site search CRO for UK ecommerce", description: "Shoppers who search on-site convert 3-6x higher. How UK Shopify stores optimise site search - synonyms, zero-result recovery, merchandising and analytics.", category: "CRO", readMins: 9, datePublished: "2026-07-23" },
  { slug: "trust-signals-that-convert-uk-shoppers", title: "Trust signals that convert UK shoppers", description: "The trust signals that measurably lift conversion on UK Shopify stores - reviews, guarantees, delivery clarity, payment badges and press mentions.", category: "CRO", readMins: 9, datePublished: "2026-07-23" },
  { slug: "uk-ecommerce-email-retention-klaviyo", title: "Ecommerce email & retention playbook (Klaviyo, UK, 2026)", description: "The Klaviyo playbook for UK DTC brands - flows, segmentation, campaigns, SMS, GDPR and the retention metrics that build repeatable revenue.", category: "Email & retention", readMins: 17, datePublished: "2026-07-23" },
  { slug: "klaviyo-welcome-flow-uk-dtc-template", title: "Klaviyo welcome flow: the UK DTC template", description: "The Klaviyo welcome flow template we deploy for UK DTC brands - 5 emails, offer strategy, brand story, product education and the send-time cadence that converts.", category: "Email & retention", readMins: 9, datePublished: "2026-07-23" },
  { slug: "abandoned-cart-flows-that-recover-15-percent", title: "Abandoned cart flows that recover 15%+", description: "The abandoned cart flow structure that consistently recovers 15%+ of abandoned carts for UK DTC brands on Klaviyo - timing, copy, offer and SMS.", category: "Email & retention", readMins: 9, datePublished: "2026-07-23" },
  { slug: "post-purchase-flows-for-repeat-revenue", title: "Post-purchase flows for repeat revenue", description: "The Klaviyo post-purchase flow that drives second orders for UK DTC brands - thank you, education, review request, cross-sell and second-order incentive.", category: "Email & retention", readMins: 9, datePublished: "2026-07-23" },
  { slug: "winback-flows-for-lapsed-uk-customers", title: "Winback flows for lapsed UK customers", description: "The Klaviyo winback flow that reactivates lapsed UK customers - segmentation by lifetime value, message ladder, offer strategy and sunset thresholds.", category: "Email & retention", readMins: 9, datePublished: "2026-07-23" },
  { slug: "sms-email-uk-compliance-safe-combo", title: "SMS + email: the UK compliance-safe combo", description: "How UK DTC brands run SMS alongside email without breaking PECR or GDPR - opt-in, timing, message caps and the flows where SMS actually earns its place.", category: "Email & retention", readMins: 9, datePublished: "2026-07-23" },
];


const blogListJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${SITE_URL}/blog#blog`,
  name: "BeingEcom Ecommerce Growth Journal",
  description:
    "Playbooks, benchmarks and teardowns from the BeingEcom team on Shopify, WooCommerce, CRO, paid media and ecommerce SEO for UK DTC brands.",
  url: `${SITE_URL}/blog`,
  publisher: {
    "@type": "Organization",
    name: ORG_INFO.name,
    url: ORG_INFO.url,
    logo: { "@type": "ImageObject", url: ORG_INFO.logo },
  },
  blogPost: POSTS.map((p) => ({
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    url: `${SITE_URL}/blog/${p.slug}`,
    datePublished: p.datePublished,
    author: { "@type": "Organization", name: ORG_INFO.name },
  })),
};

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Ecommerce Growth Blog - Shopify & WooCommerce UK | BeingEcom" },
      {
        name: "description",
        content:
          "Playbooks, benchmarks and teardowns for UK Shopify and WooCommerce brands. Ecommerce SEO, CRO, paid ads and retention - written by senior operators, not interns.",
      },
      { property: "og:title", content: "Ecommerce Growth Blog - Shopify & WooCommerce UK | BeingEcom" },
      {
        property: "og:description",
        content:
          "Playbooks, benchmarks and teardowns for UK Shopify and WooCommerce brands. Ecommerce SEO, CRO, paid ads and retention.",
      },
      { property: "og:url", content: `${SITE_URL}/blog` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/blog` }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(blogListJsonLd) },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
        ),
      },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <PageLayout>
      <h1 className="sr-only">Ecommerce Growth Journal - Shopify & WooCommerce UK</h1>
      <Section
        eyebrow="Blog"
        title="The BeingEcom ecommerce growth journal"
        intro="Field notes from senior operators running Shopify and WooCommerce stores across the UK - the same playbooks we bill for, written out in full."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="block group"
              aria-label={p.title}
            >
              <Card className="h-full">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-3">
                  {p.category} · {p.readMins} min read
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-ink leading-tight group-hover:text-primary transition">
                  {p.title}
                </h2>
                <p className="mt-3 text-sm text-muted-foreground">{p.description}</p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-primary">
                  Read the guide →
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
      <CTA
        heading="Want the playbook applied to your store?"
        sub="Book a 30-minute strategy call and we'll show you where the revenue is leaking - and the fastest way to plug it."
      />
    </PageLayout>
  );
}

// Route params for the dynamic slug route are declared in blog.$slug.tsx.
// This file only exposes /blog itself.
export { POSTS as BLOG_POSTS };
