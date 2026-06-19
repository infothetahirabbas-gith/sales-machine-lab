import { defineConfig, devices } from "@playwright/test";

/**
 * Mobile visual-regression suite for BeingEcom.
 *
 * Boots the Vite dev server, then runs the same spec against several real
 * mobile device emulations. Snapshots live in tests/visual/__screenshots__/.
 *
 * Usage:
 *   npx playwright install --with-deps   # first run only
 *   npx playwright test                  # run / compare
 *   npx playwright test --update-snapshots
 */
export default defineConfig({
  testDir: "./tests/visual",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  expect: {
    // Allow 0.2% pixel diff to absorb font/AA noise across machines
    toHaveScreenshot: { maxDiffPixelRatio: 0.002, animations: "disabled" },
  },
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:5210",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "iphone-se",       use: { ...devices["iPhone SE"] } },        // 375×667
    { name: "iphone-12",       use: { ...devices["iPhone 12"] } },        // 390×844
    { name: "iphone-14-promax",use: { ...devices["iPhone 14 Pro Max"] } },// 430×932
    { name: "pixel-7",         use: { ...devices["Pixel 7"] } },          // 412×915
    { name: "galaxy-s9",       use: { ...devices["Galaxy S9+"] } },       // 320×658
  ],
  webServer: {
    command: "npx vite dev --port 5210 --host 127.0.0.1",
    url: "http://127.0.0.1:5210/",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
