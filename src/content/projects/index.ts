import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { renderMarkdown } from "@/lib/markdown";

/**
 * The content repository — every project is ONE .mdx file in src/content/projects/.
 * Drop a file → it auto-renders in the work index, case pages, sitemap, JSON-LD and APIs.
 * No code changes. The UI is a container; the content is data.
 */
export type ArchitectureLayer = { title: string; nodes: string[]; via?: string };
export type Receipt = { label: string; href: string };

export type Project = {
  slug: string;
  index: string;
  year: string;
  title: string;
  role: string;
  blurb: string;
  outcome: string;
  status: string;
  limitations: string;
  disclaimer?: string;
  challenge: string;
  approach: string;
  hard: string;
  shipped: string;
  impact: string[];
  stack: string[];
  flow: string[];
  architecture: ArchitectureLayer[];
  href: string;
  art: string;
  screenshot?: string;
  accent: string;
  metrics: string;
  live?: string;
  readme?: string;
  dive: { q: string; a: string }[];
  evidence: { claim: string; method: string }[];
  counterfactuals: { label: string; answer: string }[];
  receipts?: Receipt[];
  bodyHtml: string;
};

const PROJECTS_DIR = path.join(process.cwd(), "src", "content", "projects");

/** Loud schema validation — a broken or mistyped project file fails the build with the exact field. */
function validateProject(raw: Record<string, unknown>, file: string): void {
  const fail = (field: string, detail = "") => {
    throw new Error(`content/projects/${file}: invalid or missing "${field}" ${detail}`);
  };
  for (const f of ["slug", "index", "year", "title", "role", "blurb", "challenge", "approach", "hard", "shipped", "href", "art", "accent", "metrics", "outcome", "status", "limitations"] as const) {
    if (typeof raw[f] !== "string" || (raw[f] as string).length === 0) fail(f);
  }
  for (const f of ["impact", "stack", "flow"] as const) {
    if (!Array.isArray(raw[f]) || (raw[f] as unknown[]).length < 3) fail(f, "(need ≥3 items)");
  }
  for (const f of ["dive", "evidence", "counterfactuals"] as const) {
    if (!Array.isArray(raw[f]) || (raw[f] as unknown[]).length === 0) fail(f, "(cannot be empty)");
  }
  if (typeof raw.href !== "string" || !raw.href.startsWith("https://")) fail("href", "(must be https://)");
  if (raw.architecture && !Array.isArray(raw.architecture)) fail("architecture", "(must be a list of layers)");
  if (raw.receipts && !Array.isArray(raw.receipts)) fail("receipts", "(must be a list of {label, href})");
}

function loadFile(file: string): Project {
  const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  validateProject(data as Record<string, unknown>, file);
  return {
    slug: String(data.slug),
    index: String(data.index),
    year: String(data.year),
    title: String(data.title),
    role: String(data.role),
    blurb: String(data.blurb),
    outcome: String(data.outcome ?? ""),
    status: String(data.status ?? ""),
    limitations: String(data.limitations ?? ""),
    disclaimer: data.disclaimer ? String(data.disclaimer) : undefined,
    challenge: String(data.challenge),
    approach: String(data.approach),
    hard: String(data.hard),
    shipped: String(data.shipped),
    impact: data.impact as string[],
    stack: data.stack as string[],
    flow: data.flow as string[],
    architecture: (data.architecture ?? []) as ArchitectureLayer[],
    href: String(data.href),
    art: String(data.art),
    screenshot: data.screenshot ? String(data.screenshot) : undefined,
    accent: String(data.accent),
    metrics: String(data.metrics),
    live: data.live ? String(data.live) : undefined,
    readme: data.readme ? String(data.readme) : undefined,
    dive: data.dive as { q: string; a: string }[],
    evidence: data.evidence as { claim: string; method: string }[],
    counterfactuals: data.counterfactuals as { label: string; answer: string }[],
    receipts: (data.receipts ?? []) as Receipt[],
    bodyHtml: renderMarkdown(content),
  };
}

// module-level memo — parsed once per build process, never re-read per request
let memo: Project[] | null = null;
let memoMap: Map<string, Project> | null = null;

export function invalidateContentCache(): void {
  memo = null;
  memoMap = null;
}

export function allProjects(): Project[] {
  if (!memo) {
    const files = fs
      .readdirSync(PROJECTS_DIR)
      .filter((f) => f.endsWith(".mdx"))
      .sort();
    memo = files.map(loadFile).sort((a, b) => a.index.localeCompare(b.index));
    memoMap = new Map(memo.map((p) => [p.slug, p]));
  }
  return memo;
}

export function getProject(slug: string): Project | undefined {
  allProjects();
  return memoMap?.get(slug);
}
