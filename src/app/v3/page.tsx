'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import { featuredProjects } from '@/data/projects';
import { ClipWindow, Converge, Curtain, Flip, HeroScrub, Lines, Marquee } from './components/kinetic';
import V3Nav from './components/V3Nav';
import './v3.css';

export default function V3Page() {
    return (
        <div className="v3">
            <Curtain />
            <V3Nav />

            {/* ————— INTRO ————— */}
            <HeroScrub>
                <section className="v3-hero">
                <span className="v3-label v3-hero-kicker">Suresh Victor — Third Edition</span>
                <Flip text="PRODUCT" as="h1" className="v3-hero-line" delay={0.7} />
                <div className="v3-hero-row">
                    <Flip text="ARCH" as="span" className="v3-hero-line" delay={1.0} />
                    <span className="v3-hero-sun" aria-hidden="true" />
                    <Flip text="ITECT" as="span" className="v3-hero-line" delay={1.15} />
                </div>
                    <Lines
                        className="v3-hero-lede"
                        delay={1.6}
                        text="A career, set in motion. Ten years of untangling fintech, consumer, and AI products — displayed here as a living type specimen."
                    />
                </section>
            </HeroScrub>

            <Marquee className="v3-marquee-hero">
                AssetWorks AI · Cox &amp; Kings · CaptainFresh · CoinDCX · BabyChakra · KleverKid ·&nbsp;
            </Marquee>

            {/* ————— BRIEF TEASER ————— */}
            <section className="v3-section">
                <span className="v3-label">01 — Story</span>
                <Converge left="The" right="brief." as="h2" className="v3-h2" />
                <div className="v3-story-grid">
                    <Lines
                        as="p"
                        className="v3-story-lead"
                        text="I'm driven by a simple mission: build high-quality, scalable products that people genuinely love to use."
                    />
                    <div className="v3-teaser-more">
                        <Lines
                            as="p"
                            className="v3-story-body"
                            text="Ten years, six companies, two founder chapters — and one repeating pattern: find the knot, pull gently, ship."
                        />
                        <Link href="/v3/about" className="v3-cta">
                            Read the full brief →
                        </Link>
                    </div>
                </div>
            </section>

            {/* ————— CLIP DIVIDER ————— */}
            <ClipWindow className="v3-divider" innerClassName="v3-divider-inner" sun>
                <Flip text="TEN YEARS" as="span" className="v3-divider-line" scrub />
                <Flip text="ONE CRAFT" as="span" className="v3-divider-line v3-divider-line--accent" scrub />
            </ClipWindow>

            {/* ————— FEATURED WORK ————— */}
            <section className="v3-section">
                <span className="v3-label">02 — Featured work</span>
                <Converge left="Three" right="chapters." as="h2" className="v3-h2" />
                <div className="v3-index">
                    {featuredProjects.map((p, i) => (
                        <Link
                            key={p.slug}
                            href={`/projects/${p.slug}`}
                            className="v3-row"
                            style={{ '--ch': p.color } as CSSProperties}
                        >
                            <span className="v3-row-num">{String(i + 1).padStart(2, '0')}</span>
                            <Lines as="span" className="v3-row-company" text={p.company} />
                            <span className="v3-row-tag">{p.tagline}</span>
                            <span className="v3-row-year">{p.year}</span>
                            <span className="v3-row-arrow" aria-hidden="true">
                                ↗
                            </span>
                        </Link>
                    ))}
                </div>
                <div className="v3-index-more">
                    <Link href="/v3/work" className="v3-cta">
                        All six chapters →
                    </Link>
                    <Link href="/v3/timeline" className="v3-cta v3-cta--dim">
                        Or scrub the timeline
                    </Link>
                </div>
            </section>

            {/* ————— CONTACT STRIP ————— */}
            <section className="v3-strip v3-strip--tall">
                <Converge left="A knot to" right="untangle?" as="h2" className="v3-h2 v3-strip-h" />
                <div className="v3-strip-links">
                    <Link href="/v3/contact" className="v3-cta v3-cta--solid">
                        Let&apos;s talk
                    </Link>
                    <Link href="/" className="v3-cta v3-cta--dim">
                        Classic site
                    </Link>
                </div>
            </section>
        </div>
    );
}
