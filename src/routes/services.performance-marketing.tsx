import { createFileRoute, Link } from "@tanstack/react-router";
import PageLayout from "../components/site/PageLayout";
import { Section, Card, CTA } from "../components/site/Section";
import { serviceJsonLd, breadcrumbJsonLd } from "../lib/seo";

export const Route = createFileRoute("/services/performance-marketing")({
  head: () => ({
    meta: [
      { title: "Performance Marketing Agency UK — Full-Funnel Paid Media | BeingEcom" },
      { name: "description", content: "UK performance marketing agency for ecommerce. Blended-ROAS media buying across Meta, Google, TikTok and programmatic — engineered for MER, LTV and profitable growth." },
      { property: "og:title", content: "Performance Marketing Agency UK — Full-Funnel Paid Media | BeingEcom" },
      { property: "og:description", content: "UK performance marketing agency for ecommerce. Blended-ROAS media buying across Meta, Google, TikTok and programmatic — engineered for MER, LTV and profitable growth." },
      { property: "og:url", content: "https://beingecom.com/services/performance-marketing" },
    ],
    links: [{ rel: "canonical", href: "https://beingecom.com/services/performance-marketing" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({ slug: "performance-marketing", name: "Performance Marketing", description: "Facebook, Google, TikTok ads and media buying for ecommerce brands." })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Performance Marketing", path: "/services/performance-marketing" }])) },
    ],
  }),
  component: PerformanceMarketingIndex,
});

const channels = [
  { to: "/services/performance-marketing/facebook-ads", title: "Facebook Ads", body: "Meta & Instagram ads built on creative volume, ASC+ scaling and break-even math.", tag: "Meta" },
  { to: "/services/performance-marketing/google-ads", title: "Google Ads", body: "Search, Shopping, Performance Max and brand defence engineered for intent capture.", tag: "Google" },
  { to: "/services/performance-marketing/tiktok-ads", title: "TikTok Ads", body: "Native UGC, Spark Ads and hook-first scripting that drives top-funnel virality.", tag: "TikTok" },
  { to: "/services/performance-marketing/media-buying", title: "Media Buying", body: "Cross-channel media buying, blended ROAS targets and full-funnel budget allocation.", tag: "Strategy" },
];

function PerformanceMarketingIndex() {
  return (
    <PageLayout>
      <section className="relative pt-20 pb-12 lg:pt-28 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 relative">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">Performance Marketing</div>
          <h1 className="mt-4 text-4xl md:text-6xl font-bold max-w-3xl leading-[1.04]">
            <span className="text-gradient">Performance marketing</span> built for profitable ecommerce scale.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
            Facebook Ads, Google Ads, TikTok Ads and full-funnel media buying — one team, one operating system, one P&L.
          </p>
        </div>
      </section>

      <Section eyebrow="Channels" title="Pick a channel or run the full stack.">
        <div className="grid md:grid-cols-2 gap-4">
          {channels.map((s) => (
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

      <CTA />
    </PageLayout>
  );
}
