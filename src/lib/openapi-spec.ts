import { allProjects } from "@/content/projects";

/**
 * OpenAPI 3.1 specification for the itzpratham.in agent surface (served at /openapi.json).
 * Kept in a plain module so unit tests can validate the contract without HTTP.
 * Every operation carries a unique operationId + description; errors follow { ok:false, code, error, hint }.
 */
export function buildOpenApiSpec() {
  const slugs = allProjects().map((p) => p.slug);

  return {
    openapi: "3.1.0",
    info: {
      title: "itzpratham.in Agent API",
      version: "1.0.0",
      summary: "Machine-readable access to Pratham Nahata's portfolio: profile, projects, experience, skills, evidence.",
      description:
        "Query the portfolio of Pratham Nahata (full-stack & ML engineer, Delhi) as structured JSON. " +
        "Use `action`-based endpoints to find projects by skill, pull case-study details with measured evidence, " +
        "fetch contact/resume data, or compare two projects' stacks and metrics. " +
        "Human/agent docs: https://itzpratham.in/developers · Site guide for LLMs: https://itzpratham.in/llms.txt",
      contact: { name: "Pratham Nahata", email: "iam1nahata@gmail.com", url: "https://itzpratham.in" },
      license: { name: "MIT", url: "https://github.com/iAMv1/itz-pratham-v2" },
    },
    servers: [{ url: "https://itzpratham.in", description: "production" }],
    tags: [
      { name: "agent", description: "Action-based toolkit for LLM agents (WebMCP-aligned)" },
      { name: "data", description: "Full content repository as one JSON document" },
      { name: "content", description: "Pages as markdown via content negotiation" },
    ],
    paths: {
      "/api/agent": {
        get: {
          tags: ["agent"],
          operationId: "agentToolkit",
          summary: "Run one toolkit action (use action=list to discover all)",
          description:
            "Single endpoint, action-switched. Start with `action=list`, then call specific actions. " +
            "Errors return HTTP 400/404 with `{ok:false, code, error, hint}` so agents can self-correct.",
          parameters: [
            {
              name: "action",
              in: "query",
              required: true,
              description:
                "One of: list, get_profile, find_project, get_project, get_experience, get_skills, get_resume, get_contact, compare_projects, find_evidence",
              schema: {
                type: "string",
                enum: ["list", "get_profile", "find_project", "get_project", "get_experience", "get_skills", "get_resume", "get_contact", "compare_projects", "find_evidence"],
                default: "get_profile",
              },
            },
            { name: "skill", in: "query", description: "Search term for find_project (matches title, blurb, stack, approach)", schema: { type: "string" }, examples: { onnx: { value: "onnx" } } },
            { name: "slug", in: "query", description: `Project slug for get_project / first operand of compare_projects. Known slugs: ${slugs.join(", ")}`, schema: { type: "string", enum: [...slugs] } },
            { name: "with", in: "query", description: "Second project slug for compare_projects", schema: { type: "string" } },
            { name: "claim", in: "query", description: "Claim substring for find_evidence (e.g. '20ms')", schema: { type: "string" } },
          ],
          responses: {
            "200": {
              description: "Action result. Shape: {action, ok:true, …extra, data}. data contents depend on action.",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/AgentOk" },
                  examples: {
                    get_profile: {
                      value: {
                        action: "get_profile",
                        ok: true,
                        data: { name: "Pratham Nahata", location: "Delhi, India", email: "iam1nahata@gmail.com", rota: ["Full-Stack x ML Engineer"] },
                      },
                    },
                    list: { value: { action: "list", ok: true, data: { actions: ["get_profile", "find_project?skill=<term>"], slugs } } },
                  },
                },
              },
            },
            "400": {
              description: "Unknown action or missing parameter. Body names the problem and how to fix it.",
              content: { "application/json": { schema: { $ref: "#/components/schemas/AgentError" } } },
            },
          },
        },
      },
      "/api/data": {
        get: {
          tags: ["data"],
          operationId: "getAllData",
          summary: "The entire content repository as one JSON document",
          description:
            "Profile, about, process, timeline, unresolved questions, metro map, and every case study (including rendered bodyHtml). " +
            "Cache-friendly: s-maxage=300. Prefer /api/agent for targeted queries; use this for indexing the whole site in one request.",
          responses: {
            "200": { description: "Full content snapshot.", content: { "application/json": { schema: { $ref: "#/components/schemas/DataEnvelope" } } } },
          },
        },
      },
      "/api/markdown": {
        get: {
          tags: ["content"],
          operationId: "getPageMarkdown",
          summary: "Any page of this site as clean markdown",
          description:
            "Also reachable by sending `Accept: text/markdown` on any page URL — middleware rewrites transparently. " +
            "Known paths: /, /work, /work/{slug}, /about, /contact, /process, /testing, /progress, /resume, /privacy, /now, /route.",
          parameters: [
            { name: "path", in: "query", required: true, description: "Site path to render, e.g. /about or /work/mindpulse-pro", schema: { type: "string" }, examples: { about: { value: "/about" } } },
          ],
          responses: {
            "200": { description: "Markdown document.", content: { "text/markdown": { schema: { type: "string" } } } },
            "404": { description: "Unknown path — markdown body lists recovery links.", content: { "text/markdown": { schema: { type: "string" } } } },
          },
        },
      },
    },
    components: {
      schemas: {
        AgentOk: {
          type: "object",
          properties: {
            action: { type: "string" },
            ok: { type: "boolean", const: true },
            query: { type: "string" },
            count: { type: "integer" },
            data: { description: "Action-specific payload (profile object, project array, comparison result…)" },
          },
          required: ["action", "ok", "data"],
        },
        AgentError: {
          type: "object",
          properties: {
            action: { type: "string" },
            ok: { type: "boolean", const: false },
            error: { type: "string", description: "Human-readable message" },
            code: { type: "string", enum: ["unknown_action", "missing_param", "not_found"] },
            hint: { type: "string", description: "Resolution hint — usually a corrected query or the discovery endpoint" },
          },
          required: ["action", "ok", "error", "code", "hint"],
        },
        DataEnvelope: {
          type: "object",
          properties: {
            meta: {
              type: "object",
              properties: {
                name: { type: "string" },
                url: { type: "string", format: "uri" },
                generated: { type: "string", format: "date-time" },
                agentToolkit: { type: "string", format: "uri" },
              },
            },
            profile: { type: "object" },
            about: { type: "object" },
            process: { type: "object" },
            timeline: { type: "object" },
            unresolved: { type: "array", items: { type: "object" } },
            metro: { type: "object" },
            caseStudies: { type: "array", items: { type: "object" } },
          },
          required: ["meta", "profile", "caseStudies"],
        },
      },
    },
  };
}

export type OpenApiSpec = ReturnType<typeof buildOpenApiSpec>;
