'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS: [string, string][] = [
    ['/v2', 'Thread'],
    ['/v2/work', 'Work'],
    ['/v2/about', 'About'],
    ['/v2/contact', 'Contact'],
];

export default function V2Nav() {
    const pathname = usePathname();
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
        </nav>
    );
}
