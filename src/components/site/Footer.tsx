import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Mail, Instagram, Linkedin, Twitter } from "lucide-react";
import logo from "@/assets/beingecom-logo.webp";

export default function Footer() {
  return (
    <footer className="mt-24 bg-foreground text-background border-t border-foreground">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-14 pb-12 lg:pt-20 lg:pb-16 grid lg:grid-cols-12 gap-10 lg:gap-12 text-sm">
        {/* Brand */}
        <div className="lg:col-span-4">
          <Link to="/" className="inline-flex items-center rounded-xl bg-background px-3 py-2" aria-label="BeingEcom home">
            <img src={logo} alt="BeingEcom" width="150" height="47" className="h-9 w-auto" />
          </Link>
          <p className="mt-6 text-background/60 leading-relaxed max-w-xs">
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
                className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center text-background/65 hover:text-foreground hover:bg-accent hover:border-accent transition-colors"
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
          <div className="text-background font-bold tracking-[0.16em] text-xs mb-5">GET IN TOUCH</div>
          <ul className="space-y-3 text-background/60 flex flex-col items-center lg:items-start">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-background" />
              <a href="mailto:hello@beingecom.com" className="hover:text-foreground transition-colors">hello@beingecom.com</a>
            </li>
            <li><Link to="/contact" className="inline-flex items-center gap-1 hover:text-accent transition-colors">Book a Strategy Call <ArrowUpRight className="size-3.5" /></Link></li>
            <li><Link to="/case-studies" className="hover:text-foreground transition-colors">View Case Studies →</Link></li>
            <li><Link to="/glossary" className="hover:text-foreground transition-colors">SEO Glossary →</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-background/15">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-background/50">
          <div>© {new Date().getFullYear()} BeingEcom. Ecommerce growth, engineered.</div>
          <div>Built for stores that want to scale, not stall.</div>
        </div>
      </div>
    </footer>
  );
}
