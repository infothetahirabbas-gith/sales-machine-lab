import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../components/site/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd, type FAQ } from "../lib/seo";
import heroImg from "../assets/hero-creative.jpg";

const FAQ_LIST: FAQ[] = [
  {
    "q": "How many ad creatives do you produce per month?",
    "a": "Standard pods ship 20–40 creatives/month — a mix of UGC, statics, founder, demo and remixes of winners."
  },
  {
    "q": "Do you source UGC creators?",
    "a": "Yes — we cast, brief, ship product, review footage and edit into ad-ready variants. You approve the briefs, we run the pipeline."
  },
  {
    "q": "What makes a winning ecommerce ad?",
    "a": "Hook in the first 1.5 seconds, problem framed for the customer, proof, clear offer and a hard CTA — tested against 8–12 angles, not 1 hero."
  },
  {
    "q": "Will the creatives match my brand?",
    "a": "Yes. We work from your brand book, tone and visual guardrails — creator-led but on-brand."
  },
  {
    "q": "Who owns the footage?",
    "a": "You do. We hand over raw clips, edits and source files at the end of every sprint."
  }
];

export const Route = createFileRoute("/services/creative")({
  head: () => ({
    meta: [
      { title: "Ecommerce Creative & UGC Agency UK — Ad Creative for Shopify | BeingEcom" },
      { name: "description", content: "Scroll-stopping ad creative for UK Shopify & WooCommerce brands — built to convert on Meta, TikTok and Google, not just look good in a portfolio." },
      { property: "og:title", content: "Ecommerce Creative & UGC Agency UK — Ad Creative for Shopify | BeingEcom" },
      { property: "og:description", content: "Scroll-stopping ad creative for UK Shopify & WooCommerce brands — built to convert on Meta, TikTok and Google, not just look good in a portfolio." },
      { property: "og:url", content: "https://beingecom.com/services/creative" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://beingecom.com/services/creative" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({ slug: "creative", name: "Creative & Ad Production", description: "UGC, video and static ad creatives engineered to convert for Shopify and WooCommerce brands." })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Creative & Ad Production", path: "/services/creative" }])) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQ_LIST, "/services/creative")) },
    ],
  }),
  component: () => (
    <ServicePage cfg={{
      slug: "creative",
      eyebrow: "Creative & Ad Content Production",
      heroImage: heroImg,
      heroTitle: "High-converting creatives that sell products.",
      heroSub: "Hooks, scripts, UGC, statics, and videos engineered to stop the scroll and move units.",
      problemTitle: "Bad creatives are why your ads are dying.",
      problemBullets: [
        "Same 2 ads running for 6 months.",
        "Generic 'lifestyle' content that says nothing.",
        "No hooks, no angles, no testing pipeline.",
      ],
      whatIsTitle: "Creative carries 80% of ad performance.",
      whatIsBody: "Modern paid media is a creative game. Targeting is automated. The brands that win are the ones shipping more hooks and angles every week.",
      systemTitle: "Our creative system.",
      systemSteps: [
        { title: "Angle research", body: "Mine reviews, competitors, founder, customer language." },
        { title: "Hook bank", body: "30+ hooks ready before any shoot or design." },
        { title: "Production sprint", body: "Weekly batch: UGC + static + founder cuts." },
        { title: "Test & iterate", body: "Daily creative reads, winners get variations." },
      ],
      pillarsTitle: "What we produce.",
      pillars: [
        { title: "Video ads", body: "Native, UGC, founder, demo, comparison." },
        { title: "Static ads", body: "Carousels, posters, before/after, testimonials." },
        { title: "Photography", body: "Product, lifestyle, in-context shoots." },
        { title: "Copy", body: "Hooks, scripts, captions, primary text." },
      ],
      deepBlocks: [
        { title: "Video ad creation", body: "Hook-driven scripts, native edits, captions, multiple aspect ratios.", tags: ["Hooks","Scripts","9:16","Captions"] },
        { title: "Static ad design", body: "Carousels, comparison, list, social proof formats.", tags: ["Carousel","Compare","List"] },
        { title: "Product photography direction", body: "Shot list, mood board, model + flat lay + in-context.", tags: ["Shot list","Mood","Flat lay"] },
        { title: "Hook writing strategy", body: "Curiosity, contrarian, problem, listicle, social proof formats.", tags: ["Curiosity","Listicle","POV"] },
        { title: "Ad copywriting system", body: "Primary text frameworks, story-led structures, CTA testing.", tags: ["Primary","Story","CTA"] },
        { title: "UGC ad production", body: "Creator briefs, native review style, founder-style cuts.", tags: ["Creator","Native","Founder"] },
      ],
      triggersTitle: "Winning ad formula.",
      triggers: ["Strong hook in 1.5s","Problem stated clearly","Product solution shown","Social proof injection","Specific outcome","CTA repeated 2×","Caption mirrors audio","Native UGC feel"],
      beforeAfter: {
        before: ["2 creatives in rotation","No hook system","CTR 0.6%","CPM rising weekly"],
        after: ["12+ creatives, batched weekly","30+ hook bank","CTR 1.9%","CPM stable, ROAS climbing"],
      },
      caseStudy: {
        title: "Beauty brand: UGC angle stack → 4.1× ROAS",
        problem: "Flat creatives, scaling killed ROAS.",
        strategy: "10 UGC angles in 3 weeks, daily reads, winners iterated.",
        result: "ROAS 1.8× → 4.1×, CPM dropped 22%, spend 3×.",
        metrics: [{ label: "ROAS", value: "1.8× → 4.1×" }, { label: "Spend", value: "3×" }, { label: "CPM", value: "-22%" }],
      },
      ctaTitle: "Need creatives that actually print revenue?",
      impactStats: [
        { value: "+184%", label: "Hook rate" },
        { value: "+92%", label: "Thumbstop rate" },
        { value: "2.6×", label: "ROAS on new creative" },
      ],
      metricBars: [
        { label: "Hook rate (3s view)", before: 18, after: 46, unit: "%", description: "Share of viewers who watch the first 3 seconds — the #1 creative signal in Meta." },
        { label: "Thumbstop rate", before: 24, after: 52, unit: "%", description: "Hold-rate at the first frame. Strong thumbstops lower CPM by 30–50%." },
        { label: "CTR", before: 0.8, after: 2.3, unit: "%", description: "Click-through rate on cold creative — measures concept + offer clarity." },
        { label: "Creative ROAS", before: 1.5, after: 3.9, unit: "×", description: "ROAS isolated to new creative concepts (not winning evergreens)." },
        { label: "Cost per thumbstop", before: 0.48, after: 0.18, unit: "£", description: "How expensive each engaged view is. Lower = healthier funnel top." },
      ],
      faqs: FAQ_LIST,
    }} />
  ),
});
