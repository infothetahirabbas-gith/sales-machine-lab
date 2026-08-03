// Blog post metadata. Shared by /blog, /search and the sitemap.
export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readMins: number;
  datePublished: string;
};

export const BLOG_POSTS: PostMeta[] = [
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
