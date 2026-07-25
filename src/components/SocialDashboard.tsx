// The social-presence dashboard — one markup, three skins. Base styles in
// src/app/social/social.css (v1 tokens); v2.css/v3.css re-skin `.sc-*`
// under their edition roots. Server-safe (no client hooks).

import type { CSSProperties } from 'react';
import type { SocialData } from '@/lib/social';

const fmt = (n: number | null) => (n === null ? '—' : n.toLocaleString('en-US'));

export default function SocialDashboard({ data }: { data: SocialData }) {
    const { platforms, mediumPosts, analytics } = data;

    const followerBars = platforms.filter((p) => p.followers !== null);
    const maxFollowers = Math.max(...followerBars.map((p) => p.followers ?? 0));
    const postBars = platforms.filter((p) => p.posts !== null);
    const maxPosts = Math.max(...postBars.map((p) => p.posts ?? 0));
    const maxYear = Math.max(...analytics.postsByYear.map((y) => y.count), 1);

    return (
        <>
            <div className="sc-tiles">
                <div className="sc-tile">
                    <span className="sc-tile-value">{fmt(analytics.totalFollowers)}</span>
                    <span className="sc-tile-label">followers · X + Instagram</span>
                </div>
                <div className="sc-tile">
                    <span className="sc-tile-value">{fmt(analytics.totalPosts)}</span>
                    <span className="sc-tile-label">public posts, all platforms</span>
                </div>
                <div className="sc-tile">
                    <span className="sc-tile-value">{analytics.yearsOnline}+</span>
                    <span className="sc-tile-label">years posting · since 2010</span>
                </div>
                <div className="sc-tile">
                    <span className="sc-tile-value">{analytics.platformCount}</span>
                    <span className="sc-tile-label">active platforms</span>
                </div>
            </div>

            <div className="sc-grid">
                <div className="sc-card">
                    <h2 className="sc-card-title">Followers by platform</h2>
                    <div className="sc-bars">
                        {followerBars.map((p) => (
                            <div className="sc-bar-row" key={`f-${p.id}`} title={`${p.name}: ${fmt(p.followers)} followers`}>
                                <span className="sc-bar-name">
                                    <span className="sc-swatch" style={{ background: p.color }} />
                                    {p.name}
                                </span>
                                <div className="sc-track">
                                    <div
                                        className="sc-fill"
                                        style={{ width: `${((p.followers ?? 0) / maxFollowers) * 100}%`, background: p.color }}
                                    />
                                </div>
                                <span className="sc-bar-value">{fmt(p.followers)}</span>
                            </div>
                        ))}
                    </div>
                    <h2 className="sc-card-title">Public posts by platform</h2>
                    <div className="sc-bars">
                        {postBars.map((p) => (
                            <div className="sc-bar-row" key={`p-${p.id}`} title={`${p.name}: ${fmt(p.posts)} posts`}>
                                <span className="sc-bar-name">
                                    <span className="sc-swatch" style={{ background: p.color }} />
                                    {p.name}
                                </span>
                                <div className="sc-track">
                                    <div
                                        className="sc-fill"
                                        style={{ width: `${((p.posts ?? 0) / maxPosts) * 100}%`, background: p.color }}
                                    />
                                </div>
                                <span className="sc-bar-value">{fmt(p.posts)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="sc-card">
                    <h2 className="sc-card-title">Essays on Medium — publishing history</h2>
                    <div className="sc-years">
                        {analytics.postsByYear.map((y) => (
                            <div className="sc-year" key={y.year} title={`${y.year}: ${y.count} essay${y.count > 1 ? 's' : ''}`}>
                                <div className="sc-year-bar" style={{ height: `${(y.count / maxYear) * 100}%` }} />
                                <span className="sc-year-label">{String(y.year).slice(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="sc-essays">
                        {mediumPosts.slice(0, 5).map((post) => (
                            <a className="sc-essay" key={post.url} href={post.url} target="_blank" rel="noopener noreferrer">
                                <span>{post.title}</span>
                                <time>{new Date(post.date).getFullYear()}</time>
                            </a>
                        ))}
                    </div>
                    {analytics.topTags.length > 0 && (
                        <div className="sc-tags">
                            {analytics.topTags.map((t) => (
                                <span className="sc-tag" key={t}>
                                    {t}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="sc-platforms">
                {platforms.map((p) => (
                    <a
                        key={p.id}
                        className="sc-platform"
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ '--pc': p.color } as CSSProperties}
                    >
                        <div className="sc-platform-head">
                            <span className="sc-platform-name">{p.name}</span>
                            <span className="sc-platform-handle">{p.handle}</span>
                        </div>
                        <p className="sc-platform-note">{p.note}</p>
                        <div className="sc-platform-stats">
                            {p.followers !== null && (
                                <span>
                                    <b>{fmt(p.followers)}</b> followers
                                </span>
                            )}
                            {p.posts !== null && (
                                <span>
                                    <b>{fmt(p.posts)}</b> posts
                                </span>
                            )}
                            <span className={`sc-live ${p.live ? 'sc-live--on' : ''}`}>
                                <span className="sc-live-dot" />
                                {p.live ? 'live' : `as of ${p.asOf}`}
                            </span>
                        </div>
                    </a>
                ))}
            </div>

            <p className="sc-foot">
                Fetched {new Date(analytics.lastFetched).toUTCString()} · refreshes hourly · X via
                fxtwitter · Instagram via web profile API · Medium via RSS · LinkedIn identity via
                LinkedIn API
            </p>
        </>
    );
}
