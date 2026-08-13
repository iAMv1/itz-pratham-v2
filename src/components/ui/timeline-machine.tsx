"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";


/** The Timeline Machine — a media scrubber used as a time machine across the builder's years. */
export function TimelineMachine({ years }: { years: { year: string; stage: string; building: string; learning: string; identity: string }[] }) {
  const reduced = useReducedMotion();
  const [idx, setIdx] = useState(2); // default: 2025
  const current = years[idx];

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdx(Number(e.target.value));
  };

  return (
    <div className="border-2 border-ink bg-paper-2 p-[clamp(18px,2.6vw,30px)] shadow-hard">
      {/* readout */}
      <div className="relative min-h-[150px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.year}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-baseline justify-between gap-4">
              <p className="font-display text-[clamp(2.4rem,5vw,4rem)] font-semibold uppercase leading-none">
                {current.year}
              </p>
              <p className="font-mono text-[11px] tracking-widest text-saffron-deep">{current.stage}</p>
            </div>
            <dl className="mt-4 grid gap-2 font-mono text-[12.5px] sm:grid-cols-3">
              <div>
                <dt className="text-[10px] tracking-widest text-muted-foreground">BUILDING</dt>
                <dd className="mt-0.5 leading-snug">{current.building}</dd>
              </div>
              <div>
                <dt className="text-[10px] tracking-widest text-muted-foreground">LEARNING</dt>
                <dd className="mt-0.5 leading-snug">{current.learning}</dd>
              </div>
              <div>
                <dt className="text-[10px] tracking-widest text-muted-foreground">IDENTITY</dt>
                <dd className="mt-0.5 italic leading-snug">“{current.identity}”</dd>
              </div>
            </dl>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* scrubber */}
      <div className="mt-6 border-t-2 border-ink pt-4">
        <input
          type="range"
          min={0}
          max={years.length - 1}
          value={idx}
          onChange={onInput}
          aria-label="Scrub through the timeline machine"
          className="w-full cursor-ew-resize appearance-none bg-transparent [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:border [&::-webkit-slider-runnable-track]:border-ink [&::-webkit-slider-runnable-track]:bg-paper [&::-webkit-slider-thumb]:mt-[-7px] [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-ink [&::-webkit-slider-thumb]:bg-saffron"
        />
        <div className="mt-2 flex justify-between font-mono text-[10px] tracking-widest text-muted-foreground">
          {years.map((y, i) => (
            <button
              key={y.year}
              type="button"
              onClick={() => setIdx(i)}
              className={`transition-colors hover:text-cobalt ${i === idx ? "font-bold text-ink" : ""}`}
            >
              {y.year}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
