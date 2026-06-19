'use client';

import { portfolioData, automationSystems } from '@/data/portfolio';
import { Hero } from '@/components/Hero';
import { AutomationSystems } from '@/components/AutomationSystems';
import dynamic from 'next/dynamic';

const Certifications = dynamic(() => import('@/components/Certifications'), { ssr: false });
const Testimonial = dynamic(() => import('@/components/Testimonial'), { ssr: false });

const TECH_STACK = [
  { name: 'AWS',            emoji: '☁️' },
  { name: 'Kubernetes',     emoji: '⚙️' },
  { name: 'Docker',         emoji: '🐳' },
  { name: 'Terraform',      emoji: '🔷' },
  { name: 'n8n',            emoji: '🤖' },
  { name: 'GitHub Actions', emoji: '🔄' },
  { name: 'Linux',          emoji: '🐧' },
  { name: 'AI / LLMs',      emoji: '✨' },
];

export default function Home() {
  const { personal } = portfolioData;

  // Double the items for seamless marquee loop
  const marqueeItems = [...TECH_STACK, ...TECH_STACK];

  return (
    <main>
      <Hero personal={personal} />

      {/* Tech Stack Strip — Marquee */}
      <section
        className="py-10 relative overflow-hidden"
        style={{ background: '#0A0A0A' }}
      >
        {/* Gradient dividers top and bottom */}
        <div className="section-divider-glow absolute top-0 left-0 right-0" />
        <div className="section-divider-glow absolute bottom-0 left-0 right-0" />

        <div className="container mx-auto px-6">
          <p className="text-center text-xs font-mono uppercase tracking-widest mb-6" style={{ color: '#71717A' }}>
            Technologies &amp; Tools
          </p>
        </div>

        {/* Marquee container */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10" style={{ background: 'linear-gradient(to right, #0A0A0A, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10" style={{ background: 'linear-gradient(to left, #0A0A0A, transparent)' }} />

          <div className="marquee-track">
            {marqueeItems.map((t, i) => (
              <div
                key={`${t.name}-${i}`}
                className="flex items-center gap-2 px-5 py-2.5 mx-2 text-sm font-medium transition-all duration-200 hover:-translate-y-1 cursor-default flex-shrink-0"
                style={{
                  background: 'rgba(17, 17, 17, 0.7)',
                  border: '1px solid rgba(39, 39, 42, 0.6)',
                  color: '#A1A1AA',
                  borderRadius: '8px',
                  backdropFilter: 'blur(4px)',
                }}
              >
                <span>{t.emoji}</span><span>{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Certifications />

      <AutomationSystems
        flagship={automationSystems.flagship}
        supporting={automationSystems.supporting}
      />

      <Testimonial />
    </main>
  );
}