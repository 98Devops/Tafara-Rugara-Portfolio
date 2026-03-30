'use client';

import { motion } from 'framer-motion';
import { certifications } from '@/data/portfolio';

export default function Certifications() {
  return (
    <section
      className="relative py-16"
      style={{ background: 'linear-gradient(to bottom, #0A0F1E, #080d1a)' }}
    >
      {/* Separator */}
      <div
        className="absolute left-0 right-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(255,153,0,0.4), transparent)',
        }}
      />

      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs font-semibold uppercase tracking-widest"
            style={{
              background: 'rgba(255,153,0,0.08)',
              border: '1px solid rgba(255,153,0,0.25)',
              color: '#FF9900',
            }}
          >
            <span>🏅</span> Certifications & Credentials
          </div>
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            AWS Certified &amp; Continuously Learning
          </h2>
        </motion.div>

        {/* Cert cards */}
        <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              className="min-w-[260px] max-w-sm flex-1"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div
                className="relative h-full overflow-hidden rounded-2xl p-6"
                style={{
                  background: 'rgba(15,22,41,0.75)',
                  border: `1px solid rgba(${cert.color === '#FF9900' ? '255,153,0' : '0,212,255'},0.28)`,
                  boxShadow: `0 4px 30px rgba(${cert.color === '#FF9900' ? '255,153,0' : '0,212,255'},0.08)`,
                }}
              >
                {/* Status pill */}
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-3xl">{cert.icon}</span>
                  <span
                    className="rounded-full px-3 py-1 font-mono text-xs font-bold"
                    style={{
                      background:
                        cert.status === 'Certified'
                          ? 'rgba(16,185,129,0.15)'
                          : 'rgba(0,212,255,0.10)',
                      border: `1px solid ${cert.status === 'Certified' ? 'rgba(16,185,129,0.40)' : 'rgba(0,212,255,0.30)'}`,
                      color:
                        cert.status === 'Certified' ? '#34d399' : '#00D4FF',
                    }}
                  >
                    {cert.status === 'Certified'
                      ? '✓ Certified'
                      : '⏳ In Progress'}
                  </span>
                </div>

                {/* Badge code */}
                <div
                  className="mb-2 font-mono text-xs font-bold uppercase tracking-widest"
                  style={{ color: cert.color }}
                >
                  {cert.badge}
                </div>

                {/* Name */}
                <h3 className="mb-1 text-base font-bold leading-tight text-white">
                  {cert.name}
                </h3>
                <p className="text-sm" style={{ color: '#64748b' }}>
                  {cert.issuer} · {cert.year}
                </p>

                {/* Progress bar for in-progress */}
                {cert.status !== 'Certified' && (
                  <div className="mt-4">
                    <div
                      className="mb-1 flex justify-between text-xs"
                      style={{ color: '#64748b' }}
                    >
                      <span>Exam prep</span>
                      <span>~60%</span>
                    </div>
                    <div
                      className="h-1.5 overflow-hidden rounded-full"
                      style={{ background: 'rgba(0,212,255,0.10)' }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background:
                            'linear-gradient(90deg, #00D4FF, #7C3AED)',
                        }}
                        initial={{ width: 0 }}
                        whileInView={{ width: '60%' }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1.2,
                          delay: 0.4,
                          ease: 'easeOut',
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Targeting note */}
        <motion.p
          className="mt-8 text-center font-mono text-sm"
          style={{ color: 'rgba(0,212,255,0.50)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          Target: AWS SAA-C03 · April / May 2026
        </motion.p>
      </div>
    </section>
  );
}
