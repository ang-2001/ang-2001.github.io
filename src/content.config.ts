import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Minimal schema per REVIEW.md §1: don't grow speculatively.
// `caseStudy: true` lists a project under Case Studies; otherwise it's an
// Other Projects card. Any project with a Markdown body gets its own page
// (case studies always have one).
// `repo` links a public repository; when absent the detail page shows a
// "proprietary codebase" note instead (REVIEW.md §3c). `demo` links a live
// deployment; `images` are screenshots shown on the detail page.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      impact: z.string(),
      tags: z.array(z.string()),
      date: z.coerce.date(),
      caseStudy: z.boolean().default(false),
      repo: z.string().url().optional(),
      demo: z.string().url().optional(),
      images: z.array(z.object({ src: image(), alt: z.string() })).optional(),
    }),
});

export const collections = { projects };
