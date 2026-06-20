'use client';

import ContactInfo from '@/components/ContactInfo';
import dynamic from 'next/dynamic';

const ContactForm = dynamic(() => import('@/components/ContactForm'), {
  loading: () => (
    <div className="space-y-4" aria-hidden="true">
      {[1, 2, 3, 4].map(i => (
        <div key={i} style={{ height: i === 3 ? 120 : 48, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--r-sm)' }} />
      ))}
    </div>
  ),
  ssr: false,
});

export default function Contact() {
  const handleFormSubmit = async () => { /* handled by ContactForm internally */ };

  return (
    <main className="border-b border-line">
      <div className="wrap" style={{ paddingTop: 'clamp(5rem, 11vw, 8rem)', paddingBottom: 'var(--section-pad)' }}>

        {/* Header */}
        <div className="mb-12">
          <p className="rise label mb-5 inline-flex items-center gap-2">
            <span className="live-dot" aria-hidden="true" />
            Open to Opportunities
          </p>
          <h1 className="rise d1 font-display text-bone" style={{ fontWeight: 400, fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: 1.06, letterSpacing: '-0.02em', maxWidth: '16ch' }}>
            Let&apos;s Work Together
          </h1>
          <p className="rise d2 mt-6 text-bone-dim" style={{ maxWidth: '52ch', fontSize: '1.05rem', lineHeight: 1.65 }}>
            Cloud &amp; DevOps engineering, AI automation consulting, infrastructure architecture.
            Drop a message and I&apos;ll respond within 24 hours.
          </p>
        </div>

        {/* Main grid — layout preserved */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 mb-16">
          <div className="rise order-2 lg:order-1">
            <ContactInfo />
          </div>

          <div className="rise d1 order-1 lg:order-2">
            <div className="border border-line rounded-md p-6 sm:p-8" style={{ background: 'var(--surface)' }}>
              <h2 className="label mb-6">Send a Message</h2>
              <ContactForm onSubmit={handleFormSubmit} />
            </div>
          </div>
        </div>

        {/* WhatsApp CTA banner */}
        <div className="border border-line rounded-md p-8 sm:p-10 text-center" style={{ background: 'var(--surface)' }}>
          <p className="label mb-4">// direct line</p>
          <h3 className="font-display text-bone mb-3" style={{ fontWeight: 400, fontSize: 'clamp(1.4rem, 3vw, 1.9rem)' }}>
            Prefer a direct conversation?
          </h3>
          <p className="text-bone-dim mx-auto mb-8" style={{ maxWidth: '40ch', fontSize: '0.94rem', lineHeight: 1.65 }}>
            Message me directly on WhatsApp for a quick reply — I respond fast to Cloud,
            DevOps, and AI automation enquiries.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/263777553271"
              target="_blank" rel="noopener noreferrer"
              className="btn-solid"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
              </svg>
              Chat on WhatsApp
            </a>
            <a href="mailto:tfrsuperfx@gmail.com" className="btn-ghost">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              Send Email
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
