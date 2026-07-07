import { useState, type ImgHTMLAttributes } from "react";

// Inline SVG placeholder — no extra network hop when a real image 404s.
const FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'>
      <defs>
        <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stop-color='#fff4e6'/>
          <stop offset='100%' stop-color='#ffd9a8'/>
        </linearGradient>
      </defs>
      <rect width='1600' height='900' fill='url(#g)'/>
      <g fill='#e07a00' opacity='0.85' font-family='system-ui,-apple-system,Segoe UI,Roboto,sans-serif' font-weight='700' text-anchor='middle'>
        <text x='800' y='470' font-size='72'>Being Ecom</text>
        <text x='800' y='540' font-size='28' opacity='0.7'>image unavailable</text>
      </g>
    </svg>`,
  );

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  /** Show a shimmering placeholder while the image is loading (default: true). */
  skeleton?: boolean;
  /** Overlay a subtle brand-tinted gradient on top of the image for cohesion (default: false). */
  brandOverlay?: boolean;
  /** Optional class applied to the wrapping <span> when skeleton/overlay are on. */
  wrapperClassName?: string;
};

export function SafeImg({
  src,
  onError,
  onLoad,
  skeleton = true,
  brandOverlay = false,
  wrapperClassName = "",
  className = "",
  loading = "lazy",
  decoding = "async",
  ...rest
}: Props) {
  const [current, setCurrent] = useState(src);
  const [loaded, setLoaded] = useState(false);

  const img = (
    <img
      {...rest}
      src={current}
      loading={loading}
      decoding={decoding}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      onError={(e) => {
        if (current !== FALLBACK) setCurrent(FALLBACK);
        setLoaded(true);
        onError?.(e);
      }}
      className={`${className} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`.trim()}
    />
  );

  if (!skeleton && !brandOverlay) return img;

  return (
    <span className={`relative block overflow-hidden ${wrapperClassName}`.trim()}>
      {skeleton && !loaded && (
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-100/60 to-orange-100 animate-pulse"
        />
      )}
      {img}
      {brandOverlay && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/25 via-transparent to-accent/20 mix-blend-multiply"
        />
      )}
      {brandOverlay && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/20"
        />
      )}
    </span>
  );
}

export default SafeImg;
