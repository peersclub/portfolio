'use client';

import SocialDock from '@/components/SocialDock/SocialDock';

export default function Footer() {
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
