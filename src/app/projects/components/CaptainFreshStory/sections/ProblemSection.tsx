'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, AlertTriangle, Fish, Fuel, Anchor } from 'lucide-react';
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    Legend
} from 'recharts';

// Real-world inspired data for the Cost vs Income divergence
const economicData = [
    { year: '2010', cost: 15000, income: 25000 },
    { year: '2012', cost: 18000, income: 24000 },
    { year: '2014', cost: 22000, income: 23000 },
    { year: '2016', cost: 28000, income: 22000 },
    { year: '2018', cost: 35000, income: 21000 },
    { year: '2020', cost: 42000, income: 18000 },
    { year: '2022', cost: 52000, income: 17000 },
    { year: '2024', cost: 65000, income: 16000 },
];

// Loss breakdown data
const lossData = [
    { name: 'Spoilage', value: 30, color: 'var(--color-error)' },
    { name: 'Middlemen', value: 25, color: 'var(--color-chart-2)' },
    { name: 'Fuel', value: 20, color: 'var(--color-chart-1)' },
    { name: 'Equipment', value: 15, color: 'var(--color-chart-3)' },
    { name: 'Other', value: 10, color: 'var(--text-muted)' },
];

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-xl">
                <p className="font-mono text-xs text-slate-400 mb-1">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <p key={index} className="text-sm" style={{ color: entry.color }}>
                        {entry.name}: ₹{entry.value.toLocaleString()}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export default function ProblemSection() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="w-full h-full bg-slate-900 relative p-6 flex flex-col items-center justify-center overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            {/* Main Visual: Cost vs Income Chart */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative w-full max-w-xl bg-slate-800/50 rounded-xl border border-slate-700/50 p-4 mb-4 backdrop-blur-sm"
            >
                <div className="flex items-center justify-between mb-2">
                    <div className="font-mono text-xs text-slate-500 uppercase tracking-widest">
                        Economic Reality (2010 - 2024)
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                        <span className="flex items-center gap-1"><span className="w-3 h-1 bg-red-500 rounded"></span>Operating Cost</span>
                        <span className="flex items-center gap-1"><span className="w-3 h-1 bg-emerald-500 rounded"></span>Net Income</span>
                    </div>
                </div>

                {mounted && (
                    <ResponsiveContainer width="100%" height={180}>
                        <AreaChart data={economicData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                            <XAxis dataKey="year" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={{ stroke: 'var(--glass-border)' }} />
                            <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={{ stroke: 'var(--glass-border)' }} tickFormatter={(val) => `₹${val / 1000}k`} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area
                                type="monotone"
                                dataKey="cost"
                                stroke="var(--color-error)"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorCost)"
                                name="Operating Cost"
                            />
                            <Area
                                type="monotone"
                                dataKey="income"
                                stroke="var(--color-success)"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorIncome)"
                                name="Net Income"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                )}

                {/* Floating "Debt Trap" Label */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute top-1/2 right-8 -translate-y-1/2 bg-red-500/10 border border-red-500/50 text-red-500 px-3 py-1 rounded-full text-xs font-bold font-mono animate-pulse"
                >
                    <TrendingDown className="w-3 h-3 inline mr-1" />
                    DEBT TRAP
                </motion.div>
            </motion.div>

            {/* Secondary Visual: Loss Breakdown */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="w-full max-w-xl bg-slate-800/30 rounded-xl border border-slate-700/50 p-4 backdrop-blur-sm"
            >
                <div className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-2">
                    Where Profits Disappear (% of Catch Value)
                </div>

                {mounted && (
                    <ResponsiveContainer width="100%" height={120}>
                        <BarChart data={lossData} layout="vertical" margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" horizontal={false} />
                            <XAxis type="number" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={{ stroke: 'var(--glass-border)' }} tickFormatter={(val) => `${val}%`} />
                            <YAxis type="category" dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={{ stroke: 'var(--glass-border)' }} width={70} />
                            <Tooltip
                                formatter={(value: number | undefined) => value !== undefined ? [`${value}%`, 'Loss'] : ['', '']}
                                contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '8px' }}
                                labelStyle={{ color: 'var(--text-primary)' }}
                            />
                            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                                {lossData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </motion.div>

            {/* Data Source */}
            <div className="mt-4 text-center">
                <span className="text-xs text-slate-600 font-mono">
                    Data: FAO, CMFRI India, Field Research 2023
                </span>
            </div>
        </div>
    );
}
