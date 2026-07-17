---
title: "CI/CD From Zero Across 39 Repositories"
summary: "Bootstrapped the team's entire CI/CD: PR validation, path-based change detection, semantic-release automation, and keyless GCP deploys."
impact: "Zero manual releases since May 2025"
tags: ["GitHub Actions", "semantic-release", "GCP"]
date: 2025-05-01
caseStudy: true
---

## Context

When I joined, the team had no standardized CI pipeline and no PR governance across a 39-repository monorepo. Releases were manual, multi-step, and easy to get wrong.

## Problem

Lint failures passed silently, review requirements were inconsistently enforced, and broken builds landed in main regularly. Every release depended on someone remembering the steps. The cost wasn't one dramatic incident — it was a steady tax on every merge.

## Approach

I built the CI/CD infrastructure from scratch on GitHub Actions:

- **PR validation with fail-fast lint enforcement** — no `continue-on-error` escape hatches; a red check means the merge stops.
- **Path-based change detection** — a custom Node.js script that maps changed paths to affected packages, so a 39-repo monorepo only builds what a PR actually touches.
- **semantic-release automation** — version bumps, changelogs, and package publishing happen on merge to main, derived from conventional commit messages. No human in the release loop.
- **Governance as code** — `CODEOWNERS` gating review by package ownership, and consistent two-approver branch protection across all repositories, including admin-bypass prevention.
- **Keyless deploys** — GCP Workload Identity Federation instead of long-lived service-account keys.

## Outcome

- Every build, PR check, and deployment the team runs flows through this infrastructure.
- The release pipeline has run continuously since **May 2025 with zero manual release steps** — dozens of releases shipped without anyone performing one.
- Broken-build-in-main went from a recurring pattern to an exception.
