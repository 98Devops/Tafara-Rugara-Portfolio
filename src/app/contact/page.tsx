'use client';

import { motion } from 'framer-motion';
import ContactInfo from '@/components/ContactInfo';
import dynamic from 'next/dynamic';

const ContactForm = dynamic(() => import('@/components/ContactForm'), {
  loading: () => (
    <div className="animate-pulse space-y-4">
      {[1, 2, 3, 4].map(i => (
        <div key={i} style={{ height: i === 3 ? 120 : 48, background: 'rgba(17,17,17,0.8)', borderRadius: '8px' }} />
      ))}
    </div>
  ),
  ssr: false,
});

export default function Contact() {
  const handleFormSubmit = async () => { /* handled by ContactForm internally */ };

  return (
    <main className="min-h-screen pt-16 relative overflow-hidden" style={{ background: '#0A0A0A', color: '#A1A1AA' }}>
      {/* Ambient glow */}
      <div className="ambient-glow" style={{ top: '5%', right: '-10%', opacity: 0.3 }} />
      <div className="ambient-glow-2" style={{ bottom: '20%', left: '-5%', opacity: 0.25 }} />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 text-xs font-mono font-semibold uppercase tracking-widest"
              style={{
                background: 'rgba(17,17,17,0.7)',
                border: '1px solid rgba(39,39,42,0.8)',
                color: '#A1A1AA',
                borderRadius: '20px',
                backdropFilter: 'blur(8px)',
              }}
              initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            >
              <span className="w-2 h-2 rounded-full bg-white glow-pulse" />
              Open to Opportunities
            </motion.div>
            <motion.h1
              className="text-4xl md:text-5xl font-extrabold mb-4 text-white"
              style={{ letterSpacing: '-0.03em' }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            >
              Let&apos;s Work Together
            </motion.h1>
            <motion.p
              className="max-w-xl mx-auto leading-relaxed text-zinc-400"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            >
              Cloud & DevOps engineering, AI automation consulting, infrastructure architecture.
              Drop a message and I&apos;ll respond within 24 hours.
            </motion.p>
          </div>

          {/* Main grid */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 mb-20">
            {/* Contact Info */}
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.7 }}
            >
              <ContactInfo />
            </motion.div>

            {/* Send Message form */}
            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div
                className="glass-card p-8"
                style={{ borderRadius: '12px' }}
              >
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 relative z-10">
                  <span className="text-xl">💬</span> Send a Message
                </h2>
                <div className="relative z-10">
                  <ContactForm onSubmit={handleFormSubmit} />
                </div>
              </div>
            </motion.div>
          </div>

          {/* WhatsApp CTA banner — animated border */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="relative overflow-hidden p-10 animated-border"
              style={{
                background: 'rgba(17, 17, 17, 0.8)',
                borderRadius: '16px',
              }}
            >
              <div className="relative z-10">
                <div className="text-4xl mb-4">📲</div>
                <h3 className="text-2xl font-bold text-white mb-3">Prefer a direct conversation?</h3>
                <p className="max-w-lg mx-auto mb-8 text-zinc-400">
                  Message me directly on WhatsApp for a quick reply — I respond fast to Cloud, DevOps,
                  and AI automation enquiries.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href="https://wa.me/263777553271"
                    target="_blank" rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center gap-2 px-8 py-4 font-bold text-sm"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Chat on WhatsApp
                  </a>
                  <a
                    href="mailto:tfrsuperfx@gmail.com"
                    className="btn-glass inline-flex items-center gap-2 px-8 py-4 font-bold text-sm"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    Send Email
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}