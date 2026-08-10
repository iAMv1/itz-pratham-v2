# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\smoke.spec.ts >> client-side navigation works (nav links + CTAs)
- Location: e2e\smoke.spec.ts:23:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('a').filter({ hasText: 'MIND PULSE PRO' }).first()

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - heading "This page couldn’t load" [level=1] [ref=e6]
  - paragraph [ref=e7]: Reload to try again, or go back.
  - generic [ref=e8]:
    - button "Reload" [ref=e10] [cursor=pointer]
    - button "Back" [ref=e11] [cursor=pointer]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | const BASE = process.env.BASE_URL ?? "http://127.0.0.1:3100";
  4  | 
  5  | const ERRORS: string[] = [];
  6  | 
  7  | test.beforeEach(async ({ page }) => {
  8  |   ERRORS.length = 0;
  9  |   page.on("console", (msg) => {
  10 |     if (msg.type() === "error") ERRORS.push(msg.text().slice(0, 400));
  11 |   });
  12 |   page.on("pageerror", (err) => ERRORS.push(`PAGEERROR: ${err.message.slice(0, 400)}`));
  13 | });
  14 | 
  15 | test("all routes load directly", async ({ page }) => {
  16 |   for (const route of ["/", "/work", "/about", "/process", "/contact", "/progress", "/work/mindpulse-pro"]) {
  17 |     const res = await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
  18 |     expect(res?.status(), `route ${route}`).toBe(200);
  19 |   }
  20 |   expect(ERRORS.filter((e) => !e.includes("favicon"))).toEqual([]);
  21 | });
  22 | 
  23 | test("client-side navigation works (nav links + CTAs)", async ({ page }) => {
  24 |   await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  25 |   await page.getByRole("link", { name: "About", exact: true }).click();
  26 |   await expect(page).toHaveURL(/\/about/);
  27 |   await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  28 | 
  29 |   await page.getByRole("link", { name: "Work", exact: true }).click();
  30 |   await expect(page).toHaveURL(/\/work$/);
  31 |   await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  32 | 
> 33 |   await page.locator("a", { hasText: "MIND PULSE PRO" }).first().click();
     |                                                                  ^ Error: locator.click: Test timeout of 30000ms exceeded.
  34 |   await expect(page).toHaveURL(/\/work\/mindpulse-pro/);
  35 |   await expect(page.getByRole("heading", { level: 1 })).toContainText("MIND PULSE PRO");
  36 | 
  37 |   await page.getByRole("link", { name: "Process", exact: true }).click();
  38 |   await expect(page).toHaveURL(/\/process/);
  39 | 
  40 |   await page.getByRole("link", { name: "Contact", exact: true }).click();
  41 |   await expect(page).toHaveURL(/\/contact/);
  42 | 
  43 |   await page.getByRole("link", { name: "Pratham Nahata — home" }).click();
  44 |   await expect(page).toHaveURL(/\/$/);
  45 | 
  46 |   expect(ERRORS.filter((e) => !e.includes("favicon"))).toEqual([]);
  47 | });
  48 | 
  49 | test("resume link and 404 work", async ({ page }) => {
  50 |   await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  51 |   const resume = page.getByRole("link", { name: /Resume/ }).first();
  52 |   await expect(resume).toHaveAttribute("href", /\.pdf$/);
  53 | 
  54 |   const res = await page.goto(`${BASE}/definitely-not-a-page`, { waitUntil: "networkidle" });
  55 |   expect(res?.status()).toBe(404);
  56 |   await expect(page.getByText("THE PEEPAL TREE IS EMPTY")).toBeVisible();
  57 | });
  58 | 
  59 | test("mobile viewport renders hero content", async ({ page }) => {
  60 |   await page.setViewportSize({ width: 375, height: 812 });
  61 |   await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  62 |   await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  63 |   expect(ERRORS.filter((e) => !e.includes("favicon"))).toEqual([]);
  64 | });
  65 | 
```