import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectGrid from '../ProjectGrid';
import { Project } from '@/types';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

// Mock ProjectCard component
jest.mock('../ProjectCard', () => {
  return function MockProjectCard({ project }: { project: Project }) {
    return <div data-testid={`project-${project.id}`}>{project.title}</div>;
  };
});

const mockProjects: Project[] = [
  {
    id: 'aws-project',
    title: 'AWS Lambda Project',
    description: 'A serverless project using AWS Lambda',
    technologies: ['AWS Lambda', 'DynamoDB', 'CloudFront'],
    highlights: ['Serverless architecture', 'Auto-scaling'],
    githubUrl: 'https://github.com/test/aws-project',
  },
  {
    id: 'api-project',
    title: 'REST API Project',
    description: 'A REST API built with Express',
    technologies: ['Node.js', 'Express', 'REST API'],
    highlights: ['RESTful design', 'Authentication'],
    demoUrl: 'https://api.demo.com',
  },
  {
    id: 'ai-project',
    title: 'AI Voice Project',
    description: 'An AI-powered voice processing system',
    technologies: ['Python', 'LLM', 'Vector Database'],
    highlights: ['AI integration', 'Voice processing'],
  },
];

describe('ProjectGrid', () => {
  it('renders all projects by default', () => {
    render(<ProjectGrid projects={mockProjects} />);

    expect(screen.getByTestId('project-aws-project')).toBeInTheDocument();
    expect(screen.getByTestId('project-api-project')).toBeInTheDocument();
    expect(screen.getByTestId('project-ai-project')).toBeInTheDocument();
    expect(screen.getByText('Showing all 3 projects')).toBeInTheDocument();
  });

  it('filters projects by search term', () => {
    render(<ProjectGrid projects={mockProjects} />);

    const searchInput = screen.getByPlaceholderText('Search projects...');
    fireEvent.change(searchInput, { target: { value: 'AWS' } });

    expect(screen.getByTestId('project-aws-project')).toBeInTheDocument();
    expect(screen.queryByTestId('project-api-project')).not.toBeInTheDocument();
    expect(screen.queryByTestId('project-ai-project')).not.toBeInTheDocument();
    expect(screen.getByText('Showing 1 of 3 projects')).toBeInTheDocument();
  });

  it('filters projects by AWS category', () => {
    render(<ProjectGrid projects={mockProjects} />);

    const filterSelect = screen.getByDisplayValue(/All Projects/);
    fireEvent.change(filterSelect, { target: { value: 'aws' } });

    expect(screen.getByTestId('project-aws-project')).toBeInTheDocument();
    expect(screen.queryByTestId('project-api-project')).not.toBeInTheDocument();
    expect(screen.queryByTestId('project-ai-project')).not.toBeInTheDocument();
  });

  it('filters projects by API category', () => {
    render(<ProjectGrid projects={mockProjects} />);

    const filterSelect = screen.getByDisplayValue(/All Projects/);
    fireEvent.change(filterSelect, { target: { value: 'api' } });

    expect(screen.queryByTestId('project-aws-project')).not.toBeInTheDocument();
    expect(screen.getByTestId('project-api-project')).toBeInTheDocument();
    expect(screen.queryByTestId('project-ai-project')).not.toBeInTheDocument();
  });

  it('filters projects by AI category', () => {
    render(<ProjectGrid projects={mockProjects} />);

    const filterSelect = screen.getByDisplayValue(/All Projects/);
    fireEvent.change(filterSelect, { target: { value: 'ai' } });

    expect(screen.queryByTestId('project-aws-project')).not.toBeInTheDocument();
    expect(screen.queryByTestId('project-api-project')).not.toBeInTheDocument();
    expect(screen.getByTestId('project-ai-project')).toBeInTheDocument();
  });

  it('sorts projects by title', () => {
    render(<ProjectGrid projects={mockProjects} />);

    const sortSelect = screen.getByDisplayValue('Default Order');
    fireEvent.change(sortSelect, { target: { value: 'title' } });

    const projectElements = screen.getAllByTestId(/project-/);
    expect(projectElements[0]).toHaveTextContent('AI Voice Project');
    expect(projectElements[1]).toHaveTextContent('AWS Lambda Project');
    expect(projectElements[2]).toHaveTextContent('REST API Project');
  });

  it('sorts projects by technology count', () => {
    render(<ProjectGrid projects={mockProjects} />);

    const sortSelect = screen.getByDisplayValue('Default Order');
    fireEvent.change(sortSelect, { target: { value: 'technologies' } });

    // All projects have 3 technologies, so order should remain the same
    const projectElements = screen.getAllByTestId(/project-/);
    expect(projectElements).toHaveLength(3);
  });

  it('shows no results message when no projects match filters', () => {
    render(<ProjectGrid projects={mockProjects} />);

    const searchInput = screen.getByPlaceholderText('Search projects...');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });

    expect(screen.getByText('No projects found')).toBeInTheDocument();
    expect(screen.getByText('Try adjusting your search terms or filters to find what you\'re looking for.')).toBeInTheDocument();
  });

  it('clears search when clear button is clicked', () => {
    render(<ProjectGrid projects={mockProjects} />);

    const searchInput = screen.getByPlaceholderText('Search projects...');
    fireEvent.change(searchInput, { target: { value: 'AWS' } });

    expect(screen.getByText('Showing 1 of 3 projects')).toBeInTheDocument();

    const clearButton = screen.getByText('Clear search');
    fireEvent.click(clearButton);

    expect(screen.getByText('Showing all 3 projects')).toBeInTheDocument();
    expect(searchInput).toHaveValue('');
  });

  it('resets all filters when reset button is clicked', () => {
    render(<ProjectGrid projects={mockProjects} />);

    // Apply filters
    const searchInput = screen.getByPlaceholderText('Search projects...');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });

    expect(screen.getByText('No projects found')).toBeInTheDocument();

    const resetButton = screen.getByText('Reset Filters');
    fireEvent.click(resetButton);

    expect(screen.getByText('Showing all 3 projects')).toBeInTheDocument();
  });

  it('displays correct filter counts', () => {
    render(<ProjectGrid projects={mockProjects} />);

    const filterSelect = screen.getByDisplayValue(/All Projects/);
    
    // Check that the options contain the correct counts
    expect(screen.getByText('All Projects (3)')).toBeInTheDocument();
  });

  it('combines search and filter correctly', () => {
    render(<ProjectGrid projects={mockProjects} />);

    // Search for "project" and filter by AWS
    const searchInput = screen.getByPlaceholderText('Search projects...');
    fireEvent.change(searchInput, { target: { value: 'Lambda' } });

    const filterSelect = screen.getByDisplayValue(/All Projects/);
    fireEvent.change(filterSelect, { target: { value: 'aws' } });

    expect(screen.getByTestId('project-aws-project')).toBeInTheDocument();
    expect(screen.queryByTestId('project-api-project')).not.toBeInTheDocument();
    expect(screen.queryByTestId('project-ai-project')).not.toBeInTheDocument();
  });
});