import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = {
  title: "Testing — Pratham Nahata",
  description:
    "This portfolio is tested like a product: Playwright 19 flows, vitest 9 units, zero console errors, lint + tsc gates.",
};

const SUITES = [
  {
    name: "SMOKE (Playwright)",
    flows: [
      "all routes load directly (8 pages + 4 case studies)",
      "client-side navigation via nav + CTAs",
      "resume page embeds the PDF viewer",
      "404 page renders the peacock flock",
      "mobile menu opens and navigates",
      "mobile viewport renders hero content",
    ],
  },
  {
    name: "INTERACTION (Playwright)",
    flows: [
      "dialog opens as temporary reality and closes",
      "timeline machine scrubs between years",
      "case page counterfactuals expand",
      "dive-deeper descends four layers",
      "repo-inside iframe renders the README",
      "annotations open contextual popovers",
      "unresolved section descends into unknowns",
      "process principles reveal WHY IT MATTERS",
      "NOW BUILDING widget shows live GitHub + IST clock",
      "contribution graph renders the year in commits",
      "case pages offer STAR THE REPO",
      "dark mode toggles, persists across reloads",
    ],
  },
  {
    name: "UNIT (Vitest)",
    flows: ["9 tests across profile data + easing library"],
  },
  {
    name: "GATES",
    flows: ["next build (SSG) · eslint · tsc --noEmit · vitest · playwright — all green per wave"],
  },
];

export default function TestingPage() {
  return (
    <SiteShell>
      <main id="main" className="flex-1 pt-[96px]">
        <section className="px-[clamp(20px,4vw,48px)] pb-[clamp(64px,8vh,110px)]">
          <Reveal>
            <p className="mb-4 inline-block border-2 border-ink bg-saffron px-3 py-1.5 font-mono text-xs tracking-[0.12em] text-ink shadow-[3px_3px_0_0_var(--shadow-ink)]">
              TESTED LIKE A PRODUCT
            </p>
            <h1 className="font-display text-[clamp(3.2rem,9vw,8rem)] font-semibold uppercase leading-[0.86]">
              TEST <span className="text-cobalt">MATRIX</span>
            </h1>
            <p className="mt-4 max-w-[56ch] text-lg font-medium leading-relaxed">
              This portfolio is tested like a product — <strong>Playwright · 19 flows · 0 console errors</strong>,
              plus unit tests, lint and type gates on every wave.
            </p>
          </Reveal>

          <div className="mt-10 space-y-8">
            {SUITES.map((s) => (
              <Reveal key={s.name}>
                <section className="border-2 border-ink bg-paper-2 p-[clamp(18px,2.5vw,28px)] shadow-hard">
                  <h2 className="font-display text-2xl font-semibold uppercase">{s.name}</h2>
                  <ul className="mt-4 grid gap-2 md:grid-cols-2">
                    {s.flows.map((f) => (
                      <li key={f} className="flex items-baseline gap-2 border-b border-ink/15 pb-2 font-mono text-[12.5px] tracking-wide">
                        <span aria-hidden className="size-2 flex-none rounded-full bg-mint" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8">
            <p className="max-w-[70ch] font-mono text-[12px] leading-relaxed tracking-wider text-muted-foreground">
              <span className="text-cobalt">▸</span> RUN IT YOURSELF: <code className="bg-paper-2 px-1">npx playwright test</code>{" "}
              · <code className="bg-paper-2 px-1">npx vitest run</code> — every flow asserts zero console/page errors, not just
              visible elements. The build log lives at <Link href="/progress" className="text-cobalt underline underline-offset-4">/progress</Link>.
            </p>
          </Reveal>
        </section>
      </main>
    </SiteShell>
  );
}
