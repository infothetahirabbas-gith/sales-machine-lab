import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../components/site/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd } from "../lib/seo";

export const Route = createFileRoute("/services/seo")({
  head: () => ({
    meta: [
      { title: "Ecommerce SEO — Shopify & WooCommerce SEO Agency | BeingEcom" },
      { name: "description", content: "Rank products, collections and content on Google. Technical SEO, on-page, content and link building for Shopify & WooCommerce — free traffic forever." },
      { name: "keywords", content: "ecommerce SEO, Shopify SEO, WooCommerce SEO, product page SEO, collection page SEO, ecommerce SEO agency, technical SEO, ecommerce link building" },
      { property: "og:title", content: "Ecommerce SEO — Shopify & WooCommerce SEO Agency | BeingEcom" },
      { property: "og:description", content: "Rank products, collections and content on Google. Technical SEO, on-page, content and link building for Shopify & WooCommerce — free traffic forever." },
      { property: "og:url", content: "https://sales-machine-lab.lovable.app/services/seo" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://sales-machine-lab.lovable.app/services/seo" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({ slug: "seo", name: "Ecommerce SEO", description: "Technical SEO, on-page, content and link building for Shopify and WooCommerce stores." })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Ecommerce SEO", path: "/services/seo" }])) },
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
    }} />
  ),
});
