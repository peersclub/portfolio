'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, MapPin, Cloud, ShoppingCart, Bell, Smartphone } from 'lucide-react';

// App Screen Data
const APP_SCREENS = [
    {
        id: 'borders',
        title: 'Border Safety',
        subtitle: 'Never Cross the Line',
        description: 'Real-time alerts when approaching international waters. Works offline with pre-loaded EEZ boundaries.',
        image: '/projects/captain-fresh/app-borders.jpg',
        features: ['Offline-enabled', 'Sri Lanka EEZ alerts', 'GPS tracking'],
        color: 'var(--color-error)',
        icon: MapPin
    },
    {
        id: 'weather',
        title: 'Weather Forecast',
        subtitle: 'Plan Your Trip',
        description: 'Hourly sea & wind forecasts tailored for fishing. Know wave heights, wind direction, and optimal fishing windows.',
        image: '/projects/captain-fresh/app-weather.jpg',
        features: ['Hourly forecasts', 'Wave predictions', '7-day outlook'],
        color: 'var(--color-info)',
        icon: Cloud
    },
    {
        id: 'catchlog',
        title: 'Digital Catch Log',
        subtitle: 'Every Catch Counted',
        description: 'Validated catch entries mapped with GPS coordinates. Build a digital history for better fishing decisions next season.',
        image: '/projects/captain-fresh/app-catchlog.jpg',
        features: ['GPS-tagged entries', 'Species identification', 'Historical patterns'],
        color: 'var(--color-success)',
        icon: ShoppingCart
    },
    {
        id: 'alerts',
        title: 'PFZ Alerts',
        subtitle: 'Satellite Fish Zones',
        description: 'INCOIS Potential Fishing Zone data with real-time navigation. Know exactly where the fish are before you leave port.',
        image: '/projects/captain-fresh/app-pfz.jpg',
        features: ['Satellite data', 'Real-time compass', 'Fish migration patterns'],
        color: 'var(--color-warning)',
        icon: Bell
    },
];

export default function AppShowcase() {
    const [activeScreen, setActiveScreen] = useState(0);
    const [isAuto, setIsAuto] = useState(true);

    useEffect(() => {
        if (!isAuto) return;
        const interval = setInterval(() => {
            setActiveScreen(prev => (prev + 1) % APP_SCREENS.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isAuto]);

    const goNext = () => { setActiveScreen(prev => (prev + 1) % APP_SCREENS.length); setIsAuto(false); };
    const goPrev = () => { setActiveScreen(prev => (prev - 1 + APP_SCREENS.length) % APP_SCREENS.length); setIsAuto(false); };

    const screen = APP_SCREENS[activeScreen];
    const IconComponent = screen.icon;

    return (
        <div className="w-full h-full bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 relative overflow-hidden flex flex-col">

            {/* Header */}
            <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-indigo-400" />
                    <span className="text-sm font-bold text-white">The SuperApp</span>
                </div>
                <div className="text-xs text-slate-500 font-mono">
                    {activeScreen + 1} / {APP_SCREENS.length}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center px-4 pb-4 relative">

                {/* Navigation Arrows */}
                <button
                    onClick={goPrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500 transition-all z-20"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                    onClick={goNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500 transition-all z-20"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>

                {/* Card with Image */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeScreen}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.4 }}
                        className="w-full max-w-sm bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl"
                    >
                        {/* Image Container - reduced height */}
                        <div className="relative w-full aspect-[3/4] bg-slate-900">
                            {screen.image && (
                                <Image
                                    src={screen.image}
                                    alt={screen.title}
                                    fill
                                    className="object-contain"
                                />
                            )}
                        </div>

                        {/* Info Section */}
                        <div className="p-4 bg-gradient-to-t from-slate-900 to-transparent">
                            <div className="flex items-center gap-2 mb-2">
                                <div
                                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: `${screen.color}20` }}
                                >
                                    <IconComponent className="w-4 h-4" style={{ color: screen.color }} />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-white">{screen.title}</h3>
                                    <p className="text-xs text-slate-500">{screen.subtitle}</p>
                                </div>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                {screen.description}
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Bottom Progress Dots */}
            <div className="flex justify-center gap-2 pb-4">
                {APP_SCREENS.map((s, index) => (
                    <button
                        key={index}
                        onClick={() => { setActiveScreen(index); setIsAuto(false); }}
                        className={`h-1.5 rounded-full transition-all duration-300 ${index === activeScreen
                            ? 'w-6'
                            : 'w-1.5 hover:bg-slate-500'
                            }`}
                        style={{ backgroundColor: index === activeScreen ? s.color : 'var(--text-muted)' }}
                    />
                ))}
            </div>
        </div>
    );
}
