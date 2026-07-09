// Central WhatsApp helpers - keeps the number in one place and lets pages
// build context-aware chat links (industry name, service, etc.).
export const WHATSAPP_NUMBER = "447882743592";

export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function whatsappForIndustry(industry: string, extra?: string): string {
  return whatsappUrl(
    `Hi BeingEcom - I run a ${industry} brand and want to talk about scaling.${extra ? ` ${extra}` : ""}`,
  );
}
