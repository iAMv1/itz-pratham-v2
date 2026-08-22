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
  for (const route of ["/", "/work", "/about", "/process", "/contact", "/progress", "/resume", "/developers", "/privacy", "/work/mindpulse-pro", "/work/itz-pratham-v2"]) {
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

test("agent surface — 404 carries recovery links for crawlers", async ({ page }) => {
  const res = await page.goto(`${BASE}/some-path-that-does-not-exist`, { waitUntil: "domcontentloaded" });
  expect(res?.status()).toBe(404);
  const recovery = page.getByText("FOR AGENTS & CRAWLERS");
  await expect(recovery).toBeAttached();
  await expect(page.locator('a[href="/sitemap.xml"]')).toBeAttached();
  await expect(page.locator('a[href="/llms.txt"]')).toBeAttached();
  await expect(page.locator('a[href="/openapi.json"]')).toBeAttached();
});

test("agent surface — openapi.json is a complete typed spec", async ({ request }) => {
  const res = await request.get(`${BASE}/openapi.json`);
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toContain("application/json");
  const spec = await res.json();
  expect(spec.openapi).toMatch(/^3\./);
  expect(Object.keys(spec.paths)).toEqual(expect.arrayContaining(["/api/agent", "/api/data", "/api/markdown"]));
  expect(spec.paths["/api/agent"].get.operationId).toBe("agentToolkit");
});

test("agent surface — markdown content negotiation with Vary: Accept", async ({ request }) => {
  const res = await request.get(`${BASE}/about`, { headers: { Accept: "text/markdown" } });
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toContain("text/markdown");
  expect(res.headers()["vary"]).toContain("Accept");
  expect(await res.text()).toContain("# About — Pratham Nahata");

  // a case page negotiates too
  const proj = await request.get(`${BASE}/work/mindpulse-pro`, { headers: { Accept: "text/markdown" } });
  expect(proj.headers()["content-type"]).toContain("text/markdown");
  expect(await proj.text()).toContain("MIND PULSE PRO");

  // browsers still get HTML
  const html = await request.get(`${BASE}/about`, { headers: { Accept: "text/html" } });
  expect(html.headers()["content-type"]).toContain("text/html");
});

test("agent surface — unknown API paths return structured JSON errors", async ({ request }) => {
  const res = await request.get(`${BASE}/api/no-such-endpoint`);
  expect(res.status()).toBe(404);
  const body = await res.json();
  expect(body.ok).toBe(false);
  expect(body.code).toBe("not_found");
  expect(body.hint).toContain("/api/agent");

  const badAction = await request.get(`${BASE}/api/agent?action=bogus`);
  expect(badAction.status()).toBe(400);
  const err = await badAction.json();
  expect(err.ok).toBe(false);
  expect(err.code).toBe("unknown_action");
  expect(err.hint).toBeTruthy();
});

test("agent surface — trust pages render (privacy, developers)", async ({ page }) => {
  const privacy = await page.goto(`${BASE}/privacy`, { waitUntil: "load" });
  expect(privacy?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("NOTHING");
  const text = await page.textContent("main");
  expect(text!.length).toBeGreaterThan(500);

  const dev = await page.goto(`${BASE}/developers`, { waitUntil: "load" });
  expect(dev?.status()).toBe(200);
  await expect(page.getByRole("heading", { name: /AGENT TOOLKIT/i })).toBeVisible();
  await expect(page.locator('a[href="/openapi.json"]')).toBeVisible();
});
