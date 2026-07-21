# sureshvictor.com

Personal portfolio of **Suresh Victor** — Product Architect. Live at [sureshvictor.com](https://sureshvictor.com).

## Stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript 5.7** (strict)
- **Tailwind CSS 3.4** + shadcn/ui (Radix) + styled-jsx
- **GSAP** (ScrollTrigger) · **framer-motion** · **Lenis** smooth scroll
- **three.js / React Three Fiber** + **react-force-graph-3d** (Network Atlas)
- Deployed on **Vercel**; pushes to `master` auto-deploy

## Development

```bash
npm install          # .npmrc uses legacy-peer-deps (React 19 vs 3D-lib peers)
npm run dev          # http://localhost:3003
npm run build        # production build — the de-facto verification gate
npm run lint
```

## Structure

```
src/
  app/               # routes: /, /projects[/slug], /resume, /playbook,
                     # /therightfit, /mylife, /network, /sharing[/slug],
                     # /contact, /design (internal)
  app/projects/components/   # per-brand case-study mini-sites
  components/        # shared components (Navigation, Footer, KnowledgeGraph, ...)
  components/ui/     # shadcn primitives + custom cards
  data/              # single sources of truth: projects.ts, sharing.ts, navigation.ts
  lib/theme/         # design tokens (tokens.css) + 8 theme presets
```

## Conventions

- **Content lives in `src/data/`** — add a project or sharing resource by appending to the typed arrays; pages render data-driven.
- **Design tokens**: 8 themes via `data-theme` attribute (`next-themes`), default `midnight`. Tokens defined in `src/lib/theme/tokens.css` — currently duplicated in `globals.css`; edit both until unified.
- **Smooth scroll**: routes with custom scroll (project case studies, `/mylife`, `/network`) must be added to the allowlist in `src/components/SmoothScroll.tsx`.
- No test suite — verify with `npm run build` and a manual pass on the affected routes.
