import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { KineticArt } from "@/components/motion/kinetic-art";
import { LookOut } from "@/components/motion/look-out";
import { MaskTitle } from "@/components/motion/mask-title";
import { FloatingStats } from "@/components/motion/floating-stats";
import { ArtImage } from "@/components/ui/art-image";
import { allProjects } from "@/content/projects";
import { MehndiField } from "@/components/canvas/fields";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = { title: "Work — Pratham Nahata", description: "Four systems, each opened like a jharokha window — MindPulse Pro, Unified-DTA, Sentinel, OmniSecTester. Every claim documented — repos where public, methodology always." };

export default function WorkPage() {
  return (
    <SiteShell>
      <main id="main" className="flex-1 pt-[96px]">
        <section className="relative px-[clamp(20px,4vw,48px)] pb-[clamp(64px,8vh,110px)]">
          <MehndiField className="pointer-events-none absolute inset-0 z-0 h-full w-full" />
          <span aria-hidden className="wm-drift pointer-events-none absolute right-[2%] top-[2%] z-0 font-dev text-[clamp(6rem,18vw,14rem)] leading-none text-ink opacity-[0.04]">
            काम
          </span>
          <Reveal className="relative z-10">
            <p className="mb-4 inline-block border border-ink bg-saffron px-3 py-1.5 font-mono text-xs tracking-[0.12em] shadow-[3px_3px_0_0_var(--shadow-ink)]">
              WORK · 01—{allProjects().length}
            </p>
            <MaskTitle
              lines={["SELECTED", "PROJECTS"]}
              accent={[1]}
              as="h1"
              className="font-display text-[clamp(3.2rem,9vw,8rem)] font-semibold uppercase leading-[0.86]"
            />
            <p className="mt-6 max-w-[52ch] text-lg font-medium leading-relaxed">
              Every system completed recently — tap any to read the full story. Every claim is
              documented: repos where public, methodology always.
            </p>
          </Reveal>

          <div className="relative z-10 mt-12 grid gap-[clamp(20px,3vw,40px)] md:grid-cols-2">
            {allProjects().map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06} className="h-full">
                <Link
                  href={`/work/${p.slug}`}
                  className="group flex h-full flex-col border-2 border-ink bg-paper-2 shadow-hard transition-[transform,box-shadow] duration-250 ease-out hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[8px_8px_0_0_var(--shadow-ink)]"
                >
                  <span className="relative block aspect-[16/10] overflow-hidden border-b-2 border-ink bg-paper">
                    <KineticArt className="absolute inset-0">
                      <LookOut className="h-full w-full">
                        <ArtImage
                          src={p.screenshot ?? p.art}
                          alt=""
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.06]"
                        />
                      </LookOut>
                    </KineticArt>
                    <FloatingStats items={p.metrics.split(" · ")} />
                    <span
                      aria-hidden
                      className="absolute left-3 top-3 border border-ink bg-paper-2/90 px-2 py-1 font-mono text-[10px] tracking-widest"
                    >
                      {p.index} · {p.year}
                    </span>
                  </span>
                  <span className="flex flex-1 flex-col gap-2 p-[clamp(18px,2.4vw,26px)]">
                    <span className="font-mono text-[11px] tracking-widest text-cobalt">{p.role}</span>
                    <span className="font-display text-[clamp(1.9rem,3.2vw,2.6rem)] font-semibold uppercase leading-none">
                      {p.title}
                    </span>
                    <span className="text-[14.5px] leading-relaxed">{p.blurb}</span>
                    <span className="mt-1 font-mono text-[11px] leading-snug tracking-wide text-saffron-deep">
                      ▸ {p.outcome}
                    </span>
                    <span className="mt-auto flex min-h-11 items-center pt-3 font-mono text-[12.5px] tracking-[0.1em] text-cobalt">
                      OPEN CASE STUDY <span aria-hidden className="transition-transform duration-200 ease-out group-hover:translate-x-1">→</span>
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal className="relative z-10 mt-12">
            <div className="flex flex-wrap items-center justify-between gap-4 border-t-2 border-ink pt-8">
              <p className="font-mono text-[12px] tracking-widest text-muted-foreground">
                ▸ {allProjects().length} FEATURED — <span className="text-cobalt">18+ MORE REPOS LIVE ON GITHUB</span>
              </p>
              <a
                href="https://github.com/iAMv1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 border-2 border-ink bg-saffron px-6 py-3.5 font-mono text-sm tracking-wider shadow-hard transition-[transform,box-shadow] duration-150 ease-out hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0_0_var(--shadow-ink)] active:scale-[0.97]"
              >
                EXPLORE ALL REPOS <span aria-hidden>↗</span>
              </a>
            </div>
          </Reveal>
        </section>
      </main>
    </SiteShell>
  );
}
