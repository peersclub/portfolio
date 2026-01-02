'use client';

import { Project } from '@/data/projects';
import StoryLayout from '../components/CaptainFreshStory/StoryLayout';

// Mock project data if needed, or reuse existing
const projectData: Project = {
    id: 'captain-fresh-2',
    slug: 'captain-fresh-2',
    title: 'Captain Fresh: The Human Story',
    description: 'Empowering the coast, one fisherman at a time.',
    thumbnail: '/images/projects/captain-fresh-thumb.jpg',
    role: 'Product Architect',
    timeline: '2023 - Present',
    tech: ['Next.js', 'React', 'Tailwind', 'Framer Motion'],
    liveUrl: 'https://captainfresh.in',
    featured: false,
    content: ''
};

export default function CaptainFreshStoryPage() {
    return (
        <main>
            <StoryLayout project={projectData} />
        </main>
    );
}
