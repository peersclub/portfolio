'use client';

import { ReactLenis } from '@studio-freight/react-lenis';
import { usePathname } from 'next/navigation';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    // Cast to any to avoid React 19 vs 18 type mismatch from peer dependency
    const Lenis = ReactLenis as any;
    const pathname = usePathname();
    const isCustomScroll = pathname === '/projects/captain-fresh' || pathname === '/projects/assetworks-ai' || pathname === '/projects/coindcx' || pathname === '/projects/cox-and-kings' || pathname === '/projects/kleverkid' || pathname === '/mylife' || pathname === '/network';

    if (isCustomScroll) {
        return <>{children}</>;
    }

    return (
        <Lenis root options={{ lerp: 0.15, duration: 1.2, smoothWheel: true }}>
            {children}
        </Lenis>
    );
}
