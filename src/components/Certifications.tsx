'use client';

import { certifications } from '@/data/portfolio';

export default function Certifications() {
  return (
    <section className="border-b border-line" style={{ paddingBlock: 'var(--section-pad)' }}>
      <div className="wrap">
        {/* Header */}
        <div className="mb-10">
          <p className="label mb-3">// certifications &amp; credentials</p>
          <h2 className="font-display text-bone" style={{ fontWeight: 400, fontSize: 'clamp(1.5rem, 3.4vw, 2.1rem)', letterSpacing: '-0.01em' }}>
            AWS certified, continuously learning
          </h2>
        </div>

        {/* Cert rows */}
        <div className="grid sm:grid-cols-2 gap-4">
          {certifications.map((cert, i) => (
            <div
              key={cert.name}
              className="rise border border-line rounded-md p-6"
              style={{ background: 'var(--surface)', animationDelay: `${i * 0.08}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono" style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--bone-faint)' }}>
                  {cert.badge}
                </span>
                <span
                  className="font-mono px-2.5 py-1 rounded-sm border"
                  style={{
                    fontSize: '0.66rem',
                    letterSpacing: '0.06em',
                    borderColor: cert.status === 'Certified' ? 'var(--ember)' : 'var(--line-2)',
                    color: cert.status === 'Certified' ? 'var(--ember)' : 'var(--bone-faint)',
                    background: cert.status === 'Certified' ? 'var(--ember-soft)' : 'transparent',
                  }}
                >
                  {cert.status === 'Certified' ? 'CERTIFIED' : 'IN PROGRESS'}
                </span>
              </div>

              <h3 className="text-bone mb-1" style={{ fontSize: '0.98rem', fontWeight: 500, lineHeight: 1.3 }}>{cert.name}</h3>
              <p className="font-mono" style={{ fontSize: '0.74rem', color: 'var(--bone-faint)' }}>{cert.issuer} · {cert.year}</p>

              {cert.status !== 'Certified' && (
                <div className="mt-4">
                  <div className="flex justify-between font-mono mb-1.5" style={{ fontSize: '0.7rem', color: 'var(--bone-faint)' }}>
                    <span>Exam prep</span><span>~60%</span>
                  </div>
                  <div className="h-px overflow-hidden" style={{ background: 'var(--line-2)' }}>
                    <div style={{ height: '100%', width: '60%', background: 'var(--ember)' }} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="font-mono mt-8" style={{ fontSize: '0.72rem', color: 'var(--bone-faint)' }}>
          Target: AWS SAA-C03 · April / May 2026
        </p>
      </div>
    </section>
  );
}
