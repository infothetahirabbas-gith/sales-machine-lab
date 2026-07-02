import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import PageLayout from "../components/site/PageLayout";
import { Section } from "../components/site/Section";
import { LOCATIONS, INDUSTRIES } from "../lib/locations-industries";

const SERVICE_MAP: Record<string, { name: string; blurb: string; route: string }> = {
  "seo": { name: "Ecommerce SEO", blurb: "Rank products & collections on Google and AI search — free traffic that compounds.", route: "/services/seo" },
  "performance-marketing": { name: "Performance Marketing", blurb: "Meta, Google & TikTok ads built to scale profitably.", route: "/services/performance-marketing" },
  "cro": { name: "Conversion Rate Optimisation", blurb: "Turn existing traffic into 2-3× more sales.", route: "/services/cro" },
  "email-sms": { name: "Email & SMS Marketing", blurb: "Recover lost sales. Multiply repeat customers.", route: "/services/email-sms" },
  "store-development": { name: "Store Development", blurb: "Shopify & WooCommerce stores engineered for conversion.", route: "/services/store-development" },
  "creative": { name: "Creative Production", blurb: "Scroll-stopping ad creatives that actually sell.", route: "/services/creative" },
  "ai-automation": { name: "AI Automation", blurb: "AI-powered workflows that save 40+ hours a week.", route: "/services/ai-automation" },
};

const LANG_LABEL: Record<string, string> = {
  "en": "English", "en-gb": "English (UK)", "es": "Español", "fr": "Français", "de": "Deutsch", "ar": "العربية",
};

export const Route = createFileRoute("/$lang/$location/$industry/$service")({
  loader: ({ params }) => {
    const loc = LOCATIONS.find((l) => l.slug === params.location);
    const ind = INDUSTRIES.find((i) => i.slug === params.industry);
    const svc = SERVICE_MAP[params.service];
    const lang = LANG_LABEL[params.lang];
    if (!loc || !ind || !svc || !lang) throw notFound();
    return { loc, ind, svc, lang };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const { loc, ind, svc } = loaderData;
    const title = `${svc.name} for ${ind.name} Brands in ${loc.city} | BeingEcom`;
    const desc = `${svc.blurb} Trusted by ${ind.name.toLowerCase()} DTC brands across ${loc.city} and ${loc.region}.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: PersonalisedPage,
  notFoundComponent: NotFoundView,
});

function PersonalisedPage() {
  const { loc, ind, svc, lang } = Route.useLoaderData();
  const { location, industry, service } = Route.useParams();

  return (
    <PageLayout>
      <Section>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            Personalised for you · {lang}
          </div>
          <h1 className="mt-5 text-4xl md:text-6xl font-bold leading-[1.05] text-ink">
            {svc.name} for <span className="text-brand">{ind.name}</span> Brands in {loc.city}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            {svc.blurb} {loc.intro}
          </p>
          <div className="mt-8 btn-pair">
            <Link to="/contact" className="btn btn-primary btn-shimmer">Book Strategy Call →</Link>
            <Link to={svc.route} className="btn btn-ghost btn-shimmer">Explore {svc.name} →</Link>
          </div>
        </div>
      </Section>

      <Section alt>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-ink">Why {loc.city}-based {ind.name} brands choose us</h2>
            <ul className="mt-4 space-y-2">
              {ind.highlights.map((h: string) => (
                <li key={h} className="flex gap-2 text-sm"><span className="text-primary">✓</span>{h}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-ink">Local advantage in {loc.region}</h2>
            <ul className="mt-4 space-y-2">
              {loc.highlights.map((h: string) => (
                <li key={h} className="flex gap-2 text-sm"><span className="text-primary">✓</span>{h}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-ink">Explore more</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm">
            <Link to="/locations/$slug" params={{ slug: location }} className="px-3 py-1.5 rounded-full border border-border hover:border-primary transition">📍 {loc.city}</Link>
            <Link to="/industries/$slug" params={{ slug: industry }} className="px-3 py-1.5 rounded-full border border-border hover:border-primary transition">🏭 {ind.name}</Link>
            <Link to={svc.route} className="px-3 py-1.5 rounded-full border border-border hover:border-primary transition">✨ {svc.name}</Link>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}

function NotFoundView() {
  return (
    <PageLayout>
      <Section>
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-ink">Combination not available</h1>
          <p className="mt-3 text-muted-foreground">That location, industry, or service isn't set up yet.</p>
          <Link to="/" className="btn btn-primary mt-6">← Back home</Link>
        </div>
      </Section>
    </PageLayout>
  );
}
