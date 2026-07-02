import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../components/site/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd, type FAQ } from "../lib/seo";

const FAQ_LIST: FAQ[] = [
  {
    "q": "Is Google Ads worth it for ecommerce?",
    "a": "Yes — Shopping and brand Search are usually the highest-ROAS channels in the account. PMax fills the gap."
  },
  {
    "q": "Should I run Performance Max?",
    "a": "Yes, with feed segmentation, asset groups and brand exclusions. Naked PMax wastes spend on brand."
  },
  {
    "q": "What about Google Shopping?",
    "a": "Standard Shopping is still the cleanest data signal for diagnosing PMax. We often run both."
  },
  {
    "q": "Do you handle the Merchant Center feed?",
    "a": "Yes — feed optimisation, GTIN/MPN fixes, custom labels and supplemental feeds for titles."
  },
  {
    "q": "Brand search — should I bid on my own name?",
    "a": "Yes, if competitors do. Cheap, defends share, and the incremental revenue covers the spend many times over."
  }
];

export const Route = createFileRoute("/services/performance-marketing/google-ads")({
  head: () => ({
    meta: [
      { title: "Google Ads Agency UK — Search, Shopping & PMax for Ecommerce | BeingEcom" },
      { name: "description", content: "UK Google Ads agency for Shopify & WooCommerce. Search, Shopping, Performance Max, feed optimisation and brand defence built for ROAS." },
      { name: "keywords", content: "google ads agency uk, ppc agency uk, google shopping agency uk, performance max agency, ecommerce google ads agency, feed optimisation agency uk, google ads consultant london, google ads management uk, best google ads agency for ecommerce uk" },
      { property: "og:title", content: "Google Ads Agency UK | BeingEcom" },
      { property: "og:description", content: "Search, Shopping and PMax engineered for profitable ecommerce intent capture." },
      { property: "og:url", content: "https://beingecom.com/services/performance-marketing/google-ads" },
    ],
    links: [{ rel: "canonical", href: "https://beingecom.com/services/performance-marketing/google-ads" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({ slug: "performance-marketing/google-ads", name: "Google Ads", description: "Search, Shopping and Performance Max for ecommerce brands." })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Performance Marketing", path: "/services/performance-marketing" }, { name: "Google Ads", path: "/services/performance-marketing/google-ads" }])) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQ_LIST, "/services/performance-marketing/google-ads")) },
    ],
  }),
  component: () => (
    <ServicePage cfg={{
      slug: "google-ads",
      eyebrow: "Google Ads",
      heroTitle: "Google Ads that capture every buying moment.",
      heroSub: "Search, Shopping, Performance Max, feed optimisation and brand defence — engineered for profitable intent capture.",
      problemTitle: "Why most Google accounts leak budget.",
      problemBullets: [
        "PMax dumping spend into brand traffic.",
        "Shopping feeds with no titles, no segmentation.",
        "Search campaigns bleeding on broad match.",
      ],
      whatIsTitle: "Google ads are intent, not interruption.",
      whatIsBody: "Buyers are already searching. We structure campaigns, clean the feed, and ring-fence brand so every pound chases incremental revenue, not vanity volume.",
      systemTitle: "Our Google Ads system.",
      systemSteps: [
        { title: "Account & feed audit", body: "Structure, match types, feed health, conversions." },
        { title: "Feed optimisation", body: "Titles, attributes, segmentation, custom labels." },
        { title: "PMax + Search", body: "Asset groups, audience signals, brand exclusions." },
        { title: "Scale & defend", body: "Brand defence, competitor capture, geo expansion." },
      ],
      pillarsTitle: "What we run inside Google.",
      pillars: [
        { title: "Search", body: "Exact & phrase, branded vs non-branded split." },
        { title: "Shopping", body: "Standard & PMax, segmented by margin." },
        { title: "Performance Max", body: "Asset groups with audience signals." },
        { title: "Brand defence", body: "Capture brand intent at lowest CPC." },
      ],
      deepBlocks: [
        { title: "Feed optimisation", body: "Titles, GTINs, custom labels, supplemental feeds.", tags: ["Feed","GTIN","Labels"] },
        { title: "PMax structure", body: "Asset groups by margin tier with audience signals and brand exclusions.", tags: ["PMax","Asset groups","Signals"] },
        { title: "Search structure", body: "Branded vs non-branded, match-type discipline, negatives.", tags: ["Search","Negatives","Match types"] },
        { title: "Conversion tracking", body: "Enhanced conversions, server-side, offline imports.", tags: ["Enhanced","GA4","Offline"] },
      ],
      triggersTitle: "Levers that move Google ROAS.",
      triggers: ["Feed titles","Custom labels","Brand exclusion","Audience signals","Negative keywords","Bid strategy","Geo targeting","Device split"],
      beforeAfter: {
        before: ["1.8× ROAS","Single PMax campaign","£62 CAC","Brand cannibalisation"],
        after: ["4.6× ROAS","Segmented PMax + Search","£28 CAC","Incremental only"],
      },
      caseStudy: {
        title: "Home goods: 1.8× → 4.6× ROAS in 60 days",
        problem: "PMax eating brand traffic, no feed segmentation.",
        strategy: "Brand exclusions, margin-segmented PMax, feed rebuild.",
        result: "4.6× ROAS at £28 CAC, 3.1× revenue lift.",
        metrics: [{ label: "ROAS", value: "4.6×" }, { label: "CAC", value: "£28" }, { label: "Days", value: "60" }],
      },
      ctaTitle: "Want Google to capture buyers, not waste spend?",
      impactStats: [
        { value: "4.6×", label: "Avg ROAS" },
        { value: "-55%", label: "CAC reduction" },
        { value: "+212%", label: "Incremental revenue" },
      ],
      metricBars: [
        { label: "ROAS", before: 1.8, after: 4.6, unit: "×", description: "Revenue ÷ Google ad spend." },
        { label: "CAC", before: 62, after: 28, unit: "£", description: "Cost per acquired customer on Google." },
        { label: "Impression share", before: 38, after: 72, unit: "%", description: "Share of available impressions on target queries." },
        { label: "Monthly ad revenue", before: 32, after: 142, unit: "£k", description: "Top-line Google-attributed revenue." },
      ],
      faqs: FAQ_LIST,
    }} />
  ),
});
