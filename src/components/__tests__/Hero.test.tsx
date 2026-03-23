import { render, screen } from '@testing-library/react';
import { Hero } from '../Hero';
import { PersonalInfo } from '@/types';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, whileHover, whileTap, variants, initial, animate, transition, style, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, whileHover, whileTap, variants, initial, animate, transition, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, whileHover, whileTap, variants, initial, animate, transition, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, whileHover, whileTap, variants, initial, animate, transition, ...props }: any) => <p {...props}>{children}</p>,
    a: ({ children, whileHover, whileTap, variants, initial, animate, transition, ...props }: any) => <a {...props}>{children}</a>,
    section: ({ children, whileHover, whileTap, variants, initial, animate, transition, ...props }: any) => <section {...props}>{children}</section>,
  },
}));

const mockPersonalInfo: PersonalInfo = {
  name: 'Tafara Rugara',
  title: 'Junior Cloud & DevOps Engineer',
  location: 'Harare, Zimbabwe (Remote Available)',
  summary: 'Passionate Cloud & DevOps Engineer specializing in AWS, Terraform, Docker, Kubernetes, CI/CD, Automation, Infrastructure as Code, and Observability. Focused on building scalable, reliable systems that drive business value through modern cloud-native practices.',
  socialLinks: {
    github: 'https://github.com/tafara-rugara',
    linkedin: 'https://linkedin.com/in/tafara-rugara',
    email: 'tafara.rugara@example.com',
  },
  documents: {
    cv: '/documents/tafara-rugara-cv.pdf',
    reference: '/documents/tafara-rugara-reference.pdf',
  },
};

describe('Hero Component', () => {
  it('displays correct professional information', () => {
    render(<Hero personal={mockPersonalInfo} />);
    
    // Check name is displayed as main heading
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Tafara Rugara');
    
    // Check title is displayed
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Junior Cloud & DevOps Engineer');
    
    // Check location is displayed
    expect(screen.getByText('Harare, Zimbabwe (Remote Available)')).toBeInTheDocument();
    
    // Check professional summary is displayed
    expect(screen.getByText(/Passionate Cloud & DevOps Engineer specializing in AWS/)).toBeInTheDocument();
  });

  it('includes all required technical keywords in summary', () => {
    render(<Hero personal={mockPersonalInfo} />);
    
    const requiredKeywords = [
      'AWS', 'Terraform', 'Docker', 'Kubernetes', 
      'CI/CD', 'Automation', 'Infrastructure as Code', 'Observability'
    ];
    
    const summaryText = screen.getByText(/Passionate Cloud & DevOps Engineer specializing in AWS/).textContent;
    
    requiredKeywords.forEach(keyword => {
      expect(summaryText).toContain(keyword);
    });
  });

  it('provides all required call-to-action buttons', () => {
    render(<Hero personal={mockPersonalInfo} />);
    
    // Check all required buttons are present using their accessible names
    expect(screen.getByRole('link', { name: /view featured cloud and devops projects portfolio/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /download tafara rugara cv pdf/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /download professional reference letter pdf/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /visit tafara rugara's github profile/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /connect with tafara rugara on linkedin/i })).toBeInTheDocument();
  });

  it('has correct links for call-to-action buttons', () => {
    render(<Hero personal={mockPersonalInfo} />);
    
    // Check View Projects link
    expect(screen.getByRole('link', { name: /view featured cloud and devops projects portfolio/i })).toHaveAttribute('href', '/projects');
    
    // Check CV download link
    expect(screen.getByRole('link', { name: /download tafara rugara cv pdf/i })).toHaveAttribute('href', '/documents/tafara-rugara-cv.pdf');
    
    // Check Reference download link
    expect(screen.getByRole('link', { name: /download professional reference letter pdf/i })).toHaveAttribute('href', '/documents/tafara-rugara-reference.pdf');
    
    // Check GitHub link
    expect(screen.getByRole('link', { name: /visit tafara rugara's github profile/i })).toHaveAttribute('href', 'https://github.com/tafara-rugara');
    
    // Check LinkedIn link
    expect(screen.getByRole('link', { name: /connect with tafara rugara on linkedin/i })).toHaveAttribute('href', 'https://linkedin.com/in/tafara-rugara');
  });

  it('has proper external link attributes for social links', () => {
    render(<Hero personal={mockPersonalInfo} />);
    
    const githubLink = screen.getByRole('link', { name: /visit tafara rugara's github profile/i });
    const linkedinLink = screen.getByRole('link', { name: /connect with tafara rugara on linkedin/i });
    
    // Check external links have proper attributes
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('has download attributes for document links', () => {
    render(<Hero personal={mockPersonalInfo} />);
    
    const cvLink = screen.getByRole('link', { name: /download tafara rugara cv pdf/i });
    const referenceLink = screen.getByRole('link', { name: /download professional reference letter pdf/i });
    
    // Check download links have download attribute
    expect(cvLink).toHaveAttribute('download');
    expect(referenceLink).toHaveAttribute('download');
  });
});