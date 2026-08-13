"use client";

import Link from "next/link";
import { ArtImage } from "@/components/ui/art-image";
import { useRealityClose } from "@/components/ui/reality-dialog";
import type { Project } from "@/content/projects";

/** QuickView — the dialog's temporary reality: full project context without leaving the page. */
export function ProjectQuickView({ study }: { study: Project }) {
  const close = useRealityClose();
  return (
    <div className="max-h-[88vh] overflow-y-auto">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b-2 border-ink bg-paper px-5 py-3">
        <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
          TEMPORARY REALITY · {study.index} · {study.year}
        </p>
        <button
          type="button"
          onClick={close}
          className="border-2 border-ink px-2.5 py-1 font-mono text-xs tracking-widest transition-colors hover:bg-ink hover:text-paper"
        >
          CLOSE ✕
        </button>
      </div>

      <div className="relative aspect-[16/7] overflow-hidden border-b-2 border-ink bg-paper">
        <ArtImage src={study.screenshot ?? study.art} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <span className="absolute left-3 top-3 border border-ink bg-paper-2/90 px-2 py-1 font-mono text-[10px] tracking-widest">
          {study.title}
        </span>
      </div>

      <div className="space-y-5 p-[clamp(18px,3vw,32px)]">
        <div>
          <p className="font-mono text-[11px] tracking-widest text-cobalt">{study.role}</p>
          <h3 className="mt-1 font-display text-3xl font-semibold uppercase leading-none">{study.title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed">{study.blurb}</p>
          <p className="mt-1.5 font-mono text-[11.5px] leading-snug tracking-wide text-saffron-deep">
            ▸ {study.outcome}
          </p>
        </div>

        <div>
          <p className="mb-2 font-mono text-[11px] tracking-widest text-muted-foreground">IMPACT</p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {study.impact.map((im) => (
              <li key={im} className="flex items-baseline gap-2 border-b border-ink/15 pb-2 font-mono text-[12px] tracking-wide">
                <span aria-hidden className="size-2 flex-none rounded-full" style={{ background: study.accent }} />
                {im}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2">
          {study.stack.map((s) => (
            <span key={s} className="border border-ink bg-paper px-2 py-1 font-mono text-[10.5px] tracking-wider">
              {s}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4 border-t-2 border-ink pt-4">
          <a
            href={study.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-ink bg-saffron px-5 py-2.5 font-mono text-sm tracking-wider shadow-[3px_3px_0_0_var(--shadow-ink)] transition-[transform,box-shadow] duration-150 ease-out hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_0_var(--shadow-ink)]"
          >
            GITHUB <span aria-hidden>↗</span>
          </a>
          <Link
            href={`/work/${study.slug}`}
            onClick={close}
            className="inline-flex items-center gap-2 border-2 border-ink px-5 py-2.5 font-mono text-sm tracking-wider transition-colors hover:bg-ink hover:text-paper"
          >
            OPEN FULL CASE <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
