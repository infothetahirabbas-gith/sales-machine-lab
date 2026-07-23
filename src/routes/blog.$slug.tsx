import { type ReactElement } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import PageLayout from "../components/site/PageLayout";
import { Section, CTA } from "../components/site/Section";
import FaqSection from "../components/site/FaqSection";
import ClusterNav, { buildTitlesMap } from "../components/site/ClusterNav";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  SITE_URL,
  ORG_INFO,
  type FAQ,
} from "../lib/seo";

type Post = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  ogImage?: string;
  datePublished: string;
  dateModified: string;
  readMins: number;
  category: string;
  primaryKeyword: string;
  about: string;
  faqs: FAQ[];
};

const POSTS: Record<string, Post> = {
  "shopify-plus-migration-uk": {
    slug: "shopify-plus-migration-uk",
    title: "Shopify Plus migration for UK brands: WooCommerce to Shopify Plus without losing rankings",
    metaTitle: "Shopify Plus Migration UK - WooCommerce to Shopify Plus | BeingEcom",
    description:
      "A UK-specific Shopify Plus migration guide - when to move from WooCommerce, VAT and Markets setup, 301 redirect strategy, and a technical checklist that protects SEO and revenue.",
    datePublished: "2026-07-08",
    dateModified: "2026-07-08",
    readMins: 12,
    category: "Ecommerce strategy",
    primaryKeyword: "shopify plus migration uk",
    about: "Shopify Plus migration for UK WooCommerce ecommerce brands",
    faqs: [
      {
        q: "When does it make sense for a UK brand to move from WooCommerce to Shopify Plus?",
        a: "Usually at £2-5M/year revenue, 5,000+ SKUs, or when your team is spending more time on WooCommerce maintenance (hosting, plugin conflicts, security patches, checkout bugs) than on marketing. Shopify Plus makes sense earlier if you're running B2B and DTC on one backend, need Shopify Markets for international selling, or want the highest-converting hosted checkout on the market. Below £1M/year, staying on WooCommerce is usually the cheaper decision.",
      },
      {
        q: "How do you migrate a WooCommerce store to Shopify Plus without losing SEO rankings?",
        a: "Three things matter: preserve every URL with a 301 redirect map (old /product/slug → new /products/slug), keep meta titles, descriptions and H1s identical on launch day, and don't change your primary product-URL slug pattern. Use Cart2Cart or LitExtension for product, customer and order data. Rebuild internal linking before launch, not after. Expect a 4-8 week ranking dip while Google re-crawls, then recovery to pre-migration levels or higher if technical SEO improved.",
      },
      {
        q: "How does Shopify Plus handle UK VAT and international selling versus WooCommerce?",
        a: "Shopify Plus with Shopify Markets handles UK VAT natively (VAT-inclusive pricing, digital-goods rules, EU OSS reporting), plus country-specific pricing, duties and taxes at checkout, and currency conversion. WooCommerce reaches parity with WooCommerce Tax, EU VAT Compliance Assistant, and Aelia Currency Switcher, but each is a plugin to maintain. For UK-to-EU or UK-to-US expansion, Shopify Markets collapses a multi-week integration into a settings screen.",
      },
      {
        q: "What does a Shopify Plus migration cost for a UK brand?",
        a: "Typical range: £8,000-£25,000 for a store under 5,000 SKUs, depending on custom Liquid, app rebuilds, third-party integrations (ERP, 3PL, subscription apps), and design work. Shopify Plus itself starts at $2,300/month (roughly £1,800/month) plus payment processing. Total year-one investment usually £30,000-£60,000 including platform fees, migration, and app stack. Payback typically 6-12 months from conversion-rate lift and reduced maintenance overhead.",
      },
      {
        q: "How long does a WooCommerce to Shopify Plus migration take?",
        a: "Realistic timeline: 6-12 weeks end-to-end for a store with under 5,000 SKUs, standard checkout, and a UK-only market. Weeks 1-2: discovery, URL mapping, theme scoping. Weeks 3-6: theme build, data migration, app integration. Weeks 7-9: QA, staging tests, 301 redirect implementation. Weeks 10-12: launch, monitoring, ranking recovery. B2B stores, multi-region stores, or heavy custom-logic sites (subscriptions with edge cases, wholesale portals) can extend to 4-6 months.",
      },
      {
        q: "Will I lose customer accounts and order history when migrating to Shopify Plus?",
        a: "No - Cart2Cart and LitExtension migrate customer records, order history and product data cleanly. Customers keep their email and address book. Passwords do not transfer (Shopify uses different hashing) so customers set a new password on first login - send a proactive email 48 hours before launch explaining this. Subscription customers need special handling: migrate to Recharge or Bold Subscriptions before switching platforms, not after.",
      },
    ],
  },
  "shopify-vs-woocommerce-uk": {
    slug: "shopify-vs-woocommerce-uk",
    title: "Shopify vs WooCommerce UK 2026: honest comparison for growing DTC brands",
    metaTitle: "Shopify vs WooCommerce UK 2026 - Which Wins? | BeingEcom",
    description:
      "Shopify or WooCommerce for a UK ecommerce brand in 2026? Real total cost of ownership, SEO, checkout, VAT and scaling limits - decided by revenue stage, not marketing copy.",
    datePublished: "2026-07-07",
    dateModified: "2026-07-07",
    readMins: 14,
    category: "Ecommerce strategy",
    primaryKeyword: "shopify vs woocommerce uk",
    about: "Ecommerce platform selection for UK Shopify and WooCommerce brands",
    faqs: [
      {
        q: "Is Shopify or WooCommerce better for SEO in the UK?",
        a: "Neither wins on default SEO - both can rank on Google UK. WooCommerce gives you full control over URLs, schema, redirects and Core Web Vitals; Shopify is faster to launch and has cleaner defaults but limits URL structure (/products/, /collections/) and needs apps for advanced schema. For most UK DTC brands under £5M/year, Shopify plus a proper SEO setup wins on time-to-rank. Above £5M, WooCommerce or Shopify Plus with headless (Hydrogen) tends to scale better.",
      },
      {
        q: "What is the real monthly cost of Shopify vs WooCommerce in the UK?",
        a: "Shopify Basic starts at £19/month, Shopify at £49/month and Advanced at £259/month, plus 2% transaction fees if you don't use Shopify Payments, plus apps (typically £150-£400/month). WooCommerce itself is free, but a realistic UK setup costs £30-£80/month for hosting, £60-£120/year for a premium theme, £300-£800/year for essential plugins (Stripe, Klaviyo, backups, security), plus developer time. In practice, total cost of ownership is very similar; WooCommerce shifts the cost from software licences to developer hours.",
      },
      {
        q: "Which platform handles UK VAT and international selling better?",
        a: "Shopify handles UK VAT natively - VAT-inclusive pricing, digital-goods VAT rules, EU OSS reporting and Shopify Markets for country-specific pricing all work out of the box. WooCommerce needs plugins (WooCommerce Tax, EU VAT Compliance Assistant, Aelia Currency Switcher) to reach parity. For UK-only brands both are fine; for UK-to-EU or UK-to-US expansion Shopify Markets is materially less friction.",
      },
      {
        q: "Can I migrate from Shopify to WooCommerce later - or vice versa?",
        a: "Yes, both directions are common. Product data, customer records and order history migrate cleanly with tools like Cart2Cart or LitExtension. The hard part is preserving SEO - 301 redirect every old URL to the new one, keep meta titles/descriptions, and don't change your product-URL slug patterns. Budget 2-4 weeks for a clean migration on a store with under 5,000 SKUs and expect a 4-8 week ranking recovery window.",
      },
      {
        q: "Which platform is faster on Core Web Vitals?",
        a: "Shopify's default Dawn theme scores 90+ on Lighthouse mobile out of the box because it ships as a CDN-hosted, image-optimised, minimal-JavaScript build. WooCommerce depends on your hosting, theme and plugins - a well-built WooCommerce store on a managed host (Kinsta, WP Engine, Rocket.net) with a lean theme (Blocksy, GeneratePress) can match or beat Shopify, but a bloated Elementor build with 15 plugins will not. Speed is a hosting and discipline problem on WooCommerce; it is a defaults problem solved for you on Shopify.",
      },
      {
        q: "Which platform should I choose for a brand-new UK store in 2026?",
        a: "Choose Shopify unless you have a specific reason not to. You'll ship faster, spend less on maintenance, and get to focus on marketing rather than infrastructure. Choose WooCommerce if you already run WordPress, need deep customisation (subscriptions with complex logic, B2B pricing tiers, membership sites, wholesale portals), or specifically want to own your stack. Revenue stage matters more than platform: under £50K/month, platform choice will not decide whether you win.",
      },
    ],
  },
  "uk-ecommerce-seo-playbook-shopify": {
    slug: "uk-ecommerce-seo-playbook-shopify",
    title: "The UK ecommerce SEO playbook for Shopify (2026)",
    metaTitle: "UK Ecommerce SEO Playbook for Shopify (2026) | BeingEcom",
    description:
      "The complete UK Shopify SEO playbook: technical, on-page, content and local. What actually moves organic revenue for £1M-£15M UK DTC stores.",
    datePublished: "2026-07-23",
    dateModified: "2026-07-23",
    readMins: 18,
    category: "Ecommerce SEO",
    primaryKeyword: "uk ecommerce seo shopify",
    about: "Ecommerce SEO for UK Shopify stores",
    faqs: [
      { q: "How long does Shopify SEO take to work in the UK?", a: "A well-executed UK Shopify SEO programme usually shows meaningful movement on non-brand keywords in 90-120 days and material revenue lift by month 6. Stores with existing authority (aged domain, backlinks, GBP presence) can see wins in 30-60 days; fresh domains take 6-9 months to break through on competitive commercial terms." },
      { q: "What is the single biggest Shopify SEO issue for UK brands?", a: "Duplicate content from collection filters, tags and vendor URLs. Every Shopify store ships with dozens of near-identical URLs Google shouldn't index. Fixing canonicals, blocking faceted parameters and consolidating collection variants is usually the highest-ROI first move." },
      { q: "Do I need Shopify Plus for good SEO?", a: "No. Shopify Basic through Advanced rank identically. Plus adds control (checkout customisation, higher API limits, Shopify Markets) that helps at £2M+ revenue, but it doesn't unlock SEO features the lower tiers lack." },
      { q: "Should UK ecommerce brands invest in SEO or paid ads first?", a: "Both, in parallel, at different intensities. Paid buys immediate revenue; SEO compounds. A £30K/month UK brand should typically spend 70% paid / 30% SEO in year one, then rebalance toward SEO as organic starts contributing." },
    ],
  },
  "shopify-duplicate-content-faceted-urls": {
    slug: "shopify-duplicate-content-faceted-urls",
    title: "How to fix Shopify duplicate content and faceted URLs",
    metaTitle: "Fix Shopify Duplicate Content & Faceted URLs (UK Guide) | BeingEcom",
    description:
      "Collection filters, tags and vendor URLs quietly duplicate your Shopify store. Here's the canonical, robots and metafield fix that recovers wasted crawl budget.",
    datePublished: "2026-07-23",
    dateModified: "2026-07-23",
    readMins: 10,
    category: "Ecommerce SEO",
    primaryKeyword: "shopify duplicate content",
    about: "Shopify duplicate content and faceted URL SEO",
    faqs: [
      { q: "Does Shopify handle duplicate content automatically?", a: "Partially. Shopify auto-canonicals /products/x when accessed via a collection (/collections/y/products/x) back to /products/x. It does NOT handle faceted filters (?filter.p.vendor=), tag URLs, or search URLs - those need robots.txt or noindex intervention." },
      { q: "Should I noindex or block Shopify tag pages?", a: "Almost always yes. Tag pages (/collections/all/tag-name) create thin, near-duplicate collection variants that dilute crawl budget. Add a noindex meta via theme conditional on tag URLs, or Disallow the pattern in robots.txt.txt.liquid." },
      { q: "How do I stop Google indexing Shopify filter URLs?", a: "Add `Disallow: /*?*filter.` to robots.txt.liquid and ensure your theme sets rel='canonical' on filtered collection pages back to the unfiltered collection. Shopify's default Dawn theme does this correctly; older themes often don't." },
    ],
  },
  "shopify-product-page-seo-uk": {
    slug: "shopify-product-page-seo-uk",
    title: "Product page SEO for UK Shopify stores",
    metaTitle: "Shopify Product Page SEO for UK Stores | BeingEcom",
    description:
      "The PDP template that ranks and converts for UK Shopify brands - copy structure, schema, reviews, UK signals and internal linking.",
    datePublished: "2026-07-23",
    dateModified: "2026-07-23",
    readMins: 11,
    category: "Ecommerce SEO",
    primaryKeyword: "shopify product page seo",
    about: "Shopify product page SEO for UK ecommerce",
    faqs: [
      { q: "How much copy should a Shopify product page have for SEO?", a: "300-600 words of unique, useful copy per product minimum. Below 150 words Google treats the page as thin; above 800 you're usually padding. Structure: 60-word above-the-fold hook, then 3-5 short sections covering benefits, materials/spec, sizing/fit, care, and shipping." },
      { q: "Do product reviews help Shopify SEO?", a: "Yes, on two levels. Review schema (AggregateRating) earns star snippets in the SERP that lift CTR by 20-35%. And review text adds unique long-tail content Google indexes. Judge.me and Yotpo both output valid Product + Review schema by default on Shopify." },
      { q: "What UK-specific signals should Shopify product pages include?", a: "GBP pricing with VAT-inclusive display, UK shipping/returns copy on the PDP (not just the footer), UK delivery estimate, and GB priceCurrency in schema. If you have a UK warehouse, mention the fulfilment city - it earns local relevance and improves conversion." },
    ],
  },
  "shopify-collection-page-seo": {
    slug: "shopify-collection-page-seo",
    title: "Collection page SEO: templates that rank",
    metaTitle: "Shopify Collection Page SEO Templates That Rank | BeingEcom",
    description:
      "Why Shopify collection pages under-rank and the on-page template that fixes it - intro copy, faceted-nav strategy, schema and internal linking.",
    datePublished: "2026-07-23",
    dateModified: "2026-07-23",
    readMins: 10,
    category: "Ecommerce SEO",
    primaryKeyword: "shopify collection page seo",
    about: "Shopify collection page SEO templates",
    faqs: [
      { q: "Why don't Shopify collection pages rank by default?", a: "Because they ship as a grid of product cards with zero unique copy, no schema and identical H1s. Google treats them as thin category pages competing against Amazon and John Lewis - which have thousands of internal links and reviews. Adding 200-400 words of unique intro copy, ItemList schema and internal links from adjacent collections is what closes the gap." },
      { q: "Where should collection page copy sit - above or below the products?", a: "80 words above the grid, 300-500 words below. Above-the-fold copy answers 'what is this collection?' fast; below-the-fold copy carries the SEO weight without pushing products down. Never bury 100% of the copy below the fold - Google is skeptical of content it can't render above 3,000px scroll depth." },
      { q: "Should I create a collection for every keyword variation?", a: "No. Collections should map to real buyer intent clusters, not keyword permutations. 'Men's black running shoes' and 'men's black trainers' are the same collection with a title/H1 optimised for the higher-volume term. Split only when the products themselves differ." },
    ],
  },
  "shopify-plus-technical-seo-checklist": {
    slug: "shopify-plus-technical-seo-checklist",
    title: "Technical SEO checklist for Shopify Plus",
    metaTitle: "Shopify Plus Technical SEO Checklist (UK) | BeingEcom",
    description:
      "Crawl budget, canonicals, hreflang, Core Web Vitals, JSON-LD and international - the technical SEO checklist we run on every Shopify Plus audit.",
    datePublished: "2026-07-23",
    dateModified: "2026-07-23",
    readMins: 12,
    category: "Ecommerce SEO",
    primaryKeyword: "shopify plus technical seo",
    about: "Technical SEO for Shopify Plus stores",
    faqs: [
      { q: "What's different about Shopify Plus technical SEO?", a: "Plus stores usually run Shopify Markets (multi-region), have higher SKU counts (crawl budget matters), and use custom Liquid or headless (Hydrogen) that breaks default schema output. The checklist covers hreflang, market-specific canonicals, sitemap segmentation and Core Web Vitals on custom themes - none of which are concerns on a small Basic store." },
      { q: "Does Shopify Markets set hreflang automatically?", a: "Yes, Shopify Markets emits hreflang tags for every active market and language pair. Verify with Screaming Frog: every URL should list x-default plus every market. Broken hreflang is the #1 issue we find on Plus stores using country-specific domains or subfolders." },
      { q: "How do I improve Core Web Vitals on Shopify Plus?", a: "Biggest wins in order: lazy-load below-the-fold images, preload the hero image with rel='preload', ship next-gen formats (Shopify serves WebP by default - confirm), and audit third-party apps. One heavy app (interactive review widgets, unnecessary chat scripts) can add 800ms to LCP." },
    ],
  },
  "local-seo-multi-location-uk-ecommerce": {
    slug: "local-seo-multi-location-uk-ecommerce",
    title: "Local SEO for multi-location UK ecommerce brands",
    metaTitle: "Local SEO for Multi-Location UK Ecommerce Brands | BeingEcom",
    description:
      "How UK ecommerce brands with showrooms, pickup points or regional fulfilment rank in local packs - GBP, schema, city pages and review strategy.",
    datePublished: "2026-07-23",
    dateModified: "2026-07-23",
    readMins: 11,
    category: "Ecommerce SEO",
    primaryKeyword: "local seo uk ecommerce",
    about: "Local SEO for multi-location UK ecommerce",
    faqs: [
      { q: "Does an ecommerce store need Google Business Profile?", a: "Only if you have a physical presence - showroom, warehouse pickup, or a staffed office customers can visit. GBP without a real physical premises violates Google's guidelines and gets suspended. Pure DTC brands should invest in national organic SEO instead." },
      { q: "Should I build a city page for every UK town?", a: "No. Build city pages only where you have a genuine signal to write about - a showroom, a fulfilment centre, a regional installation partner, or a documented pattern of customers from that city. Fifty thin 'we serve London/Manchester/Leeds' pages will earn no rankings and may trigger a doorway-page penalty." },
      { q: "How many GBP reviews do I need to rank in the local pack?", a: "In competitive UK cities, top-3 local pack positions usually require 50+ reviews and a 4.5+ average. In smaller towns 15-25 well-managed reviews can rank you. Volume alone doesn't work - review recency and response rate are both ranking factors in the local algorithm." },
    ],
  },
};

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = POSTS[params.slug];
    if (!post) throw notFound();
    return { post };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Article not found - BeingEcom" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const post = loaderData.post;
    const url = `${SITE_URL}/blog/${params.slug}`;
    return {
      meta: [
        { title: post.metaTitle },
        { name: "description", content: post.description },
        { name: "author", content: ORG_INFO.name },
        { property: "article:published_time", content: post.datePublished },
        { property: "article:modified_time", content: post.dateModified },
        { property: "og:title", content: post.metaTitle },
        { property: "og:description", content: post.description },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        ...(post.ogImage
          ? [
              { property: "og:image", content: post.ogImage },
              { name: "twitter:image", content: post.ogImage },
              { name: "twitter:card", content: "summary_large_image" },
            ]
          : []),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            articleJsonLd({
              url,
              headline: post.title,
              description: post.description,
              image: post.ogImage,
              datePublished: post.datePublished,
              about: post.about,
            }),
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
              { name: post.title, path: `/blog/${params.slug}` },
            ]),
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(faqJsonLd(post.faqs, `/blog/${params.slug}`)),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <PageLayout>
      <Section title="Article not found">
        <p className="text-center text-muted-foreground">
          The article you're looking for doesn't exist.{" "}
          <Link to="/blog" className="text-primary underline">
            Back to the blog
          </Link>
          .
        </p>
      </Section>
    </PageLayout>
  ),
  errorComponent: () => (
    <PageLayout>
      <Section title="Something went wrong">
        <p className="text-center text-muted-foreground">
          Please{" "}
          <Link to="/blog" className="text-primary underline">
            return to the blog
          </Link>{" "}
          and try again.
        </p>
      </Section>
    </PageLayout>
  ),
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  const Body = ARTICLES[post.slug];
  return (
    <PageLayout>
      <article>
        <h1 className="sr-only">{post.title}</h1>
        <Section
          eyebrow={`${post.category} · ${post.readMins} min read`}
          title={post.title}
          intro={post.description}
        >
          <div className="mx-auto max-w-3xl text-sm text-muted-foreground text-center">
            <span>Published {formatDate(post.datePublished)}</span>
            <span className="mx-2">·</span>
            <span>By the BeingEcom team</span>
          </div>
        </Section>

        <section className="pb-16 lg:pb-24">
          <div className="mx-auto max-w-3xl px-5 lg:px-8 prose-article">
            <ClusterNav currentSlug={post.slug} titles={buildTitlesMap(POSTS)} />
            {Body ? <Body /> : null}
          </div>
        </section>


        <FaqSection faqs={post.faqs} title="Frequently asked questions" />
      </article>
      <CTA
        heading="Not sure which platform fits your brand?"
        sub="Book a free 30-minute call. We'll look at your revenue stage, catalogue and roadmap, and give you a straight answer."
      />
    </PageLayout>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const ARTICLES: Record<string, () => ReactElement> = {
  "shopify-plus-migration-uk": ShopifyPlusMigrationUK,
  "shopify-vs-woocommerce-uk": ShopifyVsWooCommerceUK,
  "uk-ecommerce-seo-playbook-shopify": UkEcommerceSeoPlaybookShopify,
  "shopify-duplicate-content-faceted-urls": ShopifyDuplicateContentFacetedUrls,
  "shopify-product-page-seo-uk": ShopifyProductPageSeoUk,
  "shopify-collection-page-seo": ShopifyCollectionPageSeo,
  "shopify-plus-technical-seo-checklist": ShopifyPlusTechnicalSeoChecklist,
  "local-seo-multi-location-uk-ecommerce": LocalSeoMultiLocationUkEcommerce,
};

function ShopifyPlusMigrationUK() {
  return (
    <>
      <h2 id="tldr">Short answer first</h2>
      <p>
        If your UK ecommerce brand is between <strong>£2M and £15M/year</strong>, running
        WooCommerce, and spending more team hours on hosting, plugin conflicts and
        checkout bugs than on marketing - <strong>it's time to migrate to Shopify
        Plus</strong>. If you're under £1M and Woo is stable, stay put.
      </p>
      <p>
        Below is the UK-specific migration playbook: the business case, VAT and
        Shopify Markets setup, the 301 redirect strategy that protects your Google
        rankings, and a technical checklist for going live without losing revenue.
      </p>

      <h2 id="key-takeaways">Key takeaways</h2>
      <ul>
        <li><strong>Trigger point:</strong> £2-5M/year revenue, 5,000+ SKUs, or maintenance eating more than 15% of team time.</li>
        <li><strong>Budget:</strong> £8K-£25K migration + ~£1,800/month Shopify Plus + apps.</li>
        <li><strong>Timeline:</strong> 6-12 weeks for a standard UK-only store; 4-6 months for multi-region or B2B.</li>
        <li><strong>SEO risk:</strong> real but manageable - 4-8 week dip, then recovery to pre-migration levels if you do the redirect map properly.</li>
        <li><strong>Biggest UK-specific wins:</strong> Shopify Markets for EU/US expansion, native VAT handling, Shop Pay conversion lift.</li>
      </ul>

      <h2 id="business-case">1. The business case: when Shopify Plus actually pays back</h2>
      <p>
        Don't migrate because Shopify Plus sounds more premium. Migrate when the numbers
        make sense. Payback usually comes from three sources:
      </p>
      <ul>
        <li><strong>Conversion rate lift:</strong> Shopify's checkout plus Shop Pay typically adds 8-18% to store conversion versus WooCommerce's default checkout, based on our UK migration data.</li>
        <li><strong>Reduced maintenance:</strong> teams save 10-25 hours/month on hosting, plugin updates, security patching and checkout bug-fixing.</li>
        <li><strong>Faster iteration:</strong> merchandising, campaigns, landing pages and international expansion ship in days instead of weeks.</li>
      </ul>
      <p>
        For a £3M/year brand at a 2.4% conversion rate, a 12% relative conversion lift
        is roughly <strong>£360,000 in additional annual revenue</strong>. That pays for
        the migration and 18 months of Shopify Plus fees in year one.
      </p>

      <h2 id="cost">2. Real UK cost of a Shopify Plus migration</h2>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Line item</th>
              <th>Typical UK range</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Shopify Plus platform</td><td>~£1,800 / month (from $2,300)</td></tr>
            <tr><td>Migration (theme, data, apps, redirects)</td><td>£8,000 - £25,000 one-off</td></tr>
            <tr><td>App stack (Klaviyo, Judge.me, Rebuy, Gorgias, etc.)</td><td>£400 - £1,200 / month</td></tr>
            <tr><td>Custom Liquid / integrations (ERP, 3PL, subscriptions)</td><td>£3,000 - £15,000 one-off</td></tr>
            <tr><td>Payment processing (Shopify Payments UK)</td><td>1.5% - 2.4% + 20p</td></tr>
            <tr><td><strong>Year 1 total (typical)</strong></td><td><strong>£30,000 - £60,000</strong></td></tr>
          </tbody>
        </table>
      </div>

      <h2 id="seo-migration">3. The SEO migration plan - protect your rankings</h2>
      <p>
        This is where most migrations fail. UK brands lose 30-70% of organic traffic
        when they skip the redirect work. Here's the sequence that protects rankings:
      </p>
      <ol>
        <li><strong>Crawl the old site</strong> with Screaming Frog. Export every indexed URL, title, description, H1 and canonical.</li>
        <li><strong>Build the redirect map</strong> before touching the new store. Every old URL needs a 301 to its closest match on Shopify - usually <code>/product/slug</code> → <code>/products/slug</code> and <code>/product-category/x</code> → <code>/collections/x</code>.</li>
        <li><strong>Preserve on-page SEO:</strong> keep meta titles, descriptions and H1s identical on launch day. Rewrite later, not now.</li>
        <li><strong>Rebuild internal linking</strong> before launch, not after. Collections should link to related collections, PDPs to related PDPs.</li>
        <li><strong>Keep the URL slug pattern.</strong> If your old product URLs were <code>/product/blue-hoodie</code>, the new ones should be <code>/products/blue-hoodie</code> - not <code>/products/blue-hoodie-v2</code>.</li>
        <li><strong>Submit a new XML sitemap</strong> to Google Search Console on day one. Keep the old sitemap accessible for two weeks so Google can crawl the redirects.</li>
      </ol>
      <p>
        Expect a <strong>4-8 week ranking dip</strong> as Google re-crawls and processes
        the redirects. Traffic recovers to pre-migration levels - often higher - because
        Shopify's Core Web Vitals scores are usually better than a plugin-heavy Woo
        stack.
      </p>

      <h2 id="vat-markets">4. UK VAT and Shopify Markets setup</h2>
      <p>
        This is where Shopify Plus quietly beats WooCommerce for UK brands. Native
        handling of:
      </p>
      <ul>
        <li>VAT-inclusive pricing (required for UK B2C display)</li>
        <li>Digital goods VAT rules</li>
        <li>EU OSS reporting for post-Brexit EU sales</li>
        <li>Country-specific pricing via Shopify Markets</li>
        <li>Duties and taxes collected at checkout (no surprise fees for customers)</li>
        <li>Automatic currency conversion in 130+ currencies</li>
      </ul>
      <p>
        Setup checklist for a UK brand: enable Shopify Payments UK, set your primary
        market to United Kingdom with GBP and VAT-inclusive display, add EU as a
        secondary market with EUR and OSS enabled, and add US as a third market with
        USD and duties-at-checkout for orders over £135.
      </p>

      <h2 id="checkout">5. Checkout, Shop Pay and abandoned cart</h2>
      <p>
        Shopify's hosted checkout is the highest-converting on the market. Shop Pay
        one-tap-returning-customer sessions convert around <strong>1.7x higher than
        guest checkout</strong> in our UK client data. Migrating from a Woo +
        WooCommerce Payments setup to Shopify Payments + Shop Pay is usually the
        single biggest conversion lift.
      </p>
      <p>
        Rebuild abandoned cart flows in Klaviyo before launch - don't wait. Match the
        old flow's timing and offer, then optimise post-launch.
      </p>

      <h2 id="data">6. Data migration: products, customers, orders, subscriptions</h2>
      <p>
        Use <strong>Cart2Cart</strong> or <strong>LitExtension</strong> to move product
        catalogue, customer records and order history. Both cost £300-£1,500 depending
        on data volume.
      </p>
      <ul>
        <li><strong>Products:</strong> maps cleanly. Watch for custom Woo product attributes - they need to become Shopify metafields or variants.</li>
        <li><strong>Customers:</strong> emails and address books transfer. Passwords don't (different hashing). Send a proactive email 48 hours before launch explaining the one-time password reset.</li>
        <li><strong>Orders:</strong> full order history transfers with line items and totals. Historical order status stays intact.</li>
        <li><strong>Subscriptions:</strong> the hard one. Migrate to Recharge or Bold Subscriptions <em>before</em> switching platforms, not after. Failed migrations here churn subscribers immediately.</li>
        <li><strong>Reviews:</strong> export from Woo Reviews or Judge.me, import to Judge.me on Shopify. Preserves star ratings and review schema.</li>
      </ul>

      <h2 id="apps">7. The Shopify Plus app stack a UK DTC brand actually needs</h2>
      <p>
        Don't rebuild every Woo plugin as a Shopify app - most add cost and slow the
        store. Minimum viable stack for a £3-15M UK brand:
      </p>
      <ul>
        <li><strong>Klaviyo</strong> - email and SMS, replaces MailPoet or FluentCRM</li>
        <li><strong>Judge.me</strong> - reviews, replaces Woo Reviews</li>
        <li><strong>Rebuy or Bold Upsell</strong> - post-purchase and cart upsells</li>
        <li><strong>Gorgias</strong> - helpdesk, integrates with Shopify orders natively</li>
        <li><strong>Loox or Judge.me photo reviews</strong> - UGC gallery</li>
        <li><strong>Recharge</strong> - only if you have subscriptions</li>
      </ul>
      <p>
        That's £400-£800/month all-in. Add tools when a specific revenue lever is
        proven, not on launch.
      </p>

      <h2 id="timeline">8. Realistic migration timeline</h2>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr><th>Weeks</th><th>What ships</th></tr>
          </thead>
          <tbody>
            <tr><td>1-2</td><td>Discovery, URL crawl and redirect map, theme scoping, app stack decisions</td></tr>
            <tr><td>3-6</td><td>Theme build on Shopify Dawn or a Plus theme, data migration to staging, app integration</td></tr>
            <tr><td>7-9</td><td>QA on staging, 301 redirect implementation, Klaviyo flows rebuilt, checkout tests, VAT tests, Markets setup</td></tr>
            <tr><td>10</td><td>Soft launch - DNS switch, password reset email to customers, sitemap submitted to Google Search Console</td></tr>
            <tr><td>11-12</td><td>Monitor 404s, refine redirects, watch Search Console for indexing signals, optimise Core Web Vitals</td></tr>
          </tbody>
        </table>
      </div>

      <h2 id="mistakes">9. The five most expensive mistakes UK brands make</h2>
      <ol>
        <li><strong>Skipping the redirect map.</strong> Cost: 30-70% of organic traffic, permanently.</li>
        <li><strong>Rewriting meta titles on launch day.</strong> Cost: unnecessary ranking volatility. Rewrite after week 8.</li>
        <li><strong>Migrating subscriptions after launch.</strong> Cost: 20-40% subscriber churn.</li>
        <li><strong>Not testing Shopify Payments UK before DNS switch.</strong> Cost: hours of missed revenue on day one.</li>
        <li><strong>Rebuilding every WooCommerce plugin as a Shopify app.</strong> Cost: £1,500+/month in unused subscriptions and a slower store.</li>
      </ol>

      <h2 id="next">Ready to move?</h2>
      <p>
        A properly planned Shopify Plus migration is one of the highest-ROI decisions
        a scaling UK ecommerce brand makes. A rushed one is one of the most expensive.
        The difference is 4 weeks of planning and a real redirect map.
      </p>
    </>
  );
}


function ShopifyVsWooCommerceUK() {
  return (
    <>
      <h2 id="tldr">Short answer first</h2>
      <p>
        For most UK direct-to-consumer brands doing under about £5M a year,{" "}
        <strong>Shopify wins</strong>. You launch faster, spend less time on infrastructure,
        and get UK VAT, Shopify Markets, Shop Pay and Core Web Vitals sorted by
        default. <strong>WooCommerce wins</strong> when you already run WordPress, need
        deep custom logic (B2B pricing, subscriptions with edge cases, membership sites,
        wholesale portals) or specifically want to own your entire stack.
      </p>
      <p>
        Below is the full comparison - total cost of ownership, SEO, checkout, VAT,
        apps, speed, security and scaling limits - decided by revenue stage, not
        marketing copy.
      </p>

      <h2 id="key-takeaways">Key takeaways</h2>
      <ul>
        <li>
          <strong>Time to launch:</strong> Shopify 1-3 weeks, WooCommerce 3-8 weeks.
        </li>
        <li>
          <strong>Total cost of ownership year 1:</strong> Shopify £2.5-£6K,
          WooCommerce £2-£8K - similar range, different composition.
        </li>
        <li>
          <strong>Default Core Web Vitals:</strong> Shopify Dawn scores 90+; WooCommerce
          depends on hosting and theme.
        </li>
        <li>
          <strong>UK VAT and international selling:</strong> Shopify Markets is
          materially less friction than WooCommerce plugins.
        </li>
        <li>
          <strong>SEO ceiling:</strong> WooCommerce has more control; Shopify is
          faster to a clean, ranking store for 95% of catalogues.
        </li>
        <li>
          <strong>When to switch to Shopify Plus or headless:</strong> £5M+ revenue,
          or 5,000+ SKUs, or B2B and DTC on one backend.
        </li>
      </ul>

      <h2 id="cost">1. Real UK cost of ownership</h2>
      <p>
        Comparison articles love to say "WooCommerce is free". It isn't - the software
        is free; running a UK ecommerce store on it is not. Here's what an honest
        year-one budget looks like for a store doing £30K-£100K a month.
      </p>

      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Cost line</th>
              <th>Shopify (Basic → Advanced)</th>
              <th>WooCommerce</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Platform / hosting</td>
              <td>£19 - £259 / month</td>
              <td>£30 - £80 / month (managed WP host)</td>
            </tr>
            <tr>
              <td>Theme</td>
              <td>Free (Dawn) or £150 - £300 one-off</td>
              <td>£60 - £120 / year (Blocksy, GeneratePress)</td>
            </tr>
            <tr>
              <td>Essential apps / plugins</td>
              <td>£100 - £400 / month</td>
              <td>£300 - £800 / year</td>
            </tr>
            <tr>
              <td>Payment fees (Shopify Payments / Stripe UK)</td>
              <td>1.5%-2.4% + 20p</td>
              <td>1.5% + 20p (Stripe)</td>
            </tr>
            <tr>
              <td>Transaction fees if you use a non-native gateway</td>
              <td>0.5%-2%</td>
              <td>0%</td>
            </tr>
            <tr>
              <td>Developer time (setup + 12 months of changes)</td>
              <td>£800 - £2,500</td>
              <td>£1,500 - £5,000</td>
            </tr>
            <tr>
              <td>
                <strong>Year 1 total (typical)</strong>
              </td>
              <td>
                <strong>£2,500 - £6,000</strong>
              </td>
              <td>
                <strong>£2,000 - £8,000</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        <strong>The takeaway:</strong> Shopify shifts cost from developer hours to
        software licences. WooCommerce shifts cost from software licences to developer
        hours. The total is similar; what differs is how much of your time it consumes.
      </p>

      <h2 id="seo">2. SEO: which platform actually ranks better?</h2>
      <p>
        Neither platform wins on default SEO. Both can rank on Google UK. The
        difference is control versus convenience.
      </p>
      <h3>Where Shopify limits you</h3>
      <ul>
        <li>
          <strong>URL structure is fixed:</strong> product URLs are always
          <code>/products/slug</code> and collections are <code>/collections/slug</code>.
          You can't collapse them to <code>/slug</code>. This is fine for SEO but
          rules out certain URL strategies.
        </li>
        <li>
          <strong>Duplicate collection pages:</strong> a product can live in multiple
          collections, each generating a URL. Canonicals are handled, but internal
          link equity fragments if you don't manage it.
        </li>
        <li>
          <strong>Schema markup requires apps or code edits:</strong> Dawn adds Product
          schema; Review, FAQ and HowTo schema need apps or manual work in Liquid.
        </li>
      </ul>
      <h3>Where WooCommerce gives you more control</h3>
      <ul>
        <li>Full control over URLs, redirects, and hreflang.</li>
        <li>Rank Math or Yoast handle schema, breadcrumbs and internal linking cleanly.</li>
        <li>You can build genuine content hubs alongside the shop in the same CMS.</li>
      </ul>
      <p>
        <strong>Practical verdict:</strong> for a UK DTC brand with fewer than 500 SKUs,
        Shopify plus a proper on-page setup gets you to ranking faster. For content-heavy
        strategies (guides, comparison hubs, glossaries feeding commercial pages),
        WooCommerce is materially better because WordPress is a real CMS.
      </p>

      <h2 id="checkout">3. Checkout, Shop Pay, and abandoned cart</h2>
      <p>
        This is where Shopify quietly wins for most UK brands. Shopify's checkout is
        the highest-converting hosted checkout on the market, and Shop Pay
        one-tap-returning-customer sessions convert around 1.7x higher than guest
        checkout in our client data.
      </p>
      <p>
        WooCommerce's default checkout is fine but not fast. To match Shopify you need
        Cartflows or FunnelKit, Stripe Express Checkout Element, and a well-configured
        abandoned-cart automation in Klaviyo or FluentCRM. This is achievable - it just
        requires assembly.
      </p>

      <h2 id="vat-international">4. UK VAT and international selling</h2>
      <p>
        Shopify Markets handles country-specific pricing, VAT-inclusive display, EU OSS
        reporting, duties and taxes at checkout, and currency conversion natively. For
        UK-to-EU or UK-to-US expansion this is a large advantage - it collapses a
        multi-week integration into a settings screen.
      </p>
      <p>
        WooCommerce reaches parity with plugins: WooCommerce Tax, EU VAT Compliance
        Assistant, and Aelia Currency Switcher. They work; they cost more time to
        maintain.
      </p>

      <h2 id="apps">5. Apps, plugins and the "endless tax"</h2>
      <p>
        Shopify's app store makes it easy to bolt on functionality - and easy to bloat
        your monthly bill. A common Shopify Plus stack (Klaviyo, Judge.me, Rebuy,
        Loox, Postscript, Gorgias) runs £400-£1,200 a month before you've launched a
        campaign. WooCommerce's plugin equivalents are almost always cheaper - the
        trade-off is that installing eight of them creates real performance and
        conflict risk.
      </p>

      <h2 id="speed">6. Speed and Core Web Vitals</h2>
      <p>
        Shopify's Dawn theme ships as a CDN-hosted, image-optimised, minimal-JS build
        that scores 90+ on mobile Lighthouse out of the box. Most Shopify performance
        problems come from adding apps that inject scripts into <code>theme.liquid</code>.
      </p>
      <p>
        A well-built WooCommerce store on a managed host (Kinsta, WP Engine,
        Rocket.net) with a lean theme (Blocksy, GeneratePress) can match Shopify.
        The same store on shared hosting with an Elementor + 15-plugin stack will not.
        Speed on WooCommerce is a discipline problem; Shopify solves it for you.
      </p>

      <h2 id="security">7. Security and PCI compliance</h2>
      <p>
        Shopify is PCI-DSS Level 1 compliant by default. Patches, backups and uptime
        are Shopify's problem. WooCommerce puts PCI, patching, backups and uptime on
        you or your host - a managed WordPress host abstracts most of it, but you
        remain responsible for keeping plugins current. For most founders this alone
        justifies Shopify.
      </p>

      <h2 id="scaling">8. Scaling limits: when to move to Shopify Plus or headless</h2>
      <p>Move up when at least two of the following apply:</p>
      <ul>
        <li>You cross £5M / year in revenue.</li>
        <li>You have more than 5,000 SKUs or complex variant logic.</li>
        <li>You need B2B pricing tiers and DTC on the same backend.</li>
        <li>You're doing over 200 orders/day and want a customised checkout.</li>
        <li>Your creative and content team want to ship faster than Liquid allows.</li>
      </ul>
      <p>
        At that point the choice becomes <strong>Shopify Plus</strong> (managed, £2K/month
        floor, custom checkout), <strong>Shopify Plus headless with Hydrogen</strong>
        (best performance ceiling, requires an engineering team), or{" "}
        <strong>WooCommerce on a serious host</strong> (if you already have the
        WordPress expertise in-house).
      </p>

      <h2 id="decision-matrix">9. Decision matrix by stage</h2>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Stage</th>
              <th>Revenue</th>
              <th>Best fit</th>
              <th>Why</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Launch</td>
              <td>£0 - £30K / month</td>
              <td>Shopify Basic</td>
              <td>Fastest time to market, lowest cognitive load.</td>
            </tr>
            <tr>
              <td>Scaling</td>
              <td>£30K - £250K / month</td>
              <td>Shopify or WooCommerce</td>
              <td>Depends on team skills and content strategy.</td>
            </tr>
            <tr>
              <td>Enterprise DTC</td>
              <td>£250K - £1M / month</td>
              <td>Shopify Plus</td>
              <td>Custom checkout, launch pads, dedicated support.</td>
            </tr>
            <tr>
              <td>Content-led / B2B hybrid</td>
              <td>Any</td>
              <td>WooCommerce or Headless Shopify + WordPress</td>
              <td>Real CMS matters more than shop features.</td>
            </tr>
            <tr>
              <td>Enterprise + custom logic</td>
              <td>£1M+ / month</td>
              <td>Shopify Plus headless (Hydrogen) or Commerce Layer</td>
              <td>Performance ceiling and custom logic without vendor lock-in.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="mistakes">10. Common mistakes when choosing</h2>
      <ol>
        <li>
          <strong>Choosing based on monthly platform fee alone.</strong> £19 vs £0 is
          irrelevant against £5K of developer time.
        </li>
        <li>
          <strong>Migrating too early.</strong> Below £30K/month, platform is almost
          never the constraint - marketing is.
        </li>
        <li>
          <strong>Over-customising on Shopify.</strong> Fighting Liquid to build B2B
          logic will cost more than moving to Plus.
        </li>
        <li>
          <strong>Under-investing in WooCommerce hosting.</strong> Shared hosting
          kills conversion at any traffic level.
        </li>
        <li>
          <strong>Ignoring redirect maps during migration.</strong> This is the single
          biggest cause of ranking drops after a replatform.
        </li>
      </ol>

      <h2 id="what-we-do">How BeingEcom decides for our clients</h2>
      <p>
        We're platform-agnostic - we operate both. Our default recommendation for a
        new UK brand under £5M is Shopify, because time-to-cash and time-to-focus are
        the real constraints. For content-led brands or teams already fluent in
        WordPress, we build on WooCommerce with Blocksy, FunnelKit and Rank Math.
        Either way, the operating system is the same: paid ads driving traffic, CRO
        squeezing every step, SEO compounding the free channel, retention
        multiplying LTV.
      </p>
      <p>
        Related reading:{" "}
        <Link to="/services/seo" className="text-primary underline">
          Ecommerce SEO
        </Link>
        ,{" "}
        <Link to="/services/cro" className="text-primary underline">
          Conversion Rate Optimisation
        </Link>
        ,{" "}
        <Link to="/services/store-development" className="text-primary underline">
          Store Development
        </Link>{" "}
        and our{" "}
        <Link to="/case-studies" className="text-primary underline">
          case studies
        </Link>
        .
      </p>
    </>
  );
}

function UkEcommerceSeoPlaybookShopify() {
  return (
    <>
      <h2 id="tldr">Short answer</h2>
      <p>
        For UK Shopify brands doing £1M-£15M/year, ranking on Google is a{" "}
        <strong>technical, on-page and content system</strong> - not a monthly blog
        quota. Fix duplicate content and faceted URLs first, then rebuild product and
        collection pages against real buyer intent, then earn editorial links. This
        guide is the entire playbook in one place, with links out to five deep dives
        for each stage.
      </p>

      <h2 id="who">Who this is for</h2>
      <ul>
        <li>UK-registered Shopify or Shopify Plus stores with £80K-£1.2M monthly revenue.</li>
        <li>Teams currently overspending on paid ads (blended MER under 3) and needing organic to compound.</li>
        <li>Brands with an aged domain, live catalogue and at least basic Klaviyo + reviews already in place.</li>
      </ul>

      <h2 id="stage-1">Stage 1 - Technical foundations</h2>
      <p>
        Nothing in stages 2-4 works if Google is wasting crawl budget on filter URLs and
        duplicate tag pages. Every Shopify SEO engagement we run starts with a technical
        audit against the same checklist:
      </p>
      <ul>
        <li>Duplicate content from <Link to="/blog/$slug" params={{ slug: "shopify-duplicate-content-faceted-urls" }} className="text-primary underline">faceted collection URLs</Link>.</li>
        <li>Canonical hygiene on filtered collections, tag pages and vendor URLs.</li>
        <li>hreflang if you sell across UK, EU and US via Shopify Markets.</li>
        <li>Core Web Vitals - LCP under 2.5s on mobile, CLS under 0.1, INP under 200ms.</li>
        <li>JSON-LD: Product, Review, Breadcrumb, Organisation at minimum.</li>
        <li>Sitemap segmentation once your catalogue passes 5,000 URLs.</li>
      </ul>
      <p>
        Full detail: <Link to="/blog/$slug" params={{ slug: "shopify-plus-technical-seo-checklist" }} className="text-primary underline">technical SEO checklist for Shopify Plus</Link>.
      </p>

      <h2 id="stage-2">Stage 2 - Product page rebuild</h2>
      <p>
        Product pages carry the highest commercial intent on your store. Most Shopify
        PDPs ship with 40 words of copy, generic H1s and no unique reason for Google to
        rank them above Amazon or a competitor. The fix isn't more copy - it's a
        structured template:
      </p>
      <ol>
        <li>60-word above-the-fold benefit hook, keyword-primary in the H1.</li>
        <li>3-5 short scannable sections: benefits, materials, sizing/fit, care, shipping.</li>
        <li>Reviews block with AggregateRating schema (Judge.me or Yotpo).</li>
        <li>UK-specific signals: GBP with VAT-inclusive pricing, UK delivery estimate, GB priceCurrency in schema.</li>
        <li>Internal links to 3-5 related products and the parent collection.</li>
      </ol>
      <p>
        Template + examples: <Link to="/blog/$slug" params={{ slug: "shopify-product-page-seo-uk" }} className="text-primary underline">product page SEO for UK Shopify stores</Link>.
      </p>

      <h2 id="stage-3">Stage 3 - Collection page architecture</h2>
      <p>
        Collections are the middle of your SEO funnel: high-volume commercial queries
        (men's black trainers, oat milk 12 pack, etc.) that convert to product-page
        clicks. Default Shopify collection pages under-rank because they're grids with
        no copy and no schema. The rebuild:
      </p>
      <ul>
        <li>80 words unique intro above the grid, 300-500 words below.</li>
        <li>ItemList JSON-LD listing every product with price and availability.</li>
        <li>Facet-nav strategy - which filters are indexable, which are noindex.</li>
        <li>Internal links from parent collection to child collections and back.</li>
      </ul>
      <p>
        Full playbook: <Link to="/blog/$slug" params={{ slug: "shopify-collection-page-seo" }} className="text-primary underline">collection page SEO: templates that rank</Link>.
      </p>

      <h2 id="stage-4">Stage 4 - Content and authority</h2>
      <p>
        Content SEO on ecommerce is not blogging. It's building comparison, best-of,
        problem-solution and buyer-guide pages that Google trusts as commercial answers
        and that link internally back to your PDPs and collections. Layer editorial
        digital PR on top - one placement in a UK title like The Independent or Wired
        UK moves domain authority more than 50 guest posts on low-trust sites.
      </p>

      <h2 id="stage-5">Stage 5 - Local and geographic signals</h2>
      <p>
        UK brands with a showroom, warehouse pickup or regional installation partner
        should build local pack visibility on top of national organic. If you're pure
        DTC with no physical premises, skip GBP and invest in national authority
        instead - fake GBPs get suspended.
      </p>
      <p>
        Detail: <Link to="/blog/$slug" params={{ slug: "local-seo-multi-location-uk-ecommerce" }} className="text-primary underline">local SEO for multi-location UK ecommerce brands</Link>.
      </p>

      <h2 id="measurement">Measurement</h2>
      <p>
        Rankings alone are a vanity metric. Wire Search Console, GA4 and Shopify orders
        into a single dashboard tracking:
      </p>
      <ul>
        <li>Organic non-brand sessions and orders week-over-week.</li>
        <li>Organic-attributed revenue and blended MER.</li>
        <li>Indexation rate (indexed URLs vs sitemap URLs) in Search Console.</li>
        <li>Top-10 keywords by revenue potential, not by search volume.</li>
      </ul>

      <h2 id="timeline">Realistic timeline</h2>
      <p>
        Meaningful movement on non-brand queries: 90-120 days. Material revenue lift:
        month 6. Compounding organic contribution above 25% of revenue: 12-18 months.
        Anyone promising month-1 rankings on a competitive UK term is either lying or
        selling brand-term traffic you already had.
      </p>

      <h2 id="next">Where to start</h2>
      <p>
        If you take one thing from this guide: audit your indexation report in Search
        Console this week. Every UK Shopify store we onboard has 30-70% of its URLs
        either 'Discovered - currently not indexed' or duplicating each other. Fixing
        that alone tends to lift non-brand organic 15-40% inside 60 days, before you
        write a single new page.
      </p>
    </>
  );
}

function ShopifyDuplicateContentFacetedUrls() {
  return (
    <>
      <h2 id="tldr">Short answer</h2>
      <p>
        Shopify auto-canonicals product URLs but leaves collection filters, tags and
        vendor URLs to duplicate themselves. Fix in three moves: block filter
        parameters in <code>robots.txt.liquid</code>, add <code>noindex</code> to tag
        pages via theme conditional, and verify the theme sets correct canonicals on
        filtered collection URLs.
      </p>

      <h2 id="what">What Shopify duplicates by default</h2>
      <ul>
        <li><strong>Filtered collections:</strong> <code>/collections/x?filter.p.vendor=y</code></li>
        <li><strong>Tag pages:</strong> <code>/collections/all/tag-name</code></li>
        <li><strong>Vendor URLs:</strong> <code>/collections/vendors?q=Brand</code></li>
        <li><strong>Search URLs:</strong> <code>/search?q=term</code></li>
        <li><strong>Pagination in some themes:</strong> <code>/collections/x?page=2</code></li>
      </ul>
      <p>
        Every one of these is a distinct URL Google can crawl and (sometimes) index. On
        a store with 500 products and 5 filters, that's thousands of near-duplicate
        pages competing with your canonical collection.
      </p>

      <h2 id="fix-1">Fix 1 - Block filter parameters in robots.txt</h2>
      <p>
        Create or edit <code>templates/robots.txt.liquid</code> and add:
      </p>
      <pre><code>{`{% for group in robots.default_groups %}
{{ group.user_agent }}
{% for rule in group.rules %}{{ rule }}
{% endfor %}
Disallow: /*?*filter.
Disallow: /*?*sort_by=
Disallow: /search
{% endfor %}`}</code></pre>
      <p>
        This tells Google not to crawl any URL containing <code>?filter.</code> or
        <code>?sort_by=</code> without breaking the URLs for users.
      </p>

      <h2 id="fix-2">Fix 2 - Noindex tag pages</h2>
      <p>
        In your theme's <code>theme.liquid</code>, add inside the <code>&lt;head&gt;</code>:
      </p>
      <pre><code>{`{% if template contains 'collection' and current_tags %}
  <meta name="robots" content="noindex, follow">
{% endif %}`}</code></pre>
      <p>
        Tag pages stay accessible and pass link equity but drop out of the index. On
        stores with 20+ tags per collection this alone can recover 10-20% of crawl
        budget.
      </p>

      <h2 id="fix-3">Fix 3 - Verify collection canonicals</h2>
      <p>
        Filtered collection URLs should <code>&lt;link rel="canonical"&gt;</code> back to
        the unfiltered collection. Shopify Dawn does this correctly. Older themes
        (pre-2022) and heavily customised themes often don't. Test with:
      </p>
      <pre><code>curl -s https://yourstore.com/collections/x?filter.p.vendor=y | grep canonical</code></pre>
      <p>
        The canonical should point to <code>/collections/x</code>, not
        <code>/collections/x?filter.p.vendor=y</code>. If it doesn't, edit
        <code>sections/main-collection.liquid</code> or your equivalent to output the
        canonical from <code>collection.url</code>.
      </p>

      <h2 id="verify">How to verify the fix worked</h2>
      <ol>
        <li>Submit an updated sitemap in Search Console.</li>
        <li>Wait 14-28 days.</li>
        <li>Check the <em>Indexed, not submitted in sitemap</em> report - it should drop.</li>
        <li>Check the <em>Excluded by 'noindex' tag</em> and <em>Blocked by robots.txt</em> counts - they should rise, matching your intentional blocks.</li>
      </ol>

      <h2 id="bonus">Bonus - handle search URLs</h2>
      <p>
        Shopify's internal search URLs (<code>/search?q=</code>) create infinite
        low-quality index entries. Blocking them via robots.txt (as above) is enough for
        most stores. If you want to be extra safe, add <code>noindex</code> to the
        search template as well.
      </p>
    </>
  );
}

function ShopifyProductPageSeoUk() {
  return (
    <>
      <h2 id="tldr">Short answer</h2>
      <p>
        A UK Shopify PDP that ranks and converts has five things: a keyword-primary
        H1, 300-600 words of unique copy in a scannable structure, review schema, GBP
        pricing with UK delivery signals, and internal links to related products. The
        template below is what we ship on every UK client PDP rebuild.
      </p>

      <h2 id="anatomy">Anatomy of a ranking Shopify PDP</h2>
      <ol>
        <li><strong>H1:</strong> product name + primary keyword modifier ("Merino Wool Base Layer - Men's UK").</li>
        <li><strong>Above the fold:</strong> 60-word benefit hook - what it does, who it's for, why it's better.</li>
        <li><strong>Body copy:</strong> 3-5 short sections (benefits, materials/spec, sizing/fit, care, shipping).</li>
        <li><strong>Reviews block:</strong> AggregateRating schema + written reviews with UGC photos.</li>
        <li><strong>UK signals:</strong> GBP price, VAT-inclusive display, UK delivery estimate on the PDP itself.</li>
        <li><strong>Internal links:</strong> 3-5 related products, parent collection link, at least one guide/blog link.</li>
      </ol>

      <h2 id="schema">The schema that earns star snippets</h2>
      <p>
        Judge.me and Yotpo both emit valid Product + AggregateRating + Review JSON-LD
        by default. If you're on a custom theme without a reviews app, add this to your
        PDP template:
      </p>
      <pre><code>{`{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "{{ product.title }}",
  "image": "{{ product.featured_image | img_url: 'master' }}",
  "description": "{{ product.description | strip_html }}",
  "sku": "{{ product.selected_or_first_available_variant.sku }}",
  "brand": { "@type": "Brand", "name": "{{ product.vendor }}" },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "GBP",
    "price": "{{ product.selected_or_first_available_variant.price | money_without_currency }}",
    "availability": "https://schema.org/InStock"
  }
}`}</code></pre>
      <p>
        Star snippets lift CTR 20-35% versus a plain result. On a PDP getting 400
        impressions/month, that's roughly 6-12 additional sessions from the same
        ranking.
      </p>

      <h2 id="uk-signals">UK-specific PDP signals</h2>
      <ul>
        <li>Show GBP pricing with 20% VAT included (required for B2C display).</li>
        <li>List UK delivery estimate on the PDP itself, not just at checkout - "Delivery to UK: 2-3 working days".</li>
        <li>Mention UK fulfilment city if you have one - "Dispatched from our Leicester warehouse".</li>
        <li>Set <code>priceCurrency: "GBP"</code> and <code>availableAtOrFrom.addressCountry: "GB"</code> in schema.</li>
        <li>Use UK English spellings in copy - "colour", "grey", "organise".</li>
      </ul>

      <h2 id="copy">Copy structure that ranks and converts</h2>
      <p>
        Google rewards useful copy; buyers reward scannable copy. The overlap is
        short paragraphs with bold-lead sentences and structured lists. A UK PDP that
        converts at 4%+ usually follows this order:
      </p>
      <ol>
        <li><strong>Hook (60 words):</strong> what it is, who it's for, primary benefit.</li>
        <li><strong>Benefits (100 words, bulleted):</strong> 4-6 concrete outcome bullets.</li>
        <li><strong>Materials or spec (80 words):</strong> factual, technical, honest.</li>
        <li><strong>Fit / sizing (60 words):</strong> if applicable, always includes a size guide link.</li>
        <li><strong>Care and shipping (80 words):</strong> UK-specific delivery and returns.</li>
        <li><strong>Reviews (below the fold):</strong> AggregateRating + top 3 reviews.</li>
      </ol>

      <h2 id="internal-links">Internal linking from PDPs</h2>
      <p>
        Every PDP should link to 3-5 related products, its parent collection and at
        least one relevant guide or blog post. This is not just SEO - internal links
        raise session depth and revenue per visitor. Use manual related-products (not
        just "customers also bought" widgets) so you control the taxonomy signals
        Google reads.
      </p>

      <h2 id="pitfalls">Common mistakes</h2>
      <ul>
        <li>Copying supplier descriptions - the fastest way to trigger duplicate content across every competitor.</li>
        <li>Hiding all copy behind a "Read more" toggle - Google still sees it, but users don't, and the page reads as thin.</li>
        <li>Using generic H1s like just the product name with no keyword modifier.</li>
        <li>No AggregateRating schema even when reviews exist on the page.</li>
        <li>Pricing shown ex-VAT (illegal for UK B2C).</li>
      </ul>
    </>
  );
}

function ShopifyCollectionPageSeo() {
  return (
    <>
      <h2 id="tldr">Short answer</h2>
      <p>
        Default Shopify collection pages ship as bare product grids with no copy and
        no schema. To rank them you need three things: 80 words of unique intro copy
        above the grid, 300-500 words below, and ItemList schema. Do that on your top
        30 collections first - it usually lifts collection-page sessions 40-90% inside
        90 days.
      </p>

      <h2 id="why-dont-rank">Why collections don't rank by default</h2>
      <p>
        Google treats a page with 12 product cards, an H1 and no other content as
        thin. It ranks Amazon, John Lewis or ASOS instead - all of which have
        thousands of internal links, review-rich cards, and category copy Google can
        actually parse. Closing the gap doesn't require matching Amazon; it requires
        giving Google something to rank.
      </p>

      <h2 id="template">The collection page template</h2>
      <ol>
        <li><strong>H1:</strong> match search intent, not just internal taxonomy ("Men's Black Running Shoes - UK").</li>
        <li><strong>Intro copy (80 words above grid):</strong> what's in the collection, who it's for, one differentiator.</li>
        <li><strong>Product grid:</strong> default Shopify layout is fine.</li>
        <li><strong>Body copy (300-500 words below grid):</strong> buying guide, materials context, size/fit notes, care.</li>
        <li><strong>FAQ block (3-5 questions):</strong> answers the top informational queries in the SERP.</li>
        <li><strong>Internal links:</strong> to adjacent collections, parent category, top 3 guide posts.</li>
      </ol>

      <h2 id="copy-placement">Copy placement matters</h2>
      <p>
        Some teams push all collection copy below the grid to preserve the merch view.
        This is a mistake. Google trusts above-the-fold content more heavily. The
        split is 80 words above (short, tight, keyword-primary) and 300-500 words
        below (deeper, useful, long-tail).
      </p>

      <h2 id="schema">ItemList schema</h2>
      <p>
        Add to your collection template:
      </p>
      <pre><code>{`{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {% for product in collection.products limit: 24 %}
    {
      "@type": "ListItem",
      "position": {{ forloop.index }},
      "url": "{{ shop.url }}{{ product.url }}",
      "name": "{{ product.title }}"
    }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ]
}`}</code></pre>

      <h2 id="facets">Faceted navigation strategy</h2>
      <p>
        Which filters should be indexable? Rule of thumb: if a filter combination has
        real search demand and would earn a distinct H1, index it as a dedicated
        collection. If it's just a UX filter with no demand, noindex it.
      </p>
      <ul>
        <li><strong>Index:</strong> "Men's Running Shoes", "Men's Black Running Shoes" (both real queries).</li>
        <li><strong>Noindex:</strong> "Men's Running Shoes sorted by newest".</li>
        <li><strong>Block via robots:</strong> any filter combination with no demand and infinite permutations.</li>
      </ul>

      <h2 id="internal-links">Internal linking from collections</h2>
      <p>
        Collections should link to parent categories, sibling collections and 2-3
        related guide posts. This builds topical clusters Google can trust. A "Men's
        Black Running Shoes" collection should link to "Men's Running Shoes" (parent),
        "Women's Black Running Shoes" (sibling), and "How to choose running shoes"
        (guide).
      </p>

      <h2 id="pitfalls">Common mistakes</h2>
      <ul>
        <li>Creating one collection per keyword permutation - creates duplicate content between near-identical URLs.</li>
        <li>Copy 100% below the fold - Google discounts what it doesn't see in the first viewport.</li>
        <li>No ItemList schema - misses a free rich-result opportunity.</li>
        <li>No FAQ block - misses the featured-snippet opportunity for buying queries.</li>
      </ul>
    </>
  );
}

function ShopifyPlusTechnicalSeoChecklist() {
  return (
    <>
      <h2 id="tldr">Short answer</h2>
      <p>
        Shopify Plus stores fail SEO in different ways than Basic stores. Plus adds
        multi-market complexity (hreflang, currency-specific canonicals), heavier
        catalogues (crawl budget matters), and custom Liquid or Hydrogen builds that
        break default schema. This checklist covers what actually breaks in the wild.
      </p>

      <h2 id="checklist">The checklist</h2>

      <h3>1. Indexation</h3>
      <ul>
        <li>Indexed URLs in Search Console within 10% of sitemap URLs.</li>
        <li>No spike in "Discovered - currently not indexed" over the last 90 days.</li>
        <li>Tag pages noindexed via theme conditional.</li>
        <li>Filter parameters blocked in <code>robots.txt.liquid</code>.</li>
      </ul>

      <h3>2. Canonicals</h3>
      <ul>
        <li>Filtered collection URLs canonical to the unfiltered collection.</li>
        <li>Duplicate product URLs (accessed via collection path) canonical to <code>/products/x</code>.</li>
        <li>Market-specific URLs use correct rel-alternate + hreflang, not cross-market canonicals.</li>
      </ul>

      <h3>3. hreflang (Shopify Markets)</h3>
      <ul>
        <li>Every active market emits hreflang for every language pair.</li>
        <li><code>x-default</code> present and pointing to the primary market.</li>
        <li>hreflang URLs return 200 (not 3xx or 4xx).</li>
        <li>Verify with Screaming Frog's hreflang audit before every launch.</li>
      </ul>

      <h3>4. Core Web Vitals</h3>
      <ul>
        <li>Mobile LCP under 2.5s at the 75th percentile.</li>
        <li>CLS under 0.1.</li>
        <li>INP under 200ms.</li>
        <li>Hero image preloaded with <code>&lt;link rel="preload"&gt;</code>.</li>
        <li>All below-fold images lazy-loaded.</li>
        <li>Third-party apps audited quarterly - one heavy chat or review widget can add 800ms to LCP.</li>
      </ul>

      <h3>5. Structured data</h3>
      <ul>
        <li>Product + AggregateRating + Review on every PDP.</li>
        <li>ItemList on every collection.</li>
        <li>Organisation + WebSite on the homepage.</li>
        <li>BreadcrumbList on all deep pages.</li>
        <li>Validate quarterly with Google's Rich Results Test.</li>
      </ul>

      <h3>6. Sitemaps</h3>
      <ul>
        <li>Shopify auto-generates <code>/sitemap.xml</code> - do not disable.</li>
        <li>Above 50,000 URLs, Shopify segments automatically - submit each segment in Search Console.</li>
        <li>Custom pages (case studies, blog articles served outside Shopify content) need a supplementary sitemap.</li>
      </ul>

      <h3>7. Redirects</h3>
      <ul>
        <li>All old URLs from previous rebuilds 301'd to closest match.</li>
        <li>No redirect chains longer than 1 hop.</li>
        <li>Bulk import redirects via Shopify's redirect CSV - do not build redirects one-at-a-time in Admin.</li>
      </ul>

      <h3>8. Custom themes / headless</h3>
      <ul>
        <li>If on Hydrogen or a headless build: schema does not ship by default - inject manually.</li>
        <li>Verify canonical output on every template.</li>
        <li>Verify sitemap generation - Hydrogen requires a custom route.</li>
        <li>Confirm robots.txt is served from the storefront, not the framework default.</li>
      </ul>

      <h2 id="frequency">How often to run it</h2>
      <p>
        Full checklist quarterly. Indexation and Core Web Vitals monthly. Anything
        touching a theme deploy: canonical, hreflang, schema - verify on staging
        before every release.
      </p>
    </>
  );
}

function LocalSeoMultiLocationUkEcommerce() {
  return (
    <>
      <h2 id="tldr">Short answer</h2>
      <p>
        UK ecommerce brands with showrooms, warehouse pickup or regional installers
        can rank in Google's local pack on top of national organic. The three levers:
        a Google Business Profile per physical location, LocalBusiness + Store schema
        on your city pages, and consistent NAP (name, address, phone) across your
        site and directories.
      </p>

      <h2 id="when">When local SEO makes sense</h2>
      <ul>
        <li>Physical showroom customers can visit.</li>
        <li>Staffed warehouse pickup point.</li>
        <li>Regional installation or fitting service (e.g. blinds, furniture).</li>
        <li>Wholesale trade counter.</li>
      </ul>
      <p>
        Pure DTC brands with no physical premises should not create GBPs. Fake or
        virtual-office GBPs get suspended and can damage domain trust. Invest in
        national organic authority instead.
      </p>

      <h2 id="gbp">Google Business Profile setup</h2>
      <ol>
        <li>One GBP per physical location, verified with a real postal mailer.</li>
        <li>Primary category matches actual activity ("Furniture Store", not "Ecommerce Business").</li>
        <li>Hours, phone and website filled and kept current.</li>
        <li>Weekly posts (offers, new products, events).</li>
        <li>Review response within 48 hours - both positive and negative.</li>
      </ol>

      <h2 id="city-pages">City pages that Google trusts</h2>
      <p>
        Don't spam 50 thin "we serve London/Manchester/Leeds" pages. Build a city page
        only when you have a genuine signal to write about:
      </p>
      <ul>
        <li>Physical showroom or trade counter at that address.</li>
        <li>Named local partner (installer, wholesaler, fulfilment centre).</li>
        <li>Documented pattern of orders from that catchment.</li>
      </ul>
      <p>
        Each city page should include: local address (if applicable), local phone,
        embedded map, 600-1,000 words of genuinely local content (nearby districts,
        local delivery times, local partners), LocalBusiness schema, and 2-3 real
        customer stories from that area.
      </p>

      <h2 id="schema">LocalBusiness schema</h2>
      <pre><code>{`{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Your Brand - Manchester Showroom",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1 Example Street",
    "addressLocality": "Manchester",
    "postalCode": "M1 1AA",
    "addressCountry": "GB"
  },
  "telephone": "+44 161 000 0000",
  "openingHoursSpecification": [ /* per-day */ ],
  "geo": { "@type": "GeoCoordinates", "latitude": 53.48, "longitude": -2.24 }
}`}</code></pre>

      <h2 id="reviews">Review strategy</h2>
      <p>
        In competitive UK cities (London, Manchester, Birmingham) top-3 local pack
        positions usually require 50+ Google reviews and a 4.5+ average. In smaller
        towns 15-25 well-managed reviews can rank. Volume alone doesn't work - review
        recency and response rate are both ranking factors.
      </p>
      <ul>
        <li>Automate post-purchase review requests via Klaviyo or Judge.me.</li>
        <li>Ask on delivery receipt for physical fulfilment.</li>
        <li>Respond to every review within 48 hours.</li>
        <li>Never buy reviews. Suspension risk is total.</li>
      </ul>

      <h2 id="citations">Citations and directories</h2>
      <p>
        NAP consistency across Yell, Bing Places, Apple Maps, Trustpilot business
        page, and any relevant UK trade directory. Inconsistent addresses or phone
        numbers are the most common cause of a stalled local ranking.
      </p>

      <h2 id="pitfalls">Common mistakes</h2>
      <ul>
        <li>Creating a GBP at a virtual mailbox or coworking address (suspension guaranteed).</li>
        <li>Duplicate GBP listings for the same location (rank neither).</li>
        <li>Copy-pasted city pages with only the city name changed.</li>
        <li>Ignoring GBP posts and Q&amp;A - both are active ranking signals.</li>
      </ul>
    </>
  );
}

