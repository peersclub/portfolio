// Project data shared across the app
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
    image?: string;
    // Home-page card fields — entries without a cover are excluded from the home gallery
    category?: string;
    cover?: string;
    // Hidden entries stay reachable by URL but are excluded from listings/sitemap
    hidden?: boolean;
}

export const projects: Project[] = [
    {
        slug: 'assetworks-ai',
        year: '2025',
        company: 'AssetWorks AI',
        title: 'AssetWorks AI',
        tagline: 'AI-powered financial analytics platform',
        description: 'Co-founded and led AssetWorks, an AI-powered financial analytics platform. Built full-stack SaaS product integrating Claude AI and OpenAI GPT with Rust backend and Flutter mobile apps. Users can create investment widgets using simple natural language.',
        metrics: [
            { label: 'Efficiency', value: '10x' },
            { label: 'Accuracy', value: '99%' },
        ],
        role: 'Co-Founder',
        tech: ['Claude AI', 'Rust', 'Flutter', 'SaaS'],
        color: '#E8C547',
        category: 'AI & Fintech',
        cover: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    },
    {
        slug: 'coindcx',
        year: '2019-2021',
        company: 'CoinDCX',
        title: 'CoinDCX',
        tagline: "India's largest crypto exchange",
        description: "Led product development for India's largest crypto exchange with multiple products including DCXInsta, DCXTrade, DCXMargin, and DCXFutures. Built a team of 3 product managers and significantly scaled the product offerings.",
        metrics: [
            { label: 'Products', value: '4+' },
            { label: 'Team', value: '3 PMs' },
        ],
        role: 'Product Leader',
        tech: ['Product Strategy', 'Mobile', 'Web', 'Fintech'],
        color: '#4ECDC4',
        category: 'Crypto Exchange',
        cover: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
    },
    {
        slug: 'captain-fresh',
        year: '2021-2024',
        company: 'CaptainFresh',
        title: 'CaptainFresh',
        tagline: 'Revolutionizing seafood supply chain',
        description: 'Built first-in-industry products for a century-old seafood industry. Led the overall product from scratch, building the team and playing an active part in the long-term roadmap.',
        metrics: [
            { label: 'Impact', value: 'Industry First' },
            { label: 'Scale', value: 'Global' },
        ],
        role: 'Product Lead',
        tech: ['B2B', 'Operations', 'Mobile', 'Supply Chain'],
        color: '#FF6B6B',
        category: 'Supply Chain',
        cover: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=800&q=80',
    },
    {
        slug: 'captain-fresh-old',
        hidden: true,
        year: '2021-2024',
        company: 'CaptainFresh',
        title: 'CaptainFresh (Legacy)',
        tagline: 'Neural Ocean - Tech Vision',
        description: 'The futuristic tech vision for revolutionizing seafood supply chain with sensor networks and automated logistics.',
        metrics: [
            { label: 'Impact', value: 'Industry First' },
            { label: 'Scale', value: 'Global' },
        ],
        role: 'Product Lead',
        tech: ['B2B', 'Operations', 'Mobile', 'Supply Chain'],
        color: '#00D4FF',
    },
    {
        slug: 'cox-and-kings',
        year: '2024',
        company: 'Cox & Kings',
        title: 'Cox & Kings',
        tagline: 'Personalized travel tech experience',
        description: 'Building the first personalized experience in travel tech as SVP of Product and Tech. Focusing on strategy, team building, and delivering a modern travel platform.',
        metrics: [
            { label: 'Focus', value: 'Personalization' },
            { label: 'Role', value: 'SVP' },
        ],
        role: 'SVP Product & Tech',
        tech: ['Personalization', 'Strategy', 'Travel Tech'],
        color: '#A78BFA',
        category: 'Travel Tech',
        cover: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',
    },
    {
        slug: 'babychakra',
        year: '2017-2018',
        company: 'BabyChakra',
        title: 'BabyChakra',
        tagline: 'India\'s leading parenting platform',
        description: 'Increased retention by 42% and stickiness by 21% in 8 months. Built the product marketplace and completely revamped the web platform for better user experience.',
        metrics: [
            { label: 'Retention', value: '+42%' },
            { label: 'Stickiness', value: '+21%' },
        ],
        role: 'Product Manager',
        tech: ['Growth', 'Marketplace', 'UX', 'Consumer'],
        color: '#F472B6',
        category: 'Consumer',
        cover: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80',
    },
    {
        slug: 'kleverkid',
        year: '2015-2016',
        company: 'KleverKid',
        title: 'KleverKid',
        tagline: 'Afterschool activities marketplace',
        description: 'Managed product requirements and development for KleverKid Android and iOS apps. Involved in full product life cycle, scalability, and performance.',
        metrics: [
            { label: 'Platforms', value: 'iOS/Android' },
            { label: 'Role', value: 'Product' },
        ],
        role: 'Product Manager',
        tech: ['EdTech', 'Marketplace', 'Mobile', 'Product Mgmt'],
        color: '#60A5FA',
        category: 'EdTech',
        cover: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
    },
];

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find(p => p.slug === slug);
}
