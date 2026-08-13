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

test("all routes load directly", async ({ page }) => {
  for (const route of ["/", "/work", "/about", "/process", "/contact", "/progress", "/resume", "/work/mindpulse-pro", "/work/itz-pratham-v2"]) {
    const res = await page.goto(`${BASE}${route}`, { waitUntil: "load" });
    expect(res?.status(), `route ${route}`).toBe(200);
  }
  expect(ERRORS.filter((e) => !e.includes("favicon") && !e.startsWith("Failed to load resource"))).toEqual([]);
});

test("client-side navigation works (nav links + CTAs)", async ({ page }) => {
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.getByRole("link", { name: "About", exact: true }).click();
  await expect(page).toHaveURL(/\/about/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  await page.getByRole("link", { name: "Work", exact: true }).click();
  await expect(page).toHaveURL(/\/work$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  await page.locator("a", { hasText: "MIND PULSE PRO" }).first().click();
  await expect(page).toHaveURL(/\/work\/mindpulse-pro/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("MIND PULSE PRO");

  await page.getByRole("link", { name: "Resume", exact: true }).click();
  await expect(page).toHaveURL(/\/resume/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  await page.getByRole("link", { name: "Contact", exact: true }).click();
  await expect(page).toHaveURL(/\/contact/);

  await page.getByRole("link", { name: "Pratham Nahata — home" }).click();
  await expect(page).toHaveURL(/\/$/);

  expect(ERRORS.filter((e) => !e.includes("favicon") && !e.startsWith("Failed to load resource"))).toEqual([]);
});

test("resume link and 404 work", async ({ page }) => {
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.getByRole("link", { name: /Resume/ }).first().click();
  await expect(page).toHaveURL(/\/resume/);
  await expect(page.getByRole("link", { name: /DOWNLOAD PDF/ })).toHaveAttribute("href", /\.pdf$/);

  const res = await page.goto(`${BASE}/definitely-not-a-page`, { waitUntil: "networkidle" });
  expect(res?.status()).toBe(404);
  await expect(page.getByText("THE PEEPAL TREE IS EMPTY")).toBeVisible();
});

test("mobile menu opens and navigates", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  const menu = page.getByRole("button", { name: "Open menu" });
  await expect(menu).toBeVisible();
  await menu.click();
  await expect(page.getByRole("link", { name: /About/ })).toBeVisible();
  await page.getByRole("link", { name: /About/ }).click();
  await expect(page).toHaveURL(/\/about/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(ERRORS.filter((e) => !e.includes("favicon") && !e.startsWith("Failed to load resource"))).toEqual([]);
});

test("mobile viewport renders hero content", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(ERRORS.filter((e) => !e.includes("favicon") && !e.startsWith("Failed to load resource"))).toEqual([]);
});
