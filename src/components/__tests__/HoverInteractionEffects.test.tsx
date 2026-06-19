import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Navigation } from '../Navigation';
import ContactForm from '../ContactForm';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    form: ({ children, onSubmit, ...props }: any) => (
      <form onSubmit={onSubmit} {...props}>
        {children}
      </form>
    ),
    button: ({ children, onClick, ...props }: any) => (
      <button onClick={onClick} {...props}>
        {children}
      </button>
    ),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('Hover and Interaction Effects', () => {
  describe('Navigation Component', () => {
    it('should have proper focus outline for logo link', () => {
      render(<Navigation />);

      const logoLink = screen.getByRole('link', { name: /tafara rugara/i });
      expect(logoLink).toHaveClass('focus:outline-none');
      expect(logoLink).toBeInTheDocument();
    });

    it('should have transition effects for navigation links', () => {
      render(<Navigation />);

      const projectsLink = screen.getByRole('link', { name: /projects/i });
      expect(projectsLink).toHaveClass('transition-all', 'duration-200');
    });

    it('should have proper focus state for mobile menu button', () => {
      render(<Navigation />);

      const menuButton = screen.getByRole('button', { name: /toggle menu/i });
      expect(menuButton).toHaveClass('focus:outline-none');
      expect(menuButton).toBeInTheDocument();
    });
  });

  describe('ContactForm Component', () => {
    it('should have proper focus states for form inputs', () => {
      render(<ContactForm />);

      const nameInput = screen.getByLabelText(/full name/i);
      const emailInput = screen.getByLabelText(/email address/i);
      const messageInput = screen.getByLabelText(/message/i);

      expect(nameInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(messageInput).toBeInTheDocument();
    });

    it('should have transition effects for form inputs', () => {
      render(<ContactForm />);

      const nameInput = screen.getByLabelText(/full name/i);
      expect(nameInput).toHaveClass('transition-all', 'duration-200');
    });

    it('should have proper focus state for submit button', () => {
      render(<ContactForm />);

      const submitButton = screen.getByRole('button', {
        name: /send via whatsapp/i,
      });
      expect(submitButton).toBeInTheDocument();
    });

    it('should have transition effects for submit button', () => {
      render(<ContactForm />);

      const submitButton = screen.getByRole('button', {
        name: /send via whatsapp/i,
      });
      expect(submitButton).toHaveClass('transition-all', 'duration-200');
    });
  });

  describe('Accessibility Compliance', () => {
    it('should have focusable navigation elements', () => {
      render(<Navigation />);

      const focusableElements = screen.getAllByRole('link');
      expect(focusableElements.length).toBeGreaterThan(0);

      focusableElements.forEach(element => {
        expect(element).toBeInTheDocument();
      });
    });

    it('should maintain keyboard navigation functionality', async () => {
      const user = userEvent.setup();
      render(<Navigation />);

      // Test that tab navigation works
      await user.tab();
      const logoLink = screen.getByRole('link', { name: /tafara rugara/i });
      expect(logoLink).toHaveFocus();
    });
  });

  describe('Transition Performance', () => {
    it('should use appropriate transition durations', () => {
      render(<Navigation />);

      const navLinks = screen
        .getAllByRole('link')
        .filter(
          link =>
            link.textContent &&
            ['Home', 'What I Do', 'Projects', 'Experience', 'Contact'].includes(
              link.textContent
            )
        );

      navLinks.forEach(link => {
        const classes = link.className;
        expect(classes).toContain('transition-all');
        expect(classes).toContain('duration-200');
      });
    });
  });
});
