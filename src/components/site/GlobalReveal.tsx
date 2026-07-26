import { useEffect } from "react";

/**
 * Lightweight scroll reveal. Uses IntersectionObserver only - no scroll
 * listeners, no getBoundingClientRect loops, no document-wide MutationObserver.
 * The first section on every page is intentionally excluded so the hero /
 * LCP element paints at its final position (no CLS, no render delay).
 */
const SELECTOR = [
  "section h2",
  "section h3",
  "section .card-surface",
  "section .card-premium",
  "section [class*='rounded-2xl']",
  "section [class*='rounded-3xl']",
  "section .btn-pair",
].join(",");

export function GlobalReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Safety net: nothing ever stays invisible.
    const failSafe = window.setTimeout(() => {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]:not([data-inview='1'])")
        .forEach((n) => n.setAttribute("data-inview", "1"));
    }, 2500);

    if (reduced) {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((n) => n.setAttribute("data-inview", "1"));
      return () => window.clearTimeout(failSafe);
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            el.setAttribute("data-inview", "1");
            // Drop will-change once animation is done so the compositor
            // can free the layer (big memory + INP win on long pages).
            window.setTimeout(() => {
              el.style.willChange = "auto";
            }, 900);
            io.unobserve(el);
          }
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -4% 0px" },
    );

    // Exclude the first <section> on the page - that's the hero / LCP zone.
    const firstSection = document.querySelector("main section");
    const isInHero = (el: Element) =>
      firstSection ? firstSection.contains(el) : false;

    const nodes = document.querySelectorAll<HTMLElement>(SELECTOR);
    let idx = 0;
    nodes.forEach((n) => {
      if (n.hasAttribute("data-noreveal")) return;
      if (isInHero(n)) return; // hero paints instantly
      if (!n.hasAttribute("data-reveal")) {
        n.setAttribute("data-reveal", "up");
      }
      if (!n.style.getPropertyValue("--reveal-delay")) {
        n.style.setProperty("--reveal-delay", `${(idx % 4) * 50}ms`);
      }
      idx++;
      io.observe(n);
    });

    document.documentElement.classList.add("js-reveal");

    return () => {
      window.clearTimeout(failSafe);
      io.disconnect();
    };
  }, []);

  return null;
}
