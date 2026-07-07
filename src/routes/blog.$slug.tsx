import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import PageLayout from "../components/site/PageLayout";
import { Section, CTA } from "../components/site/Section";
import FaqSection from "../components/site/FaqSection";
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
  "shopify-vs-woocommerce-uk": {
    slug: "shopify-vs-woocommerce-uk",
    title: "Shopify vs WooCommerce UK 2026: honest comparison for growing DTC brands",
    metaTitle: "Shopify vs WooCommerce UK 2026 — Which Wins? | BeingEcom",
    description:
      "Shopify or WooCommerce for a UK ecommerce brand in 2026? Real total cost of ownership, SEO, checkout, VAT and scaling limits — decided by revenue stage, not marketing copy.",
    datePublished: "2026-07-07",
    dateModified: "2026-07-07",
    readMins: 14,
    category: "Ecommerce strategy",
    primaryKeyword: "shopify vs woocommerce uk",
    about: "Ecommerce platform selection for UK Shopify and WooCommerce brands",
    faqs: [
      {
        q: "Is Shopify or WooCommerce better for SEO in the UK?",
        a: "Neither wins on default SEO — both can rank on Google UK. WooCommerce gives you full control over URLs, schema, redirects and Core Web Vitals; Shopify is faster to launch and has cleaner defaults but limits URL structure (/products/, /collections/) and needs apps for advanced schema. For most UK DTC brands under £5M/year, Shopify plus a proper SEO setup wins on time-to-rank. Above £5M, WooCommerce or Shopify Plus with headless (Hydrogen) tends to scale better.",
      },
      {
        q: "What is the real monthly cost of Shopify vs WooCommerce in the UK?",
        a: "Shopify Basic starts at £19/month, Shopify at £49/month and Advanced at £259/month, plus 2% transaction fees if you don't use Shopify Payments, plus apps (typically £150–£400/month). WooCommerce itself is free, but a realistic UK setup costs £30–£80/month for hosting, £60–£120/year for a premium theme, £300–£800/year for essential plugins (Stripe, Klaviyo, backups, security), plus developer time. In practice, total cost of ownership is very similar; WooCommerce shifts the cost from software licences to developer hours.",
      },
      {
        q: "Which platform handles UK VAT and international selling better?",
        a: "Shopify handles UK VAT natively — VAT-inclusive pricing, digital-goods VAT rules, EU OSS reporting and Shopify Markets for country-specific pricing all work out of the box. WooCommerce needs plugins (WooCommerce Tax, EU VAT Compliance Assistant, Aelia Currency Switcher) to reach parity. For UK-only brands both are fine; for UK-to-EU or UK-to-US expansion Shopify Markets is materially less friction.",
      },
      {
        q: "Can I migrate from Shopify to WooCommerce later — or vice versa?",
        a: "Yes, both directions are common. Product data, customer records and order history migrate cleanly with tools like Cart2Cart or LitExtension. The hard part is preserving SEO — 301 redirect every old URL to the new one, keep meta titles/descriptions, and don't change your product-URL slug patterns. Budget 2–4 weeks for a clean migration on a store with under 5,000 SKUs and expect a 4–8 week ranking recovery window.",
      },
      {
        q: "Which platform is faster on Core Web Vitals?",
        a: "Shopify's default Dawn theme scores 90+ on Lighthouse mobile out of the box because it ships as a CDN-hosted, image-optimised, minimal-JavaScript build. WooCommerce depends on your hosting, theme and plugins — a well-built WooCommerce store on a managed host (Kinsta, WP Engine, Rocket.net) with a lean theme (Blocksy, GeneratePress) can match or beat Shopify, but a bloated Elementor build with 15 plugins will not. Speed is a hosting and discipline problem on WooCommerce; it is a defaults problem solved for you on Shopify.",
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
          { title: "Article not found — BeingEcom" },
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

const ARTICLES: Record<string, () => JSX.Element> = {
  "shopify-vs-woocommerce-uk": ShopifyVsWooCommerceUK,
};

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
        Below is the full comparison — total cost of ownership, SEO, checkout, VAT,
        apps, speed, security and scaling limits — decided by revenue stage, not
        marketing copy.
      </p>

      <h2 id="key-takeaways">Key takeaways</h2>
      <ul>
        <li>
          <strong>Time to launch:</strong> Shopify 1–3 weeks, WooCommerce 3–8 weeks.
        </li>
        <li>
          <strong>Total cost of ownership year 1:</strong> Shopify £2.5–£6K,
          WooCommerce £2–£8K — similar range, different composition.
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
        Comparison articles love to say "WooCommerce is free". It isn't — the software
        is free; running a UK ecommerce store on it is not. Here's what an honest
        year-one budget looks like for a store doing £30K–£100K a month.
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
              <td>£19 – £259 / month</td>
              <td>£30 – £80 / month (managed WP host)</td>
            </tr>
            <tr>
              <td>Theme</td>
              <td>Free (Dawn) or £150 – £300 one-off</td>
              <td>£60 – £120 / year (Blocksy, GeneratePress)</td>
            </tr>
            <tr>
              <td>Essential apps / plugins</td>
              <td>£100 – £400 / month</td>
              <td>£300 – £800 / year</td>
            </tr>
            <tr>
              <td>Payment fees (Shopify Payments / Stripe UK)</td>
              <td>1.5%–2.4% + 20p</td>
              <td>1.5% + 20p (Stripe)</td>
            </tr>
            <tr>
              <td>Transaction fees if you use a non-native gateway</td>
              <td>0.5%–2%</td>
              <td>0%</td>
            </tr>
            <tr>
              <td>Developer time (setup + 12 months of changes)</td>
              <td>£800 – £2,500</td>
              <td>£1,500 – £5,000</td>
            </tr>
            <tr>
              <td>
                <strong>Year 1 total (typical)</strong>
              </td>
              <td>
                <strong>£2,500 – £6,000</strong>
              </td>
              <td>
                <strong>£2,000 – £8,000</strong>
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
        abandoned-cart automation in Klaviyo or FluentCRM. This is achievable — it just
        requires assembly.
      </p>

      <h2 id="vat-international">4. UK VAT and international selling</h2>
      <p>
        Shopify Markets handles country-specific pricing, VAT-inclusive display, EU OSS
        reporting, duties and taxes at checkout, and currency conversion natively. For
        UK-to-EU or UK-to-US expansion this is a large advantage — it collapses a
        multi-week integration into a settings screen.
      </p>
      <p>
        WooCommerce reaches parity with plugins: WooCommerce Tax, EU VAT Compliance
        Assistant, and Aelia Currency Switcher. They work; they cost more time to
        maintain.
      </p>

      <h2 id="apps">5. Apps, plugins and the "endless tax"</h2>
      <p>
        Shopify's app store makes it easy to bolt on functionality — and easy to bloat
        your monthly bill. A common Shopify Plus stack (Klaviyo, Judge.me, Rebuy,
        Loox, Postscript, Gorgias) runs £400–£1,200 a month before you've launched a
        campaign. WooCommerce's plugin equivalents are almost always cheaper — the
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
        you or your host — a managed WordPress host abstracts most of it, but you
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
              <td>£0 – £30K / month</td>
              <td>Shopify Basic</td>
              <td>Fastest time to market, lowest cognitive load.</td>
            </tr>
            <tr>
              <td>Scaling</td>
              <td>£30K – £250K / month</td>
              <td>Shopify or WooCommerce</td>
              <td>Depends on team skills and content strategy.</td>
            </tr>
            <tr>
              <td>Enterprise DTC</td>
              <td>£250K – £1M / month</td>
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
          never the constraint — marketing is.
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
        We're platform-agnostic — we operate both. Our default recommendation for a
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
