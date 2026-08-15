import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { AnnotationCard } from "@/components/annotations/annotation-card";
import { about, timeline, unresolved, metro } from "@/content/site";
import { MetroMap } from "./metro-map";
import { TimelineMachine } from "@/components/ui/timeline-machine";
import { ContributionGraph } from "@/components/ui/contribution-graph";
import { PaisleyField, MehndiField } from "@/components/canvas/fields";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = { title: "About — Pratham Nahata", description: "Bikaner-raised, Delhi-built. CS undergrad engineering full-stack + ML systems — metro map career route, timeline machine, the year in commits." };

export default function AboutPage() {
  return (
    <SiteShell>
      <main id="main" className="flex-1 pt-[96px]">
        <section className="page-dusk-terracotta relative overflow-clip px-[clamp(20px,4vw,48px)] pb-[clamp(64px,8vh,110px)]">
          <PaisleyField className="pointer-events-none absolute inset-0 z-0 h-full w-full" />
          <MehndiField className="pointer-events-none absolute inset-0 z-0 h-full w-full" />
          <span aria-hidden className="pointer-events-none absolute -right-[8%] top-[34%] h-[26rem] w-[26rem] rounded-full border-[3px] border-ink/10" />
          <span aria-hidden className="pointer-events-none absolute -left-[10%] top-[62%] h-[20rem] w-[20rem] rounded-full border-2 border-dashed border-cobalt/15" />
          <span aria-hidden className="wm-drift pointer-events-none absolute right-[2%] top-[2%] z-0 font-dev text-[clamp(6rem,18vw,14rem)] leading-none text-ink opacity-[0.04]">
            शिल्प
          </span>
          <div className="relative z-10">
            <Reveal>
              <p className="mb-4 inline-block border border-ink bg-saffron px-3 py-1.5 font-mono text-xs tracking-[0.12em] shadow-[3px_3px_0_0_var(--shadow-ink)]">
                ABOUT · THE BUILDER
              </p>
            <h1 className="font-display text-[clamp(3.2rem,9vw,8rem)] font-semibold uppercase leading-[0.86]">
              PRATHAM<br />
              <span className="text-cobalt">NAHATA</span>
            </h1>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.5fr_1fr]">
            <Reveal className="space-y-5">
              <p className="max-w-[52ch] text-lg font-medium leading-relaxed drop-cap">
                I&apos;m a CS undergrad from Delhi building full-stack + ML systems with the patience of a craftsman and
                the impatience of a hacker. Bikaner-raised in spirit, internet-raised in practice.
              </p>
              <p className="max-w-[52ch] border-t border-ink/15 pt-5 text-lg font-medium leading-relaxed">
                My brand promise is simple: <strong>builds that feel alive.</strong> Models that ship, interfaces with a
                pulse, and work you can verify — every claim is documented, with methodology attached.
              </p>
              <AnnotationCard label="brand · promise" rotate={-2}>
                builds systems that actually ship — nothing leaves without receipts
              </AnnotationCard>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="border-2 border-ink bg-paper-2 p-5 font-mono text-[13px] shadow-hard">
                {about().facts.map((f) => (
                  <li key={f.key} className="flex items-baseline gap-3 py-1.5">
                    <span className="min-w-[64px] font-medium text-saffron-deep">{f.key}</span>
                    {f.value}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* current direction — what I'm working on right now */}
          <Reveal className="mt-16">
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] font-semibold uppercase">
              CURRENTLY <span className="text-cobalt">UNRESOLVED</span>
            </h2>
            <p className="mt-3 max-w-[60ch] text-[15px] text-muted-foreground">
              Not a wall of wins — a map of open problems. Click any to descend: what I understand, what I don&apos;t,
              what I&apos;m trying, what I&apos;m reading, what&apos;s next.
            </p>
            <div className="mt-6 border-t-2 border-ink">
              {unresolved().items.map((u, i) => (
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

          {/* the year in commits — real GitHub data */}
          <Reveal className="mt-16">
            <ContributionGraph />
          </Reveal>

          {/* the journey — timeline */}
          <Reveal className="mt-16">
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] font-semibold uppercase">{metro().title}</h2>
            <div className="mt-6 overflow-x-auto border-2 border-ink bg-paper-2 p-6 shadow-hard">
              <div className="min-w-[680px]">
                <MetroMap metro={metro()} />
              </div>
            </div>
          </Reveal>

          {/* timeline machine */}
          <Reveal className="mt-16">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] font-semibold uppercase">
                {timeline().years.length ? "THE TIMELINE MACHINE" : ""}
              </h2>
              <p className="font-mono text-[11px] tracking-widest text-muted-foreground">{timeline().years.length ? "scrub the years — watch the builder change" : ""}</p>
            </div>
            <p className="mt-3 max-w-[60ch] text-[15px] text-muted-foreground">
              Drag the scrubber — the years change what I was building, learning, and becoming. A media timeline as a
              time machine. <em>(the last year is a trajectory, not a promise)</em>
            </p>
            <div className="mt-5">
              <TimelineMachine years={timeline().years} />
            </div>
          </Reveal>

          {/* off the clock */}
          <Reveal className="mt-16">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] font-semibold uppercase">
                OFF THE <span className="text-cobalt">CLOCK</span>
              </h2>
              <p className="font-mono text-[11px] tracking-widest text-muted-foreground">{about().offClock.sub}</p>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="border-2 border-ink bg-paper-2 p-[clamp(18px,2.5vw,26px)] shadow-hard">
                <p className="mb-3 font-mono text-[11px] tracking-widest text-cobalt">BOOKS — THE SHELF</p>
                <ul className="space-y-3">
                  {about().offClock.books.map((b) => (
                    <li key={b.title} className="border-b border-ink/15 pb-2.5 last:border-b-0">
                      <p className="font-display text-[15px] font-semibold uppercase leading-tight">{b.title}</p>
                      <p className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground">{b.take}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-2 border-ink bg-paper-2 p-[clamp(18px,2.5vw,26px)] shadow-hard">
                <p className="mb-3 font-mono text-[11px] tracking-widest text-cobalt">SETUP — THE WORKBENCH</p>
                <dl className="space-y-3">
                  {about().offClock.setup.map((s) => (
                    <div key={s.name} className="border-b border-ink/15 pb-2.5 last:border-b-0">
                      <dt className="font-mono text-[12px] tracking-widest text-saffron-deep">{s.name}</dt>
                      <dd className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground">{s.detail}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Reveal>

          {/* background timeline */}
          <Reveal className="mt-16">
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] font-semibold uppercase">
              THE <span className="text-cobalt">TIMELINE</span>
            </h2>
            <div className="mt-6 border-t border-ink">
              {about().background.map((b, i) => (
                <Reveal key={b.role} delay={i * 0.06}>
                  <article className="relative grid items-start gap-4 border-b border-ink px-2 py-6 md:grid-cols-[150px_1fr_auto] md:gap-10 md:py-10">
                    <span aria-hidden className="absolute -left-[34px] top-[34px] size-3 rounded-full border-2 border-ink bg-saffron" />
                    {i < about().background.length - 1 && (
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
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
