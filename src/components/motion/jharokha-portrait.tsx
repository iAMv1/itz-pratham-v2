"use client";

import { motion, useMotionValue, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";

const ArchOverlay = () => (
  <svg
    viewBox="0 0 320 400"
    preserveAspectRatio="none"
    aria-hidden
    className="pointer-events-none absolute inset-0 h-full w-full opacity-75"
  >
    <path d="M24 400 V190 C24 92 68 44 160 44 C252 44 296 92 296 190 V400" fill="none" stroke="#F4EFE6" strokeWidth="3" />
    <path d="M46 400 V195 C46 116 86 70 160 70 C234 70 274 116 274 195 V400" fill="none" stroke="#F4EFE6" strokeWidth="1.5" opacity="0.55" />
    <path d="M160 44 V10 M160 10 L170 22 L160 30 L150 22 Z" fill="none" stroke="#F4EFE6" strokeWidth="2" />
    <circle cx="160" cy="22" r="3" fill="#F58E20" />
  </svg>
);

const RotatingRing = () => (
  <svg
    viewBox="0 0 400 400"
    aria-hidden
    className="portrait-ring pointer-events-none absolute inset-[-12%] -z-[1] h-[124%] w-[124%] opacity-[0.35]"
  >
    {/* dashed orbit circle */}
    <circle cx="200" cy="200" r="186" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 10" />
    {/* slow rotating arc segments with small diamond ticks */}
    <path d="M200 14 A186 186 0 0 1 336 58" fill="none" stroke="currentColor" strokeWidth="2.4" />
    <path d="M200 386 A186 186 0 0 1 64 342" fill="none" stroke="currentColor" strokeWidth="2.4" />
    {[0, 60, 120, 180, 240, 300].map((deg) => (
      <g key={deg} transform={`rotate(${deg} 200 200)`}>
        <rect x="196.5" y="8" width="7" height="7" transform="rotate(45 200 11.5)" fill="currentColor" />
      </g>
    ))}
  </svg>
);

/**
 * Interactive jharokha portrait.
 * - pointer parallax tilt (~5deg) with depth offset on the photo
 * - idle breathing float + slow-rotating outline ring
 * - saffron glow sweep on hover
 * - fully inert under prefers-reduced-motion
 */
export function JharokhaPortrait() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || reduced) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const r = el.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const tiltX = useTransform(my, [-1, 1], [5, -5]);
  const tiltY = useTransform(mx, [-1, 1], [-5, 5]);
  const photoX = useTransform(mx, [-1, 1], [-10, 10]);
  const photoY = useTransform(my, [-1, 1], [-10, 10]);
  const glowX = useTransform(mx, [-1, 1], ["0%", "100%"]);

  const style: React.CSSProperties = reduced
    ? {}
    : {
        transformStyle: "preserve-3d",
        perspective: 900,
        transform: "rotateX(calc(var(--px, 0) * 1deg)) rotateY(calc(var(--py, 0) * 1deg))",
      };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="portrait-breathe group relative aspect-[4/5] overflow-visible"
      style={reduced ? undefined : { perspective: 900 }}
    >
      {/* hard shadow plate */}
      <motion.div
        style={{ x: useTransform(mx, [-1, 1], [14, 6]), y: useTransform(my, [-1, 1], [14, 6]) }}
        className="absolute inset-0 translate-x-2.5 translate-y-2.5 border-2 border-ink bg-cobalt transition-[background-color] duration-300 ease-out group-hover:bg-saffron"
        aria-hidden
      />
      {/* frame with parallax tilt */}
      <motion.div
        style={{ rotateX: tiltX, rotateY: tiltY }}
        className="relative h-full w-full overflow-hidden border-2 border-ink bg-ink-2 transition-transform duration-300 ease-out group-hover:border-saffron"
      >
        {/* rotating outline ring behind the photo */}
        <RotatingRing />
        <motion.img
          src="/assets/art-pratham.jpg"
          alt=""
          width={960}
          height={1200}
          fetchPriority="high"
          style={{ x: reduced ? 0 : photoX, y: reduced ? 0 : photoY }}
          className="absolute inset-0 h-full w-full scale-[1.06] object-cover [clip-path:path('M0_0_L320_0_L320_400_L24_400_C24_310_60_250_160_250_C260_250_296_310_296_400_L0_400_Z')]"
        />
        {/* hover glow sweep tracked by pointer */}
        <motion.div
          aria-hidden
          style={{ left: reduced ? "0%" : glowX }}
          className="portrait-sweep absolute inset-y-0 -z-[1] w-[70%] pointer-events-none"
        />
        <ArchOverlay />
        <span className="absolute bottom-2 left-2 border border-paper/30 bg-ink-2/80 px-2.5 py-1 font-mono text-[10px] tracking-[0.22em] text-paper/70">
          JHAROKHA // 01
        </span>
      </motion.div>
    </div>
  );
}
