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
                    <span className="copyright">© 2025 Suresh Victor</span>
                    <span className="credit">Built with passion</span>
                </div>
            </div>

            <style jsx>{`
                .footer {
                    padding: var(--space-3xl) 0 var(--space-xl);
                    border-top: 1px solid var(--glass-border);
                    background: var(--bg-primary);
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
                .credit {
                    font-family: var(--font-mono);
                    font-size: 0.75rem;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: var(--text-muted);
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
