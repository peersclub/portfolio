'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useReducedMotion } from 'framer-motion';

const ThreadScene = dynamic(() => import('./ThreadScene'), { ssr: false });

/**
 * Fixed-state thread backdrop for v2 sub-pages. `progress` pins the scene to
 * one thread state (0 = tangle … 1 = line); the scene's internal damping
 * animates the morph from tangle into that state on load.
 * Portaled to <body> — see page.tsx for why fixed layers can't live in <main>.
 */
export default function Stage({ progress }: { progress: number }) {
    const progressRef = useRef(progress);
    progressRef.current = progress;
    const [mounted, setMounted] = useState(false);
    const reduced = useReducedMotion() ?? false;

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return createPortal(
        <div className="v2-canvas" aria-hidden="true">
            <ThreadScene progressRef={progressRef} reduced={reduced} onReady={() => {}} />
        </div>,
        document.body,
    );
}
