import { createFileRoute, Link } from "@tanstack/react-router";
import { Megaphone, MousePointerClick, Search, Rocket } from "lucide-react";
import PageLayout from "../components/site/PageLayout";
import { Section, Card, CTA, NumberedList } from "../components/site/Section";
import GrowthChart from "../components/site/GrowthChart";
import { Reveal } from "../hooks/useReveal";

export const Route = createFileRoute("/")({
  component: Home,
});

const services = [
  { to: "/services/store-development", title: "Store Development", body: "Shopify & WooCommerce stores engineered for conversion.", icon: "🛒" },
  { to: "/services/cro", title: "Conversion Rate Optimization", body: "Turn existing traffic into 2–3× more sales.", icon: "📈" },
  { to: "/services/paid-ads", title: "Paid Advertising", body: "Meta, Google & TikTok ads built to scale profitably.", icon: "📣" },
  { to: "/services/seo", title: "Ecommerce SEO", body: "Rank products and collections on Google — free traffic forever.", icon: "🔍" },
  { to: "/services/email-sms", title: "Email & SMS Automation", body: "Recover lost sales. Multiply repeat customers.", icon: "📧" },
  { to: "/services/creative", title: "Creative Production", body: "Scroll-stopping ad creatives that actually sell.", icon: "🎨" },
  { to: "/services/funnel", title: "Funnel & Landing Pages", body: "High-converting funnels for launches and offers.", icon: "🧲" },
  { to: "/services/analytics", title: "Analytics & Tracking", body: "GA4, Pixel, CAPI and dashboards — set up correctly.", icon: "📊" },
  { to: "/services/scaling", title: "Scaling & Retention", body: "Systems to scale from 6 to 7 figures and keep customers.", icon: "🚀" },
];

function Home() {
  return (
    <PageLayout>
      {/* 1. HERO */}
      <section className="relative overflow-hidden pt-20 pb-24 lg:pt-28 lg:pb-32">
        <div className="absolute inset-0 grid-bg opacity-70 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[480px] h-[480px] bg-primary/15 blur-[140px] rounded-full float-slow" />
        <div className="absolute -bottom-40 -left-40 w-[480px] h-[480px] bg-accent/25 blur-[140px] rounded-full float" />
        {/* Floating chips */}
        <div className="hidden md:block absolute top-24 right-[8%] card-surface px-3 py-2 text-xs font-semibold float">
          <span className="text-primary">●</span> ROAS 3.8×
        </div>
        <div className="hidden md:block absolute bottom-24 left-[6%] card-surface px-3 py-2 text-xs font-semibold float-slow">
          <span className="text-primary">●</span> CR +285%
        </div>
        <div className="hidden md:block absolute top-1/2 right-[3%] card-surface px-3 py-2 text-xs font-semibold float-slow" style={{ animationDelay: "1.5s" }}>
          <span className="text-primary">●</span> $214K MRR
        </div>

        <div className="mx-auto max-w-7xl px-5 lg:px-8 relative grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7" style={{ animation: "rise 0.9s cubic-bezier(0.16,1,0.3,1) both" }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
              <span className="relative w-1.5 h-1.5 rounded-full bg-primary pulse-dot" />
              Ecommerce Growth System
            </div>
            <h1 className="mt-5 text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.02] text-ink">
              We Turn <span className="text-sky-gradient">Struggling Ecommerce Stores</span> Into <span className="text-gradient">Scalable Revenue Machines</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl" style={{ animation: "rise 0.9s 0.15s cubic-bezier(0.16,1,0.3,1) both" }}>
              Shopify & WooCommerce growth system — Ads + SEO + CRO + Automation. Built for store owners who want sales, not theory.
            </p>
            <div className="mt-8 flex flex-wrap gap-3" style={{ animation: "rise 0.9s 0.3s cubic-bezier(0.16,1,0.3,1) both" }}>
              <Link to="/contact" className="btn btn-primary btn-shimmer">
                Get Free Store Audit <span>→</span>
              </Link>
              <Link to="/contact" className="btn btn-dark btn-shimmer">
                Book Strategy Call
              </Link>
              <Link to="/case-studies" className="btn btn-ghost">
                See Results
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md" style={{ animation: "rise 0.9s 0.45s cubic-bezier(0.16,1,0.3,1) both" }}>
              {[
                { v: "+300%", l: "avg sales growth" },
                { v: "2.5×", l: "ROAS improvement" },
                { v: "100+", l: "stores scaled" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-2xl md:text-3xl font-bold text-sky-gradient">{s.v}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5" style={{ animation: "scaleIn 0.9s 0.2s cubic-bezier(0.16,1,0.3,1) both" }}>
            <div className="relative card-surface card-tilt p-5 shadow-[0_40px_80px_-30px_oklch(0.65_0.18_245/0.4)] float">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                <div className="flex items-center gap-2">
                  <span className="relative w-2 h-2 rounded-full bg-primary pulse-dot" />
                  Revenue · Last 30 days
                </div>
                <span className="text-primary font-bold">+312%</span>
              </div>
              <GrowthChart className="w-full h-auto" />
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[{l:"Sessions",v:"284K"},{l:"CR",v:"4.8%"},{l:"AOV",v:"$72"}].map((m)=>(
                  <div key={m.l} className="rounded-xl bg-secondary p-3 transition hover:bg-primary/10 hover:-translate-y-0.5">
                    <div className="text-xs text-muted-foreground">{m.l}</div>
                    <div className="font-bold text-ink">{m.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST BAR — running marquee */}
      <section className="border-y border-border bg-card/30 py-8 overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 flex flex-col items-center gap-4">
          <div className="text-xs uppercase tracking-widest text-muted-foreground text-center">
            Trusted by ecommerce operators on
          </div>
          <div
            className="relative w-full overflow-hidden"
            style={{ maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)" }}
          >
            <div className="marquee-track marquee-fast text-muted-foreground font-semibold whitespace-nowrap">
              {Array.from({ length: 2 }).flatMap((_, k) =>
                ["Shopify","WooCommerce","Meta Ads","Google Ads","Klaviyo","GA4","TikTok Ads","Triple Whale","Recharge","Yotpo","Hotjar","Shogun"].map((t, i) => (
                  <span key={`${k}-${i}`} className="inline-flex items-center gap-8">
                    <span className="hover:text-primary transition-colors">{t}</span>
                    <span className="text-primary/40">•</span>
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROBLEM */}
      <Section center eyebrow="Why most stores fail" title="Traffic isn't your problem. Conversion is.">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { t: "No sales despite traffic", b: "Visitors land, browse, leave. Funnel is leaking everywhere." },
            { t: "High ad spend, low ROAS", b: "You're burning budget on bad creatives and lazy targeting." },
            { t: "Poor conversion rate", b: "Product pages don't sell. Checkout drops 70%+." },
            { t: "Weak branding", b: "Looks generic. Feels untrustworthy. People bounce on instinct." },
          ].map((p) => (
            <Card key={p.t}>
              <div className="text-2xl">⚠️</div>
              <h3 className="mt-3 font-semibold">{p.t}</h3>
              <p className="text-sm text-muted-foreground mt-1">{p.b}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 4. SOLUTION 4 PILLARS */}
      <Section center eyebrow="Our growth system" title="We fix everything that stops your store from selling.">
      {/* 4. SOLUTION — 4 PILLARS */}
      <Section
        center
        eyebrow="The system"
        title={<>The 4 pillars that fix what's <span className="text-sky-gradient">stopping your store from selling</span></>}
        intro="One integrated growth engine. No more disconnected agencies blaming each other."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { t: "Traffic", b: "Profitable paid ads across Meta, Google, TikTok.", Icon: Megaphone },
            { t: "Conversion", b: "Store, product page & checkout optimized for sales.", Icon: MousePointerClick },
            { t: "Organic", b: "Ecommerce SEO that compounds free revenue.", Icon: Search },
            { t: "Scale", b: "Email, retention & data systems that multiply LTV.", Icon: Rocket },
          ].map((p, i) => (
            <Reveal key={p.t} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
              <Card className="relative overflow-hidden h-full">
                <div className="absolute top-4 right-5 font-display font-bold text-5xl text-primary/10 select-none">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110">
                  <p.Icon className="w-6 h-6" strokeWidth={2.2} />
                </div>
                <h3 className="mt-6 font-semibold text-lg text-ink">{p.t}</h3>
                <p className="text-sm text-muted-foreground mt-1">{p.b}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 5. SERVICES PREVIEW GRID */}
      <Section center eyebrow="What we do" title="Nine growth services, one operating system.">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s) => (
            <Link key={s.to} to={s.to}>
              <Card>
                <div className="text-3xl">{s.icon}</div>
                <h3 className="mt-3 font-semibold text-lg">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{s.body}</p>
                <div className="mt-4 text-sm font-semibold text-primary">Explore →</div>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link to="/services" className="text-sm font-semibold text-primary hover:underline">See all 9 services →</Link>
        </div>
      </Section>

      {/* 6. BEFORE / AFTER */}
      <Section center eyebrow="Before vs After" title="Same store. Different system.">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
            <div className="text-xs font-bold uppercase text-destructive mb-3">Before</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>— 1.1% conversion rate</li>
              <li>— ROAS stuck at 1.4×</li>
              <li>— $4 AOV uplift, no automations</li>
              <li>— 70% checkout abandonment</li>
              <li>— Zero organic ranking</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-primary/40 bg-primary/5 p-6">
            <div className="text-xs font-bold uppercase text-primary mb-3">After 90 days</div>
            <ul className="space-y-2 text-sm">
              <li>✓ 4.6% conversion rate</li>
              <li>✓ 3.8× blended ROAS</li>
              <li>✓ 32% revenue from email & SMS</li>
              <li>✓ Checkout abandonment cut in half</li>
              <li>✓ Top-3 rankings on core products</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* 7. CASE STUDY */}
      <Section center eyebrow="Real result" title="From $18K to $214K/month in 6 months.">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="rounded-2xl border border-border bg-card/60 p-4">
            <GrowthChart className="w-full h-auto" />
          </div>
          <div>
            <p className="text-lg text-muted-foreground">
              A Shopify apparel brand stuck at 1.2% CR and 1.5× ROAS. We rebuilt the
              product page system, restructured ads into a proper funnel, and shipped
              Klaviyo flows from scratch.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { v: "11.9×", l: "Revenue" },
                { v: "3.8×", l: "Blended ROAS" },
                { v: "+285%", l: "CR uplift" },
              ].map((m) => (
                <div key={m.l} className="rounded-xl border border-border bg-card/60 p-4">
                  <div className="text-2xl font-bold text-gradient">{m.v}</div>
                  <div className="text-xs text-muted-foreground mt-1">{m.l}</div>
                </div>
              ))}
            </div>
            <Link to="/case-studies" className="inline-block mt-6 text-primary font-semibold hover:underline">
              See full case studies →
            </Link>
          </div>
        </div>
      </Section>

      {/* 8. HOW IT WORKS */}
      <Section center eyebrow="How it works" title="Three steps. Zero fluff.">
        <NumberedList items={[
          { title: "Audit your store", body: "We tear down your funnel, ads, analytics, and product pages — find where revenue is leaking." },
          { title: "Fix conversion + ads", body: "Rebuild the highest-impact pieces first: PDP, checkout, ad funnel, Klaviyo flows." },
          { title: "Scale revenue", body: "Once unit economics work, we scale spend, channels, and retention systems together." },
        ]} />
      </Section>

      {/* 9. TOOLS */}
      <Section center eyebrow="Stack" title="The tools we run on every store.">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {["Shopify","WooCommerce","Meta Ads","Google Ads","TikTok Ads","GA4","Hotjar","Klaviyo","Triple Whale","Recharge","Yotpo","Shogun"].map((t)=>(
            <div key={t} className="rounded-xl border border-border bg-white px-4 py-3 text-sm font-medium text-center text-ink transition hover:-translate-y-1 hover:border-primary/40 hover:text-primary hover:shadow-[0_12px_30px_-15px_oklch(0.65_0.18_245/0.5)]">{t}</div>
          ))}
        </div>
      </Section>

      {/* 10. TESTIMONIALS */}
      <Section center eyebrow="What store owners say" title="Operators. Not influencers.">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { q: "We went from praying for sales to forecasting them. The CRO work alone paid for the engagement in 3 weeks.", a: "Arjun M., Apparel · Shopify" },
            { q: "Their ad funnel cut our CAC almost in half. The flows added 28% in pure email revenue.", a: "Sara K., Beauty · Shopify" },
            { q: "Finally an agency that understands ecommerce — not just 'digital marketing'. Numbers speak.", a: "David L., Home · WooCommerce" },
          ].map((t) => (
            <Card key={t.a}>
              <div className="text-primary text-2xl">“</div>
              <p className="text-sm">{t.q}</p>
              <div className="mt-4 text-xs text-muted-foreground">— {t.a}</div>
            </Card>
          ))}
        </div>
      </Section>

      {/* 11. OFFER */}
      <section className="py-14">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/8 via-white to-accent/20 p-8 lg:p-12 flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-primary/15 blur-3xl rounded-full float" />
            <div className="relative">
              <div className="text-xs font-bold uppercase tracking-widest text-primary">Limited Offer</div>
              <h3 className="mt-2 text-2xl md:text-3xl font-bold text-ink">Free Ecommerce Growth Audit</h3>
              <p className="mt-2 text-muted-foreground max-w-xl">
                We'll review your store, ads, and analytics — and send back a 12-point loss-recovery plan. No pitch deck.
              </p>
            </div>
            <Link to="/contact" className="relative shrink-0 btn btn-primary btn-shimmer">
              <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-25" />
              <span className="relative">Claim Audit →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 12. FAQ */}
      <Section center eyebrow="FAQ" title="Straight answers.">
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { q: "Do you guarantee sales?", a: "No. Anyone who does is lying. We guarantee the system, the process, and the work — sales follow when the math is right." },
            { q: "Do you work with small stores?", a: "Yes, if there's a real product and at least basic traffic. We won't take stores with nothing to optimize." },
            { q: "What ad budget do I need?", a: "We typically work with stores spending $3K+/mo on ads. Smaller is okay if CRO/SEO is the focus first." },
            { q: "Shopify or WooCommerce?", a: "Both. We don't push a platform — we push what scales for your business." },
            { q: "How long until I see results?", a: "CRO and email lift in 2–4 weeks. Ads in 30–60 days. SEO in 3–6 months. We optimize the fastest wins first." },
            { q: "Do you sign contracts?", a: "Yes — 90-day initial engagement so we can actually execute a system, not just dabble." },
          ].map((f) => (
            <Card key={f.q}>
              <h4 className="font-semibold">{f.q}</h4>
              <p className="text-sm text-muted-foreground mt-2">{f.a}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 13. FINAL CTA */}
      <CTA />
    </PageLayout>
  );
}
