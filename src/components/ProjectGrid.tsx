'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/types';
import ProjectCard from './ProjectCard';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

interface ProjectGridProps {
  projects: Project[];
}

type SortOption = 'default' | 'title' | 'technologies';
type FilterOption = 'all' | 'aws' | 'api' | 'ai' | 'serverless';

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        project =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          project.technologies.some(tech =>
            tech.toLowerCase().includes(searchTerm.toLowerCase())
          ) ||
          project.highlights.some(highlight =>
            highlight.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Apply category filter
    if (filterBy !== 'all') {
      filtered = filtered.filter(project => {
        switch (filterBy) {
          case 'aws':
            return project.technologies.some(
              tech =>
                tech.toLowerCase().includes('aws') ||
                tech.toLowerCase().includes('lambda') ||
                tech.toLowerCase().includes('dynamodb') ||
                tech.toLowerCase().includes('cloudfront')
            );
          case 'api':
            return project.technologies.some(
              tech =>
                tech.toLowerCase().includes('api') ||
                tech.toLowerCase().includes('rest') ||
                tech.toLowerCase().includes('express') ||
                tech.toLowerCase().includes('flask')
            );
          case 'ai':
            return (
              project.technologies.some(
                tech =>
                  tech.toLowerCase().includes('llm') ||
                  tech.toLowerCase().includes('vector') ||
                  tech.toLowerCase().includes('ai')
              ) ||
              project.title.toLowerCase().includes('ai') ||
              project.description.toLowerCase().includes('ai')
            );
          case 'serverless':
            return (
              project.technologies.some(
                tech =>
                  tech.toLowerCase().includes('lambda') ||
                  tech.toLowerCase().includes('serverless')
              ) || project.title.toLowerCase().includes('serverless')
            );
          default:
            return true;
        }
      });
    }

    // Apply sorting
    const sorted = [...filtered];
    switch (sortBy) {
      case 'title':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'technologies':
        sorted.sort((a, b) => b.technologies.length - a.technologies.length);
        break;
      default:
        // Keep original order
        break;
    }

    return sorted;
  }, [projects, searchTerm, sortBy, filterBy]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const filterOptions = [
    { value: 'all', label: 'All Projects', count: projects.length },
    {
      value: 'aws',
      label: 'AWS',
      count: projects.filter(p =>
        p.technologies.some(
          tech =>
            tech.toLowerCase().includes('aws') ||
            tech.toLowerCase().includes('lambda') ||
            tech.toLowerCase().includes('dynamodb') ||
            tech.toLowerCase().includes('cloudfront')
        )
      ).length,
    },
    {
      value: 'api',
      label: 'APIs',
      count: projects.filter(p =>
        p.technologies.some(
          tech =>
            tech.toLowerCase().includes('api') ||
            tech.toLowerCase().includes('rest') ||
            tech.toLowerCase().includes('express') ||
            tech.toLowerCase().includes('flask')
        )
      ).length,
    },
    {
      value: 'ai',
      label: 'AI/ML',
      count: projects.filter(
        p =>
          p.technologies.some(
            tech =>
              tech.toLowerCase().includes('llm') ||
              tech.toLowerCase().includes('vector') ||
              tech.toLowerCase().includes('ai')
          ) ||
          p.title.toLowerCase().includes('ai') ||
          p.description.toLowerCase().includes('ai')
      ).length,
    },
    {
      value: 'serverless',
      label: 'Serverless',
      count: projects.filter(
        p =>
          p.technologies.some(
            tech =>
              tech.toLowerCase().includes('lambda') ||
              tech.toLowerCase().includes('serverless')
          ) || p.title.toLowerCase().includes('serverless')
      ).length,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative max-w-md flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-700 bg-gray-900/50 py-3 pl-10 pr-4 text-white placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col gap-4 sm:flex-row">
          {/* Filter Dropdown */}
          <div className="relative">
            <select
              value={filterBy}
              onChange={e => setFilterBy(e.target.value as FilterOption)}
              className="cursor-pointer appearance-none rounded-lg border border-gray-700 bg-gray-900/50 px-4 py-3 pr-10 text-white transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {filterOptions.map(option => (
                <option
                  key={option.value}
                  value={option.value}
                  className="bg-gray-900"
                >
                  {option.label} ({option.count})
                </option>
              ))}
            </select>
            <FunnelIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as SortOption)}
              className="cursor-pointer appearance-none rounded-lg border border-gray-700 bg-gray-900/50 px-4 py-3 pr-10 text-white transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="default" className="bg-gray-900">
                Default Order
              </option>
              <option value="title" className="bg-gray-900">
                Sort by Title
              </option>
              <option value="technologies" className="bg-gray-900">
                Sort by Tech Count
              </option>
            </select>
            <svg
              className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">
          {filteredAndSortedProjects.length === projects.length
            ? `Showing all ${projects.length} projects`
            : `Showing ${filteredAndSortedProjects.length} of ${projects.length} projects`}
        </p>
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="text-sm text-blue-400 transition-colors hover:text-blue-300"
          >
            Clear search
          </button>
        )}
      </div>

      {/* Project Grid */}
      <AnimatePresence mode="wait">
        {filteredAndSortedProjects.length > 0 ? (
          <motion.div
            key={`${searchTerm}-${sortBy}-${filterBy}`}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            exit="hidden"
            className="grid grid-cols-1 gap-8 lg:grid-cols-2"
          >
            {filteredAndSortedProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="py-16 text-center"
          >
            <div className="mb-4 text-gray-400">
              <MagnifyingGlassIcon className="mx-auto mb-4 h-16 w-16 opacity-50" />
              <h3 className="mb-2 text-xl font-medium">No projects found</h3>
              <p className="text-sm">
                Try adjusting your search terms or filters to find what you're
                looking for.
              </p>
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterBy('all');
                setSortBy('default');
              }}
              className="mt-4 rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
