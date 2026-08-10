"use client";

import { Reveal } from "@/components/motion/reveal";
import { Tilt } from "@/components/motion/tilt";
import { AnnotationCard } from "@/components/annotations/annotation-card";
import { PaisleyField } from "@/components/canvas/fields";
import { profile } from "@/data/profile";

export function Vibe() {
  return (
    <section id="vibe" className="bg-jali relative px-[clamp(20px,4vw,48px)] py-[clamp(64px,8vh,110px)]">
      <PaisleyField className="pointer-events-none absolute inset-0 z-0 h-full w-full" />
      <div className="relative z-10">
        <Reveal>
          <p className="mb-4 inline-block border border-ink bg-saffron px-3 py-1.5 font-mono text-xs tracking-[0.12em] shadow-[3px_3px_0_0_#051024]">
            01 · THE VIBE
          </p>
          <h2 className="font-display text-[clamp(3.2rem,9vw,8rem)] font-semibold uppercase leading-[0.86]">
            WHAT I
            <br />
            OPTIMIZE <span className="text-cobalt">FOR</span>
          </h2>
        </Reveal>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1.5fr_1fr]">
          <Reveal className="space-y-5">
            <p
              className="max-w-[52ch] text-lg font-medium leading-relaxed drop-cap"
              dangerouslySetInnerHTML={{ __html: profile.manifesto[0].html }}
            />
            <p
              className="max-w-[52ch] border-t border-ink/15 pt-5 text-lg font-medium leading-relaxed"
              dangerouslySetInnerHTML={{ __html: profile.manifesto[1].html }}
            />
            <div className="pt-2">
              <AnnotationCard label="handwritten · note" rotate={-2}>
                i make things feel alive — राजस्थान में बना
              </AnnotationCard>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="space-y-6">
            <ul className="border-2 border-ink bg-paper-2 p-5 font-mono text-[13px] shadow-hard">
              {profile.facts.map((f) => (
                <li key={f.key} className="flex items-baseline gap-3 py-1.5">
                  <span className="min-w-[64px] font-medium text-saffron-deep">{f.key}</span>
                  {f.value}
                </li>
              ))}
            </ul>
            <Tilt className="border-2 border-ink bg-paper-2 p-6 shadow-hard">
              <p className="font-mono text-xs tracking-widest text-saffron-deep">SPECIMEN // PRIMITIVES</p>
              <h3 className="mt-2 font-display text-3xl font-semibold uppercase">Motion ready</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Reveal · CountUp · Marquee · Tilt · AnnotationCard — all reduced-motion and pointer-fine safe.
              </p>
            </Tilt>
          </Reveal>
        </div>

        <div className="mt-[clamp(40px,6vh,72px)] grid items-start gap-[clamp(14px,2vw,28px)] md:grid-cols-[1fr_1.25fr_1fr]">
          {profile.cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1} className={i === 1 ? "md:mt-0" : "md:mt-11"}>
              <article
                className={`flex h-full flex-col gap-2.5 border-2 border-ink bg-paper-2 p-[clamp(20px,2.6vw,30px)] shadow-hard transition-transform duration-300 ease-out hover:-translate-y-1.5 hover:rotate-[-0.5deg] hover:shadow-[8px_8px_0_0_#051024] ${
                  i === 1 ? "border-t-[6px] border-t-saffron" : ""
                }`}
              >
                <p className="flex items-center gap-2 font-mono text-xs tracking-widest text-muted-foreground">
                  <span aria-hidden className="h-0.5 w-4 bg-saffron" />
                  {c.label}
                </p>
                <h3 className="font-display text-[clamp(1.9rem,3vw,2.6rem)] font-semibold uppercase leading-none">
                  {c.title}
                </h3>
                <p className="text-[15px] leading-relaxed">{c.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
