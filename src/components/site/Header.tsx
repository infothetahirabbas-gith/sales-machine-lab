import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X, MapPin, Briefcase, Languages, Sparkles } from "lucide-react";
import logoAsset from "@/assets/being-ecom-logo.webp.asset.json";
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
const DEFAULT_PREFS: Prefs = { country: "uk", location: "london", industry: "fashion-apparel", service: "seo", language: "en" };

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
  { to: "/services/funnel", label: "Funnel & Landing Pages" },
  { to: "/services/analytics", label: "Analytics & Tracking" },
  { to: "/services/scaling", label: "Scaling & Retention" },
];

export const locations = [
  { to: "/locations/london", label: "London" },
  { to: "/locations/manchester", label: "Manchester" },
  { to: "/locations/birmingham", label: "Birmingham" },
  { to: "/locations/glasgow", label: "Glasgow" },
  { to: "/locations/bristol", label: "Bristol" },
  { to: "/locations/leeds", label: "Leeds" },
  { to: "/locations/liverpool", label: "Liverpool" },
  { to: "/locations/leicester", label: "Leicester" },
  { to: "/locations/nottingham", label: "Nottingham" },
  { to: "/locations/edinburgh", label: "Edinburgh" },
  { to: "/locations/sheffield", label: "Sheffield" },
  { to: "/locations/poole", label: "Poole" },
  { to: "/locations/newcastle-upon-tyne", label: "Newcastle upon Tyne" },
  { to: "/locations/bradford", label: "Bradford" },
];

type IndustryItem = { to: string; label: string; children?: { to: string; label: string }[] };

export const industries: IndustryItem[] = [
  {
    to: "/industries/fashion-apparel",
    label: "Fashion & Apparel",
    children: [
      { to: "/industries/fashion-apparel#womens-fashion", label: "Women's Fashion" },
      { to: "/industries/fashion-apparel#mens-fashion", label: "Men's Fashion" },
      { to: "/industries/fashion-apparel#streetwear-sportswear", label: "Streetwear & Sportswear" },
      { to: "/industries/fashion-apparel#luxury-fashion", label: "Luxury Fashion" },
      { to: "/industries/fashion-apparel#footwear", label: "Footwear" },
      { to: "/industries/fashion-apparel#handbags-accessories", label: "Handbags & Accessories" },
    ],
  },
  {
    to: "/industries/beauty-personal-care",
    label: "Beauty & Personal Care",
    children: [
      { to: "/industries/beauty-personal-care#skincare", label: "Skincare" },
      { to: "/industries/beauty-personal-care#haircare", label: "Haircare" },
      { to: "/industries/beauty-personal-care#makeup-cosmetics", label: "Makeup & Cosmetics" },
      { to: "/industries/beauty-personal-care#mens-grooming", label: "Men's Grooming" },
      { to: "/industries/beauty-personal-care#fragrances-perfumes", label: "Fragrances & Perfumes" },
    ],
  },
  {
    to: "/industries/electronics-technology",
    label: "Electronics & Technology",
    children: [
      { to: "/industries/electronics-technology#consumer-electronics", label: "Consumer Electronics" },
      { to: "/industries/electronics-technology#mobile-computer-accessories", label: "Mobile & Computer Accessories" },
      { to: "/industries/electronics-technology#gaming", label: "Gaming" },
      { to: "/industries/electronics-technology#smart-home", label: "Smart Home" },
      { to: "/industries/electronics-technology#audio-wearables", label: "Audio & Wearables" },
    ],
  },
  {
    to: "/industries/home-garden",
    label: "Home & Garden",
    children: [
      { to: "/industries/home-garden#homeware-decor", label: "Homeware & Décor" },
      { to: "/industries/home-garden#kitchen-dining", label: "Kitchen & Dining" },
      { to: "/industries/home-garden#garden-outdoor", label: "Garden & Outdoor Living" },
      { to: "/industries/home-garden#diy-home-improvement", label: "DIY & Home Improvement" },
    ],
  },
  {
    to: "/industries/food-beverage",
    label: "Food & Beverage",
    children: [
      { to: "/industries/food-beverage#organic-health-food", label: "Organic & Health Food" },
      { to: "/industries/food-beverage#coffee-tea", label: "Coffee & Tea" },
      { to: "/industries/food-beverage#subscription-meal-kits", label: "Subscription Meal Kits" },
      { to: "/industries/food-beverage#wine-spirits", label: "Wine & Spirits" },
    ],
  },
  {
    to: "/industries/health-wellness",
    label: "Health & Wellness",
    children: [
      { to: "/industries/health-wellness#vitamins-supplements", label: "Vitamins & Supplements" },
      { to: "/industries/health-wellness#sports-nutrition", label: "Sports Nutrition" },
      { to: "/industries/health-wellness#cbd-wellness", label: "CBD & Wellness" },
    ],
  },
  {
    to: "/industries/sports-fitness",
    label: "Sports & Fitness",
    children: [
      { to: "/industries/sports-fitness#fitness-equipment", label: "Fitness Equipment & Gym Accessories" },
      { to: "/industries/sports-fitness#activewear", label: "Activewear" },
      { to: "/industries/sports-fitness#running-cycling", label: "Running & Cycling" },
      { to: "/industries/sports-fitness#yoga-outdoor", label: "Yoga & Outdoor / Adventure" },
    ],
  },
  {
    to: "/industries/furniture-interiors",
    label: "Furniture & Interiors",
    children: [
      { to: "/industries/furniture-interiors#living-bedroom", label: "Living & Bedroom Furniture" },
      { to: "/industries/furniture-interiors#office-furniture", label: "Office Furniture" },
      { to: "/industries/furniture-interiors#outdoor-furniture", label: "Outdoor Furniture" },
      { to: "/industries/furniture-interiors#soft-furnishings-storage", label: "Soft Furnishings & Storage" },
    ],
  },
  {
    to: "/industries/baby-kids",
    label: "Baby & Kids",
    children: [
      { to: "/industries/baby-kids#baby-clothing-gear", label: "Baby Clothing & Gear" },
      { to: "/industries/baby-kids#kids-fashion", label: "Kids Fashion" },
      { to: "/industries/baby-kids#toys-educational", label: "Toys & Educational Toys" },
      { to: "/industries/baby-kids#maternity", label: "Maternity" },
    ],
  },
  {
    to: "/industries/jewellery-watches",
    label: "Jewellery & Watches",
    children: [
      { to: "/industries/jewellery-watches#fine-jewellery", label: "Fine Jewellery" },
      { to: "/industries/jewellery-watches#fashion-jewellery", label: "Fashion Jewellery" },
      { to: "/industries/jewellery-watches#watches", label: "Watches" },
      { to: "/industries/jewellery-watches#engagement-wedding", label: "Engagement & Wedding" },
    ],
  },
  {
    to: "/industries/pets-supplies",
    label: "Pets & Pet Supplies",
    children: [
      { to: "/industries/pets-supplies#dog-supplies", label: "Dog Supplies" },
      { to: "/industries/pets-supplies#cat-supplies", label: "Cat Supplies" },
      { to: "/industries/pets-supplies#pet-food-treats", label: "Pet Food & Treats" },
      { to: "/industries/pets-supplies#pet-healthcare-grooming", label: "Pet Healthcare & Grooming" },
    ],
  },
  {
    to: "/industries/arts-prints-stationery",
    label: "Arts, Prints & Stationery",
    children: [
      { to: "/industries/arts-prints-stationery#wall-art-prints", label: "Wall Art & Prints" },
      { to: "/industries/arts-prints-stationery#stationery-planners", label: "Stationery & Planners" },
      { to: "/industries/arts-prints-stationery#craft-supplies", label: "Craft Supplies" },
      { to: "/industries/arts-prints-stationery#personalised-gifts", label: "Personalised Gifts" },
    ],
  },
];

export const caseStudyCategories = [
  { to: "/case-studies?category=website", label: "Website" },
  { to: "/case-studies?category=ads", label: "Ads" },
  { to: "/case-studies?category=seo", label: "SEO" },
  { to: "/case-studies?category=cro", label: "CRO" },
];

function prefsFromPath(pathname: string): Partial<Prefs> {
  const parts = pathname.split("/").filter(Boolean).map((part) => {
    try {
      return decodeURIComponent(part);
    } catch {
      return part;
    }
  });
  const next: Partial<Prefs> = {};
  const isLocation = (slug?: string) => !!slug && LOCATIONS.some((l) => l.slug === slug);
  const isIndustry = (slug?: string) => !!slug && INDUSTRIES.some((i) => i.slug === slug);
  const isLanguage = (code?: string) => !!code && LANG_OPTIONS.some((l) => l.code === code);
  const isService = (slug?: string) => !!slug && services.some((s) => s.to === `/services/${slug}`);

  if (parts[0] === "locations" && isLocation(parts[1])) next.location = parts[1];
  if (parts[0] === "industries" && isIndustry(parts[1])) next.industry = parts[1];
  if (parts[0] === "services" && isService(parts[1])) next.service = parts[1];

  if (isLanguage(parts[0]) && isLocation(parts[1]) && isIndustry(parts[2])) {
    next.language = parts[0];
    next.location = parts[1];
    next.industry = parts[2];
    if (isService(parts[3])) next.service = parts[3];
  }

  return next;
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [openServiceChildren, setOpenServiceChildren] = useState<Record<string, boolean>>({});
  const [caseStudiesOpen, setCaseStudiesOpen] = useState(false);
  // Desktop hover-menu state with close delay so moving the cursor into the
  // panel does not accidentally dismiss it.
  const [desktopMenu, setDesktopMenu] = useState<null | "locations" | "industries" | "services">(null);
  const [activeIndustry, setActiveIndustry] = useState<string>(industries[0].to);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const [prefs, setPrefs] = useState<Prefs | null>(null);
  const currentPrefs: Prefs = { ...DEFAULT_PREFS, ...(prefs ?? {}), ...prefsFromPath(pathname) };

  // Delay closing so cursor can travel from trigger button to panel items.
  const closeTimer = useRef<number | null>(null);
  const openMenu = (name: "locations" | "industries" | "services") => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setDesktopMenu(name);
  };
  const scheduleClose = () => {
    if (typeof window === "undefined") return;
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setDesktopMenu(null), 800);
  };



  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = sessionStorage.getItem(PREFS_KEY);
      const stored = raw ? JSON.parse(raw) : {};
      const next = { ...DEFAULT_PREFS, ...stored, ...prefsFromPath(pathname) };
      setPrefs(next);
      sessionStorage.setItem(PREFS_KEY, JSON.stringify(next));
    } catch {}
  }, [pathname]);

  // Body scroll lock while the mobile menu is open — prevents background
  // scroll bleed on iOS and keeps focus trapped inside the panel.
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // Close the mobile menu on route change so navigating from a link inside
  // it doesn't leave the panel stuck open on the next page.
  useEffect(() => { setOpen(false); }, [pathname]);


  const updatePref = (key: keyof Prefs, value: string) => {
    const next: Prefs = { ...currentPrefs, [key]: value };
    setPrefs(next);
    try { sessionStorage.setItem(PREFS_KEY, JSON.stringify(next)); } catch {}
    if (key === "language") {
      setSiteLanguage(value);
      return;
    }
    navigate({ to: "/$lang/$location/$industry/$service", params: { lang: next.language, location: next.location, industry: next.industry, service: next.service } });
  };


  
  const cityLabel = LOCATIONS.find((l) => l.slug === currentPrefs.location)?.city ?? "London";
  const industryLabel = INDUSTRIES.find((i) => i.slug === currentPrefs.industry)?.name ?? "Fashion & Apparel";
  const langLabel = LANG_OPTIONS.find((l) => l.code === currentPrefs.language)?.name ?? "English";

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border pt-[env(safe-area-inset-top)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
      <div className="border-b border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 min-h-8 py-1 flex items-center justify-start gap-2 flex-wrap text-[11px] text-muted-foreground">
          <span className="order-1 lg:order-none inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 min-h-8 font-semibold" title="Country">
            <span aria-hidden="true">🇬🇧</span> UK
          </span>
          <label className="order-2 lg:order-none relative inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 min-h-8 font-semibold cursor-pointer hover:border-primary transition" title="Change city">
            <MapPin className="size-3" />
            <span>{cityLabel}</span>
            <ChevronDown className="size-3 opacity-60" />
            <select
              value={currentPrefs.location}
              onChange={(e) => updatePref("location", e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer"
              aria-label="Change city"
            >
              {LOCATIONS.map((l) => (<option key={l.slug} value={l.slug}>{l.city}</option>))}
            </select>
          </label>
          <label className="order-3 lg:order-none relative inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 min-h-8 font-semibold cursor-pointer hover:border-primary transition" title="Change language">
            <Languages className="size-3" />
            <span>{langLabel}</span>
            <ChevronDown className="size-3 opacity-60" />
            <select
              value={currentPrefs.language}
              onChange={(e) => updatePref("language", e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer"
              aria-label="Change language"
            >
              {LANG_OPTIONS.map((l) => (<option key={l.code} value={l.code}>{l.name}</option>))}
            </select>
          </label>
          {/* Mobile-only line break after Language */}
          <div className="order-4 basis-full h-0 lg:hidden" aria-hidden="true" />
          <label className="order-5 lg:order-none relative inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 min-h-8 font-semibold cursor-pointer hover:border-primary transition" title="Change industry">
            <Briefcase className="size-3" />
            <span className="truncate max-w-[140px]">{industryLabel}</span>
            <ChevronDown className="size-3 opacity-60" />
            <select
              value={currentPrefs.industry}
              onChange={(e) => updatePref("industry", e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer"
              aria-label="Change industry"
            >
              {INDUSTRIES.map((i) => (<option key={i.slug} value={i.slug}>{i.name}</option>))}
            </select>
          </label>
          <label className="order-6 lg:order-none relative inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 min-h-8 font-semibold cursor-pointer hover:border-primary transition" title="Jump to service">
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
        <Link to="/" className="flex items-center shrink min-w-0 max-w-[60vw] sm:max-w-none leading-none" aria-label="BeingEcom home">
          <img src={logo} alt="Being Ecom" width="340" height="100" decoding="async" fetchPriority="high" className="h-10 sm:h-12 md:h-11 lg:h-14 w-auto max-w-full block object-contain" />
        </Link>
        <nav className="hidden lg:flex items-center gap-6 text-sm">
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-foreground font-semibold" }} className="text-muted-foreground hover:text-foreground transition">Home</Link>
          <div
            className="relative"
            onMouseEnter={() => openMenu("locations")}
            onMouseLeave={scheduleClose}
          >
            <button className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition">Locations <ChevronDown className={`size-3.5 transition-transform ${desktopMenu === "locations" ? "rotate-180" : ""}`} /></button>
            <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition ${desktopMenu === "locations" ? "opacity-100 visible" : "opacity-0 invisible"}`}>
              <div className="w-64 rounded-2xl border border-border bg-background p-2 shadow-[0_24px_70px_-30px_color-mix(in_oklab,var(--ink)_35%,transparent)]">
                {locations.map((l) => (
                  <Link key={l.to} to={l.to} onClick={() => setDesktopMenu(null)} className="block px-3 py-2 rounded-lg text-sm hover:bg-accent/10 hover:text-foreground transition-colors">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div
            className="py-2"
            onMouseEnter={() => openMenu("industries")}
            onMouseLeave={scheduleClose}
          >
            <button
              onClick={() => setDesktopMenu(desktopMenu === "industries" ? null : "industries")}
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition"
            >
              Industries <ChevronDown className={`size-3.5 transition-transform ${desktopMenu === "industries" ? "rotate-180" : ""}`} />
            </button>
          </div>
          <div
            onMouseEnter={() => openMenu("services")}
            onMouseLeave={scheduleClose}
            className="py-2"
          >
            <button
              onClick={() => setDesktopMenu(desktopMenu === "services" ? null : "services")}
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition"
            >
              Services <ChevronDown className={`size-3.5 transition-transform ${desktopMenu === "services" ? "rotate-180" : ""}`} />
            </button>
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

      {/* Full-width Services mega menu (desktop). Anchored to the header so it
          spans the whole viewport; the trigger and this panel share hover
          intent via desktopMenu state + 220ms close delay. */}
      <div
        className={`hidden lg:block absolute left-0 right-0 top-full z-40 transition ${desktopMenu === "services" ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
        onMouseEnter={() => openMenu("services")}
        onMouseLeave={scheduleClose}
      >
        <div className="pt-3">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="rounded-2xl border border-border bg-background p-6 shadow-[0_24px_70px_-30px_color-mix(in_oklab,var(--ink)_35%,transparent)]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-5">
                {services.map((s) => (
                  <div key={s.to} className="min-w-0">
                    <Link
                      to={s.to}
                      onClick={() => setDesktopMenu(null)}
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
                            onClick={() => setDesktopMenu(null)}
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
                <span className="text-muted-foreground">10 core services · 14 specialisations</span>
                <Link to="/services" onClick={() => setDesktopMenu(null)} className="font-semibold text-primary hover:underline">View all services →</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width Industries mega menu (desktop) — Thumbtack-style two-column:
          left rail lists main industries; hovering one reveals its sub-categories
          on the right. */}
      {(() => {
        const active = industries.find((i) => i.to === activeIndustry) ?? industries[0];
        return (
      <div
        className={`hidden lg:block absolute left-0 right-0 top-full z-40 transition ${desktopMenu === "industries" ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
        onMouseEnter={() => openMenu("industries")}
        onMouseLeave={scheduleClose}
      >
        <div className="pt-3">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="rounded-2xl border border-border bg-background shadow-[0_24px_70px_-30px_color-mix(in_oklab,var(--ink)_35%,transparent)] overflow-hidden">
              <div className="grid grid-cols-[minmax(260px,320px)_1fr] min-h-[420px]">
                {/* Left rail */}
                <ul className="border-r border-border bg-secondary/30 py-2">
                  {industries.map((i) => {
                    const isActive = i.to === active.to;
                    return (
                      <li key={i.to}>
                        <Link
                          to={i.to}
                          onMouseEnter={() => setActiveIndustry(i.to)}
                          onFocus={() => setActiveIndustry(i.to)}
                          onClick={() => setDesktopMenu(null)}
                          className={`flex items-center justify-between gap-2 px-5 py-3 text-sm transition-colors ${
                            isActive
                              ? "bg-background text-foreground font-semibold"
                              : "text-muted-foreground hover:bg-background/60 hover:text-foreground"
                          }`}
                        >
                          <span>{i.label}</span>
                          <ChevronDown className={`size-3.5 -rotate-90 shrink-0 transition-opacity ${isActive ? "opacity-100" : "opacity-40"}`} />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                {/* Right panel */}
                <div className="p-6">
                  <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-border">
                    <Link
                      to={active.to}
                      onClick={() => setDesktopMenu(null)}
                      className="text-base font-semibold text-foreground hover:text-primary transition-colors"
                    >
                      {active.label}
                    </Link>
                    <Link
                      to={active.to}
                      onClick={() => setDesktopMenu(null)}
                      className="text-xs font-semibold text-primary hover:underline whitespace-nowrap"
                    >
                      View overview →
                    </Link>
                  </div>
                  {active.children && (
                    <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-1">
                      {active.children.map((c) => (
                        <Link
                          key={c.to}
                          to={c.to}
                          onClick={() => setDesktopMenu(null)}
                          className="block px-2 py-2 rounded-md text-sm text-muted-foreground hover:bg-accent/10 hover:text-foreground transition-colors"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="px-6 py-3 border-t border-border flex items-center justify-between text-xs bg-secondary/20">
                <span className="text-muted-foreground">12 industries · 55+ sub-categories</span>
                <Link to="/industries" onClick={() => setDesktopMenu(null)} className="font-semibold text-primary hover:underline">View all industries →</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
        );
      })()}





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
                <div className="mt-1 ml-3 pl-3 border-l border-border grid gap-2">
                  {industries.map((i) => (
                    <div key={i.to}>
                      <Link to={i.to} className="px-3 py-1.5 rounded text-sm font-semibold text-foreground hover:bg-secondary block" onClick={() => { setOpen(false); setIndustriesOpen(false); }}>{i.label}</Link>
                      {i.children && (
                        <div className="ml-3 pl-3 border-l border-border grid gap-0.5 mt-0.5">
                          {i.children.map((c) => (
                            <Link key={c.to} to={c.to} className="px-3 py-1 rounded text-xs text-muted-foreground hover:bg-secondary hover:text-foreground block" onClick={() => { setOpen(false); setIndustriesOpen(false); }}>{c.label}</Link>
                          ))}
                        </div>
                      )}
                    </div>
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
