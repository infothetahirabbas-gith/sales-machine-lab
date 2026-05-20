import { createFileRoute, Link } from "@tanstack/react-router";
import PageLayout from "../components/site/PageLayout";
import { Section, Card, CTA } from "../components/site/Section";
import { faqJsonLd, servicesFaqs } from "../lib/seo";

export const Route = createFileRoute("/services/")({
  component: ServicesIndex,
  head: () => ({
    meta: [
      { title: "Ecommerce Services — Shopify & WooCommerce Growth | BeingEcom" },
      { name: "description", content: "Nine ecommerce growth services in one operating system: store development, CRO, paid ads, SEO, email automation, creative, funnels, analytics and scaling." },
      { name: "keywords", content: "ecommerce services, Shopify services, WooCommerce services, ecommerce CRO, Shopify SEO, ecommerce paid ads, Klaviyo email marketing, ecommerce funnel, ecommerce analytics" },
      { property: "og:title", content: "Ecommerce Growth Services — Shopify & WooCommerce" },
      { property: "og:description", content: "Nine growth services, one operating system for Shopify & WooCommerce brands." },
      { property: "og:url", content: "https://sales-machine-lab.lovable.app/services" },
    ],
    links: [{ rel: "canonical", href: "https://sales-machine-lab.lovable.app/services" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(servicesFaqs)) },
    ],
  }),
});


const all = [
  { to: "/services/store-development", title: "Ecommerce Store Development", body: "Shopify & WooCommerce stores engineered for conversion.", tag: "Build" },
  { to: "/services/cro", title: "Conversion Rate Optimization", body: "Turn existing traffic into 2-3× more sales.", tag: "Optimize" },
  { to: "/services/paid-ads", title: "Paid Advertising", body: "Meta, Google & TikTok ads built to scale profitably.", tag: "Acquire" },
  { to: "/services/seo", title: "Ecommerce SEO", body: "Rank products & collections - free traffic forever.", tag: "Acquire" },
  { to: "/services/email-sms", title: "Email Marketing Automation", body: "Recover lost sales. Multiply repeat customers.", tag: "Retain" },
  { to: "/services/creative", title: "Creative & Ad Production", body: "Scroll-stopping creatives that actually sell.", tag: "Create" },
  { to: "/services/scaling", title: "Scaling & Revenue Strategy", body: "Scale beyond $10K-$100K/month, profitably.", tag: "Scale" },
  { to: "/services/analytics", title: "Analytics & Tracking", body: "Track every sale, click, and behavior.", tag: "Measure" },
  { to: "/services/funnel", title: "Funnel & Journey Optimization", body: "Turn visitors into buyers automatically.", tag: "Optimize" },
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
    </PageLayout>
  );
}
