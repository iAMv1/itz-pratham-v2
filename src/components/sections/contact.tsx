"use client";

import { Reveal } from "@/components/motion/reveal";
import { MehndiField } from "@/components/canvas/fields";
import { useLatestRepos, langColor } from "@/data/github";
import { profile } from "@/data/profile";

export function Contact() {
  const repos = useLatestRepos();

  return (
    <section id="contact" className="bg-jali-dark relative border-t-2 border-ink bg-ink-2 px-[clamp(20px,4vw,48px)] py-[clamp(64px,8vh,110px)] text-paper">
      <MehndiField className="pointer-events-none absolute inset-0 z-0 h-full w-full" />
      <div className="relative z-10 grid items-start gap-[clamp(28px,4vw,64px)] lg:grid-cols-[1.35fr_1fr]">
        <div>
          <Reveal>
            <p className="mb-4 inline-block border border-paper bg-ink-2 px-3 py-1.5 font-mono text-xs tracking-[0.12em] shadow-[3px_3px_0_0_#F58E20]">
              07 · LET&apos;S TALK
            </p>
            <h2 className="font-display text-[clamp(3.2rem,9vw,8rem)] font-semibold uppercase leading-[0.86]">
              LET&apos;S BUILD
              <br />
              <span className="text-saffron">SOMETHING REAL</span>
            </h2>
          </Reveal>

          <Reveal>
            <p className="mt-6 max-w-[44ch] text-lg font-medium leading-relaxed">
              A product, a model, a website, a hackathon team — my inbox is open for things that deserve to feel alive.
              Tell me what you&apos;re building.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-8 space-y-5">
            <div className="flex flex-col items-start gap-4">
              <a
                href={profile.links.email}
                className="inline-flex min-w-[min(320px,100%)] items-center justify-center gap-2.5 border-2 border-paper bg-saffron px-8 py-5 font-mono text-[17px] font-medium tracking-wide text-ink shadow-[4px_4px_0_0_#F4EFE6] transition-[transform,box-shadow] duration-150 ease-out hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#F4EFE6] active:scale-[0.97]"
              >
                {profile.email} <span aria-hidden>→</span>
              </a>
              <a
                href={profile.resume}
                className="inline-flex min-w-[min(320px,100%)] items-center justify-center gap-2.5 border-2 border-paper px-8 py-5 font-mono text-[17px] tracking-wide text-paper transition-colors duration-200 hover:bg-paper hover:text-ink active:scale-[0.97]"
              >
                Download resume <span aria-hidden>↗</span>
              </a>
            </div>
            <ul className="flex flex-wrap gap-x-12 gap-y-3 font-mono text-sm tracking-wider">
              {[
                { href: profile.links.github, label: "GITHUB ↗" },
                { href: profile.links.linkedin, label: "LINKEDIN ↗" },
                { href: profile.links.email, label: "EMAIL ↗" },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="relative py-1.5 transition-colors hover:text-marigold after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-right after:scale-x-0 after:bg-marigold after:transition-transform after:duration-200 after:ease-out hover:after:origin-left hover:after:scale-x-100"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:sticky lg:top-[110px] lg:space-y-6">
          <p aria-hidden className="rotate-[-3deg] font-dev text-[clamp(2.6rem,4.5vw,4rem)] text-saffron">
            शुक्रिया
          </p>
          <div className="w-full border border-paper/25 bg-paper/[0.04] p-[clamp(16px,2.5vw,24px)]">
            <p className="font-mono text-xs tracking-[0.1em] text-mint">
              ▸ NOW SHIPPING — LIVE FROM{" "}
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="underline underline-offset-3">
                GITHUB
              </a>
            </p>
            <ul className="mt-3.5 flex flex-col gap-2.5 font-mono text-[12.5px]">
              {repos.map((r) => (
                <li key={r.name} className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
                  <span aria-hidden className="size-2 rounded-full" style={{ background: langColor[r.language ?? ""] ?? "#A8A8A8" }} />
                  <a href={`${profile.links.github}/${r.name}`} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-marigold">
                    {r.name}
                  </a>
                  <span className="text-[11px] tabular-nums text-paper/50">{r.pushed_at ? r.pushed_at.slice(0, 10) : ""}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
