import type { Metadata } from 'next';
import LabIndex from '@/components/Lab/LabIndex';
import '@/app/social/social.css';

export const metadata: Metadata = {
    title: 'Lab | Suresh Victor',
    description:
        'Products I built on my own time, the date I started each one, and the dated launches that came after.',
};

export default function LabPage() {
    return (
        <div className="sc-page">
            <span className="sc-label">Lab — Built on my own time</span>
            <h1 className="sc-h1">
                Early bets, <em>with receipts.</em>
            </h1>
            <p className="sc-lede">
                Four products I started outside my day job: what each one does, why it exists,
                the dated launches that came after I started, and what already existed, so
                nothing here claims to be first.
            </p>
            <LabIndex />
        </div>
    );
}
