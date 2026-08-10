const { chromium } = require("@playwright/test");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on("console", (m) => { if (m.type() === "error") console.log("CONSOLE-ERR:", m.text().slice(0, 300)); });
  page.on("pageerror", (e) => {
    console.log("PAGE-ERR:", String(e).slice(0, 300));
    console.log("STACK:", String(e.stack || "").slice(0, 2000));
  });
  await page.goto("http://127.0.0.1:3100/?noloader=1", { waitUntil: "networkidle" });
  console.log("1) home loaded");
  await page.getByRole("link", { name: "About", exact: true }).click();
  await page.waitForURL(/about/);
  console.log("2) about loaded");
  await page.waitForTimeout(4000);
  await page.getByRole("link", { name: "Work", exact: true }).click();
  await page.waitForTimeout(5000);
  console.log("3) after work click — url:", page.url());
  await browser.close();
})();
