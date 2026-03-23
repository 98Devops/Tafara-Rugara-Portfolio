import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectCard from '../ProjectCard';
import { Project } from '@/types';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, variants, initial, animate, whileHover, whileInView, viewport, transition, className, ...props }: any) => (
      <div className={className} {...props}>{children}</div>
    ),
    span: ({ children, variants, initial, animate, whileHover, whileInView, viewport, transition, className, ...props }: any) => (
      <span className={className} {...props}>{children}</span>
    ),
    ul: ({ children, variants, initial, animate, whileHover, whileInView, viewport, transition, className, ...props }: any) => (
      <ul className={className} {...props}>{children}</ul>
    ),
    li: ({ children, variants, initial, animate, whileHover, whileInView, viewport, transition, className, ...props }: any) => (
      <li className={className} {...props}>{children}</li>
    ),
  },
}));

const mockProject: Project = {
  id: 'test-project',
  title: 'Test Project',
  description: 'A test project for unit testing',
  technologies: ['React', 'TypeScript', 'Jest'],
  highlights: [
    'Feature 1',
    'Feature 2',
    'Feature 3',
    'Feature 4',
    'Feature 5',
    'Feature 6',
  ],
  githubUrl: 'https://github.com/test/project',
  demoUrl: 'https://demo.test.com',
};

describe('ProjectCard', () => {
  it('renders project information correctly', () => {
    render(<ProjectCard project={mockProject} index={0} />);

    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('A test project for unit testing')).toBeInTheDocument();
  });

  it('displays all technologies', () => {
    render(<ProjectCard project={mockProject} index={0} />);

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Jest')).toBeInTheDocument();
  });

  it('displays first 4 highlights and shows count for remaining', () => {
    render(<ProjectCard project={mockProject} index={0} />);

    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Feature 2')).toBeInTheDocument();
    expect(screen.getByText('Feature 3')).toBeInTheDocument();
    expect(screen.getByText('Feature 4')).toBeInTheDocument();
    expect(screen.getByText('+2 more features...')).toBeInTheDocument();
  });

  it('renders GitHub and demo links when provided', () => {
    render(<ProjectCard project={mockProject} index={0} />);

    const githubLink = screen.getByRole('link', { name: /view.*source code.*github/i });
    const demoLink = screen.getByRole('link', { name: /view.*live demo/i });

    expect(githubLink).toHaveAttribute('href', 'https://github.com/test/project');
    expect(demoLink).toHaveAttribute('href', 'https://demo.test.com');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(demoLink).toHaveAttribute('target', '_blank');
  });

  it('does not render links when not provided', () => {
    const projectWithoutLinks: Project = {
      ...mockProject,
      githubUrl: undefined,
      demoUrl: undefined,
    };

    render(<ProjectCard project={projectWithoutLinks} index={0} />);

    expect(screen.queryByRole('link', { name: /view.*source code.*github/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /view.*live demo/i })).not.toBeInTheDocument();
  });

  it('handles projects with few highlights correctly', () => {
    const projectWithFewHighlights: Project = {
      ...mockProject,
      highlights: ['Feature 1', 'Feature 2'],
    };

    render(<ProjectCard project={projectWithFewHighlights} index={0} />);

    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Feature 2')).toBeInTheDocument();
    expect(screen.queryByText(/more features/)).not.toBeInTheDocument();
  });

  it('applies correct CSS classes for styling', () => {
    const { container } = render(<ProjectCard project={mockProject} index={0} />);
    
    const cardElement = container.querySelector('.group');
    expect(cardElement).toBeInTheDocument();
    expect(cardElement).toHaveClass('relative');
  });
});