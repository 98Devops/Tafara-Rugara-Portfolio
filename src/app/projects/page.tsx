'use client';

import { portfolioData, automationSystems } from '@/data/portfolio';
import CaseCard from '@/components/CaseCard';
import type { Project, AutomationSystem } from '@/types';

const PLATFORM_IDS = ['acquisitions-api', 'voice-to-vector-api', 'legacy-migration', 'serverless-platform-pattern'];

// Map automation systems into the Project shape so they render as case cards.
function automationToProject(s: AutomationSystem): Project {
  const arch = Array.isArray(s.architecture) ? s.architecture : s.architecture ? [s.architecture] : [];
  return {
    id: s.id,
    title: s.title,
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

export default function ProjectsPage() {
  const platformProjects = PLATFORM_IDS
    .map(id => portfolioData.projects.find(p => p.id === id))
    .filter((p): p is Project => Boolean(p));

  const flagship = automationToProject(automationSystems.flagship);
  const supporting = automationSystems.supporting.map(automationToProject);

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
            Automation and platform work shipped for real teams under real operational
            pressure — each one measured by what it changed, not what it used.
          </p>
        </div>
      </section>

      {/* Automation systems */}
      <section className="wrap" style={{ paddingBlock: 'var(--section-pad)' }}>
        <div className="flex items-baseline justify-between gap-4 flex-wrap mb-8">
          <h2 className="font-display text-bone" style={{ fontWeight: 400, fontSize: 'clamp(1.5rem, 3.4vw, 2.1rem)', letterSpacing: '-0.01em' }}>
            Automation systems
          </h2>
          <p className="label">operational intelligence</p>
        </div>

        <div className="rise mb-8">
          <CaseCard project={flagship} index={0} caseId="CASE 01 / AUTOMATION" outcome={{ big: '2', unit: 'am', label: 'alerts, not outages' }} />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {supporting.map((p, i) => (
            <CaseCard key={p.id} project={p} index={i + 1} caseId={`CASE 0${i + 2} / AUTOMATION`} />
          ))}
        </div>
      </section>

      {/* Platform case studies */}
      <section className="wrap" style={{ paddingBottom: 'var(--section-pad)' }}>
        <div className="flex items-baseline justify-between gap-4 flex-wrap mb-8">
          <h2 className="font-display text-bone" style={{ fontWeight: 400, fontSize: 'clamp(1.5rem, 3.4vw, 2.1rem)', letterSpacing: '-0.01em' }}>
            Platform case studies
          </h2>
          <p className="label">infrastructure &amp; APIs</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {platformProjects.map((p, i) => (
            <CaseCard key={p.id} project={p} index={i} caseId={`CASE 0${i + 1} / PLATFORM`} />
          ))}
        </div>
      </section>
    </main>
  );
}
