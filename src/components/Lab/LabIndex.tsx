import Image from 'next/image';
import type { CSSProperties } from 'react';
import { Instrument_Serif, Space_Grotesk } from 'next/font/google';
import { labProjects, formatDay, formatMonth, gapLabel, parse, MONTHS, type LabProject } from '@/data/lab';
import './lab.css';

/*
 * The Lab. Two parts:
 *  1. HeadStart — one lane per product: where I started, and a bar running to
 *     the launch of the big name that followed. The page's one bold element;
 *     it takes the edition's colors (v1 / .v2-lab / .v3-lab re-skins).
 *  2. Chapters — each product drawn in its own brand: AI Cost Guardian's
 *     purple glass, NoMail's monochrome ink on iOS grey, Clarity's midnight +
 *     teal + Instrument Serif, Shortcut Generator's near-black + blue,
 *     FlowPilot's OLED black + amber, Credably's Cobalt paper + Space Grotesk.
 *     These never re-skin per edition; they are the products' own themes.
 */

const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', variable: '--lab-serif' });
const grotesk = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600'], variable: '--lab-grotesk' });

const AXIS_START = '2025-07-01';

function axisEnd(): string {
    const now = new Date();
    // one month past the current month, so "today" never sits on the edge
    const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 2, 1));
    return end.toISOString().slice(0, 10);
}

function HeadStart() {
    const start = parse(AXIS_START).getTime();
    const endIso = axisEnd();
    const end = parse(endIso).getTime();
    const today = new Date().toISOString().slice(0, 10);
    const at = (iso: string) => `${(((parse(iso).getTime() - start) / (end - start)) * 100).toFixed(2)}%`;

    const months: string[] = [];
    for (let d = parse(AXIS_START); d.getTime() < end; d = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1))) {
        months.push(d.toISOString().slice(0, 10));
    }

    return (
        <figure className="hs" aria-labelledby="hs-cap" style={{ '--hs-lanes': labProjects.length } as CSSProperties}>
            <div className="hs-scroll">
                <div className="hs-grid">
                    <div className="hs-axis" aria-hidden>
                        {months.map(m => {
                            const d = parse(m);
                            return (
                                <span key={m} className={`hs-month${d.getUTCMonth() === 0 ? ' is-year' : ''}`} style={{ left: at(m) }}>
                                    {d.getUTCMonth() === 0 ? d.getUTCFullYear() : MONTHS[d.getUTCMonth()].slice(0, 1)}
                                </span>
                            );
                        })}
                        <span className="hs-today" style={{ left: at(today) }}>
                            Today
                        </span>
                    </div>

                    {labProjects.map(p => {
                        const key = p.after.find(e => e.key);
                        const barEnd = key ? key.date : today;
                        return (
                            <div key={p.slug} className="hs-lane" style={{ '--lane': p.accent } as CSSProperties}>
                                <a className="hs-name" href={`#${p.slug}`}>
                                    {p.name}
                                    <span className="hs-name-gap">
                                        {key
                                            ? `${gapLabel(p.started, key.date).replace('+', '').replace('mo', 'months')} ahead of ${key.name}`
                                            : 'nobody yet'}
                                    </span>
                                </a>
                                <div className="hs-track">
                                    <span
                                        className={`hs-bar${key ? '' : ' is-open'}`}
                                        style={{ left: at(p.started), width: `calc(${at(barEnd)} - ${at(p.started)})` }}
                                    >
                                        <span className="hs-bar-label">
                                            {key ? gapLabel(p.started, key.date).replace('+', '').replace('mo', 'months') : 'Nobody yet'}
                                        </span>
                                    </span>
                                    {key && (
                                        <span className="hs-keyname" style={{ left: at(key.date) }}>
                                            {key.name}
                                        </span>
                                    )}
                                    <span className="hs-me" style={{ left: at(p.started) }} title={`Started ${formatDay(p.started)}`}>
                                        <span className="hs-me-label">{formatMonth(p.started)}</span>
                                    </span>
                                    {p.after.map(e => (
                                        <span
                                            key={e.name}
                                            className={`hs-evt${e.key ? ' is-key' : ''}`}
                                            style={{ left: at(e.date) }}
                                            title={`${e.name}, ${formatDay(e.date)}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <figcaption id="hs-cap" className="hs-cap">
                <span className="hs-key hs-key--me" /> when I started
                <span className="hs-key hs-key--bar" /> my head start
                <span className="hs-key hs-key--evt" /> a bigger company ships its version
                <span className="hs-key hs-key--dot" /> others follow
            </figcaption>
        </figure>
    );
}

function Visual({ p }: { p: LabProject }) {
    if (p.shot) {
        return (
            <figure className="ch-shot">
                <Image src={p.shot.src} alt={p.shot.alt} width={p.shot.w} height={p.shot.h} sizes="(max-width: 900px) 100vw, 46vw" />
                <figcaption>{p.shot.caption}</figcaption>
            </figure>
        );
    }
    // NoMail: no public build to screenshot, so its own promise, in its own ink
    if (p.slug === 'nomail') {
        return (
            <figure className="ch-nm-spec" aria-label="NoMail, in its own styling">
                <span className="ch-nm-logo">NoMail</span>
                <ul className="ch-nm-rows" aria-label="What it pulls out of the inbox">
                    {['Arriving', 'Due', 'Renewing', 'Subscriptions', 'Invites'].map(n => (
                        <li key={n}>{n}</li>
                    ))}
                </ul>
                <p className="ch-nm-note">Read-only. Never sends, moves, or deletes mail.</p>
                <figcaption>Styled after the NoMail app</figcaption>
            </figure>
        );
    }
    // AI Cost Guardian: its own hero, set in its own type, no marketing claims
    return (
        <figure className="ch-acg-spec" aria-label="AI Cost Guardian hero, in its own styling">
            <span className="ch-acg-logo" aria-hidden>
                <svg viewBox="0 0 24 24" width="22" height="22">
                    <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z" fill="currentColor" />
                </svg>
                AICostGuardian
            </span>
            <p className="ch-acg-h">
                AI Cost Management
                <br />
                <span>Reimagined for Enterprise</span>
            </p>
            <ul className="ch-acg-providers" aria-label="Providers it connects">
                {['OpenAI', 'Anthropic', 'Gemini', 'Grok'].map(n => (
                    <li key={n}>{n}</li>
                ))}
            </ul>
            <figcaption>Styled after aicostguardian.com</figcaption>
        </figure>
    );
}

function Chapter({ p }: { p: LabProject }) {
    return (
        <section className={`ch ch--${p.slug}`} id={p.slug} aria-labelledby={`${p.slug}-name`}>
            <header className="ch-top">
                <h2 className="ch-name" id={`${p.slug}-name`}>
                    {p.name}
                </h2>
                <p className="ch-meta">
                    <span>Started {formatDay(p.started)}</span>
                    <span className="ch-status">{p.status}</span>
                    {p.url && (
                        <a href={p.url} target="_blank" rel="noopener noreferrer">
                            {p.url.replace(/^https?:\/\//, '')}
                        </a>
                    )}
                </p>
            </header>

            <p className="ch-lead">{p.lead}</p>

            <div className="ch-grid">
                <div className="ch-text">
                    <p className="ch-one">{p.oneLine}</p>
                    <h3>What it does</h3>
                    <p>{p.what}</p>
                    <h3>Why {p.credit ? 'we' : 'I'} built it</h3>
                    <p>{p.why}</p>
                    {p.credit && <p className="ch-credit">{p.credit}</p>}
                </div>
                <Visual p={p} />
            </div>

            <div className="ch-after">
                <h3>Who came after</h3>
                {p.after.length > 0 ? (
                    <ol className="ch-runs">
                        {p.after.map(e => (
                            <li key={e.name} className={e.key ? 'is-key' : undefined}>
                                <span className="ch-gap">{gapLabel(p.started, e.date)}</span>
                                <a href={e.source} target="_blank" rel="noopener noreferrer">
                                    {e.name}
                                </a>
                                <span className="ch-evt">{e.what}</span>
                                <span className="ch-date">{formatDay(e.date)}</span>
                            </li>
                        ))}
                    </ol>
                ) : null}
                {p.afterNote && <p className="ch-note">{p.afterNote}</p>}
                <p className="ch-before">
                    <strong>Already there before me.</strong> {p.before}
                </p>
            </div>
        </section>
    );
}

export default function LabIndex() {
    return (
        <div className={`lab ${serif.variable} ${grotesk.variable}`}>
            <HeadStart />
            {labProjects.map(p => (
                <Chapter key={p.slug} p={p} />
            ))}
            <p className="lab-foot">
                Start dates are first commits in each repository. Every later launch links to its source.
            </p>
        </div>
    );
}
