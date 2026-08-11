"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { AnnotationCard } from "@/components/annotations/annotation-card";
import { JaliField } from "@/components/canvas/fields";
import { profile } from "@/data/profile";

type Block = { num: string; cmd: string; out: string; done: boolean };

/** One terminal command: prompt types, then output fades in, then next block unlocks. */
function CmdBlock({ block, active, onDone }: { block: Block; active: boolean; onDone: () => void }) {
  const [typed, setTyped] = useState("");
  const [shown, setShown] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;
    let done = false;
    let timer: number | undefined;
    let raf: number | undefined;
    const el = rootRef.current;
    if (!el) return;
    const typeIt = () => {
      if (done) return;
      done = true;
      timer = window.setInterval(() => {
        i += 1;
        setTyped(block.cmd.slice(0, i));
        if (i >= block.cmd.length) {
          window.clearInterval(timer);
          setShown(true);
          onDone();
        }
      }, 24);
    };
    if (!("IntersectionObserver" in window)) {
      raf = requestAnimationFrame(() => {
        setTyped(block.cmd);
        setShown(true);
        onDone();
      });
      return () => cancelAnimationFrame(raf!);
    }
    /* if already in viewport on mount (e.g. headless/no-IO environments), type immediately */
    if (el.getBoundingClientRect().top < window.innerHeight) {
      raf = requestAnimationFrame(typeIt);
      return () => {
        cancelAnimationFrame(raf!);
        if (timer !== undefined) window.clearInterval(timer);
      };
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) typeIt();
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer !== undefined) window.clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [block.cmd]);

  return (
    <div ref={rootRef} className={`block border-l-2 pl-4 transition-opacity duration-300 ${active ? "border-l-saffron opacity-100" : "border-l-ink/20 opacity-60"}`}>
      <p className="text-ink">
        <span className="font-medium text-cobalt">pratham@nahata</span>
        <span className="text-ink/60">:</span>
        <span className="text-saffron-deep">~/process</span>
        <span className="font-medium text-ink">$</span>{" "}
        <span className="text-saffron-deep">{typed}</span>
        {!shown && <span className="ml-0.5 animate-[cursor-blink_1s_step-end_infinite] bg-cobalt">▊</span>}
      </p>
      {shown && (
        <p className="mt-1 text-ink/70 transition-opacity duration-500">{block.out}</p>
      )}
    </div>
  );
}

export function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const [blocks, setBlocks] = useState<Block[]>(
    () => profile.process.steps.map((s) => ({ num: s.num, cmd: s.cmd, out: s.out, done: false }))
  );

  const markDone = (idx: number) =>
    setBlocks((prev) => prev.map((b, i) => (i === idx ? { ...b, done: true } : b)));

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".process-block");
    if (!els.length || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const idx = Array.prototype.indexOf.call(els, e.target);
          if (idx >= 0) setActiveStep(Math.min(idx, profile.process.steps.length - 1));
        }
      },
      { rootMargin: "0px 0px -45% 0px", threshold: 0.2 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="process" className="relative border-y-2 border-ink bg-paper px-[clamp(20px,4vw,48px)] py-[clamp(64px,8vh,110px)]">
      <JaliField className="pointer-events-none absolute inset-0 z-0 h-full w-full" />
      <div className="relative z-10">
        <Reveal>
          <p className="mb-4 inline-block border-2 border-ink bg-saffron px-3 py-1.5 font-mono text-xs tracking-[0.12em] text-ink shadow-[3px_3px_0_0_var(--shadow-ink)]">
            02 · HOW I BUILD
          </p>
          <h1 className="font-display text-[clamp(3.2rem,9vw,8rem)] font-semibold uppercase leading-[0.86]">
            THE
            <br />
            PROCESS
          </h1>
          <div className="mt-4">
            <AnnotationCard label="terminal · note" rotate={1.5} className="!bg-paper-2 !text-ink">
              watch the session run — scroll and the commands execute
            </AnnotationCard>
          </div>
        </Reveal>

        <div className="mt-10 grid items-start gap-[clamp(24px,3vw,48px)] lg:grid-cols-[1.55fr_1fr]">
          {/* terminal session */}
          <div className="border-2 border-ink bg-paper-2 shadow-[8px_8px_0_0_#1D5B9E]">
            <div className="flex items-center gap-2 border-b-2 border-ink px-4 py-3">
              <span className="size-3 rounded-full border border-ink bg-red" />
              <span className="size-3 rounded-full border border-ink bg-marigold" />
              <span className="size-3 rounded-full border border-ink bg-mint" />
              <span className="ml-auto font-mono text-xs text-ink/70">{profile.process.title}</span>
            </div>
            <div className="flex flex-col gap-5 px-[clamp(20px,4vw,34px)] py-[clamp(20px,4vw,34px)] font-mono text-[clamp(12.5px,1.5vw,15px)] leading-[1.9]">
              <p className="text-ink/60"># shipping production systems since 2023</p>
              <p className="text-ink/65"># काम में विश्वास — faith in the work</p>
              {profile.process.steps.map((s, i) => (
                <div key={s.num} className="process-block">
                  <CmdBlock
                    block={blocks[i]}
                    active={activeStep === i}
                    onDone={() => markDone(i)}
                  />
                  {blocks[i].done && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {s.artifacts.map((a) => (
                        <span key={a} className="border border-cobalt/50 px-2 py-0.5 text-[10px] tracking-wider text-cobalt">
                          {a}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <p className="text-cobalt">✓ done in 2 weeks, not 2 months — you keep the source, I keep shipping</p>
            </div>
            <div className="flex items-center justify-between gap-4 border-t-2 border-ink px-4 py-2.5 font-mono text-[11px] text-ink/70">
              <span className="flex items-center gap-2 text-cobalt">
                <span className="size-2 rounded-full border border-ink bg-mint" /> READY
              </span>
              <span>~/process · 4 COMMANDS · UTF-8</span>
            </div>
          </div>

          {/* steps rail */}
          <ol className="lg:sticky lg:top-[110px]">
            {profile.process.steps.map((s, i) => (
              <li
                key={s.num}
                className={`flex gap-4 border-l-2 px-5 py-3.5 transition-opacity duration-250 ${
                  activeStep === i ? "border-l-saffron opacity-100" : "border-l-ink/15 opacity-30"
                }`}
              >
                <span className={`font-mono text-xl ${activeStep === i ? "text-saffron-deep" : "text-ink/60"}`}>
                  {s.num}
                </span>
                <span>
                  <strong className="block font-mono text-[13px] tracking-[0.1em] text-ink">{s.title}</strong>
                  <small className="font-mono text-[11px] tracking-wide text-ink/60">{s.sub}</small>
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* at-a-glance stats */}
        <div className="mt-12 grid grid-cols-2 gap-px border-2 border-ink bg-ink/10 md:grid-cols-4">
          {profile.process.stats.map((s) => (
            <div key={s.label} className="bg-paper-2 px-4 py-4 text-center">
              <p className="font-display text-3xl font-semibold text-saffron-deep">{s.value}</p>
              <p className="mt-0.5 font-mono text-[10px] tracking-widest text-ink/65">{s.label}</p>
            </div>
          ))}
        </div>

        <ul className="mt-10 flex flex-wrap gap-x-10 gap-y-3 font-mono text-sm text-ink/80">
          {profile.process.tools.map((t) => (
            <li key={t}>
              <span className="text-cobalt">▸ </span>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
