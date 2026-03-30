'use client';

import { portfolioData, automationSystems } from '@/data/portfolio';
import { Hero } from '@/components/Hero';
import { AutomationSystems } from '@/components/AutomationSystems';
import dynamic from 'next/dynamic';

const Certifications = dynamic(() => import('@/components/Certifications'), {
  ssr: false,
});
const Testimonial = dynamic(() => import('@/components/Testimonial'), {
  ssr: false,
});

const TECH_STACK = [
  { name: 'AWS', emoji: '☁️' },
  { name: 'Kubernetes', emoji: '⚙️' },
  { name: 'Docker', emoji: '🐳' },
  { name: 'Terraform', emoji: '🔷' },
  { name: 'n8n', emoji: '🤖' },
  { name: 'GitHub Actions', emoji: '🔄' },
  { name: 'Linux', emoji: '🐧' },
  { name: 'AI / LLMs', emoji: '✨' },
];

export default function Home() {
  const { personal } = portfolioData;

  return (
    <main>
      <Hero personal={personal} />

      {/* Tech Stack Strip */}
      <section
        className="relative overflow-hidden py-10"
        style={{
          background: '#080d1a',
          borderTop: '1px solid rgba(0,212,255,0.08)',
          borderBottom: '1px solid rgba(0,212,255,0.08)',
        }}
      >
        <div className="container mx-auto px-6">
          <p
            className="mb-6 text-center font-mono text-xs uppercase tracking-widest"
            style={{ color: 'rgba(0,212,255,0.45)' }}
          >
            Technologies &amp; Tools
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-5">
            {TECH_STACK.map(t => (
              <div
                key={t.name}
                className="flex cursor-default items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-1"
                style={{
                  background: 'rgba(0,212,255,0.05)',
                  border: '1px solid rgba(0,212,255,0.12)',
                  color: 'rgba(203,213,225,0.80)',
                }}
              >
                <span>{t.emoji}</span>
                <span>{t.name}</span>
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
