import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import PageLayout from "../components/site/PageLayout";
import { Section, Card } from "../components/site/Section";
import { faqJsonLd, contactFaqs, breadcrumbJsonLd, contactPageJsonLd } from "../lib/seo";
import FaqSection from "../components/site/FaqSection";
import { SITE } from "@/config/site";


export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact BeingEcom UK — Free Shopify & WooCommerce Growth Audit" },
      { name: "description", content: "Contact BeingEcom, a UK ecommerce growth agency. Get a free 12-point Shopify or WooCommerce audit and a revenue-leakage plan within 48 hours." },
      { property: "og:title", content: "Contact BeingEcom UK — Free Shopify & WooCommerce Growth Audit" },
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
  return (
    <PageLayout>
      <section className="relative pt-20 pb-10 lg:pt-28 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 relative text-center lg:text-left">
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
              <div className="py-16 text-center">
                <div className="text-5xl mb-4">✓</div>
                <h3 className="text-2xl font-bold">Got it.</h3>
                <p className="mt-2 text-muted-foreground">We'll be in touch within 24 hours with next steps.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                className="grid gap-4"
              >
                <h3 className="text-2xl font-bold">Book Strategy Call</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <input required placeholder="Full name" className="rounded-xl bg-secondary/60 border border-border px-4 py-3 outline-none focus:border-primary" />
                  <input required type="email" placeholder="Work email" className="rounded-xl bg-secondary/60 border border-border px-4 py-3 outline-none focus:border-primary" />
                </div>
                <input required placeholder="Store URL (Shopify / WooCommerce)" className="rounded-xl bg-secondary/60 border border-border px-4 py-3 outline-none focus:border-primary" />
                <div className="grid sm:grid-cols-2 gap-3">
                  <select aria-label="Monthly revenue" className="rounded-xl bg-secondary/60 border border-border px-4 py-3 outline-none focus:border-primary">
                    <option>Monthly revenue</option><option>£0 - £5K</option><option>£5K - £25K</option><option>£25K - £100K</option><option>£100K+</option>
                  </select>
                  <select aria-label="Monthly ad spend" className="rounded-xl bg-secondary/60 border border-border px-4 py-3 outline-none focus:border-primary">
                    <option>Monthly ad spend</option><option>£0 - £1K</option><option>£1K - £5K</option><option>£5K - £25K</option><option>£25K+</option>
                  </select>
                </div>
                <textarea rows={4} placeholder="Where do you feel revenue is leaking?" className="rounded-xl bg-secondary/60 border border-border px-4 py-3 outline-none focus:border-primary" />
                <label className="flex items-start gap-3 text-xs text-muted-foreground leading-relaxed">
                  <input required type="checkbox" className="mt-0.5 h-4 w-4 rounded border-border accent-primary" />
                  <span>I agree to be contacted by BeingEcom about my enquiry and accept the <a href="/privacy" className="underline hover:text-primary">Privacy Policy</a>. We never share or sell your data.</span>
                </label>
                <button className="rounded-full bg-primary text-primary-foreground px-6 py-3 font-semibold">Send Audit Request →</button>
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
        title="Contact —"
        highlight="quick answers"
        intro="What founders ask before sending us their store."
      />
    </PageLayout>

  );
}
