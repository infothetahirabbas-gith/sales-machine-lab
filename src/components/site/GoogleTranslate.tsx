import { useEffect } from "react";

// Sets the Google Translate cookie and reloads so the whole page renders
// in the selected language. `en` clears translation.
export function setSiteLanguage(code: string) {
  if (typeof document === "undefined") return;
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`];
  const value = code && code !== "en" ? `/en/${code}` : "";
  // clear then set on both root and dotted domains
  for (const d of domains) {
    document.cookie = `googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT${d ? `; domain=${d}` : ""}`;
    if (value) {
      document.cookie = `googtrans=${value}; path=/${d ? `; domain=${d}` : ""}`;
    }
  }
  try { localStorage.setItem("site_lang", code); } catch {}
  window.location.reload();
}

// Injects the Google Website Translator widget once. Hidden by CSS; we
// drive it via the googtrans cookie above.
export default function GoogleTranslate() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (document.getElementById("google-translate-script")) return;

    (window as any).googleTranslateElementInit = () => {
      // @ts-ignore
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,es,pl,ro,pt,de,fr",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    const s = document.createElement("script");
    s.id = "google-translate-script";
    s.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <>
      <div id="google_translate_element" aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: 0, width: 1, height: 1, overflow: "hidden" }} />
      <style>{`
        /* Fully hide Google Translate UI chrome while keeping translation active */
        .goog-te-banner-frame,
        .goog-te-banner-frame.skiptranslate,
        iframe.goog-te-banner-frame,
        iframe.skiptranslate,
        .goog-te-gadget,
        .goog-te-gadget-simple,
        .goog-te-combo,
        .goog-logo-link,
        #goog-gt-tt,
        .goog-te-balloon-frame,
        .VIpgJd-ZVi9od-ORHb-OEVmcd,
        .VIpgJd-ZVi9od-aZ2wEe-wOHMyf,
        .VIpgJd-ZVi9od-aZ2wEe-OiiCO { display: none !important; visibility: hidden !important; }
        body { top: 0 !important; position: static !important; }
        .goog-tooltip, .goog-tooltip:hover { display: none !important; }
        .goog-text-highlight { background: transparent !important; box-shadow: none !important; }
        #google_translate_element { display: none !important; }
      `}</style>
    </>
  );
}
