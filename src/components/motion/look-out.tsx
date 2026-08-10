"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";

/** LookOut — art shifts with cursor like looking out a jharokha window (pointer-fine only). */
export function LookOut({ children, className, strength = 10 }: { children: ReactNode; className?: string; strength?: number }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rect = useRef({ left: 0, top: 0, width: 1, height: 1 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      rect.current = { left: r.left, top: r.top, width: r.width || 1, height: r.height || 1 };
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || reduced) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const r = rect.current;
    const dx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const dy = ((e.clientY - r.top) / r.height - 0.5) * 2;
    el.style.transform = `translate(${(-dx * strength).toFixed(1)}px, ${(-dy * strength).toFixed(1)}px)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el || reduced) return;
    el.style.transform = "translate(0,0)";
  };

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={`transition-transform duration-200 ease-out ${className ?? ""}`}>
      {children}
    </div>
  );
}
