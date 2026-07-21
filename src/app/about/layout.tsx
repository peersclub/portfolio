import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About | Suresh Victor',
    description: "Who I am and how I work — product philosophy, process, and the signals that tell us we'd build well together.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
