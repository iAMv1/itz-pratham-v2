"use client";

import { motion } from "motion/react";
import { metro } from "@/data/profile";

export function MetroMap() {
  const rowH = 64;
  const hubX = 90;
  const startX = 150;
  const stepX = 210;
  return (
    <svg viewBox="0 0 980 300" role="img" aria-label={metro.title} className="w-full">
      {metro.lines.map((line, li) => {
        const y = 40 + li * rowH + 14;
        const xs = line.stations.map((_, si) => startX + si * stepX);
        const path = `M ${hubX} ${y} L ${xs[0]} ${y} ${xs.map((x) => `L ${x} ${y}`).join(" ")}`;
        return (
          <g key={line.id}>
            <motion.path
              d={path}
              fill="none"
              stroke={line.color}
              strokeWidth="10"
              strokeLinecap="round"
              opacity="0.85"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: li * 0.25 }}
            />
            <rect x={hubX - 26} y={y - 12} width="52" height="24" rx="12" fill={line.color} />
            <text x={hubX} y={y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#F4EFE6">
              {li + 1}
            </text>
            {xs.map((x, si) => (
              <motion.g
                key={si}
                className="cursor-help"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + li * 0.25 + si * 0.08, type: "spring", stiffness: 200, damping: 16 }}
              >
                <title>{`${line.stations[si]} — ${line.name}`}</title>
                <circle cx={x} cy={y} r="9" fill="#F4EFE6" stroke={line.color} strokeWidth="4" />
                <text x={x} y={y + 34} textAnchor="middle" fontSize="10" letterSpacing="1" fill="#4A5266" fontFamily="DM Mono, monospace">
                  {line.stations[si]}
                </text>
              </motion.g>
            ))}
            <text x={startX - 8} y={y - 18} textAnchor="end" fontSize="10" letterSpacing="2" fill="#4A5266" fontFamily="DM Mono, monospace">
              {line.name}
            </text>
          </g>
        );
      })}
      <motion.text
        x={hubX}
        y={292}
        textAnchor="middle"
        fontSize="12"
        letterSpacing="2"
        fill="#051024"
        fontFamily="DM Mono, monospace"
        fontWeight="700"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2 }}
      >
        {metro.hub}
      </motion.text>
      <motion.circle
        cx={hubX}
        cy={246}
        r="26"
        fill="none"
        stroke="#F58E20"
        strokeWidth="3"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 0.8, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.9, repeat: Infinity, repeatType: "reverse", duration: 1.6 }}
      />
    </svg>
  );
}
