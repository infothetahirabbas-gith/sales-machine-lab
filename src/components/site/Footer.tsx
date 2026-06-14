import { Link } from "@tanstack/react-router";
import { Sparkles, Mail, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 bg-card text-foreground/80 border-t border-border">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-12 lg:py-16 grid lg:grid-cols-12 gap-10 lg:gap-12 text-sm">
        {/* Brand */}
        <div className="lg:col-span-4">
          <Link to="/" className="flex items-center gap-2.5 font-display font-bold text-xl text-foreground">
            <span className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
              <Sparkles className="w-4.5 h-4.5 text-primary-foreground" strokeWidth={2.5} />
            </span>
            BeingEcom
          </Link>
          <p className="mt-5 text-muted-foreground leading-relaxed max-w-xs">
            The growth operating system for Shopify & WooCommerce stores. Ads, CRO, SEO, automation done right.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {[
              { Icon: Linkedin, href: "https://linkedin.com/company/beingecom", label: "LinkedIn" },
              { Icon: Twitter, href: "https://x.com/beingecom", label: "X (Twitter)" },
              { Icon: Instagram, href: "https://instagram.com/beingecom", label: "Instagram" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full bg-foreground/5 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Services (merged) */}
        <div className="lg:col-span-5">
          <div className="text-foreground font-bold tracking-wide mb-5">SERVICES</div>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-muted-foreground">
            <li><Link to="/services/creative" className="hover:text-foreground transition-colors">Creative Production</Link></li>
            <li><Link to="/services/store-development" className="hover:text-foreground transition-colors">Store Development</Link></li>
            <li><Link to="/services/scaling" className="hover:text-foreground transition-colors">Scaling Strategy</Link></li>
            <li><Link to="/services/cro" className="hover:text-foreground transition-colors">Conversion Optimization</Link></li>
            <li><Link to="/services/analytics" className="hover:text-foreground transition-colors">Analytics & Tracking</Link></li>
            <li><Link to="/services/paid-ads" className="hover:text-foreground transition-colors">Paid Advertising</Link></li>
            <li><Link to="/services/funnel" className="hover:text-foreground transition-colors">Funnel Optimization</Link></li>
            <li><Link to="/services/seo" className="hover:text-foreground transition-colors">Ecommerce SEO</Link></li>
            <li><Link to="/services/email-sms" className="hover:text-foreground transition-colors">Email Marketing</Link></li>
          </ul>
        </div>

        {/* Get in touch */}
        <div className="lg:col-span-3 text-center lg:text-left">
          <div className="text-foreground font-bold tracking-wide mb-5">GET IN TOUCH</div>
          <ul className="space-y-3 text-muted-foreground flex flex-col items-center lg:items-start">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              <a href="mailto:hello@beingecom.com" className="hover:text-foreground transition-colors">hello@beingecom.com</a>
            </li>
            <li><Link to="/contact" className="hover:text-foreground transition-colors">Book a Strategy Call →</Link></li>
            <li><Link to="/case-studies" className="hover:text-foreground transition-colors">View Case Studies →</Link></li>
            <li><Link to="/glossary" className="hover:text-foreground transition-colors">SEO Glossary →</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} BeingEcom. Ecommerce growth, engineered.</div>
          <div>Built for stores that want to scale, not stall.</div>
        </div>
      </div>
    </footer>
  );
}
