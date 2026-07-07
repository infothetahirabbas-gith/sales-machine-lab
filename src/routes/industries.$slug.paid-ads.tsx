import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowRight, Megaphone, Target, Zap, BarChart3, Rocket, Sparkles,
  Star, Award, Play, Search, Filter, CheckCircle2, TrendingUp, Users, PoundSterling,
  MessageCircle as WaIcon,
} from "lucide-react";
import PageLayout from "../components/site/PageLayout";
import { Section, SplitHeading, Card, Pill, NumberedList, CTA } from "../components/site/Section";
import { Reveal } from "../hooks/useReveal";
import CountUp from "../components/site/CountUp";
import FaqSection from "../components/site/FaqSection";
import { SafeImg } from "../components/SafeImg";
import { INDUSTRIES } from "../lib/locations-industries";
import { industryContentFor } from "../lib/industry-content";
import { SITE_URL } from "../lib/seo";
import { whatsappForIndustry } from "../lib/whatsapp";

export const Route = createFileRoute("/industries/$slug/paid-ads")({
  loader: ({ params }) => {
    const ind = INDUSTRIES.find((l) => l.slug === params.slug);
    if (!ind) throw notFound();
    return { ind };
  },
  head: ({ loaderData }) => {
    const ind = loaderData?.ind;
    const title = ind
      ? `${ind.name} Paid Ads Agency UK — Meta, Google & TikTok | Being Ecom`
      : "Paid Ads — Being Ecom";
    const desc = ind
      ? `Paid advertising built for ${ind.name.toLowerCase()} brands. Meta, Google Shopping and TikTok scaled by a senior UK team — real ROAS, real revenue.`
      : "UK paid ads agency.";
    const C = ind ? industryContentFor(ind.slug, ind.name) : undefined;
    const heroImage = C?.images.hero;
    const pageUrl = ind ? `${SITE_URL}/industries/${ind.slug}/paid-ads` : SITE_URL;
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
    };
  },
  component: IndustryPaidAdsPage,
  errorComponent: () => (
    <PageLayout>
      <Section title="Something went wrong">
        <Link to="/industries" className="text-primary underline">All industries</Link>
      </Section>
    </PageLayout>
  ),
  notFoundComponent: () => (
    <PageLayout>
      <Section title="Industry not found">
        <Link to="/industries" className="text-primary underline">All industries</Link>
      </Section>
    </PageLayout>
  ),
});

function IndustryPaidAdsPage() {
  const { ind } = Route.useLoaderData();
  const C = industryContentFor(ind.slug, ind.name);
  const wa = whatsappForIndustry(ind.name, "Interested in your paid ads service (Meta, Google, TikTok).");

  const CHANNELS = [
    { icon: Megaphone, name: "Meta Ads (Facebook + Instagram)", body: "Creative-led broad scaling with Advantage+ shopping and manual campaigns for control." },
    { icon: Search,    name: "Google Ads + Performance Max", body: "Non-brand Search, Shopping feed mastery, PMax with asset-group discipline." },
    { icon: Play,      name: "TikTok Ads + TikTok Shop", body: "Native creator content, Spark Ads, and affiliate-driven scale." },
    { icon: Sparkles,  name: "Pinterest (where it fits)", body: "For home, arts and fashion — high-intent visual discovery layer." },
  ];

  const META = [
    { title: "Account structure", body: "Simple, testable account: broad + advantage+, prospecting, retargeting, DPA. No 20-adset spaghetti." },
    { title: "Creative velocity", body: "3 UGC + motion batches weekly. Named tests, controlled variables, real learnings." },
    { title: "Bid + budget ops",  body: "Daily bid ops during scale windows. Budget shifted on evidence, not vibes." },
    { title: "CAPI + attribution", body: "Server-side + Triple Whale so you know which ads actually drive net-new revenue." },
  ];

  const GOOGLE = [
    { title: "Search hierarchy",  body: "Brand + non-brand + competitor tiers with clean match types and negatives." },
    { title: "Shopping feed",     body: "Merchant Center rebuild, custom labels, item-level bidding structure." },
    { title: "Performance Max",   body: "Asset-group discipline, audience signals, first-party data feeds." },
    { title: "Landing pages",     body: "Search-intent-matched LPs — not the homepage." },
  ];

  const TIKTOK = [
    { title: "Native-first creative", body: "Scripted for TikTok, not repurposed Meta. Hooks under 2 seconds." },
    { title: "Creator seeding",       body: "Ambassador + Spark Ads pipeline with monthly content refresh." },
    { title: "TikTok Shop + affiliate", body: "Shop set-up, product feed, and creator affiliate scaling." },
    { title: "Whitelisting",          body: "Compliant creator whitelisting so ads look native — because they are." },
  ];

  const TESTING = [
    { title: "Weekly hypothesis",  body: "Every week we ship named tests with a clear hypothesis and success metric." },
    { title: "Isolate variables",  body: "Hook / body / offer / audience — one variable at a time on winners." },
    { title: "Kill fast, scale hard", body: "48-hour kill rule for under-performers, 20% daily budget lifts on winners." },
    { title: "Insights loop",      body: "Winning angles feed back into creative sprints — nothing is one-off." },
  ];

  const BUDGET = [
    { tier: "£3k–£8k/mo",  headline: "Test & prove",  body: "Single channel (usually Meta) to prove economics before scaling." },
    { tier: "£8k–£25k/mo", headline: "Scale phase",   body: "Meta + Google in parallel, creative production baked in." },
    { tier: "£25k+/mo",    headline: "Growth engine", body: "Full-channel stack, senior pod, weekly strategy days." },
  ];

  const FAQS = [
    { q: `Do you specialise in ${ind.name.toLowerCase()} paid ads?`, a: `Yes — a senior pod runs paid across ${ind.name.toLowerCase()} accounts only, so buyer psychology and creative angles are already tuned.` },
    { q: `What's a realistic ROAS target?`, a: `We benchmark blended ROAS at ${C.caseStudy.roas}x sustained over 90 days, with strong outliers higher during launch/BFCM windows.` },
    { q: `What's the minimum ad spend?`, a: `£3k/month is our floor for meaningful learning. Below that, we recommend our audit + DIY playbooks first.` },
    { q: `Who runs my account day-to-day?`, a: `A senior media buyer, backed by a creative strategist and analyst. No juniors on your account.` },
    { q: `Do you produce the creative?`, a: `Yes. In-house UGC, motion and studio product — 3 batches/week is the baseline.` },
    { q: `How is performance reported?`, a: `Weekly Loom + live Triple Whale dashboard. Monthly strategy review. Attribution truth, not vanity metrics.` },
  ];

  return (
    <PageLayout>
      {/* HERO */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-[520px] h-[520px] bg-primary/10 blur-[160px] rounded-full float" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 relative grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div>
              <div className="flex items-center gap-2 text-xs">
                <Link to="/industries/$slug" params={{ slug: ind.slug }} className="text-muted-foreground hover:text-primary">← {ind.name}</Link>
              </div>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                <Megaphone className="size-3.5" /> {ind.name} Paid Ads
              </div>
              <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-[1.05] text-ink">
                <SplitHeading value={`${ind.name} Paid Ads — Meta, Google & TikTok`} />
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl">
                Performance advertising built for {ind.name.toLowerCase()} brands. Senior UK team, creative velocity, and attribution you can actually trust.
              </p>
              <div className="mt-8 btn-pair">
                <Link to="/contact" className="btn btn-primary">Book Strategy Call <ArrowRight className="w-4 h-4" /></Link>
                <Link to="/audit" className="btn btn-ghost border border-border">Free Ads Audit</Link>
              </div>
              <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Star className="w-4 h-4 text-primary" /> 4.9/5 across 120+ UK brands</span>
                <span className="inline-flex items-center gap-1"><Award className="w-4 h-4 text-primary" /> Meta + Google + TikTok partner</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={2}>
            <div className="relative rounded-3xl overflow-hidden border border-border shadow-xl">
              <SafeImg
                src={C.images.funnel}
                alt={`${ind.name} paid ads dashboard`}
                width={1600}
                height={1000}
                skeleton
                brandOverlay
                className="w-full h-[420px] object-cover"
                fetchPriority="high"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { n: C.caseStudy.growthPct, s: "%", label: "Avg revenue growth" },
            { n: Math.round(C.caseStudy.roas * 10), s: "x", label: "Blended ROAS", d: 10 },
            { n: 31, s: "%", label: "CAC reduction" },
            { n: 3, s: "/wk", label: "Creative batches shipped" },
          ].map((k) => (
            <Reveal key={k.label}>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-ink">
                  {k.d ? <><CountUp end={k.n / k.d} decimals={1} />{k.s}</> : <><CountUp end={k.n} />{k.s}</>}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{k.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CHANNELS */}
      <Section eyebrow="Channels" title="What we run across paid">
        <div className="grid sm:grid-cols-2 gap-4">
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

      {/* KICKOFF TIMELINE */}
      <Section eyebrow="Kickoff" title="From signed to scaling in 30 days" alt>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { d: "Day 1-3", t: "Access + audit", b: "Ad accounts, GA4, Shopify — full baseline audit shipped." },
            { d: "Day 4-10", t: "Tracking rebuild", b: "CAPI, Enhanced Conversions, GA4 server-side, Triple Whale." },
            { d: "Day 8-14", t: "First creatives live", b: "3 UGC + motion batches shot, edited, uploaded." },
            { d: "Day 14-30", t: "Media buying scale", b: "Meta + Google restructured, budgets shifted onto winners." },
          ].map((s, i) => (
            <Reveal key={s.d} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
              <div className="card-surface p-5">
                <Pill>{s.d}</Pill>
                <h4 className="mt-3 font-bold text-ink">{s.t}</h4>
                <p className="text-sm text-muted-foreground mt-2">{s.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* META APPROACH */}
      <Section eyebrow="Meta Ads" title={`How we scale Meta for ${ind.name.toLowerCase()}`} alt>
        <NumberedList items={META} />
      </Section>

      {/* GOOGLE APPROACH */}
      <Section eyebrow="Google Ads" title="Google Search, Shopping & Performance Max">
        <NumberedList items={GOOGLE} />
      </Section>

      {/* TIKTOK APPROACH */}
      <Section eyebrow="TikTok" title="TikTok Ads + Shop" alt>
        <NumberedList items={TIKTOK} />
      </Section>

      {/* CREATIVE PROCESS */}
      <Section eyebrow="Creative" title={`${ind.name} creative angles that convert`}>
        <div className="grid lg:grid-cols-3 gap-10 items-start">
          <Reveal>
            <div className="rounded-3xl overflow-hidden border border-border">
              <SafeImg src={C.images.creative} alt="Creative studio" width={1200} height={1400} className="w-full h-[420px] object-cover" skeleton brandOverlay />
            </div>
          </Reveal>
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

      {/* TESTING FRAMEWORK */}
      <Section eyebrow="Testing" title="How we run tests, weekly" alt>
        <NumberedList items={TESTING} />
      </Section>

      {/* BUDGET BANDS */}
      <Section eyebrow="Spend tiers" title="What each budget band unlocks">
        <div className="grid md:grid-cols-3 gap-4">
          {BUDGET.map((b, i) => (
            <Reveal key={b.tier} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
              <Card>
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                  <PoundSterling className="size-5" />
                </div>
                <div className="text-sm font-bold text-primary">{b.tier}</div>
                <h3 className="mt-2 text-lg font-bold text-ink">{b.headline}</h3>
                <p className="text-sm text-muted-foreground mt-2">{b.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* REPORTING */}
      <Section eyebrow="Reporting" title="Attribution truth, not vanity ROAS" alt>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <div className="rounded-3xl overflow-hidden border border-border">
              <SafeImg src={C.images.tech} alt="Attribution dashboard" width={1600} height={900} className="w-full h-[340px] object-cover" skeleton brandOverlay />
            </div>
          </Reveal>
          <div className="space-y-3">
            {[
              { icon: BarChart3, t: "Weekly Loom + live dashboard", b: "Triple Whale live dashboard + weekly Loom breakdown." },
              { icon: Target,    t: "Server-side + CAPI",           b: "Meta CAPI, Google Enhanced Conversions, GA4 server-side." },
              { icon: TrendingUp, t: "Blended not siloed",           b: "Blended ROAS + MER, plus channel-level incrementality." },
              { icon: Users,     t: "Founder-level clarity",         b: "No jargon. You know what worked, what failed and what's next." },
            ].map((r, i) => (
              <Reveal key={r.t} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                <div className="card-surface p-5 flex gap-3">
                  <div className="shrink-0 w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center"><r.icon className="size-4" /></div>
                  <div>
                    <h4 className="font-semibold text-ink">{r.t}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{r.b}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* RESULTS */}
      <Section eyebrow="Proof" title="Recent paid ads result">
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
                  <div className="text-xs text-muted-foreground">ROAS</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary"><CountUp end={C.caseStudy.months} /> mo</div>
                  <div className="text-xs text-muted-foreground">To scale</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* TESTIMONIAL */}
      <Section alt>
        <Reveal>
          <blockquote className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center gap-1 text-primary mb-4">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
            </div>
            <p className="text-2xl md:text-3xl font-medium text-ink leading-snug">"{C.testimonial.quote}"</p>
            <footer className="mt-6 text-sm text-muted-foreground">
              <span className="font-semibold text-ink">{C.testimonial.name}</span> — {C.testimonial.role}
            </footer>
          </blockquote>
        </Reveal>
      </Section>

      {/* FAQ */}
      <FaqSection
        faqs={FAQS}
        eyebrow="Paid Ads FAQ"
        title="Questions we get"
        highlight="most weeks"
      />

      {/* CTA */}
      <CTA
        heading={`Ready to scale ${ind.name.toLowerCase()} paid ads?`}
        sub="Free ads audit — we'll review your account and show you exactly where revenue is leaking."
      />
    </PageLayout>
  );
}
