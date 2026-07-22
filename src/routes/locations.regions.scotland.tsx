import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, ArrowRight } from "lucide-react";
import PageLayout from "../components/site/PageLayout";
import { Section, SplitHeading } from "../components/site/Section";
import { LOCATIONS } from "../lib/locations-industries";
import { SITE_URL, breadcrumbJsonLd } from "../lib/seo";

const REGION = "Scotland";
const URL = `${SITE_URL}/locations/regions/scotland`;
const TITLE = "Scotland Ecommerce Agency | Shopify Growth, Paid Ads & SEO | Being Ecom";
const DESC = "UK ecommerce agency for Scottish DTC and Shopify brands. Serving Glasgow, Edinburgh and Scotland-wide with performance marketing, CRO and retention.";

export const Route = createFileRoute("/locations/regions/scotland")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:locale", content: "en_GB" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify(breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Locations", path: "/locations" },
        { name: "Scotland", path: "/locations/regions/scotland" },
      ])),
    }],
  }),
  component: ScotlandHub,
});

function ScotlandHub() {
  const cities = LOCATIONS.filter((l) => l.region === REGION);
  return (
    <PageLayout>
      <section className="relative pt-24 pb-16 lg:pt-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
            <MapPin className="size-3.5" /> Scotland
          </div>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-[1.05] text-ink max-w-3xl">
            <SplitHeading value="Ecommerce growth for Scottish DTC brands" />
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Being Ecom is a UK ecommerce agency partnering with Shopify and DTC brands across Scotland - from Glasgow's fast-scaling apparel and beauty operators to Edinburgh's premium and craft brands. We install a full growth engine: paid media, CRO, retention and analytics, run by senior UK operators.
          </p>
          <p className="mt-4 text-base text-muted-foreground max-w-2xl">
            Scottish ecommerce brands face specific realities: split UK/EU shipping economics, higher creative production costs outside London, and a strong local-brand affinity that rewards founder-led storytelling. Our team accounts for all of it - and every engagement is UK-VAT priced in GBP, with contracts governed by UK law.
          </p>
        </div>
      </section>

      <Section title="Cities we serve in Scotland" alt>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cities.map((l) => (
            <Link key={l.slug} to="/locations/$slug" params={{ slug: l.slug }} className="group card-surface card-hover p-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <MapPin className="size-5" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-ink">{l.city}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{l.region}</p>
              <p className="text-sm text-muted-foreground mt-3 line-clamp-3">{l.intro}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-sm text-primary font-semibold">
                Explore {l.city} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="How we work with Scottish brands">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card-surface p-6">
            <h3 className="text-lg font-bold text-ink">Paid media tuned for UK-first buyers</h3>
            <p className="mt-2 text-sm text-muted-foreground">Meta, Google Shopping and TikTok campaigns structured around Scottish shipping economics, GBP LTV benchmarks and UK creative that outperforms US-imported templates.</p>
          </div>
          <div className="card-surface p-6">
            <h3 className="text-lg font-bold text-ink">CRO for higher AOV</h3>
            <p className="mt-2 text-sm text-muted-foreground">Shopify build and CRO focused on lifting AOV - critical for Scottish brands where fulfilment and returns cost more than London-centric benchmarks assume.</p>
          </div>
          <div className="card-surface p-6">
            <h3 className="text-lg font-bold text-ink">Retention that compounds</h3>
            <p className="mt-2 text-sm text-muted-foreground">Klaviyo lifecycle and SMS flows built for repeat-purchase economics - because acquiring Scottish customers profitably means owning the second and third order.</p>
          </div>
          <div className="card-surface p-6">
            <h3 className="text-lg font-bold text-ink">One senior team, no juniors</h3>
            <p className="mt-2 text-sm text-muted-foreground">Every account is run by senior operators. No account-manager relay, no offshore hand-offs - just a small UK team responsible for revenue and margin.</p>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
