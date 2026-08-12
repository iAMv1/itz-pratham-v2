export type Stat = { value: number; prefix?: string; suffix?: string; label: string; headline?: string };
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
    steps: { num: string; title: string; sub: string; cmd: string; out: string; artifacts: string[]; proof?: { label: string; href: string } }[];
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
  rota: ["Full-Stack × ML Engineer", "Inference Systems Builder", "Product Engineer", "Systems Builder"],
  deck:
    "CS undergrad building full-stack + ML systems — real-time inference, graph neural networks, multi-agent AI. Models that actually ship.",
  stats: [
    { value: 492960, suffix: "+", label: "SIH 2024 participants — national scale", headline: "GRAND FINALIST" },
    { prefix: "TOP ", value: 5, label: "AlgoQuest · 300+ teams", headline: "TOP 5" },
    { prefix: "<", value: 20, suffix: "ms", label: "browser ML inference — measured", headline: "<20MS" },
    { value: 4, label: "production-shaped systems with receipts", headline: "4 SHIPPED" },
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
    { label: "01 / FEEL", title: "Feel", body: "Does it feel right? Motion, tone, personality — the stuff people remember after they close the tab." },
    { label: "02 / THINK", title: "Clarity", body: "Can a stranger understand it in 5 seconds? Hierarchy, plain words, zero guesswork." },
    { label: "03 / BUILD", title: "Craft", body: "Is it built right? Accessible, fast, reproducible — the invisible stuff that makes work last." },
  ],
  process: {
    title: "pratham@nahata — bash — 80×24",
    lines: [
      { kind: "comment", text: "# shipping production systems since 2023" },
      { kind: "cmd", text: "pratham --plan --stack fastapi nextjs pytorch", cursor: true },
      { kind: "step", num: "01 · DISCOVER", text: "unpack the problem — talk to real humans, find the actual pain" },
      { kind: "step", num: "02 · DESIGN", text: "sketch the product — type, motion language, lo-fi prototypes" },
      { kind: "step", num: "03 · BUILD", text: "ship fast — semantic HTML, design tokens, CI green" },
      { kind: "step", num: "04 · POLISH", text: "measure & refine — micro-interactions, a11y, perf, make it hold up in production" },
      { kind: "ok", text: "✓ done in 2 weeks, not 2 months — you keep the source, I keep shipping" },
    ],
    steps: [
      { num: "01", title: "DISCOVER", sub: "talk to real humans · find the pain", cmd: "pratham --plan", out: "unpack the problem — real users, real constraints, the actual pain underneath the ask", artifacts: ["USER INTERVIEWS", "PAIN MAP", "ONE-PAGE BRIEF"], proof: { label: "THE PROBLEMS →", href: "/work" } },
      { num: "02", title: "DESIGN", sub: "type · motion language · lo-fi", cmd: "pratham --design", out: "sketch the product — type scale, motion language, lo-fi prototypes you can click", artifacts: ["MOODBOARDS", "DESIGN TOKENS", "LO-FI PROTOTYPE"], proof: { label: "DESIGN EVIDENCE →", href: "/about" } },
      { num: "03", title: "BUILD", sub: "semantic HTML · tokens · fast", cmd: "pratham --build", out: "ship fast — semantic markup, tokens not chaos, CI-green, preview links every day", artifacts: ["COMPONENT LIBRARY", "CI GREEN", "DAILY PREVIEWS"], proof: { label: "ARCHITECTURE →", href: "/work/mindpulse-pro#system-flow" } },
      { num: "04", title: "POLISH", sub: "a11y · perf · production-ready", cmd: "pratham --polish", out: "measure & refine — a11y pass, perf budget, load tests until it holds up in production", artifacts: ["A11Y PASS", "PERF BUDGET", "SHIP LOG"], proof: { label: "MEASURED →", href: "/process#perf" } },
    ],
    stats: [
      { value: "4", label: "PHASES" },
      { value: "2WK", label: "AVG LOOP" },
      { value: "AA", label: "CONTRAST" },
      { value: "100%", label: "SHIPPED" },
    ],
    tools: ["STACK — FastAPI · Next.js · PyTorch · ONNX · Supabase · Docker", "CRAFT — motion-first · tokens · a11y · perf budgets"],
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


export const timelineMachine = {
  title: "THE TIMELINE MACHINE",
  sub: "scrub the years — watch the builder change",
  years: [
    { year: "2023", stage: "first repo, first doubts", building: "mini Python projects · a chatbot nobody asked for", learning: "CS50 — how computers actually work", identity: "confused but curious" },
    { year: "2024", stage: "hackathon blooded", building: "SIH prototype · GSSoC PRs · a stress-detection idea nobody liked yet", learning: "Web (CS50W) · ML specialization · FastAPI", identity: "builder with receipts" },
    { year: "2025", stage: "systems, not scripts", building: "Unified-DTA · Sentinel · production-shaped pipelines", learning: "GNNs · ESM-2 · multi-agent orchestration", identity: "engineer who designs" },
    { year: "2026", stage: "products with a pulse", building: "MindPulse Pro v2 · OmniSecTester · this portfolio", learning: "ONNX in-browser · Tauri · motion craft", identity: "product engineer · full-stack × ML" },
    { year: "2027", stage: "whatever ships next", building: "the thing you're about to hire me to build", learning: "webgpu · distributed inference · better questions", identity: "still iterating" },
  ],
};

export const offClock = {
  title: "OFF THE CLOCK",
  sub: "what feeds the builder when the repo is closed",
  books: [
    { title: "Designing Data-Intensive Applications", take: "chapter 8, still slowly — the closest thing to a system-design gym" },
    { title: "The Pragmatic Programmer", take: "the 'broken windows' chapter is why this site's 404 has a peacock" },
    { title: "Atomic Habits", take: "2 weeks not 2 months — the 1% rule applied to shipping" },
    { title: "Deep Work", take: "4 AM hackathon hours, but with the phone in another room" },
  ],
  setup: [
    { name: "EDITOR", detail: "Cursor + VSCode — AI pair programmer, human reviewer" },
    { name: "SHELL", detail: "PowerShell → WSL zsh → Starship — the journey is the setup" },
    { name: "STACK", detail: "Next.js · FastAPI · PyTorch · ONNX · Tauri · Supabase" },
    { name: "MACHINE", detail: "Windows 11 laptop that's been to more hackathons than hotels" },
  ],
};

export const unresolved = [  { title: "Distributed systems, properly", understand: "Single-node ML inference inside a browser — ONNX, WebLLM, real constraints.", dont: "Consensus, partitioning, exactly-once semantics in the wild.", trying: "Building a toy RAFT log in Rust on weekends.", reading: "Designing Data-Intensive Applications (chapter 8, slowly).", next: "A distributed version of MindPulse's backend with zero-downtime inference." },
  { title: "WebGPU compute", understand: "Canvas 2D particle systems, DPR discipline, rAF budgets.", dont: "Shader pipelines, compute shaders, why my first WGSL kernel was 8× slower than JS.", trying: "Porting the jali lattice field to a WebGPU compute pass.", reading: "WebGPU Fundamentals + every blog post that mentions 'coalesced memory'.", next: "A real-time inference playground running small models fully in the browser." },
  { title: "A better testing strategy", understand: "Vitest units, Playwright smoke suites, Lighthouse gates.", dont: "Visual regression at scale — my canvases are hostile to pixel diffs.", trying: "Golden-image testing on the five canvas fields with deterministic seeds.", reading: "Testing on the toilet archives, honestly.", next: "A CI visual gate that catches canvas regressions without flaking." },
  { title: "Motion that never betrays content", understand: "Reduced-motion, IO-gated reveals, mount-driven visibility.", dont: "When a scrub-parallax fights a pinned section — the physics of scroll.", trying: "A single motion token map that designers and engineers share.", reading: "animations.dev essays + every SOTD motion I can inspect.", next: "Publish the token map as a tiny npm package." },
];
