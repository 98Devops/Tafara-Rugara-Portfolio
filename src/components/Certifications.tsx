'use client';

import { motion } from 'framer-motion';
import { certifications } from '@/data/portfolio';

export default function Certifications() {
  return (
    <section className="py-16 relative" style={{ background: 'linear-gradient(to bottom, #0A0F1E, #080d1a)' }}>
      {/* Separator */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,153,0,0.4), transparent)' }} />

      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full text-xs font-mono font-semibold uppercase tracking-widest"
            style={{ background: 'rgba(255,153,0,0.08)', border: '1px solid rgba(255,153,0,0.25)', color: '#FF9900' }}>
            <span>🏅</span> Certifications & Credentials
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            AWS Certified &amp; Continuously Learning
          </h2>
        </motion.div>

        {/* Cert cards */}
        <div className="flex flex-wrap justify-center gap-6 max-w-3xl mx-auto">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              className="flex-1 min-w-[260px] max-w-sm"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div
                className="h-full p-6 rounded-2xl relative overflow-hidden"
                style={{
                  background: 'rgba(15,22,41,0.75)',
                  border: `1px solid rgba(${cert.color === '#FF9900' ? '255,153,0' : '0,212,255'},0.28)`,
                  boxShadow: `0 4px 30px rgba(${cert.color === '#FF9900' ? '255,153,0' : '0,212,255'},0.08)`,
                }}
              >
                {/* Status pill */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{cert.icon}</span>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold font-mono"
                    style={{
                      background: cert.status === 'Certified'
                        ? 'rgba(16,185,129,0.15)'
                        : 'rgba(0,212,255,0.10)',
                      border: `1px solid ${cert.status === 'Certified' ? 'rgba(16,185,129,0.40)' : 'rgba(0,212,255,0.30)'}`,
                      color: cert.status === 'Certified' ? '#34d399' : '#00D4FF',
                    }}
                  >
                    {cert.status === 'Certified' ? '✓ Certified' : '⏳ In Progress'}
                  </span>
                </div>

                {/* Badge code */}
                <div
                  className="text-xs font-mono font-bold mb-2 uppercase tracking-widest"
                  style={{ color: cert.color }}
                >
                  {cert.badge}
                </div>

                {/* Name */}
                <h3 className="text-base font-bold text-white mb-1 leading-tight">{cert.name}</h3>
                <p className="text-sm" style={{ color: '#64748b' }}>{cert.issuer} · {cert.year}</p>

                {/* Progress bar for in-progress */}
                {cert.status !== 'Certified' && (
                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1" style={{ color: '#64748b' }}>
                      <span>Exam prep</span><span>~60%</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(0,212,255,0.10)' }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: 'linear-gradient(90deg, #00D4FF, #7C3AED)' }}
                        initial={{ width: 0 }}
                        whileInView={{ width: '60%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
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
          className="text-center text-sm mt-8 font-mono"
          style={{ color: 'rgba(0,212,255,0.50)' }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
        >
          Target: AWS SAA-C03 · April / May 2026
        </motion.p>
      </div>
    </section>
  );
}
