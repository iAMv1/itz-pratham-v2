# Pratham Nahata — Portfolio v2

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui · **Motion** + **GSAP** + **Lenis** · Vercel.

**Identity:** "Jaipur Engineering" — festival energy (saffron) × artisan precision (cobalt blue-pottery),
where Rajasthani craft (jali, jharokha, Devanagari) meets shipped systems.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm run start
npm run lint && npx tsc --noEmit   # quality gates
```

`/?shot=1` caps the hero height for stable full-page screenshots; `/?noloader=1` skips the preloader.

## Structure

```
src/app            layout (fonts, metadata) · page (section composition) · not-found (peacock flock)
src/components
  layout/          Nav · Rail · Footer · ScrollProgress · CursorRing · Preloader · LenisProvider
  sections/        Hero · Marquees · Vibe · Process · Background · Wins · ProofBand · Work · Stack · Contact
  motion/          Reveal · CountUp · Marquee (GSAP) · Tilt
  canvas/          useCanvasField lifecycle + HeroField · PaisleyField · JaliField · RangoliField · MehndiField
  mascot/          PeacockFlock (404) · PeacockMascot (cursor-tracking)
  annotations/     AnnotationCard (redesigned handwritten system)
src/data           profile.ts (single content source) · github.ts (SWR + 1h cache + fallback)
docs/              PRD · TRD · IMPLEMENTATION-PLAN · PROGRESS · GAUNTLET (mirrored in ../itz-pratham/docs)
```

## Design tokens

Jaipur palette: `paper #F4EFE6` · `ink #051024` · `cobalt #1D5B9E` · `saffron #F58E20` ·
`saffron-deep #B35A00` · `terracotta #C96F4A` · `rose #D9607E` · `marigold #F9CE34` · `mint #8DE254`.
Radius 0 · hard shadows · jali/bandhani patterns · Teko/DM Sans/DM Mono/Yatra One (next/font).

## Motion & a11y discipline

- Lenis smooth scroll wired to GSAP ScrollTrigger (`gsap.ticker`), anchors via `lenis.scrollTo`,
  disabled on reduced-motion / coarse pointers
- All reveals `whileInView` once; content never hidden by JS; canvases DPR ≤ 1.5 + pause off-viewport
- Hover effects gated `(hover:hover) and (pointer:fine)`; `:active` press feedback; AA contrast
- Reduced motion: transform motion off, canvases unmounted, marquees static

## Data

All content is real (resume + GitHub `iAMv1`): MindPulse Pro, Unified-DTA, Sentinel, OmniSecTester,
SIH 2024 grand finalist, live "now shipping" repo feed (SWR + localStorage cache + fallback list).

Docs: PRD / TRD / plan / progress / gauntlet in `docs/` (see `../itz-pratham/docs` for the mirror).
