import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../components/site/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd, type FAQ } from "../lib/seo";

const FAQ_LIST: FAQ[] = [
  {
    "q": "What does an AI automation agency actually do for ecommerce?",
    "a": "We build AI agents and workflows that automate support, product tagging, content generation, ad copy, abandoned-cart sequences and ops reporting — so your team ships more without hiring."
  },
  {
    "q": "Will AI automation replace my team?",
    "a": "No. It removes the repetitive 60–70% of the work so your team focuses on creative, strategy and customer relationships."
  },
  {
    "q": "Which tools do you build on?",
    "a": "OpenAI, Anthropic Claude, n8n, Zapier, Make, Klaviyo, Shopify Flow, custom Cloudflare Workers and Supabase — chosen per use case, not per fashion."
  },
  {
    "q": "How fast can we go live?",
    "a": "Most automation pods ship the first production workflow in 7–10 days, then layer 2–3 more per sprint."
  },
  {
    "q": "Is it safe to give AI access to my store data?",
    "a": "Yes — we scope keys, use read-only roles where possible, log every action and keep a human-in-the-loop on anything destructive."
  }
];

export const Route = createFileRoute("/services/ai-automation")({
  head: () => ({
    meta: [
      { title: "AI Automation for Ecommerce — Shopify & WooCommerce | BeingEcom" },
      { name: "description", content: "AI automation for ecommerce brands. AI agents, workflow automation, support deflection, product enrichment and AI-powered CRO for Shopify & WooCommerce." },
      { name: "keywords", content: "ai automation agency uk, ecommerce ai automation, shopify ai agents, ai customer support, ai product enrichment, workflow automation" },
      { property: "og:title", content: "AI Automation for Ecommerce | BeingEcom" },
      { property: "og:description", content: "AI agents, automations and workflows that compound ecommerce margins." },
      { property: "og:url", content: "https://beingecom.com/services/ai-automation" },
    ],
    links: [{ rel: "canonical", href: "https://beingecom.com/services/ai-automation" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({ slug: "ai-automation", name: "AI Automation", description: "AI agents, workflow automation and AI-powered CRO for ecommerce brands." })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "AI Automation", path: "/services/ai-automation" }])) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQ_LIST, "/services/ai-automation")) },
    ],
  }),
  component: () => (
    <ServicePage cfg={{
      slug: "ai-automation",
      eyebrow: "AI Automation",
      heroTitle: "AI automations that compound ecommerce margins.",
      heroSub: "AI agents, workflows and AI-powered CRO — built to remove cost, lift conversion and free your team.",
      problemTitle: "Why most ecommerce teams drown in busywork.",
      problemBullets: [
        "Manual support tickets eating margin.",
        "Product catalog enriched by hand every launch.",
        "Marketing ops stitched together with screenshots.",
      ],
      whatIsTitle: "AI is leverage, not a feature.",
      whatIsBody: "We pick the workflows where AI removes a real cost or unlocks a real lift — support deflection, catalog enrichment, personalisation, content velocity — and build them into your stack.",
      systemTitle: "Our AI automation system.",
      systemSteps: [
        { title: "Workflow audit", body: "Map manual workflows, cost-rank, automation-rank." },
        { title: "Agent design", body: "Scope, guardrails, escalation, success metrics." },
        { title: "Integration build", body: "Shopify, Klaviyo, Gorgias, Zendesk, Notion, internal." },
        { title: "Measure & iterate", body: "Deflection rate, lift, hours saved, margin impact." },
      ],
      pillarsTitle: "Where AI moves the needle.",
      pillars: [
        { title: "Support deflection", body: "AI agents handling tier-1 tickets 24/7." },
        { title: "Catalog enrichment", body: "AI-generated titles, descriptions, alt text." },
        { title: "Personalisation", body: "On-site product, copy and offer personalisation." },
        { title: "Marketing ops", body: "Brief-to-asset agents, reporting, segmentation." },
      ],
      deepBlocks: [
        { title: "AI support agents", body: "Trained on docs + tickets, escalation to human, CSAT measured.", tags: ["Gorgias","Zendesk","CSAT"] },
        { title: "Catalog enrichment", body: "Bulk titles, descriptions, attributes, alt text — SEO-aware.", tags: ["Shopify","SEO","Bulk"] },
        { title: "Personalisation", body: "AI-driven product recs, hero variants, offer logic.", tags: ["Recs","A/B","Variants"] },
        { title: "Workflow agents", body: "Brief-to-asset, reporting agents, segmentation triggers.", tags: ["Klaviyo","Reporting","Triggers"] },
      ],
      triggersTitle: "AI use-cases that pay back fast.",
      triggers: ["Tier-1 support","Product copy","Alt text","Hero personalisation","Email segmentation","Reporting agents","Review summarisation","Returns triage"],
      beforeAfter: {
        before: ["40% margin lost to ops","24h support response","Manual catalog launches","Static hero for everyone"],
        after: ["AI handles 65% of tickets","<5min first response","Bulk AI enrichment","Personalised hero per segment"],
      },
      caseStudy: {
        title: "Apparel brand: 65% ticket deflection in 60 days",
        problem: "Support team drowning, 24h response time, CSAT dropping.",
        strategy: "AI agent trained on docs + 6 months of tickets, escalation rules.",
        result: "65% deflection, <5min response, CSAT up 18pts.",
        metrics: [{ label: "Deflection", value: "65%" }, { label: "Response", value: "<5min" }, { label: "Days", value: "60" }],
      },
      ctaTitle: "Want AI that earns its keep — not just a chatbot?",
      impactStats: [
        { value: "65%", label: "Support deflection" },
        { value: "10×", label: "Catalog velocity" },
        { value: "+22%", label: "Conversion lift" },
      ],
      metricBars: [
        { label: "Support deflection", before: 0, after: 65, unit: "%", description: "% of tier-1 tickets resolved without human." },
        { label: "First response", before: 24, after: 0.08, unit: "h", description: "Median time to first reply." },
        { label: "Catalog throughput", before: 1, after: 10, unit: "×", description: "Products enriched per hour vs manual baseline." },
        { label: "Conversion lift", before: 0, after: 22, unit: "%", description: "Conversion lift from AI personalisation on hero + PDP." },
      ],
      faqs: FAQ_LIST,
    }} />
  ),
});
