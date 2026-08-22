import { NextResponse } from "next/server";
import { buildOpenApiSpec } from "@/lib/openapi-spec";

/** GET /openapi.json — the agent surface, fully typed. */
export async function GET() {
  return NextResponse.json(buildOpenApiSpec(), {
    headers: { "Cache-Control": "public, s-maxage=3600", Vary: "Accept, Accept-Encoding" },
  });
}
