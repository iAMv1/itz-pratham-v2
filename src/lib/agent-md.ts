import { profile } from "@/data/profile";
import { allProjects, getProject } from "@/content/projects";
import { about, timeline, unresolved, metro, processContent } from "@/content/site";
import { progressEntries } from "@/content/meta";

/**
 * AGENT MARKDOWN SURFACE — every page as clean markdown.
 * Served when a client sends Accept: text/markdown (middleware rewrites to /api/markdown).
 * Same content repository that renders the HTML site — no second source of truth.
 */

const BASE = "https://itzpratham.in";

const h1 = (s: string) => `# ${s}`;
const h2 = (s: string) => `\n## ${s}`;
const li = (s: string) => `- ${s}`;
const kv = (k: string, v: string | number) => `- **${k}:** ${v}`;

function homeMd(): string {
  const stats = about().stats;
  return [
    h1(`${profile.name} — ${profile.rota[0]}`),
    "",
    profile.deck,
    "",
    h2("At a glance"),
    ...stats.map((s) => li(`${s.prefix ?? ""}${s.value}${s.suffix ?? ""} — ${s.label}`)),
    h2("Where to go next"),
    li(`[Work & case studies](${BASE}/work) — every project with receipts`),
    li(`[About](${BASE}/about) — journey, timeline, off the clock`),
    li(`[Process](${BASE}/process) — how I build and why it matters`),
    li(`[Contact](${BASE}/contact) — email, socials, live GitHub feed`),
    li(`[Machine-readable data](${BASE}/api/data) · [Agent toolkit](${BASE}/api/agent?action=list)`),
    li(`[OpenAPI spec](${BASE}/openapi.json) · [Developer portal](${BASE}/developers)`),
    "",
  ].join("\n");
}

function workIndexMd(): string {
  return [
    h1("Work — case studies with receipts"),
    "",
    "Every project documents the problem, the hard part, what shipped, and measured impact.",
    "",
    ...allProjects().flatMap((c) => [
      `### [${c.title}](${BASE}/work/${c.slug})`,
      `${c.year} · ${c.role}`,
      "",
      c.blurb,
      "",
      kv("Stack", c.stack.join(", ")),
      kv("Metrics", c.metrics),
      "",
    ]),
    h2("Also here"),
    li(`[This data in JSON](${BASE}/api/data)`),
    li(`[Find a project by skill](${BASE}/api/agent?action=find_project&skill=onnx)`),
    "",
  ].join("\n");
}

function projectMd(slug: string): string | null {
  const c = getProject(slug);
  if (!c) return null;
  return [
    h1(c.title),
    "",
    `${c.year} · ${c.role} · [source](${c.href})`,
    "",
    c.blurb,
    "",
    h2("The problem"),
    c.challenge,
    h2("Approach"),
    c.approach,
    h2("The hard part"),
    c.hard,
    h2("What shipped"),
    c.shipped,
    h2("Impact"),
    ...c.impact.map((i) => li(i)),
    h2("Stack"),
    c.stack.map((s) => `\`${s}\``).join(" · "),
    "",
    kv("Metrics", c.metrics),
    ...(c.limitations ? [kv("Limitations", c.limitations)] : []),
    h2("Evidence"),
    ...(c.evidence ?? []).map((e) => li(`**${e.claim}** — ${e.method}`)),
    h2("Counterfactuals (what-if engineering answers)"),
    ...(c.counterfactuals ?? []).map((x) => li(`**${x.label}** ${x.answer}`)),
    "",
    `Markdown index of all projects: ${BASE}/work (.md via Accept header)`,
    "",
  ].join("\n");
}

function aboutMd(): string {
  const a = about();
  return [
    h1(`About — ${profile.name}`),
    "",
    profile.deck,
    "",
    h2("Facts"),
    ...a.facts.map((f) => kv(f.key, f.value)),
    h2("Background"),
    ...a.background.flatMap((b) => [`### ${b.role} ${b.co} (${b.years})`, b.desc, kv("Status", b.status), ""]),
    h2("Timeline"),
    ...timeline().years.map((y) =>
      li(`**${y.year}** — ${y.stage}. Building: ${y.building}. Learning: ${y.learning}`)
    ),
    h2("Off the clock"),
    ...a.offClock.books.map((b) => li(`**${b.title}** — ${b.take}`)),
    "",
    `HTML version: ${BASE}/about`,
    "",
  ].join("\n");
}

function contactMd(): string {
  return [
    h1("Contact"),
    "",
    "Have a product, system, or research problem worth solving? The inbox is open.",
    "",
    kv("Email", profile.email),
    kv("GitHub", String(profile.links.github)),
    kv("LinkedIn", String(profile.links.linkedin)),
    kv("Resume PDF", String(profile.resume)),
    "",
    h2("Useful to include"),
    "- the problem",
    "- desired outcome",
    "- timeline",
    "- technical constraints",
    "- how you found me",
    "",
    `HTML version: ${BASE}/contact · JSON: ${BASE}/api/agent?action=get_contact`,
    "",
  ].join("\n");
}

function processMd(): string {
  const p = processContent();
  return [
    h1("Process — how I build"),
    "",
    ...p.steps.flatMap((s) => [
      `### ${s.num} — ${s.title}`,
      s.sub,
      kv("Command", `\`${s.cmd}\``),
      kv("Output", s.out),
      ...(s.artifacts.length ? [kv("Artifacts", s.artifacts.join(", "))] : []),
      "",
    ]),
    h2("Tools"),
    p.tools.join(", "),
    "",
    `HTML version: ${BASE}/process`,
    "",
  ].join("\n");
}

function unresolvedMd(): string {
  return [
    h1("Currently unresolved"),
    "",
    "What I do not know yet — documented, not hidden.",
    "",
    ...unresolved().items.flatMap((u) => [
      `### ${u.title}`,
      kv("I understand", u.understand),
      kv("I don't yet", u.dont),
      kv("Trying", u.trying),
      kv("Next", u.next),
      "",
    ]),
    `HTML version: ${BASE}/about#now`,
    "",
  ].join("\n");
}

function simpleMd(title: string, intro: string, sections: [string, string[]][], back: string): string {
  return [
    h1(title),
    "",
    intro,
    "",
    ...sections.flatMap(([h, items]) => [h2(h), ...items]),
    "",
    `HTML version: ${back}`,
    "",
  ].join("\n");
}

function testingMd(): string {
  return simpleMd(
    "Testing — this portfolio is tested like a product",
    "Every interactive flow has an automated check. The test matrix is itself a page, fed by the same data as the CI suite.",
    [
      ["What is covered", ["22 Playwright e2e flows across every route", "Unit tests on content integrity (16 checks)", "Zero console errors policy"]],
      ["See it live", ["Test matrix page: https://itzpratham.in/testing", "Lighthouse numbers are measured, then shipped into the UI"]],
    ],
    `${BASE}/testing`
  );
}

function progressMd(): string {
  const entries = progressEntries();
  return [
    h1("Progress log"),
    "",
    "A dated build log of everything shipped on this site, newest first.",
    "",
    h2(`Entries (${entries.length})`),
    ...entries.map((e) => li(`**${e.piece}** — ${e.status} (${e.wave})${e.note ? `: ${e.note}` : ""}`)),
    "",
    `Machine-readable: ${BASE}/api/data`,
    `HTML version: ${BASE}/progress`,
    "",
  ].join("\n");
}

function resumeMd(): string {
  const bg = about().background;
  return [
    h1("Resume"),
    "",
    kv("PDF (ATS-safe)", String(profile.resume)),
    kv("HTML viewer", `${BASE}/resume`),
    kv("Structured experience (JSON)", `${BASE}/api/agent?action=get_experience`),
    "",
    "The PDF is generated, ATS-checked, and re-verified on every content change.",
    "",
    h2("Background summary"),
    ...bg.map((b) => li(`**${b.role}** ${b.co} (${b.years}) — ${b.status}`)),
    h2("Skills"),
    ...profile.stack.map((g) => li(`**${g.name}** — ${g.pills.join(", ")}`)),
    "",
  ].join("\n");
}

function privacyMd(): string {
  return [
    h1("Privacy"),
    "",
    "Short version: this portfolio collects nothing.",
    "",
    ...privacyBodySections().flatMap(([h, items]) => [h2(h), ...items.map(li), ""]),
    "",
  ].join("\n");
}

/** Shared by the /privacy page and its markdown twin so the two never diverge. */
export function privacyBodySections(): [string, string[]][] {
  return [
    ["No analytics, no trackers, no cookies", [
      "There is no Google Analytics, no ads, no fingerprinting, no third-party tracker scripts on this site.",
      "No consent banner is needed because no personal data is collected in the first place.",
    ]],
    ["What the server sees anyway", [
      "Standard hosting logs (Vercel) may record IP address, user agent, and requested URL for security and abuse prevention. This is infrastructure logging, retained by the host under Vercel's own policy — I do not export, sell, or profile it.",
    ]],
    ["Client-side calls you trigger", [
      "GitHub activity widgets fetch public data from api.github.com when you view them. No identity leaves your browser beyond an anonymous request.",
      "If you click 'copy email', your browser copies text to your clipboard locally. Nothing is sent anywhere.",
    ]],
    ["Contacting me", [
      "Email sent to iam1nahata@gmail.com is stored in my mailbox like any normal email. It is used only to reply to you.",
    ]],
    ["Children", [
      "This is a professional portfolio and does not target children.",
    ]],
    ["Changes", [
      "If this policy ever changes materially, the change will be noted on this page with a date.",
    ]],
    ["Contact for privacy questions", [
      "iam1nahata@gmail.com — same inbox, fastest route.",
    ]],
  ];
}

/** Metro map as markdown (stations per line). */
function metroMd(): string {
  const m = metro();
  return [
    h1(m.title || "Career route map"),
    "",
    `Hub: ${m.hub}`,
    "",
    ...m.lines.flatMap((l) => [`### ${l.name}`, ...l.stations.map((s) => li(s)), ""]),
    `HTML version: ${BASE}/about`,
    "",
  ].join("\n");
}

const ROUTES: Record<string, () => string> = {
  "/": homeMd,
  "/work": workIndexMd,
  "/about": aboutMd,
  "/contact": contactMd,
  "/process": processMd,
  "/testing": testingMd,
  "/progress": progressMd,
  "/resume": resumeMd,
  "/privacy": privacyMd,
};

export function pageMarkdown(pathname: string): string | null {
  const p = pathname.replace(/\/+$/, "") || "/";
  if (ROUTES[p]) return ROUTES[p]();
  if (p === "/now" || p === "/unresolved") return unresolvedMd();
  if (p === "/route" || p === "/metro") return metroMd();
  const m = p.match(/^\/work\/([\w-]+)$/);
  if (m) return projectMd(m[1]);
  // known aliases
  if (p === "/projects") return workIndexMd();
  return null;
}
