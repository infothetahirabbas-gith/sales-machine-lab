import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../components/site/ServicePage";

export const Route = createFileRoute("/services/email-sms")({
  component: () => (
    <ServicePage cfg={{
      slug: "email-sms",
      eyebrow: "Email & SMS Marketing Automation",
      heroTitle: "Recover lost sales and multiply repeat customers.",
      heroSub: "Klaviyo + SMS flows that quietly add 25–35% of revenue without lifting ad spend.",
      problemTitle: "Most stores leave money on the table after the visit.",
      problemBullets: [
        "Abandoned carts? Just one generic email.",
        "No welcome flow, no post-purchase, no winback.",
        "SMS not even set up — losing the highest-ROI channel.",
      ],
      whatIsTitle: "Retention is where ecommerce gets profitable.",
      whatIsBody: "Acquisition gets you a customer. Email and SMS turn them into repeat buyers, raise LTV, and let you actually scale paid acquisition profitably.",
      systemTitle: "Our lifecycle system.",
      systemSteps: [
        { title: "Audit & strategy", body: "Map flows, segments, and revenue gaps in current setup." },
        { title: "Foundational flows", body: "Welcome, abandoned cart, abandoned checkout, browse abandon." },
        { title: "Lifecycle flows", body: "Post-purchase, winback, replenishment, VIP." },
        { title: "Campaign cadence", body: "Weekly campaigns by segment + AB-tested subjects." },
      ],
      pillarsTitle: "Lifecycle pillars.",
      pillars: [
        { title: "Flows", body: "Always-on revenue, fully automated." },
        { title: "Campaigns", body: "Weekly nudges to engaged segments." },
        { title: "Segmentation", body: "Behavioral + RFM-based, not demographic." },
        { title: "SMS", body: "Higher open, faster impact, used surgically." },
      ],
      deepBlocks: [
        { title: "Abandoned cart recovery", body: "3–4 email + 1–2 SMS sequence, timing-optimized, discount strategy tiered.", tags: ["Email","SMS","Timing","Discount tier"] },
        { title: "Welcome flow", body: "Brand story, hero product, social proof, soft offer.", tags: ["Brand","Hero","Offer"] },
        { title: "Post-purchase flow", body: "Thank you, education, cross-sell, review request, subscription nudge.", tags: ["Thank you","Cross-sell","Reviews"] },
        { title: "Winback campaigns", body: "Lapsed buyer segment, offer ladder, sunset rules.", tags: ["Winback","Sunset"] },
        { title: "SMS marketing system", body: "Compliant opt-in, broadcast cadence, conversational replies.", tags: ["Opt-in","Broadcast","2-way"] },
        { title: "Segmentation strategy", body: "Engaged, VIP, lapsed, browsers, subscribers — each gets different content.", tags: ["RFM","Engaged","VIP"] },
      ],
      beforeAfter: {
        before: ["6% of revenue from email","One generic abandoned cart","No SMS","No segments"],
        after: ["32% of revenue from email + SMS","Tiered cart + checkout flows","Compliant SMS engine","8 active segments"],
      },
      caseStudy: {
        title: "Skincare brand: email + SMS to 34% of revenue",
        problem: "Heavy reliance on paid acquisition, low LTV.",
        strategy: "9 flows + weekly campaign cadence + SMS welcome.",
        result: "Email/SMS share went from 6% to 34% in 90 days.",
        metrics: [{ label: "Email/SMS share", value: "34%" }, { label: "LTV", value: "2.4×" }, { label: "CAC", value: "-31%" }],
      },
      ctaTitle: "Stop letting carts and customers die quietly.",
    }} />
  ),
});
