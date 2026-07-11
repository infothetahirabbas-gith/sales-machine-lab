import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import PageLayout from "../components/site/PageLayout";
import { Section, Card } from "../components/site/Section";
import { faqJsonLd, contactFaqs, breadcrumbJsonLd, contactPageJsonLd } from "../lib/seo";
import FaqSection from "../components/site/FaqSection";
import { SITE } from "@/config/site";
import { trackEvent, AnalyticsEvents } from "../lib/analytics";


export const Route = createFileRoute("/contact")({
  component: Contact,
  validateSearch: (search: Record<string, unknown>) => ({
    plan: typeof search.plan === "string" ? search.plan : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Contact BeingEcom UK - Free Shopify & WooCommerce Growth Audit" },
      { name: "description", content: "Contact BeingEcom, a UK ecommerce growth agency. Get a free 12-point Shopify or WooCommerce audit and a revenue-leakage plan within 48 hours." },
      { property: "og:title", content: "Contact BeingEcom UK - Free Shopify & WooCommerce Growth Audit" },
      { property: "og:description", content: "Contact BeingEcom, a UK ecommerce growth agency. Get a free 12-point Shopify or WooCommerce audit and a revenue-leakage plan within 48 hours." },
      { property: "og:url", content: "https://beingecom.com/contact" },
    ],
    links: [{ rel: "canonical", href: "https://beingecom.com/contact" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(contactPageJsonLd()) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(contactFaqs, "/contact")) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])) },
    ],
  }),
});


function Contact() {
  const [sent, setSent] = useState(false);
  const { plan } = Route.useSearch();
  return (
    <PageLayout>
      <section className="relative pt-20 pb-10 lg:pt-28 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 relative text-center lg:text-left">
          {plan && (
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary mb-3">
              Selected plan: {plan}
            </div>
          )}
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">Contact</div>
          <h1 className="mt-4 text-4xl md:text-6xl font-bold max-w-3xl mx-auto lg:mx-0 leading-[1.04]">
            Get your <span className="text-gradient">free ecommerce growth audit</span>.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0">
            Send us your store. We'll send back a 12-point loss-recovery plan within 48 hours. No pitch deck.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="min-w-0 rounded-3xl border border-border bg-card/60 p-5 sm:p-6 lg:p-8">

            {sent ? (
              <div className="py-16 text-center" role="status" aria-live="polite">
                <div className="text-5xl mb-4" aria-hidden="true">✓</div>
                <h3 className="text-2xl font-bold">Got it.</h3>
                <p className="mt-2 text-muted-foreground">We'll be in touch within 24 hours with next steps.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const data = new FormData(form);
                  trackEvent(AnalyticsEvents.ContactFormSubmit, { plan: plan ?? "none", has_plan: !!plan });
                  try {
                    trackEvent(AnalyticsEvents.ContactFormSubmitSuccess, {
                      plan: plan ?? "none",
                      revenue: String(data.get("revenue") ?? ""),
                      spend: String(data.get("spend") ?? ""),
                    });
                  } catch { /* no-op */ }
                  setSent(true);
                }}
                className="grid gap-4"
                aria-label="Book a strategy call"
                noValidate
              >
                <h3 className="text-2xl font-bold">Book Strategy Call</h3>
                {plan && (
                  <>
                    <input type="hidden" name="plan" value={plan} />
                    <div className="rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-ink/85">
                      You've selected the <strong>{plan}</strong> plan. We'll pre-fill this in your enquiry — you can change it at any time on the call.
                    </div>
                  </>
                )}
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="grid gap-1.5">
                    <label htmlFor="c-name" className="text-xs font-semibold text-ink">Full name <span className="text-destructive" aria-hidden="true">*</span></label>
                    <input id="c-name" name="name" required autoComplete="name" placeholder="Jane Doe" className="rounded-xl bg-secondary/60 border border-border px-4 py-3 min-h-11 outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40" />
                  </div>
                  <div className="grid gap-1.5">
                    <label htmlFor="c-email" className="text-xs font-semibold text-ink">Work email <span className="text-destructive" aria-hidden="true">*</span></label>
                    <input id="c-email" name="email" required type="email" autoComplete="email" placeholder="you@brand.com" className="rounded-xl bg-secondary/60 border border-border px-4 py-3 min-h-11 outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40" />
                  </div>
                </div>
                <div className="grid gap-1.5">
                  <label htmlFor="c-store" className="text-xs font-semibold text-ink">Store URL <span className="text-destructive" aria-hidden="true">*</span></label>
                  <input id="c-store" name="store" required type="url" inputMode="url" autoComplete="url" placeholder="https://your-store.com" className="rounded-xl bg-secondary/60 border border-border px-4 py-3 min-h-11 outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40" />
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="grid gap-1.5">
                    <label htmlFor="c-revenue" className="text-xs font-semibold text-ink">Monthly revenue</label>
                    <select id="c-revenue" name="revenue" defaultValue="" className="rounded-xl bg-secondary/60 border border-border px-4 py-3 min-h-11 outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40">
                      <option value="" disabled>Select range</option>
                      <option>£0 – £5K</option><option>£5K – £25K</option><option>£25K – £100K</option><option>£100K+</option>
                    </select>
                  </div>
                  <div className="grid gap-1.5">
                    <label htmlFor="c-spend" className="text-xs font-semibold text-ink">Monthly ad spend</label>
                    <select id="c-spend" name="spend" defaultValue="" className="rounded-xl bg-secondary/60 border border-border px-4 py-3 min-h-11 outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40">
                      <option value="" disabled>Select range</option>
                      <option>£0 – £1K</option><option>£1K – £5K</option><option>£5K – £25K</option><option>£25K+</option>
                    </select>
                  </div>
                </div>
                <div className="grid gap-1.5">
                  <label htmlFor="c-message" className="text-xs font-semibold text-ink">Where do you feel revenue is leaking?</label>
                  <textarea id="c-message" name="message" rows={4} defaultValue={plan ? `I'm interested in the ${plan} plan. My current focus is: ` : ""} placeholder="e.g. checkout drop-off, ad fatigue, low repeat rate…" className="rounded-xl bg-secondary/60 border border-border px-4 py-3 outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40" />
                </div>
                <label className="flex items-start gap-3 text-xs text-muted-foreground leading-relaxed">
                  <input required type="checkbox" name="consent" className="mt-0.5 h-4 w-4 rounded border-border accent-primary" />
                  <span>I agree to be contacted by BeingEcom about my enquiry and accept the <a href="/privacy" className="underline hover:text-primary">Privacy Policy</a>. We never share or sell your data.</span>
                </label>
                <button type="submit" className="btn btn-primary btn-shimmer justify-center">Send Audit Request →</button>
              </form>
            )}
          </div>

          <div className="min-w-0 space-y-4">
            <Card>
              <h3 className="font-semibold">What happens after booking</h3>
              <ol className="mt-3 grid gap-2 text-sm text-muted-foreground">
                <li>1. We review your store, ads & analytics.</li>
                <li>2. You get a 12-point loss-recovery plan in 48h.</li>
                <li>3. 45-min strategy call to walk you through it.</li>
                <li>4. We propose a scope only if it makes sense.</li>
              </ol>
            </Card>
            <Card>
              <h3 className="font-semibold">Requirements checklist</h3>
              <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
                <li>✓ Store URL (Shopify / WooCommerce)</li>
                <li>✓ Last 30 days ad spend (rough)</li>
                <li>✓ Read-only GA4 / Ads access (once we engage)</li>
                <li>✓ One business goal you actually care about</li>
              </ul>
            </Card>
            <Card>
              <h3 className="font-semibold">Reach us directly</h3>
              <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
                <li>Email: <a href={SITE.emailHref} className="text-primary hover:underline">{SITE.email}</a></li>
                <li>Phone: <a href={SITE.phoneHref} className="text-primary hover:underline">{SITE.phone}</a></li>
                <li>Office: {SITE.addressOneLine}</li>
                <li>Hours: {SITE.hours}</li>
              </ul>
            </Card>
            <Card>
              <h3 className="font-semibold">Trust</h3>
              <p className="mt-2 text-sm text-muted-foreground">120+ stores scaled. £48M+ tracked revenue. We sign NDAs without drama.</p>
            </Card>
          </div>
        </div>
      </Section>

      <FaqSection
        faqs={contactFaqs}
        title="Contact -"
        highlight="quick answers"
        intro="What founders ask before sending us their store."
      />
    </PageLayout>

  );
}
