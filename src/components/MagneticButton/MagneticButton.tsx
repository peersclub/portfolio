'use client';

import { useRef, useState, ReactNode, MouseEvent } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    strength?: number;
    as?: 'button' | 'a';
    href?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

export function MagneticButton({
    children,
    className = '',
    strength = 0.3,
    as = 'button',
    href,
    onClick,
    type = 'button',
    disabled = false,
}: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: MouseEvent) => {
        if (!ref.current) return;

        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();

        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const distanceX = (clientX - centerX) * strength;
        const distanceY = (clientY - centerY) * strength;

        setPosition({ x: distanceX, y: distanceY });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const motionProps = {
        ref,
        className,
        animate: position,
        transition: { type: 'spring', stiffness: 150, damping: 15, mass: 0.1 },
        onMouseMove: handleMouse,
        onMouseLeave: reset,
        onClick,
        disabled,
    };

    if (as === 'a' && href) {
        return (
            <motion.a
                {...motionProps}
                ref={ref as React.RefObject<HTMLAnchorElement>}
                href={href}
            >
                {children}
            </motion.a>
        );
    }

    return (
        <motion.button
            {...motionProps}
            ref={ref as React.RefObject<HTMLButtonElement>}
            type={type}
        >
            {children}
        </motion.button>
    );
}
