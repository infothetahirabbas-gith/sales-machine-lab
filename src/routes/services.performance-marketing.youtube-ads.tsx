import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../components/site/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd, type FAQ } from "../lib/seo";
import heroImg from "../assets/hero-performance-marketing.jpg";

const FAQ_LIST: FAQ[] = [
  { q: "Do YouTube ads work for ecommerce?", a: "Yes — Video Action Campaigns and Demand Gen convert profitably for DTC brands with the right creative and CAPI-clean tracking." },
  { q: "What's the minimum spend to test YouTube?", a: "£3k–£5k/mo for a 30-day read. Below that, YouTube's learning can't stabilise." },
  { q: "Which YouTube ad formats do you run?", a: "Video Action Campaigns (VAC), Demand Gen, Shorts ads, and In-stream skippable — matched to funnel stage." },
  { q: "How long should a YouTube ad be?", a: "15–60s for cold prospecting VAC; 6s bumpers for retargeting; 15–30s vertical Shorts for mobile-first reach." },
  { q: "Do I need a Google Ads account already?", a: "Yes — YouTube ads run through Google Ads. We set up Merchant Center, GA4, enhanced conversions and CAPI where needed." },
];

export const Route = createFileRoute("/services/performance-marketing/youtube-ads")({
  head: () => ({
    meta: [
      { title: "YouTube Ads Agency UK — Video Action & Demand Gen for Ecommerce | BeingEcom" },
      { name: "description", content: "YouTube Ads agency in the UK for Shopify and DTC brands. Video Action Campaigns, Demand Gen and Shorts creative built for profitable performance." },
      { property: "og:title", content: "YouTube Ads Agency UK — Video Action & Demand Gen for Ecommerce | BeingEcom" },
      { property: "og:description", content: "YouTube Ads agency in the UK for Shopify and DTC brands. Video Action Campaigns, Demand Gen and Shorts creative built for profitable performance." },
      { property: "og:url", content: "https://beingecom.com/services/performance-marketing/youtube-ads" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://beingecom.com/services/performance-marketing/youtube-ads" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({ slug: "performance-marketing/youtube-ads", name: "YouTube Ads", description: "YouTube Ads for ecommerce — VAC, Demand Gen, Shorts and skippable in-stream." })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Performance Marketing", path: "/services/performance-marketing" }, { name: "YouTube Ads", path: "/services/performance-marketing/youtube-ads" }])) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQ_LIST, "/services/performance-marketing/youtube-ads")) },
    ],
  }),
  component: () => (
    <ServicePage cfg={{
      slug: "youtube-ads",
      eyebrow: "YouTube Ads",
      heroImage: heroImg,
      heroTitle: "YouTube ads engineered for revenue — not just views.",
      heroSub: "Video Action Campaigns, Demand Gen and Shorts ads for Shopify and DTC brands that want profitable YouTube growth.",
      problemTitle: "Why most YouTube ad accounts burn cash.",
      problemBullets: [
        "Boosted brand videos with no direct-response structure.",
        "Zero Shorts creative in a Shorts-first algorithm.",
        "Broken enhanced conversions and no offline import.",
      ],
      whatIsTitle: "YouTube is the biggest untapped DR channel.",
      whatIsBody: "Meta and Google Search are crowded and expensive. YouTube's inventory is huge, CPMs still competitive, and Video Action Campaigns can print acquisition when the creative is right.",
      systemTitle: "Our YouTube Ads system.",
      systemSteps: [
        { title: "Account & tracking audit", body: "Google Ads, GA4, Merchant Center, enhanced conversions, CAPI." },
        { title: "Creative engine", body: "Weekly 15/30/60s hooks + 6s bumpers + 9:16 Shorts." },
        { title: "VAC + Demand Gen", body: "Video Action for lower funnel, Demand Gen for scale." },
        { title: "Retargeting & sequencing", body: "Bumper stacks and DR sequences after first view." },
      ],
      pillarsTitle: "What we run on YouTube.",
      pillars: [
        { title: "Video Action Campaigns", body: "Google's core DR video product — scales with the right creative." },
        { title: "Demand Gen", body: "YouTube + Discover + Gmail unified across the ecosystem." },
        { title: "Shorts ads", body: "9:16 vertical inventory Meta doesn't own." },
        { title: "Retargeting", body: "6s bumpers + skippable stacks to warm audiences." },
      ],
      deepBlocks: [
        { title: "Video Action Campaigns", body: "Skippable in-stream + in-feed + Shorts — bidding for conversions.", tags: ["VAC","In-stream","In-feed"] },
        { title: "Demand Gen", body: "Cross-surface Google DG for reach + conversion at scale.", tags: ["Demand Gen","YouTube","Discover"] },
        { title: "Shorts creative", body: "9:16 vertical, hook in 2s, native to the Shorts feed.", tags: ["Shorts","9:16","Hook"] },
        { title: "Tracking & attribution", body: "Enhanced conversions, GA4, Merchant Center, offline import.", tags: ["Enhanced","GA4","Offline"] },
      ],
      triggersTitle: "YouTube creative angles that convert.",
      triggers: ["Problem-solution","Founder story","Product demo","Review compilation","UGC testimonial","Comparison","Explainer","Native Shorts"],
      beforeAfter: {
        before: ["No YouTube presence","Boosted brand video only","No Shorts creative","Broken tracking"],
        after: ["3.1× VAC ROAS","Full-funnel DR structure","Weekly Shorts assets","Enhanced conv. + CAPI clean"],
      },
      caseStudy: {
        title: "Wellness brand: £0 → £68K/mo on YouTube in 90 days",
        problem: "Never run YouTube ads, no video creative, no tracking.",
        strategy: "5 VAC creatives + Shorts batch + Demand Gen retargeting + enhanced conv.",
        result: "£68K MRR at 3.1× ROAS in 90 days, incremental to Meta.",
        metrics: [{ label: "MRR", value: "£68K" }, { label: "ROAS", value: "3.1×" }, { label: "Days", value: "90" }],
      },
      ctaTitle: "Turn YouTube into a profitable acquisition channel.",
      impactStats: [
        { value: "3.1×", label: "VAC ROAS" },
        { value: "£68K", label: "New MRR" },
        { value: "90d", label: "To scale" },
      ],
      metricBars: [
        { label: "ROAS", before: 0.9, after: 3.1, unit: "×", description: "Revenue ÷ YouTube ad spend." },
        { label: "CPA", before: 92, after: 34, unit: "£", description: "Cost per acquisition from VAC." },
        { label: "View-through rate", before: 18, after: 42, unit: "%", description: "VTR on skippable in-stream." },
        { label: "Monthly ad revenue", before: 0, after: 68, unit: "£k", description: "Top-line YouTube-attributed revenue." },
      ],
      faqs: FAQ_LIST,
    }} />
  ),
});
