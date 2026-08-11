import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { Tilt } from "@/components/motion/tilt";
import { Process } from "@/components/sections/process";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = { title: "Process — Pratham Nahata", description: "How I build: a live terminal session of the process — discover, design, build, polish. 2 weeks not 2 months, everything proven." };

const PRINCIPLES = [
  {
    num: "01",
    title: "POLISH IS A FEATURE",
    body: "Motion, tone and personality are features. If it doesn't feel right, it isn't done.",
    why: "A portfolio that feels alive beats one that's merely correct — the same way a product that feels right gets used. Every animation here is a working demo of this principle: if the reveal stutters, the page has failed its own pitch.",
  },
  {
    num: "02",
    title: "PROVE EVERYTHING",
    body: "Benchmarks, repos, numbers. Claims without receipts don't ship.",
    why: "Anyone can say 'great at GNNs'. This site pins every claim to a repo, a benchmark, or a number — and each case study carries a counterfactual section where the architecture has to defend itself. If it can't be verified, it doesn't get built.",
  },
  {
    num: "03",
    title: "2 WEEKS, NOT 2 MONTHS",
    body: "Small loops, real users, fast feedback. Polish is iterative, not postponed.",
    why: "Every project here shipped a working slice inside two weeks before the ambition grew. MindPulse's first prototype polled a REST endpoint; the rewrite to WebSockets was only possible because the feedback loop was already running.",
  },
  {
    num: "04",
    title: "CRAFT IS INVISIBLE",
    body: "Tokens, a11y, perf, reproducible builds — nobody notices when it's right, everyone notices when it's wrong.",
    why: "The 100/100 Lighthouse accessibility score, the reduced-motion fallbacks, the service worker — none of it is visible in a screenshot, all of it is visible the moment it breaks. Invisible craft is the strongest signal of engineering discipline.",
  },
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
                <Tilt max={5} className="h-full">
                  <article className="group h-full border-2 border-ink bg-paper-2 p-[clamp(18px,2.4vw,28px)] shadow-hard transition-[transform,box-shadow] duration-200 ease-out hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_0_var(--shadow-ink)]">
                    <p className="flex items-center justify-between font-mono text-xs tracking-widest text-cobalt">
                      {p.num}
                      <span aria-hidden className="text-saffron-deep opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        ✦
                      </span>
                    </p>
                    <h3 className="mt-2 font-display text-[clamp(1.6rem,2.8vw,2.2rem)] font-semibold uppercase leading-none transition-transform duration-200 group-hover:translate-x-1">
                      {p.title}
                    </h3>
                    <p className="mt-2.5 text-[15px] leading-relaxed">{p.body}</p>
                    <details className="group/details mt-4">
                      <summary className="flex cursor-pointer list-none items-center gap-2 font-mono text-[11px] tracking-widest text-cobalt [&::-webkit-details-marker]:hidden">
                        <span aria-hidden className="text-saffron-deep transition-transform duration-200 group-open/details:rotate-45">+</span>
                        WHY IT MATTERS
                      </summary>
                      <p className="mt-2.5 border-l-2 border-cobalt pl-3 text-[14px] leading-relaxed text-muted-foreground">
                        {p.why}
                      </p>
                    </details>
                  </article>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
