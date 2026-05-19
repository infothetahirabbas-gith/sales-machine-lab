import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../../components/site/ServicePage";

export const Route = createFileRoute("/services/store-development")({
  component: () => (
    <ServicePage cfg={{
      slug: "store-development",
      eyebrow: "Store Development & Optimization",
      heroTitle: "Build a high-converting ecommerce store that actually sells.",
      heroSub: "Shopify & WooCommerce stores engineered for conversion — not just design awards.",
      problemTitle: "Why most ecommerce stores quietly bleed revenue.",
      problemBullets: [
        "Generic theme, generic trust, generic conversion.",
        "Product pages built like brochures, not sales pages.",
        "Checkout drops 60–70% — and no one's tracking why.",
      ],
      whatIsTitle: "What 'conversion-focused store' actually means.",
      whatIsBody: "Every section, button, and pixel exists to move a visitor closer to checkout. Structure, copy, speed, and trust signals — all engineered against real ecommerce funnels, not Pinterest mood boards.",
      systemTitle: "Our store build system.",
      systemSteps: [
        { title: "Audit & blueprint", body: "Tear down current store, map ideal information architecture." },
        { title: "Theme & architecture", body: "Pick the right theme, build a scalable section system." },
        { title: "Conversion engineering", body: "PDP, PLP, cart, checkout — built around buyer psychology." },
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
        { title: "UI/UX optimization", body: "Mobile-first layouts, real trust signals, friction-free navigation.", tags: ["Mobile-first","Trust","Nav","Search"] },
        { title: "Product page engineering", body: "Hero, gallery, USPs, social proof, sticky ATC — every block earns its space.", tags: ["Hero","Reviews","FAQs","Sticky ATC"] },
        { title: "Collection page structure", body: "Filters, sorting, merchandising — built to upsell across catalog.", tags: ["Filters","Merch","Sort","SEO"] },
        { title: "Checkout & speed optimization", body: "Reduce steps, kill friction, hit sub-2s loads on mobile.", tags: ["1-step","Express pay","Image opt","Bundles"] },
      ],
      triggersTitle: "Trust elements that move CR.",
      triggers: ["Real customer reviews","Trust badges","Guarantee bar","Live chat","Free shipping bar","Urgency timers","Stock counters","Press logos","Risk reversal"],
      beforeAfter: {
        before: ["1.2% CR","Generic theme","No mobile optimization","No trust elements","Slow PDP (4s+)"],
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
    }} />
  ),
});
