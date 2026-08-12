# The Content Repository — projects

**The UI is a container. The content is data.**

Every project on this site lives in **one `.mdx` file** in this folder. Drop a file in →
the work index, case pages, sitemap, JSON-LD and the agent APIs all pick it up
**automatically at build time**. No code changes, no wiring.

## Adding a project

1. Copy `mindpulse-pro.mdx` → `your-project.mdx`
2. Edit the **frontmatter** (the `---` block at the top):
   - `slug` — must be unique, kebab-case (becomes the URL: `/work/your-project`)
   - `index` — display order ("01", "02", …)
   - `title` / `year` / `role` / `blurb` — the card + header
   - `challenge` / `approach` / `hard` / `shipped` — the narrative beats
   - `impact` / `stack` / `flow` / `metrics` — lists + the architecture diagram steps
   - `href` — source link
   - `art` — fallback image (keep), or `screenshot: /assets/shots/your-project.png`
     for a **real product screenshot** (auto-preferred over art)
   - `accent` — the project color
   - `dive` / `evidence` / `counterfactuals` — the interrogable sections
   - `readme` — set to `owner/repo@HEAD/README.md` to enable the repo-inside iframe
3. Write the **body** — the full story (markdown; subset documented in
   `src/lib/markdown.ts`). It renders as "THE FULL STORY" on the case page.
4. Drop any image into `public/assets/` (or `public/assets/shots/` for screenshots).
5. Build. Done. The file IS the project.

## Rules
- One project = one file. No edits outside this folder (except images).
- `slug` must never change once published (it's the URL).
- Evidence claims must be measurable — the site's whole contract is receipts.
- The loader validates required fields at build; a broken file fails the build loudly.

## What else can move here
The same pattern extends to any section: `content/about.mdx`, `content/process.mdx`,
etc. — the container exists; move data in as needed.
