import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { AnnotationCard } from "@/components/annotations/annotation-card";
import { metro, contribution, profile, unresolved, timelineMachine } from "@/data/profile";
import { MetroMap } from "./metro-map";
import { TimelineMachine } from "@/components/ui/timeline-machine";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = { title: "About — Pratham Nahata" };

function ContributionRangoli() {
  const cells = [];
  for (let w = 0; w < contribution.weeks; w++) {
    for (let d = 0; d < contribution.days; d++) {
      const seed = w * 31 + d * 17;
      const h = Math.abs(Math.sin(seed * 12.9898) * 43758.5453) % 1;
      cells.push({ w, d, level: h < 0.45 ? 0 : h < 0.65 ? 1 : h < 0.8 ? 2 : h < 0.92 ? 3 : 4 });
    }
  }
  const colors = ["transparent", "rgba(29,91,158,0.35)", "rgba(29,91,158,0.9)", "rgba(245,142,32,0.9)", "rgba(201,111,74,1)"];
  return (
    <div aria-hidden className="overflow-x-auto border-2 border-ink bg-paper-2 p-4 shadow-hard">
      <div className="grid w-max grid-flow-col gap-[3px]" style={{ gridTemplateRows: `repeat(${contribution.days}, 12px)` }}>
        {cells.map((c, i) => (
          <span key={i} className="size-3 rounded-[3px]" style={{ background: colors[c.level] }} />
        ))}
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <SiteShell>
      <main id="main" className="flex-1 pt-[96px]">
        <section className="px-[clamp(20px,4vw,48px)] pb-[clamp(64px,8vh,110px)]">
          <Reveal>
            <p className="mb-4 inline-block border border-ink bg-saffron px-3 py-1.5 font-mono text-xs tracking-[0.12em] shadow-[3px_3px_0_0_#051024]">
              ABOUT · THE BUILDER
            </p>
            <h1 className="font-display text-[clamp(3.2rem,9vw,8rem)] font-semibold uppercase leading-[0.86]">
              PRATHAM<br />
              <span className="text-cobalt">NAHATA</span>
            </h1>
          </Reveal>

          <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1.5fr_1fr]">
            <Reveal className="space-y-5">
              <p className="max-w-[52ch] text-lg font-medium leading-relaxed drop-cap">
                I&apos;m a CS undergrad from Delhi building full-stack + ML systems with the patience of a craftsman and
                the impatience of a hacker. Jaipur-raised in spirit, internet-raised in practice.
              </p>
              <p className="max-w-[52ch] border-t border-ink/15 pt-5 text-lg font-medium leading-relaxed">
                My brand promise is simple: <strong>builds that feel alive.</strong> Models that ship, interfaces with a
                pulse, and work you can verify — every claim on this site links to a real repo.
              </p>
              <AnnotationCard label="brand · promise" rotate={-2}>
                builds that feel alive — nothing shipped without a vibe
              </AnnotationCard>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="border-2 border-ink bg-paper-2 p-5 font-mono text-[13px] shadow-hard">
                {profile.facts.map((f) => (
                  <li key={f.key} className="flex items-baseline gap-3 py-1.5">
                    <span className="min-w-[64px] font-medium text-saffron-deep">{f.key}</span>
                    {f.value}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* metro map */}
          <Reveal className="mt-16">
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] font-semibold uppercase">{metro.title}</h2>
            <div className="mt-6 border-2 border-ink bg-paper-2 p-6 shadow-hard">
              <MetroMap />
            </div>
          </Reveal>

          {/* contribution rangoli */}
          <Reveal className="mt-16">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] font-semibold uppercase">
                {contribution.title}
              </h2>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm tracking-wider text-cobalt underline underline-offset-4"
              >
                github.com/iAMv1 ↗
              </a>
            </div>
            <p className="mt-3 max-w-[60ch] text-[15px] text-muted-foreground">
              A bandhani-dot rendering of a year of commits — intensity mapped from saffron to terracotta. Live feed in
              the contact page.
            </p>
            <div className="mt-5">
              <ContributionRangoli />
            </div>
          </Reveal>

          {/* timeline machine */}
          <Reveal className="mt-16">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] font-semibold uppercase">
                {timelineMachine.title}
              </h2>
              <p className="font-mono text-[11px] tracking-widest text-muted-foreground">{timelineMachine.sub}</p>
            </div>
            <p className="mt-3 max-w-[60ch] text-[15px] text-muted-foreground">
              Drag the scrubber — the years change what I was building, learning, and becoming. A media timeline as a
              time machine.
            </p>
            <div className="mt-5">
              <TimelineMachine />
            </div>
          </Reveal>

          {/* currently unresolved */}
          <Reveal className="mt-16">
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] font-semibold uppercase">
              CURRENTLY <span className="text-cobalt">UNRESOLVED</span>
            </h2>
            <p className="mt-3 max-w-[60ch] text-[15px] text-muted-foreground">
              Not a wall of wins — a map of open problems. Click any to descend: what I understand, what I don&apos;t,
              what I&apos;m trying, what I&apos;m reading, what&apos;s next.
            </p>
            <div className="mt-6 border-t-2 border-ink">
              {unresolved.map((u, i) => (
                <details key={u.title} className="group border-b border-ink/20">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-2 py-3 transition-colors hover:bg-paper-2 [&::-webkit-details-marker]:hidden">
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-xs text-saffron-deep">{String(i + 1).padStart(2, "0")}</span>
                      <span className="font-display text-xl font-semibold uppercase leading-none md:text-2xl">
                        {u.title}
                      </span>
                    </span>
                    <span aria-hidden className="font-mono text-lg text-cobalt transition-transform duration-200 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <dl className="grid gap-3 px-2 pb-5 text-[14px] leading-relaxed sm:grid-cols-2">
                    <div className="border-l-2 border-mint pl-3">
                      <dt className="font-mono text-[10px] tracking-widest text-muted-foreground">WHAT I UNDERSTAND</dt>
                      <dd className="mt-1">{u.understand}</dd>
                    </div>
                    <div className="border-l-2 border-red/60 pl-3">
                      <dt className="font-mono text-[10px] tracking-widest text-muted-foreground">WHAT I DON&apos;T</dt>
                      <dd className="mt-1">{u.dont}</dd>
                    </div>
                    <div className="border-l-2 border-cobalt pl-3">
                      <dt className="font-mono text-[10px] tracking-widest text-muted-foreground">WHAT I&apos;M TRYING</dt>
                      <dd className="mt-1">{u.trying}</dd>
                    </div>
                    <div className="border-l-2 border-saffron pl-3">
                      <dt className="font-mono text-[10px] tracking-widest text-muted-foreground">READING · NEXT</dt>
                      <dd className="mt-1">
                        {u.reading}
                        <br />
                        <strong className="text-cobalt">→ {u.next}</strong>
                      </dd>
                    </div>
                  </dl>
                </details>
              ))}
            </div>
          </Reveal>

          {/* background timeline */}
          <Reveal className="mt-16">
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] font-semibold uppercase">
              THE <span className="text-cobalt">TIMELINE</span>
            </h2>
            <div className="mt-6 border-t border-ink">
              {profile.background.map((b, i) => (
                <Reveal key={b.role} delay={i * 0.06}>
                  <article className="relative grid items-start gap-4 border-b border-ink px-2 py-6 md:grid-cols-[150px_1fr_auto] md:gap-10 md:py-10">
                    <span aria-hidden className="absolute -left-[34px] top-[34px] size-3 rounded-full border-2 border-ink bg-saffron" />
                    {i < profile.background.length - 1 && (
                      <span aria-hidden className="absolute -left-[29px] top-[52px] bottom-[-8px] w-0.5 bg-ink/25" />
                    )}
                    <span className="font-display text-[clamp(1.8rem,2.6vw,2.6rem)] font-semibold leading-none">{b.years}</span>
                    <div>
                      <h3 className="font-display text-[clamp(1.6rem,2.8vw,2.2rem)] font-semibold uppercase leading-none">
                        {b.role} <span className="text-cobalt">{b.co}</span>
                      </h3>
                      <p className="mt-2.5 max-w-[60ch] text-[15.5px] leading-relaxed">{b.desc}</p>
                      <p className="mt-3 font-mono text-[11px] tracking-widest text-muted-foreground">{b.tags}</p>
                    </div>
                    <span className="hidden border border-ink bg-paper-2 px-3 py-1.5 font-mono text-[11px] tracking-widest md:block">
                      {b.status}
                    </span>
                  </article>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </section>
      </main>
    </SiteShell>
  );
}
