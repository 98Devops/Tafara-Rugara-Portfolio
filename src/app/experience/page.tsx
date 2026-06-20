'use client';

import ExperienceTimeline from '@/components/ExperienceTimeline';
import { portfolioData } from '@/data/portfolio';

export default function Experience() {
  return (
    <main className="border-b border-line">
      <div className="wrap" style={{ paddingTop: 'clamp(5rem, 11vw, 8rem)', paddingBottom: 'var(--section-pad)' }}>
        <div className="mb-12 max-w-3xl">
          <p className="rise label mb-5">// professional journey</p>
          <h1 className="rise d1 font-display text-bone" style={{ fontWeight: 400, fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: 1.06, letterSpacing: '-0.02em' }}>
            Experience
          </h1>
          <p className="rise d2 mt-6 text-bone-dim" style={{ maxWidth: '54ch', fontSize: '1.05rem', lineHeight: 1.65 }}>
            Measurable impact in DevOps engineering, AI automation, and cloud infrastructure.
          </p>
        </div>

        <div className="rise d3 max-w-3xl">
          <ExperienceTimeline experiences={portfolioData.experience} />
        </div>
      </div>
    </main>
  );
}
