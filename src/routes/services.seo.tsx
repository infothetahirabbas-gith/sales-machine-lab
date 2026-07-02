import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../components/site/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd, type FAQ } from "../lib/seo";

const FAQ_LIST: FAQ[] = [
  {
    "q": "How long does ecommerce SEO take to work?",
    "a": "Technical fixes and on-page changes show in 4–8 weeks. Authority and ranking compounding kicks in around month 4–6."
  },
  {
    "q": "Shopify or WooCommerce — which is better for SEO?",
    "a": "Both can rank. WooCommerce gives you more control; Shopify is faster but needs apps for proper schema, redirects and URL control."
  },
  {
    "q": "Do you do link building?",
    "a": "Yes — digital PR, niche edits and ecommerce-specific outreach. No PBNs, no spam."
  },
  {
    "q": "What about AI search and Google's SGE?",
    "a": "We optimise for AI Overviews, ChatGPT, Perplexity and Gemini with entity SEO, schema, citations and answer-first content."
  },
  {
    "q": "Will you fix our existing technical issues?",
    "a": "Yes — Core Web Vitals, crawl waste, faceted-nav indexing, duplicate content, schema and internal linking are part of every engagement."
  }
];

export const Route = createFileRoute("/services/seo")({
  head: () => ({
    meta: [
      { title: "Ecommerce SEO Agency UK — Shopify & WooCommerce SEO Services | BeingEcom" },
      { name: "description", content: "Ecommerce SEO agency in the UK for Shopify and WooCommerce brands. Rank higher on Google and win Google AI Overview citations with technical SEO, product-page optimisation and topical authority content." },
      { property: "og:title", content: "Ecommerce SEO Agency UK — Shopify & WooCommerce SEO Services | BeingEcom" },
      { property: "og:description", content: "Ecommerce SEO agency in the UK for Shopify and WooCommerce brands. Rank higher on Google and win Google AI Overview citations with technical SEO, product-page optimisation and topical authority content." },
      { property: "og:url", content: "https://beingecom.com/services/seo" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://beingecom.com/services/seo" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({ slug: "seo", name: "Ecommerce SEO", description: "Technical SEO, on-page, content and link building for Shopify and WooCommerce stores." })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Ecommerce SEO", path: "/services/seo" }])) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQ_LIST, "/services/seo")) },
    ],
  }),
  component: () => (
    <ServicePage cfg={{
      slug: "seo",
      eyebrow: "Ecommerce SEO",
      heroTitle: "Get free sales from Google - every day.",
      heroSub: "Rank your products, collections, and content so traffic compounds month over month.",
      problemTitle: "Most ecommerce stores are invisible on Google.",
      problemBullets: [
        "Product pages with thin content and no schema.",
        "Collection pages duplicating each other.",
        "Zero internal linking, zero topical authority.",
      ],
      whatIsTitle: "SEO for ecommerce is different.",
      whatIsBody: "Forget generic SEO playbooks. Ecommerce SEO is product page architecture, collection strategy, structured data, and content built around buyer intent - not generic 'blog posts'.",
      systemTitle: "Our ecommerce SEO system.",
      systemSteps: [
        { title: "Keyword & intent map", body: "Product, collection, info, and comparison intent - separated cleanly." },
        { title: "On-page rebuild", body: "Titles, metas, H-structure, schema, content blocks." },
        { title: "Technical fixes", body: "Speed, crawl, indexation, canonicals, sitemap." },
        { title: "Authority building", body: "Internal links, content hubs, real backlinks." },
      ],
      pillarsTitle: "Pillars of ecommerce SEO.",
      pillars: [
        { title: "Product pages", body: "Schema, FAQs, reviews, unique copy." },
        { title: "Collections", body: "Hub pages that target high-intent terms." },
        { title: "Technical", body: "Crawl, speed, index hygiene." },
        { title: "Content", body: "Comparison, guide, and intent-led blogs." },
      ],
      deepBlocks: [
        { title: "Keyword strategy system", body: "Buyer-intent keyword map across product, collection, info, comparison.", tags: ["Intent","Cluster","Volume","Difficulty"] },
        { title: "Product page SEO", body: "Schema (Product, Review, FAQ), unique copy, image alts, internal links.", tags: ["Schema","FAQ","Alt","Internal"] },
        { title: "Collection page SEO", body: "Custom intros, filter URL strategy, canonicals, anchor links.", tags: ["Intros","Canonical","Filters"] },
        { title: "Technical SEO fixes", body: "Speed, mobile, crawl budget, indexation, broken links, redirects.", tags: ["Speed","Crawl","Index"] },
        { title: "Blog SEO strategy", body: "Comparison, vs, best-of, guide, problem-solution content built for ranking.", tags: ["Best-of","Vs","Guide"] },
        { title: "Structured data + internal linking", body: "Schema markup + topical internal linking system across the store.", tags: ["JSON-LD","Hubs","Anchors"] },
      ],
      beforeAfter: {
        before: ["100 organic sessions/mo","No keyword ranking top-10","Zero schema","Duplicate collection titles"],
        after: ["18K organic sessions/mo","60+ top-10 rankings","Schema across PDPs","Hub-and-spoke architecture"],
      },
      caseStudy: {
        title: "Home brand: 100 → 18K organic sessions in 6 months",
        problem: "No organic traffic, paid-only acquisition.",
        strategy: "Rebuilt PDP/PLP SEO, created 22 comparison + guide articles.",
        result: "18K organic monthly sessions, ~$24K/mo organic revenue.",
        metrics: [{ label: "Sessions", value: "180×" }, { label: "Rankings", value: "60+" }, { label: "Org. rev", value: "$24K/mo" }],
      },
      ctaTitle: "Compound free traffic. Forever.",
      impactStats: [
        { value: "+312%", label: "Organic sessions" },
        { value: "+148%", label: "Organic revenue" },
        { value: "82", label: "Top-10 keywords" },
      ],
      metricBars: [
        { label: "Organic sessions / mo", before: 4.2, after: 18.6, unit: "k", description: "Monthly Google + Bing organic visits to the store." },
        { label: "Keywords in top 10", before: 14, after: 96, description: "Number of commercial keywords ranked in positions 1–10 on Google." },
        { label: "Organic revenue", before: 6, after: 38, unit: "$k", description: "Direct revenue attributed to organic search in Google Analytics." },
        { label: "Domain authority", before: 18, after: 41, description: "Aggregate backlink strength score (Ahrefs / Moz DR/DA scale 0–100)." },
        { label: "Indexed product pages", before: 122, after: 1840, description: "PDPs + collection pages indexed by Google after schema + crawl fixes." },
      ],
      faqs: FAQ_LIST,
    }} />
  ),
});
