import { labProjects, formatDay, formatMonth, gapLabel, type LabProject } from '@/data/lab';
import './lab.css';

/*
 * The Lab: products built on my own time, each with the date I started it
 * (first git commit) and the dated market moves that came after. One
 * component for all three editions; v2.css / v3.css re-skin the lab-* classes
 * under .v2-lab / .v3-lab, the same way the social dashboard works.
 */

function Entry({ p, n }: { p: LabProject; n: number }) {
    return (
        <article className="lab-entry" id={p.slug}>
            <header className="lab-entry-head">
                <span className="lab-num">{String(n).padStart(2, '0')}</span>
                <div className="lab-title-block">
                    <h2 className="lab-name">{p.name}</h2>
                    <p className="lab-line">{p.oneLine}</p>
                </div>
                <div className="lab-meta">
                    <span className="lab-started">Started {formatMonth(p.started)}</span>
                    <span className="lab-status">{p.status}</span>
                    {p.url && (
                        <a className="lab-link" href={p.url} target="_blank" rel="noopener noreferrer">
                            {p.url.replace(/^https?:\/\//, '').replace(/\/$/, '')} ↗
                        </a>
                    )}
                </div>
            </header>

            <div className="lab-body">
                <section className="lab-col">
                    <h3 className="lab-h">What it does</h3>
                    <p>{p.what}</p>
                    <h3 className="lab-h">Why {p.credit ? 'we' : 'I'} built it</h3>
                    <p>{p.why}</p>
                    {p.credit && <p className="lab-credit">{p.credit}</p>}
                    <ul className="lab-stack" aria-label="Built with">
                        {p.stack.map(s => (
                            <li key={s}>{s}</li>
                        ))}
                    </ul>
                </section>

                <section className="lab-col">
                    <h3 className="lab-h">What the market did next</h3>
                    <ol className="lab-timeline">
                        <li className="lab-tl lab-tl--start">
                            <span className="lab-tl-when">{formatDay(p.started)}</span>
                            <span className="lab-tl-what">{p.credit ? 'We' : 'I'} started building it</span>
                        </li>
                        {p.after.map(e => (
                            <li key={e.name} className="lab-tl">
                                <span className="lab-tl-when">
                                    {formatDay(e.date)}
                                    <span className="lab-tl-gap">{gapLabel(p.started, e.date)}</span>
                                </span>
                                <span className="lab-tl-what">
                                    <a href={e.source} target="_blank" rel="noopener noreferrer">
                                        {e.name}
                                    </a>{' '}
                                    {e.what}
                                </span>
                            </li>
                        ))}
                    </ol>
                    {p.afterNote && <p className="lab-after-note">{p.afterNote}</p>}
                    <p className="lab-before">
                        <span>Already there before me:</span> {p.before}
                    </p>
                </section>
            </div>
        </article>
    );
}

export default function LabIndex() {
    return (
        <div className="lab">
            {labProjects.map((p, i) => (
                <Entry key={p.slug} p={p} n={i + 1} />
            ))}
            <p className="lab-foot">
                Start dates are first commits in each repository. Every market event links to its
                source.
            </p>
        </div>
    );
}
