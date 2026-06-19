import { test, expect, type Page } from "@playwright/test";

/**
 * Pixel-level visual regression for the chatbot send button and the homepage
 * CTA stack on every mobile device declared in playwright.config.ts.
 *
 * Snapshots are stored per-device under __screenshots__/<spec>/<device>/.
 * First run with `--update-snapshots` creates the baselines.
 */

const dismissCookieBannerIfPresent = async (page: Page) => {
  const accept = page.getByRole("button", { name: /accept|agree|got it/i }).first();
  if (await accept.isVisible().catch(() => false)) await accept.click();
};

test.describe("Homepage hero CTA pair (mobile)", () => {
  test("CTAs align and stay fully visible", async ({ page }) => {
    await page.goto("/");
    await dismissCookieBannerIfPresent(page);

    const ctaPair = page.locator(".btn-pair").first();
    await expect(ctaPair).toBeVisible();
    await ctaPair.scrollIntoViewIfNeeded();

    // Both buttons must be inside the viewport — no horizontal overflow
    const book = page.getByRole("link", { name: /book strategy call/i }).first();
    const audit = page.getByRole("link", { name: /free store audit/i }).first();
    for (const cta of [book, audit]) {
      await expect(cta).toBeVisible();
      const box = await cta.boundingBox();
      const vp = page.viewportSize()!;
      expect(box, "CTA must have a layout box").not.toBeNull();
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(vp.width + 0.5);
      expect(box!.height).toBeGreaterThanOrEqual(40); // mobile tap target
    }

    await expect(ctaPair).toHaveScreenshot("hero-cta-pair.png");
  });
});

test.describe("Floating chatbot send button (mobile)", () => {
  test("send button stays visible and aligned next to the input", async ({ page }) => {
    await page.goto("/");
    await dismissCookieBannerIfPresent(page);

    await page.getByRole("button", { name: /open chat assistant/i }).click();
    const sendBtn = page.getByRole("button", { name: /^send$/i });
    const input   = page.getByPlaceholder(/type your question/i);

    await expect(sendBtn).toBeVisible();
    await expect(input).toBeVisible();
    await input.fill("Hi");

    const [sBox, iBox] = await Promise.all([sendBtn.boundingBox(), input.boundingBox()]);
    expect(sBox && iBox).toBeTruthy();

    const vp = page.viewportSize()!;
    // Send button fully on-screen
    expect(sBox!.x).toBeGreaterThanOrEqual(0);
    expect(sBox!.x + sBox!.width).toBeLessThanOrEqual(vp.width + 0.5);
    // Min 40×40 tap target
    expect(sBox!.width).toBeGreaterThanOrEqual(40);
    expect(sBox!.height).toBeGreaterThanOrEqual(40);
    // Vertically centred with the input (≤ 4px drift)
    const sCenter = sBox!.y + sBox!.height / 2;
    const iCenter = iBox!.y + iBox!.height / 2;
    expect(Math.abs(sCenter - iCenter)).toBeLessThan(4);
    // Send sits to the right of the input
    expect(sBox!.x).toBeGreaterThan(iBox!.x + iBox!.width - 1);

    const composer = page.locator("form").filter({ has: sendBtn }).first();
    await expect(composer).toHaveScreenshot("chatbot-composer.png");
  });
});
