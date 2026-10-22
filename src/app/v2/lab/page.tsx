import type { Metadata } from 'next';
import LabIndex from '@/components/Lab/LabIndex';
import ThreadStage from '../components/ThreadStage';
import V2Nav from '../components/V2Nav';
import '../v2.css';

export const metadata: Metadata = {
    title: 'Lab — The Gold Thread',
    description: 'Products built on my own time, and what the market shipped after.',
};

export default function V2LabPage() {
    return (
        <div className="v2 v2-lab">
            {/* small dim knot signing the corner — this is a reading page */}
            <ThreadStage progress={6 / 7} dim={0.3} offset={[4.2, 1.9, -2.6]} poseScale={0.6} />
            <V2Nav />
            <div className="v2-page v2-page--shield">
                <header className="v2-page-head v2-page-head--left">
                    <span className="v2-label">Lab — Own time</span>
                    <h1 className="v2-page-title">
                        Early bets, with <em>receipts.</em>
                    </h1>
                    <p className="v2-lede">
                        Four products I started outside my day job, the dated launches that came
                        after, and what already existed, so nothing here claims to be first.
                    </p>
                </header>
                <LabIndex />
            </div>
        </div>
    );
}
