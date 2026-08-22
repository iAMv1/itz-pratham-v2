import type { Metadata } from "next";
import { allProjects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Developers & Agents",
  description:
    "Developer portal for itzpratham.in — the agent toolkit API, OpenAPI spec, full-content JSON endpoint, markdown content negotiation, and llms.txt guide. No keys, no auth, read-only.",
  alternates: { canonical: "/developers" },
};

const BASE = "https://itzpratham.in";
const slugs = allProjects().map((p) => p.slug);

const ENDPOINTS: { method: string; path: string; desc: string; example: string }[] = [
  {
    method: "GET",
    path: "/api/agent?action=list",
    desc: "Discover every toolkit action and known project slugs. Start here.",
    example: `curl ${BASE}/api/agent?action=list`,
  },
  {
    method: "GET",
    path: "/api/agent?action=get_profile",
    desc: "Name, location, email, roles, headline stats.",
    example: `curl "${BASE}/api/agent?action=get_profile"`,
  },
  {
    method: "GET",
    path: "/api/agent?action=find_project&skill=<term>",
    desc: "Search projects by skill/tech (matches title, blurb, stack, approach).",
    example: `curl "${BASE}/api/agent?action=find_project&skill=onnx"`,
  },
  {
    method: "GET",
    path: `/api/agent?action=get_project&slug=<slug>`,
    desc: `Full case study: problem, hard part, what shipped, impact, metrics, evidence. Slugs: ${slugs.join(", ")}.`,
    example: `curl "${BASE}/api/agent?action=get_project&slug=mindpulse-pro"`,
  },
  {
    method: "GET",
    path: "/api/agent?action=compare_projects&slug=A&with=B",
    desc: "Two projects side by side: stacks, metrics, shared tech.",
    example: `curl "${BASE}/api/agent?action=compare_projects&slug=mindpulse-pro&with=sentinel"`,
  },
  {
    method: "GET",
    path: "/api/agent?action=find_evidence&claim=<term>",
    desc: "Measured claims with their verification method (e.g. '20ms' → how it was measured).",
    example: `curl "${BASE}/api/agent?action=find_evidence&claim=20ms"`,
  },
  {
    method: "GET",
    path: "/api/data",
    desc: "The entire typed content repository as one JSON document (cached 5 min).",
    example: `curl ${BASE}/api/data`,
  },
  {
    method: "GET",
    path: "/api/markdown?path=<path>",
    desc: "Any page as clean markdown — or just send Accept: text/markdown on any page URL.",
    example: `curl -H "Accept: text/markdown" ${BASE}/about`,
  },
];

export default function DevelopersPage() {
  return (
    <main className="relative overflow-hidden px-[clamp(20px,4vw,48px)] pb-[clamp(64px,8vh,110px)] pt-[clamp(120px,14vh,180px)]">
      <span
        aria-hidden
        className="wm-drift pointer-events-none absolute right-[-3%] top-[8%] font-dev text-[clamp(7rem,20vw,16rem)] leading-none text-ink opacity-[0.04]"
      >
        एजेंट
      </span>
      <div className="relative z-10 mx-auto max-w-[860px]">
        <p className="mb-4 inline-block border-2 border-ink bg-saffron px-3 py-1.5 font-mono text-xs tracking-[0.12em] text-ink shadow-[3px_3px_0_0_var(--shadow-ink)]">
          DEVELOPERS · AGENTS · MACHINES
        </p>
        <h1 className="font-display text-[clamp(2.6rem,7vw,5.5rem)] font-semibold uppercase leading-[0.9]">
          THE <span className="text-cobalt">AGENT</span> TOOLKIT
        </h1>
        <p className="mt-5 max-w-[62ch] text-lg font-medium leading-relaxed">
          Everything on this site is available as structured data — no API keys, no auth, no rate limits beyond
          common sense. Read-only GETs, JSON everywhere, errors that tell you how to recover.
        </p>

        <section className="mt-10 border-2 border-ink bg-paper-2 p-[clamp(18px,2.6vw,28px)] shadow-hard">
          <h2 className="font-display text-xl font-semibold uppercase tracking-wide text-cobalt">Quickstart</h2>
          <pre className="mt-3 overflow-x-auto border-2 border-ink bg-ink-2 p-4 font-mono text-[12.5px] leading-relaxed text-paper">{`# discover the toolkit
curl ${BASE}/api/agent?action=list

# find projects by skill
curl "${BASE}/api/agent?action=find_project&skill=gnn"

# full case study with receipts
curl "${BASE}/api/agent?action=get_project&slug=mindpulse-pro"`}</pre>
        </section>

        <section className="mt-6 border-2 border-ink bg-paper-2 p-[clamp(18px,2.6vw,28px)] shadow-hard">
          <h2 className="font-display text-xl font-semibold uppercase tracking-wide text-cobalt">Endpoints</h2>
          <div className="mt-4 space-y-4">
            {ENDPOINTS.map((e) => (
              <div key={e.path} className="border-l-[3px] border-saffron pl-4">
                <p className="font-mono text-[13px] font-medium">
                  <span className="mr-2 bg-ink px-1.5 py-0.5 text-[10px] tracking-widest text-mint">{e.method}</span>
                  {e.path}
                </p>
                <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">{e.desc}</p>
                <code className="mt-1 block overflow-x-auto whitespace-nowrap font-mono text-[11.5px] text-saffron-deep">{e.example}</code>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            { h: "OpenAPI spec", p: "Typed schema for every operation — function-calling ready.", href: "/openapi.json", cta: "/openapi.json" },
            { h: "llms.txt guide", p: "When to use this site, what's here, and where to look next.", href: "/llms.txt", cta: "/llms.txt" },
            { h: "Markdown everywhere", p: "Send Accept: text/markdown on any page URL for a markdown twin.", href: "/api/markdown?path=/work", cta: "try it on /work" },
            { h: "Privacy", p: "Zero collection. The page agents check before recommending anyone.", href: "/privacy", cta: "/privacy" },
          ].map((c) => (
            <a key={c.h} href={c.href} className="group border-2 border-ink bg-paper-2 p-[clamp(16px,2.4vw,24px)] shadow-hard transition-transform duration-150 ease-out hover:-translate-y-[2px]">
              <h3 className="font-display text-lg font-semibold uppercase tracking-wide">{c.h}</h3>
              <p className="mt-1 text-[13.5px] leading-relaxed text-muted-foreground">{c.p}</p>
              <p className="mt-2 font-mono text-[11.5px] tracking-wider text-cobalt group-hover:text-saffron-deep">{c.cta} ↗</p>
            </a>
          ))}
        </section>

        <section className="mt-6 border-2 border-dashed border-saffron-deep bg-transparent p-[clamp(16px,2.4vw,24px)]">
          <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-saffron-deep">Error contract</h2>
          <p className="mt-2 max-w-[64ch] text-[14px] leading-relaxed text-muted-foreground">
            Bad queries return HTTP 400/404 with{" "}
            <code className="bg-paper-2 px-1 py-0.5 font-mono text-[12px]">{`{ ok:false, code, error, hint }`}</code>. The
            hint names the corrected query or the discovery endpoint — an agent should never dead-end here.
          </p>
        </section>
      </div>
    </main>
  );
}
