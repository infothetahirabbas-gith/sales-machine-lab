import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../components/site/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd, type FAQ } from "../lib/seo";
import heroImg from "../assets/hero-scaling.jpg";

const FAQ_LIST: FAQ[] = [
  {
    "q": "How do you scale a 6-figure store to 7 figures?",
    "a": "Three levers: profitable acquisition, retention/LTV, and offer engineering. We work all three, not just ads."
  },
  {
    "q": "What's the role of retention vs acquisition?",
    "a": "Acquisition gets you to £1m; retention gets you to £5m. We rebuild LTV via email, SMS, loyalty and subscription where it fits."
  },
  {
    "q": "Do you help with offer and pricing?",
    "a": "Yes - bundles, tiered pricing, free-shipping thresholds, subscription, and back-end upsells are part of the scaling plan."
  },
  {
    "q": "What margins do I need to scale?",
    "a": "60%+ contribution margin gives you room. Below 40% we fix margin before we add ad spend."
  },
  {
    "q": "Do you provide a CFO-style view of the business?",
    "a": "Yes - weekly MER, contribution-margin, inventory-turn and cash dashboards so you scale on profit, not vanity revenue."
  }
];

export const Route = createFileRoute("/services/scaling")({
  head: () => ({
    meta: [
      { title: "Ecommerce Scaling Agency UK | 6 to 7-Figure Shopify Growth | BeingEcom" },
      { name: "description", content: "Ecommerce Scaling Agency UK. Systems to scale from 6 to 7 figures and multiply LTV for Shopify and WooCommerce brands senior operators, weekly reporting." },
      { property: "og:title", content: "Ecommerce Scaling Agency UK | 6 to 7-Figure Shopify Growth | BeingEcom" },
      { property: "og:description", content: "Ecommerce Scaling Agency UK. Systems to scale from 6 to 7 figures and multiply LTV for Shopify and WooCommerce brands senior operators, weekly reporting." },
      { property: "og:url", content: "https://beingecom.com/services/scaling" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://beingecom.com/services/scaling" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({ slug: "scaling", name: "Scaling & Revenue Strategy", description: "Profitable scaling from 6 to 7 figures with retention, LTV, channel mix and offer engineering." })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Scaling & Revenue Strategy", path: "/services/scaling" }])) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQ_LIST, "/services/scaling")) },
    ],
  }),
  component: () => (
    <ServicePage cfg={{
      slug: "scaling",
      eyebrow: "Scaling & Revenue Growth Strategy",
      heroImage: heroImg,
      heroTitle: "Scale your store beyond £10K-£100K/month.",
      heroSub: "Profit-led scaling system - built on margins, MER, LTV, and break-even ROAS targets.",
      problemTitle: "Most stores can't scale past their first plateau.",
      problemBullets: [
        "ROAS collapses every time spend goes up.",
        "Margins disappear with discounts and shipping.",
        "No clear scaling roadmap - just 'spend more'.",
      ],
      whatIsTitle: "Scaling ≠ starting.",
      whatIsBody: "The thinking, math, and operations that get you to £10K/mo will quietly kill you at £100K/mo. We rebuild the financial model, attribution, and growth plan for the next stage.",
      systemTitle: "Our scaling system.",
      systemSteps: [
        { title: "Revenue model", body: "Margins, contribution, CAC, LTV, MER - modelled end to end." },
        { title: "Break-even ROAS", body: "Set the floor that makes ad scaling safe." },
        { title: "Channel mix", body: "Diversify beyond Meta - Google, TikTok, SEO, email." },
        { title: "Operational scale", body: "Inventory, ops, CX, fulfillment ready for volume." },
      ],
      pillarsTitle: "Pillars of scalable growth.",
      pillars: [
        { title: "Unit economics", body: "Every order makes money - even at scale." },
        { title: "Diversification", body: "No single channel risk." },
        { title: "Retention", body: "LTV carries the math at higher CAC." },
        { title: "Ops readiness", body: "Backend doesn't break under volume." },
      ],
      deepBlocks: [
        { title: "Profit margin optimisation", body: "Pricing, bundles, AOV-raising offers, shipping math.", tags: ["Pricing","Bundles","Shipping"] },
        { title: "Budget scaling strategy", body: "Vertical vs horizontal scaling, ASC+ usage, MER targeting.", tags: ["MER","ASC","Vertical/horiz"] },
        { title: "Multi-channel scaling", body: "Meta + Google + TikTok + SEO + email working together.", tags: ["Meta","Google","TikTok","SEO"] },
        { title: "Data-driven decisions", body: "Triple Whale / Northbeam attribution + weekly KPI reviews.", tags: ["Attribution","Northbeam","KPIs"] },
        { title: "KPI tracking system", body: "MER, CAC, AOV, CR, LTV, contribution margin - all in one dashboard.", tags: ["Dashboard","MER","CM"] },
        { title: "LTV strategy", body: "Subscription, post-purchase, reorder cadence, VIP program.", tags: ["Subscription","VIP","Reorder"] },
      ],
      triggersTitle: "Common scaling mistakes to avoid.",
      triggers: ["Scaling unprofitable creatives","Ignoring contribution margin","Discount-driven 'growth'","One-channel reliance","No retention engine","Promo dependency"],
      beforeAfter: {
        before: ["£20K/mo plateau","ROAS collapse on scale","No attribution","One channel"],
        after: ["£150K+/mo","Stable 3×+ blended ROAS","Triple Whale dashboards","Meta + Google + email mix"],
      },
      caseStudy: {
        title: "Apparel brand: £25K → £214K/mo scale",
        problem: "Stuck at £25K/mo for 9 months, ROAS unstable.",
        strategy: "Rebuilt unit economics, scaled creative volume, added Google + email.",
        result: "£214K/mo at 3.8× blended ROAS, contribution margin healthy.",
        metrics: [{ label: "MRR", value: "8.5×" }, { label: "MER", value: "3.8×" }, { label: "CM", value: "+11pp" }],
      },
      ctaTitle: "Ready to scale - profitably?",
      impactStats: [
        { value: "£1.2M+", label: "Monthly run-rate" },
        { value: "3.4×", label: "Sustained ROAS" },
        { value: "+42%", label: "Contribution margin" },
      ],
      metricBars: [
        { label: "Monthly revenue", before: 86, after: 412, unit: "£k", description: "Top-line monthly revenue once the scaling system stabilises." },
        { label: "Blended ROAS", before: 2.1, after: 3.4, unit: "×", description: "Total revenue ÷ total marketing spend across every channel." },
        { label: "Contribution margin", before: 18, after: 34, unit: "%", description: "Revenue minus COGS + shipping + ad cost - the real profit lever." },
        { label: "Repeat revenue share", before: 22, after: 48, unit: "%", description: "Share of monthly revenue coming from returning customers." },
        { label: "Channel diversification", before: 1, after: 4, description: "Profitable revenue channels (Meta, Google, TikTok, Email, Organic)." },
      ],
      faqs: FAQ_LIST,
    }} />
  ),
});
