/** @type {import('next').NextConfig} */
const securityHeaders = [
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const nextConfig = {
    async headers() {
        return [{ source: '/(.*)', headers: securityHeaders }];
    },
    async redirects() {
        return [
            { source: '/playbook', destination: '/about', permanent: true },
            { source: '/therightfit', destination: '/about', permanent: true },
            { source: '/design', destination: '/', permanent: false },
            { source: '/projects/captain-fresh-old', destination: '/projects/captain-fresh', permanent: true },
            { source: '/projects/captain-fresh-2', destination: '/projects/captain-fresh', permanent: true },
        ];
    },
    reactStrictMode: true,
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },
};

export default nextConfig;
