// Icon names for the astro-icon <Icon> component (astro.config.mjs), backed
// by the @iconify-json/simple-icons (brand marks) and @iconify-json/lucide
// (generic UI glyphs) data packages. Rendered to static SVG at build time —
// no client-side JS added.

export const contactIcons = {
  github: 'simple-icons:github',
  linkedin: 'simple-icons:linkedin',
};

export const uiIcons = {
  fileText: 'lucide:file-text',
  download: 'lucide:download',
  externalLink: 'lucide:external-link',
};

// Tag/skill text (as written in project frontmatter and the homepage Skills
// section) -> Iconify icon name. Entries are intentionally omitted when
// there's no recognizable brand mark, or no icon in the installed set (e.g.
// Java — not present in @iconify-json/simple-icons) — those render as
// plain-text pills/labels instead, same as any other unmapped tag.
export const techIconMap: Record<string, string> = {
  React: 'simple-icons:react',
  TypeScript: 'simple-icons:typescript',
  JavaScript: 'simple-icons:javascript',
  'Node.js': 'simple-icons:nodedotjs',
  MongoDB: 'simple-icons:mongodb',
  MySQL: 'simple-icons:mysql',
  Angular: 'simple-icons:angular',
  'Next.js': 'simple-icons:nextdotjs',
  Express: 'simple-icons:express',
  'Express.js': 'simple-icons:express',
  Docker: 'simple-icons:docker',
  GCP: 'simple-icons:googlecloud',
  'GitHub Actions': 'simple-icons:githubactions',
  TailwindCSS: 'simple-icons:tailwindcss',
  HTML: 'simple-icons:html5',
  CSS: 'simple-icons:css3',
  Python: 'simple-icons:python',
  Storybook: 'simple-icons:storybook',
  tRPC: 'simple-icons:trpc',
  DrizzleORM: 'simple-icons:drizzle',
  Turborepo: 'simple-icons:turborepo',
  'Claude Code': 'simple-icons:claude',
  Contentstack: 'simple-icons:contentstack',
  'semantic-release': 'simple-icons:semanticrelease',
  Supabase: 'simple-icons:supabase',
  PostgreSQL: 'simple-icons:postgresql',
  'styled-components': 'simple-icons:styledcomponents',
  Vite: 'simple-icons:vite',
};
