"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { profile } from "@/data/profile";
import { CountUp } from "@/components/motion/count-up";
import { Magnetic } from "@/components/motion/magnetic";
import { Spotlight } from "@/components/motion/spotlight";
import { Annotate } from "@/components/ui/annotate";
import { HeroAscii } from "@/components/ui/hero-ascii";
import { HeroBackdrop } from "@/components/ui/hero-backdrop";
import { IdentityTicker } from "@/components/ui/identity-ticker";
import { JharokhaPortrait } from "@/components/motion/jharokha-portrait";
import { NowBuilding } from "@/components/ui/now-building";

const ROTA_EGG = 900;

const STAT_ICONS: Record<string, string> = {
  "SIH 2024 PARTICIPANTS": "▣",
  "ALGOQUEST · 300+ TEAMS": "◈",
  "ONNX BROWSER INFERENCE": "◐",
  "SHIPPED SYSTEMS": "◮",
};

export function Hero() {
  const reduced = useReducedMotion();
  const [eggIdx, setEggIdx] = useState<number | null>(null);

  const { scrollY } = useScroll();
  const titleY = useTransform(scrollY, [0, 800], [0, reduced ? 0 : 120]);
  const titleOpacity = useTransform(scrollY, [0, 700], [1, reduced ? 1 : 0.15]);
  const namasteX = useTransform(scrollY, [0, 600], [0, reduced ? 0 : 70]);
  const watermarkY = useTransform(scrollY, [0, 900], [0, reduced ? 0 : 160]);

  /* easter egg: click the identity and it cycles the old role labels once, then settles */
  const cycleIdentity = () => {
    if (eggIdx !== null) return;
    setEggIdx(1);
    let i = 1;
    const id = window.setInterval(() => {
      i += 1;
      if (i >= profile.rota.length) {
        window.clearInterval(id);
        setEggIdx(null);
        return;
      }
      setEggIdx(i);
    }, ROTA_EGG);
  };

  return (
    <section
      id="top"
      className="relative flex flex-col justify-end overflow-clip px-[clamp(20px,4vw,48px)] pb-[clamp(40px,6vh,70px)] pt-[clamp(110px,12vh,160px)] min-h-svh"
    >
      <motion.span
        aria-hidden
        style={{ y: watermarkY }}
        className="pointer-events-none absolute right-[-2%] top-[22%] z-0 select-none font-dev text-[clamp(10rem,30vw,26rem)] leading-none text-ink opacity-[0.045]"
      >
        बीकानेर
      </motion.span>
      <HeroBackdrop />
      <HeroAscii />
      <Spotlight />

      <p className="relative z-10 flex items-center gap-2.5 font-mono text-[13px] tracking-widest text-muted-foreground">
        <span className="inline-flex items-center gap-2 border-2 border-ink bg-paper px-3 py-1.5 shadow-[3px_3px_0_0_var(--shadow-ink)]">
          <span aria-hidden className="relative inline-block h-2 w-2 bg-mint">
            <span
              aria-hidden
              className="absolute inset-0 animate-ping bg-mint"
              style={{ animationDuration: "2.4s" }}
            />
          </span>
          PORTFOLIO ©2026 — DELHI, INDIA · बीकानेर ORIGIN
        </span>
      </p>

      <motion.h1
        style={{ y: titleY, opacity: titleOpacity }}
        className="relative z-10 mt-4 font-display text-[clamp(4.5rem,15vw,14rem)] font-semibold uppercase leading-[0.8] tracking-wide"
      >
        <motion.span
          className="block pl-[0.05em]"
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          PRATHAM
        </motion.span>
        <span className="block pl-[0.28em] text-transparent [-webkit-text-stroke:3.5px_var(--ink)]">
          <motion.span
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="block"
          >
            NAHATA
          </motion.span>
          <span
            aria-hidden
            className="ml-[0.05em] inline-block h-6 w-1.5 translate-y-[-0.1em] animate-[cursor-blink_1.1s_step-end_infinite] bg-saffron [-webkit-text-stroke:0px]"
          />
        </span>
      </motion.h1>

      {/* identity line — auto-rotating role labels */}
      <motion.div
        className="relative z-10 mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-2 font-mono text-[13px] tracking-[0.2em] text-cobalt"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="inline-flex items-center gap-1.5" onClick={cycleIdentity} role="group" aria-label="Identity — click to cycle role labels">
          <span className="inline-flex h-5 w-5 items-center justify-center border-2 border-cobalt bg-paper text-[10px] font-medium leading-none">
            <AnimatePresence mode="wait">
              <motion.span
                key={eggIdx ?? 0}
                initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.6, rotate: 20 }}
                transition={{ duration: 0.18 }}
              >
                {eggIdx !== null ? profile.rota[eggIdx].charAt(0) : "?"}
              </motion.span>
            </AnimatePresence>
          </span>
          <IdentityTicker />
        </span>
        <button
          type="button"
          onClick={cycleIdentity}
          aria-label="Show other role labels"
          title="psst — click me"
          className="hidden cursor-help border-b-2 border-dashed border-cobalt/50 align-middle font-mono text-[10px] tracking-widest text-muted-foreground transition-colors hover:border-cobalt lg:inline-block"
        >
          (ROTATES)
        </button>
      </motion.div>

      <motion.div
        className="relative z-10 mt-4 max-w-[52ch] font-mono text-[12px] tracking-[0.2em] text-muted-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.36, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        FULL-STACK × ML SYSTEMS —{" "}
        <Annotate
          title="Delhi — why here"
          body={
            <>
              <p>
                Bikaner-born (camel country, Junagarh Fort), Delhi-built. The metro city made me fast: 4 AM hackathons,
                NCR startup runs, and a college network that ships instead of just talking.
              </p>
              <p className="mt-2 font-mono text-[11px] text-cobalt">
                THE LINE I KEEP STEALING — &quot;built in Delhi, deployed everywhere&quot;
              </p>
            </>
          }
        >
          DELHI, INDIA
        </Annotate>{" "}
        <span aria-hidden className="text-saffron-deep">→</span> THE WORLD
      </motion.div>

      <motion.p
        className="relative z-10 mt-5 max-w-[52ch] text-lg font-medium leading-[1.55]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.44, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        I build full-stack products and ML{" "}
        <Annotate
          title="systems — three readings"
          body={
            <ul className="space-y-1.5">
              <li><strong className="text-cobalt">PERSONAL</strong> — things that outgrow the demo: products people keep using after the hackathon.</li>
              <li><strong className="text-cobalt">TECHNICAL</strong> — pipelines where the model, the API and the UI are one deployable whole, not three side-projects.</li>
              <li><strong className="text-cobalt">EXAMPLES</strong> — MindPulse (client-side inference), Unified-DTA (Dockerized API), Sentinel (3-agent orchestration).</li>
            </ul>
          }
        >
          systems
        </Annotate>{" "}
        — browser inference, AI workflows, realtime interfaces. Models that actually ship.
      </motion.p>

      {/* CTAs — arrow micro-interaction + hover swap */}
      <motion.div
        className="relative z-10 mt-8 flex flex-wrap gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.52, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <Magnetic>
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex items-center gap-2.5 border-2 border-ink bg-saffron px-6 py-3.5 font-mono text-sm tracking-wider shadow-hard transition-[box-shadow] duration-150 ease-out hover:shadow-[2px_2px_0_0_var(--shadow-ink)] active:scale-[0.97]"
          >
            Start a project
            <span
              aria-hidden
              className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </Magnetic>
        <Magnetic>
          <Link
            href="/work"
            className="group inline-flex items-center gap-2.5 border-2 border-ink px-6 py-3.5 font-mono text-sm tracking-wider transition-colors duration-200 hover:bg-ink hover:text-paper active:scale-[0.97]"
          >
            View projects
            <span
              aria-hidden
              className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1"
            >
              ↓
            </span>
          </Link>
        </Magnetic>
      </motion.div>

      {/* stat cards — icon glyphs + saffron corner ticks */}
      <motion.div
        className="relative z-10 mt-8 grid w-fit max-w-full grid-cols-2 border-2 border-ink bg-paper shadow-hard divide-x divide-y divide-ink/15 sm:grid-cols-4 sm:divide-y-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {profile.stats.map((s) => (
          <div key={s.label} className="group relative px-4 py-3">
            <span
              aria-hidden
              className="absolute right-0 top-0 h-2 w-2 bg-saffron transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
            />
            <span aria-hidden className="mr-1.5 text-saffron-deep">
              {STAT_ICONS[s.label] ?? "◆"}
            </span>
            <p className="inline font-mono text-[15px] font-medium text-saffron-deep">
              {s.headline ? (
                s.headline
              ) : (
                <CountUp value={s.value} prefix={s.prefix ?? ""} suffix={s.suffix ?? ""} />
              )}
            </p>
            <p className="mt-0.5 text-[10.5px] leading-snug text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </motion.div>

      {/* jharokha portrait window — interactive */}
      <motion.div
        initial={{ opacity: 0, y: 24, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden
        className="absolute right-[clamp(16px,4vw,70px)] top-[13%] z-[1] hidden w-[min(300px,33vw)] lg:block"
      >
        <JharokhaPortrait />
      </motion.div>

      <motion.p
        aria-hidden
        style={{ x: namasteX }}
        className="absolute right-[calc(clamp(20px,5vw,90px)+2.5rem)] top-[7%] z-[2] hidden rotate-[-4deg] font-dev text-[clamp(2.6rem,5.5vw,4.6rem)] text-saffron [text-shadow:3px_3px_0_var(--ink)] lg:block"
      >
        नमस्ते
      </motion.p>

      <div className="absolute bottom-[clamp(96px,12vh,140px)] right-[clamp(20px,5vw,90px)] z-[2] hidden min-w-[200px] lg:block">
        <NowBuilding />
      </div>

      {/* scroll hint */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-[clamp(16px,2.5vh,32px)] left-1/2 z-[2] hidden -translate-x-1/2 lg:block"
      >
        <a
          href="#work"
          className="group inline-flex flex-col items-center gap-1 font-mono text-[10px] tracking-[0.3em] text-muted-foreground"
        >
          <span aria-hidden className="flock-bob inline-block text-base text-saffron-deep">↓</span>
          <span className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">SCROLL — PROJECTS</span>
        </a>
      </motion.div>
    </section>
  );
}
