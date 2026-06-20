'use client';

import { portfolioData, automationSystems } from '@/data/portfolio';
import { Hero } from '@/components/Hero';
import { TechMarquee } from '@/components/TechMarquee';
import { AutomationSystems } from '@/components/AutomationSystems';
import dynamic from 'next/dynamic';

const Certifications = dynamic(() => import('@/components/Certifications'), { ssr: false });
const Testimonial = dynamic(() => import('@/components/Testimonial'), { ssr: false });

export default function Home() {
  const { personal } = portfolioData;

  return (
    <main>
      <Hero personal={personal} />
      <TechMarquee />
      <Certifications />
      <AutomationSystems
        flagship={automationSystems.flagship}
        supporting={automationSystems.supporting}
      />
      <Testimonial />
    </main>
  );
}
