"use client";

import { useEffect, useState } from "react";

/** IST clock — the site stays in its timezone, like manixh's live footer clock. */
export function IstClock() {
  const [clock, setClock] = useState("");

  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      }).format(new Date());
    const raf = requestAnimationFrame(() => setClock(fmt()));
    const id = window.setInterval(() => setClock(fmt()), 30000);
    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(id);
    };
  }, []);

  return (
    <span className="tabular-nums" suppressHydrationWarning>
      {clock ? `· IST ${clock}` : ""}
    </span>
  );
}
