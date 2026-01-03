'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";
import { Navigation, MapPin, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

const INDIA_TOPO_JSON = "https://raw.githubusercontent.com/udit-001/india-maps-data/master/topojson/india.json";

const LOCATIONS = [
    { id: 'pulicut', name: 'Pulicut', coordinates: [80.32, 13.42], quote: "The lake takes hours to navigate. By the time we reach market, the price has dropped.", type: "Start" },
    { id: 'ennore', name: 'Ennore', coordinates: [80.22, 13.22], quote: "The thermal plant's warm water changes fish patterns. We don't know where they go.", type: "Climate" },
    { id: 'kasimedu', name: 'Kasimedu', coordinates: [80.29, 13.12], quote: "Auction is chaos. If you don't have a contact, you sell at a loss.", type: "Hub" },
    { id: 'kovalam', name: 'Kovalam', coordinates: [80.25, 12.79], quote: "Foreign vessels fish 12 nautical miles out. We can only go 5.", type: "Competition" },
    { id: 'mahabalipuram', name: 'Mahabalipuram', coordinates: [80.19, 12.62], quote: "Tourism helps, but we're pushed further from shore every year.", type: "Displacement" },
    { id: 'kalpakkam', name: 'Kalpakkam', coordinates: [80.16, 12.56], quote: "Nuclear plant means our best fishing ground is now a 'no-go zone'.", type: "Exclusion" },
    { id: 'pondicherry', name: 'Pondicherry', coordinates: [79.83, 11.93], quote: "French tourists buy our catch at good prices, but only in season.", type: "Tourism" },
    { id: 'cuddalore', name: 'Cuddalore', coordinates: [79.76, 11.74], quote: "Pollution from the factories is killing the prawns near the shore.", type: "Pollution" },
    { id: 'parangipettai', name: 'Parangipettai', coordinates: [79.76, 11.49], quote: "Our women spend 6 hours drying fish. One rain destroys a week's work.", type: "Processing" },
    { id: 'pichavaram', name: 'Pichavaram', coordinates: [79.77, 11.43], quote: "The mangroves protected us from tsunamis. Now they're being cut.", type: "Ecology" },
    { id: 'chidambaram', name: 'Chidambaram', coordinates: [79.69, 11.39], quote: "Temple town. Fishermen are low caste here. Banks don't give us loans.", type: "Social" },
    { id: 'nagapattinam', name: 'Nagapattinam', coordinates: [79.84, 10.76], quote: "Diesel costs eat 60% of our earnings. One bad trip means debt.", type: "Crisis" },
    { id: 'velankanni', name: 'Velankanni', coordinates: [79.84, 10.68], quote: "Pilgrims come for the church. Nobody notices we're starving next door.", type: "Contrast" },
    { id: 'vedaranyam', name: 'Vedaranyam', coordinates: [79.85, 10.37], quote: "Salt pans took our fishing grounds. We work for ₹200/day now.", type: "Land Loss" },
    { id: 'pt_calimere', name: 'Point Calimere', coordinates: [79.86, 10.29], quote: "It's a bird sanctuary now. We can't fish where our fathers did.", type: "Conservation" },
    { id: 'devipatinam', name: 'Devipatinam', coordinates: [79.26, 9.44], quote: "We used to trade with Sri Lanka. Now there's an invisible line.", type: "Border" },
    { id: 'rameswaram', name: 'Rameswaram', coordinates: [79.31, 9.28], quote: "The Sri Lankan navy arrests us if we drift even a few miles.", type: "Geopolitics" },
    { id: 'pamban', name: 'Pamban', coordinates: [79.21, 9.27], quote: "The bridge is our lifeline. When it's up for ships, we're stranded.", type: "Isolation" },
    { id: 'mandapam', name: 'Mandapam', coordinates: [79.12, 9.28], quote: "CMFRI studies fish. We could tell them in 5 minutes what they learn in years.", type: "Knowledge" },
    { id: 'keelakarai', name: 'Keelakarai', coordinates: [78.78, 9.23], quote: "Sea cucumber diving destroyed my lungs. There's no insurance.", type: "Health" },
    { id: 'ervadi', name: 'Ervadi', coordinates: [78.70, 9.16], quote: "Prawns sell for ₹800/kg in Chennai. We get ₹150 here.", type: "Price Gap" },
    { id: 'vembar', name: 'Vembar', coordinates: [78.38, 9.09], quote: "Chinese nets cost ₹5,000. Lasts 10 years. Killed our net-makers.", type: "Disruption" },
    { id: 'tuticorin', name: 'Thoothukudi', coordinates: [78.14, 8.76], quote: "We have the catch, but no cold storage. It rots before export.", type: "Logistics" },
    { id: 'tiruchendur', name: 'Tiruchendur', coordinates: [78.12, 8.49], quote: "Temple town gets 24/7 electricity. Our ice plant gets 4 hours.", type: "Inequality" },
    { id: 'manapad', name: 'Manapad', coordinates: [78.06, 8.37], quote: "Xavier converted our ancestors. 500 years later, still poorest.", type: "History" },
    { id: 'uvari', name: 'Uvari', coordinates: [78.02, 8.27], quote: "Seaweed pays women ₹100/day. That's more than fishing now.", type: "Alternative" },
    { id: 'colachel', name: 'Colachel', coordinates: [77.25, 8.17], quote: "New port project. 'Relocation' means erased.", type: "Displacement" },
    { id: 'kanyakumari', name: 'Kanyakumari', coordinates: [77.55, 8.08], quote: "Tourists photograph the sunset. Nobody photographs our empty nets.", type: "End" },
];

export default function JourneyMap() {
    const [activeLoc, setActiveLoc] = useState<number>(0);
    const [isAuto, setIsAuto] = useState(true);

    useEffect(() => {
        if (!isAuto) return;
        const interval = setInterval(() => {
            setActiveLoc(prev => (prev + 1) % LOCATIONS.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isAuto]);

    const goNext = () => { setActiveLoc(prev => (prev + 1) % LOCATIONS.length); setIsAuto(false); };
    const goPrev = () => { setActiveLoc(prev => (prev - 1 + LOCATIONS.length) % LOCATIONS.length); setIsAuto(false); };

    return (
        <div className="w-full h-full bg-primary relative overflow-hidden">

            {/* TOP: Progress Timeline */}
            <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-primary via-primary/90 to-transparent pt-4 pb-8 px-6">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <Navigation className="w-4 h-4 text-amber-500" />
                        <span className="text-sm font-bold text-white">Tamil Nadu Coast</span>
                        <span className="text-xs text-slate-500 font-mono">• {LOCATIONS.length} Villages</span>
                    </div>
                    <button
                        onClick={() => setIsAuto(!isAuto)}
                        className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
                    >
                        {isAuto ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                        {isAuto ? 'Pause' : 'Play'}
                    </button>
                </div>

                {/* Progress Dots */}
                <div className="flex items-center gap-1">
                    {LOCATIONS.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => { setActiveLoc(index); setIsAuto(false); }}
                            className={`h-1.5 rounded-full transition-all duration-300 ${index === activeLoc
                                ? 'w-6 bg-amber-500'
                                : index < activeLoc
                                    ? 'w-1.5 bg-amber-500/50'
                                    : 'w-1.5 bg-slate-700 hover:bg-slate-600'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* MAP */}
            <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                    scale: 3000,
                    center: [79, 10.5]
                }}
                style={{ width: "100%", height: "100%" }}
            >
                <Geographies geography={INDIA_TOPO_JSON}>
                    {({ geographies }) =>
                        geographies.map((geo) => {
                            const isTN = geo.properties.NAME_1 === "Tamil Nadu";
                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill={isTN ? "var(--bg-tertiary)" : "var(--bg-secondary)"}
                                    stroke={isTN ? "var(--glass-border)" : "var(--glass-border)"}
                                    strokeWidth={isTN ? 1 : 0.3}
                                    style={{
                                        default: { outline: "none" },
                                        hover: { outline: "none" },
                                        pressed: { outline: "none" },
                                    }}
                                />
                            );
                        })
                    }
                </Geographies>

                {/* Route Line */}
                <Line
                    coordinates={LOCATIONS.map(l => l.coordinates) as [number, number][]}
                    stroke="var(--color-warning)"
                    strokeWidth={2}
                    strokeOpacity={0.6}
                    strokeLinecap="round"
                />

                {/* Markers */}
                {LOCATIONS.map((loc, index) => {
                    const isActive = activeLoc === index;
                    const isPast = index < activeLoc;
                    return (
                        <Marker key={loc.id} coordinates={loc.coordinates as [number, number]}>
                            <circle
                                r={isActive ? 8 : 4}
                                fill={isActive ? "var(--color-warning)" : isPast ? "var(--color-warning)" : "var(--text-muted)"}
                                fillOpacity={isActive ? 1 : isPast ? 0.5 : 1}
                                stroke="var(--bg-primary)"
                                strokeWidth={2}
                            />
                            {isActive && (
                                <circle r={16} fill="rgba(245, 158, 11, 0.2)" className="animate-ping" />
                            )}
                        </Marker>
                    );
                })}
            </ComposableMap>

            {/* SIDE NAVIGATION ARROWS */}
            <button
                onClick={goPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-secondary/80 border border-glass flex items-center justify-center text-muted hover:text-primary hover:border-accent transition-all"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>
            <button
                onClick={goNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-secondary/80 border border-glass flex items-center justify-center text-muted hover:text-primary hover:border-accent transition-all"
            >
                <ChevronRight className="w-5 h-5" />
            </button>

            {/* BOTTOM: Quote Card */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeLoc}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-slate-900 via-slate-900/95 to-transparent pt-12 pb-6 px-6"
                >
                    <div className="max-w-xl mx-auto">
                        <div className="flex items-center gap-3 mb-3">
                            <MapPin className="w-5 h-5 text-amber-500" />
                            <span className="text-xl font-bold text-white">{LOCATIONS[activeLoc].name}</span>
                            <span className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full font-mono">
                                {LOCATIONS[activeLoc].type}
                            </span>
                            <span className="ml-auto text-xs text-slate-500 font-mono">
                                {activeLoc + 1} of {LOCATIONS.length}
                            </span>
                        </div>

                        <blockquote className="text-lg text-secondary-foreground leading-relaxed italic border-l-2 border-amber-500/50 pl-4">
                            "{LOCATIONS[activeLoc].quote}"
                        </blockquote>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
