'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import { projects } from '@/data/projects';
import { ClipWindow, Converge, Curtain, Flip, Lines, Marquee } from './components/kinetic';
import TypeTester from './components/TypeTester';
import './v3.css';

const NAV: [string, string][] = [
    ['#intro', 'Intro'],
    ['#story', 'Story'],
    ['#work', 'Work'],
    ['#play', 'Test'],
    ['#contact', 'Contact'],
];

const STATS: [string, string][] = [
    ['10+', 'years building products'],
    ['1M+', 'users on one exchange'],
    ['6', 'companies shaped'],
    ['2', 'founder chapters'],
];

export default function V3Page() {
    return (
        <div className="v3">
            <Curtain />

            {/* ————— NAV ————— */}
            <nav className="v3-nav" aria-label="V3 navigation">
                <span className="v3-mark">SV·III</span>
                <div className="v3-nav-links">
                    {NAV.map(([href, label]) => (
                        <a key={href} href={href} className="v3-nav-link">
                            {label}
                        </a>
                    ))}
                </div>
                <Link href="/v2" className="v3-nav-link v3-nav-link--dim">
                    ← v2
                </Link>
            </nav>

            {/* ————— INTRO ————— */}
            <section id="intro" className="v3-hero">
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

            <Marquee className="v3-marquee-hero">
                AssetWorks AI · Cox &amp; Kings · CaptainFresh · CoinDCX · BabyChakra · KleverKid ·&nbsp;
            </Marquee>

            {/* ————— STORY ————— */}
            <section id="story" className="v3-section">
                <span className="v3-label">01 — Story</span>
                <Converge left="The" right="brief." as="h2" className="v3-h2" />
                <div className="v3-story-grid">
                    <Lines
                        as="p"
                        className="v3-story-lead"
                        text="I'm driven by a simple mission: build high-quality, scalable products that people genuinely love to use."
                    />
                    <Lines
                        as="p"
                        className="v3-story-body"
                        text="From scaling India's largest crypto exchange to pioneering AI-powered financial tools, I turn complex ideas into intuitive experiences that serve millions. Currently co-founding AssetWorks AI — sophisticated financial analysis, in plain language."
                    />
                </div>
                <div className="v3-stats">
                    {STATS.map(([value, label], i) => (
                        <div className="v3-stat" key={label}>
                            <Flip text={value} as="span" className="v3-stat-value" delay={i * 0.1} />
                            <span className="v3-label">{label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ————— CLIP DIVIDER ————— */}
            <ClipWindow className="v3-divider" innerClassName="v3-divider-inner">
                <Flip text="TEN YEARS" as="span" className="v3-divider-line" scrub />
                <Flip text="ONE CRAFT" as="span" className="v3-divider-line v3-divider-line--accent" scrub />
            </ClipWindow>

            {/* ————— WORK ————— */}
            <section id="work" className="v3-section">
                <span className="v3-label">02 — Work</span>
                <Converge left="Selected" right="chapters." as="h2" className="v3-h2" />
                <div className="v3-index">
                    {projects.map((p, i) => (
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
            </section>

            {/* ————— PLAYGROUND ————— */}
            <section id="play" className="v3-section">
                <span className="v3-label">03 — Test the specimen</span>
                <Converge left="Try me" right="on." as="h2" className="v3-h2" />
                <Lines
                    as="p"
                    className="v3-story-body v3-play-note"
                    text="Every typeface ships with a tester. So does every product leader. Adjust the axes — the specimen adapts. (So do I.)"
                />
                <TypeTester />
            </section>

            {/* ————— CONTACT ————— */}
            <section id="contact" className="v3-contact">
                <span className="v3-label">04 — Contact</span>
                <Flip text="LET'S" as="h2" className="v3-contact-line" />
                <Flip text="TALK." as="h2" className="v3-contact-line v3-contact-line--accent" />
                <div className="v3-cta-row">
                    <a href="mailto:sureshthejosephite@gmail.com" className="v3-cta v3-cta--solid">
                        Start the conversation
                    </a>
                    <a href="https://www.linkedin.com/in/sureshvictor/" target="_blank" rel="noopener noreferrer" className="v3-cta">
                        LinkedIn
                    </a>
                    <Link href="/v2" className="v3-cta">
                        The gold thread →
                    </Link>
                    <Link href="/" className="v3-cta v3-cta--dim">
                        Classic site
                    </Link>
                </div>
                <footer className="v3-footer">
                    <span className="v3-label">Suresh Victor · Bangalore · GMT+5:30</span>
                    <span className="v3-label">Set in Bricolage Grotesque · Edition III</span>
                </footer>
            </section>
        </div>
    );
}
