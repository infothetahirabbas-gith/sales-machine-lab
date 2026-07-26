// 30-point Shopify SEO checklist. Each item is a first-party audit finding
// we see recur across UK Shopify stores. Content is citation-worthy on its
// own; the interactive scorer is just the delivery surface.

export type ChecklistItem = {
  id: string;
  category: "Technical" | "On-page" | "Content" | "Conversion" | "Off-page";
  title: string;
  detail: string;
  why: string;
};

export const SHOPIFY_SEO_CHECKLIST: ChecklistItem[] = [
  // Technical
  { id: "canonical-collections", category: "Technical", title: "Canonical tags on collection + product variants", detail: "Every /collections/*/products/* URL canonicalises to /products/*, and faceted URLs canonicalise to the parent collection.", why: "Shopify duplicates products across collections by default. Uncontrolled duplication is the single most common source of hidden ranking loss on Shopify Plus stores." },
  { id: "faceted-noindex", category: "Technical", title: "Faceted / filtered URLs are noindexed or blocked", detail: "URLs with ?filter.*=, ?sort_by=, ?page= are either noindexed via meta robots or disallowed in robots.txt.", why: "Facets multiply crawlable URLs by 10-100x with near-identical content, eating crawl budget on £1M+/month stores." },
  { id: "sitemap-scope", category: "Technical", title: "sitemap.xml only lists indexable, live URLs", detail: "No noindexed pages, no redirected URLs, no draft products. Split by type (products / collections / pages / blog).", why: "Google downgrades sitemaps that mix live and stale URLs, which slows discovery of genuine new products." },
  { id: "robots-clean", category: "Technical", title: "robots.txt reviewed and version-controlled", detail: "Shopify's default robots.txt.liquid overridden to explicitly block /search, /cart, /account, checkout paths, and any theme app proxies you don't want indexed.", why: "The Shopify default doesn't cover app-installed URLs, which frequently leak into the index." },
  { id: "hreflang", category: "Technical", title: "hreflang set correctly for multi-market Shopify Markets", detail: "Every localised URL cross-references every alternate with the correct language-region code, plus an x-default.", why: "Markets ships hreflang by default but often mis-tags region-only vs language-region, causing UK traffic to see the .com URL in Google." },
  { id: "cwv-lcp", category: "Technical", title: "LCP under 2.5s on 4G mobile for top 5 templates", detail: "Homepage, collection template, product template, cart, and highest-traffic landing page all pass Core Web Vitals field data.", why: "Shopify themes ship with 2-3 hero apps that push LCP past 4s. Rankings + conversion both suffer." },
  { id: "cwv-inp", category: "Technical", title: "INP under 200ms on product template", detail: "Third-party apps (reviews, upsell, chat) audited and lazy-loaded or removed if they block main-thread interactions.", why: "INP replaced FID in 2024 and is now the interaction ranking signal. Shopify apps are the #1 cause of failing INP." },
  { id: "structured-product", category: "Technical", title: "Product schema on every PDP with price, availability, reviews", detail: "Product JSON-LD includes offers, priceCurrency GBP, availability, aggregateRating (only if genuine), and sku.", why: "Missing price/availability blocks eligibility for Google Shopping free listings and merchant carousels." },
  { id: "structured-breadcrumb", category: "Technical", title: "BreadcrumbList schema on collection + product pages", detail: "Breadcrumb JSON-LD reflects the collection hierarchy the user actually traversed.", why: "Enables the breadcrumb SERP display which increases CTR ~10% on category-intent queries." },
  { id: "js-rendering", category: "Technical", title: "Critical content server-rendered, not hydrated client-side", detail: "Product title, price, description, and reviews appear in the raw HTML before JavaScript runs.", why: "Shopify apps that inject reviews or price via JS cause Googlebot to see empty containers on mobile." },

  // On-page
  { id: "title-formula", category: "On-page", title: "Consistent title formula across collections and products", detail: "Collections: {Category} | {Brand}. Products: {Product Name} - {Key Attribute} | {Brand}. Under 60 chars.", why: "Consistency helps sitewide relevance signals; length keeps titles unclipped in SERPs." },
  { id: "meta-descriptions", category: "On-page", title: "Unique meta descriptions on top 100 URLs by traffic potential", detail: "No auto-generated or duplicate meta descriptions on money pages.", why: "Duplicated meta descriptions cause Google to rewrite them, often worse than what you'd have written." },
  { id: "h1-uniqueness", category: "On-page", title: "One H1 per page, matches primary search intent", detail: "Collection H1 uses the plural category term; product H1 uses the exact product name buyers search for.", why: "H1 mismatch is the most common on-page issue on Shopify - default themes often put the H1 inside a slider." },
  { id: "internal-linking", category: "On-page", title: "Contextual internal links from blog → collection → product", detail: "Every blog post links to the most relevant collection with descriptive anchor text (not 'shop now').", why: "Distributes authority to money pages and helps Google understand topical hierarchy." },
  { id: "image-alt", category: "On-page", title: "Descriptive alt text on all product images", detail: "Alt text describes the product and attribute, not the filename or SKU.", why: "Powers Google Images traffic and improves accessibility scoring which now feeds page-experience signals." },
  { id: "url-structure", category: "On-page", title: "Clean, short URL slugs on collections and products", detail: "No auto-appended dates, no random hashes, no /collections/all/products/... duplicates.", why: "Shorter URLs correlate with better CTR and are easier for Google to consolidate." },

  // Content
  { id: "collection-copy", category: "Content", title: "150+ words of unique buyer-intent copy on every money collection", detail: "Positioned below the product grid (not above, which pushes products down). Answers 'what should I buy and why'.", why: "Category pages are the biggest untapped organic revenue lever on almost every Shopify store." },
  { id: "product-descriptions", category: "Content", title: "Unique product descriptions - no manufacturer copy", detail: "Every top-100 product has original copy covering materials, sizing, use-case, and objection-handling.", why: "Manufacturer-supplied copy is duplicated across every stockist and gets filtered out of Google's index." },
  { id: "buying-guides", category: "Content", title: "Buying guides for every major category", detail: "One long-form guide per category (e.g. 'How to choose a merino wool base layer') that internally links to the collection.", why: "Captures top-of-funnel research queries that competitors ignore, feeding qualified traffic into money pages." },
  { id: "faq-content", category: "Content", title: "FAQ schema on PDP and category pages for real questions", detail: "Pulled from customer support tickets, on-site search, and Google's 'People Also Ask'. Not made-up questions.", why: "Genuine FAQs earn PAA placements and are heavily cited in AI overviews and ChatGPT search." },
  { id: "blog-relevance", category: "Content", title: "Blog focused on buyer intent, not brand news", detail: "80% of blog posts help buyers make purchase decisions; 20% brand/behind-the-scenes.", why: "Brand-news blogs earn zero organic traffic. Buyer-intent blogs drive category-page visits." },

  // Conversion
  { id: "trust-signals", category: "Conversion", title: "Trust signals above the fold on PDP", detail: "Star rating with count, delivery estimate, returns policy, and payment icons visible without scrolling on mobile.", why: "Direct impact on conversion and dwell time, which is a secondary ranking signal." },
  { id: "mobile-cro", category: "Conversion", title: "Sticky add-to-cart on mobile PDP", detail: "Add-to-cart button remains reachable throughout the product page scroll on mobile.", why: "Mobile PDP conversion is 40-60% of Shopify revenue; sticky CTA typically lifts CVR 8-15%." },
  { id: "checkout-friction", category: "Conversion", title: "Guest checkout enabled and Shop Pay accelerated checkout visible", detail: "No forced account creation; Shop Pay button prominent above form fields.", why: "Forced account creation drops conversion 20-35% for first-time buyers." },
  { id: "site-search", category: "Conversion", title: "On-site search returns relevant results with images", detail: "Zero-result rate under 5%; top queries have hand-tuned redirects.", why: "Site-search users convert 3-5x higher than browse users; failed searches leak the highest-intent visitors." },

  // Off-page
  { id: "gbp", category: "Off-page", title: "Verified Google Business Profile with correct category", detail: "Category set to the closest match to primary business, not 'Shopping mall'. NAP consistent with website footer.", why: "Local pack + Maps visibility for branded and 'near me' searches, and feeds the knowledge-graph entity." },
  { id: "digital-pr", category: "Off-page", title: "Active digital PR pipeline earning 2+ editorial links / month", detail: "HARO/Qwoted responses, journalist outreach, or original research distribution running consistently.", why: "Editorial links are the single strongest ranking signal that Google still weighs heavily in 2026." },
  { id: "reviews-third-party", category: "Off-page", title: "Verified reviews on Trustpilot, Google, and Feefo/Yotpo", detail: "Actively soliciting reviews post-purchase; responding to all negatives within 48h.", why: "Third-party reviews feed the Merchant Center quality signal and improve organic CTR via review stars." },
  { id: "brand-mentions", category: "Off-page", title: "Consistent brand entity across LinkedIn, Crunchbase, Wikipedia (if eligible)", detail: "Same name, category, founder, and description across every profile.", why: "Inconsistent entity signals dilute the knowledge-graph confidence Google assigns to your brand." },
  { id: "backlink-audit", category: "Off-page", title: "Quarterly toxic-backlink audit and disavow file maintained", detail: "Spammy or unrelated links reviewed and disavowed via Google Search Console.", why: "Post-SpamBrain, toxic backlinks are usually ignored - but disavow protects against future negative SEO campaigns." },
];

export const CHECKLIST_CATEGORIES = [
  "Technical",
  "On-page",
  "Content",
  "Conversion",
  "Off-page",
] as const;
