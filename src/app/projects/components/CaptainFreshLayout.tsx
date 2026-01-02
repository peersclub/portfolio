'use client';

import { Project } from '@/data/projects';
import NeuralLayout from './NeuralOcean/NeuralLayout';

interface CaptainFreshLayoutProps {
    project: Project;
}

export default function CaptainFreshLayout({ project }: CaptainFreshLayoutProps) {
    return <NeuralLayout project={project} />;
}
