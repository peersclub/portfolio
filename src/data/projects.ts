// Project data shared across the app — single source of truth.
// `featured` = the three deep case studies; the rest render as compact cards.
export interface Project {
    slug: string;
    year: string;
    company: string;
    title: string;
    tagline: string;
    description: string;
    metrics: { label: string; value: string }[];
    role: string;
    tech: string[];
    color: string;
    category?: string;
    /** Local photo cover (featured cards); compact cards fall back to gradient + logo */
    cover?: string;
    /** Brand logo under public/ for compact cards */
    logo?: string;
    featured?: boolean;
    /** Case-study page background family — drives the central CaseStudyBar colors */
    surface: 'light' | 'dark';
}

export const projects: Project[] = [
    {
        slug: 'assetworks-ai',
        surface: 'dark',
        year: '2025-Present',
        company: 'AssetWorks AI',
        title: 'AssetWorks AI',
        tagline: 'AI-native financial analytics platform',
        description: 'Co-founded and led AssetWorks, an AI-powered financial analytics platform. Built full-stack SaaS product integrating frontier LLMs with a Rust backend and Flutter mobile apps. Users can create investment widgets using simple natural language.',
        metrics: [
            { label: 'Role', value: 'Co-Founder & CPO' },
            { label: 'Founded', value: '2025' },
        ],
        role: 'Co-Founder',
        tech: ['AI & LLMs', 'Rust', 'Flutter', 'SaaS'],
        color: '#E8C547',
        category: 'AI & Fintech',
        logo: '/projects/assetworks-ai/logo.svg',
        featured: true,
    },
    {
        slug: 'coindcx',
        surface: 'dark',
        year: '2019-2021',
        company: 'CoinDCX',
        title: 'CoinDCX',
        tagline: "India's largest crypto exchange",
        description: "Led product development for India's largest crypto exchange with multiple products including DCXInsta, DCXTrade, DCXMargin, and DCXFutures. Built a team of 3 product managers and significantly scaled the product offerings.",
        metrics: [
            { label: 'Users', value: '1M+' },
            { label: 'Products', value: '4' },
        ],
        role: 'Product Lead',
        tech: ['Product Strategy', 'Mobile', 'Web', 'Fintech'],
        color: '#FA4A29',
        category: 'Crypto Exchange',
        logo: '/projects/coindcx/logo.svg',
        featured: true,
    },
    {
        slug: 'captain-fresh',
        surface: 'dark',
        year: '2021-2024',
        company: 'CaptainFresh',
        title: 'CaptainFresh',
        tagline: 'Revolutionizing seafood supply chain',
        description: 'Built first-in-industry products for a century-old seafood industry. Led the overall product from scratch, building the team and playing an active part in the long-term roadmap.',
        metrics: [
            { label: 'Downloads', value: '50K+' },
            { label: 'Fisher income', value: '+40%' },
        ],
        role: 'Product Lead',
        tech: ['B2B', 'Operations', 'Mobile', 'Supply Chain'],
        color: '#C4352B',
        category: 'Supply Chain',
        cover: '/projects/captain-fresh/IMG_3351.JPG',
        featured: true,
    },
    {
        slug: 'cox-and-kings',
        surface: 'light',
        year: '2024-Present',
        company: 'Cox & Kings',
        title: 'Cox & Kings',
        tagline: 'Personalized travel tech experience',
        description: 'Building the first personalized experience in travel tech as SVP of Product and Tech. Put together a senior executive team; owning strategy, budget, and the product plan.',
        metrics: [
            { label: 'Focus', value: 'Personalization' },
            { label: 'Role', value: 'SVP' },
        ],
        role: 'SVP Product & Tech',
        tech: ['Personalization', 'Strategy', 'Travel Tech'],
        color: '#D96D3E',
        category: 'Travel Tech',
        logo: '/projects/cox-and-kings/logo.svg',
    },
    {
        slug: 'babychakra',
        surface: 'light',
        year: '2017-2018',
        company: 'BabyChakra',
        title: 'BabyChakra',
        tagline: 'India\'s leading parenting platform',
        description: 'Increased retention by 42% and stickiness by 21% in 8 months. Built the product marketplace and completely revamped the web platform for better user experience.',
        metrics: [
            { label: 'Retention', value: '+42%' },
            { label: 'Stickiness', value: '+21%' },
        ],
        role: 'Senior Product Manager',
        tech: ['Growth', 'Marketplace', 'UX', 'Consumer'],
        color: '#FC88B0',
        category: 'Consumer',
        logo: '/projects/babychakra/logo.svg',
    },
    {
        slug: 'kleverkid',
        surface: 'light',
        year: '2015-2016',
        company: 'KleverKid',
        title: 'KleverKid',
        tagline: 'Afterschool activities marketplace',
        description: 'Managed product requirements and development for KleverKid Android and iOS apps. Involved in full product life cycle, scalability, and performance.',
        metrics: [
            { label: 'Platforms', value: 'iOS/Android' },
            { label: 'Scope', value: 'First PM role' },
        ],
        role: 'Product Manager',
        tech: ['EdTech', 'Marketplace', 'Mobile', 'Product Mgmt'],
        color: '#007BFF',
        category: 'EdTech',
        logo: '/projects/kleverkid/logo.svg',
    },
];

export const featuredProjects = projects.filter(p => p.featured);
export const moreProjects = projects.filter(p => !p.featured);

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find(p => p.slug === slug);
}
