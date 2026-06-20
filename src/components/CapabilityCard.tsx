'use client';

import { TechnicalCapability } from '@/types';
import {
  CloudIcon,
  CommandLineIcon,
  CpuChipIcon,
  SignalIcon,
  CodeBracketIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';
import type { ComponentType, SVGProps } from 'react';

// Category → Heroicon mapping (no emoji)
const CATEGORY_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  'Cloud Architecture':       CloudIcon,
  'DevOps & CI/CD':           CommandLineIcon,
  'Automation Engineering':   CpuChipIcon,
  'Monitoring & Reliability': SignalIcon,
  'Website Development':      CodeBracketIcon,
};

interface CapabilityCardProps {
  capability: TechnicalCapability;
  index: number;
}

export default function CapabilityCard({ capability }: CapabilityCardProps) {
  const Icon = CATEGORY_ICONS[capability.category] ?? WrenchScrewdriverIcon;

  return (
    <div className="capability-card flex flex-col h-full p-6 border border-line rounded-md" style={{ background: 'var(--surface)' }}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span
          className="flex items-center justify-center flex-shrink-0 border border-line rounded-sm"
          style={{ width: 36, height: 36, background: 'var(--surface-2)', color: 'var(--ember)' }}
        >
          <Icon className="w-[18px] h-[18px]" aria-hidden="true" />
        </span>
        <h3 className="font-display text-bone" style={{ fontWeight: 400, fontSize: '1.15rem', lineHeight: 1.2 }}>
          {capability.category}
        </h3>
      </div>

      {/* Description */}
      <p className="text-bone-dim mb-5" style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>
        {capability.description}
      </p>

      {/* Skills as mono chips */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {capability.skills.map((skill) => (
          <span key={skill} className="chip">{skill}</span>
        ))}
      </div>
    </div>
  );
}
