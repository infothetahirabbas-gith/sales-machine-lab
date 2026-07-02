import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../components/site/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd, type FAQ } from "../lib/seo";

const FAQ_LIST: FAQ[] = [
  {
    "q": "What's a funnel for an ecommerce store?",
    "a": "A guided path from ad → landing page → offer → checkout → post-purchase upsell — engineered to maximise AOV and conversion, not just clicks."
  },
  {
    "q": "Do I need landing pages if I have a Shopify store?",
    "a": "Yes for paid traffic. PDPs convert warm visitors; landers convert cold. The split usually adds 30–80% to ROAS."
  },
  {
    "q": "What tools do you build on?",
    "a": "Shopify with Replo, GemPages or Shogun; WooCommerce with Elementor Pro; cold-traffic landers with custom React when speed matters."
  },
  {
    "q": "Do you handle post-purchase upsells?",
    "a": "Yes — one-click upsells via ReConvert, AfterSell or Zipify OCU, plus thank-you-page cross-sells."
  },
  {
    "q": "How long does a funnel build take?",
    "a": "Standard 3-step funnel ships in 10–14 days including copy, design, build, tracking and QA."
  }
];

export const Route = createFileRoute("/services/funnel")({
  head: () => ({
    meta: [
      { title: "Ecommerce Funnel & Landing Page Agency UK | BeingEcom" },
      { name: "description", content: "UK ecommerce funnel agency. High-converting Shopify landing pages, bridge funnels and post-purchase journeys designed for higher AOV and LTV." },
      { property: "og:title", content: "Ecommerce Funnel & Landing Page Agency UK | BeingEcom" },
      { property: "og:description", content: "UK ecommerce funnel agency. High-converting Shopify landing pages, bridge funnels and post-purchase journeys designed for higher AOV and LTV." },
      { property: "og:url", content: "https://beingecom.com/services/funnel" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://beingecom.com/services/funnel" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({ slug: "funnel", name: "Funnel & Landing Pages", description: "High-converting ecommerce funnels and landing pages — bridge pages, retargeting and post-purchase journeys." })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Funnel & Landing Pages", path: "/services/funnel" }])) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQ_LIST, "/services/funnel")) },
    ],
  }),
  component: () => (
    <ServicePage cfg={{
      slug: "funnel",
      eyebrow: "Funnel & Customer Journey Optimisation",
      heroTitle: "Turn visitors into buyers - automatically.",
      heroSub: "Map the journey, optimise each stage, plug every leak - from first touch to repeat purchase.",
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
        { title: "Triggers", body: "Behavioral triggers across web, email, and ads." },
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
        { title: "Awareness optimisation", body: "Hook-driven creatives, content, broad TOF audiences.", tags: ["TOF","UGC","Content"] },
        { title: "Consideration optimisation", body: "Landing pages, comparison content, review pages.", tags: ["LP","Compare","Reviews"] },
        { title: "Conversion optimisation", body: "PDP, cart, checkout, post-add-to-cart upsell.", tags: ["PDP","Cart","Checkout"] },
        { title: "Landing page funnels", body: "Advertorial → product, quiz → product, listicle → collection.", tags: ["Advertorial","Quiz","Listicle"] },
        { title: "Sales funnel design", body: "Multi-step offers, AOV stacks, post-purchase upsell flows.", tags: ["Upsell","AOV","Bundle"] },
        { title: "Retargeting funnels", body: "Layered retargeting + dynamic product ads + email triggers.", tags: ["DPA","Layered","Email"] },
      ],
      triggersTitle: "Behavioral triggers we use.",
      triggers: ["Exit intent popups","Cart abandonment email","Browse abandonment email","Post-purchase upsell","Stock-back alerts","Replenishment reminders","Time-on-site offers"],
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
      impactStats: [
        { value: "+218%", label: "Funnel CR" },
        { value: "+64%", label: "LP → ATC rate" },
        { value: "-46%", label: "Drop-off at checkout" },
      ],
      metricBars: [
        { label: "Landing → ATC", before: 6, after: 18, unit: "%", description: "Share of LP visitors who add to cart — measures hook + offer fit." },
        { label: "ATC → Checkout", before: 42, after: 71, unit: "%", description: "How well your cart drawer + ATC modal pushes shoppers forward." },
        { label: "Checkout → Buy", before: 38, after: 74, unit: "%", description: "Final friction stage. Express pay + trust + clarity unlock the close." },
        { label: "Full funnel CR", before: 0.9, after: 2.9, unit: "%", description: "Compound rate from LP visit to purchase — the truest funnel score." },
        { label: "Revenue / visitor", before: 0.41, after: 1.86, unit: "£", description: "RPV across the engineered funnel — the metric scale operators live by." },
      ],
      faqs: FAQ_LIST,
    }} />
  ),
});
