import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
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
        <div className="pt-[72px]">
          <Process />
        </div>

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
