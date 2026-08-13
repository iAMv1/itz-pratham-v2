import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Site content repository — the non-project data lives in src/content/site/*.mdx.
 * Same contract as projects: content is data, the UI is a container.
 */

const SITE_DIR = path.join(process.cwd(), "src", "content", "site");

function load<T>(file: string): T {
  const raw = fs.readFileSync(path.join(SITE_DIR, file), "utf8");
  return matter(raw).data as T;
}

export type About = {
  facts: { key: string; value: string }[];
  stats: { value: number; prefix?: string; suffix?: string; label: string; headline?: string }[];
  background: { years: string; role: string; co: string; desc: string; tags: string; status: string }[];
  offClock: { title: string; sub: string; books: { title: string; take: string }[]; setup: { name: string; detail: string }[] };
};

export type Process = {
  title: string;
  lines: { kind: string; text: string; num?: string; cursor?: boolean }[];
  steps: { num: string; title: string; sub: string; cmd: string; out: string; artifacts: string[]; proof?: { label: string; href: string } }[];
  stats: { value: string; label: string }[];
  tools: string[];
};

export type Timeline = { years: { year: string; stage: string; building: string; learning: string; identity: string }[] };
export type Unresolved = { items: { title: string; understand: string; dont: string; trying: string; reading: string; next: string }[] };
export type Metro = { title: string; lines: { id: string; name: string; color: string; stations: string[] }[]; hub: string };

let memo: Record<string, unknown> | null = null;
export function invalidateSiteCache(): void {
  memo = null;
}

export function siteData(): Record<string, unknown> {
  if (!memo) {
    memo = {
      about: load<About>("about.mdx"),
      process: load<Process>("process.mdx"),
      timeline: load<Timeline>("timeline.mdx"),
      unresolved: load<Unresolved>("unresolved.mdx"),
      metro: load<Metro>("metro.mdx"),
    };
  }
  return memo;
}

export const about = () => siteData().about as About;
export const processContent = () => siteData().process as Process;
export const timeline = () => siteData().timeline as Timeline;
export const unresolved = () => siteData().unresolved as Unresolved;
export const metro = () => siteData().metro as Metro;
