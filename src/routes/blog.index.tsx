import { createFileRoute, Link } from "@tanstack/react-router";
import PageLayout from "../components/site/PageLayout";
import { Section, Card, CTA } from "../components/site/Section";
import { breadcrumbJsonLd, faqJsonLd, SITE_URL, ORG_INFO } from "../lib/seo";
import EditorialBlock from "../components/site/EditorialBlock";
import FaqSection from "../components/site/FaqSection";
import { BLOG_POSTS as POSTS } from "../lib/blog-posts";



const blogListJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${SITE_URL}/blog#blog`,
  name: "BeingEcom Ecommerce Growth Journal",
  description:
    "Playbooks, benchmarks and teardowns from the BeingEcom team on Shopify, WooCommerce, CRO, paid media and ecommerce SEO for UK DTC brands.",
  url: `${SITE_URL}/blog`,
  publisher: {
    "@type": "Organization",
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
    author: { "@type": "Organization", name: ORG_INFO.name },
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
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large" },
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
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(BLOG_FAQS, "/blog")) },
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
      <EditorialBlock editorial={BLOG_EDITORIAL} />
      <FaqSection
        faqs={BLOG_FAQS}
        title="Ecommerce blog"
        highlight="FAQs"
        intro="Common questions about how these UK ecommerce guides are written and how to use them."
      />
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
