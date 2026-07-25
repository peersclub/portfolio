'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import BrandName from '@/components/BrandName';
import { projects } from '@/data/projects';
import { Converge, Curtain, Lines, Marquee } from '../components/kinetic';
import V3Nav from '../components/V3Nav';
import '../v3.css';

export default function V3WorkPage() {
    return (
        <div className="v3">
            <Curtain />
            <V3Nav />

            <section className="v3-section">
                <span className="v3-label">01 — Work</span>
                <Converge left="Selected" right="chapters." as="h1" className="v3-h2" />
                <Lines
                    as="p"
                    className="v3-story-body v3-play-note"
                    text="Six companies across fintech, consumer, supply chain, travel, and AI — every chapter pulled a different knot."
                />
                <div className="v3-index">
                    {projects.map((p, i) => (
                        <Link
                            key={p.slug}
                            href={`/projects/${p.slug}`}
                            className="v3-row"
                            style={{ '--ch': p.color } as CSSProperties}
                        >
                            <span className="v3-row-num">{String(i + 1).padStart(2, '0')}</span>
                            <span className="v3-row-company"><BrandName name={p.company} /></span>
                            <span className="v3-row-tag">{p.tagline}</span>
                            <span className="v3-row-year">{p.year}</span>
                            <span className="v3-row-arrow" aria-hidden="true">
                                ↗
                            </span>
                        </Link>
                    ))}
                </div>
            </section>

            <Marquee className="v3-marquee-foot">
                AssetWorks AI · Cox &amp; Kings · CaptainFresh · CoinDCX · BabyChakra · KleverKid ·&nbsp;
            </Marquee>

            <section className="v3-strip">
                <span className="v3-label">Next</span>
                <div className="v3-strip-links">
                    <Link href="/v3/timeline" className="v3-cta">
                        Scrub the timeline →
                    </Link>
                    <Link href="/v3/contact" className="v3-cta v3-cta--solid">
                        Let&apos;s talk
                    </Link>
                </div>
            </section>
        </div>
    );
}
