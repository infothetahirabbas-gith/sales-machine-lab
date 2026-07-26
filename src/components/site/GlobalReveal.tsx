import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * Lightweight scroll reveal. Uses IntersectionObserver only. Re-scans on
 * every route change so newly mounted sections get observed (SPA fix).
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
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let io: IntersectionObserver | null = null;
    let failSafe: number | null = null;
    let rafId = 0;

    const run = () => {
      // Safety net: nothing ever stays invisible.
      failSafe = window.setTimeout(() => {
        document
          .querySelectorAll<HTMLElement>("[data-reveal]:not([data-inview='1'])")
          .forEach((n) => n.setAttribute("data-inview", "1"));
      }, 2500);

      if (reduced) {
        document
          .querySelectorAll<HTMLElement>("[data-reveal]")
          .forEach((n) => n.setAttribute("data-inview", "1"));
        return;
      }

      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              const el = e.target as HTMLElement;
              el.setAttribute("data-inview", "1");
              window.setTimeout(() => {
                el.style.willChange = "auto";
              }, 900);
              io!.unobserve(el);
            }
          }
        },
        { threshold: 0.05, rootMargin: "0px 0px -4% 0px" },
      );

      const firstSection = document.querySelector("main section");
      const isInHero = (el: Element) =>
        firstSection ? firstSection.contains(el) : false;

      const nodes = document.querySelectorAll<HTMLElement>(SELECTOR);
      let idx = 0;
      nodes.forEach((n) => {
        if (n.hasAttribute("data-noreveal")) return;
        if (n.getAttribute("data-inview") === "1") return;
        if (isInHero(n)) {
          n.setAttribute("data-inview", "1");
          return;
        }
        if (!n.hasAttribute("data-reveal")) {
          n.setAttribute("data-reveal", "up");
        }
        n.setAttribute("data-reveal-ready", "1");
        if (!n.style.getPropertyValue("--reveal-delay")) {
          n.style.setProperty("--reveal-delay", `${(idx % 4) * 50}ms`);
        }
        idx++;
        io!.observe(n);
      });

      document.documentElement.classList.add("js-reveal");
    };

    // Wait a frame so the new route's DOM is committed before scanning.
    rafId = window.requestAnimationFrame(() =>
      window.requestAnimationFrame(run),
    );

    return () => {
      window.cancelAnimationFrame(rafId);
      if (failSafe) window.clearTimeout(failSafe);
      if (io) io.disconnect();
    };
  }, [pathname]);

  return null;
}
