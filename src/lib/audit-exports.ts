import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import type { AuditReport } from "./store-audit.functions";

function slugFromUrl(u: string): string {
  try { return new URL(u).hostname.replace(/^www\./, "").replace(/[^a-z0-9]+/gi, "-"); }
  catch { return "store-audit"; }
}

function triggerDownload(filename: string, content: BlobPart, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function scoreRows(r: AuditReport): (string | number)[][] {
  const s = r.scorecard;
  return [
    ["SEO", s.seo],
    ["Paid Ads", s.paidAds],
    ["CRO", s.cro],
    ["Brand Authority", s.brandAuthority],
    ["Trust", s.trust],
    ["Product Positioning", s.productPositioning],
    ["Customer Acquisition", s.customerAcquisition],
    ["Retention", s.retention],
    ["Customer Experience", s.customerExperience],
    ["Market Position", s.marketPosition],
    ["Competitive Advantage", s.competitiveAdvantage],
    ["Revenue Efficiency", s.revenueEfficiency],
    ["Scalability", s.scalability],
    ["Business Maturity", s.businessMaturity],
    ["Overall", s.overall],
  ];
}

function flatRows(r: AuditReport): { section: string; key: string; value: string }[] {
  const rows: { section: string; key: string; value: string }[] = [];
  const push = (section: string, key: string, value: string | number) =>
    rows.push({ section, key, value: String(value ?? "") });

  push("Executive", "Headline", r.executiveIntelligence.headline);
  push("Executive", "Business Reality", r.executiveIntelligence.businessReality);
  push("Executive", "Biggest Opportunity", r.executiveIntelligence.biggestOpportunity);
  push("Executive", "Biggest Threat", r.executiveIntelligence.biggestThreat);
  push("Executive", "Revenue Potential", r.executiveIntelligence.revenuePotential);
  Object.entries(r.business).forEach(([k, v]) => push("Business", k, String(v)));
  Object.entries(r.scorecard).forEach(([k, v]) => push("Scorecard", k, v));
  push("SEO", "Technical", `${r.seoIntelligence.technical.score}/100 — ${r.seoIntelligence.technical.verdict}`);
  push("SEO", "On-Page", `${r.seoIntelligence.onPage.score}/100 — ${r.seoIntelligence.onPage.verdict}`);
  push("SEO", "Content Authority", `${r.seoIntelligence.contentAuthority.score}/100 — ${r.seoIntelligence.contentAuthority.verdict}`);
  push("SEO", "Commercial SEO", `${r.seoIntelligence.commercialSeo.score}/100 — ${r.seoIntelligence.commercialSeo.verdict}`);
  push("SEO", "Competitive Gap", r.seoIntelligence.competitiveSeoGap);
  r.seoIntelligence.technicalIssues.forEach((i, idx) => push("SEO Issues", `#${idx + 1}`, i));
  Object.entries(r.adsIntelligence).forEach(([k, v]) => push("Ads", k, String(v)));
  (["homepage", "productPages", "cartCheckout", "mobile", "ctaStrength"] as const).forEach(k =>
    push("CRO", k, r.conversionIntelligence[k]));
  r.conversionIntelligence.friction.forEach((i, idx) => push("CRO Friction", `#${idx + 1}`, i));
  r.conversionIntelligence.trustGaps.forEach((i, idx) => push("CRO Trust Gaps", `#${idx + 1}`, i));
  r.conversionIntelligence.conversionKillers.forEach((i, idx) => push("CRO Killers", `#${idx + 1}`, i));
  Object.entries(r.brandIntelligence).forEach(([k, v]) => push("Brand", k, String(v)));
  Object.entries(r.psychologyIntelligence).forEach(([k, v]) => push("Psychology", k, String(v)));
  Object.entries(r.acquisitionIntelligence).forEach(([k, v]) => push("Acquisition", k, String(v)));
  Object.entries(r.retentionIntelligence).forEach(([k, v]) => push("Retention", k, String(v)));
  r.competitors.forEach((c, idx) =>
    push("Competitors", `${idx + 1}. ${c.name}`, `[${c.tier}] ${c.website} | Positioning: ${c.positioning} | Strengths: ${c.strengths} | Weaknesses: ${c.weaknesses} | USP: ${c.usp}`));
  (["competitorAdvantages", "missingFeatures", "marketOpportunities", "differentiationOpportunities", "blueOcean"] as const).forEach(group => {
    r.competitiveGap[group].forEach((i, idx) => push(`Gap: ${group}`, `#${idx + 1}`, i));
  });
  r.revenueLeakage.forEach((l, idx) =>
    push("Revenue Leakage", `${idx + 1}. ${l.area} [${l.severity}]`, `${l.leak} → ${l.impact}`));
  (["superHot", "hot", "medium"] as const).forEach(tier => {
    r.issueClassification[tier].forEach((i, idx) =>
      push(`Issues: ${tier}`, `${idx + 1}. ${i.issue}`, `Why: ${i.why} | Fix: ${i.fix}`));
  });
  r.opportunities.forEach((o, idx) =>
    push("Opportunities", `${idx + 1}. ${o.title}`, `[${o.difficulty}/ROI:${o.roi}] Impact: ${o.expectedImpact} | Action: ${o.action}`));
  r.actionPlan.immediate.forEach((i, idx) => push("Action 0-7d", `#${idx + 1}`, i));
  r.actionPlan.growth.forEach((i, idx) => push("Action 7-30d", `#${idx + 1}`, i));
  r.actionPlan.scale.forEach((i, idx) => push("Action 30-90d", `#${idx + 1}`, i));
  Object.entries(r.founderInsights).forEach(([k, v]) => push("Founder Insights", k, String(v)));
  return rows;
}

export function downloadCSV(r: AuditReport, url: string) {
  const rows = flatRows(r);
  const escape = (s: string) => `"${String(s).replace(/"/g, '""')}"`;
  const csv = ["Section,Key,Value", ...rows.map(r => [r.section, r.key, r.value].map(escape).join(","))].join("\n");
  triggerDownload(`${slugFromUrl(url)}-being-ecom-brain.csv`, csv, "text/csv;charset=utf-8");
}

export function downloadXLSX(r: AuditReport, url: string) {
  const wb = XLSX.utils.book_new();

  const summary = [
    ["Store", r.storeName],
    ["URL", url],
    ["Platform", r.platformGuess],
    ["Generated", new Date().toLocaleString()],
    ["Overall Score", `${r.scorecard.overall}/100`],
    ["Revenue Potential", r.executiveIntelligence.revenuePotential],
    ["Headline", r.executiveIntelligence.headline],
    ["Biggest Opportunity", r.executiveIntelligence.biggestOpportunity],
    ["Biggest Threat", r.executiveIntelligence.biggestThreat],
  ];
  const wsSummary = XLSX.utils.aoa_to_sheet(summary);
  wsSummary["!cols"] = [{ wch: 22 }, { wch: 90 }];
  XLSX.utils.book_append_sheet(wb, wsSummary, "Summary");

  const wsScores = XLSX.utils.aoa_to_sheet([["Metric", "Score (0-100)"], ...scoreRows(r)]);
  wsScores["!cols"] = [{ wch: 26 }, { wch: 16 }];
  XLSX.utils.book_append_sheet(wb, wsScores, "Scorecard");

  const issues = [
    ["Tier", "Issue", "Why It Matters", "Fix"],
    ...r.issueClassification.superHot.map(i => ["Super Hot", i.issue, i.why, i.fix]),
    ...r.issueClassification.hot.map(i => ["Hot", i.issue, i.why, i.fix]),
    ...r.issueClassification.medium.map(i => ["Medium", i.issue, i.why, i.fix]),
  ];
  const wsIssues = XLSX.utils.aoa_to_sheet(issues);
  wsIssues["!cols"] = [{ wch: 12 }, { wch: 40 }, { wch: 50 }, { wch: 50 }];
  XLSX.utils.book_append_sheet(wb, wsIssues, "Issues");

  const opps = [
    ["#", "Title", "Difficulty", "ROI", "Expected Impact", "Action"],
    ...r.opportunities.map((o, i) => [i + 1, o.title, o.difficulty, o.roi, o.expectedImpact, o.action]),
  ];
  const wsOpps = XLSX.utils.aoa_to_sheet(opps);
  wsOpps["!cols"] = [{ wch: 4 }, { wch: 36 }, { wch: 12 }, { wch: 12 }, { wch: 46 }, { wch: 46 }];
  XLSX.utils.book_append_sheet(wb, wsOpps, "Opportunities");

  const leaks = [
    ["Severity", "Area", "Leak", "Impact"],
    ...r.revenueLeakage.map(l => [l.severity, l.area, l.leak, l.impact]),
  ];
  const wsLeaks = XLSX.utils.aoa_to_sheet(leaks);
  wsLeaks["!cols"] = [{ wch: 10 }, { wch: 20 }, { wch: 50 }, { wch: 50 }];
  XLSX.utils.book_append_sheet(wb, wsLeaks, "Revenue Leakage");

  const comps = [
    ["#", "Name", "Tier", "Website", "Positioning", "Strengths", "Weaknesses", "USP"],
    ...r.competitors.map((c, i) => [i + 1, c.name, c.tier, c.website, c.positioning, c.strengths, c.weaknesses, c.usp]),
  ];
  const wsComps = XLSX.utils.aoa_to_sheet(comps);
  wsComps["!cols"] = [{ wch: 4 }, { wch: 22 }, { wch: 8 }, { wch: 30 }, { wch: 36 }, { wch: 36 }, { wch: 36 }, { wch: 36 }];
  XLSX.utils.book_append_sheet(wb, wsComps, "Competitors");

  const plan = [
    ["Window", "#", "Action"],
    ...r.actionPlan.immediate.map((a, i) => ["0-7 days", i + 1, a]),
    ...r.actionPlan.growth.map((a, i) => ["7-30 days", i + 1, a]),
    ...r.actionPlan.scale.map((a, i) => ["30-90 days", i + 1, a]),
  ];
  const wsPlan = XLSX.utils.aoa_to_sheet(plan);
  wsPlan["!cols"] = [{ wch: 12 }, { wch: 4 }, { wch: 80 }];
  XLSX.utils.book_append_sheet(wb, wsPlan, "90-Day Plan");

  const wsFull = XLSX.utils.json_to_sheet(flatRows(r));
  wsFull["!cols"] = [{ wch: 22 }, { wch: 36 }, { wch: 80 }];
  XLSX.utils.book_append_sheet(wb, wsFull, "Full Data");

  const out = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  triggerDownload(`${slugFromUrl(url)}-being-ecom-brain.xlsx`, out, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
}

export function downloadPDF(r: AuditReport, url: string) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const M = 40;
  let y = M;

  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, W, 90, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18); doc.setFont("helvetica", "bold");
  doc.text("Being Ecom Brain™ — Growth Intelligence Report", M, 38);
  doc.setFontSize(10); doc.setFont("helvetica", "normal");
  doc.text(`${r.storeName} · ${url}`, M, 56);
  doc.text(`${r.platformGuess} · ${r.business.industry} · Generated ${new Date().toLocaleString()}`, M, 70);
  y = 110;

  // Overall score badge
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(48); doc.setFont("helvetica", "bold");
  doc.text(`${r.scorecard.overall}`, M, y + 30);
  doc.setFontSize(10); doc.setFont("helvetica", "normal");
  doc.text("Overall Growth Score / 100", M + 90, y + 18);
  doc.text(`Revenue Potential: ${r.executiveIntelligence.revenuePotential}`, M + 90, y + 34);
  y += 60;

  // Executive bullets
  doc.setFontSize(12); doc.setFont("helvetica", "bold");
  doc.text("Executive Summary", M, y); y += 14;
  doc.setFontSize(10); doc.setFont("helvetica", "normal");
  const exec = [
    `Headline: ${r.executiveIntelligence.headline}`,
    `Reality: ${r.executiveIntelligence.businessReality}`,
    `Opportunity: ${r.executiveIntelligence.biggestOpportunity}`,
    `Threat: ${r.executiveIntelligence.biggestThreat}`,
  ];
  exec.forEach(line => {
    const wrapped = doc.splitTextToSize(`• ${line}`, W - M * 2);
    doc.text(wrapped, M, y);
    y += wrapped.length * 12 + 2;
  });
  y += 6;

  autoTable(doc, {
    startY: y,
    head: [["Growth Metric", "Score / 100"]],
    body: scoreRows(r).map(([k, v]) => [String(k), String(v)]),
    headStyles: { fillColor: [15, 23, 42] },
    styles: { fontSize: 9 },
    margin: { left: M, right: M },
  });

  const allIssues = [
    ...r.issueClassification.superHot.map(i => ["Super Hot", i.issue, i.fix]),
    ...r.issueClassification.hot.map(i => ["Hot", i.issue, i.fix]),
    ...r.issueClassification.medium.map(i => ["Medium", i.issue, i.fix]),
  ];
  if (allIssues.length) {
    autoTable(doc, {
      head: [["Tier", "Issue", "Fix"]],
      body: allIssues,
      headStyles: { fillColor: [220, 38, 38] },
      styles: { fontSize: 9, cellWidth: "wrap" },
      columnStyles: { 0: { cellWidth: 60 }, 1: { cellWidth: 200 } },
      margin: { left: M, right: M },
    });
  }

  autoTable(doc, {
    head: [["#", "Opportunity", "ROI", "Difficulty", "Action"]],
    body: r.opportunities.map((o, i) => [i + 1, o.title, o.roi, o.difficulty, o.action]),
    headStyles: { fillColor: [16, 185, 129] },
    styles: { fontSize: 9 },
    margin: { left: M, right: M },
  });

  autoTable(doc, {
    head: [["Severity", "Area", "Leak → Impact"]],
    body: r.revenueLeakage.map(l => [l.severity, l.area, `${l.leak} → ${l.impact}`]),
    headStyles: { fillColor: [234, 88, 12] },
    styles: { fontSize: 9 },
    margin: { left: M, right: M },
  });

  autoTable(doc, {
    head: [["Window", "#", "Action"]],
    body: [
      ...r.actionPlan.immediate.map((a, i) => ["0-7 days", i + 1, a]),
      ...r.actionPlan.growth.map((a, i) => ["7-30 days", i + 1, a]),
      ...r.actionPlan.scale.map((a, i) => ["30-90 days", i + 1, a]),
    ],
    headStyles: { fillColor: [37, 99, 235] },
    styles: { fontSize: 9 },
    margin: { left: M, right: M },
  });

  // Footer on each page
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8); doc.setTextColor(120);
    doc.text(`BeingEcom · Being Ecom Brain™ · Page ${i}/${pageCount}`, M, doc.internal.pageSize.getHeight() - 20);
  }

  doc.save(`${slugFromUrl(url)}-being-ecom-brain.pdf`);
}
