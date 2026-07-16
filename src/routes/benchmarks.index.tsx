import { createFileRoute, Link } from "@tanstack/react-router";
import { BarChart3, Megaphone, Mail, ArrowRight } from "lucide-react";
import PageLayout from "@/components/site/PageLayout";
import { Section, Card, CTA } from "@/components/site/Section";
import AISummary from "@/components/site/AISummary";
import { breadcrumbJsonLd } from "@/lib/seo";

type Item = {
  slug: string;
  title: string;
  desc: string;
  Icon: typeof BarChart3;
};

const ITEMS: Item[] = [
  {
    slug: "ecommerce-conversion-rates",
    title: "Ecommerce Conversion Rate Benchmarks",
    desc: "Median and top-quartile conversion rates for Shopify and WooCommerce stores across fashion, beauty, health, home, and electronics.",
    Icon: BarChart3,
  },
  {
    slug: "paid-ads",
    title: "Paid Ads Benchmarks (Meta & Google)",
    desc: "Average CPC, CTR, CPA, and ROAS across Meta Ads and Google Ads for ecommerce, by industry.",
    Icon: Megaphone,
  },
  {
    slug: "email-marketing",
    title: "Email Marketing Benchmarks",
    desc: "Open rates, click rates, and revenue-per-recipient for ecommerce campaigns and flows on Klaviyo, Mailchimp, and Omnisend.",
    Icon: Mail,
  },
];

export const Route = createFileRoute("/benchmarks/")({
  head: () => ({
    meta: [
      { title: "Ecommerce Benchmarks 2026 | Conversion, Paid Ads & Email | BeingEcom" },
      { name: "description", content: "Free ecommerce benchmarks for Shopify and WooCommerce brands: conversion rates, paid ads (Meta & Google), and email marketing performance by industry." },
      { property: "og:title", content: "Ecommerce Benchmarks 2026 | BeingEcom" },
      { property: "og:description", content: "Free ecommerce benchmarks for Shopify and WooCommerce brands: conversion, ads, email — by industry." },
      { property: "og:url", content: "https://beingecom.com/benchmarks" },
    ],
    links: [{ rel: "canonical", href: "https://beingecom.com/benchmarks" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Benchmarks", path: "/benchmarks" },
        ])),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Ecommerce Benchmarks",
          itemListElement: ITEMS.map((it, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: it.title,
            url: `https://beingecom.com/benchmarks/${it.slug}`,
          })),
        }),
      },
    ],
  }),
  component: BenchmarksIndex,
});

function BenchmarksIndex() {
  return (
    <PageLayout>
      <section className="relative pt-20 pb-10 lg:pt-28 lg:pb-14 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="mx-auto max-w-5xl px-5 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            <BarChart3 className="w-3.5 h-3.5" /> Free benchmarks
          </div>
          <h1 className="mt-5 text-4xl md:text-6xl font-bold leading-[1.06] text-ink">
            Ecommerce Benchmarks 2026
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-3xl mx-auto">
            Free industry benchmarks for Shopify and WooCommerce brands. Compare your store to the median and top quartile across conversion, paid ads, and email marketing.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <AISummary>
          BeingEcom publishes free ecommerce benchmarks covering conversion rates, paid ads (Meta and Google), and email marketing performance. Data is aggregated from Shopify and WooCommerce brands across fashion, beauty, health, home, and electronics.
        </AISummary>
      </div>

      <Section eyebrow="Benchmark library" title="Choose a benchmark">
        <div className="grid md:grid-cols-3 gap-5">
          {ITEMS.map(({ slug, title, desc, Icon }) => (
            <Link
              key={slug}
              to="/benchmarks/$slug"
              params={{ slug }}
              className="card-surface card-hover group p-6 flex flex-col"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground flex-1">{desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-primary font-medium">
                View benchmarks <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Methodology" title="How we compile benchmarks" alt>
        <div className="max-w-3xl mx-auto">
          <Card>
            <p className="text-ink">
              Benchmarks are aggregated from anonymised Shopify and WooCommerce stores we operate or audit, industry reports (Shopify, Klaviyo, WordStream, Statista), and public data. Figures represent median and top-quartile performance for UK and US ecommerce brands. We refresh quarterly.
            </p>
          </Card>
        </div>
      </Section>

      <CTA
        heading="Benchmark your own store"
        sub="Get a free audit that compares your Shopify or WooCommerce store to industry medians across SEO, ads, CRO, and email."
      />
    </PageLayout>
  );
}
