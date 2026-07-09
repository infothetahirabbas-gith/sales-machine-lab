import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowRight, Layers, CheckCircle2, TrendingUp, Target, Zap,
  BarChart3, Rocket, Sparkles, Star, Award, Calendar, LineChart,
  ShoppingBag, Search, Megaphone, Users, Palette, Wrench, Filter,
  MessageCircle, Play, AlertTriangle, TrendingDown, Globe, Compass,
} from "lucide-react";
import PageLayout from "../components/site/PageLayout";
import { Section, SplitHeading, Card, Pill, CTA } from "../components/site/Section";
import { Reveal } from "../hooks/useReveal";
import CountUp from "../components/site/CountUp";
import FaqSection from "../components/site/FaqSection";
import { SafeImg, unsplashSrcSet } from "../components/SafeImg";
import { INDUSTRIES } from "../lib/locations-industries";
import { studies } from "./case-studies.index";
import { industryContentFor, whyNoSalesFor, whySeoMattersFor, industryProcessFor } from "../lib/industry-content";
import { SITE_URL } from "../lib/seo";
import { whatsappForIndustry } from "../lib/whatsapp";
import { MessageCircle as WaIcon } from "lucide-react";

export const Route = createFileRoute("/industries/$slug")({
  loader: ({ params }) => {
    const ind = INDUSTRIES.find((l) => l.slug === params.slug);
    if (!ind) throw notFound();
    return { ind };
  },
  head: ({ loaderData }) => {
    const ind = loaderData?.ind;
    const title = ind
      ? `${ind.name} Ecommerce Agency UK | Being Ecom`
      : "Industry - Being Ecom";
    const desc = ind
      ? `${ind.name} ecommerce growth agency in the UK. Creative, paid media, CRO and retention built specifically for ${ind.name.toLowerCase()} DTC brands scaling profitably.`
      : "UK ecommerce agency by industry.";
    const C = ind ? industryContentFor(ind.slug, ind.name) : undefined;
    const heroImage = C?.images.hero;
    const pageUrl = ind ? `${SITE_URL}/industries/${ind.slug}` : SITE_URL;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large" },
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
      links: heroImage
        ? [
            {
              rel: "preload",
              as: "image",
              href: heroImage,
              imagesrcset: unsplashSrcSet(heroImage),
              imagesizes:
                "(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px",
              fetchpriority: "high",
            },
            { rel: "canonical", href: pageUrl },
          ]
        : [{ rel: "canonical", href: pageUrl }],
      scripts: ind && C
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                  {
                    "@type": "Organization",
                    "@id": `${SITE_URL}#organization`,
                    name: "Being Ecom",
                    url: SITE_URL,
                    logo: `${SITE_URL}/favicon.ico`,
                    sameAs: [
                      "https://www.linkedin.com/company/being-ecom",
                      "https://www.instagram.com/being.ecom",
                    ],
                  },
                  {
                    "@type": "WebPage",
                    "@id": `${pageUrl}#webpage`,
                    url: pageUrl,
                    name: title,
                    description: desc,
                    inLanguage: "en-GB",
                    isPartOf: { "@id": `${SITE_URL}#website` },
                    primaryImageOfPage: heroImage
                      ? { "@type": "ImageObject", url: heroImage }
                      : undefined,
                    breadcrumb: { "@id": `${pageUrl}#breadcrumbs` },
                  },
                  {
                    "@type": "BreadcrumbList",
                    "@id": `${pageUrl}#breadcrumbs`,
                    itemListElement: [
                      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
                      { "@type": "ListItem", position: 2, name: "Industries", item: `${SITE_URL}/industries` },
                      { "@type": "ListItem", position: 3, name: ind.name, item: pageUrl },
                    ],
                  },
                  {
                    "@type": "Service",
                    "@id": `${pageUrl}#service`,
                    serviceType: `${ind.name} ecommerce growth agency`,
                    name: `${ind.name} Ecommerce Growth`,
                    description: C.vibe,
                    provider: { "@id": `${SITE_URL}#organization` },
                    areaServed: { "@type": "Country", name: "United Kingdom" },
                    audience: { "@type": "BusinessAudience", audienceType: `${ind.name} DTC brands` },
                    image: heroImage,
                    url: pageUrl,
                    hasOfferCatalog: {
                      "@type": "OfferCatalog",
                      name: `${ind.name} growth services`,
                      itemListElement: (C.offers ?? []).slice(0, 6).map((o, i) => ({
                        "@type": "Offer",
                        position: i + 1,
                        itemOffered: { "@type": "Service", name: o },
                      })),
                    },
                  },
                  ...(C.faqs && C.faqs.length
                    ? [
                        {
                          "@type": "FAQPage",
                          "@id": `${pageUrl}#faq`,
                          mainEntity: C.faqs.map((f) => ({
                            "@type": "Question",
                            name: f.q,
                            acceptedAnswer: { "@type": "Answer", text: f.a },
                          })),
                        },
                      ]
                    : []),
                ],
              }),
            },
          ]
        : [],
    };
  },
  component: IndustryPage,
  errorComponent: () => (
    <PageLayout>
      <Section title="Something went wrong" intro="Please try again shortly.">
        <Link to="/industries" className="text-primary underline">All industries</Link>
      </Section>
    </PageLayout>
  ),
  notFoundComponent: () => (
    <PageLayout>
      <Section title="Industry not found" intro="Browse the other verticals we serve.">
        <Link to="/industries" className="text-primary underline">View all industries</Link>
      </Section>
    </PageLayout>
  ),
});

function IndustryPage() {
  const { ind } = Route.useLoaderData();
  const C = industryContentFor(ind.slug, ind.name);
  const wa = whatsappForIndustry(ind.name);
  const related = INDUSTRIES.filter((i) => i.slug !== ind.slug).slice(0, 4);

  const CHANNELS = [
    { icon: Megaphone, name: "Meta Ads", body: "Creative-led scale on Facebook + Instagram." },
    { icon: Search,    name: "Google + Shopping", body: "Non-brand Search + Performance Max mastery." },
    { icon: Play,      name: "TikTok Shop", body: "Native creator content + affiliate scale." },
    { icon: Users,     name: "Klaviyo Email + SMS", body: "Segmented lifecycle flows and campaigns." },
    { icon: Filter,    name: "CRO + PDP", body: "Rebuilt product pages, quiz funnels, upsell paths." },
    { icon: BarChart3, name: "GA4 + Triple Whale", body: "Attribution truth, not vanity ROAS." },
  ];

  const FUNNEL = [
    { stage: "TOF", label: "Discovery", body: "New-audience creative + broad Meta / Shopping - hooks that stop the scroll." },
    { stage: "MOF", label: "Consideration", body: "Retargeting, comparison content, review UGC, quiz-based routing." },
    { stage: "BOF", label: "Conversion", body: "Cart abandon flows, urgency offers, PDP CRO, checkout optimisation." },
    { stage: "LTV", label: "Retention", body: "Lifecycle email/SMS, subscription CRO, referral + loyalty." },
  ];

  const TECH = ["Shopify Plus", "Klaviyo", "Meta Ads Manager", "Google Ads + GMC", "TikTok Ads + Shop", "GA4", "Triple Whale", "Recharge", "Yotpo / Okendo", "Postscript / Attentive"];

  const PROCESS = industryProcessFor(ind.name, C.categories);
  const WHY_NO_SALES = whyNoSalesFor(ind.name, C.categories);
  const WHY_SEO = whySeoMattersFor(ind.name, C.categories);

  return (
    <PageLayout>
      {/* 1. HERO */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-[520px] h-[520px] bg-primary/10 blur-[160px] rounded-full float" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 relative grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                <Layers className="size-3.5" /> {ind.name} Industry
              </div>
              <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-[1.05] text-ink">
                <SplitHeading value={`${ind.name} Growth Agency in the UK`} />
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl">{C.hero}</p>
              <p className="mt-3 text-sm text-muted-foreground/80 max-w-xl">{C.vibe}</p>
              <div className="mt-8 btn-pair">
                <Link to="/contact" className="btn btn-primary hover-scale">Book Strategy Call <ArrowRight className="w-4 h-4" /></Link>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn hover-scale bg-[#25D366] text-white hover:bg-[#1ebe57] shadow-md" aria-label={`Chat about ${ind.name} on WhatsApp`}>
                  <WaIcon className="w-4 h-4" /> WhatsApp us
                </a>
                <Link to="/audit" className="btn btn-ghost border border-border hover-scale">Free Store Audit</Link>
              </div>
              <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Star className="w-4 h-4 text-primary" /> 4.9/5 across 120+ UK brands</span>
                <span className="inline-flex items-center gap-1"><Award className="w-4 h-4 text-primary" /> Shopify Plus + Meta partner</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={2}>
            <div className="relative rounded-3xl overflow-hidden border border-border shadow-xl">
              <SafeImg
                src={C.images.hero}
                alt={`${ind.name} ecommerce growth`}
                width={1600}
                height={1000}
                brandOverlay
                className="w-full h-[420px] object-cover"
                fetchPriority="high"
                loading="eager"
                decoding="sync"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. LIVE STATS STRIP */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { n: 120, s: "+", label: "UK brands scaled" },
            { n: C.caseStudy.growthPct, s: "%", label: "Avg growth in 6-9 months" },
            { n: Math.round(C.caseStudy.roas * 10), s: "x", label: "Blended ROAS achieved", divide: 10 },
            { n: 38, s: "%", label: "Email revenue share" },
          ].map((k) => (
            <Reveal key={k.label}>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-ink">
                  {k.divide ? (
                    <><CountUp end={k.n / k.divide} decimals={1} />{k.s}</>
                  ) : (
                    <><CountUp end={k.n} />{k.s}</>
                  )}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{k.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 3. SUB-VERTICALS */}
      <Section eyebrow="Sub-verticals" title={`${ind.name} categories we scale`} intro="One shared growth engine - tuned per sub-category so nothing is generic.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {C.categories.map((c, i) => {
            const anchor = c.id ?? c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
            return (
              <Reveal key={c.name} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                <div id={anchor} className="card-surface card-hover group p-6 scroll-mt-24">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                    <ShoppingBag className="size-5" />
                  </div>
                  <h3 className="text-lg font-bold text-ink">{c.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{c.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* 3b. KICKOFF → 90 DAY TIMELINE */}
      <Section eyebrow="Kickoff → 90 days" title="What the first 90 days look like" alt>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { w: "Week 1", t: "Audit + strategy", b: "Deep-dive on data, competitors, buyer research and a 90-day plan agreed." },
            { w: "Week 2-3", t: "Tracking + creative sprint", b: "GA4 / CAPI / Triple Whale rebuilt. First UGC + motion batches shipped." },
            { w: "Week 4-6", t: "Media buying live", b: "Meta + Google structured, tests running, PDPs rewired for CRO." },
            { w: "Week 7-12", t: "Scale + retention", b: "Winners scaled, Klaviyo flows live, subscription CRO in market." },
          ].map((s, i) => (
            <Reveal key={s.w} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
              <div className="card-surface p-5">
                <Pill>{s.w}</Pill>
                <h4 className="mt-3 font-bold text-ink">{s.t}</h4>
                <p className="text-sm text-muted-foreground mt-2">{s.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 3c. WEEKLY CADENCE */}
      <Section eyebrow="Weekly cadence" title={`What you'll actually get every week`}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { n: "3", u: "UGC + motion creatives", d: "Named tests with a clear hypothesis." },
            { n: "5+", u: "Ad tests shipped", d: "Hooks, offers, audiences - one variable at a time." },
            { n: "1", u: "Loom performance walk-through", d: "What worked, what failed, what's next." },
            { n: "1-2", u: "Klaviyo campaigns", d: "Segmented sends tuned to your lifecycle." },
            { n: "1", u: "Flow / PDP CRO update", d: "One meaningful conversion improvement live." },
            { n: "1", u: "Founder Slack sync", d: "Direct line to your senior operators - no account managers." },
          ].map((c, i) => (
            <Reveal key={c.u} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
              <div className="card-surface p-5 flex gap-4">
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-2xl font-display font-bold">{c.n}</div>
                <div>
                  <h4 className="font-semibold text-ink">{c.u}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{c.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>


      {/* 4. BUYER PSYCHOLOGY */}
      <Section eyebrow="Buyer psychology" title={`How ${ind.name.toLowerCase()} shoppers actually buy`} alt>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <div className="rounded-3xl overflow-hidden border border-border">
              <SafeImg src={C.images.buyers} alt={`${ind.name} shopper research`} width={1600} height={900} className="w-full h-[360px] object-cover" brandOverlay loading="eager" fetchPriority="high" />
            </div>
          </Reveal>
          <div className="space-y-3">
            {C.buyerPsychology.map((p, i) => (
              <Reveal key={p.title} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                <div className="card-surface p-5 flex gap-3">
                  <div className="shrink-0 w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center"><Target className="size-4" /></div>
                  <div>
                    <h4 className="font-semibold text-ink">{p.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* 5. PAIN POINTS */}
      <Section eyebrow="What breaks scale" title="Pain points we fix in the first 60 days">
        <div className="grid md:grid-cols-2 gap-4">
          {C.painPoints.map((p, i) => (
            <Reveal key={p.title} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
              <div className="card-surface p-5 flex gap-3">
                <div className="shrink-0 w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center"><Zap className="size-4" /></div>
                <div>
                  <h4 className="font-semibold text-ink">{p.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{p.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 5b. WHY ECOMMERCE STORES AREN'T GETTING SALES (industry-specific) */}
      <Section eyebrow="The uncomfortable truth" title={`Why ${ind.name.toLowerCase()} stores aren't getting orders`} alt>
        <Reveal><p className="max-w-3xl text-muted-foreground -mt-4 mb-8">{WHY_NO_SALES.intro}</p></Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {WHY_NO_SALES.items.map((p, i) => (
            <Reveal key={p.title} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
              <div className="card-surface p-6 h-full border-l-4 border-primary/60 hover:border-primary transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <AlertTriangle className="size-5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">Issue #{i + 1}</span>
                </div>
                <h4 className="font-bold text-ink text-lg">{p.title}</h4>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-8 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/5 border border-primary/20 p-6 flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
            <div className="flex items-start gap-3">
              <TrendingDown className="w-6 h-6 text-primary shrink-0 mt-1" />
              <div>
                <div className="font-bold text-ink">Get the exact leaks in your store - free.</div>
                <div className="text-sm text-muted-foreground">Our Being Ecom Brain™ audit scores 17 phases in under 60 seconds.</div>
              </div>
            </div>
            <Link to="/audit" className="btn btn-primary shrink-0">Run free audit <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </Reveal>
      </Section>

      {/* 5c. WHY SEO MATTERS (industry-specific) */}
      <Section eyebrow="Own your traffic" title={`Why SEO matters for ${ind.name.toLowerCase()} brands`}>
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          <Reveal>
            <div className="lg:col-span-2 space-y-5">
              <p className="text-muted-foreground text-lg leading-relaxed">{WHY_SEO.intro}</p>
              <div className="rounded-2xl bg-secondary/40 border border-border p-5 space-y-3">
                <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest">
                  <Globe className="size-4" /> Traffic ownership
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-ink"><CountUp end={0} />%</span>
                  <span className="text-sm text-muted-foreground">CAC on organic clicks - forever.</span>
                </div>
                <div className="text-sm text-muted-foreground">Meanwhile Meta CPMs rose 61% YoY. SEO is the only channel where scale <span className="font-semibold text-ink">lowers</span> unit cost.</div>
              </div>
              <div className="flex gap-3">
                <Link to="/services/seo" className="btn btn-primary">Explore SEO service <ArrowRight className="w-4 h-4" /></Link>
                <Link to="/services/seo/aeo" className="btn btn-ghost border border-border">AI Search (AEO)</Link>
              </div>
            </div>
          </Reveal>
          <div className="lg:col-span-3 space-y-3">
            {WHY_SEO.points.map((p, i) => (
              <Reveal key={p.title} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                <div className="card-surface p-5 flex gap-4 group hover:shadow-lg transition-shadow">
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg group-hover:bg-primary group-hover:text-white transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h4 className="font-bold text-ink">{p.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* 6. OUR GROWTH ENGINE OVERVIEW */}
      <Section eyebrow="The engine" title="One integrated growth system" alt>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Palette,   label: "Creative studio" },
              { icon: Megaphone, label: "Paid media" },
              { icon: Filter,    label: "CRO + PDP" },
              { icon: Users,     label: "Retention (Email + SMS)" },
              { icon: Search,    label: "SEO + Content" },
              { icon: BarChart3, label: "Attribution" },
            ].map((b, i) => (
              <Reveal key={b.label} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                <div className="card-surface p-5 text-center">
                  <div className="w-11 h-11 mx-auto rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                    <b.icon className="size-5" />
                  </div>
                  <div className="font-semibold text-ink text-sm">{b.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={2}>
            <div className="rounded-3xl overflow-hidden border border-border">
              <SafeImg src={C.images.process} alt={`${ind.name} growth engine process`} width={1600} height={900} className="w-full h-[360px] object-cover" brandOverlay loading="eager" />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 7. OUR PROCESS - industry-flavored, 7 steps unique per vertical */}
      <Section eyebrow="How we work" title={`Our process for scaling ${ind.name.toLowerCase()} brands`}>
        <Reveal>
          <p className="max-w-3xl text-muted-foreground -mt-4 mb-8">
            The same operating system that scaled 120+ UK stores - sequenced for how {ind.name.toLowerCase()} buyers actually shop, from first click to third repeat order.
          </p>
        </Reveal>
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent -translate-x-1/2" aria-hidden="true" />
          <div className="space-y-6">
            {PROCESS.map((p, i) => {
              const left = i % 2 === 0;
              return (
                <Reveal key={p.title} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                  <div className={`md:grid md:grid-cols-2 md:gap-8 items-center ${left ? "" : "md:[&>*:first-child]:col-start-2"}`}>
                    <div className={`card-surface p-6 relative ${left ? "md:text-right" : ""}`}>
                      <div className={`inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary mb-3`}>
                        <Compass className="size-3" /> Step {i + 1} of {PROCESS.length}
                      </div>
                      <h4 className="text-lg md:text-xl font-bold text-ink">{p.title.replace(/^\d+\.\s*/, "")}</h4>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{p.body}</p>
                      <span className="hidden md:block absolute top-1/2 w-3 h-3 rounded-full bg-primary ring-4 ring-white shadow-md -translate-y-1/2" style={left ? { right: "-1.4rem" } : { left: "-1.4rem" }} aria-hidden="true" />
                    </div>
                    <div className="hidden md:block" aria-hidden="true" />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>

      {/* 8. CREATIVE ANGLES */}
      <Section eyebrow="Creative" title={`Creative angles that win in ${ind.name.toLowerCase()}`} alt>
        <div className="grid lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-1">
            <Reveal>
              <div className="rounded-3xl overflow-hidden border border-border">
                <SafeImg src={C.images.creative} alt={`${ind.name} creative studio`} width={1200} height={1400} className="w-full h-[420px] object-cover" skeleton brandOverlay />
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-3">
            {C.creativeAngles.map((a, i) => (
              <Reveal key={a} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                <div className="rounded-2xl border border-border bg-white p-4 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-ink font-medium">{a}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* 9. FULL-FUNNEL BREAKDOWN */}
      <Section eyebrow="Full funnel" title="How each stage is built">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {FUNNEL.map((f, i) => (
            <Reveal key={f.stage} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
              <Card>
                <Pill>{f.stage}</Pill>
                <h4 className="mt-3 text-lg font-bold text-ink">{f.label}</h4>
                <p className="text-sm text-muted-foreground mt-2">{f.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 10. CHANNEL MIX */}
      <Section eyebrow="Channels" title="What we execute weekly" alt>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CHANNELS.map((c, i) => (
            <Reveal key={c.name} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
              <Card>
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                  <c.icon className="size-5" />
                </div>
                <h3 className="text-lg font-bold text-ink">{c.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">{c.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 11. KPI TARGETS */}
      <Section eyebrow="Targets we hit" title="KPI benchmarks we ship against">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {C.kpiTargets.map((k, i) => (
            <Reveal key={k.label} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
              <div className="card-surface p-6 text-center">
                <div className="text-3xl font-bold text-primary">{k.value}</div>
                <div className="mt-2 font-semibold text-ink">{k.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{k.note}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 12. TECH STACK */}
      <Section eyebrow="Stack" title="The tools we deploy and manage" alt>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <div className="rounded-3xl overflow-hidden border border-border">
              <SafeImg src={C.images.tech} alt="Ecommerce tech stack" width={1600} height={900} className="w-full h-[340px] object-cover" skeleton brandOverlay />
            </div>
          </Reveal>
          <div className="flex flex-wrap gap-2">
            {TECH.map((t) => (
              <Pill key={t}>{t}</Pill>
            ))}
          </div>
        </div>
      </Section>

      {/* 13. SEASONAL CALENDAR */}
      <Section eyebrow="Playbook by month" title="UK seasonal calendar we execute against">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {C.seasonalMoments.map((s, i) => (
            <Reveal key={s.month} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
              <div className="card-surface p-5 flex gap-3">
                <div className="shrink-0 w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                  {s.month}
                </div>
                <div className="text-sm text-muted-foreground pt-2">{s.play}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 14. FEATURED CASE STUDY */}
      <Section eyebrow="Proof" title="Recent case study" alt>
        <Reveal>
          <div className="rounded-3xl overflow-hidden border border-border grid lg:grid-cols-2">
            <SafeImg src={C.images.caseStudy} alt="Case study" width={1200} height={900} className="w-full h-full min-h-[280px] object-cover" skeleton brandOverlay />
            <div className="p-8 lg:p-12 bg-white">
              <Pill>{C.caseStudy.brand}</Pill>
              <h3 className="mt-4 text-2xl md:text-3xl font-bold text-ink">{C.caseStudy.headline}</h3>
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary"><CountUp end={C.caseStudy.growthPct} />%</div>
                  <div className="text-xs text-muted-foreground">Growth</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary"><CountUp end={C.caseStudy.roas} decimals={1} />x</div>
                  <div className="text-xs text-muted-foreground">Blended ROAS</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary"><CountUp end={C.caseStudy.months} /> mo</div>
                  <div className="text-xs text-muted-foreground">Time to scale</div>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/case-studies" className="btn btn-primary hover-scale">See all case studies <ArrowRight className="w-4 h-4" /></Link>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn hover-scale bg-[#25D366] text-white hover:bg-[#1ebe57]" aria-label={`Chat about ${ind.name} case studies on WhatsApp`}>
                  <WaIcon className="w-4 h-4" /> Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* 14b. RELATED CASE STUDIES - filtered from the master case-study
          taxonomy by industrySlug. Falls back to an "on request" card when
          the industry has no published studies yet, so the page never
          orphans a taxonomy entry. */}
      <Section eyebrow={`More ${ind.name} case studies`} title="Playbooks by category" intro={`Every ${ind.name.toLowerCase()} case study we've published, filtered from the master case-study taxonomy.`}>
        {(() => {
          const related = studies.filter((s) => s.industrySlug === ind.slug);
          if (related.length === 0) {
            return (
              <div className="rounded-2xl border border-border bg-card p-8 text-center">
                <div className="text-sm font-semibold text-primary uppercase tracking-widest">On request</div>
                <p className="mt-3 text-ink font-medium">We've run this playbook for {ind.name.toLowerCase()} brands under NDA - public write-ups coming soon. Ask us for a walkthrough on your next call.</p>
                <Link to="/contact" className="mt-6 btn btn-primary hover-scale inline-flex">Request a walkthrough <ArrowRight className="w-4 h-4" /></Link>
              </div>
            );
          }
          return (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.slice(0, 9).map((s) => (
                <Link key={s.id} to="/case-studies/$id" params={{ id: s.id }} className="card-surface card-hover p-5 group">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-primary">{s.category}</span>
                    <span className="text-[11px] text-muted-foreground">{s.duration}</span>
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-ink leading-snug group-hover:text-primary transition">{s.title}</h3>
                  <div className="mt-4 flex items-center gap-2 text-2xl font-bold text-ink">
                    {s.metric}
                    <span className="text-xs font-normal text-muted-foreground">{s.metricLabel}</span>
                  </div>
                  <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                    Read case study <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          );
        })()}
        {(() => {
          const related = studies.filter((s) => s.industrySlug === ind.slug);
          if (related.length <= 9) return null;
          return (
            <div className="mt-6 text-center">
              <Link to="/case-studies" className="btn btn-outline hover-scale inline-flex">See all {related.length} {ind.name.toLowerCase()} case studies <ArrowRight className="w-4 h-4" /></Link>
            </div>
          );
        })()}
      </Section>



      {/* 15. RESULTS GRID */}
      <Section eyebrow="At a glance" title="What clients typically see with us">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: TrendingUp, k: "Revenue", v: `+${C.caseStudy.growthPct}%`, s: "in 6-9 months" },
            { icon: Target,     k: "Blended ROAS", v: `${C.caseStudy.roas}x`, s: "sustained" },
            { icon: LineChart,  k: "CAC", v: "-31%", s: "vs baseline" },
            { icon: Rocket,     k: "Email revenue", v: "38%", s: "of store total" },
          ].map((r, i) => (
            <Reveal key={r.k} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
              <Card>
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                  <r.icon className="size-5" />
                </div>
                <div className="text-3xl font-bold text-ink">{r.v}</div>
                <div className="mt-1 font-semibold text-ink">{r.k}</div>
                <div className="text-xs text-muted-foreground">{r.s}</div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 16. TESTIMONIAL */}
      <Section alt>
        <Reveal>
          <blockquote className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center gap-1 text-primary mb-4">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
            </div>
            <p className="text-2xl md:text-3xl font-medium text-ink leading-snug">
              "{C.testimonial.quote}"
            </p>
            <footer className="mt-6 text-sm text-muted-foreground">
              <span className="font-semibold text-ink">{C.testimonial.name}</span> - {C.testimonial.role}
            </footer>
          </blockquote>
        </Reveal>
      </Section>

      {/* 17. OFFERS THAT WORK */}
      <Section eyebrow="Offers that convert" title={`Proven offer angles for ${ind.name.toLowerCase()}`}>
        <div className="grid md:grid-cols-3 gap-4">
          {C.offers.map((o, i) => (
            <Reveal key={o} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
              <div className="card-surface p-5 flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-ink font-medium">{o}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 18. SUB-SERVICES - deep-dive service pages built for this industry */}
      <Section eyebrow="Go deeper" title={`Service pages built for ${ind.name.toLowerCase()} brands`} intro="Every service below is tuned for your vertical. Click through for scope, deliverables and pricing." alt>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {([
            { to: "/industries/$slug/paid-ads" as const, params: { slug: ind.slug }, img: C.images.creative, icon: Megaphone, title: `${ind.name} Paid Ads`, desc: `Meta, Google, TikTok & YouTube scaling built for ${ind.name.toLowerCase()} DTC brands.`, tag: "Industry-specific",
              subs: [
                { label: "Facebook Ads", to: "/services/performance-marketing/facebook-ads" as const },
                { label: "Google Ads", to: "/services/performance-marketing/google-ads" as const },
                { label: "TikTok Ads", to: "/services/performance-marketing/tiktok-ads" as const },
                { label: "Instagram Ads", to: "/services/performance-marketing/instagram-ads" as const },
                { label: "YouTube Ads", to: "/services/performance-marketing/youtube-ads" as const },
                { label: "Media Buying", to: "/services/performance-marketing/media-buying" as const },
              ] },
            { to: "/services/seo" as const, img: C.images.tech, icon: Search, title: `SEO for ${ind.name}`, desc: `Technical, on-page, off-page & AEO to own ${ind.name.toLowerCase()} search demand.`, tag: "Own your traffic",
              subs: [
                { label: "Technical SEO", to: "/services/seo/technical" as const },
                { label: "On-Page SEO", to: "/services/seo/on-page" as const },
                { label: "Off-Page SEO", to: "/services/seo/off-page" as const },
                { label: "Local SEO", to: "/services/seo/local" as const },
                { label: "International SEO", to: "/services/seo/international" as const },
                { label: "AEO", to: "/services/seo/aeo" as const },
              ] },
            { to: "/services/store-development" as const, img: C.images.process, icon: Wrench, title: "Store Development", desc: `Shopify & WooCommerce builds engineered to convert ${ind.name.toLowerCase()} shoppers.`, tag: "Build to convert",
              subs: [
                { label: "Shopify", to: "/services/store-development/shopify" as const },
                { label: "WooCommerce", to: "/services/store-development/woocommerce" as const },
              ] },
            { to: "/services/cro" as const, img: C.images.funnel, icon: TrendingUp, title: "CRO & Landing Pages", desc: `Session recordings, A/B testing and PDP rebuilds to lift ${ind.name.toLowerCase()} AOV.`, tag: "Higher AOV",
              subs: [
                { label: "Funnel Design", to: "/services/funnel" as const },
                { label: "Analytics", to: "/services/analytics" as const },
                { label: "Scaling", to: "/services/scaling" as const },
              ] },
            { to: "/services/email-sms" as const, img: C.images.buyers, icon: MessageCircle, title: "Email & SMS", desc: `Klaviyo flows and campaigns that make retention 30–40% of ${ind.name.toLowerCase()} revenue.`, tag: "Own your list",
              subs: [
                { label: "Email & SMS", to: "/services/email-sms" as const },
                { label: "Funnel Design", to: "/services/funnel" as const },
                { label: "Analytics", to: "/services/analytics" as const },
                { label: "AI Automation", to: "/services/ai-automation" as const },
              ] },
            { to: "/services/creative" as const, img: C.images.caseStudy, icon: Palette, title: "Creative Studio", desc: `UGC, static and motion tuned to ${ind.name.toLowerCase()} hooks that actually convert.`, tag: "Creative that ships",
              subs: [
                { label: "Creative Studio", to: "/services/creative" as const },
                { label: "Performance Marketing", to: "/services/performance-marketing" as const },
                { label: "AI Automation", to: "/services/ai-automation" as const },
                { label: "Scaling", to: "/services/scaling" as const },
              ] },
          ] as const).map((s, i) => (
            <Reveal key={s.title} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
              <div className="card-surface card-hover group flex flex-col overflow-hidden h-full">
                <Link
                  to={s.to}
                  {...(("params" in s && s.params) ? { params: s.params } : {})}
                  className="block relative aspect-[16/9] overflow-hidden"
                  aria-label={`${s.title} - overview`}
                >
                  <SafeImg
                    src={s.img}
                    srcSet={unsplashSrcSet(s.img)}
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    alt={`${s.title} for ${ind.name.toLowerCase()} brands`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    skeleton
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/95 text-ink text-[11px] font-semibold px-2.5 py-1 shadow-sm">
                      <s.icon className="size-3.5 text-primary" /> {s.tag}
                    </span>
                  </div>
                </Link>
                <div className="p-5 flex-1 flex flex-col">
                  <Link
                    to={s.to}
                    {...(("params" in s && s.params) ? { params: s.params } : {})}
                    className="text-lg font-bold text-ink hover:text-primary transition-colors"
                  >
                    {s.title}
                  </Link>
                  <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
                  <div className="mt-4">
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-2">Sub-services</div>
                    <div className="flex flex-wrap gap-1.5">
                      {s.subs.map((sub) => (
                        <Link
                          key={sub.label + sub.to}
                          to={sub.to}
                          className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/40 text-primary text-[12px] font-medium px-2.5 py-1 transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <Link
                    to={s.to}
                    {...(("params" in s && s.params) ? { params: s.params } : {})}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary"
                  >
                    Explore service <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            See all services <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>

      {/* 19. RELATED INDUSTRIES */}
      <Section eyebrow="Also serving" title="Related industries we scale">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {related.map((r, i) => (
            <Reveal key={r.slug} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
              <Link to="/industries/$slug" params={{ slug: r.slug }} className="card-surface card-hover p-5 block">
                <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3"><Layers className="size-4" /></div>
                <h4 className="font-bold text-ink">{r.name}</h4>
                <div className="mt-3 inline-flex items-center gap-1 text-sm text-primary font-semibold">
                  Explore <ArrowRight className="size-4" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 20. FAQ */}
      <FaqSection
        faqs={C.faqs}
        eyebrow={`${ind.name} FAQ`}
        title={`Questions ${ind.name.toLowerCase()} founders`}
        highlight="ask us"
        intro="If we haven't answered it, message the team on WhatsApp - usually a reply within the hour on UK business days."
      />

      {/* 21. WHATSAPP QUICK BAR */}
      <Section>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-r from-[#25D366]/10 via-primary/5 to-accent/10 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-5 justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shrink-0 animate-pulse">
                <WaIcon className="size-6" />
              </div>
              <div>
                <div className="font-bold text-ink text-lg">Talk to a senior {ind.name.toLowerCase()} operator now</div>
                <div className="text-sm text-muted-foreground">Average reply time <span className="font-bold text-ink"><CountUp end={7} /> minutes</span> on UK business hours. No forms, no juniors.</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn hover-scale bg-[#25D366] text-white hover:bg-[#1ebe57] shadow-md">
                <WaIcon className="w-4 h-4" /> Message on WhatsApp
              </a>
              <Link to="/contact" className="btn btn-ghost border border-border hover-scale">Book a call instead</Link>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* 22. FINAL CTA */}
      <CTA
        heading={`Ready to scale your ${ind.name.toLowerCase()} brand?`}
        sub="Book a free strategy call - we'll show you the exact plays your competitors are already running."
      />
    </PageLayout>
  );
}
