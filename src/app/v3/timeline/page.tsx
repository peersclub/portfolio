'use client';

import Link from 'next/link';
import { Converge, Curtain, Lines } from '../components/kinetic';
import TimeScrub from '../components/TimeScrub';
import V3Nav from '../components/V3Nav';
import '../v3.css';

export default function V3TimelinePage() {
    return (
        <div className="v3">
            <Curtain />
            <V3Nav />

            <section className="v3-section">
                <span className="v3-label">02 — Scrub the timeline</span>
                <Converge left="Thirty-three years," right="one drag." as="h1" className="v3-h2" />
                <Lines
                    as="p"
                    className="v3-story-body v3-play-note"
                    text="Drag through the years — every chapter, with the numbers that mattered."
                />
                <TimeScrub />
            </section>

            <section className="v3-strip">
                <span className="v3-label">Next</span>
                <div className="v3-strip-links">
                    <Link href="/v3/about" className="v3-cta">
                        The brief →
                    </Link>
                    <Link href="/v3/contact" className="v3-cta v3-cta--solid">
                        Let&apos;s talk
                    </Link>
                </div>
            </section>
        </div>
    );
}
