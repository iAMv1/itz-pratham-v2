"use client";

import { motion } from "motion/react";
import type { Metro } from "@/content/site";

/** DMRC-realistic career map: casing, roundels, terminus ticks, interchange corridor,
 *  moving trains, station tooltips + indices. All visibility is mount-driven (never IO-gated). */

const DMRC = {
  blue: "#0039A6",
  yellow: "#F7B500",
  pink: "#E6339F",
  violet: "#6E3B9E",
};

const LINE_NAMES = {
  blue: "BLUE LINE",
  pink: "PINK LINE",
  violet: "VIOLET LINE",
} as const;

const TERMINI: Record<string, [string, string]> = {
  blue: ["BVCOE DELHI", "IIT MADRAS (ONLINE)"],
  pink: ["SIH 2024", "MINDPULSE PRO"],
  violet: ["OMNISECTESTER", "MINDPULSE PRO"],
};

const STATION_NOTES: Record<string, string> = {
  "BVCOE DELHI": "B.Tech CSE · 2023—27",
  "IIT MADRAS (ONLINE)": "BSc Foundation · 1 year · certified",
  "SIH 2024": "Grand finalist · 492,960+ participants",
  ALGOQUEST: "Top 5 · 300+ teams",
  RANBHOOMI: "2nd · volleyball & basketball",
  MINDPULSE: "INTERCHANGE · wins × built",
  "UNIFIED-DTA": "ESM-2 + GIN benchmarks",
  SENTINEL: "3-agent wellbeing AI",
  OMNISECTESTER: "7-surface security CLI",
};

const ROW = { r0: 54, r1: 112, r2: 170, r3: 228 };
const HUB = { x: 96, y: 170 };

type Station = { name: string; x: number; y: number };
type LineGeom = { path: string; stations: Station[]; terminusTick: { x: number; y: number } };

function geom(metro: Metro, id: string): LineGeom {
  const stationsOf = metro.lines.find((l) => l.id === id)!.stations;
  switch (id) {
    case "blue": {
      const y = ROW.r0;
      const path = `M ${HUB.x} ${HUB.y} L ${HUB.x + 34} ${HUB.y} L ${HUB.x + 66} ${y} L 470 ${y}`;
      return { path, stations: [{ name: stationsOf[0], x: 230, y }, { name: stationsOf[1], x: 470, y }], terminusTick: { x: 492, y } };
    }
    case "pink": {
      const y = ROW.r1;
      return {
        path: `M ${HUB.x} ${HUB.y} L ${HUB.x + 34} ${HUB.y} L ${HUB.x + 66} ${y} L 470 ${y} L 620 ${ROW.r3} L 860 ${ROW.r3}`,
        stations: [{ name: stationsOf[0], x: 230, y }, { name: stationsOf[1], x: 470, y }, { name: stationsOf[2], x: 860, y: ROW.r3 }],
        terminusTick: { x: 882, y: ROW.r3 },
      };
    }
    default: {
      const y = ROW.r3;
      return {
        path: `M ${HUB.x} ${HUB.y} L ${HUB.x + 34} ${HUB.y} L ${HUB.x + 66} ${y} L 860 ${y}`,
        stations: [
          { name: stationsOf[3], x: 230, y },
          { name: stationsOf[2], x: 440, y },
          { name: stationsOf[1], x: 650, y },
          { name: stationsOf[0], x: 860, y },
        ],
        terminusTick: { x: 230, y },
      };
    }
  }
}

export function MetroMap({ metro }: { metro: Metro }) {
  return (
    <div>
      <svg viewBox="0 0 920 300" role="img" aria-label={metro.title} className="w-full text-ink">
        {(["blue", "pink", "violet"] as const).map((lid, li) => {
          const g = geom(metro, lid);
          const color = DMRC[lid];
          return (
            <g key={lid}>
              <path d={g.path} fill="none" stroke="currentColor" strokeWidth="11" strokeLinecap="round" />
              <path d={g.path} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" />
              {/* moving train */}
              <motion.circle
                r="5"
                fill="#F4EFE6"
                stroke="currentColor"
                strokeWidth="2"
                style={{ offsetPath: `path('${g.path}')`, offsetRotate: "0deg" }}
                animate={{ offsetDistance: ["0%", "100%"] }}
                transition={{ duration: 14 + li * 3, ease: "linear", repeat: Infinity, delay: 1.2 + li * 3 }}
              />
              <rect x={g.terminusTick.x} y={g.terminusTick.y - 7} width="5" height="14" fill="#051024" />
              {/* line roundel */}
              <motion.g initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + li * 0.25, type: "spring", stiffness: 200, damping: 15 }}>
                <circle cx={HUB.x - 38} cy={HUB.y} r="13" fill={color} stroke="currentColor" strokeWidth="2" />
                <text x={HUB.x - 38} y={HUB.y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#F4EFE6">
                  {li + 1}
                </text>
                <text x={HUB.x - 62} y={HUB.y + 34} textAnchor="middle" fontSize="9" letterSpacing="1" fill="#4A5266" fontFamily="DM Mono, monospace">
                  {LINE_NAMES[lid]}
                </text>
              </motion.g>
              {/* stations */}
              {g.stations.map((s, si) => {
                const isInterchange = lid === "pink" && s.name === "MINDPULSE";
                const important = isInterchange;
                return (
                  <motion.g
                    key={si}
                    className="cursor-help"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6 + li * 0.25 + si * 0.08, type: "spring", stiffness: 200, damping: 16 }}
                  >
                    <title>{`${s.name} — ${STATION_NOTES[s.name] ?? LINE_NAMES[lid]}`}</title>
                    <circle cx={s.x} cy={s.y} r="9" fill="#F4EFE6" stroke={color} strokeWidth="4.5" />
                    {important && <circle cx={s.x} cy={s.y} r="13.5" fill="none" stroke="currentColor" strokeWidth="2" />}
                    <text
                      x={s.x}
                      y={s.y + 30}
                      textAnchor="middle"
                      fontSize="10"
                      letterSpacing="1"
                      fill="#4A5266"
                      fontFamily="DM Mono, monospace"
                      fontWeight={important ? 700 : 400}
                    >
                      {s.name}
                    </text>
                  </motion.g>
                );
              })}
              <text x={g.stations[0].x} y={g.stations[0].y - 20} textAnchor="middle" fontSize="8.5" letterSpacing="1.5" fill="#8A8F9C" fontFamily="DM Mono, monospace">
                TOWARDS {TERMINI[lid][0]}
              </text>
              {g.stations.length > 1 && (
                <text x={g.stations[g.stations.length - 1].x} y={g.stations[g.stations.length - 1].y - 20} textAnchor="middle" fontSize="8.5" letterSpacing="1.5" fill="#8A8F9C" fontFamily="DM Mono, monospace">
                  TOWARDS {TERMINI[lid][1]}
                </text>
              )}
            </g>
          );
        })}

        {/* hub */}
        <motion.g initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.1, type: "spring", stiffness: 180, damping: 14 }}>
          <circle cx={HUB.x} cy={HUB.y} r="17" fill="#051024" stroke="#F58E20" strokeWidth="4" />
          <circle cx={HUB.x} cy={HUB.y} r="6.5" fill="#F58E20" />
          <text x={HUB.x} y={292} textAnchor="middle" fontSize="12" letterSpacing="2" fill="#051024" fontFamily="DM Mono, monospace" fontWeight="700">
            {metro.hub} — INTERCHANGE
          </text>
        </motion.g>
        <motion.circle
          cx={HUB.x}
          cy={HUB.y}
          r="24"
          fill="none"
          stroke="#F58E20"
          strokeWidth="3"
          initial={{ opacity: 0.4, scale: 0.5 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ delay: 1.3, repeat: Infinity, repeatType: "reverse", duration: 1.6 }}
        />
      </svg>

      <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 border-t-2 border-ink pt-3 font-mono text-[10.5px] tracking-wider text-muted-foreground">
        {(["blue", "pink", "violet"] as const).map((lid) => (
          <span key={lid} className="flex items-center gap-2">
            <span aria-hidden className="h-1 w-6 rounded-full" style={{ background: DMRC[lid] }} />
            {LINE_NAMES[lid]}
          </span>
        ))}
        <span className="flex items-center gap-2">
          <span aria-hidden className="size-2 rounded-full border-2 border-ink bg-saffron" />
          INTERCHANGE
        </span>
        <span className="flex items-center gap-2">
          <span aria-hidden className="size-2.5 rounded-full border-2 border-ink bg-paper" />
          TRAIN
        </span>
      </div>
    </div>
  );
}
