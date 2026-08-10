"use client";

import { motion } from "motion/react";

const FLOWS: Record<string, string[]> = {
  "mindpulse-pro": ["Keystroke & mouse capture", "50+ temporal features", "XGBoost → ONNX", "Browser inference <20ms", "SHAP + WebLLM coach"],
  "unified-dta": ["ESM-2 protein embeddings", "GIN molecular graph", "Joint representation", "CI / MSE benchmarks", "Dockerized API"],
  sentinel: ["Anonymized signals", "Burnout scoring agent", "Graph team analysis", "Talent discovery agent", "Natural-language queries"],
  omnisectester: ["Target selection", "7 surface adapters", "Defense-in-depth engine", "Unified reports"],
};

export function FlowDiagram({ slug }: { slug: string }) {
  const flow = FLOWS[slug];
  if (!flow) return null;
  return (
    <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap sm:items-stretch sm:gap-3">
      {flow.map((node, i) => (
        <motion.div
          key={node}
          className="flex flex-1 items-center gap-2 sm:gap-3"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ delay: 0.15 + i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex-1 border border-paper/30 bg-paper/[0.06] px-3 py-2.5 text-center font-mono text-[11px] tracking-wider text-paper/85">
            <span className="mr-1.5 text-saffron">{String(i + 1).padStart(2, "0")}</span>
            {node}
          </div>
          {i < flow.length - 1 && (
            <span aria-hidden className="rotate-90 text-saffron sm:rotate-0">→</span>
          )}
        </motion.div>
      ))}
    </div>
  );
}
