"use client";

import { useEffect, useState } from "react";
import { useLatestRepos } from "@/data/github";

function rel(iso: string): string {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

/** Live "NOW BUILDING" status card — real GitHub activity + an IST clock. */
export function NowBuilding() {
  const { repos, source } = useLatestRepos();
  const [clock, setClock] = useState("");

  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      }).format(new Date());
    const raf = requestAnimationFrame(() => setClock(fmt()));
    const id = window.setInterval(() => setClock(fmt()), 1000);
    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(id);
    };
  }, []);

  const top = repos[0];
  if (!top) return null;

  return (
    <div className="border border-ink bg-paper-2 p-3 shadow-hard">
      <p className="flex items-center gap-2 font-mono text-[11.5px] tracking-widest">
        <span
          aria-hidden
          className={`size-[7px] rounded-full ${source === "live" ? "bg-mint shadow-[0_0_0_3px_rgba(141,226,84,0.25)]" : "bg-ink/25"}`}
        />
        {source === "live" ? "NOW BUILDING" : "BUILD LOG (CACHED)"}
      </p>
      <p className="mt-1 font-mono text-[11.5px] tracking-widest">
        ▸ {top.name} <span className="animate-[cursor-blink_1s_step-end_infinite] text-saffron">▊</span>
      </p>
      <p className="mt-1 font-mono text-[10px] tracking-widest text-muted-foreground">
        {top.pushed_at ? `UPDATED ${rel(top.pushed_at)}` : "RECENT PUSH"} · IST {clock}
      </p>
    </div>
  );
}
