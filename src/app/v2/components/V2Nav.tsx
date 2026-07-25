'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { V2_THEME_IDS, V2_THEMES } from './themes';
import { setV2Theme, useV2Theme } from './useV2Theme';

const LINKS: [string, string][] = [
    ['/v2', 'Thread'],
    ['/v2/work', 'Work'],
    ['/v2/mylife', 'Life'],
    ['/v2/about', 'About'],
    ['/v2/contact', 'Contact'],
];

export default function V2Nav() {
    const pathname = usePathname();
    const theme = useV2Theme();
    return (
        <nav className="v2-nav" aria-label="V2 navigation">
            {LINKS.map(([href, label]) => (
                <Link
                    key={href}
                    href={href}
                    className={`v2-nav-link ${pathname === href ? 'v2-nav-link--active' : ''}`}
                >
                    {label}
                </Link>
            ))}
            <span className="v2-themes" role="group" aria-label="Thread theme">
                {V2_THEME_IDS.map((id) => (
                    <button
                        key={id}
                        className={`v2-theme-dot ${theme === id ? 'v2-theme-dot--on' : ''}`}
                        style={{ background: V2_THEMES[id].swatch }}
                        data-title={V2_THEMES[id].label}
                        onClick={() => setV2Theme(id)}
                        aria-label={`${V2_THEMES[id].label} theme`}
                        aria-pressed={theme === id}
                    />
                ))}
            </span>
        </nav>
    );
}
