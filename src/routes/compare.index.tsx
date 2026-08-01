import { createFileRoute, Link } from "@tanstack/react-router";
import PageLayout from "@/components/site/PageLayout";
import { breadcrumbJsonLd, faqJsonLd, SITE_URL } from "@/lib/seo";
import EditorialBlock from "@/components/site/EditorialBlock";
import FaqSection from "@/components/site/FaqSection";
import { CTA } from "@/components/site/Section";
import { COMPARE_EDITORIAL, COMPARE_FAQS } from "@/lib/index-editorial";
import { COMPARE_INDEX } from "@/lib/compare-content";
import { ArrowRight, GitCompare } from "lucide-react";

export const Route = createFileRoute("/compare/")({
  head: () => ({
    meta: [
      { title: "Ecommerce Comparisons: Platforms, Ads & Tools | BeingEcom" },
      {
        name: "description",
        content:
          "Honest UK ecommerce comparisons: Shopify vs WooCommerce, Meta vs Google Ads, Klaviyo vs Mailchimp and agency vs in-house - each with a clear verdict.",
      },
      { property: "og:title", content: "Ecommerce Comparisons | BeingEcom" },
      { property: "og:description", content: "Operator-written comparisons for UK Shopify and WooCommerce brands." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/compare` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/compare` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Comparisons", path: "/compare" },
          ])
        ),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${SITE_URL}/compare#collection`,
          name: "BeingEcom Ecommerce Comparisons",
          url: `${SITE_URL}/compare`,
          about: "Comparisons of ecommerce platforms, channels and tools",
          hasPart: COMPARE_INDEX.map((c) => ({
            "@type": "WebPage",
            name: c.h1,
            url: `${SITE_URL}/compare/${c.slug}`,
            description: c.verdict,
          })),
        }),
      },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(COMPARE_FAQS, "/compare")) },
    ],
  }),
  component: CompareIndex,
});

function CompareIndex() {
  return (
    <PageLayout>
      <section className="bg-background text-foreground">
        <div className="mx-auto max-w-5xl px-5 lg:px-8 pt-24 pb-14 lg:pt-32 lg:pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <GitCompare className="w-3.5 h-3.5 text-primary" /> Ecommerce comparisons
          </div>
          <h1 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            Honest ecommerce comparisons
          </h1>
          <p className="mt-6 text-lg md:text-xl text-foreground/85 max-w-3xl leading-relaxed">
            Written by operators who actually ship on both sides platforms, channels, tools, hiring models.
            Each comparison ends with a clear verdict and the exact conditions where each option wins.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 lg:px-8 pb-24">
        <div className="grid md:grid-cols-2 gap-6">
          {COMPARE_INDEX.map((c) => (
            <Link
              key={c.slug}
              to="/compare/$slug"
              params={{ slug: c.slug }}
              className="group block rounded-2xl border bg-card p-7 hover:border-primary transition-colors"
            >
              <div className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
                {c.a} <span className="text-muted-foreground">vs</span> {c.b}
              </div>
              <div className="font-display text-2xl font-bold tracking-tight text-foreground group-hover:text-primary">
                {c.h1}
              </div>
              <p className="mt-3 text-foreground/80 leading-relaxed line-clamp-3">{c.verdict}</p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Read comparison <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <EditorialBlock editorial={COMPARE_EDITORIAL} />
      <FaqSection
        faqs={COMPARE_FAQS}
        title="Comparison"
        highlight="FAQs"
        intro="The questions UK founders ask us most when choosing a platform, channel, tool or hiring model."
      />
      <CTA
        heading="Still torn between two options?"
        sub="Send us your numbers and we'll tell you which way we'd go - and why - on a free 30-minute call."
      />
    </PageLayout>
  );
}
