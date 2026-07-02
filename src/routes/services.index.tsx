import { createFileRoute, Link } from "@tanstack/react-router";
import PageLayout from "../components/site/PageLayout";
import { Section, Card, CTA } from "../components/site/Section";
import { faqJsonLd, servicesFaqs, breadcrumbJsonLd } from "../lib/seo";
import FaqSection from "../components/site/FaqSection";


export const Route = createFileRoute("/services/")({
  component: ServicesIndex,
  head: () => ({
    meta: [
      { title: "Ecommerce Services UK — Shopify & WooCommerce Growth | BeingEcom" },
      { name: "description", content: "Full-stack ecommerce services in the UK: SEO, paid ads, CRO, email, analytics and Shopify development. One senior team, one revenue P&L." },
      { name: "keywords", content: "ecommerce services uk, shopify services uk, woocommerce services uk, ecommerce marketing services, ecommerce agency services london, shopify plus services, ecommerce cro services, ecommerce seo services uk, ecommerce ppc services, klaviyo email marketing services, ecommerce analytics services, ecommerce funnel services, dtc growth services, ecommerce consultancy uk, best ecommerce services uk" },
      { property: "og:title", content: "Ecommerce Services UK — Shopify & WooCommerce Growth | BeingEcom" },
      { property: "og:description", content: "Full-stack ecommerce services in the UK: SEO, paid ads, CRO, email, analytics and Shopify development. One senior team, one revenue P&L." },
      { property: "og:url", content: "https://beingecom.com/services" },
    ],
    links: [{ rel: "canonical", href: "https://beingecom.com/services" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(servicesFaqs, "/services")) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])) },
    ],
  }),
});


const all = [
  { to: "/services/seo", title: "Ecommerce SEO", body: "Rank products & collections - free traffic forever.", tag: "Acquire" },
  { to: "/services/performance-marketing", title: "Performance Marketing", body: "Facebook, Google, TikTok & media buying as one P&L.", tag: "Acquire" },
  { to: "/services/creative", title: "Creative Testing", body: "Scroll-stopping creatives that actually sell.", tag: "Create" },
  { to: "/services/cro", title: "Conversion Rate Optimisation", body: "Turn existing traffic into 2-3× more sales.", tag: "Optimise" },
  { to: "/services/email-sms", title: "Email Marketing", body: "Recover lost sales. Multiply repeat customers.", tag: "Retain" },
  { to: "/services/store-development", title: "Store Development", body: "Shopify & WooCommerce stores engineered for conversion.", tag: "Build" },
  { to: "/services/ai-automation", title: "AI Automation", body: "AI agents & workflows that compound margin.", tag: "Automate" },
  { to: "/services/paid-ads", title: "Paid Advertising (Overview)", body: "Meta, Google & TikTok ads built to scale profitably.", tag: "Acquire" },
  { to: "/services/scaling", title: "Scaling & Revenue Strategy", body: "Scale beyond £10K-£100K/month, profitably.", tag: "Scale" },
  { to: "/services/analytics", title: "Analytics & Tracking", body: "Track every sale, click, and behavior.", tag: "Measure" },
  { to: "/services/funnel", title: "Funnel & Journey Optimisation", body: "Turn visitors into buyers automatically.", tag: "Optimise" },
];

function ServicesIndex() {
  return (
    <PageLayout>
      <section className="relative pt-20 pb-12 lg:pt-28 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 relative">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">Services</div>
          <h1 className="mt-4 text-4xl md:text-6xl font-bold max-w-3xl leading-[1.04]">
            A <span className="text-gradient">complete ecommerce growth system</span> - not 9 random services.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
            Each module fixes a specific revenue leak. Together they compound into a sales-machine for Shopify and WooCommerce brands.
          </p>
        </div>
      </section>

      <Section eyebrow="Categories" title="Build · Acquire · Convert · Retain · Scale">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {all.map((s) => (
            <Link key={s.to} to={s.to}>
              <Card className="h-full">
                <div className="text-xs font-semibold uppercase tracking-widest text-accent">{s.tag}</div>
                <h3 className="mt-3 font-semibold text-lg">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{s.body}</p>
                <div className="mt-4 text-sm font-semibold text-primary">Explore →</div>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Approach" title="No fixed pricing. Custom scaling plans.">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { t: "Starter", b: "Store fix, CRO sprint, foundations." },
            { t: "Growth", b: "Ads + CRO + Email systems running together." },
            { t: "Scale", b: "Full operating system, multi-channel, retention." },
          ].map((p) => (
            <Card key={p.t}>
              <h3 className="font-semibold text-lg">{p.t}</h3>
              <p className="text-sm text-muted-foreground mt-1">{p.b}</p>
              <Link to="/contact" className="mt-4 inline-block text-primary font-semibold text-sm">Discuss scope →</Link>
            </Card>
          ))}
        </div>
      </Section>

      <CTA />

      <FaqSection
        faqs={servicesFaqs}
        title="Services —"
        highlight="common questions"
        intro="Quick answers about how engagements work."
      />
    </PageLayout>

  );
}
