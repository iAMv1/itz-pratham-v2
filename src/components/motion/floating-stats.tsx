"use client";

import { motion, useReducedMotion } from "motion/react";

/** FloatingStats — drifting mono chips over project art ("inference feels"). Decorative, pointer-events none. */
export function FloatingStats({ items }: { items: string[] }) {
  const reduced = useReducedMotion();
  if (reduced) return null;
  const positions = [
    { right: "8%", top: "12%", rotate: -3 },
    { left: "6%", top: "34%", rotate: 2 },
    { right: "12%", bottom: "10%", rotate: -1.5 },
    { left: "10%", bottom: "6%", rotate: 1.5 },
  ];
  return (
    <>
      {items.slice(0, 4).map((item, i) => {
        const pos = positions[i] ?? positions[0];
        return (
          <motion.span
            key={item}
            aria-hidden
            className="pointer-events-none absolute z-10 hidden border border-ink bg-paper-2/95 px-2 py-1 font-mono text-[9.5px] tracking-wider text-saffron-deep shadow-[2px_2px_0_0_#051024] md:block"
            style={pos}
            animate={{ y: [0, -7, 0], rotate: [pos.rotate, pos.rotate + 1.5, pos.rotate] }}
            transition={{ duration: 4 + i * 0.9, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
          >
            {item}
          </motion.span>
        );
      })}
    </>
  );
}
