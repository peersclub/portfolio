import type { Metadata } from 'next';
import KnowledgeGraph from '@/components/KnowledgeGraph/KnowledgeGraph';

export const metadata: Metadata = {
  title: 'Suresh Victor | Network Atlas',
  description: 'Interactive LinkedIn knowledge graph — 11,658 connections mapped across companies, roles, interests, and hashtags.',
};

export default function NetworkPage() {
  return <KnowledgeGraph />;
}
