import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const steps = [
    {
        title: "The Friction",
        subtitle: "Fragmented & Offline",
        description: "Before digitization, the supply chain was opaque. 30% of daily catch was lost to spoilage due to inefficient, manual matchmaking and lack of cold chain visibility.",
        visualId: "chaos"
    },
    {
        title: "The Sensor Grid",
        subtitle: "Digitizing the Source",
        description: "We deployed a network of apps to thousands of fishermen. Every catch, every boat, and every harbor became a data point in our 'Sensor Mesh', creating a real-time digital twin of the coastline.",
        visualId: "grid"
    },
    {
        title: "Algorithmic Matching",
        subtitle: "Demand Prediction",
        description: "Our AI engine analyzes historical data and real-time inputs to predict demand. It matches catch to buyers instantly, often before the boat even docks.",
        visualId: "algo"
    },
    {
        title: "Precision Logistics",
        subtitle: "The Cold Tunnel",
        description: "Optimized routing and temperature-monitored trucks ensure the catch travels from coast to city in under 24 hours, maintaining 'Day 0' freshness.",
        visualId: "truck"
    }
];

export default function ProcessFlow() {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <section className="w-full bg-primary text-slate-300 relative snap-start transition-colors duration-500">
            <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row">
                {/* Left: Scrollable Content */}
                <div className="w-full md:w-1/2">
                    {steps.map((step, index) => (
                        <StepItem key={index} step={step} index={index} setActiveStep={setActiveStep} />
                    ))}
                </div>

                {/* Right: Sticky Visuals */}
                <div className="hidden md:flex w-1/2 h-screen sticky top-0 items-center justify-center bg-primary/50 backdrop-blur-sm border-l border-cyan-500/20">
                    <div className="relative w-full max-w-md aspect-square border border-cyan-500/30 rounded-lg bg-secondary overflow-hidden p-6">
                        {/* Tech decoration */}
                        <div className="absolute top-2 left-2 w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                        <div className="absolute top-2 right-2 font-mono text-[10px] text-cyan-500/50">SYS.VISUALIZER.v.2.0</div>

                        <VisualDisplay activeStep={activeStep} />
                    </div>
                </div>
            </div>
        </section>
    );
}

function StepItem({ step, index, setActiveStep }: { step: any, index: number, setActiveStep: (i: number) => void }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

    useEffect(() => {
        if (isInView) setActiveStep(index);
    }, [isInView, index, setActiveStep]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            className="h-screen snap-start flex flex-col justify-center p-8 border-l-2 border-cyan-900/50 pl-12 transition-all duration-500"
        >
            <div className="font-mono text-cyan-400 font-bold text-sm mb-2 tracking-widest uppercase">
                Step 0{index + 1} // <span className="text-cyan-200">{step.subtitle}</span>
            </div>
            <h3 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-primary to-slate-500 mb-6 uppercase tracking-tight relative transition-colors duration-500" style={{ color: 'var(--text-primary)' }}>
                {step.title}
                {/* Decorative underline */}
                <span className="absolute -bottom-2 left-0 w-20 h-1 bg-cyan-500/50"></span>
            </h3>
            <p className="text-lg md:text-xl font-light leading-relaxed text-slate-300 max-w-lg transition-colors duration-500" style={{ color: 'var(--text-muted)' }}>
                {step.description}
            </p>
        </motion.div>
    );
}

function VisualDisplay({ activeStep }: { activeStep: number }) {
    return (
        <div className="w-full h-full flex items-center justify-center relative">
            {activeStep === 0 && <ChaosVisual />}
            {activeStep === 1 && <GridVisual />}
            {activeStep === 2 && <AlgoVisual />}
            {activeStep === 3 && <TruckVisual />}
        </div>
    );
}

// --- Simple CSS/SVG Blueprints for visuals ---

// --- VISUAL COMPONENTS ---

function ChaosVisual() {
    return <FracturedSupplyChain />;
}

function FracturedSupplyChain() {
    // A simulation of a broken, manual supply chain
    // Nodes are erratic, connections break, packets are lost.

    const [packets, setPackets] = useState<{ id: number, x: number, y: number, status: 'fresh' | 'rotting' | 'lost' }[]>([]);
    const [lossValue, setLossValue] = useState(140200);
    const containerRef = useRef<HTMLDivElement>(null);

    // Spawner Loop
    useEffect(() => {
        const spanwer = setInterval(() => {
            if (packets.length > 8) return; // Cap population
            const newPacket = {
                id: Math.random(),
                x: 10 + Math.random() * 20, // Start leftish
                y: 20 + Math.random() * 60, // Random height
                status: 'fresh' as const
            };
            setPackets(prev => [...prev, newPacket]);
        }, 800);

        const ticker = setInterval(() => {
            setLossValue(prev => prev + Math.floor(Math.random() * 150));
        }, 100);

        return () => { clearInterval(spanwer); clearInterval(ticker); };
    }, [packets.length]);

    // Game Loop (Fake physics)
    useEffect(() => {
        const loop = setInterval(() => {
            setPackets(prev => prev.map(p => {
                // Movement logic: Try to go right, but get stuck/lost
                let moveX = 1 + Math.random() * 2;
                let moveY = (Math.random() - 0.5) * 4;

                // Rot logic
                let newStatus = p.status;
                if (p.x > 40 && Math.random() > 0.95) newStatus = 'rotting';
                if (p.x > 70 && Math.random() > 0.9) newStatus = 'lost';

                return {
                    ...p,
                    x: p.x + moveX,
                    y: p.y + moveY,
                    status: newStatus
                };
            }).filter(p => p.x < 90 && p.status !== 'lost')); // Remove if lost or finished (rarely finish)
        }, 50);
        return () => clearInterval(loop);
    }, []);

    return (
        <div className="w-full h-full relative overflow-hidden bg-primary" ref={containerRef}>
            {/* Grid Distortion */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,50,50,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,50,50,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 animate-pulse"></div>

            {/* Red Zones (Blockades) */}
            <motion.div
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-[20%] left-[40%] w-24 h-24 bg-red-900/10 rounded-full blur-xl border border-red-500/20"
            />
            <motion.div
                animate={{ opacity: [0.1, 0.4, 0.1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute bottom-[30%] right-[30%] w-32 h-32 bg-orange-900/10 rounded-full blur-xl border border-orange-500/20"
            />

            {/* Packets */}
            <AnimatePresence>
                {packets.map(p => (
                    <motion.div
                        key={p.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            opacity: 1,
                            scale: 1,
                            backgroundColor: p.status === 'fresh' ? 'var(--color-cyan)' : 'var(--color-error)'
                        }}
                        exit={{ opacity: 0, scale: 2, backgroundColor: 'var(--bg-primary)' }}
                        transition={{ duration: 0.05, ease: "linear" }} // Snappy updates
                        className={`absolute w-3 h-3 rounded-sm shadow-[0_0_10px_currentColor] cursor-not-allowed`}
                    >
                        {/* Connecting Line (Broken) */}
                        <div className="absolute w-12 h-[1px] bg-gradient-to-r from-transparent to-current opacity-50 -right-4 top-1/2 rotate-12 origin-left"></div>

                        {p.status === 'rotting' && (
                            <motion.div
                                initial={{ opacity: 1, y: 0 }}
                                animate={{ opacity: 0, y: -20 }}
                                className="absolute -top-6 left-0 text-[8px] font-mono text-red-500 whitespace-nowrap"
                            >
                                SPOILAGE ALERT
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Floating Errors */}
            <FloatingError x={20} y={30} delay={0} text="MANUAL_ENTRY_REQ" />
            <FloatingError x={60} y={70} delay={2} text="CONNECTION_TIMEOUT" />
            <FloatingError x={80} y={20} delay={1.5} text="DATA_MISMATCH" />

            {/* Analysis Overlay */}
            <div className="absolute bottom-6 right-6 text-right font-mono pointer-events-none">
                <div className="text-[10px] text-red-500/70 mb-1">CUMULATIVE LOSS</div>
                <div className="text-2xl text-red-500 font-bold tracking-tighter">
                    ₹{lossValue.toLocaleString()}
                </div>
            </div>

            {/* Interactive "Hand of God" (Interference) */}
            <motion.div
                className="absolute inset-0 z-50 mix-blend-overlay opacity-30 pointer-events-none"
                animate={{ background: ['radial-gradient(circle at 50% 50%, transparent 10%, black 90%)', 'radial-gradient(circle at 60% 40%, transparent 10%, black 90%)'] }}
                transition={{ duration: 5, repeat: Infinity, repeatType: "mirror" }}
            />
        </div>
    );
}

function FloatingError({ x, y, delay, text }: { x: number, y: number, delay: number, text: string }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3, delay, repeat: Infinity, repeatDelay: Math.random() * 2 }}
            className="absolute px-2 py-1 border border-red-500/50 bg-red-950/80 text-red-400 text-[10px] font-mono shadow-lg backdrop-blur-sm"
            style={{ left: `${x}%`, top: `${y}%` }}
        >
            ⚠️ {text}
        </motion.div>
    );
}

function GridVisual() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative w-full h-full grid grid-cols-6 grid-rows-6 gap-1">
            {[...Array(36)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.02 }}
                    className={`bg-cyan-500/20 rounded-sm ${i % 7 === 0 ? 'bg-cyan-400/60' : ''}`}
                />
            ))}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 border-2 border-cyan-400 rounded-full animate-ping opacity-20"></div>
            </div>
        </motion.div>
    )
}

function AlgoVisual() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4 w-full">
            <div className="flex justify-between w-full px-8">
                <div className="w-16 h-16 border border-cyan-500 rounded flex items-center justify-center font-mono text-xs text-cyan-500">SUPPLY</div>
                <div className="w-16 h-16 border border-green-500 rounded flex items-center justify-center font-mono text-xs text-green-500">DEMAND</div>
            </div>
            {/* Connecting lines */}
            <div className="relative w-full h-32 bg-cyan-900/10 rounded overflow-hidden">
                <motion.div
                    animate={{ y: [0, 100, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-1/2 w-[1px] h-full bg-cyan-500 shadow-[0_0_10px_#00f3ff]"
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                >MATCH</motion.div>
            </div>
        </motion.div>
    )
}

function TruckVisual() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full flex items-center justify-center relative overflow-hidden">
            {/* Moving Road */}
            <div className="absolute inset-0 flex flex-col justify-center gap-8 opacity-20">
                <div className="w-full h-[1px] bg-cyan-500"></div>
                <div className="w-full h-[1px] bg-cyan-500"></div>
                <div className="w-full h-[1px] bg-cyan-500"></div>
            </div>
            {/* Truck/Packet */}
            <motion.div
                animate={{ x: [-100, 100] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="w-12 h-6 border border-cyan-400 bg-cyan-500/20 skew-x-12 flex items-center justify-center"
            >
                <div className="w-full h-full bg-cyan-400/20 blur-sm absolute"></div>
            </motion.div>
            <div className="absolute bottom-4 right-4 font-mono text-xs text-cyan-400">ETA: &lt; 24h</div>
        </motion.div>
    )
}
