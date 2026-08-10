import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { Hero } from "@/components/sections/hero";
import { SkillsMarquee, NameMarquee } from "@/components/sections/marquee-band";
import { Reveal } from "@/components/motion/reveal";
import { KineticArt } from "@/components/motion/kinetic-art";
import { MaskTitle } from "@/components/motion/mask-title";
import { FloatingStats } from "@/components/motion/floating-stats";
import { ArtImage } from "@/components/ui/art-image";
import { caseStudies } from "@/data/profile";

export default async function Home({ searchParams }: { searchParams?: Promise<{ shot?: string }> }) {
  const sp = (await searchParams) ?? {};
  const shot = Boolean(sp.shot);
  const featured = caseStudies.slice(0, 3);

  return (
    <SiteShell rail>
      <main id="main" className="flex-1">
        <Hero shot={shot} />
        <SkillsMarquee />
        <NameMarquee />

        {/* featured work → /work/[slug] */}
        <section id="featured" className="scroll-mt-24 px-[clamp(20px,4vw,48px)] py-[clamp(64px,8vh,110px)]">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="mb-4 inline-block border border-ink bg-saffron px-3 py-1.5 font-mono text-xs tracking-[0.12em] shadow-[3px_3px_0_0_#051024]">
                  01 · FEATURED
                </p>
                <MaskTitle
                  lines={["SELECTED", "WORK"]}
                  accent={[1]}
                  className="font-display text-[clamp(3.2rem,9vw,8rem)] font-semibold uppercase leading-[0.86]"
                />
              </div>
              <Link href="/work" className="group inline-flex items-center gap-2 font-mono text-sm tracking-wider text-cobalt">
                ALL PROJECTS <span aria-hidden className="transition-transform duration-200 ease-out group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-[clamp(20px,3vw,40px)] md:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08} className="h-full">
                <Link
                  href={`/work/${p.slug}`}
                  className="group flex h-full flex-col border-2 border-ink bg-paper-2 shadow-hard transition-[transform,box-shadow] duration-250 ease-out hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[8px_8px_0_0_#051024]"
                >
                  <span className="relative block aspect-[16/10] overflow-hidden border-b-2 border-ink bg-paper">
                    <KineticArt className="absolute inset-0">
                      <ArtImage src={p.art} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]" />
                    </KineticArt>
                    <FloatingStats items={p.metrics.split(" · ")} />
                    <span aria-hidden className="absolute left-3 top-3 border border-ink bg-paper-2/90 px-2 py-1 font-mono text-[10px] tracking-widest">
                      {p.index} · {p.year}
                    </span>
                  </span>
                  <span className="flex flex-1 flex-col gap-2 p-5">
                    <span className="font-mono text-[11px] tracking-widest text-cobalt">{p.role}</span>
                    <span className="font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-semibold uppercase leading-none">
                      {p.title}
                    </span>
                    <span className="text-[14px] leading-relaxed">{p.blurb}</span>
                    <span className="mt-auto flex min-h-11 items-center pt-3 font-mono text-[12px] tracking-[0.1em] text-cobalt">
                      OPEN CASE <span aria-hidden className="transition-transform duration-200 ease-out group-hover:translate-x-1">→</span>
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA band */}
        <section id="talk" className="scroll-mt-24 border-y-2 border-ink bg-ink-2 px-[clamp(20px,4vw,48px)] py-[clamp(56px,8vh,90px)] text-paper">
          <Reveal>
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <p aria-hidden className="font-dev text-[clamp(2rem,4.5vw,3.6rem)] text-saffron">शुक्रिया</p>
                <h2 className="mt-2 font-display text-[clamp(2.4rem,6vw,5rem)] font-semibold uppercase leading-[0.9]">
                  LET&apos;S BUILD<br />
                  <span className="text-saffron">SOMETHING REAL</span>
                </h2>
                <p className="mt-4 max-w-[44ch] text-lg text-paper/70">
                  A product, a model, a website, a hackathon team — my inbox is open for things that deserve to feel alive.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <a
                  href="mailto:iam1nahata@gmail.com"
                  className="inline-flex min-w-[min(320px,100%)] items-center justify-center gap-2.5 border-2 border-paper bg-saffron px-8 py-5 font-mono text-[17px] font-medium tracking-wide text-ink shadow-[4px_4px_0_0_#F4EFE6] transition-[transform,box-shadow] duration-150 ease-out hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#F4EFE6] active:scale-[0.97]"
                >
                  iam1nahata@gmail.com <span aria-hidden>→</span>
                </a>
                <div className="flex gap-4">
                  <Link
                    href="/about"
                    className="inline-flex flex-1 items-center justify-center gap-2 border-2 border-paper px-6 py-3.5 font-mono text-sm tracking-wider text-paper transition-colors duration-200 hover:bg-paper hover:text-ink active:scale-[0.97]"
                  >
                    ABOUT ME
                  </Link>
                  <Link
                    href="/process"
                    className="inline-flex flex-1 items-center justify-center gap-2 border-2 border-paper px-6 py-3.5 font-mono text-sm tracking-wider text-paper transition-colors duration-200 hover:bg-paper hover:text-ink active:scale-[0.97]"
                  >
                    THE PROCESS
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
    </SiteShell>
  );
}
