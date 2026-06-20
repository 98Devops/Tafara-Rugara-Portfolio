'use client';

import { testimonial } from '@/data/portfolio';

export default function Testimonial() {
  return (
    <section className="border-b border-line" style={{ paddingBlock: 'var(--section-pad)' }}>
      <div className="wrap">
        <div className="max-w-3xl">
          <p className="label mb-8">// what they say</p>

          <blockquote
            className="rise font-display text-bone"
            style={{ fontWeight: 400, fontSize: 'clamp(1.4rem, 3.2vw, 2rem)', lineHeight: 1.35, letterSpacing: '-0.01em' }}
          >
            <span className="text-ember">“</span>{testimonial.quote}<span className="text-ember">”</span>
          </blockquote>

          <div className="mt-8 flex items-center gap-4">
            <span className="w-8 h-px" style={{ background: 'var(--line-2)' }} aria-hidden="true" />
            <div>
              <p className="text-bone" style={{ fontSize: '0.95rem', fontWeight: 500 }}>{testimonial.author}</p>
              <p className="font-mono" style={{ fontSize: '0.74rem', color: 'var(--bone-dim)' }}>
                {testimonial.title} · {testimonial.company}
              </p>
            </div>
          </div>

          <a
            href="/documents/tafara-rugara-reference.pdf"
            download="Tafara-Rugara-Reference-Letter.pdf"
            className="contact-tile inline-flex items-center gap-2 mt-6 px-4 py-2 font-mono"
            style={{ fontSize: '0.74rem' }}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Download Reference Letter
          </a>
        </div>
      </div>
    </section>
  );
}
