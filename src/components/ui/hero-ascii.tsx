function skyline(units = 9): string {
  const lines: string[] = [];
  const dome = ["   _    ", "  / \\   ", " /   \\  ", "/_____\\ ", "|  |_|  "];
  for (let r = 0; r < dome.length; r++) {
    lines.push(Array(units).fill(dome[r]).join(""));
  }
  const A = "| |_| | ";
  const B = "|_| |_| ";
  for (let r = 0; r < 5; r++) {
    let s = "";
    for (let i = 0; i < units; i++) s += r % 2 === 0 ? A : B;
    lines.push(s.slice(0, units * 8));
  }
  lines.push(Array(units).fill("________").join(""));
  return lines.join("\n");
}

/** ASCII Bikaner skyline — subtle backdrop strip under the hero (chhatris over a honeycomb facade). */
export function HeroAscii() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-0 select-none overflow-hidden">
      <pre className="m-0 whitespace-pre text-center font-mono text-[clamp(3.5px,0.55vw,8px)] leading-[1.08] text-ink/[0.05]">
        {skyline()}
      </pre>
      <p className="mt-1 text-center font-dev text-[clamp(0.8rem,1.6vw,1.3rem)] leading-none text-ink/10">
        बीकानेर → दिल्ली → दुनिया
      </p>
    </div>
  );
}
