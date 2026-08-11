# Pratham Nahata — Portfolio v2

A full-stack + ML portfolio built like a product: **Next.js 16 · React 19 · TypeScript · Tailwind 4 · Motion + GSAP + Lenis · Vercel**.

Live at **[https://itzpratham.in](https://itzpratham.in)** — tested like a product (Playwright 19 flows, zero console errors).

## Why this stack

| Choice | Reason |
|---|---|
| Next.js App Router (SSG) | Every route is prerendered static HTML — fast TTFB, cacheable, SEO-clean |
| TypeScript | The content model (`src/data/profile.ts`) is typed; every case study, stat, and process step is data, not markup |
| Tailwind 4 + CSS variables | The entire dark/light mode is a token inversion — `--paper/--ink` swap under `.dark`, all 40+ components flip without per-component code |
| Motion + GSAP + Lenis | Motion is the product here. GSAP is code-split out of the shell (loaded only when a tween needs it) |
| SWR | Live GitHub feed (repos, stars) with localStorage cache + honest CACHED fallback under rate limits |

## Routes

```
/               hero → engineering band → featured work → craft → receipts → CTA
/work           four case studies as jharokha cards
/work/[slug]    narrative case study: problem → approach → hard part → shipped → receipts → what-if → dive → repo-inside
/about          person → philosophy → current direction → contributions → timeline
/process        scroll-executed terminal, evidence-linked steps, measured numbers
/contact        copy-email, live GitHub feed, direct ask
/resume         embedded PDF viewer
/testing        the test matrix (19 Playwright flows)
/progress       public build log
/404 · /500     peacock flock · haveli-coughed
```

## Architecture

```
src/
  app/             layout (fonts, metadata, JSON-LD, theme boot) · pages · metro-map · flow-diagram
  components/
    layout/        Nav (sheet menu, theme toggle) · Footer (IST clock) · Preloader · LenisProvider · OfflineArchive
    sections/      Hero · Marquees · Craft · Process · Wins · Work · Contact
    motion/        Reveal · CountUp · Marquee · MaskTitle · Tilt · Spotlight · KineticArt
    canvas/        useCanvasField lifecycle + HeroField · PaisleyField · JaliField · RangoliField · MehndiField
    ui/            RealityDialog (native <dialog>) · Annotate (popover API) · RepoFrame (README iframes)
                   TimelineMachine · ContributionGraph · NowBuilding · HeroAscii · VtLink
    mascot/        PeacockFlock (404) · PeacockMascot
  data/            profile.ts (single typed content source) · github.ts (SWR feed)
public/            sw.js (offline archive, cache v2) · assets/ (art, resume, og-image)
```

## Rendering strategy

- All routes are **prerendered static** — the app shell is HTML before JS loads
- Client islands only where interaction lives: dialogs, popovers, canvases, live widgets, theme toggle
- A head script applies the saved/system theme **before first paint** (no flash)
- The service worker caches the shell; navigation is network-first — offline visitors get the archived build

## Performance (measured 12 Aug 2026 · Lighthouse 13)

- **A11y 100 · Best Practices 100 · SEO 100 · CLS 0.003 · FCP 1.5s · TBT 560ms**
- LCP ≈ 3.9s is **curtain-latency by design**: the preloader is the signature moment, skipped on repeat visits and deep links
- GSAP split out of the initial bundle; canvases capped at DPR ≤ 1.5 and paused off-viewport; hero image `fetchpriority=high`

## Testing

```bash
npx playwright test   # 19 flows: routes, nav, dialogs, timeline, dark mode, live widgets, resume viewer…
npx vitest run        # 9 unit tests (content model, easing)
npm run lint && npx tsc --noEmit
```

Every Playwright flow asserts **zero console/page errors**, not just visible elements. See [the test matrix](https://itzpratham.in/testing) and the [build log](https://itzpratham.in/progress).

## Accessibility

- Semantic headings (one `h1` per page), `aria-current`, `aria-label`, focus-visible outlines, `details/summary` for disclosure
- Reduced-motion: transforms off, canvases unmounted, marquees static, preloader skipped
- Coarse pointers: Lenis and hover-only effects disabled
- Theme toggle persists; system preference respected when unset

## Deployment

`deploy.ps1` runs build + gates, deploys to Vercel, **re-points the custom-domain aliases to the new deployment**, and verifies the live build — the domain follows every deploy.

## Design system

Bikaner-origin identity: festival energy × artisan precision — jali, jharokha, Devanagari, hard shadows, bandhani.

Tokens: `paper #F4EFE6` · `ink #051024` · `cobalt #1D5B9E` · `saffron #F58E20` · `terracotta #C96F4A` · `rose #D9607E` · `marigold #F9CE34` · `mint #8DE254`. Radius 0 · Teko / DM Sans / DM Mono / Yatra One (next/font).

Dark mode inverts the identity tokens (`.dark` block in `globals.css`); shadows use a dedicated `--shadow-ink` token; jali/bandhani patterns and every canvas field get dark variants.

## Data model

All content is real and typed in `src/data/profile.ts`: four case studies (each with problem/approach/hard part/shipped + **evidence claims with methodology**), contextualized stats, process steps with proof links, unresolved problems, books/setup, timeline machine years. GitHub data (live repos, stars, contribution graph) fetches at runtime with cached fallbacks.

## Tradeoffs

- **Preloader curtain** costs ~1.9s of first-visit LCP; it's the site's identity moment and is skipped for repeat visits and deep links
- **Motion budget**: every animation must answer a question — the cursor ring and role rotation were cut for this reason
- **Synthetic visuals are labeled**: the bandhani mandala is explicitly "artistic, not data"

Asset requests (hero anime GIF, background art, icons) live in **[ASSETS.md](./ASSETS.md)** — spec + prompts, ready to generate.
