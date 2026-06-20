import { render, screen } from '@testing-library/react';
import CapabilityCard from '../CapabilityCard';
import { TechnicalCapability } from '@/types';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      initial,
      whileInView,
      viewport,
      transition,
      whileHover,
      ...props
    }: any) => <div {...props}>{children}</div>,
    span: ({ children, whileHover, transition, ...props }: any) => (
      <span {...props}>{children}</span>
    ),
  },
}));

const mockCapability: TechnicalCapability = {
  category: 'Cloud Architecture',
  description:
    'Designing and deploying scalable cloud infrastructure on AWS with focus on cost efficiency, security, and operational excellence.',
  skills: [
    'AWS (EC2, S3, Lambda, API Gateway, RDS, CloudFront, Route 53, IAM)',
    'Infrastructure as Code — Terraform',
    'Elastic Beanstalk & Managed Services',
    'Serverless Architecture Design',
    'Multi-Region Deployment Patterns',
    'Cloud Security & IAM Best Practices',
  ],
};

describe('CapabilityCard', () => {
  it('renders capability category and description', () => {
    render(<CapabilityCard capability={mockCapability} index={0} />);

    expect(screen.getByText('Cloud Architecture')).toBeInTheDocument();
    expect(
      screen.getByText(/Designing and deploying scalable cloud infrastructure/)
    ).toBeInTheDocument();
  });

  it('renders all skills as tech badges', () => {
    render(<CapabilityCard capability={mockCapability} index={0} />);

    // Check that all skills are rendered
    mockCapability.skills.forEach(skill => {
      expect(screen.getByText(skill)).toBeInTheDocument();
    });
  });

  it('renders the correct number of skills', () => {
    render(<CapabilityCard capability={mockCapability} index={0} />);

    // Count the number of skill badges
    const skillElements = mockCapability.skills.map(skill =>
      screen.getByText(skill)
    );
    expect(skillElements).toHaveLength(mockCapability.skills.length);
  });

  it('displays a category icon (Heroicon SVG, no emoji)', () => {
    const { container } = render(
      <CapabilityCard capability={mockCapability} index={0} />
    );

    // Redesign: category icon is a Heroicon SVG, not an emoji.
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.textContent).not.toContain('☁️');
  });

  it('applies capability-card styling', () => {
    const { container } = render(
      <CapabilityCard capability={mockCapability} index={0} />
    );

    const cardElement = container.firstChild as HTMLElement;
    expect(cardElement).toHaveClass('capability-card');
  });

  it('renders different category with correct icon', () => {
    const devOpsCapability: TechnicalCapability = {
      category: 'DevOps & CI/CD',
      description:
        'Building robust CI/CD pipelines and container orchestration.',
      skills: ['GitHub Actions', 'Docker', 'Kubernetes'],
    };

    const { container } = render(
      <CapabilityCard capability={devOpsCapability} index={1} />
    );

    expect(screen.getByText('DevOps & CI/CD')).toBeInTheDocument();
    // DevOps & CI/CD renders a Heroicon SVG (no emoji)
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders Website Development category with correct icon and styling', () => {
    const websiteCapability: TechnicalCapability = {
      category: 'Website Development',
      description:
        'Building modern, performant websites with React, Next.js, and cutting-edge web technologies.',
      skills: ['Next.js & React', 'TypeScript', 'Tailwind CSS'],
    };

    const { container } = render(
      <CapabilityCard capability={websiteCapability} index={4} />
    );

    expect(screen.getByText('Website Development')).toBeInTheDocument();
    // Website Development renders a Heroicon SVG (no emoji)
    expect(container.querySelector('svg')).toBeInTheDocument();

    // Check that skills are rendered
    expect(screen.getByText('Next.js & React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Tailwind CSS')).toBeInTheDocument();
  });
});
