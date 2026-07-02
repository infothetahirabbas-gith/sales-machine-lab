import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../components/site/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd, type FAQ } from "../lib/seo";

const FAQ_LIST: FAQ[] = [
  {
    "q": "What conversion rate should a Shopify store be hitting?",
    "a": "Healthy DTC stores run 2.5–4% on cold traffic, 6–9% on warm. Below 1.8% usually means PDP, offer or trust issues — not traffic."
  },
  {
    "q": "How long until I see CRO results?",
    "a": "Quick wins (PDP, checkout, trust) land in 2–4 weeks. Compounded gains from A/B tests show in 60–90 days."
  },
  {
    "q": "Do you run A/B tests?",
    "a": "Yes — on Shopify we use Intelligems or Convert; on WooCommerce we use VWO or Optimizely. Every test has a hypothesis and a stop rule."
  },
  {
    "q": "What's the difference between CRO and UX?",
    "a": "UX makes the experience nicer. CRO makes it convert. We do both, but every decision is graded on revenue per visitor."
  },
  {
    "q": "Do you need access to my analytics?",
    "a": "Yes — GA4, Shopify analytics, heatmaps (Hotjar/Microsoft Clarity) and ideally session replays. We can set these up if missing."
  }
];

export const Route = createFileRoute("/services/cro")({
  head: () => ({
    meta: [
      { title: "Conversion Rate Optimisation Agency UK — Shopify CRO Services | BeingEcom" },
      { name: "description", content: "UK conversion rate optimisation agency for Shopify and WooCommerce stores. Data-led A/B testing, checkout optimisation and product-page CRO that lifts revenue without more ad spend." },
      { property: "og:title", content: "Conversion Rate Optimisation Agency UK — Shopify CRO Services | BeingEcom" },
      { property: "og:description", content: "UK conversion rate optimisation agency for Shopify and WooCommerce stores. Data-led A/B testing, checkout optimisation and product-page CRO that lifts revenue without more ad spend." },
      { property: "og:url", content: "https://beingecom.com/services/cro" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://beingecom.com/services/cro" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({ slug: "cro", name: "Conversion Rate Optimisation", description: "Funnel audits, A/B testing, PDP and checkout optimisation for Shopify and WooCommerce." })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Conversion Rate Optimisation", path: "/services/cro" }])) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQ_LIST, "/services/cro")) },
    ],
  }),
  component: () => (
    <ServicePage cfg={{
      slug: "cro",
      eyebrow: "Conversion Rate Optimisation",
      heroTitle: "Turn your existing traffic into more sales.",
      heroSub: "Same visitors, same ad spend - 2-3× the revenue. That's what real CRO does.",
      problemTitle: "Most stores leak revenue at every step.",
      problemBullets: [
        "Conversion rate stuck below 2%.",
        "Cart abandonment above 70%.",
        "PDP visitors who never add to cart.",
      ],
      whatIsTitle: "CRO is not just A/B testing buttons.",
      whatIsBody: "It's a systematic process of finding where buyers drop off, understanding why, and engineering the next version of your funnel to close the gap. Data + psychology + execution.",
      systemTitle: "Our CRO system.",
      systemSteps: [
        { title: "Conversion audit", body: "Funnel teardown, analytics review, leak mapping." },
        { title: "Behavior research", body: "Heatmaps, session replays, surveys, on-page polls." },
        { title: "Hypothesize & ship", body: "Prioritise by revenue impact, ship weekly experiments." },
        { title: "Validate & scale", body: "A/B test winners, lock learnings into the store." },
      ],
      pillarsTitle: "Pillars of a CRO engine.",
      pillars: [
        { title: "Diagnose", body: "Find the real leak, not the obvious one." },
        { title: "Decide", body: "Prioritise by revenue impact, not novelty." },
        { title: "Ship", body: "Bias toward action - test small, fast." },
        { title: "Lock", body: "Winners become permanent system upgrades." },
      ],
      deepBlocks: [
        { title: "Heatmap & behavior analysis", body: "Hotjar, Microsoft Clarity. Where users click, scroll, rage-tap.", tags: ["Hotjar","Clarity","Session replay"] },
        { title: "Product page optimisation", body: "Hero, gallery, USPs, reviews, sticky ATC, bundle module.", tags: ["PDP","ATC","Reviews"] },
        { title: "Checkout funnel fixing", body: "Reduce steps, surface trust, express payment, address autocomplete.", tags: ["Checkout","Express pay","Trust"] },
        { title: "Cart abandonment reduction", body: "On-site exit intent + post-cart email flows + retargeting triggers.", tags: ["Exit intent","Email","Retargeting"] },
        { title: "A/B testing system", body: "Hypothesis docs, sample size, statistical significance, learning library.", tags: ["A/B","Stat sig","Learnings"] },
        { title: "UX improvement strategy", body: "Mobile-first refactor of navigation, filters, search, and product cards.", tags: ["Mobile","Nav","Search"] },
      ],
      triggersTitle: "Psychological triggers we use.",
      triggers: ["Urgency","Scarcity","Social proof","Risk reversal","Anchoring","Reciprocity","Authority","Specificity","Loss aversion"],
      beforeAfter: {
        before: ["1.3% CR","72% checkout abandonment","Zero session research","Random changes monthly"],
        after: ["3.9% CR","48% checkout abandonment","Weekly insights","Quarterly compounding wins"],
      },
      caseStudy: {
        title: "Beauty brand: +192% CR in 60 days",
        problem: "Heavy paid traffic, miserable conversion.",
        strategy: "PDP rewrite, social proof injection, checkout reduced to 2 steps.",
        result: "CR jumped from 1.4% to 4.1%, ROAS from 1.9× to 3.6×.",
        metrics: [{ label: "CR", value: "+192%" }, { label: "ROAS", value: "1.9× → 3.6×" }, { label: "Revenue", value: "+228%" }],
      },
      ctaTitle: "Stop sending paid traffic to a leaking funnel.",
      impactStats: [
        { value: "+192%", label: "CR lift (avg)" },
        { value: "3.6×", label: "ROAS achieved" },
        { value: "-32%", label: "Cart abandonment" },
      ],
      metricBars: [
        { label: "Conversion rate", before: 1.4, after: 4.1, unit: "%", description: "Visitor → buyer rate after PDP rewrite, social-proof, and checkout reduction." },
        { label: "Checkout completion", before: 28, after: 64, unit: "%", description: "Share of started checkouts that complete payment. Target: 60%+." },
        { label: "AOV", before: 48, after: 79, unit: "$", description: "Average order value lifted via bundles, sticky-ATC, and post-purchase upsells." },
        { label: "Mobile CR", before: 1.1, after: 3.4, unit: "%", description: "Mobile conversion — where 70% of ecommerce traffic actually buys." },
        { label: "Revenue / visitor", before: 0.62, after: 2.41, unit: "$", description: "RPV: the truest single number measuring CRO impact." },
      ],
      faqs: FAQ_LIST,
    }} />
  ),
});
