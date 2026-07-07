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

export function SafeImg({
  src,
  onError,
  ...rest
}: ImgHTMLAttributes<HTMLImageElement>) {
  const [current, setCurrent] = useState(src);
  return (
    <img
      {...rest}
      src={current}
      onError={(e) => {
        if (current !== FALLBACK) setCurrent(FALLBACK);
        onError?.(e);
      }}
    />
  );
}

export default SafeImg;
