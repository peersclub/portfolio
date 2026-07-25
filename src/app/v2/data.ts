// V2 "The Gold Thread" — narrative data, sourced from src/data/projects.ts.
// Kept separate so v2 copy can diverge from the case-study cards without
// touching the shared Project type.

export interface Chapter {
    id: string;
    era: string;
    company: string;
    role: string;
    metric: string;
    metricLabel: string;
    headline: string;
    body: string;
    href: string;
    align: 'left' | 'right';
    /** Brand color from src/data/projects.ts — drives the card accent */
    color: string;
}

// One label per thread state — the HUD reads these as the shape morphs.
// 8 states: hero + 6 chapters + contact.
export const THREAD_LABELS = [
    'TANGLE',
    'KNOT',
    'LOOP',
    'SPIRAL',
    'COIL',
    'HELIX',
    'WAVE',
    'LINE',
] as const;

export const chapters: Chapter[] = [
    {
        id: 'kleverkid',
        color: '#60A5FA',
        era: '2015 — 2016',
        company: 'KleverKid',
        role: 'Product Manager',
        metric: 'First',
        metricLabel: 'product role',
        headline: 'Learning to untangle.',
        body: 'Afterschool activities marketplace. Owned requirements and delivery for the iOS and Android apps — the full product life cycle, end to end, for the first time.',
        href: '/projects/kleverkid',
        align: 'left',
    },
    {
        id: 'babychakra',
        color: '#FC88B0',
        era: '2017 — 2018',
        company: 'BabyChakra',
        role: 'Senior Product Manager',
        metric: '+42%',
        metricLabel: 'retention in 8 months',
        headline: 'Finding the loop that brings people back.',
        body: "India's leading parenting platform. Built the product marketplace and revamped the web platform — retention up 42%, stickiness up 21%.",
        href: '/projects/babychakra',
        align: 'right',
    },
    {
        id: 'coindcx',
        color: '#FA4A29',
        era: '2019 — 2021',
        company: 'CoinDCX',
        role: 'Product Lead',
        metric: '1M+',
        metricLabel: 'traders served',
        headline: 'Scaling the spiral.',
        body: "Led product for India's largest crypto exchange — DCXInsta, DCXTrade, DCXMargin, DCXFutures — and built a team of three product managers along the way.",
        href: '/projects/coindcx',
        align: 'left',
    },
    {
        id: 'captain-fresh',
        color: '#FF6B6B',
        era: '2021 — 2024',
        company: 'CaptainFresh',
        role: 'Product Lead',
        metric: '+40%',
        metricLabel: 'fisher income',
        headline: 'Coiling order into a century-old industry.',
        body: 'First-in-industry B2B platform for seafood supply chain. Built the product and the ops team from scratch — 50K+ downloads, fisher income up 40%.',
        href: '/projects/captain-fresh',
        align: 'right',
    },
    {
        id: 'cox-and-kings',
        color: '#D96D3E',
        era: '2024 — 2025',
        company: 'Cox & Kings',
        role: 'SVP, Product & Tech',
        metric: 'SVP',
        metricLabel: 'product & tech',
        headline: 'Winding travel around the individual.',
        body: 'Building the first personalized experience in travel tech. Assembled a senior executive team; owned strategy, budget, and the product plan.',
        href: '/projects/cox-and-kings',
        align: 'left',
    },
    {
        id: 'assetworks-ai',
        color: '#E8C547',
        era: '2025 — Present',
        company: 'AssetWorks AI',
        role: 'Co-Founder & CPO',
        metric: 'CPO',
        metricLabel: 'co-founder',
        headline: 'Pulling AI into a straight answer.',
        body: 'AI-native financial analytics: plain language in, investment widgets out. Frontier LLMs on a Rust backend with Flutter apps — built as co-founder.',
        href: '/projects/assetworks-ai',
        align: 'right',
    },
];

export const CONTACT = {
    email: 'sureshthejosephite@gmail.com',
    whatsapp: 'https://wa.me/919535710101',
};
