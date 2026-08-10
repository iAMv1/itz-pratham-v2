import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/reveal";
import { ArtImage } from "@/components/ui/art-image";
import { caseStudies } from "@/data/profile";
import { SiteShell } from "@/components/layout/site-shell";

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
                  <span key={s} className="border border-paper/30 px-2.5 py-1 font-mono text-[11px] tracking-wider text-paper/80">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <span aria-hidden className="absolute right-6 top-4 font-dev text-[clamp(3rem,8vw,7rem)] text-paper/10">
              {study.index}
            </span>
          </header>

          {/* sections */}
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <Reveal>
              <section>
                <h2 className="mb-3 font-display text-3xl font-semibold uppercase">THE PROBLEM</h2>
                <p className="border-t-2 border-ink pt-4 text-[16px] leading-relaxed">{study.challenge}</p>
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
              <Link href={`/work/${next.slug}`} className="group inline-flex items-center gap-3 font-mono text-sm tracking-wider">
                NEXT: <span className="font-display text-2xl font-semibold uppercase text-cobalt">{next.title}</span>
                <span aria-hidden className="transition-transform duration-200 ease-out group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </Reveal>
        </article>
      </main>
    </SiteShell>
  );
}
