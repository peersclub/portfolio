import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact | Suresh Victor',
    description: "Get in touch with Suresh Victor — WhatsApp, call, or email. Based in Bangalore, India.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
