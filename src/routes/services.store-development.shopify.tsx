import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../components/site/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd, type FAQ } from "../lib/seo";
import heroImg from "../assets/hero-shopify-commerce.jpg";

const FAQ_LIST: FAQ[] = [
  { q: "Do you build on Shopify or Shopify Plus?", a: "Both — standard Shopify for growing DTC brands, Shopify Plus for £5m+ merchants needing Scripts, Flow, checkout extensibility and B2B." },
  { q: "How long does a Shopify build take?", a: "Standard Shopify: 4–6 weeks. Shopify Plus custom: 8–12 weeks. Migrations from Magento/BigCommerce/WooCommerce: 6–10 weeks with full 301 mapping." },
  { q: "Will my Shopify store pass Core Web Vitals?", a: "Yes. We engineer for green CWV on mobile — lazy sections, image optimisation, minimal apps, and a lean Liquid theme. It's a ranking and conversion lever." },
  { q: "Do you customise themes or build from scratch?", a: "Both. We optimise premium themes (Impulse, Prestige, Dawn) for speed and CR, or build fully custom sections and Hydrogen/Remix headless when needed." },
  { q: "Can you migrate my existing store to Shopify?", a: "Yes — from Magento, BigCommerce, WooCommerce, Wix or custom carts. Products, customers, orders, redirects, SEO metadata and Klaviyo flows all preserved." },
  { q: "Do you handle Shopify apps and integrations?", a: "Yes — Klaviyo, Recharge, Loop, Yotpo, Gorgias, ERPs, 3PLs and custom private apps built on the Admin & Storefront APIs." },
];

export const Route = createFileRoute("/services/store-development/shopify")({
  head: () => ({
    meta: [
      { title: "Shopify Store Development Agency UK | Shopify Plus Experts | BeingEcom" },
      { name: "description", content: "UK Shopify & Shopify Plus development agency. Custom themes, headless Hydrogen builds, migrations and CRO-first stores engineered for speed and conversion." },
      { property: "og:title", content: "Shopify Store Development Agency UK | Shopify Plus Experts | BeingEcom" },
      { property: "og:description", content: "UK Shopify & Shopify Plus development agency. Custom themes, headless Hydrogen builds, migrations and CRO-first stores engineered for speed and conversion." },
      { property: "og:url", content: "https://beingecom.com/services/store-development/shopify" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://beingecom.com/services/store-development/shopify" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({ slug: "store-development/shopify", name: "Shopify Store Development", description: "Custom Shopify and Shopify Plus development — themes, headless Hydrogen, migrations, apps and integrations." })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Store Development", path: "/services/store-development" }, { name: "Shopify", path: "/services/store-development/shopify" }])) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQ_LIST, "/services/store-development/shopify")) },
    ],
  }),
  component: () => (
    <ServicePage cfg={{
      slug: "store-development-shopify",
      eyebrow: "Shopify & Shopify Plus Development",
      heroImage: heroImg,
      heroTitle: "Build a Shopify store engineered to sell — not just to look pretty.",
      heroSub: "Shopify & Shopify Plus stores built by an operator team obsessed with conversion, speed and margin.",
      problemTitle: "Why most Shopify stores quietly bleed revenue.",
      problemBullets: [
        "Bloated themes with 25+ apps dragging load past 4 seconds.",
        "PDPs that look like brochures — no hooks, no trust, no urgency.",
        "Checkout drops 65% on mobile and no one's watching the funnel.",
      ],
      whatIsTitle: "What a 'conversion-first Shopify build' actually means.",
      whatIsBody: "Every section, app, and pixel of Liquid earns its place. Structure, copy, speed, and trust — engineered against real Shopify funnels, not Dribbble mood boards. Built to scale from £10K to £1M+/month without a re-platform.",
      systemTitle: "Our Shopify build system.",
      systemSteps: [
        { title: "Audit & blueprint", body: "Tear down current store, map ideal IA, app stack and Liquid architecture." },
        { title: "Theme & sections", body: "Custom Dawn/OS 2.0 sections or premium theme optimised for CR." },
        { title: "Conversion engineering", body: "PDP, PLP, cart, checkout — built around Shopify buyer psychology." },
        { title: "Speed & launch QA", body: "Sub-2s LCP, green CWV, zero broken edges, mobile-first." },
      ],
      pillarsTitle: "Four pillars of a sales-ready Shopify store.",
      pillars: [
        { title: "Structure", body: "OS 2.0 sections and metafields that guide browsing to buying." },
        { title: "Trust", body: "Reviews, badges, guarantees and UGC in the right place at the right time." },
        { title: "Speed", body: "Lighthouse 90+ on mobile. Every 1s = 7% more revenue." },
        { title: "Clarity", body: "Copy and layout that say exactly what the product does and why." },
      ],
      deepBlocks: [
        { title: "Shopify theme development", body: "Custom Liquid sections, OS 2.0 blocks, metafields and metaobjects for scalable content.", tags: ["Liquid", "OS 2.0", "Metafields", "Sections"] },
        { title: "Shopify Plus builds", body: "Scripts, Flow, Launchpad, checkout extensibility, B2B and wholesale channels.", tags: ["Scripts", "Flow", "B2B", "Checkout ext."] },
        { title: "Headless Hydrogen / Remix", body: "React-based storefronts on Oxygen for brands that need custom UX and best-in-class speed.", tags: ["Hydrogen", "Oxygen", "Storefront API", "Remix"] },
        { title: "App stack curation", body: "Klaviyo, Recharge, Loop, Yotpo, Gorgias, Judge.me — only the apps that lift revenue.", tags: ["Klaviyo", "Recharge", "Yotpo", "Gorgias"] },
        { title: "Product page engineering", body: "Hero, gallery, USPs, social proof, sticky ATC — every block earns its space.", tags: ["Hero", "Reviews", "FAQs", "Sticky ATC"] },
        { title: "Shopify Checkout & Shop Pay", body: "One-page checkout extensions, express pay, upsells, post-purchase — squeeze more out of every session.", tags: ["Checkout ext.", "Shop Pay", "Upsells", "Post-purchase"] },
      ],
      triggersTitle: "Trust elements that move CR on Shopify.",
      triggers: ["Judge.me / Okendo reviews", "Trust badges", "Guarantee bar", "Gorgias live chat", "Free shipping bar", "Urgency timers", "Stock counters", "Press logos", "Risk reversal"],
      beforeAfter: {
        before: ["1.2% CR", "Bloated Dawn theme + 24 apps", "No mobile PDP optimisation", "No trust elements", "Slow PDP (4.2s LCP)"],
        after: ["4.6% CR", "Lean custom OS 2.0 sections", "Mobile-first sticky-ATC PDP", "Reviews + badges + guarantee", "1.4s LCP on 4G"],
      },
      caseStudy: {
        title: "Shopify apparel brand: PDP rebuild → 3.8× CR",
        problem: "Premium theme, terrible PDP. Bounce above 70% on mobile.",
        strategy: "Rewrote hero, added sticky ATC, moved reviews above fold, guarantee bar, Shop Pay upsell.",
        result: "CR went from 1.2% to 4.6%, AOV +18% via Shopify Bundles.",
        metrics: [{ label: "CR", value: "3.8×" }, { label: "AOV", value: "+18%" }, { label: "Bounce", value: "-41%" }],
      },
      ctaTitle: "Get your Shopify store built for sales.",
      impactStats: [
        { value: "+128%", label: "Launch-week CR" },
        { value: "1.4s", label: "Avg Shopify LCP" },
        { value: "98", label: "PageSpeed score" },
      ],
      metricBars: [
        { label: "Conversion rate", before: 1.2, after: 3.6, unit: "%", description: "Default-theme CR vs a Shopify store engineered with OS 2.0 PDP system + trust + sticky ATC." },
        { label: "Page load (s)", before: 4.8, after: 1.4, unit: "s", description: "Largest Contentful Paint on mobile 4G. Every 1s faster ≈ 7% more Shopify conversions." },
        { label: "Mobile CR", before: 0.9, after: 3.2, unit: "%", description: "Shopify mobile conversion — where 70% of DTC traffic buys." },
        { label: "AOV", before: 46, after: 78, unit: "£", description: "AOV lifted with Shopify Bundles, upsells, and tiered offers built into the theme." },
        { label: "Lighthouse score", before: 52, after: 96, description: "Google PageSpeed on Shopify (0–100). Directly affects SEO + Meta ad quality." },
      ],
      faqs: FAQ_LIST,
    }} />
  ),
});
