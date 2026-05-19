#!/usr/bin/env node
/**
 * Regression guard for the About page CTA button.
 *
 * Past bug: the "Book Strategy Call" button used `relative flex` (block-level)
 * which made the gradient background stretch the full width of the card —
 * far beyond the button text. The fix is:
 *   1. Wrap the <Link> in a flex justify-center container.
 *   2. Use `inline-flex` on the <Link> so it sizes to its content.
 *   3. `.btn` in styles.css must default to `inline-flex w-auto`.
 *
 * Run: node tests/about-cta.regression.mjs
 */
import { readFileSync } from "node:fs";

const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };

const about = readFileSync("src/routes/about.tsx", "utf8");
const styles = readFileSync("src/styles.css", "utf8");

// 1. About CTA section exists
const ctaIdx = about.indexOf("Ready to scale profitably?");
check(ctaIdx !== -1, "About CTA heading 'Ready to scale profitably?' is missing");

// 2. CTA button block must use a justify-center wrapper + inline-flex link
const ctaBlock = about.slice(ctaIdx, ctaIdx + 800);
check(
  /flex\s+justify-center[\s\S]*?<Link[\s\S]*?className="[^"]*\binline-flex\b[^"]*"[\s\S]*?Book Strategy Call/.test(ctaBlock),
  "About CTA must wrap the Book Strategy Call Link in a `flex justify-center` div, and the Link must use `inline-flex`. " +
  "Do NOT use `flex` directly on the Link — it makes the gradient background stretch full-width."
);

// 3. Forbid the regressing pattern: `relative flex ... btn btn-primary` on a Link
check(
  !/<Link[^>]*className="[^"]*\brelative\s+flex\b[^"]*\bbtn-primary\b[^"]*"[\s\S]{0,80}Book Strategy Call/.test(about),
  "About CTA Link uses the old `relative flex btn-primary` pattern — this stretches the button background full-width. Use a wrapper + `inline-flex` instead."
);

// 4. Global .btn must default to inline-flex + w-auto so standalone buttons never stretch
const btnLine = styles.split("\n").find((l) => /^\s*\.btn\s*\{/.test(l)) || "";
check(/\binline-flex\b/.test(btnLine), "`.btn` in src/styles.css must include `inline-flex` so buttons size to content by default");
check(/\bw-auto\b/.test(btnLine), "`.btn` in src/styles.css must include `w-auto` so it never inherits a stretching width");

// 5. .btn-shimmer must keep overflow hidden (so the ::before pseudo never bleeds beyond the button)
check(
  /\.btn-shimmer\s*\{[^}]*overflow:\s*hidden/.test(styles),
  "`.btn-shimmer` must keep `overflow: hidden` so the animated background is clipped to the button."
);

if (failures.length) {
  console.error("✗ About CTA regression check FAILED:\n");
  for (const f of failures) console.error("  • " + f);
  process.exit(1);
}
console.log("✓ About CTA regression check passed (" + 5 + " assertions).");
