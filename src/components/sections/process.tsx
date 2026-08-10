"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { AnnotationCard } from "@/components/annotations/annotation-card";
import { JaliField } from "@/components/canvas/fields";
import { profile } from "@/data/profile";

function TerminalLine({ kind, text, num, cursor }: { kind: string; text: string; num?: string; cursor?: boolean }) {
  if (kind === "comment")
    return (
      <span className="text-paper/35">
        <span className="block">{text}</span>
      </span>
    );
  if (kind === "cmd") return <CmdLine text={text} cursor={cursor} />;
  if (kind === "step")
    return (
      <span className="block">
        <span className="font-medium text-marigold">{num}</span>  {text}
      </span>
    );
  return <span className="block text-mint">{text}</span>;
}

/** Types the command out when the terminal scrolls into view. */
function CmdLine({ text, cursor }: { text: string; cursor?: boolean }) {
  const [typed, setTyped] = useState("");
  useEffect(() => {
    let i = 0;
    let done = false;
    const el = document.querySelector(".terminal-cmd");
    if (!el || !("IntersectionObserver" in window)) {
      const raf = requestAnimationFrame(() => setTyped(text));
      return () => cancelAnimationFrame(raf);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || done) return;
        done = true;
        io.disconnect();
        const id = window.setInterval(() => {
          i += 1;
          setTyped(text.slice(0, i));
          if (i >= text.length) window.clearInterval(id);
        }, 28);
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [text]);

  return (
    <span className="terminal-cmd text-paper">
      <span className="font-medium text-mint">pratham@nahata</span>
      <span className="text-paper/40">:</span>
      <span className="text-cobalt">~/process</span>
      <span className="font-medium text-paper">$</span>{" "}
      {typed.split(" ").map((w, i) => (
        <span key={i} className={i >= 3 ? "text-marigold" : ""}>
          {w}{" "}
        </span>
      ))}
      {cursor && <span className="animate-[cursor-blink_1s_step-end_infinite] text-mint">▊</span>}
    </span>
  );
}

export function Process() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const lines = document.querySelectorAll<HTMLElement>(".terminal-line");
    if (!lines.length || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const idx = Array.prototype.indexOf.call(lines, e.target);
          setActiveStep(Math.min(idx, profile.process.steps.length - 1));
        }
      },
      { rootMargin: "0px 0px -55% 0px", threshold: 0 }
    );
    lines.forEach((l) => io.observe(l));
    return () => io.disconnect();
  }, []);

  return (
    <section id="process" className="bg-jali-dark relative border-y-2 border-ink bg-ink-2 px-[clamp(20px,4vw,48px)] py-[clamp(64px,8vh,110px)] text-paper">
      <JaliField className="pointer-events-none absolute inset-0 z-0 h-full w-full" />
      <div className="relative z-10">
        <Reveal>
          <p className="mb-4 inline-block border border-paper bg-ink-2 px-3 py-1.5 font-mono text-xs tracking-[0.12em] shadow-[3px_3px_0_0_#F58E20]">
            02 · HOW I BUILD
          </p>
          <h2 className="font-display text-[clamp(3.2rem,9vw,8rem)] font-semibold uppercase leading-[0.86]">
            THE
            <br />
            PROCESS
          </h2>
          <div className="mt-4">
            <AnnotationCard label="terminal · note" rotate={1.5} className="!bg-ink-2 !text-paper">
              yes, it&apos;s a real terminal. deal with it.
            </AnnotationCard>
          </div>
        </Reveal>

        <div className="mt-10 grid items-start gap-[clamp(24px,3vw,48px)] lg:grid-cols-[1.55fr_1fr]">
          <div className="border border-paper/25 bg-ink-2 shadow-[8px_8px_0_0_#1D5B9E]">
            <div className="flex items-center gap-2 border-b border-paper/25 px-4 py-3">
              <span className="size-3 rounded-full bg-red" />
              <span className="size-3 rounded-full bg-marigold" />
              <span className="size-3 rounded-full bg-mint" />
              <span className="ml-auto font-mono text-xs text-paper/55">{profile.process.title}</span>
            </div>
            <pre
              tabIndex={0}
              className="overflow-x-auto whitespace-pre-wrap px-[clamp(24px,5vw,44px)] py-[clamp(24px,5vw,44px)] font-mono text-[clamp(12.5px,1.5vw,15px)] leading-[2.2]"
            >
              {profile.process.lines.map((l, i) => (
                <span key={i} className="terminal-line block">
                  <TerminalLine {...l} />
                </span>
              ))}
            </pre>
            <div className="flex items-center justify-between gap-4 border-t border-paper/20 px-4 py-2.5 font-mono text-[11px] text-paper/55">
              <span className="flex items-center gap-2 text-mint">
                <span className="size-2 rounded-full bg-mint" /> READY
              </span>
              <span>~/process · 6 LINES · UTF-8</span>
            </div>
          </div>

          <ol className="lg:sticky lg:top-[110px]">
            {profile.process.steps.map((s, i) => (
              <li
                key={s.num}
                className={`flex gap-4 border-l-2 px-5 py-3.5 transition-opacity duration-250 ${
                  activeStep === i ? "border-l-saffron opacity-100" : "border-l-paper/15 opacity-25"
                }`}
              >
                <span className={`font-mono text-xl ${activeStep === i ? "text-saffron" : "text-paper/40"}`}>
                  {s.num}
                </span>
                <span>
                  <strong className="block font-mono text-[13px] tracking-[0.1em] text-paper">{s.title}</strong>
                  <small className="font-mono text-[11px] tracking-wide text-paper/45">{s.sub}</small>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <ul className="mt-10 flex flex-wrap gap-x-10 gap-y-3 font-mono text-sm text-paper/80">
          {profile.process.tools.map((t) => (
            <li key={t}>
              <span className="text-mint">▸ </span>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
