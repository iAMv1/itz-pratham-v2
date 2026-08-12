import type { NextConfig } from "next";

// Next.js 16 dev server blocks cross-origin requests to /_next/static by
// default. Whitelisting the preview proxy host so public previews can load
// dev resources (kept in repo so local previews keep working everywhere).
const crossOriginOrigins = [
  "3199-idl22coczzal8nvsrh5zl-4a190fb6.us3.manus.computer",
  "3099-idl22coczzal8nvsrh5zl-4a190fb6.us3.manus.computer",
];

const nextConfig: NextConfig = {
  crossOrigin: "anonymous",
  allowedDevOrigins: crossOriginOrigins,
};

export default nextConfig;
