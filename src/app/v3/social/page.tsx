import type { Metadata } from 'next';
import SocialDashboard from '@/components/SocialDashboard';
import { getSocialData } from '@/lib/social';
import { Converge, Curtain, Lines } from '../components/kinetic';
import V3Nav from '../components/V3Nav';
import '../v3.css';
import '@/app/social/social.css';

export const metadata: Metadata = {
    title: 'Social — Third Edition',
    description: 'Every channel, one signal — live social presence.',
};

export const revalidate = 3600;

export default async function V3SocialPage() {
    const data = await getSocialData();
    return (
        <div className="v3 v3-social">
            <Curtain />
            <V3Nav />
            <section className="v3-section">
                <span className="v3-label">04 — Social, live</span>
                <Converge left="Every channel," right="one signal." as="h1" className="v3-h2" />
                <Lines
                    as="p"
                    className="v3-story-body v3-play-note"
                    text="The public presence, pooled and measured — live follower counts, post totals, and essays pulled straight from each platform."
                />
                <SocialDashboard data={data} />
            </section>
        </div>
    );
}
