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
    const visited = sessionStorage.getItem("itz-preloader-shown") === "1";
    const deepLink = window.location.pathname !== "/";
    if (preloaderShown || reduced || noloader || visited || deepLink) {
      finish();
      return;
    }
    sessionStorage.setItem("itz-preloader-shown", "1");
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
      className="preloader fixed inset-0 z-[300] overflow-clip bg-ink-2 text-paper"
    >
      {/* jali texture + vignette */}
      <div className="bg-jali-dark absolute inset-0 opacity-70" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.45)_100%)]" />
      {/* corner frame */}
      <div aria-hidden className="pointer-events-none absolute inset-4 border border-paper/15" />
      <span aria-hidden className="absolute left-4 top-4 size-3 border-l-2 border-t-2 border-saffron" />
      <span aria-hidden className="absolute right-4 top-4 size-3 border-r-2 border-t-2 border-saffron" />
      <span aria-hidden className="absolute bottom-4 left-4 size-3 border-b-2 border-l-2 border-saffron" />
      <span aria-hidden className="absolute bottom-4 right-4 size-3 border-b-2 border-r-2 border-saffron" />

      {/* top meta */}
      <p className="absolute left-7 top-6 font-mono text-[10px] tracking-[0.22em] text-paper/45">
        बीकानेर → दिल्ली → दुनिया
      </p>
      <p className="absolute right-7 top-6 font-mono text-[10px] tracking-[0.22em] text-paper/45">
        PORTFOLIO V2 · EST. 2023
      </p>

      {/* center */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
        <p className="font-display text-[clamp(2.6rem,7vw,4.8rem)] font-semibold uppercase leading-none tracking-wide">
          PRATHAM <span className="text-saffron">NAHATA</span>
          <span aria-hidden className="ml-[0.05em] inline-block h-6 w-1.5 translate-y-[-0.1em] animate-[cursor-blink_0.9s_step-end_infinite] bg-saffron" />
        </p>
        <div className="h-2 w-[min(400px,64vw)] overflow-hidden border border-paper/30 bg-paper/10">
          <span ref={fillRef} className="block h-full origin-left scale-x-0 bg-mint shadow-[0_0_12px_rgba(141,226,84,0.6)]" />
        </div>
        <p className="font-mono text-[clamp(1.5rem,3.5vw,2.4rem)] tabular-nums text-mint">
          <span ref={pctRef}>000</span>%
        </p>
        <p className="font-mono text-[10px] tracking-[0.24em] text-paper/45">LOADING THE GOODS…</p>
      </div>

      {/* bottom meta */}
      <p className="absolute bottom-6 left-7 font-mono text-[10px] tracking-[0.22em] text-paper/45">
        FULL-STACK × ML SYSTEMS
      </p>
      <p className="absolute bottom-6 right-7 font-mono text-[10px] tracking-[0.22em] text-paper/45">
        ♥ BIKANER
      </p>
    </div>
  );
}
