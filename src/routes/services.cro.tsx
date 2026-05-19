import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../components/site/ServicePage";

export const Route = createFileRoute("/services/cro")({
  component: () => (
    <ServicePage cfg={{
      slug: "cro",
      eyebrow: "Conversion Rate Optimization",
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
        { title: "Hypothesize & ship", body: "Prioritize by revenue impact, ship weekly experiments." },
        { title: "Validate & scale", body: "A/B test winners, lock learnings into the store." },
      ],
      pillarsTitle: "Pillars of a CRO engine.",
      pillars: [
        { title: "Diagnose", body: "Find the real leak, not the obvious one." },
        { title: "Decide", body: "Prioritize by revenue impact, not novelty." },
        { title: "Ship", body: "Bias toward action - test small, fast." },
        { title: "Lock", body: "Winners become permanent system upgrades." },
      ],
      deepBlocks: [
        { title: "Heatmap & behavior analysis", body: "Hotjar, Microsoft Clarity. Where users click, scroll, rage-tap.", tags: ["Hotjar","Clarity","Session replay"] },
        { title: "Product page optimization", body: "Hero, gallery, USPs, reviews, sticky ATC, bundle module.", tags: ["PDP","ATC","Reviews"] },
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
    }} />
  ),
});
