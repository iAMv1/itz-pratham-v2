"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "lucide-react";

/** Dark/light toggle — flips the .dark class, persists the choice, follows the system when none stored. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() =>
      setDark(document.documentElement.classList.contains("dark"))
    );
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onSys = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) setDark(e.matches);
    };
    mq.addEventListener("change", onSys);
    return () => {
      cancelAnimationFrame(raf);
      mq.removeEventListener("change", onSys);
    };
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* storage unavailable */
    }
    setDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      className={`inline-flex size-10 items-center justify-center border-2 border-ink bg-paper-2 transition-colors duration-200 hover:bg-ink hover:text-paper active:scale-[0.94] ${className}`}
    >
      {dark ? <SunIcon className="size-4" aria-hidden /> : <MoonIcon className="size-4" aria-hidden />}
    </button>
  );
}
