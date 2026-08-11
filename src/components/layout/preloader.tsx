"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

let preloaderShown = false; // session flag: the curtain plays once, not on every client navigation

export function Preloader() {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const finish = () => {
      preloaderShown = true;
      document.body.classList.add("hero-ready");
      requestAnimationFrame(() => setDone(true)); // React removes the node cleanly
    };

    const noloader = new URLSearchParams(window.location.search).has("noloader");
    if (preloaderShown || reduced || noloader) {
      finish();
      return;
    }
    const root = rootRef.current;
    if (!root) {
      finish();
      return;
    }

    // gsap is the only heavy dep here — code-split it out of the shell bundle.
    // If the import fails (offline etc.), the failsafe curtain lift still runs.
    const tweens: { kill: () => void }[] = [];
    void import("gsap").then(({ default: gsap }) => {
      if (!root.isConnected) return;
      const counter = { v: 0 };
      tweens.push(
        gsap.to(counter, {
          v: 100,
          duration: 0.7,
          ease: "power2.inOut",
          onUpdate: () => {
            if (pctRef.current) {
              pctRef.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
            }
          },
        })
      );
      if (fillRef.current) {
        tweens.push(gsap.fromTo(fillRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: "power2.inOut" }));
      }
      tweens.push(
        gsap.to(root, {
          yPercent: -100,
          duration: 0.55,
          ease: "power4.inOut",
          delay: 0.75,
          onComplete: finish,
        })
      );
    });

    const failsafe = window.setTimeout(finish, 4500);
    return () => {
      window.clearTimeout(failsafe);
      tweens.forEach((t) => t.kill());
    };
  }, [reduced]);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center gap-4 bg-ink-2 text-paper"
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
