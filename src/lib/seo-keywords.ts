// Master SEO keyword map single source of truth for every indexable page.
// Each entry: primary keyword, supporting variations (incl. a "Best" variant on
// commercial pages), suggested title (≤65 chars) and meta description (≤160 chars).
//
// Rule: every route below targets a UNIQUE primary keyword no cannibalisation.
// Dynamic routes (/locations/$slug, /industries/$slug) build their keywords per
// slug at runtime in the route's head(); this file lists the *formula* for those.

export interface KeywordEntry {
  primary: string;
  supporting: string[];
  title: string;
  description: string;
  h1?: string;
}

export const SEO_KEYWORDS: Record<string, KeywordEntry> = {
  // ── Homepage ────────────────────────────────────────────────────────────
  "/": {
    primary: "Ecommerce Marketing Agency UK",
    supporting: [
      "Ecommerce Growth Agency UK",
      "Ecommerce SEO Agency UK",
      "Shopify Marketing Agency UK",
      "WooCommerce Marketing Agency UK",
      "Ecommerce Digital Marketing Agency UK",
    ],
    title: "Ecommerce Marketing Agency UK | Shopify & WooCommerce Growth | BeingEcom",
    description:
      "BeingEcom is an Ecommerce Marketing Agency UK helping Shopify and WooCommerce brands grow with SEO, paid ads, CRO, email marketing and AI-powered ecommerce strategies.",
    h1: "Ecommerce Marketing Agency UK Helping Shopify & WooCommerce Brands Scale",
  },

  // ── Static commercial pages ─────────────────────────────────────────────
  "/about": {
    primary: "Ecommerce Marketing Agency UK",
    supporting: ["Ecommerce Growth Partner UK", "Ecommerce Experts UK", "Best Ecommerce Agency UK"],
    title: "About BeingEcom | Ecommerce Marketing Agency UK for Shopify & Woo",
    description:
      "Meet the team behind BeingEcom a UK Ecommerce Marketing Agency and growth partner for Shopify and WooCommerce brands. Senior operators, revenue-first, transparent.",
  },
  "/contact": {
    primary: "Contact Ecommerce Marketing Agency UK",
    supporting: ["Hire Ecommerce Agency UK", "Ecommerce Consultation UK", "Best Ecommerce Agency UK"],
    title: "Contact Ecommerce Marketing Agency UK | Free Growth Audit | BeingEcom",
    description:
      "Contact BeingEcom, the Ecommerce Marketing Agency UK Shopify and WooCommerce founders trust. Book a free 12-point growth audit and revenue plan in 48 hours.",
  },
  "/pricing": {
    primary: "Ecommerce Marketing Agency Pricing UK",
    supporting: ["Ecommerce SEO Pricing UK", "Shopify Agency Pricing UK", "Ecommerce Growth Packages UK"],
    title: "Ecommerce Marketing Agency Pricing UK | Growth Packages | BeingEcom",
    description:
      "Transparent Ecommerce Marketing Agency pricing UK. Starter, Growth and Scale packages for Shopify and WooCommerce brands SEO, paid ads, CRO and Klaviyo email included.",
  },
  "/case-studies": {
    primary: "Ecommerce Growth Case Studies UK",
    supporting: ["Shopify Success Stories UK", "Ecommerce Marketing Results UK", "Best Ecommerce Agency UK"],
    title: "Ecommerce Growth Case Studies UK | Shopify & Woo Results | BeingEcom",
    description:
      "Real ecommerce growth case studies UK Shopify and WooCommerce brands we scaled with SEO, paid ads, CRO and Klaviyo email. Numbers, playbooks and honest takeaways.",
  },
  "/services": {
    primary: "Ecommerce Services UK",
    supporting: ["Ecommerce Marketing Services UK", "Shopify Services UK", "Best Ecommerce Agency UK"],
    title: "Ecommerce Services UK | SEO, Ads, CRO & Klaviyo | BeingEcom",
    description:
      "Full-stack ecommerce services UK: SEO, Google & Meta Ads, CRO, Klaviyo email, Shopify development and analytics one senior team, one revenue P&L.",
  },

  // ── Service leaf pages ──────────────────────────────────────────────────
  "/services/seo": {
    primary: "Ecommerce SEO Agency UK",
    supporting: ["Ecommerce SEO Services UK", "Best Ecommerce SEO Agency UK", "Shopify SEO Agency UK"],
    title: "Ecommerce SEO Agency UK | Shopify & WooCommerce SEO | BeingEcom",
    description:
      "Ecommerce SEO Agency UK for Shopify and WooCommerce brands. Technical SEO, product & collection SEO, digital PR and AI-search visibility that compounds free revenue.",
  },
  "/services/cro": {
    primary: "Ecommerce CRO Agency UK",
    supporting: ["Conversion Rate Optimisation UK", "Shopify CRO Agency UK", "Best Ecommerce CRO Agency UK"],
    title: "Ecommerce CRO Agency UK | Shopify Conversion Rate Optimisation | BeingEcom",
    description:
      "Ecommerce CRO Agency UK turning existing traffic into 2–3× more sales. A/B testing, PDP & checkout optimisation for Shopify and WooCommerce brands.",
  },
  "/services/performance-marketing": {
    primary: "Ecommerce PPC Agency UK",
    supporting: [
      "Ecommerce Paid Ads Agency UK",
      "Shopify Ads Agency UK",
      "Best Ecommerce PPC Agency UK",
      "Meta & Google Ads Agency UK",
    ],
    title: "Ecommerce PPC Agency UK | Meta, Google & TikTok Ads | BeingEcom",
    description:
      "Ecommerce PPC Agency UK managing Meta, Google, TikTok and YouTube ads as one profitable P&L for Shopify and WooCommerce brands. Senior media buyers only.",
  },
  "/services/paid-ads": {
    primary: "Ecommerce Paid Ads Agency UK",
    supporting: ["Meta Ads Agency UK", "Google Ads Agency for Ecommerce UK", "Best Ecommerce Ads Agency UK"],
    title: "Ecommerce Paid Ads Agency UK | Meta & Google Ads | BeingEcom",
    description:
      "Ecommerce Paid Ads Agency UK for Shopify and WooCommerce brands. Meta, Google Shopping, PMax and TikTok creative + media buying that scales profitably.",
  },
  "/services/store-development": {
    primary: "Shopify & WooCommerce Development Agency UK",
    supporting: ["Ecommerce Store Development UK", "Shopify Plus Development UK", "WooCommerce Development UK"],
    title: "Shopify & WooCommerce Development Agency UK | BeingEcom",
    description:
      "Ecommerce store development UK Shopify, Shopify Plus and WooCommerce stores engineered for conversion, speed and SEO by senior UK developers.",
  },
  "/services/store-development/shopify": {
    primary: "Shopify Marketing Agency UK",
    supporting: [
      "Shopify Development Agency UK",
      "Shopify Plus Agency UK",
      "Best Shopify Agency UK",
      "Shopify Ecommerce Agency UK",
    ],
    title: "Shopify Marketing Agency UK | Shopify Plus Development | BeingEcom",
    description:
      "Shopify Marketing Agency UK for growing DTC brands. Shopify & Shopify Plus development, SEO, paid ads, CRO and Klaviyo email one revenue-focused team.",
  },
  "/services/store-development/woocommerce": {
    primary: "WooCommerce Marketing Agency UK",
    supporting: [
      "WooCommerce Development Agency UK",
      "WordPress Ecommerce Agency UK",
      "Best WooCommerce Agency UK",
    ],
    title: "WooCommerce Marketing Agency UK | WordPress Ecommerce | BeingEcom",
    description:
      "WooCommerce Marketing Agency UK building and scaling WordPress ecommerce stores with SEO, paid ads, CRO and Klaviyo email that grows profitable revenue.",
  },
  "/services/email-sms": {
    primary: "Ecommerce Email Marketing Agency UK",
    supporting: ["Klaviyo Agency UK", "Shopify Email Marketing Agency UK", "Best Email Marketing Agency UK"],
    title: "Ecommerce Email Marketing Agency UK | Klaviyo & SMS | BeingEcom",
    description:
      "Ecommerce Email Marketing Agency UK. Klaviyo flows, campaigns and SMS that drive 30–45% of monthly revenue for Shopify and WooCommerce brands.",
  },
  "/services/creative": {
    primary: "Ecommerce Creative Agency UK",
    supporting: ["UGC Agency UK", "Shopify Creative Agency UK", "Best Ecommerce Creative Agency UK"],
    title: "Ecommerce Creative Agency UK | UGC, Static & Video Ads | BeingEcom",
    description:
      "Ecommerce Creative Agency UK producing scroll-stopping UGC, static and video ad creative for Shopify and WooCommerce brands scaling on Meta, Google and TikTok.",
  },
  "/services/ai-automation": {
    primary: "Ecommerce Automation Agency UK",
    supporting: ["AI Ecommerce Agency UK", "Shopify Automation UK", "Best AI Ecommerce Agency UK"],
    title: "Ecommerce Automation Agency UK | AI Workflows for Shopify | BeingEcom",
    description:
      "Ecommerce Automation Agency UK. AI agents and workflows that cut manual work, lift LTV and compound margin for Shopify and WooCommerce brands.",
  },
  "/services/funnel": {
    primary: "Ecommerce Funnel Agency UK",
    supporting: ["Landing Page Agency UK", "Shopify Funnel Agency UK", "Best Ecommerce Funnel Agency UK"],
    title: "Ecommerce Funnel Agency UK | Landing Pages That Convert | BeingEcom",
    description:
      "Ecommerce Funnel Agency UK. High-converting funnels and landing pages for launches, offers and paid traffic on Shopify and WooCommerce brands.",
  },
  "/services/analytics": {
    primary: "Ecommerce Analytics Agency UK",
    supporting: ["GA4 Agency UK", "Ecommerce Tracking Agency UK", "Best Analytics Agency UK"],
    title: "Ecommerce Analytics Agency UK | GA4, Pixel & CAPI Setup | BeingEcom",
    description:
      "Ecommerce Analytics Agency UK. GA4, Meta Pixel, CAPI, server-side tracking and dashboards set up properly for Shopify and WooCommerce brands.",
  },
  "/services/scaling": {
    primary: "Ecommerce Scaling Agency UK",
    supporting: ["Ecommerce Retention Agency UK", "7-Figure Shopify Agency UK", "Best Ecommerce Growth Agency UK"],
    title: "Ecommerce Scaling Agency UK | 6 to 7-Figure Shopify Growth | BeingEcom",
    description:
      "Ecommerce Scaling Agency UK. Systems to scale from 6 to 7 figures and multiply LTV for Shopify and WooCommerce brands senior operators, weekly reporting.",
  },
  "/services/seo/on-page": {
    primary: "On-Page SEO Agency UK",
    supporting: ["Shopify On-Page SEO UK", "Product Page SEO UK", "Best On-Page SEO Agency UK"],
    title: "On-Page SEO Agency UK | Shopify & Woo Product SEO | BeingEcom",
    description:
      "On-Page SEO Agency UK. Titles, schema, copy and internal links that rank Shopify and WooCommerce product & collection pages built by senior ecommerce SEOs.",
  },
  "/services/seo/off-page": {
    primary: "Off-Page SEO Agency UK",
    supporting: ["Digital PR Agency UK", "Ecommerce Link Building UK", "Best Off-Page SEO Agency UK"],
    title: "Off-Page SEO Agency UK | Digital PR & Link Building | BeingEcom",
    description:
      "Off-Page SEO Agency UK. Digital PR and editorial link building that grows Domain Rating and organic rankings for Shopify and WooCommerce brands.",
  },
  "/services/seo/technical": {
    primary: "Technical SEO Agency UK",
    supporting: ["Shopify Technical SEO UK", "Core Web Vitals Agency UK", "Best Technical SEO Agency UK"],
    title: "Technical SEO Agency UK | Shopify & Woo CWV, Crawl & Schema | BeingEcom",
    description:
      "Technical SEO Agency UK. Core Web Vitals, crawl, indexation and schema fixed properly for Shopify and WooCommerce stores by senior ecommerce SEOs.",
  },
  "/services/seo/local": {
    primary: "Local SEO Agency UK",
    supporting: ["Google Business Profile Agency UK", "City SEO Agency UK", "Best Local SEO Agency UK"],
    title: "Local SEO Agency UK | GBP, City Pages & Reviews | BeingEcom",
    description:
      "Local SEO Agency UK. Google Business Profile, city pages and reviews that win 'near me' searches for UK ecommerce and multi-location brands.",
  },
  "/services/seo/aeo": {
    primary: "AEO Agency UK",
    supporting: ["AI Search Optimisation UK", "ChatGPT SEO Agency UK", "Best AEO Agency UK"],
    title: "AEO Agency UK | AI Search & ChatGPT Visibility | BeingEcom",
    description:
      "AEO Agency UK. Get cited in ChatGPT, Perplexity and Google AI Overviews with structured content, schema and entity SEO built for AI search.",
  },
  "/services/seo/international": {
    primary: "International SEO Agency UK",
    supporting: ["Multi-Region SEO UK", "US Ecommerce SEO Agency UK", "Best International SEO Agency UK"],
    title: "International SEO Agency UK | US, EU & Global Ecommerce | BeingEcom",
    description:
      "International SEO Agency UK scaling Shopify and WooCommerce brands into the US, EU and global markets hreflang, technical & content SEO done properly.",
  },
  "/services/performance-marketing/facebook-ads": {
    primary: "Facebook Ads Agency UK",
    supporting: ["Meta Ads Agency UK", "Shopify Facebook Ads UK", "Best Facebook Ads Agency UK"],
    title: "Facebook Ads Agency UK | Meta Ads for Shopify & Woo | BeingEcom",
    description:
      "Facebook Ads Agency UK for Shopify and WooCommerce brands. ASC+, UGC creative and CAPI-clean Meta scaling profitably, by senior UK media buyers.",
  },
  "/services/performance-marketing/instagram-ads": {
    primary: "Instagram Ads Agency UK",
    supporting: ["Reels Ads Agency UK", "Shopify Instagram Ads UK", "Best Instagram Ads Agency UK"],
    title: "Instagram Ads Agency UK | Reels & Stories for Ecommerce | BeingEcom",
    description:
      "Instagram Ads Agency UK. Reels-first, Stories and creator UGC ads that scale Shopify and WooCommerce brands profitably across Meta.",
  },
  "/services/performance-marketing/tiktok-ads": {
    primary: "TikTok Ads Agency UK",
    supporting: ["TikTok Shop Agency UK", "Shopify TikTok Ads UK", "Best TikTok Ads Agency UK"],
    title: "TikTok Ads Agency UK | Spark Ads & TikTok Shop | BeingEcom",
    description:
      "TikTok Ads Agency UK. Native TikTok creative, Spark Ads and TikTok Shop that scale Shopify and WooCommerce brands to new audiences profitably.",
  },
  "/services/performance-marketing/google-ads": {
    primary: "Google Ads Agency for Ecommerce UK",
    supporting: ["PMax Agency UK", "Google Shopping Agency UK", "Best Google Ads Agency UK"],
    title: "Google Ads Agency for Ecommerce UK | Search, Shopping & PMax | BeingEcom",
    description:
      "Google Ads Agency for Ecommerce UK. Search, Shopping and Performance Max with true incrementality for Shopify and WooCommerce brands.",
  },
  "/services/performance-marketing/youtube-ads": {
    primary: "YouTube Ads Agency UK",
    supporting: ["Video Ads Agency UK", "Demand Gen Agency UK", "Best YouTube Ads Agency UK"],
    title: "YouTube Ads Agency UK | Video, Shorts & Demand Gen | BeingEcom",
    description:
      "YouTube Ads Agency UK. Video Action, Demand Gen and Shorts campaigns that grow Shopify and WooCommerce brands profitably.",
  },
  "/services/performance-marketing/media-buying": {
    primary: "Ecommerce Media Buying Agency UK",
    supporting: ["Multi-Channel Media Buying UK", "Paid Media Agency UK", "Best Media Buying Agency UK"],
    title: "Ecommerce Media Buying Agency UK | Multi-Channel P&L | BeingEcom",
    description:
      "Ecommerce Media Buying Agency UK. Meta, Google, TikTok and YouTube managed as one revenue P&L for Shopify and WooCommerce brands.",
  },

  // ── Company sub-pages ───────────────────────────────────────────────────
  "/company": {
    primary: "Ecommerce Agency UK",
    supporting: ["Ecommerce Growth Partner UK", "Best Ecommerce Agency UK"],
    title: "Company | Ecommerce Agency UK for Shopify & Woo | BeingEcom",
    description:
      "Inside BeingEcom the Ecommerce Agency UK helping Shopify and WooCommerce brands scale. Meet the team, methodology, industries served and success stories.",
  },
  "/company/team": {
    primary: "Ecommerce Experts UK",
    supporting: ["Ecommerce Marketing Specialists UK", "Shopify Experts UK", "Ecommerce Growth Team UK"],
    title: "Ecommerce Experts UK | Senior Team | BeingEcom",
    description:
      "Meet the Ecommerce Experts UK behind BeingEcom senior Shopify, WooCommerce, SEO, paid ads, CRO and Klaviyo specialists working from one integrated pod.",
  },
  "/company/founder": {
    primary: "Ecommerce Marketing Consultant UK",
    supporting: ["Ecommerce Founder UK", "Shopify Consultant UK", "Ecommerce Growth Expert UK"],
    title: "Founder | Ecommerce Marketing Consultant UK | BeingEcom",
    description:
      "Meet the founder of BeingEcom, a senior Ecommerce Marketing Consultant UK helping Shopify and WooCommerce founders scale profitably.",
  },
  "/company/why-us": {
    primary: "Best Ecommerce Marketing Agency UK",
    supporting: ["Top Shopify Agency UK", "Ecommerce Growth Agency UK", "Ecommerce Experts UK"],
    title: "Why Choose BeingEcom | Best Ecommerce Marketing Agency UK",
    description:
      "Why founders pick BeingEcom as their Ecommerce Marketing Agency UK senior operators, revenue-first, no juniors, no vanity metrics, transparent reporting.",
  },
  "/company/why-beingecom": {
    primary: "Best Shopify Marketing Agency UK",
    supporting: ["Best Ecommerce Agency UK", "Ecommerce Growth Agency UK", "Shopify Experts UK"],
    title: "Why BeingEcom | Best Shopify Marketing Agency UK",
    description:
      "What makes BeingEcom the best Shopify Marketing Agency UK for founders scaling past 6 figures senior team, integrated growth system, revenue accountability.",
  },
  "/company/methodology": {
    primary: "Ecommerce Growth Framework UK",
    supporting: ["Shopify Growth Methodology UK", "Ecommerce Marketing Process UK", "Best Ecommerce Agency UK"],
    title: "Methodology | Ecommerce Growth Framework UK | BeingEcom",
    description:
      "The BeingEcom Ecommerce Growth Framework UK how we diagnose leaks, sequence sprints and scale Shopify and WooCommerce brands from 6 to 7 figures.",
  },
  "/company/industries": {
    primary: "Ecommerce Agency Industries UK",
    supporting: ["Niche Ecommerce Agency UK", "Fashion & Beauty Ecommerce Agency UK", "DTC Agency UK"],
    title: "Industries We Serve | Ecommerce Agency UK | BeingEcom",
    description:
      "Ecommerce Agency UK serving fashion, beauty, wellness, supplements, jewellery, furniture, pets, food and more niche-specific Shopify and WooCommerce growth playbooks.",
  },
  "/company/success-stories": {
    primary: "Shopify Success Stories UK",
    supporting: ["Ecommerce Growth Case Studies UK", "Ecommerce Marketing Results UK", "Best Ecommerce Agency UK"],
    title: "Shopify Success Stories UK | Growth Case Studies | BeingEcom",
    description:
      "Shopify success stories UK real Shopify and WooCommerce brands scaled by BeingEcom with SEO, paid ads, CRO and Klaviyo email. Numbers and playbooks inside.",
  },
  "/company/reviews": {
    primary: "Ecommerce Agency Reviews UK",
    supporting: ["Shopify Agency Reviews UK", "Best Ecommerce Agency UK", "BeingEcom Reviews"],
    title: "Ecommerce Agency Reviews UK | Client Testimonials | BeingEcom",
    description:
      "Real client reviews of BeingEcom the Ecommerce Marketing Agency UK Shopify and WooCommerce founders trust. Verified testimonials and outcomes.",
  },
  "/company/careers": {
    primary: "Ecommerce Marketing Careers UK",
    supporting: ["Shopify Agency Jobs UK", "Ecommerce Jobs UK", "Best Ecommerce Agency Careers UK"],
    title: "Careers | Ecommerce Marketing Jobs UK | BeingEcom",
    description:
      "Join BeingEcom Ecommerce Marketing careers UK for senior SEOs, media buyers, CRO strategists, Klaviyo specialists and Shopify developers.",
  },
  "/company/certifications": {
    primary: "Certified Ecommerce Agency UK",
    supporting: ["Meta Partner Agency UK", "Google Partner Agency UK", "Klaviyo Master Agency UK"],
    title: "Certifications | Certified Ecommerce Agency UK | BeingEcom",
    description:
      "Certified Ecommerce Agency UK Meta Business Partner, Google Partner, Klaviyo Master, TikTok Partner and GA4-certified operators working on your account.",
  },
  "/company/press": {
    primary: "Ecommerce Agency Press UK",
    supporting: ["BeingEcom in the Press", "Ecommerce Thought Leadership UK", "Best Ecommerce Agency UK"],
    title: "Press | Ecommerce Agency UK Coverage | BeingEcom",
    description:
      "BeingEcom press coverage, features and thought leadership an Ecommerce Marketing Agency UK cited across ecommerce, Shopify and DTC media.",
  },
  "/company/resources": {
    primary: "Ecommerce Growth Resources UK",
    supporting: ["Shopify Growth Guides UK", "Ecommerce Playbooks UK", "Best Ecommerce Resources UK"],
    title: "Resources | Ecommerce Growth Guides UK | BeingEcom",
    description:
      "Free ecommerce growth resources UK Shopify, WooCommerce, SEO, paid ads, CRO and Klaviyo email playbooks from senior operators at BeingEcom.",
  },
  "/company/community": {
    primary: "Ecommerce Founders Community UK",
    supporting: ["Shopify Community UK", "DTC Founders UK", "Ecommerce Growth Community UK"],
    title: "Community | Ecommerce Founders UK | BeingEcom",
    description:
      "Join the BeingEcom Ecommerce Founders Community UK a private space for Shopify and WooCommerce operators scaling profitably.",
  },
  "/company/csr": {
    primary: "Ecommerce Agency CSR UK",
    supporting: ["Sustainable Ecommerce Agency UK", "Ethical Ecommerce Agency UK", "Best Ecommerce Agency UK"],
    title: "CSR | Ecommerce Agency Social Responsibility UK | BeingEcom",
    description:
      "BeingEcom's CSR programme how an Ecommerce Marketing Agency UK gives back through pro-bono work, sustainability and ethical ecommerce partnerships.",
  },
  "/company/technology": {
    primary: "Ecommerce Agency Technology Stack UK",
    supporting: ["Shopify Tech Stack UK", "Klaviyo Stack UK", "Best Ecommerce Tools UK"],
    title: "Technology Stack | Ecommerce Agency UK | BeingEcom",
    description:
      "The technology stack behind BeingEcom, an Ecommerce Marketing Agency UK Shopify, WooCommerce, Klaviyo, GA4, Triple Whale and the tools that scale profitably.",
  },
  "/company/legal": {
    primary: "BeingEcom Legal",
    supporting: ["Ecommerce Agency Terms UK", "Ecommerce Agency MSA UK"],
    title: "Legal | BeingEcom Ecommerce Agency UK",
    description:
      "BeingEcom legal information terms of service, master services agreement and policies for an Ecommerce Marketing Agency UK.",
  },

  // ── Dynamic route formulas (built at runtime in the route's head()) ────
  // /locations/$slug     → primary: "Ecommerce Agency {City}"
  //                        supporting: "Best Ecommerce Agency {City}",
  //                                    "Shopify Agency {City}",
  //                                    "Ecommerce SEO Agency {City}",
  //                                    "Ecommerce PPC Agency {City}",
  //                                    "Ecommerce Growth Agency {City}"
  // /industries/$slug    → primary: "{Industry} Ecommerce Agency UK"
  //                        supporting: "Best {Industry} Ecommerce Agency UK",
  //                                    "{Industry} Ecommerce Marketing Agency UK",
  //                                    "{Industry} Ecommerce SEO Agency UK",
  //                                    "{Industry} Shopify Agency UK",
  //                                    "{Industry} Ecommerce Growth Agency UK"
} as const;

export type KeywordMap = typeof SEO_KEYWORDS;
