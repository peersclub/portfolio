'use client';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Baby, Ruler } from 'lucide-react';

const data = [
    { month: '0', weight: 3.2, user: 3.3, height: 49 },
    { month: '2', weight: 5.6, user: 5.8, height: 58 },
    { month: '4', weight: 7.0, user: 6.9, height: 64 },
    { month: '6', weight: 7.9, user: 8.1, height: 68 },
    { month: '8', weight: 8.5, user: 8.8, height: 71 },
    { month: '10', weight: 9.2, user: 9.5, height: 73 },
    { month: '12', weight: 9.6, user: 10.1, height: 75.7 },
];

export default function GrowthTracker() {
    const [metric, setMetric] = useState('weight'); // 'weight' or 'height'

    return (
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
            >
                <div className="flex items-center gap-2 mb-4">
                    <span className="p-2 bg-[#FCE7F3] rounded-lg text-[#DB2777]">
                        <Activity size={20} />
                    </span>
                    <span className="text-[#9D174D] font-bold uppercase text-sm tracking-wider">Milestone Tracker</span>
                </div>
                <h2 className="text-4xl font-bold text-[#831843] mb-6">
                    Data-Driven <br />
                    <span className="text-[#DB2777]">Parenting</span>
                </h2>
                <p className="text-[#9D174D] text-lg mb-8 leading-relaxed">
                    We digitized the standard WHO growth charts, enabling parents to track their child's
                    development in real-time. Automated alerts help identify potential health concerns early.
                </p>

                <div className="flex gap-4">
                    <button
                        onClick={() => setMetric('weight')}
                        className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${metric === 'weight' ? 'bg-[#DB2777] text-white shadow-lg' : 'bg-white border border-pink-200 text-[#DB2777]'}`}
                    >
                        <Baby size={18} /> Weight
                    </button>
                    <button
                        onClick={() => setMetric('height')}
                        className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${metric === 'height' ? 'bg-[#DB2777] text-white shadow-lg' : 'bg-white border border-pink-200 text-[#DB2777]'}`}
                    >
                        <Ruler size={18} /> Height
                    </button>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="bg-white p-6 rounded-3xl shadow-xl border border-pink-100 h-[400px]"
            >
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorUser" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#DB2777" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#DB2777" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="month" stroke="#9ca3af" tickLine={false} />
                        <YAxis stroke="#9ca3af" tickLine={false} domain={['auto', 'auto']} />
                        <Tooltip
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                            formatter={(value: number | undefined) => [value ?? 0, metric === 'weight' ? 'kg' : 'cm']}
                        />
                        <Area
                            type="monotone"
                            dataKey={metric === 'weight' ? 'website' : 'height'}
                            stroke="#E5E7EB"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            fill="transparent"
                            name="WHO Standard"
                        />
                        <Area
                            type="monotone"
                            dataKey={metric === 'weight' ? 'user' : 'height'}
                            stroke="#DB2777"
                            strokeWidth={3}
                            fill="url(#colorUser)"
                            name="Your Baby"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </motion.div>
        </div>
    );
}
