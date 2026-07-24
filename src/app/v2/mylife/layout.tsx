import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Suresh Victor — One Line',
    description:
        'A life drawn as a single continuous line — from a child sketching shapes to systems that serve millions. Scroll to draw it.',
    openGraph: {
        title: 'Suresh Victor — One Line',
        description: 'A life drawn as a single continuous line.',
    },
};

export default function OneLineLayout({ children }: { children: React.ReactNode }) {
    return children;
}
