import { createFileRoute, Link } from "@tanstack/react-router";
import PageLayout from "@/components/site/PageLayout";
import { breadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import { ArrowRight, FileBarChart2 } from "lucide-react";

const REPORTS = [
  {
    slug: "uk-shopify-speed-2026",
    status: "In production",
    title: "State of UK Shopify Store Speed 2026",
    summary:
      "Core Web Vitals, LCP, INP and mobile checkout speed across 500 UK Shopify stores segmented by revenue tier and category. Publishing Q1 2026.",
  },
  {
    slug: "uk-ecommerce-benchmark-2026",
    status: "Data collection",
    title: "UK Ecommerce Growth Benchmark 2026",
    summary:
      "Conversion rate, AOV, MER, RPR and email revenue share benchmarks across UK Shopify and WooCommerce brands £30k-£5M/month.",
  },
  {
    slug: "meta-vs-google-uk-2026",
    status: "Planning",
    title: "Meta vs Google Ads Efficiency Report (UK, 2026)",
    summary:
      "Blended MER, CAC and contribution margin by category across 200 UK DTC brands running both Meta and Google.",
  },
  {
    slug: "shopify-cro-benchmark-2026",
    status: "Data collection",
    title: "Shopify CRO Benchmark Report 2026",
    summary:
      "PDP conversion rate, cart-to-checkout and checkout completion benchmarks across 300 UK Shopify stores by category, price point and device.",
  },
  {
    slug: "ecommerce-ai-adoption-2026",
    status: "Planning",
    title: "Ecommerce AI Adoption Report 2026",
    summary:
      "How UK DTC brands are actually using AI reporting, creative, support, SEO with time-saved, revenue-lift and governance patterns from 150 operators.",
  },
  {
    slug: "klaviyo-email-benchmark-2026",
    status: "Planning",
    title: "Klaviyo Email & SMS Benchmark 2026",
    summary:
      "Flow revenue share, deliverability, unsubscribe rate and revenue per recipient across 400 UK Shopify + Klaviyo senders.",
  },
  {
    slug: "uk-ecommerce-seo-state-2026",
    status: "Data collection",
    title: "State of UK Ecommerce SEO 2026",
    summary:
      "AI Overview coverage, featured snippet share, indexation health and organic revenue mix across the top 1,000 UK ecommerce domains.",
  },
  {
    slug: "shopify-vs-woo-tco-2026",
    status: "Planning",
    title: "Shopify vs WooCommerce TCO Study (UK, 2026)",
    summary:
      "True total cost of ownership platform, apps, hosting, dev, agency across 250 UK brands running each platform at £30k-£3M/month.",
  },
];

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Ecommerce Research Reports Original UK Data | BeingEcom" },
      {
        name: "description",
        content:
          "Original ecommerce research from BeingEcom UK Shopify speed benchmarks, growth benchmarks and paid-media efficiency reports. Data-driven, operator-authored, updated yearly.",
      },
      { property: "og:title", content: "Ecommerce Research Reports | BeingEcom" },
      { property: "og:description", content: "Original UK ecommerce research and benchmark data." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/research` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/research` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Research", path: "/research" },
          ])
        ),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${SITE_URL}/research#collection`,
          name: "BeingEcom Ecommerce Research",
          url: `${SITE_URL}/research`,
          about: "Original ecommerce research and benchmark data",
          publisher: { "@type": "Organization", name: "BeingEcom", url: SITE_URL },
        }),
      },
    ],
  }),
  component: ResearchIndex,
});

function ResearchIndex() {
  return (
    <PageLayout>
      <section className="bg-background text-foreground">
        <div className="mx-auto max-w-5xl px-5 lg:px-8 pt-24 pb-14 lg:pt-32 lg:pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <FileBarChart2 className="w-3.5 h-3.5 text-primary" /> Research
          </div>
          <h1 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            Original UK ecommerce research
          </h1>
          <p className="mt-6 text-lg md:text-xl text-foreground/85 max-w-3xl leading-relaxed">
            The industry benchmarks we needed and couldn't find, so we're building them. Every report is
            authored by senior operators, based on real UK Shopify and WooCommerce data, and published
            with methodology and dataset attribution.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Contribute your store's data <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 lg:px-8 pb-24">
        <div className="space-y-5">
          {REPORTS.map((r) => (
            <div key={r.slug} className="rounded-2xl border bg-card p-7">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center rounded-full bg-primary/10 text-primary text-xs font-semibold px-3 py-1">
                  {r.status}
                </span>
              </div>
              <div className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                {r.title}
              </div>
              <p className="mt-3 text-foreground/80 leading-relaxed">{r.summary}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-3xl border bg-card p-8 lg:p-10">
          <h2 className="font-display text-2xl lg:text-3xl font-bold tracking-tight">Participate in the 2026 studies</h2>
          <p className="mt-4 text-foreground/85 leading-relaxed max-w-3xl">
            We're actively collecting anonymised data from UK Shopify and WooCommerce brands for the studies
            marked "Data collection". Participating stores receive the full report 30 days before public
            release, plus a private benchmark comparing their store to the segment median.
          </p>
          <ul className="mt-5 grid gap-2 text-foreground/85 max-w-3xl text-sm leading-relaxed list-disc pl-5">
            <li>Eligibility: UK-registered Shopify or WooCommerce store, £30k+/month revenue, trading 12+ months.</li>
            <li>Data required: read-only GA4 access or an export of the 8 metrics defined in the study brief.</li>
            <li>Governance: data is aggregated at the source, never republished at store level, and destroyed 90 days after publication.</li>
          </ul>
          <div className="mt-6">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary/20 transition-colors"
            >
              Apply to participate <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border bg-card p-8 lg:p-10">
          <h2 className="font-display text-2xl lg:text-3xl font-bold tracking-tight">Methodology & data ethics</h2>
          <p className="mt-4 text-foreground/85 leading-relaxed max-w-3xl">
            Every report publishes its sample size, collection window, category segmentation and definitions.
            All contributing store data is anonymised at the source, aggregated, and never republished at
            store level. Reports are released under a permissive citation licence so journalists, agencies
            and platforms can reference the benchmarks with attribution to BeingEcom.
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
