import { NextResponse, type NextRequest } from "next/server";

/**
 * MARKDOWN CONTENT NEGOTIATION (acceptmarkdown.com style):
 * a client that explicitly asks for text/markdown gets the page as markdown
 * (rewritten to /api/markdown). Everyone else — browsers, normal crawlers,
 * RSC prefetches — is untouched.
 *
 * Both HTML and markdown responses carry `Vary: Accept` so CDNs never serve
 * one variant where the other was asked for.
 */
export function middleware(request: NextRequest) {
  const accept = request.headers.get("accept") ?? "";
  const wantsMarkdown = accept.toLowerCase().includes("text/markdown");

  if (wantsMarkdown) {
    const target = new URL("/api/markdown", request.url);
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-md-path", request.nextUrl.pathname);
    const res = NextResponse.rewrite(target, { request: { headers: requestHeaders } });
    res.headers.set("Vary", "Accept, Accept-Encoding");
    return res;
  }

  const res = NextResponse.next();
  // append rather than clobber Next's own RSC vary entries
  const existing = res.headers.get("vary");
  res.headers.set(
    "Vary",
    existing && existing.length > 0 ? `${existing}, Accept` : "Accept, Accept-Encoding"
  );
  return res;
}

export const config = {
  // skip Next internals, static assets, files with an extension, and the API itself
  matcher: ["/((?!_next|api/|assets/|receipts/|.*\\..*).*)"],
};
