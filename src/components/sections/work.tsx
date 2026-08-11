"use client";

import { Reveal } from "@/components/motion/reveal";
import { Tilt } from "@/components/motion/tilt";
import { profile } from "@/data/profile";

function ArtImage({ src, alt }: { src: string; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={640}
      height={384}
      loading="lazy"
      onError={(e) => (e.currentTarget.style.display = "none")}
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}

const ArchSvg = () => (
  <svg viewBox="0 0 200 90" preserveAspectRatio="none" aria-hidden className="block h-auto w-full">
    <path d="M20 90 V50 C20 26 56 14 100 14 C144 14 180 26 180 50 V90" fill="none" stroke="#1D5B9E" strokeWidth="3" />
    <path d="M100 14 V4 M100 4 L108 12 L100 18 L92 12 Z" fill="none" stroke="#1D5B9E" strokeWidth="2" />
    <circle cx="100" cy="7" r="2.5" fill="#F58E20" />
  </svg>
);

function ProjCard({ p, index }: { p: (typeof profile.projects)[number]; index: number }) {
  return (
    <Reveal delay={index * 0.08} className="h-full">
      <a
        href={p.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-full flex-col border-2 border-ink bg-paper-2 shadow-hard transition-[transform,box-shadow] duration-250 ease-out hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[8px_8px_0_0_var(--shadow-ink)] active:scale-[0.99]"
      >
        <span className="border-b-2 border-ink bg-paper">
          <ArchSvg />
        </span>
        <Tilt className="relative aspect-[640/384] overflow-hidden border-b-2 border-ink bg-paper">
          <ArtImage src={p.art} alt="" />
        </Tilt>
        <span className="flex flex-1 flex-col gap-2 p-[clamp(18px,2.4vw,26px)]">
          <span className="font-mono text-[11px] tracking-widest text-muted-foreground">
            {p.index} — {p.year}
          </span>
          <span className="font-display text-[clamp(1.9rem,3.2vw,2.6rem)] font-semibold uppercase leading-none">
            {p.title}
          </span>
          <span className="text-[14.5px] leading-relaxed">{p.desc}</span>
          <span className="font-mono text-[11px] font-medium tracking-wider text-saffron-deep">{p.metrics}</span>
          <span className="font-mono text-[11px] tracking-wider text-muted-foreground">{p.tags}</span>
          <span className="mt-auto inline-flex items-center gap-2 pt-3 font-mono text-[12.5px] tracking-[0.1em] text-cobalt">
            VIEW REPO <span aria-hidden className="transition-transform duration-200 ease-out group-hover:translate-x-1">→</span>
          </span>
        </span>
      </a>
    </Reveal>
  );
}

export function Work() {
  const featured = profile.projects[0];
  const rest = profile.projects.slice(1);

  return (
    <section id="work" className="px-[clamp(20px,4vw,48px)] py-[clamp(64px,8vh,110px)]">
      <Reveal>
        <p className="mb-4 inline-block border border-ink bg-saffron px-3 py-1.5 font-mono text-xs tracking-[0.12em] shadow-[3px_3px_0_0_var(--shadow-ink)]">
          05 · SELECTED WORK
        </p>
        <h2 className="font-display text-[clamp(3.2rem,9vw,8rem)] font-semibold uppercase leading-[0.86]">PROJECTS</h2>
      </Reveal>

      {/* Featured split card */}
      <Reveal>
        <a
          href={featured.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-10 grid border-2 border-ink bg-paper-2 shadow-hard transition-[transform,box-shadow] duration-250 ease-out hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[8px_8px_0_0_var(--shadow-ink)] md:grid-cols-[1.15fr_1fr]"
        >
          <span className="relative aspect-[16/10] overflow-hidden border-b-2 border-ink bg-paper md:border-b-0 md:border-r-2">
            <ArtImage src={featured.art} alt="" />
          </span>
          <span className="flex flex-col gap-2 p-[clamp(20px,2.6vw,32px)]">
            <span className="font-mono text-[11px] tracking-widest text-muted-foreground">
              FEATURED — {featured.index} · {featured.year}
            </span>
            <span className="font-display text-[clamp(2.4rem,4.5vw,3.8rem)] font-semibold uppercase leading-[0.95]">
              {featured.title}
            </span>
            <span className="text-[15.5px] leading-relaxed">{featured.desc}</span>
            <span className="font-mono text-[11.5px] font-medium tracking-wider text-saffron-deep">{featured.metrics}</span>
            <span className="font-mono text-[11px] tracking-wider text-muted-foreground">{featured.tags}</span>
            <span className="mt-auto inline-flex items-center gap-2 pt-4 font-mono text-[13px] tracking-[0.1em] text-cobalt">
              VIEW REPO <span aria-hidden className="transition-transform duration-200 ease-out group-hover:translate-x-1">→</span>
            </span>
          </span>
        </a>
      </Reveal>

      {/* Arch cards */}
      <div className="mt-[clamp(28px,4vh,48px)] grid gap-[clamp(20px,3vw,40px)] md:grid-cols-2">
        {rest.map((p, i) => (
          <ProjCard key={p.title} p={p} index={i + 1} />
        ))}
        <Reveal delay={0.3} className="h-full">
          <a
            href="https://github.com/iAMv1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-full flex-col border-2 border-ink bg-paper-2 shadow-hard transition-[transform,box-shadow] duration-250 ease-out hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[8px_8px_0_0_var(--shadow-ink)] active:scale-[0.99]"
          >
            <span className="relative flex aspect-[640/384] items-center justify-center border-b-2 border-ink bg-saffron">
              <span className="text-center">
                <span className="block font-display text-[2.1rem] font-semibold uppercase leading-none">+ MORE</span>
                <span className="mt-1 block font-mono text-[11px] tracking-[0.2em]">18 REPOS ON GITHUB</span>
              </span>
            </span>
            <span className="flex flex-1 flex-col gap-2 p-[clamp(18px,2.4vw,26px)]">
              <span className="font-mono text-[11px] tracking-widest text-muted-foreground">+ ALL</span>
              <span className="font-display text-[clamp(1.9rem,3.2vw,2.6rem)] font-semibold uppercase leading-none">
                THE REST
              </span>
              <span className="text-[14.5px] leading-relaxed">
                Agent orchestration, EV prediction, an AI learning platform, security tooling and more experiments worth a look.
              </span>
              <span className="mt-auto inline-flex items-center gap-2 pt-3 font-mono text-[12.5px] tracking-[0.1em] text-cobalt">
                OPEN GITHUB <span aria-hidden>→</span>
              </span>
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
