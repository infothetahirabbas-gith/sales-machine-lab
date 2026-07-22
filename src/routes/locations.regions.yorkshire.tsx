import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, ArrowRight } from "lucide-react";
import PageLayout from "../components/site/PageLayout";
import { Section, SplitHeading } from "../components/site/Section";
import { LOCATIONS } from "../lib/locations-industries";
import { SITE_URL, breadcrumbJsonLd } from "../lib/seo";

const URL = `${SITE_URL}/locations/regions/yorkshire`;
const TITLE = "Yorkshire Ecommerce Agency | Leeds, Sheffield & Bradford | Being Ecom";
const DESC = "UK ecommerce growth agency for Yorkshire Shopify and DTC brands. Serving Leeds, Sheffield, Bradford and Yorkshire-wide with paid ads, CRO and SEO.";

export const Route = createFileRoute("/locations/regions/yorkshire")({
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
        { name: "Yorkshire", path: "/locations/regions/yorkshire" },
      ])),
    }],
  }),
  component: YorkshireHub,
});

function YorkshireHub() {
  const cities = LOCATIONS.filter((l) => l.region.includes("Yorkshire"));
  return (
    <PageLayout>
      <section className="relative pt-24 pb-16 lg:pt-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
            <MapPin className="size-3.5" /> Yorkshire
          </div>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-[1.05] text-ink max-w-3xl">
            <SplitHeading value="Ecommerce growth for Yorkshire DTC brands" />
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Being Ecom partners with Shopify and DTC operators across Yorkshire - Leeds' fast-growing TikTok Shop and apparel scene, Sheffield's manufacturing-led brands, and Bradford's textile and lifestyle sellers. One senior UK team, one growth system, priced in GBP.
          </p>
          <p className="mt-4 text-base text-muted-foreground max-w-2xl">
            Yorkshire ecommerce sits at the centre of UK fulfilment (M1/M62 corridor), which changes the maths on shipping thresholds, free-delivery offers and returns policy. Our media buying, CRO and retention work are all tuned to those local economics - not London defaults imported wholesale.
          </p>
        </div>
      </section>

      <Section title="Cities we serve in Yorkshire" alt>
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

      <Section title="How we work with Yorkshire brands">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card-surface p-6">
            <h3 className="text-lg font-bold text-ink">Paid social + TikTok Shop</h3>
            <p className="mt-2 text-sm text-muted-foreground">Leeds is one of the densest TikTok Shop markets in the UK. We run creator-led paid and TikTok Shop campaigns with UK creative that ships in days, not weeks.</p>
          </div>
          <div className="card-surface p-6">
            <h3 className="text-lg font-bold text-ink">CRO for AOV and margin</h3>
            <p className="mt-2 text-sm text-muted-foreground">Yorkshire brands often win on price-per-unit but lose margin at checkout. Our CRO focus is thresholds, bundles and post-purchase upsell - lifting AOV without hurting conversion.</p>
          </div>
          <div className="card-surface p-6">
            <h3 className="text-lg font-bold text-ink">Fulfilment-aware campaigns</h3>
            <p className="mt-2 text-sm text-muted-foreground">Sitting on the M1/M62 corridor means most Yorkshire brands can hit next-day UK-wide. We build that promise into ad creative and landing pages so it actually lifts conversion.</p>
          </div>
          <div className="card-surface p-6">
            <h3 className="text-lg font-bold text-ink">Retention flows in Klaviyo</h3>
            <p className="mt-2 text-sm text-muted-foreground">Lifecycle, winback and VIP flows that make the second and third order the profitable one - critical when acquisition CPMs keep rising.</p>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
