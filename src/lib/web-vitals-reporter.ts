// Real-user Core Web Vitals reporter.
// - Sends CLS, LCP, INP, FCP, TTFB to GA4 (via gtag) when VITE_GA4_MEASUREMENT_ID is set.
// - Also logs to console in dev so you can watch metrics locally.
// Called from src/start.ts on the client only; SSR is a no-op.
import { onCLS, onLCP, onINP, onFCP, onTTFB, type Metric } from "web-vitals";

type Gtag = (
  command: "event",
  name: string,
  params: Record<string, unknown>,
) => void;

function report(metric: Metric) {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  const value = Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value);
  const payload = {
    event_category: "Web Vitals",
    event_label: metric.id,
    value,
    metric_id: metric.id,
    metric_value: metric.value,
    metric_rating: metric.rating, // "good" | "needs-improvement" | "poor"
    metric_delta: metric.delta,
    page_path: window.location.pathname,
    non_interaction: true,
  };
  if (typeof gtag === "function") {
    gtag("event", metric.name, payload);
  }
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.log(`[web-vitals] ${metric.name} = ${value} (${metric.rating})`, payload);
  }
}

let started = false;
export function startWebVitalsReporter() {
  if (typeof window === "undefined" || started) return;
  started = true;
  onCLS(report);
  onLCP(report);
  onINP(report);
  onFCP(report);
  onTTFB(report);
}
