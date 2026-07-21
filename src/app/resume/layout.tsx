import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Resume | Suresh Victor',
    description: "Product leader with 10+ years across fintech, crypto, AI, and supply chain. Co-Founder & CPO at AssetWorks AI.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
