---
title: "CMS Caching Layer — Back Under API Quota"
summary: "MongoDB caching layer for Contentstack with webhook invalidation — cut weekly API calls on 10 high-traffic pages from 100K+ to near zero and kept the site online through CMS outages."
impact: "100K+ calls/page/week → ~0"
tags: ["MongoDB", "Node.js", "Contentstack"]
date: 2026-05-01
caseStudy: true
---

## Context

Exxact's e-commerce site serves its marketing and blog content from Contentstack, a headless CMS, across two storefronts. Every page that renders CMS content — the homepage, the footer, the blog — fetched it from Contentstack's API at request time.

## Problem

Ten of the site's main pages were making enough Contentstack API calls between them to push the account toward ~6 million calls a month against a 5 million-call plan limit — a hard business constraint: crossing it meant paying for a higher tier. Each of those pages alone was generating 100,000+ calls a week. On top of the cost pressure, every render depended on a live API call, so any Contentstack outage took the site down with it.

## Approach

I built a MongoDB caching layer in front of Contentstack for the high-traffic content types. The design decisions that mattered:

- **Cache in the database we already ran**, not a new service — cache models registered in both production and sandbox databases for each storefront, so the caching layer added zero new infrastructure.
- **Webhook-based invalidation instead of TTLs.** Contentstack fires a webhook on every publish event; endpoints I added invalidate the affected cache entries immediately. Content editors see their changes live right away — the cache is never the reason content is stale.
- **Fallback logic in the service layer**: if the cache misses, fetch from Contentstack and populate; if Contentstack is down, serve the cached copy. The site degrades to "slightly stale" instead of "offline."

Rollout was incremental by content type — homepage first, then footer and blog categories — so each step was independently verifiable in production.

## Outcome

- Weekly Contentstack calls on the 10 highest-traffic pages fell from **100,000+ per page to near zero**.
- Account usage dropped back under the 5 million-call plan limit (from ~6 million+), avoiding a forced upgrade to a paid higher tier.
- The site now stays online through Contentstack outages, serving cached content.
