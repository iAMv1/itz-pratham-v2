import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { AnnotationCard } from "@/components/annotations/annotation-card";
import { Process } from "@/components/sections/process";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = { title: "Process — Pratham Nahata" };

const PRINCIPLES = [
  { num: "01", title: "SHIP THE VIBE", body: "Motion, tone and personality are features. If it doesn't feel right, it isn't done." },
  { num: "02", title: "PROVE EVERYTHING", body: "Benchmarks, repos, numbers. Claims without receipts don't ship." },
  { num: "03", title: "2 WEEKS, NOT 2 MONTHS", body: "Small loops, real users, fast feedback. Polish is iterative, not postponed." },
  { num: "04", title: "CRAFT IS INVISIBLE", body: "Tokens, a11y, perf, reproducible builds — nobody notices when it's right, everyone notices when it's wrong." },
];

export default function ProcessPage() {
  return (
    <SiteShell>
      <main id="main" className="flex-1">
        <section className="px-[clamp(20px,4vw,48px)] pt-[110px]">
          <Reveal>
            <p className="mb-4 inline-block border border-ink bg-saffron px-3 py-1.5 font-mono text-xs tracking-[0.12em] shadow-[3px_3px_0_0_#051024]">
              PROCESS · HOW I BUILD
            </p>
            <h1 className="font-display text-[clamp(3.2rem,9vw,8rem)] font-semibold uppercase leading-[0.86]">
              THE<br />
              <span className="text-cobalt">PROCESS</span>
            </h1>
            <div className="mt-5">
              <AnnotationCard label="terminal · note" rotate={1.5}>
                yes, it&apos;s a real terminal. deal with it.
              </AnnotationCard>
            </div>
          </Reveal>
        </section>

        <Process />

        <section className="px-[clamp(20px,4vw,48px)] pb-[clamp(64px,8vh,110px)]">
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] font-semibold uppercase">
              BUILDING <span className="text-cobalt">PRINCIPLES</span>
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-[clamp(14px,2vw,28px)] md:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.num} delay={i * 0.06}>
                <article className="h-full border-2 border-ink bg-paper-2 p-[clamp(18px,2.4vw,28px)] shadow-hard">
                  <p className="font-mono text-xs tracking-widest text-cobalt">{p.num}</p>
                  <h3 className="mt-2 font-display text-[clamp(1.6rem,2.8vw,2.2rem)] font-semibold uppercase leading-none">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed">{p.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
