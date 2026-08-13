"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

let preloaderShown = false; // session flag: the curtain plays once, not on every client navigation

/**
 * The 4th-wall loader — storyboard:
 * 1. a tiny builder walks in from the bottom-left corner (off-screen = behind the 4th wall)
 * 2. he crosses to the centre, where a jharokha door stands
 * 3. the camera zooms in on him (stage scales up)
 * 4. he opens the door — light floods out
 * 5. the whole curtain lifts on the light
 */
export function Preloader() {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const figRef = useRef<HTMLDivElement>(null);
  const figInnerRef = useRef<HTMLDivElement>(null);
  const doorRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const tweensRef = useRef<{ kill: () => void }[]>([]);

  /** Visible "Enter portfolio" path — the show is skippable. */
  const skip = () => {
    tweensRef.current.forEach((t) => t.kill());
    tweensRef.current = [];
    preloaderShown = true;
    document.body.classList.add("hero-ready");
    requestAnimationFrame(() => setDone(true));
  };

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

    const tweens = tweensRef.current;
    void import("gsap").then(({ default: gsap }) => {
      if (!root.isConnected) return;
      const counter = { v: 0 };

      // 1. count up (top-right meta)
      tweens.push(
        gsap.to(counter, {
          v: 100,
          duration: 0.9,
          ease: "power2.inOut",
          onUpdate: () => {
            if (pctRef.current) pctRef.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
          },
        })
      );
      if (fillRef.current) {
        tweens.push(gsap.fromTo(fillRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: "power2.inOut" }));
      }

      // 2. the builder walks in from the corner and crosses to the door
      const bob = figInnerRef.current
        ? gsap.to(figInnerRef.current, { y: -6, duration: 0.28, ease: "sine.inOut", yoyo: true, repeat: -1 })
        : null;
      if (bob) tweens.push(bob);
      if (figRef.current) {
        tweens.push(
          gsap.fromTo(
            figRef.current,
            { x: "-38vw", y: "14vh" },
            { x: "0vw", y: "0vh", duration: 1.5, ease: "power2.inOut", delay: 0.25 }
          )
        );
      }

      // 3. camera zooms in on him at the door
      if (stageRef.current) {
        tweens.push(
          gsap.to(stageRef.current, {
            scale: 2.4,
            transformOrigin: "50% 58%",
            duration: 1.1,
            ease: "power3.inOut",
            delay: 1.5,
          })
        );
      }

      // 4. he opens the door — light floods out
      if (doorRef.current) {
        tweens.push(
          gsap.to(doorRef.current, {
            rotateY: -108,
            transformOrigin: "left center",
            duration: 0.5,
            ease: "power2.inOut",
            delay: 2.35,
          })
        );
      }
      if (beamRef.current) {
        tweens.push(
          gsap.fromTo(
            beamRef.current,
            { opacity: 0, scaleX: 0.2 },
            { opacity: 1, scaleX: 1, duration: 0.45, ease: "power2.out", delay: 2.4 }
          )
        );
      }

      // 5. the curtain lifts on the light
      tweens.push(
        gsap.to(root, {
          yPercent: -100,
          duration: 0.75,
          ease: "power4.inOut",
          delay: 2.85,
          onComplete: finish,
        })
      );
    });

    const failsafe = window.setTimeout(finish, 7000);
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
      className="preloader fixed inset-0 z-[300] overflow-clip bg-ink-2 text-ink [perspective:1200px]"
    >
      {/* stage (camera subject) */}
      <div ref={stageRef} className="absolute inset-0 will-change-transform">
        {/* backdrop: dusk gradient + vignette */}
        <div className="loader-sky absolute inset-0" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(0,0,0,0.5)_100%)]" />

        {/* light beam behind the door */}
        <div
          ref={beamRef}
          aria-hidden
          className="beam pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[130%] w-[46vw] -translate-x-1/2 -translate-y-1/2 opacity-0"
        />

        {/* the door */}
        <div ref={doorRef} className="absolute left-1/2 top-[56%] z-[2] w-[min(240px,44vw)] -translate-x-1/2 -translate-y-1/2 will-change-transform">
          <DoorSvg />
        </div>

        {/* the builder — walks in from the corner */}
        <div
          ref={figRef}
          className="absolute bottom-[12%] left-1/2 z-[3] w-[72px] -translate-x-1/2 will-change-transform"
        >
          <div ref={figInnerRef} className="will-change-transform">
            <BuilderSvg />
          </div>
        </div>
      </div>

      {/* frame + meta (outside the zoom) */}
      <div aria-hidden className="pointer-events-none absolute inset-4 border border-paper/15" />
      <span aria-hidden className="absolute left-4 top-4 size-3 border-l-2 border-t-2 border-saffron" />
      <span aria-hidden className="absolute right-4 top-4 size-3 border-r-2 border-t-2 border-saffron" />
      <span aria-hidden className="absolute bottom-4 left-4 size-3 border-b-2 border-l-2 border-saffron" />
      <span aria-hidden className="absolute bottom-4 right-4 size-3 border-b-2 border-r-2 border-saffron" />

      <p className="absolute left-7 top-6 font-mono text-[10px] tracking-[0.22em] text-paper/45">
        बीकानेर → दिल्ली → दुनिया
      </p>
      <div className="absolute right-7 top-6 flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] text-paper/45">
        <span className="h-1.5 w-24 overflow-hidden border border-paper/30 bg-paper/10">
          <span ref={fillRef} className="block h-full origin-left scale-x-0 bg-mint" />
        </span>
        <span className="tabular-nums text-mint">
          <span ref={pctRef}>000</span>%
        </span>
      </div>
      <p className="absolute bottom-6 left-7 font-mono text-[10px] tracking-[0.22em] text-paper/45">
        FULL-STACK × ML SYSTEMS
      </p>
      <p className="absolute bottom-6 right-7 font-mono text-[10px] tracking-[0.22em] text-paper/45">
        LOADING THE GOODS…
      </p>
      <button
        type="button"
        onClick={skip}
        aria-label="Skip intro and enter the portfolio"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 border-2 border-paper/40 px-4 py-1.5 font-mono text-[10px] tracking-[0.2em] text-paper/70 transition-colors duration-200 hover:border-paper hover:text-paper"
      >
        ENTER →
      </button>
    </div>
  );
}

/** The jharokha door — arch frame + single opening panel with jali lattice. */
function DoorSvg() {
  return (
    <svg viewBox="0 0 200 260" className="w-full">
      <circle cx="100" cy="44" r="14" fill="var(--saffron)" />
      <path
        d="M20 258 V142 C20 62 60 20 100 20 C140 20 180 62 180 142 V258"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        d="M28 258 V144 C28 70 64 32 100 32 C136 32 172 70 172 144 V258"
        fill="none"
        stroke="var(--cobalt)"
        strokeWidth="1.5"
        opacity="0.6"
      />
      <path
        d="M22 258 V146 C22 66 60 24 100 24 C140 24 178 66 178 146 V258 Z"
        fill="var(--paper-2)"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path d="M48 258 V180 M72 258 V150 M96 258 V116 M120 258 V150 M144 258 V180" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <circle cx="100" cy="150" r="6" fill="var(--saffron)" />
    </svg>
  );
}

/** The builder — a tiny vector person carrying a laptop, jaali-jacket stripe. */
function BuilderSvg() {
  return (
    <svg viewBox="0 0 72 96" className="w-full">
      <circle cx="36" cy="20" r="11" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M12 88 C14 58 24 46 36 46 C48 46 58 58 60 88 Z" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M26 68 H46" stroke="var(--saffron)" strokeWidth="3" />
      <path d="M24 80 H48" stroke="var(--saffron)" strokeWidth="2" />
      <rect x="28" y="52" width="16" height="11" rx="1" fill="none" stroke="var(--cobalt)" strokeWidth="2.5" />
      <path d="M22 68 L50 68" stroke="var(--cobalt)" strokeWidth="2.5" />
      <path d="M36 6 V2 M36 2 L39 5 L36 8 L33 5 Z" fill="var(--saffron)" />
    </svg>
  );
}
