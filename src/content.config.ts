import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Minimal schema per REVIEW.md §1: don't grow speculatively.
// `caseStudy: true` promotes a card to a full deep-dive page.
// `repo` links a public repository; when absent the case-study page
// shows a "proprietary codebase" note instead (REVIEW.md §3c).
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    impact: z.string(),
    tags: z.array(z.string()),
    date: z.coerce.date(),
    caseStudy: z.boolean().default(false),
    repo: z.string().url().optional(),
  }),
});

export const collections = { projects };
