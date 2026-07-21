import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Design System | Suresh Victor',
    description: 'Internal design-system reference.',
    robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
