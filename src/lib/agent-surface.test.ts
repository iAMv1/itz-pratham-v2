import { describe, expect, it } from "vitest";
import { buildOpenApiSpec } from "@/lib/openapi-spec";
import { pageMarkdown, privacyBodySections } from "@/lib/agent-md";
import { allProjects } from "@/content/projects";

describe("agent surface — OpenAPI spec", () => {
  const spec = buildOpenApiSpec();

  it("is a valid OpenAPI 3.x document with server + info", () => {
    expect(spec.openapi).toMatch(/^3\./);
    expect(spec.info.title).toContain("itzpratham");
    expect(spec.servers[0].url).toBe("https://itzpratham.in");
  });

  it("gives every operation a unique operationId and description (function-calling ready)", () => {
    const ids: string[] = [];
    for (const [path, methods] of Object.entries(spec.paths)) {
      for (const [method, op] of Object.entries(methods as Record<string, { operationId?: string; description?: string; responses?: object }>)) {
        expect(op.operationId, `${method} ${path} missing operationId`).toBeTruthy();
        expect(op.description?.length ?? 0, `${method} ${path} missing description`).toBeGreaterThan(30);
        expect(Object.keys(op.responses ?? {}), `${method} ${path} has no responses`).not.toHaveLength(0);
        ids.push(op.operationId!);
      }
    }
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toContain("agentToolkit");
    expect(ids).toContain("getAllData");
    expect(ids).toContain("getPageMarkdown");
  });

  it("documents every known project slug in the get_project parameter enum", () => {
    const agentOp = spec.paths["/api/agent"].get;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const slugParam = (agentOp.parameters as any[]).find((p) => p.name === "slug");
    expect(slugParam.schema.enum).toEqual(allProjects().map((c) => c.slug));
  });

  it("defines the structured error contract with code + hint required", () => {
    const err = spec.components.schemas.AgentError;
    expect(err.required).toEqual(expect.arrayContaining(["code", "hint"]));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((err.properties.code as any).enum).toContain("unknown_action");
  });
});

describe("agent surface — markdown negotiation content", () => {
  it("renders the home page with identity and recovery links", () => {
    const md = pageMarkdown("/")!;
    expect(md).toContain("# Pratham Nahata");
    expect(md).toContain("/api/data");
    expect(md).toContain("/developers");
  });

  it("renders a full case study from the same repo the site uses", () => {
    const slugs = allProjects().map((c) => c.slug);
    const md = pageMarkdown(`/work/${slugs[0]}`)!;
    expect(md).toContain("# ");
    expect(md).toContain("## The problem");
    expect(md).toContain("## Evidence");
  });

  it("covers privacy with real content (500+ chars) and shared sections", () => {
    const md = pageMarkdown("/privacy")!;
    expect(md.length).toBeGreaterThanOrEqual(500);
    expect(privacyBodySections().length).toBeGreaterThanOrEqual(5);
  });

  it("returns null for unknown paths so the API can send a markdown 404", () => {
    expect(pageMarkdown("/definitely-not-a-page")).toBeNull();
    expect(pageMarkdown("/work/no-such-slug")).toBeNull();
  });

  it("exposes the trust anchors: about, contact, privacy all render", () => {
    for (const p of ["/about", "/contact", "/privacy", "/process", "/testing", "/progress", "/resume"]) {
      const md = pageMarkdown(p);
      expect(md, `${p} has no markdown`).toBeTruthy();
      expect(md!.length, `${p} markdown too thin`).toBeGreaterThan(300);
    }
  });
});
