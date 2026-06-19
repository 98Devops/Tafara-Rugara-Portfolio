'use client';

import { PersonalInfo } from '@/types';
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { metrics } from '@/data/portfolio';
import { MetricsLedger } from '@/components/MetricsLedger';

interface HeroProps { personal: PersonalInfo; }

export function Hero({ personal }: HeroProps) {
  const [clock, setClock] = useState('');

  // Live local time — Harare / GMT+2
  useEffect(() => {
    const tick = () => {
      try {
        const t = new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Harare', hour12: false,
        }).format(new Date());
        setClock(`Local time ${t}`);
      } catch { setClock(''); }
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  const handleDownload = useCallback((href: string, name: string) => {
    const a = document.createElement('a');
    a.href = href; a.download = name; a.rel = 'noopener noreferrer';
    document.body.appendChild(a); a.click();
    setTimeout(() => { try { document.body.removeChild(a); } catch { /* */ } }, 200);
  }, []);

  return (
    <section className="border-b border-line">
      <div className="wrap" style={{ paddingTop: 'clamp(5rem, 11vw, 8rem)', paddingBottom: 'var(--section-pad)' }}>

        {/* Status line */}
        <div className="rise flex flex-wrap items-center gap-x-6 gap-y-2 mb-8 font-mono" style={{ fontSize: '0.72rem', letterSpacing: '0.05em', color: 'var(--bone-dim)' }}>
          <span className="flex items-center gap-2">
            <span className="live-dot" aria-hidden="true" />
            Open to Opportunities
          </span>
          <span>Harare &amp; Johannesburg · GMT+2</span>
          {clock && <span>{clock}</span>}
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-start">
          <div>
            {/* Name eyebrow */}
            <p className="rise label mb-5">{personal.name}</p>

            {/* Statement headline */}
            <h1
              className="rise d1 font-display text-bone"
              style={{ fontWeight: 400, fontSize: 'clamp(2.4rem, 6vw, 4.3rem)', lineHeight: 1.04, letterSpacing: '-0.02em', maxWidth: '18ch' }}
            >
              I build the systems that run quietly, and I keep them{' '}
              <span className="relative italic whitespace-nowrap ember-underline">that way</span>.
            </h1>

            {/* Summary — keeps technical keywords */}
            <p className="rise d2 mt-7 text-bone-dim" style={{ maxWidth: '52ch', fontSize: '1.05rem', lineHeight: 1.65 }}>
              {personal.summary}
            </p>

            {/* Primary CTAs */}
            <div className="rise d3 mt-9 flex flex-wrap gap-3">
              <a
                href="/projects"
                className="btn-solid inline-flex items-center gap-2"
              >
                View Projects <span aria-hidden="true" className="btn-arr">→</span>
              </a>
              <button
                type="button"
                onClick={() => handleDownload(personal.documents.cv, 'Tafara-Rugara-CV.pdf')}
                className="btn-ghost inline-flex items-center gap-2"
              >
                Download CV
              </button>
            </div>

            {/* Inline social row */}
            <div className="rise d3 mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono" style={{ fontSize: '0.72rem', letterSpacing: '0.05em' }}>
              <a href={personal.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-bone-dim hover:text-bone transition-colors">GitHub</a>
              <a href={personal.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-bone-dim hover:text-bone transition-colors">LinkedIn</a>
              <a href="/contact" className="text-bone-dim hover:text-bone transition-colors">Contact me</a>
            </div>
          </div>

          {/* Profile image — restrained, hairline border, no tilt */}
          {personal.profileImage && (
            <div className="rise d2 order-first lg:order-none">
              <div
                className="overflow-hidden border border-line"
                style={{ width: 112, height: 112, borderRadius: 'var(--r-md)' }}
              >
                <Image
                  src={personal.profileImage}
                  alt={personal.name}
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Metrics ledger */}
      <div className="wrap" style={{ paddingBottom: 'var(--section-pad)' }}>
        <div className="rise d3">
          <MetricsLedger metrics={metrics} />
        </div>
      </div>
    </section>
  );
}
