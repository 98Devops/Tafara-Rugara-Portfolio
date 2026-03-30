'use client';

import { motion } from 'framer-motion';
import ContactInfo from '@/components/ContactInfo';
import dynamic from 'next/dynamic';

const ContactForm = dynamic(() => import('@/components/ContactForm'), {
  loading: () => (
    <div className="animate-pulse space-y-4">
      {[1, 2, 3, 4].map(i => (
        <div
          key={i}
          className="rounded-xl"
          style={{
            height: i === 3 ? 120 : 48,
            background: 'rgba(0,212,255,0.06)',
          }}
        />
      ))}
    </div>
  ),
  ssr: false,
});

export default function Contact() {
  const handleFormSubmit = async () => {
    /* handled by ContactForm internally */
  };

  return (
    <main
      className="min-h-screen pt-16"
      style={{ background: '#0A0F1E', color: '#e2e8f0' }}
    >
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-16 text-center">
            <motion.div
              className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs font-semibold uppercase tracking-widest"
              style={{
                background: 'rgba(16,185,129,0.08)',
                border: '1px solid rgba(16,185,129,0.28)',
                color: '#34d399',
              }}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="pulse-dot" style={{ width: 8, height: 8 }} />
              Open to Opportunities
            </motion.div>
            <motion.h1
              className="mb-4 text-4xl font-extrabold md:text-5xl"
              style={{
                background:
                  'linear-gradient(135deg, #ffffff 0%, #00D4FF 50%, #7C3AED 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.02em',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              Let's Work Together
            </motion.h1>
            <motion.p
              className="mx-auto max-w-xl leading-relaxed"
              style={{ color: 'rgba(148,163,184,0.85)' }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              Cloud & DevOps engineering, AI automation consulting,
              infrastructure architecture. Drop a message and I'll respond
              within 24 hours.
            </motion.p>
          </div>

          {/* Main grid */}
          <div className="mb-20 grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Contact Info */}
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7 }}
            >
              <ContactInfo />
            </motion.div>

            {/* Send Message form */}
            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="glass-card p-8">
                <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-white">
                  <span className="text-xl">💬</span> Send a Message
                </h2>
                <ContactForm onSubmit={handleFormSubmit} />
              </div>
            </motion.div>
          </div>

          {/* WhatsApp CTA banner */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="relative overflow-hidden rounded-2xl p-10"
              style={{
                background:
                  'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(0,212,255,0.08))',
                border: '1px solid rgba(16,185,129,0.25)',
              }}
            >
              {/* Glow */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse at center, rgba(16,185,129,0.08), transparent 70%)',
                }}
              />

              <div className="relative z-10">
                <div className="mb-4 text-4xl">📲</div>
                <h3 className="mb-3 text-2xl font-bold text-white">
                  Prefer a direct conversation?
                </h3>
                <p
                  className="mx-auto mb-8 max-w-lg"
                  style={{ color: 'rgba(148,163,184,0.85)' }}
                >
                  Message me directly on WhatsApp for a quick reply — I respond
                  fast to Cloud, DevOps, and AI automation enquiries.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href="https://wa.me/263777553271"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-bold transition-all duration-200 hover:-translate-y-1"
                    style={{
                      background: 'linear-gradient(135deg, #25d366, #128c7e)',
                      color: '#fff',
                      boxShadow: '0 4px 20px rgba(37,211,102,0.35)',
                    }}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Chat on WhatsApp
                  </a>
                  <a
                    href="mailto:tfrsuperfx@gmail.com"
                    className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-bold transition-all duration-200 hover:-translate-y-1"
                    style={{
                      background: 'rgba(0,212,255,0.10)',
                      border: '1px solid rgba(0,212,255,0.30)',
                      color: '#00D4FF',
                    }}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
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
