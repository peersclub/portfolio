'use client';

/* IconStack — the timeline's showcase glyph.
 *
 * One lucide line icon rendered as SIX outlined copies extruded along Z
 * over a grounded base plate, viewed in perspective — the "stacked
 * wireframe" look. Three behaviours sell the physicality:
 *
 *   · switch  — the stack squashes into its base (top layers arrive last),
 *               the glyph swaps at maximum compression, then the stack
 *               springs back up with an elastic wave from the base out —
 *               bouncing off the base, never detached from it.
 *   · sway    — fine pointers: the whole rig tilts toward the cursor while
 *               each layer chases with increasing lag (base stiff, top
 *               loose), so the extrusion visibly bends like one elastic body.
 *   · idle    — coarse pointers get a slow autonomous sway instead.
 *
 * DOM + CSS 3D + GSAP only — no WebGL. v3 stays typographic and light.
 * pointer-events: none throughout: the scrub stage behind it owns the drag.
 */

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import gsap from 'gsap';
import type { LucideIcon } from 'lucide-react';

const LAYERS = 6; // icon copies above the base plate
const GAP = 11; // resting translateZ between layers (px)

interface IconStackProps {
    icon: LucideIcon;
    /** any value whose change triggers the squash-and-spring switch */
    epoch: string | number;
}

export default function IconStack({ icon, epoch }: IconStackProps) {
    const [Shown, setShown] = useState<LucideIcon>(() => icon);
    const tiltRef = useRef<HTMLDivElement>(null);
    const shadowRef = useRef<HTMLSpanElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const iconRef = useRef(icon);
    iconRef.current = icon; // timeline callbacks read the latest target glyph
    const firstRun = useRef(true);

    /* resting pose + sway. Baseline tilt is set here (not only CSS) so gsap
       rotation tweens compose around it instead of fighting the stylesheet. */
    useEffect(() => {
        const tilt = tiltRef.current!;
        const layers = Array.from(tilt.querySelectorAll<HTMLElement>('.v3-is-layer'));
        const sways = Array.from(tilt.querySelectorAll<HTMLElement>('.v3-is-sway'));

        gsap.set(tilt, { rotationX: 32, rotationY: -26 });
        gsap.set(layers, { z: (i) => (i + 1) * GAP });

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduced) return;

        const fine = window.matchMedia('(pointer: fine)').matches;
        if (fine) {
            // rig tilt chases fast; each layer's lateral sway chases slower the
            // higher it sits — the lag differential is what reads as "bend"
            const rx = gsap.quickTo(tilt, 'rotationX', { duration: 0.5, ease: 'power3.out' });
            const ry = gsap.quickTo(tilt, 'rotationY', { duration: 0.5, ease: 'power3.out' });
            const chase = sways.map((el, i) => ({
                x: gsap.quickTo(el, 'x', { duration: 0.28 + i * 0.11, ease: 'power3.out' }),
                y: gsap.quickTo(el, 'y', { duration: 0.28 + i * 0.11, ease: 'power3.out' }),
            }));
            const onMove = (e: PointerEvent) => {
                const nx = e.clientX / window.innerWidth - 0.5;
                const ny = e.clientY / window.innerHeight - 0.5;
                rx(32 - ny * 10);
                ry(-26 + nx * 12);
                chase.forEach((c, i) => {
                    c.x(nx * (i + 1) * 2.6);
                    c.y(ny * (i + 1) * 1.8);
                });
            };
            window.addEventListener('pointermove', onMove, { passive: true });
            return () => window.removeEventListener('pointermove', onMove);
        }

        // touch: slow autonomous sway so the depth still reveals itself
        const idle = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'sine.inOut' } });
        idle.to(tilt, { rotationY: -14, rotationX: 26, duration: 3.2 });
        idle.to(tilt, { rotationY: -34, rotationX: 36, duration: 3.2 });
        return () => {
            idle.kill();
        };
    }, []);

    /* the switch: squash into the base → swap glyph → elastic spring out */
    useEffect(() => {
        if (firstRun.current) {
            firstRun.current = false;
            return;
        }
        const tilt = tiltRef.current;
        if (!tilt) return;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setShown(() => iconRef.current);
            return;
        }

        const layers = Array.from(tilt.querySelectorAll<HTMLElement>('.v3-is-layer'));
        const shadow = shadowRef.current!;

        tlRef.current?.kill();
        const tl = gsap.timeline();
        tlRef.current = tl;

        // compress: every layer collapses onto the base plate (top arrives last)
        tl.to(layers, {
            z: 2,
            duration: 0.16,
            ease: 'power3.in',
            stagger: { each: 0.02, from: 'end' },
        });
        tl.to(shadow, { scale: 1.18, opacity: 0.3, duration: 0.16, ease: 'power3.in' }, '<');

        // swap the glyph while the stack is flat — the new icon erupts
        tl.add(() => setShown(() => iconRef.current));

        // spring: a slinky wave from the base out, slight twist settling to zero
        tl.fromTo(
            layers,
            { rotationZ: (i: number) => -4 - i * 1.5 },
            {
                z: (i: number) => (i + 1) * GAP,
                rotationZ: 0,
                duration: 1.05,
                ease: 'elastic.out(1, 0.36)',
                stagger: { each: 0.05, from: 'start' },
            },
        );
        tl.to(shadow, { scale: 1, opacity: 0.16, duration: 0.9, ease: 'elastic.out(1, 0.4)' }, '<0.1');

        return () => {
            tl.kill();
        };
    }, [epoch]);

    return (
        <div className="v3-is" aria-hidden="true">
            <div ref={tiltRef} className="v3-is-tilt">
                <span ref={shadowRef} className="v3-is-shadow" />
                <span className="v3-is-base" />
                {Array.from({ length: LAYERS }, (_, i) => (
                    <span className="v3-is-layer" key={i} style={{ '--i': i } as CSSProperties}>
                        <span className="v3-is-sway">
                            <Shown strokeWidth={1.75} />
                        </span>
                    </span>
                ))}
            </div>
        </div>
    );
}
