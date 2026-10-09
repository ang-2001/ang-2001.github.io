import type { CollectionEntry } from 'astro:content';

// A project gets its own /projects/<id>/ page when it's a case study or has
// a Markdown body to show — shared by the card links and the page route.
export const hasDetailPage = (p: CollectionEntry<'projects'>) =>
  p.data.caseStudy || Boolean(p.body?.trim());
