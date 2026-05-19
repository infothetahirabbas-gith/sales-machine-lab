import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type DbCaseStudy = {
  id: string;
  slug: string;
  title: string;
  brand: string;
  industry: string;
  category: "Ads" | "SEO" | "CRO";
  website_url: string | null;
  hero_metric: string;
  hero_metric_label: string;
  duration: string;
  problem: string;
  strategy: string[];
  takeaway: string;
  results: { v: string; l: string; sub?: string }[];
  ad_metrics: {
    spend?: number;
    revenue?: number;
    roas?: number;
    cpa?: number;
    purchases?: number;
    ctr?: number;
    conv_rate?: number;
    aov?: number;
  } | null;
  before_image_url: string | null;
  after_image_url: string | null;
  screenshot_url: string | null;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
};

function mapRow(row: any): DbCaseStudy {
  return {
    ...row,
    strategy: Array.isArray(row.strategy) ? row.strategy : [],
    results: Array.isArray(row.results) ? row.results : [],
    ad_metrics: row.ad_metrics ?? null,
  };
}

// Public: list published case studies (no auth required, server-side admin client safe-projection)
export const listPublishedCaseStudies = createServerFn({ method: "GET" }).handler(
  async () => {
    const { data, error } = await supabaseAdmin
      .from("case_studies")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: false })
      .order("created_at", { ascending: false });
    if (error) {
      console.error("listPublishedCaseStudies error:", error);
      return { studies: [] as DbCaseStudy[], error: error.message };
    }
    return { studies: (data ?? []).map(mapRow), error: null as string | null };
  }
);

async function assertAdmin(userId: string) {
  const { data, error } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden: admin role required");
}

export const getMyAdminStatus = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    return { isAdmin: !!data, userId: context.userId };
  });

export const listAllCaseStudies = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.userId);
    const { data, error } = await supabaseAdmin
      .from("case_studies")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { studies: (data ?? []).map(mapRow) };
  });

const upsertSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/, "lowercase, numbers, dashes only"),
  title: z.string().min(1).max(300),
  brand: z.string().min(1).max(200),
  industry: z.string().max(200).default(""),
  category: z.enum(["Ads", "SEO", "CRO"]),
  website_url: z.string().url().nullable().optional(),
  hero_metric: z.string().min(1).max(50),
  hero_metric_label: z.string().min(1).max(80),
  duration: z.string().max(80).default(""),
  problem: z.string().max(2000).default(""),
  strategy: z.array(z.string().max(500)).max(20).default([]),
  takeaway: z.string().max(800).default(""),
  results: z
    .array(
      z.object({
        v: z.string().min(1).max(40),
        l: z.string().min(1).max(60),
        sub: z.string().max(80).optional(),
      })
    )
    .min(3, "at least 3 result blocks required")
    .max(12),
  ad_metrics: z
    .object({
      spend: z.number().nonnegative().optional(),
      revenue: z.number().nonnegative().optional(),
      roas: z.number().nonnegative().optional(),
      cpa: z.number().nonnegative().optional(),
      purchases: z.number().int().nonnegative().optional(),
      ctr: z.number().nonnegative().optional(),
      conv_rate: z.number().nonnegative().optional(),
      aov: z.number().nonnegative().optional(),
    })
    .nullable()
    .optional(),
  before_image_url: z.string().url().nullable().optional(),
  after_image_url: z.string().url().nullable().optional(),
  screenshot_url: z.string().url().nullable().optional(),
  sort_order: z.number().int().default(0),
  published: z.boolean().default(true),
});

export const upsertCaseStudy = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => upsertSchema.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.userId);
    const payload = {
      ...data,
      strategy: data.strategy,
      results: data.results,
      ad_metrics: data.ad_metrics ?? null,
    };
    if (data.id) {
      const { error } = await supabaseAdmin
        .from("case_studies")
        .update(payload)
        .eq("id", data.id);
      if (error) throw new Error(error.message);
      return { id: data.id };
    }
    const { data: row, error } = await supabaseAdmin
      .from("case_studies")
      .insert(payload)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: row.id };
  });

export const deleteCaseStudy = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.userId);
    const { error } = await supabaseAdmin.from("case_studies").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
