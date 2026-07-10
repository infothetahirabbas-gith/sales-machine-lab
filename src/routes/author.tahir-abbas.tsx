import { createFileRoute, Link } from "@tanstack/react-router";
import PageLayout from "@/components/site/PageLayout";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  personJsonLd,
  SITE_URL,
  TEAM,
  ORG_ID,
  type FAQ,
} from "@/lib/seo";
import founderImg from "@/assets/founder-ceo.jpg.asset.json";
import {
  ArrowRight,
  Linkedin,
  Twitter,
  Mail,
  Award,
  BookOpen,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const AUTHOR = TEAM.find((m) => m.slug === "tahir-abbas")!;
const PATH = "/author/tahir-abbas";
const CANONICAL = `${SITE_URL}${PATH}`;
const TITLE = "Tahir Abbas — Author & Ecommerce Growth Operator | BeingEcom";
const DESC =
  "Articles, playbooks and frameworks by Tahir Abbas — Founder & CEO of BeingEcom, senior ecommerce growth operator for Shopify and WooCommerce brands in the UK, US, IE and AU.";

const authoredArticles = [
  {
    title: "Shopify vs WooCommerce (UK, 2026)",
    to: "/compare/shopify-vs-woocommerce",
    summary:
      "An honest, operator-authored platform comparison for growing UK DTC brands — cost, checkout conversion, SEO ceiling and scaling.",
  },
  {
    title: "SEO vs Paid Ads for Ecommerce (2026)",
    to: "/compare/seo-vs-paid-ads",
    summary:
      "The right question isn't SEO or paid — it's what percentage of the mix each channel should own at your revenue stage.",
  },
  {
    title: "Meta Ads vs Google Ads for Ecommerce (2026)",
    to: "/compare/meta-ads-vs-google-ads",
    summary:
      "Demand-creation vs demand-capture, creative burden, tracking accuracy and the mix that actually protects contribution margin.",
  },
  {
    title: "Klaviyo vs Mailchimp for Ecommerce (2026)",
    to: "/compare/klaviyo-vs-mailchimp",
    summary:
      "Which email platform actually deserves to run your retention P&L — and when Mailchimp is fine to keep.",
  },
  {
    title: "AI Automation vs Manual Marketing (2026)",
    to: "/compare/ai-automation-vs-manual-marketing",
    summary:
      "Where AI genuinely compresses ecommerce ops time — and where senior humans still win. The operating model that combines both.",
  },
  {
    title: "The BeingEcom Growth Methodology",
    to: "/company/methodology",
    summary:
      "The 13-phase framework BeingEcom uses on every engagement — diagnostic, stabilisation, 90-day plan, weekly rhythm, quarterly step-change.",
  },
  {
    title: "Shopify Growth Hub",
    to: "/hub/shopify-growth",
    summary:
      "SEO, speed, CRO, paid, email, headless Hydrogen and scaling for Shopify and Shopify Plus — the full growth stack.",
  },
  {
    title: "Ecommerce SEO Hub",
    to: "/hub/ecommerce-seo",
    summary:
      "Technical, on-page, off-page, local, international and Answer Engine Optimisation for product-led sites.",
  },
  {
    title: "Shopify vs WooCommerce UK — 2026 Blog Deep-Dive",
    to: "/blog/shopify-vs-woocommerce-uk",
    summary:
      "Long-form article version with UK VAT, PSD2 and Shopify Markets specifics for founders choosing a platform in 2026.",
  },
  {
    title: "Shopify Plus Migration for UK Brands",
    to: "/blog/shopify-plus-migration-uk",
    summary:
      "WooCommerce to Shopify Plus migration playbook — SEO transfer, checkout parity, tax and inventory cutover.",
  },
];

const faqs: FAQ[] = [
  {
    q: "Who writes the articles on BeingEcom?",
    a: "Founder & CEO Tahir Abbas authors the pillar hubs, comparisons, methodology and long-form articles. He is a senior ecommerce operator with 10+ years running paid, SEO, CRO and retention P&Ls for Shopify and WooCommerce brands in the UK, US, IE and AU.",
  },
  {
    q: "What is Tahir Abbas's editorial policy?",
    a: "Every article is written from first-hand operator experience — a real client engagement, a real experiment, a real P&L outcome. AI is used for research, structure and first drafts, then edited and signed off by Tahir before publication. No content is generated end-to-end by AI without human editorial.",
  },
  {
    q: "Can Tahir Abbas write for other publications?",
    a: "Yes — Tahir contributes guest articles and commentary on ecommerce growth, Shopify, WooCommerce, paid media and AI automation for UK and international publications. Reach out via info@beingecom.com or LinkedIn to discuss a piece.",
  },
  {
    q: "How can I contact the author?",
    a: "Directly via info@beingecom.com or on LinkedIn at linkedin.com/in/tahirabbas. For a strategy discussion about your own brand, book a call through the BeingEcom contact page.",
  },
];

const authorPerson = {
  ...personJsonLd({ ...AUTHOR, image: `${SITE_URL}${founderImg.url}` }),
  url: CANONICAL,
  mainEntityOfPage: CANONICAL,
};

const jsonLd = [
  authorPerson,
  breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Author", path: "/author/tahir-abbas" },
  ]),
  faqJsonLd(faqs, PATH),
  {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${CANONICAL}#profile`,
    url: CANONICAL,
    name: TITLE,
    description: DESC,
    mainEntity: { "@id": AUTHOR.id },
    about: { "@id": AUTHOR.id },
    isPartOf: { "@id": `${SITE_URL}#website` },
    dateModified: new Date().toISOString().slice(0, 10),
  },
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${CANONICAL}#articles`,
    url: CANONICAL,
    name: "Articles by Tahir Abbas",
    author: { "@id": AUTHOR.id },
    publisher: { "@id": ORG_ID },
    hasPart: authoredArticles.map((a) => ({
      "@type": "Article",
      headline: a.title,
      url: `${SITE_URL}${a.to}`,
      author: { "@id": AUTHOR.id },
      publisher: { "@id": ORG_ID },
    })),
  },
];

export const Route = createFileRoute("/author/tahir-abbas")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "author", content: "Tahir Abbas" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: CANONICAL },
      { property: "og:image", content: `${SITE_URL}${founderImg.url}` },
      { property: "profile:first_name", content: "Tahir" },
      { property: "profile:last_name", content: "Abbas" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: `${SITE_URL}${founderImg.url}` },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: jsonLd.map((obj) => ({
      type: "application/ld+json",
      children: JSON.stringify(obj),
    })),
  }),
  component: AuthorPage,
});

function AuthorPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-background text-foreground">
        <div className="mx-auto max-w-5xl px-5 lg:px-8 pt-24 pb-14 lg:pt-32 lg:pb-16">
          <div className="grid md:grid-cols-[220px_1fr] gap-8 items-center">
            <img
              src={founderImg.url}
              alt="Tahir Abbas — Founder & CEO of BeingEcom"
              width={220}
              height={260}
              className="rounded-2xl border object-cover w-[220px] h-[260px]"
            />
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-primary">
                Author profile
              </div>
              <h1 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight leading-[1.05]">
                Tahir Abbas
              </h1>
              <div className="mt-2 text-lg text-foreground/80">
                Founder & CEO, BeingEcom · Ecommerce growth operator
              </div>
              <p className="mt-5 text-[16px] leading-relaxed text-foreground/85 max-w-2xl">
                Tahir Abbas is the Founder & CEO of BeingEcom and a senior ecommerce growth operator
                with 10+ years running paid media, SEO, CRO and retention P&Ls for Shopify and
                WooCommerce brands across the UK, US, Ireland and Australia. He writes the pillar
                hubs, comparisons and methodology articles on this site — every piece grounded in a
                real client engagement, experiment or P&L outcome.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="https://www.linkedin.com/in/tahirabbas"
                  className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary transition-colors"
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
                <a
                  href="https://x.com/beingecom"
                  className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary transition-colors"
                >
                  <Twitter className="w-4 h-4" /> X / Twitter
                </a>
                <a
                  href="mailto:info@beingecom.com"
                  className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4" /> Email
                </a>
                <Link
                  to="/company/founder"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Full founder profile <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise strip */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-5xl px-5 lg:px-8 py-8">
          <div className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            Areas of expertise
          </div>
          <div className="flex flex-wrap gap-2">
            {AUTHOR.knowsAbout.map((k) => (
              <span
                key={k}
                className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1.5 text-xs font-semibold text-foreground/80"
              >
                <CheckCircle2 className="w-3 h-3 text-primary" /> {k}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial policy */}
      <section className="mx-auto max-w-3xl px-5 lg:px-8 py-14">
        <div className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
          Editorial policy
        </div>
        <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-tight mb-5">
          How these articles are written
        </h2>
        <div className="space-y-4 text-[16px] leading-relaxed text-foreground/85">
          <p>
            Every article on BeingEcom is written from first-hand operator experience. If Tahir
            hasn't personally executed the play — or hasn't seen it run inside a BeingEcom pod —
            it doesn't get published as an assertion.
          </p>
          <p>
            AI is used for research, structure and first drafts. It is never used to author facts,
            benchmarks or client outcomes end-to-end. Every article is edited and signed off by
            Tahir before it goes live, and updated when the underlying tactic or platform changes.
          </p>
          <p>
            Where an article makes a numerical claim (conversion rate, MER, CPM, LTV), it is either
            drawn from real client data (anonymised), from a cited third-party source, or clearly
            marked as an operator estimate.
          </p>
        </div>
      </section>

      {/* Articles list */}
      <section className="border-t bg-muted/20">
        <div className="mx-auto max-w-5xl px-5 lg:px-8 py-16">
          <div className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            <BookOpen className="w-3.5 h-3.5 inline mr-1" /> Articles by Tahir Abbas
          </div>
          <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-tight mb-8">
            Featured playbooks, comparisons & frameworks
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {authoredArticles.map((a) => (
              <Link
                key={a.to}
                to={a.to}
                className="group block rounded-2xl border bg-card p-6 hover:border-primary transition-colors"
              >
                <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {a.title}
                </div>
                <p className="mt-2 text-sm text-foreground/75 leading-relaxed">{a.summary}</p>
                <div className="mt-4 text-xs font-semibold text-primary inline-flex items-center gap-1">
                  Read <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="mx-auto max-w-3xl px-5 lg:px-8 py-14">
        <div className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
          Credentials
        </div>
        <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-tight mb-6">
          Why trust the byline
        </h2>
        <ul className="space-y-3">
          {[
            "10+ years operating ecommerce brands — DTC operator, growth lead, head of performance, founder.",
            "Ran an 8-figure DTC paid-media P&L across four brands as head of performance.",
            "Advised 200+ Shopify and WooCommerce brands across the UK, US, Ireland and Australia.",
            "Author of BeingEcom's 13-phase growth methodology, used on every client engagement.",
            "Built the Being Ecom Brain™ AI store audit — 17 phases, sub-90-second execution.",
          ].map((line) => (
            <li key={line} className="flex gap-3 text-foreground/85">
              <Award className="w-4 h-4 mt-1 text-primary flex-none" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="border-t">
        <div className="mx-auto max-w-3xl px-5 lg:px-8 py-14 lg:py-20">
          <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-tight mb-8">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="rounded-2xl border bg-card p-5">
                <summary className="font-semibold cursor-pointer text-foreground">{f.q}</summary>
                <p className="mt-3 text-foreground/80 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-10 rounded-3xl border bg-card p-8 text-center">
            <Sparkles className="w-6 h-6 text-primary mx-auto" />
            <h3 className="mt-3 font-display text-2xl font-bold">Talk to the operator behind the byline</h3>
            <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
              Book a 30-minute discovery call with Tahir to pressure-test your growth plan.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Book a call <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/audit"
                className="inline-flex items-center gap-2 rounded-full border bg-background px-5 py-2.5 text-sm font-semibold hover:border-primary transition-colors"
              >
                Free store audit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
