import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calculator, Sparkles } from "lucide-react";
import PageLayout from "../components/site/PageLayout";
import AISummary from "../components/site/AISummary";
import { CALCULATORS } from "../lib/calculators";
import { breadcrumbJsonLd, SITE_URL } from "../lib/seo";

const TOOLS_URL = `${SITE_URL}/tools`;

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Free Ecommerce Calculators & Tools",
  url: TOOLS_URL,
  numberOfItems: CALCULATORS.length,
  itemListElement: CALCULATORS.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    url: `${SITE_URL}/tools/${c.slug}`,
  })),
};

export const Route = createFileRoute("/tools/")({
  head: () => ({
    meta: [
      { title: "Free Ecommerce Calculators & Tools | BeingEcom" },
      {
        name: "description",
        content:
          "Free ecommerce calculators for UK Shopify and WooCommerce brands — ROAS, CAC, LTV, profit margin and break-even. Instant results, formulas explained, no signup.",
      },
      { property: "og:title", content: "Free Ecommerce Calculators & Tools | BeingEcom" },
      {
        property: "og:description",
        content:
          "ROAS, CAC, LTV, profit margin and break-even calculators for Shopify and WooCommerce brands. Instant, free, no signup.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: TOOLS_URL },
    ],
    links: [{ rel: "canonical", href: TOOLS_URL }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(itemListJsonLd) },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Free Ecommerce Tools", path: "/tools" },
          ]),
        ),
      },
    ],
  }),
  component: ToolsIndex,
});

function ToolsIndex() {
  return (
    <PageLayout>
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-primary/15 blur-[140px] float" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
            <Calculator className="size-3.5" /> Free Ecommerce Tools
          </div>
          <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] text-ink max-w-4xl">
            Free ecommerce calculators for Shopify &amp; WooCommerce brands
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-3xl leading-relaxed">
            The same numbers our team runs before every strategy call — ROAS, CAC, LTV, profit margin and break-even. Free, instant, no signup. Formulas, examples and improvement plans included.
          </p>
        </div>
      </section>

      <AISummary eyebrow="What's here">
        BeingEcom's free ecommerce calculator suite for UK Shopify and WooCommerce brands. Five tools cover the numbers every founder should know cold: <strong>ROAS, CAC, LTV, profit margin and break-even</strong>. Each tool includes the formula, a worked example, and how to improve the result.
      </AISummary>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CALCULATORS.map((c) => (
              <Link
                key={c.slug}
                to="/tools/$slug"
                params={{ slug: c.slug }}
                className="group relative rounded-2xl border border-border bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/40 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Calculator className="size-5" />
                  </div>
                  <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </div>
                <h2 className="mt-4 text-xl font-bold text-ink leading-tight">{c.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {c.quickAnswer}
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-primary">
                  <Sparkles className="size-3" /> {c.formulaCode.split("\n")[0]}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
