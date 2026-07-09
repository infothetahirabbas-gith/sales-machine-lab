import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles } from "lucide-react";
import PageLayout from "../components/site/PageLayout";
import { Section } from "../components/site/Section";
import FaqSection from "../components/site/FaqSection";
import { faqJsonLd, breadcrumbJsonLd } from "../lib/seo";
import { PRICING_TIERS, PRICING_MIN_AD_SPEND } from "../lib/pricing";

const pricingFaqs = [
  {
    q: "Do you require long contracts?",
    a: "No. We do a 90-day initial engagement to properly execute a system, then month-to-month. No 12-month lock-ins.",
  },
  {
    q: "What ad budget do I need?",
    a: `Growth and Scale engagements work best with stores spending ${PRICING_MIN_AD_SPEND} on ads. Earlier-stage brands should start on the Starter tier to fix foundations first.`,
  },
];

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Ecommerce Agency Pricing UK - Shopify Retainers & Packages | BeingEcom" },
      { name: "description", content: "Transparent ecommerce agency pricing in the UK. Retainers, sprints and performance packages for Shopify and WooCommerce brands at every stage." },
      { property: "og:title", content: "Ecommerce Agency Pricing UK - Shopify Retainers & Packages | BeingEcom" },
      { property: "og:description", content: "Transparent ecommerce agency pricing in the UK. Retainers, sprints and performance packages for Shopify and WooCommerce brands at every stage." },
      { property: "og:url", content: "https://beingecom.com/pricing" },
    ],
    links: [{ rel: "canonical", href: "https://beingecom.com/pricing" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(pricingFaqs, "/pricing")) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }])) },
    ],
  }),
  component: PricingPage,
});

const tiers = PRICING_TIERS;

function PricingPage() {
  return (
    <PageLayout>
      <section className="relative pt-20 pb-12 lg:pt-28 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[480px] h-[480px] bg-primary/15 blur-[140px] rounded-full float-slow" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            Pricing
          </div>
          <h1 className="mt-4 text-4xl md:text-6xl font-bold max-w-3xl mx-auto leading-[1.04] text-ink">
            How we <span className="text-gradient">work</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            Three ways to engage - all built around one goal: profitable growth.
          </p>
        </div>
      </section>

      <Section
        eyebrow="Engagement models"
        title="Pricing plans built for ecommerce growth"
        intro="Pick the engagement that matches your stage - sprint, retainer, or performance partnership."
      >
        <div className="grid md:grid-cols-3 gap-5 items-stretch">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative card-surface p-7 flex flex-col rounded-3xl ${
                t.popular ? "ring-2 ring-primary shadow-xl scale-[1.02]" : ""
              }`}
            >
              {t.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground shadow-lg">
                  <Sparkles className="w-3 h-3" /> Most Popular
                </div>
              )}
              <h3 className="font-bold text-xl text-ink">{t.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                <span className="font-semibold text-ink/80">Best for:</span> {t.best}
              </p>

              <div className="mt-5">
                <div className="text-[11px] uppercase tracking-widest text-primary font-bold">Starting from</div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-gradient">{t.price}</span>
                  <span className="text-sm text-muted-foreground">{t.period === "month" ? "/mo" : " fixed"}</span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{t.duration}</div>
              </div>

              <ul className="mt-6 space-y-2.5 flex-1">
                {t.includes.map((i) => (
                  <li key={i} className="flex gap-2 text-sm text-ink/85">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className={`mt-7 btn justify-center ${t.popular ? "btn-primary btn-shimmer" : "btn-dark btn-shimmer"}`}
              >
                Book Strategy Call →
              </Link>
            </div>
          ))}
        </div>
      </Section>

      <FaqSection
        faqs={pricingFaqs}
        title="Pricing -"
        highlight="quick answers"
        intro="What founders ask before picking a tier."
      />
    </PageLayout>
  );
}
