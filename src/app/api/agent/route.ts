import { NextResponse } from "next/server";
import { unresolved, timelineMachine, profile } from "@/data/profile";
import { allProjects, getProject } from "@/content/projects";

/**
 * PRATHAM TOOLKIT — agent-readable actions (WebMCP-aligned).
 * GET /api/agent?action=find_project&skill=onnx
 * GET /api/agent?action=get_project&slug=mindpulse-pro
 * GET /api/agent?action=get_resume | get_contact | get_experience | get_skills | compare_projects
 * GET /api/agent?action=find_evidence&claim=20ms
 * GET /api/agent?action=get_profile
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action") ?? "get_profile";
  const q = (searchParams.get("skill") ?? searchParams.get("claim") ?? "").toLowerCase();
  const slug = searchParams.get("slug") ?? "";

  const ok = (data: unknown, extra: Record<string, unknown> = {}) =>
    NextResponse.json({ action, ok: true, ...extra, data });

  const err = (message: string) => NextResponse.json({ action, ok: false, error: message }, { status: 400 });

  switch (action) {
    case "get_profile":
      return ok({
        name: profile.name,
        shortName: profile.shortName,
        location: profile.location,
        region: profile.region,
        email: profile.email,
        rota: profile.rota,
        deck: profile.deck,
        stats: profile.stats,
        facts: profile.facts,
        manifesto: profile.manifesto,
      });

    case "find_project": {
      const matches = allProjects().filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.blurb.toLowerCase().includes(q) ||
          c.stack.some((s) => s.toLowerCase().includes(q)) ||
          c.approach.toLowerCase().includes(q) ||
          c.hard.toLowerCase().includes(q)
      );
      return ok(matches.map((c) => ({ slug: c.slug, title: c.title, blurb: c.blurb, stack: c.stack })), {
        query: q,
        count: matches.length,
      });
    }

    case "get_project": {
      const c = getProject(slug);
      if (!c) return err(`no project with slug "${slug}" — try: ${allProjects().map((s) => s.slug).join(", ")}`);
      return ok({
        slug: c.slug,
        title: c.title,
        year: c.year,
        role: c.role,
        blurb: c.blurb,
        problem: c.challenge,
        approach: c.approach,
        hardPart: c.hard,
        shipped: c.shipped,
        impact: c.impact,
        stack: c.stack,
        metrics: c.metrics,
        source: c.href,
        dive: c.dive,
        evidence: c.evidence,
        counterfactuals: c.counterfactuals,
        flow: c.flow,
      });
    }

    case "get_experience":
      return ok({ background: profile.background, wins: profile.wins, timeline: timelineMachine?.years ?? null });

    case "get_skills":
      return ok({ groups: profile.stack, process: { steps: profile.process.steps, tools: profile.process.tools, stats: profile.process.stats } });

    case "get_resume":
      return ok({ pdf: profile.resume, page: "https://itzpratham.in/resume" });

    case "get_contact":
      return ok({ email: profile.email, links: profile.links, resume: profile.resume, liveFeed: "https://api.github.com/users/iAMv1/repos?sort=pushed&per_page=5" });

    case "compare_projects": {
      const a = getProject(slug);
      const b = getProject(searchParams.get("with") ?? "");
      if (!a || !b) return err("compare_projects needs ?slug=A&with=B");
      return ok({
        a: { slug: a.slug, title: a.title, stack: a.stack, metrics: a.metrics, focus: a.blurb },
        b: { slug: b.slug, title: b.title, stack: b.stack, metrics: b.metrics, focus: b.blurb },
        shared: a.stack.filter((s) => b.stack.includes(s)),
      });
    }

    case "find_evidence": {
      const hits = allProjects()
        .flatMap((c) =>
          (c.evidence ?? []).map((e) => ({ project: c.slug, claim: e.claim, method: e.method }))
        )
        .filter((e) => e.claim.toLowerCase().includes(q) || e.method.toLowerCase().includes(q));
      const unresolvedHits = unresolved
        .filter((u) => (u.title + u.understand + u.dont + u.trying + u.reading).toLowerCase().includes(q))
        .map((u) => ({ project: "unresolved", claim: u.title, method: u.next }));
      return ok({ evidence: hits, relatedOpenQuestions: unresolvedHits }, { query: q, count: hits.length });
    }

    case "list":
      return ok({
        actions: [
          "get_profile",
          "find_project?skill=<term>",
          "get_project?slug=<slug>",
          "get_experience",
          "get_skills",
          "get_resume",
          "get_contact",
          "compare_projects?slug=A&with=B",
          "find_evidence?claim=<term>",
        ],
        slugs: allProjects().map((s) => s.slug),
      });

    default:
      return err(`unknown action "${action}" — GET /api/agent?action=list`);
  }
}
