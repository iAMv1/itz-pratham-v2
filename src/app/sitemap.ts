import type { MetadataRoute } from "next";
import { allProjects } from "@/content/projects";

const BASE = "https://itzpratham.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/work", "/about", "/process", "/contact", "/progress", "/resume", "/testing", "/developers", "/privacy"].map((r) => ({
    url: `${BASE}${r}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: r === "" ? 1 : 0.7,
  }));
  const cases = allProjects().map((c) => ({
    url: `${BASE}/work/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  return [...staticRoutes, ...cases];
}
