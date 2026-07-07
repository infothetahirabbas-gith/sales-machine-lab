import { createFileRoute, Link } from "@tanstack/react-router";
import { Quote, Target, Compass, Rocket, Sparkles, ShieldCheck, TrendingUp, Search, Megaphone, MousePointerClick, Bot, BarChart3, Award, Briefcase, Globe2 } from "lucide-react";
import PageLayout from "../components/site/PageLayout";
import { Section, Card, CTA } from "../components/site/Section";
import { faqJsonLd, aboutFaqs, breadcrumbJsonLd } from "../lib/seo";
import FaqSection from "../components/site/FaqSection";
import { Reveal } from "../hooks/useReveal";
import founder from "@/assets/founder-ceo.jpg.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About BeingEcom — UK Shopify & WooCommerce Agency" },
      { name: "description", content: "BeingEcom is a UK ecommerce growth agency for Shopify and WooCommerce brands. Senior operators, revenue-first strategy and full transparency on results." },
      { property: "og:title", content: "About BeingEcom — UK Shopify & WooCommerce Agency" },
      { property: "og:description", content: "BeingEcom is a UK ecommerce growth agency for Shopify and WooCommerce brands. Senior operators, revenue-first strategy and full transparency on results." },
      { property: "og:url", content: "https://beingecom.com/about" },
      { property: "og:image", content: "https://beingecom.com/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://beingecom.com/about" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(aboutFaqs, "/about")) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])) },
    ],
  }),
  component: About,
});

function About() {
  return (
    <PageLayout>
      {/* HERO */}
      <section className="relative pt-20 pb-16 lg:pt-28 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
        <div className="mx-auto max-w-5xl px-5 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            About BeingEcom
          </div>
          <h1 className="mt-5 text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.04]">
            The growth partner Shopify &amp; WooCommerce brands trust.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            We're ecommerce operators, not generalists. Strategy, ads, SEO, CRO and automation — one accountable team turning stores into scalable revenue machines.
          </p>
        </div>
      </section>

      {/* A. ABOUT BEING ECOM */}
      <Section
        eyebrow="Who we are"
        title="About Being Ecom"
        intro="We are a results-driven ecommerce growth agency built exclusively for Shopify and WooCommerce brands."
      >
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <Reveal>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                <span className="text-ink font-semibold">Being Ecom</span> exists to help online brands stop guessing and start scaling. We combine deep ecommerce expertise with paid media, search, conversion optimisation, and AI automation to build growth systems that compound month after month.
              </p>
              <p>
                Every engagement is led by senior operators — not interns. We've scaled stores across fashion, beauty, supplements, home, and DTC niches, with a single obsession: <span className="text-ink font-semibold">profitable, predictable revenue</span>.
              </p>
              <p>
                When you work with us, you get a real growth team — strategists, media buyers, CRO specialists, SEO leads, and creative producers — operating as one unit behind your store.
              </p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { Icon: ShieldCheck, t: "Ecommerce-only", b: "We only serve Shopify & WooCommerce brands. No distractions." },
              { Icon: TrendingUp, t: "Results first", b: "Every action ladders up to revenue, ROAS, or LTV." },
              { Icon: Briefcase, t: "Senior operators", b: "Strategy and execution led by people who've scaled real stores." },
              { Icon: Award, t: "Proven systems", b: "Repeatable frameworks across ads, SEO, CRO, and email." },
            ].map((p, i) => (
              <Reveal key={p.t} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                <Card>
                  <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    <p.Icon className="w-5 h-5" strokeWidth={2.2} />
                  </div>
                  <h3 className="mt-4 font-semibold text-lg text-ink">{p.t}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{p.b}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* B. STRATEGIC PLANNING */}
      <Section
        alt
        eyebrow="Strategic Planning"
        title="How we plan growth before we spend a dollar."
        intro="Every brand starts with a custom growth blueprint — not a templated playbook."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { Icon: Search, t: "Diagnose", b: "Full audit of store, ads, funnel, SEO, email, and analytics — find the leaks." },
            { Icon: Compass, t: "Research", b: "Market, competitor, audience, and keyword research that informs every decision." },
            { Icon: Target, t: "Prioritise", b: "Rank opportunities by revenue impact × speed × confidence. Build the roadmap." },
            { Icon: Rocket, t: "Execute", b: "Ship weekly. Test relentlessly. Compound wins into a real growth system." },
          ].map((p, i) => (
            <Reveal key={p.t} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
              <Card className="h-full">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    <p.Icon className="w-5 h-5" strokeWidth={2.2} />
                  </div>
                  <span className="font-display font-bold text-3xl text-primary/15">0{i + 1}</span>
                </div>
                <h3 className="mt-4 font-semibold text-lg text-ink">{p.t}</h3>
                <p className="text-sm text-muted-foreground mt-1">{p.b}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* C. BEING ECOM STRATEGY */}
      <Section
        eyebrow="Our methodology"
        title="The Being Ecom Strategy."
        intro="A unified growth framework built from six interlocking systems — each one reinforcing the others."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { Icon: Search, t: "SEO Process", b: "Technical, on-page, content, and authority — built to rank product and collection pages for buying intent." },
            { Icon: Megaphone, t: "Advertising Approach", b: "Funnel-based Meta, Google, and TikTok ads engineered for profitable scale, not vanity ROAS." },
            { Icon: MousePointerClick, t: "CRO Strategy", b: "Data-led experimentation across product pages, cart, and checkout to compound conversion lift." },
            { Icon: Bot, t: "Automation Systems", b: "Klaviyo flows, AI assistants, and operational automation that recover revenue 24/7." },
            { Icon: BarChart3, t: "Analytics & Tracking", b: "GA4, pixel, CAPI, and dashboards configured so every decision is backed by clean data." },
            { Icon: Rocket, t: "Scaling Methodology", b: "Retention, LTV, and channel expansion playbooks that take brands from 6 to 7 figures and beyond." },
          ].map((p, i) => (
            <Reveal key={p.t} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
              <Card className="h-full">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <p.Icon className="w-6 h-6" strokeWidth={2.2} />
                </div>
                <h3 className="mt-4 font-semibold text-lg text-ink">{p.t}</h3>
                <p className="text-sm text-muted-foreground mt-1">{p.b}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* D & E. MISSION + VISION */}
      <Section alt>
        <div className="grid lg:grid-cols-2 gap-6">
          <Reveal>
            <div className="card-surface p-8 lg:p-10 h-full">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                <Sparkles className="w-4 h-4" /> Our Mission
              </div>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold leading-tight">
                Help ecommerce brands grow profitably through data, marketing, AI, and innovation.
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                We exist to remove the guesswork from ecommerce growth. By combining proven marketing systems with intelligent automation and disciplined analytics, we help store owners turn traffic into revenue, customers into communities, and stores into category leaders.
              </p>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <div className="card-surface p-8 lg:p-10 h-full">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                <Globe2 className="w-4 h-4" /> Our Vision
              </div>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold leading-tight">
                Become the world's most trusted ecommerce growth partner.
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                Our vision is to build the global standard for ecommerce growth — a partner that founders trust to scale Shopify and WooCommerce brands across every market, channel, and stage. We're building the operating system that powers the next generation of category-defining online businesses.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* FOUNDER */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 relative">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
              Leadership
            </div>
            <h2 className="mt-5 text-3xl md:text-5xl font-bold leading-tight">Meet the Founder &amp; CEO.</h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-6 bg-primary/15 blur-3xl rounded-full" />
                <div className="relative rounded-[2rem] overflow-hidden border border-border shadow-2xl bg-card">
                  <img
                    src={founder.url}
                    alt="Tahir Abbas, Founder & CEO of BeingEcom"
                    width={560}
                    height={680}
                    loading="eager"
                    className="w-72 h-80 md:w-[22rem] md:h-[26rem] object-cover"
                  />
                </div>
                <div className="absolute -bottom-5 -right-5 card-surface px-5 py-3 shadow-xl">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Founder &amp; CEO</div>
                  <div className="font-bold text-ink">Tahir Abbas</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative card-surface p-8 lg:p-10 rounded-3xl">
                <Quote className="absolute -top-4 -left-4 w-12 h-12 text-primary/40" strokeWidth={1.5} />
                <p className="text-xl md:text-2xl font-display font-semibold text-ink leading-snug">
                  "Ecommerce isn't about hacks or hype. It's about building a system where every click, every dollar of ad spend, and every customer compounds into real, profitable growth."
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-0.5 w-10 bg-primary rounded-full" />
                  <span className="text-sm font-bold uppercase tracking-widest text-primary">Tahir Abbas</span>
                </div>
              </div>

              <p className="mt-6 text-muted-foreground leading-relaxed">
                Tahir Abbas founded Being Ecom to give Shopify and WooCommerce brands a real growth partner — one team accountable for the entire revenue engine. With years of hands-on experience scaling DTC brands across ads, SEO, CRO, and retention, Tahir leads strategy for every flagship client engagement.
              </p>

              <div className="mt-6 grid sm:grid-cols-3 gap-3">
                {[
                  { v: "120+", l: "Brands scaled" },
                  { v: "£48M+", l: "Tracked revenue" },
                  { v: "10+ yrs", l: "Ecom operating" },
                ].map((s) => (
                  <div key={s.l} className="rounded-2xl border border-border bg-card/60 p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{s.v}</div>
                    <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/contact" className="btn btn-primary btn-shimmer">Book Strategy Call <span>→</span></Link>
                <Link to="/case-studies" className="btn btn-ghost">See Case Studies</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqSection
        faqs={aboutFaqs}
        title="About BeingEcom —"
        highlight="quick answers"
        intro="What founders ask before working with us."
      />

      <CTA
        heading="Ready to scale your store?"
        sub="Get a free, no-fluff ecommerce growth audit. We'll show you exactly what's leaking revenue — and how to fix it."
      />
    </PageLayout>
  );
}
