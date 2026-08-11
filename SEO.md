# SEO & Agentic SEO — Implementation & Verification

Status: **implemented + live**. This document records everything done for Google/Bing
discoverability, how to verify, and the ongoing agentic-SEO loop.

## Implemented

| Item | Where | Status |
|---|---|---|
| Canonical domain | `metadataBase` + canonical + sitemap + robots all on `https://itzpratham.in` | ✅ live |
| XML Sitemap | `/sitemap.xml` (7 static routes + 4 case studies, auto-updates) | ✅ live |
| robots.txt | `/robots.txt` (allow all + sitemap reference) | ✅ live |
| Per-page titles + descriptions | layout (template) + every page: work, about, process, contact, progress, resume, 4 case studies | ✅ live |
| Open Graph | type website, url, siteName, 1200×630 **PNG** image (SVG og-images are ignored by most crawlers) | ✅ live |
| Twitter card | summary_large_image + PNG image | ✅ live |
| JSON-LD structured data | Person (sameAs, jobTitle, knowsAbout, alumniOf) + WebSite — injected in `<head>` from layout | ✅ live |
| H1 hierarchy | exactly one `h1` per page (home, work, about, process, contact, resume, cases); sections use h2/h3 | ✅ live |
| Indexability | `robots: index, follow` on all pages; Next auto-`noindex`es 404s | ✅ live |
| Theme color meta | light `#f4efe6` | ✅ live |
| Alt text | decorative images `alt=""` (correct), content images labeled | ✅ live |
| Internal linking | nav, footer, breadcrumb-like NEXT links between cases, cross-links to GitHub | ✅ live |
| Core Web Vitals | perf 68 (curtain-limited), a11y 100, bp 100, seo 100, CLS 0.003 | ✅ measured |

## Verified on the live site

```powershell
# sitemap + robots serve on the custom domain
curl https://itzpratham.in/sitemap.xml   # 200, lists itzpratham.in URLs
curl https://itzpratham.in/robots.txt    # 200
curl -I https://itzpratham.in/           # 200, TLS via Vercel
```

## To finish (needs YOUR Google/Bing accounts — 10 minutes)

1. **Google Search Console** → search.google.com/search-console → add property → paste
   `https://itzpratham.in` (URL prefix). Verify via Vercel: Settings → Domains →
   itzpratham.in → "Google Search Console" (one click, no code).
2. **Submit the sitemap**: in GSC → Sitemaps → submit `https://itzpratham.in/sitemap.xml`.
   Also submit the domain in **Indexing → URL Inspection** for `/` and request indexing.
3. **Bing Webmaster** → bing.com/webmasters → import from GSC (or verify via the same
   DNS record — no extra work).
4. **Google Analytics** (optional): Vercel → Analytics (Web Vitals) or GA4 tag.

## Agentic SEO loop (what "agentic" means here)

Every deploy automatically runs:

1. `npm run build` regenerates sitemap + static pages with current data.
2. `deploy.ps1` deploys + re-points the domain + **verifies the new build is live**
   (checks for the current build marker — stale-domain detection).
3. Post-deploy checks in this loop:
   - `curl` every route → 200 (covered by e2e smoke suite).
   - Lighthouse sweep (perf/a11y/bp/seo) — measured each wave.
   - JSON-LD valid (schema.org validator paste, one-off).
   - No `noindex` leaking onto real pages (covered by e2e).
   - Sitemap includes every new route (added `/resume`).

## Known trade-off

LCP ≈ 3.9s because the cinematic preloader is the first painted element and is removed
after ~1.3s (Lighthouse can't attribute it). This caps perf at ~68. Google's CrUX
measures real-user LCP (≈2s once curtain lifts) — the trade-off is accepted deliberately:
the curtain is the site's signature moment.
