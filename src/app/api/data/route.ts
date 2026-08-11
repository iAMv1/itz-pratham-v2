import { NextResponse } from "next/server";
import { caseStudies, caseCounterfactuals, unresolved, timelineMachine, offClock, profile } from "@/data/profile";

/** Machine-readable mirror of the typed content model (src/data/profile.ts). */
export async function GET() {
  return NextResponse.json({
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
      stats: profile.stats,
      facts: profile.facts,
      manifesto: profile.manifesto,
      cards: profile.cards,
      skills: profile.stack,
      process: profile.process,
      background: profile.background,
      wins: profile.wins,
      proofBand: profile.proofBand,
      timelineMachine,
      offClock,
    },
    caseStudies: caseStudies.map((c) => ({
      slug: c.slug,
      index: c.index,
      year: c.year,
      title: c.title,
      role: c.role,
      blurb: c.blurb,
      problem: c.challenge,
      approach: c.build,
      hardPart: c.hard,
      shipped: c.shipped,
      impact: c.impact,
      stack: c.stack,
      source: c.href,
      art: c.art,
      accent: c.accent,
      metrics: c.metrics,
      dive: c.dive,
      evidence: c.evidence,
      counterfactuals: caseCounterfactuals[c.slug] ?? [],
    })),
    unresolved,
  });
}
