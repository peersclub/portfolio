'use client';
import { motion } from 'framer-motion';
import { Users, Stethoscope, ShoppingBag, MessageCircle } from 'lucide-react';

export default function CommunityGraph() {
    return (
        <div className="flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-center mb-16 max-w-3xl"
            >
                <div className="inline-block px-4 py-1 bg-white rounded-full border border-pink-200 text-[#DB2777] text-sm font-bold tracking-wide uppercase mb-4">
                    The Ecosystem
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#831843] mb-6">
                    Connecting the Dots
                </h2>
                <p className="text-[#9D174D] text-lg">
                    We built a trust loop connecting parents seeking advice with verified experts and services,
                    creating a self-reinforcing flywheel of engagement.
                </p>
            </motion.div>

            <div className="relative w-full max-w-4xl h-[500px] flex items-center justify-center">
                {/* Central Ring - Parents */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                    className="absolute w-[300px] h-[300px] border-2 border-dashed border-[#F472B6]/30 rounded-full"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
                    className="absolute w-[500px] h-[500px] border border-[#F472B6]/10 rounded-full"
                />

                {/* Nodes */}
                <GraphNode
                    icon={Users}
                    label="Parents"
                    color="#DB2777"
                    x={0} y={0}
                    main
                />

                <GraphNode
                    icon={MessageCircle}
                    label="Q&A Forum"
                    color="#F472B6"
                    x={-120} y={-100}
                    delay={0.2}
                />
                <GraphNode
                    icon={Stethoscope}
                    label="Doctors"
                    color="#2563EB"
                    x={120} y={-100}
                    delay={0.4}
                />
                <GraphNode
                    icon={ShoppingBag}
                    label="Services"
                    color="#059669"
                    x={0} y={150}
                    delay={0.6}
                />

                {/* Animated Connections */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                    <FlowLine start={{ x: 450, y: 250 }} end={{ x: 350, y: 180 }} color="#DB2777" />
                    <FlowLine start={{ x: 450, y: 250 }} end={{ x: 550, y: 180 }} color="#DB2777" />
                    <FlowLine start={{ x: 450, y: 250 }} end={{ x: 450, y: 380 }} color="#DB2777" />
                </svg>
            </div>
        </div>
    );
}

function GraphNode({ icon: Icon, label, color, x, y, main, delay }: any) {
    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay, type: "spring" }}
            className={`absolute flex flex-col items-center gap-2 z-10 ${main ? 'scale-125' : ''}`}
            style={{
                transform: `translate(${x}px, ${y}px)`,
                marginLeft: x, marginTop: y // Easy centering hack for absolute + flex center parent
            }}
        >
            <div
                className={`w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg border-4 transition-transform hover:scale-110`}
                style={{ borderColor: color }}
            >
                <Icon size={main ? 32 : 24} style={{ color }} />
            </div>
            <div className="font-bold text-slate-700 bg-white/80 px-3 py-1 rounded-full text-sm shadow-sm backdrop-blur-sm">
                {label}
            </div>
        </motion.div>
    );
}

function FlowLine({ start, end, color }: any) {
    // This is simplified, dynamic lines in SVG are tricky with exact px in React without Ref bounding box
    // So omitting complex SVG lines for brevity in this mock, focusing on the nodes placement which tells the story
    return null;
}
