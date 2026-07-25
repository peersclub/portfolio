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

        // the specimen responds to reading: headings gain weight as they
        // travel toward reading position (scrubbed variable-font axis)
        let st: ScrollTrigger | undefined;
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            el.classList.add('v3-wscrub');
            st = ScrollTrigger.create({
                trigger: el,
                start: 'top 96%',
                end: 'top 38%',
                scrub: 0.4,
                animation: gsap.fromTo(el, { '--wght': 340 }, { '--wght': 800, ease: 'none' }),
            });
        }
        return () => {
            io.disconnect();
            st?.kill();
        };
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
    sun = false,
}: {
    children: ReactNode;
    className?: string;
    innerClassName?: string;
    /** scrub an orange sun rising through the window */
    sun?: boolean;
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
            const sunEl = c.querySelector('.v3-clip-sun');
            if (sunEl) {
                gsap.fromTo(
                    sunEl,
                    { yPercent: 240, scale: 0.7 },
                    {
                        yPercent: -30,
                        scale: 1,
                        ease: 'none',
                        scrollTrigger: { trigger: o, start: 'top bottom', end: 'bottom top', scrub: 0.4 },
                    },
                );
            }
        }, o);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={outer} className={className}>
            <div ref={clip} className="v3-clip">
                {sun && <span className="v3-clip-sun" aria-hidden="true" />}
                <div ref={inner} className={innerClassName}>
                    {children}
                </div>
            </div>
        </div>
    );
}

/** Scroll-velocity-reactive marquee: cruises left, accelerates and skews
    with scroll speed, reverses direction when you scroll back up. */
export function Marquee({ children, className }: { children: ReactNode; className?: string }) {
    const trackRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        let x = 0;
        let vel = 0;
        let lastScroll = window.scrollY;
        const tick = (_t: number, dtMs: number) => {
            const dt = Math.min(dtMs, 50) / 1000;
            const scroll = window.scrollY;
            const raw = (scroll - lastScroll) / dt;
            lastScroll = scroll;
            vel += (raw - vel) * 0.12; // smooth
            const drive = gsap.utils.clamp(-900, 900, vel);
            x -= (55 + drive * 0.55) * dt;
            const half = track.scrollWidth / 2;
            if (half > 0) {
                if (x <= -half) x += half;
                if (x > 0) x -= half;
            }
            gsap.set(track, { x, skewX: gsap.utils.clamp(-9, 9, drive * 0.012) });
        };
        gsap.ticker.add(tick);
        return () => gsap.ticker.remove(tick);
    }, []);

    return (
        <div className={`v3-marquee ${className ?? ''}`} aria-hidden="true">
            <div className="v3-marquee-track" ref={trackRef}>
                <span>{children}</span>
                <span>{children}</span>
            </div>
        </div>
    );
}

/** Hero scroll-out: as the first fold leaves, the wordmark's weight
    drains, tracking opens, the sun sets, and the lede fades — the page
    "un-sets" its own type. Wrap the hero section with this. */
export function HeroScrub({ children, className }: { children: ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: { trigger: el, start: 'top top', end: 'bottom 12%', scrub: 0.35 },
                defaults: { ease: 'none' },
            });
            tl.fromTo(el, { '--wght': 800 }, { '--wght': 300, duration: 1 }, 0)
                .to(el.querySelectorAll('.v3-hero-line'), { letterSpacing: '0.05em', duration: 1 }, 0)
                .to(el.querySelector('.v3-hero-sun'), { yPercent: 190, scale: 0.55, duration: 1 }, 0)
                .to(el.querySelectorAll('.v3-hero-lede, .v3-hero-kicker'), { autoAlpha: 0, duration: 0.5 }, 0);
        }, el);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={ref} className={`v3-wscrub ${className ?? ''}`}>
            {children}
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
