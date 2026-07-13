# Desktop Hero Rendering — QA Checklist

Run this before shipping any change that touches `src/styles.css`, `src/routes/index.tsx`, or any global CSS/token file. It exists to lock the desktop hero headline and prevent silent regressions.

Trigger a run when a PR touches:
- `src/styles.css` (`.hero-headline`, `.text-gradient`, `.text-primary`, `.text-ink`, `--brand-orange`, `--brand-black`, or any `--color-*` / `--primary` / `--accent` / `--sky` / `--brand*` token)
- `src/routes/index.tsx` (hero markup, `<h1>`, or classes on it)
- `src/routes/__root.tsx` (font links, global styles)
- `tailwind` / theme config
- Any global `.text-gradient*`, `.hero-*`, or blend-mode / gradient-mesh rule

## Locked spec (do not change without approval)

| Item | Locked value |
| --- | --- |
| Line 1 | `Ecommerce Marketing` — **orange** (`--brand-orange` / `#E47B02`) |
| Line 2 | `Agency UK` — **black** (`--brand-black` / `#111111`) |
| Line 3 | `Driving More Traffic,` — orange |
| Line 4 | `Sales & Revenue for` — black |
| Line 5 | `Shopify & WooCommerce Brands` — orange |
| Desktop breakpoint | `@media (min-width: 1024px)` only |
| Font size (desktop) | `clamp(42px, 3.95vw, 56px)` |
| Line height | `1.08` |
| Letter spacing | `0` |
| Font weight | `800` |
| `text-shadow` | `none` |
| `filter` / `backdrop-filter` | `none` |
| `mix-blend-mode` | `normal` |
| `background` on `.text-gradient` inside `.hero-headline` | `none !important` (no gradient tint) |
| Mobile (<1024px) | unchanged — do NOT restyle |

## Automated checks (run before merge)

1. **Typecheck** — `bunx tsgo` returns 0.
2. **Playwright colour lock** — script under `/tmp/browser/hero-qa/` at viewport `1280×1800`:
   - Navigate to `http://localhost:8080/`.
   - Screenshot the H1 element only (`page.locator('h1').first().screenshot(...)`).
   - `getComputedStyle` on every `<span>` inside the H1 and assert:
     - Orange spans → `color === 'rgb(228, 123, 2)'`
     - Black spans → `color === 'rgb(17, 17, 17)'`
     - `fontWeight === '800'`, `letterSpacing === 'normal'` or `'0px'`
     - `textShadow === 'none'`, `filter === 'none'`, `backdropFilter === 'none'`, `mixBlendMode === 'normal'`
     - `backgroundImage === 'none'` on the H1 and its direct spans
3. **Line-break assertion** — the H1's `innerText` split on `\n` (or the H1's rendered box `getClientRects().length`) yields **exactly 5 lines** at 1280px width.
4. **Mobile unchanged** — repeat at viewport `390×844`; the mobile H1 computed values must match the last known-good snapshot (kept in `/tmp/browser/hero-qa/mobile-baseline.png`).

## Manual visual pass (2 minutes)

- Open the preview at **1440×900** and **1920×1080** — no wrapping mid-word, no orange tinting on black lines, no gradient shimmer.
- Reload the page 3× — colours must be identical on every load (no animated gradient re-mount).
- Toggle system dark mode — the hero must stay orange + black; no theme override.
- Hover the hero — no color change, no filter, no scale that alters weight.

## Fail states — reject the change

- Any span in the H1 reports `background-image` other than `none`.
- Any orange span computes a colour other than `rgb(228, 123, 2)`.
- Any black span computes a colour other than `rgb(17, 17, 17)`.
- `font-weight` computes anything other than `800` at ≥1024px.
- Mobile layout regressed vs the baseline screenshot.
- H1 renders fewer or more than 5 lines at 1280px.

## When adding new global styles

- Never target `h1`, `.hero-headline`, or `.text-gradient` without an `@media (min-width: 1024px)` scope AND `!important` on colour.
- Never add `mix-blend-mode`, `filter`, `backdrop-filter`, or animated `background-image` to any ancestor of the hero H1.
- Never introduce a new gradient utility that reuses `.text-gradient` — create a new class name instead.
