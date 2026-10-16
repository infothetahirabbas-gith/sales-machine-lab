import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  Search,
  Layers,
  Megaphone,
  MousePointerClick,
  Repeat,
  Bot,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import PageLayout from "@/components/site/PageLayout";
import { Section, Card, CTA } from "@/components/site/Section";
import AISummary from "@/components/site/AISummary";
import FaqSection from "@/components/site/FaqSection";
import { breadcrumbJsonLd, faqJsonLd, howToJsonLd, SITE_URL } from "@/lib/seo";

const STAGES = [
  {
    n: "01",
    Icon: Search,
    title: "Store Intelligence",
    body: "Full-stack audit of the store: technical SEO, analytics fidelity, funnel behaviour, unit economics, and competitor positioning. The output is a diagnosis, not a checklist - we identify the actual revenue bottleneck before touching a single lever.",
    outputs: ["Growth thesis", "Revenue leakage map", "Unit economics baseline", "Competitor SERP shape"],
  },
  {
    n: "02",
    Icon: Layers,
    title: "Growth Foundation",
    body: "Fix the foundations paid growth will ride on: technical SEO, site speed and Core Web Vitals, GA4 + server-side tracking, consent, product feed hygiene, and category/PDP structure. Without this, every downstream channel underperforms.",
    outputs: ["Technical SEO fixes", "Server-side tracking", "Feed cleanup", "Category & PDP structure"],
  },
  {
    n: "03",
    Icon: Megaphone,
    title: "Customer Acquisition",
    body: "Scale traffic profitably. SEO (product, category, and long-tail), Google Ads (Search, Shopping, PMax), Meta Ads with weekly creative iteration, and paid social where the audience actually lives. Every channel is measured on incremental contribution, not last-click.",
    outputs: ["SEO growth engine", "Google/Meta scaling", "Creative velocity system", "MER + channel attribution"],
  },
  {
    n: "04",
    Icon: MousePointerClick,
    title: "Conversion Optimisation",
    body: "Turn more of the traffic you already have into revenue. Structured CRO programme: heatmaps, session replay, PDP/PLP experiments, checkout friction removal, trust signals, mobile UX. Ship 2-4 tests per month against a documented hypothesis backlog.",
    outputs: ["CRO test roadmap", "Winning variants shipped", "CVR lift by device", "Documented learnings"],
  },
  {
    n: "05",
    Icon: Repeat,
    title: "Customer Retention",
    body: "Compound revenue with email, SMS, and lifecycle marketing. Klaviyo flows (welcome, abandoned cart, browse abandonment, post-purchase, winback), RFM segmentation, subscription/repeat-purchase design. Retention is where the P&L actually opens up.",
    outputs: ["Core email/SMS flows live", "RFM segmentation", "Repeat-purchase rate ↑", "LTV:CAC improvement"],
  },
  {
    n: "06",
    Icon: Bot,
    title: "AI Automation",
    body: "Automate the repeatable: AI-assisted content production, product feed and PDP enrichment, creative variants, reporting, and inbound support workflows. AI is a margin lever, not a headline - it compounds every stage above.",
    outputs: ["AI content pipelines", "Automated feed/PDP enrichment", "AI creative variants", "Automated reporting"],
  },
];

const FAQS = [
  {
    q: "What is the BeingEcom Growth System™?",
    a: "The BeingEcom Growth System™ is a six-stage operating framework for scaling ecommerce brands: Store Intelligence, Growth Foundation, Customer Acquisition, Conversion Optimisation, Customer Retention, and AI Automation. Every Shopify or WooCommerce engagement moves through the same six stages, in the same order.",
  },
  {
    q: "Why six stages and not more or fewer?",
    a: "Six stages map to the actual sequence revenue is built in: you diagnose, fix foundations, acquire traffic, convert it, retain it, and then automate. Skipping stages (typically foundations or retention) is the single most common reason ecommerce brands plateau.",
  },
  {
    q: "How long does the full BeingEcom Growth System™ take?",
    a: "Stages 1-2 (diagnosis and foundations) take 4-6 weeks. Stages 3-5 (acquisition, CRO, retention) run in parallel from month 2 onwards. Stage 6 (AI automation) layers in from month 3. Meaningful revenue impact is visible within 60-90 days on most stores.",
  },
  {
    q: "Does the methodology work for both Shopify and WooCommerce?",
    a: "Yes. The framework is platform-agnostic - only the implementation tooling changes. We run the same six stages on Shopify, Shopify Plus, WooCommerce, and headless stores.",
  },
  {
    q: "How is this different from a normal agency retainer?",
    a: "Most agencies sell channels (SEO, ads, email) as separate services. The BeingEcom Growth System™ sequences them as one connected system where each stage feeds the next - foundations lift ad performance, ad traffic feeds CRO, CRO feeds retention, and AI compounds the whole loop.",
  },
  {
    q: "Where can I see this applied to a real store?",
    a: "Our case studies walk through the six stages on real Shopify and WooCommerce brands - with the diagnosis, work shipped in each stage, and the revenue outcome. See /case-studies for the full library.",
  },
];

const URL = `${SITE_URL}/methodology`;

const howToLd = howToJsonLd({
  url: URL,
  name: "The BeingEcom Ecommerce Growth System",
  description:
    "A six-stage operating framework for scaling Shopify and WooCommerce brands from 6 to 7 figures through diagnosis, foundations, acquisition, conversion, retention, and AI automation.",
  steps: STAGES.map((s) => ({ name: s.title, text: s.body })),
});

export const Route = createFileRoute("/methodology")({
  head: () => ({
    meta: [
      { title: "The BeingEcom Growth System™ | Ecommerce Growth Methodology" },
      {
        name: "description",
        content:
          "The BeingEcom Growth System™ - a six-stage ecommerce growth methodology for Shopify and WooCommerce brands: Store Intelligence → Foundation → Acquisition → CRO → Retention → AI Automation.",
      },
      { property: "og:title", content: "The BeingEcom Growth System™ | Ecommerce Growth Methodology" },
      {
        property: "og:description",
        content:
          "Six-stage operating framework used to scale Shopify and WooCommerce brands from 6 to 7 figures.",
      },
      { property: "og:url", content: URL },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Methodology", path: "/methodology" },
          ]),
        ),
      },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQS, "/methodology")) },
      { type: "application/ld+json", children: JSON.stringify(howToLd) },
    ],
  }),
  component: MethodologyPage,
});

function MethodologyPage() {
  return (
    <PageLayout>
      {/* HERO */}
      <section className="relative pt-20 pb-10 lg:pt-28 lg:pb-14 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="mx-auto max-w-5xl px-5 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            <Sparkles className="w-3.5 h-3.5" /> Proprietary framework
          </div>
          <h1 className="mt-5 text-4xl md:text-6xl font-bold leading-[1.06] text-ink">
            The BeingEcom Growth System™
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-3xl mx-auto">
            A six-stage operating framework for scaling Shopify and WooCommerce brands. Every engagement moves through the same six stages, in the same order - diagnosis, foundations, acquisition, conversion, retention, automation.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <AISummary eyebrow="Summary">
          The BeingEcom Growth System™ is a six-stage ecommerce growth methodology: Store Intelligence → Growth Foundation → Customer Acquisition → Conversion Optimisation → Customer Retention → AI Automation. It sequences SEO, paid ads, CRO, email, and AI into one connected system that compounds - instead of running each channel as a disconnected service.
        </AISummary>
      </div>

      {/* STAGE FLOW */}
      <Section eyebrow="The six stages" title="How the system flows">
        <div className="grid gap-5 max-w-5xl mx-auto">
          {STAGES.map(({ n, Icon, title, body, outputs }, i) => (
            <div key={n} className="card-surface p-6 lg:p-8">
              <div className="flex flex-col md:flex-row md:items-start gap-5">
                <div className="flex items-center gap-4 md:flex-col md:items-start md:w-40 shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-primary">Stage {n}</div>
                    <div className="text-lg font-semibold text-ink mt-0.5">{title}</div>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-ink leading-relaxed">{body}</p>
                  <div className="mt-4 grid sm:grid-cols-2 gap-2">
                    {outputs.map((o) => (
                      <div key={o} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{o}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {i < STAGES.length - 1 && (
                <div className="mt-6 flex justify-center text-primary/50">
                  <ArrowRight className="w-5 h-5 rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* PHILOSOPHY */}
      <Section eyebrow="Why it works" title="The philosophy behind the system" alt>
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          <Card>
            <h3 className="font-semibold text-ink">Sequence over stacking</h3>
            <p className="mt-2 text-sm text-muted-foreground">Most stores fail not from missing channels, but from running them in the wrong order. Foundations first - then acquisition, then CRO, then retention, then automation.</p>
          </Card>
          <Card>
            <h3 className="font-semibold text-ink">Systems over tactics</h3>
            <p className="mt-2 text-sm text-muted-foreground">Each stage has a defined input, output, owner, and success criterion. Nothing is left to interpretation - which is what makes the system repeatable across accounts.</p>
          </Card>
          <Card>
            <h3 className="font-semibold text-ink">Compounding over spikes</h3>
            <p className="mt-2 text-sm text-muted-foreground">SEO, brand, retention, and CRO compound. Paid spikes fade. The system deliberately front-loads compounding levers so year 2 costs less than year 1.</p>
          </Card>
        </div>
      </Section>

      {/* TOOLS */}
      <Section eyebrow="Applied everywhere" title="Where the system runs">
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          <Link to="/case-studies" className="card-surface card-hover p-6 flex items-start gap-4">
            <ArrowRight className="w-5 h-5 text-primary shrink-0 mt-1" />
            <div>
              <div className="font-semibold text-ink">Case studies</div>
              <div className="text-sm text-muted-foreground mt-1">See the six stages applied on real Shopify and WooCommerce brands, with diagnosis and outcome.</div>
            </div>
          </Link>
          <Link to="/methodology" className="card-surface card-hover p-6 flex items-start gap-4">
            <ArrowRight className="w-5 h-5 text-primary shrink-0 mt-1" />
            <div>
              <div className="font-semibold text-ink">The 13-phase delivery detail</div>
              <div className="text-sm text-muted-foreground mt-1">The operational sub-phases inside each stage - inputs, outputs, and typical duration.</div>
            </div>
          </Link>
          <Link to="/benchmarks" className="card-surface card-hover p-6 flex items-start gap-4">
            <ArrowRight className="w-5 h-5 text-primary shrink-0 mt-1" />
            <div>
              <div className="font-semibold text-ink">Ecommerce benchmarks</div>
              <div className="text-sm text-muted-foreground mt-1">The medians the system aims to beat - conversion, ads, email, by industry.</div>
            </div>
          </Link>
          <Link to="/tools" className="card-surface card-hover p-6 flex items-start gap-4">
            <ArrowRight className="w-5 h-5 text-primary shrink-0 mt-1" />
            <div>
              <div className="font-semibold text-ink">Free tools</div>
              <div className="text-sm text-muted-foreground mt-1">Calculators for ROAS, CAC, LTV, margin, and break-even - the same numbers stage 1 diagnoses.</div>
            </div>
          </Link>
        </div>
      </Section>

      <FaqSection title="Frequently asked questions" faqs={FAQS} />

      <CTA
        heading="Run the BeingEcom Growth System™ on your store"
        sub="Book a free strategy call - we'll walk you through stage 1 (Store Intelligence) on your Shopify or WooCommerce store and show you the highest-leverage next move."
      />
    </PageLayout>
  );
}
