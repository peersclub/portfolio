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
        color: '#156585',
        era: '2015 — 2016',
        company: 'KleverKid',
        role: 'Product Manager',
        metric: '3',
        metricLabel: 'platforms: web, Android, iOS',
        headline: 'Learning to untangle.',
        body: 'Managed the full product lifecycle for web, Android and iOS: requirements, timelines, scalability and performance. Designed the wireframes and product flows, and led UI/UX.',
        href: '/projects/kleverkid',
        align: 'left',
    },
    {
        id: 'babychakra',
        color: '#89EBF5',
        era: '2017 — 2018',
        company: 'BabyChakra',
        role: 'Senior Product Manager',
        metric: '+42%',
        metricLabel: 'retention in 8 months',
        headline: 'Finding the loop that brings people back.',
        body: 'App user retention up 42% and stickiness up 21% within 8 months. Revamped the web platform and launched a product marketplace on web and Android.',
        href: '/projects/babychakra',
        align: 'right',
    },
    {
        id: 'coindcx',
        color: '#FA4A2A',
        era: '2019 — 2021',
        company: 'CoinDCX',
        role: 'Product Lead',
        metric: '4',
        metricLabel: 'trading products',
        headline: 'Scaling the spiral.',
        body: "Led overall product for India's leading crypto exchange across DCX Insta, DCX Trade, DCX Margin and DCX Futures, and built a team of three product managers.",
        href: '/projects/coindcx',
        align: 'left',
    },
    {
        id: 'captain-fresh',
        color: '#C4352B',
        era: '2021 — 2024',
        company: 'Captain Fresh',
        role: 'Product Lead',
        metric: '0 → 1',
        metricLabel: 'product and product team',
        headline: 'Coiling order into a century-old industry.',
        body: 'Built the product and the product team from scratch for a B2B seafood supply-chain platform, shipping industry-first digital products across sourcing, operations and customer-facing platforms.',
        href: '/projects/captain-fresh',
        align: 'right',
    },
    {
        id: 'cox-and-kings',
        color: '#0B5AB1',
        era: '2024 — 2025',
        company: 'Cox & Kings',
        role: 'SVP, Product & Technology',
        metric: 'SVP',
        metricLabel: 'product & technology',
        headline: 'Winding travel around the individual.',
        body: "Led the build of the first personalized customer experience in the company's travel-tech platform, and assembled a senior leadership team for product and technology.",
        href: '/projects/cox-and-kings',
        align: 'left',
    },
    {
        id: 'koinbx',
        color: '#006AFE',
        era: '2025 — Present',
        company: 'KoinBX',
        role: 'Product & Technology (CPO scope)',
        metric: 'Aug 2026',
        metricLabel: 'futures launched',
        headline: 'Pulling it all into a straight line.',
        body: 'Own product and technology strategy at KoinBX, where crypto futures went from strategy to market in August 2026. Alongside, co-founded AssetWorks AI: investment widgets from natural-language queries.',
        href: '/projects/koinbx',
        align: 'right',
    },
];

export const CONTACT = {
    email: 'sureshthejosephite@gmail.com',
    whatsapp: 'https://wa.me/919535710101',
};
