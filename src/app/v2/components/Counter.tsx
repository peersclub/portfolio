'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';
import { EASE_OUT } from './motion';

/** Counts up from 0 when it enters the viewport. Styling comes from the
    className you pass — this component owns behaviour only. */
export default function Counter({
    value,
    suffix = '',
    className,
}: {
    value: number;
    suffix?: string;
    className?: string;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: '-15%' });
    const [n, setN] = useState(0);

    useEffect(() => {
        if (!inView) return;
        const c = animate(0, value, {
            duration: 1.6,
            ease: EASE_OUT,
            onUpdate: (v) => setN(Math.round(v)),
        });
        return () => c.stop();
    }, [inView, value]);

    return (
        <span ref={ref} className={className}>
            {n}{suffix}
        </span>
    );
}
