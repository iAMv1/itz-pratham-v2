"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { DustField } from "@/components/canvas/fields";

/**
 * HeroBackdrop — "Bikaner dusk" stage:
 * layered sky gradient → saffron sun → star/dust field.
 * Theme-aware: terracotta dusk in light, cobalt night in dark.
 */
export function HeroBackdrop() {
  const { scrollY } = useScroll();
  const sunY = useTransform(scrollY, [0, 800], [0, 70]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="hero-sky absolute inset-0" />
      <motion.div
        style={{ y: sunY }}
        className="hero-sun absolute right-[14%] top-[16%] size-[clamp(150px,24vw,280px)] rounded-full"
      />
      <div className="absolute inset-x-0 bottom-[10%] h-[2px] bg-saffron/60" />
      <DustField className="absolute inset-0 h-full w-full" />
    </div>
  );
}
