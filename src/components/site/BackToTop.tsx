import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * Premium back-to-top button. Appears after the user scrolls past 60% of a
 * viewport. Uses smooth scroll and honours prefers-reduced-motion.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollTop}
      aria-label="Back to top"
      className={`fixed z-40 bottom-24 right-4 sm:right-6 h-11 w-11 rounded-full bg-primary text-primary-foreground shadow-premium-lg flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <ArrowUp className="w-5 h-5" aria-hidden />
    </button>
  );
}
