'use client';

/* V3 interaction layer — mounted ONCE in v3/layout.tsx, active on every
   page of the edition:

   · V3Cursor    — ink dot + lagging ring, morphing per context:
                   links → sun-filled ring · work rows → "↗" · drag
                   surfaces ([data-cursor="drag"]) → "◂ ▸" pill
   · MagneticField — every .v3-cta leans toward the pointer and springs
                   back with an elastic release

   Both are fine-pointer only and disabled under prefers-reduced-motion. */

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

function usePrefs() {
    const [on, setOn] = useState(false);
    useEffect(() => {
        const fine = window.matchMedia('(pointer: fine)').matches;
        const motion = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
        setOn(fine && motion);
    }, []);
    return on;
}

export function V3Cursor() {
    const on = usePrefs();
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!on) return;
        document.documentElement.classList.add('v3-has-cursor');
        const dot = dotRef.current!;
        const ring = ringRef.current!;
        const pos = { x: innerWidth / 2, y: innerHeight / 2 };
        const ringPos = { x: pos.x, y: pos.y };

        const dotX = gsap.quickSetter(dot, 'x', 'px');
        const dotY = gsap.quickSetter(dot, 'y', 'px');
        const ringX = gsap.quickSetter(ring, 'x', 'px');
        const ringY = gsap.quickSetter(ring, 'y', 'px');

        const onMove = (e: PointerEvent) => {
            pos.x = e.clientX;
            pos.y = e.clientY;
        };

        const tick = () => {
            // dot snaps, ring glides — the lag is the character
            dotX(pos.x);
            dotY(pos.y);
            ringPos.x += (pos.x - ringPos.x) * 0.16;
            ringPos.y += (pos.y - ringPos.y) * 0.16;
            ringX(ringPos.x);
            ringY(ringPos.y);
        };
        gsap.ticker.add(tick);

        const stateFor = (el: Element | null): string => {
            if (!el) return '';
            if ((el as HTMLElement).closest('[data-cursor="drag"]')) return 'drag';
            if ((el as HTMLElement).closest('.v3-row')) return 'view';
            if ((el as HTMLElement).closest('a, button, input, [role="slider"]')) return 'link';
            return '';
        };
        const onOver = (e: PointerEvent) => {
            const s = stateFor(e.target as Element);
            ring.dataset.state = s;
            dot.dataset.state = s;
        };
        const onLeave = () => {
            ring.dataset.state = 'gone';
            dot.dataset.state = 'gone';
        };
        const onEnter = () => {
            ring.dataset.state = '';
            dot.dataset.state = '';
        };

        window.addEventListener('pointermove', onMove, { passive: true });
        document.addEventListener('pointerover', onOver, { passive: true });
        document.documentElement.addEventListener('pointerleave', onLeave);
        document.documentElement.addEventListener('pointerenter', onEnter);
        return () => {
            gsap.ticker.remove(tick);
            window.removeEventListener('pointermove', onMove);
            document.removeEventListener('pointerover', onOver);
            document.documentElement.removeEventListener('pointerleave', onLeave);
            document.documentElement.removeEventListener('pointerenter', onEnter);
            document.documentElement.classList.remove('v3-has-cursor');
        };
    }, [on]);

    if (!on) return null;
    return (
        <>
            <div ref={ringRef} className="v3-cursor-ring" aria-hidden="true">
                <span className="v3-cursor-glyph v3-cursor-glyph--view">↗</span>
                <span className="v3-cursor-glyph v3-cursor-glyph--drag">◂&nbsp;&nbsp;▸</span>
            </div>
            <div ref={dotRef} className="v3-cursor-dot" aria-hidden="true" />
        </>
    );
}

export function MagneticField() {
    const on = usePrefs();
    const pathname = usePathname();

    useEffect(() => {
        if (!on) return;
        const els = Array.from(document.querySelectorAll<HTMLElement>('.v3-cta, .v3-mark'));
        const cleanups = els.map((el) => {
            const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3.out' });
            const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3.out' });
            const onMove = (e: PointerEvent) => {
                const r = el.getBoundingClientRect();
                const dx = e.clientX - (r.left + r.width / 2);
                const dy = e.clientY - (r.top + r.height / 2);
                xTo(dx * 0.28);
                yTo(dy * 0.34);
            };
            const onLeave = () => {
                gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.35)' });
            };
            el.addEventListener('pointermove', onMove);
            el.addEventListener('pointerleave', onLeave);
            return () => {
                el.removeEventListener('pointermove', onMove);
                el.removeEventListener('pointerleave', onLeave);
                gsap.set(el, { x: 0, y: 0 });
            };
        });
        return () => cleanups.forEach((fn) => fn());
    }, [on, pathname]);

    return null;
}
