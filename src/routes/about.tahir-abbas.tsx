import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, BookOpen, Mic, Linkedin, ArrowRight, GraduationCap, Briefcase, Sparkles } from "lucide-react";
import PageLayout from "@/components/site/PageLayout";
import { Section, Card, CTA } from "@/components/site/Section";
import AISummary from "@/components/site/AISummary";
import FaqSection from "@/components/site/FaqSection";
import { breadcrumbJsonLd, faqJsonLd, SITE_URL, PERSON_ID_FOUNDER } from "@/lib/seo";

const FAQS = [
  { q: "Who is Tahir Abbas?", a: "Tahir Abbas is the founder of BeingEcom, a UK ecommerce marketing agency helping Shopify and WooCommerce brands scale through SEO, paid advertising, CRO, email, analytics, and AI automation." },
  { q: "What is Tahir Abbas's ecommerce expertise?", a: "Ecommerce SEO, Shopify and WooCommerce growth, paid acquisition (Meta and Google Ads), conversion rate optimisation, retention marketing, and AI automation for online stores." },
  { q: "How can I contact Tahir Abbas?", a: "You can reach out via the BeingEcom contact page or connect on LinkedIn. For growth work, the fastest path is booking a strategy call through the site." },
  { q: "Does Tahir Abbas speak or write on ecommerce?", a: "Yes — Tahir publishes research, frameworks, and playbooks on ecommerce growth via BeingEcom's blog and research hub, and is available for podcasts, panels, and expert commentary on ecommerce and AI." },
];

const EXPERTISE = [
  "Ecommerce SEO (Shopify & WooCommerce)",
  "Paid acquisition (Meta Ads, Google Ads)",
  "Conversion rate optimisation (CRO)",
  "Email & SMS retention marketing",
  "Ecommerce analytics & attribution",
  "AI automation for online stores",
];

const SPEAKING_TOPICS = [
  "The state of ecommerce growth in 2026",
  "How AI is changing ecommerce marketing",
  "The complete Shopify SEO framework",
  "Why most ecommerce stores fail to scale",
  "Building an ecommerce retention engine",
];

export const Route = createFileRoute("/about/tahir-abbas")({
  head: () => {
    const url = `${SITE_URL}/about/tahir-abbas`;
    return {
      meta: [
        { title: "Tahir Abbas — Founder, BeingEcom | Ecommerce Growth Expert" },
        { name: "description", content: "Tahir Abbas is the founder of BeingEcom, a UK ecommerce marketing agency scaling Shopify and WooCommerce brands through SEO, paid ads, CRO, email, and AI automation." },
        { property: "og:title", content: "Tahir Abbas — Founder, BeingEcom" },
        { property: "og:description", content: "Founder of BeingEcom. Ecommerce growth expert scaling Shopify and WooCommerce brands." },
        { property: "og:url", content: url },
        { property: "og:type", content: "profile" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": PERSON_ID_FOUNDER,
            name: "Tahir Abbas",
            jobTitle: "Founder & CEO",
            url,
            sameAs: [
              "https://www.linkedin.com/company/beingecom/",
            ],
            worksFor: {
              "@type": "Organization",
              name: "BeingEcom",
              url: SITE_URL,
            },
            knowsAbout: [
              "Ecommerce marketing",
              "Ecommerce SEO",
              "Shopify growth",
              "WooCommerce growth",
              "Paid advertising",
              "Conversion rate optimisation",
              "Email marketing",
              "AI automation",
            ],
            description:
              "Founder of BeingEcom, a UK ecommerce marketing agency helping Shopify and WooCommerce brands scale through SEO, paid ads, CRO, retention, analytics, and AI automation.",
          }),
        },
        { type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQS, "/about/tahir-abbas")) },
        {
          type: "application/ld+json",
          children: JSON.stringify(breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Tahir Abbas", path: "/about/tahir-abbas" },
          ])),
        },
      ],
    };
  },
  component: TahirAbbasPage,
});

function TahirAbbasPage() {
  return (
    <PageLayout>
      <section className="relative pt-20 pb-10 lg:pt-28 lg:pb-14 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="mx-auto max-w-5xl px-5 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            <Sparkles className="w-3.5 h-3.5" /> Founder profile
          </div>
          <h1 className="mt-5 text-4xl md:text-6xl font-bold leading-[1.06] text-ink">
            Tahir Abbas
          </h1>
          <p className="mt-3 text-lg text-primary font-medium">Founder & CEO, BeingEcom</p>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            Ecommerce growth operator helping Shopify and WooCommerce brands scale through SEO, paid advertising, CRO, email, and AI automation.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <AISummary eyebrow="In short">
          Tahir Abbas is the founder of BeingEcom, a UK ecommerce marketing agency scaling Shopify and WooCommerce brands. His expertise spans ecommerce SEO, paid acquisition, conversion optimisation, retention marketing, and AI automation for online stores.
        </AISummary>
      </div>

      <Section eyebrow="Background" title="Operator, not just an advisor">
        <div className="max-w-3xl mx-auto">
          <Card>
            <p className="text-ink leading-relaxed">
              Tahir has spent over a decade in ecommerce — building, scaling, and operating Shopify and WooCommerce brands. BeingEcom was founded to bring senior operator thinking to growing DTC brands: teams that have actually run stores, not just consulted on them. Today BeingEcom works with founders across the UK, US, Canada, and Australia across fashion, beauty, health, home, and electronics.
            </p>
          </Card>
        </div>
      </Section>

      <Section eyebrow="Expertise" title="Areas of focus" alt>
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {EXPERTISE.map((e, i) => (
            <div key={i} className="card-surface p-5 flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="text-ink">{e}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Philosophy" title="How Tahir thinks about ecommerce growth">
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          <Card>
            <GraduationCap className="w-6 h-6 text-primary" />
            <h3 className="mt-3 font-semibold text-ink">Systems over tactics</h3>
            <p className="mt-2 text-sm text-muted-foreground">Growth is a system — acquisition, conversion, retention, automation — not a single channel bet.</p>
          </Card>
          <Card>
            <BookOpen className="w-6 h-6 text-primary" />
            <h3 className="mt-3 font-semibold text-ink">Data before opinion</h3>
            <p className="mt-2 text-sm text-muted-foreground">Every decision starts from analytics, benchmarks, and behavioural data — not vibes.</p>
          </Card>
          <Card>
            <Award className="w-6 h-6 text-primary" />
            <h3 className="mt-3 font-semibold text-ink">Compound over quick wins</h3>
            <p className="mt-2 text-sm text-muted-foreground">SEO, brand, retention, and CRO compound. That's where the durable margin is.</p>
          </Card>
        </div>
      </Section>

      <Section eyebrow="Speaking & writing" title="Topics Tahir covers" alt>
        <ul className="max-w-3xl mx-auto grid gap-3">
          {SPEAKING_TOPICS.map((t, i) => (
            <li key={i} className="card-surface p-4 flex items-center gap-3">
              <Mic className="w-5 h-5 text-primary shrink-0" />
              <span className="text-ink">{t}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Available for podcasts, panels, and expert commentary on ecommerce, SEO, and AI. <Link to="/contact" className="text-primary underline">Get in touch</Link>.
        </p>
      </Section>

      <Section eyebrow="Elsewhere" title="Find Tahir online">
        <div className="max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-3">
          <a href="https://www.linkedin.com/company/beingecom/" target="_blank" rel="noopener noreferrer" className="btn btn-ghost inline-flex items-center gap-2">
            <Linkedin className="w-4 h-4" /> LinkedIn
          </a>
          <Link to="/founder" className="btn btn-ghost inline-flex items-center gap-2">
            Full founder page <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/blog" className="btn btn-ghost inline-flex items-center gap-2">
            Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Section>

      <FaqSection title="Frequently asked questions" faqs={FAQS} />

      <CTA
        heading="Work with Tahir & the BeingEcom team"
        sub="Book a free strategy call — we'll audit your store and map the fastest path to revenue growth."
      />
    </PageLayout>
  );
}
