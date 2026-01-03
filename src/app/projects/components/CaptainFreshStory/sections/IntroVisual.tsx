'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Fish, MapPin, Anchor, Waves } from 'lucide-react';

// Real data from FAO/CMFRI
const industryStats = [
    {
        icon: Users,
        value: 16000000,
        label: 'Fishermen',
        suffix: '',
        description: 'families depend on fishing',
        color: 'var(--color-info)'
    },
    {
        icon: Fish,
        value: 14.2,
        label: 'Million Tonnes',
        suffix: '',
        description: 'fish caught annually',
        color: 'var(--color-success)'
    },
    {
        icon: MapPin,
        value: 7517,
        label: 'km Coastline',
        suffix: '',
        description: 'across 9 states & 4 UTs',
        color: 'var(--color-warning)'
    },
];

// Animated counter component
function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

            // Easing function for smooth deceleration
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * value));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [value, duration]);

    // Format number with commas
    return <span>{count.toLocaleString()}</span>;
}

export default function IntroVisual() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="w-full h-full bg-primary relative p-8 flex flex-col items-center justify-center overflow-hidden">
            {/* Animated Background Waves */}
            <div className="absolute inset-0 opacity-10">
                <svg viewBox="0 0 1200 600" className="w-full h-full" preserveAspectRatio="none">
                    <motion.path
                        d="M0,300 C200,250 400,350 600,300 C800,250 1000,350 1200,300 L1200,600 L0,600 Z"
                        fill="url(#waveGradient)"
                        initial={{ d: "M0,300 C200,250 400,350 600,300 C800,250 1000,350 1200,300 L1200,600 L0,600 Z" }}
                        animate={{
                            d: [
                                "M0,300 C200,250 400,350 600,300 C800,250 1000,350 1200,300 L1200,600 L0,600 Z",
                                "M0,300 C200,350 400,250 600,300 C800,350 1000,250 1200,300 L1200,600 L0,600 Z",
                                "M0,300 C200,250 400,350 600,300 C800,250 1000,350 1200,300 L1200,600 L0,600 Z"
                            ]
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <defs>
                        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="var(--color-info)" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="var(--color-info)" stopOpacity="0.1" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-8 relative z-10"
            >
                <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-1 mb-4">
                    <Anchor className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                    <span className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest">India's Fishing Industry</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-1">The Scale of the Ocean</h3>
                <p className="text-sm text-secondary-foreground">World's 3rd largest fish producer</p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6 w-full max-w-md relative z-10">
                {industryStats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                        className="bg-secondary/50 backdrop-blur-sm border border-glass rounded-xl p-5 flex items-center gap-4 group hover:border-primary/20 transition-colors"
                    >
                        {/* Icon */}
                        <div
                            className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                            style={{ backgroundColor: `${stat.color}20` }}
                        >
                            <stat.icon className="w-7 h-7" style={{ color: stat.color }} />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-black text-primary tabular-nums">
                                    {isVisible && <AnimatedCounter value={stat.value} duration={2 + index * 0.3} />}
                                </span>
                                <span className="text-sm font-medium text-muted">{stat.label}</span>
                            </div>
                            <p className="text-xs text-muted mt-1">{stat.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Bottom Tagline */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="mt-8 text-center relative z-10"
            >
                <p className="text-sm text-slate-600 font-mono">
                    Yet <span className="text-red-400 font-bold">87%</span> remain unorganized & economically vulnerable
                </p>
            </motion.div>

            {/* Data Source */}
            <div className="absolute bottom-4 left-0 right-0 text-center">
                <span className="text-xs text-muted font-mono">
                    Source: Ministry of Fisheries, FAO 2023
                </span>
            </div>
        </div>
    );
}
