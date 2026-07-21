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
