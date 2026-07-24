import type { Metadata } from 'next';
import { Caveat, Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
    subsets: ['latin'],
    weight: ['500', '600', '700'],
    style: ['normal', 'italic'],
    variable: '--font-playfair',
    display: 'swap',
});

const caveat = Caveat({
    subsets: ['latin'],
    weight: ['500', '600'],
    variable: '--font-caveat',
    display: 'swap',
});

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
    return (
        <div className={`${playfair.variable} ${caveat.variable}`} style={{ display: 'contents' }}>
            {children}
        </div>
    );
}
