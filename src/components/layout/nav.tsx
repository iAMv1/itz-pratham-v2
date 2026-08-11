"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { MenuIcon, XIcon } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const ref = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const onScroll = () => el.classList.toggle("nav-scrolled", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced]);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMenuOpen(false));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  const isActive = (href: string) => pathname === href || (href === "/work" && pathname.startsWith("/work/"));

  return (
    <motion.header
      ref={ref}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b-2 border-ink bg-paper/85 px-[clamp(14px,4vw,48px)] py-3 backdrop-blur-md"
    >
      <div className="flex items-center justify-between gap-4">
        {/* brand */}
        <Link href="/" className="flex items-center gap-3" aria-label="Pratham Nahata — home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo-mark.svg" alt="" width={36} height={36} className="size-9 border-2 border-ink" />
          <span className="hidden font-display text-[22px] font-semibold tracking-wide md:block">
            Pratham&nbsp;Nahata
          </span>
        </Link>

        {/* desktop links */}
        <nav className="hidden items-center gap-[clamp(16px,2.5vw,32px)] md:flex" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`group relative px-1 py-2 font-mono text-[13px] tracking-[0.12em] ${
                isActive(l.href) ? "text-cobalt" : ""
              }`}
            >
              {l.label}
              <span
                className={`absolute inset-x-1 bottom-0.5 h-0.5 origin-right bg-cobalt transition-transform duration-200 ease-out group-hover:origin-left group-hover:scale-x-100 ${
                  isActive(l.href) ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle className="hidden md:inline-flex" />
          <p className="hidden items-center gap-2 font-mono text-[11px] tracking-widest text-muted-foreground lg:flex">
            <span aria-hidden className="size-2 rounded-full bg-mint" />
            Open to work
          </p>

          {/* mobile menu */}
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              aria-label="Open menu"
              className="inline-flex size-11 items-center justify-center border-2 border-ink p-2 transition-colors duration-200 hover:bg-ink hover:text-paper active:scale-[0.97] sm:hidden"
            >
              <MenuIcon className="size-6" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-[360px] border-l-2 border-ink bg-paper">
              <SheetHeader className="border-b-2 border-ink px-6 py-5">
                <SheetTitle className="font-display text-2xl font-semibold uppercase">
                  Pratham<span className="text-saffron">▮</span>
                </SheetTitle>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="absolute right-4 top-4 border-2 border-ink p-1.5 transition-colors hover:bg-ink hover:text-paper active:scale-[0.97]"
                >
                  <XIcon className="size-4" />
                </button>
              </SheetHeader>
              <nav className="flex flex-col px-6 py-4" aria-label="Mobile">
                {NAV_LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    className={`flex min-h-12 items-center justify-between border-b border-ink/15 font-display text-3xl font-semibold uppercase leading-none transition-colors ${
                      isActive(l.href) ? "text-cobalt" : "hover:text-saffron-deep"
                    }`}
                  >
                    {l.label}
                    <span aria-hidden className="font-mono text-sm">→</span>
                  </Link>
                ))}
              </nav>
              <div className="mt-auto border-t-2 border-ink px-6 py-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="flex items-center gap-2 font-mono text-[11px] tracking-widest text-muted-foreground">
                    <span aria-hidden className="size-2 rounded-full bg-mint" />
                    Open to work · Delhi
                  </p>
                  <ThemeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
