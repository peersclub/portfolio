'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
    Twitter,
    Linkedin,
    Instagram,
    BookOpen, // Medium
    Video, // Topmate
    Github
} from 'lucide-react';
import styles from './SocialDock.module.css';

interface SocialLink {
    id: string;
    icon: any;
    label: string;
    url: string;
    color: string;
}

const socialLinks: SocialLink[] = [
    { id: 'tw', icon: Twitter, label: 'Twitter', url: '#', color: '#1DA1F2' },
    { id: 'li', icon: Linkedin, label: 'LinkedIn', url: '#', color: '#0077B5' },
    { id: 'ig', icon: Instagram, label: 'Instagram', url: '#', color: '#E1306C' },
    { id: 'md', icon: BookOpen, label: 'Medium', url: '#', color: '#00ab6c' },
    { id: 'tm', icon: Video, label: 'Topmate', url: '#', color: '#FF5722' },
];

export default function SocialDock({ floating = false }: { floating?: boolean }) {
    return (
        <div className={`${styles.dockContainer} ${floating ? styles.floating : ''}`}>
            {socialLinks.map((link, i) => (
                <DockIcon key={link.id} link={link} index={i} />
            ))}
        </div>
    );
}

function DockIcon({ link, index }: { link: SocialLink; index: number }) {
    const ref = useRef<HTMLAnchorElement>(null); // Fixed type mismatch

    // Magnetic Effect Logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 }; // "Heavy" fluid feel
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current!.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        // Calculate distance for magnetic pull
        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;

        // Limit the pull distance
        mouseX.set(distanceX * 0.4);
        mouseY.set(distanceY * 0.4);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.a
            ref={ref}
            href={link.url}
            className={styles.iconWrapper}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x, y }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + (index * 0.1) }} // Staggered entrance
            whileHover="hover"
        >
            {/* Zero Gravity Float Animation */}
            <motion.div
                className={styles.iconInner}
                animate={{ y: [0, -8, 0] }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5, // Randomize float phase
                }}
            >
                <motion.div
                    variants={{
                        hover: { scale: 1.2 }
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <link.icon size={20} className={styles.iconSvg} style={{ '--hover-color': link.color } as any} />
                </motion.div>

                {/* Hover Glow */}
                <motion.div
                    className={styles.glow}
                    variants={{
                        hover: { opacity: 0.5, scale: 1.5 }
                    }}
                    style={{ backgroundColor: link.color }}
                />
            </motion.div>
        </motion.a>
    );
}
