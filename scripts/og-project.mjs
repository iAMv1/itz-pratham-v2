// Generates a branded 1200×630 OG image per project → public/assets/og/<slug>.png
// Usage: node scripts/og-project.mjs
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { chromium } from "@playwright/test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, "src", "content", "projects");
const outDir = path.join(root, "public", "assets", "og");
fs.mkdirSync(outDir, { recursive: true });

const projects = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith(".mdx"))
  .map((f) => matter(fs.readFileSync(path.join(dir, f), "utf8")).data)
  .sort((a, b) => String(a.index).localeCompare(String(b.index)));

const browser = await chromium.launch();
for (const p of projects) {
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { width:1200px; height:630px; overflow:hidden; background:#F4EFE6; font-family:Georgia,'Times New Roman',serif; }
    .frame { position:absolute; inset:0; border:18px solid #051024; }
    .index { position:absolute; left:64px; top:52px; font-family:'Courier New',monospace; font-size:22px; letter-spacing:.2em; color:${p.accent}; font-weight:700; }
    .title { position:absolute; left:60px; top:150px; font-size:96px; font-weight:700; letter-spacing:.01em; color:#051024; text-transform:uppercase; line-height:.92; max-width:760px; }
    .blurb { position:absolute; left:64px; top:340px; width:680px; font-size:26px; line-height:1.45; color:#4a5266; }
    .metrics { position:absolute; left:64px; top:470px; font-family:'Courier New',monospace; font-size:19px; letter-spacing:.14em; color:${p.accent}; font-weight:700; }
    .bar { position:absolute; left:64px; top:420px; width:200px; height:10px; background:${p.accent}; }
    .name { position:absolute; left:64px; bottom:56px; font-family:'Courier New',monospace; font-size:20px; letter-spacing:.18em; color:#051024; }
    .arch { position:absolute; right:64px; top:70px; width:300px; height:460px; }
    .arch svg { width:100%; height:100%; }
    .dot { position:absolute; border-radius:50%; }
  </style></head><body>
    <div class="frame"></div>
    <div class="index">CASE ${p.index} · ${p.year}</div>
    <div class="title">${String(p.title).replace(/</g, "&lt;")}</div>
    <div class="bar"></div>
    <div class="blurb">${String(p.blurb).replace(/</g, "&lt;")}</div>
    <div class="metrics">${String(p.metrics).replace(/</g, "&lt;")}</div>
    <div class="name">ITZPRATHAM.IN — ${String(p.slug).toUpperCase()}</div>
    <div class="arch"><svg viewBox="0 0 320 400" preserveAspectRatio="none">
      <path d="M24 400 V190 C24 92 68 44 160 44 C252 44 296 92 296 190 V400" fill="none" stroke="#051024" stroke-width="6"/>
      <circle cx="160" cy="30" r="10" fill="${p.accent}"/>
    </svg></div>
  </body></html>`;
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.setContent(html, { waitUntil: "networkidle" });
  await page.waitForTimeout(200);
  await page.screenshot({ path: path.join(outDir, `${p.slug}.png`), type: "png" });
  await page.close();
  console.log("og:", p.slug);
}
await browser.close();
console.log("done → public/assets/og/");
