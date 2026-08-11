"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Annotate — Popover API annotation anchored to its trigger (second-layer context).
 * Click the trigger → contextual info attached to that exact thing. Click again / outside → gone.
 */
export function Annotate({
  children,
  title,
  body,
  className = "",
  align = "left",
}: {
  children: ReactNode;
  title?: string;
  body: ReactNode;
  className?: string;
  align?: "left" | "right" | "center";
}) {
  const reduced = useReducedMotion();
  const btnRef = useRef<HTMLButtonElement>(null);
  const popRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    const pop = popRef.current;
    if (!btn || !pop) return;
    const position = () => {
      const r = btn.getBoundingClientRect();
      const pw = pop.offsetWidth || 280;
      let left = align === "right" ? r.right - pw : r.left;
      if (align === "center") left = r.left + r.width / 2 - pw / 2;
      left = Math.max(8, Math.min(left, window.innerWidth - pw - 8));
      const top = r.bottom + 10;
      pop.style.left = `${left}px`;
      pop.style.top = `${top}px`;
    };
    const toggle = () => {
      if (pop.matches(":popover-open")) {
        pop.hidePopover();
      } else {
        position();
        pop.showPopover();
      }
    };
    btn.addEventListener("click", toggle);
    window.addEventListener("resize", () => {
      if (pop.matches(":popover-open")) position();
    });
    const onOuter = (e: MouseEvent) => {
      if (pop.matches(":popover-open") && !pop.contains(e.target as Node) && !btn.contains(e.target as Node)) {
        pop.hidePopover();
      }
    };
    document.addEventListener("click", onOuter);
    return () => {
      btn.removeEventListener("click", toggle);
      window.removeEventListener("resize", position);
      document.removeEventListener("click", onOuter);
    };
  }, [align]);

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        className={`cursor-help border-b-2 border-dashed border-saffron-deep/60 font-medium transition-colors hover:border-saffron ${className}`}
      >
        {children}
      </button>
      <div
        ref={popRef}
        popover="manual"
        className="fixed z-[140] w-[min(300px,80vw)] border-2 border-ink bg-paper-2 p-4 shadow-[6px_6px_0_0_var(--shadow-ink)]"
      >
        {title && <p className="mb-1.5 font-display text-lg font-semibold uppercase leading-none text-cobalt">{title}</p>}
        <div className={`text-[13.5px] leading-relaxed ${reduced ? "" : "pop-in"}`}>{body}</div>
      </div>
    </>
  );
}
