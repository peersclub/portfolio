import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects, getProjectBySlug } from '@/data/projects';
import { getRole, formatPeriod } from '@/data/career';
import CaseStudy from '@/components/CaseStudy/CaseStudy';
import CaseStudyBar from '@/components/CaseStudyBar/CaseStudyBar';
import Footer from '@/components/Footer/Footer';

// Every case study renders from data/career.ts (resume facts) through one
// template, statically at build time.
export function generateStaticParams() {
    return projects.map(p => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const project = getProjectBySlug(slug);
    const role = getRole(slug);
    if (!project || !role) return {};
    const title = `${project.company}: ${role.title} | Suresh Victor`;
    const description = `${role.title} at ${project.company}, ${formatPeriod(role)}. ${project.tagline}.`;
    return {
        title,
        description,
        alternates: { canonical: `/projects/${slug}` },
        openGraph: { title, description, type: 'article' },
    };
}

export default async function ProjectCaseStudy({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);
    if (!project) notFound();

    const i = projects.findIndex(p => p.slug === slug);
    const next = projects[(i + 1) % projects.length];

    return (
        <>
            <CaseStudyBar project={project} />
            <CaseStudy project={project} next={next} />
            <Footer />
        </>
    );
}
