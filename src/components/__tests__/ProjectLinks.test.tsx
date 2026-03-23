import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectCard from '../ProjectCard';
import { portfolioData } from '@/data/portfolio';

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

describe('ProjectCard Links Integration', () => {
  it('renders GitHub and demo links for Acquisitions API project when provided', () => {
    const acquisitionsProject = portfolioData.projects.find(p => p.id === 'acquisitions-api')!;
    render(<ProjectCard project={acquisitionsProject} index={0} />);

    if (acquisitionsProject.githubUrl && acquisitionsProject.githubUrl.length > 0) {
      const githubLink = screen.getByRole('link', { name: /view.*source code.*github/i });
      expect(githubLink).toHaveAttribute('href', acquisitionsProject.githubUrl);
      expect(githubLink).toHaveAttribute('target', '_blank');
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    } else {
      expect(screen.queryByRole('link', { name: /view.*source code.*github/i })).not.toBeInTheDocument();
    }

    if (acquisitionsProject.demoUrl && acquisitionsProject.demoUrl.length > 0) {
      const demoLink = screen.getByRole('link', { name: /view.*live demo/i });
      expect(demoLink).toHaveAttribute('href', acquisitionsProject.demoUrl);
      expect(demoLink).toHaveAttribute('target', '_blank');
      expect(demoLink).toHaveAttribute('rel', 'noopener noreferrer');
    } else {
      expect(screen.queryByRole('link', { name: /view.*live demo/i })).not.toBeInTheDocument();
    }
  });

  it('renders GitHub link for Voice-to-Vector API project when provided', () => {
    const voiceProject = portfolioData.projects.find(p => p.id === 'voice-to-vector-api')!;
    render(<ProjectCard project={voiceProject} index={0} />);

    if (voiceProject.githubUrl && voiceProject.githubUrl.length > 0) {
      const githubLink = screen.getByRole('link', { name: /view.*source code.*github/i });
      expect(githubLink).toHaveAttribute('href', voiceProject.githubUrl);
      expect(githubLink).toHaveAttribute('target', '_blank');
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    } else {
      expect(screen.queryByRole('link', { name: /view.*source code.*github/i })).not.toBeInTheDocument();
    }

    if (voiceProject.demoUrl && voiceProject.demoUrl.length > 0) {
      const demo = screen.getByRole('link', { name: /view.*live demo/i });
      expect(demo).toHaveAttribute('href', voiceProject.demoUrl);
    } else {
      expect(screen.queryByRole('link', { name: /view.*live demo/i })).not.toBeInTheDocument();
    }
  });

  it('renders GitHub and demo links for Serverless pattern project when provided', () => {
    const serverlessProject = portfolioData.projects.find(p => p.id === 'serverless-platform-pattern')!;
    render(<ProjectCard project={serverlessProject} index={0} />);

    if (serverlessProject.githubUrl && serverlessProject.githubUrl.length > 0) {
      const githubLink = screen.getByRole('link', { name: /view.*source code.*github/i });
      expect(githubLink).toHaveAttribute('href', serverlessProject.githubUrl);
    } else {
      expect(screen.queryByRole('link', { name: /view.*source code.*github/i })).not.toBeInTheDocument();
    }

    if (serverlessProject.demoUrl && serverlessProject.demoUrl.length > 0) {
      const demoLink = screen.getByRole('link', { name: /view.*live demo/i });
      expect(demoLink).toHaveAttribute('href', serverlessProject.demoUrl);
    } else {
      expect(screen.queryByRole('link', { name: /view.*live demo/i })).not.toBeInTheDocument();
    }
  });

  it('renders only GitHub link for legacy migration project when provided', () => {
    const tomcatProject = portfolioData.projects.find(p => p.id === 'legacy-migration')!;
    render(<ProjectCard project={tomcatProject} index={0} />);

    if (tomcatProject.githubUrl && tomcatProject.githubUrl.length > 0) {
      const githubLink = screen.getByRole('link', { name: /view.*source code.*github/i });
      expect(githubLink).toHaveAttribute('href', tomcatProject.githubUrl);
    } else {
      expect(screen.queryByRole('link', { name: /view.*source code.*github/i })).not.toBeInTheDocument();
    }

    expect(screen.queryByRole('link', { name: /view.*live demo/i })).not.toBeInTheDocument();
  });

  it('verifies all projects have external link icons', () => {
    portfolioData.projects.forEach((project, index) => {
      const { container } = render(<ProjectCard project={project} index={index} />);
      
      if (project.githubUrl) {
        const githubIcon = container.querySelector('svg'); // CodeBracketIcon
        expect(githubIcon).toBeInTheDocument();
      }
      
      if (project.demoUrl) {
        const demoIcon = container.querySelector('svg'); // ArrowTopRightOnSquareIcon
        expect(demoIcon).toBeInTheDocument();
      }
    });
  });
});