import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = { title: "Build Log — Pratham Nahata", description: "The public build log of this portfolio — every wave documented: brand, structure, interaction layer, dark mode, SEO." };

const PIECES = [
  { piece: "Brand foundation", wave: "0", status: "DONE", note: "identity palette, logo system" },
  { piece: "Multi-page structure", wave: "0", status: "DONE", note: "8 routes + 4 case studies, all 200, e2e locked" },
  { piece: "Hero (cinematic)", wave: "1", status: "DONE", note: "parallax, magnetic, char reveal" },
  { piece: "Case studies", wave: "1", status: "DONE", note: "system flow, narrative structure" },
  { piece: "Work index", wave: "2", status: "DONE", note: "kinetic art, floating stats, quick-view dialogs" },
  { piece: "Process page", wave: "6", status: "DONE", note: "scroll-executed terminal session, synced rail, evidence-linked steps" },
  { piece: "Contact page", wave: "2", status: "DONE", note: "copy-email, live GitHub feed with star counts" },
  { piece: "Navbar", wave: "4", status: "DONE", note: "sheet menu, 44px targets, theme toggle — e2e verified" },
  { piece: "Metro map", wave: "6", status: "DONE", note: "DMRC casing, roundels, moving trains, interchange corridor" },
  { piece: "Error pages", wave: "3", status: "DONE", note: "404 peacock + 500 haveli-coughed" },
  { piece: "Navigation crash", wave: "3", status: "DONE", note: "preloader DOM race fixed; e2e locked" },
  { piece: "QA gates", wave: "3", status: "DONE", note: "vitest 9/9 · lint · tsc · Playwright 19/19 · Lighthouse 100 a11y / 100 bp / 100 seo" },
  { piece: "Second Layer (wave 7)", wave: "7", status: "DONE", note: "dialog reality quickviews, popover annotations, timeline machine, unresolved deep-dives, case counterfactuals, offline archive" },
  { piece: "Second Layer v2", wave: "7", status: "DONE", note: "dive-deeper knowledge, repo-inside README iframes, view transitions, offline banner" },
  { piece: "Live data wave", wave: "9", status: "DONE", note: "NOW BUILDING card, contribution graph, repo stars, IST clocks, OFF THE CLOCK strip" },
  { piece: "Dark / light mode", wave: "10", status: "DONE", note: "token-level theme inversion, toggle, theme-aware canvases" },
  { piece: "SEO wave", wave: "11", status: "DONE", note: "og-image PNG, JSON-LD, per-page metadata, sitemap, robots, embedded resume viewer" },
  { piece: "Positioning wave", wave: "12", status: "DONE", note: "engineering-first identity, narrative case structure, evidence receipts, contextualized stats" },
  { piece: "Domain + deploy", wave: "7", status: "DONE", note: "itzpratham.in live — automated deploy pipeline re-points aliases and verifies each build" },
];

export default function ProgressPage() {
  return (
    <SiteShell>
      <main id="main" className="flex-1 pt-[110px]">
        <section className="px-[clamp(20px,4vw,48px)] pb-[clamp(64px,8vh,110px)]">
          <Reveal>
            <p className="mb-4 inline-block border border-ink bg-saffron px-3 py-1.5 font-mono text-xs tracking-[0.12em] shadow-[3px_3px_0_0_var(--shadow-ink)]">
              LIVE · PUBLIC BUILD LOG
            </p>
            <h1 className="font-display text-[clamp(3.2rem,9vw,8rem)] font-semibold uppercase leading-[0.86]">
              BUILD<br />
              <span className="text-cobalt">LOG</span>
            </h1>
            <p className="mt-6 max-w-[52ch] text-lg font-medium leading-relaxed">
              This portfolio is built in public — every wave documented here, from identity to SEO. The site itself is
              the artifact; this page is the changelog.
            </p>
          </Reveal>

          <div className="mt-10 overflow-x-auto border-2 border-ink bg-paper-2 shadow-hard">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-ink font-mono text-[11px] tracking-widest text-muted-foreground">
                  <th className="px-4 py-3">PIECE</th>
                  <th className="px-4 py-3">WAVE</th>
                  <th className="px-4 py-3">STATUS</th>
                  <th className="px-4 py-3">NOTE</th>
                </tr>
              </thead>
              <tbody>
                {PIECES.map((p) => (
                  <tr key={p.piece} className="border-b border-ink/15 last:border-0">
                    <td className="px-4 py-3 font-medium">{p.piece}</td>
                    <td className="px-4 py-3 font-mono text-xs">{p.wave}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 font-mono text-[10.5px] tracking-widest ${
                          p.status === "DONE"
                            ? "bg-mint text-ink"
                            : p.status === "IN LOOP"
                              ? "bg-saffron text-ink"
                              : "border border-ink text-muted-foreground"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[13.5px] text-muted-foreground">{p.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Reveal className="mt-10">
            <p className="font-mono text-sm tracking-wider">
              BAR — every piece must beat its reference in blind A/B by <strong className="text-saffron-deep">≥20%</strong>{" "}
              per loop, or the builder goes back in. Full rules in <span className="text-cobalt">docs/GAUNTLET.md</span>.
            </p>
          </Reveal>
        </section>
      </main>
    </SiteShell>
  );
}
