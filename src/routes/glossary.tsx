import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import PageLayout from "../components/site/PageLayout";
import {
  breadcrumbJsonLd,
  definedTermSetJsonLd,
  faqJsonLd,
  SITE_URL,
} from "../lib/seo";
import {
  GLOSSARY_TERMS,
  GLOSSARY_CATEGORIES,
  glossarySlug,
  type GlossaryTerm,
} from "../lib/glossary-terms";
import { BookOpen, ArrowRight } from "lucide-react";

const faqs = GLOSSARY_TERMS.slice(0, 20).map((t) => ({
  q: `What is ${t.term} in ecommerce?`,
  a: `${t.definition} ${t.why}`,
}));

const GLOSSARY_URL = `${SITE_URL}/glossary`;

export const Route = createFileRoute("/glossary")({
  head: () => ({
    meta: [
      {
        title:
          "Ecommerce Glossary 2026 — Shopify, SEO, CRO, Paid, Email & AI Terms | BeingEcom",
      },
      {
        name: "description",
        content:
          "The plain-English ecommerce glossary for UK Shopify & WooCommerce founders — 50+ SEO, CRO, paid media, email, analytics, platform and AI terms with real examples.",
      },
      {
        property: "og:title",
        content: "Ecommerce Glossary 2026 | BeingEcom",
      },
      {
        property: "og:description",
        content:
          "50+ plain-English definitions for SEO, CRO, paid media, email, analytics, platform and AI ecommerce terms.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: GLOSSARY_URL },
    ],
    links: [{ rel: "canonical", href: GLOSSARY_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(faqJsonLd(faqs, "/glossary")),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Ecommerce Glossary", path: "/glossary" },
          ])
        ),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          definedTermSetJsonLd({
            url: GLOSSARY_URL,
            name: "BeingEcom Ecommerce Glossary",
            description:
              "Plain-English definitions for SEO, CRO, paid media, email, analytics, platform and AI terms every ecommerce founder needs to know.",
            terms: GLOSSARY_TERMS.map((t) => ({
              term: t.term,
              definition: `${t.definition} ${t.why}`,
            })),
          })
        ),
      },
    ],
  }),
  component: GlossaryPage,
});

function GlossaryPage() {
  const [active, setActive] = useState<string>("All");
  const filtered =
    active === "All"
      ? GLOSSARY_TERMS
      : GLOSSARY_TERMS.filter((t) => t.category === active);

  return (
    <PageLayout>
      <section className="relative overflow-hidden bg-background text-foreground">
        <div className="relative mx-auto max-w-5xl px-5 lg:px-8 pt-28 pb-16 lg:pt-36 lg:pb-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <BookOpen className="w-3.5 h-3.5 text-primary" />
            Ecommerce Glossary · Updated for 2026
          </div>
          <h1 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            The Ecommerce Glossary
          </h1>
          <p className="mt-5 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {GLOSSARY_TERMS.length}+ definitions across SEO, CRO, paid media, email, analytics,
            platform and AI — written for Shopify & WooCommerce founders who need to make revenue
            decisions, not pass an exam.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/audit"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Free Store Audit <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/hub"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:border-primary transition-colors"
            >
              Knowledge Hub
            </Link>
          </div>
        </div>
      </section>

      {/* Category filter */}
      <section className="border-y bg-muted/30 sticky top-0 z-30 backdrop-blur">
        <div className="mx-auto max-w-5xl px-5 lg:px-8 py-4 flex flex-wrap gap-2">
          {(["All", ...GLOSSARY_CATEGORIES] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                active === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground/80 hover:border-primary hover:text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Quick index */}
      <section className="border-b bg-muted/20">
        <div className="mx-auto max-w-5xl px-5 lg:px-8 py-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Jump to a term
          </div>
          <div className="flex flex-wrap gap-2">
            {filtered.map((t) => (
              <a
                key={t.term}
                href={`#${glossarySlug(t.term)}`}
                className="rounded-full border bg-background px-3 py-1.5 text-xs font-medium text-foreground/80 hover:border-primary hover:text-primary transition-colors"
              >
                {t.term}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Terms */}
      <section className="mx-auto max-w-3xl px-5 lg:px-8 py-16 lg:py-24">
        <ol className="space-y-10">
          {filtered.map((t, i) => (
            <TermCard key={t.term} t={t} index={i} />
          ))}
        </ol>

        {/* Closing CTA */}
        <div className="mt-20 rounded-3xl border border-border bg-card text-foreground p-10 lg:p-14 text-center">
          <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-tight">
            Turn ecommerce theory into revenue
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Get a free 12-point growth audit of your Shopify or WooCommerce store — built by senior
            operators, not junior analysts.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/audit"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Get Free Audit <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground hover:border-primary transition-colors"
            >
              Book a Strategy Call
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

function TermCard({ t, index }: { t: GlossaryTerm; index: number }) {
  return (
    <li
      id={glossarySlug(t.term)}
      className="scroll-mt-32 rounded-2xl border bg-card p-7 lg:p-9 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary text-sm font-bold tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h2 className="font-display text-2xl lg:text-3xl font-bold tracking-tight">
          {t.term}
        </h2>
        <span className="ml-auto rounded-full border bg-background px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {t.category}
        </span>
      </div>

      <div className="space-y-5 text-[15px] lg:text-base leading-relaxed">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-primary mb-1.5">
            Simple Definition
          </div>
          <p className="text-foreground/85">{t.definition}</p>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-primary mb-1.5">
            Why It Matters
          </div>
          <p className="text-foreground/85">{t.why}</p>
        </div>
        <div className="rounded-xl bg-muted/50 border border-border/60 p-4">
          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
            Ecommerce Example
          </div>
          <p className="text-foreground/80 italic">{t.example}</p>
        </div>
      </div>
    </li>
  );
}
