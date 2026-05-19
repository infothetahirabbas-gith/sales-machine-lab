import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../components/site/ServicePage";

export const Route = createFileRoute("/services/scaling")({
  component: () => (
    <ServicePage cfg={{
      slug: "scaling",
      eyebrow: "Scaling & Revenue Growth Strategy",
      heroTitle: "Scale your store beyond $10K–$100K/month.",
      heroSub: "Profit-led scaling system – built on margins, MER, LTV, and break-even ROAS targets.",
      problemTitle: "Most stores can't scale past their first plateau.",
      problemBullets: [
        "ROAS collapses every time spend goes up.",
        "Margins disappear with discounts and shipping.",
        "No clear scaling roadmap – just 'spend more'.",
      ],
      whatIsTitle: "Scaling ≠ starting.",
      whatIsBody: "The thinking, math, and operations that get you to $10K/mo will quietly kill you at $100K/mo. We rebuild the financial model, attribution, and growth plan for the next stage.",
      systemTitle: "Our scaling system.",
      systemSteps: [
        { title: "Revenue model", body: "Margins, contribution, CAC, LTV, MER – modeled end to end." },
        { title: "Break-even ROAS", body: "Set the floor that makes ad scaling safe." },
        { title: "Channel mix", body: "Diversify beyond Meta – Google, TikTok, SEO, email." },
        { title: "Operational scale", body: "Inventory, ops, CX, fulfillment ready for volume." },
      ],
      pillarsTitle: "Pillars of scalable growth.",
      pillars: [
        { title: "Unit economics", body: "Every order makes money – even at scale." },
        { title: "Diversification", body: "No single channel risk." },
        { title: "Retention", body: "LTV carries the math at higher CAC." },
        { title: "Ops readiness", body: "Backend doesn't break under volume." },
      ],
      deepBlocks: [
        { title: "Profit margin optimization", body: "Pricing, bundles, AOV-raising offers, shipping math.", tags: ["Pricing","Bundles","Shipping"] },
        { title: "Budget scaling strategy", body: "Vertical vs horizontal scaling, ASC+ usage, MER targeting.", tags: ["MER","ASC","Vertical/horiz"] },
        { title: "Multi-channel scaling", body: "Meta + Google + TikTok + SEO + email working together.", tags: ["Meta","Google","TikTok","SEO"] },
        { title: "Data-driven decisions", body: "Triple Whale / Northbeam attribution + weekly KPI reviews.", tags: ["Attribution","Northbeam","KPIs"] },
        { title: "KPI tracking system", body: "MER, CAC, AOV, CR, LTV, contribution margin – all in one dashboard.", tags: ["Dashboard","MER","CM"] },
        { title: "LTV strategy", body: "Subscription, post-purchase, reorder cadence, VIP program.", tags: ["Subscription","VIP","Reorder"] },
      ],
      triggersTitle: "Common scaling mistakes to avoid.",
      triggers: ["Scaling unprofitable creatives","Ignoring contribution margin","Discount-driven 'growth'","One-channel reliance","No retention engine","Promo dependency"],
      beforeAfter: {
        before: ["$20K/mo plateau","ROAS collapse on scale","No attribution","One channel"],
        after: ["$150K+/mo","Stable 3×+ blended ROAS","Triple Whale dashboards","Meta + Google + email mix"],
      },
      caseStudy: {
        title: "Apparel brand: $25K → $214K/mo scale",
        problem: "Stuck at $25K/mo for 9 months, ROAS unstable.",
        strategy: "Rebuilt unit economics, scaled creative volume, added Google + email.",
        result: "$214K/mo at 3.8× blended ROAS, contribution margin healthy.",
        metrics: [{ label: "MRR", value: "8.5×" }, { label: "MER", value: "3.8×" }, { label: "CM", value: "+11pp" }],
      },
      ctaTitle: "Ready to scale – profitably?",
    }} />
  ),
});
