import { NextResponse } from "next/server";
import { profile } from "@/data/profile";
import { allProjects } from "@/content/projects";
import { about, timeline, unresolved, metro, processContent } from "@/content/site";

/** Machine-readable mirror of the typed content model (src/data/profile.ts + content/*). */
export async function GET() {
  return NextResponse.json(
    {
      meta: {
        name: profile.name,
        url: "https://itzpratham.in/",
        generated: new Date().toISOString(),
        agentToolkit: "https://itzpratham.in/api/agent?action=list",
      },
    profile: {
      name: profile.name,
      shortName: profile.shortName,
      location: profile.location,
      region: profile.region,
      email: profile.email,
      resume: profile.resume,
      links: profile.links,
      rota: profile.rota,
      deck: profile.deck,
      skills: profile.stack,
      marquee: { skills: profile.skillsMarquee, name: profile.nameMarquee },
    },
    about: about(),
    process: processContent(),
    timeline: timeline(),
    unresolved: unresolved().items,
    metro: metro(),
    caseStudies: allProjects().map((c) => ({
      slug: c.slug,
      index: c.index,
      year: c.year,
      title: c.title,
      role: c.role,
      blurb: c.blurb,
      problem: c.challenge,
      approach: c.approach,
      hardPart: c.hard,
      shipped: c.shipped,
      impact: c.impact,
      stack: c.stack,
      flow: c.flow,
      source: c.href,
      art: c.screenshot ?? c.art,
      accent: c.accent,
      metrics: c.metrics,
      dive: c.dive,
      evidence: c.evidence,
      counterfactuals: c.counterfactuals,
      bodyHtml: c.bodyHtml,
    })),
    },
    { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } }
  );
}
