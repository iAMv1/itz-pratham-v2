"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

const lineVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.014, delayChildren: 0.05 } },
};

const letterVariants: Variants = {
  hidden: { y: "115%" },
  visible: { y: "0%", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

/** MaskTitle — each line rises from behind an overflow mask, letters staggered (Awwwards-style).
 *  The IntersectionObserver targets LINE-sized containers (same mechanics as Reveal) —
 *  per-letter observers inside overflow-hidden never fired reliably. */
export function MaskTitle({
  lines,
  accent = [],
  className = "",
  as: Tag = "h2",
}: {
  lines: string[];
  accent?: number[];
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const reduced = useReducedMotion();
  return (
    <Tag className={className}>
      {lines.map((line, li) => (
        <motion.span
          key={li}
          className="block overflow-hidden"
          variants={lineVariants}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-8% 0px" }}
        >
          {line.split("").map((ch, ci) => (
            <motion.span
              key={ci}
              aria-hidden
              variants={letterVariants}
              className={`inline-block ${accent.includes(li) ? "text-cobalt" : ""}`}
              transition={{ delay: li * 0.12 }}
            >
              {ch === " " ? "\u00A0" : ch}
            </motion.span>
          ))}
        </motion.span>
      ))}
    </Tag>
  );
}
