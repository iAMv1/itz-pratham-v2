"use client";

import useSWR from "swr";

export type Repo = { name: string; language: string | null; pushed_at: string; stars: number };
export type RepoState = { repos: Repo[]; source: "live" | "cache" | "fallback" };

const CACHE_KEY = "ns-repos";
const TTL = 5 * 60 * 1000;

const FALLBACK: Repo[] = [
  { name: "itz-pratham-v2", language: "TypeScript", pushed_at: "", stars: 0 },
  { name: "iAMv1", language: "Python", pushed_at: "", stars: 0 },
  { name: "portfolio", language: "TypeScript", pushed_at: "", stars: 0 },
  { name: "opencode-pet", language: "Python", pushed_at: "", stars: 0 },
  { name: "omnisectester", language: "JavaScript", pushed_at: "", stars: 0 },
];

function readCache(): { at: number; repos: Repo[] } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as { at: number; repos: Repo[] };
  } catch {
    return null;
  }
}

const fetcher = async (url: string): Promise<RepoState> => {
  const cached = readCache();
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(String(res.status));
    const data: { name: string; language: string | null; pushed_at: string; stargazers_count: number }[] = await res.json();
    const repos = data.map((r) => ({ name: r.name, language: r.language, pushed_at: r.pushed_at, stars: r.stargazers_count }));
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), repos }));
    } catch {
      /* storage unavailable */
    }
    return { repos, source: "live" };
  } catch {
    // live fetch failed — serve the newest cached copy (any age) before falling back
    if (cached) return { repos: cached.repos, source: "cache" };
    return { repos: FALLBACK, source: "fallback" };
  }
};

export function useLatestRepos(): RepoState {
  const { data } = useSWR<RepoState>(
    "https://api.github.com/users/iAMv1/repos?sort=pushed&per_page=5",
    fetcher,
    { fallbackData: { repos: FALLBACK, source: "fallback" }, revalidateOnFocus: false, dedupingInterval: TTL }
  );
  return data ?? { repos: FALLBACK, source: "fallback" };
}

export const langColor: Record<string, string> = {
  JavaScript: "#F9CE34",
  TypeScript: "#1D5B9E",
  Python: "#8DE254",
  "Jupyter Notebook": "#FF3333",
  HTML: "#FF3333",
};
