"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/** Cursor spotlight — a soft radial glow that follows the pointer (pointer-fine only). */
export function Spotlight({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let x = -400, y = -400, tx = -400, ty = -400, raf = 0;
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const loop = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(245,142,32,0.09), transparent 55%)`;
      raf = 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return <div ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 z-0 ${className}`} />;
}
