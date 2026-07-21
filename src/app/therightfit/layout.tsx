import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'The Right Fit | Suresh Victor',
    description: "How I work best, what I value in a team, and the signals that tell us we'd build well together.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
