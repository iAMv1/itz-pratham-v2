"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReduced || coarse) return;

    let alive = true;
    let lenis: Lenis | null = null;
    let dispose: (() => void) | null = null;

    // gsap + ScrollTrigger are code-split — Lenis only needs them for ticker + scroll sync
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
      .then(([{ default: gsap }, { ScrollTrigger }]) => {
        if (!alive) return;
        gsap.registerPlugin(ScrollTrigger);
        lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9, smoothWheel: true });
        lenisRef.current = lenis;

        lenis.on("scroll", ScrollTrigger.update);
        const raf = (time: number) => lenis!.raf(time * 1000);
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);

        const onClick = (e: MouseEvent) => {
          const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
          if (!a) return;
          const id = a.getAttribute("href")!.slice(1);
          const el = document.getElementById(id);
          if (!el) return;
          e.preventDefault();
          lenis!.scrollTo(el, { offset: -80, duration: 1.2 });
        };
        document.addEventListener("click", onClick);

        dispose = () => {
          document.removeEventListener("click", onClick);
          lenis!.destroy();
          gsap.ticker.remove(raf);
          lenisRef.current = null;
        };
      })
      .catch(() => {});

    return () => {
      alive = false;
      dispose?.();
    };
  }, []);

  /* client navigation: reset scroll to top (App Router preserves position otherwise) */
  useEffect(() => {
    window.scrollTo(0, 0);
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return lenisRef;
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useLenis();
  return <>{children}</>;
}
