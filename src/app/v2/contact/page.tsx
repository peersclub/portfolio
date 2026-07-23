'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import Stage from '../components/Stage';
import V2Nav from '../components/V2Nav';
import { CONTACT } from '../data';
import '../v2.css';

const rise: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } },
};

export default function V2ContactPage() {
    return (
        <div className="v2">
            {/* straight line — the shipped state */}
            <Stage progress={1} />
            <V2Nav />

            <section className="v2-section v2-contact v2-contact-page">
                <motion.div
                    className="v2-hero-inner v2-contact-inner"
                    initial="hidden"
                    animate="show"
                    variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}
                >
                    <motion.span className="v2-label" variants={rise}>
                        Contact
                    </motion.span>
                    <motion.h1 className="v2-contact-h" variants={rise}>
                        Let&apos;s pull a <em>thread</em> together.
                    </motion.h1>
                    <motion.p className="v2-lede" variants={rise}>
                        Product leadership, AI-native builds, or a hard knot you can&apos;t
                        untangle — I answer fastest on email and WhatsApp.
                    </motion.p>
                    <motion.div className="v2-cta-row" variants={rise}>
                        <a href={`mailto:${CONTACT.email}`} className="v2-cta v2-cta--solid">
                            Start a thread
                        </a>
                        <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="v2-cta">
                            WhatsApp
                        </a>
                        <a
                            href="https://www.linkedin.com/in/sureshvictor/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="v2-cta"
                        >
                            LinkedIn
                        </a>
                        <Link href="/contact" className="v2-cta v2-cta--ghost">
                            Classic contact →
                        </Link>
                    </motion.div>
                    <motion.span className="v2-hud-label" variants={rise}>
                        Bangalore, India · GMT+5:30
                    </motion.span>
                </motion.div>
            </section>
        </div>
    );
}
