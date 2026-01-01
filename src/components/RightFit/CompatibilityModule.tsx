'use client';

import { motion } from 'framer-motion';
import { Check, AlertTriangle, X } from 'lucide-react';
import styles from './RightFit.module.css';

interface CompatibilityItem {
    text: string;
}

interface CompatibilityModuleProps {
    type: 'success' | 'danger';
    title: string;
    items: CompatibilityItem[];
    delay?: number;
}

export const CompatibilityModule = ({ type, title, items, delay = 0 }: CompatibilityModuleProps) => {
    return (
        <motion.div
            className={`${styles.flagCard} ${styles[type]}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
        >
            <div className={styles.flagHeader}>
                <div className={styles.flagIcon}>
                    {type === 'success' ? <Check size={20} /> : <AlertTriangle size={20} />}
                </div>
                <span className={styles.flagTitle}>{title}</span>
            </div>

            <div className={styles.flagContent}>
                {items.map((item, idx) => (
                    <div key={idx} className={styles.flagItem}>
                        {type === 'success' ? (
                            <Check size={16} className={styles.checkIcon} />
                        ) : (
                            <X size={16} className={styles.crossIcon} />
                        )}
                        <span className={styles.itemText}>{item.text}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};
