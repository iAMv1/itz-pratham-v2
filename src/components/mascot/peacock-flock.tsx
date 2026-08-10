"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/**
 * PeacockFlock — SVG-symbol grid spelling 404 (PRD: peacock = Rajasthan's national bird).
 * Units get flow rotation (neighbor-direction) + breathing oscillation; static on reduced motion.
 */

const DIGITS: Record<string, string[]> = {
  "4": ["101", "101", "111", "001", "001"],
  "0": ["111", "101", "101", "101", "111"],
};

const CELL = 44;
const GAP = 6;

const PEA_SYMBOL_ID = "peacock-unit";

function PeacockSymbol() {
  return (
    <svg aria-hidden className="absolute h-0 w-0">
      <defs>
        <symbol id={PEA_SYMBOL_ID} viewBox="0 0 40 40" width="40" height="40">
          <g fill="none" stroke="#051024" strokeWidth="1.6" strokeLinecap="round">
            <path d="M20 14 C13 2 5 4 6 12 C2 11 2 19 8 19" />
            <path d="M20 14 C20 2 27 4 26 12 C31 11 31 19 25 19" />
            <path d="M20 14 C16 4 10 6 11 13" />
          </g>
          <circle cx="8" cy="15" r="2" fill="#F58E20" stroke="none" />
          <circle cx="25" cy="15" r="2" fill="#F58E20" stroke="none" />
          <circle cx="12" cy="9" r="1.6" fill="#1D5B9E" stroke="none" />
          <circle cx="28" cy="9" r="1.6" fill="#1D5B9E" stroke="none" />
          <circle cx="20" cy="27" r="7" fill="#1D5B9E" stroke="#051024" strokeWidth="1.6" />
          <circle cx="17.5" cy="26" r="1.4" fill="#051024" stroke="none" />
          <circle cx="22.5" cy="26" r="1.4" fill="#051024" stroke="none" />
          <path d="M18 30 Q20 32 22 30" fill="none" stroke="#051024" strokeWidth="1.2" />
          <g stroke="#051024" strokeWidth="1.4">
            <path d="M18 20 V14 M20 20 V12 M22 20 V14" />
          </g>
          <circle cx="18" cy="13" r="1.3" fill="#F58E20" stroke="none" />
          <circle cx="20" cy="11" r="1.3" fill="#F58E20" stroke="none" />
          <circle cx="22" cy="13" r="1.3" fill="#F58E20" stroke="none" />
        </symbol>
      </defs>
    </svg>
  );
}

export function PeacockFlock({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (reduced) return;
    const svg = ref.current;
    if (!svg) return;
    const uses = svg.querySelectorAll<SVGUseElement>("use[data-flock]");
    if (!uses.length) return;
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const t = performance.now() * 0.001;
      uses.forEach((u) => {
        const cx = parseFloat(u.dataset.cx ?? "0");
        const cy = parseFloat(u.dataset.cy ?? "0");
        const rot = parseFloat(u.dataset.rot ?? "0");
        const d = parseFloat(u.dataset.delay ?? "0");
        const breath = Math.sin(t * 1.4 + d) * 3;
        u.setAttribute(
          "transform",
          `translate(${cx} ${cy}) rotate(${rot + breath}) translate(-20 -20)`
        );
      });
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const cells: { cx: number; cy: number; rot: number; delay: number }[] = [];
  const text = "404";
  let col = 0;
  for (const ch of text) {
    const rows = DIGITS[ch] ?? [];
    const w = rows[0]?.length ?? 0;
    for (let r = 0; r < rows.length; r++) {
      for (let c = 0; c < rows[r].length; c++) {
        if (rows[r][c] !== "1") continue;
        const flow = (c < w / 2 ? -1 : 1) * (14 + (r % 3) * 6) + ((i * 7) % 5 - 2) * 4;
        cells.push({
          cx: (col + c) * (CELL + GAP) + CELL / 2,
          cy: r * (CELL + GAP) + CELL / 2,
          rot: flow,
          delay: (r * 5 + c * 2 + col) * 0.11,
        });
      }
    }
    col += w + 1;
  }

  const width = (col + 1) * (CELL + GAP);
  const height = 5 * (CELL + GAP);

  return (
    <div className={`overflow-hidden ${className}`}>
      <PeacockSymbol />
      <svg
        ref={ref}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="404 — a flock of peacocks"
        className="mx-auto block h-auto max-w-full"
      >
        {cells.map((c, i) => (
          <use
            key={i}
            href={`#${PEA_SYMBOL_ID}`}
            data-flock
            data-cx={c.cx}
            data-cy={c.cy}
            data-rot={c.rot}
            data-delay={c.delay}
            transform={`translate(${c.cx} ${c.cy}) rotate(${c.rot}) translate(-20 -20)`}
          />
        ))}
      </svg>
    </div>
  );
}
