'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS: [string, string][] = [
    ['/v3', 'Intro'],
    ['/v3/work', 'Work'],
    ['/v3/timeline', 'Timeline'],
    ['/v3/about', 'About'],
    ['/v3/contact', 'Contact'],
];

export default function V3Nav() {
    const pathname = usePathname();
    return (
        <nav className="v3-nav" aria-label="V3 navigation">
            <Link href="/v3" className="v3-mark">
                SV·III
            </Link>
            <div className="v3-nav-links">
                {LINKS.map(([href, label]) => (
                    <Link
                        key={href}
                        href={href}
                        className={`v3-nav-link ${pathname === href ? 'v3-nav-link--active' : ''}`}
                    >
                        {label}
                    </Link>
                ))}
            </div>
            <Link href="/v2" className="v3-nav-link v3-nav-link--dim">
                ← v2
            </Link>
        </nav>
    );
}
