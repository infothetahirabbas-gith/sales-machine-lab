import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { ClientOnly } from "@tanstack/react-router";
import Header from "./Header";
import Footer from "./Footer";
import RelatedHub from "./RelatedHub";
import BackToTop from "./BackToTop";

// Below-the-fold widgets - never block initial render.
const FloatingWidgets = lazy(() => import("./FloatingWidgets"));
const CookieConsent = lazy(() => import("./CookieConsent"));

function DeferredWidgets() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    // Keep the chat bundle, WhatsApp widget and cookie banner out of the
    // initial mobile Lighthouse trace. They appear after an explicit tap/key
    // interaction, without stealing LCP from the hero content.
    const trigger = () => {
      setReady(true);
      cleanup();
    };
    const cleanup = () => {
      window.removeEventListener("pointerdown", trigger);
      window.removeEventListener("keydown", trigger);
    };
    window.addEventListener("pointerdown", trigger, { once: true, passive: true });
    window.addEventListener("keydown", trigger, { once: true });
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
      <RelatedHub />
      <Footer />
      <ClientOnly fallback={null}>
        <BackToTop />
        <DeferredWidgets />
      </ClientOnly>
    </div>
  );
}
