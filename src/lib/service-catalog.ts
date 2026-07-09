// Central catalog of all service pages used for context-aware internal linking.
// Keep in sync with src/routes/services.*.tsx.

export type ServiceCatalogEntry = {
  slug: string;
  title: string;
  body: string;
  to: string;
  group?: "seo" | "ads" | "store" | "growth";
};

export const SERVICE_CATALOG: ServiceCatalogEntry[] = [
  { slug: "seo", title: "Ecommerce SEO", body: "Rank for high-intent product & category queries.", to: "/services/seo", group: "seo" },
  { slug: "seo-technical", title: "Technical SEO", body: "Crawl, index & Core Web Vitals engineering.", to: "/services/seo/technical", group: "seo" },
  { slug: "seo-on-page", title: "On-Page SEO", body: "Product & collection pages that convert & rank.", to: "/services/seo/on-page", group: "seo" },
  { slug: "seo-off-page", title: "Off-Page SEO", body: "Digital PR & link acquisition that moves rankings.", to: "/services/seo/off-page", group: "seo" },
  { slug: "seo-local", title: "Local SEO", body: "Own the map pack in every city you serve.", to: "/services/seo/local", group: "seo" },
  { slug: "seo-international", title: "International SEO", body: "Hreflang, localisation & multi-region growth.", to: "/services/seo/international", group: "seo" },
  { slug: "seo-aeo", title: "AEO / AI Search", body: "Get cited by ChatGPT, Perplexity & Google AI.", to: "/services/seo/aeo", group: "seo" },

  { slug: "paid-ads", title: "Paid Ads", body: "Meta, Google & TikTok that scale profitably.", to: "/services/paid-ads", group: "ads" },
  { slug: "performance-marketing", title: "Performance Marketing", body: "Full-funnel media that hits blended ROAS goals.", to: "/services/performance-marketing", group: "ads" },
  { slug: "pm-google", title: "Google Ads", body: "Search, Shopping & PMax built for ecommerce.", to: "/services/performance-marketing/google-ads", group: "ads" },
  { slug: "pm-facebook", title: "Facebook Ads", body: "Meta creative + testing engine for scale.", to: "/services/performance-marketing/facebook-ads", group: "ads" },
  { slug: "pm-instagram", title: "Instagram Ads", body: "Reels-first creative that drives revenue.", to: "/services/performance-marketing/instagram-ads", group: "ads" },
  { slug: "pm-tiktok", title: "TikTok Ads", body: "Native-first ads that unlock net-new demand.", to: "/services/performance-marketing/tiktok-ads", group: "ads" },
  { slug: "pm-youtube", title: "YouTube Ads", body: "Video prospecting that fills the funnel.", to: "/services/performance-marketing/youtube-ads", group: "ads" },
  { slug: "pm-media-buying", title: "Media Buying", body: "Cross-channel buying with one P&L view.", to: "/services/performance-marketing/media-buying", group: "ads" },

  { slug: "store-development", title: "Store Development", body: "High-converting ecom builds engineered to scale.", to: "/services/store-development", group: "store" },
  { slug: "store-shopify", title: "Shopify Development", body: "Custom Shopify & Shopify Plus builds.", to: "/services/store-development/shopify", group: "store" },
  { slug: "store-woocommerce", title: "WooCommerce Development", body: "Scalable, secure Woo builds & migrations.", to: "/services/store-development/woocommerce", group: "store" },

  { slug: "cro", title: "Conversion Rate Optimization", body: "Test-driven CRO that lifts revenue per session.", to: "/services/cro", group: "growth" },
  { slug: "funnel", title: "Funnel Design", body: "End-to-end funnels that turn traffic into buyers.", to: "/services/funnel", group: "growth" },
  { slug: "email-sms", title: "Email & SMS", body: "Klaviyo flows & campaigns that print revenue.", to: "/services/email-sms", group: "growth" },
  { slug: "creative", title: "Creative Studio", body: "Ad creative & UGC that beats control weekly.", to: "/services/creative", group: "growth" },
  { slug: "analytics", title: "Analytics & Tracking", body: "GA4, server-side tracking & attribution done right.", to: "/services/analytics", group: "growth" },
  { slug: "ai-automation", title: "AI & Automation", body: "AI agents & workflows that remove ops drag.", to: "/services/ai-automation", group: "growth" },
  { slug: "scaling", title: "Scaling Systems", body: "Operational systems to scale past 8 figures.", to: "/services/scaling", group: "growth" },
];

/** Pick N related services (same group first, then diverse) excluding current slug. */
export function getRelatedServices(currentSlug: string, count = 6): ServiceCatalogEntry[] {
  const current = SERVICE_CATALOG.find((s) => s.slug === currentSlug);
  const others = SERVICE_CATALOG.filter((s) => s.slug !== currentSlug);
  if (!current) return others.slice(0, count);
  const sameGroup = others.filter((s) => s.group === current.group);
  const diffGroup = others.filter((s) => s.group !== current.group);
  return [...sameGroup, ...diffGroup].slice(0, count);
}

/** Site-wide resource / tool links surfaced on every service page. */
export const RESOURCE_LINKS = [
  { title: "Free Growth Audit", body: "Get a 20-page teardown of your store, ads & funnel.", to: "/audit" },
  { title: "Pricing & Packages", body: "Transparent retainers built for every growth stage.", to: "/pricing" },
  { title: "Case Studies", body: "Real ecommerce brands, real revenue lifts.", to: "/case-studies" },
  { title: "Insights & Playbooks", body: "Field-tested tactics from our operator team.", to: "/blog" },
  { title: "Industries We Serve", body: "Specialised playbooks by vertical.", to: "/industries" },
  { title: "Talk to Strategy", body: "Book a 30-min call with a senior strategist.", to: "/contact" },
] as const;
