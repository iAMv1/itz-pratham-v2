import Link from "next/link";
import { PeacockFlock } from "@/components/mascot/peacock-flock";
import { PeacockMascot } from "@/components/mascot/peacock-mascot";

export default function NotFound() {
  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center gap-6 overflow-hidden px-6 py-24 text-center">
      <span
        aria-hidden
        className="wm-drift pointer-events-none absolute right-[-4%] top-[6%] font-dev text-[clamp(8rem,24vw,20rem)] leading-none text-ink opacity-[0.04]"
      >
        पक्षी
      </span>
      <p className="font-mono text-xs tracking-[0.22em] text-saffron-deep">
        404 · THE PEEPAL TREE IS EMPTY
      </p>
      <div className="flock-bob group transition-transform duration-300 ease-out hover:scale-[1.02]">
        <PeacockFlock className="w-[min(620px,92vw)]" />
      </div>
      <p className="max-w-[40ch] text-base leading-relaxed text-muted-foreground">
        A flock of peacocks shuffled into these numerals — the page you wanted wandered off with them.
      </p>
      <div className="flex items-center gap-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 border-2 border-ink bg-saffron px-6 py-3.5 font-mono text-sm tracking-wider shadow-hard transition-[transform,box-shadow] duration-150 ease-out hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0_0_#051024] active:scale-[0.97]"
        >
          Back to the haveli <span aria-hidden>→</span>
        </Link>
        <PeacockMascot className="h-20 w-20" />
      </div>
      <p className="font-mono text-[11px] tracking-widest text-muted-foreground">
        SPOT A BROKEN WINDOW?{" "}
        <a href="mailto:iam1nahata@gmail.com?subject=Broken%20window%20on%20your%20portfolio" className="text-cobalt underline underline-offset-4">
          TELL THE BUILDER ↗
        </a>
      </p>
    </main>
  );
}
