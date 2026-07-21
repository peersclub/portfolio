'use client';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Search } from 'lucide-react';
import { useState } from 'react';

const activities = [
    { id: 1, x: 20, y: 30, title: 'Piano Class', category: 'Music' },
    { id: 2, x: 60, y: 40, title: 'Robotics', category: 'Tech' },
    { id: 3, x: 40, y: 70, title: 'Swimming', category: 'Sports' },
    { id: 4, x: 80, y: 20, title: 'Art Workshop', category: 'Art' },
    { id: 5, x: 30, y: 50, title: 'Math Club', category: 'Education' },
];

export default function ActivityMap() {
    const [selected, setSelected] = useState<number | null>(null);

    return (
        <section className="h-screen w-full flex items-center justify-center bg-[#EFF6FF] px-4 overflow-hidden">
            <div className="max-w-6xl w-full grid md:grid-cols-12 gap-12 items-center">
                {/* Sidebar */}
                <motion.div
                    className="md:col-span-4"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                >
                    <div className="inline-block px-4 py-1 bg-white rounded-full border border-blue-200 text-[#2563EB] text-sm font-bold tracking-wide uppercase mb-4 shadow-sm">
                        Hyper-local Discovery
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-[#1e3a8a] mb-6">
                        Explore Your <br />
                        <span className="text-[#3B82F6]">Neighborhood</span>
                    </h2>
                    <p className="text-[#1e40af] text-lg mb-8 leading-relaxed">
                        We mapped over 10,000 verified activities across Delhi NCR.
                        Parents could find, filter, and book trusted classes within a 5km radius.
                    </p>

                    <div className="bg-white p-4 rounded-xl shadow-lg border border-blue-100 flex items-center gap-4">
                        <div className="bg-[#EFF6FF] p-3 rounded-lg text-[#3B82F6]">
                            <Search size={24} />
                        </div>
                        <div>
                            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Search Trend</div>
                            <div className="font-bold text-[#1e3a8a]">"Guitar classes near GK-1"</div>
                        </div>
                    </div>
                </motion.div>

                {/* Map UI */}
                <div className="md:col-span-8 relative h-[600px] bg-[#BFDBFE] rounded-[40px] border-8 border-white shadow-2xl overflow-hidden group">
                    {/* Map Background Pattern */}
                    <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/city-fields.png')] bg-cover mix-blend-multiply" />

                    {/* Streets (Abstract) */}
                    <svg className="absolute inset-0 w-full h-full stroke-white stroke-[8] opacity-50">
                        <path d="M-50 100 L 400 150 L 600 50" fill="none" />
                        <path d="M100 600 L 150 300 L 800 200" fill="none" />
                        <path d="M500 0 L 450 600" fill="none" />
                    </svg>

                    {/* User Location */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                        <div className="w-8 h-8 bg-[#2563EB] border-4 border-white rounded-full shadow-lg animate-pulse" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#3B82F6]/20 rounded-full animate-ping" />
                    </div>

                    {/* Pins */}
                    {activities.map((act) => (
                        <MapPinItem
                            key={act.id}
                            act={act}
                            active={selected === act.id}
                            onClick={() => setSelected(act.id)}
                        />
                    ))}

                    {/* Floating UI overlay */}
                    <div className="absolute bottom-6 right-6">
                        <button className="bg-white p-3 rounded-full shadow-lg text-[#2563EB] hover:scale-110 transition-transform">
                            <Navigation size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

function MapPinItem({ act, active, onClick }: any) {
    return (
        <motion.div
            className="absolute cursor-pointer z-20"
            style={{ left: `${act.x}%`, top: `${act.y}%` }}
            whileHover={{ scale: 1.2 }}
            animate={{ scale: active ? 1.2 : 1 }}
            onClick={onClick}
        >
            <div className={`
                relative flex items-center justify-center w-12 h-12 rounded-full 
                shadow-xl border-4 border-white transition-colors duration-300
                ${active ? 'bg-[#F59E0B]' : 'bg-[#3B82F6]'}
             `}>
                <MapPin className="text-white w-6 h-6" />

                {/* Popover */}
                {active && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-full mb-3 bg-white px-4 py-2 rounded-xl shadow-xl whitespace-nowrap"
                    >
                        <div className="font-bold text-[#1e3a8a]">{act.title}</div>
                        <div className="text-xs text-slate-400 font-bold uppercase">{act.category}</div>
                        <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45" />
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}
