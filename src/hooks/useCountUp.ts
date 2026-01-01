'use client';

import { useEffect, useState, useRef } from 'react';

interface UseCountUpOptions {
    end: number;
    duration?: number;
    startOnView?: boolean;
    suffix?: string;
    prefix?: string;
}

export function useCountUp({
    end,
    duration = 2000,
    startOnView = true,
    suffix = '',
    prefix = '',
}: UseCountUpOptions) {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!startOnView) {
            animateCount();
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted) {
                    setHasStarted(true);
                    animateCount();
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [hasStarted, startOnView]);

    const animateCount = () => {
        const startTime = performance.now();
        const startValue = 0;

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function - ease out expo
            const easeOutExpo = 1 - Math.pow(2, -10 * progress);

            const currentCount = Math.floor(startValue + (end - startValue) * easeOutExpo);
            setCount(currentCount);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        requestAnimationFrame(animate);
    };

    const formattedValue = `${prefix}${count.toLocaleString()}${suffix}`;

    return { count, formattedValue, ref, hasStarted };
}
