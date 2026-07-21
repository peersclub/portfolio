import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Product Playbook | Suresh Victor',
    description: "How I build products: discovery, definition, and delivery — the framework refined over a decade of shipping.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
