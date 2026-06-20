'use client';

import { useState, useMemo } from 'react';
import { portfolioData, automationSystems } from '@/data/portfolio';
import CaseCard from '@/components/CaseCard';
import type { Project, ProjectCategory } from '@/types';
import type { AutomationSystem } from '@/types';

// Map an automation system into the Project shape so it renders as a case card.
function automationToProject(s: AutomationSystem): Project {
  const arch = Array.isArray(s.architecture) ? s.architecture : s.architecture ? [s.architecture] : [];
  return {
    id: s.id,
    title: s.title,
    category: 'automation',
    description: s.description,
    problem: s.businessContext ?? s.systemPurpose,
    technicalArchitecture: s.systemPurpose ?? s.description,
    outcome: s.outcome,
    technologies: s.technologies ?? s.tools ?? [],
    highlights: s.systemCapabilities && s.systemCapabilities.length > 0 ? s.systemCapabilities : arch,
    demoUrl: s.demoUrl,
    githubUrl: s.githubUrl,
    documentationUrl: s.documentationUrl,
  };
}

type Filter = 'all' | ProjectCategory;

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all',        label: 'All' },
  { value: 'website',    label: 'Websites' },
  { value: 'webapp',     label: 'Web Apps' },
  { value: 'automation', label: 'Automation' },
  { value: 'platform',   label: 'Platform' },
];

// Outcome numerals for the cards that have a headline metric.
const OUTCOMES: Record<string, { big: string; unit?: string; label: string }> = {
  'delivery-health-ai': { big: '2', unit: 'am', label: 'alerts, not outages' },
  'legacy-migration':   { big: '60', unit: '%', label: 'overhead removed' },
  'trevis-property-management': { big: '130', unit: '+', label: 'students live' },
};

export default function ProjectsPage() {
  const [filter, setFilter] = useState<Filter>('all');

  // Unified list: automation systems + data-file projects, in a sensible order.
  const allProjects = useMemo<Project[]>(() => {
    const automation = [automationSystems.flagship, ...automationSystems.supporting].map(automationToProject);
    return [...automation, ...portfolioData.projects];
  }, []);

  const counts = useMemo(() => {
    const c: Record<Filter, number> = { all: allProjects.length, website: 0, webapp: 0, automation: 0, platform: 0 };
    allProjects.forEach(p => { if (p.category) c[p.category] += 1; });
    return c;
  }, [allProjects]);

  const visible = filter === 'all' ? allProjects : allProjects.filter(p => p.category === filter);

  return (
    <main className="border-b border-line">
      {/* Page header */}
      <section className="border-b border-line">
        <div className="wrap" style={{ paddingTop: 'clamp(5rem, 11vw, 8rem)', paddingBottom: 'var(--section-pad)' }}>
          <p className="rise label mb-5">// selected work</p>
          <h1 className="rise d1 font-display text-bone" style={{ fontWeight: 400, fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: 1.06, letterSpacing: '-0.02em', maxWidth: '20ch' }}>
            Systems I designed, built, and still operate.
          </h1>
          <p className="rise d2 mt-6 text-bone-dim" style={{ maxWidth: '54ch', fontSize: '1.05rem', lineHeight: 1.65 }}>
            Websites, web apps, automation, and platform work shipped for real teams
            under real operational pressure — measured by what they changed, not what they used.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <section className="wrap" style={{ paddingTop: 'var(--section-pad)' }}>
        <div className="rise flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
          {FILTERS.map(f => {
            const active = filter === f.value;
            return (
              <button
                key={f.value}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f.value)}
                className="font-mono rounded-sm transition-colors duration-150"
                style={{
                  fontSize: '0.74rem',
                  letterSpacing: '0.04em',
                  padding: '0.5rem 0.9rem',
                  border: '1px solid',
                  borderColor: active ? 'var(--ember)' : 'var(--line-2)',
                  color: active ? 'var(--ember)' : 'var(--bone-dim)',
                  background: active ? 'var(--ember-soft)' : 'transparent',
                }}
              >
                {f.label}
                <span style={{ color: 'var(--bone-faint)', marginLeft: '0.5rem' }}>{counts[f.value]}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Grid */}
      <section className="wrap" style={{ paddingTop: '2rem', paddingBottom: 'var(--section-pad)' }}>
        {visible.length > 0 ? (
          <div className="grid lg:grid-cols-2 gap-6">
            {visible.map((p, i) => (
              <CaseCard
                key={p.id}
                project={p}
                index={i}
                caseId={`${(p.category ?? 'project').toUpperCase()} / ${String(i + 1).padStart(2, '0')}`}
                outcome={OUTCOMES[p.id]}
              />
            ))}
          </div>
        ) : (
          <p className="font-mono text-bone-faint" style={{ fontSize: '0.8rem' }}>No projects in this category yet.</p>
        )}
      </section>
    </main>
  );
}
