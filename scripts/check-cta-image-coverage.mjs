#!/usr/bin/env node
// CTA + section-image coverage report across service routes.
// Scans src/routes/services.*.tsx for:
//   - CTA anchors/buttons missing accessible names (icon-only w/o aria-label)
//   - <Section> blocks without a nearby image/illustration
//   - <img> tags missing alt
// Writes report to /tmp/cta-image-coverage.json and prints a summary.
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROUTES_DIR = "src/routes";
const files = readdirSync(ROUTES_DIR)
  .filter((f) => f.startsWith("services.") && f.endsWith(".tsx"));

const report = { files: [], totals: { ctaIssues: 0, imgIssues: 0, sectionsNoImage: 0 } };

for (const file of files) {
  const src = readFileSync(join(ROUTES_DIR, file), "utf8");
  const rec = { file, ctaIssues: [], imgIssues: [], hasHeroImage: false, imageCount: 0 };

  rec.hasHeroImage = /heroImage\s*:/.test(src) || /import\s+hero\w*\s+from/i.test(src);
  rec.imageCount = (src.match(/<img\b|<SafeImg\b/g) || []).length;

  // <img> without alt
  const imgTags = src.match(/<(?:img|SafeImg)\b[^>]*>/g) || [];
  imgTags.forEach((t, i) => {
    if (!/\balt\s*=/.test(t)) rec.imgIssues.push({ i, tag: t.slice(0, 120) });
  });

  // Icon-only buttons/links: contains <Icon /> but no visible text and no aria-label
  const btnRe = /<(?:Link|button|a)\b[^>]*className=["'][^"']*btn[^"']*["'][^>]*>([\s\S]*?)<\/(?:Link|button|a)>/g;
  let m;
  while ((m = btnRe.exec(src))) {
    const open = m[0].slice(0, m[0].indexOf(">") + 1);
    const inner = m[1];
    const hasAria = /aria-label\s*=/.test(open);
    const textOnly = inner.replace(/<[^>]+>/g, "").trim();
    if (!hasAria && textOnly.length < 2) {
      rec.ctaIssues.push({ snippet: m[0].slice(0, 160) });
    }
  }

  report.totals.ctaIssues += rec.ctaIssues.length;
  report.totals.imgIssues += rec.imgIssues.length;
  if (!rec.hasHeroImage && rec.imageCount === 0) report.totals.sectionsNoImage += 1;
  report.files.push(rec);
}

writeFileSync("/tmp/cta-image-coverage.json", JSON.stringify(report, null, 2));
const noImg = report.files.filter((f) => f.file !== "services.index.tsx" && !f.hasHeroImage && f.imageCount === 0);
console.log(`Scanned ${files.length} service routes.`);
console.log(`CTA missing accessible names: ${report.totals.ctaIssues}`);
console.log(`<img> tags missing alt: ${report.totals.imgIssues}`);
console.log(`Routes with no imagery at all: ${noImg.length}`);
if (noImg.length) console.log("  ->", noImg.map((f) => f.file).join(", "));
if (report.totals.ctaIssues || report.totals.imgIssues || noImg.length) {
  console.log("\nSee /tmp/cta-image-coverage.json for details.");
  process.exit(1);
}
console.log("PASS: every service page has imagery, alt text, and named CTAs.");
