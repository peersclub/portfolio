'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Clock, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area, BarChart, Bar, Tooltip, CartesianGrid } from 'recharts';

// Real-ish market data (simulated current prices)
const btcEthData = [
    { month: 'Jul', BTC: 29500, ETH: 1850 },
    { month: 'Aug', BTC: 26800, ETH: 1680 },
    { month: 'Sep', BTC: 27100, ETH: 1640 },
    { month: 'Oct', BTC: 34500, ETH: 1810 },
    { month: 'Nov', BTC: 37800, ETH: 2050 },
    { month: 'Dec', BTC: 42500, ETH: 2290 },
];

const portfolioData = [
    { name: 'BTC', value: 45, color: '#F7931A' },
    { name: 'ETH', value: 30, color: '#627EEA' },
    { name: 'SOL', value: 15, color: '#00FFA3' },
    { name: 'Others', value: 10, color: '#E8C547' },
];

const volumeData = [
    { name: 'BTC', volume: 28.5 },
    { name: 'ETH', volume: 12.3 },
    { name: 'SOL', volume: 4.8 },
    { name: 'BNB', volume: 2.1 },
    { name: 'XRP', volume: 1.9 },
    { name: 'ADA', volume: 0.8 },
];

const macdData = [
    { day: '1', price: 168.5, sma20: 165.2, sma50: 162.8 },
    { day: '5', price: 171.2, sma20: 166.8, sma50: 163.5 },
    { day: '10', price: 169.8, sma20: 168.1, sma50: 164.2 },
    { day: '15', price: 175.3, sma20: 169.5, sma50: 165.1 },
    { day: '20', price: 178.9, sma20: 172.3, sma50: 166.8 },
    { day: '25', price: 182.4, sma20: 175.8, sma50: 168.9 },
];

const samplePrompts = [
    {
        text: "Compare BTC vs ETH performance over 6 months",
        widget: "comparison",
        insight: "BTC outperformed ETH with +44.1% vs +23.8% returns"
    },
    {
        text: "Show my portfolio allocation breakdown",
        widget: "pie",
        insight: "Portfolio is 75% weighted towards major caps"
    },
    {
        text: "Daily trading volume for top cryptos in billions",
        widget: "bar",
        insight: "BTC dominates with 57% of total volume"
    },
    {
        text: "AAPL moving average crossover signals",
        widget: "signals",
        insight: "Bullish crossover detected at day 15"
    },
];

export default function WidgetShowcase() {
    const [activePromptIndex, setActivePromptIndex] = useState(0);
    const [typedText, setTypedText] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [showWidget, setShowWidget] = useState(false);
    const [lastUpdated] = useState(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));

    const currentPrompt = samplePrompts[activePromptIndex];

    // Typing effect
    useEffect(() => {
        setTypedText('');
        setShowWidget(false);
        setIsGenerating(false);

        let charIndex = 0;
        const text = currentPrompt.text;

        const typeInterval = setInterval(() => {
            if (charIndex < text.length) {
                setTypedText(text.slice(0, charIndex + 1));
                charIndex++;
            } else {
                clearInterval(typeInterval);
                setIsGenerating(true);
                setTimeout(() => {
                    setIsGenerating(false);
                    setShowWidget(true);
                }, 1500);
            }
        }, 50);

        return () => clearInterval(typeInterval);
    }, [activePromptIndex, currentPrompt.text]);

    // Cycle through prompts
    useEffect(() => {
        const interval = setInterval(() => {
            setActivePromptIndex(prev => (prev + 1) % samplePrompts.length);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="h-screen w-full relative bg-gradient-to-b from-[#0d1117] to-[#0a0a0f] flex items-center justify-center px-4 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#E8C547]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10 w-full">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E8C547]/30 bg-[#E8C547]/5 mb-4">
                        <Sparkles className="w-4 h-4 text-[#E8C547]" />
                        <span className="text-sm font-mono text-[#E8C547] tracking-wide">Natural Language Interface</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        Speak Your <span className="text-[#E8C547]">Analysis</span>
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto text-sm">
                        Simply describe what you want to see. Our AI generates powerful financial widgets instantly.
                    </p>
                </motion.div>

                {/* Demo Container */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    {/* Terminal Input */}
                    <div className="bg-[#161b22] border border-slate-700/50 rounded-xl p-5 mb-4 shadow-2xl">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                            </div>
                            <span className="text-xs font-mono text-slate-500">assetworks-ai-terminal</span>
                        </div>

                        <div className="flex items-start gap-3">
                            <span className="text-[#E8C547] font-mono text-lg">$</span>
                            <div className="flex-1">
                                <span className="text-white font-mono">
                                    {typedText}
                                    <motion.span
                                        animate={{ opacity: [1, 0] }}
                                        transition={{ duration: 0.5, repeat: Infinity }}
                                        className="inline-block w-2 h-5 bg-[#E8C547] ml-0.5 translate-y-0.5"
                                    />
                                </span>
                            </div>
                        </div>

                        {/* Processing Indicator */}
                        <AnimatePresence>
                            {isGenerating && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-3 flex items-center gap-3"
                                >
                                    <div className="flex gap-1">
                                        {[0, 1, 2].map(i => (
                                            <motion.div
                                                key={i}
                                                animate={{ scale: [1, 1.3, 1] }}
                                                transition={{ duration: 0.5, delay: i * 0.15, repeat: Infinity }}
                                                className="w-2 h-2 rounded-full bg-[#E8C547]"
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm font-mono text-slate-400">Processing with AI...</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Widget Output */}
                    <AnimatePresence mode="wait">
                        {showWidget && (
                            <motion.div
                                key={currentPrompt.widget}
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="bg-gradient-to-br from-[#1c2128] to-[#161b22] border border-[#E8C547]/20 rounded-xl p-5 shadow-2xl"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-mono">
                                            Generated
                                        </span>
                                        <span className="text-sm text-slate-400">{currentPrompt.insight}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-slate-500 font-mono">
                                        <Clock className="w-3 h-3" />
                                        <span>Updated {lastUpdated}</span>
                                    </div>
                                </div>

                                {/* Real Chart */}
                                <WidgetChart type={currentPrompt.widget} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Prompt Selector */}
                <div className="flex justify-center gap-2 mt-6">
                    {samplePrompts.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActivePromptIndex(idx)}
                            className={`h-2 rounded-full transition-all ${idx === activePromptIndex
                                ? 'bg-[#E8C547] w-8'
                                : 'bg-slate-600 hover:bg-slate-500 w-2'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function WidgetChart({ type }: { type: string }) {
    return (
        <div className="h-56">
            {type === 'comparison' && (
                <div className="h-full">
                    <div className="flex justify-end gap-4 mb-2 text-xs font-mono">
                        <span className="flex items-center gap-1">
                            <span className="w-3 h-0.5 bg-[#F7931A]" /> BTC
                            <TrendingUp className="w-3 h-3 text-green-400 ml-1" />
                            <span className="text-green-400">+44.1%</span>
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-3 h-0.5 bg-[#627EEA]" /> ETH
                            <TrendingUp className="w-3 h-3 text-green-400 ml-1" />
                            <span className="text-green-400">+23.8%</span>
                        </span>
                    </div>
                    <ResponsiveContainer width="100%" height="85%">
                        <LineChart data={btcEthData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <XAxis dataKey="month" stroke="#666" fontSize={10} />
                            <YAxis stroke="#666" fontSize={10} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1c2128', border: '1px solid #333', borderRadius: '8px' }}
                                labelStyle={{ color: '#fff' }}
                            />
                            <Line type="monotone" dataKey="BTC" stroke="#F7931A" strokeWidth={2} dot={{ fill: '#F7931A', r: 3 }} />
                            <Line type="monotone" dataKey="ETH" stroke="#627EEA" strokeWidth={2} dot={{ fill: '#627EEA', r: 3 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}

            {type === 'pie' && (
                <div className="h-full flex items-center justify-center gap-8">
                    <div className="relative w-40 h-40">
                        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                            {portfolioData.reduce((acc, item, idx) => {
                                const offset = portfolioData.slice(0, idx).reduce((sum, i) => sum + i.value, 0);
                                const circumference = 2 * Math.PI * 35;
                                const dashArray = (item.value / 100) * circumference;
                                const dashOffset = -(offset / 100) * circumference;

                                return [...acc, (
                                    <motion.circle
                                        key={item.name}
                                        initial={{ strokeDasharray: '0 999' }}
                                        animate={{ strokeDasharray: `${dashArray} ${circumference - dashArray}` }}
                                        transition={{ duration: 1, delay: idx * 0.2 }}
                                        cx="50" cy="50" r="35"
                                        fill="none"
                                        stroke={item.color}
                                        strokeWidth="12"
                                        strokeDashoffset={dashOffset}
                                    />
                                )];
                            }, [] as React.ReactNode[])}
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">$124K</div>
                                <div className="text-xs text-slate-500">Total</div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {portfolioData.map((item) => (
                            <div key={item.name} className="flex items-center gap-2 text-sm">
                                <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }} />
                                <span className="text-slate-300 w-12">{item.name}</span>
                                <span className="text-slate-500 font-mono">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {type === 'bar' && (
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={volumeData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false} />
                        <XAxis type="number" stroke="#666" fontSize={10} tickFormatter={(v) => `$${v}B`} />
                        <YAxis type="category" dataKey="name" stroke="#666" fontSize={10} width={40} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1c2128', border: '1px solid #333', borderRadius: '8px' }}
                            formatter={(value) => [`$${value ?? 0}B`, 'Volume']}
                        />
                        <Bar dataKey="volume" fill="#E8C547" radius={[0, 4, 4, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            )}

            {type === 'signals' && (
                <div className="h-full">
                    <div className="flex justify-end gap-4 mb-2 text-xs font-mono">
                        <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-white" /> Price</span>
                        <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-[#E8C547]" /> SMA(20)</span>
                        <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-[#3B82F6]" /> SMA(50)</span>
                    </div>
                    <ResponsiveContainer width="100%" height="85%">
                        <AreaChart data={macdData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <XAxis dataKey="day" stroke="#666" fontSize={10} tickFormatter={(v) => `Day ${v}`} />
                            <YAxis stroke="#666" fontSize={10} domain={['auto', 'auto']} tickFormatter={(v) => `$${v}`} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1c2128', border: '1px solid #333', borderRadius: '8px' }}
                                labelStyle={{ color: '#fff' }}
                            />
                            <Area type="monotone" dataKey="price" stroke="#fff" fill="#ffffff10" strokeWidth={2} />
                            <Line type="monotone" dataKey="sma20" stroke="#E8C547" strokeWidth={1.5} dot={false} />
                            <Line type="monotone" dataKey="sma50" stroke="#3B82F6" strokeWidth={1.5} dot={false} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}
