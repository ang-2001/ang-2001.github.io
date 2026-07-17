# Implementation Details: Tech Stack & Architecture

Companion to `PLAN.md`. This explains *what* each piece of technology is, *why* it's good for this job, and what the alternatives were.

---

## Part A — Resume PDF Pipeline

| Tool | What it is | Why it's used here |
|---|---|---|
| **HTML + CSS** | The same markup/styling language every website uses. | Lets us fully control layout (margins, fonts, spacing) the way a resume needs, without fighting a word processor's formatting quirks. |
| **Headless Chrome** (`chrome --headless --print-to-pdf`) | Chrome running with no visible window, driven purely from the command line. It renders a page exactly like normal Chrome, then exports it as a PDF instead of showing it on screen. | This is the "compiler" that turns the HTML file into a real PDF. It's already installed on this machine, so there's zero new software to install. The output is a genuine text-based PDF (not a screenshot), which matters for ATS (Applicant Tracking Systems) — resume-scanning software used by most companies — because it can still read/search the text. |

**Alternatives considered and why not:**
- **Pandoc / LaTeX** — the traditional way developers generate polished PDFs from plain text. Produces excellent typography, but requires installing Pandoc and/or a LaTeX distribution (neither is on this machine), and LaTeX's styling model is more rigid for a resume's specific two-column-ish, icon-and-bullet layout.
- **Python (e.g. `weasyprint`, `reportlab`)** — same idea as the Chrome approach (HTML/CSS to PDF) but requires installing Python and packages. Since Chrome already does this natively and is installed, it's the zero-install path.
- **Word/Google Docs** — what most people default to, but harder to keep pixel-perfect single-page layout, and not something I can drive programmatically to regenerate on demand.

**ATS-safety notes baked into the HTML:** single column, standard heading text (not images), no tables or text boxes, no icons-as-images for section headers, real text throughout — this is what lets both a human and an automated resume-parser read it correctly.

---

## Part B — Portfolio Site Stack

### The core framework: Astro

**What it is:** A website "static site generator" — a tool that takes component files and content files and, at build time, produces plain HTML/CSS/JS files ready to be hosted anywhere. Unlike Next.js or a typical single-page React app, Astro's default behavior is to ship **zero JavaScript** to the browser unless a specific part of the page explicitly needs interactivity.

**Why it's good for this:** A portfolio site is almost entirely words, images, and layout — no live data, no user accounts, no forms that need a server. That's exactly the case Astro is built for: fast-loading, content-first sites. Sending less JavaScript to the browser means the site loads faster, which matters directly for the "hiring manager looks for 15 seconds" reality — a slow-loading site can lose that window before it even renders.

**Where React still fits in:** You already know React from work. Astro supports "islands" — you can drop a single React (or Vue, or Svelte) component into an otherwise plain page if something genuinely needs to be interactive (e.g., a filterable project grid). Nothing in the v1 plan needs this, but the door is open without switching frameworks later.

**Alternatives considered:**
- **Next.js** — what you already use professionally, so there's a case for "using it here to show it off." But GitHub Pages can only host static files (no live server), so Next.js would have to run in a restricted "static export" mode anyway — meaning you'd lose the features (API routes, server rendering) that make Next.js Next.js, while still carrying its larger default JavaScript payload. You'd end up with most of Next.js's overhead and none of its unique benefits.
- **Plain HTML/CSS/JS, hand-written** — genuinely simpler, zero build step. But every page (home + ~7 case studies) would duplicate the same header/footer/theme code by hand, and adding a new project later means copy-pasting a whole page instead of writing one content file. Astro gives you that reuse "for free" with very little added complexity.
- **Jekyll** — GitHub Pages' original, built-in static site generator (Ruby-based). Still fine for simple blogs, but slower builds and a less modern authoring experience than Astro; Ruby also isn't part of your existing toolkit the way JavaScript/TypeScript is.
- **Gatsby** — was the popular choice for this kind of site a few years ago, but has fallen out of favor due to slow build times and an ecosystem that's stopped evolving; not recommended for new projects anymore.

### Content Collections (Astro's content system)

**What it is:** A way of storing each piece of content (in this case, each project case study) as its own plain Markdown file with a small block of structured metadata ("frontmatter") at the top — title, tags, key stats, etc. Astro reads all these files, checks that the metadata matches a schema you define once, and makes them available to your page templates.

**Why it's good here:** It cleanly separates *content* (the writing about each project) from *code* (the page template that displays it). Practically: adding project #8 later means writing one new `.md` file with the right fields filled in — no new components, no risk of breaking the build, and Astro will refuse to build if a required field (like the impact metric) is missing, which catches typos/omissions early.

Example of what one project's metadata looks like conceptually:
```
title: Contentstack API Caching
tags: [Backend, Performance]
impact: "1,200ms → 60ms (20x faster)"
summary: One or two sentences for the homepage card.
```
...followed by the full written case study underneath, in plain Markdown.

### Styling: plain CSS with "design tokens," no Tailwind/UI library

**What it is:** CSS Custom Properties (also called CSS variables) — named values like `--color-background` or `--color-accent` defined once, then referenced everywhere instead of hard-coded colors. Switching between light and dark mode is just swapping which set of values those names point to.

**Why not Tailwind:** Tailwind (a very popular utility-class CSS framework) is genuinely great for larger apps with many contributors, but it adds a build-step dependency and a different way of writing styles (lots of small utility classes in the markup) that isn't needed for a site this size. Hand-written CSS with variables gives full, simple control over exactly two things that matter here — light/dark theming and consistent spacing/typography — without an extra tool in the pipeline.

**Why not a component library** (like shadcn/ui, which is on your resume, or Material UI): those are built for interactive applications with many UI states (dropdowns, modals, forms). A mostly-static content site doesn't need them, and including one would add JavaScript weight for no real benefit — directly working against the "fast load" goal.

### Hosting: GitHub Pages + GitHub Actions

**What it is:**
- **GitHub Pages** — free static website hosting built into GitHub, tied directly to a repository.
- **GitHub Actions** — GitHub's built-in automation system: "when X happens, run this list of steps." Here, the trigger is "someone pushes code to the `main` branch," and the steps are "install Astro, build the site, publish the result to GitHub Pages."

**Why this combo:** It's free, it's already tied to your existing GitHub account, and it means you (or I) never manually upload files again — you just push code, and the live site updates itself within a minute or two. The specific repo name `ang-2001.github.io` is a special naming convention GitHub recognizes as your primary personal site, served at the root of that address rather than a sub-path.

**Alternatives considered:** Netlify or Vercel offer similar free static hosting with arguably smoother developer experience, but GitHub Pages keeps everything (code + hosting) in one place you already use, with no third-party account needed.

---

## How it all fits together (build → deploy flow)

```
You edit a Markdown file or component on your computer
        ↓
git push to GitHub
        ↓
GitHub Actions wakes up automatically
        ↓
Installs Astro + dependencies → runs "astro build"
        ↓
Astro reads every page + every case-study Markdown file,
checks it against the schema, and outputs plain HTML/CSS/JS
        ↓
GitHub Pages publishes those files to https://ang-2001.github.io
        ↓
Anyone visiting that URL sees the updated site, usually within ~1-2 minutes of the push
```

## Accessibility approach (why it matters here specifically)

Beyond being good practice generally, this is a natural, authentic talking point: one of your real Exxact projects was leading a WCAG 2.1 AA accessibility initiative (focus indicators, keyboard navigation, ARIA labeling). Applying those same practices to your own site — visible focus outlines, full keyboard operability, real alt text, proper color contrast in both light and dark themes — is a small but genuine way the site backs up a claim on your own resume with a demonstration, rather than just a bullet point.
