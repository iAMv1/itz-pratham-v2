"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { profile } from "@/data/profile";

const HOLD_MS = 2800;
const FADE_MS = 350;

/**
 * Auto-rotating role labels — JS-driven so exactly one label is ever visible.
 * Holds each label ~2.8s, then crossfades to the next. Respects
 * prefers-reduced-motion (falls back to the first label only).
 */
export function IdentityTicker() {
  const reduced = useReducedMotion();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reduced || profile.rota.length <= 1) return;
    const id = window.setInterval(() => {
      setIdx((p) => (p + 1) % profile.rota.length);
    }, HOLD_MS);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <span
      className="relative inline-flex items-baseline align-middle"
      style={{ width: "max-content" }}
      aria-live="polite"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: FADE_MS / 1000, ease: "easeOut" }}
          className="whitespace-nowrap"
        >
          {profile.rota[idx].toUpperCase()}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
