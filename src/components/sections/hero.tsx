"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { profile } from "@/data/profile";
import { CountUp } from "@/components/motion/count-up";
import { Magnetic } from "@/components/motion/magnetic";
import { Spotlight } from "@/components/motion/spotlight";
import { Annotate } from "@/components/ui/annotate";
import { HeroAscii } from "@/components/ui/hero-ascii";
import { HeroBackdrop } from "@/components/ui/hero-backdrop";
import { NowBuilding } from "@/components/ui/now-building";

const ROTA_EGG = 900;

export function Hero({ stats }: { stats: { value: number; prefix?: string; suffix?: string; label: string; headline?: string }[] }) {
  const reduced = useReducedMotion();
  const [eggIdx, setEggIdx] = useState<number | null>(null);

  const { scrollY } = useScroll();
  const titleY = useTransform(scrollY, [0, 800], [0, reduced ? 0 : 120]);
  const titleOpacity = useTransform(scrollY, [0, 700], [1, reduced ? 1 : 0.15]);
  const portraitY = useTransform(scrollY, [0, 800], [0, reduced ? 0 : -90]);
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

      <p className="relative z-10 font-mono text-[13px] tracking-widest text-muted-foreground">
        PORTFOLIO ©2026 — DELHI, INDIA · बीकानेर ORIGIN
      </p>

      <motion.h1
        style={{ y: titleY, opacity: titleOpacity }}
        className="pointer-events-none relative z-10 mt-4 select-none font-display text-[clamp(4.5rem,15vw,14rem)] font-semibold uppercase leading-[0.8] tracking-wide"
      >
        <span className="block pl-[0.05em]">PRATHAM</span>
        <span className="block pl-[0.28em] text-transparent [-webkit-text-stroke:3.5px_var(--ink)]">
          NAHATA
          <span aria-hidden className="ml-[0.05em] inline-block h-6 w-1.5 translate-y-[-0.1em] animate-[cursor-blink_1.1s_step-end_infinite] bg-saffron [-webkit-text-stroke:0px]" />
        </span>
      </motion.h1>

      <div className="relative z-10 mt-5 font-mono text-[13px] tracking-[0.2em] text-cobalt">
        FULL-STACK × ML ENGINEER
        <button
          type="button"
          onClick={cycleIdentity}
          aria-label="Show other role labels"
          title="psst — click me"
          className="ml-3 hidden cursor-help border-b-2 border-dashed border-cobalt/50 align-middle font-mono text-[10px] tracking-widest text-muted-foreground transition-colors hover:border-cobalt lg:inline-block"
        >
          {eggIdx !== null ? profile.rota[eggIdx].toUpperCase() : "WHAT I DO ▾"}
        </button>
      </div>

      <div className="relative z-10 mt-4 max-w-[46ch] font-mono text-[12px] tracking-[0.2em] text-muted-foreground">
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
        → THE WORLD
      </div>

      <div className="relative z-10 mt-5 max-w-[46ch] text-lg font-medium leading-[1.55]">
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
      </div>

      <div className="relative z-10 mt-8 flex flex-wrap gap-4">
        <Magnetic>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2.5 border-2 border-ink bg-saffron px-6 py-3.5 font-mono text-sm tracking-wider shadow-hard transition-[box-shadow] duration-150 ease-out hover:shadow-[2px_2px_0_0_var(--shadow-ink)] active:scale-[0.97]"
          >
            Start a project <span aria-hidden>→</span>
          </a>
        </Magnetic>
        <Link
          href="/work"
          className="inline-flex items-center gap-2.5 border-2 border-ink px-6 py-3.5 font-mono text-sm tracking-wider transition-colors duration-200 hover:bg-ink hover:text-paper active:scale-[0.97]"
        >
          View projects <span aria-hidden>↓</span>
        </Link>
      </div>

      <div className="relative z-10 mt-8 grid w-fit max-w-full grid-cols-2 border-2 border-ink bg-paper shadow-hard divide-x divide-y divide-ink/15 sm:grid-cols-4 sm:divide-y-0">
        {stats.map((s) => (
          <div key={s.label} className="px-4 py-3">
            <p className="font-mono text-[15px] font-medium text-saffron-deep">
              {s.headline ? (
                s.headline
              ) : (
                <CountUp value={s.value} prefix={s.prefix ?? ""} suffix={s.suffix ?? ""} />
              )}
            </p>
            <p className="mt-0.5 text-[10.5px] leading-snug text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* stamp portrait — silhouette base, hover sweeps to reveal */}
      <motion.div
        style={{ y: portraitY }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="group absolute right-[clamp(20px,5vw,90px)] top-[10%] z-[1] hidden w-[min(320px,36vw)] lg:block"
      >
        {/* saffron block — behind the stamp, like the identity card */}
        <div
          aria-hidden
          className="absolute -right-8 -top-8 z-[-1] size-[150px] rotate-[4deg] border-2 border-ink bg-saffron"
        />
        <span
          aria-hidden
          className="absolute -top-[52px] right-[92px] z-10 rotate-[-9deg] font-dev text-[2.2rem] text-saffron-deep [text-shadow:2px_2px_0_var(--paper)]"
        >
          नमस्ते
        </span>

        {/* the stamp */}
        <div className="relative border-2 border-ink bg-paper-2 p-3 shadow-hard">
          <div aria-hidden className="pointer-events-none absolute inset-1.5 border border-dashed border-cobalt/60" />
          <div className="relative aspect-[4/5] overflow-hidden border-2 border-ink bg-ink-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/pratham-silhouette.jpg"
              alt=""
              width={640}
              height={800}
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover grayscale brightness-[0.82] transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.04] group-hover:grayscale-0 group-hover:brightness-100"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/reveal-image.jpg"
              alt=""
              width={640}
              height={800}
              className="absolute inset-0 h-full w-full object-cover [clip-path:inset(0_100%_0_0)] transition-[clip-path] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:[clip-path:inset(0_0_0_0)]"
            />
            <span
              aria-hidden
              className="absolute inset-y-0 left-0 z-10 w-[3px] bg-saffron transition-[left] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:left-full"
            />
          </div>
          <div className="mt-2 flex items-baseline justify-between font-mono text-[10px] tracking-[0.16em] text-muted-foreground">
            <span>PRATHAM NAHATA</span>
            <span className="text-cobalt">№ 01 — THE BUILDER</span>
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-[clamp(96px,12vh,140px)] right-[clamp(20px,5vw,90px)] z-[2] hidden min-w-[200px] lg:block">
        <NowBuilding />
      </div>
    </section>
  );
}
