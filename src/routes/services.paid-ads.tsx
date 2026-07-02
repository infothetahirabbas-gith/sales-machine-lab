import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../components/site/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd, type FAQ } from "../lib/seo";

const FAQ_LIST: FAQ[] = [
  {
    "q": "Which platforms do you run ads on?",
    "a": "Meta (Facebook/Instagram), Google (Search, Shopping, PMax, YouTube) and TikTok. Channel mix depends on margin, AOV and audience."
  },
  {
    "q": "What's the minimum ad budget to work with you?",
    "a": "We work best with brands spending £8k+/mo on ads. Below that, a focused single-channel sprint usually beats a multi-channel agency."
  },
  {
    "q": "How do you measure success?",
    "a": "Blended MER and contribution margin, not platform ROAS alone. Platform numbers lie; bank-account numbers don't."
  },
  {
    "q": "Do you handle creative?",
    "a": "Yes — UGC, statics and video all in-house. Creative wins more than account structure on Meta and TikTok."
  },
  {
    "q": "How long is the contract?",
    "a": "3-month initial commitment so we can hit a real testing cadence, then rolling monthly."
  }
];

export const Route = createFileRoute("/services/paid-ads")({
  head: () => ({
    meta: [
      { title: "Paid Ads Agency UK — Meta, Google & TikTok Ecommerce PPC | BeingEcom" },
      { name: "description", content: "Paid ads agency in the UK managing Meta, Google and TikTok campaigns for ecommerce brands. Full-funnel media buying built for profitable ROAS on Shopify and WooCommerce." },
      { property: "og:title", content: "Paid Ads Agency UK — Meta, Google & TikTok Ecommerce PPC | BeingEcom" },
      { property: "og:description", content: "Paid ads agency in the UK managing Meta, Google and TikTok campaigns for ecommerce brands. Full-funnel media buying built for profitable ROAS on Shopify and WooCommerce." },
      { property: "og:url", content: "https://beingecom.com/services/paid-ads" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://beingecom.com/services/paid-ads" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({ slug: "paid-ads", name: "Paid Advertising", description: "Meta, Google and TikTok ads built to scale profitably for Shopify and WooCommerce brands." })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Paid Advertising", path: "/services/paid-ads" }])) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQ_LIST, "/services/paid-ads")) },
    ],
  }),
  component: () => (
    <ServicePage cfg={{
      slug: "paid-ads",
      eyebrow: "Paid Advertising",
      heroTitle: "Scale your ecommerce store with profitable ads.",
      heroSub: "Meta, Google & TikTok ads built around creative volume, real targeting, and break-even math.",
      problemTitle: "Why most ecommerce ad accounts bleed money.",
      problemBullets: [
        "Boosting posts and calling it strategy.",
        "Creative fatigue every 2 weeks, no testing pipeline.",
        "Scaling without funnel structure → ROAS collapses.",
      ],
      whatIsTitle: "Ads are a multiplier - not a savior.",
      whatIsBody: "If your store doesn't convert, ads will just lose money faster. We build the creative engine, the funnel, and the testing system that turns ad spend into compounding revenue.",
      systemTitle: "Our paid ads system.",
      systemSteps: [
        { title: "Account & funnel audit", body: "Account structure, pixels, attribution, creative inventory." },
        { title: "Creative engine setup", body: "Hooks, angles, formats - weekly testing pipeline." },
        { title: "Structured campaigns", body: "TOF/MOF/BOF + ASC/Performance Max where it makes sense." },
        { title: "Scale on break-even", body: "Spend more only where unit economics work." },
      ],
      pillarsTitle: "Channels we run.",
      pillars: [
        { title: "Meta Ads", body: "Facebook + Instagram, the workhorse of DTC." },
        { title: "Google Ads", body: "Search, Shopping, PMax - capture intent." },
        { title: "TikTok Ads", body: "Native UGC creatives, top-funnel virality." },
        { title: "Retargeting", body: "Email + paid retargeting + dynamic product ads." },
      ],
      deepBlocks: [
        { title: "Meta Ads system", body: "Campaign structure, ASC+ scaling, creative testing, audience strategy.", tags: ["ASC","CBO","UGC","DPA"] },
        { title: "Google Ads system", body: "Search, Shopping, PMax, brand-defense, feed optimisation.", tags: ["PMax","Shopping","Feed"] },
        { title: "TikTok Ads system", body: "Native creators, spark ads, hooks-first scripting.", tags: ["Spark","UGC","Hooks"] },
        { title: "Creative testing framework", body: "Weekly batches: hooks, formats, angles. Winners scale, losers die fast.", tags: ["Hooks","Angles","Iteration"] },
        { title: "Retargeting system", body: "Layered audiences, dynamic catalogue, post-purchase exclusions.", tags: ["DPA","Exclusion","Cross-sell"] },
        { title: "Scaling campaign structure", body: "Vertical vs horizontal scaling, MER targets, blended ROAS focus.", tags: ["MER","Blended ROAS","Spend curves"] },
      ],
      triggersTitle: "Creative angles that work in 2025.",
      triggers: ["Problem-solution UGC","Founder story","Before/after","Product demo","Testimonial stack","List/Top-X","Comparison","Native review","Stitch / duet"],
      beforeAfter: {
        before: ["1.6× ROAS","2 ads, no testing","£80 CAC","Stuck at £15K/mo"],
        after: ["3.4× ROAS","12+ creatives in rotation","£38 CAC","£95K/mo with stable ROAS"],
      },
      caseStudy: {
        title: "Gadget store: 0 → £62K/mo in 90 days",
        problem: "Cold launch, weak creatives, untested angles.",
        strategy: "10 creator-driven UGC ads, ASC+ scaling, exclusions tightened.",
        result: "Scaled to £62K MRR at 2.6× ROAS in 90 days.",
        metrics: [{ label: "MRR", value: "£62K" }, { label: "ROAS", value: "2.6×" }, { label: "Days", value: "90" }],
      },
      ctaTitle: "Want ad spend to actually print revenue?",
      impactStats: [
        { value: "4.1×", label: "Blended ROAS" },
        { value: "-38%", label: "Avg CPA" },
        { value: "+186%", label: "Revenue at scale" },
      ],
      metricBars: [
        { label: "ROAS", before: 1.6, after: 4.1, unit: "×", description: "Revenue ÷ ad spend across Meta + Google + TikTok blended." },
        { label: "CPA", before: 48, after: 22, unit: "£", description: "Cost per acquired customer. Lower CPA = profitable scaling room." },
        { label: "CTR", before: 0.9, after: 2.4, unit: "%", description: "Click-through rate on cold traffic ads — the hook-rate signal." },
        { label: "CPM efficiency", before: 32, after: 18, unit: "£", description: "Cost per 1,000 impressions. Reflects creative + audience strength." },
        { label: "Monthly ad revenue", before: 64, after: 246, unit: "£k", description: "Top-line revenue attributable to paid channels per month." },
      ],
      faqs: FAQ_LIST,
    }} />
  ),
});
