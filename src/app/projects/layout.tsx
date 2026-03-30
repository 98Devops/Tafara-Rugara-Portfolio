import { Metadata } from 'next';
import { generatePageMetadata } from '@/components/SEO';
import { StructuredData } from '@/components/StructuredData';

export const metadata: Metadata = generatePageMetadata('projects');

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData pageKey="projects" />
      {children}
    </>
  );
}
