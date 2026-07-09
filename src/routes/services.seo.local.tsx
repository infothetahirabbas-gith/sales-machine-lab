import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../components/site/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd, type FAQ } from "../lib/seo";
import heroImg from "../assets/hero-seo-growth.jpg";

const FAQ_LIST: FAQ[] = [
  { q: "Does local SEO matter for ecommerce?", a: "Yes if you have physical stores, showrooms, click-and-collect or serve specific UK regions. It also captures 'near me' and city-modifier searches you're leaving on the table." },
  { q: "What does local SEO include?", a: "Google Business Profile optimisation, local landing pages, NAP consistency, citations, review acquisition and localBusiness schema." },
  { q: "How many locations can you handle?", a: "From single-showroom to 200+ locations with programmatic local pages, unique content and per-store GBP management." },
  { q: "Will local SEO help voice and 'near me' searches?", a: "Yes — that's exactly where local ranking wins the click." },
  { q: "Do you handle reviews?", a: "Yes — review acquisition flows via Klaviyo/SMS, review response templates and rating recovery." },
];

export const Route = createFileRoute("/services/seo/local")({
  head: () => ({
    meta: [
      { title: "Local SEO Agency UK — Google Business & Multi-Location SEO | BeingEcom" },
      { name: "description", content: "Local SEO in the UK for ecommerce, retail and multi-location brands. Google Business Profile, local landing pages, citations and review growth." },
      { property: "og:title", content: "Local SEO Agency UK — Google Business & Multi-Location SEO | BeingEcom" },
      { property: "og:description", content: "Local SEO in the UK for ecommerce, retail and multi-location brands. Google Business Profile, local landing pages, citations and review growth." },
      { property: "og:url", content: "https://beingecom.com/services/seo/local" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://beingecom.com/services/seo/local" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({ slug: "seo/local", name: "Local SEO", description: "Local SEO for UK ecommerce, retail and multi-location brands." })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Ecommerce SEO", path: "/services/seo" }, { name: "Local SEO", path: "/services/seo/local" }])) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQ_LIST, "/services/seo/local")) },
    ],
  }),
  component: () => (
    <ServicePage cfg={{
      slug: "seo-local",
      eyebrow: "Local SEO",
      heroImage: heroImg,
      heroTitle: "Own 'near me' and every UK city that matters.",
      heroSub: "Local SEO for ecommerce, retail and multi-location brands — Google Business Profile, local pages, citations and reviews, done right.",
      problemTitle: "Why local rankings vanish for ecommerce brands.",
      problemBullets: [
        "GBP set up once in 2019 and never touched.",
        "One 'contact' page instead of a page per city or store.",
        "Inconsistent NAP across Yell, TrustPilot and 40 citation sites.",
      ],
      whatIsTitle: "Local SEO is a distinct discipline.",
      whatIsBody: "Ranking in the map pack and 'near me' results is a different game to organic blue links. It's GBP signals, proximity, reviews, citations and localBusiness schema — not backlinks and blog posts.",
      systemTitle: "Our local SEO system.",
      systemSteps: [
        { title: "GBP audit & optimisation", body: "Categories, services, products, posts, photos, Q&A." },
        { title: "Local landing pages", body: "One per city/store with unique content, schema and reviews." },
        { title: "Citations & NAP", body: "Consistent name, address, phone across 60+ UK directories." },
        { title: "Review growth loop", body: "Klaviyo/SMS review flows, response templates, rating recovery." },
      ],
      pillarsTitle: "Local pillars.",
      pillars: [
        { title: "GBP", body: "The single biggest local ranking lever." },
        { title: "Pages", body: "City / store landing pages that rank." },
        { title: "Citations", body: "Consistent NAP across UK directories." },
        { title: "Reviews", body: "Volume, velocity and recency — all three." },
      ],
      deepBlocks: [
        { title: "Google Business Profile", body: "Full optimisation, weekly posts, Q&A, products, photos, insights.", tags: ["GBP","Posts","Q&A"] },
        { title: "Multi-location landing pages", body: "Programmatic city/store pages with unique content, embed, reviews.", tags: ["City","Store","Programmatic"] },
        { title: "Citation building", body: "60+ UK directories — Yell, Thomson, Scoot, industry-specific.", tags: ["Yell","Thomson","NAP"] },
        { title: "Review acquisition", body: "Post-purchase flows via Klaviyo + SMS, review response system.", tags: ["Klaviyo","SMS","Response"] },
        { title: "LocalBusiness schema", body: "Store schema with hours, geo, price range, aggregate rating.", tags: ["Schema","Geo","Hours"] },
        { title: "Local link building", body: "Chambers, sponsorships, local press, community organisations.", tags: ["Chambers","Press","Local"] },
      ],
      triggersTitle: "Local ranking signals.",
      triggers: ["Verified GBP","Primary category","Reviews (velocity)","Photos","Local citations","City landing page","LocalBusiness schema","Google posts"],
      beforeAfter: {
        before: ["Ranked #14 in map pack","1.8 stars, 22 reviews","One contact page","NAP mismatched on 18 sites"],
        after: ["Ranked #2 in map pack","4.7 stars, 340 reviews","12 city landing pages","NAP consistent everywhere"],
      },
      caseStudy: {
        title: "Multi-store retailer: map-pack takeover across 8 UK cities",
        problem: "Store URLs missing, GBPs ignored, no reviews.",
        strategy: "GBP overhaul, 8 city pages, Klaviyo review flow, citation cleanup.",
        result: "Top-3 map pack in all 8 cities, in-store visits +64% via GBP.",
        metrics: [{ label: "Cities top-3", value: "8/8" }, { label: "Reviews", value: "+318" }, { label: "GBP visits", value: "+64%" }],
      },
      ctaTitle: "Dominate local search in every UK city you serve.",
      impactStats: [
        { value: "8/8", label: "Cities in top-3" },
        { value: "+318", label: "Reviews added" },
        { value: "+64%", label: "GBP-driven visits" },
      ],
      metricBars: [
        { label: "Map-pack rank", before: 14, after: 2, description: "Average map-pack position across target cities (lower is better)." },
        { label: "Review rating", before: 1.8, after: 4.7, description: "Average star rating across locations." },
        { label: "Review count", before: 22, after: 340, description: "Total Google reviews across locations." },
        { label: "GBP-driven visits", before: 100, after: 164, unit: "%", description: "Store visits attributed to GBP vs baseline." },
      ],
      faqs: FAQ_LIST,
    }} />
  ),
});
