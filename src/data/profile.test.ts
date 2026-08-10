import { describe, expect, it } from "vitest";
import { caseStudies, metro, profile } from "@/data/profile";

describe("profile content integrity", () => {
  it("has real contact data", () => {
    expect(profile.email).toContain("@");
    expect(profile.resume).toContain(".pdf");
    expect(profile.links.github).toContain("github.com");
    expect(profile.links.linkedin).toContain("linkedin.com");
  });

  it("has 4 projects with unique slugs and real hrefs", () => {
    expect(caseStudies).toHaveLength(4);
    const slugs = new Set(caseStudies.map((c) => c.slug));
    expect(slugs.size).toBe(4);
    for (const c of caseStudies) {
      expect(c.href).toMatch(/^https:\/\//);
      expect(c.impact.length).toBeGreaterThanOrEqual(3);
      expect(c.stack.length).toBeGreaterThanOrEqual(3);
    }
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
