export function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-4 border-t-[3px] border-red bg-ink-2 px-[clamp(20px,4vw,48px)] py-5 text-paper max-sm:flex-col max-sm:items-start max-sm:gap-2">
      <p className="font-mono text-[11px] tracking-wider">
        © 2026 PRATHAM NAHATA — जयपुर · राजस्थान — BUILT WITH TOO MUCH COFFEE
      </p>
      <p className="font-mono text-[11px] tracking-wider">
        <a href="#top" className="underline-offset-4 transition-colors hover:text-marigold">
          BACK TO TOP ↑
        </a>{" "}
        ·{" "}
        <a
          href="/assets/Pratham_Nahata_Resume_ATS.pdf"
          className="underline-offset-4 transition-colors hover:text-marigold"
        >
          RESUME ↗
        </a>{" "}
        · NO TEMPLATES WERE HARMED
      </p>
    </footer>
  );
}
