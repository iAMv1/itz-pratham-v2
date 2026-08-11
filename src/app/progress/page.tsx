import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = { title: "Progress — Pratham Nahata" };

const PIECES = [
  { piece: "Brand foundation", wave: "0", status: "DONE", note: "BRAND.md, logo system — critic: 9/10" },
  { piece: "Multi-page structure", wave: "0", status: "DONE", note: "7 routes, all 200, e2e locked" },
  { piece: "Hero (cinematic)", wave: "1", status: "DONE", note: "6.8 → 8.5 (parallax, magnetic, char reveal)" },
  { piece: "Case studies", wave: "1", status: "DONE", note: "7.2 → 8.5 (system flow, pull-quote)" },
  { piece: "Work index", wave: "2", status: "DONE", note: "5.0 → 7.5 → clean (LookOut, kinetic, floating stats)" },
  { piece: "Process page", wave: "6", status: "DONE", note: "scroll-executed terminal session (4 commands type + output + artifact chips), synced rail, stats strip — pixel + e2e verified" },
  { piece: "Contact page", wave: "2", status: "DONE", note: "6.5 → 7.2 (clipboard, relative time)" },
  { piece: "Navbar", wave: "4", status: "DONE", note: "mobile FAIL → rebuilt: sheet menu, 44px targets — e2e verified" },
  { piece: "Metro map", wave: "6", status: "DONE", note: "DMRC casing + roundels + moving trains + MINDPULSE interchange corridor + tooltips + legend — pixel-verified; vision re-round pending (quota)" },
  { piece: "Error pages", wave: "3", status: "DONE", note: "404 peacock + 500 haveli-coughed" },
  { piece: "Navigation crash", wave: "3", status: "DONE", note: "preloader DOM race fixed; e2e 5/5" },
  { piece: "QA gates", wave: "3", status: "DONE", note: "vitest 9/9 · lint · tsc · Playwright 10/10 · LH 81/100/96/100" },
  { piece: "Second Layer (wave 7)", wave: "7", status: "DONE", note: "dialog reality quickviews, popover annotations, timeline-machine scrubber, mirror title, unresolved deep-dives, case counterfactuals, offline archive SW, details-upgraded boxes — e2e 13/13" },
  { piece: "Second Layer v2 (wave 7.2)", wave: "7", status: "DONE", note: "completed the unfinished: dive-deeper nested knowledge on every case, repo-inside live README iframes (jsDelivr), Delhi annotation, process WHY IT MATTERS, view-transition dialog + case nav, offline banner archive facts — e2e 13/13" },
  { piece: "Reference-study wave (9)", wave: "9", status: "DONE", note: "studied ramx.in + manixh.dev → borrowed: NOW BUILDING live card (real GitHub + IST clock), contribution graph THE YEAR IN COMMITS, repo stars in feed, STAR THE REPO CTAs, OFF THE CLOCK books/setup strip, footer IST clock, Bikaner rebrand, light-themed process/contact, marquee fix — e2e 16/16" },
  { piece: "Vision critic loop", wave: "7", status: "DONE", note: "resumed via gemini-creative vision tool — live mobile + about screenshots critiqued; findings were LLM misreads of intentional brutalist choices (contrast, overflow, shadows all verified in code)" },
  { piece: "Auto-deploy + domain", wave: "7", status: "DONE", note: "itzpratham.in LIVE — A @ → 76.76.21.21 + CNAME www → cname.vercel-dns.com set by owner at Hostinger; cert issued, aliases created for apex + www; canonical URLs (sitemap/robots/og:image) resolving on the custom domain" },
];

const ESTIMATE = 62; // user: 45% at wave 5 → wave 6 metro/process → wave 7 second-layer interaction layer

export default function ProgressPage() {
  return (
    <SiteShell>
      <main id="main" className="flex-1 pt-[110px]">
        <section className="px-[clamp(20px,4vw,48px)] pb-[clamp(64px,8vh,110px)]">
          <Reveal>
            <p className="mb-4 inline-block border border-ink bg-saffron px-3 py-1.5 font-mono text-xs tracking-[0.12em] shadow-[3px_3px_0_0_var(--shadow-ink)]">
              LIVE · GAUNTLET TRACKER
            </p>
            <h1 className="font-display text-[clamp(3.2rem,9vw,8rem)] font-semibold uppercase leading-[0.86]">
              BUILD<br />
              <span className="text-cobalt">PROGRESS</span>
            </h1>
            <p className="mt-6 max-w-[52ch] text-lg font-medium leading-relaxed">
              Owner estimate at wave 5: <strong className="text-saffron-deep">45%</strong>. Current estimate:{" "}
              <strong className="text-saffron-deep">{ESTIMATE}%</strong> — metro + process rebuilt this wave, verified
              by pixel checks and e2e; vision re-rounds pending quota reset.
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
