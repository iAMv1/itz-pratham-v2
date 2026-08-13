export type StackGroup = { name: string; pills: string[]; wide?: boolean; note?: string };

export type Profile = {
  name: string;
  shortName: string;
  location: string;
  region: string;
  email: string;
  resume: string;
  links: { github: string; linkedin: string; email: string };
  rota: string[];
  deck: string;
  stack: StackGroup[];
  skillsMarquee: string[];
  nameMarquee: string[];
};

export const profile: Profile = {
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
  stack: [
    { name: "AI / ML — THE DEEP END", wide: true, pills: ["LLMs", "RAG", "GNNs", "ESM-2", "LoRA/QLoRA", "SHAP", "ONNX", "Multi-Agent", "MCP", "Transformers"], note: "shipped in prod: ONNX browser inference · WebLLM offline coaching · ESM-2 embeddings" },
    { name: "LANGUAGES", pills: ["Python", "TypeScript", "JavaScript", "Java", "SQL", "HTML/CSS"] },
    { name: "FRAMEWORKS", pills: ["FastAPI", "Next.js", "React", "Express.js", "PyTorch", "Tailwind", "Drizzle ORM", "Pydantic"] },
    { name: "TOOLS", pills: ["Git", "Docker", "n8n", "Vercel", "Supabase", "GitHub Actions", "Postman", "WebSockets", "Tauri"] },
  ],
  skillsMarquee: ["PYTHON", "FASTAPI", "NEXT.JS", "REACT", "PYTORCH", "ONNX", "TYPESCRIPT", "GRAPH NEURAL NETWORKS", "LLMs & RAG", "DOCKER", "SUPABASE", "TAURI"],
  nameMarquee: ["PRATHAM NAHATA", "नमस्ते", "बीकानेर", "JAI BIKANER"],
};
