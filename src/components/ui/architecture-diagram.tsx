"use client";

import { motion } from "motion/react";
import type { ArchitectureLayer } from "@/content/projects";

/** Real architecture diagram — layered boxes with labeled connectors, data-driven from the project's MDX. */
export function ArchitectureDiagram({ layers }: { layers: ArchitectureLayer[] }) {
  if (!layers.length) return null;
  return (
    <div className="flex flex-col items-stretch gap-0">
      {layers.map((layer, i) => (
        <div key={layer.title}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-2 border-2 border-ink bg-paper-2 p-4 shadow-hard sm:flex-row sm:items-center sm:gap-4"
          >
            <p className="w-full shrink-0 font-mono text-[10px] tracking-[0.18em] text-cobalt sm:w-36">
              {String(i + 1).padStart(2, "0")} · {layer.title}
            </p>
            <div className="flex flex-wrap gap-2">
              {layer.nodes.map((n) => (
                <span
                  key={n}
                  className="border border-ink/30 bg-paper px-2.5 py-1.5 font-mono text-[11.5px] tracking-wide"
                >
                  {n}
                </span>
              ))}
            </div>
          </motion.div>
          {i < layers.length - 1 && (
            <div aria-hidden className="relative mx-auto flex h-9 w-full max-w-[180px] flex-col items-center justify-center">
              <span className="h-4 w-px bg-ink/40" />
              <span className="mx-2 whitespace-nowrap font-mono text-[9.5px] tracking-widest text-saffron-deep">
                {layer.via ?? "↓"}
              </span>
              <span className="h-4 w-px bg-ink/40" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
