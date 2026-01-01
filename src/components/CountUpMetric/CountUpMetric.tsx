'use client';

import { useEffect, useState, useRef, RefObject } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface CountUpMetricProps {
    value: string;
    className?: string;
}

// Parse metric string to get number and suffix
function parseMetric(metric: string): { number: number; suffix: string; prefix: string; isText: boolean } {
    // Handle text-only metrics like "First" or "AI-Native"
    if (!/\d/.test(metric)) {
        return { number: 0, suffix: metric, prefix: '', isText: true };
    }

    const match = metric.match(/^([^\d]*)(\d+(?:,\d+)*)(\D*)$/);
    if (match) {
        const prefix = match[1] || '';
        const number = parseInt(match[2].replace(/,/g, ''), 10);
        const suffix = match[3] || '';
        return { number, suffix, prefix, isText: false };
    }

    return { number: 0, suffix: metric, prefix: '', isText: true };
}

export function CountUpMetric({ value, className }: CountUpMetricProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [hasAnimated, setHasAnimated] = useState(false);
    const { number, suffix, prefix, isText } = parseMetric(value);

    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 30,
        stiffness: 100,
    });
    const displayValue = useTransform(springValue, (latest) => {
        if (isText) return suffix;
        const formatted = Math.floor(latest).toLocaleString();
        return `${prefix}${formatted}${suffix}`;
    });

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    motionValue.set(number);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [hasAnimated, number, motionValue]);

    if (isText) {
        return (
            <div ref={ref} className={className}>
                {value}
            </div>
        );
    }

    return (
        <motion.div ref={ref} className={className}>
            {displayValue}
        </motion.div>
    );
}
