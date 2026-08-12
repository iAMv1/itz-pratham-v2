import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { renderMarkdown } from "@/lib/markdown";

/**
 * The content repository — every project is ONE .mdx file in src/content/projects/.
 * Drop a file → it auto-renders in the work index, case pages, sitemap, JSON-LD and APIs.
 * No code changes. The UI is a container; the content is data.
 */
export type Project = {
  slug: string;
  index: string;
  year: string;
  title: string;
  role: string;
  blurb: string;
  challenge: string;
  approach: string;
  hard: string;
  shipped: string;
  impact: string[];
  stack: string[];
  flow: string[];
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
  bodyHtml: string;
};

const PROJECTS_DIR = path.join(process.cwd(), "src", "content", "projects");

function loadFile(file: string): Project {
  const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  return {
    slug: String(data.slug ?? ""),
    index: String(data.index ?? "99"),
    year: String(data.year ?? ""),
    title: String(data.title ?? ""),
    role: String(data.role ?? ""),
    blurb: String(data.blurb ?? ""),
    challenge: String(data.challenge ?? ""),
    approach: String(data.approach ?? ""),
    hard: String(data.hard ?? ""),
    shipped: String(data.shipped ?? ""),
    impact: (data.impact ?? []) as string[],
    stack: (data.stack ?? []) as string[],
    flow: (data.flow ?? []) as string[],
    href: String(data.href ?? ""),
    art: String(data.art ?? ""),
    screenshot: data.screenshot ? String(data.screenshot) : undefined,
    accent: String(data.accent ?? "#1D5B9E"),
    metrics: String(data.metrics ?? ""),
    live: data.live ? String(data.live) : undefined,
    readme: data.readme ? String(data.readme) : undefined,
    dive: (data.dive ?? []) as { q: string; a: string }[],
    evidence: (data.evidence ?? []) as { claim: string; method: string }[],
    counterfactuals: (data.counterfactuals ?? []) as { label: string; answer: string }[],
    bodyHtml: renderMarkdown(content),
  };
}

export function allProjects(): Project[] {
  const files = fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .sort();
  return files.map(loadFile).sort((a, b) => a.index.localeCompare(b.index));
}

export function getProject(slug: string): Project | undefined {
  const file = path.join(PROJECTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return undefined;
  return loadFile(`${slug}.mdx`);
}

export const caseStudies = allProjects();
