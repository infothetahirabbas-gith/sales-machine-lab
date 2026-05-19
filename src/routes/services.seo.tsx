import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../../components/site/ServicePage";

export const Route = createFileRoute("/services/seo")({
  component: () => (
    <ServicePage cfg={{
      slug: "seo",
      eyebrow: "Ecommerce SEO",
      heroTitle: "Get free sales from Google — every day.",
      heroSub: "Rank your products, collections, and content so traffic compounds month over month.",
      problemTitle: "Most ecommerce stores are invisible on Google.",
      problemBullets: [
        "Product pages with thin content and no schema.",
        "Collection pages duplicating each other.",
        "Zero internal linking, zero topical authority.",
      ],
      whatIsTitle: "SEO for ecommerce is different.",
      whatIsBody: "Forget generic SEO playbooks. Ecommerce SEO is product page architecture, collection strategy, structured data, and content built around buyer intent — not generic 'blog posts'.",
      systemTitle: "Our ecommerce SEO system.",
      systemSteps: [
        { title: "Keyword & intent map", body: "Product, collection, info, and comparison intent — separated cleanly." },
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
    }} />
  ),
});
