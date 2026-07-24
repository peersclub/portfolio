'use client';

/* V3 kinetic-type primitives — the casadisolare transition vocabulary:
   masked line rises, flip-clock character reveals, clip-mask parallax.
   All GSAP timelines are paused and fired by ScrollTrigger at entry,
   exactly like the reference site. */

import {
    useLayoutEffect,
    useRef,
    type CSSProperties,
    type ElementType,
    type ReactNode,
} from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

/** Masked line-rise reveal — casadisolare's signature.
    Words render in individual overflow masks; on entry each rises
    yPercent 100→0, staggered BY MEASURED LINE so the effect reads as
    whole lines lifting out of the page. */
export function Lines({
    text,
    as: Tag = 'p',
    className,
    delay = 0,
}: {
    text: string;
    as?: ElementType;
    className?: string;
    delay?: number;
}) {
    const ref = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;
        // Query nodes AT FIRE TIME, not at mount: React may replace the word
        // spans between mount and reveal, and a timeline captured against the
        // old nodes completes invisibly while the live DOM stays hidden.
        const io = new IntersectionObserver(
            (entries) => {
                if (!entries.some((e) => e.isIntersecting)) return;
                io.disconnect();
                const words = Array.from(el.querySelectorAll<HTMLElement>('.v3-wi'));
                if (!words.length) return;
                // group words into visual lines by measured offsetTop
                let lineIdx = -1;
                let lastTop = -Infinity;
                for (const w of words) {
                    const top = w.parentElement!.offsetTop;
                    if (Math.abs(top - lastTop) > 4) {
                        lineIdx += 1;
                        lastTop = top;
                    }
                    w.dataset.line = String(lineIdx);
                }
                // Animate `y`, not `yPercent`: GSAP parses the stylesheet's
                // translateY(110%) into its pixel `y` channel, so a yPercent
                // tween completes without ever moving the words.
                gsap.to(words, {
                    y: 0,
                    duration: 0.5,
                    delay,
                    ease: 'power2.inOut',
                    stagger: (_i, target) => Number((target as HTMLElement).dataset.line) * 0.06,
                });
            },
            { rootMargin: '0% 0% -12% 0%' },
        );
        io.observe(el);
        return () => io.disconnect();
    }, [text, delay]);

    const T = Tag as 'p';
    return (
        <T ref={ref as never} className={className} aria-label={text}>
            {text.split(' ').map((w, i) => (
                <span key={i} aria-hidden="true">
                    <span className="v3-w">
                        <span className="v3-wi">{w}</span>
                    </span>{' '}
                </span>
            ))}
        </T>
    );
}

/** Flip-clock heading — characters rotate rotationX 180→0 with alpha,
    staggered 0.05, like a split-flap board. */
export function Flip({
    text,
    as: Tag = 'h2',
    className,
    delay = 0,
    scrub = false,
}: {
    text: string;
    as?: ElementType;
    className?: string;
    delay?: number;
    /** tie the flip to scroll position instead of a one-shot entry */
    scrub?: boolean;
}) {
    const ref = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (scrub) {
            const ctx = gsap.context(() => {
                const chars = el.querySelectorAll('.v3-ch');
                if (!chars.length) return;
                const tl = gsap
                    .timeline({ paused: true, defaults: { ease: 'power2.inOut' } })
                    .fromTo(chars, { rotationX: 180 }, { rotationX: 0, duration: 0.75, stagger: 0.05 }, 0)
                    .fromTo(
                        chars,
                        { autoAlpha: 0 },
                        { autoAlpha: 1, duration: 0.625, stagger: 0.05, ease: 'power1.inOut' },
                        0,
                    );
                ScrollTrigger.create({
                    trigger: el,
                    start: 'top 90%',
                    end: 'top 35%',
                    scrub: 0.5,
                    animation: tl,
                });
            }, el);
            return () => ctx.revert();
        }
        const io = new IntersectionObserver(
            (entries) => {
                if (!entries.some((e) => e.isIntersecting)) return;
                io.disconnect();
                const chars = el.querySelectorAll('.v3-ch');
                if (!chars.length) return;
                const tl = gsap.timeline({ delay, defaults: { ease: 'power2.inOut' } });
                tl.fromTo(chars, { rotationX: 180 }, { rotationX: 0, duration: 0.75, stagger: 0.05 }, 0).fromTo(
                    chars,
                    { autoAlpha: 0 },
                    { autoAlpha: 1, duration: 0.625, stagger: 0.05, ease: 'power1.inOut' },
                    0,
                );
            },
            { rootMargin: '0% 0% -12% 0%' },
        );
        io.observe(el);
        return () => io.disconnect();
    }, [text, delay, scrub]);

    const T = Tag as 'h2';
    return (
        <T ref={ref as never} className={`v3-flip ${className ?? ''}`} aria-label={text}>
            {Array.from(text).map((c, i) => (
                <span className="v3-ch" key={i} aria-hidden="true">
                    {c === ' ' ? ' ' : c}
                </span>
            ))}
        </T>
    );
}

/** Two heading halves sliding together (x ±0.35em → 0) while rising. */
export function Converge({
    left,
    right,
    as: Tag = 'h2',
    className,
}: {
    left: string;
    right: string;
    as?: ElementType;
    className?: string;
}) {
    const ref = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            (entries) => {
                if (!entries.some((e) => e.isIntersecting)) return;
                io.disconnect();
                gsap.fromTo(
                    el.querySelectorAll('.v3-cv'),
                    { x: (i: number) => (i === 0 ? '0.35em' : '-0.35em'), autoAlpha: 0 },
                    { x: 0, autoAlpha: 1, duration: 0.5, ease: 'power1.inOut' },
                );
            },
            { rootMargin: '0% 0% -12% 0%' },
        );
        io.observe(el);
        return () => io.disconnect();
    }, [left, right]);

    const T = Tag as 'h2';
    return (
        <T ref={ref as never} className={className}>
            <span className="v3-cv">{left}</span> <span className="v3-cv">{right}</span>
        </T>
    );
}

/** Clip-mask parallax window — the section unclips as you scroll while
    its inner content parallaxes against the motion. */
export function ClipWindow({
    children,
    className,
    innerClassName,
}: {
    children: ReactNode;
    className?: string;
    innerClassName?: string;
}) {
    const outer = useRef<HTMLDivElement>(null);
    const clip = useRef<HTMLDivElement>(null);
    const inner = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const o = outer.current;
        const c = clip.current;
        const n = inner.current;
        if (!o || !c || !n) return;
        const ctx = gsap.context(() => {
            gsap.timeline({
                scrollTrigger: { trigger: o, start: 'top bottom', end: 'bottom top', scrub: 0.4 },
                defaults: { ease: 'none' },
            })
                .fromTo(
                    c,
                    { clipPath: 'inset(12% 6% 12% 6% round 28px)' },
                    { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 0.5 },
                    0,
                )
                .fromTo(n, { yPercent: -18 }, { yPercent: 18, duration: 1 }, 0);
        }, o);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={outer} className={className}>
            <div ref={clip} className="v3-clip">
                <div ref={inner} className={innerClassName}>
                    {children}
                </div>
            </div>
        </div>
    );
}

/** Simple velocity-neutral marquee strip. */
export function Marquee({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <div className={`v3-marquee ${className ?? ''}`} aria-hidden="true">
            <div className="v3-marquee-track">
                <span>{children}</span>
                <span>{children}</span>
            </div>
        </div>
    );
}

/** Intro curtain: a full-screen ink panel that wipes upward on load. */
export function Curtain({ style }: { style?: CSSProperties }) {
    const ref = useRef<HTMLDivElement>(null);
    useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;
        const tween = gsap.to(el, {
            yPercent: -100,
            duration: 0.9,
            delay: 0.15,
            ease: 'power2.inOut',
            // hide, don't remove — React still owns this node
            onComplete: () => {
                gsap.set(el, { display: 'none' });
            },
        });
        return () => {
            tween.kill();
        };
    }, []);
    return <div ref={ref} className="v3-curtain" style={style} aria-hidden="true" />;
}
