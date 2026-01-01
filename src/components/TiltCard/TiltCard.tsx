'use client';

import { useRef, useState, ReactNode, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
    children: ReactNode;
    className?: string;
    tiltAmount?: number;
    glareOpacity?: number;
    scale?: number;
}

export function TiltCard({
    children,
    className = '',
    tiltAmount = 10,
    glareOpacity = 0.1,
    scale = 1.02,
}: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${tiltAmount}deg`, `-${tiltAmount}deg`]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${tiltAmount}deg`, `${tiltAmount}deg`]);

    const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
    const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);

    const handleMouseMove = (e: MouseEvent) => {
        if (!ref.current) return;

        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const mouseX = (e.clientX - left) / width - 0.5;
        const mouseY = (e.clientY - top) / height - 0.5;

        x.set(mouseX);
        y.set(mouseY);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            className={className}
            style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
                perspective: '1000px',
            }}
            animate={{ scale: isHovered ? scale : 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
        >
            {children}

            {/* Glare effect */}
            <motion.div
                style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 'inherit',
                    pointerEvents: 'none',
                    background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,${isHovered ? glareOpacity : 0}), transparent 50%)`,
                }}
                animate={{ opacity: isHovered ? 1 : 0 }}
            />
        </motion.div>
    );
}
