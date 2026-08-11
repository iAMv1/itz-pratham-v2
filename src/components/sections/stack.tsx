import { Reveal } from "@/components/motion/reveal";
import { profile } from "@/data/profile";

export function Stack() {
  return (
    <section id="stack" className="px-[clamp(20px,4vw,48px)] py-[clamp(64px,8vh,110px)]">
      <Reveal>
        <p className="mb-4 inline-block border border-ink bg-saffron px-3 py-1.5 font-mono text-xs tracking-[0.12em] shadow-[3px_3px_0_0_var(--shadow-ink)]">
          06 · STACK
        </p>
        <h2 className="font-display text-[clamp(3.2rem,9vw,8rem)] font-semibold uppercase leading-[0.86]">
          THE
          <br />
          <span className="text-cobalt">TOOLBOX</span>
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-[clamp(14px,2vw,28px)] lg:grid-cols-[1.15fr_1fr_1fr] lg:[grid-template-areas:'ai_lang_frame'_'ai_tools_tools']">
        {profile.stack.map((g, i) => (
          <Reveal key={g.name} delay={i * 0.06} className={g.wide ? "lg:[grid-area:ai]" : ""}>
            <div
              className={`flex h-full flex-col gap-3.5 border-2 border-ink bg-paper-2 p-[clamp(18px,2.2vw,26px)] pb-8 shadow-hard transition-transform duration-300 ease-out hover:-translate-y-1.5 ${
                g.wide ? "border-t-[6px] border-t-saffron" : ""
              }`}
            >
              <h3 className="border-b-2 border-ink pb-2.5 font-mono text-xs tracking-widest text-cobalt">{g.name}</h3>
              <ul className="flex flex-wrap gap-2">
                {g.pills.map((p) => (
                  <li
                    key={p}
                    className="border border-ink bg-paper px-3 py-1.5 font-mono text-xs tracking-wide transition-colors duration-150 ease-out hover:bg-saffron hover:text-ink"
                  >
                    {p}
                  </li>
                ))}
              </ul>
              {g.note && (
                <p className="mt-auto border-t border-dashed border-ink/20 pt-3 text-[12.5px] text-muted-foreground">
                  {g.note}
                </p>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
