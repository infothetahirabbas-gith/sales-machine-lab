import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X, MapPin, Briefcase, Languages, Sparkles } from "lucide-react";
import logoAsset from "@/assets/being-ecom-logo.jpeg.asset.json";
import { LOCATIONS, INDUSTRIES } from "@/lib/locations-industries";
import { setSiteLanguage } from "@/components/site/GoogleTranslate";


const logo = logoAsset.url;

const LANG_OPTIONS = [
  { code: "en", name: "English" },
  { code: "es", name: "Español (Spanish)" },
  { code: "pl", name: "Polski (Polish)" },
  { code: "ro", name: "Română (Romanian)" },
  { code: "pt", name: "Português (Portuguese)" },
  { code: "de", name: "Deutsch (German)" },
  { code: "fr", name: "Français (French)" },
];
const PREFS_KEY = "beingecom_welcome_v1_prefs";
type Prefs = { country: string; location: string; industry: string; service: string; language: string };

type ServiceItem = { to: string; label: string; children?: { to: string; label: string }[] };

const services: ServiceItem[] = [
  {
    to: "/services/seo",
    label: "Ecommerce SEO",
    children: [
      { to: "/services/seo/on-page", label: "On-Page SEO" },
      { to: "/services/seo/off-page", label: "Off-Page SEO" },
      { to: "/services/seo/technical", label: "Technical SEO" },
      { to: "/services/seo/local", label: "Local SEO" },
      { to: "/services/seo/aeo", label: "AEO / AI Search" },
      { to: "/services/seo/international", label: "International SEO" },
    ],
  },
  {
    to: "/services/performance-marketing",
    label: "Performance Marketing",
    children: [
      { to: "/services/performance-marketing/facebook-ads", label: "Facebook Ads" },
      { to: "/services/performance-marketing/instagram-ads", label: "Instagram Ads" },
      { to: "/services/performance-marketing/tiktok-ads", label: "TikTok Ads" },
      { to: "/services/performance-marketing/google-ads", label: "Google Ads" },
      { to: "/services/performance-marketing/youtube-ads", label: "YouTube Ads" },
      { to: "/services/performance-marketing/media-buying", label: "Media Buying" },
    ],
  },
  {
    to: "/services/store-development",
    label: "Store Development",
    children: [
      { to: "/services/store-development/shopify", label: "Shopify Store Development" },
      { to: "/services/store-development/woocommerce", label: "WooCommerce Store Development" },
    ],
  },
  { to: "/services/cro", label: "Conversion Rate Optimisation" },
  { to: "/services/creative", label: "Creative Testing" },
  { to: "/services/email-sms", label: "Email Marketing" },
  { to: "/services/ai-automation", label: "AI Automation" },
];

export const locations = [
  { to: "/locations/london", label: "London" },
  { to: "/locations/manchester", label: "Manchester" },
  { to: "/locations/birmingham", label: "Birmingham" },
  { to: "/locations/leeds", label: "Leeds" },
  { to: "/locations/bristol", label: "Bristol" },
  { to: "/locations/liverpool", label: "Liverpool" },
  { to: "/locations/glasgow", label: "Glasgow" },
  { to: "/locations/edinburgh", label: "Edinburgh" },
];

export const industries = [
  { to: "/industries/fashion-apparel", label: "Fashion & Apparel" },
  { to: "/industries/beauty-skincare", label: "Beauty & Skincare" },
  { to: "/industries/health-supplements", label: "Health & Supplements" },
  { to: "/industries/home-garden", label: "Home & Garden" },
  { to: "/industries/electronics", label: "Electronics & Gadgets" },
  { to: "/industries/food-beverage", label: "Food & Beverage" },
  { to: "/industries/jewellery", label: "Jewellery & Watches" },
  { to: "/industries/pets", label: "Pets & Accessories" },
];

export const caseStudyCategories = [
  { to: "/case-studies?category=website", label: "Website" },
  { to: "/case-studies?category=ads", label: "Ads" },
  { to: "/case-studies?category=seo", label: "SEO" },
  { to: "/case-studies?category=cro", label: "CRO" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [openServiceChildren, setOpenServiceChildren] = useState<Record<string, boolean>>({});
  const [caseStudiesOpen, setCaseStudiesOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  const navigate = useNavigate();
  const [prefs, setPrefs] = useState<Prefs | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = sessionStorage.getItem(PREFS_KEY);
      if (raw) setPrefs(JSON.parse(raw));
    } catch {}
  }, [pathname]);

  const updatePref = (key: keyof Prefs, value: string) => {
    const next: Prefs = { ...(prefs ?? { country: "uk", location: "london", industry: "fashion-apparel", service: "seo", language: "en" }), [key]: value };
    setPrefs(next);
    try { sessionStorage.setItem(PREFS_KEY, JSON.stringify(next)); } catch {}
    if (key === "language") {
      setSiteLanguage(value);
      return;
    }
    navigate({ to: "/$lang/$location/$industry/$service", params: { lang: next.language, location: next.location, industry: next.industry, service: next.service } });
  };


  
  const cityLabel = LOCATIONS.find((l) => l.slug === prefs?.location)?.city ?? "London";
  const industryLabel = INDUSTRIES.find((i) => i.slug === prefs?.industry)?.name ?? "Industry";
  const langLabel = LANG_OPTIONS.find((l) => l.code === prefs?.language)?.name ?? "English";

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border">
      <div className="border-b border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 min-h-8 py-1 flex items-center justify-start gap-2 flex-wrap text-[11px] text-muted-foreground">
          <span className="order-1 lg:order-none inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 font-semibold" title="Country">
            <span aria-hidden="true">🇬🇧</span> UK
          </span>
          <label className="order-2 lg:order-none relative inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 font-semibold cursor-pointer hover:border-primary transition" title="Change city">
            <MapPin className="size-3" />
            <span>{cityLabel}</span>
            <ChevronDown className="size-3 opacity-60" />
            <select
              value={prefs?.location ?? "london"}
              onChange={(e) => updatePref("location", e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer"
              aria-label="Change city"
            >
              {LOCATIONS.map((l) => (<option key={l.slug} value={l.slug}>{l.city}</option>))}
            </select>
          </label>
          <label className="order-3 lg:order-none relative inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 font-semibold cursor-pointer hover:border-primary transition" title="Change language">
            <Languages className="size-3" />
            <span>{langLabel}</span>
            <ChevronDown className="size-3 opacity-60" />
            <select
              value={prefs?.language ?? "en"}
              onChange={(e) => updatePref("language", e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer"
              aria-label="Change language"
            >
              {LANG_OPTIONS.map((l) => (<option key={l.code} value={l.code}>{l.name}</option>))}
            </select>
          </label>
          {/* Mobile-only line break after Language */}
          <div className="order-4 basis-full h-0 lg:hidden" aria-hidden="true" />
          <label className="order-5 lg:order-none relative inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 font-semibold cursor-pointer hover:border-primary transition" title="Change industry">
            <Briefcase className="size-3" />
            <span className="truncate max-w-[140px]">{industryLabel}</span>
            <ChevronDown className="size-3 opacity-60" />
            <select
              value={prefs?.industry ?? "fashion-apparel"}
              onChange={(e) => updatePref("industry", e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer"
              aria-label="Change industry"
            >
              {INDUSTRIES.map((i) => (<option key={i.slug} value={i.slug}>{i.name}</option>))}
            </select>
          </label>
          <label className="order-6 lg:order-none relative inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 font-semibold cursor-pointer hover:border-primary transition" title="Jump to service">
            <Sparkles className="size-3" />
            <span className="truncate max-w-[120px]">Services</span>
            <ChevronDown className="size-3 opacity-60" />
            <select
              value=""
              onChange={(e) => { if (e.target.value) navigate({ to: e.target.value }); }}
              className="absolute inset-0 opacity-0 cursor-pointer"
              aria-label="Jump to service"
            >
              <option value="" disabled>Choose a service…</option>
              {services.map((s) => (
                <optgroup key={s.to} label={s.label}>
                  <option value={s.to}>{s.label} — Overview</option>
                  {s.children?.map((c) => (
                    <option key={c.to} value={c.to}>↳ {c.label}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </label>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 lg:px-8 h-16 lg:h-20 flex items-center justify-between gap-2 lg:gap-6">
        <Link to="/" className="flex items-center shrink-0 leading-none min-w-0" aria-label="BeingEcom home">
          <img src={logo} alt="Being Ecom" width="680" height="200" decoding="async" fetchPriority="high" className="h-12 md:h-11 lg:h-14 w-auto block object-contain" />
        </Link>
        <nav className="hidden lg:flex items-center gap-6 text-sm">
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-foreground font-semibold" }} className="text-muted-foreground hover:text-foreground transition">Home</Link>
          {isHome && (
            <>
              <div className="relative group">
                <button className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition">Locations <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" /></button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                  <div className="w-64 rounded-2xl border border-border bg-background p-2 shadow-[0_24px_70px_-30px_color-mix(in_oklab,var(--ink)_35%,transparent)]">
                    {locations.map((l) => (
                      <Link key={l.to} to={l.to} className="block px-3 py-2 rounded-lg text-sm hover:bg-accent/10 hover:text-foreground transition-colors">
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="relative group">
                <button className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition">Industries <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" /></button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                  <div className="w-72 rounded-2xl border border-border bg-background p-2 shadow-[0_24px_70px_-30px_color-mix(in_oklab,var(--ink)_35%,transparent)]">
                    {industries.map((i) => (
                      <Link key={i.to} to={i.to} className="block px-3 py-2 rounded-lg text-sm hover:bg-accent/10 hover:text-foreground transition-colors">
                        {i.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="relative group static lg:static">
            <button className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition">Services <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" /></button>
            <div className="absolute left-0 right-0 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition z-50">
              <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <div className="rounded-2xl border border-border bg-background p-6 shadow-[0_24px_70px_-30px_color-mix(in_oklab,var(--ink)_35%,transparent)]">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-5">
                    {services.map((s) => (
                      <div key={s.to} className="min-w-0">
                        <Link
                          to={s.to}
                          className="block text-sm font-semibold text-foreground hover:text-primary transition-colors mb-2 pb-2 border-b border-border"
                        >
                          {s.label}
                        </Link>
                        {s.children && (
                          <div className="grid gap-1">
                            {s.children.map((c) => (
                              <Link
                                key={c.to}
                                to={c.to}
                                className="block px-2 py-1 rounded-md text-xs text-muted-foreground hover:bg-accent/10 hover:text-foreground transition-colors"
                              >
                                {c.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 pt-4 border-t border-border flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">7 core services · 14 specialisations</span>
                    <Link to="/services" className="font-semibold text-primary hover:underline">View all services →</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link to="/case-studies" className="text-muted-foreground hover:text-foreground transition">Case Studies</Link>
          <Link to="/audit" className="text-muted-foreground hover:text-foreground transition">Store Audit</Link>
          <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition">Pricing</Link>
          <Link to="/about" className="text-muted-foreground hover:text-foreground transition">About</Link>
          <Link to="/contact" className="text-muted-foreground hover:text-foreground transition">Contact</Link>
        </nav>
        <div className="flex items-center gap-2 shrink-0">
          <Link to="/contact" className="hidden lg:inline-flex items-center rounded-full bg-primary text-primary-foreground font-semibold whitespace-nowrap shadow-sm hover:bg-primary/90 transition-colors text-sm px-4 py-2">
            Book Strategy Call →
          </Link>
           <button onClick={() => setOpen(!open)} className="lg:hidden shrink-0 size-11 rounded-xl border-2 border-foreground bg-background inline-flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
             {open ? <X className="size-6" strokeWidth={2.5} /> : <Menu className="size-6" strokeWidth={2.5} />}
          </button>
        </div>

      </div>

      {open && (
         <div className="lg:hidden border-t border-border bg-background shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto overscroll-contain">
          <div className="px-5 py-3 pb-8 grid gap-1 text-sm">
            <Link to="/" className="px-3 py-2 rounded hover:bg-secondary" onClick={() => setOpen(false)}>Home</Link>
            <div>
              <button
                onClick={() => setLocationsOpen(!locationsOpen)}
                className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-secondary"
                aria-expanded={locationsOpen}
              >
                <span>Locations</span>
                <span className={`transition-transform ${locationsOpen ? "rotate-180" : ""}`}>▾</span>
              </button>
              {locationsOpen && (
                <div className="mt-1 ml-3 pl-3 border-l border-border grid gap-1">
                  {locations.map((l) => (
                    <Link key={l.to} to={l.to} className="px-3 py-1.5 rounded text-sm text-muted-foreground hover:bg-secondary hover:text-foreground block" onClick={() => { setOpen(false); setLocationsOpen(false); }}>{l.label}</Link>
                  ))}
                </div>
              )}
            </div>
            <div>
              <button
                onClick={() => setIndustriesOpen(!industriesOpen)}
                className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-secondary"
                aria-expanded={industriesOpen}
              >
                <span>Industries</span>
                <span className={`transition-transform ${industriesOpen ? "rotate-180" : ""}`}>▾</span>
              </button>
              {industriesOpen && (
                <div className="mt-1 ml-3 pl-3 border-l border-border grid gap-1">
                  {industries.map((i) => (
                    <Link key={i.to} to={i.to} className="px-3 py-1.5 rounded text-sm text-muted-foreground hover:bg-secondary hover:text-foreground block" onClick={() => { setOpen(false); setIndustriesOpen(false); }}>{i.label}</Link>
                  ))}
                </div>
              )}
            </div>
            <div>
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-secondary font-medium"
                aria-expanded={servicesOpen}
              >
                <span>Services</span>
                <span className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`}>▾</span>
              </button>
              {servicesOpen && (
                <div className="mt-1 ml-3 pl-3 border-l border-border grid gap-1">
                  {services.map((s) => {
                    const hasChildren = !!s.children?.length;
                    const isOpen = !!openServiceChildren[s.to];
                    return (
                      <div key={s.to}>
                        {hasChildren ? (
                          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-stretch">
                            <Link
                              to={s.to}
                              className="min-w-0 px-3 py-2 rounded-l text-foreground font-medium hover:bg-secondary truncate"
                              onClick={() => { setOpen(false); setServicesOpen(false); }}
                            >
                              {s.label}
                            </Link>
                            <button
                              type="button"
                              onClick={() => setOpenServiceChildren((prev) => ({ ...prev, [s.to]: !prev[s.to] }))}
                              className="shrink-0 px-3 py-2 rounded-r hover:bg-secondary text-muted-foreground"
                              aria-expanded={isOpen}
                              aria-label={`Toggle ${s.label} sub-services`}
                            >
                              <ChevronDown className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                            </button>
                          </div>
                        ) : (
                          <Link
                            to={s.to}
                            className="block px-3 py-2 rounded text-foreground font-medium hover:bg-secondary"
                            onClick={() => { setOpen(false); setServicesOpen(false); }}
                          >
                            {s.label}
                          </Link>
                        )}
                        {hasChildren && isOpen && (
                          <div className="ml-3 pl-3 border-l border-border grid gap-1 my-1">
                            {s.children!.map((c) => (
                              <Link
                                key={c.to}
                                to={c.to}
                                className="px-3 py-1.5 rounded text-xs text-muted-foreground hover:bg-secondary hover:text-foreground block"
                                onClick={() => { setOpen(false); setServicesOpen(false); }}
                              >
                                {c.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-stretch">
                <Link
                  to="/case-studies"
                  className="min-w-0 px-3 py-2 rounded-l hover:bg-secondary truncate"
                  onClick={() => setOpen(false)}
                >
                  Case Studies
                </Link>
                <button
                  type="button"
                  onClick={() => setCaseStudiesOpen((v) => !v)}
                  className="shrink-0 px-3 py-2 rounded-r hover:bg-secondary text-muted-foreground"
                  aria-expanded={caseStudiesOpen}
                  aria-label="Toggle case study categories"
                >
                  <ChevronDown className={`size-4 transition-transform ${caseStudiesOpen ? "rotate-180" : ""}`} />
                </button>
              </div>
              {caseStudiesOpen && (
                <div className="mt-1 ml-3 pl-3 border-l border-border grid gap-1">
                  {caseStudyCategories.map((c) => (
                    <Link
                      key={c.to}
                      to="/case-studies"
                      search={{ category: c.to.split("=")[1] }}
                      className="px-3 py-1.5 rounded text-xs text-muted-foreground hover:bg-secondary hover:text-foreground block"
                      onClick={() => { setOpen(false); setCaseStudiesOpen(false); }}
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
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
