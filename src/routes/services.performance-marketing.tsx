import { createFileRoute, Link } from "@tanstack/react-router";
import PageLayout from "../components/site/PageLayout";
import { Section, Card, CTA } from "../components/site/Section";
import { Reveal } from "../hooks/useReveal";
import RevenueBars from "../components/site/RevenueBars";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd, type FAQ } from "../lib/seo";
import { ArrowRight, ArrowUpRight, CheckCircle2, XCircle, Ban, Minus, Star, Quote, Calendar, Package, Wrench, Layers, Target, TrendingUp, Zap, Shield, AlertTriangle } from "lucide-react";
import heroPM from "../assets/hero-performance-marketing.jpg";

const FAQ_LIST: FAQ[] = [
  { q: "How is performance marketing different from just running ads?", a: "Ads is a channel. Performance marketing is a P&L. We manage blended ROAS (MER), CAC, LTV and payback period across Meta, Google, TikTok and YouTube as a single portfolio - never optimising one channel in isolation." },
  { q: "What's a healthy blended ROAS (MER) for a scaling ecommerce brand?", a: "Depends on contribution margin. Most UK DTC brands need 3.0–4.5× MER to hit contribution-margin positive. We back-solve target MER from your unit economics - not from a vanity number." },
  { q: "How much should I spend to properly test a channel?", a: "Meta: minimum £5-8k/mo to test 15+ creatives fairly. Google: £3-6k/mo depending on category CPCs. TikTok: £3k/mo minimum with a real creator pipeline. YouTube: £2k/mo for demand capture; £6k+ for demand generation." },
  { q: "Do you handle creative production?", a: "Yes - 3-6 UGC + motion + static creatives shipped per week, briefed against a written creative testing framework (angle, hook, format, offer). No creative volume, no scale." },
  { q: "What tracking stack do you set up?", a: "Server-side GA4, Meta CAPI, Google Enhanced Conversions, TikTok Events API 2.0, LinkedIn CAPI where relevant. Triple Whale or Northbeam for blended attribution. Set up properly in week one." },
  { q: "Can we scale without ruining ROAS?", a: "Yes, if creative velocity, offer discipline and audience structure are right. We've scaled brands 3-8× in 6 months while keeping ROAS within 10% of baseline. The key: never scale on the same creative pool." },
  { q: "How do you decide where to allocate budget?", a: "MER-first: which channel earns the most incremental profit per pound at your current spend level. Then geo-fenced holdout tests validate every reallocation before we commit." },
  { q: "What if my product needs demand creation, not demand capture?", a: "Then TikTok, Meta and YouTube demand-gen come first, with Google Shopping/Search catching intent downstream. Category, not preference, decides the media mix." },
  { q: "Do you have a minimum monthly ad spend?", a: "£10k/mo across paid media is our practical floor to run the full-funnel system properly. Below that we usually recommend focusing on one channel deeply first." },
];

export const Route = createFileRoute("/services/performance-marketing")({
  head: () => ({
    meta: [
      { title: "Performance Marketing Agency UK - Full-Funnel Paid Media for Ecommerce | BeingEcom" },
      { name: "description", content: "Best performance marketing agency UK for Shopify and DTC ecommerce brands. Blended-ROAS media buying across Facebook, Google, TikTok, Instagram and YouTube Ads - engineered for MER, LTV and profitable growth." },
      { name: "keywords", content: "performance marketing agency UK, paid media agency UK, ecommerce paid ads agency, full-funnel media buying, blended ROAS agency, Meta Google TikTok agency, Shopify paid media" },
      { property: "og:title", content: "Performance Marketing Agency UK - Full-Funnel Paid Media for Ecommerce | BeingEcom" },
      { property: "og:description", content: "Facebook, Google, TikTok, Instagram and YouTube Ads managed as one P&L. Blended-ROAS, LTV-driven ecommerce growth by a UK performance marketing agency." },
      { property: "og:url", content: "https://beingecom.com/services/performance-marketing" },
    ],
    links: [
      { rel: "canonical", href: "https://beingecom.com/services/performance-marketing" },
      { rel: "preload", as: "image", href: heroPM, fetchpriority: "high" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({ slug: "performance-marketing", name: "Performance Marketing", description: "Facebook, Google, TikTok ads and media buying for ecommerce brands." })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Performance Marketing", path: "/services/performance-marketing" }])) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQ_LIST, "/services/performance-marketing")) },
    ],
  }),
  component: PerformanceMarketingPage,
});

const channels = [
  { to: "/services/performance-marketing/facebook-ads", title: "Facebook Ads", body: "Meta and Instagram ads built on creative volume, ASC+ scaling and break-even MER math.", tag: "Meta" },
  { to: "/services/performance-marketing/instagram-ads", title: "Instagram Ads", body: "Reels, Stories and shopping ads engineered for scroll-native creative and profitable acquisition.", tag: "Meta" },
  { to: "/services/performance-marketing/google-ads", title: "Google Ads", body: "Search, Shopping, Performance Max and brand defence - engineered for high-intent capture.", tag: "Google" },
  { to: "/services/performance-marketing/tiktok-ads", title: "TikTok Ads", body: "Native creator UGC, Spark Ads and hook-first scripting driving top-funnel demand.", tag: "TikTok" },
  { to: "/services/performance-marketing/youtube-ads", title: "YouTube Ads", body: "Long-form pre-roll, in-stream and Shorts - demand generation that lifts every other channel.", tag: "YouTube" },
  { to: "/services/performance-marketing/media-buying", title: "Media Buying", body: "Cross-channel budget allocation and MER-based reporting - one P&L, one operator.", tag: "Strategy" },
];

const deepBlocks = [
  { title: "Blended-ROAS operating system", body: "Every channel budgeted, scaled and evaluated against blended MER, not channel-attributed ROAS. We back-solve target MER from your contribution margin, then defend it as we scale.", tags: ["MER","Contribution margin","Payback"] },
  { title: "Full-funnel creative engine", body: "3-6 creatives per week per channel - UGC, motion, static, founder POV - briefed against a written testing framework. Kill fast, scale winners hard, never let one hero carry the account.", tags: ["UGC","Motion","Static","Iteration"] },
  { title: "Server-side tracking stack", body: "Meta CAPI, Google Enhanced Conversions, TikTok Events API 2.0, GA4 server-side and Triple Whale - set up in week one so decisions rest on real data, not iOS-14-broken pixels.", tags: ["CAPI","GA4 SS","Triple Whale"] },
  { title: "Cohort + LTV modelling", body: "First-purchase profitability isn't the goal - LTV is. We model 30/60/90-day cohorts, back-calculate allowable CAC, and buy media against forward LTV rather than day-one ROAS.", tags: ["LTV","Cohort","CAC:LTV"] },
  { title: "Offer and landing-page loop", body: "Ads are only half the funnel. We test offers (bundles, free-gift thresholds, subscription) and matching landing pages weekly - because winning creative on a losing offer still loses." },
  { title: "Geo-fenced incrementality tests", body: "Every material budget shift is validated with a geo-holdout so we know each channel's true incremental contribution, not last-click fiction.", tags: ["Geo lift","Holdout","Incrementality"] },
  { title: "Weekly war-room reporting", body: "One dashboard. Blended MER, contribution margin, cohort LTV, creative fatigue heatmap. Reviewed weekly on Loom, monthly on video." },
  { title: "Retention loop with email + SMS", body: "Paid acquires the customer; email/SMS turns them into LTV. We connect flows and campaigns to the paid layer so repeat-rate becomes an acquisition weapon." },
];

const mistakes = [
  { title: "Optimising for last-click ROAS", body: "iOS 14 broke it, GA4 misattributes it, and it undervalues every top-funnel channel. Move to blended MER before scaling." },
  { title: "Under-investing in creative", body: "Media buying can't out-work bad creative. If you're testing less than 3 new concepts a week, fatigue kills you before scale arrives." },
  { title: "Running channels in isolation", body: "Meta and Google compete for the same buyer. Managed separately, they double-count credit and hide waste. Managed as one P&L, they compound." },
  { title: "Chasing 5× ROAS at £2k/day", body: "High ROAS at scale usually means undershooting spend. Scale to break-even MER on incremental spend, not vanity ROAS on tiny budgets." },
  { title: "Ignoring cohort LTV", body: "A £45 CAC on a £400 LTV customer prints money. A £20 CAC on a £22 LTV customer bankrupts you. Buy media against LTV, not first order." },
  { title: "Killing creatives too fast", body: "Statistical significance takes 3-5 days at reasonable spend. Killing at 24h based on gut feel is how you throw winners in the bin." },
];

function PerformanceMarketingPage() {
  return (
    <PageLayout>
      {/* 1. HERO */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-primary/20 blur-[140px] float" />
        <div className="absolute top-40 -left-32 w-[420px] h-[420px] rounded-full bg-accent/30 blur-[120px] float-slow" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center text-center lg:text-left">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  <span className="relative inline-block w-1.5 h-1.5 rounded-full bg-primary pulse-dot" />
                  Performance Marketing
                </div>
              </Reveal>
              <Reveal delay={1}>
                <h1 className="mt-6 text-4xl md:text-6xl lg:text-6xl xl:text-7xl font-bold leading-[1.02] text-ink">
                  <span className="text-gradient">Performance marketing agency UK</span> - full-funnel paid media, one P&L.
                </h1>
              </Reveal>
              <Reveal delay={2}>
                <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Facebook, Google, TikTok, Instagram and YouTube Ads managed by UK ecommerce media buyers - one team, one blended-ROAS operating system. Engineered for MER, LTV and profitable Shopify and DTC growth.
                </p>
              </Reveal>
              <Reveal delay={3}>
                <div className="mt-9 btn-pair">
                  <Link to="/contact" className="btn btn-primary btn-shimmer group">
                    Book strategy call
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                  <Link to="/audit" className="btn btn-ghost border border-border bg-white/60 backdrop-blur">
                    Get free ad-account audit
                  </Link>
                </div>
              </Reveal>
              <Reveal delay={4}>
                <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto lg:mx-0">
                  {[
                    { v: "£120M+", l: "Ad spend managed" },
                    { v: "4.1×", l: "Avg ROAS lift" },
                    { v: "120+", l: "Brands scaled" },
                    { v: "10+ yrs", l: "Ecom operating" },
                  ].map((s) => (
                    <div key={s.l} className="card-surface card-hover p-4 text-center">
                      <div className="text-2xl font-bold text-gradient">{s.v}</div>
                      <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1 font-semibold">{s.l}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal delay={2}>
              <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/25 via-accent/20 to-transparent blur-2xl" aria-hidden="true" />
                <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-border shadow-2xl">
                  <img
                    src={heroPM}
                    alt="Performance marketing dashboard - blended-ROAS analytics across Meta, Google, TikTok and YouTube"
                    width={1200}
                    height={900}
                    loading="eager"
                    fetchPriority="high"
                    className="w-full h-[260px] sm:h-[340px] md:h-[420px] lg:h-[520px] object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent">
                    <div className="text-[11px] font-bold uppercase tracking-widest text-white/85">Live dashboard</div>
                    <div className="mt-1 text-sm sm:text-base font-semibold text-white leading-snug">Every channel in one P&L - reported weekly, defended monthly.</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>


      {/* 2. PROBLEM */}
      <Section eyebrow="The Problem" title="Most paid-media agencies burn budget on the wrong metric." alt>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            "Reporting 5× ROAS on £2k/day while blended MER quietly collapses below break-even.",
            "One 'hero' creative carrying the account until fatigue hits - then the whole account crashes overnight.",
            "Channels managed by silo teams who never talk to each other, double-counting credit and hiding waste.",
          ].map((t, i) => (
            <Reveal key={i} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
              <div className="rounded-2xl border border-destructive/25 bg-destructive/5 p-6 h-full">
                <div className="w-11 h-11 rounded-xl bg-destructive/15 text-destructive flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <p className="mt-4 text-ink font-medium leading-relaxed">{t}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 3. WHAT IT MEANS */}
      <Section eyebrow="What performance marketing really is" title="A single P&L that spans every paid channel.">
        <div className="grid lg:grid-cols-5 gap-8 items-center">
          <div className="lg:col-span-3">
            <p className="text-lg md:text-xl text-ink/80 leading-relaxed">
              We stop thinking in channel silos. Meta, Google, TikTok and YouTube become line items in one media plan, budgeted against one blended-ROAS target derived from your contribution margin - not a vanity number. Every budget shift is validated with geo-fenced incrementality tests. Every creative is briefed against a written framework. Every account is reviewed weekly, on video, with revenue impact quantified.
            </p>
          </div>
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-border bg-gradient-to-br from-primary/8 via-white to-accent/15 p-6">
              <div className="space-y-3">
                {["Blended MER target","Full-funnel creative","Server-side tracking","Cohort LTV modelling"].map((s, i) => (
                  <div key={s} className="flex items-center gap-3 rounded-xl bg-white/80 border border-border p-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-[oklch(0.55_0.2_265)] text-white font-bold text-xs flex items-center justify-center">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <span className="text-sm font-semibold text-ink">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 4. CHANNELS GRID */}
      <Section eyebrow="Channels" title="Pick a channel or run the full stack." alt>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {channels.map((s) => (
            <Link key={s.to} to={s.to}>
              <Card className="h-full">
                <div className="text-xs font-semibold uppercase tracking-widest text-accent">{s.tag}</div>
                <h3 className="mt-3 font-semibold text-lg">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{s.body}</p>
                <div className="mt-4 text-sm font-semibold text-primary inline-flex items-center gap-1">Explore <ArrowRight className="w-3.5 h-3.5" /></div>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      {/* 5. SYSTEM STEPS */}
      <Section eyebrow="The system" title="A 4-phase operating system for profitable scale.">
        <ol className="grid md:grid-cols-2 gap-5">
          {[
            { t: "Audit & unit economics", b: "Ad-account teardown, tracking review, contribution-margin model, blended-MER target set from unit economics." },
            { t: "Foundation rebuild", b: "Server-side CAPI + Enhanced Conversions + Events API 2.0. Triple Whale. Landing pages. Offer framework." },
            { t: "Creative velocity", b: "3-6 concepts per week per channel, briefed against angle × format × hook × offer matrix. Test hard, kill hard." },
            { t: "Scale + incrementality", b: "Winners scaled with geo-holdouts, budgets reallocated on true incremental lift, cohort LTV modelled monthly." },
          ].map((it, i) => (
            <Reveal key={it.t} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
              <li className="card-surface card-hover p-6 flex gap-5">
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/15 text-primary font-display font-bold flex items-center justify-center text-xl border border-primary/20">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h4 className="font-bold text-ink text-lg">{it.t}</h4>
                  <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{it.b}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* 6. DEEP BLOCKS */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="max-w-3xl mb-14">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-primary pulse-dot" /> Inside the system
              </div>
              <h2 className="text-3xl md:text-5xl font-bold leading-[1.05] text-ink">Every module, engineered to compound.</h2>
            </div>
          </Reveal>
          <div className="space-y-5">
            {deepBlocks.map((b, i) => {
              const Icon = [Layers, Target, TrendingUp, Zap, Shield, Package, Wrench, Star][i % 8];
              const reverse = i % 2 === 1;
              return (
                <Reveal key={b.title}>
                  <div className={`grid lg:grid-cols-12 gap-6 items-stretch card-surface card-hover p-6 md:p-8 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
                    <div className="lg:col-span-4 relative rounded-2xl bg-gradient-to-br from-primary/8 via-white to-accent/20 border border-border p-6 flex items-center justify-center min-h-[180px]">
                      <div className="relative flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-[oklch(0.55_0.2_265)] text-white flex items-center justify-center shadow-xl">
                          <Icon className="w-7 h-7" />
                        </div>
                        <div className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Module {String(i + 1).padStart(2, "0")}</div>
                      </div>
                    </div>
                    <div className="lg:col-span-8 flex flex-col justify-center">
                      <h3 className="text-xl md:text-2xl font-bold text-ink">{b.title}</h3>
                      <p className="mt-3 text-muted-foreground leading-relaxed">{b.body}</p>
                      {b.tags && (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {b.tags.map((t) => (
                            <span key={t} className="inline-flex items-center rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1">{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. MID-CTA */}
      <Section>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-r from-primary/10 via-white to-accent/15 p-8 md:p-12 text-center">
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/20 blur-3xl" />
            <div className="relative max-w-3xl mx-auto">
              <h3 className="text-2xl md:text-4xl font-bold text-ink leading-tight">Free ad-account audit - 48 hour turnaround.</h3>
              <p className="mt-4 text-lg text-muted-foreground">Send us your Meta + Google accounts. We'll return a Loom walking through the 5 biggest MER leaks and the fastest path to fix them.</p>
              <div className="mt-8 btn-pair justify-center">
                <Link to="/audit" className="btn btn-primary btn-shimmer group">Get my free audit <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></Link>
                <Link to="/case-studies" className="btn btn-ghost border border-border bg-white/60">See case studies</Link>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">No pitch, no lock-in. Senior operator delivers the audit.</p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* 8. MISTAKES */}
      <Section eyebrow="Avoid these" title="Mistakes that quietly kill paid-media accounts." alt>
        <div className="grid md:grid-cols-2 gap-4">
          {mistakes.map((m, i) => (
            <Reveal key={m.title} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
              <div className="flex gap-4 rounded-2xl border border-destructive/25 bg-destructive/5 p-5">
                <div className="shrink-0 w-11 h-11 rounded-xl bg-destructive/15 text-destructive flex items-center justify-center font-bold">{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-destructive"><Ban className="w-3 h-3" /> Mistake</div>
                  <h4 className="mt-1 font-bold text-ink">{m.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{m.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 9. COMPARISON */}
      <Section eyebrow="How we compare" title="BeingEcom vs typical agency vs in-house.">
        <Reveal>
          <div className="overflow-x-auto rounded-3xl border border-border bg-white">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-primary/8 to-accent/12 border-b border-border">
                  <th className="text-left p-4 font-bold text-ink w-1/3">What matters</th>
                  <th className="text-left p-4 font-bold text-primary">BeingEcom</th>
                  <th className="text-left p-4 font-bold text-muted-foreground">Typical agency</th>
                  <th className="text-left p-4 font-bold text-muted-foreground">In-house</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { c: "Primary metric", u: "Blended MER + contribution margin", a: "Channel-attributed ROAS", i: "Whatever Meta reports" },
                  { c: "Channels managed", u: "Meta + Google + TikTok + YouTube as one P&L", a: "Meta OR Google, siloed", i: "One channel per person" },
                  { c: "Creative velocity", u: "3-6 concepts / channel / week", a: "1-2 per month", i: "Whatever designer can ship" },
                  { c: "Tracking stack", u: "Server-side CAPI + Triple Whale", a: "Pixel + platform reports", i: "Broken since iOS 14" },
                  { c: "Incrementality", u: "Geo-holdouts on every material shift", a: "Never tested", i: "Never considered" },
                  { c: "Senior operator", u: "On every account, weekly Loom", a: "Junior account manager", i: "One overworked marketer" },
                ].map((r, i) => (
                  <tr key={r.c} className={i % 2 === 0 ? "bg-white" : "bg-secondary/30"}>
                    <td className="p-4 font-semibold text-ink border-t border-border">{r.c}</td>
                    <td className="p-4 border-t border-border"><span className="inline-flex items-start gap-2 text-ink"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {r.u}</span></td>
                    <td className="p-4 border-t border-border text-muted-foreground"><span className="inline-flex items-start gap-2"><Minus className="w-4 h-4 text-muted-foreground/60 shrink-0 mt-0.5" /> {r.a}</span></td>
                    <td className="p-4 border-t border-border text-muted-foreground"><span className="inline-flex items-start gap-2"><Minus className="w-4 h-4 text-muted-foreground/60 shrink-0 mt-0.5" /> {r.i}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Section>

      {/* 10. REVENUE BARS */}
      <Section eyebrow="The numbers" title="What actually changes when the system runs." alt>
        <div className="card-surface p-6 md:p-8">
          <RevenueBars bars={[
            { label: "Blended ROAS (MER)", before: 1.9, after: 4.1, unit: "×", description: "Total revenue ÷ total ad spend across all channels." },
            { label: "CAC", before: 68, after: 31, unit: "£", description: "Cost per acquired customer, weighted across paid channels." },
            { label: "Creative test velocity", before: 3, after: 22, description: "New creative concepts shipped per month across the stack." },
            { label: "Ad-attributed revenue", before: 42, after: 168, unit: "£k", description: "Monthly revenue attributable to paid media." },
            { label: "Contribution margin", before: -4, after: 22, unit: "%", description: "Margin left after COGS, shipping and ad spend." },
          ]} />
        </div>
      </Section>

      {/* 11. CASE STUDY */}
      <Section eyebrow="Case study" title="UK skincare brand: 1.9× → 4.3× MER in 90 days">
        <div className="grid lg:grid-cols-5 gap-8 items-stretch">
          <Reveal className="lg:col-span-3">
            <div className="card-surface p-7 md:p-9 h-full space-y-6">
              {[
                { l: "Problem", v: "£45k/mo ad spend, blended MER 1.9×, contribution margin -6%. Meta pixel misfiring, no CAPI, single hero creative fatigued.", c: "text-destructive" },
                { l: "Strategy", v: "Server-side CAPI + Triple Whale in week one. 5 UGC creators onboarded, 18 concepts shipped in month one. Google Shopping restructured with segmented PMax + brand exclusions.", c: "text-primary" },
                { l: "Result", v: "Blended MER 4.3× at £62k/mo spend. Contribution margin +19%. Monthly revenue up 173% in 90 days on 38% more spend.", c: "text-emerald-600" },
              ].map((b) => (
                <div key={b.l}>
                  <div className={`text-[11px] font-bold uppercase tracking-widest ${b.c}`}>{b.l}</div>
                  <p className="mt-1.5 text-ink leading-relaxed">{b.v}</p>
                </div>
              ))}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {[{ l: "MER", v: "1.9 → 4.3×" }, { l: "Revenue", v: "+173%" }, { l: "Margin", v: "+25pts" }].map((m) => (
                  <div key={m.l} className="rounded-2xl border border-border bg-secondary/40 p-4 text-center">
                    <div className="text-2xl font-bold text-gradient">{m.v}</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1 font-semibold">{m.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={1} className="lg:col-span-2">
            <div className="card-surface p-6 h-full">
              <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Highlights</div>
              <ul className="space-y-3 text-sm text-ink">
                {[
                  "5 UGC creators, 22 concepts shipped in month one",
                  "Server-side CAPI raised match quality from 4.2 → 8.6",
                  "PMax split by margin tier, brand traffic ring-fenced",
                  "First profitable TikTok tests inside 30 days",
                  "Weekly Loom + monthly video war-room review",
                ].map((h) => (
                  <li key={h} className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {h}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 12. INDUSTRY IMPACT */}
      <Section eyebrow="Vertical impact" title="How paid moves the needle in your category." alt>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { industry: "Beauty & skincare", pain: "Creator-heavy category - brand loses to UGC-native competitors.", outcome: "Weekly creator pipeline + Spark Ads unlock native scale on Meta and TikTok." },
            { industry: "Fashion & apparel", pain: "Seasonal demand + returns pressure margins.", outcome: "Cohort-LTV buying protects margin through peak; catalogue ads scale non-hero SKUs." },
            { industry: "Home & garden", pain: "High AOV, long consideration window - pixel misattributes.", outcome: "Server-side tracking + view-through modelling recover 20-30% of hidden revenue." },
            { industry: "Electronics & tech", pain: "Amazon eats the intent; Google Shopping cannibalises brand.", outcome: "PMax with brand exclusions + YouTube demand-gen shift buyers to your own site." },
            { industry: "Sports & fitness", pain: "Video-first category; static ads collapse in weeks.", outcome: "Motion + creator UGC engine keeps ROAS stable through fatigue cycles." },
            { industry: "Baby & kids", pain: "Trust-heavy category; cold traffic converts poorly.", outcome: "Full-funnel with founder-story creative + subscription flows lifts LTV 40-60%." },
          ].map((it, i) => (
            <Reveal key={it.industry} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
              <div className="card-surface card-hover p-6 h-full">
                <div className="text-[11px] font-bold uppercase tracking-widest text-primary">{it.industry}</div>
                <div className="mt-3">
                  <div className="flex items-start gap-2 text-sm"><XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" /><p className="text-muted-foreground"><span className="font-semibold text-ink">Pain:</span> {it.pain}</p></div>
                  <div className="mt-3 flex items-start gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /><p className="text-ink"><span className="font-semibold">Outcome:</span> {it.outcome}</p></div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 13. TIMELINE */}
      <Section eyebrow="First 90 days" title="From signed contract to compounding MER">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { w: "Week 1", t: "Audit + unit economics", b: "Ad-account teardown, contribution-margin model, blended-MER target agreed." },
            { w: "Week 2-3", t: "Tracking rebuilt", b: "CAPI, Enhanced Conversions, Events API 2.0 and Triple Whale wired." },
            { w: "Week 4-6", t: "Creative engine live", b: "3+ concepts/week shipped across Meta and TikTok, first ROAS lift lands." },
            { w: "Week 7-12", t: "Scale + incrementality", b: "Winners scaled with geo-holdouts, cohort LTV modelled, forecast on track." },
          ].map((s, i) => (
            <Reveal key={s.w} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
              <div className="card-surface p-5">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                  <Calendar className="size-3" /> {s.w}
                </div>
                <h4 className="mt-3 font-bold text-ink">{s.t}</h4>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 14. TECH STACK */}
      <Section eyebrow="Stack" title="The tools we deploy and manage for you" alt>
        <div className="flex flex-wrap gap-2">
          {["Meta Ads Manager","Google Ads + GMC","TikTok Ads","YouTube / Google DV360","Triple Whale","Northbeam","GA4 server-side","Meta CAPI","Enhanced Conversions","Events API 2.0","Motion","Shopify Plus","Klaviyo","Recharge","Postscript","Attentive"].map((t) => (
            <span key={t} className="inline-flex items-center gap-2 rounded-2xl border border-border bg-white px-4 py-2 text-sm font-semibold text-ink">
              <Wrench className="size-3.5 text-primary" /> {t}
            </span>
          ))}
        </div>
      </Section>

      {/* 15. TESTIMONIALS */}
      <Section eyebrow="Real founders" title="What our clients actually say">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { quote: "Blended MER went from 1.9× to 4.3× in 90 days. Contribution margin from negative to +19%. First agency that actually cared about profit, not vanity ROAS.", name: "Amelia H.", role: "Founder, Shoreditch skincare" },
            { quote: "They rebuilt our Google Shopping in three weeks. Non-brand Search finally became a profit centre instead of a leak.", name: "Daniel R.", role: "Founder, wearables startup" },
            { quote: "Creative fatigue used to break us in a week. Now we get 3+ UGC batches a week and MER holds through scaling.", name: "Sara J.", role: "Founder, women's fashion" },
          ].map((t, i) => (
            <Reveal key={t.name} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
              <div className="card-surface p-6 h-full relative">
                <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />
                <div className="flex gap-1 text-primary mb-3">{Array.from({ length: 5 }).map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}</div>
                <p className="text-ink leading-relaxed">"{t.quote}"</p>
                <footer className="mt-5 pt-4 border-t border-border">
                  <div className="font-semibold text-ink text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </footer>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 16. FAQ */}
      <Section eyebrow="FAQ" title="Questions we get asked all the time." alt>
        <div className="mx-auto max-w-3xl space-y-4">
          {FAQ_LIST.map((f, i) => (
            <Reveal key={f.q} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <details className="group rounded-2xl border border-border bg-card/60 p-5 open:bg-card">
                <summary className="cursor-pointer list-none flex items-start justify-between gap-4 font-semibold text-ink">
                  <span>{f.q}</span>
                  <span className="mt-1 inline-flex shrink-0 w-6 h-6 items-center justify-center rounded-full border border-border text-primary group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 17. RELATED */}
      <Section eyebrow="Also explore" title="Related services we ship together">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { to: "/services/creative", title: "Creative Production", body: "UGC + motion + static engine that keeps paid media alive." },
            { to: "/services/cro", title: "Conversion Rate Optimisation", body: "Convert the traffic paid media buys - 2-3× the same spend." },
            { to: "/services/analytics", title: "Analytics & Tracking", body: "Server-side CAPI + Triple Whale + GA4 built right." },
          ].map((r) => (
            <Link key={r.to} to={r.to} className="card-surface card-hover p-5 block h-full">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                <ArrowUpRight className="size-5" />
              </div>
              <h4 className="font-bold text-ink">{r.title}</h4>
              <p className="text-sm text-muted-foreground mt-2">{r.body}</p>
            </Link>
          ))}
        </div>
      </Section>

      <CTA heading="Ready to manage paid as one P&L - and finally see profit?" />
    </PageLayout>
  );
}
