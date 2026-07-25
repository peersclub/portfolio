'use client';

import Link from 'next/link';
import { Curtain, Flip, Lines } from '../components/kinetic';
import V3Nav from '../components/V3Nav';
import '../v3.css';

export default function V3ContactPage() {
    return (
        <div className="v3">
            <Curtain />
            <V3Nav />

            <section className="v3-contact">
                <span className="v3-label">05 — Contact</span>
                <Flip text="LET'S" as="h1" className="v3-contact-line" delay={0.6} />
                <Flip text="TALK." as="h2" className="v3-contact-line v3-contact-line--accent" delay={0.85} />
                <Lines
                    as="p"
                    className="v3-story-body v3-play-note"
                    text="Product leadership, AI-native builds, or a hard knot you can't untangle — I answer fastest on email."
                    delay={1.3}
                />
                <div className="v3-cta-row">
                    <a href="mailto:sureshthejosephite@gmail.com" className="v3-cta v3-cta--solid">
                        Start the conversation
                    </a>
                    <a href="https://www.linkedin.com/in/sureshvictor/" target="_blank" rel="noopener noreferrer" className="v3-cta">
                        LinkedIn
                    </a>
                    <a href="https://wa.me/919535710101" target="_blank" rel="noopener noreferrer" className="v3-cta">
                        WhatsApp
                    </a>
                    <Link href="/v2/contact" className="v3-cta v3-cta--dim">
                        The gold thread
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
