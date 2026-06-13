import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  url: z.string().trim().min(4),
  revenue: z.string().optional().nullable(),
  adSpend: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
});

const scoreSchema = z.object({
  score: z.number().min(0).max(100),
  verdict: z.string(),
});

const issueSchema = z.object({
  issue: z.string(),
  why: z.string(),
  fix: z.string(),
});

const competitorSchema = z.object({
  name: z.string(),
  website: z.string(),
  tier: z.enum(["Tier 1", "Tier 2", "Tier 3"]),
  positioning: z.string(),
  strengths: z.string(),
  weaknesses: z.string(),
  usp: z.string(),
});

const opportunitySchema = z.object({
  title: z.string(),
  expectedImpact: z.string(),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  roi: z.enum(["Low", "Medium", "High", "Very High"]),
  action: z.string(),
});

const leakSchema = z.object({
  area: z.string(),
  leak: z.string(),
  severity: z.enum(["Critical", "High", "Medium", "Low"]),
  impact: z.string(),
});

const confidenceCategorySchema = z.object({
  category: z.string(),
  confidence: z.number().min(0).max(100),
  recommendation: z.string(),
  drivers: z.array(z.object({
    signal: z.string(),
    detected: z.boolean(),
    evidence: z.string(),
    impact: z.string(),
  })).min(1).max(6),
});

export const auditReportSchema = z.object({
  storeName: z.string(),
  platformGuess: z.string(),
  business: z.object({
    brand: z.string(), website: z.string(), platform: z.string(),
    industry: z.string(), niche: z.string(), productCategory: z.string(),
    targetAudience: z.string(),
    pricePositioning: z.enum(["Luxury", "Premium", "Mid-Market", "Budget"]),
    businessModel: z.enum(["DTC", "Private Label", "Dropshipping", "Marketplace Brand", "Subscription Brand"]),
  }),
  executiveIntelligence: z.object({
    businessReality: z.string(), biggestOpportunity: z.string(), biggestThreat: z.string(),
    revenuePotential: z.enum(["Low", "Medium", "High", "Very High"]),
    revenuePotentialReasoning: z.string(), headline: z.string(),
  }),
  scorecard: z.object({
    seo: z.number().min(0).max(100), paidAds: z.number().min(0).max(100), cro: z.number().min(0).max(100),
    brandAuthority: z.number().min(0).max(100), trust: z.number().min(0).max(100), productPositioning: z.number().min(0).max(100),
    customerAcquisition: z.number().min(0).max(100), retention: z.number().min(0).max(100), customerExperience: z.number().min(0).max(100),
    marketPosition: z.number().min(0).max(100), competitiveAdvantage: z.number().min(0).max(100), revenueEfficiency: z.number().min(0).max(100),
    scalability: z.number().min(0).max(100), businessMaturity: z.number().min(0).max(100), overall: z.number().min(0).max(100),
  }),
  confidenceBreakdown: z.object({
    overall: z.number().min(0).max(100),
    scannedSignals: z.number().int().min(1),
    detectedSignals: z.number().int().min(0),
    coverageNote: z.string(),
    categories: z.array(confidenceCategorySchema).min(1).max(8),
  }),
  seoIntelligence: z.object({
    technical: scoreSchema, onPage: scoreSchema, contentAuthority: scoreSchema, commercialSeo: scoreSchema,
    technicalIssues: z.array(z.string()).max(6), competitiveSeoGap: z.string(),
  }),
  adsIntelligence: z.object({
    metaActivity: z.string(), googleActivity: z.string(), creativeStrategy: z.string(),
    offerStrategy: z.string(), messaging: z.string(), hooks: z.string(),
    acquisitionMaturity: z.enum(["Beginner", "Intermediate", "Advanced", "Elite"]),
    maturityReasoning: z.string(),
  }),
  conversionIntelligence: z.object({
    homepage: z.string(), productPages: z.string(), cartCheckout: z.string(), mobile: z.string(), ctaStrength: z.string(),
    friction: z.array(z.string()).max(5), trustGaps: z.array(z.string()).max(5), conversionKillers: z.array(z.string()).max(5),
  }),
  brandIntelligence: z.object({
    positioning: z.string(), valueProposition: z.string(), storytelling: z.string(),
    differentiation: z.string(), visualIdentity: z.string(), premiumPerception: z.string(),
    whyChooseThisBrand: z.string(),
  }),
  psychologyIntelligence: z.object({
    trust: z.string(), riskPerception: z.string(), buyingMotivation: z.string(),
    emotionalTriggers: z.string(), socialProof: z.string(), authoritySignals: z.string(),
    firstTimeTrustVerdict: z.enum(["Yes", "No", "Maybe"]), trustReasoning: z.string(),
  }),
  acquisitionIntelligence: z.object({
    organic: z.string(), paid: z.string(), social: z.string(), influencer: z.string(), emailSms: z.string(),
    mostLikelyGrowthChannel: z.string(), highestRoiChannel: z.string(), mostUnderutilizedChannel: z.string(),
  }),
  retentionIntelligence: z.object({
    email: z.string(), sms: z.string(), loyalty: z.string(), subscription: z.string(), repeatPurchase: z.string(),
    retentionMaturityScore: z.number().min(0).max(100), retentionVerdict: z.string(),
  }),
  competitors: z.array(competitorSchema).max(10),
  competitiveGap: z.object({
    competitorAdvantages: z.array(z.string()).max(5), missingFeatures: z.array(z.string()).max(5),
    marketOpportunities: z.array(z.string()).max(5), differentiationOpportunities: z.array(z.string()).max(5),
    blueOcean: z.array(z.string()).max(3),
  }),
  revenueLeakage: z.array(leakSchema).max(8),
  issueClassification: z.object({
    superHot: z.array(issueSchema).max(5), hot: z.array(issueSchema).max(5), medium: z.array(issueSchema).max(5),
  }),
  opportunities: z.array(opportunitySchema).min(3).max(5),
  actionPlan: z.object({
    immediate: z.array(z.string()).min(3).max(7),
    growth: z.array(z.string()).min(3).max(7),
    scale: z.array(z.string()).min(3).max(7),
  }),
  founderInsights: z.object({
    privateEquity: z.string(), croExpert: z.string(), brandingExpert: z.string(),
    performanceMarketer: z.string(), ceo: z.string(),
  }),
});

export type AuditReport = z.infer<typeof auditReportSchema>;

function normalizeUrl(raw: string): string {
  let u = raw.trim();
  if (!/^https?:\/\//i.test(u)) u = "https://" + u;
  return new URL(u).toString();
}

async function fetchPage(url: string): Promise<{ html: string; status: number; ok: boolean }> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; BeingEcomBrain/1.0)", "Accept": "text/html,application/xhtml+xml" },
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
    });
    const html = await res.text();
    return { html: html.slice(0, 200000), status: res.status, ok: res.ok };
  } catch {
    return { html: "", status: 0, ok: false };
  }
}

type Signals = {
  url: string; host: string; isHttps: boolean; status: number; reachable: boolean;
  title: string; metaDesc: string; ogTitle: string; ogImage: string; canonical: string;
  hasViewport: boolean; hasSchema: boolean; hasFavicon: boolean;
  h1Count: number; h2Count: number; imgCount: number; imgMissingAlt: number;
  linkCount: number; wordCount: number; htmlSize: number;
  platform: string; tools: string[];
  hasReviews: boolean; hasChat: boolean; hasSubscription: boolean; hasKlaviyo: boolean; hasMetaPixel: boolean; hasGA: boolean; hasTikTok: boolean; hasSMS: boolean;
  hasAddToCart: boolean; hasCheckout: boolean; hasShipping: boolean; hasReturns: boolean; hasContact: boolean; hasAbout: boolean; hasFAQ: boolean; hasBlog: boolean;
  hasNewsletter: boolean; hasPrivacy: boolean; hasTerms: boolean;
  hasTrustBadges: boolean; hasUSP: boolean; hasGuarantee: boolean;
  socialLinks: string[]; brandName: string;
};

function analyzeHtml(html: string, url: string, status: number): Signals {
  const parsed = new URL(url);
  const host = parsed.hostname.replace(/^www\./, "");
  const lower = html.toLowerCase();
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i);
  const ogTitleMatch = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']*)["']/i);
  const ogImgMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']*)["']/i);
  const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i);
  const h1s = (html.match(/<h1\b/gi) || []).length;
  const h2s = (html.match(/<h2\b/gi) || []).length;
  const imgs = html.match(/<img\b[^>]*>/gi) || [];
  const imgsMissingAlt = imgs.filter((t) => !/\salt\s*=/.test(t)).length;
  const links = (html.match(/<a\b/gi) || []).length;
  const text = html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const wordCount = text ? text.split(/\s+/).length : 0;
  const platform =
    /cdn\.shopify\.com|shopify\.com\/s\//i.test(html) ? "Shopify" :
    /wp-content|woocommerce/i.test(html) ? "WooCommerce" :
    /bigcommerce/i.test(html) ? "BigCommerce" :
    /magento/i.test(html) ? "Magento" :
    /wixstatic|wix\.com/i.test(html) ? "Wix" :
    /squarespace/i.test(html) ? "Squarespace" :
    "Custom/Unknown";
  const tools: string[] = [];
  if (/klaviyo/i.test(html)) tools.push("Klaviyo");
  if (/gtag\(|googletagmanager/i.test(html)) tools.push("GA4/GTM");
  if (/connect\.facebook\.net|fbq\(/i.test(html)) tools.push("Meta Pixel");
  if (/judge\.me|loox|yotpo|stamped|okendo/i.test(html)) tools.push("Reviews");
  if (/recharge|bold[_-]subscriptions|appstle/i.test(html)) tools.push("Subscriptions");
  if (/gorgias|zendesk|tidio|intercom|crisp/i.test(html)) tools.push("Live chat");
  if (/postscript|attentive|sms[_-]?bump/i.test(html)) tools.push("SMS");
  if (/tiktok|ttclid/i.test(html)) tools.push("TikTok Pixel");
  if (/pinterest/i.test(html)) tools.push("Pinterest tag");
  const socialLinks: string[] = [];
  if (/instagram\.com\//i.test(html)) socialLinks.push("Instagram");
  if (/facebook\.com\//i.test(html)) socialLinks.push("Facebook");
  if (/tiktok\.com\//i.test(html)) socialLinks.push("TikTok");
  if (/youtube\.com\/|youtu\.be\//i.test(html)) socialLinks.push("YouTube");
  if (/twitter\.com\/|x\.com\//i.test(html)) socialLinks.push("X/Twitter");
  if (/pinterest\.com\//i.test(html)) socialLinks.push("Pinterest");

  const brandName =
    (ogTitleMatch?.[1] || titleMatch?.[1] || host.split(".")[0])
      .split(/[|–—\-:·]/)[0]
      .trim()
      .slice(0, 40) || host;

  return {
    url, host, isHttps: parsed.protocol === "https:", status, reachable: status >= 200 && status < 400,
    title: titleMatch?.[1]?.trim() ?? "",
    metaDesc: descMatch?.[1]?.trim() ?? "",
    ogTitle: ogTitleMatch?.[1]?.trim() ?? "",
    ogImage: ogImgMatch?.[1]?.trim() ?? "",
    canonical: canonicalMatch?.[1]?.trim() ?? "",
    hasViewport: /<meta[^>]+name=["']viewport["']/i.test(html),
    hasSchema: /application\/ld\+json/i.test(html),
    hasFavicon: /rel=["'](?:shortcut )?icon["']/i.test(html),
    h1Count: h1s, h2Count: h2s, imgCount: imgs.length, imgMissingAlt: imgsMissingAlt,
    linkCount: links, wordCount, htmlSize: html.length,
    platform, tools,
    hasReviews: tools.includes("Reviews") || /review|★|⭐/i.test(text),
    hasChat: tools.includes("Live chat"),
    hasSubscription: tools.includes("Subscriptions") || /subscribe & save|subscription/i.test(lower),
    hasKlaviyo: tools.includes("Klaviyo"),
    hasMetaPixel: tools.includes("Meta Pixel"),
    hasGA: tools.includes("GA4/GTM"),
    hasTikTok: tools.includes("TikTok Pixel"),
    hasSMS: tools.includes("SMS"),
    hasAddToCart: /add[-_ ]?to[-_ ]?cart|add to bag/i.test(lower),
    hasCheckout: /checkout/i.test(lower),
    hasShipping: /shipping/i.test(lower),
    hasReturns: /return(s)?|refund/i.test(lower),
    hasContact: /contact/i.test(lower),
    hasAbout: /about/i.test(lower),
    hasFAQ: /faq|frequently asked/i.test(lower),
    hasBlog: /\/blog|journal|articles/i.test(lower),
    hasNewsletter: /newsletter|subscribe|sign[- ]?up/i.test(lower),
    hasPrivacy: /privacy/i.test(lower),
    hasTerms: /terms/i.test(lower),
    hasTrustBadges: /trustpilot|bbb|verified|secure checkout|ssl/i.test(lower),
    hasUSP: /free shipping|money[- ]?back|guarantee|lifetime|warranty/i.test(lower),
    hasGuarantee: /guarantee|money[- ]?back/i.test(lower),
    socialLinks, brandName,
  };
}

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

function buildReport(s: Signals, input: { revenue?: string | null; adSpend?: string | null; country?: string | null }): z.infer<typeof auditReportSchema> {
  // ---------- Scoring ----------
  let seoTech = 50;
  if (s.isHttps) seoTech += 8; else seoTech -= 20;
  if (s.hasViewport) seoTech += 6; else seoTech -= 10;
  if (s.canonical) seoTech += 6; else seoTech -= 6;
  if (s.hasSchema) seoTech += 10; else seoTech -= 8;
  if (s.hasFavicon) seoTech += 2;
  if (s.htmlSize > 500000) seoTech -= 8;

  let seoOnPage = 50;
  if (s.title && s.title.length >= 30 && s.title.length <= 65) seoOnPage += 10; else seoOnPage -= 8;
  if (s.metaDesc && s.metaDesc.length >= 70 && s.metaDesc.length <= 160) seoOnPage += 10; else seoOnPage -= 10;
  if (s.h1Count === 1) seoOnPage += 8; else if (s.h1Count === 0) seoOnPage -= 12; else seoOnPage -= 4;
  if (s.h2Count >= 3) seoOnPage += 4;
  if (s.imgCount > 0 && s.imgMissingAlt / s.imgCount > 0.3) seoOnPage -= 8;

  const seoContent = clamp(40 + (s.hasBlog ? 18 : -10) + (s.wordCount > 500 ? 8 : -8) + (s.wordCount > 1500 ? 6 : 0));
  const seoCommercial = clamp(45 + (s.hasSchema ? 12 : -6) + (s.canonical ? 5 : -4) + (s.metaDesc ? 6 : -8));
  const seoOverall = clamp((clamp(seoTech) + clamp(seoOnPage) + seoContent + seoCommercial) / 4);

  const paidScore = clamp(30 + (s.hasMetaPixel ? 20 : -5) + (s.hasGA ? 12 : -5) + (s.hasTikTok ? 10 : 0) + (s.tools.includes("Pinterest tag") ? 5 : 0));
  const croScore = clamp(40 + (s.hasReviews ? 10 : -8) + (s.hasTrustBadges ? 8 : -5) + (s.hasUSP ? 10 : -6) + (s.hasChat ? 5 : 0) + (s.hasViewport ? 5 : -10) + (s.hasAddToCart ? 5 : -10));
  const trust = clamp(35 + (s.isHttps ? 8 : -25) + (s.hasReviews ? 12 : -10) + (s.hasGuarantee ? 10 : -5) + (s.hasPrivacy ? 5 : -8) + (s.hasTerms ? 5 : -6) + (s.hasContact ? 5 : -8) + (s.hasAbout ? 4 : -4));
  const brandAuth = clamp(35 + (s.socialLinks.length * 5) + (s.hasBlog ? 8 : -4) + (s.hasAbout ? 6 : -4) + (s.metaDesc ? 4 : -4));
  const productPos = clamp(45 + (s.hasUSP ? 12 : -8) + (s.metaDesc ? 6 : -6) + (s.title.length > 25 ? 4 : -4));
  const acquisition = clamp((paidScore + seoOverall + (s.socialLinks.length >= 3 ? 65 : 40)) / 3);
  const retention = clamp(30 + (s.hasKlaviyo ? 15 : -5) + (s.hasSMS ? 12 : 0) + (s.hasSubscription ? 12 : 0) + (s.hasNewsletter ? 8 : -5) + (s.hasReviews ? 5 : 0));
  const customerExp = clamp((croScore + trust + (s.hasChat ? 70 : 45)) / 3);
  const marketPos = clamp((brandAuth + productPos + trust) / 3);
  const compAdv = clamp((brandAuth + productPos + (s.hasUSP ? 60 : 35)) / 3);
  const revenueEff = clamp((croScore + retention + paidScore) / 3);
  const scalability = clamp((paidScore + retention + seoOverall) / 3);
  const maturity = clamp((trust + brandAuth + retention + seoOverall) / 4);
  const overall = clamp((seoOverall + paidScore + croScore + trust + brandAuth + retention + customerExp + marketPos + compAdv + revenueEff + scalability + maturity) / 12);

  const signalFlags = [
    s.reachable, s.isHttps, s.hasViewport, Boolean(s.title), Boolean(s.metaDesc), Boolean(s.canonical),
    s.hasSchema, s.hasFavicon, s.h1Count === 1, s.imgCount === 0 || s.imgMissingAlt / s.imgCount <= 0.3,
    s.hasReviews, s.hasTrustBadges, s.hasUSP, s.hasGuarantee, s.hasAddToCart, s.hasShipping,
    s.hasReturns, s.hasContact, s.hasAbout, s.hasFAQ, s.hasBlog, s.hasNewsletter, s.hasPrivacy,
    s.hasTerms, s.hasMetaPixel, s.hasGA, s.hasTikTok, s.hasKlaviyo, s.hasSMS, s.hasSubscription,
    s.hasChat, s.socialLinks.length >= 2,
  ];
  const detectedSignals = signalFlags.filter(Boolean).length;
  const signalEvidence = (yes: boolean, present: string, absent: string) => yes ? present : absent;
  const confidenceCategories = [
    {
      category: "SEO",
      confidence: s.reachable ? 94 : 35,
      recommendation: seoOverall < 65 ? "Fix technical and on-page SEO foundations first." : "Protect the foundation and expand commercial content.",
      drivers: [
        { signal: "Canonical URL", detected: Boolean(s.canonical), evidence: signalEvidence(Boolean(s.canonical), `Found: ${s.canonical}`, "No canonical tag found"), impact: s.canonical ? "+6 technical points" : "-6 technical points" },
        { signal: "Structured data", detected: s.hasSchema, evidence: signalEvidence(s.hasSchema, "JSON-LD detected", "No JSON-LD detected"), impact: s.hasSchema ? "+10 technical points" : "-8 technical points" },
        { signal: "Single H1", detected: s.h1Count === 1, evidence: `${s.h1Count} H1 tag${s.h1Count === 1 ? "" : "s"} found`, impact: s.h1Count === 1 ? "+8 on-page points" : "Up to -12 on-page points" },
        { signal: "Meta description", detected: Boolean(s.metaDesc), evidence: s.metaDesc ? `${s.metaDesc.length} characters` : "Missing", impact: s.metaDesc ? "Supports organic CTR" : "-10 on-page points" },
      ],
    },
    {
      category: "Conversion & trust",
      confidence: s.reachable ? 91 : 30,
      recommendation: croScore < 65 ? "Prioritize proof, risk reversal, and the purchase path." : "Test incremental PDP and checkout improvements.",
      drivers: [
        { signal: "Reviews", detected: s.hasReviews, evidence: signalEvidence(s.hasReviews, "Review text or widget detected", "No reviews detected"), impact: s.hasReviews ? "+10 CRO / +12 trust" : "-8 CRO / -10 trust" },
        { signal: "Guarantee", detected: s.hasGuarantee, evidence: signalEvidence(s.hasGuarantee, "Guarantee language detected", "No guarantee detected"), impact: s.hasGuarantee ? "+10 trust points" : "-5 trust points" },
        { signal: "Primary purchase CTA", detected: s.hasAddToCart, evidence: signalEvidence(s.hasAddToCart, "Add-to-cart language detected", "No add-to-cart language detected"), impact: s.hasAddToCart ? "+5 CRO points" : "-10 CRO points" },
        { signal: "Trust badges", detected: s.hasTrustBadges, evidence: signalEvidence(s.hasTrustBadges, "Security/trust terms detected", "No trust badges detected"), impact: s.hasTrustBadges ? "+8 CRO points" : "-5 CRO points" },
      ],
    },
    {
      category: "Acquisition tracking",
      confidence: s.reachable ? 89 : 25,
      recommendation: paidScore < 60 ? "Install measurement before increasing ad spend." : "Tracking foundation is ready for structured creative tests.",
      drivers: [
        { signal: "Meta Pixel", detected: s.hasMetaPixel, evidence: signalEvidence(s.hasMetaPixel, "Meta Pixel code detected", "Meta Pixel not detected"), impact: s.hasMetaPixel ? "+20 paid points" : "-5 paid points" },
        { signal: "GA4 / GTM", detected: s.hasGA, evidence: signalEvidence(s.hasGA, "Google analytics code detected", "GA4/GTM not detected"), impact: s.hasGA ? "+12 paid points" : "-5 paid points" },
        { signal: "TikTok Pixel", detected: s.hasTikTok, evidence: signalEvidence(s.hasTikTok, "TikTok tracking detected", "TikTok tracking not detected"), impact: s.hasTikTok ? "+10 paid points" : "No score change" },
      ],
    },
    {
      category: "Retention",
      confidence: s.reachable ? 87 : 25,
      recommendation: retention < 60 ? "Build email capture and lifecycle flows before adding channels." : "Advance segmentation, loyalty, and repeat-purchase programs.",
      drivers: [
        { signal: "Email platform", detected: s.hasKlaviyo, evidence: signalEvidence(s.hasKlaviyo, "Klaviyo detected", "Klaviyo not detected"), impact: s.hasKlaviyo ? "+15 retention points" : "-5 retention points" },
        { signal: "Newsletter capture", detected: s.hasNewsletter, evidence: signalEvidence(s.hasNewsletter, "Signup language detected", "No newsletter capture detected"), impact: s.hasNewsletter ? "+8 retention points" : "-5 retention points" },
        { signal: "SMS platform", detected: s.hasSMS, evidence: signalEvidence(s.hasSMS, "SMS tool detected", "No SMS tool detected"), impact: s.hasSMS ? "+12 retention points" : "No score change" },
        { signal: "Subscription", detected: s.hasSubscription, evidence: signalEvidence(s.hasSubscription, "Subscription offer detected", "No subscription offer detected"), impact: s.hasSubscription ? "+12 retention points" : "No score change" },
      ],
    },
  ];

  // ---------- Issues ----------
  const techIssues: string[] = [];
  if (!s.isHttps) techIssues.push("Site not served over HTTPS");
  if (!s.canonical) techIssues.push("Missing canonical tag");
  if (!s.hasSchema) techIssues.push("No JSON-LD structured data");
  if (s.h1Count === 0) techIssues.push("Missing H1 heading");
  if (s.h1Count > 1) techIssues.push(`${s.h1Count} H1 tags (should be 1)`);
  if (!s.hasViewport) techIssues.push("Missing mobile viewport meta");
  if (s.imgCount > 0 && s.imgMissingAlt / s.imgCount > 0.3) techIssues.push(`${s.imgMissingAlt}/${s.imgCount} images missing alt text`);

  const friction: string[] = [];
  if (!s.hasUSP) friction.push("No visible USP / value prop above fold");
  if (!s.hasTrustBadges) friction.push("Zero trust badges or security signals");
  if (!s.hasReviews) friction.push("No review widget / star ratings");
  if (!s.hasChat) friction.push("No live chat for objection handling");
  if (s.wordCount < 250) friction.push("Thin homepage copy (<250 words)");

  const trustGaps: string[] = [];
  if (!s.isHttps) trustGaps.push("Site is HTTP — browser flags as insecure");
  if (!s.hasReviews) trustGaps.push("No social proof / reviews visible");
  if (!s.hasGuarantee) trustGaps.push("No money-back guarantee shown");
  if (!s.hasPrivacy) trustGaps.push("Privacy policy not linked");
  if (!s.hasContact) trustGaps.push("No clear contact page");

  const killers: string[] = [];
  if (!s.hasAddToCart) killers.push("No detectable add-to-cart on landing");
  if (!s.hasViewport) killers.push("Not mobile-optimized (~70% of traffic)");
  if (!s.hasMetaPixel && !s.hasGA) killers.push("No tracking pixel — cannot optimize ads");
  if (!s.metaDesc) killers.push("Missing meta description — low CTR from search");
  if (!s.hasShipping) killers.push("Shipping info not surfaced — cart abandons");

  // ---------- Revenue leakage ----------
  const leaks: z.infer<typeof leakSchema>[] = [];
  if (!s.hasKlaviyo && !s.hasNewsletter) leaks.push({ area: "Email capture", leak: "No newsletter / email capture detected", severity: "High", impact: "Losing 20-30% revenue from flows (welcome, browse, cart)" });
  if (!s.hasReviews) leaks.push({ area: "Social proof", leak: "No reviews shown on site", severity: "High", impact: "Reviews lift CR by 10-30% on average" });
  if (!s.hasMetaPixel) leaks.push({ area: "Tracking", leak: "Meta Pixel missing", severity: "Critical", impact: "Cannot retarget or optimize Meta ads → 30-50% wasted spend" });
  if (!s.hasGA) leaks.push({ area: "Analytics", leak: "GA4 not detected", severity: "High", impact: "Flying blind on traffic & funnel drop-off" });
  if (!s.hasSchema) leaks.push({ area: "SEO", leak: "No product/FAQ schema", severity: "Medium", impact: "Missing rich results → 15-30% lower organic CTR" });
  if (!s.hasGuarantee) leaks.push({ area: "Risk reversal", leak: "No guarantee on site", severity: "Medium", impact: "Higher cart abandonment from risk-averse buyers" });
  if (!s.hasSubscription && /coffee|supplement|skincare|pet|food/i.test(s.title + s.metaDesc)) leaks.push({ area: "Retention", leak: "Subscription model not offered", severity: "High", impact: "LTV ~2-3x lower vs subscribe & save" });
  if (!s.hasUSP) leaks.push({ area: "Positioning", leak: "USP not above fold", severity: "Medium", impact: "Bounce rate 10-20% higher than category benchmark" });

  // ---------- Issue classification ----------
  const allIssues: { issue: string; why: string; fix: string; sev: "super" | "hot" | "med" }[] = [];
  if (!s.isHttps) allIssues.push({ issue: "HTTP, not HTTPS", why: "Chrome blocks checkout; trust destroyed", fix: "Enable SSL today via host/platform", sev: "super" });
  if (!s.hasMetaPixel) allIssues.push({ issue: "Meta Pixel missing", why: "Cannot optimize, retarget or measure ROAS", fix: "Install Pixel + CAPI within 24h", sev: "super" });
  if (!s.hasViewport) allIssues.push({ issue: "Not mobile-friendly", why: "70% of ecom traffic is mobile", fix: "Add viewport meta + responsive theme", sev: "super" });
  if (s.h1Count === 0) allIssues.push({ issue: "No H1 on homepage", why: "Google can't read primary topic", fix: "Add a single keyword-rich H1", sev: "hot" });
  if (!s.hasReviews) allIssues.push({ issue: "No reviews visible", why: "92% of buyers read reviews first", fix: "Install Judge.me / Loox this week", sev: "hot" });
  if (!s.metaDesc) allIssues.push({ issue: "No meta description", why: "Lower SERP CTR by 5-15%", fix: "Write 140-char descriptions per page", sev: "hot" });
  if (!s.hasSchema) allIssues.push({ issue: "No structured data", why: "Missing rich snippets in search", fix: "Add Product + FAQ JSON-LD", sev: "hot" });
  if (!s.hasGuarantee) allIssues.push({ issue: "No guarantee shown", why: "Risk-averse buyers bounce at PDP", fix: "Add 30-day money-back badge", sev: "hot" });
  if (!s.hasKlaviyo) allIssues.push({ issue: "No email marketing tool", why: "Email = 20-35% of mature DTC revenue", fix: "Install Klaviyo + 4 core flows", sev: "hot" });
  if (s.imgMissingAlt > 5) allIssues.push({ issue: `${s.imgMissingAlt} images missing alt`, why: "Hurts SEO and accessibility", fix: "Bulk-add descriptive alt text", sev: "med" });
  if (!s.hasChat) allIssues.push({ issue: "No live chat", why: "Objections not handled in real time", fix: "Install Tidio/Gorgias free tier", sev: "med" });
  if (!s.hasBlog) allIssues.push({ issue: "No blog/content hub", why: "Limits organic traffic ceiling", fix: "Publish 2 SEO articles/month", sev: "med" });
  if (!s.socialLinks.length) allIssues.push({ issue: "No social proof links", why: "Brand looks new / unestablished", fix: "Link IG + TikTok in footer", sev: "med" });
  if (!s.hasFAQ) allIssues.push({ issue: "No FAQ page", why: "Pre-purchase friction unhandled", fix: "Add FAQ with top 10 questions", sev: "med" });
  if (!s.hasTrustBadges) allIssues.push({ issue: "No trust badges", why: "Lowers perceived safety at checkout", fix: "Add SSL/payment/return badges", sev: "med" });

  const superHot = allIssues.filter((i) => i.sev === "super").slice(0, 5).map(({ sev, ...r }) => r);
  const hot = allIssues.filter((i) => i.sev === "hot").slice(0, 5).map(({ sev, ...r }) => r);
  const medium = allIssues.filter((i) => i.sev === "med").slice(0, 5).map(({ sev, ...r }) => r);

  // ---------- Opportunities ----------
  const opps: z.infer<typeof opportunitySchema>[] = [];
  if (!s.hasKlaviyo) opps.push({ title: "Launch core email flows", expectedImpact: "+20-30% revenue", difficulty: "Medium", roi: "Very High", action: "Klaviyo + welcome/cart/browse/post-purchase" });
  if (!s.hasReviews) opps.push({ title: "Install review system", expectedImpact: "+10-25% CR", difficulty: "Easy", roi: "High", action: "Loox or Judge.me with photo reviews" });
  if (!s.hasSchema) opps.push({ title: "Add product schema", expectedImpact: "+15-30% organic CTR", difficulty: "Easy", roi: "High", action: "Inject Product + Review JSON-LD" });
  if (!s.hasUSP) opps.push({ title: "Rewrite above-fold USP", expectedImpact: "+8-15% CR", difficulty: "Easy", roi: "High", action: "Benefit-led hero + 3 trust bullets" });
  if (!s.hasSubscription) opps.push({ title: "Test subscribe & save", expectedImpact: "+2-3× LTV", difficulty: "Medium", roi: "Very High", action: "Recharge / Appstle with 10% off" });
  if (!s.hasMetaPixel) opps.push({ title: "Install Meta Pixel + CAPI", expectedImpact: "+25-40% ROAS", difficulty: "Easy", roi: "Very High", action: "Pixel + server-side events" });
  while (opps.length < 3) opps.push({ title: "Run a structured CRO sprint", expectedImpact: "+10-20% CR", difficulty: "Medium", roi: "High", action: "A/B test PDP, cart, checkout for 30 days" });
  const opportunities = opps.slice(0, 5);

  // ---------- Action plan ----------
  const immediate: string[] = [];
  if (!s.isHttps) immediate.push("Force HTTPS sitewide");
  if (!s.hasMetaPixel) immediate.push("Install Meta Pixel + Conversions API");
  if (!s.hasGA) immediate.push("Install GA4 + ecommerce events");
  if (!s.hasReviews) immediate.push("Add review widget to PDP");
  if (!s.hasSchema) immediate.push("Add Product + FAQ JSON-LD");
  if (!s.hasUSP) immediate.push("Add USP + trust bar above fold");
  if (!s.metaDesc) immediate.push("Write meta titles + descriptions");
  while (immediate.length < 3) immediate.push("Audit & fix top 3 PDP friction points");

  const growth: string[] = [];
  if (!s.hasKlaviyo) growth.push("Build 4 core email flows in Klaviyo");
  if (!s.hasSMS) growth.push("Add SMS via Postscript or Attentive");
  growth.push("Launch creative-testing system on Meta");
  growth.push("Publish 8 SEO articles targeting bottom-funnel terms");
  if (!s.hasSubscription) growth.push("Test subscribe & save on top SKU");
  growth.push("Run weekly A/B tests on PDP + cart");

  const scale: string[] = [];
  scale.push("Open TikTok + YouTube ad channels");
  scale.push("Layer Google Shopping + Performance Max");
  scale.push("Launch influencer/UGC seeding program");
  scale.push("Expand into 1 new geo with localized funnel");
  scale.push("Build loyalty + referral program");

  // ---------- Competitors (industry-generic) ----------
  const niche = guessNiche(s);
  const competitors = buildCompetitors(niche);

  // ---------- Final report ----------
  const totalIssues = techIssues.length + friction.length + trustGaps.length + killers.length + leaks.length;
  const headline = overall >= 70
    ? `${s.brandName}: solid foundation — unlock next 30-50% via CRO + retention`
    : overall >= 45
      ? `${s.brandName}: leaking revenue across ${totalIssues}+ areas — fast fixes available`
      : `${s.brandName}: critical gaps blocking growth — fix fundamentals first`;

  const revenuePotential: "Low" | "Medium" | "High" | "Very High" =
    overall >= 70 ? "Very High" : overall >= 55 ? "High" : overall >= 35 ? "Medium" : "Low";

  return {
    storeName: s.brandName,
    platformGuess: s.platform,
    business: {
      brand: s.brandName,
      website: s.host,
      platform: s.platform,
      industry: niche.industry,
      niche: niche.niche,
      productCategory: niche.category,
      targetAudience: niche.audience,
      pricePositioning: "Mid-Market",
      businessModel: s.platform === "Shopify" ? "DTC" : "DTC",
    },
    executiveIntelligence: {
      businessReality: `${s.platform} store with ${s.tools.length || "few"} tools installed. Health ${overall}/100.`,
      biggestOpportunity: opportunities[0]?.title || "CRO sprint on PDP & checkout",
      biggestThreat: !s.hasMetaPixel ? "Untracked ad spend — cannot optimize" : !s.hasReviews ? "No social proof — buyers bounce" : "Competitor brand authority gap",
      revenuePotential,
      revenuePotentialReasoning: `Based on ${totalIssues} fixable issues + ${opportunities.length} high-ROI levers`,
      headline,
    },
    scorecard: {
      seo: seoOverall, paidAds: paidScore, cro: croScore,
      brandAuthority: brandAuth, trust, productPositioning: productPos,
      customerAcquisition: acquisition, retention, customerExperience: customerExp,
      marketPosition: marketPos, competitiveAdvantage: compAdv, revenueEfficiency: revenueEff,
      scalability, businessMaturity: maturity, overall,
    },
    confidenceBreakdown: {
      overall: s.reachable ? clamp(82 + Math.min(12, s.htmlSize / 20000)) : 28,
      scannedSignals: signalFlags.length,
      detectedSignals,
      coverageNote: s.reachable
        ? `Analyzed ${s.htmlSize.toLocaleString()} HTML characters and ${signalFlags.length} local on-page signals. Off-site rankings, ad-account data, and checkout-only events are not included.`
        : "The storefront could not be fully fetched, so recommendations use limited URL-level evidence.",
      categories: confidenceCategories,
    },
    seoIntelligence: {
      technical: { score: clamp(seoTech), verdict: clamp(seoTech) >= 70 ? "Strong technical foundation" : `${techIssues.length} technical issues need fixing` },
      onPage: { score: clamp(seoOnPage), verdict: s.h1Count === 1 && s.metaDesc ? "Decent on-page SEO" : "Weak titles/headings/meta" },
      contentAuthority: { score: seoContent, verdict: s.hasBlog ? "Content engine present" : "No content = capped organic growth" },
      commercialSeo: { score: seoCommercial, verdict: s.hasSchema ? "Schema giving rich results" : "Missing product/FAQ schema" },
      technicalIssues: techIssues.slice(0, 6),
      competitiveSeoGap: niche.industry + " leaders publish 4-8× more content with rich schema",
    },
    adsIntelligence: {
      metaActivity: s.hasMetaPixel ? "Pixel installed — likely running Meta ads" : "No Pixel detected — not running tracked Meta ads",
      googleActivity: s.hasGA ? "GA4 present — Google Ads possible" : "No GA4 — Google Ads not measurable",
      creativeStrategy: "Inferred basic — no creative testing system visible",
      offerStrategy: s.hasUSP ? "Has an offer/USP on site" : "No clear offer — weak ad-to-LP match",
      messaging: s.title ? `Lead message: "${s.title.slice(0, 60)}"` : "No clear lead message",
      hooks: "Generic — needs hook-first creative system",
      acquisitionMaturity: paidScore >= 70 ? "Advanced" : paidScore >= 50 ? "Intermediate" : "Beginner",
      maturityReasoning: `Tracking stack covers ${s.tools.filter(t => /Pixel|GA|TikTok/.test(t)).length}/3 major channels`,
    },
    conversionIntelligence: {
      homepage: s.hasUSP ? "Has USP, can be sharpened" : "Weak hero — no clear value prop",
      productPages: s.hasReviews ? "Reviews present" : "PDP missing reviews/social proof",
      cartCheckout: s.hasShipping ? "Shipping surfaced" : "Shipping unclear — cart abandons",
      mobile: s.hasViewport ? "Mobile viewport set" : "Not mobile-optimized — critical",
      ctaStrength: s.hasAddToCart ? "Add-to-cart present" : "No visible primary CTA",
      friction: friction.slice(0, 5),
      trustGaps: trustGaps.slice(0, 5),
      conversionKillers: killers.slice(0, 5),
    },
    brandIntelligence: {
      positioning: niche.category + " brand on " + s.platform,
      valueProposition: s.hasUSP ? "USP detected on page" : "No clear value proposition",
      storytelling: s.hasAbout ? "About page exists" : "No brand story / about page",
      differentiation: s.hasUSP ? "Has differentiator vs commodity" : "Looks like a commodity store",
      visualIdentity: s.ogImage ? "OG image set for sharing" : "No social share image — weak brand surface",
      premiumPerception: trust >= 65 ? "Reads as trustworthy" : "Reads as low-trust / new brand",
      whyChooseThisBrand: s.hasGuarantee && s.hasReviews ? "Guarantee + reviews give a reason" : "No strong reason to choose vs competitors",
    },
    psychologyIntelligence: {
      trust: trust >= 65 ? "High — trust signals stacked" : "Low — trust gaps visible",
      riskPerception: s.hasGuarantee ? "Lowered by guarantee" : "High — no risk reversal",
      buyingMotivation: niche.motivation,
      emotionalTriggers: s.hasReviews ? "Social proof active" : "No emotional triggers in copy",
      socialProof: s.hasReviews ? "Reviews + ratings present" : "Missing entirely",
      authoritySignals: s.hasBlog || s.socialLinks.length >= 3 ? "Some authority signals" : "Almost none",
      firstTimeTrustVerdict: trust >= 65 ? "Yes" : trust >= 45 ? "Maybe" : "No",
      trustReasoning: `Trust score ${trust}/100 based on HTTPS, reviews, guarantee, policies`,
    },
    acquisitionIntelligence: {
      organic: seoOverall >= 60 ? "SEO foundation present" : "Organic capped by technical+content gaps",
      paid: paidScore >= 60 ? "Tracking ready for paid scale" : "Not ready — install pixels first",
      social: s.socialLinks.length >= 3 ? `Active on ${s.socialLinks.length} platforms` : "Weak social presence",
      influencer: "No influencer/UGC system detected",
      emailSms: s.hasKlaviyo ? "Email tool installed" : "No email tool — biggest leak",
      mostLikelyGrowthChannel: !s.hasKlaviyo ? "Email/SMS" : !s.hasMetaPixel ? "Paid social" : "SEO + content",
      highestRoiChannel: "Email/SMS flows once installed",
      mostUnderutilizedChannel: s.hasBlog ? "Email/SMS retention" : "SEO content",
    },
    retentionIntelligence: {
      email: s.hasKlaviyo ? "Klaviyo installed — verify flows live" : "No email tool",
      sms: s.hasSMS ? "SMS tool detected" : "Not in use",
      loyalty: "No loyalty program detected",
      subscription: s.hasSubscription ? "Subscription option present" : "Not offered",
      repeatPurchase: retention >= 60 ? "Decent retention stack" : "Capped — install flows + loyalty",
      retentionMaturityScore: retention,
      retentionVerdict: retention >= 60 ? "Retention infrastructure in place" : "Retention is biggest revenue lever",
    },
    competitors,
    competitiveGap: {
      competitorAdvantages: [
        "Higher review counts (1k+ vs likely <100)",
        "Stronger email/SMS flow stacks",
        "More UGC and influencer content",
        "Better SEO content depth",
        "Subscription/loyalty programs live",
      ],
      missingFeatures: [
        !s.hasReviews ? "Review widget on PDP" : "Photo/video review prompts",
        !s.hasSubscription ? "Subscribe & save option" : "Multi-tier subscription",
        !s.hasChat ? "Live chat" : "AI chat for FAQs",
        !s.hasBlog ? "Content/blog hub" : "Long-form pillar pages",
        !s.hasKlaviyo ? "Email capture popup" : "Advanced segmentation",
      ].slice(0, 5),
      marketOpportunities: [
        "Long-tail SEO content gap",
        "UGC creator partnerships",
        "Bundle/upsell strategy",
        "Localized funnel for top geo",
        "B2B / wholesale channel",
      ],
      differentiationOpportunities: [
        s.hasGuarantee ? "Promote guarantee harder above fold" : "Add bold guarantee as differentiator",
        "Founder story-led brand content",
        "Sustainability / values positioning",
        "Stronger USP vs commodity competitors",
        "Premium packaging unboxing",
      ],
      blueOcean: [
        niche.blueOcean1,
        niche.blueOcean2,
        "Underserved geo segment",
      ],
    },
    revenueLeakage: leaks.slice(0, 8),
    issueClassification: {
      superHot: superHot.length ? superHot : [{ issue: "Tighten above-fold conversion", why: "Hero is the highest-leverage real estate", fix: "Test 3 new headlines this week" }],
      hot: hot.length ? hot : [{ issue: "Audit PDP for trust gaps", why: "Trust drives PDP-to-cart rate", fix: "Add reviews, badges, guarantee" }],
      medium: medium.length ? medium : [{ issue: "Build content engine", why: "Compound organic growth", fix: "Publish 2 articles/week" }],
    },
    opportunities,
    actionPlan: {
      immediate: immediate.slice(0, 7),
      growth: growth.slice(0, 7),
      scale: scale.slice(0, 7),
    },
    founderInsights: {
      privateEquity: `Health ${overall}/100. ${overall >= 60 ? "Fundable with optimization plan" : "Pre-investable — fix fundamentals"}.`,
      croExpert: `CRO ${croScore}/100. Focus on ${friction[0] || "PDP trust"}.`,
      brandingExpert: `Brand ${brandAuth}/100. ${s.hasAbout ? "Story exists, sharpen positioning" : "Missing brand story — start there"}.`,
      performanceMarketer: `Paid ${paidScore}/100. ${s.hasMetaPixel ? "Optimize creative" : "Install pixels first"}.`,
      ceo: `Top 90-day move: ${opportunities[0]?.title || "Install full tracking + email flows"}.`,
    },
  };
}

function guessNiche(s: Signals): { industry: string; niche: string; category: string; audience: string; motivation: string; blueOcean1: string; blueOcean2: string } {
  const t = (s.title + " " + s.metaDesc + " " + s.host).toLowerCase();
  if (/coffee|tea|brew/.test(t)) return { industry: "Food & Beverage", niche: "Specialty coffee/tea", category: "Consumables", audience: "Specialty beverage enthusiasts 25-55", motivation: "Daily ritual + flavor experience", blueOcean1: "Coffee + wellness crossover", blueOcean2: "Coffee subscription with rotating origin" };
  if (/supplement|vitamin|protein|nootropic/.test(t)) return { industry: "Health & Wellness", niche: "Supplements", category: "Health", audience: "Health-conscious 25-50", motivation: "Performance + longevity", blueOcean1: "Personalized supplement stacks", blueOcean2: "Subscription with health-coach access" };
  if (/skincare|beauty|cosmetic|skin/.test(t)) return { industry: "Beauty", niche: "Skincare/cosmetics", category: "Beauty", audience: "Beauty buyers 20-45", motivation: "Confidence + self-care", blueOcean1: "Clinical-grade affordable line", blueOcean2: "Male skincare focus" };
  if (/pet|dog|cat/.test(t)) return { industry: "Pet", niche: "Pet products", category: "Pet care", audience: "Pet parents 25-55", motivation: "Pet love + guilt avoidance", blueOcean1: "Vet-formulated subscription", blueOcean2: "Senior pet niche" };
  if (/fashion|cloth|apparel|wear/.test(t)) return { industry: "Fashion", niche: "Apparel", category: "Fashion", audience: "Style buyers 18-45", motivation: "Identity + status", blueOcean1: "Size-inclusive premium", blueOcean2: "Capsule wardrobe positioning" };
  if (/jewel|ring|necklace/.test(t)) return { industry: "Jewelry", niche: "Fine/fashion jewelry", category: "Jewelry", audience: "Gift buyers + self-purchasers 25-55", motivation: "Emotion + milestone", blueOcean1: "Custom personalized line", blueOcean2: "Lab-grown diamond focus" };
  if (/home|decor|furniture|kitchen/.test(t)) return { industry: "Home & Lifestyle", niche: "Home goods", category: "Home", audience: "Homeowners + nesters 28-55", motivation: "Comfort + aesthetic identity", blueOcean1: "Modular small-space line", blueOcean2: "Sustainability-led decor" };
  if (/fit|gym|yoga|sport/.test(t)) return { industry: "Fitness", niche: "Fitness/activewear", category: "Sports", audience: "Active adults 20-45", motivation: "Performance + identity", blueOcean1: "Recovery-focused sub-niche", blueOcean2: "Hybrid wear-to-work line" };
  return { industry: "Ecommerce", niche: "DTC retail", category: "Consumer goods", audience: "Online shoppers 25-55", motivation: "Convenience + value + trust", blueOcean1: "Bundle + subscription play", blueOcean2: "Localized premium positioning" };
}

function buildCompetitors(n: ReturnType<typeof guessNiche>): z.infer<typeof competitorSchema>[] {
  return [
    { name: `Top ${n.niche} brand A`, website: "industry-leader-a.com", tier: "Tier 1", positioning: "Premium category leader", strengths: "Brand authority, content, reviews", weaknesses: "Higher prices, slower innovation", usp: "Most trusted name in category" },
    { name: `Top ${n.niche} brand B`, website: "industry-leader-b.com", tier: "Tier 1", positioning: "Volume + value leader", strengths: "Price, distribution, ad spend", weaknesses: "Generic brand, weak loyalty", usp: "Best price-to-quality ratio" },
    { name: `Challenger ${n.category} brand`, website: "challenger-brand.com", tier: "Tier 2", positioning: "DTC disruptor", strengths: "Strong UGC, modern brand", weaknesses: "Smaller catalog", usp: "Cool factor + community" },
    { name: `Niche specialist`, website: "niche-specialist.com", tier: "Tier 2", positioning: "Specialist for sub-segment", strengths: "Deep niche expertise, loyal base", weaknesses: "Limited TAM", usp: "Best for one specific buyer" },
    { name: `Marketplace alternative`, website: "amazon.com", tier: "Tier 1", positioning: "Marketplace convenience", strengths: "Trust, shipping, reviews", weaknesses: "No brand relationship", usp: "Fastest and easiest checkout" },
  ];
}

export const runStoreAudit = createServerFn({ method: "POST" })
  .inputValidator((data) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    let normalized: string;
    try { normalized = normalizeUrl(data.url); }
    catch { throw new Error("Please enter a valid store URL."); }

    const { html, status } = await fetchPage(normalized);
    if (!html) {
      throw new Error(`Could not reach ${normalized}. Check the URL and try again.`);
    }
    const signals = analyzeHtml(html, normalized, status);
    const report = buildReport(signals, { revenue: data.revenue, adSpend: data.adSpend, country: data.country });
    const validated = auditReportSchema.safeParse(report);
    if (!validated.success) {
      console.error("[audit] internal report schema failed", validated.error.issues.slice(0, 5));
      throw new Error("Audit engine returned invalid shape.");
    }
    return { url: normalized, report: validated.data };
  });
