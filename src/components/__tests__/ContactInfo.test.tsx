import { render, screen } from '@testing-library/react';
import ContactInfo from '../ContactInfo';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, initial, animate, transition, whileHover, whileTap, ...props }: any) => <div {...props}>{children}</div>,
    a: ({ children, initial, animate, transition, whileHover, whileTap, ...props }: any) => <a {...props}>{children}</a>,
  },
}));

// Mock portfolio data
jest.mock('@/data/portfolio', () => ({
  portfolioData: {
    personal: {
      location: 'Harare, Zimbabwe (Remote Available)',
      socialLinks: {
        email: 'tafara.rugara@example.com',
        linkedin: 'https://linkedin.com/in/tafara-rugara',
        github: 'https://github.com/tafara-rugara',
      },
    },
  },
}));

describe('ContactInfo', () => {
  it('renders contact information correctly', () => {
    render(<ContactInfo />);
    
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
    expect(screen.getByText('Contact Information')).toBeInTheDocument();
    expect(screen.getByText('Availability')).toBeInTheDocument();
  });

  it('displays all contact methods', () => {
    render(<ContactInfo />);
    
    // Check for contact method labels
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    
    // Check for contact method values
    expect(screen.getByText('tafara.rugara@example.com')).toBeInTheDocument();
    expect(screen.getByText('linkedin.com/in/tafara-rugara')).toBeInTheDocument();
    expect(screen.getByText('github.com/tafara-rugara')).toBeInTheDocument();
  });

  it('has correct links with proper attributes', () => {
    render(<ContactInfo />);
    
    const emailLink = screen.getByRole('link', { name: /email/i });
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    const githubLink = screen.getByRole('link', { name: /github/i });
    
    expect(emailLink).toHaveAttribute('href', 'mailto:tafara.rugara@example.com');
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/tafara-rugara');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/tafara-rugara');
    
    // Check for security attributes
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('displays availability status', () => {
    render(<ContactInfo />);
    
    // Use more specific matchers to target the availability section
    const availabilityText = screen.getByText(/available for remote cloud engineering and devops/i);
    expect(availabilityText).toBeInTheDocument();
    expect(screen.getByText(/based in harare/i)).toBeInTheDocument();
  });

  it('includes professional description', () => {
    render(<ContactInfo />);
    
    expect(screen.getByText(/ready to discuss cloud engineering/i)).toBeInTheDocument();
    expect(screen.getByText(/let's build something amazing together/i)).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<ContactInfo />);
    
    // Check that all links have descriptive text
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAccessibleName();
    });
  });
});