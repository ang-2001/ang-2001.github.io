# Review: Requirements & Stack Audit (Pre-Implementation)

Companion to `PLAN.md` and `IMPLEMENTATION.md`. This is a review pass done **before any implementation**, answering two questions: *are we over-engineering anything?* and *does the content approach match how hiring managers actually use portfolio sites?* The original two docs are left unchanged; where this review disagrees with them, **this doc wins**.

Reviewed 2026-07-08. Scope/stack decisions below were confirmed with Kyle during the review.

---

## 1. Verdict summary

| Element (from original docs) | Verdict | Why |
|---|---|---|
| Resume: HTML + CSS → headless Chrome → PDF | **Keep** | Zero new software, ATS-safe text PDF, easy to regenerate. Right-sized. |
| Astro static site generator | **Keep** | Content-first static site is Astro's exact use case; ships zero JS by default. Node.js install stays a one-time prerequisite. |
| Content Collections (one Markdown file per project) | **Keep, slim down** | The "add a project = write one text file" promise holds. Keep the frontmatter schema minimal — ~4–5 fields (title, tags, impact, summary, date). Don't grow it speculatively. |
| Plain CSS + custom properties (no Tailwind, no UI library) | **Keep** | Already correctly justified in `IMPLEMENTATION.md`. |
| GitHub Pages + GitHub Actions deploy | **Keep** | Official Astro action, free, near-zero maintenance. |
| Manual accessibility pass (keyboard, contrast, alt text) | **Keep** | Authentic tie-in to the real WCAG 2.1 AA initiative at Exxact — the site demonstrates a resume claim. |
| 6–7 deep-dive case study pages | **Trim → 3–4** | See §2. |
| Light/dark mode with toggle implied | **Trim → CSS-only auto** | See §2. |
| Dedicated resume page (Phase 2, step 7) | **Trim → a link** | See §2. |
| Homepage content spec | **Add requirements** | Contact placement, case-study template, proprietary-work handling, SEO basics were unspecified. See §3. |

**Overall:** the stack is *not* over-engineered — every tool choice survives review. The over-engineering was in **scope** (too many deep-dive pages, an unneeded page, an unneeded JS feature), and the docs under-specified **content** in a few places that matter most for a portfolio.

---

## 2. Over-engineered items (trimmed)

### 2a. Case study pages: 6–7 → 3–4

Current hiring guidance (2025–26) consistently converges on **3–5 projects total, with full case studies for only the strongest few**. Quality beats quantity: reviewers scan a portfolio for roughly **30 seconds** before deciding whether to dig in, and each weaker project dilutes the strong ones. (`PLAN.md`'s "well under a minute" claim was directionally right; ~30 seconds is the commonly cited figure.)

**Revised scope:** full deep-dive pages for the **3–4 strongest projects** — prioritize the ones with hard numbers (e.g. the CMS API quota rescue, the WCAG 2.1 AA accessibility initiative). Everything else appears as a **homepage card only** (title, one-line summary, impact metric, tags) with no dedicated page. A card can be promoted to a full page later by writing one Markdown file — the architecture already supports it.

> **Amended 2026-07-17:** the CMS caching project's original headline number ("20x faster, 1,200ms → 60ms") was unsourced and has been replaced sitewide with the real, verifiable story — 10 pages driving ~6M+ monthly Contentstack calls against a 5M limit, cut to near zero. See `src/content/projects/cms-caching.md`.

**Effort saved:** roughly half the case-study writing, which was the single largest content task in the original plan.

### 2b. Dark mode: toggle → CSS-only `prefers-color-scheme`

A user-facing theme toggle requires JavaScript plus saved preference (localStorage) — and it would have been the **only JavaScript on the entire site**, existing solely to override what the visitor's operating system already says they prefer.

**Revised scope:** both light and dark themes are still designed, built, and contrast-checked, but theme selection follows the visitor's system preference automatically via the `prefers-color-scheme` CSS media query. Zero JS. A toggle can be layered on later without rework if ever wanted.

> **Amended 2026-07-16:** a manual toggle was added at Kyle's request — a two-state sun/moon button in the header backed by ~25 lines of dependency-free inline JS (localStorage persistence; no stored choice still follows the system). This is the only JavaScript on the site.

### 2c. Resume page → resume link

Original step 7 was "Add a page linking to the resume PDF." A page whose entire content is one link is not a page. **Revised scope:** the resume PDF is linked from the site header/footer (and the homepage hero area, per §3a). One less page to build and maintain.

---

## 3. Content requirements added (gaps in the original docs)

### 3a. Contact above the fold

The homepage must show **name, title/one-line value proposition, email, GitHub, LinkedIn, and the resume PDF link without scrolling**, on both desktop and mobile. A portfolio that passes the 30-second scan but makes the reviewer hunt for contact info wastes the win.

### 3b. Case study template (impact first)

Every deep-dive page follows the same structure, in this order:

1. **TL;DR / impact block** — the headline metric and a 2–3 sentence summary, at the very top. A skimmer should get the whole story from this block alone.
2. **Context** — the product/team situation, one short paragraph.
3. **Problem** — what was broken or missing, and why it mattered.
4. **Approach** — what was actually built/changed; technical decisions and trade-offs.
5. **Outcome** — measured results, with numbers wherever they exist.

### 3c. Proprietary work: metrics instead of links

The Exxact projects are closed-source — no public repos, no live demos to link. The docs never addressed this. Policy:

- Case studies **lead with measurable outcomes** and clearly describe scope of ownership; that substitutes for "click the demo."
- Never imply code is viewable; a brief "proprietary codebase" note per project is honest and normal.
- The **portfolio site's own repository is the public code sample** — it will be clean, commented where needed, and linked from the site footer. It demonstrates real HTML/CSS/component/CI skills in the open.

### 3d. SEO / metadata basics

Cheap to do at build time, invisible to skip until someone shares the link:

- Unique `<title>` and meta description per page.
- Open Graph tags (title, description, image) so the site unfurls properly when linked on LinkedIn — which is exactly where it will be linked.
- A favicon.
- Astro's default sitemap integration (one line of config) — optional but effectively free.

---

## 4. Revised v1 scope (single source of truth)

**Pages:**
- Homepage — hero (name, title, value prop, contact links, resume PDF link), skills, experience summary, project cards (all projects), footer with GitHub/LinkedIn/repo link.
- 3–4 case study pages — strongest projects only, template per §3b.
- *(No dedicated resume page. No blog. No custom domain in v1 — unchanged from original plan.)*

**Features:**
- Light + dark theme via `prefers-color-scheme` only — zero JavaScript site-wide in v1.
- Responsive (desktop + phone), keyboard-operable, visible focus states, real alt text, contrast-checked in both themes.
- Per-page titles/descriptions, Open Graph tags, favicon.
- Deploy: push to `main` → GitHub Actions builds Astro → GitHub Pages publishes.

**Explicit non-goals for v1:** theme toggle, blog, custom domain, automated accessibility tooling, React islands / any client-side interactivity, analytics, contact form (email link suffices).

**Unchanged from original docs:** Phase 1 resume pipeline (`IMPLEMENTATION.md` Part A), Astro + Content Collections + plain CSS + GitHub Pages stack (Part B), phase ordering (resume first, then site).

---

## 5. Housekeeping (found during review)

- ~~This folder was not a git repository~~ — **fixed during this review** (`git init` run 2026-07-08).
- ~~Confirm the GitHub account/repo name before deploy setup~~ — **confirmed 2026-07-17**: account `ang-2001`, repo `ang-2001.github.io` (user page, root URL). `astro.config.mjs` matches.
- ~~Node.js is still not installed~~ — **installed 2026-07-09** via fnm (user-scoped): Node v24.18.0, npm 11.16.0.
