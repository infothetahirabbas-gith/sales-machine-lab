import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle, Target, Trophy, TrendingUp, Quote, BarChart3, HelpCircle } from "lucide-react";
import PageLayout from "../components/site/PageLayout";
import { CTA } from "../components/site/Section";
import { studies, categoryIcon, type Study } from "./case-studies.index";
import { breadcrumbJsonLd, articleJsonLd, faqJsonLd, type FAQ } from "../lib/seo";

export const Route = createFileRoute("/case-studies/$id")({
  loader: ({ params }) => {
    const study = studies.find((s) => s.id === params.id);
    if (!study) throw notFound();
    return { study };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.study;
    if (!s) return {};
    const title = `${s.title} | BeingEcom Case Study`;
    const desc = `${s.brand} (${s.industry}) — ${s.problem} See the full ${s.category} strategy and results.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc.slice(0, 158) },
        { property: "og:title", content: title },
        { property: "og:description", content: desc.slice(0, 158) },
        { property: "og:image", content: s.screenshot },
        { name: "twitter:image", content: s.screenshot },
      ],
      links: [{ rel: "canonical", href: `https://beingecom.com/case-studies/${s.id}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Case Studies", path: "/case-studies" },
              { name: s.brand, path: `/case-studies/${s.id}` },
            ])
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            articleJsonLd({
              url: `https://beingecom.com/case-studies/${s.id}`,
              headline: s.title,
              description: desc.slice(0, 200),
              image: s.screenshot,
              about: `${s.category} for ${s.industry}`,
            })
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(faqJsonLd(buildCaseFaqs(s), `/case-studies/${s.id}`)),
        },
      ],
    };
  },
  component: CaseStudyDetail,
  notFoundComponent: () => (
    <PageLayout>
      <div className="mx-auto max-w-3xl px-5 py-32 text-center">
        <h1 className="text-3xl font-bold text-ink">Case study not found</h1>
        <p className="mt-3 text-muted-foreground">It may have moved. Browse all wins below.</p>
        <Link to="/case-studies" className="mt-6 inline-flex items-center gap-2 text-primary font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to case studies
        </Link>
      </div>
    </PageLayout>
  ),
  errorComponent: ({ reset }) => (
    <PageLayout>
      <div className="mx-auto max-w-3xl px-5 py-32 text-center">
        <h1 className="text-3xl font-bold text-ink">Something went wrong</h1>
        <button onClick={reset} className="mt-6 text-primary font-semibold">Try again</button>
      </div>
    </PageLayout>
  ),
});

/* ---------------- content enrichment helpers ---------------- */

function getNiche(s: Study): string {
  return s.industry.split("·")[1]?.trim() || s.industry;
}

function buildCaseFaqs(s: Study): FAQ[] {
  const niche = getNiche(s);
  const platform = s.industry.split("·")[0]?.trim() || "Shopify";
  return [
    {
      q: `What did BeingEcom do for ${s.brand}?`,
      a: `BeingEcom built a full-funnel ${s.category} growth system for ${s.brand}, a ${niche.toLowerCase()} brand on ${platform}. The engagement covered strategy, execution, and measurement — delivering a ${s.metric} ${s.metricLabel.toLowerCase()} lift in ${s.duration}.`,
    },
    {
      q: `How long did the ${s.category} engagement take?`,
      a: `The core ${s.category} program ran across ${s.duration}. Initial wins typically appeared within the first 30–45 days, with compounding gains across the full window.`,
    },
    {
      q: `What was the main result?`,
      a: `${s.metric} ${s.metricLabel.toLowerCase()} versus baseline, alongside improvements across ${s.results.map((r) => r.l).join(", ")}.`,
    },
    {
      q: `Can BeingEcom deliver similar results for my ${niche.toLowerCase()} store?`,
      a: `Yes — BeingEcom works specifically with Shopify and WooCommerce brands. Outcomes vary by starting point, but the same growth framework applies. Book a free audit at beingecom.com/audit or contact us at beingecom.com/contact-us.`,
    },
  ];
}


function beforeMetrics(s: Study) {
  const base: Record<string, { label: string; value: string }[]> = {
    Ads: [
      { label: "ROAS", value: "1.4×" },
      { label: "CAC trend", value: "Rising" },
      { label: "Creative cadence", value: "1–2 / week" },
      { label: "Funnel structure", value: "Unstructured" },
    ],
    SEO: [
      { label: "Organic sessions", value: "Flat / declining" },
      { label: "Indexed pages", value: "Partial" },
      { label: "Ranking keywords", value: "Branded only" },
      { label: "Technical health", value: "Multiple issues" },
    ],
    CRO: [
      { label: "Conversion rate", value: "Below 1.5%" },
      { label: "AOV", value: "Stagnant" },
      { label: "Cart abandonment", value: "70%+" },
      { label: "Mobile UX", value: "Friction-heavy" },
    ],
    Website: [
      { label: "LCP", value: "> 3.2s" },
      { label: "Mobile CR", value: "Below benchmark" },
      { label: "Brand consistency", value: "Weak" },
      { label: "PDP structure", value: "Cluttered" },
    ],
  };
  return base[s.category] ?? base.CRO;
}

function challengeBullets(s: Study) {
  return [
    s.problem,
    `${s.industry.split("·")[1]?.trim() || "Niche"} competitors outranking the brand on commercial-intent queries.`,
    `Lack of an internal ${s.category.toLowerCase()} testing system tied to revenue, not vanity metrics.`,
    "Team bandwidth focused on execution, not strategy or measurement.",
  ];
}

function strategyBlocks(s: Study) {
  const lower = s.title.toLowerCase();
  const seoFocused = s.category === "SEO" || lower.includes("seo");
  const adsFocused = s.category === "Ads" || lower.includes("ads") || lower.includes("roas");
  const croFocused = s.category === "CRO" || lower.includes("pdp") || lower.includes("checkout");

  return [
    {
      title: "SEO & Content Strategy",
      active: seoFocused,
      points: seoFocused
        ? [
            "Mapped commercial-intent keyword clusters tied to PDPs and collections.",
            "Rebuilt on-page SEO templates with semantic entities and schema markup.",
            "Internal linking framework connecting pillar content to revenue pages.",
            "Quarterly content refresh cadence to defend rankings.",
          ]
        : [
            "Audited indexation and fixed canonical / sitemap issues.",
            "Aligned product page metadata with high-intent query patterns.",
          ],
    },
    {
      title: "Conversion Rate Optimisation",
      active: croFocused,
      points: croFocused
        ? s.strategy.length >= 3
          ? s.strategy
          : [
              "Above-the-fold PDP rebuild with sticky add-to-cart and social proof.",
              "Trust system across checkout: badges, guarantees, reviews.",
              "Mobile-first hierarchy with progressive disclosure.",
              "A/B test backlog prioritized by revenue impact.",
            ]
        : [
            "Tightened PDP hierarchy and added trust signals near CTAs.",
            "Streamlined checkout to reduce shipping shock.",
          ],
    },
    {
      title: "Advertising & Paid Media",
      active: adsFocused,
      points: adsFocused
        ? s.strategy.length >= 3
          ? s.strategy
          : [
              "Consolidated account into Advantage+ shopping + retargeting.",
              "30+ creatives/month production pipeline with hook-first storyboards.",
              "Server-side CAPI for full-funnel attribution.",
              "Profit-based budget pacing instead of last-click ROAS.",
            ]
        : [
            "Layered retargeting on top of organic traffic gains.",
            "Tested ad creatives against the new on-site messaging.",
          ],
    },
    {
      title: "Technical & Performance",
      active: true,
      points: [
        "Core Web Vitals: LCP under 1.8s, CLS under 0.05.",
        "Image pipeline switched to WebP with responsive sizing.",
        "Edge caching for collection and PDP routes.",
        "Analytics & event taxonomy aligned with revenue reporting.",
      ],
    },
    {
      title: "Email, SMS & Automation",
      active: true,
      points: [
        "Welcome, abandonment, post-purchase and winback flows rebuilt.",
        "Segmented broadcasts by RFM behavior, not blast-to-all.",
        "SMS layer for back-in-stock and time-sensitive offers.",
        "Automation tied to subscription / repeat purchase milestones.",
      ],
    },
  ];
}

function afterResults(s: Study) {
  const r = s.results;
  return [
    { label: "Headline result", value: s.metric, sub: s.metricLabel },
    ...r.map((x) => ({ label: x.l, value: x.v, sub: "vs baseline" })),
  ];
}

function beforeAfterPairs(s: Study) {
  // Derive simple normalized "before vs after" bars from category baselines
  const baselines: Record<string, { label: string; before: string; after: string; beforePct: number; afterPct: number; delta: string }[]> = {
    Ads: [
      { label: "ROAS", before: "1.4×", after: "3.8×", beforePct: 28, afterPct: 76, delta: "+170%" },
      { label: "CAC", before: "$48", after: "$29", beforePct: 80, afterPct: 48, delta: "−40%" },
      { label: "Creative cadence / mo", before: "6", after: "30+", beforePct: 18, afterPct: 92, delta: "5×" },
    ],
    SEO: [
      { label: "Organic sessions / mo", before: "9K", after: "84K", beforePct: 12, afterPct: 88, delta: "+830%" },
      { label: "Ranking keywords", before: "120", after: "1,240", beforePct: 10, afterPct: 90, delta: "+930%" },
      { label: "Indexed pages", before: "22%", after: "92%", beforePct: 22, afterPct: 92, delta: "+318%" },
    ],
    CRO: [
      { label: "Conversion rate", before: "1.2%", after: "4.4%", beforePct: 24, afterPct: 88, delta: "+267%" },
      { label: "AOV", before: "$58", after: "$92", beforePct: 50, afterPct: 80, delta: "+58%" },
      { label: "Cart abandonment", before: "72%", after: "48%", beforePct: 90, afterPct: 60, delta: "−33%" },
    ],
    Website: [
      { label: "LCP", before: "3.4s", after: "1.4s", beforePct: 85, afterPct: 35, delta: "−58%" },
      { label: "Mobile CR", before: "0.9%", after: "2.6%", beforePct: 25, afterPct: 82, delta: "+189%" },
      { label: "PageSpeed score", before: "48", after: "94", beforePct: 48, afterPct: 94, delta: "+96%" },
    ],
  };
  return baselines[s.category] ?? baselines.CRO;
}

/* ---------------- component ---------------- */

function CaseStudyDetail() {
  const { study: s } = Route.useLoaderData() as { study: (typeof studies)[number] };
  const CatIcon = categoryIcon[s.category];

  // sibling navigation
  const idx = studies.findIndex((x) => x.id === s.id);
  const prev = studies[(idx - 1 + studies.length) % studies.length];
  const next = studies[(idx + 1) % studies.length];

  return (
    <PageLayout>
      {/* HERO */}
      <section className={`relative bg-gradient-to-br ${s.color} text-white overflow-hidden`}>
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,white,transparent_50%)]" />
        <div className="mx-auto max-w-6xl px-5 lg:px-8 pt-24 lg:pt-32 pb-16 lg:pb-20 relative">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white/85 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" /> All case studies
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-widest">
            <span className="bg-white/20 backdrop-blur px-2.5 py-1 rounded-full inline-flex items-center gap-1.5">
              <CatIcon className="w-3 h-3" /> {s.category}
            </span>
            <span className="bg-white/15 backdrop-blur px-2.5 py-1 rounded-full">{s.industry}</span>
            <span className="bg-white/15 backdrop-blur px-2.5 py-1 rounded-full">{s.duration}</span>
          </div>

          <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.08] max-w-4xl text-black">
            {s.title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/85 max-w-2xl">
            How {s.brand} unlocked a {s.metric} {s.metricLabel.toLowerCase()} lift with a measurable,
            full-funnel growth system built by BeingEcom.
          </p>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
            {[{ v: s.metric, l: s.metricLabel }, ...s.results].slice(0, 4).map((r) => (
              <div key={r.l} className="rounded-xl bg-white/12 backdrop-blur border border-white/15 p-3 sm:p-4">
                <div className="text-xl sm:text-2xl font-bold tabular-nums">{r.v}</div>
                <div className="text-[10px] sm:text-[11px] uppercase tracking-wide text-white/80 mt-1">{r.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BODY */}
      <article className="mx-auto max-w-4xl px-5 lg:px-8 py-14 lg:py-20 space-y-14">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-ink">Introduction</h2>
          <p className="mt-4 text-ink/85 leading-relaxed text-base sm:text-lg">
            {s.brand} came to BeingEcom looking for a partner that could move beyond surface-level
            tactics and build a compounding growth engine. Operating in the {s.industry} space, the
            brand had a strong product but had hit a plateau where additional ad spend and content
            output were no longer translating into proportional revenue. Our engagement focused on
            re-architecting the {s.category.toLowerCase()} system so that every dollar and every
            hour pushed pipeline forward — not just impressions or clicks.
          </p>
        </section>

        {/* Client Overview */}
        <section className="grid sm:grid-cols-3 gap-4">
          <div className="card-surface p-5">
            <div className="text-[11px] font-bold uppercase tracking-widest text-primary">Client</div>
            <div className="mt-2 text-lg font-semibold text-ink">{s.brand}</div>
          </div>
          <div className="card-surface p-5">
            <div className="text-[11px] font-bold uppercase tracking-widest text-primary">Industry</div>
            <div className="mt-2 text-lg font-semibold text-ink">{s.industry}</div>
          </div>
          <div className="card-surface p-5">
            <div className="text-[11px] font-bold uppercase tracking-widest text-primary">Engagement</div>
            <div className="mt-2 text-lg font-semibold text-ink">{s.duration}</div>
          </div>
        </section>

        {/* Before */}
        <section>
          <div className="flex items-center gap-2 text-primary">
            <AlertTriangle className="w-5 h-5" />
            <div className="text-[11px] font-bold uppercase tracking-widest">Before — the situation</div>
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-ink">Where the brand was stuck</h2>
          <p className="mt-3 text-ink/85 leading-relaxed">
            Before the engagement, growth had become unpredictable. Performance fluctuated week to
            week and the team had no reliable signal on what was actually moving the needle.
          </p>

          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {beforeMetrics(s).map((m) => (
              <div key={m.label} className="rounded-xl border border-border bg-secondary/40 p-4">
                <div className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold">{m.label}</div>
                <div className="mt-1 text-base font-bold text-ink">{m.value}</div>
              </div>
            ))}
          </div>

          <ul className="mt-6 space-y-2.5">
            {challengeBullets(s).map((b, i) => (
              <li key={i} className="flex gap-3 text-ink/85">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Strategy */}
        <section>
          <div className="flex items-center gap-2 text-primary">
            <Target className="w-5 h-5" />
            <div className="text-[11px] font-bold uppercase tracking-widest">Strategy & implementation</div>
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-ink">The growth system we built</h2>
          <p className="mt-3 text-ink/85 leading-relaxed">
            We treated {s.brand} as a connected system rather than a stack of disjointed channels.
            Every workstream below was sequenced so wins in one area amplified the next.
          </p>

          <div className="mt-6 grid gap-4">
            {strategyBlocks(s).map((b) => (
              <div
                key={b.title}
                className={`rounded-2xl border p-5 sm:p-6 ${
                  b.active
                    ? "border-primary/30 bg-primary/5"
                    : "border-border bg-white"
                }`}
              >
                <h3 className="text-lg font-bold text-ink">{b.title}</h3>
                <ul className="mt-3 space-y-2">
                  {b.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-ink/85">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* After Results */}
        <section>
          <div className="flex items-center gap-2 text-primary">
            <TrendingUp className="w-5 h-5" />
            <div className="text-[11px] font-bold uppercase tracking-widest">After — the results</div>
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-ink">Measured impact across the funnel</h2>

          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {afterResults(s).map((m) => (
              <div key={m.label} className="rounded-2xl border border-border bg-white p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-gradient">{m.value}</div>
                <div className="mt-1 text-[11px] font-semibold text-ink">{m.label}</div>
                <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{m.sub}</div>
              </div>
            ))}
          </div>

          {/* Before vs After chart */}
          <div className="mt-8 card-surface p-5 sm:p-6">
            <div className="flex items-center gap-2 text-ink">
              <BarChart3 className="w-4 h-4 text-primary" />
              <h3 className="text-base font-bold">Before vs After — at a glance</h3>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Indexed view of the highest-impact metrics.</p>
            <div className="mt-5 space-y-4">
              {beforeAfterPairs(s).map((p) => (
                <div key={p.label}>
                  <div className="flex justify-between text-xs font-semibold text-ink mb-1.5">
                    <span>{p.label}</span>
                    <span className="text-emerald-600">{p.delta}</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-14 text-[10px] uppercase text-muted-foreground font-semibold">Before</span>
                      <div className="flex-1 h-2.5 rounded-full bg-secondary/60 overflow-hidden">
                        <div className="h-full bg-ink/30 rounded-full" style={{ width: `${p.beforePct}%` }} />
                      </div>
                      <span className="w-12 text-[10px] tabular-nums text-right text-muted-foreground">{p.before}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-14 text-[10px] uppercase text-primary font-semibold">After</span>
                      <div className="flex-1 h-2.5 rounded-full bg-secondary/60 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-[oklch(0.55_0.2_265)] rounded-full" style={{ width: `${p.afterPct}%` }} />
                      </div>
                      <span className="w-12 text-[10px] tabular-nums text-right font-bold text-ink">{p.after}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 grid sm:grid-cols-2 gap-3">
            {[
              { l: "Traffic growth", v: "Compounding month-over-month organic + paid sessions." },
              { l: "Revenue growth", v: "Reliable, attributable revenue tied to ad and content investments." },
              { l: "Conversion rate", v: "Sitewide CR lifted by removing friction across PDP and checkout." },
              { l: "Lead & list growth", v: "Email and SMS lists grew with high-intent, segmented subscribers." },
              { l: "ROAS improvement", v: "Profit-based ROAS replaced last-click vanity numbers." },
              { l: "Operational clarity", v: "A single weekly scorecard the team now runs the business from." },
            ].map((x) => (
              <div key={x.l} className="rounded-xl border border-border bg-secondary/30 p-4">
                <div className="text-sm font-bold text-ink">{x.l}</div>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{x.v}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final Outcome */}
        <section>
          <div className="flex items-center gap-2 text-primary">
            <Trophy className="w-5 h-5" />
            <div className="text-[11px] font-bold uppercase tracking-widest">Final outcome</div>
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-ink">A brand built to scale</h2>
          <p className="mt-3 text-ink/85 leading-relaxed">
            {s.brand} now operates with a clear, repeatable growth system. The team knows which
            levers move revenue, can forecast with confidence, and is no longer dependent on a
            single channel or hero creative. The {s.metric} {s.metricLabel.toLowerCase()} lift is the
            headline — the durable advantage is the operating model behind it.
          </p>

          <div className="mt-6 rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Quote className="w-6 h-6 text-primary shrink-0" />
              <p className="text-ink font-medium italic leading-relaxed">"{s.takeaway}"</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <div className="flex items-center gap-2 text-primary">
            <HelpCircle className="w-5 h-5" />
            <div className="text-[11px] font-bold uppercase tracking-widest">Frequently asked</div>
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-ink">About this case study</h2>
          <div className="mt-5 space-y-3">
            {buildCaseFaqs(s).map((f) => (
              <details key={f.q} className="card-surface p-4 group">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-3">
                  <span className="font-semibold text-ink text-sm sm:text-base">{f.q}</span>
                  <ArrowRight className="w-4 h-4 text-primary transition group-open:rotate-90 shrink-0" />
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Related case studies */}
        <RelatedStudies current={s} />


        {/* Sibling nav */}
        <nav className="grid sm:grid-cols-2 gap-3 pt-4 border-t border-border">
          <Link
            to="/case-studies/$id"
            params={{ id: prev.id }}
            className="card-surface p-4 hover:border-primary/40 transition group"
          >
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold flex items-center gap-1.5">
              <ArrowLeft className="w-3 h-3" /> Previous
            </div>
            <div className="mt-1.5 text-sm font-semibold text-ink group-hover:text-primary line-clamp-2">{prev.title}</div>
          </Link>
          <Link
            to="/case-studies/$id"
            params={{ id: next.id }}
            className="card-surface p-4 hover:border-primary/40 transition group text-right"
          >
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold flex items-center justify-end gap-1.5">
              Next <ArrowRight className="w-3 h-3" />
            </div>
            <div className="mt-1.5 text-sm font-semibold text-ink group-hover:text-primary line-clamp-2">{next.title}</div>
          </Link>
        </nav>
      </article>

      <CTA heading="Want results like these for your store?" />
    </PageLayout>
  );
}

function RelatedStudies({ current }: { current: (typeof studies)[number] }) {
  const niche = getNiche(current).toLowerCase();
  // Score: same niche +3, same category +2, same platform +1
  const platform = current.industry.split("·")[0]?.trim().toLowerCase() || "";
  const scored = studies
    .filter((x) => x.id !== current.id)
    .map((x) => {
      let score = 0;
      if (getNiche(x).toLowerCase() === niche) score += 3;
      if (x.category === current.category) score += 2;
      if ((x.industry.split("·")[0]?.trim().toLowerCase() || "") === platform) score += 1;
      return { x, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map((r) => r.x);

  return (
    <section>
      <div className="flex items-center gap-2 text-primary">
        <TrendingUp className="w-5 h-5" />
        <div className="text-[11px] font-bold uppercase tracking-widest">Related wins</div>
      </div>
      <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-ink">More results in {current.category} & {getNiche(current)}</h2>

      <div className="mt-5 -mx-2 sm:mx-0 overflow-x-auto sm:overflow-visible pb-2">
        <div className="flex sm:grid sm:grid-cols-3 gap-3 px-2 sm:px-0 min-w-max sm:min-w-0">
          {scored.map((x) => {
            const Icon = categoryIcon[x.category];
            return (
              <Link
                key={x.id}
                to="/case-studies/$id"
                params={{ id: x.id }}
                className={`card-surface overflow-hidden group flex flex-col w-64 sm:w-auto shrink-0 hover:shadow-lg hover:-translate-y-0.5 transition`}
              >
                <div className={`h-24 bg-gradient-to-br ${x.color} relative px-3 py-2 flex items-end`}>
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest bg-ink/80 text-white px-1.5 py-0.5 rounded-full">
                    <Icon className="w-2.5 h-2.5" /> {x.category}
                  </span>
                  <div className="ml-auto text-right">
                    <div className="text-lg font-bold text-white leading-none">{x.metric}</div>
                    <div className="text-[8px] uppercase tracking-wide text-white/85 mt-0.5">{x.metricLabel}</div>
                  </div>
                </div>
                <div className="p-3.5 flex-1 flex flex-col">
                  <div className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold">{x.industry}</div>
                  <h3 className="mt-1 text-sm font-bold text-ink group-hover:text-primary leading-snug line-clamp-2">{x.title}</h3>
                  <div className="mt-auto pt-2 text-[10px] text-muted-foreground">{x.duration}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
