import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowRight, MapPin, CheckCircle2, TrendingUp, Target, Zap, Users,
  BarChart3, Rocket, ShieldCheck, Sparkles, Clock, Award,
  Phone, Calendar, LineChart, ShoppingBag, Search, Megaphone,
  Layers, PieChart, Globe2, Handshake, Play, MessageCircle, AlertTriangle,
} from "lucide-react";
import PageLayout from "../components/site/PageLayout";
import { Section, SplitHeading, Card, Pill, NumberedList, CTA } from "../components/site/Section";
import { Reveal } from "../hooks/useReveal";
import CountUp from "../components/site/CountUp";
import FaqSection from "../components/site/FaqSection";
import { LOCATIONS } from "../lib/locations-industries";
import { contentFor, imageAlt, imageSeoProps, IMAGE_SLOT_LABELS, LOCATION_GEO, whatsappUrl, narrativeFor } from "../lib/location-content";
import { EXTRA_NARRATIVES } from "../lib/location-narratives-extra";
import { breadcrumbJsonLd, SITE_URL } from "../lib/seo";
import type { FAQ } from "../lib/seo";
import { PRICING_TIERS } from "../lib/pricing";
import { SafeImg } from "../components/SafeImg";
import AISummary from "../components/site/AISummary";
import { metaFor, variantForSlug } from "../lib/location-seo-meta";
import { trackEvent } from "../lib/analytics";
import { buildLocationLink, withLocationUtm, stashLocationAttribution, type LocationCtx } from "../lib/location-attribution";
import { nearbySlugs } from "../lib/uk-geo";
import { guideFor, UK_ECOM_PAIN_POINTS, UK_SHARED_PAA, PAIN_SOURCES } from "../lib/location-local-guide";

// Colored partner/brand logos for the running trust bar
const ShopifyIcon = () => (
  <svg viewBox="0 0 32 32" className="w-6 h-6 shrink-0" aria-hidden="true">
    <path fill="#95BF47" d="M22.6 6.4c0-.2-.2-.3-.4-.3-.1 0-2 0-2 0s-1.6-1.5-1.7-1.7c-.2-.2-.5-.1-.7-.1 0 0-.3.1-.8.3-.5-1.5-1.4-2.9-3-2.9h-.1c-.5-.6-1-.8-1.5-.8-3.8.1-5.6 4.8-6.2 7.2-1.5.4-2.5.8-2.7.8-.8.3-.8.3-.9 1.1-.1.6-2.2 16.9-2.2 16.9L17 30l9.4-2s-3.7-21.4-3.8-21.6zM16.4 4.6c-.4.1-.8.3-1.3.4v-.3c0-.9-.1-1.7-.3-2.3.9.1 1.4 1.1 1.6 2.2zm-2.2-2c.3.6.4 1.5.4 2.7v.2c-.9.3-1.8.6-2.7.8.5-2 1.5-2.9 2.3-3.7zm-.9-.8c.2 0 .3.1.5.2-1.1.5-2.2 1.8-2.7 4.3-.7.2-1.4.4-2.1.7.6-2.2 2.1-5.2 4.3-5.2z"/>
    <path fill="#5E8E3E" d="M22.2 6.1c-.1 0-2 0-2 0s-1.6-1.5-1.7-1.7c-.1-.1-.1-.1-.2-.1L17 30l9.4-2S22.6 6.4 22.6 6.4c0-.2-.2-.3-.4-.3z"/>
    <path fill="#FFF" d="m13.6 11.3-1.2 3.5s-1-.5-2.3-.5c-1.8 0-1.9 1.2-1.9 1.5 0 1.6 4.3 2.3 4.3 6.1 0 3-1.9 5-4.5 5-3.1 0-4.6-1.9-4.6-1.9l.8-2.8s1.6 1.4 2.9 1.4c.9 0 1.2-.7 1.2-1.2 0-2.1-3.5-2.2-3.5-5.7 0-2.9 2.1-5.8 6.4-5.8 1.6 0 2.4.4 2.4.4z"/>
  </svg>
);
const KlaviyoIcon = () => (
  <svg viewBox="0 0 32 32" className="w-6 h-6 shrink-0" aria-hidden="true">
    <path fill="#232426" d="M2 8.9 15.3 2c.4-.2.9-.2 1.3 0L30 8.9c-1.4 8.7-6.6 17-14 21.1C8.6 25.9 3.4 17.6 2 8.9z"/>
    <path fill="#FFB800" d="M16 24c-2.8 0-5.4-1.1-7.4-2.9 2-2.3 4.6-3.6 7.4-3.6 2.8 0 5.4 1.3 7.4 3.6-2 1.8-4.6 2.9-7.4 2.9zm0-9.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"/>
  </svg>
);
const MetaIcon = () => (
  <svg viewBox="0 0 32 32" className="w-7 h-7 shrink-0" aria-hidden="true">
    <defs><linearGradient id="mg" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#0064E1"/><stop offset=".5" stopColor="#0064E1"/><stop offset="1" stopColor="#0082FB"/></linearGradient></defs>
    <path fill="url(#mg)" d="M6.4 18.3c0 1.4.3 2.5.7 3.1.6.8 1.4 1.2 2.5 1.2 1.3 0 2.5-.3 4.8-3.5 1.8-2.6 4-6.3 5.4-8.6l2.5-3.9c1.7-2.6 3.6-5.5 5.9-5.5 1.8 0 3.5 1 4.9 3.4 1.4 2.5 2.2 5.7 2.2 9 0 2-.4 3.4-1.1 4.5-.7 1.1-1.9 2.1-4 2.1v-3.2c1.8 0 2.3-1.7 2.3-3.6 0-2.7-.6-5.7-2-7.9-1-1.5-2.2-2.4-3.6-2.4-1.5 0-2.6 1.1-4 3.1-.7 1-1.5 2.3-2.3 3.8l-1.5 2.5c-3 5.2-3.8 6.4-5.3 8.4-2.7 3.5-5 4.2-8 4.2-2.1 0-3.9-.9-5.1-2.6-1.1-1.4-1.6-3.2-1.6-5.3z" transform="scale(0.75) translate(0 2)"/>
  </svg>
);
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" aria-hidden="true">
    <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.7-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8z"/>
    <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1C3.4 21.5 7.4 24 12 24z"/>
    <path fill="#FBBC05" d="M5.4 14.4c-.2-.7-.4-1.4-.4-2.4s.1-1.6.4-2.4V6.5H1.4C.5 8.2 0 10 0 12s.5 3.8 1.4 5.5l4-3.1z"/>
    <path fill="#EA4335" d="M12 4.8c1.8 0 3.4.6 4.6 1.8l3.4-3.4C17.9 1.2 15.2 0 12 0 7.4 0 3.4 2.5 1.4 6.5l4 3.1C6.3 6.8 8.9 4.8 12 4.8z"/>
  </svg>
);
const TikTokIcon = () => (
  <svg viewBox="0 0 32 32" className="w-6 h-6 shrink-0" aria-hidden="true">
    <path fill="#25F4EE" d="M22.4 10.4c1.9 1.4 4.3 2.2 6.9 2.2V7.5c-.5 0-1 0-1.4-.1v4c-2.6 0-5-.8-6.9-2.2v10.3c0 5.2-4.2 9.4-9.4 9.4-1.9 0-3.7-.6-5.2-1.5C7.9 29 10.1 30 12.5 30c5.2 0 9.4-4.2 9.4-9.4V10.4zM24 5.7c-1-1.1-1.6-2.5-1.7-4.1v-.7H21c.4 2 1.5 3.7 3 4.8zm-13.9 19c-.5-.7-.8-1.6-.8-2.5 0-2.3 1.9-4.1 4.1-4.1.4 0 .8.1 1.2.2v-5.4c-.5-.1-.9-.1-1.4-.1v4.1c-.4-.1-.8-.2-1.2-.2-2.3 0-4.1 1.9-4.1 4.1 0 1.7 1 3.1 2.2 3.9z"/>
    <path fill="#FE2C55" d="M21 9.2c1.9 1.4 4.3 2.2 6.9 2.2v-4c-1.4-.3-2.7-1.1-3.7-2.1-1.5-1.1-2.6-2.8-3-4.8h-3.7v20.1c0 2.3-1.9 4.1-4.1 4.1-1.4 0-2.6-.7-3.4-1.7-1.3-.7-2.2-2.2-2.2-3.9 0-2.3 1.9-4.1 4.1-4.1.4 0 .8.1 1.2.2v-4.1c-5.1.1-9.2 4.3-9.2 9.4 0 2.6 1 4.9 2.7 6.6 1.5 1 3.3 1.5 5.2 1.5 5.2 0 9.4-4.2 9.4-9.4V9.2z"/>
    <path fill="#000" d="M27.9 7.4v-1.1c-1.3 0-2.5-.4-3.6-1 .9 1.1 2.2 1.8 3.6 2.1zm-6.6-6.9v-1H16v20.1c0 2.3-1.9 4.1-4.1 4.1-.7 0-1.3-.2-1.9-.5.8 1 2.1 1.7 3.4 1.7 2.3 0 4.1-1.9 4.1-4.1V.5h3.8zm-9.2 10.8v-1.2c-.4-.1-.9-.1-1.4-.1-5.1 0-9.2 4.2-9.2 9.4 0 3.2 1.6 6 4.1 7.7-1.6-1.7-2.7-4-2.7-6.6.1-5.1 4.2-9.2 9.2-9.2z"/>
  </svg>
);
const GA4Icon = () => (
  <svg viewBox="0 0 32 32" className="w-6 h-6 shrink-0" aria-hidden="true">
    <path fill="#F9AB00" d="M22 6c0-2.2 1.8-4 4-4s4 1.8 4 4v20c0 2.2-1.8 4-4 4s-4-1.8-4-4V6z"/>
    <path fill="#E37400" d="M12 16a4 4 0 1 1 8 0v10a4 4 0 1 1-8 0V16z"/>
    <circle fill="#E37400" cx="6" cy="26" r="4"/>
  </svg>
);

const TRUST_LOGOS = [
  { name: "Shopify Plus",    Icon: ShopifyIcon },
  { name: "Klaviyo",         Icon: KlaviyoIcon },
  { name: "Meta Ads",        Icon: MetaIcon },
  { name: "Google Ads",      Icon: GoogleIcon },
  { name: "TikTok Ads",      Icon: TikTokIcon },
  { name: "GA4",             Icon: GA4Icon },
];


// One FAQ list feeds both the visible FAQ section and the FAQPage JSON-LD, so
// structured data always matches on-page content (previously the schema
// carried narrative FAQs the page never rendered, and quoted retainer prices
// that contradicted /pricing).
function buildLocationFaqs(loc: { slug: string; city: string; region: string }): FAQ[] {
  const city = loc.city;
  const narrative = narrativeFor(loc.slug) ?? EXTRA_NARRATIVES[loc.slug];
  const guide = guideFor(loc.slug);
  const base: FAQ[] = [
    { q: `What does an ecommerce agency in ${city} do?`, a: `An ecommerce agency grows online sales for businesses that sell products. For ${city} brands, Being Ecom covers ecommerce SEO, Google Shopping and Search, Meta and TikTok ads, Klaviyo email and SMS, conversion rate optimisation and analytics for Shopify and WooCommerce stores - measured against revenue and margin, not clicks.` },
    { q: `Are you based in ${city}?`, a: `We're a UK-based team that works remotely with brands in ${city} and across ${loc.region}. We don't claim a ${city} office; in-person strategy sessions can be arranged for ${city} engagements, and day-to-day work runs through video calls, WhatsApp and a shared dashboard.` },
    { q: `Which ecommerce platforms do you work with in ${city}?`, a: `Shopify and Shopify Plus, and WooCommerce. We also migrate ${city} retailers from Magento and older platforms to Shopify or WooCommerce while protecting their search rankings.` },
    { q: `How long does ecommerce SEO take to work for a ${city} store?`, a: `Technical fixes and product page improvements can show movement within 6-12 weeks. Competitive category rankings usually take 4-9 months, depending on your site's authority and how contested the ${city} and national searches are.` },
    { q: `Do you offer a free ecommerce audit for ${city} brands?`, a: `Yes. We review your store, ad accounts, GA4 tracking, email and SEO and send back the priority fixes - no obligation.` },
    { q: `Can I contact the team on WhatsApp?`, a: `Yes. Use any WhatsApp button on this page to message the team directly; we usually reply within an hour on UK business days.` },
  ];
  return [
    ...base,
    ...(guide?.paa ?? []),
    ...(narrative?.localFaqs ?? []),
    ...UK_SHARED_PAA(),
  ];
}

export const Route = createFileRoute("/locations/$slug")({
  loader: ({ params }) => {
    const loc = LOCATIONS.find((l) => l.slug === params.slug);
    if (!loc) throw notFound();
    return { loc };
  },
  head: ({ loaderData }) => {
    const loc = loaderData?.loc;
    const m = loc ? metaFor(loc.slug, loc.city, loc.region) : undefined;
    const title = m ? m.title : "Location - Being Ecom";
    const desc = m ? m.description : "UK ecommerce marketing agency locations.";
    const C = loc ? contentFor(loc.slug, loc.city) : undefined;
    const heroImage = C?.images.hero;
    const geo = loc ? LOCATION_GEO[loc.slug] : undefined;
    const imageSlots = ["hero", "ads", "seo", "shopify", "cro", "email", "creative", "analytics", "caseStudy", "meeting"] as const;
    const pageUrl = loc ? `${SITE_URL}/locations/${loc.slug}` : SITE_URL;
    const faqData = loc ? buildLocationFaqs(loc) : [];
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large" },
        ...(loc ? [{ name: "geo.placename", content: loc.city }, { name: "geo.region", content: loc.region }] : []),
        ...(geo ? [{ name: "geo.position", content: `${geo.latitude};${geo.longitude}` }, { name: "ICBM", content: `${geo.latitude}, ${geo.longitude}` }] : []),
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: pageUrl },
        { property: "og:locale", content: "en_GB" },
        ...(heroImage ? [{ property: "og:image", content: heroImage }, { name: "twitter:image", content: heroImage }] : []),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
      ],
      links: loc ? [
        { rel: "canonical", href: pageUrl },
        ...(heroImage ? [{ rel: "preload" as const, as: "image" as const, href: heroImage, fetchPriority: "high" as const }] : []),
      ] : [],
      scripts: loc && C ? [
        { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Locations", path: "/locations" }, { name: loc.city, path: `/locations/${loc.slug}` }])) },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "@id": `${pageUrl}#business`,
            name: `Being Ecom - Ecommerce Agency serving ${loc.city}`,
            description: desc,
            url: pageUrl,
            image: heroImage,
            priceRange: "££-£££",
            areaServed: [
              { "@type": "City", name: loc.city },
              { "@type": "AdministrativeArea", name: loc.region },
              { "@type": "Country", name: "United Kingdom" },
            ],
            serviceType: ["Ecommerce Agency", "Shopify Development", "SEO Agency", "Google Ads", "Meta Ads", "Klaviyo Email Marketing", "CRO"],
            ...(geo ? { geo: { "@type": "GeoCoordinates", latitude: geo.latitude, longitude: geo.longitude } } : {}),
            sameAs: [SITE_URL],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqData.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            "@id": `${pageUrl}#marketing-images`,
            name: `${loc.city} ecommerce marketing image set`,
            description: `Relevant ecommerce, Shopify, WooCommerce, SEO, paid ads and marketing images for BeingEcom in ${loc.city}.`,
            associatedMedia: imageSlots.map((slot) => ({
              "@type": "ImageObject",
              contentUrl: C.images[slot],
              name: `${loc.city} ${IMAGE_SLOT_LABELS[slot]}`,
              caption: imageAlt(loc.city, slot),
              keywords: `${IMAGE_SLOT_LABELS[slot]}, ecommerce agency ${loc.city}, Shopify ${loc.city}, WooCommerce ${loc.city}, digital marketing ${loc.city}`,
              ...(geo ? { contentLocation: { "@type": "Place", name: loc.city, geo: { "@type": "GeoCoordinates", latitude: geo.latitude, longitude: geo.longitude } } } : {}),
            })),
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${pageUrl}#webpage`,
            url: pageUrl,
            name: title,
            description: desc,
            inLanguage: "en-GB",
            isPartOf: { "@type": "WebSite", url: SITE_URL, name: "Being Ecom" },
            about: { "@id": `${pageUrl}#business` },
            primaryImageOfPage: heroImage ? { "@type": "ImageObject", url: heroImage } : undefined,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              { "@type": "Service", "@id": `${pageUrl}#service-seo`, name: `Ecommerce SEO Agency ${loc.city}`, serviceType: "Ecommerce SEO", areaServed: { "@type": "City", name: loc.city }, provider: { "@id": `${pageUrl}#business` }, description: `Technical, on-page and local ecommerce SEO for Shopify and WooCommerce brands in ${loc.city}. Includes Core Web Vitals, schema markup, product and collection page optimisation and digital PR link building.` },
              { "@type": "Service", "@id": `${pageUrl}#service-ppc`, name: `Ecommerce Ads Agency ${loc.city}`, serviceType: "Ecommerce PPC", areaServed: { "@type": "City", name: loc.city }, provider: { "@id": `${pageUrl}#business` }, description: `Google Ads, Google Shopping, Performance Max, Meta Ads, TikTok Ads and YouTube Ads managed for ${loc.city} ecommerce brands by senior UK media buyers.` },
              { "@type": "Service", "@id": `${pageUrl}#service-shopify`, name: `Shopify Marketing Agency ${loc.city}`, serviceType: "Shopify Marketing & Development", areaServed: { "@type": "City", name: loc.city }, provider: { "@id": `${pageUrl}#business` }, description: `Shopify Plus builds, migrations, headless Hydrogen storefronts, theme customisation, app development and speed optimisation for ${loc.city} DTC brands.` },
              { "@type": "Service", "@id": `${pageUrl}#service-woocommerce`, name: `WooCommerce Marketing Agency ${loc.city}`, serviceType: "WooCommerce Marketing & Development", areaServed: { "@type": "City", name: loc.city }, provider: { "@id": `${pageUrl}#business` }, description: `WooCommerce store builds, migrations, performance and SEO optimisation for ${loc.city} ecommerce brands running on WordPress.` },
              { "@type": "Service", "@id": `${pageUrl}#service-email`, name: `Klaviyo Email Agency ${loc.city}`, serviceType: "Email & SMS Marketing", areaServed: { "@type": "City", name: loc.city }, provider: { "@id": `${pageUrl}#business` }, description: `Klaviyo flows, campaigns, SMS and lifecycle marketing that typically drives 30-45% of monthly revenue for ${loc.city} DTC brands.` },
              { "@type": "Service", "@id": `${pageUrl}#service-cro`, name: `CRO Agency ${loc.city}`, serviceType: "Conversion Rate Optimisation", areaServed: { "@type": "City", name: loc.city }, provider: { "@id": `${pageUrl}#business` }, description: `Structured A/B testing across PDPs, landing pages and checkout to lift AOV and conversion rate for ${loc.city} Shopify and WooCommerce stores.` },
            ],
          }),
        },
      ] : [],
    };
  },
  component: LocationPage,
  notFoundComponent: () => (
    <PageLayout>
      <Section title="Location not found" intro="We couldn't find that city. Explore our other UK locations.">
        <Link to="/locations" className="text-primary underline">View all locations</Link>
      </Section>
    </PageLayout>
  ),
});

function LocationPage() {
  const { loc } = Route.useLoaderData();
  const city = loc.city;
  const C = contentFor(loc.slug, city);
  const narrative = narrativeFor(loc.slug) ?? EXTRA_NARRATIVES[loc.slug];
  const guide = guideFor(loc.slug);
  const IMG = C.images;
  const WA = whatsappUrl(city, loc.slug);

  const services = [
    { icon: Megaphone, title: `Paid Ads in ${city}`, desc: `Meta, Google, TikTok & YouTube ads managed by senior media buyers for ${city} DTC brands.`, kw: `PPC agency ${city}` },
    { icon: Search, title: `SEO for ${city} Brands`, desc: `Technical, on-page and local SEO to rank ${city} stores for high-intent buyer keywords.`, kw: `SEO agency ${city}` },
    { icon: ShoppingBag, title: `Shopify Development`, desc: `Shopify Plus builds, migrations & CRO tuned for ${city} ecommerce conversion rates.`, kw: `Shopify experts ${city}` },
    { icon: LineChart, title: `CRO & UX`, desc: `Landing page, PDP and checkout optimisation for ${city} stores leaking revenue.`, kw: `CRO ${city}` },
    { icon: MessageCircle, title: `Email & SMS`, desc: `Klaviyo flows, campaigns and lifecycle marketing driving 30-45% of revenue.`, kw: `Klaviyo agency ${city}` },
    { icon: Sparkles, title: `Creative Studio`, desc: `UGC, static, motion & video ad creative built in-house for ${city} brands.`, kw: `creative agency ${city}` },
    { icon: PieChart, title: `Analytics & Attribution`, desc: `GA4, server-side tracking and blended CAC/ROAS dashboards you actually understand.`, kw: `analytics ${city}` },
    { icon: Zap, title: `AI Automation`, desc: `AI-driven workflows for support, ops and ad iteration built for lean ${city} teams.`, kw: `AI agency ${city}` },
  ];

  const stats = [
    { end: 120, suffix: "+", label: "UK DTC brands scaled" },
    { end: 47, suffix: "M+", prefix: "£", label: "Client revenue driven" },
    { end: C.caseStudy.roas, decimals: 1, suffix: "×", label: `Top ${city} client ROAS` },
  ];

  const process = [
    { title: "Discovery & Audit", body: `We deep-dive into your ${city} store, ad accounts, analytics and funnel to find the real growth blockers.` },
    { title: "Strategy Blueprint", body: `A custom 90-day roadmap: channels, budgets, offers, creative angles and KPIs - no templated decks.` },
    { title: "Rapid Sprint Setup", body: `Tracking, pixels, feeds, flows and creative production spun up in the first two weeks.` },
    { title: "Scale & Test", body: `We launch, measure daily and scale winning creative, audiences and pages compounding week over week.` },
    { title: "Optimise & Retain", body: `CRO, email/SMS and post-purchase automations lift LTV so paid keeps working profitably.` },
    { title: "Report & Iterate", body: `Weekly Loom updates, monthly strategy calls and a live dashboard - no reporting theatre.` },
  ];

  // Industry cards link to the matching industry landing page so location
  // pages pass equity to (and receive relevance from) the industry hub.
  const industries: { name: string; emoji: string; tint: string; to: string }[] = [
    { name: "Fashion & Apparel",       emoji: "👗", tint: "from-pink-500/15 to-rose-500/5   text-pink-600",       to: "/industries/fashion-apparel" },
    { name: "Beauty & Skincare",       emoji: "💄", tint: "from-fuchsia-500/15 to-pink-500/5 text-fuchsia-600",    to: "/industries/beauty-personal-care" },
    { name: "Health & Supplements",    emoji: "🌿", tint: "from-emerald-500/15 to-teal-500/5 text-emerald-600",   to: "/industries/health-wellness" },
    { name: "Home & Furniture",        emoji: "🛋️", tint: "from-amber-500/15 to-orange-500/5 text-amber-700",    to: "/industries/furniture-interiors" },
    { name: "Food & Beverage",         emoji: "🍫", tint: "from-orange-500/15 to-red-500/5   text-orange-600",     to: "/industries/food-beverage" },
    { name: "Jewellery & Accessories", emoji: "💎", tint: "from-indigo-500/15 to-violet-500/5 text-indigo-600",   to: "/industries/jewellery-watches" },
    { name: "Fitness & Sports",        emoji: "🏋️", tint: "from-red-500/15 to-orange-500/5   text-red-600",       to: "/industries/sports-fitness" },
    { name: "Baby & Kids",             emoji: "🧸", tint: "from-sky-500/15 to-cyan-500/5     text-sky-600",       to: "/industries/baby-kids" },
    { name: "Pet Products",            emoji: "🐾", tint: "from-yellow-500/15 to-amber-500/5 text-yellow-700",    to: "/industries/pets-supplies" },
    { name: "Tech & Gadgets",          emoji: "🎧", tint: "from-slate-500/15 to-zinc-500/5   text-slate-700",     to: "/industries/electronics-technology" },
    { name: "Sustainable Brands",      emoji: "♻️", tint: "from-lime-500/15 to-green-500/5   text-lime-700",      to: "/industries" },
    { name: "Premium & Luxury",        emoji: "👑", tint: "from-amber-500/15 to-yellow-500/5 text-amber-700",     to: "/industries" },
  ];


  const tech = [
    "Shopify Plus", "WooCommerce", "Klaviyo", "Meta Ads", "Google Ads", "TikTok Ads",
    "GA4", "Triple Whale", "Northbeam", "Recharge", "Yotpo", "Gorgias",
  ];

  const faqs: FAQ[] = buildLocationFaqs(loc);

  const variant = variantForSlug(loc.slug);
  const baseCtx: Omit<LocationCtx, "placement"> = {
    city,
    slug: loc.slug,
    region: loc.region,
    variant,
  };

  const trackCta = (ctaType: string, placement: string, extra: Record<string, string> = {}) => {
    const ctx: LocationCtx = { ...baseCtx, placement };
    stashLocationAttribution(ctx);
    trackEvent("location_cta_click", {
      cta_type: ctaType,
      placement,
      city,
      city_slug: loc.slug,
      region: loc.region,
      experiment_variant: variant,
      ...extra,
    });
  };

  const ctaHref = (path: string, placement: string) =>
    buildLocationLink(path, { ...baseCtx, placement });
  const waHref = (placement: string) => withLocationUtm(WA, { ...baseCtx, placement });

  const WhatsAppBtn = ({ label = `WhatsApp ${city} team`, placement = "generic" }: { label?: string; placement?: string }) => (
    <a
      href={waHref(placement)}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`${label} on WhatsApp`}
      className="btn wa-btn group relative overflow-hidden"
      onClick={() => trackCta("whatsapp", placement, { label })}
    >
      <span className="wa-btn-ping" aria-hidden="true" />
      <span className="relative flex items-center justify-center w-5 h-5 rounded-full bg-white/25 shrink-0">
        <svg viewBox="0 0 32 32" className="w-3.5 h-3.5 wa-icon" fill="currentColor" aria-hidden="true">
          <path d="M19.11 17.28c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35zM16.03 5.33c-5.9 0-10.68 4.78-10.68 10.68 0 1.88.49 3.72 1.43 5.34l-1.52 5.55 5.69-1.49a10.66 10.66 0 0 0 5.08 1.29h.01c5.89 0 10.67-4.78 10.67-10.68 0-2.85-1.11-5.53-3.13-7.55a10.63 10.63 0 0 0-7.55-3.14z" />
        </svg>
      </span>
      <span className="relative truncate">{label}</span>
    </a>
  );


  return (
    <PageLayout>
      {/* 1. HERO */}
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl float" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-accent/30 blur-3xl float-slow" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 relative grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                <MapPin className="size-3.5" /> {city}, {loc.region}
              </div>
            </Reveal>
            <Reveal delay={1}>
              <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-[1.05] text-ink">
                <SplitHeading value={(() => {
                  const variants = [
                    `Ecommerce Marketing Agency in ${city}`,
                    `${city} Ecommerce Growth Agency`,
                    `Ecommerce Growth Partner for ${city} Brands`,
                    `Specialist Ecommerce Agency in ${city}`,
                  ];
                  const idx = LOCATIONS.findIndex((l) => l.slug === loc.slug);
                  return variants[(idx >= 0 ? idx : 0) % variants.length];
                })()} />
              </h1>
            </Reveal>
            <Reveal delay={2}>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">{C.heroTagline} {loc.intro}</p>
            </Reveal>
            <Reveal delay={2}>
              <div className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
                <a
                  href={ctaHref("/contact", "hero")}
                  className="btn btn-primary btn-shimmer hover-scale"
                  onClick={() => trackCta("call_booking", "hero", { destination: "/contact" })}
                >
                  Book Free {city} Strategy Call <ArrowRight className="w-4 h-4" />
                </a>
                <WhatsAppBtn label={`Chat on WhatsApp`} placement="hero" />
                <a
                  href={ctaHref("/audit", "hero")}
                  className="btn btn-ghost border border-border hover-scale"
                  onClick={() => trackCta("audit_request", "hero", { destination: "/audit" })}
                >
                  <Play className="w-4 h-4" /> Get Free Audit
                </a>
              </div>
            </Reveal>
            <Reveal delay={3}>
              <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground flex-wrap justify-center lg:justify-start">
                <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> Shopify & Shopify Plus</div>
                <div className="flex items-center gap-2"><Award className="w-4 h-4 text-primary" /> Meta & Google Ads</div>
              </div>
            </Reveal>

          </div>
          <Reveal delay={2}>
            <div className="relative">
              <SafeImg src={IMG.hero} {...imageSeoProps(loc.slug, city, "hero")}
                className="rounded-3xl shadow-2xl w-full h-[460px] object-cover" loading="eager" fetchPriority="high" decoding="async" width={1600} height={1067} sizes="(min-width: 1024px) 640px, 100vw" />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-border animate-fade-in">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"><TrendingUp className="w-6 h-6 text-primary" /></div>
                <div><div className="text-2xl font-bold text-ink"><CountUp end={C.caseStudy.growthPct} suffix="%" /></div><div className="text-xs text-muted-foreground">Top {city} client growth</div></div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-border animate-fade-in">
                <div className="flex items-center gap-2 text-xs font-semibold text-primary"><ShieldCheck className="w-3.5 h-3.5" /> {loc.region} coverage</div>
                <div className="mt-1 text-lg font-bold text-ink">Senior UK operators</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* AI SUMMARY - entity-first answer block for AEO / AI search */}
      <AISummary>
        BeingEcom is a UK ecommerce marketing agency serving <strong>{city}, {loc.region}</strong> - helping Shopify and WooCommerce brands grow revenue through SEO, paid ads, CRO, email/SMS and analytics, run by senior UK operators.
      </AISummary>

      {/* 2. TRUST BAR - running colored brand logos */}
      <section className="border-y border-border bg-secondary/40 py-8">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center mb-5">
            <span className="text-sm font-semibold text-ink">The platforms we run for {city} ecommerce brands every day</span>
          </div>
          <div
            className="relative overflow-hidden"
            style={{ maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)" }}
          >
            <div className="marquee-track items-center">
              {[...TRUST_LOGOS, ...TRUST_LOGOS, ...TRUST_LOGOS].map((L, i) => (
                <div key={`${L.name}-${i}`} className="flex items-center gap-2.5 shrink-0 px-2" aria-label={L.name} title={L.name}>
                  <L.Icon />
                  <span className="font-semibold text-ink text-sm whitespace-nowrap">{L.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* 2b. SEO INTRO - primary + secondary keyword rich, EEAT & entity-focused copy */}
      <Section eyebrow="Introduction" title={`The ecommerce marketing agency ${city} founders trust to grow revenue`}>
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl">
          <div className="lg:col-span-2 space-y-5 text-[15px] leading-relaxed text-muted-foreground">
            <p>
              Being Ecom is an <strong className="text-ink">ecommerce marketing agency in {city}</strong> helping Shopify, Shopify Plus and WooCommerce brands turn traffic into profitable, compounding revenue. From founders in {C.neighbourhoods[0]} to scale-ups across {loc.region}, we work as the senior growth team behind {city}&rsquo;s most ambitious online stores.
            </p>
            <p>
              Our team combines <strong className="text-ink">ecommerce SEO</strong>, <strong className="text-ink">Google Ads</strong>, <strong className="text-ink">Meta Ads</strong>, <strong className="text-ink">TikTok Ads</strong>, <strong className="text-ink">Klaviyo</strong> email &amp; SMS, <strong className="text-ink">conversion rate optimisation</strong> and <strong className="text-ink">GA4 analytics</strong> into one accountable growth engine. Every decision is tied back to blended ROAS, contribution margin and customer LTV - not platform vanity metrics.
            </p>
            <p>
              We run Shopify and Shopify Plus builds, Google Ads, Meta Ads, TikTok Ads and Klaviyo email &amp; SMS day in, day out — bringing proven playbooks to {city} ecommerce brands across fashion, beauty, wellness, homeware, food &amp; drink and premium DTC. Whether you need a <strong className="text-ink">Shopify marketing agency in {city}</strong>, a <strong className="text-ink">WooCommerce partner</strong>, or a full-service <strong className="text-ink">ecommerce ads agency in {city}</strong>, our senior operators build the strategy and ship the work themselves.
            </p>
          </div>
          <div className="space-y-3">
            {[
              { label: `Ecommerce SEO in ${city}`, to: "/services/seo" as const },
              { label: `Shopify Marketing in ${city}`, to: "/services/store-development" as const },
              { label: `WooCommerce Growth in ${city}`, to: "/services/store-development" as const },
              { label: `Google & Meta Ads for ${city} brands`, to: "/services/performance-marketing" as const },
              { label: `CRO for ${city} stores`, to: "/services/cro" as const },
              { label: `Klaviyo email & SMS`, to: "/services/email-sms" as const },
            ].map((k) => (
              <Link key={k.label} to={k.to} className="flex items-center gap-2 text-sm text-ink hover:text-primary transition-colors">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>{k.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* 3. STATS */}
      <Section eyebrow={`${city} results`} title={`Numbers ${city} founders care about`} intro={C.vibe} center>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s) => (
            <Reveal key={s.label}>
              <div className="card-surface card-hover p-8 text-center">
                <div className="text-4xl md:text-5xl font-bold text-gradient">
                  <CountUp end={s.end} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
                </div>
                <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 4. WHY CITY */}
      <Section eyebrow={`Why ${city}`} title={`${city} is a smart place to scale ecommerce`} alt>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <SafeImg src={IMG.skyline} {...imageSeoProps(loc.slug, city, "skyline")} loading="lazy" decoding="async" width={1600} height={900}
              className="rounded-3xl shadow-xl w-full h-[380px] object-cover" />
          </Reveal>
          <div className="space-y-4">
            {C.whyCity.map((f, i) => {
              const Icon = [Globe2, Users, Rocket, Handshake][i % 4];
              return (
                <Reveal key={f.title} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                  <div className="flex gap-4 p-5 card-surface card-hover">
                    <Icon className="w-6 h-6 text-primary shrink-0" />
                    <div><h4 className="font-semibold text-ink">{f.title}</h4><p className="text-sm text-muted-foreground mt-1">{f.body}</p></div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>

      {/* 4b. LOCAL NARRATIVE - unique long-form, per-city (Nottingham, Leeds, Manchester...) */}
      {narrative && (
        <Section eyebrow={`Inside ${city} ecommerce`} title={`Why ${city} brands work with Being Ecom`} alt>
          <div className="grid lg:grid-cols-3 gap-10 max-w-6xl">
            <div className="lg:col-span-2 space-y-5 text-[15px] leading-relaxed text-muted-foreground">
              {narrative.intro.map((p, i) => (
                <p key={i} className={i === 0 ? "text-ink font-medium text-lg leading-relaxed" : ""}>
                  {p}
                </p>
              ))}
              <div className="pt-4 grid sm:grid-cols-2 gap-4">
                {narrative.ecosystem.map((e) => (
                  <div key={e.title} className="rounded-2xl border border-border bg-white p-5">
                    <div className="text-xs font-bold uppercase tracking-widest text-primary">{e.title}</div>
                    <p className="mt-2 text-sm text-muted-foreground">{e.body}</p>
                  </div>
                ))}
              </div>
              <div className="pt-2">
                <h3 className="text-lg font-bold text-ink mb-3">{city}-specific growth playbook</h3>
                <ul className="space-y-3">
                  {narrative.playbook.map((p) => (
                    <li key={p.title} className="flex gap-3 items-start">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span><strong className="text-ink">{p.title}.</strong> <span className="text-muted-foreground">{p.body}</span></span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <aside className="space-y-6">
              <div className="rounded-2xl border border-border bg-white p-5">
                <h3 className="font-bold text-ink text-sm uppercase tracking-wider mb-3">Nearby cities we serve</h3>
                <ul className="space-y-2">
                  {/* Deterministic: 3 nearest cities by verified coordinates (uk-geo.ts). */}
                  {nearbySlugs(loc.slug, 3).map((nearby) => (
                    <li key={nearby.slug}>
                      <Link
                        to="/locations/$slug"
                        params={{ slug: nearby.slug }}
                        className="text-sm text-ink hover:text-primary transition-colors inline-flex items-center gap-1"
                      >
                        <ArrowRight className="w-3.5 h-3.5 text-primary" />
                        Ecommerce Agency {nearby.city}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-accent/20 border border-primary/20 p-5">
                <h3 className="font-bold text-ink text-sm uppercase tracking-wider mb-2">Related services</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/services/seo" className="text-ink hover:text-primary">Ecommerce SEO in {city}</Link></li>
                  <li><Link to="/services/seo/local" className="text-ink hover:text-primary">Local SEO for {city}</Link></li>
                  <li><Link to="/services/performance-marketing" className="text-ink hover:text-primary">Paid Ads for {city} brands</Link></li>
                  <li><Link to="/services/email-sms" className="text-ink hover:text-primary">Klaviyo Email &amp; SMS</Link></li>
                  <li><Link to="/services/cro" className="text-ink hover:text-primary">CRO for {city} stores</Link></li>
                </ul>
              </div>
              <div className="rounded-2xl border border-border bg-white p-5">
                <h3 className="font-bold text-ink text-sm uppercase tracking-wider mb-3">SEO specialisms for {city} brands</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/services/seo/technical" className="text-ink hover:text-primary">Technical SEO for {city} stores</Link></li>
                  <li><Link to="/services/seo/on-page" className="text-ink hover:text-primary">On-Page SEO in {city}</Link></li>
                  <li><Link to="/services/seo/off-page" className="text-ink hover:text-primary">Off-Page SEO &amp; digital PR</Link></li>
                  <li><Link to="/services/seo/international" className="text-ink hover:text-primary">International SEO from {city}</Link></li>
                  <li><Link to="/services/seo/aeo" className="text-ink hover:text-primary">AEO / AI Search for {city}</Link></li>
                </ul>
              </div>
              <div className="rounded-2xl border border-border bg-white p-5">
                <h3 className="font-bold text-ink text-sm uppercase tracking-wider mb-3">Paid media specialisms in {city}</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/services/performance-marketing" className="text-ink hover:text-primary">Performance marketing in {city}</Link></li>
                  <li><Link to="/services/performance-marketing/google-ads" className="text-ink hover:text-primary">Google Ads for {city} brands</Link></li>
                  <li><Link to="/services/performance-marketing/facebook-ads" className="text-ink hover:text-primary">Facebook Ads in {city}</Link></li>
                  <li><Link to="/services/performance-marketing/instagram-ads" className="text-ink hover:text-primary">Instagram Ads in {city}</Link></li>
                  <li><Link to="/services/performance-marketing/tiktok-ads" className="text-ink hover:text-primary">TikTok Ads in {city}</Link></li>
                  <li><Link to="/services/performance-marketing/youtube-ads" className="text-ink hover:text-primary">YouTube Ads in {city}</Link></li>
                  <li><Link to="/services/performance-marketing/media-buying" className="text-ink hover:text-primary">Media buying for {city} stores</Link></li>
                </ul>
              </div>
              <div className="rounded-2xl bg-white border border-border p-5">
                <h3 className="font-bold text-ink text-sm uppercase tracking-wider mb-3">More reading</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/methodology" className="text-ink hover:text-primary">The BeingEcom Growth System</Link></li>
                  <li><Link to="/case-studies" className="text-ink hover:text-primary">UK ecommerce case studies</Link></li>
                  <li><Link to="/tools" className="text-ink hover:text-primary">Free ecommerce calculators</Link></li>
                  <li><Link to="/about" className="text-ink hover:text-primary">About BeingEcom</Link></li>
                </ul>
              </div>
            </aside>
          </div>
        </Section>
      )}

      {/* 4c. LOCAL SEARCH GUIDE - hyper-local entities + answers to the real
          GSC query cluster for this city (see lib/location-local-guide.ts). */}
      {guide && (
        <Section eyebrow={`Ecommerce in ${city}`} title={`What ${city} online sellers search for - answered`}>
          <div className="max-w-6xl space-y-10">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
                <p className="text-ink text-lg leading-relaxed">{guide.market}</p>
                <div className="rounded-2xl border border-primary/25 bg-primary/5 p-5">
                  <h3 className="font-bold text-ink">The problem {city} founders raise most: {guide.localPain.title}</h3>
                  <p className="mt-2 text-sm">{guide.localPain.body}</p>
                </div>
              </div>
              <aside className="rounded-2xl border border-border bg-white p-5 text-sm">
                <h3 className="font-bold text-ink text-sm uppercase tracking-wider mb-3">Areas we serve around {city}</h3>
                <p className="text-muted-foreground">{guide.towns.join(" · ")}</p>
                <h3 className="font-bold text-ink text-sm uppercase tracking-wider mt-5 mb-2">Postcodes</h3>
                <p className="text-muted-foreground">{guide.postcodes.join(", ")} and surrounding areas</p>
              </aside>
            </div>

            <div>
              <h3 className="text-xl font-bold text-ink mb-4">The {city} ecommerce landscape</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {guide.entities.map((e) => (
                  <div key={e.name} className="rounded-2xl border border-border bg-white p-5">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary shrink-0" />
                      <span className="font-semibold text-ink">{e.name}</span>
                    </div>
                    <div className="mt-1 text-[11px] font-bold uppercase tracking-widest text-primary">{e.kind}</div>
                    <p className="mt-2 text-sm text-muted-foreground">{e.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {guide.queryAnswers.map((qa) => (
                <article key={qa.query} className="card-surface p-6">
                  <h3 className="text-lg font-bold text-ink">{qa.heading}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{qa.body}</p>
                  <Link to={qa.to} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                    {qa.linkLabel} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* 4d. PAIN POINTS - recurring UK ecommerce owner problems (founder forums
          + cited research), each mapped to the service that fixes it. */}
      <Section eyebrow="Common problems" title={`Problems ${city} ecommerce owners bring to us`} intro={`These are the issues UK store owners raise most often in founder communities and on calls with us - and how we fix each one for ${city} brands.`} alt>
        <div className="grid md:grid-cols-2 gap-5 max-w-6xl">
          {UK_ECOM_PAIN_POINTS.map((p) => (
            <div key={p.pain} className="rounded-2xl border border-border bg-white p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <h3 className="font-bold text-ink">{p.pain}</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground"><strong className="text-ink">What owners say:</strong> {p.owners}</p>
              <p className="mt-2 text-sm text-muted-foreground"><strong className="text-ink">How we fix it:</strong> {p.fix}</p>
              <Link to={p.to} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                Learn more <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-6xl text-xs text-muted-foreground">
          Sources:{" "}
          {PAIN_SOURCES.map((src, i) => (
            <span key={src.href}>
              <a href={src.href} target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">{src.label}</a>
              {i < PAIN_SOURCES.length - 1 ? "; " : "."}
            </span>
          ))}
        </p>
      </Section>

      {/* 5. NEIGHBOURHOODS */}
      <Section eyebrow={`${city} coverage`} title={`Serving DTC brands across ${city}`} intro={`From founders in ${C.neighbourhoods[0]} to warehouses in ${C.neighbourhoods[C.neighbourhoods.length - 1]}, we partner with ecommerce brands across every corner of ${city} and ${loc.region}.`}>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {C.neighbourhoods.map((n, i) => (
            <Reveal key={n} delay={Math.min(i % 4, 3) as 0 | 1 | 2 | 3}>
              <div className="group relative overflow-hidden rounded-2xl border border-border bg-white p-4 flex items-center gap-3 card-hover">
                <span className="shrink-0 grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary/15 to-accent/25 text-primary transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                  <MapPin className="w-5 h-5" />
                </span>
                <div className="min-w-0">
                  <div className="font-bold text-ink text-sm sm:text-base leading-tight truncate">{n}</div>
                  <div className="text-[11px] text-muted-foreground truncate">{city} · {loc.region}</div>
                </div>
                <span className="pointer-events-none absolute -right-6 -bottom-6 w-20 h-20 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </Reveal>
          ))}
        </div>
      </Section>


      {/* 6. SERVICES GRID */}
      <Section eyebrow="Services" title={`Full-stack ecommerce services in ${city}`} intro={`Every channel you need to scale profitably - under one senior team in ${city}.`} alt>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={Math.min(i % 4, 3) as 0 | 1 | 2 | 3}>
              <Card>
                <s.icon className="w-8 h-8 text-primary" />
                <h3 className="mt-4 font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                <div className="mt-4 text-xs font-semibold text-primary/70 uppercase tracking-wide">{s.kw}</div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 7. HIGHLIGHTS */}
      <Section eyebrow={`What we do in ${city}`} title={`Your ${city} growth engine`}>
        <div className="grid md:grid-cols-2 gap-4 max-w-5xl">
          {loc.highlights.map((h: string, i: number) => (
            <Reveal key={h} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
              <div className="flex items-start gap-3 rounded-2xl border border-border bg-white p-5 card-hover">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-ink font-medium">{h}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 8. PAID ADS */}
      <Section eyebrow="Paid Media" title={`Meta, Google & TikTok Ads for ${city} brands`} alt>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <Reveal><SafeImg src={IMG.ads} {...imageSeoProps(loc.slug, city, "ads")} loading="lazy" decoding="async" width={1600} height={900} className="rounded-3xl shadow-xl w-full h-[380px] object-cover" /></Reveal>
          <div>
            <p className="text-lg text-muted-foreground">Our senior media buyers manage 8-figure annual ad spend for {city} DTC brands. Every campaign is built to a blended profit target, not a platform ROAS vanity metric.</p>
            <ul className="mt-6 space-y-3">
              {[`Meta Ads scaling with UGC-first creative`, `Google Search, Shopping & Performance Max`, `TikTok Spark Ads & Shop integrations`, `YouTube pre-roll and DR video`, `Retargeting & post-purchase funnels`].map((x, i) => (
                <Reveal key={x} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                  <li className="flex items-center gap-3 text-ink"><CheckCircle2 className="w-5 h-5 text-primary" />{x}</li>
                </Reveal>
              ))}
            </ul>
            <div className="mt-8 btn-pair">
              <Link to="/services/performance-marketing" className="btn btn-primary">Explore paid ads <ArrowRight className="w-4 h-4" /></Link>
              <WhatsAppBtn label="Ask about paid ads" />
            </div>
          </div>
        </div>
      </Section>

      {/* 9. SEO */}
      <Section eyebrow="Search" title={`SEO agency in ${city} that ranks stores fast`}>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1">
            <p className="text-lg text-muted-foreground">We combine technical SEO, product-led content and authority link building to grow organic revenue for {city} brands compounding month over month.</p>
            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              {[`Local SEO for ${city}`, `Technical Shopify SEO`, `Programmatic collection pages`, `Digital PR & link building`, `AEO / AI search optimisation`, `Content strategy & briefs`].map((x) => (
                <div key={x} className="flex items-center gap-2 text-sm text-ink"><Target className="w-4 h-4 text-primary" />{x}</div>
              ))}
            </div>
            <div className="mt-8 btn-pair">
              <Link to="/services/seo" className="btn btn-primary">SEO services <ArrowRight className="w-4 h-4" /></Link>
              <WhatsAppBtn label={`Ask about ${city} SEO`} />
            </div>

          </div>
          <Reveal><SafeImg src={IMG.seo} {...imageSeoProps(loc.slug, city, "seo")} loading="lazy" decoding="async" width={1600} height={900} className="rounded-3xl shadow-xl w-full h-[380px] object-cover order-1 lg:order-2" /></Reveal>
        </div>
      </Section>

      {/* 10. SHOPIFY */}
      <Section eyebrow="Store development" title={`Shopify & WooCommerce experts in ${city}`} alt>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <Reveal><SafeImg src={IMG.shopify} {...imageSeoProps(loc.slug, city, "shopify")} loading="lazy" decoding="async" width={1600} height={900} className="rounded-3xl shadow-xl w-full h-[380px] object-cover" /></Reveal>
          <div>
            <p className="text-lg text-muted-foreground">From migrations to headless builds, our {city} Shopify Plus team delivers fast, conversion-obsessed stores that make your paid spend work harder.</p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {[`Shopify Plus builds`, `Theme customisation`, `Headless (Hydrogen)`, `App development`, `Migrations`, `Speed optimisation`].map(x => (
                <div key={x} className="p-4 rounded-xl border border-border bg-white text-sm font-medium text-ink card-hover">{x}</div>
              ))}
            </div>
            <div className="mt-8 btn-pair">
              <Link to="/services/store-development/shopify" className="btn btn-primary">Shopify services <ArrowRight className="w-4 h-4" /></Link>
              <Link to="/services/store-development/woocommerce" className="btn btn-ghost border border-border">WooCommerce</Link>
            </div>

          </div>
        </div>
      </Section>

      {/* 11. CRO */}
      <Section eyebrow="CRO" title={`Conversion optimisation for ${city} stores`}>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-lg text-muted-foreground">Turn more of your existing {city} traffic into revenue. We run structured A/B testing across PDPs, landing pages and checkout to lift AOV and CVR month over month.</p>
            <NumberedList items={[
              { title: "Heuristic + data audit", body: "GA4, Hotjar, session replays and revenue-per-visit analysis." },
              { title: "Hypothesis backlog", body: "Prioritised test roadmap by impact, confidence and effort." },
              { title: "Design & build", body: "Figma variants, developer-ready builds and QA across devices." },
              { title: "Launch & measure", body: "Statistically valid A/B tests with revenue-level significance." },
            ]} />
          </div>
          <Reveal><SafeImg src={IMG.cro} {...imageSeoProps(loc.slug, city, "cro")} loading="lazy" decoding="async" width={1600} height={900} className="rounded-3xl shadow-xl w-full h-[420px] object-cover" /></Reveal>
        </div>
      </Section>

      {/* 12. EMAIL */}
      <Section eyebrow="Retention" title={`Klaviyo email & SMS for ${city} DTC`} alt>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <Reveal><SafeImg src={IMG.email} {...imageSeoProps(loc.slug, city, "email")} loading="lazy" decoding="async" width={1600} height={900} className="rounded-3xl shadow-xl w-full h-[380px] object-cover" /></Reveal>
          <div>
            <p className="text-lg text-muted-foreground">Email and SMS drive {C.caseStudy.emailPct}% of revenue for our best {city} clients - automations, campaigns and lifecycle flows built to compound LTV.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Welcome flow", "Abandoned cart", "Browse abandonment", "Post-purchase", "Winback", "VIP loyalty", "SMS campaigns", "Segmentation"].map(x => <Pill key={x}>{x}</Pill>)}
            </div>
            <div className="mt-8 btn-pair">
              <Link to="/services/email-sms" className="btn btn-primary">Email & SMS <ArrowRight className="w-4 h-4" /></Link>
              <WhatsAppBtn label="Ask about Klaviyo" />
            </div>
          </div>
        </div>
      </Section>

      {/* 13. CREATIVE */}
      <Section eyebrow="Creative" title={`In-house creative studio serving ${city}`}>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-lg text-muted-foreground">Static, motion, UGC and video ad creative built for the scroll - batches shipped weekly for your {city} Meta and TikTok accounts.</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[`UGC creator network`, `Motion graphics`, `Product photography`, `Ad script writing`, `Static ad design`, `Video editing`].map(x => (
                <div key={x} className="flex items-center gap-2 text-sm text-ink"><Sparkles className="w-4 h-4 text-primary" />{x}</div>
              ))}
            </div>
            <div className="mt-8 btn-pair">
              <Link to="/services/creative" className="btn btn-primary">Creative services <ArrowRight className="w-4 h-4" /></Link>
              <WhatsAppBtn label="Ask about creative" />
            </div>

          </div>
          <Reveal><SafeImg src={IMG.creative} {...imageSeoProps(loc.slug, city, "creative")} loading="lazy" decoding="async" width={1600} height={900} className="rounded-3xl shadow-xl w-full h-[380px] object-cover" /></Reveal>
        </div>
      </Section>

      {/* 14. ANALYTICS */}
      <Section eyebrow="Analytics" title={`Attribution & analytics for ${city} founders`} alt>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <Reveal><SafeImg src={IMG.analytics} {...imageSeoProps(loc.slug, city, "analytics")} loading="lazy" decoding="async" width={1600} height={900} className="rounded-3xl shadow-xl w-full h-[380px] object-cover" /></Reveal>
          <div>
            <p className="text-lg text-muted-foreground">Blended CAC, contribution margin, cohort LTV - dashboards designed for {city} operators making real budget decisions, not platform-only ROAS.</p>
            <ul className="mt-6 space-y-3">
              {[`GA4 & server-side tracking`, `Triple Whale / Northbeam setup`, `Consent Mode v2`, `Meta CAPI & Google Enhanced`, `Custom Looker dashboards`].map(x => (
                <li key={x} className="flex items-center gap-3 text-ink"><BarChart3 className="w-5 h-5 text-primary" />{x}</li>
              ))}
            </ul>
            <div className="mt-8 btn-pair">
              <Link to="/services/analytics" className="btn btn-primary">Analytics services <ArrowRight className="w-4 h-4" /></Link>
              <WhatsAppBtn label="Ask about analytics" />
            </div>
          </div>

        </div>
      </Section>

      {/* 15. PROCESS */}
      <Section eyebrow="Process" title={`How we scale ${city} ecommerce brands`} intro="A repeatable 6-step system we run on every engagement.">
        <NumberedList items={process} />
      </Section>

      {/* 16. INDUSTRIES */}
      <Section eyebrow="Industries" title={`${city} brands we work with`} intro="Category depth compounds - here's where we've shipped the most wins." alt>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {industries.map((ind, i) => (
            <Reveal key={ind.name} delay={Math.min(i % 4, 3) as 0 | 1 | 2 | 3}>
              <Link
                to={ind.to}
                title={`${ind.name} ecommerce agency - ${city}`}
                className={`group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${ind.tint} p-4 sm:p-5 flex items-center gap-3 sm:gap-4 card-hover`}
              >
                <span
                  className="shrink-0 grid place-items-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white shadow-sm text-2xl sm:text-[26px] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
                  aria-hidden="true"
                >
                  {ind.emoji}
                </span>
                <div className="min-w-0">
                  <div className="font-bold text-ink text-sm sm:text-base leading-tight truncate">{ind.name}</div>
                  <div className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 truncate">{city} DTC & ecommerce</div>
                </div>
                <span className="pointer-events-none absolute -right-6 -bottom-6 w-20 h-20 rounded-full bg-white/40 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>


      {/* 17. TECH STACK */}
      <Section eyebrow="Tech stack" title={`The tools we run for ${city} clients`}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {tech.map((t, i) => (
            <Reveal key={t} delay={Math.min(i % 4, 3) as 0 | 1 | 2 | 3}>
              <div className="p-4 rounded-xl border border-border bg-white text-center text-sm font-semibold text-ink card-hover">
                <Layers className="w-5 h-5 text-primary mx-auto mb-2" />{t}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 18. TESTIMONIALS — SUPPRESSED Oct 2026.
          The per-city testimonials rendered here (names, quotes, 5-star
          visuals) come from location-content.ts and are UNVERIFIED — e.g.
          "Amelia H., Founder, Shoreditch skincare brand" and "Marcus O.,
          CEO, Kensington fashion label" plus their revenue figures have no
          recorded permission or substantiation. Removed rather than shown
          until each quote is verified. To restore: re-add the Section from
          git history once verified testimonials exist. */}
      {/* 19. CASE STUDY */}
      <Section eyebrow="Case study" title={`A ${city} brand doing 7 figures on Shopify`}>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border">
            <SafeImg src={IMG.caseStudy} {...imageSeoProps(loc.slug, city, "caseStudy")} loading="lazy" decoding="async" width={1600} height={900} className="w-full h-[420px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/75 to-ink/50" />
            <div className="absolute inset-0 bg-ink/25" />
            <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 text-white">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur px-3 py-1 text-xs font-bold uppercase tracking-widest">{C.caseStudy.category}</div>
              <h3 className="mt-3 text-2xl md:text-4xl font-bold max-w-2xl">{C.caseStudy.headline}</h3>
              <div className="mt-6 flex flex-wrap gap-6 text-sm">
                <div><div className="text-2xl font-bold"><CountUp end={C.caseStudy.growthPct} suffix="%" /></div><div className="opacity-80">Revenue growth</div></div>
                <div><div className="text-2xl font-bold"><CountUp end={C.caseStudy.roas} decimals={1} suffix="×" /></div><div className="opacity-80">Blended ROAS</div></div>
                <div><div className="text-2xl font-bold"><CountUp end={C.caseStudy.emailPct} suffix="%" /></div><div className="opacity-80">Email revenue</div></div>
                <div><div className="text-2xl font-bold"><CountUp end={C.caseStudy.months} suffix=" mo" /></div><div className="opacity-80">Timeframe</div></div>
              </div>
              <div className="mt-6 btn-pair">
                <Link to="/case-studies" className="btn btn-primary">Read case studies <ArrowRight className="w-4 h-4" /></Link>
                <WhatsAppBtn label={`Talk to ${city} team`} />
              </div>
            </div>
          </div>
        </Reveal>
        <p className="mt-4 text-xs text-muted-foreground italic text-center max-w-3xl mx-auto">
          Methodology: results based on client-reported Shopify and GA4 data over the stated engagement window. Individual results vary by category, margin and starting baseline. Client name withheld under NDA - anonymised case study details available on request.
        </p>
      </Section>


      {/* 20. PRICING */}
      <Section eyebrow="Pricing" title={`Transparent ecommerce agency pricing in ${city}`} alt>
        <div className="grid md:grid-cols-3 gap-5">
          {PRICING_TIERS.map((p) => (
            <Reveal key={p.name}>
              <div className={`card-surface card-hover p-8 h-full flex flex-col ${p.popular ? "ring-2 ring-primary" : ""}`}>
                {p.popular && <div className="inline-flex items-center gap-1 text-xs font-bold text-primary mb-2"><Sparkles className="w-3.5 h-3.5" /> MOST POPULAR</div>}
                <h3 className="text-xl font-bold text-ink">{p.name}</h3>
                <div className="mt-3 text-3xl font-bold text-gradient">{p.price}<span className="text-sm text-muted-foreground font-normal">{p.period === "month" ? "/mo" : " fixed"}</span></div>
                <p className="mt-2 text-sm text-muted-foreground">{p.best} - for {city} brands.</p>
                <ul className="mt-5 space-y-2 flex-1">
                  {p.includes.map(f => <li key={f} className="flex gap-2 text-sm text-ink"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" />{f}</li>)}
                </ul>
                <Link to="/pricing" className="btn btn-primary mt-6">See full pricing <ArrowRight className="w-4 h-4" /></Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 21a. NEARBY LOCATIONS - deterministic: 3 nearest cities by verified coordinates */}
      <Section eyebrow="Nearby cities" title={`Ecommerce agency serving cities near ${city}`} intro={`We work with DTC and Shopify brands across ${loc.region} and the wider UK. Explore our nearest ecommerce agency locations to ${city}.`} alt>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {nearbySlugs(loc.slug, 3).map((l) => (
            <Link
              key={l.slug}
              to="/locations/$slug"
              params={{ slug: l.slug }}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-border bg-white p-4 card-hover"
              title={`Ecommerce agency in ${l.city}`}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-ink font-semibold truncate"><MapPin className="w-4 h-4 text-primary shrink-0" />{l.city}</div>
                <div className="text-xs text-muted-foreground truncate">Ecommerce agency · nearest to {city}</div>
              </div>
              <ArrowRight className="w-4 h-4 text-primary shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <Link to="/locations" className="story-link text-primary font-semibold">View all UK locations</Link>
          <span className="text-muted-foreground">·</span>
          <Link to="/services/store-development/shopify" className="story-link text-primary font-semibold">Shopify development</Link>
          <span className="text-muted-foreground">·</span>
          <Link to="/services/seo" className="story-link text-primary font-semibold">SEO services</Link>
          <span className="text-muted-foreground">·</span>
          <Link to="/services/performance-marketing" className="story-link text-primary font-semibold">Paid ads</Link>
          <span className="text-muted-foreground">·</span>
          <Link to="/services/email-sms" className="story-link text-primary font-semibold">Email & SMS</Link>
          <span className="text-muted-foreground">·</span>
          <Link to="/case-studies" className="story-link text-primary font-semibold">Case studies</Link>
        </div>
      </Section>

      {/* 21b. RELATED CASE STUDIES - push equity from location pages to specific case-study URLs */}
      <Section eyebrow="Proof" title={`Case studies from ${loc.region} & UK ecommerce brands`} intro={`Recent Shopify and WooCommerce wins we've delivered for UK brands - the kind of work ${city} founders ask us about most.`}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(() => {
            const seed = loc.slug.length;
            const pool = [
              { id: "a1",  brand: "UK Shopify apparel brand",     category: "Ads", metric: "11.9×", label: "Revenue",     blurb: "PDP rebuild + Meta funnel took a UK apparel store from £18k to £214k/mo." },
              { id: "s1",  brand: "UK skincare brand",            category: "SEO", metric: "84K",   label: "Visits/mo",   blurb: "Zero to 84K monthly organic visits in 9 months with a full content engine." },
              { id: "a5",  brand: "UK pet supplies brand",        category: "Ads", metric: "£94k",  label: "PMax MRR",    blurb: "Google PMax scaled to £94k/mo once the product feed was rebuilt." },
              { id: "a7",  brand: "UK supplements brand",         category: "Ads", metric: "£180k", label: "MRR",         blurb: "£25k → £180k/mo by fixing the offer and shipping 120 creatives in 60 days." },
              { id: "a10", brand: "UK coffee subscription",       category: "Ads", metric: "3.9×",  label: "LTV",         blurb: "Subscription-only ad funnel tripled LTV and dropped CAC 22%." },
              { id: "a11", brand: "UK furniture brand",           category: "Ads", metric: "£310k", label: "MRR",         blurb: "High-AOV furniture funnel with 21-day attribution hit £310k/mo." },
              { id: "a4",  brand: "UK beauty DTC brand",          category: "Ads", metric: "4.1×",  label: "TikTok ROAS", blurb: "Creator-led TikTok Spark Ads at 4.1× ROAS in 60 days." },
              { id: "a6",  brand: "UK WooCommerce home brand",    category: "Ads", metric: "£38k",  label: "Recovered",   blurb: "Rebuilt Meta retargeting recovered £38k in 30 days on a WooCommerce store." },
            ];
            const picks = [pool[seed % pool.length], pool[(seed + 3) % pool.length], pool[(seed + 5) % pool.length]];
            return picks.map((c) => (
              <Link
                key={c.id}
                to="/case-studies/$id"
                params={{ id: c.id }}
                className="card-surface card-hover p-5 flex flex-col group"
                title={`${c.brand} - ${c.category} case study`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{c.category}</span>
                  <div className="text-right">
                    <div className="text-xl font-bold text-ink tabular-nums">{c.metric}</div>
                    <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{c.label}</div>
                  </div>
                </div>
                <div className="mt-3 text-sm font-semibold text-ink">{c.brand}</div>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed flex-1">{c.blurb}</p>
                <span className="mt-4 text-sm font-semibold text-primary group-hover:underline">Read the case study →</span>
              </Link>
            ));
          })()}
        </div>
        <div className="mt-6 text-center">
          <Link to="/case-studies" className="btn btn-outline">See all UK ecommerce case studies →</Link>
        </div>
      </Section>

      {/* 21. FAQ (People Also Ask) */}
      <FaqSection faqs={faqs} title={`People also ask about ecommerce in`} highlight={city} intro={`Answers to the questions ${city} and ${loc.region} founders ask most. Structured for Google, AI Overviews and ChatGPT search.`} />


      {/* 22. CONTACT */}
      <Section eyebrow="Talk to us" title={`Book your free ${city} strategy call`} alt>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <SafeImg src={IMG.meeting} {...imageSeoProps(loc.slug, city, "meeting")} loading="lazy" decoding="async" width={1600} height={900} className="rounded-3xl shadow-xl w-full h-[380px] object-cover" />
          </Reveal>
          <div className="space-y-4">
            {[
              { icon: Calendar, t: "45-minute strategy call", b: `Live audit of your ${city} store, ads and funnel.` },
              { icon: Clock, t: "No sales pitch", b: "Actionable ideas even if we never work together." },
              { icon: Phone, t: "Direct with senior operators", b: "You'll speak with the people who'd run the account." },
              { icon: MessageCircle, t: "WhatsApp available", b: `Prefer WhatsApp? Tap below - a senior ${city} operator will reply directly.` },
            ].map((x, i) => (
              <Reveal key={i} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                <div className="flex gap-4 p-5 card-surface card-hover">
                  <x.icon className="w-6 h-6 text-primary shrink-0" />
                  <div><h4 className="font-semibold text-ink">{x.t}</h4><p className="text-sm text-muted-foreground mt-1">{x.b}</p></div>
                </div>
              </Reveal>
            ))}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={ctaHref("/contact", "contact_section")}
                className="btn btn-primary btn-shimmer hover-scale"
                onClick={() => trackCta("call_booking", "contact_section", { destination: "/contact" })}
              >
                Book strategy call <ArrowRight className="w-4 h-4" />
              </a>
              <WhatsAppBtn label={`WhatsApp ${city} team`} placement="contact_section" />
              <a
                href={ctaHref("/audit", "contact_section")}
                className="btn btn-ghost border border-border hover-scale"
                onClick={() => trackCta("audit_request", "contact_section", { destination: "/audit" })}
              >
                Free audit
              </a>
            </div>
          </div>
        </div>
      </Section>

      <CTA
        heading={`Grow your ${city} ecommerce brand - starting this week`}
        sub={`Join 120+ UK DTC brands scaling with Being Ecom. Free ${city} audit, no commitment.`}
      />
    </PageLayout>
  );
}
