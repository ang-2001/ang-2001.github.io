# kyle-portfolio

Personal portfolio site for Kyle Chen, built with [Astro](https://astro.build). Static, zero-dependency-JS by default (a small inline script powers the light/dark theme toggle — see `src/layouts/Base.astro`), CSS-only dark mode fallback, deployed to GitHub Pages.

Live at: https://ang-2001.github.io

## Documents

- `PLAN.md` / `IMPLEMENTATION.md` — original planning docs for the resume PDF + portfolio site.
- `REVIEW.md` — pre-implementation scope audit and design-decision record. **Where it disagrees with the two docs above, REVIEW.md wins** — it reflects what was actually decided and built, including changes made after the original plan (e.g. the theme toggle in §2b).

## Structure

- `src/pages/` — routes (`index.astro` homepage, `projects/[id].astro` case-study template)
- `src/content/projects/` — project data as Markdown; `caseStudy: true` lists it under Case Studies, otherwise Other Projects. Any project with a Markdown body (all case studies, plus e.g. `waffler.md`) gets its own `/projects/<id>/` page; screenshots live in `src/assets/projects/`
- `src/layouts/Base.astro` — shared head/header/footer, theme toggle
- `src/styles/global.css` — design tokens and all site styling (plain CSS, no framework)
- `public/` — static assets served as-is, including `resume.pdf`
- `resume/` — resume source files (`.html` for print-to-PDF, `.txt` for pasting into Google Docs); `public/resume.pdf` is the built artifact actually linked from the site

## Development

Requires Node.js (this project was built against Node 24 via [fnm](https://github.com/Schniz/fnm)).

```bash
npm install
npm run dev       # dev server at localhost:4321, hot reload
npm run build     # static output to dist/
npm run preview   # serve the built dist/ locally
```

### Link-preview image

`public/og.png` (the `og:image` shown when the site is shared) is rendered from `og/og-image.html` with headless Chrome. After editing the HTML, regenerate it from the repo root in Git Bash:

```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless --hide-scrollbars \
  --window-size=1200,630 --screenshot="$(pwd -W)/public/og.png" "file:///$(pwd -W)/og/og-image.html"
```

## Deployment

Pushes to `main` deploy automatically via `.github/workflows/deploy.yml` (official Astro GitHub Pages action). GitHub Pages must be set to deploy from **GitHub Actions** in the repo's Settings → Pages.
