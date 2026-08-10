"use client";

import { useEffect, useRef } from "react";

type DrawFn = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void;

/**
 * Canvas lifecycle: DPR cap, resize, IntersectionObserver pause, visibility pause.
 * Reduced motion -> never starts.
 */
export function useCanvasField(draw: DrawFn) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let W = 0,
      H = 0,
      raf = 0,
      running = true;

    const resize = () => {
      W = cv.offsetWidth;
      H = cv.offsetHeight;
      cv.width = Math.max(1, W * dpr);
      cv.height = Math.max(1, H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const loop = () => {
      cancelAnimationFrame(raf);
      if (!running) return;
      raf = requestAnimationFrame(loop);
      draw(ctx, W, H, performance.now());
    };

    resize();
    loop();
    window.addEventListener("resize", resize);

    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver((entries) => {
        running = entries[0]?.isIntersecting && !document.hidden;
        if (running) {
          cancelAnimationFrame(raf);
          loop();
        }
      });
      io.observe(cv);
    }
    const onVis = () => {
      running = !document.hidden;
      if (running) {
        cancelAnimationFrame(raf);
        loop();
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
      io?.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [draw]);

  return ref;
}

/** Pointer position relative to a canvas, driven by a shared window listener. */
export function usePointer() {
  const ptr = useRef({ x: -9999, y: -9999 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      ptr.current.x = e.clientX;
      ptr.current.y = e.clientY;
    };
    const onLeave = () => {
      ptr.current.x = -9999;
      ptr.current.y = -9999;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);
  return ptr;
}
