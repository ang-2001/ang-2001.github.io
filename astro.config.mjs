// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages user page for the ang-2001 account (REVIEW.md §5).
export default defineConfig({
  site: 'https://ang-2001.github.io',
  integrations: [sitemap()],
  build: {
    // Single small stylesheet — inlining it saves a request per page.
    inlineStylesheets: 'always',
  },
});
