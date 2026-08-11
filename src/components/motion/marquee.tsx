"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

export function Marquee({
  children,
  speed = 24,
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || reduced) return;

    let cleanup: (() => void) | null = null;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
      .then(([{ default: gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);
        const tween = gsap.to(track, {
          xPercent: -50,
          ease: "none",
          duration: speed,
          repeat: -1,
        });
        const st = ScrollTrigger.create({
          trigger: track.parentElement,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => tween.timeScale(0.4 + self.progress * 2.4),
          onLeave: () => tween.timeScale(1),
          onLeaveBack: () => tween.timeScale(1),
        });
        cleanup = () => {
          st.kill();
          tween.kill();
        };
      })
      .catch(() => {});

    return () => {
      cleanup?.();
    };
  }, [reduced, speed]);

  return (
    <div className={`overflow-hidden ${className ?? ""}`} aria-hidden>
      <div ref={trackRef} className="flex w-max will-change-transform">
        {children}
      </div>
    </div>
  );
}
