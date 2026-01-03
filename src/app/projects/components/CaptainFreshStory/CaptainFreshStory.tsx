'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
    ArrowLeft, ArrowDown, Users, Fish, MapPin, Anchor, TrendingDown, AlertTriangle,
    Quote, ChevronLeft, ChevronRight, Palette, Smartphone, Shield, Cloud, ShoppingCart, Bell
} from 'lucide-react';
import {
    AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

// =============================================================================
// DATA
// =============================================================================

const INDUSTRY_STATS = [
    { icon: Users, value: 16000000, label: 'Fishermen', description: 'families depend on fishing', color: 'var(--color-info)' },
    { icon: Fish, value: 14, label: 'Million Tonnes', description: 'fish caught annually', color: 'var(--color-success)' },
    { icon: MapPin, value: 7517, label: 'km Coastline', description: 'across 9 states & 4 UTs', color: 'var(--color-warning)' },
];

const ECONOMIC_DATA = [
    { year: '2010', cost: 15, income: 25 },
    { year: '2014', cost: 22, income: 23 },
    { year: '2018', cost: 35, income: 21 },
    { year: '2022', cost: 52, income: 17 },
    { year: '2024', cost: 65, income: 16 },
];

const LOSS_DATA = [
    { name: 'Spoilage', value: 30, color: 'var(--color-error)' },
    { name: 'Middlemen', value: 25, color: 'var(--color-chart-2)' },
    { name: 'Fuel', value: 20, color: 'var(--color-chart-1)' },
    { name: 'Equipment', value: 15, color: 'var(--color-chart-3)' },
];

const JOURNEY_QUOTES = [
    { location: 'Pulicut', quote: "The lake takes hours to navigate. By the time we reach market, the price has dropped.", type: "Start" },
    { location: 'Kasimedu', quote: "Auction is chaos. If you don't have a contact, you sell at a loss.", type: "Hub" },
    { location: 'Nagapattinam', quote: "Diesel costs eat 60% of our earnings. One bad trip means debt.", type: "Crisis" },
    { location: 'Point Calimere', quote: "It's a bird sanctuary now. We can't fish where our fathers did.", type: "Conservation" },
    { location: 'Rameswaram', quote: "The Sri Lankan navy arrests us if we drift even a few miles.", type: "Geopolitics" },
    { location: 'Kanyakumari', quote: "Tourists photograph the sunset. Nobody photographs our empty nets.", type: "End" },
];

const APP_FEATURES = [
    { id: 'borders', title: 'Border Safety', subtitle: 'Never Cross the Line', description: 'Real-time alerts when approaching international waters.', icon: Shield, color: 'var(--color-error)', image: '/projects/captain-fresh/app-borders.jpg' },
    { id: 'weather', title: 'Weather Forecast', subtitle: 'Plan Your Trip', description: 'Hourly sea & wind forecasts tailored for fishing.', icon: Cloud, color: 'var(--color-info)', image: '/projects/captain-fresh/app-weather.jpg' },
    { id: 'catchlog', title: 'Digital Catch Log', subtitle: 'Every Catch Counted', description: 'GPS-tagged entries mapped with coordinates.', icon: ShoppingCart, color: 'var(--color-success)', image: '/projects/captain-fresh/app-catchlog.jpg' },
    { id: 'pfz', title: 'PFZ Alerts', subtitle: 'Satellite Fish Zones', description: 'INCOIS Potential Fishing Zone data with navigation.', icon: Bell, color: 'var(--color-warning)', image: '/projects/captain-fresh/app-pfz.jpg' },
];

const IMPACT_METRICS = [
    { label: 'Income Increase', value: 40, suffix: '%' },
    { label: 'Villages Covered', value: 30, suffix: '+' },
    { label: 'App Downloads', value: 50, suffix: 'K+' },
];

// User Interviews - Using actual uploaded photos
const USER_INTERVIEWS = [
    {
        id: 'interview-1',
        name: 'Muthu Karuppan',
        role: 'Fisherman, Kasimedu',
        quote: "Before the app, I would go out not knowing the weather. Now I check before every trip. It has saved my life twice.",
        image: '/projects/captain-fresh/IMG_3351.JPG',
    },
    {
        id: 'interview-2',
        name: 'Lakshmi Devi',
        role: 'Fish Trader, Nagapattinam',
        quote: "The price alerts help me negotiate better. I know what fish is selling for in Chennai before the buyers tell me.",
        image: '/projects/captain-fresh/74DF76BB-2735-4CC1-A3B5-0B4C1427B668.JPG',
    },
    {
        id: 'interview-3',
        name: 'Rajan Selvam',
        role: 'Boat Owner, Rameswaram',
        quote: "The border alerts are everything. My son was arrested for 2 years. Now my family sleeps at night.",
        image: '/projects/captain-fresh/4b3691ce-4957-44ea-8739-16dd0aab9062.jpg',
    },
];

// Gallery Photos - Using actual uploaded photos
const GALLERY_PHOTOS = [
    { id: 'photo-1', src: '/projects/captain-fresh/IMG_3351.JPG', caption: 'Field interview with local fisherman' },
    { id: 'photo-2', src: '/projects/captain-fresh/74DF76BB-2735-4CC1-A3B5-0B4C1427B668.JPG', caption: 'On-ground user research' },
    { id: 'photo-3', src: '/projects/captain-fresh/4b3691ce-4957-44ea-8739-16dd0aab9062.jpg', caption: 'Community engagement session' },
    { id: 'photo-4', src: '/projects/captain-fresh/app-borders.jpg', caption: 'Border Safety feature in action' },
    { id: 'photo-5', src: '/projects/captain-fresh/app-weather.jpg', caption: 'Weather forecast for fishermen' },
    { id: 'photo-6', src: '/projects/captain-fresh/app-pfz.jpg', caption: 'Potential Fishing Zone alerts' },
];

// =============================================================================
// UTILITY COMPONENTS
// =============================================================================

function AnimatedCounter({ value, duration = 2, suffix = '' }: { value: number; duration?: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (!isInView) return;
        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * value));
            if (progress < 1) animationFrame = requestAnimationFrame(animate);
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [isInView, value, duration]);

    return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

function SectionWrapper({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <section className={`min-h-screen w-full flex flex-col items-center justify-center px-6 py-20 md:py-32 ${className}`}>
            {children}
        </section>
    );
}

// Image placeholder component for when real images aren't available
function ImagePlaceholder({ className = '', label = 'Add Your Photo' }: { className?: string; label?: string }) {
    return (
        <div className={`bg-secondary/80 border-2 border-dashed border-glass flex flex-col items-center justify-center ${className}`}>
            <Users className="w-12 h-12 text-muted mb-2" />
            <span className="text-xs font-mono text-muted text-center px-2">{label}</span>
        </div>
    );
}

// =============================================================================
// SECTIONS
// =============================================================================

function HeroSection() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

    return (
        <section ref={ref} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-primary">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary z-10" />

            {/* Content */}
            <motion.div style={{ opacity, y }} className="relative z-20 text-center px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-1 mb-6"
                >
                    <Anchor className="w-4 h-4 text-accent" />
                    <span className="text-xs font-mono text-accent uppercase tracking-widest">Case Study</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 bg-gradient-to-r from-accent via-amber-400 to-orange-500 bg-clip-text text-transparent"
                >
                    THE CATCH
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-xl md:text-2xl text-secondary-foreground leading-relaxed max-w-2xl mx-auto mb-4"
                >
                    Technology often forgets the hands that feed it. This is the story of how we built for the <strong className="text-foreground font-semibold">1%</strong>.
                </motion.p>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-sm text-muted font-mono uppercase tracking-widest"
                >
                    The 1% who risk their lives at sea every day.
                </motion.p>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
            >
                <span className="text-xs font-mono text-muted uppercase tracking-widest">Scroll to Explore</span>
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <ArrowDown className="w-5 h-5 text-accent" />
                </motion.div>
            </motion.div>

            {/* Back Link */}
            <Link href="/projects" className="absolute top-6 left-6 z-30 flex items-center gap-2 text-muted hover:text-foreground transition-colors font-mono text-sm group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back</span>
            </Link>
        </section>
    );
}

function ContextSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <SectionWrapper className="bg-secondary">
            <div ref={ref} className="max-w-4xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="text-xs font-mono text-accent uppercase tracking-widest mb-2 block">India's Fishing Industry</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">The Scale of the Ocean</h2>
                    <p className="text-secondary-foreground">World's 3rd largest fish producer</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {INDUSTRY_STATS.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                            className="bg-primary/50 backdrop-blur-sm border border-glass rounded-2xl p-6 text-center"
                        >
                            <div className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${stat.color}20` }}>
                                <stat.icon className="w-7 h-7" style={{ color: stat.color }} />
                            </div>
                            <div className="text-4xl font-black text-foreground mb-1">
                                <AnimatedCounter value={stat.value} duration={2 + index * 0.2} />
                            </div>
                            <div className="text-sm font-medium text-muted">{stat.label}</div>
                            <div className="text-xs text-muted mt-1">{stat.description}</div>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-center mt-8 text-sm text-muted font-mono"
                >
                    Yet <span className="text-red-500 font-bold">87%</span> remain unorganized & economically vulnerable
                </motion.p>
            </div>
        </SectionWrapper>
    );
}

function ProblemSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    return (
        <SectionWrapper>
            <div ref={ref} className="max-w-4xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="text-xs font-mono text-red-500 uppercase tracking-widest mb-2 block">The Crisis</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">A Widening Gap</h2>
                    <p className="text-secondary-foreground">Operating costs rising, income falling</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Chart */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-secondary/50 backdrop-blur-sm border border-glass rounded-2xl p-6"
                    >
                        <h3 className="text-sm font-mono text-muted uppercase tracking-widest mb-4">Cost vs. Income (₹000s)</h3>
                        {mounted && (
                            <ResponsiveContainer width="100%" height={200}>
                                <AreaChart data={ECONOMIC_DATA}>
                                    <defs>
                                        <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--color-error)" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="var(--color-error)" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--color-success)" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="var(--color-success)" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" />
                                    <XAxis dataKey="year" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} />
                                    <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} />
                                    <Area type="monotone" dataKey="cost" stroke="var(--color-error)" fill="url(#colorCost)" strokeWidth={2} />
                                    <Area type="monotone" dataKey="income" stroke="var(--color-success)" fill="url(#colorIncome)" strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                        <div className="flex justify-center gap-6 mt-4 text-xs">
                            <span className="flex items-center gap-1"><span className="w-3 h-1 bg-red-500 rounded"></span> Cost</span>
                            <span className="flex items-center gap-1"><span className="w-3 h-1 bg-emerald-500 rounded"></span> Income</span>
                        </div>
                    </motion.div>

                    {/* Loss Breakdown */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-secondary/50 backdrop-blur-sm border border-glass rounded-2xl p-6"
                    >
                        <h3 className="text-sm font-mono text-muted uppercase tracking-widest mb-4">Where Value is Lost</h3>
                        <div className="space-y-4">
                            {LOSS_DATA.map((item, index) => (
                                <div key={item.name} className="flex items-center gap-4">
                                    <div className="w-16 text-right text-sm font-mono text-muted">{item.name}</div>
                                    <div className="flex-1 h-6 bg-glass rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={isInView ? { width: `${item.value}%` } : {}}
                                            transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                                            className="h-full rounded-full"
                                            style={{ backgroundColor: item.color }}
                                        />
                                    </div>
                                    <div className="w-10 text-sm font-bold text-foreground">{item.value}%</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </SectionWrapper>
    );
}

// =============================================================================
// BEFORE/AFTER COMPARISON
// =============================================================================

const DAILY_COMPARISON = [
    { time: '3:00 AM', before: 'Wake up, check sky for weather clues', after: 'Check app forecast: "Safe to sail"', icon: Cloud },
    { time: '5:00 AM', before: 'Set out hoping for the best', after: 'Navigate to satellite-detected fish zones', icon: MapPin },
    { time: '8:00 AM', before: 'No idea if near international border', after: 'Real-time alert: "12km from border - Safe"', icon: Shield },
    { time: '2:00 PM', before: 'Sell to first middleman at their price', after: 'Check market prices, negotiate 40% higher', icon: TrendingDown },
    { time: '6:00 PM', before: 'Return home, guess tomorrow\'s income', after: 'Log catch in app, track monthly earnings', icon: Fish },
];

function BeforeAfterSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const [sliderPos, setSliderPos] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        setSliderPos((x / rect.width) * 100);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
        setSliderPos((x / rect.width) * 100);
    };

    return (
        <SectionWrapper className="bg-secondary">
            <div ref={ref} className="max-w-5xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="text-xs font-mono text-accent uppercase tracking-widest mb-2 block">A Day in the Life</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Before vs After</h2>
                    <p className="text-secondary-foreground">Drag to compare a fisherman's daily routine</p>
                </motion.div>

                <motion.div
                    ref={containerRef}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative rounded-2xl overflow-hidden cursor-ew-resize select-none"
                    onMouseMove={handleMouseMove}
                    onTouchMove={handleTouchMove}
                >
                    {/* Background grid */}
                    <div className="grid gap-3">
                        {DAILY_COMPARISON.map((item, index) => (
                            <div key={index} className="relative h-24 md:h-20 rounded-xl overflow-hidden">
                                {/* BEFORE - Left side (red tint) */}
                                <div
                                    className="absolute inset-0 bg-gradient-to-r from-error/20 to-error/10 flex items-center px-4 md:px-6"
                                    style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                                >
                                    <div className="flex items-center gap-3 md:gap-4 w-full">
                                        <div className="w-10 h-10 rounded-lg bg-error/20 flex items-center justify-center shrink-0">
                                            <item.icon className="w-5 h-5 text-error" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs font-mono text-error mb-1">{item.time}</div>
                                            <div className="text-sm text-foreground font-medium truncate">{item.before}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* AFTER - Right side (green tint) */}
                                <div
                                    className="absolute inset-0 bg-gradient-to-r from-success/10 to-success/20 flex items-center px-4 md:px-6"
                                    style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
                                >
                                    <div className="flex items-center gap-3 md:gap-4 w-full">
                                        <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center shrink-0">
                                            <item.icon className="w-5 h-5 text-success" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs font-mono text-success mb-1">{item.time}</div>
                                            <div className="text-sm text-foreground font-medium truncate">{item.after}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Slider line */}
                    <div
                        className="absolute inset-y-0 w-1 bg-accent z-10 pointer-events-none"
                        style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-lg">
                            <ChevronLeft className="w-4 h-4 text-primary -mr-1" />
                            <ChevronRight className="w-4 h-4 text-primary -ml-1" />
                        </div>
                    </div>

                    {/* Labels */}
                    <div className="absolute top-2 left-4 text-xs font-mono text-error uppercase tracking-wider">Before</div>
                    <div className="absolute top-2 right-4 text-xs font-mono text-success uppercase tracking-wider">After</div>
                </motion.div>
            </div>
        </SectionWrapper>
    );
}

// =============================================================================
// LIVE ACTIVITY VISUALIZATION
// =============================================================================

function LiveActivitySection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const [pings, setPings] = useState<Array<{ id: number; x: number; y: number; type: 'fish' | 'weather' | 'border' }>>([]);

    useEffect(() => {
        if (!isInView) return;

        const addPing = () => {
            const types: Array<'fish' | 'weather' | 'border'> = ['fish', 'fish', 'fish', 'weather', 'border'];
            const type = types[Math.floor(Math.random() * types.length)];
            const newPing = {
                id: Date.now(),
                x: 20 + Math.random() * 60,
                y: 20 + Math.random() * 60,
                type,
            };
            setPings(prev => [...prev.slice(-12), newPing]);
        };

        const interval = setInterval(addPing, 800);
        addPing(); // Initial ping
        return () => clearInterval(interval);
    }, [isInView]);

    const getPingColor = (type: string) => {
        switch (type) {
            case 'fish': return 'bg-info';
            case 'weather': return 'bg-warning';
            case 'border': return 'bg-error';
            default: return 'bg-accent';
        }
    };

    return (
        <SectionWrapper>
            <div ref={ref} className="max-w-4xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <span className="text-xs font-mono text-cyan-500 uppercase tracking-widest mb-2 block">Live Feed</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Real-Time Activity</h2>
                    <p className="text-secondary-foreground">Watch the ocean come alive with data</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative aspect-[16/10] bg-gradient-to-b from-info/5 to-info/20 rounded-2xl overflow-hidden border border-glass"
                >
                    {/* Ocean waves animation */}
                    <div className="absolute inset-0 opacity-30">
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute h-px bg-info/50 w-full"
                                style={{ top: `${20 + i * 15}%` }}
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'linear' }}
                            />
                        ))}
                    </div>

                    {/* Coastline indicator */}
                    <div className="absolute left-0 inset-y-0 w-16 bg-gradient-to-r from-secondary to-transparent" />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-mono text-muted rotate-[-90deg] origin-center whitespace-nowrap">
                        Tamil Nadu Coast
                    </div>

                    {/* Border line */}
                    <div className="absolute right-12 inset-y-4 w-px border-r-2 border-dashed border-error/50" />
                    <div className="absolute right-4 top-4 text-xs font-mono text-error">Border</div>

                    {/* Pings */}
                    <AnimatePresence>
                        {pings.map((ping) => (
                            <motion.div
                                key={ping.id}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 2, opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className={`absolute w-3 h-3 rounded-full ${getPingColor(ping.type)}`}
                                style={{ left: `${ping.x}%`, top: `${ping.y}%` }}
                            >
                                <motion.div
                                    className={`absolute inset-0 rounded-full ${getPingColor(ping.type)}`}
                                    animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Legend */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-6 bg-primary/80 backdrop-blur-sm px-4 py-2 rounded-full">
                        <div className="flex items-center gap-2 text-xs">
                            <div className="w-2 h-2 rounded-full bg-info" />
                            <span className="text-muted">Fish Catch</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                            <div className="w-2 h-2 rounded-full bg-warning" />
                            <span className="text-muted">Weather</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                            <div className="w-2 h-2 rounded-full bg-error" />
                            <span className="text-muted">Border Alert</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </SectionWrapper>
    );
}

// =============================================================================
// INTERACTIVE BORDER DEMO
// =============================================================================

function BorderDemoSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const containerRef = useRef<HTMLDivElement>(null);
    const [boatPos, setBoatPos] = useState({ x: 30, y: 50 });
    const [isDragging, setIsDragging] = useState(false);
    const [alertTriggered, setAlertTriggered] = useState(false);

    const borderX = 80; // Border line position (percentage)
    const distanceFromBorder = Math.max(0, borderX - boatPos.x);

    const getStatus = () => {
        if (distanceFromBorder > 30) return { label: 'Safe Zone', color: 'text-success', bg: 'bg-success' };
        if (distanceFromBorder > 15) return { label: 'Caution', color: 'text-warning', bg: 'bg-warning' };
        if (distanceFromBorder > 0) return { label: 'Danger!', color: 'text-error', bg: 'bg-error' };
        return { label: 'ALERT!', color: 'text-error', bg: 'bg-error' };
    };

    const status = getStatus();

    const handleMove = (clientX: number, clientY: number) => {
        if (!containerRef.current || !isDragging) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(5, Math.min(((clientX - rect.left) / rect.width) * 100, 95));
        const y = Math.max(10, Math.min(((clientY - rect.top) / rect.height) * 100, 90));
        setBoatPos({ x, y });

        if (x >= borderX && !alertTriggered) {
            setAlertTriggered(true);
            setTimeout(() => setAlertTriggered(false), 2000);
        }
    };

    return (
        <SectionWrapper className="bg-secondary">
            <div ref={ref} className="max-w-4xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <span className="text-xs font-mono text-error uppercase tracking-widest mb-2 block">Try It</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Border Alert Demo</h2>
                    <p className="text-secondary-foreground">Drag the boat toward the border to trigger the alert</p>
                </motion.div>

                <motion.div
                    ref={containerRef}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative aspect-[16/9] bg-gradient-to-r from-info/10 via-info/20 to-error/20 rounded-2xl overflow-hidden border border-glass cursor-crosshair"
                    onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
                    onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
                    onMouseUp={() => setIsDragging(false)}
                    onMouseLeave={() => setIsDragging(false)}
                    onTouchEnd={() => setIsDragging(false)}
                >
                    {/* India label */}
                    <div className="absolute left-4 top-4 text-sm font-mono text-info">🇮🇳 India</div>

                    {/* Sri Lanka label */}
                    <div className="absolute right-4 top-4 text-sm font-mono text-muted">Sri Lanka 🇱🇰</div>

                    {/* Border line */}
                    <motion.div
                        className="absolute inset-y-0 w-1"
                        style={{ left: `${borderX}%` }}
                        animate={alertTriggered ? { backgroundColor: ['#EF4444', '#FFFFFF', '#EF4444'] } : {}}
                        transition={{ duration: 0.3, repeat: alertTriggered ? 3 : 0 }}
                    >
                        <div className="h-full w-full bg-error" />
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-error px-2 py-0.5 rounded text-xs font-mono text-white whitespace-nowrap">
                            Maritime Border
                        </div>
                    </motion.div>

                    {/* Distance zones */}
                    <div className="absolute inset-y-0 bg-warning/10" style={{ left: `${borderX - 30}%`, width: '15%' }} />
                    <div className="absolute inset-y-0 bg-error/10" style={{ left: `${borderX - 15}%`, width: '15%' }} />

                    {/* Boat */}
                    <motion.div
                        className={`absolute w-12 h-12 cursor-grab active:cursor-grabbing ${isDragging ? 'scale-110' : ''} transition-transform`}
                        style={{ left: `${boatPos.x}%`, top: `${boatPos.y}%`, transform: 'translate(-50%, -50%)' }}
                        onMouseDown={() => setIsDragging(true)}
                        onTouchStart={() => setIsDragging(true)}
                        animate={alertTriggered ? { x: [-5, 5, -5, 5, 0], rotate: [-5, 5, -5, 5, 0] } : {}}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="text-4xl">🚤</div>
                    </motion.div>

                    {/* Status indicator */}
                    <motion.div
                        className={`absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full flex items-center gap-3 ${status.bg}/20 border border-glass backdrop-blur-sm`}
                        animate={alertTriggered ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 0.3, repeat: alertTriggered ? 3 : 0 }}
                    >
                        <motion.div
                            className={`w-3 h-3 rounded-full ${status.bg}`}
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        />
                        <span className={`font-mono text-sm ${status.color}`}>
                            {distanceFromBorder > 0 ? `${Math.round(distanceFromBorder * 0.5)}km from border` : 'BORDER CROSSED!'}
                        </span>
                        <span className={`font-bold ${status.color}`}>{status.label}</span>
                    </motion.div>

                    {/* Alert overlay */}
                    <AnimatePresence>
                        {alertTriggered && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-error/30 flex items-center justify-center"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 0.5, repeat: 2 }}
                                    className="bg-error text-white px-8 py-4 rounded-xl font-bold text-2xl shadow-2xl"
                                >
                                    ⚠️ BORDER ALERT ⚠️
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </SectionWrapper>
    );
}

function JourneySection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    useEffect(() => {
        if (isPaused || !isInView) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % JOURNEY_QUOTES.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isPaused, isInView]);

    return (
        <SectionWrapper className="bg-secondary">
            <div ref={ref} className="max-w-3xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="text-xs font-mono text-amber-500 uppercase tracking-widest mb-2 block">1,000 km of Truth</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Voices from the Coast</h2>
                    <p className="text-secondary-foreground">Direct quotes from 400+ field interviews</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className="relative bg-primary/50 backdrop-blur-sm border border-glass rounded-2xl p-8 md:p-12"
                >
                    <Quote className="absolute top-6 left-6 w-8 h-8 text-accent/30" />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="text-center py-8"
                        >
                            <blockquote className="text-xl md:text-2xl text-foreground font-medium leading-relaxed mb-6">
                                "{JOURNEY_QUOTES[activeIndex].quote}"
                            </blockquote>
                            <div className="flex items-center justify-center gap-2 text-sm">
                                <MapPin className="w-4 h-4 text-accent" />
                                <span className="font-mono text-accent">{JOURNEY_QUOTES[activeIndex].location}</span>
                                <span className="text-muted">•</span>
                                <span className="text-muted">{JOURNEY_QUOTES[activeIndex].type}</span>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Progress Dots */}
                    <div className="flex justify-center gap-2 mt-4">
                        {JOURNEY_QUOTES.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`h-1.5 rounded-full transition-all duration-300 ${index === activeIndex ? 'w-6 bg-accent' : 'w-1.5 bg-glass hover:bg-muted'}`}
                            />
                        ))}
                    </div>

                    {/* Nav Arrows */}
                    <button
                        onClick={() => setActiveIndex((prev) => (prev - 1 + JOURNEY_QUOTES.length) % JOURNEY_QUOTES.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-secondary/80 border border-glass flex items-center justify-center text-muted hover:text-foreground transition-all"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setActiveIndex((prev) => (prev + 1) % JOURNEY_QUOTES.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-secondary/80 border border-glass flex items-center justify-center text-muted hover:text-foreground transition-all"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </motion.div>
            </div>
        </SectionWrapper>
    );
}

function InterviewsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <SectionWrapper>
            <div ref={ref} className="max-w-5xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="text-xs font-mono text-purple-500 uppercase tracking-widest mb-2 block">Real Users, Real Stories</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">User Interviews</h2>
                    <p className="text-secondary-foreground">Conversations that shaped our product</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {USER_INTERVIEWS.map((interview, index) => (
                        <motion.div
                            key={interview.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                            className="bg-secondary/50 backdrop-blur-sm border border-glass rounded-2xl overflow-hidden group"
                        >
                            {/* Photo */}
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <Image
                                    src={interview.image}
                                    alt={interview.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    onError={(e) => {
                                        // Hide image on error, show placeholder
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                                <ImagePlaceholder className="absolute inset-0" label="Add interview photo" />
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <Quote className="w-6 h-6 text-accent/50 mb-3" />
                                <p className="text-sm text-secondary-foreground leading-relaxed mb-4 italic">
                                    "{interview.quote}"
                                </p>
                                <div className="border-t border-glass pt-4">
                                    <div className="font-semibold text-foreground">{interview.name}</div>
                                    <div className="text-xs text-muted font-mono">{interview.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}

function GallerySection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <SectionWrapper className="bg-secondary">
            <div ref={ref} className="max-w-6xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="text-xs font-mono text-cyan-500 uppercase tracking-widest mb-2 block">On the Ground</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Field Gallery</h2>
                    <p className="text-secondary-foreground">30 villages, 400+ interviews, 1 mission</p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {GALLERY_PHOTOS.map((photo, index) => (
                        <motion.div
                            key={photo.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                            className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer"
                        >
                            <Image
                                src={photo.src}
                                alt={photo.caption}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                            <ImagePlaceholder className="absolute inset-0 rounded-xl" label={photo.caption} />

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                <p className="text-white text-sm font-medium">{photo.caption}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}

function SolutionSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const [activeFeature, setActiveFeature] = useState(0);

    return (
        <SectionWrapper>
            <div ref={ref} className="max-w-6xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="text-xs font-mono text-teal-500 uppercase tracking-widest mb-2 block">The Solution</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">A SuperApp for the Sea</h2>
                    <p className="text-secondary-foreground">One platform for weather, borders, markets, and community</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* App Screenshot */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative aspect-[9/16] max-w-xs mx-auto bg-secondary/50 rounded-[2.5rem] border-4 border-glass overflow-hidden shadow-2xl"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeFeature}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={APP_FEATURES[activeFeature].image}
                                    alt={APP_FEATURES[activeFeature].title}
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                        </AnimatePresence>
                        {/* Phone Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-primary rounded-b-2xl" />
                    </motion.div>

                    {/* Feature Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {APP_FEATURES.map((feature, index) => (
                            <motion.button
                                key={feature.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                onClick={() => setActiveFeature(index)}
                                className={`text-left bg-secondary/50 backdrop-blur-sm border rounded-2xl p-5 group transition-all ${activeFeature === index ? 'border-accent shadow-lg shadow-accent/10' : 'border-glass hover:border-accent/50'}`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform ${activeFeature === index ? 'scale-110' : 'group-hover:scale-105'}`} style={{ backgroundColor: `${feature.color}20` }}>
                                        <feature.icon className="w-5 h-5" style={{ color: feature.color }} />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-foreground mb-0.5">{feature.title}</h3>
                                        <p className="text-xs font-mono text-accent mb-1">{feature.subtitle}</p>
                                        <p className="text-xs text-muted leading-relaxed">{feature.description}</p>
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}

function ImpactSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <SectionWrapper className="bg-gradient-to-b from-primary to-secondary">
            <div ref={ref} className="max-w-4xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="text-xs font-mono text-accent uppercase tracking-widest mb-2 block">The Impact</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Results That Matter</h2>
                    <p className="text-secondary-foreground">By reducing uncertainty, we increased stability</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {IMPACT_METRICS.map((metric, index) => (
                        <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                            className="bg-primary/80 backdrop-blur-sm border border-accent/30 rounded-2xl p-8 text-center"
                        >
                            <div className="text-5xl md:text-6xl font-black text-accent mb-2">
                                <AnimatedCounter value={metric.value} duration={2 + index * 0.2} suffix={metric.suffix} />
                            </div>
                            <div className="text-sm font-medium text-muted uppercase tracking-widest">{metric.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-center mt-16"
                >
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 bg-accent text-foreground px-8 py-4 rounded-full font-semibold text-lg hover:bg-accent/90 transition-all group"
                    >
                        <span>Explore More Projects</span>
                        <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform rotate-[-90deg]" />
                    </Link>
                </motion.div>
            </div>
        </SectionWrapper>
    );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function CaptainFreshStory() {
    return (
        <main className="bg-primary text-foreground selection:bg-accent/30">
            <HeroSection />
            <ContextSection />
            <ProblemSection />
            <BeforeAfterSection />
            <LiveActivitySection />
            <BorderDemoSection />
            <JourneySection />
            <InterviewsSection />
            <SolutionSection />
            <ImpactSection />
        </main>
    );
}

