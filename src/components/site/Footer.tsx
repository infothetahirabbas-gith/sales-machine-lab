import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Mail, Phone, MapPin, Linkedin, Instagram, Twitter } from "lucide-react";
import { SITE } from "@/config/site";
import { COMPANY_LINKS } from "@/config/company";
import { SERVICES } from "@/config/services";
import { LOCATIONS, INDUSTRIES } from "@/lib/locations-industries";
import logoAsset from "@/assets/being-ecom-logo.webp.asset.json";

// Hub pillars, tools and comparisons - keeps every deep page ≤2 clicks from home
// so Google can crawl them and they don't end up "Discovered - currently not indexed".
const HUB_PILLARS: { to: string; label: string }[] = [
  { to: "/hub/shopify-growth", label: "Shopify Growth" },
  { to: "/hub/woocommerce-growth", label: "WooCommerce Growth" },
  { to: "/hub/ecommerce-seo", label: "Ecommerce SEO" },
  { to: "/hub/paid-media", label: "Paid Media" },
  { to: "/hub/cro", label: "CRO" },
  { to: "/hub/email-marketing", label: "Email Marketing" },
  { to: "/hub/ai-automation", label: "AI Automation" },
  { to: "/hub/analytics-tracking", label: "Analytics & Tracking" },
];

const RESOURCES: { to: string; label: string }[] = [
  { to: "/blog", label: "Blog" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/tools", label: "Free Tools" },
  { to: "/compare", label: "Comparisons" },
  { to: "/benchmarks", label: "Benchmarks" },
  { to: "/methodology", label: "Growth Methodology" },
  { to: "/glossary", label: "SEO Glossary" },
  { to: "/research", label: "Research" },
  { to: "/search", label: "Search the site" },
];

export default function Footer() {
  return (
    <footer className="mt-24 bg-foreground text-background border-t border-foreground">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-14 pb-12 lg:pt-20 lg:pb-16 grid lg:grid-cols-12 gap-10 lg:gap-12 text-sm">
        {/* Brand */}
        <div className="lg:col-span-4">
          <Link to="/" className="inline-flex items-center gap-3" aria-label="BeingEcom home">
            <img src={logoAsset.url} alt="BeingEcom" width="44" height="44" loading="lazy" decoding="async" className="h-11 w-11 rounded-xl bg-background p-1.5" />
            <span className="text-xl font-bold tracking-tight text-background">BeingEcom</span>
          </Link>

          <p className="mt-6 text-background/80 leading-relaxed max-w-xs">
            The growth operating system for Shopify & WooCommerce stores. Ads, CRO, SEO, automation done right.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {[
              { Icon: Linkedin, href: SITE.socials.linkedin, label: "LinkedIn" },
              { Icon: Instagram, href: SITE.socials.instagram, label: "Instagram" },
              { Icon: Twitter, href: SITE.socials.twitter, label: "X (Twitter)" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-11 h-11 rounded-full border border-background/30 flex items-center justify-center text-background hover:text-foreground hover:bg-accent hover:border-accent transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Services (merged) */}
        <div className="lg:col-span-5">
          <div className="text-background font-bold tracking-[0.16em] text-xs mb-5">SERVICES</div>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-background/60">
            {SERVICES.map((s) => (
              <li key={s.to}>
                <Link to={s.to} className="hover:text-accent transition-colors">{s.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div className="lg:col-span-3">
          <div className="text-background font-bold tracking-[0.16em] text-xs mb-5">COMPANY</div>
          <ul className="grid gap-2.5 text-background/60">
            {COMPANY_LINKS.slice(0, 5).map((c) => (
              <li key={c.slug}>
                <Link to={c.to} className="hover:text-accent transition-colors">{c.label}</Link>
              </li>
            ))}
            <li className="pt-1">
              <Link
                to="/company"
                className="inline-flex items-center gap-1 font-semibold text-accent hover:text-background transition-colors group"
              >
                See all <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Locations - internal linking so every city page is 1 click from home */}
        <div className="lg:col-span-4">
          <div className="text-background font-bold tracking-[0.16em] text-xs mb-5">LOCATIONS</div>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-background/60">
            {LOCATIONS.map((l) => (
              <li key={l.slug}>
                <Link to="/locations/$slug" params={{ slug: l.slug }} className="hover:text-accent transition-colors">
                  Ecommerce Agency {l.city}
                </Link>
              </li>
            ))}
            <li className="pt-1 col-span-2">
              <Link to="/locations" className="inline-flex items-center gap-1 font-semibold text-accent hover:text-background transition-colors">
                All UK locations <ArrowUpRight className="size-3.5" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Industries */}
        <div className="lg:col-span-4">
          <div className="text-background font-bold tracking-[0.16em] text-xs mb-5">INDUSTRIES</div>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-background/60">
            {INDUSTRIES.map((i) => (
              <li key={i.slug}>
                <Link to="/industries/$slug" params={{ slug: i.slug }} className="hover:text-accent transition-colors">
                  {i.name}
                </Link>
              </li>
            ))}
            <li className="pt-1 col-span-2">
              <Link to="/industries" className="inline-flex items-center gap-1 font-semibold text-accent hover:text-background transition-colors">
                All industries <ArrowUpRight className="size-3.5" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources + Growth Hubs */}
        <div className="lg:col-span-4">
          <div className="text-background font-bold tracking-[0.16em] text-xs mb-5">GROWTH HUBS</div>
          <ul className="grid grid-cols-1 gap-y-2.5 text-background/60 mb-6">
            {HUB_PILLARS.map((h) => (
              <li key={h.to}>
                <Link to={h.to} className="hover:text-accent transition-colors">{h.label}</Link>
              </li>
            ))}
          </ul>
          <div className="text-background font-bold tracking-[0.16em] text-xs mb-4">RESOURCES</div>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-background/60">
            {RESOURCES.map((r) => (
              <li key={r.to}>
                <Link to={r.to} className="hover:text-accent transition-colors">{r.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Get in touch */}
        <div className="lg:col-span-12 border-t border-background/15 pt-8 mt-2 grid lg:grid-cols-3 gap-6 text-center lg:text-left">

          <ul className="space-y-3 text-background/60 flex flex-col items-center lg:items-start">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-background shrink-0" />
              <a href={SITE.emailHref} className="hover:text-accent transition-colors">{SITE.email}</a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-background shrink-0" />
              <a href={SITE.phoneHref} className="hover:text-accent transition-colors">{SITE.phone}</a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-background shrink-0 mt-0.5" />
              <span>{SITE.addressLines.map((line, i) => (<span key={line}>{line}{i < SITE.addressLines.length - 1 ? <br /> : null}</span>))}</span>
            </li>
          </ul>
          <ul className="space-y-3 text-background/60 flex flex-col items-center lg:items-start">
            <li><Link to="/contact" className="inline-flex items-center gap-1 hover:text-accent transition-colors">Book a Strategy Call <ArrowUpRight className="size-3.5" /></Link></li>
            <li><Link to="/case-studies" className="hover:text-accent transition-colors">View Case Studies →</Link></li>
            <li><Link to="/audit" className="hover:text-accent transition-colors">Free Store Audit →</Link></li>
          </ul>
          <ul className="space-y-3 text-background/60 flex flex-col items-center lg:items-start">
            <li><Link to="/company" className="hover:text-accent transition-colors">Company hub →</Link></li>
            <li><Link to="/company/founder" className="hover:text-accent transition-colors">Meet the founder →</Link></li>
            <li><Link to="/company/methodology" className="hover:text-accent transition-colors">Our methodology →</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-background/15">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-background/50">
          <div>© {new Date().getFullYear()} BeingEcom. Ecommerce growth, engineered.</div>
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-accent transition-colors">Terms</Link>
            <Link to="/cookies" className="hover:text-accent transition-colors">Cookies</Link>
            <Link to="/company/editorial-policy" className="hover:text-accent transition-colors">Editorial Policy</Link>
            <Link to="/company/review-methodology" className="hover:text-accent transition-colors">Review Methodology</Link>
            <Link to="/company/corrections" className="hover:text-accent transition-colors">Corrections</Link>
            <Link to="/glossary" className="hover:text-accent transition-colors">SEO Glossary</Link>
          </nav>
        </div>
      </div>

    </footer>
  );
}
