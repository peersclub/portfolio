'use client';

import Image from 'next/image';
import type { Project } from '@/data/projects';

/*
 * Card visual for a project: the brand's own color with its name set large,
 * or the real field photo where one exists (Captain Fresh). Deliberately no
 * mock UI — earlier vignettes showed invented prices and alerts, and every
 * number on this site must come from the resume.
 */

function inkOn(hex: string): string {
    const n = parseInt(hex.slice(1), 16);
    const lin = (c: number) => {
        const s = c / 255;
        return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    };
    const L = 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
    return 1.05 / (L + 0.05) >= (L + 0.05) / 0.055 ? '#FFFFFF' : '#0B0B0B';
}

export default function ProjectVisual({ project, large = false }: { project: Project; large?: boolean }) {
    const ink = inkOn(project.color);
    return (
        <div className={`pv${large ? ' pv-large' : ''}`} style={{ background: project.color, color: ink }}>
            {project.cover && (
                <Image
                    src={project.cover}
                    alt=""
                    fill
                    sizes={large ? '(max-width: 900px) 100vw, 55vw' : '33vw'}
                    className="pv-photo"
                />
            )}
            <span className={`pv-name${project.cover ? ' on-photo' : ''}`} aria-hidden>
                {project.company}
            </span>
            <style jsx>{`
                .pv {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    min-height: ${large ? 280 : 150}px;
                    overflow: hidden;
                    display: flex;
                    align-items: flex-end;
                    padding: ${large ? '1.5rem' : '1rem'};
                }
                .pv :global(.pv-photo) {
                    object-fit: cover;
                    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .pv-name {
                    position: relative;
                    font-weight: 800;
                    letter-spacing: -0.045em;
                    line-height: 0.9;
                    font-size: ${large ? 'clamp(2.5rem, 5vw, 4.5rem)' : 'clamp(1.6rem, 2.6vw, 2.2rem)'};
                    white-space: nowrap;
                }
                .pv-name.on-photo {
                    color: #fff;
                    text-shadow: 0 2px 24px rgba(0, 0, 0, 0.45);
                }
                .pv::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    background: ${project.cover ? 'linear-gradient(to top, rgba(0,0,0,0.55), transparent 55%)' : 'none'};
                }
                .pv-name {
                    z-index: 1;
                }
            `}</style>
        </div>
    );
}
