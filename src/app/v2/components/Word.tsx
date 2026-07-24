'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { wordUp } from './motion';

/** One word of a masked headline reveal — the word rises out of an
    overflow-hidden slot. Parent must run hidden→show variants. */
export default function Word({ children }: { children: ReactNode }) {
    return (
        <span className="v2-w">
            <motion.span className="v2-wi" variants={wordUp}>
                {children}
            </motion.span>
        </span>
    );
}
