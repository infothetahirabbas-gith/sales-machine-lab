import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import logoAsset from "@/assets/being-ecom-logo.jpeg.asset.json";
const logo = logoAsset.url;

type ServiceItem = { to: string; label: string; children?: { to: string; label: string }[] };

const services: ServiceItem[] = [
  { to: "/services/seo", label: "Ecommerce SEO" },
  {
    to: "/services/performance-marketing",
    label: "Performance Marketing",
    children: [
      { to: "/services/performance-marketing/facebook-ads", label: "Facebook Ads" },
      { to: "/services/performance-marketing/google-ads", label: "Google Ads" },
      { to: "/services/performance-marketing/tiktok-ads", label: "TikTok Ads" },
      { to: "/services/performance-marketing/media-buying", label: "Media Buying" },
    ],
  },
  { to: "/services/creative", label: "Creative Testing" },
  { to: "/services/cro", label: "Conversion Rate Optimization" },
  { to: "/services/email-sms", label: "Email Marketing" },
  { to: "/services/store-development", label: "Store Development" },
  { to: "/services/ai-automation", label: "AI Automation" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 h-20 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center shrink-0 leading-none" aria-label="BeingEcom home">
          <img src={logo} alt="BeingEcom" width="180" height="56" decoding="async" fetchPriority="high" className="h-10 md:h-11 w-auto block" />
        </Link>
        <nav className="hidden lg:flex items-center gap-7 text-sm">
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-foreground font-semibold" }} className="text-muted-foreground hover:text-foreground transition">Home</Link>
          <div className="relative group">
            <button className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition">Services <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" /></button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
              <div className="w-80 rounded-2xl border border-border bg-background p-2 shadow-[0_24px_70px_-30px_color-mix(in_oklab,var(--ink)_35%,transparent)]">
                {services.map((s) => (
                  <div key={s.to}>
                    <Link to={s.to} className="block px-3 py-2.5 rounded-xl text-sm hover:bg-accent/10 hover:text-foreground transition-colors font-medium">
                      {s.label}
                    </Link>
                    {s.children && (
                      <div className="ml-3 pl-3 border-l border-border my-1 grid">
                        {s.children.map((c) => (
                          <Link key={c.to} to={c.to} className="block px-3 py-2 rounded-lg text-xs text-muted-foreground hover:bg-accent/10 hover:text-foreground transition-colors">
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Link to="/case-studies" className="text-muted-foreground hover:text-foreground transition">Case Studies</Link>
          <Link to="/audit" className="text-muted-foreground hover:text-foreground transition">Store Audit</Link>
          <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition">Pricing</Link>
          <Link to="/about" className="text-muted-foreground hover:text-foreground transition">About</Link>
          <Link to="/contact" className="text-muted-foreground hover:text-foreground transition">Contact</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/contact" className="hidden lg:flex btn btn-primary btn-shimmer text-sm py-2 px-4">
            Book Strategy Call →
          </Link>
           <button onClick={() => setOpen(!open)} className="lg:hidden size-10 rounded-full border border-border inline-flex items-center justify-center text-foreground hover:bg-accent/10 hover:border-accent transition-colors" aria-label={open ? "Close menu" : "Open menu"}>
             {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open && (
         <div className="lg:hidden border-t border-border bg-background shadow-xl">
          <div className="px-5 py-3 grid gap-1 text-sm">
            <Link to="/" className="px-3 py-2 rounded hover:bg-secondary" onClick={() => setOpen(false)}>Home</Link>
            <div>
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-secondary"
                aria-expanded={servicesOpen}
              >
                <span>Services</span>
                <span className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`}>▾</span>
              </button>
              {servicesOpen && (
                <div className="mt-1 ml-3 pl-3 border-l border-border grid gap-1">
                  {services.map((s) => (
                    <div key={s.to}>
                      <Link to={s.to} className="px-3 py-2 rounded text-foreground font-medium hover:bg-secondary block" onClick={() => { setOpen(false); setServicesOpen(false); }}>{s.label}</Link>
                      {s.children && (
                        <div className="ml-3 pl-3 border-l border-border grid gap-1">
                          {s.children.map((c) => (
                            <Link key={c.to} to={c.to} className="px-3 py-1.5 rounded text-xs text-muted-foreground hover:bg-secondary hover:text-foreground block" onClick={() => { setOpen(false); setServicesOpen(false); }}>{c.label}</Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Link to="/case-studies" className="px-3 py-2 rounded hover:bg-secondary" onClick={() => setOpen(false)}>Case Studies</Link>
            <Link to="/audit" className="px-3 py-2 rounded hover:bg-secondary" onClick={() => setOpen(false)}>Store Audit</Link>
            <Link to="/pricing" className="px-3 py-2 rounded hover:bg-secondary" onClick={() => setOpen(false)}>Pricing</Link>
            <Link to="/about" className="px-3 py-2 rounded hover:bg-secondary" onClick={() => setOpen(false)}>About</Link>
            <Link to="/contact" className="px-3 py-2 rounded hover:bg-secondary" onClick={() => setOpen(false)}>Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
}
