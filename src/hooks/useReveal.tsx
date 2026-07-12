import { useEffect, useRef, useState } from "react";

/**
 * Reveal-on-scroll: adds `.in` to the returned ref the first time it enters
 * the viewport. Pair with the `.reveal` / `.stagger-children` utilities in
 * src/styles.css. Honours prefers-reduced-motion via CSS.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.12) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || shown) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [threshold, shown]);

  return { ref, shown };
}

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: 0 | 1 | 2 | 3 | 4;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const delayClass = delay ? `reveal-delay-${delay}` : "";
  const Component = Tag as React.ElementType;
  return (
    <Component
      ref={ref as React.Ref<HTMLDivElement>}
      className={`reveal ${delayClass} ${shown ? "in" : ""} ${className}`}
    >
      {children}
    </Component>
  );
}
