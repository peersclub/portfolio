// V2 "One Line" — life story data, written in first person.
// Each moment is a concrete story; the product lesson lives in a
// handwritten margin note, the way a real sketchbook annotates itself.

import {
    Pencil, Palette, Wind, Feather, Camera,
    Users, Crown, Globe, Rocket, Briefcase,
    Trophy, Sparkles, GraduationCap, Zap,
    type LucideIcon,
} from 'lucide-react';

export interface Moment {
    year: string;
    label: string;
    story: string;
    /** the margin note — what it taught, in the artist's hand */
    note: string;
    icon: LucideIcon;
}

export interface Act {
    id: string;
    numeral: string;
    kicker: string;   // the original chapter name, kept as the label line
    title: string;    // the narrative spine — what the line learns
    years: string;
    color: string;
    intro: string;
    moments: Moment[];
    quote: string;
}

export const acts: Act[] = [
    {
        id: 'craft',
        numeral: 'I',
        kicker: 'Childhood Craft',
        title: 'The line learns to curve.',
        years: '1992 — 2009',
        color: '#D9A514',
        intro:
            'Before products, there was paper. Everything I know about building things started as a hobby nobody graded.',
        moments: [
            { year: '1995', label: 'Drawing', story: 'I drew before I wrote — copying shapes until my hand knew them by heart.', note: 'pattern recognition', icon: Pencil },
            { year: '2002', label: 'Painting', story: 'Paint taught me that color is a decision — every detail chosen, or it’s noise.', note: 'sweat the details', icon: Palette },
            { year: '2004', label: 'Kites', story: 'Crosswind flying: read the pull, give slack, never let go.', note: 'strategy is feel', icon: Wind },
            { year: '2007', label: 'Calligraphy', story: 'The same letters, drawn slowly, a thousand times over.', note: 'craft is repetition', icon: Feather },
            { year: '2010', label: 'Photography', story: 'A camera taught me framing — what you leave out is the picture.', note: 'scope is framing', icon: Camera },
        ],
        quote: 'The line that became the roadmap.',
    },
    {
        id: 'emergence',
        numeral: 'II',
        kicker: 'The Emergence',
        title: 'The line meets other lines.',
        years: '2009 — 2015',
        color: '#E8C547',
        intro:
            'College. The first time my line tangled with hundreds of others — and got stronger for it.',
        moments: [
            { year: '2010', label: 'The team', story: 'I learned to pass the pen. Empathy turned out to be a team sport.', note: 'listen first', icon: Users },
            { year: '2012', label: 'ENGINEER Fest', story: 'My first real launch: a college fest with a hard deadline and no undo button.', note: 'take ownership', icon: Crown },
            { year: '2013', label: 'NITK Surathkal', story: 'Engineering gave my curves a grammar — systems, constraints, trade-offs.', note: 'think in systems', icon: GraduationCap },
            { year: '2014', label: 'Traveling', story: 'Every border crossed redrew my idea of what “normal” means.', note: 'context matters', icon: Globe },
        ],
        quote: 'The conductor doesn’t play an instrument — and that’s the point.',
    },
    {
        id: 'rise',
        numeral: 'III',
        kicker: 'Professional Rise',
        title: 'The line learns to climb.',
        years: '2015 — 2024',
        color: '#EFD06A',
        intro:
            'The hobby became a job title. Four companies, one repeating pattern: find the knot, pull gently, ship.',
        moments: [
            { year: '2015', label: 'KleverKid', story: 'First PM role. Users can’t read your mind — you draw it out loud for them.', note: 'talk to users', icon: Rocket },
            { year: '2017', label: 'BabyChakra', story: 'Retention up 42% in eight months — by drawing the loop parents wanted to re-enter.', note: 'loops beat funnels', icon: Zap },
            { year: '2019', label: 'CoinDCX', story: 'A million traders on India’s largest crypto exchange. At that scale, every pixel is a promise.', note: 'scale = trust', icon: Briefcase },
            { year: '2021', label: 'CaptainFresh', story: 'Software for a century-old seafood trade — first in the industry, mud on my boots.', note: 'go to the harbor', icon: Trophy },
        ],
        quote: 'Every user story started as a drawn one.',
    },
    {
        id: 'frontier',
        numeral: 'IV',
        kicker: 'AI Frontier',
        title: 'The line learns to think.',
        years: '2024 — Present',
        color: '#F6E27A',
        intro:
            'Now the pen writes back. I’m building AI products — where taste matters more than ever.',
        moments: [
            { year: '2024', label: 'Cox & Kings', story: 'Teaching one of travel’s oldest brands to feel personal, as SVP of Product & Tech.', note: 'old brand, new line', icon: Briefcase },
            { year: '2025', label: 'AssetWorks AI', story: 'Co-founder & CPO. Plain language in, investment insight out.', note: 'the brush thinks', icon: Sparkles },
            { year: 'Now', label: 'What’s next', story: 'Still drawing. The medium changes; the line doesn’t.', note: 'keep drawing', icon: Pencil },
        ],
        quote: 'The canvas was always infinite. Now the brush thinks.',
    },
];

export const metrics = [
    { value: 10, suffix: '+', label: 'Years building products' },
    { value: 6, suffix: '+', label: 'Companies shaped' },
    { value: 1, suffix: 'M+', label: 'Users impacted' },
    { value: 4, suffix: '', label: 'Products from scratch' },
];

export const philosophy =
    'Life is a sequence of moments. Building products taught me to make each one count. From drawing lines as a child to architecting systems that serve millions — it has always been the same story told in different mediums.';
