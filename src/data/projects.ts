// Project data shared across the app — one entry per case study.
// Facts (role, dates, numbers) come from data/career.ts, which mirrors the
// resume; this file only adds presentation: brand color, surface, ordering.
// `featured` = the deep case studies on the home page; the rest render as
// compact cards.
import { getRole, formatYears } from './career';

export interface Project {
    slug: string;
    year: string;
    company: string;
    title: string;
    /** One line, resume wording */
    tagline: string;
    description: string;
    /** Only numbers the resume states — empty when it states none */
    metrics: { label: string; value: string }[];
    role: string;
    color: string;
    /** readable stand-in on dark surfaces for near-black brand colors */
    colorOnDark?: string;
    category?: string;
    /** Local photo cover (home cards) — real team/field photos only */
    cover?: string;
    featured?: boolean;
    /** Case-study page background family — drives the central CaseStudyBar colors */
    surface: 'light' | 'dark';
}

type Presentation = Pick<Project, 'slug' | 'color' | 'colorOnDark' | 'category' | 'cover' | 'featured' | 'surface' | 'tagline'> & {
    metrics?: Project['metrics'];
};

// Canonical brand colors (Victor-confirmed, 2026-07-25; KoinBX from its own
// design tokens --kbx-brand #006AFE). Never pick decorative colors for these.
const PRESENTATION: Presentation[] = [
    {
        slug: 'koinbx',
        cover: '/projects/koinbx/team.jpg',
        surface: 'dark',
        color: '#006AFE',
        category: 'Crypto exchange',
        tagline: 'Product and technology strategy for a bootstrapped Indian crypto exchange, including its futures launch',
        featured: true,
        metrics: [
            { value: 'Aug 2026', label: 'Futures launched' },
            { value: '~9×', label: 'Delivery throughput' },
        ],
    },
    {
        slug: 'assetworks-ai',
        surface: 'dark',
        color: '#050304',
        colorOnDark: '#FFFFFF',
        category: 'AI & fintech',
        tagline: 'AI-powered financial analytics: investment widgets from natural-language queries',
        metrics: [
            { value: 'Claude + GPT', label: 'Models integrated' },
            { value: 'Rust + Flutter', label: 'Backend and apps' },
        ],
    },
    {
        slug: 'cox-and-kings',
        surface: 'light',
        color: '#0B5AB1',
        category: 'Travel tech',
        tagline: "The first personalized customer experience in the company's travel-tech platform",
    },
    {
        slug: 'captain-fresh',
        surface: 'dark',
        color: '#C4352B',
        category: 'Supply chain',
        cover: '/projects/captain-fresh/IMG_3351.JPG',
        featured: true,
        tagline: 'Industry-first digital products for a century-old seafood supply chain',
        metrics: [
            { value: 'From scratch', label: 'Product and product team' },
            { value: '3', label: 'Platforms: sourcing, operations, customer' },
        ],
    },
    {
        slug: 'coindcx',
        cover: '/projects/coindcx/team.jpg',
        surface: 'dark',
        color: '#FA4A2A',
        category: 'Crypto exchange',
        tagline: "Overall product for India's leading crypto exchange, across four trading products",
        featured: true,
        metrics: [
            { value: '4', label: 'Trading products' },
            { value: '3', label: 'PMs in the team' },
        ],
    },
    {
        slug: 'hopscotch',
        surface: 'light',
        color: '#67218C',
        category: 'E-commerce',
        tagline: "Demand-side and supply-side products for a kids' fashion e-commerce platform",
    },
    {
        slug: 'babychakra',
        cover: '/projects/babychakra/team.jpg',
        surface: 'light',
        color: '#89EBF5',
        category: 'Consumer',
        tagline: 'App retention up 42% and stickiness up 21% within 8 months',
    },
    {
        slug: 'kleverkid',
        cover: '/projects/kleverkid/team.jpg',
        surface: 'light',
        color: '#156585',
        category: 'Marketplace',
        tagline: 'Full product lifecycle across web, Android and iOS',
    },
];

export const projects: Project[] = PRESENTATION.map(p => {
    const role = getRole(p.slug);
    if (!role) throw new Error(`projects.ts: no career role for slug "${p.slug}"`);
    return {
        ...p,
        year: formatYears(role),
        company: role.company,
        title: role.company,
        role: role.title,
        description: role.context ?? role.bullets[0],
        metrics: p.metrics ?? role.evidence?.map(e => ({ value: e.value, label: e.label.split(',')[0] })) ?? [],
    };
});

export const featuredProjects = projects.filter(p => p.featured);
export const moreProjects = projects.filter(p => !p.featured);

/** Brand accent readable on the given surface. */
export function brandAccent(p: Project, surface: 'dark' | 'light' = 'dark'): string {
    return surface === 'dark' ? (p.colorOnDark ?? p.color) : p.color;
}

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find(p => p.slug === slug);
}
