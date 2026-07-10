import { lazy, Suspense, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  ClientOnly,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { organizationJsonLd, websiteJsonLd } from "../lib/seo";
import logoAsset from "../assets/being-ecom-logo.webp.asset.json";

// Deferred - these are not needed for first paint. Loading them lazily
// removes ~significant JS from the initial bundle and keeps LCP fast.
const GoogleTranslate = lazy(() => import("../components/site/GoogleTranslate"));
import { RouteProgressBar } from "../components/site/RouteTransition";




function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      // Security headers (browser-honored equivalents; HSTS/X-Frame-Options
      // must also be set as HTTP response headers by the host)
      { httpEquiv: "X-Content-Type-Options", content: "nosniff" },
      { httpEquiv: "Referrer-Policy", content: "strict-origin-when-cross-origin" },
      { name: "referrer", content: "strict-origin-when-cross-origin" },
      { httpEquiv: "Permissions-Policy", content: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
      { name: "format-detection", content: "telephone=no" },
      { name: "theme-color", content: "#0F172A" },
      { name: "google-site-verification", content: "w_9CNCsYa-LbUVVIhpJi9baWOsIZaIjsG4jWxAoU2Eg" },
      { title: "BeingEcom - Shopify & WooCommerce Growth Agency" },
      { name: "description", content: "We turn struggling Shopify & WooCommerce stores into scalable revenue machines with ads, CRO, SEO, and automation." },
      { property: "og:title", content: "BeingEcom - Shopify & WooCommerce Growth Agency" },
      { property: "og:description", content: "We turn struggling Shopify & WooCommerce stores into scalable revenue machines with ads, CRO, SEO, and automation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:site_name", content: "BeingEcom" },
      { name: "twitter:title", content: "BeingEcom - Shopify & WooCommerce Growth Agency" },
      { name: "twitter:description", content: "We turn struggling Shopify & WooCommerce stores into scalable revenue machines with ads, CRO, SEO, and automation." },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/webp", sizes: "256x256", href: logoAsset.url },

      { rel: "alternate", hrefLang: "en-gb", href: "https://beingecom.com/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://beingecom.com/" },
    ],
    scripts: (() => {
      const gaId = (import.meta.env.VITE_GA4_MEASUREMENT_ID as string | undefined)?.trim();
      const base: Array<Record<string, unknown>> = [
        { type: "application/ld+json", children: JSON.stringify(organizationJsonLd()) },
        { type: "application/ld+json", children: JSON.stringify(websiteJsonLd()) },
      ];
      if (gaId && /^G-[A-Z0-9]+$/i.test(gaId)) {
        base.push(
          { src: `https://www.googletagmanager.com/gtag/js?id=${gaId}`, async: true },
          {
            children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`,
          },
        );
      }
      return base;
    })(),

  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  // Mount deferred client-only widgets AFTER first paint so they never
  // block LCP or TTI on the initial load. Google Translate is desktop-only
  // (≥1024px) - on mobile it adds ~98 KiB of third-party JS with no value
  // since the language switcher lives in the desktop header dropdown.
  const [deferredReady, setDeferredReady] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    const w = window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let idleId: number | undefined;
    let timeoutId: number | undefined;
    if (typeof w.requestIdleCallback === "function") {
      idleId = w.requestIdleCallback(() => setDeferredReady(true), { timeout: 2000 });
    } else {
      timeoutId = window.setTimeout(() => setDeferredReady(true), 400);
    }
    // Real-user Core Web Vitals reporting is useful, but it should never
    // compete with mobile FCP/LCP. Start it well after the hero has painted.
    const vitalsTimer = window.setTimeout(() => {
      import("../lib/web-vitals-reporter").then((m) => m.startWebVitalsReporter()).catch(() => {});
    }, 8000);
    return () => {
      mq.removeEventListener("change", apply);
      if (idleId !== undefined) w.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      window.clearTimeout(vitalsTimer);
    };
  }, []);

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <QueryClientProvider client={queryClient}>
      <RouteProgressBar />
      <div key={pathname}>
        <Outlet />
      </div>
      <ClientOnly fallback={null}>
        {deferredReady && isDesktop ? (
          <Suspense fallback={null}>
            <GoogleTranslate />
          </Suspense>
        ) : null}
      </ClientOnly>
    </QueryClientProvider>
  );
}
