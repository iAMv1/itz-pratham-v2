import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { SiteShell } from "@/components/layout/site-shell";
import { progressEntries } from "@/content/meta";

export const metadata: Metadata = { title: "Build Log — Pratham Nahata", description: "The public build log of this portfolio — every wave documented: brand, structure, interaction layer, dark mode, SEO." };

export default function ProgressPage() {
  const PIECES = progressEntries();
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
            <p className="font-mono text-[12.5px] tracking-wider text-muted-foreground">
              <span className="text-cobalt">▸</span> THE BAR: every piece ships, verifies, and lands — measured
              numbers live on the process page, the test matrix at /testing.
            </p>
          </Reveal>
        </section>
      </main>
    </SiteShell>
  );
}
