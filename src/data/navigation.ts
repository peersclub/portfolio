// Single source of truth for site navigation.
export interface NavLink {
    label: string;
    href: string;
}

export const NAV_LINKS: NavLink[] = [
    { label: 'Work', href: '/projects' },
    { label: 'Resume', href: '/resume' },
    { label: 'My Life', href: '/mylife' },
    { label: 'Playbook', href: '/playbook' },
    { label: 'The Right Fit', href: '/therightfit' },
    { label: 'Sharing', href: '/sharing' },
    { label: 'Contact', href: '/contact' },
];

// The home hero shows a condensed uppercase subset
export const HERO_NAV_LINKS: NavLink[] = NAV_LINKS
    .filter(link => !['/therightfit', '/contact'].includes(link.href))
    .map(link => ({ ...link, label: link.label.toUpperCase() }));
