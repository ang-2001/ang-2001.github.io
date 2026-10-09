---
title: "WAFFLER — Real-Time Chat App"
summary: "A VHS-styled messaging app with accounts, friend requests, and live group chat, built on React and Supabase with row-level security on every table."
impact: "Live chat · RLS on every table"
tags: ["React", "Supabase", "PostgreSQL", "styled-components", "Vite"]
date: 2026-09-05
repo: "https://github.com/ang-2001/special-waffle"
demo: "https://special-waffle-sigma.vercel.app"
images:
  - src: "../../assets/projects/waffler/chat.jpg"
    alt: "WAFFLER chat view: a sidebar listing two chats, and an open “movie night” conversation where two friends pick a film and agree on 7pm, with grouped message bubbles and a teal digital clock in the header."
  - src: "../../assets/projects/waffler/landing.png"
    alt: "WAFFLER landing page: a glitching VHS-style wordmark, the tagline “Your conversations, rewound.”, and a Create Account button on a dark scanlined background."
  - src: "../../assets/projects/waffler/login.png"
    alt: "WAFFLER login page: cream cassette-label style Email and Password fields above a dark Login button."
---

## Overview

WAFFLER started in 2022 as a login-form exercise and was rebuilt in 2026 into a working chat app: sign up, find friends by display name, and talk in real time, one-on-one or in groups. The look is a deliberate retro-VHS theme — glitch wordmark, scanlines, grain, tape-label inputs, and a cassette "eject" transition between screens.

## What it does

- **Accounts** — Supabase Auth sign-up and login, with an onboarding step that sets a unique display name.
- **Friends** — search by display name, send requests, and accept or decline them from a sidebar panel.
- **Chat** — create one-on-one or group chats, rename them, add people, and leave; messages arrive live without a refresh.

## Technical highlights

- **Security in the database, not the client.** Row-level security is enabled on all five tables (profiles, friendships, chats, participants, messages). Chat creation, renames, joins, and leaves go through `security definer` Postgres functions, so the browser can never write a membership row it shouldn't.
- **One realtime channel per session.** A single Supabase Realtime subscription covers every chat the user is in, rather than one channel per conversation. It re-authenticates and rejoins when the tab regains focus, since a token that expires in the background can leave the channel silently broken.
- **A real design system at small scale.** Components follow Atomic Design (atoms → molecules → organisms → templates), and every color, font, spacing value, and radius comes from one token file.
- **Motion with an off switch.** The VHS transitions and effects are skipped under `prefers-reduced-motion`.
- **Tested and shipped.** 38 Vitest + Testing Library tests run in GitHub Actions on every push and PR; the app deploys to Vercel.
