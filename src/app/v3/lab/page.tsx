import type { Metadata } from 'next';
import LabIndex from '@/components/Lab/LabIndex';
import { Converge, Curtain, Lines } from '../components/kinetic';
import V3Nav from '../components/V3Nav';
import '../v3.css';

export const metadata: Metadata = {
    title: 'Lab — Third Edition',
    description: 'Products built on my own time, and what the market shipped after.',
};

export default function V3LabPage() {
    return (
        <div className="v3 v3-lab">
            <Curtain />
            <V3Nav />
            <section className="v3-section">
                <span className="v3-label">05 — Lab, own time</span>
                <Converge left="Early bets," right="with receipts." as="h1" className="v3-h2" />
                <Lines
                    as="p"
                    className="v3-story-body v3-play-note"
                    text="Four products I started outside my day job, the dated launches that came after, and what already existed, so nothing here claims to be first."
                />
                <LabIndex />
            </section>
        </div>
    );
}
