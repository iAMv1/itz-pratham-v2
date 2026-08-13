import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { MehndiField } from "@/components/canvas/fields";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = { title: "Resume — Pratham Nahata" };

const RESUME = "/assets/Pratham_Nahata_Resume_ATS.pdf";

export default function ResumePage() {
  return (
    <SiteShell>
      <main id="main" className="flex-1 pt-[96px]">
        <section className="page-dusk-rose relative overflow-clip px-[clamp(20px,4vw,48px)] pb-[clamp(64px,8vh,110px)]">
          <MehndiField className="pointer-events-none absolute inset-0 z-0 h-full w-full" />
          <div className="relative z-10">
          <Reveal>
            <p className="mb-4 inline-block border-2 border-ink bg-saffron px-3 py-1.5 font-mono text-xs tracking-[0.12em] text-ink shadow-[3px_3px_0_0_var(--shadow-ink)]">
              RESUME · THE ONE-PAGER
            </p>
            <h1 className="font-display text-[clamp(3.2rem,9vw,8rem)] font-semibold uppercase leading-[0.86]">
              RESUME
            </h1>
            <p className="mt-4 max-w-[52ch] text-lg font-medium leading-relaxed">
              The full story on one page — read it here, download it, or send it to whoever needs receipts.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-8">
            <div className="border-2 border-ink bg-paper-2 p-[clamp(10px,1.6vw,18px)] shadow-hard">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3 border-b-2 border-ink pb-3">
                <p className="font-mono text-[11px] tracking-widest text-muted-foreground">
                  PRATHAM_NAHATA_RESUME_ATS.PDF · VIEWER
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={RESUME}
                    download
                    className="inline-flex items-center gap-2 border-2 border-ink bg-saffron px-4 py-2 font-mono text-xs tracking-wider text-ink shadow-[3px_3px_0_0_var(--shadow-ink)] transition-[transform,box-shadow] duration-150 ease-out hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_0_var(--shadow-ink)] active:scale-[0.97]"
                  >
                    DOWNLOAD PDF (PDF) <span aria-hidden>↓</span>
                  </a>
                  <a
                    href={RESUME}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border-2 border-ink px-4 py-2 font-mono text-xs tracking-wider transition-colors duration-200 hover:bg-ink hover:text-paper active:scale-[0.97]"
                  >
                    OPEN IN TAB <span aria-hidden>↗</span>
                  </a>
                </div>
              </div>
              <iframe
                src={RESUME}
                title="Pratham Nahata resume"
                className="h-[min(78vh,820px)] w-full border-2 border-ink bg-paper"
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal delay={0.12} className="mt-6">
            <p className="max-w-[60ch] font-mono text-[12px] leading-relaxed tracking-wider text-muted-foreground">
              <span className="text-cobalt">▸</span> ATS-SAFE · ONE PAGE · UTF-8 — the PDF renders natively in your
              browser; on phones, use OPEN IN TAB for the best view.
            </p>
          </Reveal>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
