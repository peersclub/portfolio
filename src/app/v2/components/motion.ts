// V2 motion vocabulary — every page speaks the same movement language.
// Import from here; never re-declare variants in a page.

import type { Variants } from 'framer-motion';

/** the house ease — fast out, long settle */
export const EASE_OUT = [0.19, 1, 0.22, 1] as const;

/** fade up into place */
export const rise: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
};

/** hero-scale fade up (slightly deeper travel) */
export const reveal: Variants = {
    hidden: { opacity: 0, y: 48 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
};

/** word rising out of an overflow mask (use with <Word>) */
export const wordUp: Variants = {
    hidden: { y: '115%', rotate: 2 },
    show: { y: '0%', rotate: 0, transition: { duration: 0.85, ease: EASE_OUT } },
};

/** pen-stroke wipe, left to right */
export const wipe: Variants = {
    hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
    show: { clipPath: 'inset(0 0% 0 0)', transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1] } },
};

/** stagger container — pair with children that carry `rise`/`reveal`/`wordUp` */
export const stagger = (children = 0.12, delay = 0): Variants => ({
    show: { transition: { staggerChildren: children, delayChildren: delay } },
});
