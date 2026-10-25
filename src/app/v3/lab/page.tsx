import type { Metadata } from 'next';
import LabIndex from '@/components/Lab/LabIndex';
import { Converge, Curtain, Lines } from '../components/kinetic';
import V3Nav from '../components/V3Nav';
import '../v3.css';

export const metadata: Metadata = {
    title: 'Lab — Third Edition',
    description: 'Products built on my own time, and what the market shipped after.',
};

export const revalidate = 86400;

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
                    text="Five ideas I started before Anthropic, Datadog, Google, Atlassian, Apple and edelkrone shipped their own versions. A sixth that nobody has followed yet."
                />
                <LabIndex />
            </section>
        </div>
    );
}
