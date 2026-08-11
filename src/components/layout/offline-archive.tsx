"use client";

import { useEffect, useState } from "react";

/** OfflineArchive — registers the service worker and surfaces an offline banner
 *  when the visitor drops off the network (the portfolio keeps an archived life). */
export function OfflineArchive() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
    const on = () => setOffline(!navigator.onLine);
    window.addEventListener("offline", on);
    window.addEventListener("online", on);
    on();
    return () => {
      window.removeEventListener("offline", on);
      window.removeEventListener("online", on);
    };
  }, []);

  if (!offline) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-[150] w-[min(520px,92vw)] -translate-x-1/2 border-2 border-ink bg-ink-2 px-4 py-3 text-paper shadow-[5px_5px_0_0_#F58E20]">
      <p className="font-mono text-[11px] tracking-widest">
        <span className="text-saffron">OFFLINE ARCHIVE</span> — you&apos;re reading the cached me. Every page and case
        study works offline.
      </p>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 border-t border-paper/20 pt-2 font-mono text-[10.5px] tracking-wider text-paper/70">
        <span>▸ BUILT: 4 REAL PROJECTS</span>
        <span>▸ PROVING: 3 BENCHMARKS</span>
        <span>▸ SHIPPING: MIND PULSE PRO</span>
      </div>
    </div>
  );
}
