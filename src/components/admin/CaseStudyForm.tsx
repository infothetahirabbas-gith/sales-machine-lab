import { useState } from "react";
import type { DbCaseStudy } from "@/lib/case-studies.functions";

type Props = {
  initial?: DbCaseStudy | null;
  onSubmit: (data: Partial<DbCaseStudy>) => void | Promise<void>;
  onCancel?: () => void;
};

export default function CaseStudyForm({ initial, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<Partial<DbCaseStudy>>(
    initial ?? {
      slug: "",
      title: "",
      brand: "",
      category: "ads",
      hero_metric: "",
      hero_metric_label: "",
      published: true,
    }
  );

  const set = <K extends keyof DbCaseStudy>(k: K, v: DbCaseStudy[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="space-y-4"
    >
      <div className="grid grid-cols-2 gap-3">
        <label className="text-sm">
          Slug
          <input
            required
            value={form.slug ?? ""}
            onChange={(e) => set("slug", e.target.value)}
            className="mt-1 w-full rounded-md border border-border px-3 py-2"
          />
        </label>
        <label className="text-sm">
          Title
          <input
            required
            value={form.title ?? ""}
            onChange={(e) => set("title", e.target.value)}
            className="mt-1 w-full rounded-md border border-border px-3 py-2"
          />
        </label>
        <label className="text-sm">
          Brand
          <input
            value={form.brand ?? ""}
            onChange={(e) => set("brand", e.target.value)}
            className="mt-1 w-full rounded-md border border-border px-3 py-2"
          />
        </label>
        <label className="text-sm">
          Category
          <select
            value={form.category ?? "ads"}
            onChange={(e) => set("category", e.target.value)}
            className="mt-1 w-full rounded-md border border-border px-3 py-2"
          >
            <option value="ads">Ads</option>
            <option value="seo">SEO</option>
            <option value="cro">CRO</option>
          </select>
        </label>
        <label className="text-sm">
          Hero metric
          <input
            value={form.hero_metric ?? ""}
            onChange={(e) => set("hero_metric", e.target.value)}
            className="mt-1 w-full rounded-md border border-border px-3 py-2"
          />
        </label>
        <label className="text-sm">
          Hero metric label
          <input
            value={form.hero_metric_label ?? ""}
            onChange={(e) => set("hero_metric_label", e.target.value)}
            className="mt-1 w-full rounded-md border border-border px-3 py-2"
          />
        </label>
        <label className="text-sm">
          Website URL
          <input
            value={form.website_url ?? ""}
            onChange={(e) => set("website_url", e.target.value)}
            className="mt-1 w-full rounded-md border border-border px-3 py-2"
          />
        </label>
        <label className="text-sm">
          Screenshot URL
          <input
            value={form.screenshot_url ?? ""}
            onChange={(e) => set("screenshot_url", e.target.value)}
            className="mt-1 w-full rounded-md border border-border px-3 py-2"
          />
        </label>
      </div>

      <label className="text-sm block">
        Problem
        <textarea
          value={form.problem ?? ""}
          onChange={(e) => set("problem", e.target.value)}
          rows={3}
          className="mt-1 w-full rounded-md border border-border px-3 py-2"
        />
      </label>

      <label className="text-sm block">
        Takeaway
        <textarea
          value={form.takeaway ?? ""}
          onChange={(e) => set("takeaway", e.target.value)}
          rows={2}
          className="mt-1 w-full rounded-md border border-border px-3 py-2"
        />
      </label>

      <label className="inline-flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={!!form.published}
          onChange={(e) => set("published", e.target.checked)}
        />
        Published
      </label>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-border px-4 py-2 text-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white"
        >
          Save
        </button>
      </div>
    </form>
  );
}
