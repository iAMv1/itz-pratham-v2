"use client";

import { useEffect, useRef } from "react";
import { useCanvasField, usePointer } from "./use-canvas";

const small = () => window.matchMedia("(max-width: 768px)").matches;

/** Hero: drifting marigold dots + rose teardrops with mouse repel. */
export function HeroField({ className }: { className?: string }) {
  const ptr = usePointer();
  const ref = useCanvasField((ctx, W, H, t) => {
    const n = small() ? 26 : 44;
    ctx.clearRect(0, 0, W, H);
    const time = t * 0.0005;
    for (let i = 0; i < n; i++) {
      const seed = i * 12.9898;
      const sx = Math.sin(seed) * 0.5 + 0.5;
      const sy = Math.cos(seed * 1.7) * 0.5 + 0.5;
      const y = ((sy - time * (0.1 + (i % 5) * 0.02)) % 1 + 1) % 1;
      const x = (sx + Math.sin(y * 9 + seed) * 0.01) % 1;
      const px = x * W;
      const py = y * H;
      const dx = px - ptr.current.x;
      const dy = py - ptr.current.y;
      const d2 = dx * dx + dy * dy;
      let ox = 0,
        oy = 0;
      if (d2 < 100 * 100) {
        const d = Math.sqrt(d2) || 1;
        ox = (dx / d) * 2.2;
        oy = (dy / d) * 2.2;
      }
      const a = 0.22 + 0.18 * Math.sin(time * 2 + seed);
      const r = 1.5 + (i % 3);
      const rose = i % 3 === 0;
      ctx.fillStyle = rose ? `rgba(217,96,126,${a})` : `rgba(245,142,32,${a})`;
      ctx.beginPath();
      if (rose) ctx.ellipse(px + ox, py + oy, r * 2.2, r * 1.1, seed, 0, Math.PI * 2);
      else ctx.arc(px + ox, py + oy, r, 0, Math.PI * 2);
      ctx.fill();
    }
  });
  return <canvas ref={ref} aria-hidden className={className} />;
}

/** Vibe: drifting marigold dots + rose paisley teardrops, mouse repel. */
export function PaisleyField({ className }: { className?: string }) {
  const ptr = usePointer();
  const ref = useCanvasField((ctx, W, H, t) => {
    const n = small() ? 26 : 44;
    ctx.clearRect(0, 0, W, H);
    const time = t * 0.0005;
    for (let i = 0; i < n; i++) {
      const seed = i * 12.9898;
      const sy = ((Math.cos(seed * 1.7) * 0.5 + 0.5) - time * (0.1 + (i % 5) * 0.02)) % 1;
      const y = ((sy % 1) + 1) % 1;
      const x = ((Math.sin(seed) * 0.5 + 0.5 + Math.sin(y * 9 + seed) * 0.01) % 1 + 1) % 1;
      const px = x * W;
      const py = y * H;
      const dx = px - ptr.current.x;
      const dy = py - ptr.current.y;
      const d2 = dx * dx + dy * dy;
      let ox = 0,
        oy = 0;
      if (d2 < 100 * 100) {
        const d = Math.sqrt(d2) || 1;
        ox = (dx / d) * 2.2;
        oy = (dy / d) * 2.2;
      }
      const a = 0.18 + 0.15 * Math.sin(time * 2 + seed);
      const r = 1.5 + (i % 3);
      const rose = i % 3 === 0;
      ctx.fillStyle = rose ? `rgba(217,96,126,${a})` : `rgba(245,142,32,${a})`;
      ctx.beginPath();
      if (rose) ctx.ellipse(px + ox, py + oy, r * 2.2, r * 1.1, seed, 0, Math.PI * 2);
      else ctx.arc(px + ox, py + oy, r, 0, Math.PI * 2);
      ctx.fill();
    }
  });
  return <canvas ref={ref} aria-hidden className={className} />;
}

/** Process: breathing hexagonal jali lattice, saffron glow near cursor. */
/** Jali lattice — hexagonal jaali lattice. tone: dark (on ink) or light (on paper). */
export function JaliField({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const ptr = usePointer();
  const ref = useCanvasField((ctx, W, H, t) => {
    const R = small() ? 34 : 40;
    ctx.clearRect(0, 0, W, H);
    const time = t * 0.0006;
    const dx = R * Math.sqrt(3);
    const dy = R * 1.5;
    for (let row = -1; row * dy < H + R; row++) {
      const off = (row % 2) * (dx / 2);
      for (let col = -1; col * dx < W + R; col++) {
        const cx = col * dx + off;
        const cy = row * dy;
        if (cx < -R || cx > W + R || cy < -R || cy > H + R) continue;
        const d = Math.hypot(cx - ptr.current.x, cy - ptr.current.y);
        const breathe = 0.55 + 0.45 * Math.sin(time * 2 + (cx + cy) * 0.05);
        const glow = Math.max(0, 1 - d / 220);
        const a = 0.05 + breathe * 0.05 + glow * 0.4;
        ctx.strokeStyle =
          glow > 0.05
            ? `rgba(245,142,32,${a})`
            : tone === "light"
              ? `rgba(5,16,36,${Math.min(0.16, a * 2)})`
              : `rgba(244,239,230,${a})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let k = 0; k < 6; k++) {
          const ang = (Math.PI / 3) * k + Math.PI / 6;
          const x1 = cx + Math.cos(ang) * R;
          const y1 = cy + Math.sin(ang) * R;
          if (k === 0) ctx.moveTo(x1, y1);
          else ctx.lineTo(x1, y1);
        }
        ctx.closePath();
        ctx.stroke();
      }
    }
  });
  return <canvas ref={ref} aria-hidden className={className} />;
}

/** Wins: 8-fold rangoli mandala, slow spin, blooms near cursor. */
export function RangoliField({ className }: { className?: string }) {
  const ptr = usePointer();
  const ref = useCanvasField((ctx, W, H, t) => {
    ctx.clearRect(0, 0, W, H);
    const time = t * 0.0004;
    const cx = W / 2;
    const cy = H / 2;
    const d = Math.hypot(ptr.current.x - cx, ptr.current.y - cy);
    const bloom = Math.max(0, 1 - d / 260);
    const R = Math.min(W, H) * 0.32 * (1 + bloom * 0.25);
    const rot = time + bloom * 0.6;
    ctx.strokeStyle = "rgba(5,16,36,0.10)";
    ctx.lineWidth = 1.2;
    for (let k = 0; k < 8; k++) {
      const ang = rot + (Math.PI / 4) * k;
      const x1 = cx + Math.cos(ang) * R * 0.35;
      const y1 = cy + Math.sin(ang) * R * 0.35;
      const x2 = cx + Math.cos(ang) * R;
      const y2 = cy + Math.sin(ang) * R;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo(
        cx + Math.cos(ang + 0.5) * R * 0.7,
        cy + Math.sin(ang + 0.5) * R * 0.7,
        x2,
        y2
      );
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x2, y2, 3 + bloom * 2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(245,142,32,0.35)";
      ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(cx, cy, R * 0.6, 0, Math.PI * 2);
    ctx.stroke();
  });
  return <canvas ref={ref} aria-hidden className={className} />;
}

/** Contact: mehndi cursor trail — dots + rose accents that fade. */
export function MehndiField({ className }: { className?: string }) {
  const trailRef = useRef<TrailPoint[]>([]);
  const ref = useCanvasField((ctx, W, H) => {
    const trail = trailRef.current;
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < trail.length; i++) {
      const p = trail[i];
      p.a *= 0.965;
      const wig = Math.sin(i * 0.9) * 3;
      ctx.fillStyle = `rgba(5,16,36,${p.a * 0.5})`;
      ctx.beginPath();
      ctx.arc(p.x + wig, p.y, 1.6, 0, Math.PI * 2);
      ctx.fill();
      if (i % 6 === 0) {
        ctx.fillStyle = `rgba(217,96,126,${p.a * 0.5})`;
        ctx.beginPath();
        ctx.arc(p.x - wig * 2, p.y + 2, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    if (trail.length && trail[trail.length - 1].a < 0.03) trail.length = 0;
  });

  const last = useRef({ x: -9999, y: -9999 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const cv = ref.current;
      if (!cv) return;
      const r = cv.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (x < 0 || y < 0 || x > r.width || y > r.height) return;
      if (Math.hypot(x - last.current.x, y - last.current.y) < 12) return;
      last.current = { x, y };
      const t = trailRef.current;
      t.push({ x, y, a: 1 });
      if (t.length > 70) t.shift();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [ref]);

  return <canvas ref={ref} aria-hidden className={className} />;
}

type TrailPoint = { x: number; y: number; a: number };
