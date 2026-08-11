"use client";

import { useEffect, useState } from "react";

type Cell = { date: string; count: number; level: number };
type ApiResp = { total: Record<string, number>; contributions: Cell[] };

const LEVELS = ["#E7DFCB", "#C9D9A6", "#8DE254", "#5CB83C", "#2E7D32"];

/** The year in commits — GitHub contribution grid, rendered in the site palette. */
export function ContributionGraph({ username = "iAMv1" }: { username?: string }) {
  const [weeks, setWeeks] = useState<Cell[][] | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let alive = true;
    const ctl = new AbortController();
    const timer = window.setTimeout(() => ctl.abort(), 8000);
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, { signal: ctl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: ApiResp) => {
        if (!alive) return;
        const cs = d.contributions ?? [];
        const w: Cell[][] = [];
        for (let i = 0; i < cs.length; i += 7) w.push(cs.slice(i, i + 7));
        setWeeks(w);
        setTotal(d.total?.lastYear ?? d.total?.total ?? null);
      })
      .catch(() => {
        if (alive) setError(true);
      })
      .finally(() => window.clearTimeout(timer));
    return () => {
      alive = false;
      ctl.abort();
    };
  }, [username]);

  if (error || !weeks) return null;

  return (
    <div className="border-2 border-ink bg-paper-2 p-[clamp(16px,2.5vw,28px)] shadow-hard">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="font-display text-2xl font-semibold uppercase">
          THE YEAR <span className="text-cobalt">IN COMMITS</span>
        </p>
        {total !== null && (
          <p className="font-mono text-[12px] tracking-widest text-saffron-deep">
            {total.toLocaleString("en-IN")} CONTRIBUTIONS THIS YEAR
          </p>
        )}
      </div>
      <div className="mt-4 overflow-x-auto pb-1">
        <div className="flex w-max gap-[3px]">
          {weeks.map((wk, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {Array.from({ length: 7 }, (_, di) => {
                const cell = wk[di];
                if (!cell) return <span key={di} className="size-[9px] rounded-[2px] bg-transparent" />;
                return (
                  <span
                    key={di}
                    title={`${cell.date} — ${cell.count} contribution${cell.count === 1 ? "" : "s"}`}
                    className="size-[9px] rounded-[2px]"
                    style={{ background: LEVELS[Math.min(cell.level, 4) ?? 0] }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 font-mono text-[10px] tracking-widest text-muted-foreground">
        <span>LESS</span>
        {LEVELS.map((c) => (
          <span key={c} className="size-[9px] rounded-[2px]" style={{ background: c }} />
        ))}
        <span>MORE</span>
        <span className="ml-auto text-ink/50">LIVE FROM GITHUB · {username}</span>
      </div>
    </div>
  );
}
