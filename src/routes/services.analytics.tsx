import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../components/site/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd, type FAQ } from "../lib/seo";
import heroImg from "../assets/hero-analytics.jpg";

const FAQ_LIST: FAQ[] = [
  {
    "q": "Why is my GA4 revenue different from Shopify?",
    "a": "Usually attribution windows, missing CAPI events, ad blockers or duplicate orders. We reconcile GA4, Meta, Shopify and Klaviyo so one number is the truth."
  },
  {
    "q": "Do you set up GA4, Meta CAPI and Google Ads conversions?",
    "a": "Yes - full GA4 + GTM server-side + Meta Conversions API + Google Enhanced Conversions with proper deduplication."
  },
  {
    "q": "What dashboards do you build?",
    "a": "Live revenue, blended ROAS, MER, new-customer CAC, contribution margin, channel mix and cohort LTV - usually in Looker Studio or Hyros."
  },
  {
    "q": "Can you fix iOS 14 tracking loss?",
    "a": "We restore 25–40% of lost signal via CAPI, server-side GTM and Enhanced Conversions - the rest comes from blended MER decisions, not pixel-only."
  },
  {
    "q": "Do I need Triple Whale, Northbeam or Hyros?",
    "a": "Only if you spend >£40k/mo on ads. Below that, GA4 + server-side tagging + a clean Looker dashboard is faster and cheaper."
  }
];

export const Route = createFileRoute("/services/analytics")({
  head: () => ({
    meta: [
      { title: "Ecommerce Analytics Agency UK | GA4, Pixel & CAPI Setup | BeingEcom" },
      { name: "description", content: "Ecommerce Analytics Agency UK. GA4, Meta Pixel, CAPI, server-side tracking and dashboards — set up properly for Shopify and WooCommerce brands." },
      { property: "og:title", content: "Ecommerce Analytics Agency UK | GA4, Pixel & CAPI Setup | BeingEcom" },
      { property: "og:description", content: "Ecommerce Analytics Agency UK. GA4, Meta Pixel, CAPI, server-side tracking and dashboards — set up properly for Shopify and WooCommerce brands." },
      { property: "og:url", content: "https://beingecom.com/services/analytics" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://beingecom.com/services/analytics" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({ slug: "analytics", name: "Analytics & Tracking", description: "GA4, Meta Pixel, Conversion API and revenue dashboards for Shopify and WooCommerce." })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Analytics & Tracking", path: "/services/analytics" }])) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQ_LIST, "/services/analytics")) },
    ],
  }),
  component: () => (
    <ServicePage cfg={{
      slug: "analytics",
      eyebrow: "Analytics & Tracking",
      heroImage: heroImg,
      heroTitle: "Track every sale, click, and customer behavior.",
      heroSub: "GA4, Meta Pixel, conversion API, dashboards, and attribution - set up correctly, once.",
      problemTitle: "Most stores are flying blind.",
      problemBullets: [
        "GA4 set up wrong - missing 30%+ of conversions.",
        "Meta Pixel without CAPI = broken attribution.",
        "No single dashboard. Decisions made on vibes.",
      ],
      whatIsTitle: "If you can't measure it, you can't scale it.",
      whatIsBody: "Tracking is the foundation. Every CRO, ad, and retention decision is downstream of clean data. We fix the plumbing so your decisions stop being guesses.",
      systemTitle: "Our analytics system.",
      systemSteps: [
        { title: "Audit", body: "Find broken events, duplicate pixels, attribution gaps." },
        { title: "Rebuild", body: "GA4 + GTM + Meta CAPI + server-side where needed." },
        { title: "Dashboard", body: "Single source of truth - daily, weekly, monthly views." },
        { title: "Train", body: "Your team uses the data - not just stares at it." },
      ],
      pillarsTitle: "Pillars of clean ecommerce data.",
      pillars: [
        { title: "Capture", body: "Every event, every channel, no gaps." },
        { title: "Stitch", body: "Sessions, users, orders - joined cleanly." },
        { title: "Report", body: "Dashboards that answer real questions." },
        { title: "Decide", body: "Weekly reviews → action items, not chart-watching." },
      ],
      deepBlocks: [
        { title: "GA4 setup system", body: "Enhanced ecommerce, event taxonomy, custom dimensions, audiences.", tags: ["GA4","Events","Audiences"] },
        { title: "Meta Pixel + CAPI", body: "Browser + server events, dedup, parameter quality, EMQ score.", tags: ["Pixel","CAPI","EMQ"] },
        { title: "Event tracking system", body: "Standard + custom events across PDP, checkout, post-purchase.", tags: ["GTM","Triggers","Tags"] },
        { title: "Conversion tracking setup", body: "Google Ads + Meta + TikTok, deduped against orders.", tags: ["Google","Meta","TikTok"] },
        { title: "Dashboard creation", body: "Looker Studio / Triple Whale dashboards - daily P&L view.", tags: ["Looker","Triple Whale","P&L"] },
        { title: "Funnel + behavior analytics", body: "Hotjar heatmaps, session recordings, funnel reports.", tags: ["Hotjar","Funnel","Recordings"] },
      ],
      beforeAfter: {
        before: ["GA4 broken","Pixel-only attribution","No dashboard","Decisions on gut feel"],
        after: ["GA4 + GTM clean","CAPI + server-side","Daily P&L dashboard","Weekly KPI standup"],
      },
      caseStudy: {
        title: "Brand store: data fix → +28% ad efficiency",
        problem: "Misattributed spend, double-counted conversions.",
        strategy: "Rebuilt GA4 + CAPI, set up Triple Whale, weekly KPI review.",
        result: "Spend reallocated. ROAS up 28% without changing creatives.",
        metrics: [{ label: "ROAS", value: "+28%" }, { label: "EMQ", value: "9.6/10" }, { label: "Attribution", value: "100% deduped" }],
      },
      ctaTitle: "Stop scaling on broken data.",
      impactStats: [
        { value: "98%", label: "Event-tracking accuracy" },
        { value: "+41%", label: "iOS conversion match" },
        { value: "3.2×", label: "Faster decisions" },
      ],
      metricBars: [
        { label: "Event accuracy", before: 62, after: 98, unit: "%", description: "Share of purchases/add-to-carts correctly captured by GA4 + Meta CAPI." },
        { label: "iOS attribution match", before: 41, after: 82, unit: "%", description: "Conversions matched server-side after iOS 14.5 + cookie loss." },
        { label: "Data-to-decision lag", before: 7, after: 1, unit: " d", description: "Days from event → dashboard → action. Faster loops = faster compounding." },
        { label: "ROAS reporting variance", before: 38, after: 6, unit: "%", description: "Gap between Meta-reported ROAS and true server-side ROAS." },
        { label: "Tracked monthly revenue", before: 124, after: 312, unit: "£k", description: "Revenue correctly attributed back to its channel each month." },
      ],
      faqs: FAQ_LIST,
    }} />
  ),
});
