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
  { piece: "QA gates", wave: "3", status: "DONE", note: "vitest 9/9 · lint · tsc · Playwright 5/5 · LH 81/100/96/100" },
  { piece: "Vision critic loop", wave: "6", status: "PAUSED", note: "gemini daily quota hit — rounds resume next session (key installed: GEMINI_API_KEY)" },
  { piece: "Auto-deploy + domain", wave: "7", status: "PENDING", note: "Vercel git integration, custom domain" },
];

const ESTIMATE = 55; // user: 45% at wave 5 → this wave advances metro + process

export default function ProgressPage() {
  return (
    <SiteShell>
      <main id="main" className="flex-1 pt-[110px]">
        <section className="px-[clamp(20px,4vw,48px)] pb-[clamp(64px,8vh,110px)]">
          <Reveal>
            <p className="mb-4 inline-block border border-ink bg-saffron px-3 py-1.5 font-mono text-xs tracking-[0.12em] shadow-[3px_3px_0_0_#051024]">
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
