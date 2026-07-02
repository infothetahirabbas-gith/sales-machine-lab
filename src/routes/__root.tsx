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
import faviconAsset from "../assets/favicon-b.png.asset.json";



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
      { name: "google-site-verification", content: "w_9CNCsYa-LbUVVIhpJi9baWOsIZaIjsG4jWxAoU2Eg" },
      { title: "BeingEcom - Ecommerce Growth System for Shopify & WooCommerce" },
      { name: "description", content: "We turn struggling Shopify & WooCommerce stores into scalable revenue machines with ads, CRO, SEO, and automation." },
      { property: "og:title", content: "BeingEcom - Ecommerce Growth System for Shopify & WooCommerce" },
      { property: "og:description", content: "We turn struggling Shopify & WooCommerce stores into scalable revenue machines with ads, CRO, SEO, and automation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:site_name", content: "BeingEcom" },
      { name: "twitter:title", content: "BeingEcom - Ecommerce Growth System for Shopify & WooCommerce" },
      { name: "twitter:description", content: "We turn struggling Shopify & WooCommerce stores into scalable revenue machines with ads, CRO, SEO, and automation." },
      { property: "og:image", content: "https://beingecom.com/og-image.png" },
      { name: "twitter:image", content: "https://beingecom.com/og-image.png" },
      { property: "og:image:alt", content: "BeingEcom — Ecommerce Growth Agency for Shopify and WooCommerce" },
      { name: "twitter:image:alt", content: "BeingEcom — Ecommerce Growth Agency for Shopify and WooCommerce" },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: faviconAsset.url },
      { rel: "apple-touch-icon", href: faviconAsset.url },

      { rel: "alternate", hrefLang: "en-gb", href: "https://beingecom.com/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://beingecom.com/" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      // Non-render-blocking Google Fonts load via print-media swap trick
      { rel: "preload", as: "style", href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap", media: "print", "data-fonts": "swap" } as never,
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(organizationJsonLd()),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(websiteJsonLd()),
      },
      {
        children: `(function(){var l=document.querySelector('link[data-fonts="swap"]');if(l){l.media='all';}})();`,
      },
    ],

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
