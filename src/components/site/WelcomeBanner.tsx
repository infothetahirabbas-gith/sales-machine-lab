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
  { code: "en-gb", name: "English (UK)" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "ar", name: "العربية" },
];

const STORAGE_KEY = "beingecom_welcome_v1";

type Step = 0 | 1 | 2 | 3 | 4;

export default function WelcomeBanner() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>(0);
  const [country, setCountry] = useState("uk");
  const [location, setLocation] = useState("london");
  const [industry, setIndustry] = useState("fashion-apparel");
  const [service, setService] = useState("seo");
  const [language, setLanguage] = useState("en-gb");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = localStorage.getItem(STORAGE_KEY);
    if (!seen) {
      const t = setTimeout(() => setOpen(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  if (!open) return null;

  const close = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  };

  const goNext = () => {
    if (step < 4) setStep((step + 1) as Step);
  };

  const submit = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    localStorage.setItem(
      `${STORAGE_KEY}_prefs`,
      JSON.stringify({ country, location, industry, service, language })
    );
    setOpen(false);
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

        {/* Close */}
        <button
          onClick={close}
          aria-label="Skip"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-background/80 border border-border hover:bg-accent/20 flex items-center justify-center transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header with logo */}
        <div className="relative px-6 pt-8 pb-4 text-center">
          <img
            src="https://lovable-api.com/projects/de1ad5a1-cc8c-4fd1-8084-40056f4b3d61/assets/being-ecom-logo.jpeg"
            alt="BeingEcom"
            className="mx-auto h-14 w-14 rounded-2xl object-cover shadow-lg ring-2 ring-primary/30"
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
        <div className="px-6 pb-6 max-h-[55vh] overflow-y-auto">
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
            <Grid>
              {LOCATIONS.map((l) => (
                <Choice
                  key={l.slug}
                  active={location === l.slug}
                  onClick={() => setLocation(l.slug)}
                  title={l.city}
                  sub={l.region}
                />
              ))}
            </Grid>
          )}
          {step === 2 && (
            <Grid>
              {INDUSTRIES.map((i) => (
                <Choice
                  key={i.slug}
                  active={industry === i.slug}
                  onClick={() => setIndustry(i.slug)}
                  title={i.name}
                />
              ))}
            </Grid>
          )}
          {step === 3 && (
            <Grid>
              {SERVICES.map((s) => (
                <Choice
                  key={s.slug}
                  active={service === s.slug}
                  onClick={() => setService(s.slug)}
                  title={s.name}
                />
              ))}
            </Grid>
          )}
          {step === 4 && (
            <Grid>
              {LANGUAGES.map((l) => (
                <Choice
                  key={l.code}
                  active={language === l.code}
                  onClick={() => setLanguage(l.code)}
                  title={l.name}
                  sub={l.code.toUpperCase()}
                />
              ))}
            </Grid>
          )}
        </div>

        {/* Footer actions */}
        <div className="border-t border-border px-6 py-4 flex items-center justify-between gap-4 bg-secondary/30">
          <button
            onClick={() => (step === 0 ? close() : setStep((step - 1) as Step))}
            className="text-sm font-semibold text-muted-foreground hover:text-ink transition"
          >
            {step === 0 ? "Skip" : "← Back"}
          </button>
          {step < 4 ? (
            <button
              onClick={goNext}
              className="btn btn-primary btn-shimmer"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button onClick={submit} className="btn btn-primary btn-shimmer">
              Personalise My Experience <ArrowRight className="w-4 h-4" />
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
