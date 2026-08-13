// Render the P-monogram favicon to PNGs and wrap them in an .ico (legacy browsers).
import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const svgPath = path.join(root, "public", "assets", "favicon.svg");

function wrapIco(pngSizes) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngSizes.length, 4);
  let offset = 6 + 16 * pngSizes.length;
  const entries = [];
  const chunks = [];
  for (const { size, png } of pngSizes) {
    const entry = Buffer.alloc(16);
    entry[0] = size === 256 ? 0 : size;
    entry[1] = size === 256 ? 0 : size;
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    chunks.push(png);
    offset += png.length;
  }
  return Buffer.concat([header, ...entries, ...chunks]);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 256, height: 256 } });
await page.goto(`file://${svgPath}`);
await page.waitForTimeout(300);
const pngs = [];
for (const size of [16, 32, 48, 256]) {
  await page.setViewportSize({ width: size, height: size });
  await page.waitForTimeout(150);
  pngs.push({ size, png: await page.screenshot({ type: "png" }) });
}
await browser.close();

fs.writeFileSync(path.join(root, "public", "favicon.ico"), wrapIco(pngs));
console.log("favicon.ico written:", fs.statSync(path.join(root, "public", "favicon.ico")).size, "bytes");
