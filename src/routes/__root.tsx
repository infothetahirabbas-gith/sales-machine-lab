import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";


import appCss from "../styles.css?url";

import { organizationJsonLd, websiteJsonLd } from "../lib/seo";
import logoAsset from "../assets/being-ecom-logo.webp.asset.json";
import faviconAsset from "../assets/favicon-b.png.asset.json";

// NOTE: Google Translate language switcher removed until proper /{lang}/
// locale routes and hreflang are built. Serving 6 translation options without
// backing pages created a duplicate-content / soft-404 risk.





const NOT_FOUND_LINKS: { to: string; label: string; note: string }[] = [
  { to: "/services", label: "Services", note: "SEO, paid media, CRO, store builds and retention" },
  { to: "/case-studies", label: "Case studies", note: "Results from UK Shopify and WooCommerce brands" },
  { to: "/blog", label: "Blog", note: "Playbooks and teardowns from our operators" },
  { to: "/tools", label: "Free tools", note: "ROAS, CAC, LTV, margin and break-even calculators" },
  { to: "/locations", label: "Locations", note: "Ecommerce support across UK cities" },
  { to: "/pricing", label: "Pricing", note: "Retainers by growth stage, in GBP" },
];

function NotFoundComponent() {
  return (
    <div className="min-h-screen bg-background px-4 py-20">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">404</p>
        <h1 className="mt-3 text-3xl font-bold text-foreground">We couldn't find that page</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The link may be broken or the page may have moved. Here are the places most people are
          looking for - or search the whole site below.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
          <Link
            to="/search"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Search the site
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Contact us
          </Link>
        </div>

        <nav aria-label="Helpful links" className="mt-10 grid gap-4 sm:grid-cols-2">
          {NOT_FOUND_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-lg border border-border p-4 transition-colors hover:border-primary"
            >
              <span className="block text-base font-semibold text-foreground">{link.label}</span>
              <span className="mt-1 block text-sm text-muted-foreground">{link.note}</span>
            </Link>
          ))}
        </nav>
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
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </Link>

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
      // The stylesheet is loaded normally (render-blocking) on purpose. The
      // previous "inline critical CSS + async-inject the real sheet" setup
      // shifted layout by ~0.4 CLS on every page when the real sheet landed
      // 400-1000ms in. One small gzipped sheet costs far less than that.
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: faviconAsset.url },
      // Analytics is deferred until first interaction; resolving DNS/TLS early
      // means it costs nothing on the main thread when it finally loads.
      { rel: "dns-prefetch", href: "https://www.googletagmanager.com" },
      { rel: "preconnect", href: "https://www.googletagmanager.com", crossOrigin: "anonymous" },

      { rel: "alternate", hrefLang: "en-gb", href: "https://beingecom.com/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://beingecom.com/" },
    ],
    scripts: (() => {
      const envGaId = (import.meta.env.VITE_GA4_MEASUREMENT_ID as string | undefined)?.trim();
      const gaId = envGaId && /^G-[A-Z0-9]+$/i.test(envGaId) ? envGaId : "G-4ZMG6LQQKK";
      const analyticsLoader = `(()=>{var id='${gaId}',loaded=false;window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){dataLayer.push(arguments)};function load(){if(loaded)return;loaded=true;var s=document.createElement('script');s.src='https://www.googletagmanager.com/gtag/js?id='+id;s.async=true;document.head.appendChild(s);gtag('js',new Date());gtag('config',id,{anonymize_ip:true})}['pointerdown','keydown','scroll'].forEach(function(e){addEventListener(e,load,{once:true,passive:true})});setTimeout(load,12000)})();`;
      const base: Array<Record<string, unknown>> = [
        { type: "application/ld+json", children: JSON.stringify(organizationJsonLd()) },
        { type: "application/ld+json", children: JSON.stringify(websiteJsonLd()) },
        { children: analyticsLoader },
      ];
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
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}



