"use client";

import { Marquee } from "@/components/motion/marquee";
import { profile } from "@/data/profile";

export function SkillsMarquee() {
  return (
    <div className="relative border-y-[3px] border-ink">
      <span aria-hidden className="absolute inset-y-0 left-0 z-10 w-2 bg-cobalt" />
      <span aria-hidden className="absolute inset-y-0 right-0 z-10 w-2 bg-red" />
      <Marquee speed={24}>
        {[0, 1].map((i) => (
          <span
            key={i}
            className="whitespace-nowrap px-1 py-2.5 font-display text-[clamp(28px,4vw,44px)] font-medium uppercase tracking-wide"
          >
            {profile.skillsMarquee.map((s) => (
              <span key={s}>
                {s} <span className="text-saffron">✦</span>{" "}
              </span>
            ))}
            &nbsp;
          </span>
        ))}
      </Marquee>
    </div>
  );
}

export function NameMarquee() {
  return (
    <div className="relative overflow-hidden border-b-[3px] border-ink bg-paper">
      <Marquee speed={32}>
        {[0, 1].map((i) => (
          <span
            key={i}
            className="whitespace-nowrap px-1 py-3 font-display text-[clamp(3rem,7.5vw,7.5rem)] font-semibold uppercase leading-[1.1] tracking-wide text-transparent [-webkit-text-stroke:2px_var(--ink)]"
          >
            {profile.nameMarquee.map((s) => (
              <span key={s}>
                {s} <span className="text-saffron [-webkit-text-stroke:0px]">✦</span>{" "}
              </span>
            ))}
            &nbsp;
          </span>
        ))}
      </Marquee>
    </div>
  );
}
