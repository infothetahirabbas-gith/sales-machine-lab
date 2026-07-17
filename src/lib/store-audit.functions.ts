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
  brokenImageCount: number; brokenImageSamples: string[];
  linkCount: number; wordCount: number; htmlSize: number;
  platform: string; tools: string[]; toolCount: number;
  // review detection (separate from app detection)
  hasReviewApp: boolean; hasReviewText: boolean; hasStarMarkup: boolean; hasTestimonialBlock: boolean; hasReviews: boolean;
  hasChat: boolean; hasSubscription: boolean; hasKlaviyo: boolean; hasMetaPixel: boolean; hasGA: boolean; hasTikTok: boolean; hasSMS: boolean;
  hasAddToCart: boolean; hasCheckout: boolean; hasShipping: boolean; hasReturns: boolean; hasContact: boolean; hasAbout: boolean; hasFAQ: boolean; hasBlog: boolean;
  hasNewsletter: boolean; hasPrivacy: boolean; hasTerms: boolean;
  hasTrustBadges: boolean; hasUSP: boolean; hasGuarantee: boolean;
  socialLinks: string[]; brandName: string;
  // new: template residue + fake contact
  templateResidue: string[]; fakeContact: string[];
  // new: geo / market detection
  detectedCurrency: string | null; detectedPhonePrefix: string | null; detectedCountry: string | null;
  isNonWesternMarket: boolean;
  // new: footer / copyright year
  copyrightYear: number | null; copyrightStale: boolean;
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

  // ---- Broken / placeholder image detection ----
  const placeholderPattern = /(dummy|placeholder|sample[-_]?(?:image|product)|lorem|demo[-_]?(?:image|product)|no[-_]?image|default[-_]?image|via\.placeholder\.com|placehold\.it|placeholder\.com|unsplash\.com\/featured|picsum\.photos)/i;
  const brokenImageSamples: string[] = [];
  for (const tag of imgs) {
    const srcMatch = tag.match(/\bsrc\s*=\s*["']([^"']+)["']/i);
    const src = srcMatch?.[1] ?? "";
    if (src && placeholderPattern.test(src)) {
      if (brokenImageSamples.length < 3) brokenImageSamples.push(src.slice(0, 90));
    }
  }
  const brokenImageCount = brokenImageSamples.length;

  const links = (html.match(/<a\b/gi) || []).length;
  const text = html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const textLower = text.toLowerCase();
  const wordCount = text ? text.split(/\s+/).length : 0;

  const platform =
    /cdn\.shopify\.com|shopify\.com\/s\/|x-shopid|shopify-section/i.test(html) ? "Shopify" :
    /wp-content|woocommerce|wc-block|wp-json/i.test(html) ? "WooCommerce" :
    /bigcommerce|stencil-utils/i.test(html) ? "BigCommerce" :
    /magento|mage\/|adobe-commerce/i.test(html) ? "Magento" :
    /wixstatic|wix\.com|_wix/i.test(html) ? "Wix" :
    /squarespace|static1\.squarespace/i.test(html) ? "Squarespace" :
    /webflow/i.test(html) ? "Webflow" :
    "Custom/Unknown";

  // ---- Expanded tool detection ----
  const tools: string[] = [];
  if (/klaviyo/i.test(html)) tools.push("Klaviyo");
  if (/mailchimp|list-manage\.com/i.test(html)) tools.push("Mailchimp");
  if (/omnisend/i.test(html)) tools.push("Omnisend");
  if (/gtag\(|googletagmanager|google-analytics/i.test(html)) tools.push("GA4/GTM");
  if (/connect\.facebook\.net|fbq\(|facebook-pixel/i.test(html)) tools.push("Meta Pixel");
  if (/judge\.me/i.test(html)) tools.push("Judge.me");
  if (/loox/i.test(html)) tools.push("Loox");
  if (/yotpo/i.test(html)) tools.push("Yotpo");
  if (/stamped/i.test(html)) tools.push("Stamped");
  if (/okendo/i.test(html)) tools.push("Okendo");
  if (/trustpilot\.com\/widget/i.test(html)) tools.push("Trustpilot widget");
  if (/recharge|rechargepayments/i.test(html)) tools.push("Recharge (Subs)");
  if (/bold[_-]subscriptions/i.test(html)) tools.push("Bold Subs");
  if (/appstle/i.test(html)) tools.push("Appstle Subs");
  if (/gorgias/i.test(html)) tools.push("Gorgias");
  if (/zendesk/i.test(html)) tools.push("Zendesk");
  if (/tidio/i.test(html)) tools.push("Tidio");
  if (/intercom/i.test(html)) tools.push("Intercom");
  if (/crisp\.chat/i.test(html)) tools.push("Crisp");
  if (/postscript/i.test(html)) tools.push("Postscript");
  if (/attentive/i.test(html)) tools.push("Attentive");
  if (/sms[_-]?bump|smsbump/i.test(html)) tools.push("SMSBump");
  if (/tiktok|ttclid|tiktok-pixel/i.test(html)) tools.push("TikTok Pixel");
  if (/pinterest|pintrk/i.test(html)) tools.push("Pinterest tag");
  if (/snap\.licdn|linkedin\.insight/i.test(html)) tools.push("LinkedIn Insight");
  if (/hotjar/i.test(html)) tools.push("Hotjar");
  if (/clarity\.ms/i.test(html)) tools.push("MS Clarity");
  if (/vwo\.com|visualwebsiteoptimizer/i.test(html)) tools.push("VWO");
  if (/optimizely/i.test(html)) tools.push("Optimizely");
  if (/wa\.me\/|api\.whatsapp/i.test(html)) tools.push("WhatsApp");
  const toolCount = tools.length;

  // ---- Review detection (separate from app detection) ----
  const reviewApps = ["Judge.me", "Loox", "Yotpo", "Stamped", "Okendo", "Trustpilot widget"];
  const hasReviewApp = tools.some((t) => reviewApps.includes(t));
  const hasStarMarkup = /★|⭐|class=["'][^"']*\b(stars?|rating|review-stars|spr-icon-star)\b/i.test(html);
  const hasReviewText = /\b\d(?:\.\d)?\s*\/\s*5\b|\b\d{2,}\s*reviews?\b|customer reviews|verified reviews|what (?:our )?customers say/i.test(textLower);
  const hasTestimonialBlock = /testimonial|"[A-Z][^"]{30,200}"\s*[---]\s*[A-Z][a-z]+/m.test(html);
  const hasReviews = hasReviewApp || hasStarMarkup || hasReviewText || hasTestimonialBlock;

  const socialLinks: string[] = [];
  if (/instagram\.com\//i.test(html)) socialLinks.push("Instagram");
  if (/facebook\.com\//i.test(html)) socialLinks.push("Facebook");
  if (/tiktok\.com\//i.test(html)) socialLinks.push("TikTok");
  if (/youtube\.com\/|youtu\.be\//i.test(html)) socialLinks.push("YouTube");
  if (/twitter\.com\/|x\.com\//i.test(html)) socialLinks.push("X/Twitter");
  if (/pinterest\.com\//i.test(html)) socialLinks.push("Pinterest");

  const brandName =
    (ogTitleMatch?.[1] || titleMatch?.[1] || host.split(".")[0])
      .split(/[|\-:·-]/)[0]
      .trim()
      .slice(0, 40) || host;

  // ---- Template residue ----
  const templateResidue: string[] = [];
  if (/lorem ipsum|dolor sit amet/i.test(textLower)) templateResidue.push("Lorem ipsum placeholder copy in body");
  if (/\byour (?:text|content|tagline|heading|store name|brand name) here\b/i.test(textLower)) templateResidue.push("Placeholder text e.g. 'your text here'");
  if (/\b(?:add your|edit this|sample (?:product|collection))\b/i.test(textLower)) templateResidue.push("Theme editor instructions still visible");
  if (/\bdemo store\b|powered by\s+shopify\s+•?\s*demo/i.test(textLower)) templateResidue.push("'Demo store' label still on site");
  if (/(t-?shirt|hoodie|mug)\s+example|example (?:product|collection)/i.test(textLower)) templateResidue.push("Example product names from theme demo");

  // ---- Fake / placeholder contact info ----
  const fakeContact: string[] = [];
  // Fake phone formats: (42) 500-456-789, 123-456-7890, +1 555-555-5555, 555-1234
  if (/\(\d{2}\)\s*\d{3}[-\s]\d{3}[-\s]\d{3}/.test(text)) fakeContact.push("Phone format looks like a template default e.g. '(42) 500-456-789'");
  if (/\b555[-\s]?(?:01\d{2}|1234|5555)\b/.test(text)) fakeContact.push("Uses 555 placeholder phone number");
  if (/\b123[-\s]?456[-\s]?7890\b/.test(text)) fakeContact.push("Uses 123-456-7890 placeholder phone");
  if (/\b1234\s+(?:main|elm|first|sample)\s+(?:st|street|ave)/i.test(text)) fakeContact.push("Uses sample street address");
  if (/example@example\.com|email@example\.com|test@test\.com|info@yourdomain/i.test(textLower)) fakeContact.push("Email address is a placeholder");

  // ---- Geo / market detection ----
  const currencyMap: Array<[RegExp, string, string | null]> = [
    [/PKR|Rs\.?\s?\d/i, "PKR", "+92"],
    [/INR|₹/i, "INR", "+91"],
    [/BDT|৳/i, "BDT", "+880"],
    [/AED|د\.إ/i, "AED", "+971"],
    [/SAR|﷼/i, "SAR", "+966"],
    [/QAR/i, "QAR", "+974"],
    [/EGP/i, "EGP", "+20"],
    [/NGN|₦/i, "NGN", "+234"],
    [/ZAR|R\s?\d/, "ZAR", "+27"],
    [/MYR|RM\s?\d/i, "MYR", "+60"],
    [/IDR|Rp\s?\d/i, "IDR", "+62"],
    [/PHP|₱/i, "PHP", "+63"],
    [/THB|฿/i, "THB", "+66"],
    [/TRY|₺/i, "TRY", "+90"],
    [/GBP|£\s?\d/, "GBP", "+44"],
    [/EUR|€\s?\d/, "EUR", null],
    [/AUD|A\$/i, "AUD", "+61"],
    [/CAD|C\$/i, "CAD", "+1"],
    [/USD|\$\s?\d/, "USD", "+1"],
  ];
  let detectedCurrency: string | null = null;
  let detectedPhonePrefix: string | null = null;
  for (const [pat, cur, prefix] of currencyMap) {
    if (pat.test(html)) { detectedCurrency = cur; detectedPhonePrefix = prefix; break; }
  }
  // Phone prefix overrides currency hint when present
  const prefixMatch = html.match(/\+(\d{1,3})\b/);
  if (prefixMatch) {
    const map: Record<string, string> = {
      "92": "+92", "91": "+91", "880": "+880", "971": "+971", "966": "+966",
      "974": "+974", "20": "+20", "234": "+234", "27": "+27", "60": "+60",
      "62": "+62", "63": "+63", "66": "+66", "90": "+90", "44": "+44",
      "61": "+61", "1": "+1",
    };
    if (map[prefixMatch[1]]) detectedPhonePrefix = map[prefixMatch[1]];
  }
  const countryFromCurrency: Record<string, string> = {
    PKR: "Pakistan", INR: "India", BDT: "Bangladesh", AED: "UAE", SAR: "Saudi Arabia",
    QAR: "Qatar", EGP: "Egypt", NGN: "Nigeria", ZAR: "South Africa", MYR: "Malaysia",
    IDR: "Indonesia", PHP: "Philippines", THB: "Thailand", TRY: "Turkey",
    GBP: "United Kingdom", AUD: "Australia",
  };
  const detectedCountry = detectedCurrency ? countryFromCurrency[detectedCurrency] ?? null : null;
  const nonWesternCurrencies = new Set(["PKR", "INR", "BDT", "AED", "SAR", "QAR", "EGP", "NGN", "MYR", "IDR", "PHP", "THB", "TRY"]);
  const isNonWesternMarket = detectedCurrency ? nonWesternCurrencies.has(detectedCurrency) : false;

  // ---- Copyright year ----
  const thisYear = new Date().getUTCFullYear();
  const yearMatches = [...html.matchAll(/(?:©|&copy;|copyright)\s*(\d{4})(?:\s*[---]\s*(\d{4}))?/gi)];
  let copyrightYear: number | null = null;
  for (const m of yearMatches) {
    const y = parseInt(m[2] || m[1], 10);
    if (y >= 2018 && y <= thisYear + 1 && (copyrightYear === null || y > copyrightYear)) copyrightYear = y;
  }
  const copyrightStale = copyrightYear !== null && copyrightYear < thisYear;

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
    brokenImageCount, brokenImageSamples,
    linkCount: links, wordCount, htmlSize: html.length,
    platform, tools, toolCount,
    hasReviewApp, hasReviewText, hasStarMarkup, hasTestimonialBlock, hasReviews,
    hasChat: /Gorgias|Zendesk|Tidio|Intercom|Crisp/.test(tools.join(" ")),
    hasSubscription: /Recharge|Bold|Appstle/.test(tools.join(" ")) || /subscribe & save|subscription/i.test(lower),
    hasKlaviyo: tools.includes("Klaviyo"),
    hasMetaPixel: tools.includes("Meta Pixel"),
    hasGA: tools.includes("GA4/GTM"),
    hasTikTok: tools.includes("TikTok Pixel"),
    hasSMS: /Postscript|Attentive|SMSBump/.test(tools.join(" ")),
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
    hasTrustBadges: /trustpilot|bbb|verified|secure checkout|ssl|norton secured|mcafee secure/i.test(lower),
    hasUSP: /free shipping|money[- ]?back|guarantee|lifetime|warranty/i.test(lower),
    hasGuarantee: /guarantee|money[- ]?back/i.test(lower),
    socialLinks, brandName,
    templateResidue, fakeContact,
    detectedCurrency, detectedPhonePrefix, detectedCountry, isNonWesternMarket,
    copyrightYear, copyrightStale,
  };
}

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));
const tools_includes = (s: Signals, name: string) => s.tools.some((t) => t.toLowerCase().includes(name.toLowerCase()));


function buildReport(s: Signals, input: { revenue?: string | null; adSpend?: string | null; country?: string | null }): z.infer<typeof auditReportSchema> {
  // ---------- Platform / geo branching context ----------
  const isShopify = s.platform === "Shopify";
  const isWoo = s.platform === "WooCommerce";
  // Trust user-supplied country first, else detected from currency / phone prefix.
  const effectiveCountry = (input.country && input.country !== "Other" ? input.country : null) ?? s.detectedCountry ?? "Global";
  const isNonWestern = s.isNonWesternMarket
    || /^(Pakistan|India|Bangladesh|Sri Lanka|UAE|Saudi Arabia|Qatar|Kuwait|Bahrain|Oman|Egypt|Nigeria|Kenya|Indonesia|Malaysia|Philippines|Thailand|Vietnam|Turkey|South Africa)$/i.test(effectiveCountry);
  const retentionChannel = isNonWestern ? "WhatsApp" : "SMS";
  const subTool = isShopify ? "Recharge or Appstle" : isWoo ? "WooCommerce Subscriptions or YITH Subscriptions" : "your platform's native subscriptions add-on";
  const reviewTool = isShopify ? "Judge.me or Loox" : isWoo ? "WP Customer Reviews or Site Reviews" : "a reviews widget that matches your platform";
  const smsTool = isNonWestern ? "WhatsApp Business API (Wati / Interakt / 360dialog)" : (isShopify ? "Postscript or Attentive" : "Omnisend SMS or Klaviyo SMS");
  const chatTool = isNonWestern ? "WhatsApp Chat widget" : "Gorgias or Tidio";

  // ---------- Scoring ----------
  let seoTech = 50;
  if (s.isHttps) seoTech += 8; else seoTech -= 20;
  if (s.hasViewport) seoTech += 6; else seoTech -= 10;
  if (s.canonical) seoTech += 6; else seoTech -= 6;
  if (s.hasSchema) seoTech += 10; else seoTech -= 8;
  if (s.hasFavicon) seoTech += 2;
  if (s.htmlSize > 500000) seoTech -= 8;
  if (s.brokenImageCount > 0) seoTech -= 6;

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
  const croScore = clamp(40 + (s.hasReviews ? 10 : -8) + (s.hasTrustBadges ? 8 : -5) + (s.hasUSP ? 10 : -6) + (s.hasChat ? 5 : 0) + (s.hasViewport ? 5 : -10) + (s.hasAddToCart ? 5 : -10) - (s.brokenImageCount > 0 ? 6 : 0) - (s.templateResidue.length > 0 ? 8 : 0));
  const trust = clamp(35 + (s.isHttps ? 8 : -25) + (s.hasReviews ? 12 : -10) + (s.hasGuarantee ? 10 : -5) + (s.hasPrivacy ? 5 : -8) + (s.hasTerms ? 5 : -6) + (s.hasContact ? 5 : -8) + (s.hasAbout ? 4 : -4) - (s.fakeContact.length > 0 ? 12 : 0) - (s.copyrightStale ? 4 : 0));
  const brandAuth = clamp(35 + (s.socialLinks.length * 5) + (s.hasBlog ? 8 : -4) + (s.hasAbout ? 6 : -4) + (s.metaDesc ? 4 : -4) - (s.templateResidue.length > 0 ? 10 : 0));
  // Positioning now has explicit breakdown (not a blank score)
  const posBrandClarity = s.title && s.brandName.length >= 3 ? 12 : -8;
  const posUsp = s.hasUSP ? 12 : -8;
  const posSocialProof = s.hasReviews ? 8 : -6;
  const posOgImage = s.ogImage ? 6 : -4;
  const posDifferentiation = s.hasGuarantee || s.hasSubscription ? 6 : -4;
  const productPos = clamp(45 + posBrandClarity + posUsp + posSocialProof + posOgImage + posDifferentiation);
  const acquisition = clamp((paidScore + seoOverall + (s.socialLinks.length >= 3 ? 65 : 40)) / 3);
  const retention = clamp(30 + (s.hasKlaviyo ? 15 : -5) + (s.hasSMS ? 12 : 0) + (s.hasSubscription ? 12 : 0) + (s.hasNewsletter ? 8 : -5) + (s.hasReviews ? 5 : 0) + (isNonWestern && tools_includes(s, "WhatsApp") ? 10 : 0));
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
    s.brokenImageCount === 0, s.templateResidue.length === 0, s.fakeContact.length === 0,
    s.hasReviewApp, s.hasStarMarkup, s.hasReviewText, s.hasTestimonialBlock,
    s.hasTrustBadges, s.hasUSP, s.hasGuarantee, s.hasAddToCart, s.hasShipping,
    s.hasReturns, s.hasContact, s.hasAbout, s.hasFAQ, s.hasBlog, s.hasNewsletter, s.hasPrivacy,
    s.hasTerms, s.hasMetaPixel, s.hasGA, s.hasTikTok, s.hasKlaviyo, s.hasSMS, s.hasSubscription,
    s.hasChat, s.socialLinks.length >= 2, s.copyrightYear !== null && !s.copyrightStale,
    s.detectedCurrency !== null, s.detectedPhonePrefix !== null,
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
      recommendation: croScore < 65 ? "Prioritise proof, risk reversal, and the purchase path." : "Test incremental PDP and checkout improvements.",
      drivers: [
        { signal: "Reviews (any form)", detected: s.hasReviews, evidence: s.hasReviews ? `Detected: ${[s.hasReviewApp && "review app", s.hasStarMarkup && "star markup", s.hasReviewText && "review text", s.hasTestimonialBlock && "testimonial block"].filter(Boolean).join(", ")}` : "No reviews, stars, or testimonials detected", impact: s.hasReviews ? "+10 CRO / +12 trust" : "-8 CRO / -10 trust" },
        { signal: "Guarantee", detected: s.hasGuarantee, evidence: signalEvidence(s.hasGuarantee, "Guarantee language detected", "No guarantee detected"), impact: s.hasGuarantee ? "+10 trust points" : "-5 trust points" },
        { signal: "Primary purchase CTA", detected: s.hasAddToCart, evidence: signalEvidence(s.hasAddToCart, "Add-to-cart language detected", "No add-to-cart language detected"), impact: s.hasAddToCart ? "+5 CRO points" : "-10 CRO points" },
        { signal: "Trust badges", detected: s.hasTrustBadges, evidence: signalEvidence(s.hasTrustBadges, "Security/trust terms detected", "No trust badges detected"), impact: s.hasTrustBadges ? "+8 CRO points" : "-5 CRO points" },
        { signal: "Genuine contact info", detected: s.fakeContact.length === 0, evidence: s.fakeContact.length === 0 ? "No placeholder phone/email patterns detected" : s.fakeContact[0], impact: s.fakeContact.length === 0 ? "Baseline trust intact" : "-12 trust points" },
      ],
    },
    {
      category: "Product positioning",
      confidence: s.reachable ? 86 : 25,
      recommendation: productPos < 65 ? "Sharpen brand clarity, USP, and proof above the fold." : "Lean into differentiation and premium signals.",
      drivers: [
        { signal: "Brand clarity in title", detected: Boolean(s.title) && s.brandName.length >= 3, evidence: s.title ? `Title: "${s.title.slice(0, 60)}"` : "No <title>", impact: s.title ? "+12 positioning points" : "-8 positioning points" },
        { signal: "Above-fold USP language", detected: s.hasUSP, evidence: signalEvidence(s.hasUSP, "USP-style language present (guarantee/free shipping/lifetime/warranty)", "No USP language detected"), impact: s.hasUSP ? "+12 positioning points" : "-8 positioning points" },
        { signal: "Social proof", detected: s.hasReviews, evidence: signalEvidence(s.hasReviews, "Reviews / testimonials present", "No social proof detected"), impact: s.hasReviews ? "+8 positioning points" : "-6 positioning points" },
        { signal: "OG share image", detected: Boolean(s.ogImage), evidence: signalEvidence(Boolean(s.ogImage), "og:image set", "No og:image - weak brand surface on share"), impact: s.ogImage ? "+6 positioning points" : "-4 positioning points" },
        { signal: "Template residue absent", detected: s.templateResidue.length === 0, evidence: s.templateResidue.length === 0 ? "No demo / lorem ipsum content detected" : s.templateResidue[0], impact: s.templateResidue.length === 0 ? "Baseline positioning intact" : "-10 brand authority points" },
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
        { signal: "Tool count", detected: s.toolCount >= 3, evidence: s.toolCount > 0 ? `${s.toolCount} tools detected: ${s.tools.slice(0, 6).join(", ")}${s.toolCount > 6 ? ", …" : ""}` : "No marketing tools detected", impact: s.toolCount >= 5 ? "Mature stack" : s.toolCount >= 3 ? "Mid stack" : "Sparse stack" },
      ],
    },
    {
      category: "Retention",
      confidence: s.reachable ? 87 : 25,
      recommendation: retention < 60 ? `Build email capture and lifecycle flows on ${retentionChannel} before adding channels.` : `Advance segmentation, loyalty, and repeat-purchase programs (${retentionChannel}-first for your market).`,
      drivers: [
        { signal: "Email platform", detected: s.hasKlaviyo, evidence: signalEvidence(s.hasKlaviyo, "Klaviyo detected", "Klaviyo not detected"), impact: s.hasKlaviyo ? "+15 retention points" : "-5 retention points" },
        { signal: "Newsletter capture", detected: s.hasNewsletter, evidence: signalEvidence(s.hasNewsletter, "Signup language detected", "No newsletter capture detected"), impact: s.hasNewsletter ? "+8 retention points" : "-5 retention points" },
        { signal: `${retentionChannel} channel`, detected: isNonWestern ? tools_includes(s, "WhatsApp") : s.hasSMS, evidence: isNonWestern ? (tools_includes(s, "WhatsApp") ? "WhatsApp link/button detected" : "No WhatsApp channel detected") : (s.hasSMS ? "SMS tool detected" : "No SMS tool detected"), impact: "+10-12 retention points if present" },
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
  if (s.brokenImageCount > 0) techIssues.push(`${s.brokenImageCount} placeholder/broken image source(s) detected (e.g. ${s.brokenImageSamples[0]})`);

  const friction: string[] = [];
  if (!s.hasUSP) friction.push("No visible USP / value prop above fold");
  if (!s.hasTrustBadges) friction.push("Zero trust badges or security signals");
  if (!s.hasReviews) friction.push("No reviews, stars, or testimonials detected (scanned widgets + text + markup)");
  if (!s.hasChat) friction.push("No live chat for objection handling");
  if (s.wordCount < 250) friction.push("Thin homepage copy (<250 words)");
  if (s.brokenImageCount > 0) friction.push(`Placeholder image(s) still loading on the storefront`);
  if (s.templateResidue.length > 0) friction.push(`Template residue: ${s.templateResidue[0]}`);

  const trustGaps: string[] = [];
  if (!s.isHttps) trustGaps.push("Site is HTTP - browser flags as insecure");
  if (!s.hasReviews) trustGaps.push("No social proof / reviews visible");
  if (!s.hasGuarantee) trustGaps.push("No money-back guarantee shown");
  if (!s.hasPrivacy) trustGaps.push("Privacy policy not linked");
  if (!s.hasContact) trustGaps.push("No clear contact page");
  if (s.fakeContact.length > 0) trustGaps.push(`Suspicious / placeholder contact info: ${s.fakeContact[0]}`);
  if (s.copyrightStale && s.copyrightYear !== null) trustGaps.push(`Footer copyright shows ${s.copyrightYear} (stale vs ${new Date().getUTCFullYear()})`);

  const killers: string[] = [];
  if (!s.hasAddToCart) killers.push("No detectable add-to-cart on landing");
  if (!s.hasViewport) killers.push("Not mobile-optimised (~70% of traffic)");
  if (!s.hasMetaPixel && !s.hasGA) killers.push("No tracking pixel - cannot optimise ads");
  if (!s.metaDesc) killers.push("Missing meta description - low CTR from search");
  if (!s.hasShipping) killers.push("Shipping info not surfaced - cart abandons");

  // ---------- Revenue leakage (severity validated against actual detection) ----------
  const leaks: z.infer<typeof leakSchema>[] = [];
  if (!s.hasKlaviyo && !s.hasNewsletter) leaks.push({ area: "Email capture", leak: "No newsletter / email capture detected", severity: "High", impact: "Losing 20-30% revenue from flows (welcome, browse, cart)" });
  // Severity now reflects reality: testimonials present → only Low; nothing at all → High
  if (!s.hasReviews) {
    leaks.push({ area: "Social proof", leak: "No reviews, stars, or testimonials detected anywhere on the page", severity: "High", impact: "Reviews lift CR by 10-30% on average" });
  } else if (!s.hasReviewApp && (s.hasReviewText || s.hasTestimonialBlock)) {
    leaks.push({ area: "Social proof", leak: "Testimonials exist but no review collection app - reviews are not compounding", severity: "Low", impact: "Manual proof doesn't scale; install a review widget to gather and syndicate" });
  }
  if (!s.hasMetaPixel) leaks.push({ area: "Tracking", leak: "Meta Pixel missing", severity: "Critical", impact: "Cannot retarget or optimise Meta ads → 30-50% wasted spend" });
  if (!s.hasGA) leaks.push({ area: "Analytics", leak: "GA4 not detected", severity: "High", impact: "Flying blind on traffic & funnel drop-off" });
  if (!s.hasSchema) leaks.push({ area: "SEO", leak: "No product/FAQ schema", severity: "Medium", impact: "Missing rich results → 15-30% lower organic CTR" });
  if (!s.hasGuarantee) leaks.push({ area: "Risk reversal", leak: "No guarantee on site", severity: "Medium", impact: "Higher cart abandonment from risk-averse buyers" });
  if (!s.hasSubscription && /coffee|supplement|skincare|pet|food/i.test(s.title + s.metaDesc)) leaks.push({ area: "Retention", leak: "Subscription model not offered", severity: "High", impact: "LTV ~2-3x lower vs subscribe & save" });
  if (!s.hasUSP) leaks.push({ area: "Positioning", leak: "USP not above fold", severity: "Medium", impact: "Bounce rate 10-20% higher than category benchmark" });
  if (s.brokenImageCount > 0) leaks.push({ area: "Merchandising", leak: `${s.brokenImageCount} placeholder image(s) still served`, severity: "High", impact: "Hero/product images that look broken kill PDP conversion instantly" });
  if (s.templateResidue.length > 0) leaks.push({ area: "Brand", leak: `Template residue on page: ${s.templateResidue[0]}`, severity: "High", impact: "Demo content tanks credibility before the first product view" });
  if (s.fakeContact.length > 0) leaks.push({ area: "Trust", leak: `Placeholder contact details: ${s.fakeContact[0]}`, severity: "Critical", impact: "Buyers spot fake phone/email patterns instantly → trust score collapses" });
  if (s.copyrightStale && s.copyrightYear !== null) leaks.push({ area: "Footer", leak: `Stale copyright year ${s.copyrightYear}`, severity: "Low", impact: "Small but real credibility signal - buyers notice 'is this site abandoned?'" });

  // ---------- Issue classification (severity validated) ----------
  const allIssues: { issue: string; why: string; fix: string; sev: "super" | "hot" | "med" }[] = [];
  if (!s.isHttps) allIssues.push({ issue: "HTTP, not HTTPS", why: "Chrome blocks checkout; trust destroyed", fix: "Enable SSL today via host/platform", sev: "super" });
  if (!s.hasMetaPixel) allIssues.push({ issue: "Meta Pixel missing", why: "Cannot optimise, retarget or measure ROAS", fix: "Install Pixel + CAPI within 24h", sev: "super" });
  if (!s.hasViewport) allIssues.push({ issue: "Not mobile-friendly", why: "70% of ecom traffic is mobile", fix: "Add viewport meta + responsive theme", sev: "super" });
  if (s.fakeContact.length > 0) allIssues.push({ issue: "Placeholder contact info on site", why: "Buyers immediately distrust fake phone / email formats", fix: `Replace with real details: ${s.fakeContact[0]}`, sev: "super" });
  if (s.brokenImageCount > 0) allIssues.push({ issue: `${s.brokenImageCount} placeholder image(s) loading`, why: "Hero / product images look broken → PDP conversion collapses", fix: `Replace placeholder asset(s) e.g. ${s.brokenImageSamples[0]}`, sev: "super" });
  if (s.templateResidue.length > 0) allIssues.push({ issue: "Template / demo content still live", why: s.templateResidue[0], fix: "Remove lorem ipsum, demo collections, and placeholder text everywhere", sev: "super" });
  if (s.h1Count === 0) allIssues.push({ issue: "No H1 on homepage", why: "Google can't read primary topic", fix: "Add a single keyword-rich H1", sev: "hot" });
  // Reviews issue is conditional: only Hot if NOTHING detected; Medium if testimonials but no app
  if (!s.hasReviews) {
    allIssues.push({ issue: "No reviews visible", why: "92% of buyers read reviews first", fix: `Install ${reviewTool} this week`, sev: "hot" });
  } else if (!s.hasReviewApp) {
    allIssues.push({ issue: "Testimonials exist but no review app", why: "Reviews aren't accumulating, syndicating, or feeding rich results", fix: `Install ${reviewTool} and migrate existing testimonials in`, sev: "med" });
  }
  if (!s.metaDesc) allIssues.push({ issue: "No meta description", why: "Lower SERP CTR by 5-15%", fix: "Write 140-char descriptions per page", sev: "hot" });
  if (!s.hasSchema) allIssues.push({ issue: "No structured data", why: "Missing rich snippets in search", fix: "Add Product + FAQ JSON-LD", sev: "hot" });
  if (!s.hasGuarantee) allIssues.push({ issue: "No guarantee shown", why: "Risk-averse buyers bounce at PDP", fix: "Add 30-day money-back badge", sev: "hot" });
  if (!s.hasKlaviyo) allIssues.push({ issue: "No email marketing tool", why: "Email = 20-35% of mature DTC revenue", fix: "Install Klaviyo + 4 core flows", sev: "hot" });
  if (s.imgMissingAlt > 5) allIssues.push({ issue: `${s.imgMissingAlt} images missing alt`, why: "Hurts SEO and accessibility", fix: "Bulk-add descriptive alt text", sev: "med" });
  if (!s.hasChat) allIssues.push({ issue: "No live chat", why: "Objections not handled in real time", fix: `Install ${chatTool}`, sev: "med" });
  if (!s.hasBlog) allIssues.push({ issue: "No blog/content hub", why: "Limits organic traffic ceiling", fix: "Publish 2 SEO articles/month", sev: "med" });
  if (!s.socialLinks.length) allIssues.push({ issue: "No social proof links", why: "Brand looks new / unestablished", fix: "Link IG + TikTok in footer", sev: "med" });
  if (!s.hasFAQ) allIssues.push({ issue: "No FAQ page", why: "Pre-purchase friction unhandled", fix: "Add FAQ with top 10 questions", sev: "med" });
  if (!s.hasTrustBadges) allIssues.push({ issue: "No trust badges", why: "Lowers perceived safety at checkout", fix: "Add SSL/payment/return badges", sev: "med" });
  if (s.copyrightStale && s.copyrightYear !== null) allIssues.push({ issue: `Footer copyright stuck on ${s.copyrightYear}`, why: "Buyers read stale years as 'site abandoned'", fix: `Update to ${new Date().getUTCFullYear()} (or use dynamic year)`, sev: "med" });

  const superHot = allIssues.filter((i) => i.sev === "super").slice(0, 5).map(({ sev, ...r }) => r);
  const hot = allIssues.filter((i) => i.sev === "hot").slice(0, 5).map(({ sev, ...r }) => r);
  const medium = allIssues.filter((i) => i.sev === "med").slice(0, 5).map(({ sev, ...r }) => r);

  // ---------- Opportunities (platform + geo conditional) ----------
  const opps: z.infer<typeof opportunitySchema>[] = [];
  if (!s.hasKlaviyo) opps.push({ title: "Launch core email flows", expectedImpact: "+20-30% revenue", difficulty: "Medium", roi: "Very High", action: "Klaviyo + welcome/cart/browse/post-purchase" });
  if (!s.hasReviews) opps.push({ title: "Install review system", expectedImpact: "+10-25% CR", difficulty: "Easy", roi: "High", action: `${reviewTool} with photo reviews` });
  if (!s.hasSchema) opps.push({ title: "Add product schema", expectedImpact: "+15-30% organic CTR", difficulty: "Easy", roi: "High", action: "Inject Product + Review JSON-LD" });
  if (!s.hasUSP) opps.push({ title: "Rewrite above-fold USP", expectedImpact: "+8-15% CR", difficulty: "Easy", roi: "High", action: "Benefit-led hero + 3 trust bullets" });
  if (!s.hasSubscription) opps.push({ title: "Test subscribe & save", expectedImpact: "+2-3× LTV", difficulty: "Medium", roi: "Very High", action: `${subTool} with 10% off` });
  if (!s.hasMetaPixel) opps.push({ title: "Install Meta Pixel + CAPI", expectedImpact: "+25-40% ROAS", difficulty: "Easy", roi: "Very High", action: "Pixel + server-side events" });
  if (isNonWestern && !tools_includes(s, "WhatsApp")) opps.push({ title: "Activate WhatsApp as primary retention channel", expectedImpact: "+15-25% repeat orders", difficulty: "Easy", roi: "Very High", action: "WhatsApp Business API (Wati / Interakt) + abandoned cart + order updates" });
  while (opps.length < 3) opps.push({ title: "Run a structured CRO sprint", expectedImpact: "+10-20% CR", difficulty: "Medium", roi: "High", action: "A/B test PDP, cart, checkout for 30 days" });
  const opportunities = opps.slice(0, 5);

  // ---------- Action plan ----------
  const immediate: string[] = [];
  if (!s.isHttps) immediate.push("Force HTTPS sitewide");
  if (s.fakeContact.length > 0) immediate.push("Replace placeholder phone / email with real contact details");
  if (s.brokenImageCount > 0) immediate.push("Swap placeholder / broken hero & product images for real assets");
  if (s.templateResidue.length > 0) immediate.push("Strip template residue (lorem ipsum, demo collections, sample copy)");
  if (s.copyrightStale && s.copyrightYear !== null) immediate.push(`Update footer copyright to ${new Date().getUTCFullYear()} (or use dynamic year)`);
  if (!s.hasMetaPixel) immediate.push("Install Meta Pixel + Conversions API");
  if (!s.hasGA) immediate.push("Install GA4 + ecommerce events");
  if (!s.hasReviews) immediate.push(`Add ${reviewTool} widget to PDPs`);
  if (!s.hasSchema) immediate.push("Add Product + FAQ JSON-LD");
  if (!s.hasUSP) immediate.push("Add USP + trust bar above fold");
  if (!s.metaDesc) immediate.push("Write meta titles + descriptions");
  while (immediate.length < 3) immediate.push("Audit & fix top 3 PDP friction points");

  const growth: string[] = [];
  if (!s.hasKlaviyo) growth.push("Build 4 core email flows in Klaviyo");
  if (!s.hasSMS && !tools_includes(s, "WhatsApp")) growth.push(`Add ${retentionChannel} via ${smsTool}`);
  growth.push("Launch creative-testing system on Meta");
  growth.push("Publish 8 SEO articles targeting bottom-funnel terms");
  if (!s.hasSubscription) growth.push(`Test subscribe & save on top SKU via ${subTool}`);
  growth.push("Run weekly A/B tests on PDP + cart");

  // ---------- Scale (gated by fundamentals score) ----------
  const fundamentalsReady = overall >= 60 && s.hasMetaPixel && s.hasGA && s.hasReviews;
  const scale: string[] = [];
  scale.push("Open TikTok + YouTube ad channels");
  scale.push("Layer Google Shopping + Performance Max");
  scale.push("Launch influencer/UGC seeding program");
  if (fundamentalsReady) {
    scale.push("Expand into 1 new geo with localized funnel");
  } else {
    scale.push("PREREQUISITE: lock fundamentals (tracking + reviews + overall ≥ 60) before any geo expansion");
  }
  scale.push("Build loyalty + referral program");

  // ---------- Competitors (industry-generic) ----------
  const niche = guessNiche(s);
  const competitors = buildCompetitors(niche);

  // ---------- Final report ----------
  const totalIssues = techIssues.length + friction.length + trustGaps.length + killers.length + leaks.length;
  const headline = overall >= 70
    ? `${s.brandName}: solid foundation - unlock next 30-50% via CRO + retention`
    : overall >= 45
      ? `${s.brandName}: leaking revenue across ${totalIssues}+ areas - fast fixes available`
      : `${s.brandName}: critical gaps blocking growth - fix fundamentals first`;

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
      businessReality: `${s.platform} store · ${s.toolCount} tool${s.toolCount === 1 ? "" : "s"} detected (${s.tools.slice(0, 5).join(", ") || "none"}${s.toolCount > 5 ? ", …" : ""}) · market context: ${effectiveCountry}${s.detectedCurrency ? ` (${s.detectedCurrency})` : ""}. Health ${overall}/100.`,
      biggestOpportunity: opportunities[0]?.title || "CRO sprint on PDP & checkout",
      biggestThreat: s.fakeContact.length > 0 ? "Placeholder contact info destroys first-time trust" : s.brokenImageCount > 0 ? "Broken / placeholder images on storefront" : s.templateResidue.length > 0 ? "Template residue makes the store look abandoned" : !s.hasMetaPixel ? "Untracked ad spend - cannot optimise" : !s.hasReviews ? "No social proof - buyers bounce" : "Competitor brand authority gap",
      revenuePotential,
      revenuePotentialReasoning: `Based on ${totalIssues} fixable issues + ${opportunities.length} high-ROI levers · fundamentals ${fundamentalsReady ? "ready for scale" : "not yet locked - scale steps gated"}`,
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
        ? `Analysed ${s.htmlSize.toLocaleString()} HTML characters and ${signalFlags.length} local on-page signals. Off-site rankings, ad-account data, and checkout-only events are not included.`
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
      metaActivity: s.hasMetaPixel ? "Pixel installed - likely running Meta ads" : "No Pixel detected - not running tracked Meta ads",
      googleActivity: s.hasGA ? "GA4 present - Google Ads possible" : "No GA4 - Google Ads not measurable",
      creativeStrategy: "Inferred basic - no creative testing system visible",
      offerStrategy: s.hasUSP ? "Has an offer/USP on site" : "No clear offer - weak ad-to-LP match",
      messaging: s.title ? `Lead message: "${s.title.slice(0, 60)}"` : "No clear lead message",
      hooks: "Generic - needs hook-first creative system",
      acquisitionMaturity: paidScore >= 70 ? "Advanced" : paidScore >= 50 ? "Intermediate" : "Beginner",
      maturityReasoning: `Tracking stack covers ${s.tools.filter(t => /Pixel|GA|TikTok/.test(t)).length}/3 major channels`,
    },
    conversionIntelligence: {
      homepage: s.hasUSP ? "Has USP, can be sharpened" : "Weak hero - no clear value prop",
      productPages: s.hasReviews ? "Reviews present" : "PDP missing reviews/social proof",
      cartCheckout: s.hasShipping ? "Shipping surfaced" : "Shipping unclear - cart abandons",
      mobile: s.hasViewport ? "Mobile viewport set" : "Not mobile-optimised - critical",
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
      visualIdentity: s.ogImage ? "OG image set for sharing" : "No social share image - weak brand surface",
      premiumPerception: trust >= 65 ? "Reads as trustworthy" : "Reads as low-trust / new brand",
      whyChooseThisBrand: s.hasGuarantee && s.hasReviews ? "Guarantee + reviews give a reason" : "No strong reason to choose vs competitors",
    },
    psychologyIntelligence: {
      trust: trust >= 65 ? "High - trust signals stacked" : "Low - trust gaps visible",
      riskPerception: s.hasGuarantee ? "Lowered by guarantee" : "High - no risk reversal",
      buyingMotivation: niche.motivation,
      emotionalTriggers: s.hasReviews ? "Social proof active" : "No emotional triggers in copy",
      socialProof: s.hasReviews ? "Reviews + ratings present" : "Missing entirely",
      authoritySignals: s.hasBlog || s.socialLinks.length >= 3 ? "Some authority signals" : "Almost none",
      firstTimeTrustVerdict: trust >= 65 ? "Yes" : trust >= 45 ? "Maybe" : "No",
      trustReasoning: `Trust score ${trust}/100 based on HTTPS, reviews, guarantee, policies`,
    },
    acquisitionIntelligence: {
      organic: seoOverall >= 60 ? "SEO foundation present" : "Organic capped by technical+content gaps",
      paid: paidScore >= 60 ? "Tracking ready for paid scale" : "Not ready - install pixels first",
      social: s.socialLinks.length >= 3 ? `Active on ${s.socialLinks.length} platforms` : "Weak social presence",
      influencer: "No influencer/UGC system detected",
      emailSms: s.hasKlaviyo ? "Email tool installed" : "No email tool - biggest leak",
      mostLikelyGrowthChannel: !s.hasKlaviyo ? "Email/SMS" : !s.hasMetaPixel ? "Paid social" : "SEO + content",
      highestRoiChannel: "Email/SMS flows once installed",
      mostUnderutilizedChannel: s.hasBlog ? "Email/SMS retention" : "SEO content",
    },
    retentionIntelligence: {
      email: s.hasKlaviyo ? "Klaviyo installed - verify flows live" : tools_includes(s, "Mailchimp") ? "Mailchimp installed - upgrade to Klaviyo for ecom flows" : tools_includes(s, "Omnisend") ? "Omnisend installed - flows likely covered" : "No email tool detected",
      sms: isNonWestern
        ? (tools_includes(s, "WhatsApp") ? "WhatsApp channel detected - primary retention channel for this market" : "WhatsApp not active - biggest retention miss for this geo (SMS deliverability is poor)")
        : (s.hasSMS ? `SMS tool detected (${s.tools.filter((t) => /Postscript|Attentive|SMSBump/.test(t)).join(", ")})` : "Not in use - recommended: Postscript/Attentive (US/UK/AU only)"),
      loyalty: "No loyalty program detected",
      subscription: s.hasSubscription ? `Subscription option present (${s.tools.filter((t) => /Recharge|Bold|Appstle/.test(t)).join(", ") || "platform-native"})` : `Not offered - install ${subTool}`,
      repeatPurchase: retention >= 60 ? "Decent retention stack" : `Capped - install flows + ${retentionChannel} + loyalty`,
      retentionMaturityScore: retention,
      retentionVerdict: retention >= 60 ? `Retention infrastructure in place (${retentionChannel}-led for this market)` : `Retention is biggest revenue lever - start with email + ${retentionChannel}`,
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
      privateEquity: `Health ${overall}/100. ${overall >= 60 ? "Fundable with optimisation plan" : "Pre-investable - fix fundamentals"}.`,
      croExpert: `CRO ${croScore}/100. Focus on ${friction[0] || "PDP trust"}.`,
      brandingExpert: `Brand ${brandAuth}/100. ${s.hasAbout ? "Story exists, sharpen positioning" : "Missing brand story - start there"}.`,
      performanceMarketer: `Paid ${paidScore}/100. ${s.hasMetaPixel ? "Optimise creative" : "Install pixels first"}.`,
      ceo: `Top 90-day move: ${opportunities[0]?.title || "Install full tracking + email flows"}.`,
    },
  };
}

function guessNiche(s: Signals): { industry: string; niche: string; category: string; audience: string; motivation: string; blueOcean1: string; blueOcean2: string } {
  const t = (s.title + " " + s.metaDesc + " " + s.host).toLowerCase();
  if (/coffee|tea|brew/.test(t)) return { industry: "Food & Beverage", niche: "Specialty coffee/tea", category: "Consumables", audience: "Specialty beverage enthusiasts 25-55", motivation: "Daily ritual + flavor experience", blueOcean1: "Coffee + wellness crossover", blueOcean2: "Coffee subscription with rotating origin" };
  if (/supplement|vitamin|protein|nootropic/.test(t)) return { industry: "Health & Wellness", niche: "Supplements", category: "Health", audience: "Health-conscious 25-50", motivation: "Performance + longevity", blueOcean1: "Personalised supplement stacks", blueOcean2: "Subscription with health-coach access" };
  if (/skincare|beauty|cosmetic|skin/.test(t)) return { industry: "Beauty", niche: "Skincare/cosmetics", category: "Beauty", audience: "Beauty buyers 20-45", motivation: "Confidence + self-care", blueOcean1: "Clinical-grade affordable line", blueOcean2: "Male skincare focus" };
  if (/pet|dog|cat/.test(t)) return { industry: "Pet", niche: "Pet products", category: "Pet care", audience: "Pet parents 25-55", motivation: "Pet love + guilt avoidance", blueOcean1: "Vet-formulated subscription", blueOcean2: "Senior pet niche" };
  if (/fashion|cloth|apparel|wear/.test(t)) return { industry: "Fashion", niche: "Apparel", category: "Fashion", audience: "Style buyers 18-45", motivation: "Identity + status", blueOcean1: "Size-inclusive premium", blueOcean2: "Capsule wardrobe positioning" };
  if (/jewel|ring|necklace/.test(t)) return { industry: "Jewelry", niche: "Fine/fashion jewelry", category: "Jewelry", audience: "Gift buyers + self-purchasers 25-55", motivation: "Emotion + milestone", blueOcean1: "Custom personalised line", blueOcean2: "Lab-grown diamond focus" };
  if (/home|decor|furniture|kitchen/.test(t)) return { industry: "Home & Lifestyle", niche: "Home goods", category: "Home", audience: "Homeowners + nesters 28-55", motivation: "Comfort + aesthetic identity", blueOcean1: "Modular small-space line", blueOcean2: "Sustainability-led decor" };
  if (/fit|gym|yoga|sport/.test(t)) return { industry: "Fitness", niche: "Fitness/activewear", category: "Sports", audience: "Active adults 20-45", motivation: "Performance + identity", blueOcean1: "Recovery-focused sub-niche", blueOcean2: "Hybrid wear-to-work line" };
  return { industry: "Ecommerce", niche: "DTC retail", category: "Consumer goods", audience: "Online shoppers 25-55", motivation: "Convenience + value + trust", blueOcean1: "Bundle + subscription play", blueOcean2: "Localized premium positioning" };
}

function buildCompetitors(n: ReturnType<typeof guessNiche>): z.infer<typeof competitorSchema>[] {
  return [
    { name: `Top ${n.niche} brand A`, website: "industry-leader-a.com", tier: "Tier 1", positioning: "Premium category leader", strengths: "Brand authority, content, reviews", weaknesses: "Higher prices, slower innovation", usp: "Most trusted name in category" },
    { name: `Top ${n.niche} brand B`, website: "industry-leader-b.com", tier: "Tier 1", positioning: "Volume + value leader", strengths: "Price, distribution, ad spend", weaknesses: "Generic brand, weak loyalty", usp: "Best price-to-quality ratio" },
    { name: `Challenger ${n.category} brand`, website: "challenger-brand.com", tier: "Tier 2", positioning: "DTC disruptor", strengths: "Strong UGC, modern brand", weaknesses: "Smaller catalogue", usp: "Cool factor + community" },
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
