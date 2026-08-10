import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = { title: "Progress — Pratham Nahata" };

const PIECES = [
  { piece: "Brand foundation", wave: "0", status: "DONE", note: "BRAND.md, logo system, palette roles, voice" },
  { piece: "Multi-page structure", wave: "0", status: "DONE", note: "/ /work /work/[slug] /about /process /contact /progress" },
  { piece: "Hero (cinematic)", wave: "1", status: "IN LOOP", note: "blind A/B vs Awwwards bars" },
  { piece: "Work index + case studies", wave: "1", status: "IN LOOP", note: "4 studies, arch windows, impact metrics" },
  { piece: "About: metro map + rangoli", wave: "2", status: "PENDING", note: "Delhi Metro career map, contribution bandhani" },
  { piece: "Process page", wave: "2", status: "PENDING", note: "terminal + steps + principles" },
  { piece: "404 + mascot", wave: "2", status: "DONE", note: "peacock flock, cursor-tracking mascot" },
  { piece: "Motion polish (20%/wave)", wave: "3", status: "PENDING", note: "per-loop gain bar vs Awwwards refs" },
  { piece: "QA gates", wave: "3", status: "PENDING", note: "vitest, playwright smoke, Lighthouse" },
  { piece: "Auto-deploy + domain", wave: "4", status: "PENDING", note: "Vercel git integration, custom domain" },
];

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
              Every piece is built, screenshot-rendered, and blind-A/B&apos;d against Awwwards-level references by an
              independent critic. A piece ships only after two clean rounds. Updated live as the loop runs.
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
