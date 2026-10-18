import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Resume | Suresh Victor',
    description: "Product and technology leader with 10+ years building 0-to-1 products and teams across crypto exchanges, fintech, B2B SaaS, supply chain, e-commerce and travel tech.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
