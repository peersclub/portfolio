'use client';

import Link from 'next/link';
import { Converge, Curtain, Flip, Lines } from '../components/kinetic';
import V3Nav from '../components/V3Nav';
import '../v3.css';

const STATS: [string, string][] = [
    ['10+', 'years building products'],
    ['4', 'trading products led at CoinDCX'],
    ['8', 'roles since 2015'],
    ['2', 'founder chapters'],
];

const PRINCIPLES: [string, string][] = [
    ['Docs over meetings', 'Writing forces clarity. A one-pager that survives review beats an hour of nodding.'],
    ['Outcomes over output', 'Shipped features are cost. Retention, revenue, and trust are the product.'],
    ['Engineers as partners', 'Not ticket-takers. The best product decisions I have shipped were co-authored.'],
];

const DETAILS: [string, string][] = [
    ['Based in', 'Bangalore, India'],
    ['Education', 'B.Tech, Chemical Engineering, NITK Surathkal'],
    ['Focus', 'Product strategy, fintech and crypto'],
    ['Now', 'Product & technology at KoinBX; co-founder, AssetWorks AI'],
];

export default function V3AboutPage() {
    return (
        <div className="v3">
            <Curtain />
            <V3Nav />

            <section className="v3-section">
                <span className="v3-label">03 — About</span>
                <Converge left="The" right="brief." as="h1" className="v3-h2" />
                <div className="v3-story-grid">
                    <Lines
                        as="p"
                        className="v3-story-lead"
                        text="I build 0-to-1 products and the teams behind them, and run the business on unit economics and data."
                    />
                    <Lines
                        as="p"
                        className="v3-story-body"
                        text="I led product at CoinDCX across four trading products, built Captain Fresh's product and team from scratch, and co-founded AssetWorks AI. Today I own product and technology strategy at KoinBX, where crypto futures launched in August 2026."
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

            <section className="v3-section">
                <span className="v3-label">04 — How I work</span>
                <Converge left="Three" right="rules." as="h2" className="v3-h2" />
                <div className="v3-principles">
                    {PRINCIPLES.map(([title, body], i) => (
                        <div className="v3-principle" key={title}>
                            <span className="v3-row-num">{String(i + 1).padStart(2, '0')}</span>
                            <Lines as="h3" className="v3-principle-title" text={title} />
                            <Lines as="p" className="v3-story-body" text={body} />
                        </div>
                    ))}
                </div>
                <div className="v3-details">
                    {DETAILS.map(([label, value]) => (
                        <div className="v3-detail" key={label}>
                            <span className="v3-label">{label}</span>
                            <span className="v3-detail-value">{value}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="v3-strip">
                <span className="v3-label">Next</span>
                <div className="v3-strip-links">
                    <Link href="/about" className="v3-cta">
                        The classic story →
                    </Link>
                    <Link href="/v3/contact" className="v3-cta v3-cta--solid">
                        Let&apos;s talk
                    </Link>
                </div>
            </section>
        </div>
    );
}
