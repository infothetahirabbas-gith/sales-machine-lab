import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../components/site/ServicePage";

export const Route = createFileRoute("/services/analytics")({
  component: () => (
    <ServicePage cfg={{
      slug: "analytics",
      eyebrow: "Analytics & Tracking",
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
    }} />
  ),
});
