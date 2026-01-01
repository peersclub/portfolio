'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TemplateProps {
    children: ReactNode;
}

const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
        filter: 'blur(8px)',
    },
    animate: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
    },
    exit: {
        opacity: 0,
        y: -20,
        filter: 'blur(8px)',
    },
};

const pageTransition = {
    type: 'tween',
    ease: [0.22, 1, 0.36, 1],
    duration: 0.5,
};

export default function Template({ children }: TemplateProps) {
    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
            style={{ willChange: 'opacity, transform, filter' }}
        >
            {children}
        </motion.div>
    );
}
