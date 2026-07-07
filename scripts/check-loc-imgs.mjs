import { LOCATION_CONTENT } from "../src/lib/location-content.ts";
const urls = [];
for (const [slug, c] of Object.entries(LOCATION_CONTENT)) {
  const list = [c.images.hero, c.images.skyline, c.images.team, c.images.ads, c.images.seo, c.images.cro, c.images.email, c.images.creative, c.images.analytics, c.images.shopify, c.images.meeting, c.images.caseStudy, c.images.process, ...c.images.founders];
  urls.push(...list);
}
const set = new Set(urls);
console.log("cities:", Object.keys(LOCATION_CONTENT).length, "urls:", urls.length, "unique:", set.size, "dupes:", urls.length-set.size);
