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
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";

function PageFade({ pathname, children }: { pathname: string; children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </m.div>
      </AnimatePresence>
    </LazyMotion>
  );
}
import { organizationJsonLd, websiteJsonLd } from "../lib/seo";
import logoAsset from "../assets/being-ecom-logo.webp.asset.json";
import faviconAsset from "../assets/favicon-b.png.asset.json";

const criticalCss = `
:root{--background:oklch(1 0 0);--foreground:oklch(.36 .018 264);--card:oklch(.985 .004 236);--primary:oklch(.687183 .165136 57.381);--primary-foreground:oklch(1 0 0);--secondary:oklch(.953 .024 67);--muted-foreground:oklch(.42 .02 260);--border:oklch(.884 .02 70);--ink:oklch(.36 .018 264);--brand:oklch(.687183 .165136 57.381);--radius:.9rem;color-scheme:light}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--background);color:var(--foreground);font-family:system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden}a{color:inherit;text-decoration:none}img,svg{display:block;max-width:100%;height:auto}button,select{font:inherit}header{position:sticky;top:0;z-index:50;background:color-mix(in oklab,var(--background) 95%,transparent);border-bottom:1px solid var(--border);backdrop-filter:blur(16px)}header>div:first-child{display:none!important}header>div:first-child>div,header>div:nth-child(2),.mx-auto{margin-left:auto;margin-right:auto}.max-w-7xl{max-width:80rem}.px-4{padding-left:1rem;padding-right:1rem}.px-5{padding-left:1.25rem;padding-right:1.25rem}.lg\\:px-8{padding-left:2rem;padding-right:2rem}header>div:first-child>div{min-height:2rem;padding-top:.25rem;padding-bottom:.25rem;display:flex;align-items:center;gap:.5rem;flex-wrap:wrap;font-size:11px;color:var(--muted-foreground)}header label,header>div:first-child span{display:inline-flex;align-items:center;gap:.375rem;border:1px solid var(--border);background:var(--background);border-radius:999px;padding:.375rem .75rem;min-height:2rem;font-weight:600}header select{position:absolute;inset:0;opacity:0}header>div:nth-child(2){height:4rem;display:flex;align-items:center;justify-content:space-between;gap:.5rem;padding-left:1rem;padding-right:1rem}header nav{display:none}header img[alt*="Ecom"]{height:2.5rem;width:auto;object-fit:contain}.min-h-dvh{min-height:100dvh}.flex{display:flex}.grid{display:grid}.hidden{display:none}.relative{position:relative}.absolute{position:absolute}.overflow-hidden{overflow:hidden}.overflow-x-clip{overflow-x:clip}.w-full{width:100%}.h-full{height:100%}.text-center{text-align:center}.font-bold{font-weight:700}.font-semibold{font-weight:600}.text-ink{color:var(--ink)}.text-primary,.text-brand,.text-gradient,.text-sky-gradient{color:var(--brand);-webkit-text-fill-color:currentColor}.text-muted-foreground{color:var(--muted-foreground)}.bg-background{background:var(--background)}.bg-primary{background:var(--primary)}.text-primary-foreground{color:var(--primary-foreground)}main>section:first-child{position:relative;overflow:hidden;padding:5rem 0 5rem}main>section:first-child [class*="max-w-7xl"]{position:relative;margin-left:auto;margin-right:auto;max-width:80rem;padding-left:1.25rem;padding-right:1.25rem;display:grid;gap:2.5rem;align-items:center}h1,h2,h3{margin:0;color:var(--brand);font-weight:700;line-height:1.08;text-wrap:balance}h1{font-size:clamp(2.25rem,8vw,4.5rem)}p{line-height:1.65;overflow-wrap:anywhere}.btn-pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.5rem;width:100%;align-items:stretch}.btn{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;min-height:44px;border-radius:999px;font-weight:700;text-align:center;line-height:1.15;padding:.625rem .75rem;font-size:12px}.btn-primary{background:var(--primary);color:var(--primary-foreground);box-shadow:0 12px 28px -16px color-mix(in oklab,var(--primary) 55%,transparent)}.btn-ghost{color:var(--ink);border:1px solid var(--border);background:transparent}.card-surface{background:var(--card);border:1px solid var(--border);border-radius:var(--radius)}.reveal,.reveal.in{opacity:1;transform:none}.section-band{content-visibility:auto;contain-intrinsic-size:1px 800px}.pulse-dot:after,.float,.float-slow{animation:none!important}.shadow-2xl{box-shadow:0 25px 50px -12px rgb(0 0 0/.25)}@media (min-width:640px){.btn{font-size:1rem;padding:.75rem 1.5rem}header img[alt*="Ecom"]{height:3rem}}@media (min-width:768px){h1{font-size:3.75rem}.md\\:block{display:block}.md\\:h-64{height:16rem}}@media (min-width:1024px){header>div:nth-child(2){height:5rem;padding-left:2rem;padding-right:2rem}header nav{display:flex;align-items:center;gap:1.5rem}.lg\\:hidden{display:none}.lg\\:text-left{text-align:left}.lg\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.lg\\:grid-cols-12{grid-template-columns:repeat(12,minmax(0,1fr))}.lg\\:col-span-5{grid-column:span 5/span 5}.lg\\:col-span-7{grid-column:span 7/span 7}main>section:first-child{padding-top:7rem;padding-bottom:7rem}main>section:first-child [class*="max-w-7xl"]{padding-left:2rem;padding-right:2rem}.lg\\:inline-flex{display:inline-flex}.lg\\:flex{display:flex}header img[alt*="Ecom"]{height:3.5rem}}
header>div:first-child>div{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:.375rem;flex-wrap:initial}header>div:first-child label,header>div:first-child>div>span{justify-content:center;gap:.25rem;padding:.375rem .5rem;min-width:0}header>div:first-child>div>span:nth-child(1),header>div:first-child>div>label:nth-child(2),header>div:first-child>div>label:nth-child(3){grid-column:span 2/span 2}header>div:first-child>div>label:nth-child(4),header>div:first-child>div>label:nth-child(5){grid-column:span 3/span 3}header>div:first-child>div>a{display:none}@media (min-width:1024px){header>div:first-child>div{display:flex;flex-wrap:wrap;justify-content:flex-start;gap:.5rem}header>div:first-child label,header>div:first-child>div>span{justify-content:flex-start;gap:.375rem;padding:.375rem .75rem}header>div:first-child>div>a{display:inline-flex;margin-left:auto}}
`;

const asyncCssLoader = `(()=>{var h=${JSON.stringify(appCss)};function l(){if(document.querySelector('link[data-app-css]'))return;var e=document.createElement('link');e.rel='stylesheet';e.href=h;e.setAttribute('data-app-css','');document.head.appendChild(e)}if('requestAnimationFrame'in window){requestAnimationFrame(()=>requestAnimationFrame(l))}else setTimeout(l,0)})();`;

// Deferred - these are not needed for first paint. Loading them lazily
// removes ~significant JS from the initial bundle and keeps LCP fast.
const GoogleTranslate = lazy(() => import("../components/site/GoogleTranslate"));




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
      { rel: "preload", as: "style", href: appCss },
      { rel: "icon", type: "image/png", href: faviconAsset.url },

      { rel: "alternate", hrefLang: "en-gb", href: "https://beingecom.com/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://beingecom.com/" },
    ],
    styles: [{ children: criticalCss }],
    scripts: (() => {
      const gaId = (import.meta.env.VITE_GA4_MEASUREMENT_ID as string | undefined)?.trim();
      const base: Array<Record<string, unknown>> = [
        { children: asyncCssLoader },
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
        <noscript>
          <link rel="stylesheet" href={appCss} />
        </noscript>
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
      <PageFade pathname={pathname}>
        <Outlet />
      </PageFade>
      <GlobalReveal />
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
