import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sureshvictor.com';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            // Internal design-system explorer, not meant for search results
            disallow: ['/design'],
        },
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
