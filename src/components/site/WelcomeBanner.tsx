import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Globe, MapPin, Briefcase, Sparkles, Languages, ArrowRight, Check } from "lucide-react";
import { LOCATIONS, INDUSTRIES } from "../../lib/locations-industries";
import logoAsset from "@/assets/being-ecom-logo.jpeg.asset.json";


const LOGO_URL = logoAsset.url;

const COUNTRIES = [
  { code: "uk", name: "United Kingdom", flag: "🇬🇧" },
];

const SERVICES = [
  { slug: "seo", name: "Ecommerce SEO" },
  { slug: "performance-marketing", name: "Performance Marketing" },
  { slug: "cro", name: "Conversion Rate Optimisation" },
  { slug: "email-sms", name: "Email & SMS Marketing" },
  { slug: "store-development", name: "Store Development" },
  { slug: "creative", name: "Creative Production" },
  { slug: "ai-automation", name: "AI Automation" },
];

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Español (Spanish)" },
  { code: "pl", name: "Polski (Polish)" },
  { code: "ro", name: "Română (Romanian)" },
  { code: "pt", name: "Português (Portuguese)" },
  { code: "de", name: "Deutsch (German)" },
  { code: "fr", name: "Français (French)" },
];

const STORAGE_KEY = "beingecom_welcome_v1";

type Step = 0 | 1 | 2 | 3 | 4;

export default function WelcomeBanner() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>(0);
  const [country, setCountry] = useState("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");
  const [service, setService] = useState("");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Re-show the banner on any fresh visit. A completion is only honoured
    // for 30 minutes of continuous activity; after that (tab closed, or user
    // returns later), the banner starts from scratch.
    const TTL_MS = 5 * 60 * 1000;
    const ts = Number(sessionStorage.getItem(`${STORAGE_KEY}_ts`) || 0);
    const fresh = ts && Date.now() - ts < TTL_MS;
    if (!fresh) {
      sessionStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(`${STORAGE_KEY}_ts`);
      sessionStorage.removeItem(`${STORAGE_KEY}_prefs`);
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  if (!open) return null;

  const stepValues = [country, location, industry, service, language];
  const currentSelected = !!stepValues[step];

  const goNext = () => {
    if (!currentSelected) return;
    if (step < 4) setStep((step + 1) as Step);
  };

  const submit = () => {
    if (!currentSelected) return;
    sessionStorage.setItem(STORAGE_KEY, "1");
    sessionStorage.setItem(`${STORAGE_KEY}_ts`, String(Date.now()));
    sessionStorage.setItem(
      `${STORAGE_KEY}_prefs`,
      JSON.stringify({ country, location, industry, service, language })
    );
    setOpen(false);
    try { localStorage.setItem("site_lang", language); } catch {}
    const target = `/${language}/${location}/${industry}/${service}`;
    if (language && language !== "en") {
      // Set Google Translate cookie then hard-navigate so the target page
      // renders in the chosen language.
      const host = window.location.hostname;
      const value = `/en/${language}`;
      for (const d of ["", host, `.${host}`]) {
        document.cookie = `googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT${d ? `; domain=${d}` : ""}`;
        document.cookie = `googtrans=${value}; path=/${d ? `; domain=${d}` : ""}`;
      }
      window.location.href = target;
      return;
    }
    // English: clear any prior translation cookie, then SPA-navigate.
    for (const d of ["", window.location.hostname, `.${window.location.hostname}`]) {
      document.cookie = `googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT${d ? `; domain=${d}` : ""}`;
    }
    navigate({
      to: "/$lang/$location/$industry/$service",
      params: { lang: language, location, industry, service },
    });
  };
  

  const steps = [
    { icon: Globe, label: "Country" },
    { icon: MapPin, label: "City" },
    { icon: Briefcase, label: "Industry" },
    { icon: Sparkles, label: "Service" },
    { icon: Languages, label: "Language" },
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
      style={{ animation: "fadeIn 0.3s ease-out both" }}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to BeingEcom"
    >
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-background shadow-[0_60px_120px_-30px_rgba(0,0,0,0.5)] border border-border/50"
        style={{ animation: "scaleIn 0.4s cubic-bezier(0.16,1,0.3,1) both" }}
      >
        {/* Decorative gradient */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/20 blur-3xl pointer-events-none" />

        {/* Header with logo */}
        <div className="relative px-6 pt-8 pb-4 text-center">
          <img
            src={LOGO_URL}
            alt="BeingEcom"
            className="mx-auto h-16 w-auto object-contain drop-shadow-md"
            loading="eager"
          />
          <h2 className="mt-4 text-2xl md:text-3xl font-bold text-ink">
            Welcome to <span className="text-brand">BeingEcom</span>
          </h2>
          <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-md mx-auto">
            Personalise your experience in 5 quick steps and we'll route you to the right growth plan.
          </p>

          {/* Progress */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {steps.map((s, i) => {
              const Ic = s.icon;
              const active = i === step;
              const done = i < step;
              return (
                <div key={s.label} className="flex items-center">
                  <div
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                      active
                        ? "bg-primary text-primary-foreground shadow-md"
                        : done
                        ? "bg-primary/10 text-primary"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {done ? <Check className="w-3.5 h-3.5" /> : <Ic className="w-3.5 h-3.5" />}
                    <span className="hidden sm:inline">{s.label}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`w-3 sm:w-6 h-px mx-0.5 ${done ? "bg-primary" : "bg-border"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step body */}
        <div className="px-6 pb-6 max-h-[45vh] overflow-y-auto">
          {step === 0 && (
            <Grid>
              {COUNTRIES.map((c) => (
                <Choice
                  key={c.code}
                  active={country === c.code}
                  onClick={() => setCountry(c.code)}
                  title={<span className="flex items-center gap-2"><span className="text-lg">{c.flag}</span>{c.name}</span>}
                />
              ))}
            </Grid>
          )}
          {step === 1 && (
            <Dropdown
              label="Select your city"
              value={location}
              onChange={setLocation}
              placeholder="Choose a city…"
              options={LOCATIONS.map((l) => ({ value: l.slug, label: `${l.city} — ${l.region}` }))}
            />
          )}
          {step === 2 && (
            <Dropdown
              label="Select your industry"
              value={industry}
              onChange={setIndustry}
              placeholder="Choose an industry…"
              options={INDUSTRIES.map((i) => ({ value: i.slug, label: i.name }))}
            />
          )}
          {step === 3 && (
            <Dropdown
              label="Select the service you need"
              value={service}
              onChange={setService}
              placeholder="Choose a service…"
              options={SERVICES.map((s) => ({ value: s.slug, label: s.name }))}
            />
          )}
          {step === 4 && (
            <Dropdown
              label="Select your language"
              value={language}
              onChange={setLanguage}
              placeholder="Choose a language…"
              options={LANGUAGES.map((l) => ({ value: l.code, label: l.name }))}
            />
          )}
        </div>

        {/* Footer actions — sticky, prominent CTA */}
        <div className="sticky bottom-0 border-t-2 border-primary/20 px-5 py-4 md:py-5 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-background shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.15)]">
          <button
            onClick={() => step > 0 && setStep((step - 1) as Step)}
            disabled={step === 0}
            className="text-sm font-semibold text-muted-foreground hover:text-ink transition disabled:opacity-30 disabled:cursor-not-allowed py-2 sm:py-0"
          >
            ← Back
          </button>
          {step < 4 ? (
            <button
              onClick={goNext}
              disabled={!currentSelected}
              className="btn btn-primary btn-shimmer w-full sm:w-auto justify-center text-base font-bold px-8 py-4 rounded-xl shadow-lg shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {currentSelected ? "Continue" : "Select an option"} <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={submit}
              disabled={!currentSelected}
              className="btn btn-primary btn-shimmer w-full sm:w-auto justify-center text-base font-bold px-8 py-4 rounded-xl shadow-lg shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Personalise My Experience <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 pt-2">{children}</div>;
}

function Choice({
  active,
  onClick,
  title,
  sub,
}: {
  active: boolean;
  onClick: () => void;
  title: React.ReactNode;
  sub?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-left px-4 py-3 rounded-xl border-2 transition group ${
        active
          ? "border-primary bg-primary/5 shadow-md"
          : "border-border hover:border-primary/40 hover:bg-secondary"
      }`}
    >
      <div className={`text-sm font-semibold ${active ? "text-primary" : "text-ink"}`}>{title}</div>
      {sub && <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>}
    </button>
  );
}

function Dropdown({
  label,
  value,
  onChange,
  placeholder,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="pt-4 pb-2">
      <label className="block text-sm font-semibold text-ink mb-2">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full appearance-none rounded-xl border-2 bg-background px-4 py-4 pr-12 text-base font-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-primary/30 ${
            value ? "border-primary text-ink" : "border-border text-muted-foreground"
          }`}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <ArrowRight className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 rotate-90 text-muted-foreground" />
      </div>
    </div>
  );
}
