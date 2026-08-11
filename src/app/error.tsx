"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center gap-6 overflow-hidden px-6 py-24 text-center">
      <span
        aria-hidden
        className="pointer-events-none absolute right-[-4%] top-[6%] font-dev text-[clamp(8rem,24vw,20rem)] leading-none text-ink opacity-[0.04]"
      >
        अरे
      </span>
      <p className="font-mono text-xs tracking-[0.22em] text-saffron-deep">500 · THE HAVELI COUGHED</p>
      <h1 className="font-display text-[clamp(5rem,18vw,14rem)] font-semibold uppercase leading-none">
        5<span className="text-saffron">0</span>0
      </h1>
      <p className="max-w-[40ch] text-base leading-relaxed text-muted-foreground">
        Something tripped over a wire while building this page. The servers are probably fine — this is a personal
        touch of chaos.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2.5 border-2 border-ink bg-saffron px-6 py-3.5 font-mono text-sm tracking-wider shadow-hard transition-[transform,box-shadow] duration-150 ease-out hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0_0_var(--shadow-ink)] active:scale-[0.97]"
        >
          TRY AGAIN <span aria-hidden>↻</span>
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 border-2 border-ink px-6 py-3.5 font-mono text-sm tracking-wider transition-colors duration-200 hover:bg-ink hover:text-paper active:scale-[0.97]"
        >
          Back to the haveli <span aria-hidden>→</span>
        </Link>
      </div>
    </main>
  );
}
