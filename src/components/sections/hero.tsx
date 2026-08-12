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

export function Hero() {
  const reduced = useReducedMotion();
  const [eggIdx, setEggIdx] = useState<number | null>(null);

  const { scrollY } = useScroll();
  const titleY = useTransform(scrollY, [0, 800], [0, reduced ? 0 : 120]);
  const titleOpacity = useTransform(scrollY, [0, 700], [1, reduced ? 1 : 0.15]);
  const portraitY = useTransform(scrollY, [0, 800], [0, reduced ? 0 : -90]);
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

      <p className="relative z-10 font-mono text-[13px] tracking-widest text-muted-foreground">
        PORTFOLIO ©2026 — DELHI, INDIA · बीकानेर ORIGIN
      </p>

      <motion.h1
        style={{ y: titleY, opacity: titleOpacity }}
        className="relative z-10 mt-4 font-display text-[clamp(4.5rem,15vw,14rem)] font-semibold uppercase leading-[0.8] tracking-wide"
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
          {eggIdx !== null ? profile.rota[eggIdx].toUpperCase() : "(?)"}
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
        {profile.stats.map((s) => (
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

      {/* jharokha portrait window */}
      <motion.div
        style={{ y: portraitY }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden
        className="group absolute right-[clamp(20px,5vw,90px)] top-[12%] z-[1] hidden w-[min(320px,36vw)] lg:block"
      >
        <div className="relative aspect-[4/5] overflow-visible">
          <div className="absolute inset-0 translate-x-2.5 translate-y-2.5 border-2 border-ink bg-cobalt transition-transform duration-300 ease-out group-hover:translate-x-4 group-hover:translate-y-4" />
          <div className="relative h-full w-full overflow-hidden border-2 border-ink bg-ink-2 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:border-cobalt">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/art-hero-arch.jpg"
              alt=""
              width={640}
              height={384}
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover opacity-90 [clip-path:path('M0_0_L320_0_L320_400_L24_400_C24_310_60_250_160_250_C260_250_296_310_296_400_L0_400_Z')]"
            />
            <svg viewBox="0 0 320 400" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full opacity-75">
              <path d="M24 400 V190 C24 92 68 44 160 44 C252 44 296 92 296 190 V400" fill="none" stroke="#F4EFE6" strokeWidth="3" />
              <path d="M46 400 V195 C46 116 86 70 160 70 C234 70 274 116 274 195 V400" fill="none" stroke="#F4EFE6" strokeWidth="1.5" opacity="0.55" />
              <path d="M160 44 V10 M160 10 L170 22 L160 30 L150 22 Z" fill="none" stroke="#F4EFE6" strokeWidth="2" />
              <circle cx="160" cy="22" r="3" fill="#F58E20" />
            </svg>
            <span className="absolute bottom-2 left-2 border border-paper/30 bg-ink-2/80 px-2.5 py-1 font-mono text-[10px] tracking-[0.22em] text-paper/70">
              JHAROKHA // 01
            </span>
          </div>
        </div>
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
    </section>
  );
}
