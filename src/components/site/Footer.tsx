import { Link } from "@tanstack/react-router";
import { Sparkles, Mail, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 bg-[#0a0d14] text-white/80">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-12 lg:py-16 grid lg:grid-cols-12 gap-10 lg:gap-12 text-sm">
        {/* Brand */}
        <div className="lg:col-span-4">
          <Link to="/" className="flex items-center gap-2.5 font-display font-bold text-xl text-white">
            <span className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-[oklch(0.6_0.18_245)] flex items-center justify-center shadow-lg shadow-primary/30">
              <Sparkles className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
            </span>
            BeingEcom
          </Link>
          <p className="mt-5 text-white/55 leading-relaxed max-w-xs">
            The growth operating system for Shopify & WooCommerce stores. Ads, CRO, SEO, automation done right.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {[Instagram, Linkedin, Twitter, Youtube].map((Icon, i) => (
              <span
                key={i}
                aria-label="social"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40"
              >
                <Icon className="w-4 h-4" />
              </span>
            ))}
          </div>
        </div>

        {/* Services (merged) */}
        <div className="lg:col-span-5">
          <div className="text-white font-bold tracking-wide mb-5">SERVICES</div>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-white/60">
            <li><Link to="/services/creative" className="hover:text-white transition-colors">Creative Production</Link></li>
            <li><Link to="/services/store-development" className="hover:text-white transition-colors">Store Development</Link></li>
            <li><Link to="/services/scaling" className="hover:text-white transition-colors">Scaling Strategy</Link></li>
            <li><Link to="/services/cro" className="hover:text-white transition-colors">Conversion Optimization</Link></li>
            <li><Link to="/services/analytics" className="hover:text-white transition-colors">Analytics & Tracking</Link></li>
            <li><Link to="/services/paid-ads" className="hover:text-white transition-colors">Paid Advertising</Link></li>
            <li><Link to="/services/funnel" className="hover:text-white transition-colors">Funnel Optimization</Link></li>
            <li><Link to="/services/seo" className="hover:text-white transition-colors">Ecommerce SEO</Link></li>
            <li><Link to="/services/email-sms" className="hover:text-white transition-colors">Email Marketing</Link></li>
          </ul>
        </div>

        {/* Get in touch */}
        <div className="lg:col-span-3 text-center lg:text-left">
          <div className="text-white font-bold tracking-wide mb-5">GET IN TOUCH</div>
          <ul className="space-y-3 text-white/60 flex flex-col items-center lg:items-start">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              <a href="mailto:hello@beingecom.com" className="hover:text-white transition-colors">hello@beingecom.com</a>
            </li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Book a Strategy Call →</Link></li>
            <li><Link to="/case-studies" className="hover:text-white transition-colors">View Case Studies →</Link></li>
            <li><Link to="/glossary" className="hover:text-white transition-colors">SEO Glossary →</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <div>© {new Date().getFullYear()} BeingEcom. Ecommerce growth, engineered.</div>
          <div>Built for stores that want to scale, not stall.</div>
        </div>
      </div>
    </footer>
  );
}
