import type { ReactNode } from "react";

/**
 * Annotation card — the redesigned "handwritten note" system.
 * Deliberate UI: mono strip header, italic body, saffron pin, slight rotation, hard shadow.
 */
export function AnnotationCard({
  children,
  label,
  rotate = -2,
  className = "",
}: {
  children: ReactNode;
  label: string;
  rotate?: number;
  className?: string;
}) {
  return (
    <aside
      className={`relative inline-block max-w-[260px] border-2 border-ink bg-paper-2 shadow-hard ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <span
        aria-hidden
        className="absolute -top-2 left-1/2 size-3.5 -translate-x-1/2 rounded-full border-2 border-ink bg-saffron shadow-[0_2px_0_0_var(--shadow-ink)]"
      />
      <p className="border-b border-ink bg-saffron/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink">
        {label}
      </p>
      <p className="px-3.5 py-2.5 text-[14px] italic leading-snug text-ink">{children}</p>
    </aside>
  );
}
