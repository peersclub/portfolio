import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { sharingResources } from '@/data/sharing';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sureshvictor.com';

export default function sitemap(): MetadataRoute.Sitemap {
    // /mylife and /network are deliberate easter eggs — reachable, but not indexed destinations
    const staticRoutes: MetadataRoute.Sitemap = [
        { url: `${SITE_URL}/`, priority: 1 },
        { url: `${SITE_URL}/projects`, priority: 0.9 },
        { url: `${SITE_URL}/about`, priority: 0.9 },
        { url: `${SITE_URL}/resume`, priority: 0.9 },
        { url: `${SITE_URL}/sharing`, priority: 0.8 },
        { url: `${SITE_URL}/contact`, priority: 0.8 },
    ];

    const projectRoutes: MetadataRoute.Sitemap = projects.map(p => ({
        url: `${SITE_URL}/projects/${p.slug}`,
        priority: p.featured ? 0.8 : 0.6,
    }));

    const sharingRoutes: MetadataRoute.Sitemap = sharingResources.map(r => ({
        url: `${SITE_URL}/sharing/${r.slug}`,
        priority: 0.7,
    }));

    return [...staticRoutes, ...projectRoutes, ...sharingRoutes];
}
