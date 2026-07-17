import { createFileRoute, notFound } from "@tanstack/react-router";
import { BenchmarkPage, benchmarkDatasetJsonLd, type BenchmarkConfig } from "@/components/site/BenchmarkPage";
import { faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";

const CONFIGS: Record<string, BenchmarkConfig> = {
  "ecommerce-conversion-rates": {
    slug: "ecommerce-conversion-rates",
    eyebrow: "Conversion rate benchmarks",
    title: "Ecommerce Conversion Rate Benchmarks 2026",
    heroSub: "Median and top-quartile conversion rates for Shopify and WooCommerce stores across the biggest DTC categories.",
    aiSummary:
      "The median ecommerce conversion rate in 2026 is 1.8%. Top-quartile Shopify and WooCommerce stores convert at 3.2% or higher. Beauty and health lead on conversion; furniture and electronics sit lower due to higher price points and longer consideration cycles.",
    quickAnswer:
      "The average ecommerce conversion rate across Shopify and WooCommerce stores is 1.8%. Anything above 3.2% puts a store in the top quartile. Category matters: beauty and health typically convert 2x higher than furniture or electronics.",
    keyTakeaways: [
      "Overall ecommerce median: 1.8% (top quartile 3.2%+).",
      "Beauty and health lead with 3.0-3.5% medians.",
      "Furniture and electronics sit at 0.9-1.4% due to price and consideration.",
      "Mobile converts 40-50% lower than desktop across all categories.",
      "Returning-visitor conversion is 3-5x higher than first-touch.",
    ],
    tables: [
      {
        title: "Conversion rate by industry",
        columns: ["Industry", "Median CVR", "Top quartile", "Mobile CVR"],
        rows: [
          { label: "Fashion & apparel", values: ["1.9%", "3.4%", "1.1%"] },
          { label: "Beauty & cosmetics", values: ["3.0%", "5.2%", "2.0%"] },
          { label: "Health & supplements", values: ["3.5%", "5.8%", "2.4%"] },
          { label: "Home & furniture", values: ["0.9%", "1.8%", "0.5%"] },
          { label: "Consumer electronics", values: ["1.4%", "2.6%", "0.9%"] },
          { label: "Food & beverage", values: ["2.2%", "3.9%", "1.5%"] },
        ],
        note: "Source: BeingEcom aggregated Shopify/WooCommerce audit data, 2025-2026.",
      },
    ],
    howToImprove: [
      { title: "Product page CRO", body: "Test hero image order, benefit-led bullets, sticky ATC, trust badges, and reviews above the fold. Expect 8-20% lift." },
      { title: "Checkout friction removal", body: "One-page checkout, Shop Pay / Apple Pay, address autocomplete. Cuts abandonment 10-25%." },
      { title: "Mobile-first UX", body: "Compress hero LCP under 2.5s, use large tap targets, single-column layouts. Mobile CVR up 20-40%." },
      { title: "Trust and social proof", body: "Verified reviews, UGC, guarantee badges, delivery timelines. Adds 5-12% CVR uplift." },
    ],
    faqs: [
      { q: "What is a good conversion rate for a Shopify store?", a: "The Shopify median is around 1.8%. Top-quartile Shopify stores convert at 3.2% or higher. Category and traffic source both matter - branded search converts much higher than cold paid social." },
      { q: "Why is my mobile conversion rate lower than desktop?", a: "Mobile CVR is typically 40-50% lower than desktop across ecommerce. Common causes are slow LCP, tiny tap targets, hidden add-to-cart on scroll, and checkout friction. Optimising mobile UX and Core Web Vitals usually recovers most of the gap." },
      { q: "How often do these benchmarks update?", a: "We refresh benchmarks quarterly using audit data from Shopify and WooCommerce stores we operate or review, plus public industry reports from Shopify, Klaviyo, and WordStream." },
      { q: "How do I compare my store to these benchmarks?", a: "Pull your last 90 days of GA4 or Shopify Analytics sessions and orders, calculate sessions ÷ orders per device, and match to the industry row above. If you're below the median, we can help - book a free audit." },
    ],
    relatedServiceHref: "/services/cro",
    relatedServiceLabel: "See our CRO service",
  },

  "paid-ads": {
    slug: "paid-ads",
    eyebrow: "Paid ads benchmarks",
    title: "Ecommerce Paid Ads Benchmarks (Meta & Google) 2026",
    heroSub: "Average CPC, CTR, CPA, and ROAS for ecommerce brands running Meta Ads and Google Ads.",
    aiSummary:
      "In 2026 the median ecommerce Meta Ads ROAS is 2.4x and Google Shopping ROAS is 4.1x. Meta CPMs are up 12% YoY. Google Search CPC for ecommerce averages £0.85; Meta CPCs range from £0.40 (fashion) to £1.60 (health).",
    quickAnswer:
      "Median ecommerce ROAS in 2026 is 2.4x on Meta Ads and 4.1x on Google Shopping. Top-quartile brands hit 4x+ on Meta and 6x+ on Google Shopping. Meta CPMs have risen 12% year-on-year; Google Search CPCs are stable.",
    keyTakeaways: [
      "Meta Ads median ROAS 2.4x; top quartile 4.0x+.",
      "Google Shopping median ROAS 4.1x; top quartile 6.5x+.",
      "Meta CPMs up ~12% YoY; iOS attribution still lossy.",
      "Ecommerce Google Search CPC averages £0.85 UK / $1.16 US.",
      "Creative testing volume is the #1 predictor of Meta ROAS.",
    ],
    tables: [
      {
        title: "Meta Ads benchmarks (ecommerce)",
        columns: ["Industry", "CTR", "CPC", "CPM", "ROAS"],
        rows: [
          { label: "Fashion & apparel", values: ["1.6%", "£0.42", "£8.80", "2.6x"] },
          { label: "Beauty & cosmetics", values: ["1.9%", "£0.55", "£11.20", "2.9x"] },
          { label: "Health & supplements", values: ["1.3%", "£1.60", "£18.50", "2.1x"] },
          { label: "Home & furniture", values: ["1.1%", "£0.90", "£13.40", "1.9x"] },
          { label: "Consumer electronics", values: ["1.5%", "£0.75", "£10.60", "2.3x"] },
        ],
        note: "Source: BeingEcom aggregated Meta Ads Manager data, 2025-2026.",
      },
      {
        title: "Google Ads benchmarks (ecommerce)",
        columns: ["Channel", "CTR", "CPC", "CPA", "ROAS"],
        rows: [
          { label: "Google Search (branded)", values: ["18%", "£0.35", "£4.20", "9.5x"] },
          { label: "Google Search (non-brand)", values: ["3.2%", "£1.10", "£24.00", "3.2x"] },
          { label: "Google Shopping", values: ["1.1%", "£0.55", "£15.60", "4.1x"] },
          { label: "Performance Max", values: ["1.4%", "£0.62", "£17.20", "3.6x"] },
          { label: "YouTube (view-through)", values: ["0.4%", "£0.09", "£38.00", "1.8x"] },
        ],
        note: "Source: BeingEcom aggregated Google Ads accounts, 2025-2026.",
      },
    ],
    howToImprove: [
      { title: "Creative velocity", body: "Ship 8-15 new creatives per week. Winners emerge from volume, not clever targeting." },
      { title: "Server-side tracking", body: "CAPI or Google Enhanced Conversions recovers 15-30% of lost signal on iOS." },
      { title: "Consolidate ad accounts", body: "Fewer campaigns with broader audiences let Advantage+ and Smart Bidding learn faster." },
      { title: "Feed optimisation", body: "For Shopping/PMax, cleaning product titles and GTINs typically lifts ROAS 20-40%." },
    ],
    faqs: [
      { q: "What is a good ROAS for a Shopify store?", a: "It depends on channel. Meta Ads median ROAS is 2.4x, top quartile 4x+. Google Shopping median is 4.1x, top quartile 6.5x+. Blended ROAS across all paid channels for a healthy ecommerce brand usually sits at 3-5x." },
      { q: "Why is my Meta ROAS dropping in 2026?", a: "Meta CPMs are up ~12% YoY, iOS attribution is still lossy, and creative fatigue kicks in fast on broad audiences. The fix is more creative volume, server-side tracking (CAPI), and consolidated Advantage+ Shopping campaigns." },
      { q: "Google Ads vs Meta Ads for ecommerce - which is better?", a: "They serve different jobs. Google (Shopping + Search) captures existing demand at higher ROAS. Meta creates demand at lower ROAS but higher scale. Most brands need both, with roughly 60/40 Meta-to-Google spend for growth or the reverse for steady-state." },
      { q: "How often should I refresh ad creative?", a: "Meta creatives fatigue within 2-4 weeks at scale. Top-quartile ecommerce brands ship 8-15 new creatives per week to combat this. Google Shopping/PMax rely more on feed quality than fresh creative." },
    ],
    relatedServiceHref: "/services/paid-ads",
    relatedServiceLabel: "See our paid ads service",
  },

  "email-marketing": {
    slug: "email-marketing",
    eyebrow: "Email marketing benchmarks",
    title: "Ecommerce Email Marketing Benchmarks 2026",
    heroSub: "Open rates, click rates, and revenue-per-recipient for ecommerce campaigns and flows on Klaviyo, Mailchimp, and Omnisend.",
    aiSummary:
      "The median ecommerce email open rate is 40% (post-Apple MPP) and click rate 1.6%. Automated flows drive 30-40% of total email revenue at 5-10x the revenue-per-recipient of one-off campaigns. Klaviyo brands consistently outperform Mailchimp on ecommerce revenue metrics.",
    quickAnswer:
      "Ecommerce email campaigns average a 40% open rate, 1.6% click rate, and £0.11 revenue-per-recipient in 2026. Automated flows (welcome, abandoned cart, browse abandonment, post-purchase, winback) do 30-40% of total email revenue at 5-10x the RPR of campaigns.",
    keyTakeaways: [
      "Median campaign open rate 40%, CTR 1.6%, RPR £0.11.",
      "Flows drive 30-40% of email revenue at 5-10x campaign RPR.",
      "Welcome and abandoned-cart flows: highest RPR (£1.50-£4.00).",
      "Klaviyo outperforms Mailchimp on ecommerce RPR by 40-70%.",
      "Email + SMS combined should hit 25-35% of total store revenue.",
    ],
    tables: [
      {
        title: "Campaign benchmarks by industry",
        columns: ["Industry", "Open rate", "CTR", "RPR"],
        rows: [
          { label: "Fashion & apparel", values: ["38%", "1.5%", "£0.09"] },
          { label: "Beauty & cosmetics", values: ["42%", "1.9%", "£0.14"] },
          { label: "Health & supplements", values: ["44%", "2.2%", "£0.18"] },
          { label: "Home & furniture", values: ["39%", "1.4%", "£0.10"] },
          { label: "Food & beverage", values: ["41%", "1.7%", "£0.12"] },
        ],
        note: "Source: Klaviyo, Omnisend, and BeingEcom client data, 2025-2026. Open rates are post-Apple MPP.",
      },
      {
        title: "Automated flow benchmarks",
        columns: ["Flow", "Open rate", "CTR", "RPR"],
        rows: [
          { label: "Welcome series", values: ["52%", "4.2%", "£1.80"] },
          { label: "Abandoned cart", values: ["48%", "6.1%", "£3.60"] },
          { label: "Browse abandonment", values: ["44%", "3.4%", "£0.95"] },
          { label: "Post-purchase", values: ["50%", "2.8%", "£0.75"] },
          { label: "Winback (60-120d)", values: ["36%", "2.1%", "£0.55"] },
        ],
        note: "Source: BeingEcom Klaviyo aggregate, 2025-2026.",
      },
    ],
    howToImprove: [
      { title: "Turn on the core five flows", body: "Welcome, abandoned cart, browse abandonment, post-purchase, winback. Together they lift email revenue share by 15-25 points." },
      { title: "Segment by RFM", body: "Split active/lapsed/VIP and tailor cadence + offers. Cuts unsubscribes and lifts RPR 20-40%." },
      { title: "Add SMS to top flows", body: "SMS on abandoned cart alongside email typically adds 30-50% incremental recovered revenue." },
      { title: "Deliverability hygiene", body: "SPF, DKIM, DMARC + sunset lapsed subscribers. Protects inbox placement as list scales." },
    ],
    faqs: [
      { q: "What is a good open rate for ecommerce emails in 2026?", a: "40% is the ecommerce median post-Apple MPP. Top-quartile brands hit 48%+. Because Apple opens are inflated by MPP, click rate (target 1.6%+) and revenue-per-recipient (£0.11+) are more reliable performance signals." },
      { q: "How much revenue should email drive for an ecommerce store?", a: "A well-run Klaviyo (or Omnisend) setup with the core five flows should deliver 20-30% of total store revenue via email alone, or 25-35% with SMS added. Anything below 15% means flows or segmentation are underbuilt." },
      { q: "Klaviyo vs Mailchimp - which is better for ecommerce?", a: "Klaviyo. Native Shopify/WooCommerce integration, product feeds, predictive analytics, and flow templates built for ecommerce give Klaviyo brands 40-70% higher revenue-per-recipient than Mailchimp on the same list size." },
      { q: "What are the most important email flows to set up first?", a: "In order: welcome series, abandoned cart, browse abandonment, post-purchase, and winback. These five typically drive 30-40% of total email revenue and are the fastest ROI email work you can ship." },
    ],
    relatedServiceHref: "/services/email-sms",
    relatedServiceLabel: "See our email & SMS service",
  },
};

export const Route = createFileRoute("/benchmarks/$slug")({
  loader: ({ params }) => {
    const cfg = CONFIGS[params.slug];
    if (!cfg) throw notFound();
    return { cfg };
  },
  head: ({ params, loaderData }) => {
    const cfg = loaderData?.cfg;
    if (!cfg) return { meta: [{ title: "Benchmark not found" }, { name: "robots", content: "noindex" }] };
    const url = `https://beingecom.com/benchmarks/${params.slug}`;
    return {
      meta: [
        { title: `${cfg.title} | BeingEcom` },
        { name: "description", content: cfg.aiSummary },
        { property: "og:title", content: cfg.title },
        { property: "og:description", content: cfg.aiSummary },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Benchmarks", path: "/benchmarks" },
            { name: cfg.eyebrow, path: `/benchmarks/${params.slug}` },
          ])),
        },
        { type: "application/ld+json", children: JSON.stringify(faqJsonLd(cfg.faqs, `/benchmarks/${params.slug}`)) },
        { type: "application/ld+json", children: JSON.stringify(benchmarkDatasetJsonLd(cfg)) },
      ],
    };
  },
  component: BenchmarkRoute,
  notFoundComponent: BenchmarkNotFound,
  errorComponent: BenchmarkError,
});

function BenchmarkRoute() {
  const { cfg } = Route.useLoaderData();
  return <BenchmarkPage cfg={cfg} />;
}

function BenchmarkNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 text-center">
      <h1 className="text-3xl font-bold text-ink">Benchmark not found</h1>
      <p className="mt-3 text-muted-foreground">Try the <a href="/benchmarks" className="text-primary underline">benchmarks hub</a>.</p>
    </div>
  );
}

function BenchmarkError() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 text-center">
      <h1 className="text-3xl font-bold text-ink">Something went wrong</h1>
      <p className="mt-3 text-muted-foreground">Please refresh the page.</p>
    </div>
  );
}
