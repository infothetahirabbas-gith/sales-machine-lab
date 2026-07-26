import { createFileRoute, Link } from "@tanstack/react-router";
import PageLayout from "@/components/site/PageLayout";
import { breadcrumbJsonLd, faqJsonLd, SITE_URL } from "@/lib/seo";
import {
  CheckCircle2,
  XCircle,
  Target,
  TrendingUp,
  Store,
  ArrowRight,
  Users,
} from "lucide-react";

const FAQS = [
  {
    q: "What size ecommerce brand do you work with?",
    a: "UK Shopify and WooCommerce brands doing £10k-£500k+ per month. Below £10k/month is usually too early - the constraint is product-market fit, not marketing execution. Above £500k/month we work with brands whose next constraint is systematic scale rather than proof-of-concept.",
  },
  {
    q: "Do you work with brand-new stores?",
    a: "Rarely. Pre-revenue and pre-validation stores need a different partner - a launch specialist or a founder-led sprint - not a growth retainer. We start creating value once there is baseline traffic and revenue to optimise against.",
  },
  {
    q: "Do you work with non-ecommerce businesses?",
    a: "No. We are ecommerce-only by design. Every process, dashboard, benchmark and playbook is built for Shopify and WooCommerce DTC. B2B, SaaS and lead-gen brands are better served by specialists in those verticals.",
  },
  {
    q: "What if my brand is on Magento, BigCommerce or a custom platform?",
    a: "We work primarily with Shopify (including Plus) and WooCommerce because that is where our engineering, apps and SEO stack are strongest. For Magento or custom stacks we will discuss on a case-by-case basis and often recommend a platform-specialist partner if that is the better fit for you.",
  },
  {
    q: "Do you accept every brand that applies?",
    a: "No. We qualify every enquiry against this profile before proposing work. If the fit is wrong we will say so and, where we can, refer you to a partner who fits better. It protects both sides from a bad engagement.",
  },
  {
    q: "What is your minimum engagement?",
    a: "SEO, CRO and email retainers start from £500 per month for £10k-£30k/month brands. Paid media has a £3,000 per month minimum because anything below that cannot support the media budget plus the operator time needed to run it well.",
  },
];

const IDEAL = [
  {
    icon: Store,
    title: "Platform",
    lines: [
      "Shopify (Basic through Plus)",
      "WooCommerce on WordPress",
      "Shopify Plus migration ready",
    ],
  },
  {
    icon: TrendingUp,
    title: "Revenue stage",
    lines: [
      "£10k-£30k/month - growth foundations",
      "£30k-£100k/month - scale and diversify",
      "£100k-£500k/month - systemise and compound",
    ],
  },
  {
    icon: Target,
    title: "Growth problem",
    lines: [
      "Organic traffic plateau or decline",
      "Rising CAC and blended paid inefficiency",
      "PDP and checkout conversion below benchmark",
      "Weak collection and category SEO",
      "Low repeat purchase rate / thin email programme",
    ],
  },
  {
    icon: Users,
    title: "Team and mindset",
    lines: [
      "Founder or growth lead accountable for revenue",
      "Willing to test, measure and iterate",
      "Committed to a 90+ day horizon, not a one-month trial",
    ],
  },
];

const VERTICALS = [
  { name: "Fashion & apparel", desc: "Seasonal drops, sizing, high return rates - SEO for collections, paid for launches, CRO for size/fit confidence." },
  { name: "Beauty & skincare", desc: "Subscription, replenishment, ingredient education - email retention, PDP content depth, review-driven CRO." },
  { name: "Health & wellness", desc: "Regulatory copy, trust signals, subscription mechanics - schema, disclaimers, evidence-led product pages." },
  { name: "Home & lifestyle", desc: "Considered purchase, bundle economics, delivery cost sensitivity - AOV levers, PLP filtering, shipping messaging." },
  { name: "Food, drink & supplements", desc: "Compliance-heavy claims, subscription retention, ambient vs chilled logistics - retention flows and PDP evidence." },
  { name: "Sports, fitness & outdoors", desc: "Enthusiast SEO, technical spec depth, seasonal demand - long-tail category work and paid social creative volume." },
];

const NOT_IDEAL = [
  "Pre-revenue stores still validating product-market fit",
  "Brands looking for guaranteed rankings or instant results",
  "Businesses without a working analytics and attribution setup they will invest in",
  "One-off project mindsets expecting compound outcomes in 30 days",
  "Non-ecommerce businesses (B2B, SaaS, pure lead-gen)",
  "Brands unwilling to invest in creative, content or dev alongside media spend",
];

export const Route = createFileRoute("/who-we-help")({
  head: () => ({
    meta: [
      { title: "Who We Help - UK Ecommerce Growth Partner ICP | BeingEcom" },
      {
        name: "description",
        content:
          "The exact UK Shopify and WooCommerce brands BeingEcom is built for - revenue stage, platform, growth problems and where we are not the right fit.",
      },
      { property: "og:title", content: "Who We Help - Ideal Client Profile | BeingEcom" },
      {
        property: "og:description",
        content:
          "Honest ICP for BeingEcom. UK Shopify/WooCommerce DTC brands £10k-£500k+/month, plus who we are not the right partner for.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/who-we-help` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/who-we-help` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Who we help", path: "/who-we-help" },
          ]),
        ),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(faqJsonLd(FAQS, "/who-we-help")),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${SITE_URL}/who-we-help#page`,
          name: "Who We Help - BeingEcom ICP",
          url: `${SITE_URL}/who-we-help`,
          description:
            "Ideal client profile for BeingEcom - UK Shopify and WooCommerce DTC brands £10k-£500k+/month, plus who we are not the right fit for.",
          audience: {
            "@type": "BusinessAudience",
            audienceType: "UK ecommerce DTC brands",
            geographicArea: {
              "@type": "Country",
              name: "United Kingdom",
            },
          },
          about: [
            { "@type": "Thing", name: "Shopify" },
            { "@type": "Thing", name: "WooCommerce" },
            { "@type": "Thing", name: "Ecommerce growth" },
            { "@type": "Thing", name: "DTC marketing" },
          ],
        }),
      },
    ],
  }),
  component: WhoWeHelpPage,
});

function WhoWeHelpPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-background text-foreground">
        <div className="mx-auto max-w-5xl px-5 lg:px-8 pt-24 pb-14 lg:pt-32 lg:pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Target className="w-3.5 h-3.5 text-primary" /> Ideal Client Profile
          </div>
          <h1 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            Who BeingEcom is built for
          </h1>
          <p className="mt-6 text-lg md:text-xl text-foreground/85 max-w-3xl leading-relaxed">
            Summary: BeingEcom is a UK ecommerce growth partner for Shopify and WooCommerce DTC
            brands doing £10k-£500k+ per month. Below is the exact profile we work with best - and
            where we are honestly not the right partner. Reading this before you enquire saves both
            of us a call.
          </p>
        </div>
      </section>

      {/* Ideal profile grid */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 lg:px-8 py-14 lg:py-20">
          <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-tight mb-2">
            Ideal client profile
          </h2>
          <p className="text-foreground/75 max-w-2xl mb-10">
            The specific brand shape our processes, dashboards and pricing are built around.
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {IDEAL.map((block) => (
              <div key={block.title} className="rounded-2xl border bg-card p-7">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary grid place-items-center">
                    <block.icon className="w-5 h-5" />
                  </div>
                  <div className="font-display text-xl font-bold">{block.title}</div>
                </div>
                <ul className="space-y-2">
                  {block.lines.map((l) => (
                    <li key={l} className="flex gap-2 text-foreground/85 text-[15px]">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary flex-none" />
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verticals */}
      <section className="border-t border-border bg-muted/20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8 py-14 lg:py-20">
          <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-tight mb-2">
            Verticals we know deeply
          </h2>
          <p className="text-foreground/75 max-w-2xl mb-10">
            Category depth compounds. These are the ecommerce verticals where our playbooks, PDP
            patterns and paid-creative libraries are strongest.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {VERTICALS.map((v) => (
              <div key={v.name} className="rounded-2xl border bg-card p-6">
                <div className="font-display text-lg font-bold text-foreground">{v.name}</div>
                <p className="mt-2 text-foreground/80 text-[15px] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link
              to="/industries"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              See all industries we work with <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Not ideal for */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-4xl px-5 lg:px-8 py-14 lg:py-20">
          <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
            Honest disqualifiers
          </div>
          <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-tight mb-6">
            Who we are not the right fit for
          </h2>
          <p className="text-foreground/80 leading-relaxed mb-8">
            Saying no is part of the product. These are the situations where we will decline the
            work, refund a discovery deposit, or refer you to a partner who fits better.
          </p>
          <ul className="space-y-3">
            {NOT_IDEAL.map((line) => (
              <li key={line} className="flex gap-3 text-foreground/85 rounded-xl border bg-card p-4">
                <XCircle className="w-5 h-5 mt-0.5 text-muted-foreground flex-none" />
                <span className="leading-relaxed">{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why this matters (E-E-A-T + entity) */}
      <section className="border-t border-border bg-muted/20">
        <div className="mx-auto max-w-4xl px-5 lg:px-8 py-14 lg:py-20">
          <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-tight mb-6">
            Why we published this
          </h2>
          <div className="prose prose-lg max-w-none text-foreground/85 leading-relaxed space-y-5">
            <p>
              Most agency websites are optimised to accept every enquiry. Ours is not. The single
              biggest predictor of a good outcome for both sides is fit before contract - platform,
              revenue stage, vertical, growth problem, and honest willingness to invest in a 90+ day
              horizon.
            </p>
            <p>
              This page exists so a founder can self-qualify in three minutes before booking a
              strategy call. If the fit is right, that call becomes a working session, not a sales
              pitch. If the fit is wrong, both sides get their time back.
            </p>
            <p>
              We picked UK Shopify and WooCommerce DTC because that is where a decade of operator
              work compounds into real leverage - the app stack, the tax and payment context, the
              creative language, the review and shipping expectations. Depth beats breadth every
              time.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-5 lg:px-8 py-14 lg:py-20">
          <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-tight mb-8">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <details key={f.q} className="rounded-2xl border bg-card p-5">
                <summary className="font-semibold cursor-pointer text-foreground">{f.q}</summary>
                <p className="mt-3 text-foreground/80 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-4xl px-5 lg:px-8 py-16 lg:py-24 text-center">
          <h2 className="font-display text-3xl lg:text-5xl font-bold tracking-tight mb-5">
            Sounds like the right fit?
          </h2>
          <p className="text-foreground/80 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Book a scoped strategy call - we will look at your store, benchmarks and priorities
            together. If we are the wrong partner, we will say so on the call.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
            >
              Book a strategy call <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/audit"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition"
            >
              Get a free ecommerce audit
            </Link>
            <Link
              to="/compare"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition"
            >
              Compare us to other agencies
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
