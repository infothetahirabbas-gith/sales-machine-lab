import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../components/site/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd, type FAQ } from "../lib/seo";

const FAQ_LIST: FAQ[] = [
  { q: "What is international SEO?", a: "Ranking your ecommerce store across multiple countries and languages with the right domain/URL structure, hreflang, currency, translation and local authority signals." },
  { q: "Subdomain, subfolder or ccTLD?", a: "For most UK DTC brands scaling internationally, subfolders (/us/, /de/, /fr/) on the main domain are safest — you keep authority. ccTLDs only make sense with local teams and local link building." },
  { q: "Do you handle hreflang?", a: "Yes — full hreflang mapping, x-default, sitemap-based implementation and validation. Getting this wrong tanks international rankings." },
  { q: "What about translation vs localisation?", a: "Machine translation is a starting point, never the finish line. We use native-speaker localisation for money pages, product copy, ads and email — cultural nuance sells." },
  { q: "How long until international SEO shows results?", a: "3–6 months per new region — faster if you already have brand authority to pass through subfolder structure." },
];

export const Route = createFileRoute("/services/seo/international")({
  head: () => ({
    meta: [
      { title: "International SEO Agency UK — Multi-Country & Multilingual SEO | BeingEcom" },
      { name: "description", content: "International SEO for UK ecommerce brands scaling into the US, EU and beyond. Hreflang, subfolder architecture, localisation and country-level authority." },
      { property: "og:title", content: "International SEO Agency UK — Multi-Country & Multilingual SEO | BeingEcom" },
      { property: "og:description", content: "International SEO for UK ecommerce brands scaling into the US, EU and beyond. Hreflang, subfolder architecture, localisation and country-level authority." },
      { property: "og:url", content: "https://beingecom.com/services/seo/international" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://beingecom.com/services/seo/international" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({ slug: "seo/international", name: "International SEO", description: "International SEO — hreflang, subfolder architecture, localisation and country authority." })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Ecommerce SEO", path: "/services/seo" }, { name: "International SEO", path: "/services/seo/international" }])) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQ_LIST, "/services/seo/international")) },
    ],
  }),
  component: () => (
    <ServicePage cfg={{
      slug: "seo-international",
      eyebrow: "International SEO",
      heroTitle: "Scale your UK brand into the US, EU and beyond — profitably.",
      heroSub: "International SEO that gets the architecture, hreflang and localisation right the first time.",
      problemTitle: "Why UK brands stall when they go international.",
      problemBullets: [
        "US pages ranking under UK URLs — wrong country, wrong currency.",
        "Hreflang missing or misconfigured, cannibalisation everywhere.",
        "Google-translated copy that reads like machine output.",
      ],
      whatIsTitle: "International SEO is architecture + localisation.",
      whatIsBody: "You can't just duplicate a UK store and slap /us/ on the URL. Ranking in a new country needs the right structure, hreflang, native localisation and country-level authority signals.",
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
      ctaTitle: "Take your UK brand global — the right way.",
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
