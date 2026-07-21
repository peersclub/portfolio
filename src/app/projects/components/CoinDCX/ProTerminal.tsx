'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Activity, Clock, DollarSign } from 'lucide-react';

// Lazy init inside useState: Math.random() at module scope evaluates
// differently on server vs client and risks hydration mismatches.
const makeInitialData = () =>
    Array.from({ length: 40 }, (_, i) => ({
        time: i,
        price: 45000 + Math.random() * 2000 - 1000,
        volume: Math.random() * 100
    }));

export default function ProTerminal() {
    const [data, setData] = useState(makeInitialData);
    const [currentPrice, setCurrentPrice] = useState(46240.50);
    const [priceChange, setPriceChange] = useState(2.4);
    const [activeTab, setActiveTab] = useState('chart');

    // Simulate live data
    useEffect(() => {
        const interval = setInterval(() => {
            setData(prev => {
                const last = prev[prev.length - 1];
                const newPrice = last.price + (Math.random() - 0.45) * 200; // Slight uptrend
                const newPoint = {
                    time: last.time + 1,
                    price: newPrice,
                    volume: Math.random() * 100
                };
                const newData = [...prev.slice(1), newPoint];
                setCurrentPrice(newPrice);
                return newData;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="h-screen w-full relative bg-[#0f172a] flex items-center justify-center px-4 overflow-hidden">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Left Panel: Context */}
                <div className="lg:col-span-4 flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <Activity className="text-[#4ECDC4] w-5 h-5" />
                            <span className="text-[#4ECDC4] font-mono uppercase tracking-widest text-xs">Pro Trading Terminal</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                            Deep Liquidity <br />
                            <span className="text-[#4ECDC4]">Ultra-Low Latency</span>
                        </h2>
                        <p className="text-slate-400 mb-8 max-w-md">
                            Engineered for high-frequency trading with a matching engine capable of 1M+ transactions per second.
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            <MetaStat label="24h Volume" value="$245M" />
                            <MetaStat label="Avg Latency" value="<40ms" />
                            <MetaStat label="Pairs" value="500+" />
                            <MetaStat label="Uptime" value="99.99%" />
                        </div>
                    </motion.div>
                </div>

                {/* Right Panel: Terminal UI */}
                <div className="lg:col-span-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="bg-[#1e293b] border border-slate-700 rounded-xl overflow-hidden shadow-2xl"
                    >
                        {/* Header */}
                        <div className="h-12 bg-[#0f172a] border-b border-slate-700 flex items-center px-4 justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded bg-[#f7931a] flex items-center justify-center text-[10px] font-bold text-white">BTC</div>
                                    <span className="font-bold text-white">BTC/USDT</span>
                                </div>
                                <div className={`text-sm font-mono ${priceChange >= 0 ? 'text-[#4ECDC4]' : 'text-red-500'}`}>
                                    ${currentPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                    <span className="ml-2 text-xs">({priceChange}%)</span>
                                </div>
                            </div>
                            <div className="flex gap-2 text-xs font-mono text-slate-400">
                                <span className="bg-slate-800 px-2 py-1 rounded cursor-pointer hover:text-white">1H</span>
                                <span className="bg-[#4ECDC4]/20 text-[#4ECDC4] px-2 py-1 rounded cursor-pointer">4H</span>
                                <span className="bg-slate-800 px-2 py-1 rounded cursor-pointer hover:text-white">1D</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-12 h-[450px]">
                            {/* Chart Area */}
                            <div className="col-span-9 border-r border-slate-700 p-4 relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={data}>
                                        <defs>
                                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#4ECDC4" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#4ECDC4" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                        <XAxis dataKey="time" hide />
                                        <YAxis domain={['auto', 'auto']} orientation="right" tick={{ fill: '#94a3b8', fontSize: 10 }} stroke="#334155" />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }}
                                            itemStyle={{ color: '#4ECDC4' }}
                                            formatter={(value: number | undefined) => [`$${(value ?? 0).toFixed(2)}`, 'Price']}
                                            labelFormatter={() => ''}
                                        />
                                        <Area type="monotone" dataKey="price" stroke="#4ECDC4" strokeWidth={2} fillOpacity={1} fill="url(#colorPrice)" isAnimationActive={false} />
                                    </AreaChart>
                                </ResponsiveContainer>

                                {/* Buy/Sell Overlay (Decorative) */}
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <div className="bg-green-500/10 border border-green-500/30 text-green-500 px-3 py-1 rounded text-xs font-mono animate-pulse">
                                        BUY SOL @ 142.50
                                    </div>
                                    <div className="bg-red-500/10 border border-red-500/30 text-red-500 px-3 py-1 rounded text-xs font-mono">
                                        SELL ETH @ 2890.10
                                    </div>
                                </div>
                            </div>

                            {/* Order Book */}
                            <div className="col-span-3 bg-[#0f172a] flex flex-col font-mono text-xs">
                                <div className="p-2 border-b border-slate-700 text-slate-400 flex justify-between">
                                    <span>Price</span>
                                    <span>Amt</span>
                                </div>
                                <div className="flex-1 overflow-hidden relative">
                                    {/* Asks (Red) */}
                                    <div className="h-1/2 overflow-hidden flex flex-col-reverse justify-end pb-2">
                                        {Array.from({ length: 12 }).map((_, i) => (
                                            <OrderRow key={`ask-${i}`} type="ask" price={currentPrice + (i + 1) * 5} />
                                        ))}
                                    </div>
                                    <div className="text-center py-2 border-y border-slate-700 text-lg text-white font-bold bg-[#1e293b]">
                                        {currentPrice.toFixed(2)}
                                    </div>
                                    {/* Bids (Green) */}
                                    <div className="h-1/2 overflow-hidden pt-2">
                                        {Array.from({ length: 12 }).map((_, i) => (
                                            <OrderRow key={`bid-${i}`} type="bid" price={currentPrice - (i + 1) * 5} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function MetaStat({ label, value }: { label: string, value: string }) {
    return (
        <div className="p-4 bg-[#1e293b]/50 border border-slate-700/50 rounded-lg">
            <div className="text-2xl font-bold text-white mb-1">{value}</div>
            <div className="text-xs text-slate-500 uppercase tracking-widest">{label}</div>
        </div>
    );
}

function OrderRow({ type, price }: { type: 'ask' | 'bid', price: number }) {
    const amount = (Math.random() * 2).toFixed(4);
    const color = type === 'ask' ? 'text-red-400' : 'text-green-400';
    const bg = type === 'ask' ? 'bg-red-500/5' : 'bg-green-500/5';
    const width = `${Math.random() * 100}%`;

    return (
        <div className="flex justify-between px-2 py-0.5 relative group hover:bg-slate-800">
            <div className={`absolute top-0 ${type === 'ask' ? 'right-0' : 'right-0'} h-full ${bg} opacity-50`} style={{ width }} />
            <span className={`${color} relative z-10`}>{price.toFixed(1)}</span>
            <span className="text-slate-500 relative z-10">{amount}</span>
        </div>
    );
}
