import { createFileRoute, Link } from "@tanstack/react-router";
import PageLayout from "../components/site/PageLayout";
import { Section, Card, CTA } from "../components/site/Section";
import { breadcrumbJsonLd, SITE_URL, ORG_INFO } from "../lib/seo";

type PostMeta = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readMins: number;
  datePublished: string;
};

const POSTS: PostMeta[] = [
  {
    slug: "shopify-plus-migration-uk",
    title: "Shopify Plus migration for UK brands: WooCommerce to Shopify Plus without losing rankings",
    description:
      "A UK-specific Shopify Plus migration guide - when to move from WooCommerce, VAT and Markets setup, 301 redirect strategy, and a technical checklist that protects SEO and revenue.",
    category: "Ecommerce strategy",
    readMins: 12,
    datePublished: "2026-07-08",
  },
  {
    slug: "shopify-vs-woocommerce-uk",
    title: "Shopify vs WooCommerce UK 2026: honest comparison for growing DTC brands",
    description:
      "Shopify or WooCommerce for a UK ecommerce brand in 2026? Real total cost of ownership, SEO, checkout, VAT, apps, scaling limits - decided by revenue stage, not marketing copy.",
    category: "Ecommerce strategy",
    readMins: 14,
    datePublished: "2026-07-07",
  },
  {
    slug: "uk-ecommerce-seo-playbook-shopify",
    title: "The UK ecommerce SEO playbook for Shopify (2026)",
    description:
      "The complete UK Shopify SEO playbook: technical, on-page, content and local. What actually moves organic revenue for £1M-£15M UK DTC stores.",
    category: "Ecommerce SEO",
    readMins: 18,
    datePublished: "2026-07-23",
  },
  {
    slug: "shopify-duplicate-content-faceted-urls",
    title: "How to fix Shopify duplicate content and faceted URLs",
    description:
      "Collection filters, tags and vendor URLs quietly duplicate your Shopify store. Here's the canonical, robots and metafield fix that recovers wasted crawl budget.",
    category: "Ecommerce SEO",
    readMins: 10,
    datePublished: "2026-07-23",
  },
  {
    slug: "shopify-product-page-seo-uk",
    title: "Product page SEO for UK Shopify stores",
    description:
      "The PDP template that ranks and converts for UK Shopify brands - copy structure, schema, reviews, UK signals and internal linking.",
    category: "Ecommerce SEO",
    readMins: 11,
    datePublished: "2026-07-23",
  },
  {
    slug: "shopify-collection-page-seo",
    title: "Collection page SEO: templates that rank",
    description:
      "Why Shopify collection pages under-rank and the on-page template that fixes it - intro copy, faceted-nav strategy, schema and internal linking.",
    category: "Ecommerce SEO",
    readMins: 10,
    datePublished: "2026-07-23",
  },
  {
    slug: "shopify-plus-technical-seo-checklist",
    title: "Technical SEO checklist for Shopify Plus",
    description:
      "Crawl budget, canonicals, hreflang, Core Web Vitals, JSON-LD and international - the technical SEO checklist we run on every Shopify Plus audit.",
    category: "Ecommerce SEO",
    readMins: 12,
    datePublished: "2026-07-23",
  },
  {
    slug: "local-seo-multi-location-uk-ecommerce",
    title: "Local SEO for multi-location UK ecommerce brands",
    description:
      "How UK ecommerce brands with showrooms, pickup points or regional fulfilment rank in local packs - GBP, schema, city pages and review strategy.",
    category: "Ecommerce SEO",
    readMins: 11,
    datePublished: "2026-07-23",
  },
];

const blogListJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${SITE_URL}/blog#blog`,
  name: "BeingEcom Ecommerce Growth Journal",
  description:
    "Playbooks, benchmarks and teardowns from the BeingEcom team on Shopify, WooCommerce, CRO, paid media and ecommerce SEO for UK DTC brands.",
  url: `${SITE_URL}/blog`,
  publisher: {
    "@type": "Organisation",
    name: ORG_INFO.name,
    url: ORG_INFO.url,
    logo: { "@type": "ImageObject", url: ORG_INFO.logo },
  },
  blogPost: POSTS.map((p) => ({
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    url: `${SITE_URL}/blog/${p.slug}`,
    datePublished: p.datePublished,
    author: { "@type": "Organisation", name: ORG_INFO.name },
  })),
};

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Ecommerce Growth Blog - Shopify & WooCommerce UK | BeingEcom" },
      {
        name: "description",
        content:
          "Playbooks, benchmarks and teardowns for UK Shopify and WooCommerce brands. Ecommerce SEO, CRO, paid ads and retention - written by senior operators, not interns.",
      },
      { property: "og:title", content: "Ecommerce Growth Blog - Shopify & WooCommerce UK | BeingEcom" },
      {
        property: "og:description",
        content:
          "Playbooks, benchmarks and teardowns for UK Shopify and WooCommerce brands. Ecommerce SEO, CRO, paid ads and retention.",
      },
      { property: "og:url", content: `${SITE_URL}/blog` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/blog` }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(blogListJsonLd) },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
        ),
      },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <PageLayout>
      <h1 className="sr-only">Ecommerce Growth Journal - Shopify & WooCommerce UK</h1>
      <Section
        eyebrow="Blog"
        title="The BeingEcom ecommerce growth journal"
        intro="Field notes from senior operators running Shopify and WooCommerce stores across the UK - the same playbooks we bill for, written out in full."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="block group"
              aria-label={p.title}
            >
              <Card className="h-full">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-3">
                  {p.category} · {p.readMins} min read
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-ink leading-tight group-hover:text-primary transition">
                  {p.title}
                </h2>
                <p className="mt-3 text-sm text-muted-foreground">{p.description}</p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-primary">
                  Read the guide →
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
      <CTA
        heading="Want the playbook applied to your store?"
        sub="Book a 30-minute strategy call and we'll show you where the revenue is leaking - and the fastest way to plug it."
      />
    </PageLayout>
  );
}

// Route params for the dynamic slug route are declared in blog.$slug.tsx.
// This file only exposes /blog itself.
export { POSTS as BLOG_POSTS };
