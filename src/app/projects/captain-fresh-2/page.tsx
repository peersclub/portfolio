'use client';

import { Project } from '@/data/projects';
import StoryLayout from '../components/CaptainFreshStory/StoryLayout';

// Mock project data matching the Project interface
const projectData: Project = {
    slug: 'captain-fresh-2',
    year: '2023',
    company: 'Captain Fresh',
    title: 'Captain Fresh: The Human Story',
    tagline: 'Empowering the coast, one fisherman at a time',
    description: 'A digital platform empowering 16M fishermen across India\'s 7,517km coastline with real-time border alerts, weather forecasts, and market access.',
    metrics: [
        { label: 'Fishermen', value: '16M' },
        { label: 'Villages', value: '30+' },
        { label: 'Income Increase', value: '40%' }
    ],
    role: 'Product Architect',
    tech: ['Next.js', 'React', 'Recharts', 'Framer Motion'],
    color: '#3b82f6'
};

export default function CaptainFreshStoryPage() {
    return (
        <main>
            <StoryLayout project={projectData} />
        </main>
    );
}
