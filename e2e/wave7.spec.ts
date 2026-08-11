import { test, expect } from "@playwright/test";

const BASE = process.env.BASE_URL ?? "http://127.0.0.1:3100";

const ERRORS: string[] = [];

test.beforeEach(async ({ page }) => {
  ERRORS.length = 0;
  page.on("console", (msg) => {
    if (msg.type() === "error") ERRORS.push(msg.text().slice(0, 400));
  });
  page.on("pageerror", (err) => ERRORS.push(`PAGEERROR: ${err.message.slice(0, 400)}`));
});

test("dialog opens as a temporary reality and closes back", async ({ page }) => {
  await page.goto(`${BASE}/?noloader=1`, { waitUntil: "networkidle" });
  await page.getByText("OPEN QUICK VIEW").first().click();
  const open = page.locator("dialog:open");
  await expect(open).toHaveCount(1);
  await expect(open.getByText("TEMPORARY REALITY ·")).toBeVisible();
  await expect(open.getByRole("link", { name: /OPEN FULL CASE/ })).toBeVisible();
  await open.getByRole("button", { name: "CLOSE ✕" }).click();
  await expect(page.locator("dialog:open")).toHaveCount(0);
  expect(ERRORS.filter((e) => !e.includes("favicon"))).toEqual([]);
});

test("timeline machine scrubs between years", async ({ page }) => {
  await page.goto(`${BASE}/about?noloader=1`, { waitUntil: "networkidle" });
  const slider = page.getByRole("slider", { name: "Scrub through the timeline machine" });
  await expect(slider).toBeVisible();
  await expect(page.getByText("2025", { exact: true }).first()).toBeVisible();
  await slider.fill("0");
  await expect(page.getByText("2023", { exact: true }).first()).toBeVisible();
  await page.getByRole("button", { name: "2027", exact: true }).click();
  await expect(page.getByText("2027", { exact: true }).first()).toBeVisible();
  expect(ERRORS.filter((e) => !e.includes("favicon"))).toEqual([]);
});

test("mirror title lets the visitor write their own", async ({ page }) => {
  await page.goto(`${BASE}/?noloader=1`, { waitUntil: "networkidle" });
  const mirror = page.locator('[contenteditable="true"]').first();
  await mirror.click();
  await mirror.fill("Creative Technologist");
  await page.keyboard.press("Enter");
  await expect(mirror).toContainText("Creative Technologist");
  await expect(page.getByRole("button", { name: "RESET" })).toBeVisible();
  expect(ERRORS.filter((e) => !e.includes("favicon"))).toEqual([]);
});

test("case page counterfactuals expand with engineering answers", async ({ page }) => {
  await page.goto(`${BASE}/work/mindpulse-pro?noloader=1`, { waitUntil: "networkidle" });
  await expect(page.getByText("WHAT IF …")).toBeVisible();
  const cf = page.getByText("What if the model ran on the server, not the browser?").first();
  await cf.click();
  await expect(page.getByText(/Latency would drop from 20ms/)).toBeVisible();
  expect(ERRORS.filter((e) => !e.includes("favicon"))).toEqual([]);
});

test("unresolved section descends into what i dont know", async ({ page }) => {
  await page.goto(`${BASE}/about?noloader=1`, { waitUntil: "networkidle" });
  await page.getByText("CURRENTLY UNRESOLVED").first().click();
  await page.getByText("Distributed systems, properly").first().click();
  await expect(page.getByText("Building a toy RAFT log in Rust on weekends.")).toBeVisible();
  expect(ERRORS.filter((e) => !e.includes("favicon"))).toEqual([]);
});

test("case page dive descends four layers deep", async ({ page }) => {
  await page.goto(`${BASE}/work/mindpulse-pro?noloader=1`, { waitUntil: "networkidle" });
  await expect(page.getByText("DIVE DEEPER")).toBeVisible();
  await page.getByText("Why FastAPI + WebSockets?").first().click();
  await expect(page.getByText(/polling added ~900ms staleness/)).toBeVisible();
  await page.getByText("What went wrong?").first().click();
  await expect(page.getByText(/rewrote the transport to WebSockets/)).toBeVisible();
  expect(ERRORS.filter((e) => !e.includes("favicon"))).toEqual([]);
});

test("repo inside iframe renders the README", async ({ page }) => {
  await page.goto(`${BASE}/work/unified-dta?noloader=1`, { waitUntil: "networkidle" });
  await expect(page.getByText("THE REPO, INSIDE")).toBeVisible();
  const frame = page.frameLocator('iframe[title="Project README"]');
  await expect(frame.locator("h1").first()).toBeVisible({ timeout: 15000 });
  expect(ERRORS.filter((e) => !e.includes("favicon"))).toEqual([]);
});

test("delhi annotation popover opens", async ({ page }) => {
  await page.goto(`${BASE}/?noloader=1`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "DELHI, INDIA", exact: true }).click();
  await expect(page.getByText("Delhi — why here")).toBeVisible();
  expect(ERRORS.filter((e) => !e.includes("favicon"))).toEqual([]);
});

test("process principles reveal why it matters", async ({ page }) => {
  await page.goto(`${BASE}/process?noloader=1`, { waitUntil: "networkidle" });
  await page.getByText("WHY IT MATTERS").first().click();
  await expect(page.getByText(/100\/100 Lighthouse accessibility score/)).toBeVisible();
  expect(ERRORS.filter((e) => !e.includes("favicon"))).toEqual([]);
});
