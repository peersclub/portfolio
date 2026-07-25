import type { Metadata } from 'next';
import SocialDashboard from '@/components/SocialDashboard';
import { getSocialData } from '@/lib/social';
import './social.css';

export const metadata: Metadata = {
    title: 'Social | Suresh Victor',
    description: 'One page, every channel — live stats from X, Instagram, and Medium.',
};

export const revalidate = 3600;

export default async function SocialPage() {
    const data = await getSocialData();
    return (
        <div className="sc-page">
            <span className="sc-label">Social — Live</span>
            <h1 className="sc-h1">
                Every channel, <em>one signal.</em>
            </h1>
            <p className="sc-lede">
                My public presence, pooled and measured in real time — follower counts and post
                totals fetched live from each platform, essays straight from the Medium feed.
            </p>
            <SocialDashboard data={data} />
        </div>
    );
}
