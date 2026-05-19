import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../components/site/ServicePage";

export const Route = createFileRoute("/services/funnel")({
  component: () => (
    <ServicePage cfg={{
      slug: "funnel",
      eyebrow: "Funnel & Customer Journey Optimization",
      heroTitle: "Turn visitors into buyers - automatically.",
      heroSub: "Map the journey, optimize each stage, plug every leak - from first touch to repeat purchase.",
      problemTitle: "Your store isn't a funnel - it's a maze.",
      problemBullets: [
        "Cold traffic dumped straight onto PDPs.",
        "No bridge between ad and store message.",
        "No retargeting, no post-purchase, no journey.",
      ],
      whatIsTitle: "A funnel is a system, not a page.",
      whatIsBody: "Every stage of the buyer journey - awareness, consideration, conversion, retention - needs its own asset, message, and metric. We build the full journey, not just a landing page.",
      systemTitle: "Our funnel system.",
      systemSteps: [
        { title: "Journey map", body: "Map current touchpoints, find drop-off and friction." },
        { title: "Stage assets", body: "Build the right asset for each stage - ads, pages, flows." },
        { title: "Triggers", body: "Behavioral triggers across web, email, SMS, ads." },
        { title: "Compounding", body: "Each loop feeds the next - retention fuels acquisition." },
      ],
      pillarsTitle: "Stages we engineer.",
      pillars: [
        { title: "Awareness", body: "Top-funnel creatives + content that earns attention." },
        { title: "Consideration", body: "Landing pages, comparisons, social proof." },
        { title: "Conversion", body: "PDP, checkout, offer, urgency - closed cleanly." },
        { title: "Retention", body: "Lifecycle flows that bring buyers back." },
      ],
      deepBlocks: [
        { title: "Awareness optimization", body: "Hook-driven creatives, content, broad TOF audiences.", tags: ["TOF","UGC","Content"] },
        { title: "Consideration optimization", body: "Landing pages, comparison content, review pages.", tags: ["LP","Compare","Reviews"] },
        { title: "Conversion optimization", body: "PDP, cart, checkout, post-add-to-cart upsell.", tags: ["PDP","Cart","Checkout"] },
        { title: "Landing page funnels", body: "Advertorial → product, quiz → product, listicle → collection.", tags: ["Advertorial","Quiz","Listicle"] },
        { title: "Sales funnel design", body: "Multi-step offers, AOV stacks, post-purchase upsell flows.", tags: ["Upsell","AOV","Bundle"] },
        { title: "Retargeting funnels", body: "Layered retargeting + dynamic product ads + email triggers.", tags: ["DPA","Layered","Email"] },
      ],
      triggersTitle: "Behavioral triggers we use.",
      triggers: ["Exit intent popups","Cart abandonment SMS","Browse abandonment email","Post-purchase upsell","Stock-back alerts","Replenishment reminders","Time-on-site offers"],
      beforeAfter: {
        before: ["Ad → PDP → 90% bounce","No retargeting","No journey mapping","No upsell"],
        after: ["Ad → advertorial → PDP","Multi-touch retargeting","Mapped journey + KPIs","Post-purchase upsell stack"],
      },
      caseStudy: {
        title: "Wellness brand: advertorial funnel → 2.7× CVR",
        problem: "Cold ads dumped to PDP, CVR under 1%.",
        strategy: "Built advertorial + quiz funnel, layered retargeting, post-purchase upsell.",
        result: "Funnel CVR hit 2.7%, AOV +24% from upsell stack.",
        metrics: [{ label: "CVR", value: "2.7×" }, { label: "AOV", value: "+24%" }, { label: "ROAS", value: "+78%" }],
      },
      ctaTitle: "Engineer your full buyer journey.",
    }} />
  ),
});
