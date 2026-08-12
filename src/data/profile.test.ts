import { describe, expect, it } from "vitest";
import { metro, profile } from "@/data/profile";
import { allProjects, getProject } from "@/content/projects";

describe("profile content integrity", () => {
  it("has real contact data", () => {
    expect(profile.email).toContain("@");
    expect(profile.resume).toContain(".pdf");
    expect(profile.links.github).toContain("github.com");
    expect(profile.links.linkedin).toContain("linkedin.com");
  });

  it("has the wins proof band", () => {
    expect(profile.proofBand).toHaveLength(4);
    expect(profile.wins.list).toHaveLength(5);
  });

  it("metro map has 4 lines and a hub", () => {
    expect(metro.lines).toHaveLength(4);
    expect(metro.hub).toBeTruthy();
    for (const l of metro.lines) {
      expect(l.stations.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("stack has 4 groups", () => {
    expect(profile.stack).toHaveLength(4);
  });
});

describe("content repository (src/content/projects/*.mdx)", () => {
  it("loads 4 projects from MDX files with unique slugs", () => {
    const projects = allProjects();
    expect(projects).toHaveLength(4);
    const slugs = new Set(projects.map((c) => c.slug));
    expect(slugs.size).toBe(4);
  });

  it("every project carries the full container contract", () => {
    for (const c of allProjects()) {
      expect(c.href).toMatch(/^https:\/\//);
      expect(c.impact.length).toBeGreaterThanOrEqual(3);
      expect(c.stack.length).toBeGreaterThanOrEqual(3);
      expect(c.flow.length).toBeGreaterThanOrEqual(3);
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
