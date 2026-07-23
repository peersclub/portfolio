import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Suresh Victor — The Gold Thread',
    description:
        'Second edition. Ten years of product work — fintech, consumer, AI — told as one continuous thread, from knot to line.',
    openGraph: {
        title: 'Suresh Victor — The Gold Thread',
        description: 'Ten years of product work, told as one continuous thread.',
    },
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
    return children;
}
