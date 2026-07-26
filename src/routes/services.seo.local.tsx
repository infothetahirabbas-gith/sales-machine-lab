import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../components/site/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd, type FAQ } from "../lib/seo";
import heroImg from "../assets/hero-seo-growth.jpg";

const FAQ_LIST: FAQ[] = [
  { q: "Does local SEO matter for ecommerce?", a: "Yes if you have physical stores, showrooms, click-and-collect or serve specific UK regions. It also captures 'near me' and city-modifier searches you're leaving on the table." },
  { q: "What does local SEO include?", a: "Google Business Profile optimisation, local landing pages, NAP consistency, citations, review acquisition and localBusiness schema." },
  { q: "How many locations can you handle?", a: "From single-showroom to 200+ locations with programmatic local pages, unique content and per-store GBP management." },
  { q: "Will local SEO help voice and 'near me' searches?", a: "Yes - that's exactly where local ranking wins the click." },
  { q: "Do you handle reviews?", a: "Yes - review acquisition flows via Klaviyo/SMS, review response templates and rating recovery." },
  { q: "What makes you a specialist Ecommerce Agency UK for local SEO?", a: "We're a specialist Ecommerce Marketing Agency UK - we combine local map-pack tactics with ecommerce PDP/PLP SEO, so retailers rank both nationally and locally from one strategy." },
  { q: "How long does local SEO take to work?", a: "Google Business Profile changes can move the map pack in 2-4 weeks. City landing pages typically rank inside 8-12 weeks with the right on-page + citation work." },
  { q: "What is a Google Business Profile and why does it matter?", a: "It's the free Google-owned business listing that powers the map pack, 'near me' results and voice search. For local ecommerce it's often bigger than your website's organic traffic." },
  { q: "Can you help with multi-location review management?", a: "Yes - review request flows via Klaviyo and SMS, per-store response templates, negative review escalation and rating recovery playbooks." },
  { q: "Do you build citations manually?", a: "Yes - manual placements on Yell, Thomson Local, Scoot, FreeIndex, Yelp UK and industry-specific UK directories. NAP consistency is auto-monitored monthly." },
  { q: "What is LocalBusiness schema?", a: "JSON-LD structured data that tells Google your store's address, hours, geo coordinates, price range and aggregate rating - critical for map-pack ranking." },
  { q: "How does local SEO integrate with ecommerce SEO?", a: "As an Ecommerce Growth Agency we treat local as a channel inside the broader Ecommerce SEO Agency UK strategy - city pages internally link to money collections, and organic authority flows through." },
  { q: "Do you handle click-and-collect stores?", a: "Yes - we optimise GBP inventory, click-and-collect messaging, store-locator schema and city landing pages that push footfall + orders." },
  { q: "What cities have you scaled brands in?", a: "London, Manchester, Birmingham, Leeds, Glasgow, Edinburgh, Bristol, Liverpool, Newcastle, Sheffield, Cardiff, Belfast and 30+ other UK cities." },
  { q: "Do you offer GBP posts and photo updates?", a: "Yes - weekly Google Posts, monthly photo uploads, Q&A management and product/service catalogue updates. Freshness signals move the map pack." },
  { q: "How do you measure local SEO success?", a: "Map-pack rankings by city, GBP-driven calls / directions / website clicks, city landing page rankings, and in-store footfall attribution where possible." },
];

export const Route = createFileRoute("/services/seo/local")({
  head: () => ({
    meta: [
      { title: "Local SEO Agency UK | No.1 GBP, City Pages & Reviews | BeingEcom" },
      { name: "description", content: "BeingEcom is a leading UK local SEO agency for ecommerce. Google Business Profile, city pages and reviews that win 'near me' searches for UK ecommerce and multi-location brands." },
      { property: "og:title", content: "Local SEO Agency UK | No.1 GBP, City Pages & Reviews | BeingEcom" },
      { property: "og:description", content: "Local SEO Agency UK. Google Business Profile, city pages and reviews that win 'near me' searches for UK ecommerce and multi-location brands." },
      { property: "og:url", content: "https://beingecom.com/services/seo/local" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://beingecom.com/services/seo/local" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({ slug: "seo/local", name: "Local SEO Agency UK", description: "Local SEO for UK ecommerce, retail and multi-location brands by a specialist UK Ecommerce SEO Agency." })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Ecommerce SEO", path: "/services/seo" }, { name: "Local SEO", path: "/services/seo/local" }])) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQ_LIST, "/services/seo/local")) },
    ],
  }),
  component: () => (
    <ServicePage cfg={{
      slug: "seo-local",
      eyebrow: "Local SEO Agency UK",
      heroImage: heroImg,
      heroTitle: "Specialist Ecommerce Agency UK for local SEO - own 'near me' in every UK city.",
      heroSub: "Local SEO from a specialist Ecommerce Marketing Agency UK - Google Business Profile, local pages, citations and reviews for ecommerce, retail and multi-location UK brands.",
      problemTitle: "Why local rankings vanish for ecommerce brands.",
      problemBullets: [
        "GBP set up once in 2019 and never touched.",
        "One 'contact' page instead of a page per city or store.",
        "Inconsistent NAP across Yell, TrustPilot and 40 citation sites.",
      ],
      whatIsTitle: "Local SEO is a distinct discipline.",
      whatIsBody: "Ranking in the map pack and 'near me' results is a different game to organic blue links. It's GBP signals, proximity, reviews, citations and localBusiness schema - not backlinks and blog posts. As an Ecommerce Growth Agency we run local as its own workstream and wire it into the broader Ecommerce SEO Agency UK strategy, so retailers win both nationally and locally.",
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
        { title: "Reviews", body: "Volume, velocity and recency - all three." },
      ],
      deepBlocks: [
        { title: "Google Business Profile", body: "Full optimisation, weekly posts, Q&A, products, photos, insights.", tags: ["GBP","Posts","Q&A"] },
        { title: "Multi-location landing pages", body: "Programmatic city/store pages with unique content, embed, reviews.", tags: ["City","Store","Programmatic"] },
        { title: "Citation building", body: "60+ UK directories - Yell, Thomson, Scoot, industry-specific.", tags: ["Yell","Thomson","NAP"] },
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
      ctaTitle: "Dominate local search in every UK city - with the specialist Ecommerce SEO Agency.",
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
      relatedServices: [
        { to: "/services/seo", title: "Ecommerce SEO Agency UK", body: "The parent SEO service - local is one specialism inside it." },
        { to: "/services/seo/technical", title: "Technical SEO", body: "LocalBusiness schema and hreflang are technical prerequisites." },
        { to: "/services/seo/on-page", title: "On-Page SEO", body: "City-specific PDP and landing-page copy that ranks in local packs." },
        { to: "/services/seo/aeo", title: "AEO / AI Search", body: "Local intent queries increasingly resolve in AI Overviews first." },
        { to: "/locations", title: "UK locations we serve", body: "City-specific pages for London, Manchester, Birmingham and more." },
        { to: "/methodology", title: "The BeingEcom Growth System", body: "How local SEO plugs into our 6-stage methodology." },
      ],
    }} />
  ),
});
