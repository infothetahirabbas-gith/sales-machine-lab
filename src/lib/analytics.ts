// Lightweight analytics event helper.
// Pushes to window.dataLayer (GTM) and calls window.gtag if present.
// Safe to call on the server becomes a no-op.

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: string, params: EventParams = {}): void {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });
    if (typeof window.gtag === "function") {
      window.gtag("event", event, params);
    }
    // Dev-friendly console trace so QA + Playwright can confirm events fire.
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.log("[analytics]", event, params);
    }
  } catch {
    /* swallow analytics must never break UX */
  }
}

export const AnalyticsEvents = {
  PricingPlanCtaClick: "pricing_plan_cta_click",
  ContactFormSubmit: "contact_form_submit",
  ContactFormSubmitSuccess: "contact_form_submit_success",
} as const;
