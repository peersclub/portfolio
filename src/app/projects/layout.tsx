import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Projects | Suresh Victor',
    description: "Case studies from AssetWorks AI, CoinDCX, CaptainFresh, Cox & Kings, BabyChakra, and KleverKid — a decade of building products that scale to millions.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
