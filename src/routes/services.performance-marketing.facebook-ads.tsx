import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../components/site/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd, type FAQ } from "../lib/seo";
import heroImg from "../assets/hero-performance-marketing.jpg";

const FAQ_LIST: FAQ[] = [
  {
    "q": "How much should I spend on Facebook ads to start?",
    "a": "Minimum £3–5k/mo for meaningful testing. Below that, Meta's learning phase never settles."
  },
  {
    "q": "What ROAS should I expect?",
    "a": "2.5–3.5× blended ROAS is healthy for most DTC brands; 4×+ is exceptional. We optimise for MER and contribution margin, not platform ROAS only."
  },
  {
    "q": "How many creatives do I need each month?",
    "a": "10–20 net-new creatives is the floor for ASC+ to keep finding winners. Fewer than that, you stall."
  },
  {
    "q": "Do you set up Conversions API and pixel?",
    "a": "Yes — full CAPI via Shopify, GTM server-side or custom — with EMQ above 8 and proper deduplication."
  },
  {
    "q": "What's ASC+ and should I be using it?",
    "a": "Advantage+ Shopping Campaigns — Meta's broad-targeting AI engine. Yes, for most ecommerce accounts above £8k/mo it outperforms manual."
  }
];

export const Route = createFileRoute("/services/performance-marketing/facebook-ads")({
  head: () => ({
    meta: [
      { title: "Facebook & Meta Ads Agency UK — Shopify Meta Ads Experts | BeingEcom" },
      { name: "description", content: "Facebook and Instagram Ads agency in the UK for Shopify and DTC brands. ASC+ scaling, creator UGC and CAPI-clean tracking built for profitable Meta Ads performance." },
      { property: "og:title", content: "Facebook & Meta Ads Agency UK — Shopify Meta Ads Experts | BeingEcom" },
      { property: "og:description", content: "Facebook and Instagram Ads agency in the UK for Shopify and DTC brands. ASC+ scaling, creator UGC and CAPI-clean tracking built for profitable Meta Ads performance." },
      { property: "og:url", content: "https://beingecom.com/services/performance-marketing/facebook-ads" },
    ],
    links: [{ rel: "canonical", href: "https://beingecom.com/services/performance-marketing/facebook-ads" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({ slug: "performance-marketing/facebook-ads", name: "Facebook Ads", description: "Meta & Instagram ads engineered to scale ROAS for ecommerce." })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Performance Marketing", path: "/services/performance-marketing" }, { name: "Facebook Ads", path: "/services/performance-marketing/facebook-ads" }])) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQ_LIST, "/services/performance-marketing/facebook-ads")) },
    ],
  }),
  component: () => (
    <ServicePage cfg={{
      slug: "facebook-ads",
      eyebrow: "Facebook Ads",
      heroImage: heroImg,
      heroTitle: "Facebook & Instagram ads that print revenue.",
      heroSub: "Creative volume, ASC+ scaling and break-even math — Meta ads engineered for profitable ecommerce growth.",
      problemTitle: "Why most Meta accounts stop scaling.",
      problemBullets: [
        "2-3 creatives in rotation, fatigue every 14 days.",
        "Boosting posts instead of a real campaign structure.",
        "Scaling spend without break-even unit economics.",
      ],
      whatIsTitle: "Meta is a creative testing machine.",
      whatIsBody: "Account structure matters, but creative wins. We ship weekly batches of hooks, angles and formats, then scale only what crosses break-even.",
      systemTitle: "Our Facebook Ads system.",
      systemSteps: [
        { title: "Account & pixel audit", body: "CAPI, attribution, exclusions, asset library." },
        { title: "Creative engine", body: "Weekly batches of UGC, statics, founder, demo." },
        { title: "ASC+ & manual scale", body: "ASC+ for prospecting, manual for control." },
        { title: "Retargeting & DPA", body: "Dynamic catalogue, post-purchase exclusions." },
      ],
      pillarsTitle: "What we run inside Meta.",
      pillars: [
        { title: "ASC+ Shopping", body: "Advantage+ for cold prospecting at scale." },
        { title: "CBO prospecting", body: "Manual structure for category & angle tests." },
        { title: "DPA retargeting", body: "Dynamic product ads with smart exclusions." },
        { title: "UGC creative", body: "Creator-driven hooks and Spark-style assets." },
      ],
      deepBlocks: [
        { title: "Campaign structure", body: "ASC+ for scale, CBO for control, separated by margin tier.", tags: ["ASC+","CBO","Margin"] },
        { title: "Creative testing", body: "Hooks, angles, formats — weekly batches with win/kill rules.", tags: ["Hooks","UGC","Iteration"] },
        { title: "CAPI & attribution", body: "Conversions API, deduplication, EMQ score >8.", tags: ["CAPI","EMQ","Server-side"] },
        { title: "DPA & retargeting", body: "Dynamic catalogue, layered audiences, exclusion logic.", tags: ["DPA","Exclusion","Cross-sell"] },
      ],
      triggersTitle: "Creative angles that scale on Meta.",
      triggers: ["Problem-solution UGC","Founder story","Before/after","Product demo","Testimonial stack","List/Top-X","Native review","Comparison"],
      beforeAfter: {
        before: ["1.4× ROAS","2 creatives, no testing","£72 CAC","Stuck at £18K/mo"],
        after: ["3.2× ROAS","12+ creatives in rotation","£36 CAC","£92K/mo with stable ROAS"],
      },
      caseStudy: {
        title: "Beauty brand: £18K → £92K/mo in 120 days",
        problem: "Creative fatigue, no testing pipeline, ASC+ never adopted.",
        strategy: "Weekly creator UGC batches, ASC+ scaling, CAPI cleanup.",
        result: "£92K MRR at 3.2× ROAS in 120 days.",
        metrics: [{ label: "MRR", value: "£92K" }, { label: "ROAS", value: "3.2×" }, { label: "Days", value: "120" }],
      },
      ctaTitle: "Want Meta to actually scale profitably?",
      impactStats: [
        { value: "3.2×", label: "Avg ROAS" },
        { value: "-50%", label: "CAC reduction" },
        { value: "+410%", label: "Monthly revenue" },
      ],
      metricBars: [
        { label: "ROAS", before: 1.4, after: 3.2, unit: "×", description: "Revenue ÷ Meta ad spend." },
        { label: "CAC", before: 72, after: 36, unit: "£", description: "Cost per acquired customer on Meta." },
        { label: "CTR", before: 0.8, after: 2.3, unit: "%", description: "Click-through rate on cold creatives." },
        { label: "Monthly ad revenue", before: 18, after: 92, unit: "£k", description: "Top-line Meta-attributed revenue." },
      ],
      faqs: FAQ_LIST,
    }} />
  ),
});
