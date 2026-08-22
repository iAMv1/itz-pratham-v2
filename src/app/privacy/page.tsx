import type { Metadata } from "next";
import Link from "next/link";
import { privacyBodySections } from "@/lib/agent-md";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "This portfolio collects nothing: no analytics, no trackers, no cookies. What standard hosting logs see, and how to reach me about privacy.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  const sections = privacyBodySections();
  return (
    <main className="relative overflow-hidden px-[clamp(20px,4vw,48px)] pb-[clamp(64px,8vh,110px)] pt-[clamp(120px,14vh,180px)]">
      <span
        aria-hidden
        className="wm-drift pointer-events-none absolute right-[-3%] top-[8%] font-dev text-[clamp(7rem,20vw,16rem)] leading-none text-ink opacity-[0.04]"
      >
        गोपनीयता
      </span>
      <div className="relative z-10 mx-auto max-w-[820px]">
        <p className="mb-4 inline-block border-2 border-ink bg-saffron px-3 py-1.5 font-mono text-xs tracking-[0.12em] text-ink shadow-[3px_3px_0_0_var(--shadow-ink)]">
          PRIVACY · LAST REVIEWED AUGUST 2026
        </p>
        <h1 className="font-display text-[clamp(2.6rem,7vw,5.5rem)] font-semibold uppercase leading-[0.9]">
          NOTHING <span className="text-cobalt">COLLECTED.</span> NOTHING SOLD.
        </h1>
        <p className="mt-5 max-w-[60ch] text-lg font-medium leading-relaxed">
          The short version of this page: this portfolio collects nothing about you. No analytics scripts, no cookies,
          no ads, no fingerprinting — so there is nothing to opt out of.
        </p>

        {sections.map(([heading, items]) => (
          <section key={heading} className="mt-10 border-2 border-ink bg-paper-2 p-[clamp(18px,2.6vw,28px)] shadow-hard">
            <h2 className="font-display text-xl font-semibold uppercase tracking-wide text-cobalt">{heading}</h2>
            <ul className="mt-3 space-y-2.5">
              {items.map((item) => (
                <li key={item.slice(0, 40)} className="text-[15px] leading-relaxed text-muted-foreground">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}

        <p className="mt-10 font-mono text-[11.5px] leading-relaxed tracking-wide text-muted-foreground">
          This page is also available to machines: send{" "}
          <code className="bg-paper-2 px-1 py-0.5 font-mono text-[12px]">Accept: text/markdown</code> on{" "}
          <a href="/privacy" className="text-cobalt underline underline-offset-4">/privacy</a>, or fetch{" "}
          <Link href="/api/markdown?path=/privacy" className="text-cobalt underline underline-offset-4">/api/markdown?path=/privacy</Link>.
        </p>
      </div>
    </main>
  );
}
