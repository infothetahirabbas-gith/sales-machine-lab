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
