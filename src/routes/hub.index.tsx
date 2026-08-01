import { createFileRoute, Link } from "@tanstack/react-router";
import PageLayout from "@/components/site/PageLayout";
import { breadcrumbJsonLd, faqJsonLd, SITE_URL } from "@/lib/seo";
import EditorialBlock from "@/components/site/EditorialBlock";
import FaqSection from "@/components/site/FaqSection";
import { CTA } from "@/components/site/Section";
import { HUB_EDITORIAL, HUB_FAQS } from "@/lib/index-editorial";
import { ArrowRight, BookOpen } from "lucide-react";

const PILLARS = [
  {
    slug: "shopify-growth",
    title: "Shopify Growth Hub",
    summary: "Everything a Shopify or Shopify Plus brand needs to compound revenue SEO, speed, CRO, paid, email and headless.",
  },
  {
    slug: "woocommerce-growth",
    title: "WooCommerce Growth Hub",
    summary: "Scaling WooCommerce and WordPress stores past the plugin-bloat ceiling performance, checkout, hosting and marketing.",
  },
  {
    slug: "ecommerce-seo",
    title: "Ecommerce SEO Hub",
    summary: "Technical, on-page, off-page, local, international and AEO the full SEO stack for product-led sites.",
  },
  {
    slug: "paid-media",
    title: "Paid Media Hub",
    summary: "Meta, Google, TikTok and YouTube profitable buying against contribution margin and MER, not platform ROAS.",
  },
  {
    slug: "cro",
    title: "CRO Hub",
    summary: "Structured experimentation research, hypothesis, sample size, guardrails for PDP, cart, checkout and PLP.",
  },
  {
    slug: "ai-automation",
    title: "AI Automation Hub",
    summary: "How senior ecommerce teams use AI for reporting, creative testing, keyword research and customer support at scale.",
  },
  {
    slug: "email-marketing",
    title: "Email & SMS Hub",
    summary: "Klaviyo flow architecture, segmentation, deliverability and the LTV-first campaign model that turns email into the retention engine.",
  },
  {
    slug: "analytics-tracking",
    title: "Analytics & Tracking Hub",
    summary: "GA4, server-side tagging, Meta CAPI, MMM and one contribution-margin dashboard the truth layer behind every scaling decision.",
  },
  {
    slug: "ecommerce-strategy",
    title: "Ecommerce Strategy Hub",
    summary: "Positioning, merchandising, pricing, category and market entry the five strategic decisions that make every channel cheaper.",
  },
  {
    slug: "ecommerce-operations",
    title: "Ecommerce Operations Hub",
    summary: "3PL selection, inventory turn, CX SLAs and returns strategy the operational spine that protects margin at scale.",
  },
  {
    slug: "customer-retention",
    title: "Customer Retention Hub",
    summary: "LTV modelling, subscriptions, loyalty, winback and VIP the retention stack that funds acquisition profitably.",
  },
];

export const Route = createFileRoute("/hub/")({
  head: () => ({
    meta: [
      { title: "Ecommerce Knowledge Hub UK | Free Guides | BeingEcom" },
      {
        name: "description",
        content: "Free UK ecommerce knowledge hub: 11 pillar guides on Shopify SEO, WooCommerce, paid media, CRO, email retention, analytics and AI automation.",
      },
      { property: "og:title", content: "Ecommerce Knowledge Hub UK | BeingEcom" },
      { property: "og:description", content: "UK pillar guides for Shopify and WooCommerce brands SEO, paid, CRO, email, AI automation." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/hub` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/hub` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Knowledge Hub", path: "/hub" },
          ])
        ),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${SITE_URL}/hub#collection`,
          name: "BeingEcom Ecommerce Knowledge Hub",
          url: `${SITE_URL}/hub`,
          about: "Ecommerce growth for Shopify and WooCommerce brands",
          hasPart: PILLARS.map((p) => ({
            "@type": "WebPage",
            name: p.title,
            url: `${SITE_URL}/hub/${p.slug}`,
            description: p.summary,
          })),
        }),
      },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(HUB_FAQS, "/hub")) },
    ],
  }),
  component: HubIndex,
});

function HubIndex() {
  return (
    <PageLayout>
      <section className="relative bg-background text-foreground">
        <div className="mx-auto max-w-5xl px-5 lg:px-8 pt-24 pb-14 lg:pt-32 lg:pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <BookOpen className="w-3.5 h-3.5 text-primary" /> Knowledge Hub
          </div>
          <h1 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            The Ecommerce Growth Hub
          </h1>
          <p className="mt-6 text-lg md:text-xl text-foreground/85 max-w-3xl leading-relaxed">
            Eleven pillar hubs covering the disciplines that actually move ecommerce revenue for Shopify and WooCommerce
            brands SEO, paid media, CRO, email & SMS, analytics, strategy, operations, retention, AI automation, and
            platform-specific scaling. Written by senior operators who ship this work every week.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-5 lg:px-8 pb-24">
        <div className="grid md:grid-cols-2 gap-6">
          {PILLARS.map((p) => (
            <Link
              key={p.slug}
              to="/hub/$pillar"
              params={{ pillar: p.slug }}
              className="group block rounded-2xl border bg-card p-7 hover:border-primary transition-colors"
            >
              <div className="font-display text-2xl font-bold tracking-tight text-foreground group-hover:text-primary">
                {p.title}
              </div>
              <p className="mt-3 text-foreground/80 leading-relaxed">{p.summary}</p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Open hub <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <EditorialBlock editorial={HUB_EDITORIAL} />
      <FaqSection
        faqs={HUB_FAQS}
        title="Knowledge hub"
        highlight="FAQs"
        intro="How the eleven pillar hubs work and the order to read them in."
      />
      <CTA
        heading="Rather have this run for you?"
        sub="Book a free audit and we'll turn the relevant hub into a costed 90-day plan for your store."
      />
    </PageLayout>
  );
}
