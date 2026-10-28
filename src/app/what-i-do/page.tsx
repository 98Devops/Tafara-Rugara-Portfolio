'use client';

import CapabilityCard from '@/components/CapabilityCard';
import { portfolioData } from '@/data/portfolio';

export default function WhatIDo() {
  return (
    <main className="border-b border-line">
      <div className="wrap" style={{ paddingTop: 'clamp(5rem, 11vw, 8rem)', paddingBottom: 'var(--section-pad)' }}>
        <div className="mb-12">
          <p className="rise label mb-5">// specialist capabilities</p>
          <h1 className="rise d1 font-display text-bone" style={{ fontWeight: 400, fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: 1.06, letterSpacing: '-0.02em', maxWidth: '16ch' }}>
            What I Do
          </h1>
          <p className="rise d2 mt-6 text-bone-dim" style={{ maxWidth: '54ch', fontSize: '1.05rem', lineHeight: 1.65 }}>
            Cloud architecture, DevOps pipelines, AI-powered automation, and system
            reliability — production-grade work that delivers measurable operational value.
          </p>
        </div>

        <div className="rise d3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioData.capabilities.map((capability, index) => (
            <CapabilityCard key={capability.category} capability={capability} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
