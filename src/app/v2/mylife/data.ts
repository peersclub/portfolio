// V2 "One Line" — life story data, adapted from /mylife.
// The career pages tell the work; this page tells the person.

import {
    Pencil, Palette, Wind, Feather, Camera,
    Users, Crown, Globe, Rocket, Briefcase,
    Trophy, Sparkles, GraduationCap, Zap,
    type LucideIcon,
} from 'lucide-react';

export interface Moment {
    year: string;
    label: string;
    detail: string;
    icon: LucideIcon;
}

export interface Act {
    id: string;
    numeral: string;
    title: string;
    years: string;
    color: string;
    description: string;
    moments: Moment[];
    quote: string;
}

export const acts: Act[] = [
    {
        id: 'craft',
        numeral: 'I',
        title: 'Childhood Craft',
        years: '1992 — 2009',
        color: '#2E7E8F',
        description:
            'Where curiosity became craft. Drawing, painting, flying kites, calligraphy, photography — each hobby quietly wiring the brain for product thinking.',
        moments: [
            { year: '1995', label: 'Visual Foundations', detail: 'Drawing — memorizing shapes, replicating reality', icon: Pencil },
            { year: '2002', label: 'Creative Analysis', detail: 'Painting — love for colors, attention to detailing', icon: Palette },
            { year: '2004', label: 'Adaptive Strategy', detail: 'Flying kites — reading the wind, never giving up', icon: Wind },
            { year: '2007', label: 'Design Precision', detail: 'Calligraphy — typography & pattern recognition', icon: Feather },
            { year: '2010', label: 'Perspective Shift', detail: 'Photography — framing moments, composition', icon: Camera },
        ],
        quote: 'The line that became the roadmap.',
    },
    {
        id: 'emergence',
        numeral: 'II',
        title: 'The Emergence',
        years: '2009 — 2015',
        color: '#47518F',
        description:
            'Skills finding each other. Team play, leadership at NITK Surathkal, organizing ENGINEER fest, and traveling shaped the mindset for building at scale.',
        moments: [
            { year: '2010', label: 'Synergy', detail: 'Team player — empathy, learning from others', icon: Users },
            { year: '2012', label: 'Orchestration', detail: 'ENGINEER Fest — guiding vision, taking ownership', icon: Crown },
            { year: '2013', label: 'NITK Surathkal', detail: 'B.Tech — building the engineering mindset', icon: GraduationCap },
            { year: '2014', label: 'Global Context', detail: 'Traveling — global mindset, cultural intelligence', icon: Globe },
        ],
        quote: "The conductor doesn't play an instrument — and that's the point.",
    },
    {
        id: 'rise',
        numeral: 'III',
        title: 'Professional Rise',
        years: '2015 — 2024',
        color: '#B07C1E',
        description:
            'The craft becoming a career. From first PM role to leading products at CoinDCX and CaptainFresh — building teams and products that scaled to millions.',
        moments: [
            { year: '2015', label: 'Product Strategy', detail: 'KleverKid — first PM role, user research', icon: Rocket },
            { year: '2017', label: 'Growth Engine', detail: 'BabyChakra — 42% retention increase in 8 months', icon: Zap },
            { year: '2019', label: 'Scale & Impact', detail: "CoinDCX — India's largest crypto exchange, 1M+ users", icon: Briefcase },
            { year: '2021', label: 'Industry First', detail: 'CaptainFresh — supply chain platform from scratch', icon: Trophy },
        ],
        quote: 'Every user story started as a drawn one.',
    },
    {
        id: 'frontier',
        numeral: 'IV',
        title: 'AI Frontier',
        years: '2024 — Present',
        color: '#A0435C',
        description:
            'All roads converge here. Co-founding AssetWorks AI, building with frontier LLMs, leading product & tech at the highest level.',
        moments: [
            { year: '2024', label: 'SVP Product & Tech', detail: 'Cox & Kings — personalized travel experience', icon: Briefcase },
            { year: '2025', label: 'Co-Founder', detail: 'AssetWorks AI — AI-powered financial analytics', icon: Sparkles },
            { year: 'Now', label: 'Future Systems', detail: 'LLM integration, AI strategy, what comes next', icon: Sparkles },
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
