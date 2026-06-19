import { Metadata } from 'next';
import { generatePageMetadata } from '@/components/SEO';
import { StructuredData } from '@/components/StructuredData';

export const metadata: Metadata = generatePageMetadata('whatIDo');

export default function WhatIDoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData pageKey="whatIDo" />
      {children}
    </>
  );
}
