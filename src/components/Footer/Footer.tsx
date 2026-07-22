'use client';

import SocialDock from '@/components/SocialDock/SocialDock';

const BUILD_SHA = process.env.NEXT_PUBLIC_BUILD_SHA || 'dev';
const BUILD_TIME = process.env.NEXT_PUBLIC_BUILD_TIME || '';

// Format deterministically in UTC so server and client markup match (no hydration mismatch).
function formatBuildTime(iso: string): string {
    if (!iso) return '';
    const d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}, ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())} UTC`;
}

export default function Footer() {
    const built = formatBuildTime(BUILD_TIME);
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <SocialDock />
                </div>
                <div className="footer-bottom">
                    <span className="copyright">© {new Date().getFullYear()} Suresh Victor</span>
                    <span className="easter-eggs">
                        <a href="/mylife">Life Chronicles</a>
                        <span className="dot">·</span>
                        <a href="/network">Network Atlas</a>
                    </span>
                    <span className="credit">Built with passion</span>
                </div>
                {built && (
                    <div className="build-stamp">
                        <span>Last updated {built}</span>
                        <span className="dot">·</span>
                        <a
                            href={`https://github.com/peersclub/portfolio/commit/${BUILD_SHA}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            build {BUILD_SHA}
                        </a>
                    </div>
                )}
            </div>

            <style jsx>{`
                .footer {
                    padding: var(--space-3xl) 0 var(--space-xl);
                    border-top: 1px solid var(--line-subtle);
                    background: var(--surface-root);
                }

                .footer-content {
                    display: flex;
                    justify-content: center;
                    margin-bottom: var(--space-xl);
                }

                .footer-bottom {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .copyright,
                .credit,
                .easter-eggs {
                    font-family: var(--font-mono);
                    font-size: 0.75rem;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: var(--content-muted);
                }

                .easter-eggs a {
                    color: var(--content-muted);
                    text-decoration: none;
                    transition: color 0.2s ease;
                }

                .easter-eggs a:hover {
                    color: var(--accent);
                }

                .easter-eggs .dot {
                    margin: 0 var(--space-sm);
                }

                .build-stamp {
                    margin-top: var(--space-lg);
                    padding-top: var(--space-md);
                    border-top: 1px solid var(--line-subtle);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-family: var(--font-mono);
                    font-size: 0.68rem;
                    letter-spacing: 0.08em;
                    color: var(--content-muted);
                    opacity: 0.7;
                }

                .build-stamp .dot {
                    margin: 0 var(--space-sm);
                }

                .build-stamp a {
                    color: var(--content-muted);
                    text-decoration: none;
                    transition: color 0.2s ease;
                }

                .build-stamp a:hover {
                    color: var(--accent);
                }

                @media (max-width: 640px) {
                    .footer-bottom {
                        flex-direction: column;
                        gap: var(--space-sm);
                        text-align: center;
                    }
                }
            `}</style>
        </footer>
    );
}
