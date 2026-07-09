import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, ArrowRight } from "lucide-react";
import PageLayout from "../components/site/PageLayout";
import { Section, SplitHeading } from "../components/site/Section";
import { LOCATIONS } from "../lib/locations-industries";
import { breadcrumbJsonLd } from "../lib/seo";

export const Route = createFileRoute("/locations/")({
  head: () => ({
    meta: [
      { title: "UK Ecommerce Agency Locations | Being Ecom" },
      { name: "description", content: "Being Ecom serves UK ecommerce brands across London, Manchester, Birmingham, Leeds, Bristol, Liverpool, Glasgow and Edinburgh." },
      { property: "og:title", content: "UK Ecommerce Agency Locations | Being Ecom" },
      { property: "og:description", content: "Ecommerce growth agency serving UK cities. Performance marketing, CRO, SEO and retention for DTC brands." },
      { property: "og:url", content: "https://beingecom.com/locations" },
    ],
    links: [{ rel: "canonical", href: "https://beingecom.com/locations" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Locations", path: "/locations" }])) },
    ],
  }),
  component: LocationsIndex,
});

function LocationsIndex() {
  return (
    <PageLayout>
      <section className="relative pt-24 pb-16 lg:pt-32 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
            <MapPin className="size-3.5" /> UK-wide
          </div>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-[1.05] text-ink max-w-3xl">
            <SplitHeading value="Ecommerce growth, everywhere in the UK" />
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            We work with UK DTC and Shopify brands across every major city - London to Edinburgh - with a fully remote, senior operator team.
          </p>
        </div>
      </section>

      <Section title="Find your city" alt>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {LOCATIONS.map((l) => (
            <Link key={l.slug} to="/locations/$slug" params={{ slug: l.slug }} className="group card-surface card-hover p-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <MapPin className="size-5" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-ink">{l.city}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{l.region}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-sm text-primary font-semibold">
                Explore <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </PageLayout>
  );
}
