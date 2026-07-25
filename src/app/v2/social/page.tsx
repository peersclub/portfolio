import type { Metadata } from 'next';
import SocialDashboard from '@/components/SocialDashboard';
import { getSocialData } from '@/lib/social';
import ThreadStage from '../components/ThreadStage';
import V2Nav from '../components/V2Nav';
import '../v2.css';
import '@/app/social/social.css';

export const metadata: Metadata = {
    title: 'Social — The Gold Thread',
    description: 'Every channel, one signal — live social presence.',
};

export const revalidate = 3600;

export default async function V2SocialPage() {
    const data = await getSocialData();
    return (
        <div className="v2 v2-social">
            {/* small dim knot signing the corner — this is a reading page */}
            <ThreadStage progress={1 / 7} dim={0.3} offset={[4.2, 1.9, -2.6]} poseScale={0.6} />
            <V2Nav />
            <div className="v2-page v2-page--shield">
                <header className="v2-page-head v2-page-head--left">
                    <span className="v2-label">Social — Live</span>
                    <h1 className="v2-page-title">
                        Every channel, <em>one thread.</em>
                    </h1>
                    <p className="v2-lede">
                        The public presence, pooled and measured — live follower counts, post
                        totals, and essays pulled straight from each platform.
                    </p>
                </header>
                <SocialDashboard data={data} />
            </div>
        </div>
    );
}
