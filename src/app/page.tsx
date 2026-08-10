import { SiteShell } from "@/components/layout/site-shell";
import { Hero } from "@/components/sections/hero";
import { SkillsMarquee, NameMarquee } from "@/components/sections/marquee-band";
import { Vibe } from "@/components/sections/vibe";
import { Process } from "@/components/sections/process";
import { Background } from "@/components/sections/background";
import { Wins, ProofBand } from "@/components/sections/wins";
import { Work } from "@/components/sections/work";
import { Stack } from "@/components/sections/stack";
import { Contact } from "@/components/sections/contact";

export default async function Home({ searchParams }: { searchParams?: Promise<{ shot?: string }> }) {
  const sp = (await searchParams) ?? {};
  const shot = Boolean(sp.shot);
  return (
    <SiteShell>
      <main id="main" className="flex-1">
        <Hero shot={shot} />
        <SkillsMarquee />
        <NameMarquee />
        <Vibe />
        <Process />
        <Background />
        <Wins />
        <ProofBand />
        <Work />
        <Stack />
        <Contact />
      </main>
    </SiteShell>
  );
}
