"use client";

import { Reveal } from "@/components/motion/reveal";
import { CountUp } from "@/components/motion/count-up";
import { RangoliField } from "@/components/canvas/fields";
import { profile } from "@/data/profile";

export function Wins() {
  return (
    <section id="wins" className="bg-bandhani relative bg-saffron px-[clamp(20px,4vw,48px)] py-[clamp(64px,8vh,110px)]">
      <RangoliField className="pointer-events-none absolute inset-0 z-0 h-full w-full" />
      <div className="relative z-10">
        <Reveal>
          <p className="mb-4 inline-block border border-ink bg-ink px-3 py-1.5 font-mono text-xs tracking-[0.12em] text-paper shadow-[3px_3px_0_0_#FFFDF8]">
            04 · RECEIPTS
          </p>
          <h2 className="font-display text-[clamp(3.2rem,9vw,8rem)] font-semibold uppercase leading-[0.86]">
            PROOF OF
            <br />
            <span className="text-ink-2">WORK</span>
          </h2>
        </Reveal>

        <Reveal>
          <article className="mt-10 grid items-center gap-[clamp(18px,3vw,40px)] border-2 border-ink bg-ink-2 p-[clamp(20px,3vw,34px)] text-paper shadow-[8px_8px_0_0_#051024] md:grid-cols-[auto_1fr_auto]">
            <CountUp
              value={profile.wins.featured.value}
              suffix={profile.wins.featured.suffix}
              className="font-display text-[clamp(3rem,6vw,5rem)] font-semibold leading-none text-saffron"
            />
            <div>
              <h3 className="font-display text-[clamp(1.6rem,2.8vw,2.4rem)] font-semibold uppercase leading-tight">
                {profile.wins.featured.title}
              </h3>
              <p className="mt-1.5 max-w-[60ch] text-[15px] text-paper/70">{profile.wins.featured.desc}</p>
            </div>
            <span className="hidden border border-saffron px-3 py-1.5 font-mono text-[11px] tracking-widest text-saffron md:block">
              {profile.wins.featured.tag}
            </span>
          </article>
        </Reveal>

        <ul className="mt-6 border-t-2 border-ink">
          {profile.wins.list.map((w, i) => (
            <Reveal key={w.num} delay={i * 0.05}>
              <li className="grid items-baseline gap-4 border-b border-ink/25 px-2 py-4 font-mono text-[14px] tracking-wide transition-colors duration-150 hover:bg-paper-2/60 md:grid-cols-[48px_1fr_auto]">
                <span className="text-xs text-cobalt">{w.num}</span>
                <span>
                  {w.title}
                  <small className="mt-0.5 block text-[11px] tracking-wide text-ink/55">{w.sub}</small>
                </span>
                <span className="hidden text-[11px] text-ink/50 md:block">{w.year}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ProofBand() {
  return (
    <div aria-hidden className="grid grid-cols-2 border-y-[3px] border-ink bg-saffron md:grid-cols-4">
      {profile.proofBand.map((s, i) => (
        <div
          key={s.label}
          className={`flex flex-col gap-2 p-[clamp(24px,3.5vw,40px)] ${
            i < 2 ? "border-b border-ink/30" : ""
          } md:border-b-0 ${i < 3 ? "md:border-r md:border-ink/30" : ""}`}
        >
          <CountUp
            value={s.value}
            prefix={s.prefix ?? ""}
            suffix={s.suffix ?? ""}
            className="font-display text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-none"
          />
          <span className="font-mono text-[11px] tracking-wider text-ink/70">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
