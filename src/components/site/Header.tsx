import { Link } from "@tanstack/react-router";
import { useState } from "react";
import logo from "@/assets/beingecom-logo.webp";

const services = [
  { to: "/services/store-development", label: "Store Development" },
  { to: "/services/cro", label: "CRO" },
  { to: "/services/paid-ads", label: "Paid Ads" },
  { to: "/services/seo", label: "Ecommerce SEO" },
  { to: "/services/email-sms", label: "Email Marketing" },
  { to: "/services/creative", label: "Creative Production" },
  { to: "/services/scaling", label: "Scaling Strategy" },
  { to: "/services/analytics", label: "Analytics & Tracking" },
  { to: "/services/funnel", label: "Funnel Optimization" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/75 border-b border-border">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-3 lg:py-4 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center shrink-0 leading-none" aria-label="BeingEcom home">
          <img src={logo} alt="BeingEcom" width="180" height="56" decoding="async" fetchPriority="high" className="h-10 md:h-12 lg:h-14 w-auto block" />
        </Link>
        <nav className="hidden lg:flex items-center gap-7 text-sm">
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-foreground font-semibold" }} className="text-muted-foreground hover:text-foreground transition">Home</Link>
          <div className="relative group">
            <button className="text-muted-foreground hover:text-foreground transition">Services ▾</button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
              <div className="w-72 rounded-xl border border-border bg-card p-2 shadow-2xl">
                {services.map((s) => (
                  <Link key={s.to} to={s.to} className="block px-3 py-2 rounded-lg text-sm hover:bg-secondary">
                    {s.label}
                  </Link>
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
          <button onClick={() => setOpen(!open)} className="lg:hidden text-foreground" aria-label="menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-card">
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
                    <Link key={s.to} to={s.to} className="px-3 py-2 rounded text-muted-foreground hover:bg-secondary hover:text-foreground" onClick={() => { setOpen(false); setServicesOpen(false); }}>{s.label}</Link>
                  ))}
                </div>
              )}
            </div>
            <Link to="/case-studies" className="px-3 py-2 rounded hover:bg-secondary" onClick={() => setOpen(false)}>Case Studies</Link>
            <Link to="/audit" className="px-3 py-2 rounded hover:bg-secondary" onClick={() => setOpen(false)}>Store Audit</Link>
            <Link to="/about" className="px-3 py-2 rounded hover:bg-secondary" onClick={() => setOpen(false)}>About</Link>
            <Link to="/contact" className="px-3 py-2 rounded hover:bg-secondary" onClick={() => setOpen(false)}>Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
}
