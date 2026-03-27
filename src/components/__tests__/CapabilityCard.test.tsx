import { render, screen } from '@testing-library/react';
import CapabilityCard from '../CapabilityCard';
import { TechnicalCapability } from '@/types';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, initial, whileInView, viewport, transition, whileHover, ...props }: any) => 
      <div {...props}>{children}</div>,
    span: ({ children, whileHover, transition, ...props }: any) => 
      <span {...props}>{children}</span>,
  },
}));

const mockCapability: TechnicalCapability = {
  category: 'Cloud Architecture',
  description: 'Designing and deploying scalable cloud infrastructure on AWS with focus on cost efficiency, security, and operational excellence.',
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
    expect(screen.getByText(/Designing and deploying scalable cloud infrastructure/)).toBeInTheDocument();
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

  it('displays category icon', () => {
    const { container } = render(<CapabilityCard capability={mockCapability} index={0} />);
    
    // Check that the icon is rendered (Cloud Architecture should have ☁️)
    expect(container.textContent).toContain('☁️');
  });

  it('applies glass-card styling', () => {
    const { container } = render(<CapabilityCard capability={mockCapability} index={0} />);
    
    // Check that the main card has the glass-card class
    const cardElement = container.firstChild as HTMLElement;
    expect(cardElement).toHaveClass('glass-card');
  });

  it('renders different category with correct icon', () => {
    const devOpsCapability: TechnicalCapability = {
      category: 'DevOps & CI/CD',
      description: 'Building robust CI/CD pipelines and container orchestration.',
      skills: ['GitHub Actions', 'Docker', 'Kubernetes'],
    };

    const { container } = render(<CapabilityCard capability={devOpsCapability} index={1} />);
    
    expect(screen.getByText('DevOps & CI/CD')).toBeInTheDocument();
    // DevOps & CI/CD should have ⚙️ icon
    expect(container.textContent).toContain('⚙️');
  });
});
