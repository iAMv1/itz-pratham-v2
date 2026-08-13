import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const projDir = path.join(root, "src", "content", "projects");

const projects = fs
  .readdirSync(projDir)
  .filter((f) => f.endsWith(".mdx"))
  .map((f) => matter(fs.readFileSync(path.join(projDir, f), "utf8")))
  .sort((a, b) => String(a.data.index).localeCompare(String(b.data.index)));

const out = [];
out.push(`# Pratham Nahata — Full-Stack & ML Engineer (full archive)`);
out.push(``);
out.push(`This is the full-content version of llms.txt — every project write-up included.`);
out.push(``);
out.push(`## Who`);
out.push(`CS undergrad (B.Tech CSE, BVCOE Delhi; BSc Foundation Data Science, IIT Madras online) building full-stack + ML systems: real-time browser inference (ONNX), graph neural networks (ESM-2 + GIN), multi-agent AI, production web products (Next.js, FastAPI, Tauri). Bikaner-born, Delhi-built.`);
out.push(``);
out.push(`- Site: https://itzpratham.in/`);
out.push(`- Work: https://itzpratham.in/work`);
out.push(`- Resume: https://itzpratham.in/resume`);
out.push(`- GitHub: https://github.com/iAMv1`);
out.push(`- Contact: https://itzpratham.in/contact`);
out.push(`- Agent toolkit: https://itzpratham.in/api/agent?action=list`);
out.push(`- Full data: https://itzpratham.in/api/data`);
out.push(``);
out.push(`## Key facts`);
out.push(`- Grand Finalist, Smart India Hackathon 2024 (national, 492k+ participants)`);
out.push(`- Top 5 AlgoQuest (300+ teams)`);
out.push(`- Live GitHub activity feed with star counts (refresh: 5 min)`);
out.push(`- This portfolio is tested like a product: 21 Playwright flows, zero console errors. Matrix: https://itzpratham.in/testing`);
out.push(`- Built with Next.js 16, TypeScript, Tailwind 4, Motion/GSAP/Lenis. Dark/light mode via token inversion. Fully static SSG.`);
out.push(``);
for (const p of projects) {
  const d = p.data;
  out.push(`## ${d.title} (${d.year}) — ${d.role}`);
  out.push(`URL: https://itzpratham.in/work/${d.slug}`);
  out.push(`Blurb: ${d.blurb}`);
  out.push(`Problem: ${String(d.challenge).replace(/\s+/g, " ")}`);
  out.push(`Approach: ${String(d.approach).replace(/\s+/g, " ")}`);
  out.push(`Hard part: ${String(d.hard).replace(/\s+/g, " ")}`);
  out.push(`Shipped: ${String(d.shipped).replace(/\s+/g, " ")}`);
  out.push(`Stack: ${(d.stack ?? []).join(", ")}`);
  out.push(`Evidence:`);
  for (const e of d.evidence ?? []) out.push(`  - ${e.claim} — ${e.method}`);
  out.push(`Architecture layers: ${(d.architecture ?? []).map((l) => l.title).join(" → ")}`);
  out.push(``);
  out.push(`### Full story`);
  out.push(p.content.trim());
  out.push(``);
}
out.push(`## Contact`);
out.push(`Email: iam1nahata@gmail.com · GitHub: https://github.com/iAMv1 · LinkedIn: https://linkedin.com/in/iamprathamnahata`);

fs.writeFileSync(path.join(root, "public", "llms-full.txt"), out.join("\n"), "utf8");
console.log("llms-full.txt written:", out.length, "lines");
