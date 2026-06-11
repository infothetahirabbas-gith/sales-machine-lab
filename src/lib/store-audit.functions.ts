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

export const auditReportSchema = z.object({
  storeName: z.string(),
  platformGuess: z.string(),

  // PHASE 1
  business: z.object({
    brand: z.string(),
    website: z.string(),
    platform: z.string(),
    industry: z.string(),
    niche: z.string(),
    productCategory: z.string(),
    targetAudience: z.string(),
    pricePositioning: z.enum(["Luxury", "Premium", "Mid-Market", "Budget"]),
    businessModel: z.enum(["DTC", "Private Label", "Dropshipping", "Marketplace Brand", "Subscription Brand"]),
  }),

  // PHASE 2
  executiveIntelligence: z.object({
    businessReality: z.string(),
    biggestOpportunity: z.string(),
    biggestThreat: z.string(),
    revenuePotential: z.enum(["Low", "Medium", "High", "Very High"]),
    revenuePotentialReasoning: z.string(),
    headline: z.string(),
  }),

  // PHASE 3 (15 scores)
  scorecard: z.object({
    seo: z.number().min(0).max(100),
    paidAds: z.number().min(0).max(100),
    cro: z.number().min(0).max(100),
    brandAuthority: z.number().min(0).max(100),
    trust: z.number().min(0).max(100),
    productPositioning: z.number().min(0).max(100),
    customerAcquisition: z.number().min(0).max(100),
    retention: z.number().min(0).max(100),
    customerExperience: z.number().min(0).max(100),
    marketPosition: z.number().min(0).max(100),
    competitiveAdvantage: z.number().min(0).max(100),
    revenueEfficiency: z.number().min(0).max(100),
    scalability: z.number().min(0).max(100),
    businessMaturity: z.number().min(0).max(100),
    overall: z.number().min(0).max(100),
  }),

  // PHASE 4
  seoIntelligence: z.object({
    technical: scoreSchema,
    onPage: scoreSchema,
    contentAuthority: scoreSchema,
    commercialSeo: scoreSchema,
    technicalIssues: z.array(z.string()).max(6),
    competitiveSeoGap: z.string(),
  }),

  // PHASE 5
  adsIntelligence: z.object({
    metaActivity: z.string(),
    googleActivity: z.string(),
    creativeStrategy: z.string(),
    offerStrategy: z.string(),
    messaging: z.string(),
    hooks: z.string(),
    acquisitionMaturity: z.enum(["Beginner", "Intermediate", "Advanced", "Elite"]),
    maturityReasoning: z.string(),
  }),

  // PHASE 6
  conversionIntelligence: z.object({
    homepage: z.string(),
    productPages: z.string(),
    cartCheckout: z.string(),
    mobile: z.string(),
    ctaStrength: z.string(),
    friction: z.array(z.string()).max(5),
    trustGaps: z.array(z.string()).max(5),
    conversionKillers: z.array(z.string()).max(5),
  }),

  // PHASE 7
  brandIntelligence: z.object({
    positioning: z.string(),
    valueProposition: z.string(),
    storytelling: z.string(),
    differentiation: z.string(),
    visualIdentity: z.string(),
    premiumPerception: z.string(),
    whyChooseThisBrand: z.string(),
  }),

  // PHASE 8
  psychologyIntelligence: z.object({
    trust: z.string(),
    riskPerception: z.string(),
    buyingMotivation: z.string(),
    emotionalTriggers: z.string(),
    socialProof: z.string(),
    authoritySignals: z.string(),
    firstTimeTrustVerdict: z.enum(["Yes", "No", "Maybe"]),
    trustReasoning: z.string(),
  }),

  // PHASE 9
  acquisitionIntelligence: z.object({
    organic: z.string(),
    paid: z.string(),
    social: z.string(),
    influencer: z.string(),
    emailSms: z.string(),
    mostLikelyGrowthChannel: z.string(),
    highestRoiChannel: z.string(),
    mostUnderutilizedChannel: z.string(),
  }),

  // PHASE 10
  retentionIntelligence: z.object({
    email: z.string(),
    sms: z.string(),
    loyalty: z.string(),
    subscription: z.string(),
    repeatPurchase: z.string(),
    retentionMaturityScore: z.number().min(0).max(100),
    retentionVerdict: z.string(),
  }),

  // PHASE 11
  competitors: z.array(competitorSchema).max(10),

  // PHASE 12
  competitiveGap: z.object({
    competitorAdvantages: z.array(z.string()).max(5),
    missingFeatures: z.array(z.string()).max(5),
    marketOpportunities: z.array(z.string()).max(5),
    differentiationOpportunities: z.array(z.string()).max(5),
    blueOcean: z.array(z.string()).max(3),
  }),

  // PHASE 13
  revenueLeakage: z.array(leakSchema).max(8),

  // PHASE 14
  issueClassification: z.object({
    superHot: z.array(issueSchema).max(5),
    hot: z.array(issueSchema).max(5),
    medium: z.array(issueSchema).max(5),
  }),

  // PHASE 15
  opportunities: z.array(opportunitySchema).min(3).max(5),

  // PHASE 16
  actionPlan: z.object({
    immediate: z.array(z.string()).min(3).max(7),
    growth: z.array(z.string()).min(3).max(7),
    scale: z.array(z.string()).min(3).max(7),
  }),

  // PHASE 17
  founderInsights: z.object({
    privateEquity: z.string(),
    croExpert: z.string(),
    brandingExpert: z.string(),
    performanceMarketer: z.string(),
    ceo: z.string(),
  }),
});

export type AuditReport = z.infer<typeof auditReportSchema>;

function normalizeUrl(raw: string): string {
  let u = raw.trim();
  if (!/^https?:\/\//i.test(u)) u = "https://" + u;
  const parsed = new URL(u);
  return parsed.toString();
}

async function fetchPage(url: string): Promise<{ html: string; status: number }> {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; BeingEcomBrain/1.0)",
      "Accept": "text/html,application/xhtml+xml",
    },
    redirect: "follow",
    signal: AbortSignal.timeout(15000),
  });
  const html = await res.text();
  return { html: html.slice(0, 160000), status: res.status };
}

function stripHtml(html: string): { text: string; title: string; metaDesc: string; signals: string[]; ogTitle: string; canonical: string; hasSchema: boolean } {
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i);
  const ogTitleMatch = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']*)["']/i);
  const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i);
  const signals: string[] = [];
  if (/cdn\.shopify\.com|shopify\.com\/s\//i.test(html)) signals.push("Shopify");
  if (/wp-content|woocommerce/i.test(html)) signals.push("WooCommerce/WordPress");
  if (/bigcommerce/i.test(html)) signals.push("BigCommerce");
  if (/klaviyo/i.test(html)) signals.push("Klaviyo");
  if (/gtag\(|googletagmanager/i.test(html)) signals.push("GA4/GTM");
  if (/connect\.facebook\.net|fbq\(/i.test(html)) signals.push("Meta Pixel");
  if (/judge\.me|loox|yotpo|stamped|okendo/i.test(html)) signals.push("Reviews app");
  if (/recharge|bold[_-]subscriptions|appstle/i.test(html)) signals.push("Subscriptions");
  if (/gorgias|zendesk|tidio|intercom/i.test(html)) signals.push("Helpdesk/Chat");
  if (/postscript|attentive|sms[_-]?bump/i.test(html)) signals.push("SMS marketing");
  if (/tiktok|ttclid/i.test(html)) signals.push("TikTok Pixel");
  if (/add[_-]?to[_-]?cart/i.test(html)) signals.push("Cart present");
  const hasSchema = /application\/ld\+json/i.test(html);
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 14000);
  return {
    text,
    title: titleMatch?.[1]?.trim() ?? "",
    metaDesc: descMatch?.[1]?.trim() ?? "",
    ogTitle: ogTitleMatch?.[1]?.trim() ?? "",
    canonical: canonicalMatch?.[1]?.trim() ?? "",
    hasSchema,
    signals,
  };
}

export const runStoreAudit = createServerFn({ method: "POST" })
  .inputValidator((data) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("AI service is not configured. Please contact support.");

    let normalized: string;
    try { normalized = normalizeUrl(data.url); }
    catch { throw new Error("Please enter a valid store URL."); }

    let pageData = { text: "", title: "", metaDesc: "", ogTitle: "", canonical: "", hasSchema: false, signals: [] as string[], status: 0 };
    try {
      const { html, status } = await fetchPage(normalized);
      const parsed = stripHtml(html);
      pageData = { ...parsed, status };
    } catch {
      // continue with empty page data; AI still produces a heuristic audit
    }

    const system = `You are "Being Ecom Brain™" — an advanced Ecommerce Growth Intelligence, Competitive Research, Conversion Optimization, and Revenue Analysis System built by BeingEcom.

You are NOT a generic audit tool. You are a board-level business intelligence engine that helps ecommerce founders, operators, investors, and growth teams understand: why a store is growing or failing, where revenue is leaking, what competitors are doing better, which opportunities exist right now, and what actions will generate the highest ROI.

NON-NEGOTIABLE DATA RULES:
- Use ONLY real signals you can derive from the supplied page data (HTML signals, title, meta, detected stack, structured data presence, visible page text) plus your knowledge of the industry / niche / competitors.
- NEVER invent specific numbers: no fabricated revenue, ROAS, traffic, CR, ad spend, rankings, LTV, or CAC. If a number is not derivable, label the insight qualitatively or call out "Structural Inference".
- Always separate observable facts from structural inferences in your wording.
- Every insight must answer: "Will this help increase revenue, profitability, customer acquisition, retention, conversion rate, or market position?" If not, do not include it.

TONE: Brutally honest, money-focused, specific. Plain language a founder can act on. Never generic. No fluff. No participation-trophy scores — weak areas must score low.

OUTPUT: A complete 17-phase Ecommerce Growth Intelligence Report via the submit_audit_report tool. Every field must be filled with concrete, decision-grade content.`;

    const userPrompt = `Generate the full Being Ecom Brain™ Growth Intelligence Report for this ecommerce store.

Store URL: ${normalized}
HTTP status: ${pageData.status}
Detected platform/tools: ${pageData.signals.join(", ") || "unknown"}
Has structured data (JSON-LD): ${pageData.hasSchema ? "Yes" : "No"}
Page <title>: ${pageData.title || "(none)"}
OG title: ${pageData.ogTitle || "(none)"}
Canonical: ${pageData.canonical || "(none)"}
Meta description: ${pageData.metaDesc || "(none)"}
Reported monthly revenue: ${data.revenue || "not provided"}
Reported monthly ad spend: ${data.adSpend || "not provided"}
Target country: ${data.country || "not provided"}

Visible page text (truncated):
"""
${pageData.text || "(could not fetch page content — infer from URL, domain, and provided context)"}
"""

REQUIREMENTS:
- Phase 1 business.brand from title/text/domain; platform from detected stack.
- Phase 2 executiveIntelligence must call out the SINGLE biggest opportunity and SINGLE biggest threat — no hedging.
- Phase 3 scorecard: all 15 scores 0-100, must vary realistically. Weak areas in the 20s-40s, strong areas 70+. The overall must reflect the weighted reality, not an average of inflated numbers.
- Phase 4 SEO: technical/onPage/contentAuthority/commercialSeo each get a score + 1-sentence verdict. competitiveSeoGap names the kind of competitor content/keywords they're losing to.
- Phase 5 Ads: assess Meta + Google activity from public signals (pixel detected, ad infrastructure, creative tells). acquisitionMaturity must be honest.
- Phase 6 CRO: list real friction and trust gaps — not generic "add reviews".
- Phase 7 Brand: answer "why would a customer pick this brand over a competitor?" honestly. If unclear, say so.
- Phase 8 Psychology: firstTimeTrustVerdict = Yes/No/Maybe with concrete reasoning.
- Phase 9 Acquisition: name the single most likely growth channel, highest ROI channel, and most underutilized channel for THIS brand.
- Phase 10 Retention: maturity score must reflect detected stack (subscriptions, SMS, email, reviews, loyalty).
- Phase 11 Competitors: 5-10 real competitors in this niche, grouped Tier 1 (market leaders), Tier 2 (fast-growth challengers), Tier 3 (direct same-size competitors). Use real brand names you know in this category.
- Phase 12 Gap: concrete competitor advantages, missing features, market and differentiation opportunities, plus 1-3 blue-ocean plays.
- Phase 13 Revenue leakage: 5-8 specific leak points with severity.
- Phase 14 Issues: 🔴 Super Hot = revenue blockers (fix now). 🟠 Hot = growth blockers. 🟡 Medium = optimization. Each has issue + why it matters + the fix. 2-5 in each tier.
- Phase 15 Opportunities: 3-5 ranked opportunities with expectedImpact, difficulty, ROI, and the action.
- Phase 16 Action plan: 3-7 items per horizon (0-7d immediate, 7-30d growth, 30-90d scale). Concrete actions only (e.g. "Add sticky mobile ATC + free-shipping bar on PDP", not "improve UX").
- Phase 17 Founder insights: what would a PE investor / CRO expert / branding expert / performance marketer / CEO each notice and fix FIRST. Five distinct lenses.

Every insight must drive revenue, profitability, acquisition, retention, conversion, or market position. Cut anything that doesn't.`;

    const schemaForModel = {
      type: "object",
      properties: {
        storeName: { type: "string" },
        platformGuess: { type: "string" },
        business: {
          type: "object",
          properties: {
            brand: { type: "string" }, website: { type: "string" }, platform: { type: "string" },
            industry: { type: "string" }, niche: { type: "string" }, productCategory: { type: "string" },
            targetAudience: { type: "string" },
            pricePositioning: { type: "string", enum: ["Luxury", "Premium", "Mid-Market", "Budget"] },
            businessModel: { type: "string", enum: ["DTC", "Private Label", "Dropshipping", "Marketplace Brand", "Subscription Brand"] },
          },
          required: ["brand", "website", "platform", "industry", "niche", "productCategory", "targetAudience", "pricePositioning", "businessModel"],
        },
        executiveIntelligence: {
          type: "object",
          properties: {
            businessReality: { type: "string" },
            biggestOpportunity: { type: "string" },
            biggestThreat: { type: "string" },
            revenuePotential: { type: "string", enum: ["Low", "Medium", "High", "Very High"] },
            revenuePotentialReasoning: { type: "string" },
            headline: { type: "string" },
          },
          required: ["businessReality", "biggestOpportunity", "biggestThreat", "revenuePotential", "revenuePotentialReasoning", "headline"],
        },
        scorecard: {
          type: "object",
          properties: {
            seo: { type: "number" }, paidAds: { type: "number" }, cro: { type: "number" },
            brandAuthority: { type: "number" }, trust: { type: "number" }, productPositioning: { type: "number" },
            customerAcquisition: { type: "number" }, retention: { type: "number" }, customerExperience: { type: "number" },
            marketPosition: { type: "number" }, competitiveAdvantage: { type: "number" }, revenueEfficiency: { type: "number" },
            scalability: { type: "number" }, businessMaturity: { type: "number" }, overall: { type: "number" },
          },
          required: ["seo", "paidAds", "cro", "brandAuthority", "trust", "productPositioning", "customerAcquisition", "retention", "customerExperience", "marketPosition", "competitiveAdvantage", "revenueEfficiency", "scalability", "businessMaturity", "overall"],
        },
        seoIntelligence: {
          type: "object",
          properties: {
            technical: { type: "object", properties: { score: { type: "number" }, verdict: { type: "string" } }, required: ["score", "verdict"] },
            onPage: { type: "object", properties: { score: { type: "number" }, verdict: { type: "string" } }, required: ["score", "verdict"] },
            contentAuthority: { type: "object", properties: { score: { type: "number" }, verdict: { type: "string" } }, required: ["score", "verdict"] },
            commercialSeo: { type: "object", properties: { score: { type: "number" }, verdict: { type: "string" } }, required: ["score", "verdict"] },
            technicalIssues: { type: "array", items: { type: "string" } },
            competitiveSeoGap: { type: "string" },
          },
          required: ["technical", "onPage", "contentAuthority", "commercialSeo", "technicalIssues", "competitiveSeoGap"],
        },
        adsIntelligence: {
          type: "object",
          properties: {
            metaActivity: { type: "string" }, googleActivity: { type: "string" },
            creativeStrategy: { type: "string" }, offerStrategy: { type: "string" },
            messaging: { type: "string" }, hooks: { type: "string" },
            acquisitionMaturity: { type: "string", enum: ["Beginner", "Intermediate", "Advanced", "Elite"] },
            maturityReasoning: { type: "string" },
          },
          required: ["metaActivity", "googleActivity", "creativeStrategy", "offerStrategy", "messaging", "hooks", "acquisitionMaturity", "maturityReasoning"],
        },
        conversionIntelligence: {
          type: "object",
          properties: {
            homepage: { type: "string" }, productPages: { type: "string" }, cartCheckout: { type: "string" }, mobile: { type: "string" }, ctaStrength: { type: "string" },
            friction: { type: "array", items: { type: "string" } },
            trustGaps: { type: "array", items: { type: "string" } },
            conversionKillers: { type: "array", items: { type: "string" } },
          },
          required: ["homepage", "productPages", "cartCheckout", "mobile", "ctaStrength", "friction", "trustGaps", "conversionKillers"],
        },
        brandIntelligence: {
          type: "object",
          properties: {
            positioning: { type: "string" }, valueProposition: { type: "string" }, storytelling: { type: "string" },
            differentiation: { type: "string" }, visualIdentity: { type: "string" }, premiumPerception: { type: "string" },
            whyChooseThisBrand: { type: "string" },
          },
          required: ["positioning", "valueProposition", "storytelling", "differentiation", "visualIdentity", "premiumPerception", "whyChooseThisBrand"],
        },
        psychologyIntelligence: {
          type: "object",
          properties: {
            trust: { type: "string" }, riskPerception: { type: "string" }, buyingMotivation: { type: "string" },
            emotionalTriggers: { type: "string" }, socialProof: { type: "string" }, authoritySignals: { type: "string" },
            firstTimeTrustVerdict: { type: "string", enum: ["Yes", "No", "Maybe"] },
            trustReasoning: { type: "string" },
          },
          required: ["trust", "riskPerception", "buyingMotivation", "emotionalTriggers", "socialProof", "authoritySignals", "firstTimeTrustVerdict", "trustReasoning"],
        },
        acquisitionIntelligence: {
          type: "object",
          properties: {
            organic: { type: "string" }, paid: { type: "string" }, social: { type: "string" },
            influencer: { type: "string" }, emailSms: { type: "string" },
            mostLikelyGrowthChannel: { type: "string" }, highestRoiChannel: { type: "string" }, mostUnderutilizedChannel: { type: "string" },
          },
          required: ["organic", "paid", "social", "influencer", "emailSms", "mostLikelyGrowthChannel", "highestRoiChannel", "mostUnderutilizedChannel"],
        },
        retentionIntelligence: {
          type: "object",
          properties: {
            email: { type: "string" }, sms: { type: "string" }, loyalty: { type: "string" }, subscription: { type: "string" }, repeatPurchase: { type: "string" },
            retentionMaturityScore: { type: "number" }, retentionVerdict: { type: "string" },
          },
          required: ["email", "sms", "loyalty", "subscription", "repeatPurchase", "retentionMaturityScore", "retentionVerdict"],
        },
        competitors: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string" }, website: { type: "string" },
              tier: { type: "string", enum: ["Tier 1", "Tier 2", "Tier 3"] },
              positioning: { type: "string" }, strengths: { type: "string" }, weaknesses: { type: "string" }, usp: { type: "string" },
            },
            required: ["name", "website", "tier", "positioning", "strengths", "weaknesses", "usp"],
          },
        },
        competitiveGap: {
          type: "object",
          properties: {
            competitorAdvantages: { type: "array", items: { type: "string" } },
            missingFeatures: { type: "array", items: { type: "string" } },
            marketOpportunities: { type: "array", items: { type: "string" } },
            differentiationOpportunities: { type: "array", items: { type: "string" } },
            blueOcean: { type: "array", items: { type: "string" } },
          },
          required: ["competitorAdvantages", "missingFeatures", "marketOpportunities", "differentiationOpportunities", "blueOcean"],
        },
        revenueLeakage: {
          type: "array",
          items: {
            type: "object",
            properties: {
              area: { type: "string" }, leak: { type: "string" },
              severity: { type: "string", enum: ["Critical", "High", "Medium", "Low"] },
              impact: { type: "string" },
            },
            required: ["area", "leak", "severity", "impact"],
          },
        },
        issueClassification: {
          type: "object",
          properties: {
            superHot: { type: "array", items: { type: "object", properties: { issue: { type: "string" }, why: { type: "string" }, fix: { type: "string" } }, required: ["issue", "why", "fix"] } },
            hot: { type: "array", items: { type: "object", properties: { issue: { type: "string" }, why: { type: "string" }, fix: { type: "string" } }, required: ["issue", "why", "fix"] } },
            medium: { type: "array", items: { type: "object", properties: { issue: { type: "string" }, why: { type: "string" }, fix: { type: "string" } }, required: ["issue", "why", "fix"] } },
          },
          required: ["superHot", "hot", "medium"],
        },
        opportunities: {
          type: "array",
          items: {
            type: "object",
            properties: {
              title: { type: "string" }, expectedImpact: { type: "string" },
              difficulty: { type: "string", enum: ["Easy", "Medium", "Hard"] },
              roi: { type: "string", enum: ["Low", "Medium", "High", "Very High"] },
              action: { type: "string" },
            },
            required: ["title", "expectedImpact", "difficulty", "roi", "action"],
          },
        },
        actionPlan: {
          type: "object",
          properties: {
            immediate: { type: "array", items: { type: "string" } },
            growth: { type: "array", items: { type: "string" } },
            scale: { type: "array", items: { type: "string" } },
          },
          required: ["immediate", "growth", "scale"],
        },
        founderInsights: {
          type: "object",
          properties: {
            privateEquity: { type: "string" }, croExpert: { type: "string" }, brandingExpert: { type: "string" },
            performanceMarketer: { type: "string" }, ceo: { type: "string" },
          },
          required: ["privateEquity", "croExpert", "brandingExpert", "performanceMarketer", "ceo"],
        },
      },
      required: ["storeName", "platformGuess", "business", "executiveIntelligence", "scorecard", "seoIntelligence", "adsIntelligence", "conversionIntelligence", "brandIntelligence", "psychologyIntelligence", "acquisitionIntelligence", "retentionIntelligence", "competitors", "competitiveGap", "revenueLeakage", "issueClassification", "opportunities", "actionPlan", "founderInsights"],
    };

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": apiKey,
      },
      signal: AbortSignal.timeout(90000),
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: system },
          { role: "user", content: userPrompt },
        ],
        tools: [{
          type: "function",
          function: {
            name: "submit_audit_report",
            description: "Submit the completed Being Ecom Brain™ Growth Intelligence Report.",
            parameters: schemaForModel,
          },
        }],
        tool_choice: { type: "function", function: { name: "submit_audit_report" } },
      }),
    });

    if (res.status === 429) throw new Error("Too many requests right now. Please try again in a minute.");
    if (res.status === 402) throw new Error("AI credits exhausted. Please contact BeingEcom.");
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(`Audit service failed (${res.status}). ${txt.slice(0, 200)}`);
    }

    const json = await res.json();
    const toolCall = json?.choices?.[0]?.message?.tool_calls?.[0];
    const args = toolCall?.function?.arguments;
    if (!args) throw new Error("Audit service returned an unexpected response.");

    let parsedArgs: any;
    try { parsedArgs = typeof args === "string" ? JSON.parse(args) : args; }
    catch { throw new Error("Failed to parse audit response."); }

    // Clamp arrays so AI overflow never breaks Zod validation
    const clamp = (arr: any, n: number) => Array.isArray(arr) ? arr.slice(0, n) : arr;
    if (parsedArgs?.seoIntelligence) parsedArgs.seoIntelligence.technicalIssues = clamp(parsedArgs.seoIntelligence.technicalIssues, 6);
    if (parsedArgs?.conversionIntelligence) {
      parsedArgs.conversionIntelligence.friction = clamp(parsedArgs.conversionIntelligence.friction, 5);
      parsedArgs.conversionIntelligence.trustGaps = clamp(parsedArgs.conversionIntelligence.trustGaps, 5);
      parsedArgs.conversionIntelligence.conversionKillers = clamp(parsedArgs.conversionIntelligence.conversionKillers, 5);
    }
    if (parsedArgs?.competitiveGap) {
      parsedArgs.competitiveGap.competitorAdvantages = clamp(parsedArgs.competitiveGap.competitorAdvantages, 5);
      parsedArgs.competitiveGap.missingFeatures = clamp(parsedArgs.competitiveGap.missingFeatures, 5);
      parsedArgs.competitiveGap.marketOpportunities = clamp(parsedArgs.competitiveGap.marketOpportunities, 5);
      parsedArgs.competitiveGap.differentiationOpportunities = clamp(parsedArgs.competitiveGap.differentiationOpportunities, 5);
      parsedArgs.competitiveGap.blueOcean = clamp(parsedArgs.competitiveGap.blueOcean, 3);
    }
    parsedArgs.competitors = clamp(parsedArgs.competitors, 10);
    parsedArgs.revenueLeakage = clamp(parsedArgs.revenueLeakage, 8);
    if (parsedArgs?.issueClassification) {
      parsedArgs.issueClassification.superHot = clamp(parsedArgs.issueClassification.superHot, 5);
      parsedArgs.issueClassification.hot = clamp(parsedArgs.issueClassification.hot, 5);
      parsedArgs.issueClassification.medium = clamp(parsedArgs.issueClassification.medium, 5);
    }
    parsedArgs.opportunities = clamp(parsedArgs.opportunities, 5);
    if (parsedArgs?.actionPlan) {
      parsedArgs.actionPlan.immediate = clamp(parsedArgs.actionPlan.immediate, 7);
      parsedArgs.actionPlan.growth = clamp(parsedArgs.actionPlan.growth, 7);
      parsedArgs.actionPlan.scale = clamp(parsedArgs.actionPlan.scale, 7);
    }

    const report = auditReportSchema.parse(parsedArgs);
    return { url: normalized, report };
  });

