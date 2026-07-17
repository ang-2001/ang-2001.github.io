---
title: "exxcom-ui Design System"
summary: "Led the four-phase consolidation of two fragmented component packages into a themed Atomic Design component library serving two storefronts."
impact: "100+ components · 2 storefronts"
tags: ["Angular", "Storybook", "Design systems"]
date: 2025-09-01
caseStudy: true
---

## Context

Exxact runs two e-commerce storefronts (EXX and SPC) that share most of their functionality but not their branding. When I joined, the team had two fragmented UI component libraries — one embedded in the app, one in a separate Storybook — that had drifted apart over time.

## Problem

The fragmentation caused duplicated work (the same component fixed twice), inconsistent styling between the storefronts, and made reuse hard enough that developers often built one-offs instead. There was no clear answer to "where does a new component go?"

## Approach

I led the consolidation of the two existing packages into a single replacement design system, merging and reorganizing them across four deliberate phases so each layer only depended on the ones below it:

1. **Foundation** — atoms, color tokens, and utilities with zero app-specific dependencies, unit-tested.
2. **Molecules** — theme-aware composite components with proper typing and Storybook coverage.
3. **Organisms** — complex components unifying EXX/SPC patterns, with performance optimization.
4. **Templates & API layer** — a reusable API abstraction and dependency-injection-friendly hooks, decoupling templates from the app framework.

Theming is CSS-variable-driven: one component tree, two storefront themes, no forked components. Alongside the build-out I migrated Storybook to the modern CSF3 format, consolidated two Storybook deployments into one, reorganized all stories into the Atomic Design taxonomy, and decommissioned the legacy libraries — the repo's net line count went *down* by ~35,000 lines while gaining 100+ components.

## Outcome

- A single design system surface serving both storefronts — **100+ production components** in a taxonomy that tells developers exactly where new work belongs.
- Foundation for every subsequent component project on the team.
- Across my tenure in this codebase: **580+ commits, 115 merged PRs**.
