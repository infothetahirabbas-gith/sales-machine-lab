import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../components/site/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd, type FAQ } from "../lib/seo";
import heroImg from "../assets/hero-woocommerce-store.jpg";

const FAQ_LIST: FAQ[] = [
  { q: "Do you build WooCommerce stores from scratch?", a: "Yes — custom WordPress + WooCommerce builds with performant hosting, conversion-ready templates and every plugin justified against revenue impact." },
  { q: "How long does a WooCommerce build take?", a: "Standard Woo store: 6–8 weeks. Custom / high-catalogue Woo: 8–12 weeks. Headless Woo with a React/Next.js frontend: 10–14 weeks." },
  { q: "Can you make WooCommerce fast?", a: "Yes. Object cache (Redis), full-page cache, image CDN, lean theme, and only the plugins that earn their weight. We routinely hit sub-2s LCP on Woo." },
  { q: "Do you migrate from Shopify or Magento to WooCommerce?", a: "Yes — products, customers, orders, categories, redirects and SEO metadata all preserved. Full 301 mapping so rankings don't drop." },
  { q: "What hosting do you recommend for WooCommerce?", a: "Kinsta, WP Engine or Cloudways for most brands. Dedicated / Cloudflare Enterprise for £500K+/month stores. We handle the setup and tuning." },
  { q: "Can you build custom WooCommerce plugins?", a: "Yes — bespoke plugins, REST API integrations with ERPs/3PLs/CRMs, and Gutenberg blocks tailored to your merchandising." },
];

export const Route = createFileRoute("/services/store-development/woocommerce")({
  head: () => ({
    meta: [
      { title: "WooCommerce Development Agency UK | WordPress Ecommerce Experts | BeingEcom" },
      { name: "description", content: "UK WooCommerce development agency. Custom WordPress stores, headless Woo, migrations and performance tuning engineered for speed, SEO and conversion." },
      { property: "og:title", content: "WooCommerce Development Agency UK | WordPress Ecommerce Experts | BeingEcom" },
      { property: "og:description", content: "UK WooCommerce development agency. Custom WordPress stores, headless Woo, migrations and performance tuning engineered for speed, SEO and conversion." },
      { property: "og:url", content: "https://beingecom.com/services/store-development/woocommerce" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://beingecom.com/services/store-development/woocommerce" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({ slug: "store-development/woocommerce", name: "WooCommerce Development", description: "Custom WooCommerce and WordPress ecommerce development — themes, headless, migrations, plugins and performance tuning." })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Store Development", path: "/services/store-development" }, { name: "WooCommerce", path: "/services/store-development/woocommerce" }])) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQ_LIST, "/services/store-development/woocommerce")) },
    ],
  }),
  component: () => (
    <ServicePage cfg={{
      slug: "store-development-woocommerce",
      eyebrow: "WooCommerce & WordPress Development",
      heroImage: heroImg,
      heroTitle: "Build a WooCommerce store that's fast, flexible — and actually converts.",
      heroSub: "Custom WordPress + WooCommerce builds engineered for speed, SEO and margin — no plugin bloat.",
      problemTitle: "Why most WooCommerce stores quietly bleed revenue.",
      problemBullets: [
        "40+ plugins, slow admin, 6-second load times.",
        "Generic theme, no PDP structure, no conversion logic.",
        "Cheap shared hosting choking traffic and SEO.",
      ],
      whatIsTitle: "What a 'conversion-first WooCommerce build' actually means.",
      whatIsBody: "A lean WordPress stack — right hosting, right theme, right plugins — engineered against real ecommerce funnels. Every piece of PHP, every Gutenberg block earns its space. Built to scale from £10K to £500K+/month without collapsing.",
      systemTitle: "Our WooCommerce build system.",
      systemSteps: [
        { title: "Audit & blueprint", body: "Tear down current store, map ideal IA, plugin stack and hosting architecture." },
        { title: "Hosting & theme", body: "Kinsta / WP Engine / Cloudways setup with a lean, CRO-ready theme." },
        { title: "Conversion engineering", body: "PDP, PLP, cart, Woo checkout — built around DTC buyer psychology." },
        { title: "Speed & launch QA", body: "Object cache, CDN, image opt, sub-2s LCP, mobile-first." },
      ],
      pillarsTitle: "Four pillars of a sales-ready WooCommerce store.",
      pillars: [
        { title: "Structure", body: "Custom post types, taxonomies and Gutenberg blocks that guide browsing to buying." },
        { title: "Trust", body: "Reviews, badges, guarantees and press logos in the right place at the right time." },
        { title: "Speed", body: "Redis object cache + full-page cache + CDN. Lighthouse 90+ on mobile." },
        { title: "Clarity", body: "Copy and layout that say exactly what the product does and why." },
      ],
      deepBlocks: [
        { title: "WooCommerce setup system", body: "WordPress + Woo store structure, custom taxonomies, product attributes and Gutenberg patterns.", tags: ["WP core", "Taxonomies", "Attributes", "Gutenberg"] },
        { title: "Performant hosting stack", body: "Kinsta / WP Engine / Cloudways + Cloudflare, Redis object cache, full-page cache.", tags: ["Kinsta", "Cloudflare", "Redis", "Cache"] },
        { title: "Custom Woo themes", body: "Lean CRO-first themes or optimised Kadence/Blocksy builds — no page-builder bloat.", tags: ["Kadence", "Blocksy", "Timber", "Block themes"] },
        { title: "Headless WooCommerce", body: "Next.js / Nuxt storefront on Woo REST + GraphQL for brands that need best-in-class speed.", tags: ["Next.js", "WPGraphQL", "REST", "Vercel"] },
        { title: "Plugin engineering", body: "Custom plugins, ERP/3PL/CRM integrations, and pruning the 30+ plugins slowing your site.", tags: ["Custom plugins", "REST API", "Integrations", "Audit"] },
        { title: "Checkout & speed optimisation", body: "Woo block checkout, Stripe/Klarna, image optimisation, hit sub-2s loads on mobile.", tags: ["Block checkout", "Stripe", "Klarna", "Image opt"] },
      ],
      triggersTitle: "Trust elements that move CR on WooCommerce.",
      triggers: ["Real customer reviews", "Trust badges", "Guarantee bar", "Live chat", "Free shipping bar", "Urgency timers", "Stock counters", "Press logos", "Risk reversal"],
      beforeAfter: {
        before: ["1.1% CR", "42 plugins, cheap shared host", "No mobile optimisation", "No trust elements", "Slow PDP (5.6s LCP)"],
        after: ["4.4% CR", "12 plugins, Kinsta + Cloudflare", "Mobile-first PDP", "Reviews + badges + guarantee", "1.6s LCP on 4G"],
      },
      caseStudy: {
        title: "WooCommerce homeware brand: rebuild → 4× CR",
        problem: "WP Bakery bloat, 42 plugins, 5.6s LCP. Bounce 74% on mobile.",
        strategy: "Migrated to Kadence blocks, pruned to 12 plugins, Kinsta + Cloudflare, PDP rebuild with sticky ATC.",
        result: "CR went from 1.1% to 4.4%, AOV +22% via cross-sells.",
        metrics: [{ label: "CR", value: "4.0×" }, { label: "AOV", value: "+22%" }, { label: "LCP", value: "-71%" }],
      },
      ctaTitle: "Get your WooCommerce store built for sales.",
      impactStats: [
        { value: "+118%", label: "Launch-week CR" },
        { value: "1.6s", label: "Avg Woo LCP" },
        { value: "95", label: "PageSpeed score" },
      ],
      metricBars: [
        { label: "Conversion rate", before: 1.1, after: 3.4, unit: "%", description: "Default-theme WooCommerce CR vs a store engineered with PDP system + trust + sticky ATC." },
        { label: "Page load (s)", before: 5.6, after: 1.6, unit: "s", description: "LCP on mobile 4G. Every 1s faster ≈ 7% more Woo conversions." },
        { label: "Mobile CR", before: 0.8, after: 3.0, unit: "%", description: "WooCommerce mobile conversion — where 70% of DTC traffic buys." },
        { label: "AOV", before: 44, after: 76, unit: "£", description: "AOV lifted with Woo cross-sells, upsells, and bundle plugins built into the theme." },
        { label: "Lighthouse score", before: 46, after: 94, description: "Google PageSpeed on WooCommerce (0–100). Directly affects SEO + Meta ad quality." },
      ],
      faqs: FAQ_LIST,
    }} />
  ),
});
