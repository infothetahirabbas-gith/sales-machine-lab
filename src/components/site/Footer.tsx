import { Link } from "@tanstack/react-router";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-14 grid md:grid-cols-4 gap-10 text-sm">
        <div>
          <div className="flex items-center gap-2 font-display font-bold text-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-primary" /> BeingEcom
          </div>
          <p className="mt-3 text-muted-foreground">
            Ecommerce growth operating system for Shopify & WooCommerce stores.
          </p>
        </div>
        <div>
          <div className="font-semibold mb-3">Services</div>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/services/store-development" className="hover:text-foreground">Store Development</Link></li>
            <li><Link to="/services/cro" className="hover:text-foreground">CRO</Link></li>
            <li><Link to="/services/paid-ads" className="hover:text-foreground">Paid Ads</Link></li>
            <li><Link to="/services/seo" className="hover:text-foreground">SEO</Link></li>
            <li><Link to="/services/email-sms" className="hover:text-foreground">Email & SMS</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Company</div>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/case-studies" className="hover:text-foreground">Case Studies</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Get Started</div>
          <p className="text-muted-foreground mb-3">Free store audit, no obligation.</p>
          <Link to="/contact" className="inline-flex rounded-full bg-primary text-primary-foreground px-4 py-2 font-semibold">Book Strategy Call</Link>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} BeingEcom — Ecommerce growth, engineered.
      </div>
    </footer>
  );
}
