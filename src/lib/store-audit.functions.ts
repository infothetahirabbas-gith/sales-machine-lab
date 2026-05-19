import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  url: z.string().trim().min(4).max(300),
  revenue: z.string().max(60).optional().nullable(),
  adSpend: z.string().max(60).optional().nullable(),
  country: z.string().max(60).optional().nullable(),
});

const scoreSchema = z.object({
  score: z.number().min(0).max(100),
  verdict: z.string().max(200),
});

export const auditReportSchema = z.object({
  executiveSummary: z.object({
    overallScore: z.number().min(0).max(100),
    diagnosis: z.object({
      traffic: z.enum(["Strong", "Average", "Weak"]),
      conversion: z.enum(["Strong", "Average", "Weak"]),
      ads: z.enum(["Efficient", "Average", "Inefficient"]),
    }),
    keyOpportunities: z.array(z.string().max(220)).min(3).max(3),
    headline: z.string().max(280),
  }),
  traffic: z.object({
    quality: z.string().max(260),
    sources: z.object({
      organic: z.number().min(0).max(100),
      paid: z.number().min(0).max(100),
      social: z.number().min(0).max(100),
      direct: z.number().min(0).max(100),
    }),
    topCountries: z.array(z.string().max(40)).max(5),
    mobileVsDesktop: z.string().max(220),
  }),
  ads: z.object({
    metaHealth: scoreSchema,
    googleHealth: scoreSchema,
    estimatedRoas: z.string().max(40),
    funnelLeaks: z.array(z.string().max(180)).max(5),
    wasteIndicators: z.array(z.string().max(180)).max(5),
    retargetingScore: z.number().min(0).max(100),
  }),
  cro: z.object({
    benchmarkCr: z.string().max(40),
    productPageIssues: z.array(z.string().max(180)).max(6),
    checkoutIssues: z.array(z.string().max(180)).max(5),
    uxSuggestions: z.array(z.string().max(180)).max(6),
  }),
  seo: z.object({
    productSeo: scoreSchema,
    collectionSeo: scoreSchema,
    blogOpportunity: scoreSchema,
    keywordPotential: z.string().max(220),
    technicalIssues: z.array(z.string().max(180)).max(6),
  }),
  experience: z.object({
    uiUxScore: z.number().min(0).max(100),
    mobileScore: z.number().min(0).max(100),
    trustElements: z.array(z.string().max(140)).max(6),
    navigationClarity: z.string().max(200),
    brandingConsistency: z.string().max(200),
  }),
  behavior: z.object({
    bounceRisks: z.array(z.string().max(180)).max(4),
    journey: z.string().max(280),
    dropoffPoints: z.array(z.string().max(140)).max(5),
    purchaseIntent: z.string().max(220),
  }),
  growth: z.object({
    quickWins: z.array(z.string().max(180)).max(5),
    midTerm: z.array(z.string().max(180)).max(5),
    longTerm: z.array(z.string().max(180)).max(5),
    revenueImpact: z.string().max(220),
  }),
  competitors: z.object({
    industryComparison: z.string().max(280),
    missingFeatures: z.array(z.string().max(160)).max(5),
    outperformOpportunities: z.array(z.string().max(180)).max(5),
  }),
  scorecard: z.object({
    traffic: z.number().min(0).max(100),
    ads: z.number().min(0).max(100),
    cro: z.number().min(0).max(100),
    seo: z.number().min(0).max(100),
    overall: z.number().min(0).max(100),
  }),
  actionPlan: z.object({
    urgentFixes: z.array(z.string().max(200)).min(5).max(5),
    growthStrategies: z.array(z.string().max(200)).min(5).max(5),
    prioritizedChecklist: z.array(z.object({
      priority: z.enum(["High", "Medium", "Low"]),
      task: z.string().max(200),
    })).max(10),
  }),
  storeName: z.string().max(120),
  platformGuess: z.string().max(60),
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
      "User-Agent": "Mozilla/5.0 (compatible; BeingEcomAuditBot/1.0)",
      "Accept": "text/html,application/xhtml+xml",
    },
    redirect: "follow",
    signal: AbortSignal.timeout(15000),
  });
  const html = await res.text();
  return { html: html.slice(0, 120000), status: res.status };
}

function stripHtml(html: string): { text: string; title: string; metaDesc: string; signals: string[] } {
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i);
  const signals: string[] = [];
  if (/cdn\.shopify\.com|shopify\.com\/s\//i.test(html)) signals.push("Shopify");
  if (/wp-content|woocommerce/i.test(html)) signals.push("WooCommerce/WordPress");
  if (/klaviyo/i.test(html)) signals.push("Klaviyo");
  if (/gtag\(|googletagmanager/i.test(html)) signals.push("GA4/GTM");
  if (/connect\.facebook\.net|fbq\(/i.test(html)) signals.push("Meta Pixel");
  if (/judge\.me|loox|yotpo|stamped/i.test(html)) signals.push("Reviews app");
  if (/add[_-]?to[_-]?cart/i.test(html)) signals.push("Cart present");
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 12000);
  return {
    text,
    title: titleMatch?.[1]?.trim() ?? "",
    metaDesc: descMatch?.[1]?.trim() ?? "",
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

    let pageData = { text: "", title: "", metaDesc: "", signals: [] as string[], status: 0 };
    try {
      const { html, status } = await fetchPage(normalized);
      const parsed = stripHtml(html);
      pageData = { ...parsed, status };
    } catch {
      // continue with empty page data; AI still produces a heuristic audit
    }

    const system = `You are a senior ecommerce growth strategist for BeingEcom, an agency that scales Shopify & WooCommerce stores. You produce honest, money-focused audits in plain language for non-technical store owners. Always return realistic, specific insights. Use the supplied page signals when present. Avoid generic advice. Scores must reflect realistic strengths and weaknesses (don't give everything 80+). Focus on revenue impact.`;

    const userPrompt = `Audit this ecommerce store and return the JSON report.

Store URL: ${normalized}
HTTP status: ${pageData.status}
Detected platform/tools: ${pageData.signals.join(", ") || "unknown"}
Page <title>: ${pageData.title || "(none)"}
Meta description: ${pageData.metaDesc || "(none)"}
Reported monthly revenue: ${data.revenue || "not provided"}
Reported monthly ad spend: ${data.adSpend || "not provided"}
Target country: ${data.country || "not provided"}

Visible page text (truncated):
"""
${pageData.text || "(could not fetch page content - infer from URL and provided context)"}
"""

Rules:
- "storeName" = brand name from title/text or domain.
- "platformGuess" = Shopify, WooCommerce, BigCommerce, custom, or "unknown".
- Sources percentages in "traffic.sources" must sum to 100.
- Scores should vary realistically across categories. Weaker areas = lower scores.
- Action items must be concrete (e.g., "Add sticky add-to-cart on mobile PDPs", not "improve UX").
- 3 keyOpportunities, exactly 5 urgentFixes, exactly 5 growthStrategies.`;

    const schemaForModel = {
      type: "object",
      properties: {
        executiveSummary: {
          type: "object",
          properties: {
            overallScore: { type: "number" },
            diagnosis: {
              type: "object",
              properties: {
                traffic: { type: "string", enum: ["Strong", "Average", "Weak"] },
                conversion: { type: "string", enum: ["Strong", "Average", "Weak"] },
                ads: { type: "string", enum: ["Efficient", "Average", "Inefficient"] },
              },
              required: ["traffic", "conversion", "ads"],
            },
            keyOpportunities: { type: "array", items: { type: "string" } },
            headline: { type: "string" },
          },
          required: ["overallScore", "diagnosis", "keyOpportunities", "headline"],
        },
        traffic: {
          type: "object",
          properties: {
            quality: { type: "string" },
            sources: {
              type: "object",
              properties: {
                organic: { type: "number" }, paid: { type: "number" },
                social: { type: "number" }, direct: { type: "number" },
              },
              required: ["organic", "paid", "social", "direct"],
            },
            topCountries: { type: "array", items: { type: "string" } },
            mobileVsDesktop: { type: "string" },
          },
          required: ["quality", "sources", "topCountries", "mobileVsDesktop"],
        },
        ads: {
          type: "object",
          properties: {
            metaHealth: { type: "object", properties: { score: { type: "number" }, verdict: { type: "string" } }, required: ["score", "verdict"] },
            googleHealth: { type: "object", properties: { score: { type: "number" }, verdict: { type: "string" } }, required: ["score", "verdict"] },
            estimatedRoas: { type: "string" },
            funnelLeaks: { type: "array", items: { type: "string" } },
            wasteIndicators: { type: "array", items: { type: "string" } },
            retargetingScore: { type: "number" },
          },
          required: ["metaHealth", "googleHealth", "estimatedRoas", "funnelLeaks", "wasteIndicators", "retargetingScore"],
        },
        cro: {
          type: "object",
          properties: {
            benchmarkCr: { type: "string" },
            productPageIssues: { type: "array", items: { type: "string" } },
            checkoutIssues: { type: "array", items: { type: "string" } },
            uxSuggestions: { type: "array", items: { type: "string" } },
          },
          required: ["benchmarkCr", "productPageIssues", "checkoutIssues", "uxSuggestions"],
        },
        seo: {
          type: "object",
          properties: {
            productSeo: { type: "object", properties: { score: { type: "number" }, verdict: { type: "string" } }, required: ["score", "verdict"] },
            collectionSeo: { type: "object", properties: { score: { type: "number" }, verdict: { type: "string" } }, required: ["score", "verdict"] },
            blogOpportunity: { type: "object", properties: { score: { type: "number" }, verdict: { type: "string" } }, required: ["score", "verdict"] },
            keywordPotential: { type: "string" },
            technicalIssues: { type: "array", items: { type: "string" } },
          },
          required: ["productSeo", "collectionSeo", "blogOpportunity", "keywordPotential", "technicalIssues"],
        },
        experience: {
          type: "object",
          properties: {
            uiUxScore: { type: "number" },
            mobileScore: { type: "number" },
            trustElements: { type: "array", items: { type: "string" } },
            navigationClarity: { type: "string" },
            brandingConsistency: { type: "string" },
          },
          required: ["uiUxScore", "mobileScore", "trustElements", "navigationClarity", "brandingConsistency"],
        },
        behavior: {
          type: "object",
          properties: {
            bounceRisks: { type: "array", items: { type: "string" } },
            journey: { type: "string" },
            dropoffPoints: { type: "array", items: { type: "string" } },
            purchaseIntent: { type: "string" },
          },
          required: ["bounceRisks", "journey", "dropoffPoints", "purchaseIntent"],
        },
        growth: {
          type: "object",
          properties: {
            quickWins: { type: "array", items: { type: "string" } },
            midTerm: { type: "array", items: { type: "string" } },
            longTerm: { type: "array", items: { type: "string" } },
            revenueImpact: { type: "string" },
          },
          required: ["quickWins", "midTerm", "longTerm", "revenueImpact"],
        },
        competitors: {
          type: "object",
          properties: {
            industryComparison: { type: "string" },
            missingFeatures: { type: "array", items: { type: "string" } },
            outperformOpportunities: { type: "array", items: { type: "string" } },
          },
          required: ["industryComparison", "missingFeatures", "outperformOpportunities"],
        },
        scorecard: {
          type: "object",
          properties: {
            traffic: { type: "number" }, ads: { type: "number" },
            cro: { type: "number" }, seo: { type: "number" }, overall: { type: "number" },
          },
          required: ["traffic", "ads", "cro", "seo", "overall"],
        },
        actionPlan: {
          type: "object",
          properties: {
            urgentFixes: { type: "array", items: { type: "string" } },
            growthStrategies: { type: "array", items: { type: "string" } },
            prioritizedChecklist: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  priority: { type: "string", enum: ["High", "Medium", "Low"] },
                  task: { type: "string" },
                },
                required: ["priority", "task"],
              },
            },
          },
          required: ["urgentFixes", "growthStrategies", "prioritizedChecklist"],
        },
        storeName: { type: "string" },
        platformGuess: { type: "string" },
      },
      required: ["executiveSummary", "traffic", "ads", "cro", "seo", "experience", "behavior", "growth", "competitors", "scorecard", "actionPlan", "storeName", "platformGuess"],
    };

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": apiKey,
      },
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
            description: "Submit the completed ecommerce store audit report.",
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

    let parsedArgs: unknown;
    try { parsedArgs = typeof args === "string" ? JSON.parse(args) : args; }
    catch { throw new Error("Failed to parse audit response."); }

    const report = auditReportSchema.parse(parsedArgs);
    return { url: normalized, report };
  });
