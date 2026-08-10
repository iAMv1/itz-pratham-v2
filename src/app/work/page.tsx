import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { KineticArt } from "@/components/motion/kinetic-art";
import { LookOut } from "@/components/motion/look-out";
import { MaskTitle } from "@/components/motion/mask-title";
import { FloatingStats } from "@/components/motion/floating-stats";
import { ArtImage } from "@/components/ui/art-image";
import { caseStudies } from "@/data/profile";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = { title: "Work — Pratham Nahata" };

export default function WorkPage() {
  return (
    <SiteShell>
      <main id="main" className="flex-1 pt-[96px]">
        <section className="px-[clamp(20px,4vw,48px)] pb-[clamp(64px,8vh,110px)]">
          <Reveal>
            <p className="mb-4 inline-block border border-ink bg-saffron px-3 py-1.5 font-mono text-xs tracking-[0.12em] shadow-[3px_3px_0_0_#051024]">
              WORK · 01—04
            </p>
            <MaskTitle
              lines={["SELECTED", "PROJECTS"]}
              accent={[1]}
              as="h1"
              className="font-display text-[clamp(3.2rem,9vw,8rem)] font-semibold uppercase leading-[0.86]"
            />
            <p className="mt-6 max-w-[52ch] text-lg font-medium leading-relaxed">
              Four systems, each opened like a jharokha window — tap any to read the full story. Every claim links to a
              real repo.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-[clamp(20px,3vw,40px)] md:grid-cols-2">
            {caseStudies.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06} className="h-full">
                <Link
                  href={`/work/${p.slug}`}
                  className="group flex h-full flex-col border-2 border-ink bg-paper-2 shadow-hard transition-[transform,box-shadow] duration-250 ease-out hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[8px_8px_0_0_#051024]"
                >
                  <span className="relative block aspect-[16/10] overflow-hidden border-b-2 border-ink bg-paper">
                    <KineticArt className="absolute inset-0">
                      <LookOut className="h-full w-full">
                        <ArtImage
                          src={p.art}
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
                    <span className="mt-auto flex min-h-11 items-center pt-3 font-mono text-[12.5px] tracking-[0.1em] text-cobalt">
                      OPEN CASE STUDY <span aria-hidden className="transition-transform duration-200 ease-out group-hover:translate-x-1">→</span>
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12">
            <a
              href="https://github.com/iAMv1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 border-2 border-ink bg-saffron px-6 py-3.5 font-mono text-sm tracking-wider shadow-hard transition-[transform,box-shadow] duration-150 ease-out hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0_0_#051024] active:scale-[0.97]"
            >
              + 18 MORE REPOS ON GITHUB <span aria-hidden>↗</span>
            </a>
          </Reveal>
        </section>
      </main>
    </SiteShell>
  );
}
