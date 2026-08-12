"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "top", num: "00", label: "TOP" },
  { id: "featured", num: "01", label: "WORK" },
  { id: "talk", num: "02", label: "TALK" },
] as const;

export function Rail() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-42% 0px -42% 0px" }
    );
    for (const s of SECTIONS) {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  return (
    <nav
      aria-label="Sections"
      className="fixed left-3.5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3.5 border border-ink bg-paper/70 p-2.5 backdrop-blur-md lg:flex"
    >
      {SECTIONS.map((s) => {
        const isActive = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`group flex items-center gap-2.5 transition-colors duration-150 ${
              isActive ? "text-ink" : "text-ink/60 hover:text-ink"
            }`}
          >
            <span className={`font-mono text-[11px] tracking-wider ${isActive ? "text-saffron" : ""}`}>
              {s.num}
            </span>
            <span
              className={`overflow-hidden whitespace-nowrap font-mono text-[10px] tracking-[0.14em] transition-all duration-200 ${
                isActive ? "max-w-24 opacity-100" : "max-w-0 group-hover:max-w-24 opacity-0 group-hover:opacity-80"
              }`}
            >
              {s.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
