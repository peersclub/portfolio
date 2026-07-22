'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Project } from '@/data/projects';

/*
 * The ONE navigation bar for case-study pages, rendered centrally by the
 * /projects/[slug] dispatcher. The global site Navigation hides itself on
 * these routes (see src/data/navigation.ts → isCaseStudyPath), and the
 * bespoke per-brand navs were removed — this replaces all of them.
 *
 * Contextual by design: `project.surface` (light | dark, declared in
 * data/projects.ts) picks readable ink colors; `project.color` provides
 * the brand accent. No site-theme tokens here on purpose — these pages
 * are brand worlds, not theme-following surfaces.
 */
export default function CaseStudyBar({ project }: { project: Project }) {
    const dark = project.surface === 'dark';
    const ink = dark ? 'rgba(255,255,255,0.92)' : 'rgba(15,15,15,0.88)';
    const inkMuted = dark ? 'rgba(255,255,255,0.55)' : 'rgba(15,15,15,0.5)';
    const veil = dark ? 'rgba(10,10,10,0.55)' : 'rgba(255,255,255,0.7)';
    const hairline = dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)';

    return (
        <header className="cs-bar" role="banner">
            <Link href="/projects" className="back">
                <ArrowLeft size={15} className="back-icon" />
                <span>All Projects</span>
            </Link>

            <span className="context">
                {project.role} <span className="sep">//</span> {project.year}
            </span>

            <Link href="/" className="wordmark" aria-label="Home">
                suresh<span className="dot">.</span>
            </Link>

            <style jsx>{`
                .cs-bar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: var(--z-fixed);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: var(--space-md);
                    height: 52px;
                    padding: 0 var(--space-lg);
                    background: ${veil};
                    backdrop-filter: blur(14px) saturate(160%);
                    -webkit-backdrop-filter: blur(14px) saturate(160%);
                    border-bottom: 1px solid ${hairline};
                }

                .cs-bar :global(.back) {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-family: var(--font-mono);
                    font-size: 0.72rem;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: ${ink};
                    text-decoration: none;
                    transition: color 0.2s ease;
                }

                .cs-bar :global(.back:hover) {
                    color: ${project.color};
                }

                .cs-bar :global(.back:hover .back-icon) {
                    transform: translateX(-3px);
                }

                .cs-bar :global(.back-icon) {
                    transition: transform 0.25s var(--ease-out-expo);
                }

                .context {
                    font-family: var(--font-mono);
                    font-size: 0.68rem;
                    letter-spacing: 0.1em;
                    color: ${inkMuted};
                    white-space: nowrap;
                }

                .sep {
                    color: ${project.color};
                }

                .cs-bar :global(.wordmark) {
                    font-weight: 800;
                    font-size: 0.95rem;
                    letter-spacing: -0.02em;
                    color: ${ink};
                    text-decoration: none;
                    transition: opacity 0.2s ease;
                }

                .cs-bar :global(.wordmark:hover) {
                    opacity: 0.7;
                }

                .dot {
                    color: ${project.color};
                }

                @media (max-width: 640px) {
                    .context {
                        display: none;
                    }
                }
            `}</style>
        </header>
    );
}
