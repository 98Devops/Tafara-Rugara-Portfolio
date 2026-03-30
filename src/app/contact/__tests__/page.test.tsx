import { render, screen } from '@testing-library/react';
import Contact from '../page';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      initial,
      animate,
      whileInView,
      viewport,
      transition,
      ...props
    }: any) => <div {...props}>{children}</div>,
    h1: ({ children, initial, animate, transition, ...props }: any) => (
      <h1 {...props}>{children}</h1>
    ),
    p: ({ children, initial, animate, transition, ...props }: any) => (
      <p {...props}>{children}</p>
    ),
    a: ({
      children,
      initial,
      whileInView,
      viewport,
      transition,
      whileHover,
      ...props
    }: any) => <a {...props}>{children}</a>,
  },
}));

// Mock ContactInfo component
jest.mock('@/components/ContactInfo', () => {
  return function MockContactInfo() {
    return (
      <div data-testid="contact-info">
        <h3>Let's Build Together</h3>
        <p>Open to Cloud & DevOps engineering roles</p>
        <div>Email</div>
        <div>WhatsApp</div>
        <div>LinkedIn</div>
        <div>GitHub</div>
        <div>YouTube</div>
      </div>
    );
  };
});

// Mock ContactForm component
jest.mock('@/components/ContactForm', () => {
  const MockContactForm = function MockContactForm() {
    return (
      <form data-testid="contact-form">
        <input aria-label="Full Name" />
        <input aria-label="Email Address" />
        <textarea aria-label="Message" />
        <button type="submit">Send via WhatsApp</button>
      </form>
    );
  };
  return { __esModule: true, default: MockContactForm };
});

// Mock next/dynamic to return the component directly
jest.mock('next/dynamic', () => {
  return function dynamic(importFn: any) {
    // Return a component that renders the mocked ContactForm
    const MockedDynamicComponent = () => {
      const ContactForm = require('@/components/ContactForm').default;
      return <ContactForm />;
    };
    return MockedDynamicComponent;
  };
});

describe('Contact Page', () => {
  it('renders the contact page correctly', () => {
    render(<Contact />);

    // Check main heading
    expect(screen.getByText("Let's Work Together")).toBeInTheDocument();

    // Check description
    expect(
      screen.getByText(/Cloud & DevOps engineering, AI automation consulting/)
    ).toBeInTheDocument();

    // Check contact form section
    expect(screen.getByText(/Send a Message/)).toBeInTheDocument();

    // Check contact info section
    expect(screen.getByText("Let's Build Together")).toBeInTheDocument();

    // Check form fields
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /send via whatsapp/i })
    ).toBeInTheDocument();

    // Check contact methods
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
  });

  it('displays availability badge', () => {
    render(<Contact />);

    expect(screen.getByText('Open to Opportunities')).toBeInTheDocument();
  });

  it('includes WhatsApp CTA section', () => {
    render(<Contact />);

    expect(
      screen.getByText('Prefer a direct conversation?')
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Message me directly on WhatsApp/)
    ).toBeInTheDocument();

    // Check for WhatsApp link
    const whatsappLink = screen.getByRole('link', {
      name: /chat on whatsapp/i,
    });
    expect(whatsappLink).toHaveAttribute('href', 'https://wa.me/263777553271');
    expect(whatsappLink).toHaveAttribute('target', '_blank');
    expect(whatsappLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('includes email CTA link', () => {
    render(<Contact />);

    const emailLink = screen.getByRole('link', { name: /send email/i });
    expect(emailLink).toHaveAttribute('href', 'mailto:tfrsuperfx@gmail.com');
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
    expect(h2Elements.length).toBeGreaterThan(0);
    expect(h2Elements[0]).toHaveTextContent('💬 Send a Message');
  });

  it('displays response time promise', () => {
    render(<Contact />);

    expect(screen.getByText(/respond within 24 hours/)).toBeInTheDocument();
  });

  it('shows service offerings', () => {
    render(<Contact />);

    expect(
      screen.getByText(
        /Cloud & DevOps engineering, AI automation consulting, infrastructure architecture/
      )
    ).toBeInTheDocument();
  });
});
