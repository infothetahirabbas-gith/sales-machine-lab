import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Mail, Phone, MapPin, Linkedin, Instagram, Twitter } from "lucide-react";
import { SITE } from "@/config/site";
import logoAsset from "@/assets/being-ecom-logo.webp.asset.json";

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
            <li><Link to="/services/seo" className="hover:text-accent transition-colors">Ecommerce SEO</Link></li>
            <li><Link to="/services/performance-marketing" className="hover:text-accent transition-colors">Performance Marketing</Link></li>
            <li><Link to="/services/store-development" className="hover:text-accent transition-colors">Store Development</Link></li>
            <li><Link to="/services/cro" className="hover:text-accent transition-colors">Conversion Rate Optimisation</Link></li>
            <li><Link to="/services/creative" className="hover:text-accent transition-colors">Creative Production</Link></li>
            <li><Link to="/services/email-sms" className="hover:text-accent transition-colors">Email Marketing Automation</Link></li>
            <li><Link to="/services/ai-automation" className="hover:text-accent transition-colors">AI Automation</Link></li>
            <li><Link to="/services/funnel" className="hover:text-accent transition-colors">Funnel & Landing Pages</Link></li>
            <li><Link to="/services/analytics" className="hover:text-accent transition-colors">Analytics & Tracking</Link></li>
            <li><Link to="/services/scaling" className="hover:text-accent transition-colors">Scaling & Retention</Link></li>
          </ul>
        </div>

        {/* Get in touch */}
        <div className="lg:col-span-3 text-center lg:text-left">
          <div className="text-background font-bold tracking-[0.16em] text-xs mb-5">GET IN TOUCH</div>
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
            <li><Link to="/contact" className="inline-flex items-center gap-1 hover:text-accent transition-colors">Book a Strategy Call <ArrowUpRight className="size-3.5" /></Link></li>
            <li><Link to="/case-studies" className="hover:text-accent transition-colors">View Case Studies →</Link></li>
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
            <Link to="/glossary" className="hover:text-accent transition-colors">SEO Glossary</Link>
          </nav>
        </div>
      </div>

    </footer>
  );
}
