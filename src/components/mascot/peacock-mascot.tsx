"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/**
 * PeacockMascot — neck-pivot head tracks cursor (clamped ±15°), pupils saccade
 * within eye bounds, spring-lerped. Decorative; pointer-fine + no reduced motion.
 */
export function PeacockMascot({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  const headRef = useRef<SVGGElement>(null);
  const pupilL = useRef<SVGCircleElement>(null);
  const pupilR = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const head = headRef.current;
    if (!head || reduced) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      const r = head.getBoundingClientRect();
      target.x = Math.max(-1, Math.min(1, (e.clientX - r.left) / r.width * 2 - 1));
      target.y = Math.max(-1, Math.min(1, (e.clientY - r.top) / r.height * 2 - 1));
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      cur.x += (target.x - cur.x) * 0.08;
      cur.y += (target.y - cur.y) * 0.08;
      const rot = Math.max(-15, Math.min(15, cur.x * 15));
      head.setAttribute("transform", `rotate(${rot} 40 52)`);
      const px = cur.x * 1.8;
      const py = cur.y * 1.4;
      pupilL.current?.setAttribute("cx", String(36 + px));
      pupilL.current?.setAttribute("cy", String(45 + py));
      pupilR.current?.setAttribute("cx", String(46 + px));
      pupilR.current?.setAttribute("cy", String(45 + py));
    };
    loop();
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <svg viewBox="0 0 80 80" aria-hidden className={className}>
      <g fill="none" stroke="#051024" strokeWidth="2" strokeLinecap="round">
        <path d="M40 70 C32 66 30 58 32 50 C26 48 24 42 28 38 C20 36 18 30 24 26 C18 22 20 14 28 14 C30 8 40 4 48 8 C56 4 64 8 62 16 C68 18 70 26 64 30 C66 34 62 40 56 40 C58 46 52 52 48 52 C46 58 44 66 40 70 Z" fill="#1D5B9E" />
      </g>
      <circle cx="40" cy="36" r="1.8" fill="#F58E20" />
      <circle cx="34" cy="30" r="1.5" fill="#F58E20" />
      <circle cx="46" cy="30" r="1.5" fill="#F58E20" />
      <g ref={headRef}>
        <g>
          <circle cx="40" cy="44" r="10" fill="#F4EFE6" stroke="#051024" strokeWidth="2" />
          <circle ref={pupilL} cx="36" cy="45" r="1.8" fill="#051024" />
          <circle ref={pupilR} cx="46" cy="45" r="1.8" fill="#051024" />
          <path d="M38 50 Q40 52 42 50" fill="none" stroke="#051024" strokeWidth="1.4" />
        </g>
      </g>
    </svg>
  );
}
