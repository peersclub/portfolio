import Image from 'next/image';
import Link from 'next/link';
import { Archivo } from 'next/font/google';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/data/projects';
import { ROLES, formatPeriod, formatYears, toYear, type Role } from '@/data/career';
import ResumeGate from '@/components/ResumeGate/ResumeGate';
import './case-study.css';

// Display face for case studies only. Archivo's width axis lets the company
// name run expanded in the hero and condensed in the evidence numerals.
const archivo = Archivo({
    subsets: ['latin'],
    axes: ['wdth'],
    variable: '--font-cs-display',
    display: 'swap',
});

/** Pick black or white ink for text set directly on a brand color. */
function inkOn(hex: string): string {
    const n = parseInt(hex.slice(1), 16);
    const lin = (c: number) => {
        const s = c / 255;
        return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    };
    const L = 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
    // contrast vs white = 1.05/(L+.05); vs near-black = (L+.05)/.055
    return 1.05 / (L + 0.05) >= (L + 0.05) / 0.055 ? '#FFFFFF' : '#0B0B0B';
}

// Real material only. Photos and app screens Suresh supplied; captions
// describe what is in the frame, nothing more. Team photos are cropped to the
// nearest standard ratio (4:3, 16:10, 16:9) that keeps every person in frame.
type Gallery = {
    title?: string;
    photos: { src: string; alt: string; w: number; h: number }[];
    screens?: { src: string; alt: string }[];
};

const GALLERY: Record<string, Gallery> = {
    koinbx: {
        title: 'The team',
        photos: [{ src: '/projects/koinbx/team.jpg', alt: 'The KoinBX team on stage in front of the KoinBX logo', w: 2400, h: 1800 }],
    },
    coindcx: {
        title: 'The team',
        photos: [{ src: '/projects/coindcx/team.jpg', alt: 'The CoinDCX team gathered around a long table in the office', w: 2400, h: 1500 }],
    },
    babychakra: {
        title: 'Moments',
        photos: [{ src: '/projects/babychakra/team.jpg', alt: 'A group photo with conference lanyards, taken in an elevator', w: 1280, h: 960 }],
    },
    kleverkid: {
        title: 'The team',
        photos: [{ src: '/projects/kleverkid/team.jpg', alt: 'The KleverKid team around a café table with a cake', w: 1599, h: 900 }],
    },
    'captain-fresh': {
        photos: [
            { src: '/projects/captain-fresh/IMG_3351.JPG', alt: 'On the beach with fishermen, looking at a phone together', w: 4032, h: 3024 },
            { src: '/projects/captain-fresh/74DF76BB-2735-4CC1-A3B5-0B4C1427B668.JPG', alt: 'Inside a seafood storage shed on a field visit', w: 4032, h: 3024 },
            { src: '/projects/captain-fresh/4b3691ce-4957-44ea-8739-16dd0aab9062.jpg', alt: 'Fishermen looking at a phone on the beach', w: 1200, h: 1600 },
        ],
        screens: [
            { src: '/projects/captain-fresh/app-borders.jpg', alt: 'App screen: international borders and real-time alerts near sensitive zones' },
            { src: '/projects/captain-fresh/app-catchlog.jpg', alt: 'App screen: digital catch log with each catch mapped' },
            { src: '/projects/captain-fresh/app-pfz.jpg', alt: 'App screen: potential fishing zones with compass navigation' },
            { src: '/projects/captain-fresh/app-weather.jpg', alt: 'App screen: hourly sea and wind weather forecast' },
        ],
    },
};

/** Career on one axis; the current role is lit in its brand color. */
function Tenure({ current, accent }: { current: Role; accent: string }) {
    const from = 2013;
    const to = toYear(null); // today, so the axis never shows a future year
    const span = to - from;
    // Greedy lanes so overlapping roles (e.g. KoinBX alongside AssetWorks) stack.
    const lanes: number[] = [];
    const placed = [...ROLES]
        .sort((a, b) => toYear(a.start) - toYear(b.start))
        .map(r => {
            const s = toYear(r.start);
            const e = toYear(r.end);
            let lane = lanes.findIndex(end => end <= s + 0.01);
            if (lane === -1) lane = lanes.length;
            lanes[lane] = e;
            return { r, s, e, lane };
        });
    // Label every second year; on phones only every fourth (see .is-minor).
    const years = Array.from({ length: Math.floor(to) - from + 1 }, (_, i) => from + i).filter(y => (y - from) % 2 === 0);

    return (
        <section className="cs-tenure" aria-label="Where this role sits in the career">
            <div className="cs-tenure-track" style={{ height: `${lanes.length * 14 + 6}px` }}>
                {placed.map(({ r, s, e, lane }) => {
                    const isCurrent = r === current;
                    const style = {
                        left: `${((s - from) / span) * 100}%`,
                        width: `${Math.max(((e - s) / span) * 100, 0.8)}%`,
                        top: `${lane * 14}px`,
                        background: isCurrent ? accent : undefined,
                    };
                    const label = `${r.company}, ${r.title}, ${formatPeriod(r)}`;
                    return r.slug && !isCurrent ? (
                        <Link key={r.company} href={`/projects/${r.slug}`} className="cs-seg" style={style} aria-label={label} title={label} />
                    ) : (
                        <span key={r.company} className={`cs-seg${isCurrent ? ' is-current' : ''}`} style={style} title={label} aria-label={label} role="img" />
                    );
                })}
            </div>
            <div className="cs-tenure-years" aria-hidden>
                {years.map(y => (
                    <span key={y} className={(y - from) % 4 ? 'is-minor' : undefined} style={{ left: `${((y - from) / span) * 100}%` }}>
                        {y}
                    </span>
                ))}
            </div>
        </section>
    );
}

export default function CaseStudy({ project, next }: { project: Project; next: Project }) {
    const role = ROLES.find(r => r.slug === project.slug)!;
    const brand = project.color;
    const ink = inkOn(brand);
    const dark = project.surface === 'dark';
    // On the page body the accent must read against the page, not the hero.
    // Light brands (BabyChakra cyan) wash out on a light page: deepen them.
    const accent = dark
        ? (project.colorOnDark ?? brand)
        : ink === '#0B0B0B' ? `color-mix(in srgb, ${brand} 45%, #0B0B0B)` : brand;
    const gallery = GALLERY[project.slug];
    const nextInk = inkOn(next.color);

    return (
        <article
            className={`cs ${archivo.variable} ${dark ? 'cs-dark' : 'cs-light'}`}
            style={{ '--brand': brand, '--brand-ink': ink, '--cs-accent': accent } as React.CSSProperties}
        >
            <header className="cs-hero">
                <div className="cs-hero-meta">
                    <p className="cs-hero-role">{role.title}</p>
                    <p className="cs-hero-when">
                        {formatPeriod(role)}
                        <br />
                        {role.location}
                    </p>
                </div>
                <p className="cs-hero-thesis">{project.tagline}.</p>
                <h1
                    className={`cs-wordmark${/[gjpqy]/.test(project.company) ? ' has-desc' : ''}`}
                    aria-label={project.company}
                    style={{ '--chars': project.company.length } as React.CSSProperties}
                >
                    <span aria-hidden>{project.company}</span>
                </h1>
            </header>

            <Tenure current={role} accent={accent} />

            <div className="cs-body">
                {/* Short one-line contexts already lead the hero; only a real brief earns a row. */}
                {role.context && role.context.length > 80 && (
                    <section className="cs-row">
                        <h2 className="cs-h">The brief</h2>
                        <p className="cs-lead">{role.context}</p>
                    </section>
                )}

                <section className="cs-row">
                    <h2 className="cs-h">What I did</h2>
                    <ul className="cs-did">
                        {role.bullets.map(b => (
                            <li key={b}>{b}</li>
                        ))}
                    </ul>
                </section>

                {role.evidence && role.evidence.length > 0 && (
                    <section className="cs-row cs-row-evidence">
                        <h2 className="cs-h">By the numbers</h2>
                        <dl className="cs-evidence">
                            {role.evidence.map(e => (
                                <div key={e.label}>
                                    <dt>{e.label}</dt>
                                    <dd>{e.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </section>
                )}

                {role.surfaces && role.surfaces.length > 0 && (
                    <section className="cs-row">
                        <h2 className="cs-h">{project.slug === 'assetworks-ai' ? 'Built with' : 'What it covered'}</h2>
                        <ul className="cs-surfaces">
                            {role.surfaces.map(s => (
                                <li key={s}>{s}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {gallery && (
                    <section className="cs-row cs-row-gallery">
                        <h2 className="cs-h">{gallery.title ?? 'From the field'}</h2>
                        <div className={`cs-photos${gallery.photos.length === 1 ? ' is-single' : ''}`}>
                            {gallery.photos.map(p => (
                                <figure key={p.src}>
                                    <Image
                                        src={p.src}
                                        alt={p.alt}
                                        width={p.w}
                                        height={p.h}
                                        sizes={gallery.photos.length === 1 ? '(max-width: 900px) 100vw, 60vw' : '(max-width: 900px) 100vw, 40vw'}
                                    />
                                </figure>
                            ))}
                        </div>
                        {gallery.screens && (
                            <div className="cs-screens">
                                {gallery.screens.map(s => (
                                    <figure key={s.src}>
                                        <Image src={s.src} alt={s.alt} width={682} height={1024} sizes="(max-width: 900px) 50vw, 20vw" />
                                        <figcaption>{s.alt.replace('App screen: ', '')}</figcaption>
                                    </figure>
                                ))}
                            </div>
                        )}
                    </section>
                )}

                <section className="cs-row cs-cta">
                    <h2 className="cs-h">Working on something like this?</h2>
                    <div className="cs-cta-body">
                        <p className="cs-lead">Tell me what you are building. I reply fastest on WhatsApp and email.</p>
                        <div className="cs-cta-actions">
                            <Link href="/contact" className="cs-btn">
                                Get in touch
                            </Link>
                            <ResumeGate tone="ghost" />
                        </div>
                    </div>
                </section>
            </div>

            <Link
                href={`/projects/${next.slug}`}
                className="cs-next"
                style={{ '--next': next.color, '--next-ink': nextInk } as React.CSSProperties}
            >
                <span className="cs-next-kicker">Next case study</span>
                <span className="cs-next-name">
                    {next.company}
                    <ArrowUpRight className="cs-next-arrow" aria-hidden />
                </span>
                <span className="cs-next-role">
                    {next.role}, {formatYears(ROLES.find(r => r.slug === next.slug)!)}
                </span>
            </Link>
        </article>
    );
}
