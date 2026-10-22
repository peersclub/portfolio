import type { Metadata } from 'next';
import LabIndex from '@/components/Lab/LabIndex';
import '@/app/social/social.css';

export const metadata: Metadata = {
    title: 'Lab | Suresh Victor',
    description:
        'Products I built on my own time, the date I started each one, and the dated launches that came after.',
};

// the head-start chart draws a "Today" line; rebuild daily so it moves
export const revalidate = 86400;

export default function LabPage() {
    return (
        <div className="sc-page">
            <span className="sc-label">Lab — Built on my own time</span>
            <h1 className="sc-h1">
                Early bets, <em>with receipts.</em>
            </h1>
            <p className="sc-lede">
                Three ideas I started before Anthropic, Datadog, Atlassian and Apple shipped
                their own versions. A fourth that nobody has followed yet.
            </p>
            <LabIndex />
        </div>
    );
}
