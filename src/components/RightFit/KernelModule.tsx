'use client';

import { motion } from 'framer-motion';
import styles from './RightFit.module.css';

interface KernelModuleProps {
    label: string;
    title: string;
    description: string;
    index: number;
}

export const KernelModule = ({ label, title, description, index }: KernelModuleProps) => {
    return (
        <motion.div
            className={styles.kernelCard}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
        >
            <span className={styles.kernelLabel}>{label}</span>
            <h3 className={styles.kernelTitle}>{title}</h3>
            <p className={styles.kernelDescription}>{description}</p>
        </motion.div>
    );
};
