// Canonical single source of truth for the 10 top-level services.
//
// EVERY navigation menu, footer, homepage service grid, /services index,
// service-page schema and cross-link block MUST derive from this list -
// never hardcode service labels or URLs anywhere else.
//
// Naming: canonical UK English (Optimisation, not Optimisation). If a
// component drifts (renames, adds a legacy alias, drops one), the
// `scripts/check-parity.mjs` guard fails so drift is caught in CI
// before it ships.

export type ServiceChild = {
  to: string;
  label: string;
};

export type Service = {
  slug: string;
  to: string;
  label: string;
  shortLabel: string;
  blurb: string;
  tag: string;
  children?: ServiceChild[];
};

export const SERVICES: readonly Service[] = [
  {
    slug: "seo",
    to: "/services/seo",
    label: "Ecommerce SEO",
    shortLabel: "SEO",
    blurb: "Rank products & collections - free traffic forever.",
    tag: "Acquire",
    children: [
      { to: "/services/seo/on-page", label: "On-Page SEO" },
      { to: "/services/seo/off-page", label: "Off-Page SEO" },
      { to: "/services/seo/technical", label: "Technical SEO" },
      { to: "/services/seo/local", label: "Local SEO" },
      { to: "/services/seo/aeo", label: "AEO / AI Search" },
      { to: "/services/seo/international", label: "International SEO" },
    ],
  },
  {
    slug: "performance-marketing",
    to: "/services/performance-marketing",
    label: "Performance Marketing",
    shortLabel: "Ads",
    blurb: "Facebook, Instagram, TikTok, Google & YouTube as one P&L.",
    tag: "Acquire",
    children: [
      { to: "/services/performance-marketing/facebook-ads", label: "Facebook Ads" },
      { to: "/services/performance-marketing/instagram-ads", label: "Instagram Ads" },
      { to: "/services/performance-marketing/tiktok-ads", label: "TikTok Ads" },
      { to: "/services/performance-marketing/google-ads", label: "Google Ads" },
      { to: "/services/performance-marketing/youtube-ads", label: "YouTube Ads" },
      { to: "/services/performance-marketing/media-buying", label: "Media Buying" },
    ],
  },
  {
    slug: "store-development",
    to: "/services/store-development",
    label: "Store Development",
    shortLabel: "Build",
    blurb: "Shopify & WooCommerce stores engineered for conversion.",
    tag: "Build",
    children: [
      { to: "/services/store-development/shopify", label: "Shopify Store Development" },
      { to: "/services/store-development/woocommerce", label: "WooCommerce Store Development" },
    ],
  },
  {
    slug: "cro",
    to: "/services/cro",
    label: "Conversion Rate Optimisation",
    shortLabel: "CRO",
    blurb: "Turn existing traffic into 2-3× more sales.",
    tag: "Optimise",
  },
  {
    slug: "creative",
    to: "/services/creative",
    label: "Creative Production",
    shortLabel: "Creative",
    blurb: "Scroll-stopping ad creatives that actually sell.",
    tag: "Create",
  },
  {
    slug: "email-sms",
    to: "/services/email-sms",
    label: "Email Marketing Automation",
    shortLabel: "Email",
    blurb: "Recover lost sales. Multiply repeat customers.",
    tag: "Retain",
  },
  {
    slug: "ai-automation",
    to: "/services/ai-automation",
    label: "AI Automation",
    shortLabel: "AI",
    blurb: "AI agents & workflows that compound margin.",
    tag: "Automate",
  },
  {
    slug: "funnel",
    to: "/services/funnel",
    label: "Funnel & Landing Pages",
    shortLabel: "Funnel",
    blurb: "High-converting funnels for launches and offers.",
    tag: "Convert",
  },
  {
    slug: "analytics",
    to: "/services/analytics",
    label: "Analytics & Tracking",
    shortLabel: "Analytics",
    blurb: "GA4, Pixel, CAPI and dashboards - set up correctly.",
    tag: "Measure",
  },
  {
    slug: "scaling",
    to: "/services/scaling",
    label: "Scaling & Retention",
    shortLabel: "Scaling",
    blurb: "Systems to scale from 6 to 7 figures and keep customers.",
    tag: "Scale",
  },
] as const;

/** Service slug → canonical label lookup. */
export const SERVICE_LABEL_BY_SLUG: Readonly<Record<string, string>> =
  Object.freeze(Object.fromEntries(SERVICES.map((s) => [s.slug, s.label])));

/** Legacy / drift-prone labels that must NEVER reappear in the source tree. */
export const BANNED_SERVICE_STRINGS: readonly string[] = [
  "Creative Testing",
  "Conversion Optimisation", // US spelling
  "Conversion Optimisation", // shortened UK - must use full "Conversion Rate Optimisation"
] as const;
