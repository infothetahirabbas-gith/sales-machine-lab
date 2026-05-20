import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import PageLayout from "../components/site/PageLayout";
import { Section, Card } from "../components/site/Section";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact BeingEcom — Free Ecommerce Growth Audit" },
      { name: "description", content: "Talk to BeingEcom about scaling your Shopify or WooCommerce store. Get a free 12-point ecommerce growth audit within 48 hours. No pitch deck." },
      { name: "keywords", content: "contact ecommerce agency, free Shopify audit, ecommerce growth audit, WooCommerce consultation, DTC strategy call" },
      { property: "og:title", content: "Contact BeingEcom — Free Ecommerce Growth Audit" },
      { property: "og:description", content: "Send us your store. We send back a 12-point loss-recovery plan within 48 hours." },
      { property: "og:url", content: "https://sales-machine-lab.lovable.app/contact" },
    ],
    links: [{ rel: "canonical", href: "https://sales-machine-lab.lovable.app/contact" }],
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
          <div className="rounded-3xl border border-border bg-card/60 p-6 lg:p-8">
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
                  <select className="rounded-xl bg-secondary/60 border border-border px-4 py-3 outline-none focus:border-primary">
                    <option>Monthly revenue</option><option>$0 - $5K</option><option>$5K - $25K</option><option>$25K - $100K</option><option>$100K+</option>
                  </select>
                  <select className="rounded-xl bg-secondary/60 border border-border px-4 py-3 outline-none focus:border-primary">
                    <option>Monthly ad spend</option><option>$0 - $1K</option><option>$1K - $5K</option><option>$5K - $25K</option><option>$25K+</option>
                  </select>
                </div>
                <textarea rows={4} placeholder="Where do you feel revenue is leaking?" className="rounded-xl bg-secondary/60 border border-border px-4 py-3 outline-none focus:border-primary" />
                <button className="rounded-full bg-primary text-primary-foreground px-6 py-3 font-semibold">Send Audit Request →</button>
              </form>
            )}
          </div>

          <div className="space-y-4">
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
              <h3 className="font-semibold">Trust</h3>
              <p className="mt-2 text-sm text-muted-foreground">100+ stores scaled. $48M+ tracked revenue. We sign NDAs without drama.</p>
            </Card>
          </div>
        </div>
      </Section>

    </PageLayout>
  );
}
