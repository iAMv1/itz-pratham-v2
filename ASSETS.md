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

**Handoff checklist for me:** files land in `public/assets/` →
`hero-anime.gif|.mp4`, `bg-jaali.jpg`, `bg-bandhani.jpg`, `bg-fort.jpg`,
`icons/*.svg`. I will: convert video→GIF (ffmpeg), compress, implement with lazy
loading + theme variants, wire them into the right sections, verify visually, and
deploy.
