'use client';

import { motion } from 'framer-motion';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.06 }}
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      className="group relative flex flex-col h-full"
      style={{
        background: '#111111',
        border: '1px solid #27272A',
        transition: 'border-color 0.15s ease',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#3F3F46'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#27272A'; }}
    >
      <div className="p-6 flex flex-col h-full">
        {/* Header */}
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-white mb-2" style={{ letterSpacing: '-0.01em' }}>
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: '#A1A1AA' }}>
            {project.description}
          </p>
        </div>

        {/* Problem/Solution Structure */}
        {(project.problem || project.technicalArchitecture || project.operationalValue || project.outcome) && (
          <div className="space-y-3 mb-5">
            {project.problem && (
              <div>
                <span className="mono-label">Problem</span>
                <p className="text-sm mt-1 leading-relaxed" style={{ color: '#A1A1AA' }}>{project.problem}</p>
              </div>
            )}
            {project.technicalArchitecture && (
              <div>
                <span className="mono-label">Architecture</span>
                <p className="text-sm mt-1 leading-relaxed" style={{ color: '#A1A1AA' }}>{project.technicalArchitecture}</p>
              </div>
            )}
            {project.operationalValue && (
              <div>
                <span className="mono-label">Value</span>
                <p className="text-sm mt-1 leading-relaxed" style={{ color: '#A1A1AA' }}>{project.operationalValue}</p>
              </div>
            )}
            {project.outcome && (
              <div>
                <span className="mono-label">Outcome</span>
                <p className="text-sm mt-1 leading-relaxed text-white font-medium">{project.outcome}</p>
              </div>
            )}
          </div>
        )}

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.technologies.map((tech, i) => (
            <span key={i} className="tech-badge">{tech}</span>
          ))}
        </div>

        {/* Highlights */}
        <div className="mb-5">
          <ul className="space-y-1.5">
            {project.highlights.slice(0, 4).map((highlight, i) => (
              <li
                key={i}
                className="text-sm flex items-start gap-2"
                style={{ color: '#A1A1AA' }}
              >
                <span className="mt-2 flex-shrink-0" style={{ width: 4, height: 4, background: '#3F3F46', borderRadius: '50%', display: 'inline-block' }} />
                {highlight}
              </li>
            ))}
            {project.highlights.length > 4 && (
              <li className="text-xs font-mono" style={{ color: '#71717A' }}>
                +{project.highlights.length - 4} more features...
              </li>
            )}
          </ul>
        </div>

        {/* Links */}
        <div
          className="flex items-center gap-4 pt-4 mt-auto"
          style={{ borderTop: '1px solid #27272A' }}
        >
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm transition-colors duration-150"
              style={{ color: '#71717A' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#FFFFFF'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#71717A'; }}
              aria-label={`View ${project.title} source code on GitHub`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
              </svg>
              View Code
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm transition-colors duration-150"
              style={{ color: '#71717A' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#FFFFFF'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#71717A'; }}
              aria-label={`View ${project.title} live demo`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}