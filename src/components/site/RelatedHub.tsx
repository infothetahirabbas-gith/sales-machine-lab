import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { LOCATIONS, INDUSTRIES } from "../../lib/locations-industries";

/**
 * Sitewide internal-linking hub. Renders above the footer on every page so
 * crawlers and users always have 1-click access to related services,
 * locations, industries and resources. Skips itself on the /contact and
 * /audit conversion pages so the CTA stays uninterrupted.
 */
const CORE_SERVICES: { to: string; label: string }[] = [
  { to: "/services/seo", label: "Ecommerce SEO" },
  { to: "/services/performance-marketing", label: "Performance Marketing" },
  { to: "/services/performance-marketing/google-ads", label: "Google Ads" },
  { to: "/services/performance-marketing/facebook-ads", label: "Meta Ads" },
  { to: "/services/performance-marketing/tiktok-ads", label: "TikTok Ads" },
  { to: "/services/store-development/shopify", label: "Shopify Development" },
  { to: "/services/store-development/woocommerce", label: "WooCommerce Development" },
  { to: "/services/cro", label: "Conversion Rate Optimisation" },
  { to: "/services/email-sms", label: "Klaviyo Email & SMS" },
  { to: "/services/creative", label: "Creative Production" },
  { to: "/services/analytics", label: "Analytics & Tracking" },
  { to: "/services/ai-automation", label: "AI Automation" },
];

const RESOURCES: { to: string; label: string }[] = [
  { to: "/case-studies", label: "Case Studies" },
  { to: "/blog", label: "Ecommerce Blog" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About Being Ecom" },
  { to: "/audit", label: "Free Store Audit" },
  { to: "/contact", label: "Contact & Book Call" },
  { to: "/glossary", label: "Ecommerce Glossary" },
  { to: "/industries", label: "All Industries" },
  { to: "/locations", label: "All UK Locations" },
];

const HIDE_ON = new Set(["/contact", "/audit", "/admin", "/admin/case-studies", "/admin/login"]);

export default function RelatedHub() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  // Hide on conversion pages and any admin surface.
  if (HIDE_ON.has(pathname) || pathname.startsWith("/admin")) return null;

  const topLocations = LOCATIONS.slice(0, 10);
  const topIndustries = INDUSTRIES.slice(0, 10);

  return (
    <section aria-labelledby="related-hub" className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-14">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">Explore more</div>
            <h2 id="related-hub" className="mt-2 text-2xl md:text-3xl font-bold text-ink">
              Related services, cities & resources
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-md">
            Everything Being Ecom ships for UK Shopify and WooCommerce brands - one team, one revenue P&amp;L.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <LinkColumn title="Services" items={CORE_SERVICES} />
          <DynamicLinkColumn
            title="UK Locations"
            to="/locations/$slug"
            items={topLocations.map((l) => ({ slug: l.slug, label: `Ecommerce Agency ${l.city}` }))}
            footer={{ to: "/locations", label: "See all UK locations" }}
          />
          <DynamicLinkColumn
            title="Industries"
            to="/industries/$slug"
            items={topIndustries.map((i) => ({ slug: i.slug, label: i.name }))}
            footer={{ to: "/industries", label: "See all industries" }}
          />
          <LinkColumn title="Resources" items={RESOURCES} />
        </div>
      </div>
    </section>
  );
}

function LinkColumn({
  title,
  items,
  footer,
}: {
  title: string;
  items: { to: string; label: string }[];
  footer?: { to: string; label: string };
}) {
  return (
    <div>
      <h3 className="font-bold text-ink text-sm uppercase tracking-wider mb-4">{title}</h3>
      <ul className="space-y-2.5">
        {items.map((i) => (
          <li key={i.to}>
            <Link
              to={i.to}
              className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
            >
              <span>{i.label}</span>
            </Link>
          </li>
        ))}
        {footer && (
          <li className="pt-2">
            <Link
              to={footer.to}
              className="inline-flex items-center gap-1 text-primary font-semibold hover:underline"
            >
              {footer.label} <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

function DynamicLinkColumn({
  title,
  to,
  items,
  footer,
}: {
  title: string;
  to: "/locations/$slug" | "/industries/$slug";
  items: { slug: string; label: string }[];
  footer?: { to: string; label: string };
}) {
  return (
    <div>
      <h3 className="font-bold text-ink text-sm uppercase tracking-wider mb-4">{title}</h3>
      <ul className="space-y-2.5">
        {items.map((i) => (
          <li key={i.slug}>
            <Link
              to={to}
              params={{ slug: i.slug }}
              className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
            >
              <span>{i.label}</span>
            </Link>
          </li>
        ))}
        {footer && (
          <li className="pt-2">
            <Link
              to={footer.to}
              className="inline-flex items-center gap-1 text-primary font-semibold hover:underline"
            >
              {footer.label} <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
