import { Metadata } from 'next';
import { generatePageMetadata } from '@/components/SEO';
import { StructuredData } from '@/components/StructuredData';

export const metadata: Metadata = generatePageMetadata('experience');

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData pageKey="experience" />
      {children}
    </>
  );
}
