# THIS PORTFOLIO — Benchmark Methodology

Claims: **A11y 100 · Best-practices 100 · SEO 100 (live)** · **22 Playwright flows, zero console errors**

## Environment
- Tool: Lighthouse 13.4 (headless Chrome)
- Target: https://itzpratham.in/?noloader=1&theme=light (repeat-visit experience; the curtain is skipped by design)
- Measured: 13 Aug 2026 · refreshed per deploy via scripts/measure.mjs

## Scores (live run)
- Accessibility: **100** · Best Practices: **100** · SEO: **100**
- Performance: 61–66 (curtain-taxed — the cinematic intro is the site's signature and is skipped on repeat visits/deep links)
- CLS: 0–0.003 · FCP: 1.4–2.4s

## Test matrix
- 22 Playwright flows across smoke, interaction, and agent-toolkit suites
- Every flow asserts **zero console/page errors** — not just visible elements
- Enforced by GitHub Actions on every push (lint → tsc → vitest → build → Playwright)

## Reproducibility
- `node scripts/measure.mjs` → fresh Lighthouse run → `src/data/performance.ts`
- `npx playwright test` → full matrix (webServer auto-starts the production build)
