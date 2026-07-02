import { createFileRoute, Link } from "@tanstack/react-router";
import PageLayout from "../components/site/PageLayout";
import { breadcrumbJsonLd, faqJsonLd, SITE_URL } from "../lib/seo";
import { BookOpen, ArrowRight } from "lucide-react";

const terms = [
  {
    term: "Keywords",
    definition:
      "Keywords are the exact words and phrases shoppers type into Google when they want to find, compare, or buy a product. They are the bridge between customer intent and your store.",
    why: "Targeting the right keywords means your products show up in front of buyers who are ready to spend — not just browsers. Wrong keywords = wasted content and zero revenue.",
    example:
      "A skincare brand targeting \"vitamin C serum for oily skin\" attracts high-intent buyers, while \"best skincare\" mostly attracts researchers who don't convert.",
  },
  {
    term: "Backlinks",
    definition:
      "A backlink is a link from another website pointing to yours. Google treats each one as a vote of confidence — the more trusted the source, the more powerful the vote.",
    why: "Backlinks are still one of Google's top 3 ranking factors in 2026. Quality links from real publications, blogs, and partner brands push your product and collection pages above competitors.",
    example:
      "A Shopify coffee brand featured in Forbes and a niche barista blog will outrank a competitor with zero mentions — even with weaker on-page SEO.",
  },
  {
    term: "Title Tag",
    definition:
      "The title tag is the clickable blue headline that appears in Google's search results. It's the first impression of your page in the SERP and a primary ranking signal.",
    why: "A weak title kills clicks even if you rank #1. A sharp, benefit-led title with the right keyword can lift CTR 20–60% and pull traffic from competitors above you.",
    example:
      "\"Buy Wireless Earbuds\" is generic. \"Wireless Earbuds — 40H Battery, Free 2-Day Shipping | Brand\" wins the click.",
  },
  {
    term: "Crawling",
    definition:
      "Crawling is how Google's bots discover the pages on your store by following links and reading your sitemap. If a page isn't crawled, it cannot rank — period.",
    why: "Most ecommerce stores waste their crawl budget on filters, tags, and duplicate URLs. Cleaning this up lets Google find and rank the pages that actually make money.",
    example:
      "A Shopify store with 800 filter URLs (color, size, price) often has only 60 product pages crawled. Blocking the noise gets the real PDPs indexed in days.",
  },
  {
    term: "SERP (Search Engine Results Page)",
    definition:
      "The SERP is the page Google shows after someone searches. It includes ads, product listings, organic results, images, videos, AI overviews, and featured snippets.",
    why: "In 2026, the organic top 3 isn't enough — you need to win across multiple SERP features: shopping results, AI overviews, reviews, and rich snippets to capture real attention.",
    example:
      "For \"best running shoes\", winning brands appear in Google Shopping, organic results, AI Overviews, AND a video carousel — not just one spot.",
  },
  {
    term: "Meta Description",
    definition:
      "The meta description is the short summary under your title tag in the SERP. It doesn't directly affect rankings, but it's your free ad copy that earns the click.",
    why: "Treat it like a paid ad headline. A persuasive meta with a benefit, proof point, and CTA can double your click-through rate without changing your ranking position.",
    example:
      "\"Premium leather wallets, handmade in Italy. Free worldwide shipping & lifetime warranty. Shop the 2026 collection.\" beats \"We sell wallets.\" every time.",
  },
  {
    term: "Anchor Text",
    definition:
      "Anchor text is the clickable, underlined text inside a link. It tells Google (and humans) what the linked page is about.",
    why: "Smart, descriptive anchor text inside your store builds topical authority and pushes important collections and PDPs up the rankings. Generic \"click here\" anchors waste link equity.",
    example:
      "Linking from a blog post using \"organic cotton t-shirts\" → your collection page is 10× more powerful than linking with \"shop now\".",
  },
  {
    term: "Indexing",
    definition:
      "Indexing is when Google stores your page in its database so it can show up in search results. Crawled ≠ indexed. Indexed = eligible to rank.",
    why: "Thousands of ecommerce stores have hundreds of products that are crawled but never indexed — meaning zero traffic. Fixing indexation alone often unlocks instant organic growth.",
    example:
      "An apparel store with 1,200 SKUs but only 180 indexed pages is leaving 85% of its potential Google revenue on the table.",
  },
  {
    term: "Organic Traffic",
    definition:
      "Organic traffic is the unpaid visitors who land on your store directly from search engines like Google and Bing. No ad spend — pure earned attention.",
    why: "It's the most profitable channel in ecommerce. Unlike paid ads, organic traffic compounds month after month and keeps converting long after the work is done.",
    example:
      "A brand that builds 30 SEO-optimised blog posts can generate 50K+ free monthly visits — the equivalent of £15K–£40K/month in paid ad spend.",
  },
  {
    term: "Alt Text",
    definition:
      "Alt text is the written description of an image inside your store's code. It helps visually impaired users, and helps Google understand what the image shows.",
    why: "Ecommerce stores live on images. Strong alt text wins traffic from Google Images, improves accessibility, and adds keyword context to product pages without keyword stuffing.",
    example:
      "Instead of \"IMG_2245.jpg\", use \"Men's black leather chelsea boots, side view\" — and watch product pages start ranking in Google Images.",
  },
  {
    term: "Bounce Rate",
    definition:
      "Bounce rate is the percentage of visitors who land on your store and leave without taking any action — no click, no scroll engagement, no add-to-cart.",
    why: "A high bounce rate signals to Google that your page didn't match the visitor's intent. Fixing it improves rankings AND conversions at the same time.",
    example:
      "A PDP with 78% bounce usually has slow load, weak hero image, or unclear price. Cutting bounce to 45% often doubles conversion rate within weeks.",
  },
  {
    term: "Ranking",
    definition:
      "Ranking is the position your page holds on Google for a specific keyword. Position 1 gets ~27% of clicks; position 10 gets under 2%.",
    why: "Moving from page 2 to position 3 can 10× your traffic without spending a dollar on ads. Rankings are the single biggest lever for compounding organic revenue.",
    example:
      "A skincare PDP moving from #12 to #3 for \"retinol serum\" can go from 0 sales to 40+ orders per day — same product, same price.",
  },
  {
    term: "On-Page SEO",
    definition:
      "On-page SEO is everything you control directly on a page: titles, headings, content, images, internal links, schema, page speed, and user experience.",
    why: "It's the fastest-moving lever in ecommerce SEO. A clean on-page rebuild of your top 20 products can lift organic revenue 30–80% in under 90 days.",
    example:
      "Adding FAQ schema, sizing guides, customer reviews, and internal links to a single PDP can move it from page 3 to page 1 within a month.",
  },
  {
    term: "Off-Page SEO",
    definition:
      "Off-page SEO is everything that happens outside your store to build authority: backlinks, brand mentions, PR, influencer features, reviews, and social signals.",
    why: "Google trusts brands the internet talks about. Strong off-page SEO is the moat that makes your rankings durable — and stops cheaper competitors from copying you.",
    example:
      "Two Shopify stores selling the same supplement: the one featured on Healthline, Reddit, and 5 niche blogs ranks #1. The other ranks #14.",
  },
  {
    term: "Schema Markup",
    definition:
      "Schema markup is structured code added to your pages that helps Google understand your content — products, prices, reviews, FAQs, breadcrumbs, and more.",
    why: "It unlocks rich results: star ratings, price, stock status, and FAQs directly in the SERP. These rich snippets can lift CTR by 30–80% with zero ranking change.",
    example:
      "A product page with Product + Review + FAQ schema shows ⭐ 4.8 (212 reviews), £49, In stock — and steals clicks from the position above it.",
  },
];

const faqs = terms.map((t) => ({
  q: `What is ${t.term} in SEO?`,
  a: `${t.definition} ${t.why}`,
}));

export const Route = createFileRoute("/glossary")({
  head: () => ({
    meta: [
      { title: "Ecommerce Glossary UK — Shopify, SEO, CRO & PPC Terms | BeingEcom" },
      {
        name: "description",
        content:
          "A plain-English UK ecommerce glossary. Definitions for Shopify, SEO, CRO, PPC, email and analytics terms — written for founders and marketers.",
      },
      { property: "og:title", content: "Ecommerce Glossary UK — Shopify, SEO, CRO & PPC Terms | BeingEcom" },
      {
        property: "og:description",
        content:
          "A plain-English UK ecommerce glossary. Definitions for Shopify, SEO, CRO, PPC, email and analytics terms — written for founders and marketers.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `${SITE_URL}/glossary` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/glossary` }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(faqs, "/glossary")) },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "SEO Glossary", path: "/glossary" },
          ])
        ),
      },
    ],
  }),
  component: GlossaryPage,
});

function GlossaryPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-background text-foreground">
        <div className="relative mx-auto max-w-5xl px-5 lg:px-8 pt-28 pb-20 lg:pt-36 lg:pb-28 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <BookOpen className="w-3.5 h-3.5 text-primary" />
            SEO Glossary · Updated for 2026
          </div>
          <h1 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            The Ecommerce SEO Glossary
          </h1>
          <p className="mt-5 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            15 essential SEO terms every Shopify & WooCommerce founder must know — explained
            simply, with real ecommerce examples that drive traffic, rankings, and revenue.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/audit"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Free SEO Audit <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/services/seo"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:border-primary transition-colors"
            >
              Our SEO Service
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Index */}
      <section className="border-b bg-muted/30">
        <div className="mx-auto max-w-5xl px-5 lg:px-8 py-8">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Jump to a term
          </div>
          <div className="flex flex-wrap gap-2">
            {terms.map((t) => (
              <a
                key={t.term}
                href={`#${slug(t.term)}`}
                className="rounded-full border bg-background px-3 py-1.5 text-xs font-medium text-foreground/80 hover:border-primary hover:text-primary transition-colors"
              >
                {t.term}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Terms */}
      <section className="mx-auto max-w-3xl px-5 lg:px-8 py-16 lg:py-24">
        <ol className="space-y-12">
          {terms.map((t, i) => (
            <li
              key={t.term}
              id={slug(t.term)}
              className="scroll-mt-24 group rounded-2xl border bg-card p-7 lg:p-9 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary text-sm font-bold tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display text-2xl lg:text-3xl font-bold tracking-tight">
                  {t.term}
                </h2>
              </div>

              <div className="space-y-5 text-[15px] lg:text-base leading-relaxed">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-primary mb-1.5">
                    Simple Definition
                  </div>
                  <p className="text-foreground/85">{t.definition}</p>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-primary mb-1.5">
                    Why It Matters
                  </div>
                  <p className="text-foreground/85">{t.why}</p>
                </div>
                <div className="rounded-xl bg-muted/50 border border-border/60 p-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Ecommerce Example
                  </div>
                  <p className="text-foreground/80 italic">{t.example}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        {/* Closing CTA */}
        <div className="mt-20 rounded-3xl border border-border bg-card text-foreground p-10 lg:p-14 text-center">
          <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-tight">
            Ready to turn SEO into real revenue?
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Get a free 12-point ecommerce SEO audit of your Shopify or WooCommerce store — built by
            senior operators, not junior analysts.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/audit"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Get Free Audit <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground hover:border-primary transition-colors"
            >
              Book a Strategy Call
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

function slug(s: string) {
  return s
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
