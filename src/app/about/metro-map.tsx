"use client";

import { motion } from "motion/react";
import { metro } from "@/data/profile";

/** Delhi Metro-style diagram — realistic DMRC line colors, terminus labels, interchange hub. */
const DMRC = {
  blue: "#0039A6",
  yellow: "#F7B500",
  pink: "#E6339F",
  violet: "#6E3B9E",
};

const LINE_NAMES = {
  blue: "BLUE LINE",
  yellow: "YELLOW LINE",
  pink: "PINK LINE",
  violet: "VIOLET LINE",
} as const;

const TERMINI: Record<string, [string, string]> = {
  blue: ["BVCOE DELHI", "IIT MADRAS (ONLINE)"],
  yellow: ["GSSOC '24", "WORKSHOP LEAD"],
  pink: ["SIH 2024", "RANBHOOMI"],
  violet: ["MINDPULSE", "OMNISECTESTER"],
};

export function MetroMap() {
  const rowH = 64;
  const hubX = 96;
  const hubY = 176;
  const startX = 200;
  const stepX = 210;
  return (
    <div>
      <svg viewBox="0 0 1010 330" role="img" aria-label={metro.title} className="w-full">
        {metro.lines.map((line, li) => {
          const y = 46 + li * rowH + 14;
          const color = DMRC[line.id as keyof typeof DMRC] ?? line.color;
          const stations = line.stations;
          const xs = stations.map((_, si) => startX + si * stepX);
          const endX = xs[xs.length - 1];
          // transit-map geometry: spine → 45° diagonal → horizontal run
          const path = `M ${hubX} ${hubY} L ${hubX + 34} ${hubY} L ${hubX + 66} ${y} L ${endX} ${y}`;
          const term = TERMINI[line.id] ?? [stations[0], stations[stations.length - 1]];
          return (
            <g key={line.id}>
              {/* glow underlay */}
              <motion.path
                d={path}
                fill="none"
                stroke={color}
                strokeWidth="16"
                strokeLinecap="round"
                opacity="0.16"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: li * 0.25 }}
              />
              <motion.path
                d={path}
                fill="none"
                stroke={color}
                strokeWidth="7"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: li * 0.25 }}
              />
              {/* terminus tick */}
              <motion.rect
                x={endX + 13}
                y={y - 7}
                width="5"
                height="14"
                fill={color}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 + li * 0.25 }}
              />
              {/* line badge */}
              <motion.g
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + li * 0.25 }}
              >
                <rect x={hubX - 36} y={y - 13} width="58" height="26" rx="13" fill={color} />
                <text x={hubX} y={y + 4} textAnchor="middle" fontSize="9" fontWeight="700" fill="#F4EFE6">
                  {LINE_NAMES[line.id as keyof typeof LINE_NAMES] ?? li + 1}
                </text>
              </motion.g>
              {/* stations */}
              {xs.map((x, si) => (
                <motion.g
                  key={si}
                  className="cursor-help"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + li * 0.25 + si * 0.08, type: "spring", stiffness: 200, damping: 16 }}
                >
                  <title>{`${stations[si]} — ${LINE_NAMES[line.id as keyof typeof LINE_NAMES] ?? line.name}`}</title>
                  <circle cx={x} cy={y} r="8.5" fill="#F4EFE6" stroke={color} strokeWidth="4.5" />
                  {si === 0 || si === stations.length - 1 ? <circle cx={x} cy={y} r="3" fill={color} /> : null}
                  <text
                    x={x}
                    y={y + 36}
                    textAnchor="middle"
                    fontSize="10"
                    letterSpacing="1"
                    fill="#4A5266"
                    fontFamily="DM Mono, monospace"
                  >
                    {stations[si]}
                  </text>
                </motion.g>
              ))}
              {/* termini labels */}
              <text x={xs[0]} y={y - 22} textAnchor="middle" fontSize="8.5" letterSpacing="1.5" fill="#8A8F9C" fontFamily="DM Mono, monospace">
                TOWARDS {term[0]}
              </text>
              <text x={endX} y={y - 22} textAnchor="middle" fontSize="8.5" letterSpacing="1.5" fill="#8A8F9C" fontFamily="DM Mono, monospace">
                TOWARDS {term[1]}
              </text>
            </g>
          );
        })}
        {/* interchange hub */}
        <motion.g
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.0, type: "spring", stiffness: 180, damping: 14 }}
        >
          <circle cx={hubX} cy={hubY} r="17" fill="#051024" stroke="#F58E20" strokeWidth="4" />
          <circle cx={hubX} cy={hubY} r="6.5" fill="#F58E20" />
          <text x={hubX} y={310} textAnchor="middle" fontSize="12" letterSpacing="2" fill="#051024" fontFamily="DM Mono, monospace" fontWeight="700">
            {metro.hub} — INTERCHANGE
          </text>
        </motion.g>
        <motion.circle
          cx={hubX}
          cy={hubY}
          r="24"
          fill="none"
          stroke="#F58E20"
          strokeWidth="3"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 0.7, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, repeat: Infinity, repeatType: "reverse", duration: 1.6 }}
        />
      </svg>
      {/* legend */}
      <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 border-t-2 border-ink pt-3 font-mono text-[10.5px] tracking-wider text-muted-foreground">
        {metro.lines.map((l) => (
          <span key={l.id} className="flex items-center gap-2">
            <span aria-hidden className="h-1 w-6 rounded-full" style={{ background: DMRC[l.id as keyof typeof DMRC] }} />
            {l.name}
          </span>
        ))}
      </div>
    </div>
  );
}
