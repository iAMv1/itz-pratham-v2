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
  expect(ERRORS.filter((e) => !e.includes("favicon") && !e.startsWith("Failed to load resource"))).toEqual([]);
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
  expect(ERRORS.filter((e) => !e.includes("favicon") && !e.startsWith("Failed to load resource"))).toEqual([]);
});

test("mirror title lets the visitor write their own", async ({ page }) => {
  await page.goto(`${BASE}/?noloader=1`, { waitUntil: "networkidle" });
  const mirror = page.locator('[contenteditable="true"]').first();
  await mirror.click();
  await mirror.fill("Creative Technologist");
  await page.keyboard.press("Enter");
  await expect(mirror).toContainText("Creative Technologist");
  await expect(page.getByRole("button", { name: "RESET" })).toBeVisible();
  expect(ERRORS.filter((e) => !e.includes("favicon") && !e.startsWith("Failed to load resource"))).toEqual([]);
});

test("case page counterfactuals expand with engineering answers", async ({ page }) => {
  await page.goto(`${BASE}/work/mindpulse-pro?noloader=1`, { waitUntil: "networkidle" });
  await expect(page.getByText("WHAT IF …")).toBeVisible();
  const cf = page.getByText("What if the model ran on the server, not the browser?").first();
  await cf.click();
  await expect(page.getByText(/Latency would drop from 20ms/)).toBeVisible();
  expect(ERRORS.filter((e) => !e.includes("favicon") && !e.startsWith("Failed to load resource"))).toEqual([]);
});

test("unresolved section descends into what i dont know", async ({ page }) => {
  await page.goto(`${BASE}/about?noloader=1`, { waitUntil: "networkidle" });
  await page.getByText("CURRENTLY UNRESOLVED").first().click();
  await page.getByText("Distributed systems, properly").first().click();
  await expect(page.getByText("Building a toy RAFT log in Rust on weekends.")).toBeVisible();
  expect(ERRORS.filter((e) => !e.includes("favicon") && !e.startsWith("Failed to load resource"))).toEqual([]);
});

test("case page dive descends four layers deep", async ({ page }) => {
  await page.goto(`${BASE}/work/mindpulse-pro?noloader=1`, { waitUntil: "networkidle" });
  await expect(page.getByText("DIVE DEEPER")).toBeVisible();
  await page.getByText("Why FastAPI + WebSockets?").first().click();
  await expect(page.getByText(/polling added ~900ms staleness/)).toBeVisible();
  await page.getByText("What went wrong?").first().click();
  await expect(page.getByText(/rewrote the transport to WebSockets/)).toBeVisible();
  expect(ERRORS.filter((e) => !e.includes("favicon") && !e.startsWith("Failed to load resource"))).toEqual([]);
});

test("repo inside iframe renders the README", async ({ page }) => {
  await page.goto(`${BASE}/work/unified-dta?noloader=1`, { waitUntil: "networkidle" });
  await expect(page.getByText("THE REPO, INSIDE")).toBeVisible();
  const frame = page.frameLocator('iframe[title="Project README"]');
  await expect(frame.locator("h1").first()).toBeVisible({ timeout: 15000 });
  expect(ERRORS.filter((e) => !e.includes("favicon") && !e.startsWith("Failed to load resource"))).toEqual([]);
});

test("delhi annotation popover opens", async ({ page }) => {
  await page.goto(`${BASE}/?noloader=1`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "DELHI, INDIA", exact: true }).click();
  await expect(page.getByText("Delhi — why here")).toBeVisible();
  expect(ERRORS.filter((e) => !e.includes("favicon") && !e.startsWith("Failed to load resource"))).toEqual([]);
});

test("process principles reveal why it matters", async ({ page }) => {
  await page.goto(`${BASE}/process?noloader=1`, { waitUntil: "networkidle" });
  await page.getByText("WHY IT MATTERS").first().click({ force: true });
  await expect(page.getByText(/the page has failed its own pitch/)).toBeVisible();
  expect(ERRORS.filter((e) => !e.includes("favicon") && !e.startsWith("Failed to load resource"))).toEqual([]);
});

test("now building widget shows live github activity + ist clock", async ({ page }) => {
  await page.goto(`${BASE}/?noloader=1`, { waitUntil: "networkidle" });
  await expect(page.getByText(/NOW BUILDING|BUILD LOG/)).toBeVisible({ timeout: 10000 });
  await expect(page.getByText(/IST \d{2}:\d{2}/).first()).toBeVisible();
  expect(ERRORS.filter((e) => !e.includes("favicon") && !e.startsWith("Failed to load resource"))).toEqual([]);
});

test("contribution graph renders the year in commits", async ({ page }) => {
  await page.goto(`${BASE}/about?noloader=1`, { waitUntil: "networkidle" });
  await expect(page.getByText("THE YEAR IN COMMITS")).toBeVisible({ timeout: 10000 });
  await expect(page.getByText(/CONTRIBUTIONS THIS YEAR/)).toBeVisible({ timeout: 10000 });
  expect(ERRORS.filter((e) => !e.includes("favicon") && !e.startsWith("Failed to load resource"))).toEqual([]);
});

test("case page offers star the repo", async ({ page }) => {
  await page.goto(`${BASE}/work/unified-dta?noloader=1`, { waitUntil: "networkidle" });
  await expect(page.getByRole("link", { name: /STAR THE REPO/ })).toBeVisible();
  expect(ERRORS.filter((e) => !e.includes("favicon") && !e.startsWith("Failed to load resource"))).toEqual([]);
});

test("resume page embeds the pdf viewer", async ({ page }) => {
  await page.goto(`${BASE}/resume?noloader=1`, { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1 })).toContainText("RESUME");
  const frame = page.frameLocator('iframe[title="Pratham Nahata resume"]');
  await expect(frame.locator("body")).toBeVisible({ timeout: 10000 });
  await expect(page.getByRole("link", { name: /DOWNLOAD PDF/ })).toBeVisible();
  expect(ERRORS.filter((e) => !e.includes("favicon") && !e.startsWith("Failed to load resource"))).toEqual([]);
});

test("dark mode toggles and persists", async ({ page }) => {
  await page.goto(`${BASE}/?noloader=1`, { waitUntil: "networkidle" });
  const toggle = page.getByRole("button", { name: /Switch to dark mode/ }).first();
  await toggle.click();
  const hasDark = await page.evaluate(() => document.documentElement.classList.contains("dark"));
  expect(hasDark).toBe(true);
  const stored = await page.evaluate(() => localStorage.getItem("theme"));
  expect(stored).toBe("dark");
  await page.reload({ waitUntil: "networkidle" });
  const persists = await page.evaluate(() => document.documentElement.classList.contains("dark"));
  expect(persists).toBe(true);
  await page.getByRole("button", { name: /Switch to light mode/ }).first().click();
  const backToLight = await page.evaluate(() => !document.documentElement.classList.contains("dark"));
  expect(backToLight).toBe(true);
  expect(ERRORS.filter((e) => !e.includes("favicon") && !e.startsWith("Failed to load resource"))).toEqual([]);
});
