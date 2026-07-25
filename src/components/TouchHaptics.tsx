'use client';

/* Site-wide tactile layer — one delegated listener instead of onClick
 * haptics scattered through every component. Any touch on an interactive
 * element (link, button, slider) gets a 10ms acknowledgement pulse.
 *
 * touch-only by design: e.pointerType gate here + the coarse-pointer gate
 * inside haptics.ts. Desktop never vibrates. iOS has no Vibration API, so
 * this is a silent no-op there. Components layer richer patterns on top
 * (TimeScrub detents, V2ThemeDock select) — those fire via their own
 * handlers; this baseline only covers the initial contact.
 */

import { useEffect } from 'react';
import { haptics } from '@/lib/haptics';

export default function TouchHaptics() {
    useEffect(() => {
        const onDown = (e: PointerEvent) => {
            if (e.pointerType !== 'touch') return;
            const el = e.target as Element | null;
            if (el?.closest('a, button, [role="slider"], [role="button"], input, select, [data-haptic]')) {
                haptics.tap();
            }
        };
        document.addEventListener('pointerdown', onDown, { passive: true });
        return () => document.removeEventListener('pointerdown', onDown);
    }, []);
    return null;
}
