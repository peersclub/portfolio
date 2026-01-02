'use client';

import dynamic from 'next/dynamic';

// Dynamic import with SSR disabled (must be in client component)
const GenerativeBackground = dynamic(
    () => import('./GenerativeBackground'),
    { ssr: false }
);

export default function GenerativeBackgroundWrapper() {
    return <GenerativeBackground />;
}
