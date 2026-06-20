'use client';

import { motion } from 'framer-motion';
import { Experience } from '@/types';

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-2 top-1 bottom-1 w-px" style={{ background: 'var(--line-2)' }} aria-hidden="true" />

      {experiences.map((experience, index) => (
        <motion.div
          key={`${experience.company}-${experience.position}`}
          className="relative pl-10 pb-12 last:pb-0"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
        >
          {/* Node */}
          <span
            className="absolute top-1.5"
            style={{ left: 1, width: 9, height: 9, background: 'var(--ember)', borderRadius: 2 }}
            aria-hidden="true"
          />

          {/* Card */}
          <div className="border border-line rounded-md p-6" style={{ background: 'var(--surface)' }}>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
              <div>
                <h3 className="font-display text-bone" style={{ fontWeight: 400, fontSize: '1.3rem', lineHeight: 1.2 }}>
                  {experience.position}
                </h3>
                <p className="text-bone-dim mt-1" style={{ fontSize: '0.95rem' }}>{experience.company}</p>
                <p className="label mt-1" style={{ textTransform: 'none', letterSpacing: '0.02em' }}>{experience.duration}</p>
              </div>
              {experience.impact && (
                <div className="flex-shrink-0 px-3 py-2 text-center border border-line-2 rounded-sm" style={{ background: 'var(--ink)' }}>
                  <div className="label mb-1">Key Impact</div>
                  <div className="text-bone" style={{ fontSize: '0.9rem', fontWeight: 500 }}>{experience.impact}</div>
                </div>
              )}
            </div>

            {/* Achievements */}
            <div className="mb-6">
              <p className="label mb-3">Key Achievements</p>
              <ul className="space-y-2">
                {experience.achievements.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-bone-dim" style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>
                    <span aria-hidden="true" className="text-ember flex-shrink-0">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div>
              <p className="label mb-3">Technologies</p>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech) => (
                  <span key={tech} className="chip">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
