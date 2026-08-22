import { NextResponse } from "next/server";

/** Unknown /api/* paths get a structured JSON 404 — never an HTML error page. */
export async function GET(request: Request) {
  const { pathname } = new URL(request.url);
  return NextResponse.json(
    {
      ok: false,
      code: "not_found",
      error: `no API route at ${pathname}`,
      hint: "known endpoints: /api/agent (action toolkit), /api/data (full content), /api/markdown?path=/about, /openapi.json (spec)",
    },
    {
      status: 404,
      headers: { "Cache-Control": "public, s-maxage=300" },
    }
  );
}

export async function POST() {
  return NextResponse.json(
    { ok: false, code: "method_not_allowed", error: "POST is not supported on this API", hint: "all endpoints are read-only GETs" },
    { status: 405 }
  );
}
