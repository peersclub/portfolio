// Career facts — the single source of truth for every page that states a
// fact about Suresh's work. Every line here is taken from the canonical
// resume (private/Suresh-Victor-Resume.pdf, "Sep 2026 (ATS)" edition).
// Do not add a number, title, date or claim that the resume does not state:
// update the resume first, then this file.

export const PROFILE = {
    name: 'Suresh Victor',
    headline: 'Product & Technology Leader',
    focus: 'Head of Product · Fintech & Crypto',
    location: 'Bangalore, India',
    email: 'sureshthejosephite@gmail.com',
    phone: '+91 95357 10101',
    yearsLabel: '10+ years',
    summary:
        'Product and technology leader with 10+ years building 0-to-1 products and teams across crypto exchanges, fintech, B2B SaaS, supply-chain marketplaces, e-commerce and travel tech. Currently owns product and technology strategy at KoinBX, including the launch of futures trading as a new revenue line; previously led product at CoinDCX. Sets strategy and roadmap, builds and restructures product and engineering organizations, and runs the business on unit economics and data. Builds AI/LLM products hands-on.',
} as const;

export interface Evidence {
    value: string;
    label: string;
}

export interface Role {
    /** matches a slug in data/projects.ts when the role has a case study */
    slug?: string;
    company: string;
    title: string;
    /** YYYY-MM */
    start: string;
    /** YYYY-MM, or null while current */
    end: string | null;
    location: string;
    /** What the company is / why Suresh was there — resume wording */
    context?: string;
    bullets: string[];
    /** Hard numbers or dated outcomes stated in the resume — nothing else */
    evidence?: Evidence[];
    /** Products, platforms or tools the resume names for this role */
    surfaces?: string[];
}

export const ROLES: Role[] = [
    {
        slug: 'koinbx',
        company: 'KoinBX',
        title: 'Consultant, Product & Technology (CPO scope)',
        start: '2025-11',
        end: null,
        location: 'Madurai',
        context:
            'Bootstrapped Indian crypto exchange, 8 years in operation. Brought in by the founders to own product and technology strategy, open new revenue lines and restructure the product and engineering organization.',
        bullets: [
            'Own product and technology strategy and the company roadmap with the founders, centred on monetization, new business lines and scalable growth.',
            'Launched derivatives as a new business line: took crypto futures from strategy to market in August 2026 with a subscription-based membership pricing model.',
            'Restructured the product and engineering organization around business outcomes, with clear ownership, a leadership layer and a planning-to-release operating model. Adopted AI-assisted engineering, raising delivery throughput about 9× in four months.',
            'Made company decisions data-led: introduced a company scorecard, unit economics and funnel analytics that now guide founder priorities, pricing and roadmap investment.',
            'Led technology governance and risk: audited the full platform, retired legacy systems, and drove security and compliance hardening ahead of the futures launch.',
            'Opened a B2B revenue channel by defining a white-label and API offering, and its commercial model, for partner exchanges.',
        ],
        evidence: [
            { value: 'Aug 2026', label: 'Crypto futures taken from strategy to market' },
            { value: '~9×', label: 'Delivery throughput in four months, after adopting AI-assisted engineering' },
        ],
        surfaces: [
            'Crypto futures, with subscription-based membership pricing',
            'White-label and API offering for partner exchanges',
            'Company scorecard, unit economics and funnel analytics',
        ],
    },
    {
        slug: 'assetworks-ai',
        company: 'AssetWorks AI',
        title: 'Co-Founder',
        start: '2025-03',
        end: null,
        location: 'Bangalore',
        context:
            'An AI-powered financial analytics platform where users create investment widgets through natural-language queries.',
        bullets: [
            'Co-founded AssetWorks, an AI-powered financial analytics platform where users create investment widgets through natural-language queries.',
            'Built the full-stack SaaS product integrating Claude AI and OpenAI GPT, with a Rust backend and Flutter mobile apps.',
        ],
        surfaces: ['Claude AI and OpenAI GPT', 'Rust backend', 'Flutter mobile apps'],
    },
    {
        slug: 'cox-and-kings',
        company: 'Cox & Kings',
        title: 'SVP, Product & Technology',
        start: '2024-10',
        end: '2025-03',
        location: 'Bangalore',
        bullets: [
            "Led the build of the first personalized customer experience in the company's travel-tech platform.",
            'Assembled a senior leadership team for product and technology; reviewed the budget and the long-term technology plan.',
            'Transitioned out when the business model changed from SaaS to franchise.',
        ],
    },
    {
        slug: 'captain-fresh',
        company: 'Captain Fresh',
        title: 'Product Lead',
        start: '2021-05',
        end: '2024-10',
        location: 'Bangalore',
        context: 'A B2B seafood supply-chain platform.',
        bullets: [
            'Led overall product for Captain Fresh, a B2B seafood supply-chain platform, building the product and the product team from scratch.',
            'Shipped industry-first digital products for a century-old seafood supply chain, spanning sourcing, operations and customer-facing platforms.',
            'Shaped the long-term product roadmap with the leadership team.',
        ],
        surfaces: ['Sourcing', 'Operations', 'Customer-facing platforms'],
    },
    {
        slug: 'coindcx',
        company: 'CoinDCX',
        title: 'Product Lead',
        start: '2019-08',
        end: '2021-05',
        location: 'Mumbai',
        context: "India's leading crypto exchange.",
        bullets: [
            "Led overall product for CoinDCX, India's leading crypto exchange, across DCX Insta, DCX Trade, DCX Margin and DCX Futures on mobile app and desktop web.",
            'Built and managed a team of 3 product managers; took part in leadership and company-level decisions.',
        ],
        evidence: [
            { value: '4', label: 'Products led: DCX Insta, DCX Trade, DCX Margin and DCX Futures' },
            { value: '3', label: 'Product managers in the team he built and managed' },
        ],
        surfaces: ['DCX Insta', 'DCX Trade', 'DCX Margin', 'DCX Futures'],
    },
    {
        slug: 'hopscotch',
        company: 'Hopscotch',
        title: 'Product Manager',
        start: '2018-07',
        end: '2019-08',
        location: 'Mumbai',
        context: "A kids' fashion e-commerce platform.",
        bullets: [
            "Owned demand-side and supply-side products for a kids' fashion e-commerce platform.",
            'Defined the long-term product roadmap; built internal tools for daily operations alongside user-facing products.',
        ],
        surfaces: ['Demand-side products', 'Supply-side products', 'Internal tools for daily operations'],
    },
    {
        slug: 'babychakra',
        company: 'BabyChakra',
        title: 'Senior Product Manager',
        start: '2017-01',
        end: '2018-07',
        location: 'Mumbai',
        bullets: [
            'Increased app user retention by 42% and stickiness by 21% within 8 months.',
            'Led a complete revamp of the web platform (mobile and desktop) for a better user experience.',
            'Launched a product marketplace on web and Android; managed the iOS app roadmap.',
        ],
        evidence: [
            { value: '+42%', label: 'App user retention, within 8 months' },
            { value: '+21%', label: 'Stickiness, within the same 8 months' },
        ],
        surfaces: ['Web platform (mobile and desktop)', 'Product marketplace on web and Android', 'iOS app roadmap'],
    },
    {
        slug: 'kleverkid',
        company: 'KleverKid',
        title: 'Product Manager',
        start: '2015-07',
        end: '2016-10',
        location: 'New Delhi',
        bullets: [
            'Managed the full product lifecycle for web, Android and iOS: requirements, timelines, scalability and performance.',
            'Designed wireframes and product flows; led UI/UX for website and mobile apps and held the development team to deadlines.',
        ],
        surfaces: ['Web', 'Android', 'iOS'],
    },
    {
        company: 'Rhythms Academy',
        title: 'Manager, Administration',
        start: '2013-01',
        end: '2015-05',
        location: 'Bangalore',
        bullets: [
            'Designed the architecture of a custom web app (CMIS) for admissions, attendance and fee management, delivered with an outsourced development partner.',
        ],
    },
];

export const EARLIER =
    'Short-term and contract product engagements with Docpulse Technologies and Finomena. Founded Smatrx Infosoft, a web app guiding school students (1 year).';

export const SKILLS: { group: string; items: string[] }[] = [
    {
        group: 'Product',
        items: ['Product Strategy', 'Product Roadmap', '0-to-1 Product Development', 'PRD Writing', 'Go-to-Market', 'Product-Led Growth', 'Pricing & Monetization', 'Subscription Models', 'User Research', 'UX Design', 'A/B Testing'],
    },
    {
        group: 'Domains',
        items: ['Crypto Exchange', 'Derivatives & Futures Trading', 'Fintech', 'KYC/AML Onboarding', 'B2B SaaS', 'Marketplace', 'E-commerce', 'Supply Chain', 'Travel Tech', 'Generative AI'],
    },
    {
        group: 'Leadership',
        items: ['Team Building', 'Hiring', 'Org Restructuring', 'Cross-functional Leadership', 'Agile/Scrum', 'Sprint Planning', 'Stakeholder Management', 'Partnerships', 'Budgeting'],
    },
    {
        group: 'Data & Tools',
        items: ['SQL', 'Power BI', 'CleverTap', 'Funnel & Cohort Analysis', 'Unit Economics', 'KPI Dashboards', 'Figma', 'Jira'],
    },
    {
        group: 'Technology',
        items: ['Microservices (Node.js/NestJS)', 'Azure Kubernetes (AKS)', 'Kafka', 'Redis', 'REST APIs', 'Flutter', 'Rust', 'JavaScript', 'HTML/CSS', 'PHP Laravel', 'C/C++', 'LLM APIs (Claude, OpenAI GPT)'],
    },
];

export const EDUCATION = {
    degree: 'B.Tech, Chemical Engineering',
    school: 'National Institute of Technology Karnataka (NITK), Surathkal',
    period: '2009 – 2013',
};

export const CERTIFICATIONS = [
    'Coursera (verified): Product Management; Project Management; User Interface and User Experience Design',
    'Coursework: Human-Computer Interaction Design; User Experience Research',
];

export const ACTIVITIES = [
    'Joint Secretary, Engineer 2012 (NITK annual technical festival): core organizing team; 5,000+ participants from 150+ colleges in 43 countries, with speakers from CERN, MIT Media Lab and Bell Labs.',
    "Coordinator, Students Activity Center, Incident 2013 (one of South India's largest cultural festivals).",
    "Creative Coordinator, Artists' Forum, NITK (2010 – 2013).",
];

export const LANGUAGES = ['English', 'Hindi', 'Kannada', 'Tamil', 'Telugu'];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2019-08" → "Aug 2019" */
export function formatMonth(ym: string): string {
    const [y, m] = ym.split('-').map(Number);
    return `${MONTHS[m - 1]} ${y}`;
}

/** "Aug 2019 – May 2021" / "Nov 2025 – Present" */
export function formatPeriod(role: Pick<Role, 'start' | 'end'>): string {
    return `${formatMonth(role.start)} – ${role.end ? formatMonth(role.end) : 'Present'}`;
}

/** "2019–2021" / "2025–Present" — compact form for cards */
export function formatYears(role: Pick<Role, 'start' | 'end'>): string {
    const a = role.start.slice(0, 4);
    const b = role.end ? role.end.slice(0, 4) : 'Present';
    return a === b ? a : `${a}–${b}`;
}

/** Fractional year, for placing a role on a timeline. */
export function toYear(ym: string | null): number {
    if (!ym) return new Date().getFullYear() + new Date().getMonth() / 12;
    const [y, m] = ym.split('-').map(Number);
    return y + (m - 1) / 12;
}

export function getRole(slug: string): Role | undefined {
    return ROLES.find(r => r.slug === slug);
}
