import { useEffect, useRef, useState } from "react";

export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
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
      { threshold, rootMargin: "0px 0px -80px 0px" },
    );
    io.observe(el);
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
