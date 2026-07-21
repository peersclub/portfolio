import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sharing | Suresh Victor',
    description: "Free tools, prompts, and playbooks — battle-tested resources for builders, shared as they earn their keep.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
