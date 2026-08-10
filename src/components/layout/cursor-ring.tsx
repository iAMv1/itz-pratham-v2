"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

export function CursorRing() {
  const reduced = useReducedMotion();
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring || reduced) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let x = -100, y = -100, tx = -100, ty = -100, raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      ring.classList.add("is-on");
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      ring.style.transform = `translate(${x - 18}px, ${y - 18}px)`;
      if (Math.abs(tx - x) > 0.1 || Math.abs(ty - y) > 0.1) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    };
    const onEnter = (e: Event) => {
      if ((e.target as HTMLElement).closest("a, button, [data-tilt]")) {
        ring.classList.add("is-hover");
      }
    };
    const onLeave = (e: Event) => {
      if ((e.target as HTMLElement).closest("a, button, [data-tilt]")) {
        ring.classList.remove("is-hover");
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onEnter);
    document.addEventListener("pointerout", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onEnter);
      document.removeEventListener("pointerout", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div
      ref={ringRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[120] hidden size-9 rounded-full border-[1.5px] border-cobalt opacity-0 transition-[width,height,border-color,opacity] duration-200 ease-out [&.is-on]:opacity-100 [&.is-hover]:size-14 [&.is-hover]:border-red [@media(hover:hover)_and_(pointer:fine)]:block"
    />
  );
}
