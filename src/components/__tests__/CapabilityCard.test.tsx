import { render, screen } from '@testing-library/react';
import CapabilityCard from '../CapabilityCard';
import { TechnicalCapability } from '@/types';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

const mockCapability: TechnicalCapability = {
  category: 'Cloud Architecture',
  description: 'Designing and implementing scalable cloud solutions with focus on security, cost optimization, and performance.',
  skills: [
    'AWS Services (EC2, S3, Lambda, RDS, VPC)',
    'Infrastructure as Code (Terraform, CloudFormation)',
    'Secure IAM Design & Implementation',
    'Serverless Architecture & Design',
    'Cost Optimization Strategies',
    'Cloud Networking & Security',
  ],
};

describe('CapabilityCard', () => {
  it('renders capability category and description', () => {
    render(<CapabilityCard capability={mockCapability} index={0} />);
    
    expect(screen.getByText('Cloud Architecture')).toBeInTheDocument();
    expect(screen.getByText(/Designing and implementing scalable cloud solutions/)).toBeInTheDocument();
  });

  it('renders all skills with bullet points', () => {
    render(<CapabilityCard capability={mockCapability} index={0} />);
    
    // Check that all skills are rendered
    mockCapability.skills.forEach(skill => {
      expect(screen.getByText(skill)).toBeInTheDocument();
    });
    
    // Check that "Key Skills" header is present
    expect(screen.getByText('Key Skills')).toBeInTheDocument();
  });

  it('renders the correct number of skills', () => {
    render(<CapabilityCard capability={mockCapability} index={0} />);
    
    // Count the number of skill items (should match the skills array length)
    const skillElements = screen.getAllByText(/AWS Services|Infrastructure as Code|Secure IAM|Serverless|Cost Optimization|Cloud Networking/);
    expect(skillElements).toHaveLength(mockCapability.skills.length);
  });

  it('applies correct CSS classes for styling', () => {
    const { container } = render(<CapabilityCard capability={mockCapability} index={0} />);
    
    // Check that the main card has the expected styling classes
    const cardElement = container.firstChild as HTMLElement;
    expect(cardElement).toHaveClass('bg-gray-800', 'rounded-lg', 'p-6');
  });
});