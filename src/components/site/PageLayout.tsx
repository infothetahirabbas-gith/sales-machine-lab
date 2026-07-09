import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { ClientOnly } from "@tanstack/react-router";
import Header from "./Header";
import Footer from "./Footer";

// Below-the-fold widgets — never block initial render.
const FloatingWidgets = lazy(() => import("./FloatingWidgets"));
const CookieConsent = lazy(() => import("./CookieConsent"));

function DeferredWidgets() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const w = window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(() => setReady(true), { timeout: 2500 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(() => setReady(true), 600);
    return () => window.clearTimeout(t);
  }, []);
  if (!ready) return null;
  return (
    <Suspense fallback={null}>
      <FloatingWidgets />
      <CookieConsent />
    </Suspense>
  );
}

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col overflow-x-clip">
      <Header />
      <main className="flex-1 w-full max-w-full overflow-x-clip">{children}</main>
      <Footer />
      <ClientOnly fallback={null}>
        <DeferredWidgets />
      </ClientOnly>
    </div>
  );
}
