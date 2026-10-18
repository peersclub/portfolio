import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Projects | Suresh Victor',
    description: "Case studies from KoinBX, AssetWorks AI, Cox & Kings, Captain Fresh, CoinDCX, Hopscotch, BabyChakra and KleverKid: what Suresh Victor owned and shipped in each role.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
