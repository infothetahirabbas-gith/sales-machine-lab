import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, ArrowRight } from "lucide-react";
import PageLayout from "../components/site/PageLayout";
import { Section, SplitHeading, CTA } from "../components/site/Section";
import { LOCATIONS } from "../lib/locations-industries";
import { breadcrumbJsonLd, faqJsonLd, SITE_URL } from "../lib/seo";
import EditorialBlock from "../components/site/EditorialBlock";
import FaqSection from "../components/site/FaqSection";
import { LOCATIONS_EDITORIAL, LOCATIONS_FAQS } from "../lib/index-editorial";

export const Route = createFileRoute("/locations/")({
  head: () => ({
    meta: [
      { title: "UK Ecommerce Agency Locations & Cities | BeingEcom" },
      { name: "description", content: "BeingEcom serves Shopify and WooCommerce brands across London, Manchester, Birmingham, Leeds, Bristol, Liverpool, Glasgow, Edinburgh and every UK city." },
      { property: "og:title", content: "UK Ecommerce Agency Locations | Being Ecom" },
      { property: "og:description", content: "Ecommerce growth agency serving UK cities. Performance marketing, CRO, SEO and retention for DTC brands." },
      { property: "og:url", content: "https://beingecom.com/locations" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large" },
    ],
    links: [{ rel: "canonical", href: "https://beingecom.com/locations" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Locations", path: "/locations" }])) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(LOCATIONS_FAQS, "/locations")) },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${SITE_URL}/locations#collection`,
          name: "BeingEcom UK ecommerce agency locations",
          url: `${SITE_URL}/locations`,
          about: "UK cities served by BeingEcom's ecommerce growth team",
          hasPart: LOCATIONS.map((l) => ({
            "@type": "WebPage",
            name: `Ecommerce agency in ${l.city}`,
            url: `${SITE_URL}/locations/${l.slug}`,
            description: `Ecommerce growth support for Shopify and WooCommerce brands in ${l.city}, ${l.region}.`,
          })),
        }),
      },
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

      <Section title="Regional hubs">
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <Link to="/locations/regions/scotland" className="group card-surface card-hover p-5">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center"><MapPin className="size-5" /></div>
            <h3 className="mt-4 text-lg font-bold text-ink">Scotland</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Glasgow, Edinburgh</p>
            <div className="mt-4 inline-flex items-center gap-1 text-sm text-primary font-semibold">Explore Scotland <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></div>
          </Link>
          <Link to="/locations/regions/yorkshire" className="group card-surface card-hover p-5">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center"><MapPin className="size-5" /></div>
            <h3 className="mt-4 text-lg font-bold text-ink">Yorkshire</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Leeds, Sheffield, Bradford</p>
            <div className="mt-4 inline-flex items-center gap-1 text-sm text-primary font-semibold">Explore Yorkshire <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></div>
          </Link>
        </div>
      </Section>

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

      <EditorialBlock editorial={LOCATIONS_EDITORIAL} />
      <FaqSection
        faqs={LOCATIONS_FAQS}
        title="UK locations"
        highlight="FAQs"
        intro="Where we're based, how remote delivery works, and when local SEO is worth funding."
      />
      <CTA
        heading="Wherever you trade, we can help"
        sub="Book a free ecommerce audit and we'll show you the fastest revenue wins in your market."
      />
    </PageLayout>
  );
}
