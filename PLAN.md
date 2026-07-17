# Plan: Resume PDF + Portfolio Site

Plain-language overview. For the deeper technical breakdown, see `IMPLEMENTATION.md`.

## What we're building

Two deliverables:

1. **A final resume** — one clean page, PDF, ready to send to employers.
2. **A portfolio website** — a personal site hosted for free on GitHub, showing off your real work with more depth than a resume allows.

## Why

Your resume folder currently has six different documents: an old outdated resume, two very detailed "what I actually built" writeups, a messy draft with a manager's notes pasted in, and a newer polished draft. That's great raw material, but nothing is finished or consistent. The goal is to turn all of that into two things you can actually send/share.

## Phase 1 — Resume PDF

**What happens:** I take the best existing draft, rewrite/reorder the bullet points so it reflects how you described yourself (full-stack, frontend-leaning, AI-assisted workflows as a highlight, backend mentioned but not the main focus), pull in the strongest numbers from your detailed writeups (commit counts, PR counts, the 20x speed improvement, etc.), and lay it out cleanly as one page.

**How it gets made:** Instead of a Word doc or Google Doc, I write it as a simple webpage (HTML) styled to look like a resume, then use Chrome (already on your computer) to "print" that webpage straight to a PDF file. No extra software needed. You end up with both the PDF and the source file, so future edits are easy — for you or for me.

**Technical requirements:** None on your end. Chrome is already installed; that's all this needs.

**What "done" looks like:** A single PDF, one page, text you can select/search (not a picture of text), that opens correctly and looks clean.

## Phase 2 — Portfolio Site

**What happens:** A personal website that lists your skills, work experience, and a handful of your best projects — each with a short, skimmable summary, and an optional "read more" for people who want the full story. It will be hosted for free using GitHub Pages, at an address like `ang-2001.github.io`.

**Why this structure:** Research shows hiring managers spend well under a minute looking at a portfolio site initially. So the homepage itself has to make the impression — short bullets, key numbers, clear project names. The deeper writeups exist for the smaller number of people who click further in (like an interviewer preparing questions).

**Technical requirements:**
- Node.js needs to be installed on this computer first (it's the engine that builds the website's files). This is a one-time setup step.
- A free GitHub account and a new repository (you already have a GitHub account: `ang-2001`).
- Everything else (the framework, the hosting, the automatic deployment) is free and I set it up.

**Steps, in order:**
1. Install Node.js.
2. Scaffold a new website project on this machine.
3. Build the shared page layout (header, footer, light/dark mode).
4. Build the "project card" system — a reusable template so each project just needs a short write-up, not custom code.
5. Write the homepage: bio, skills, experience, and project cards.
6. Write the individual deep-dive pages for your strongest ~6-7 Exxact projects.
7. Add a page linking to the resume PDF from Phase 1.
8. Check it works well on both desktop and phone, in both light and dark mode, and using only a keyboard (accessibility check).
9. Push it to GitHub and turn on GitHub Pages — this makes GitHub automatically rebuild and publish the site every time we push a change.
10. Confirm the live site works at its public web address.

**What "done" looks like:** A public URL (e.g. `https://ang-2001.github.io`) that you can put directly into job applications, LinkedIn, and your resume, showing your name, skills, experience, and project case studies, working correctly on both computer and phone.

## What you don't need to do

- No manual PDF formatting.
- No design software.
- No writing code yourself (though you're welcome to edit content afterward — it'll be structured so adding or editing a project is just editing a plain text file).

## Open/optional items (not required for v1)

- A custom domain name (e.g. `kylechen.dev`) instead of the free `github.io` address — can be added later for a small yearly cost.
- A blog section.
- Automated accessibility testing tools (we'll do a manual check for now).
