'use client';

import { motion } from 'framer-motion';
import { TechnicalCapability } from '@/types';

// Category → icon mapping
const CATEGORY_ICONS: Record<string, string> = {
  'Cloud Architecture':         '☁️',
  'DevOps & CI/CD':             '⚙️',
  'Automation Engineering':     '🤖',
  'Monitoring & Reliability':   '📡',
};

// Category → accent color
const CATEGORY_COLORS: Record<string, { border: string; badge: string; dot: string }> = {
  'Cloud Architecture':         { border: 'rgba(0,212,255,0.30)',   badge: 'tech-badge',          dot: '#00D4FF' },
  'DevOps & CI/CD':             { border: 'rgba(124,58,237,0.30)',  badge: 'tech-badge-violet',    dot: '#a78bfa' },
  'Automation Engineering':     { border: 'rgba(16,185,129,0.30)', badge: 'tech-badge-emerald',  dot: '#34d399' },
  'Monitoring & Reliability':   { border: 'rgba(0,212,255,0.30)',   badge: 'tech-badge',          dot: '#00D4FF' },
};

interface CapabilityCardProps {
  capability: TechnicalCapability;
  index: number;
}

export default function CapabilityCard({ capability, index }: CapabilityCardProps) {
  const icon   = CATEGORY_ICONS[capability.category]  ?? '🔧';
  const colors = CATEGORY_COLORS[capability.category] ?? { border: 'rgba(0,212,255,0.25)', badge: 'tech-badge', dot: '#00D4FF' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.10, ease: 'easeOut' }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="glass-card gradient-border p-6 flex flex-col h-full"
      style={{ borderColor: colors.border }}
    >
      {/* Icon + Category */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{
            background: `rgba(${colors.dot === '#00D4FF' ? '0,212,255' : colors.dot === '#a78bfa' ? '124,58,237' : '16,185,129'},0.12)`,
            border:     `1px solid ${colors.border}`,
          }}
        >
          {icon}
        </div>
        <h3 className="text-lg font-bold text-white leading-tight">{capability.category}</h3>
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(148,163,184,0.9)' }}>
        {capability.description}
      </p>

      {/* Skills as tech badges */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {capability.skills.map((skill) => (
          <motion.span
            key={skill}
            className={`tech-badge ${index % 2 === 1 ? 'tech-badge-violet' : ''} ${index === 2 ? 'tech-badge-emerald' : ''}`}
            whileHover={{ scale: 1.05, y: -1 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}