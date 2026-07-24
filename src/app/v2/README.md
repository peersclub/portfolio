# V2 — "The Gold Thread"

A complete second site living alongside v1 (the classic portfolio) in the same
Next.js app. **v1 is never touched by v2 code**: everything v2 lives under
`src/app/v2/` and shares nothing outward except `src/data/projects.ts` (read-only).

Two sites, one repo. One gold thread, every page.

## The one idea

A single procedural 3D gold string (React Three Fiber) is the identity of the
whole v2 world. Every page renders the *same* scene — same material, lighting,
bloom — and only chooses the thread's **choreography**:

- `/v2` — scroll-scrubbed career journey: tangle → knot → loop → spiral → coil → helix → wave → line
- `/v2/mylife` — scroll-scrubbed life journey: tangle → loop → knot → helix → wave → spiral → coil → line
- `/v2/work` · `/v2/about` · `/v2/contact` — the thread pinned to a single pose

## Structure

```
v2/
├── layout.tsx          metadata for the subtree
├── page.tsx            home — composition only
├── data.ts             home content (chapters, contact, HUD labels)
├── v2.css              THE design system: labels, type, cards, CTAs, HUD, rail, nav
├── components/         ALL shared machinery — pages import from here only
│   ├── threadShapes.ts pure-math shape vocabulary (NO three.js — safe to
│   │                   import statically without bloating page bundles)
│   ├── ThreadScene.tsx the WebGL engine; accepts states/offsets/scales;
│   │                   the ONLY module that touches three.js
│   ├── ThreadStage.tsx the fixed-layer owner: portals canvas + veil + HUD
│   │                   (+ optional clickable rail) to <body>
│   ├── V2Nav.tsx       v2-internal nav (Thread · Work · Life · About · Contact)
│   ├── Word.tsx        masked word-reveal for headlines
│   ├── Counter.tsx     count-up-on-view number
│   ├── ScrubText.tsx   scroll-scrubbed word-highlight paragraph
│   └── motion.ts       the motion vocabulary (rise/reveal/wordUp/wipe/stagger)
├── work/ about/ contact/   each: page.tsx (composition only)
└── mylife/                 page.tsx + data.ts (life story) + mylife.css (v2ml- scoped)
```

## Rules

1. **Pages compose; components own behaviour.** No variants, portals, or
   scaffolding declared inside a page — import from `components/`.
2. **Never import `ThreadScene` statically from a page.** `ThreadStage` wraps
   it in `next/dynamic` — a static import drags three.js (~250 kB) into the
   page chunk. Shape math comes from `threadShapes.ts`, which is three-free.
3. **All fixed-position UI goes through `ThreadStage`'s portal.**
   `app/template.tsx` keeps `filter`/`will-change` on a page wrapper, which
   hijacks `position: fixed` inside `<main>` (pins to page, not viewport).
4. **CSS**: `v2.css` is the design system (`v2-` prefix). Page-specific styles
   get their own file and prefix (`v2ml-` for mylife). Plain global CSS, not
   styled-jsx — framer-motion/`<Link>` components don't receive styled-jsx
   scope classes.
5. **Scroll-synced graphics are measured, not assumed** — anchor to real
   section offsets (see mylife's section-center warp) and re-measure on resize.

## Adding a v2 page

```tsx
'use client';
import ThreadStage from '../components/ThreadStage';
import V2Nav from '../components/V2Nav';
import { rise, stagger } from '../components/motion';
import '../v2.css';

export default function NewPage() {
    return (
        <div className="v2">
            <ThreadStage progress={3 / 7} />   {/* pick a pose, or drive progressRef */}
            <V2Nav />
            {/* sections styled with v2.css primitives */}
        </div>
    );
}
```

Add the route to `components/V2Nav.tsx`. Verify with `npm run build`
(stop the dev server first — building while `next dev` runs corrupts `.next`).
