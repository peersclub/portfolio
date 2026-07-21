import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'My Life | Suresh Victor',
    description: "The journey from Bangalore classrooms to co-founding an AI company — four chapters of building, shipping, and learning.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
