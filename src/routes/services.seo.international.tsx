import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../components/site/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd, type FAQ } from "../lib/seo";
import heroImg from "../assets/hero-seo-growth.jpg";

const FAQ_LIST: FAQ[] = [
  { q: "What is international SEO?", a: "Ranking your ecommerce store across multiple countries and languages with the right domain/URL structure, hreflang, currency, translation and local authority signals." },
  { q: "Subdomain, subfolder or ccTLD?", a: "For most UK DTC brands scaling internationally, subfolders (/us/, /de/, /fr/) on the main domain are safest - you keep authority. ccTLDs only make sense with local teams and local link building." },
  { q: "Do you handle hreflang?", a: "Yes - full hreflang mapping, x-default, sitemap-based implementation and validation. Getting this wrong tanks international rankings." },
  { q: "What about translation vs localisation?", a: "Machine translation is a starting point, never the finish line. We use native-speaker localisation for money pages, product copy, ads and email - cultural nuance sells." },
  { q: "How long until international SEO shows results?", a: "3-6 months per new region - faster if you already have brand authority to pass through subfolder structure." },
  { q: "What makes you the best Ecommerce SEO Agency UK for international expansion?", a: "We're a UK-headquartered Ecommerce Marketing Agency UK that has scaled brands into US, EU, MENA and APAC from UK Shopify and WooCommerce headquarters. UK strategy, global execution." },
  { q: "Can you help with Shopify Markets?", a: "Yes - full Shopify Markets configuration: country routing, currency, pricing, catalogues, hreflang, checkout language and payment methods per region." },
  { q: "Do you support WooCommerce multi-region setups?", a: "Yes - WPML or Polylang, multi-currency plugins, GeoIP routing, hreflang mapping and per-region schema. Woo is more flexible but needs more engineering." },
  { q: "How do you research international keyword demand?", a: "Ahrefs + Semrush per-country databases, local Search Console data, competitor SERP scraping in-country, and native-speaker validation of intent nuances." },
  { q: "What is x-default in hreflang?", a: "The fallback URL for users whose language/country isn't covered by any hreflang tag. Most implementations either miss it or point it at the wrong URL. We validate it every time." },
  { q: "Do you handle European VAT and pricing display?", a: "Yes - VAT-inclusive pricing per country, currency formatting, GDPR-compliant checkout, EU accessibility (EAA 2025) - all in scope." },
  { q: "How does international SEO integrate with an Ecommerce Growth Agency strategy?", a: "It's one workstream inside the broader Ecommerce Marketing Agency UK plan - international SEO, paid, email and CRO are sequenced per market so revenue compounds instead of leaking." },
  { q: "Which markets have you scaled UK brands into?", a: "United States, Canada, Germany, France, Italy, Spain, Netherlands, Poland, Ireland, Australia, UAE, Saudi Arabia, Singapore." },
  { q: "Do you help with international paid ads too?", a: "Yes - Google Ads and Meta Ads per market, with SEO and paid working from the same keyword and landing-page architecture." },
  { q: "What tools do you use for international SEO?", a: "Ahrefs, Semrush, Merkle Hreflang Tags Tool, Screaming Frog, Sitebulb, Google Search Console (per property), and native-speaker QA on every locale." },
  { q: "How do you handle US expansion for UK stores specifically?", a: "/us/ subfolder on the main domain (or dedicated .com/.us), USD pricing + US-specific messaging, US CRO (shipping, returns, sizing), US digital PR to build country authority." },
];

export const Route = createFileRoute("/services/seo/international")({
  head: () => ({
    meta: [
      { title: "International SEO Agency UK | No.1 US, EU & Global Ecommerce | BeingEcom" },
      { name: "description", content: "BeingEcom is a leading International SEO Agency UK and specialist Ecommerce SEO Agency UK. We scale Shopify and WooCommerce brands into the US, EU and global markets - hreflang, technical & content SEO done properly." },
      { property: "og:title", content: "International SEO Agency UK | No.1 US, EU & Global Ecommerce | BeingEcom" },
      { property: "og:description", content: "International SEO Agency UK scaling Shopify and WooCommerce brands into the US, EU and global markets - hreflang, technical & content SEO done properly." },
      { property: "og:url", content: "https://beingecom.com/services/seo/international" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://beingecom.com/services/seo/international" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({ slug: "seo/international", name: "International SEO Agency UK", description: "International SEO - hreflang, subfolder architecture, localisation and country authority - by an award-winning UK Ecommerce SEO Agency." })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Ecommerce SEO", path: "/services/seo" }, { name: "International SEO", path: "/services/seo/international" }])) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQ_LIST, "/services/seo/international")) },
    ],
  }),
  component: () => (
    <ServicePage cfg={{
      slug: "seo-international",
      eyebrow: "International SEO Agency UK",
      heroImage: heroImg,
      heroTitle: "No.1 Ecommerce Agency UK for international SEO - scale into the US, EU and beyond, profitably.",
      heroSub: "International SEO from an award-winning Ecommerce Marketing Agency UK - the architecture, hreflang and localisation done right the first time, for Shopify and WooCommerce brands going global.",
      problemTitle: "Why UK brands stall when they go international.",
      problemBullets: [
        "US pages ranking under UK URLs - wrong country, wrong currency.",
        "Hreflang missing or misconfigured, cannibalisation everywhere.",
        "Google-translated copy that reads like machine output.",
      ],
      whatIsTitle: "International SEO is architecture + localisation.",
      whatIsBody: "You can't just duplicate a UK store and slap /us/ on the URL. As the UK's leading Ecommerce Growth Agency for cross-border scale, we build the right structure, hreflang, native localisation and country-level authority signals - so /us/, /de/, /fr/ actually rank instead of quietly cannibalising your UK site.",
      systemTitle: "Our international SEO system.",
      systemSteps: [
        { title: "Market & keyword research", body: "Volume, intent and competitor mapping per target country." },
        { title: "Architecture design", body: "Subfolder vs subdomain vs ccTLD, decided on evidence." },
        { title: "Hreflang & indexation", body: "Sitemap-based hreflang, canonicals, geo-signals, GSC properties." },
        { title: "Localisation & authority", body: "Native copy, local links, local citations, currency + payment UX." },
      ],
      pillarsTitle: "Pillars of international SEO.",
      pillars: [
        { title: "Architecture", body: "URL, domain and folder structure done properly." },
        { title: "Hreflang", body: "Signals Google what URL belongs to what country." },
        { title: "Localisation", body: "Native copy, currency, sizing, cultural nuance." },
        { title: "Country authority", body: "Local links and citations per market." },
      ],
      deepBlocks: [
        { title: "Domain & URL strategy", body: "Subfolder / subdomain / ccTLD decision based on your goals and resources.", tags: ["Subfolder","Subdomain","ccTLD"] },
        { title: "Hreflang implementation", body: "Sitemap-based, x-default, self-referencing, validated end-to-end.", tags: ["Hreflang","Sitemap","x-default"] },
        { title: "Localisation", body: "Native translation, currency, sizing, cultural CRO for each country.", tags: ["Native","Currency","Sizing"] },
        { title: "Country-level authority", body: "Local digital PR, citations and links per country.", tags: ["Local PR","Citations"] },
        { title: "Geo-targeting & GSC", body: "Search Console properties per country, geo-signals, server + CDN.", tags: ["GSC","Geo","CDN"] },
        { title: "International schema", body: "Organization, sameAs, currency-aware Product schema per market.", tags: ["Schema","Currency","sameAs"] },
      ],
      triggersTitle: "Markets we scale UK brands into.",
      triggers: ["United States","Canada","Germany","France","Italy","Spain","Netherlands","Australia","UAE","Ireland"],
      beforeAfter: {
        before: ["UK-only pages ranking in US","No hreflang","GBP shown to US shoppers","Zero US-market links"],
        after: ["/us/ ranking natively","Hreflang validated","USD + US CRO","US digital PR live"],
      },
      caseStudy: {
        title: "UK apparel brand: US expansion → £220k/mo in 6 months",
        problem: "US traffic sent to UK pages, GBP pricing, 1.1% CR.",
        strategy: "/us/ subfolder, hreflang, US localisation, US digital PR programme.",
        result: "US organic sessions +410%, US CR 3.4%, US revenue £220k/mo in 6 months.",
        metrics: [{ label: "US organic", value: "+410%" }, { label: "US CR", value: "3.4%" }, { label: "US MRR", value: "£220k" }],
      },
      ctaTitle: "Take your UK brand global - with the UK's leading Ecommerce SEO Agency.",
      impactStats: [
        { value: "+410%", label: "US organic" },
        { value: "3.4%", label: "US conversion rate" },
        { value: "6mo", label: "To 6-figure MRR" },
      ],
      metricBars: [
        { label: "US organic sessions", before: 100, after: 510, unit: "%", description: "US organic vs baseline after subfolder + hreflang + US content." },
        { label: "US conversion rate", before: 1.1, after: 3.4, unit: "%", description: "US conversion rate after localisation, currency and US CRO." },
        { label: "Non-UK revenue share", before: 4, after: 32, unit: "%", description: "Share of revenue from non-UK markets." },
        { label: "Hreflang errors", before: 320, after: 0, description: "Hreflang errors reported in Search Console." },
      ],
      faqs: FAQ_LIST,
    }} />
  ),
});
