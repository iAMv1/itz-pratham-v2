"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { MehndiField } from "@/components/canvas/fields";
import { useLatestRepos, langColor } from "@/data/github";
import { profile } from "@/data/profile";

function relativeTime(iso: string): string {
  if (!iso) return "";
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

export function Contact() {
  const { repos, source } = useLatestRepos();
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden border-t-2 border-ink bg-paper px-[clamp(20px,4vw,48px)] py-[clamp(64px,8vh,110px)]">
      <MehndiField className="pointer-events-none absolute inset-0 z-0 h-full w-full" />
      <span aria-hidden className="pointer-events-none absolute -left-[15%] top-[-20%] h-[60%] w-[60%] rounded-full bg-cobalt/10 blur-[120px]" />
      <div className="relative z-10 grid items-start gap-[clamp(28px,4vw,64px)] lg:grid-cols-[1.35fr_1fr]">
        <div>
          <Reveal>
            <p className="mb-4 inline-block border-2 border-ink bg-saffron px-3 py-1.5 font-mono text-xs tracking-[0.12em] text-ink shadow-[3px_3px_0_0_#051024]">
              07 · LET&apos;S TALK
            </p>
            <h2 className="font-display text-[clamp(3.2rem,9vw,8rem)] font-semibold uppercase leading-[0.86]">
              LET&apos;S BUILD
              <br />
              <span className="text-saffron-deep">SOMETHING REAL</span>
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
              <button
                type="button"
                onClick={copyEmail}
                aria-label="Copy email address to clipboard"
                className="relative inline-flex min-w-[min(320px,100%)] items-center justify-center gap-2.5 border-2 border-ink bg-saffron px-8 py-5 font-mono text-[17px] font-medium tracking-wide text-ink shadow-[4px_4px_0_0_#051024] transition-[transform,box-shadow] duration-150 ease-out hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#051024] active:scale-[0.97]"
              >
                {copied ? "COPIED ✓" : profile.email} <span aria-hidden>{copied ? "" : "→"}</span>
              </button>
              <p role="status" aria-live="polite" className="sr-only">
                {copied ? "Email copied to clipboard" : ""}
              </p>
              <a
                href={profile.resume}
                className="inline-flex min-w-[min(320px,100%)] items-center justify-center gap-2.5 border-2 border-ink px-8 py-5 font-mono text-[17px] tracking-wide text-ink transition-colors duration-200 hover:bg-ink hover:text-paper active:scale-[0.97]"
              >
                Download resume <span aria-hidden>↗</span>
              </a>
            </div>
            <p aria-hidden className="pointer-events-none absolute bottom-[clamp(24px,5vh,60px)] left-[clamp(20px,4vw,48px)] z-0 rotate-[-3deg] font-dev text-[clamp(1.6rem,3vw,2.6rem)] text-saffron-deep/70">
              शुक्रिया
            </p>
            <ul className="flex flex-wrap gap-x-12 gap-y-3 font-mono text-sm tracking-wider">
              {[
                { href: profile.links.github, label: "GITHUB ↗" },
                { href: profile.links.linkedin, label: "LINKEDIN ↗" },
                { href: profile.links.email, label: "EMAIL ↗" },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="relative py-1.5 transition-colors hover:text-saffron-deep after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-right after:scale-x-0 after:bg-saffron-deep after:transition-transform after:duration-200 after:ease-out hover:after:origin-left hover:after:scale-x-100"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:sticky lg:top-[110px] lg:space-y-6">
          <div className="w-full border-2 border-ink bg-paper-2 p-[clamp(16px,2.5vw,24px)] shadow-hard">
            <p className="flex items-center gap-2 font-mono text-xs tracking-[0.1em] text-cobalt">
              <span
                aria-hidden
                className={`size-2 rounded-full ${source === "live" ? "animate-pulse bg-mint shadow-[0_0_0_3px_rgba(141,226,84,0.25)]" : "bg-ink/25"}`}
              />
              <span>
                {source === "live" ? "LIVE" : "CACHED"} — FROM{" "}
                <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="underline underline-offset-3">
                  GITHUB
                </a>
              </span>
            </p>
            <ul className="mt-3.5 flex flex-col gap-2.5 font-mono text-[12.5px]">
              {repos.map((r) => (
                <li key={r.name} className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
                  <span aria-hidden className="size-2 rounded-full" style={{ background: langColor[r.language ?? ""] ?? "#A8A8A8" }} />
                  <a href={`${profile.links.github}/${r.name}`} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-saffron-deep">
                    {r.name}
                  </a>
                  <span className="flex items-center gap-2 text-[11px] tabular-nums text-ink/50">
                    {r.stars > 0 && <span title="GitHub stars">★ {r.stars}</span>}
                    {mounted && r.pushed_at ? relativeTime(r.pushed_at) : ""}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
