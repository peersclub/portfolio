import type { Metadata } from 'next';
import { Bricolage_Grotesque } from 'next/font/google';

const bricolage = Bricolage_Grotesque({
    subsets: ['latin'],
    weight: 'variable',
    axes: ['opsz', 'wdth'],
    variable: '--font-bricolage',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Suresh Victor — Third Edition',
    description:
        'A kinetic type specimen of a product career. Ten years, six companies, one voice — set in motion.',
    openGraph: {
        title: 'Suresh Victor — Third Edition',
        description: 'A kinetic type specimen of a product career.',
    },
};

export default function V3Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className={bricolage.variable} style={{ display: 'contents' }}>
            {children}
        </div>
    );
}
