# ASSETS.md — Visual Asset Requests (generate → hand back → I implement)

Every asset below is needed to complete the site's visual layer. **Art style: your photo
set's style** — warm Rajasthani/Bikaner heritage textures (haveli stone, jaali lattice,
bandhani textiles, saffron/rose/cobalt palette #F58E20 / #D9607E / #1D5B9E, cream paper
#F4EFE6, ink #051024). Generate at the exact spec, give me the files in `public/assets/`,
and I will implement, crop, theme and integrate them correctly.

---

## 1. HERO — Anime character, animated (video → GIF)

**Purpose:** hero side visual replacing/companion to the jharokha arch — the "vibe
builder" mascot, alive.

- **Spec:** GIF or short MP4 (I convert MP4 → GIF with ffmpeg). 480×600 portrait
  (2:2.5), loop ≤4s, ≤60 frames, palette: saffron/rose/cobalt on cream, transparent or
  cream background (matte #F4EFE6, not alpha — GIF alpha is lossy).
- **Character:** a confident young South Asian engineer/artist hybrid — think "creative
  technologist with a jaali-jacket": ink-black hair, saffron hoodie or bandhani-pattern
  jacket, rose accent scarf. Motion: subtle idle loop — head tilt, blinking, one hand
  typing on a floating hologram, small ✦ particles orbiting. Expressive, warm, not
  robotic; painterly 2D anime style, clean linework, no background clutter.
- **Prompt seed (for image models / animators):**
  `2D anime illustration, young Indian male creative technologist, 20s, ink-black hair,
  saffron hoodie with jaali lattice pattern, rose scarf, floating holographic code
  panels around his hands, warm cream background #F4EFE6, subtle gold dust particles,
  confident gentle smile, clean bold linework, studio ghibli x cyberpunk warm palette,
  portrait 480x600`
- **Where it goes:** hero right side inside the existing jharokha frame (replace the
  static arch photo), `idle` loop, theme-safe (I'll add a dark-mode variant treatment).

## 2. BACKGROUND ART — photo set in your style (blurred, for depth)

**Purpose:** section backdrops — visible texture + depth, not flat color. I will use
them as low-opacity blurred layers under content (`bg-blur` treatment), so they must be
**dark-tolerant** (I'll apply overlay scrims for both themes).

- **Spec:** PNG/JPG, 1600×1000+, 2–3 assets:
  - **A. Haveli jaali wall, golden hour** — sunlight raking through a stone jaali
    screen, warm shadows, high texture. (Process page bg.)
  - **B. Bandhani textile macro** — saffron/rose tie-dye fabric, soft focus. (Home
    featured section bg + contact.)
  - **C. Bikaner Junagarh Fort ramparts at dusk** — cobalt sky, warm fort stone, mist.
    (About page bg.)
- **Prompt seeds:**
  - A: `photograph, Rajasthani haveli jaali stone screen, golden hour sunlight raking
    through carved lattice, warm amber shadows, intricate jharokha patterns, high
    detail texture, no people, 16:10`
  - B: `macro photograph of bandhani tie-dye fabric, saffron and rose patterns on cream,
    soft focus, textile texture, warm light, 16:10`
  - C: `photograph of Bikaner Junagarh Fort ramparts at dusk, cobalt blue sky, warm
    honey-coloured sandstone, light mist, cinematic, 16:10`
- **Where they go:** section backgrounds at ~6–10% opacity + blur, both themes; I'll
  wire dark variants so they stay subtle in dark mode.

## 3. CUSTOM ICON SET (art-style match)

**Purpose:** replace generic icons (nav theme toggle, socials, feature bullets) with a
hand-drawn-style set matching the site's ink-brush aesthetic.

- **Spec:** SVG, 24×24 grid, stroke-based (2px, rounded caps), single-color `currentColor`
  (theme-safe), 6 icons: sun, moon, github, linkedin, mail, arrow-up-right.
- **Style prompt:** `minimal hand-drawn ink brush icons, 2px stroke, rounded line caps,
  slightly irregular organic lines, Indian folk-art influence, monochrome, on white
  background, svg`
- **Where they go:** nav toggle, footer socials, contact CTA, case-page links.

## 4. (Optional) OG-image alt version

- Same spec as the current generated `og-image.png` (1200×630) but with your photo-set
  art as the backdrop instead of the pattern — replace at your leisure; current PNG is
  already live and functional.

## 5. (Optional) Terminal mascot

- Small ASCII-art-style SVG mascot for the process terminal status bar (a little
  peacock/robot with a terminal), same ink-brush style as icons.

---

## 5. LOADER CHARACTER — walk-loop animation (video → I composite)

**Purpose:** the cinematic loader's character — a builder who walks in from the corner,
reaches the jharokha door, and opens it (camera zooms as he arrives). The door, beam and
timing already exist in code; **the figure is the only missing piece** — it must be a real
animation, not a vector.

- **Format:** MP4/WebM with **alpha channel** (VP9/ProRes) preferred; GIF on a flat matte
  `#0b0b0b` (loader bg) acceptable fallback. 24fps, loop length 2.5–3s.
- **Size:** 240×320 px at 2× (480×640) — side view, **walking toward screen-right**, feet
  roughly at the frame bottom.
- **Character:** same person as the hero character (ASSETS.md §1): young Indian
  full-stack builder, ink-black hair, saffron hoodie with jali pattern, cobalt accents,
  small laptop tucked under the arm. Full walk cycle (2 steps), natural weight shift,
  slight arm swing, tiny head bob — **real physics, not idle sway**.
- **Style:** clean 2D anime, bold outlines, flat shading; **no background**, no shadows
  baked in (I composite the shadow).
- **Palette:** hoodie `#F58E20`, trim `#C96F4A`, pants `#1D5B9E`, skin warm tone, hair
  near-black — readable on the dark loader stage.
- **Prompt seed (for animators / image-to-video):**
  `2D anime walk cycle, side view, young Indian male creative technologist, ink-black
  hair, saffron hoodie with jali lattice pattern, cobalt pants, small laptop under arm,
  full two-step walk, natural weight shift and arm swing, bold clean linework, flat
  shading, transparent background, facing right, 24fps loop`
- **Handoff:** `public/assets/loader-walk.mp4|.webm|.gif` — I convert, key out (if GIF),
  composite with a walking bob + foot-shadow, wire it into the loader timeline, and
  theme it (light/dark stage tints).

---

**Handoff checklist for me:** files land in `public/assets/` →
`hero-anime.gif|.mp4`, `loader-walk.mp4|.webm|.gif`, `bg-jaali.jpg`, `bg-bandhani.jpg`,
`bg-fort.jpg`, `icons/*.svg`. I will: convert video→GIF (ffmpeg), compress, implement
with lazy loading + theme variants, wire them into the right sections, verify visually,
and deploy (after your approval).
