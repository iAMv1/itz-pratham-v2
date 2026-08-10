"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#built", label: "Experience" },
] as const;

export function Nav() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const top = window.scrollY;
      el.classList.toggle("nav-scrolled", top > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced]);

  return (
    <motion.header
      ref={ref}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-6 border-b-2 border-ink bg-paper/85 px-[clamp(16px,4vw,48px)] py-3.5 backdrop-blur-md transition-colors"
    >
      <a href="#top" className="flex items-center gap-3" aria-label="Pratham Nahata — back to top">
        <span className="grid h-9 w-9 place-items-center bg-cobalt font-display text-xl font-semibold text-paper">
          IP
        </span>
        <span className="hidden font-display text-[22px] font-semibold tracking-wide sm:block">
          Pratham&nbsp;Nahata
        </span>
      </a>
      <nav className="flex items-center gap-[clamp(16px,3vw,36px)]" aria-label="Primary">
        {NAV_LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="group relative py-1 font-mono text-[13px] tracking-widest"
          >
            {l.label}
            <span className="absolute inset-x-0 bottom-0 h-0.5 origin-right scale-x-0 bg-cobalt transition-transform duration-200 ease-out group-hover:origin-left group-hover:scale-x-100" />
          </a>
        ))}
        <a
          href="/assets/Pratham_Nahata_Resume_ATS.pdf"
          className="border border-ink px-3 py-1.5 font-mono text-[13px] tracking-widest transition-colors duration-200 hover:bg-ink hover:text-paper"
        >
          Resume&nbsp;↗
        </a>
      </nav>
      <p className="flex items-center gap-2 font-mono text-xs tracking-widest">
        <span className="size-2 rounded-full bg-mint shadow-[0_0_0_3px_rgba(141,226,84,0.25)]" />
        Open to work
      </p>
    </motion.header>
  );
}
