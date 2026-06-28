import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../components/site/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd } from "../lib/seo";

export const Route = createFileRoute("/services/performance-marketing/facebook-ads")({
  head: () => ({
    meta: [
      { title: "Facebook Ads Agency UK — Meta Ads for Shopify & WooCommerce | BeingEcom" },
      { name: "description", content: "UK Facebook & Instagram ads agency. Creative-led Meta ads, ASC+ scaling and break-even media buying for ecommerce brands." },
      { name: "keywords", content: "facebook ads agency uk, meta ads agency, instagram ads agency, shopify facebook ads, dtc meta ads, ASC+ scaling" },
      { property: "og:title", content: "Facebook Ads Agency UK | BeingEcom" },
      { property: "og:description", content: "Profitable Meta ads — creative volume, ASC+ scaling and break-even math." },
      { property: "og:url", content: "https://beingecom.com/services/performance-marketing/facebook-ads" },
    ],
    links: [{ rel: "canonical", href: "https://beingecom.com/services/performance-marketing/facebook-ads" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({ slug: "performance-marketing/facebook-ads", name: "Facebook Ads", description: "Meta & Instagram ads engineered to scale ROAS for ecommerce." })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Performance Marketing", path: "/services/performance-marketing" }, { name: "Facebook Ads", path: "/services/performance-marketing/facebook-ads" }])) },
    ],
  }),
  component: () => (
    <ServicePage cfg={{
      slug: "facebook-ads",
      eyebrow: "Facebook Ads",
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
        { title: "Retargeting & DPA", body: "Dynamic catalog, post-purchase exclusions." },
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
        { title: "DPA & retargeting", body: "Dynamic catalog, layered audiences, exclusion logic.", tags: ["DPA","Exclusion","Cross-sell"] },
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
    }} />
  ),
});
