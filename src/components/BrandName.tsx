// Brand wordmarks rendered exactly as the brands write them — server-safe.
// CoinDCX: "Coin" inherits the surrounding ink (white on dark, ink on
// light) + "DCX" in brand orange. BabyChakra: "Baby" pink + "Chakra" cyan.
// Every other name falls through as plain text.

import type { CSSProperties } from 'react';

interface Segment {
    text: string;
    /** omitted → inherit currentColor from the surrounding text */
    color?: string;
}

export const BRAND_WORDMARKS: Record<string, Segment[]> = {
    CoinDCX: [{ text: 'Coin' }, { text: 'DCX', color: '#FA4A2A' }],
    BabyChakra: [
        { text: 'Baby', color: '#FC88B0' },
        { text: 'Chakra', color: '#89EBF5' },
    ],
};

export default function BrandName({ name, style }: { name: string; style?: CSSProperties }) {
    const segments = BRAND_WORDMARKS[name];
    if (!segments) return <span style={style}>{name}</span>;
    return (
        <span style={style}>
            {segments.map((s, i) => (
                <span key={i} style={s.color ? { color: s.color } : undefined}>
                    {s.text}
                </span>
            ))}
        </span>
    );
}
