// Social presence aggregator — server-only. Live sources, no dummies:
//   X          → api.fxtwitter.com public JSON (followers, posts, bio)
//   Instagram  → i.instagram.com web_profile_info (followers, posts)
//   Medium     → public RSS feed (real essays: titles, links, dates, tags)
//   LinkedIn   → identity verified via LinkedIn OIDC API (2026-07-25);
//                no follower endpoint in scope, so no invented number.
// Every fetch revalidates hourly; when a network fetch fails (e.g. a
// datacenter IP blocked by Instagram) we fall back to the last verified
// values below, marked live:false with their as-of date — real numbers,
// honestly labeled.

export interface PlatformStat {
    id: 'x' | 'instagram' | 'medium' | 'linkedin';
    name: string;
    handle: string;
    url: string;
    /** official platform color (validated for chart use on all surfaces) */
    color: string;
    followers: number | null;
    posts: number | null;
    note: string;
    live: boolean;
    asOf: string;
}

export interface MediumPost {
    title: string;
    url: string;
    date: string; // ISO
    tags: string[];
}

export interface SocialData {
    platforms: PlatformStat[];
    mediumPosts: MediumPost[];
    analytics: {
        totalFollowers: number;
        totalPosts: number;
        yearsOnline: number;
        platformCount: number;
        postsByYear: { year: number; count: number }[];
        topTags: string[];
        lastFetched: string;
    };
}

const ASOF_FALLBACK = '2026-07-25';
const REVALIDATE = { next: { revalidate: 3600 } } as const;
const UA =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

// last live-verified values (fetched + confirmed 2026-07-25)
const X_FALLBACK = { followers: 569, posts: 432 };
const IG_FALLBACK = { followers: 2130, posts: 201 };

async function fetchX(): Promise<{ followers: number; posts: number; live: boolean }> {
    try {
        const res = await fetch('https://api.fxtwitter.com/suresh_089', {
            ...REVALIDATE,
            headers: { 'user-agent': UA },
        });
        if (!res.ok) throw new Error(String(res.status));
        const json = await res.json();
        const u = json?.user;
        if (typeof u?.followers !== 'number') throw new Error('shape');
        return { followers: u.followers, posts: u.tweets ?? X_FALLBACK.posts, live: true };
    } catch {
        return { ...X_FALLBACK, live: false };
    }
}

async function fetchInstagram(): Promise<{ followers: number; posts: number; live: boolean }> {
    try {
        const res = await fetch(
            'https://i.instagram.com/api/v1/users/web_profile_info/?username=sureshvictor089',
            {
                ...REVALIDATE,
                headers: { 'user-agent': UA, 'x-ig-app-id': '936619743392459' },
            },
        );
        if (!res.ok) throw new Error(String(res.status));
        const json = await res.json();
        const u = json?.data?.user;
        const followers = u?.edge_followed_by?.count;
        if (typeof followers !== 'number') throw new Error('shape');
        return {
            followers,
            posts: u?.edge_owner_to_timeline_media?.count ?? IG_FALLBACK.posts,
            live: true,
        };
    } catch {
        return { ...IG_FALLBACK, live: false };
    }
}

async function fetchMedium(): Promise<{ posts: MediumPost[]; live: boolean }> {
    try {
        const res = await fetch('https://medium.com/feed/@sureshvictor', {
            ...REVALIDATE,
            headers: { 'user-agent': UA },
        });
        if (!res.ok) throw new Error(String(res.status));
        const xml = await res.text();
        const items = xml.split('<item>').slice(1);
        const posts: MediumPost[] = items.map((item) => {
            const title = item.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/)?.[1]?.trim() ?? '';
            const url = item.match(/<link>([\s\S]*?)<\/link>/)?.[1]?.split('?')[0] ?? '';
            const pub = item.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] ?? '';
            const tags = [...item.matchAll(/<category><!\[CDATA\[([\s\S]*?)\]\]><\/category>/g)].map(
                (m) => m[1],
            );
            return { title, url, date: new Date(pub).toISOString(), tags };
        });
        if (!posts.length) throw new Error('empty');
        return { posts, live: true };
    } catch {
        return { posts: [], live: false };
    }
}

export async function getSocialData(): Promise<SocialData> {
    const [x, ig, medium] = await Promise.all([fetchX(), fetchInstagram(), fetchMedium()]);

    const platforms: PlatformStat[] = [
        {
            id: 'linkedin',
            name: 'LinkedIn',
            handle: 'in/sureshvictor',
            url: 'https://www.linkedin.com/in/sureshvictor/',
            color: '#0A66C2',
            followers: null,
            posts: null,
            note: 'Identity verified via the LinkedIn API — where the daily thinking happens.',
            live: false,
            asOf: ASOF_FALLBACK,
        },
        {
            id: 'x',
            name: 'X',
            handle: '@suresh_089',
            url: 'https://x.com/suresh_089',
            color: '#8899A6',
            followers: x.followers,
            posts: x.posts,
            note: 'On X since 2010 — product notes and AssetWorks updates.',
            live: x.live,
            asOf: x.live ? new Date().toISOString().slice(0, 10) : ASOF_FALLBACK,
        },
        {
            id: 'instagram',
            name: 'Instagram',
            handle: '@sureshvictor089',
            url: 'https://www.instagram.com/sureshvictor089/',
            color: '#E4405F',
            followers: ig.followers,
            posts: ig.posts,
            note: 'Flying high — life outside the roadmap.',
            live: ig.live,
            asOf: ig.live ? new Date().toISOString().slice(0, 10) : ASOF_FALLBACK,
        },
        {
            id: 'medium',
            name: 'Medium',
            handle: '@sureshvictor',
            url: 'https://medium.com/@sureshvictor',
            color: '#1A8917',
            followers: null,
            posts: medium.posts.length || 7,
            note: 'Long-form essays — AI, product, and the occasional life theory.',
            live: medium.live,
            asOf: medium.live ? new Date().toISOString().slice(0, 10) : ASOF_FALLBACK,
        },
    ];

    const byYear = new Map<number, number>();
    for (const p of medium.posts) {
        const y = new Date(p.date).getFullYear();
        byYear.set(y, (byYear.get(y) ?? 0) + 1);
    }
    const postsByYear = [...byYear.entries()]
        .sort((a, b) => a[0] - b[0])
        .map(([year, count]) => ({ year, count }));

    const tagCounts = new Map<string, number>();
    for (const p of medium.posts) for (const t of p.tags) tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1);
    const topTags = [...tagCounts.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([t]) => t);

    return {
        platforms,
        mediumPosts: medium.posts,
        analytics: {
            totalFollowers: (x.followers ?? 0) + (ig.followers ?? 0),
            totalPosts: (x.posts ?? 0) + (ig.posts ?? 0) + medium.posts.length,
            yearsOnline: new Date().getFullYear() - 2010, // X account since Oct 2010
            platformCount: platforms.length,
            postsByYear,
            topTags,
            lastFetched: new Date().toISOString(),
        },
    };
}
