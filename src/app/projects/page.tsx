'use client';
import { useState } from 'react';
import { portfolioData, automationSystems } from '@/data/portfolio';
import { PageIntro, NextChapter } from '@/components/PageIntro';
import { ProjectArtwork } from '@/components/ProjectArtwork';
import type { Project, ProjectCategory, AutomationSystem } from '@/types';

function toProject(system: AutomationSystem): Project {
  return {
    id: system.id,
    title: system.title,
    category: 'automation',
    description: system.description,
    problem: system.businessContext,
    technicalArchitecture: Array.isArray(system.architecture)
      ? system.architecture.join(' · ')
      : system.architecture,
    outcome: system.outcome,
    technologies: system.technologies ?? system.tools ?? [],
    highlights: system.systemCapabilities ?? [],
    demoUrl: system.demoUrl,
    githubUrl: system.githubUrl,
    documentationUrl: system.documentationUrl,
  };
}
const projects = [
  portfolioData.projects.find(p => p.id === 'trevis-property-management')!,
  portfolioData.projects.find(p => p.id === 'munda')!,
  toProject(automationSystems.flagship),
  ...portfolioData.projects.filter(
    p =>
      ![
        'trevis-property-management',
        'munda',
        'serverless-platform-pattern',
      ].includes(p.id)
  ),
  ...automationSystems.supporting.map(toProject),
];
const filters: { id: 'all' | ProjectCategory; name: string }[] = [
  { id: 'all', name: 'All work' },
  { id: 'webapp', name: 'Applications' },
  { id: 'automation', name: 'AI & automation' },
  { id: 'website', name: 'Websites' },
  { id: 'platform', name: 'Cloud & APIs' },
];
const statuses: Record<string, string> = {
  munda: 'LIVE PRODUCT',
  'trevis-property-management': 'LIVE CLIENT SYSTEM',
  'delivery-health-ai': 'CLIENT PILOT',
  runproduce: 'PRELAUNCH',
  synapse: 'INDEPENDENT PROJECT',
  iats: 'INDEPENDENT PRODUCT',
  'ops-engine': 'HOMELAB PROJECT',
  'telegram-ai-bot': 'PROTOTYPE',
};
export default function ProjectsPage() {
  const [filter, setFilter] = useState<'all' | ProjectCategory>('all');
  const visible = projects.filter(
    p => filter === 'all' || p.category === filter
  );
  return (
    <main className="cinematic-home inner-page">
      <PageIntro
        number="03"
        label="SELECTED WORK"
        title="Built for a reason."
        emphasis="Made to be used."
        description="Client systems, independent products and engineering experiments. The common thread: a real problem and a thoughtful way to solve it."
      >
        <div className="project-index">
          <span>THE WORK, IN CONTEXT</span>
          <strong>
            Software.
            <br />
            Automation.
            <br />
            Infrastructure.
          </strong>
          <p>
            Explore the problem, the build and the decisions behind each
            project.
          </p>
        </div>
      </PageIntro>
      <section
        className="wrap project-collection"
        aria-label="Project portfolio"
      >
        <div
          className="project-filter"
          role="group"
          aria-label="Filter projects"
        >
          {filters.map(item => (
            <button
              type="button"
              key={item.id}
              aria-pressed={filter === item.id}
              onClick={() => setFilter(item.id)}
            >
              {item.name}
              <span>
                {
                  projects.filter(
                    p => item.id === 'all' || p.category === item.id
                  ).length
                }
              </span>
            </button>
          ))}
        </div>
        <p className="collection-count" aria-live="polite">
          {visible.length} projects ·{' '}
          {filters.find(item => item.id === filter)?.name}
        </p>
        <div className="work-grid">
          {visible.map((project, index) => (
            <article
              key={project.id}
              id={project.id}
              className="work-item reveal"
            >
              <ProjectArtwork
                id={project.id}
                category={project.category}
                title={project.title}
              />
              <div className="work-item-content">
                <p className="cinema-eyebrow">
                  {String(index + 1).padStart(2, '0')} /{' '}
                  {statuses[project.id] || project.category?.toUpperCase()}
                </p>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.technologies.slice(0, 5).map(tech => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <details className="case-details">
                  <summary>
                    Inside the build <span aria-hidden="true">+</span>
                  </summary>
                  <div>
                    {project.problem && (
                      <>
                        <h3>The problem</h3>
                        <p>{project.problem}</p>
                      </>
                    )}
                    {project.technicalArchitecture && (
                      <>
                        <h3>What I built</h3>
                        <p>{project.technicalArchitecture}</p>
                      </>
                    )}
                    {project.outcome && (
                      <>
                        <h3>Outcome & status</h3>
                        <p>{project.outcome}</p>
                      </>
                    )}
                    {project.highlights.length > 0 && (
                      <ul>
                        {project.highlights.map(item => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </details>
                <div className="work-links">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.demoUrl.includes('youtube')
                        ? 'Watch demo'
                        : 'Visit project'}{' '}
                      ↗
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Source code ↗
                    </a>
                  )}
                  {project.documentationUrl && (
                    <a
                      href={project.documentationUrl}
                      download="Delivery-Health-Documentation.pdf"
                    >
                      Documentation ↓
                    </a>
                  )}
                  {!project.demoUrl && !project.githubUrl && (
                    <a
                      href={
                        'mailto:tfrsuperfx@gmail.com?subject=' +
                        encodeURIComponent('Tell me about ' + project.title)
                      }
                    >
                      Ask for a walkthrough ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <NextChapter title="Your problem could be next." />
    </main>
  );
}
