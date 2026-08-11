"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

/** Link that wraps navigation in a same-document View Transition (Chromium; graceful fallback elsewhere). */
export function VtLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const router = useRouter();

  const go = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (!("startViewTransition" in document)) return;
    e.preventDefault();
    const vt = (document as unknown as { startViewTransition: (cb: () => void) => { finished: Promise<void> } }).startViewTransition(() => {
      router.push(href);
    });
    vt.finished.catch(() => {});
  };

  return (
    <Link href={href} onClick={go} className={className}>
      {children}
    </Link>
  );
}
