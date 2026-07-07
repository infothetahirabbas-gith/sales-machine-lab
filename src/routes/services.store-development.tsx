import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../components/site/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd, type FAQ } from "../lib/seo";

const FAQ_LIST: FAQ[] = [
  {
    "q": "Do you build Shopify or WooCommerce stores?",
    "a": "Both — and Shopify Plus / WooCommerce headless when the brand needs it."
  },
  {
    "q": "How long does a new store take?",
    "a": "Standard Shopify build: 4–6 weeks. Shopify Plus or headless: 8–12 weeks. WooCommerce custom: 6–10 weeks."
  },
  {
    "q": "Will the store be fast and pass Core Web Vitals?",
    "a": "Yes. We engineer for green CWV on mobile out of the box — that's a ranking and conversion lever."
  },
  {
    "q": "Do you migrate from another platform?",
    "a": "Yes — Magento, BigCommerce, Wix and custom carts. We preserve SEO with 301 mapping and replicate flows in Klaviyo."
  },
  {
    "q": "Do you handle apps, themes and custom development?",
    "a": "Yes — Liquid, React, Hydrogen, Remix, custom apps, and integrations with ERPs, 3PLs and CRMs."
  }
];

export const Route = createFileRoute("/services/store-development")({
  head: () => ({
    meta: [
      { title: "Shopify & WooCommerce Development Agency UK | BeingEcom" },
      { name: "description", content: "UK Shopify Plus and WooCommerce development agency. Custom themes, headless builds and platform migrations optimised for speed, SEO and conversion." },
      { property: "og:title", content: "Shopify & WooCommerce Development Agency UK | BeingEcom" },
      { property: "og:description", content: "UK Shopify Plus and WooCommerce development agency. Custom themes, headless builds and platform migrations optimised for speed, SEO and conversion." },
      { property: "og:url", content: "https://beingecom.com/services/store-development" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://beingecom.com/services/store-development" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({ slug: "store-development", name: "Store Development", description: "Custom Shopify and WooCommerce store development — themes, headless, migrations, apps and integrations." })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Store Development", path: "/services/store-development" }])) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQ_LIST, "/services/store-development")) },
    ],
  }),
  component: () => (
    <ServicePage cfg={{
      slug: "store-development",
      eyebrow: "Store Development & Optimisation",
      heroTitle: "Build a high-converting ecommerce store that actually sells.",
      heroSub: "Shopify & WooCommerce stores engineered for conversion - not just design awards.",
      problemTitle: "Why most ecommerce stores quietly bleed revenue.",
      problemBullets: [
        "Generic theme, generic trust, generic conversion.",
        "Product pages built like brochures, not sales pages.",
        "Checkout drops 60-70% - and no one's tracking why.",
      ],
      whatIsTitle: "What 'conversion-focused store' actually means.",
      whatIsBody: "Every section, button, and pixel exists to move a visitor closer to checkout. Structure, copy, speed, and trust signals - all engineered against real ecommerce funnels, not Pinterest mood boards.",
      systemTitle: "Our store build system.",
      systemSteps: [
        { title: "Audit & blueprint", body: "Tear down current store, map ideal information architecture." },
        { title: "Theme & architecture", body: "Pick the right theme, build a scalable section system." },
        { title: "Conversion engineering", body: "PDP, PLP, cart, checkout - built around buyer psychology." },
        { title: "Speed & QA", body: "Sub-2s load, zero broken edges, mobile-first." },
      ],
      pillarsTitle: "Four pillars of a sales-ready store.",
      pillars: [
        { title: "Structure", body: "Information architecture that guides browsing to buying." },
        { title: "Trust", body: "Reviews, badges, guarantees in the right place at the right time." },
        { title: "Speed", body: "Lighthouse 90+ on mobile. Speed is conversion." },
        { title: "Clarity", body: "Copy that says exactly what the product does and why." },
      ],
      deepBlocks: [
        { title: "Shopify setup system", body: "Theme selection, app stack curation, store architecture that scales past 100 SKUs.", tags: ["Theme audit","App stack","Sections","Metafields"] },
        { title: "WooCommerce setup system", body: "WordPress + Woo store structure, performant hosting, conversion-ready templates.", tags: ["Hosting","Templates","Cache","Plugins"] },
        { title: "UI/UX optimisation", body: "Mobile-first layouts, real trust signals, friction-free navigation.", tags: ["Mobile-first","Trust","Nav","Search"] },
        { title: "Product page engineering", body: "Hero, gallery, USPs, social proof, sticky ATC - every block earns its space.", tags: ["Hero","Reviews","FAQs","Sticky ATC"] },
        { title: "Collection page structure", body: "Filters, sorting, merchandising - built to upsell across catalogue.", tags: ["Filters","Merch","Sort","SEO"] },
        { title: "Checkout & speed optimisation", body: "Reduce steps, kill friction, hit sub-2s loads on mobile.", tags: ["1-step","Express pay","Image opt","Bundles"] },
      ],
      triggersTitle: "Trust elements that move CR.",
      triggers: ["Real customer reviews","Trust badges","Guarantee bar","Live chat","Free shipping bar","Urgency timers","Stock counters","Press logos","Risk reversal"],
      beforeAfter: {
        before: ["1.2% CR","Generic theme","No mobile optimisation","No trust elements","Slow PDP (4s+)"],
        after: ["4.6% CR","Custom system","Mobile-first PDP","Reviews + badges + guarantee","Sub-2s load"],
      },
      caseStudy: {
        title: "Apparel brand: PDP rebuild → 3.8× CR",
        problem: "Beautiful theme, terrible PDP. Bounce above 70%.",
        strategy: "Hero rewrite, sticky ATC, reviews above fold, guarantee bar.",
        result: "CR went from 1.2% to 4.6%, AOV +18% via bundles.",
        metrics: [{ label: "CR", value: "3.8×" }, { label: "AOV", value: "+18%" }, { label: "Bounce", value: "-41%" }],
      },
      ctaTitle: "Get your store built for sales.",
      impactStats: [
        { value: "+128%", label: "Launch-week CR" },
        { value: "1.4s", label: "Avg page load" },
        { value: "98", label: "PageSpeed score" },
      ],
      metricBars: [
        { label: "Conversion rate", before: 1.2, after: 3.6, unit: "%", description: "Default-theme CR vs a store engineered with PDP system + trust + ATC patterns." },
        { label: "Page load (s)", before: 4.8, after: 1.4, unit: "s", description: "Largest Contentful Paint. Every 1s faster ≈ 7% more conversions." },
        { label: "Mobile CR", before: 0.9, after: 3.2, unit: "%", description: "Mobile conversion rate — where 70% of ecommerce traffic actually buys." },
        { label: "AOV", before: 46, after: 78, unit: "£", description: "Average order value lifted with bundles, upsells, and tiered offers built-in." },
        { label: "Lighthouse score", before: 52, after: 96, description: "Google PageSpeed score (0–100). Directly affects SEO + ad quality." },
      ],
      faqs: FAQ_LIST,
      heroImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1920&q=80",
      subServices: [
        { to: "/services/store-development/shopify", title: "Shopify Development", body: "Shopify + Shopify Plus builds, migrations and headless Hydrogen — engineered to convert." },
        { to: "/services/store-development/woocommerce", title: "WooCommerce Development", body: "WooCommerce and WordPress commerce built for speed, SEO and scale." },
      ],
      relatedServices: [
        { to: "/services/cro", title: "Conversion Rate Optimisation", body: "PDP + checkout rebuilt around real conversion friction." },
        { to: "/services/seo", title: "Ecommerce SEO", body: "Get the new store ranking on Google from day one." },
        { to: "/services/paid-ads", title: "Paid Ads", body: "Drive traffic to your new store profitably from launch." },
      ],
    }} />
  ),
});
