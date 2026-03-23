import { render, screen } from '@testing-library/react';
import Contact from '../page';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, initial, animate, transition, whileHover, whileTap, ...props }: any) => <div {...props}>{children}</div>,
    form: ({ children, initial, animate, transition, whileHover, whileTap, ...props }: any) => <form {...props}>{children}</form>,
    button: ({ children, initial, animate, transition, whileHover, whileTap, ...props }: any) => <button {...props}>{children}</button>,
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

describe('Contact Page', () => {
  it('renders the contact page correctly', () => {
    render(<Contact />);
    
    // Check main heading
    expect(screen.getByText("Let's Work Together")).toBeInTheDocument();
    
    // Check description (use getAllByText since there are multiple similar texts)
    const descriptions = screen.getAllByText(/ready to discuss cloud & devops opportunities/i);
    expect(descriptions.length).toBeGreaterThan(0);
    
    // Check contact form section
    expect(screen.getByText('Send a Message')).toBeInTheDocument();
    
    // Check contact info section
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
    expect(screen.getByText('Contact Information')).toBeInTheDocument();
    
    // Check form fields
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    
    // Check contact methods
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    
    // Check availability section
    expect(screen.getByText('Availability')).toBeInTheDocument();
    expect(screen.getByText('Available for remote opportunities worldwide')).toBeInTheDocument();
  });

  it('has proper Netlify form configuration', () => {
    render(<Contact />);
    
    const form = screen.getByRole('form');
    expect(form).toHaveAttribute('data-netlify', 'true');
    expect(form).toHaveAttribute('name', 'contact');
    expect(form).toHaveAttribute('method', 'POST');
    
    // Check for hidden form-name field
    expect(screen.getByDisplayValue('contact')).toBeInTheDocument();
  });

  it('includes professional CTA section', () => {
    render(<Contact />);
    
    expect(screen.getByText('Ready to Scale Your Infrastructure?')).toBeInTheDocument();
    expect(screen.getByText(/with expertise in aws, kubernetes/i)).toBeInTheDocument();
    
    // Check for badges
    expect(screen.getByText('AWS Certified')).toBeInTheDocument();
    expect(screen.getByText('Remote Available')).toBeInTheDocument();
    expect(screen.getByText('DevOps Expert')).toBeInTheDocument();
  });

  it('has proper semantic structure', () => {
    render(<Contact />);
    
    // Check for main element
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    
    // Check for proper heading hierarchy
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent("Let's Work Together");
    
    const h2Elements = screen.getAllByRole('heading', { level: 2 });
    expect(h2Elements).toHaveLength(1);
    expect(h2Elements[0]).toHaveTextContent('Send a Message');
    
    const h3Elements = screen.getAllByRole('heading', { level: 3 });
    expect(h3Elements.length).toBeGreaterThan(0);
  });

  it('includes all required contact links with proper attributes', () => {
    render(<Contact />);
    
    const emailLink = screen.getByRole('link', { name: /email/i });
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    const githubLink = screen.getByRole('link', { name: /github/i });
    
    expect(emailLink).toHaveAttribute('href', 'mailto:tafara.rugara@example.com');
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/tafara-rugara');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/tafara-rugara');
    
    // Check for security attributes on external links
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});