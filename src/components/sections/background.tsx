import { Reveal } from "@/components/motion/reveal";
import { profile } from "@/data/profile";

export function Background() {
  return (
    <section id="built" className="px-[clamp(20px,4vw,48px)] py-[clamp(64px,8vh,110px)]">
      <Reveal>
        <p className="mb-4 inline-block border border-ink bg-saffron px-3 py-1.5 font-mono text-xs tracking-[0.12em] shadow-[3px_3px_0_0_#051024]">
          03 · BACKGROUND
        </p>
        <h2 className="font-display text-[clamp(3.2rem,9vw,8rem)] font-semibold uppercase leading-[0.86]">
          WHERE I&apos;VE
          <br />
          <span className="text-cobalt">BUILT</span>
        </h2>
      </Reveal>

      <div className="mt-10 border-t border-ink">
        {profile.background.map((b, i) => (
          <Reveal key={b.role} delay={i * 0.06}>
            <article className="relative grid items-start gap-4 border-b border-ink px-2 py-6 md:grid-cols-[150px_1fr_auto] md:gap-10 md:py-10">
              <span
                aria-hidden
                className="absolute -left-[34px] top-[34px] size-3 rounded-full border-2 border-ink bg-saffron"
              />
              {i < profile.background.length - 1 && (
                <span aria-hidden className="absolute -left-[29px] top-[52px] bottom-[-8px] w-0.5 bg-ink/25" />
              )}
              <span className="font-display text-[clamp(1.8rem,2.6vw,2.6rem)] font-semibold leading-none">
                {b.years}
              </span>
              <div>
                <h3 className="font-display text-[clamp(1.6rem,2.8vw,2.2rem)] font-semibold uppercase leading-none">
                  {b.role} <span className="text-cobalt">{b.co}</span>
                </h3>
                <p className="mt-2.5 max-w-[60ch] text-[15.5px] leading-relaxed">{b.desc}</p>
                <p className="mt-3 font-mono text-[11px] tracking-widest text-muted-foreground">{b.tags}</p>
              </div>
              <span className="hidden border border-ink bg-paper-2 px-3 py-1.5 font-mono text-[11px] tracking-widest md:block">
                {b.status}
              </span>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="mt-7 font-mono text-sm tracking-wider">
          FULL STORY IN MY{" "}
          <a href={profile.resume} className="font-medium text-cobalt underline underline-offset-4">
            RESUME →
          </a>
        </p>
      </Reveal>
    </section>
  );
}
