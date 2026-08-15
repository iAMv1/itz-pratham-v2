import { describe, expect, it } from "vitest";
import { profile } from "@/data/profile";
import { allProjects, getProject } from "@/content/projects";
import { about, timeline, unresolved, metro, processContent } from "@/content/site";
import { progressEntries, testingSuites } from "@/content/meta";

describe("profile identity", () => {
  it("has real contact data", () => {
    expect(profile.email).toContain("@");
    expect(profile.resume).toContain(".pdf");
    expect(profile.links.github).toContain("github.com");
    expect(profile.links.linkedin).toContain("linkedin.com");
  });

  it("stack has 4 groups + marquees", () => {
    expect(profile.stack).toHaveLength(4);
    expect(profile.skillsMarquee.length).toBeGreaterThan(10);
    expect(profile.nameMarquee.length).toBeGreaterThanOrEqual(4);
  });
});

describe("content repository (src/content/projects/*.mdx)", () => {
  it("loads 4 projects from MDX files with unique slugs", () => {
    const projects = allProjects();
    expect(projects.length).toBeGreaterThanOrEqual(4);
    const slugs = new Set(projects.map((c) => c.slug));
    expect(slugs.size).toBeGreaterThanOrEqual(4);
  });

  it("every project carries the full container contract", () => {
    for (const c of allProjects()) {
      expect(c.href).toMatch(/^https:\/\//);
      expect(c.impact.length).toBeGreaterThanOrEqual(3);
      expect(c.stack.length).toBeGreaterThanOrEqual(3);
      expect(c.flow.length).toBeGreaterThanOrEqual(3);
      expect(c.architecture.length).toBeGreaterThanOrEqual(3);
      expect(c.dive.length).toBeGreaterThanOrEqual(4);
      expect(c.evidence.length).toBeGreaterThanOrEqual(3);
      expect(c.counterfactuals.length).toBeGreaterThanOrEqual(2);
      expect(c.hard.length).toBeGreaterThan(20);
      expect(c.shipped.length).toBeGreaterThan(20);
      expect(c.bodyHtml).toContain("<p>");
    }
  });

  it("getProject resolves a slug and returns undefined for unknowns", () => {
    expect(getProject("mindpulse-pro")?.title).toBe("MIND PULSE PRO");
    expect(getProject("nope")).toBeUndefined();
  });

  it("counterfactuals live inside each project file", () => {
    const mp = getProject("mindpulse-pro");
    expect(mp?.counterfactuals[0].label).toContain("server");
    expect(mp?.counterfactuals[0].answer.length).toBeGreaterThan(100);
  });
});

describe("site content repository (src/content/site/*.mdx)", () => {
  it("about carries stats, offClock and background", () => {
    const a = about();
    expect(a.stats).toHaveLength(4);
    expect(a.offClock.books.length).toBeGreaterThanOrEqual(4);
    expect(a.background.length).toBeGreaterThanOrEqual(3);
    expect(a.facts.length).toBeGreaterThanOrEqual(4);
  });

  it("process has 4 steps with proofs + tools", () => {
    const p = processContent();
    expect(p.steps).toHaveLength(4);
    for (const s of p.steps) expect(s.proof?.label).toBeTruthy();
    expect(p.tools.length).toBeGreaterThanOrEqual(2);
  });

  it("timeline has 5 years and unresolved has 4 items", () => {
    expect(timeline().years).toHaveLength(5);
    expect(unresolved().items).toHaveLength(4);
  });

  it("metro has 3+ lines and a hub", () => {
    expect(metro().lines.length).toBeGreaterThanOrEqual(3);
    expect(metro().hub).toBeTruthy();
    for (const l of metro().lines) {
      expect(l.stations.length).toBeGreaterThanOrEqual(2);
    }
  });
});

describe("meta content repository (src/content/meta/*.mdx)", () => {
  it("progress log is data-driven with 21+ entries", () => {
    const items = progressEntries();
    expect(items.length).toBeGreaterThanOrEqual(21);
    for (const it of items) {
      expect(it.piece.length).toBeGreaterThan(2);
      expect(it.wave).toBeTruthy();
      expect(it.status).toBeTruthy();
      expect(it.note.length).toBeGreaterThan(5);
    }
  });

  it("testing matrix is data-driven with 20+ flows across suites", () => {
    const suites = testingSuites();
    expect(suites.length).toBeGreaterThanOrEqual(4);
    const total = suites.reduce((acc, s) => acc + s.flows.length, 0);
    expect(total).toBeGreaterThanOrEqual(20);
    for (const s of suites) {
      expect(s.name.length).toBeGreaterThan(2);
      expect(s.flows.length).toBeGreaterThan(0);
    }
  });
});
