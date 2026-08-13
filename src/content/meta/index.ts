import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Meta content repository — build log + test matrix data live in src/content/meta/*.mdx.
 * Same contract as projects/site: content is data, the UI is a container.
 */

const META_DIR = path.join(process.cwd(), "src", "content", "meta");

export type ProgressEntry = { piece: string; wave: string; status: string; note: string };
export type TestingSuite = { name: string; flows: string[] };

function load<T>(file: string): T {
  const raw = fs.readFileSync(path.join(META_DIR, file), "utf8");
  return matter(raw).data as T;
}

let memo: Record<string, unknown> | null = null;
export function invalidateMetaCache(): void {
  memo = null;
}

function metaData(): Record<string, unknown> {
  if (!memo) {
    memo = {
      progress: load<{ items: ProgressEntry[] }>("progress.mdx").items,
      testing: load<{ suites: TestingSuite[] }>("testing.mdx").suites,
    };
  }
  return memo;
}

export const progressEntries = () => metaData().progress as ProgressEntry[];
export const testingSuites = () => metaData().testing as TestingSuite[];
