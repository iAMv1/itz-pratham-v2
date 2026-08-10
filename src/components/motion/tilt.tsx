"use client";

import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";

export function Tilt({
  children,
  max = 6,
  className,
}: {
  children: ReactNode;
  max?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || reduced) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -max;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * max;
    el.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el || reduced) return;
    el.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      ref={ref}
      data-tilt
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={className}
      style={{ transformStyle: "preserve-3d", willChange: "transform", transition: "transform 0.2s ease-out" }}
    >
      {children}
    </div>
  );
}
