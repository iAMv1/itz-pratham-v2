import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/reveal";
import { ArtImage } from "@/components/ui/art-image";
import { RepoFrame } from "@/components/ui/repo-frame";
import { VtLink } from "@/components/ui/vt-link";
import { caseStudies, caseCounterfactuals } from "@/data/profile";
import { SiteShell } from "@/components/layout/site-shell";
import { FlowDiagram } from "./flow-diagram";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = caseStudies.find((c) => c.slug === slug);
  return { title: s ? `${s.title} — Pratham Nahata` : "Case study — Pratham Nahata" };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudies.find((c) => c.slug === slug);
  if (!study) notFound();
  const idx = caseStudies.indexOf(study);
  const next = caseStudies[(idx + 1) % caseStudies.length];

  return (
    <SiteShell>
      <main id="main" className="flex-1 pt-[96px]">
        <article className="px-[clamp(20px,4vw,48px)] pb-[clamp(64px,8vh,110px)]">
          {/* header */}
          <header className="relative overflow-hidden border-2 border-ink bg-ink-2 text-paper">
            <ArtImage src={study.art} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-ink-2/60 to-transparent" />
            <div className="relative z-10 px-[clamp(20px,4vw,40px)] pb-10 pt-[clamp(60px,8vh,90px)]">
              <p className="font-mono text-xs tracking-[0.18em] text-paper/60">
                CASE {study.index} · {study.year} · {study.role}
              </p>
              <h1 className="mt-4 font-display text-[clamp(2.6rem,7vw,6rem)] font-semibold uppercase leading-[0.9]">
                {study.title}
              </h1>
              <p className="mt-3 max-w-[52ch] text-lg text-paper/80">{study.blurb}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {study.stack.map((s) => (
                  <span key={s} className="border border-paper/45 px-2.5 py-1 font-mono text-[11px] tracking-wider text-paper/85">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <span aria-hidden className="absolute right-6 top-4 font-dev text-[clamp(3rem,8vw,7rem)] text-paper/10">
              {study.index}
            </span>
          </header>

          {/* system flow — dark bridge into the body, full-bleed */}
          <div className="border-b-2 border-ink bg-ink-2 py-8 text-paper">
            <div className="px-[clamp(20px,4vw,40px)]">
              <p className="mb-4 font-mono text-xs tracking-[0.18em] text-paper/60">SYSTEM FLOW</p>
              <FlowDiagram slug={study.slug} />
            </div>
          </div>

          {/* sections */}
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <Reveal>
              <section>
                <h2 className="mb-3 font-display text-3xl font-semibold uppercase">THE PROBLEM</h2>
                <p className="border-t-2 border-ink pt-4 text-[16px] leading-relaxed">{study.challenge}</p>
                <p className="mt-5 border-l-4 border-saffron bg-paper-2 py-2 pl-4 font-mono text-[13px] italic leading-relaxed text-saffron-deep">
                  {study.impact[0]}
                </p>
              </section>
            </Reveal>
            <Reveal delay={0.08}>
              <section>
                <h2 className="mb-3 font-display text-3xl font-semibold uppercase">HOW IT&apos;S BUILT</h2>
                <p className="border-t-2 border-ink pt-4 text-[16px] leading-relaxed">{study.build}</p>
              </section>
            </Reveal>
          </div>

          <Reveal>
            <section className="mt-12 border-2 border-ink bg-paper-2 p-[clamp(20px,3vw,36px)] shadow-hard">
              <h2 className="font-display text-3xl font-semibold uppercase">IMPACT</h2>
              <ul className="mt-5 grid gap-3 md:grid-cols-2">
                {study.impact.map((im) => (
                  <li key={im} className="flex items-baseline gap-3 border-b border-ink/15 pb-3 font-mono text-[13.5px] tracking-wide">
                    <span aria-hidden className="size-2 flex-none rounded-full" style={{ background: study.accent }} />
                    {im}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          {/* counterfactuals — engineering judgment, not just implementation */}
          {caseCounterfactuals[study.slug] && (
            <Reveal className="mt-12">
              <section>
                <h2 className="font-display text-3xl font-semibold uppercase">
                  WHAT IF <span className="text-cobalt">…</span>
                </h2>
                <p className="mt-2 max-w-[56ch] text-[15px] text-muted-foreground">
                  Ask the project a different question. The architecture has to defend itself.
                </p>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {caseCounterfactuals[study.slug].map((cf) => (
                    <details key={cf.label} className="group border-2 border-ink bg-paper-2 shadow-[4px_4px_0_0_#051024]">
                      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 font-mono text-[13px] tracking-wide [&::-webkit-details-marker]:hidden">
                        {cf.label}
                        <span aria-hidden className="text-lg text-saffron-deep transition-transform duration-200 group-open:rotate-45">
                          +
                        </span>
                      </summary>
                      <p className="border-t border-ink/15 px-4 py-3 text-[14px] leading-relaxed">{cf.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            </Reveal>
          )}

          {/* dive deeper — progressive information density */}
          {study.dive?.length > 0 && (
            <Reveal className="mt-12">
              <section>
                <h2 className="font-display text-3xl font-semibold uppercase">
                  DIVE <span className="text-cobalt">DEEPER</span>
                </h2>
                <p className="mt-2 max-w-[56ch] text-[15px] text-muted-foreground">
                  Built it — now the descent. Each question opens the next layer: why, why this architecture, what
                  broke, what I&apos;d change.
                </p>
                <div className="mt-5 border-2 border-ink">
                  {study.dive.map((d, i) => (
                    <details key={d.q} className="group border-b border-ink/20 last:border-b-0">
                      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 transition-colors hover:bg-paper-2 [&::-webkit-details-marker]:hidden">
                        <span className="flex items-baseline gap-4">
                          <span className="font-mono text-xs text-saffron-deep">{String(i + 1).padStart(2, "0")}</span>
                          <span className="font-display text-lg font-semibold uppercase leading-none">{d.q}</span>
                        </span>
                        <span aria-hidden className="font-mono text-lg text-cobalt transition-transform duration-200 group-open:rotate-45">
                          +
                        </span>
                      </summary>
                      <p className="border-t border-ink/15 px-4 py-3.5 text-[14.5px] leading-relaxed">{d.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            </Reveal>
          )}

          {/* repo inside — the project's README rendered in a real iframe */}
          <Reveal className="mt-12">
            <section>
              <h2 className="font-display text-3xl font-semibold uppercase">
                THE REPO, <span className="text-cobalt">INSIDE</span>
              </h2>
              <p className="mt-2 max-w-[56ch] text-[15px] text-muted-foreground">
                Not a screenshot — a live iframe pulling this repo&apos;s README straight from the CDN.
              </p>
              <div className="mt-5">
                <RepoFrame src={study.readme} />
              </div>
            </section>
          </Reveal>

          <Reveal className="mt-12">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <a
                href={study.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 border-2 border-ink bg-saffron px-6 py-3.5 font-mono text-sm tracking-wider shadow-hard transition-[transform,box-shadow] duration-150 ease-out hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0_0_#051024] active:scale-[0.97]"
              >
                VIEW ON GITHUB <span aria-hidden>↗</span>
              </a>
              <VtLink href={`/work/${next.slug}`} className="group inline-flex items-center gap-3 font-mono text-sm tracking-wider">
                NEXT: <span className="font-display text-2xl font-semibold uppercase text-cobalt">{next.title}</span>
                <span aria-hidden className="transition-transform duration-200 ease-out group-hover:translate-x-1">→</span>
              </VtLink>
            </div>
          </Reveal>
        </article>
      </main>
    </SiteShell>
  );
}
