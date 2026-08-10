"use client";

import { motion, useReducedMotion } from "motion/react";

/** MaskTitle — each line rises from behind an overflow mask, letters staggered (Awwwards-style). */
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
        <span key={li} className="block overflow-hidden">
          {line.split("").map((ch, ci) => (
            <motion.span
              key={ci}
              aria-hidden
              className={`inline-block ${accent.includes(li) ? "text-cobalt" : ""}`}
              initial={reduced ? false : { y: "115%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: 0.05 + li * 0.12 + ci * 0.014, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {ch === " " ? "\u00A0" : ch}
            </motion.span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
