import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Globe, MapPin, Briefcase, Sparkles, Languages, ArrowRight, Check } from "lucide-react";
import { LOCATIONS, INDUSTRIES } from "../../lib/locations-industries";
import logoAsset from "@/assets/being-ecom-logo.jpeg.asset.json";
import { setSiteLanguage } from "@/components/site/GoogleTranslate";

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
            onClick={() => step > 0 && setStep((step - 1) as Step)}
            disabled={step === 0}
            className="text-sm font-semibold text-muted-foreground hover:text-ink transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← Back
          </button>
          {step < 4 ? (
            <button
              onClick={goNext}
              disabled={!currentSelected}
              className="btn btn-primary btn-shimmer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {currentSelected ? "Continue" : "Select an option"} <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={submit}
              disabled={!currentSelected}
              className="btn btn-primary btn-shimmer disabled:opacity-50 disabled:cursor-not-allowed"
            >
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
