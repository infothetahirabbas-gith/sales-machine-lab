import { createFileRoute, Link } from "@tanstack/react-router";
import { Quote } from "lucide-react";
import PageLayout from "../components/site/PageLayout";
import { faqJsonLd, aboutFaqs, breadcrumbJsonLd } from "../lib/seo";
import FaqSection from "../components/site/FaqSection";
import founder from "@/assets/founder-ceo.jpg.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About BeingEcom — Tahir Abbas, Founder & CEO" },
      { name: "description", content: "Meet Tahir Abbas, Founder & CEO of BeingEcom — the growth operating system for Shopify & WooCommerce brands." },
      { property: "og:title", content: "About BeingEcom — Tahir Abbas, Founder & CEO" },
      { property: "og:description", content: "Tahir Abbas leads BeingEcom — ecommerce growth operators for Shopify & WooCommerce stores." },
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
      <section className="relative pt-20 pb-24 lg:pt-28 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[480px] h-[480px] bg-primary/15 blur-[140px] rounded-full float-slow" />
        <div className="absolute -bottom-40 -left-40 w-[480px] h-[480px] bg-accent/25 blur-[140px] rounded-full float" />

        <div className="mx-auto max-w-5xl px-5 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
              Founder & CEO
            </div>
            <h1 className="mt-5 text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.04] text-ink">
              <span className="text-gradient">Tahir Abbas</span>
            </h1>
            <p className="mt-3 text-base text-muted-foreground">Founder & CEO · BeingEcom</p>
          </div>

          <div className="mt-14 grid lg:grid-cols-5 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-2 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 to-accent/30 blur-2xl rounded-full" />
                <img
                  src={founder.url}
                  alt="Tahir Abbas, Founder & CEO of BeingEcom"
                  width={480}
                  height={480}
                  loading="eager"
                  className="relative w-64 h-64 md:w-80 md:h-80 rounded-full object-cover shadow-2xl ring-8 ring-border"
                />
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="relative card-surface p-8 lg:p-10 rounded-3xl">
                <Quote className="absolute -top-4 -left-4 w-12 h-12 text-primary/30" strokeWidth={1.5} />
                <p className="text-xl md:text-2xl lg:text-3xl font-display font-semibold text-ink leading-snug">
                  "Ecommerce isn't about hacks or hype.
                  It's about <span className="text-gradient">building a system</span> where every click,
                  every dollar of ad spend, and every customer compounds into real, profitable growth."
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-0.5 w-10 bg-primary rounded-full" />
                  <span className="text-sm font-bold uppercase tracking-widest text-primary">Tahir Abbas</span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3 justify-center lg:justify-start">
                <Link to="/contact" className="btn btn-primary btn-shimmer">Book Strategy Call <span>→</span></Link>
                <Link to="/case-studies" className="btn btn-dark btn-shimmer">See Case Studies</Link>
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
    </PageLayout>
  );
}
