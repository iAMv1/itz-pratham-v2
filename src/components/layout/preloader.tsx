"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "motion/react";

export function Preloader() {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const noloader = new URLSearchParams(window.location.search).has("noloader");
    const kill = () => root.remove();
    const reveal = () => document.body.classList.add("hero-ready");

    if (reduced || noloader) {
      kill();
      reveal();
      return;
    }

    if (typeof gsap === "undefined") {
      kill();
      reveal();
      return;
    }

    const counter = { v: 0 };
    gsap.to(counter, {
      v: 100,
      duration: 1.0,
      ease: "power2.inOut",
      onUpdate: () => {
        if (pctRef.current) {
          pctRef.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
        }
      },
    });
    if (fillRef.current) {
      gsap.fromTo(fillRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.0, ease: "power2.inOut" });
    }
    gsap.to(root, {
      yPercent: -100,
      duration: 0.8,
      ease: "power4.inOut",
      delay: 1.1,
      onComplete: () => {
        kill();
        reveal();
      },
    });
    const failsafe = window.setTimeout(() => {
      kill();
      reveal();
    }, 4500);
    return () => window.clearTimeout(failsafe);
  }, [reduced]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="fixed inset-0 z-[300] hidden flex-col items-center justify-center gap-4 bg-ink-2 text-paper [html.js_&]:flex"
    >
      <p className="font-display text-[clamp(2.4rem,7vw,4.5rem)] font-semibold uppercase tracking-wider">
        Pratham Nahata<span className="text-saffron">▮</span>
      </p>
      <p className="font-mono text-[clamp(1.6rem,4vw,2.8rem)] text-saffron">
        <span ref={pctRef}>000</span>%
      </p>
      <div className="h-2 w-[min(360px,60vw)] border border-paper/30 bg-paper/10">
        <span ref={fillRef} className="block h-full origin-left scale-x-0 bg-cobalt" />
      </div>
      <p className="font-mono text-xs tracking-[0.22em] text-paper/55">LOADING THE VIBES…</p>
    </div>
  );
}
