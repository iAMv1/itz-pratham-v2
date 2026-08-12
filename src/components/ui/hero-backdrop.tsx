"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { DustField } from "@/components/canvas/fields";

/**
 * HeroBackdrop — "Bikaner dusk" stage:
 * layered sky gradient → saffron sun → colossal jharokha arch (parallax) →
 * star/dust field → skyline. Theme-aware: terracotta dusk in light, cobalt night in dark.
 */
export function HeroBackdrop() {
  const { scrollY } = useScroll();
  const archY = useTransform(scrollY, [0, 800], [0, 150]);
  const sunY = useTransform(scrollY, [0, 800], [0, 70]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="hero-sky absolute inset-0" />
      <motion.div
        style={{ y: sunY }}
        className="hero-sun absolute right-[14%] top-[16%] size-[clamp(150px,24vw,280px)] rounded-full"
      />
      <div className="absolute inset-x-0 bottom-[10%] h-[2px] bg-saffron/60" />
      <motion.svg
        style={{ y: archY }}
        viewBox="0 0 320 400"
        preserveAspectRatio="xMidYMax meet"
        className="absolute -right-[5%] top-[6%] h-[96vh] w-auto text-ink opacity-60"
      >
        <path d="M24 400 V190 C24 92 68 44 160 44 C252 44 296 92 296 190 V400" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <path d="M46 400 V195 C46 116 86 70 160 70 C234 70 274 116 274 195 V400" fill="none" stroke="var(--cobalt)" strokeWidth="1.5" opacity="0.55" />
        <circle cx="160" cy="28" r="9" fill="var(--saffron)" />
      </motion.svg>
      <DustField className="absolute inset-0 h-full w-full" />
    </div>
  );
}
