import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Circle, ArrowRight, ListChecks } from "lucide-react";
import PageLayout from "@/components/site/PageLayout";
import { Section } from "@/components/site/Section";
import { breadcrumbJsonLd, faqJsonLd, SITE_URL } from "@/lib/seo";
import { SHOPIFY_SEO_CHECKLIST, CHECKLIST_CATEGORIES, type ChecklistItem } from "@/lib/shopify-checklist";

const CANONICAL = `${SITE_URL}/tools/shopify-seo-checklist`;
const STORAGE_KEY = "shopify-seo-checklist-v1";

const FAQS = [
  { q: "How long does a Shopify SEO audit against this checklist take?", a: "A senior SEO working through all 30 items on a live Shopify store takes 4-6 hours end to end - roughly 90 minutes on technical (Screaming Frog crawl + Search Console), 90 minutes on on-page and content, 60 minutes on conversion, and 60 minutes on off-page signals." },
  { q: "Which of the 30 items usually cause the biggest ranking loss on Shopify?", a: "In our audits of 100+ UK Shopify stores, three issues appear on roughly 80% of them: uncontrolled duplication from /collections/*/products/* URLs, faceted filter URLs bloating the index, and product descriptions copied from the manufacturer. Fixing those three typically recovers more organic traffic than the other 27 combined." },
  { q: "Do I need to fix everything on this list to rank?", a: "No. The list is prioritised by impact within each category, and the top 8-10 items (canonicals, faceted URLs, sitemap, Core Web Vitals, product schema, collection copy, unique product descriptions, internal linking) drive the majority of the gain. Off-page items compound over months, not weeks." },
  { q: "Does this checklist apply to Shopify Plus?", a: "Yes - every item applies to Shopify Plus with two additions we handle separately in a Plus-specific audit: multi-store hreflang between shopify.com storefronts and Markets, and checkout.liquid or checkout extensibility performance." },
  { q: "How is this different from the free Shopify SEO checklists on other agency sites?", a: "Every item here maps to a real finding from BeingEcom's own UK Shopify audits, with the reasoning behind it. Most public checklists mix genuine issues with padded items (like 'add a favicon') to hit a round number. This list is 30 items because 30 items is what actually moves rankings and revenue." },
];

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to audit a Shopify store's SEO in 30 checks",
  description: "A 30-point Shopify SEO checklist covering technical, on-page, content, conversion and off-page issues that recur across UK Shopify stores.",
  totalTime: "PT5H",
  step: SHOPIFY_SEO_CHECKLIST.map((item, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: item.title,
    text: item.detail,
  })),
};

export const Route = createFileRoute("/tools/shopify-seo-checklist")({
  head: () => ({
    meta: [
      { title: "Free Shopify SEO Checklist (30 Points, 2026) | BeingEcom" },
      { name: "description", content: "Free interactive 30-point Shopify SEO checklist covering technical, on-page, content, conversion and off-page. Score your store, save progress, no signup." },
      { property: "og:title", content: "Free Shopify SEO Checklist (30 Points, 2026)" },
      { property: "og:description", content: "Interactive 30-point Shopify SEO checklist. Score your store, save progress, no signup." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CANONICAL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Tools", path: "/tools" },
        { name: "Shopify SEO Checklist", path: "/tools/shopify-seo-checklist" },
      ])) },
      { type: "application/ld+json", children: JSON.stringify(howToJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQS, "/tools/shopify-seo-checklist")) },
    ],
  }),
  component: ShopifyChecklistPage,
});

function ShopifyChecklistPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [activeCat, setActiveCat] = useState<(typeof CHECKLIST_CATEGORIES)[number] | "All">("All");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setChecked(JSON.parse(raw));
    } catch { /* no-op */ }
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(checked)); } catch { /* no-op */ }
  }, [checked]);

  const total = SHOPIFY_SEO_CHECKLIST.length;
  const done = useMemo(() => SHOPIFY_SEO_CHECKLIST.filter((i) => checked[i.id]).length, [checked]);
  const pct = Math.round((done / total) * 100);

  const visible = useMemo(() => activeCat === "All"
    ? SHOPIFY_SEO_CHECKLIST
    : SHOPIFY_SEO_CHECKLIST.filter((i) => i.category === activeCat), [activeCat]);

  const toggle = (id: string) => setChecked((s) => ({ ...s, [id]: !s[id] }));
  const reset = () => setChecked({});

  return (
    <PageLayout>
      <section className="bg-background text-foreground">
        <div className="mx-auto max-w-5xl px-5 lg:px-8 pt-24 pb-10 lg:pt-32 lg:pb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <ListChecks className="w-3.5 h-3.5 text-primary" /> Free Tool
          </div>
          <h1 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            The 30-point Shopify SEO checklist
          </h1>
          <p className="mt-6 text-lg md:text-xl text-foreground/85 max-w-3xl leading-relaxed">
            Every item on this checklist is a recurring finding from BeingEcom's own UK Shopify audits.
            Tick as you go - your progress saves locally in your browser. No signup, no email gate.
          </p>
        </div>
      </section>

      <Section className="pt-2 pb-8">
        <div className="rounded-3xl border bg-card p-6 lg:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-primary">Your score</div>
              <div className="mt-1 font-display text-3xl md:text-4xl font-bold tracking-tight">
                {done} / {total} <span className="text-foreground/60 text-xl font-medium">complete ({pct}%)</span>
              </div>
            </div>
            <button
              type="button"
              onClick={reset}
              className="text-sm font-medium text-foreground/70 hover:text-foreground underline underline-offset-4"
            >
              Reset progress
            </button>
          </div>
          <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${pct}%` }}
              role="progressbar"
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {(["All", ...CHECKLIST_CATEGORIES] as const).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActiveCat(c)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  activeCat === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background hover:bg-accent"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </Section>

      <Section className="py-8">
        <ol className="space-y-3">
          {visible.map((item: ChecklistItem, i) => {
            const isDone = !!checked[item.id];
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  className="group w-full text-left rounded-2xl border bg-card p-5 lg:p-6 hover:border-primary/60 transition-colors"
                  aria-pressed={isDone}
                >
                  <div className="flex gap-4">
                    <div className="mt-0.5 shrink-0">
                      {isDone ? (
                        <CheckCircle2 className="w-6 h-6 text-primary" />
                      ) : (
                        <Circle className="w-6 h-6 text-muted-foreground group-hover:text-primary/70" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                          {activeCat === "All" ? `#${i + 1}` : item.category} · {item.category}
                        </span>
                      </div>
                      <div className={`mt-1 font-display text-lg md:text-xl font-bold tracking-tight ${isDone ? "line-through text-foreground/60" : ""}`}>
                        {item.title}
                      </div>
                      <p className="mt-2 text-foreground/85 leading-relaxed">{item.detail}</p>
                      <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
                        <span className="font-semibold text-foreground">Why it matters:</span> {item.why}
                      </p>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ol>
      </Section>

      <Section className="pb-16">
        <div className="rounded-3xl border bg-card p-8 lg:p-10">
          <h2 className="font-display text-2xl lg:text-3xl font-bold tracking-tight">
            Want us to run this audit for you?
          </h2>
          <p className="mt-4 text-foreground/85 leading-relaxed max-w-3xl">
            We'll work through all 30 checks against your live Shopify store, deliver a scored report with
            revenue-weighted priorities, and give you a 90-day action plan. Free of charge if we're a fit.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/audit"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Request a full audit <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/services/seo"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold hover:bg-accent transition-colors"
            >
              See our Shopify SEO service
            </Link>
          </div>
        </div>
      </Section>

      <Section className="pb-24">
        <h2 className="font-display text-2xl lg:text-3xl font-bold tracking-tight">FAQs</h2>
        <div className="mt-6 space-y-4">
          {FAQS.map((f) => (
            <details key={f.q} className="rounded-2xl border bg-card p-6">
              <summary className="font-semibold cursor-pointer">{f.q}</summary>
              <p className="mt-3 text-foreground/85 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>
    </PageLayout>
  );
}
