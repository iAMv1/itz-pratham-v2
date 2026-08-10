"use client";

import useSWR from "swr";

export type Repo = { name: string; language: string | null; pushed_at: string };

const CACHE_KEY = "ns-repos";
const TTL = 60 * 60 * 1000;

const FALLBACK: Repo[] = [
  { name: "omnisectester", language: "JavaScript", pushed_at: "" },
  { name: "mindpulse", language: "Python", pushed_at: "" },
  { name: "unified-dta-project", language: "Python", pushed_at: "" },
  { name: "agent-os", language: "Python", pushed_at: "" },
];

const fetcher = async (url: string): Promise<Repo[]> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("github");
  const data: { name: string; language: string | null; pushed_at: string }[] = await res.json();
  const slim = data.map((r) => ({ name: r.name, language: r.language, pushed_at: r.pushed_at }));
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), repos: slim }));
  } catch {
    /* storage unavailable */
  }
  return slim;
};

function readCache(): Repo[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { at: number; repos: Repo[] };
    if (Date.now() - parsed.at > TTL) return null;
    return parsed.repos;
  } catch {
    return null;
  }
}

export function useLatestRepos() {
  const { data } = useSWR<Repo[]>(
    "https://api.github.com/users/iAMv1/repos?sort=updated&per_page=5",
    fetcher,
    { fallbackData: readCache() ?? FALLBACK, revalidateOnFocus: false, dedupingInterval: TTL }
  );
  return data ?? FALLBACK;
}

export const langColor: Record<string, string> = {
  JavaScript: "#F9CE34",
  TypeScript: "#1D5B9E",
  Python: "#8DE254",
  "Jupyter Notebook": "#FF3333",
  HTML: "#FF3333",
};
