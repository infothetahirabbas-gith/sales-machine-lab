import { createFileRoute, Link } from "@tanstack/react-router";
import PageLayout from "../components/site/PageLayout";
import { Section, Card, CTA } from "../components/site/Section";
import { faqJsonLd, servicesFaqs, breadcrumbJsonLd } from "../lib/seo";
import FaqSection from "../components/site/FaqSection";


export const Route = createFileRoute("/services/")({
  component: ServicesIndex,
  head: () => ({
    meta: [
      { title: "Ecommerce Services UK | SEO, Ads, CRO & Klaviyo | BeingEcom" },
      { name: "description", content: "Full-stack ecommerce services UK: SEO, Google & Meta Ads, CRO, Klaviyo email, Shopify development and analytics one senior team, one revenue P&L." },
      { property: "og:title", content: "Ecommerce Services UK | SEO, Ads, CRO & Klaviyo | BeingEcom" },
      { property: "og:description", content: "Full-stack ecommerce services UK: SEO, Google & Meta Ads, CRO, Klaviyo email, Shopify development and analytics one senior team, one revenue P&L." },
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
  // 1. Ecommerce SEO + subs
  { to: "/services/seo", title: "Ecommerce SEO", body: "Rank products & collections - free traffic forever.", tag: "Acquire" },
  { to: "/services/seo/on-page", title: "On-Page SEO", body: "Titles, schema, copy & internal links that rank.", tag: "SEO" },
  { to: "/services/seo/off-page", title: "Off-Page SEO", body: "Digital PR & editorial links that build DR.", tag: "SEO" },
  { to: "/services/seo/technical", title: "Technical SEO", body: "CWV, crawl, indexation & schema, fixed properly.", tag: "SEO" },
  { to: "/services/seo/local", title: "Local SEO", body: "GBP, city pages & reviews that win 'near me'.", tag: "SEO" },
  { to: "/services/seo/aeo", title: "AEO / AI Search", body: "Cited in ChatGPT, Perplexity & AI Overviews.", tag: "SEO" },
  { to: "/services/seo/international", title: "International SEO", body: "Scale UK brands into the US, EU & beyond.", tag: "SEO" },

  // 2. Performance Marketing + subs
  { to: "/services/performance-marketing", title: "Performance Marketing", body: "Facebook, Instagram, TikTok, Google & YouTube as one P&L.", tag: "Acquire" },
  { to: "/services/performance-marketing/facebook-ads", title: "Facebook Ads", body: "ASC+, creator UGC & CAPI-clean Meta scaling.", tag: "Ads" },
  { to: "/services/performance-marketing/instagram-ads", title: "Instagram Ads", body: "Reels-first, Stories & creator UGC that scale.", tag: "Ads" },
  { to: "/services/performance-marketing/tiktok-ads", title: "TikTok Ads", body: "Native TikTok creative built for Spark scaling.", tag: "Ads" },
  { to: "/services/performance-marketing/google-ads", title: "Google Ads", body: "Search, Shopping & PMax with true incrementality.", tag: "Ads" },
  { to: "/services/performance-marketing/youtube-ads", title: "YouTube Ads", body: "VAC, Demand Gen & Shorts for profitable video.", tag: "Ads" },
  { to: "/services/performance-marketing/media-buying", title: "Media Buying", body: "Multi-channel media buying as one revenue P&L.", tag: "Ads" },

  // 3. Store Development + subs
  { to: "/services/store-development", title: "Store Development", body: "Shopify & WooCommerce stores engineered for conversion.", tag: "Build" },
  { to: "/services/store-development/shopify", title: "Shopify Store Development", body: "Shopify & Shopify Plus stores built to sell.", tag: "Build" },
  { to: "/services/store-development/woocommerce", title: "WooCommerce Store Development", body: "Fast, lean WordPress + Woo stores that scale.", tag: "Build" },

  // 4-7
  { to: "/services/cro", title: "Conversion Rate Optimisation", body: "Turn existing traffic into 2-3× more sales.", tag: "Optimise" },
  { to: "/services/creative", title: "Creative Production", body: "Scroll-stopping creatives that actually sell.", tag: "Create" },
  { to: "/services/email-sms", title: "Email Marketing Automation", body: "Recover lost sales. Multiply repeat customers.", tag: "Retain" },
  { to: "/services/ai-automation", title: "AI Automation", body: "AI agents & workflows that compound margin.", tag: "Automate" },
  { to: "/services/funnel", title: "Funnel & Landing Pages", body: "High-converting funnels for launches and offers.", tag: "Convert" },
  { to: "/services/analytics", title: "Analytics & Tracking", body: "GA4, Pixel, CAPI and dashboards - set up correctly.", tag: "Measure" },
  { to: "/services/scaling", title: "Scaling & Retention", body: "Systems to scale from 6 to 7 figures and keep customers.", tag: "Scale" },
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
        title="Services -"
        highlight="common questions"
        intro="Quick answers about how engagements work."
      />
    </PageLayout>

  );
}
