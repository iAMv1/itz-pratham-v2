export type Stat = { value: number; prefix?: string; suffix?: string; label: string };
export type StackGroup = { name: string; pills: string[]; wide?: boolean; note?: string };

export const profile: {
  name: string;
  shortName: string;
  location: string;
  region: string;
  email: string;
  resume: string;
  links: { github: string; linkedin: string; email: string };
  rota: string[];
  deck: string;
  stats: Stat[];
  facts: { key: string; value: string }[];
  manifesto: { html: string }[];
  cards: { label: string; title: string; body: string }[];
  process: {
    title: string;
    lines: { kind: string; text: string; num?: string; cursor?: boolean }[];
    steps: { num: string; title: string; sub: string; cmd: string; out: string; artifacts: string[] }[];
    tools: string[];
    stats: { value: string; label: string }[];
  };
  background: { years: string; role: string; co: string; desc: string; tags: string; status: string }[];
  wins: {
    featured: { value: number; suffix: string; title: string; desc: string; tag: string };
    list: { num: string; title: string; sub: string; year: string }[];
  };
  proofBand: Stat[];
  projects: {
    index: string;
    year: string;
    title: string;
    featured?: boolean;
    desc: string;
    metrics: string;
    tags: string;
    href: string;
    art: string;
  }[];
  stack: StackGroup[];
  skillsMarquee: string[];
  nameMarquee: string[];
} = {
  name: "Pratham Nahata",
  shortName: "Pratham",
  location: "Delhi, India",
  region: "बीकानेर · राजस्थान",
  email: "iam1nahata@gmail.com",
  resume: "/assets/Pratham_Nahata_Resume_ATS.pdf",
  links: {
    github: "https://github.com/iAMv1",
    linkedin: "https://linkedin.com/in/iamprathamnahata",
    email: "mailto:iam1nahata@gmail.com",
  },
  rota: ["Vibe Builder", "Full-Stack Engineer", "ML Systems Builder", "Product Designer"],
  deck:
    "CS undergrad building full-stack + ML systems — real-time inference, graph neural networks, multi-agent AI. Interfaces that feel alive, models that actually ship.",
  stats: [
    { value: 492960, suffix: "+", label: "SIH 2024 grand finalist" },
    { prefix: "TOP ", value: 5, label: "AlgoQuest · 300+ teams" },
    { prefix: "<", value: 20, suffix: "ms", label: "browser ML inference" },
  ],
  facts: [
    { key: "FROM", value: "Delhi, India" },
    { key: "DEGREE", value: "B.Tech CSE · BVCOE" },
    { key: "FOCUS", value: "Full-stack × ML" },
    { key: "NOW", value: "MindPulse Pro v2" },
  ],
  manifesto: [
    {
      html: "I'm a CS undergrad who fell into design through curiosity and into code through wanting to build things without asking permission. Now I build full-stack + ML systems — real-time inference pipelines, graph neural networks, multi-agent AI — and I care how they <em>feel</em> to use.",
    },
    {
      html: "My working theory: a model isn't done when it scores well on a benchmark, and a product isn't done when the features ship. It's done when it <strong>feels right</strong> — motion honest, type with a pulse, nobody asks where to click.",
    },
  ],
  cards: [
    { label: "01 / FEEL", title: "Vibe", body: "Does it feel right? Motion, tone, personality — the stuff people remember after they close the tab." },
    { label: "02 / THINK", title: "Clarity", body: "Can a stranger understand it in 5 seconds? Hierarchy, plain words, zero guesswork." },
    { label: "03 / BUILD", title: "Craft", body: "Is it built right? Accessible, fast, reproducible — the invisible stuff that makes work last." },
  ],
  process: {
    title: "pratham@nahata — bash — 80×24",
    lines: [
      { kind: "comment", text: "# shipping vibe-first systems since 2023" },
      { kind: "cmd", text: "pratham --plan --stack fastapi nextjs pytorch", cursor: true },
      { kind: "step", num: "01 · DISCOVER", text: "unpack the problem — talk to real humans, find the actual pain" },
      { kind: "step", num: "02 · DESIGN", text: "sketch the vibe — moodboards, type, motion language, lo-fi prototypes" },
      { kind: "step", num: "03 · BUILD", text: "ship fast — semantic HTML, design tokens, motion done right" },
      { kind: "step", num: "04 · POLISH", text: "measure & refine — micro-interactions, a11y, perf, make it feel expensive" },
      { kind: "ok", text: "✓ done in 2 weeks, not 2 months — you keep the source, I keep the vibes" },
    ],
    steps: [
      { num: "01", title: "DISCOVER", sub: "talk to real humans · find the pain", cmd: "pratham --plan", out: "unpack the problem — real users, real constraints, the actual pain underneath the ask", artifacts: ["USER INTERVIEWS", "PAIN MAP", "ONE-PAGE BRIEF"] },
      { num: "02", title: "DESIGN", sub: "moodboards · type · motion language", cmd: "pratham --design", out: "sketch the vibe — moodboards, type scale, motion language, lo-fi prototypes you can click", artifacts: ["MOODBOARDS", "DESIGN TOKENS", "LO-FI PROTOTYPE"] },
      { num: "03", title: "BUILD", sub: "semantic HTML · tokens · fast", cmd: "pratham --build", out: "ship fast — semantic markup, tokens not chaos, CI-green, preview links every day", artifacts: ["COMPONENT LIBRARY", "CI GREEN", "DAILY PREVIEWS"] },
      { num: "04", title: "POLISH", sub: "a11y · perf · feel expensive", cmd: "pratham --polish", out: "measure & refine — a11y pass, perf budget, micro-interactions until it feels expensive", artifacts: ["A11Y PASS", "PERF BUDGET", "SHIP LOG"] },
    ],
    stats: [
      { value: "4", label: "PHASES" },
      { value: "2WK", label: "AVG LOOP" },
      { value: "AA", label: "CONTRAST" },
      { value: "100%", label: "VIBES" },
    ],
    tools: ["STACK — FastAPI · Next.js · PyTorch · ONNX · Supabase · Docker", "VIBES — motion-first · tokens · a11y · perf budgets"],
  },
  background: [
    { years: "2023—27", role: "B.Tech, Computer Science", co: "@ BVCOE Delhi", desc: "Systems, ML and the parts of engineering that ship. Where most of the 3am project ideas started.", tags: "DATA STRUCTURES · ML · SYSTEMS", status: "UNDERGRAD" },
    { years: "2025—26", role: "BSc Foundation, Data Science", co: "@ IIT Madras (online)", desc: "Mathematics, statistics and ML foundations from one of India's best — the theory behind the shipped models.", tags: "MATH · STATS · ML FOUNDATIONS", status: "ONGOING" },
    { years: "2024", role: "Open Source Contributor", co: "@ GSSoC 2024", desc: "Shipped merged contributions across open-source repos during GirlScript Summer of Code.", tags: "OPEN SOURCE · COLLABORATION", status: "OSS" },
    { years: "2024", role: "Organizer & Lead", co: "@ Generative AI Workshop", desc: "Designed and delivered a hands-on workshop on real-world LLM applications for 50+ participants.", tags: "LLMS · TEACHING · WORKSHOPS", status: "LED" },
  ],
  wins: {
    featured: {
      value: 492960,
      suffix: "+",
      title: "Grand Finalist — Smart India Hackathon 2024",
      desc: "National grand finale among nearly half a million participants. The biggest arena I've shipped in.",
      tag: "SIH 2024",
    },
    list: [
      { num: "01", title: "Top 5 Finalist — AlgoQuest", sub: "300+ teams · iSOURCE", year: "2024" },
      { num: "02", title: "Open Source — GSSoC '24", sub: "merged PRs across projects", year: "2024" },
      { num: "03", title: "Workshop Lead — Generative AI", sub: "50+ participants", year: "2024" },
      { num: "04", title: "Ranked 2nd — Volleyball & Basketball", sub: "Ranbhoomi", year: "2023+" },
      { num: "05", title: "Certifications", sub: "CS50 · CS50W · ML Spec · Postman", year: "2024" },
    ],
  },
  proofBand: [
    { value: 492960, suffix: "+", label: "SIH 2024 PARTICIPANTS" },
    { prefix: "TOP ", value: 5, label: "ALGOQUEST · 300+ TEAMS" },
    { prefix: "<", value: 20, suffix: "MS", label: "ONNX BROWSER INFERENCE" },
    { value: 4, label: "SHIPPED SYSTEMS" },
  ],
  projects: [
    {
      index: "01",
      year: "2026",
      title: "MIND PULSE PRO",
      featured: true,
      desc: "Real-time behavioral stress detection — keystroke & mouse dynamics, 50+ temporal features, XGBoost → ONNX, inference under 20ms in the browser, SHAP explainability, offline WebLLM coaching.",
      metrics: "20MS INFERENCE · 50+ FEATURES · TAU DESKTOP",
      tags: "FASTAPI · NEXT.JS · ONNX · WEBSOCKETS · TAURI",
      href: "https://github.com/iAMv1/mindpulse",
      art: "/assets/art-mindpulse.jpg",
    },
    {
      index: "02",
      year: "2025",
      title: "UNIFIED-DTA",
      desc: "Drug-target affinity — ESM-2 + Graph Isomorphism Networks, trained on BindingDB/DAVIS/KIBA, Dockerized inference.",
      metrics: "3 BENCHMARKS · ESM-2 + GIN",
      tags: "PYTORCH · ESM-2 · GNN · FASTAPI",
      href: "https://github.com/iAMv1/unified-dta-project",
      art: "/assets/art-dta.jpg",
    },
    {
      index: "03",
      year: "2025",
      title: "SENTINEL",
      desc: "Enterprise wellbeing analytics — burnout-risk ML from anonymized patterns, graph team analysis, 3-agent AI orchestration.",
      metrics: "3-AGENT · GRAPH ANALYTICS",
      tags: "FASTAPI · REACT · MULTI-AGENT",
      href: "https://github.com/iAMv1",
      art: "/assets/art-sentinel.jpg",
    },
    {
      index: "04",
      year: "2026",
      title: "OMNISECTESTER",
      desc: "Defense-in-depth security testing framework — web, extensions, desktop, mobile, cloud, AI/LLM, hardware, supply chain from one CLI.",
      metrics: "7 SURFACES · 1 CLI",
      tags: "JAVASCRIPT · CLI · SECURITY",
      href: "https://github.com/iAMv1/omnisectester",
      art: "/assets/art-omni.jpg",
    },
  ],
  stack: [
    { name: "AI / ML — THE DEEP END", wide: true, pills: ["LLMs", "RAG", "GNNs", "ESM-2", "LoRA/QLoRA", "SHAP", "ONNX", "Multi-Agent", "MCP", "Transformers"], note: "shipped in prod: ONNX browser inference · WebLLM offline coaching · ESM-2 embeddings" },
    { name: "LANGUAGES", pills: ["Python", "TypeScript", "JavaScript", "Java", "SQL", "HTML/CSS"] },
    { name: "FRAMEWORKS", pills: ["FastAPI", "Next.js", "React", "Express.js", "PyTorch", "Tailwind", "Drizzle ORM", "Pydantic"] },
    { name: "TOOLS", pills: ["Git", "Docker", "n8n", "Vercel", "Supabase", "GitHub Actions", "Postman", "WebSockets", "Tauri"] },
  ],
  skillsMarquee: ["PYTHON", "FASTAPI", "NEXT.JS", "REACT", "PYTORCH", "ONNX", "TYPESCRIPT", "GRAPH NEURAL NETWORKS", "LLMs & RAG", "DOCKER", "SUPABASE", "TAURI"],
  nameMarquee: ["PRATHAM NAHATA", "नमस्ते", "बीकानेर", "JAI BIKANER"],
};

export type CaseStudy = {
  slug: string;
  index: string;
  year: string;
  title: string;
  role: string;
  blurb: string;
  challenge: string;
  build: string;
  impact: string[];
  stack: string[];
  href: string;
  art: string;
  accent: string;
  metrics: string;
  live?: string;
  readme?: string;
  dive: { q: string; a: string }[];
};

export const caseStudies: CaseStudy[] = [
  { slug: "mindpulse-pro", index: "01", year: "2026", title: "MIND PULSE PRO", role: "Founder · Full-stack × ML", blurb: "Real-time behavioral stress detection that runs the model in the browser.", challenge: "Stress is invisible until it isn't. Mental-health tools rely on self-reporting, which people game or skip. I wanted a system that reads stress from how you already work — keystrokes and mouse dynamics — without a single wearable.", build: "Captured keystroke/mouse signals via pynput, extracted 50+ temporal features, trained XGBoost, exported to ONNX and ran inference directly in the browser with onnxruntime-web — no server round-trip. Wrapped in a Next.js web app plus a Tauri (Rust) desktop client, JWT + Google OAuth, SHAP explainability, fully offline LLM coaching via WebLLM.", impact: ["Under 20ms inference — zero server round-trip", "50+ temporal features per typing session", "SHAP explainability for every prediction", "Fully offline coaching — no API keys exposed"], stack: ["FastAPI", "Next.js", "XGBoost", "ONNX Runtime", "Tauri", "Supabase", "WebSockets", "WebLLM"], href: "https://github.com/iAMv1/mindpulse", art: "/assets/art-mindpulse.jpg", accent: "#8DE254", metrics: "20MS INFERENCE · 50+ FEATURES · TAURI DESKTOP",
    dive: [
      { q: "Why FastAPI + WebSockets?", a: "Stress scoring is realtime by nature — polling added ~900ms staleness. WebSockets pushed updates under 50ms, and FastAPI kept the whole backend in one typed codebase." },
      { q: "Why XGBoost instead of deep learning?", a: "We extract 50+ tabular features from keystroke/mouse dynamics. XGBoost matched the accuracy of a small NN at a tenth of the latency, and ONNX made it run in the browser." },
      { q: "What went wrong?", a: "The first prototype polled a REST endpoint and overfit on keyboard-only features. I rewrote the transport to WebSockets and added mouse dynamics + SHAP so every prediction is auditable." },
      { q: "What would I do now?", a: "Distill to a smaller model, run federated feature extraction, and validate thresholds with a proper user study instead of my own typing." },
    ],
    live: "" },
  { slug: "unified-dta", index: "02", year: "2025", title: "UNIFIED-DTA", role: "ML Researcher · Builder", blurb: "Drug-target affinity prediction fusing protein language models with graph networks.", challenge: "Predicting how well a drug binds a target protein is a core bottleneck in discovery. Sequence-only models miss molecular structure; structure-only models miss protein context. The field needed both, jointly.", build: "Fused Meta's ESM-2 protein language model with Graph Isomorphism Networks for joint molecular + protein representation learning. Trained on BindingDB, DAVIS and KIBA with concordance index and MSE. Containerized inference with Docker + FastAPI (LRU-cached), extended with a drug-generation module using the DoubleSG architecture.", impact: ["3 industry benchmarks: BindingDB · DAVIS · KIBA", "ESM-2 + GIN joint representation learning", "Dockerized, LRU-cached inference API", "Novel-compound generation via DoubleSG"], stack: ["PyTorch", "ESM-2", "GNN", "FastAPI", "RDKit", "Docker"], href: "https://github.com/iAMv1/unified-dta-project", art: "/assets/art-dta.jpg", accent: "#1D5B9E", metrics: "3 BENCHMARKS · ESM-2 + GIN · DOCKER",
    dive: [
      { q: "Why ESM-2 + GIN together?", a: "ESM-2 gives protein language context; GIN gives molecular structure. Either alone loses half the signal — the fusion is the actual contribution." },
      { q: "Why those benchmarks?", a: "BindingDB, DAVIS and KIBA are the three the community actually trusts. CI/MSE there is the only claim reviewers accept." },
      { q: "What went wrong?", a: "First training runs diverged — mixed dtypes between ESM-2 embeddings and graph features. I normalized both streams and pinned seeds before trusting a single number." },
      { q: "What would I do now?", a: "Add uncertainty estimates and a LoRA head instead of full fine-tuning — cheaper and more honest for drug discovery." },
    ],
    live: "",
    readme: "iAMv1/unified-dta-project@HEAD/README.md" },
  { slug: "sentinel", index: "03", year: "2025", title: "SENTINEL", role: "Co-builder · Multi-agent AI", blurb: "Privacy-first enterprise wellbeing analytics with a 3-agent AI orchestra.", challenge: "Burnout is a business risk HR can't see until it's expensive. Any solution had to be privacy-first — anonymized signals, not surveillance — and answer plain-language questions, not just dashboards.", build: "Co-built a FastAPI + React platform scoring burnout risk from anonymized interaction patterns, with a graph-based module for team-collaboration insight. Implemented a 3-agent orchestration system — burnout scoring, talent discovery, team health — enabling natural-language queries over workforce analytics.", impact: ["3 specialized AI agents in one system", "Graph analysis for team-collaboration insight", "Privacy-first: anonymized patterns only", "Natural-language queries over analytics"], stack: ["FastAPI", "React", "Graph Analytics", "Multi-Agent AI"], href: "https://github.com/iAMv1", art: "/assets/art-sentinel.jpg", accent: "#F58E20", metrics: "3-AGENT · GRAPH ANALYTICS · PRIVACY-FIRST",
    dive: [
      { q: "Why three agents?", a: "Burnout risk, talent discovery and team health are three different questions with different data shapes. One model would blur them; three specialists stay honest." },
      { q: "Why privacy-first from day one?", a: "Wellbeing analytics dies the moment it feels like surveillance. Anonymized patterns only — no names attached to scores." },
      { q: "What went wrong?", a: "Natural-language queries were slow until I pre-aggregated graph features per team. Latency dropped from seconds to ~300ms." },
      { q: "What would I do now?", a: "Add temporal decay to signals and a human-in-the-loop review queue before any score leaves the system." },
    ],
    live: "" },
  { slug: "omnisectester", index: "04", year: "2026", title: "OMNISECTESTER", role: "Builder · Security tooling", blurb: "A nation-state-grade, defense-in-depth security testing framework in one CLI.", challenge: "Security testing is fragmented — a different tool for web, mobile, cloud, AI/LLM, hardware. Teams need one disciplined surface to audit everything from a single command line.", build: "Designed and shipped a defense-in-depth testing framework covering web apps, extensions, desktop, mobile, cloud, AI/LLM, hardware and supply chain — from one CLI. Built as a focused, extensible engine with per-surface adapters.", impact: ["7 attack surfaces, one CLI", "Defense-in-depth by design", "Supply-chain and AI/LLM coverage included"], stack: ["JavaScript", "CLI", "Security", "Automation"], href: "https://github.com/iAMv1/omnisectester", art: "/assets/art-omni.jpg", accent: "#C96F4A", metrics: "7 SURFACES · 1 CLI · DEFENSE-IN-DEPTH",
    dive: [
      { q: "Why one CLI for seven surfaces?", a: "Security teams don't adopt seven tools; they adopt one workflow. A single disciplined entry point with per-surface adapters keeps the core tiny and the coverage honest." },
      { q: "Why defense-in-depth by design?", a: "Any single scanner is bypassable. Layered checks — network, app, supply chain, AI/LLM — mean a finding survives even when one layer is blind." },
      { q: "What went wrong?", a: "Early adapters were monolithic: one wrong dependency poisoned the whole CLI. I split the engine from the adapters so each surface ships and updates independently." },
      { q: "What would I do now?", a: "Add an adapter manifest + schema tests and a monthly compatibility CI before scaling the catalog past the current seven surfaces." },
    ],
    live: "",
    readme: "iAMv1/omnisectester@HEAD/README.md" },
];

export const metro = {
  title: "DELHI METRO — THE CAREER LINE MAP",
  lines: [
    { id: "blue", name: "BLUE — EDUCATION", color: "#1D5B9E", stations: ["BVCOE DELHI", "IIT MADRAS (ONLINE)"] },
    { id: "yellow", name: "YELLOW — OPEN SOURCE", color: "#F9CE34", stations: ["GSSOC '24", "WORKSHOP LEAD"] },
    { id: "pink", name: "PINK — WINS", color: "#D9607E", stations: ["SIH 2024", "ALGOQUEST", "RANBHOOMI"] },
    { id: "violet", name: "VIOLET — BUILT", color: "#6A4C9C", stations: ["MINDPULSE", "UNIFIED-DTA", "SENTINEL", "OMNISECTESTER"] },
  ],
  hub: "PRATHAM CENTRAL",
};

export const contribution = { title: "CONTRIBUTION RAANGOLI", weeks: 52, days: 7, levels: 5 };

export const timelineMachine = {
  title: "THE TIMELINE MACHINE",
  sub: "scrub the years — watch the builder change",
  years: [
    { year: "2023", stage: "first repo, first doubts", building: "mini Python projects · a chatbot nobody asked for", learning: "CS50 — how computers actually work", identity: "confused but curious" },
    { year: "2024", stage: "hackathon blooded", building: "SIH prototype · GSSoC PRs · a stress-detection idea nobody liked yet", learning: "Web (CS50W) · ML specialization · FastAPI", identity: "builder with receipts" },
    { year: "2025", stage: "systems, not scripts", building: "Unified-DTA · Sentinel · production-shaped pipelines", learning: "GNNs · ESM-2 · multi-agent orchestration", identity: "engineer who designs" },
    { year: "2026", stage: "products with a pulse", building: "MindPulse Pro v2 · OmniSecTester · this portfolio", learning: "ONNX in-browser · Tauri · motion craft", identity: "vibe builder · full-stack × ML" },
    { year: "2027", stage: "whatever ships next", building: "the thing you're about to hire me to build", learning: "webgpu · distributed inference · better questions", identity: "still iterating" },
  ],
};

export const unresolved = [
  { title: "Distributed systems, properly", understand: "Single-node ML inference inside a browser — ONNX, WebLLM, real constraints.", dont: "Consensus, partitioning, exactly-once semantics in the wild.", trying: "Building a toy RAFT log in Rust on weekends.", reading: "Designing Data-Intensive Applications (chapter 8, slowly).", next: "A distributed version of MindPulse's backend with zero-downtime inference." },
  { title: "WebGPU compute", understand: "Canvas 2D particle systems, DPR discipline, rAF budgets.", dont: "Shader pipelines, compute shaders, why my first WGSL kernel was 8× slower than JS.", trying: "Porting the jali lattice field to a WebGPU compute pass.", reading: "WebGPU Fundamentals + every blog post that mentions 'coalesced memory'.", next: "A real-time inference playground running small models fully in the browser." },
  { title: "A better testing strategy", understand: "Vitest units, Playwright smoke suites, Lighthouse gates.", dont: "Visual regression at scale — my canvases are hostile to pixel diffs.", trying: "Golden-image testing on the five canvas fields with deterministic seeds.", reading: "Testing on the toilet archives, honestly.", next: "A CI visual gate that catches canvas regressions without flaking." },
  { title: "Motion that never betrays content", understand: "Reduced-motion, IO-gated reveals, mount-driven visibility.", dont: "When a scrub-parallax fights a pinned section — the physics of scroll.", trying: "A single motion token map that designers and engineers share.", reading: "animations.dev essays + every SOTD motion I can inspect.", next: "Publish the token map as a tiny npm package." },
];

export type Counterfactual = { label: string; answer: string };

export const caseCounterfactuals: Record<string, Counterfactual[]> = {
  "mindpulse-pro": [
    { label: "What if the model ran on the server, not the browser?", answer: "Latency would drop from 20ms to ~80ms on good networks (and much worse on Jio-tier mobile), privacy dies (keystroke patterns leave the device), and WebLLM's offline coaching becomes impossible. The browser was the constraint that forced the best architecture — 20ms inference with zero server cost and zero data leaving the machine. The trade is a ~1.5MB ONNX payload; I'd accept it again." },
    { label: "What if 10× users (10M typing sessions/day)?", answer: "The stateless design saves us: features are computed client-side, so load scales with the dashboard, not the model. I'd add: session-level feature stores with TTL, a clickhouse-style analytics sink for SHAP aggregates, and edge-cached onboarding — but the inference core stays client-side. Cost cliff: none for inference; infra spend stays ~flat." },
  ],
  "unified-dta": [
    { label: "What if we skipped ESM-2 and used sequence-only embeddings?", answer: "GIN alone on molecular graphs with one-hot protein encodings would lose the semantic protein context ESM-2 provides — CI on KIBA would drop measurably. The language model is the expensive but load-bearing part; the fusion layer is where the real engineering lives. I'd keep both." },
    { label: "What if we needed 10× throughput?", answer: "Today: LRU-cached FastAPI with batch inference. Scaling path: precompute ESM-2 embeddings once (they're the slow part — ~seconds per protein), cache them permanently, and serve only the GIN forward pass (milliseconds). That's a ~100× effective speedup for repeated targets — which is exactly how drug repos behave." },
  ],
  sentinel: [
    { label: "What if you used a single LLM instead of 3 agents?", answer: "One model doing scoring + talent + health would blur the evidence trails and make audits impossible — and hallucinate team conclusions. The three-agent split keeps each system small, testable, and accountable; the orchestrator only routes. More moving parts, but each one is honest." },
    { label: "What if the board demanded per-person scores?", answer: "Refuse, architecturally. The whole design is privacy-first: anonymized patterns only, no identity in the pipeline. I'd show them cohort-level risk trends, team-collaboration graphs, and department aggregates — the same insight without the surveillance." },
  ],
  omnisectester: [
    { label: "What if you'd written it in Rust instead of JS?", answer: "Compile-time memory safety and a faster engine, but a steeper contributor curve and slower shipping — for a security CLI the attack surface is the adapters, not the runtime. JS won on iteration speed and ecosystem reach (Playwright, fetch everywhere). I'd still pick JS today." },
    { label: "What if it had 10× the adapters?", answer: "The per-surface adapter contract is the moat: if each adapter is small and dependency-light, 10× adapters means 10× small plugins, not 10× complexity. The risk becomes maintenance drift — so I'd add an adapter manifest + schema tests + a monthly compatibility CI before scaling the catalog." },
  ],
};
