---
title: "WCAG 2.1 AA Accessibility Initiative"
summary: "Focus design tokens, focus-visible outlines, and ARIA improvements across the design system — turning an unusable keyboard experience into one that meets enterprise procurement requirements."
impact: "15+ components keyboard-operable"
tags: ["Accessibility", "WCAG 2.1", "Design tokens"]
date: 2026-04-01
caseStudy: true
---

## Context

Enterprise procurement in several of Exxact's key verticals — government, education, healthcare — requires WCAG 2.1 AA compliance. Accessibility wasn't a nice-to-have; it was a gate on whole categories of customers.

## Problem

The site had no systematic focus styling at all. Keyboard navigation was effectively unusable: no visible focus indicators, inconsistent tab behavior, and interactive components (accordions, dropdowns, search) that assumed a mouse.

## Approach

Rather than patching components one by one, I made accessibility a design-system concern so it would hold for future components too:

- **A focus design token** (`$exx-color-focus`) added to the design system, so focus styling is themed and consistent rather than per-component improvisation.
- **`focus-visible` outline styles** (2px outline, 4px offset) applied across all interactive components — visible for keyboard users, invisible for mouse clicks.
- **`innerTabIndex` support** across button and card components, so composite components expose a sane tab order.
- **ARIA attribute improvements** across the header menu, search, accordions, and dropdowns.

Coverage spanned 15+ component families: buttons, cards, accordions, dropdowns, search, navigation, resource/featured cards, and the content page templates built on them.

## Outcome

- **15+ components made fully keyboard-operable** with visible, consistent focus states.
- WCAG 2.1 AA compliance became a checkable property of the design system rather than a per-page audit.
- This site practices the same standards: keyboard-operable, visible focus, contrast-checked in both themes.
