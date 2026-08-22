import { NextResponse } from "next/server";
import { pageMarkdown } from "@/lib/agent-md";

/**
 * GET /api/markdown?path=/about — any page as clean markdown.
 * Normally reached via middleware rewrite when a client sends Accept: text/markdown,
 * but callable directly too. Unknown paths → 404 with a markdown body that helps recovery.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  // middleware rewrite carries the page path in a request header (rewrite
  // destinations lose their own query string in Next 16 proxies)
  const path =
    request.headers.get("x-md-path") ?? searchParams.get("path") ?? "/";

  const md = pageMarkdown(path);

  if (md === null) {
    const body = [
      `# 404 — no markdown for ${path}`,
      "",
      "This path does not exist on itzpratham.in. Try one of these instead:",
      "",
      "- [Site map (XML)](https://itzpratham.in/sitemap.xml)",
      "- [Agent guide (llms.txt)](https://itzpratham.in/llms.txt)",
      "- [Developer portal](https://itzpratham.in/developers)",
      "- [OpenAPI spec](https://itzpratham.in/openapi.json)",
      "- [All pages as markdown](https://itzpratham.in/api/markdown?path=/work)",
      "",
    ].join("\n");
    return new NextResponse(body, {
      status: 404,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        Vary: "Accept, Accept-Encoding",
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  }

  return new NextResponse(md, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept, Accept-Encoding",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
