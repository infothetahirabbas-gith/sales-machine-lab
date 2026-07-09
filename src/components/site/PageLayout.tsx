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
    // Wait for first user interaction OR a long idle window — whichever comes
    // first. This keeps FloatingWidgets out of the initial render, LCP window
    // and Lighthouse "unused JS" bucket on cold loads.
    let idleId: number | undefined;
    let timerId: number | undefined;
    const trigger = () => {
      setReady(true);
      cleanup();
    };
    const cleanup = () => {
      if (idleId !== undefined) w.cancelIdleCallback?.(idleId);
      if (timerId !== undefined) window.clearTimeout(timerId);
      window.removeEventListener("pointerdown", trigger);
      window.removeEventListener("keydown", trigger);
      window.removeEventListener("scroll", trigger);
    };
    window.addEventListener("pointerdown", trigger, { once: true, passive: true });
    window.addEventListener("keydown", trigger, { once: true });
    window.addEventListener("scroll", trigger, { once: true, passive: true });
    if (typeof w.requestIdleCallback === "function") {
      idleId = w.requestIdleCallback(trigger, { timeout: 5000 });
    } else {
      timerId = window.setTimeout(trigger, 3000);
    }
    return cleanup;
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
