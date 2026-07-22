// Single source of truth for site navigation.
export interface NavLink {
    label: string;
    href: string;
}

export const NAV_LINKS: NavLink[] = [
    { label: 'Work', href: '/projects' },
    { label: 'About', href: '/about' },
    { label: 'Resume', href: '/resume' },
    { label: 'Sharing', href: '/sharing' },
    { label: 'Contact', href: '/contact' },
];

/** Case-study detail routes get the central CaseStudyBar instead of the
 *  global Navigation (which returns null for these paths). */
export function isCaseStudyPath(pathname: string): boolean {
    return /^\/projects\/[^/]+\/?$/.test(pathname);
}
