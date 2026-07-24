'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

function ScrubWord({
    word,
    progress,
    range,
}: {
    word: string;
    progress: MotionValue<number>;
    range: [number, number];
}) {
    const opacity = useTransform(progress, range, [0.15, 1]);
    return (
        <motion.span style={{ opacity, display: 'inline-block' }}>
            {word}&nbsp;
        </motion.span>
    );
}

/** A paragraph whose words brighten one by one as the reader scrolls past —
    the reading position becomes the highlight. */
export default function ScrubText({ text, className }: { text: string; className?: string }) {
    const ref = useRef<HTMLParagraphElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.4'] });
    const words = text.split(' ');
    return (
        <p ref={ref} className={className}>
            {words.map((w, i) => (
                <ScrubWord
                    key={i}
                    word={w}
                    progress={scrollYProgress}
                    range={[i / words.length, (i + 1) / words.length]}
                />
            ))}
        </p>
    );
}
