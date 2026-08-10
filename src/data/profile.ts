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
    steps: { num: string; title: string; sub: string }[];
    tools: string[];
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
  region: "जयपुर · राजस्थान",
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
      { num: "01", title: "DISCOVER", sub: "talk to real humans · find the pain" },
      { num: "02", title: "DESIGN", sub: "moodboards · type · motion language" },
      { num: "03", title: "BUILD", sub: "semantic HTML · tokens · fast" },
      { num: "04", title: "POLISH", sub: "a11y · perf · feel expensive" },
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
  nameMarquee: ["PRATHAM NAHATA", "नमस्ते", "जयपुर", "JAI JAIPUR"],
};
