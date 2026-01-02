'use client';

import { ReactLenis } from '@studio-freight/react-lenis';
import { usePathname } from 'next/navigation';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    // Cast to any to avoid React 19 vs 18 type mismatch from peer dependency
    const Lenis = ReactLenis as any;
    const pathname = usePathname();
    const isNeuralOcean = pathname === '/projects/captain-fresh';

    if (isNeuralOcean) {
        return <>{children}</>;
    }

    return (
        <Lenis root options={{ lerp: 0.15, duration: 1.2, smoothWheel: true }}>
            {children}
        </Lenis>
    );
}
