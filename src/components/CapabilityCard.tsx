'use client';

import { motion } from 'framer-motion';
import { TechnicalCapability } from '@/types';

// Category → icon mapping
const CATEGORY_ICONS: Record<string, string> = {
  'Cloud Architecture': '☁️',
  'DevOps & CI/CD': '⚙️',
  'Automation Engineering': '🤖',
  'Monitoring & Reliability': '📡',
  'Website Development': '🌐',
};

// Category → accent color
const CATEGORY_COLORS: Record<
  string,
  { border: string; badge: string; dot: string }
> = {
  'Cloud Architecture': {
    border: 'rgba(0,212,255,0.30)',
    badge: 'tech-badge',
    dot: '#00D4FF',
  },
  'DevOps & CI/CD': {
    border: 'rgba(124,58,237,0.30)',
    badge: 'tech-badge-violet',
    dot: '#a78bfa',
  },
  'Automation Engineering': {
    border: 'rgba(16,185,129,0.30)',
    badge: 'tech-badge-emerald',
    dot: '#34d399',
  },
  'Monitoring & Reliability': {
    border: 'rgba(0,212,255,0.30)',
    badge: 'tech-badge',
    dot: '#00D4FF',
  },
  'Website Development': {
    border: 'rgba(236,72,153,0.30)',
    badge: 'tech-badge-pink',
    dot: '#ec4899',
  },
};

interface CapabilityCardProps {
  capability: TechnicalCapability;
  index: number;
}

export default function CapabilityCard({
  capability,
  index,
}: CapabilityCardProps) {
  const icon = CATEGORY_ICONS[capability.category] ?? '🔧';
  const colors = CATEGORY_COLORS[capability.category] ?? {
    border: 'rgba(0,212,255,0.25)',
    badge: 'tech-badge',
    dot: '#00D4FF',
  };

  // Convert hex color to rgba for background
  const getIconBackground = (dotColor: string): string => {
    const colorMap: Record<string, string> = {
      '#00D4FF': '0,212,255',
      '#a78bfa': '124,58,237',
      '#34d399': '16,185,129',
      '#ec4899': '236,72,153',
    };
    const rgb = colorMap[dotColor] || '0,212,255';
    return `rgba(${rgb},0.12)`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="glass-card gradient-border flex h-full flex-col p-6"
      style={{ borderColor: colors.border }}
    >
      {/* Icon + Category */}
      <div className="mb-4 flex items-center gap-3">
        <div
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-2xl"
          style={{
            background: getIconBackground(colors.dot),
            border: `1px solid ${colors.border}`,
          }}
        >
          {icon}
        </div>
        <h3 className="text-lg font-bold leading-tight text-white">
          {capability.category}
        </h3>
      </div>

      {/* Description */}
      <p
        className="mb-5 text-sm leading-relaxed"
        style={{ color: 'rgba(148,163,184,0.9)' }}
      >
        {capability.description}
      </p>

      {/* Skills as tech badges */}
      <div className="mt-auto flex flex-wrap gap-2">
        {capability.skills.map(skill => (
          <motion.span
            key={skill}
            className={`tech-badge ${colors.badge !== 'tech-badge' ? colors.badge : ''}`}
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
