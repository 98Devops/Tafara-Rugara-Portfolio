'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/types';
import ProjectCard from './ProjectCard';

interface ProjectGridProps {
  projects: Project[];
}

type SortOption = 'default' | 'title' | 'technologies';
type FilterOption = 'all' | 'aws' | 'api' | 'ai' | 'serverless';

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects;

    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.technologies.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase())) ||
          project.highlights.some((h) => h.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (filterBy !== 'all') {
      filtered = filtered.filter((project) => {
        switch (filterBy) {
          case 'aws':
            return project.technologies.some((tech) =>
              ['aws','lambda','dynamodb','cloudfront'].some(k => tech.toLowerCase().includes(k))
            );
          case 'api':
            return project.technologies.some((tech) =>
              ['api','rest','express','flask'].some(k => tech.toLowerCase().includes(k))
            );
          case 'ai':
            return project.technologies.some((tech) =>
              ['llm','vector','ai'].some(k => tech.toLowerCase().includes(k))
            ) || project.title.toLowerCase().includes('ai') || project.description.toLowerCase().includes('ai');
          case 'serverless':
            return project.technologies.some((tech) =>
              ['lambda','serverless'].some(k => tech.toLowerCase().includes(k))
            ) || project.title.toLowerCase().includes('serverless');
          default:
            return true;
        }
      });
    }

    const sorted = [...filtered];
    switch (sortBy) {
      case 'title': sorted.sort((a, b) => a.title.localeCompare(b.title)); break;
      case 'technologies': sorted.sort((a, b) => b.technologies.length - a.technologies.length); break;
    }
    return sorted;
  }, [projects, searchTerm, sortBy, filterBy]);

  const filterOptions: { value: FilterOption; label: string; count: number }[] = [
    { value: 'all', label: 'All Projects', count: projects.length },
    { value: 'aws', label: 'AWS', count: projects.filter(p => p.technologies.some(t => ['aws','lambda','dynamodb','cloudfront'].some(k => t.toLowerCase().includes(k)))).length },
    { value: 'api', label: 'APIs', count: projects.filter(p => p.technologies.some(t => ['api','rest','express','flask'].some(k => t.toLowerCase().includes(k)))).length },
    { value: 'ai', label: 'AI/ML', count: projects.filter(p => p.technologies.some(t => ['llm','vector','ai'].some(k => t.toLowerCase().includes(k))) || p.title.toLowerCase().includes('ai') || p.description.toLowerCase().includes('ai')).length },
    { value: 'serverless', label: 'Serverless', count: projects.filter(p => p.technologies.some(t => ['lambda','serverless'].some(k => t.toLowerCase().includes(k))) || p.title.toLowerCase().includes('serverless')).length },
  ];

  const inputStyle = {
    background: '#0A0A0A',
    border: '1px solid #27272A',
    color: '#FFFFFF',
    outline: 'none',
    borderRadius: '0px',
  };

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: '#71717A' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm transition-colors duration-150"
            style={inputStyle}
            onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = '#FFFFFF'; }}
            onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = '#27272A'; }}
          />
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-1 flex-wrap">
          {filterOptions.map((opt) => {
            const isActive = filterBy === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => setFilterBy(opt.value)}
                className="px-3 py-2 text-xs font-mono transition-colors duration-150"
                style={{
                  background: isActive ? '#FFFFFF' : 'transparent',
                  color: isActive ? '#0A0A0A' : '#71717A',
                  border: '1px solid',
                  borderColor: isActive ? '#FFFFFF' : '#27272A',
                }}
              >
                {opt.label} ({opt.count})
              </button>
            );
          })}

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-3 py-2 text-xs font-mono cursor-pointer ml-2"
            style={{ ...inputStyle, border: '1px solid #27272A' }}
          >
            <option value="default" style={{ background: '#111111' }}>Default</option>
            <option value="title" style={{ background: '#111111' }}>A–Z</option>
            <option value="technologies" style={{ background: '#111111' }}>Tech Count</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono" style={{ color: '#71717A' }}>
          {filteredAndSortedProjects.length === projects.length
            ? `${projects.length} projects`
            : `${filteredAndSortedProjects.length} of ${projects.length} projects`}
        </p>
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="text-xs font-mono transition-colors duration-150 hover:text-white"
            style={{ color: '#71717A' }}
          >
            Clear search
          </button>
        )}
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        {filteredAndSortedProjects.length > 0 ? (
          <motion.div
            key={`${searchTerm}-${sortBy}-${filterBy}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {filteredAndSortedProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-20"
          >
            <p className="text-sm font-mono mb-4" style={{ color: '#71717A' }}>No projects found</p>
            <button
              onClick={() => { setSearchTerm(''); setFilterBy('all'); setSortBy('default'); }}
              className="px-4 py-2 text-xs font-mono transition-colors duration-150"
              style={{ background: '#FFFFFF', color: '#0A0A0A', border: '1px solid #FFFFFF' }}
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}