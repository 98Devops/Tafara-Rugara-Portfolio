'use client';

import { Project } from '@/types';
import { CodeBracketIcon, ArrowTopRightOnSquareIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

interface CaseCardProps {
  project: Project;
  index: number;
  /** Optional case id label, e.g. "CASE 01 / PLATFORM" */
  caseId?: string;
  /** Optional outcome numeral shown top-right, e.g. { big: "60", unit: "%", label: "downtime removed" } */
  outcome?: { big: string; unit?: string; label: string };
}

/**
 * Editorial, outcome-first case card. Header: case id + Fraunces title + role
 * on the left, large outcome numeral on the right. Body: Problem / What I built
 * split by a hairline. Stack chips at the bottom. Highlights listed plainly.
 */
export default function CaseCard({ project, index, caseId, outcome }: CaseCardProps) {
  const num = String(index + 1).padStart(2, '0');
  const problemCopy = project.problem ?? project.description;
  // Avoid echoing the same description in both cells when no distinct copy exists.
  const builtCandidate = project.technicalArchitecture ?? project.operationalValue ?? project.outcome;
  const builtCopy = builtCandidate ?? (project.problem ? project.description : undefined);

  return (
    <article className="group relative border border-line rounded-md bg-surface overflow-hidden transition-colors duration-200 hover:border-line-2">
      {/* Header */}
      <div className="flex items-start justify-between gap-6 flex-wrap p-6 sm:p-8 border-b border-line">
        <div className="min-w-0">
          <p className="label mb-3" style={{ letterSpacing: '0.1em' }}>{caseId ?? `CASE ${num}`}</p>
          <h3 className="font-display text-bone" style={{ fontWeight: 400, fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', lineHeight: 1.1, letterSpacing: '-0.01em' }}>
            {project.title}
          </h3>
          <p className="font-mono text-bone-dim mt-2" style={{ fontSize: '0.74rem' }}>
            {project.technologies.slice(0, 3).join(' · ')}
          </p>
        </div>

        {outcome && (
          <div className="text-right shrink-0">
            <div className="font-display text-bone" style={{ fontSize: 'clamp(2.2rem, 5vw, 3rem)', lineHeight: 1 }}>
              {outcome.big}
              {outcome.unit && <span className="text-ember" style={{ fontSize: '0.5em' }}>{outcome.unit}</span>}
            </div>
            <p className="label mt-2" style={{ letterSpacing: '0.08em' }}>{outcome.label}</p>
          </div>
        )}
      </div>

      {/* Body: Problem / What I built */}
      <div className="grid sm:grid-cols-2">
        <div className="p-6 sm:p-8">
          <h4 className="label mb-3">The problem</h4>
          <p className="text-bone-dim" style={{ fontSize: '0.94rem', lineHeight: 1.6 }}>
            {problemCopy}
          </p>
        </div>
        {builtCopy && (
          <div className="p-6 sm:p-8 border-t sm:border-t-0 sm:border-l border-line">
            <h4 className="label mb-3">What I built</h4>
            <p className="text-bone-dim" style={{ fontSize: '0.94rem', lineHeight: 1.6 }}>
              {builtCopy}
            </p>
          </div>
        )}
      </div>

      {/* Highlights */}
      {project.highlights.length > 0 && (
        <div className="px-6 sm:px-8 pb-2">
          <ul className="space-y-1.5">
            {project.highlights.slice(0, 4).map((h, i) => (
              <li key={i} className="flex items-start gap-2.5 text-bone-dim" style={{ fontSize: '0.9rem' }}>
                <span aria-hidden="true" className="text-ember shrink-0" style={{ lineHeight: 1.6 }}>—</span>
                {h}
              </li>
            ))}
            {project.highlights.length > 4 && (
              <li className="font-mono text-bone-faint" style={{ fontSize: '0.72rem' }}>
                +{project.highlights.length - 4} more features...
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Stack chips */}
      <div className="flex flex-wrap gap-1.5 px-6 sm:px-8 pt-4 pb-5">
        {project.technologies.map((tech, i) => (
          <span key={i} className="chip">{tech}</span>
        ))}
      </div>

      {/* Links */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-6 sm:px-8 pb-6 pt-2 border-t border-line">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-bone-dim hover:text-bone transition-colors"
            style={{ fontSize: '0.74rem' }}
            aria-label={`View ${project.title} source code on GitHub`}
          >
            <CodeBracketIcon className="w-4 h-4" aria-hidden="true" />
            View Repository
          </a>
        )}
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-bone-dim hover:text-bone transition-colors"
            style={{ fontSize: '0.74rem' }}
            aria-label={`View ${project.title} live demo`}
          >
            <ArrowTopRightOnSquareIcon className="w-4 h-4" aria-hidden="true" />
            View Live Demo
          </a>
        )}
        {project.documentationUrl && (
          <a
            href={project.documentationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-bone-dim hover:text-bone transition-colors"
            style={{ fontSize: '0.74rem' }}
            aria-label={`View ${project.title} documentation`}
          >
            <DocumentTextIcon className="w-4 h-4" aria-hidden="true" />
            Documentation
          </a>
        )}
        <a
          href="/contact"
          className="inline-flex items-center gap-1.5 font-mono text-bone-faint hover:text-bone transition-colors"
          style={{ fontSize: '0.74rem' }}
          aria-label={`Request case details for ${project.title}`}
        >
          Request Case Details
        </a>
      </div>
    </article>
  );
}
