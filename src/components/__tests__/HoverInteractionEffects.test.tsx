import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Navigation } from '../Navigation';
import ContactForm from '../ContactForm';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Hover and Interaction Effects', () => {
  describe('Navigation Component', () => {
    it('should have proper focus states for logo link', () => {
      render(<Navigation />);
      
      const logoLink = screen.getByRole('link', { name: /tafara rugara/i });
      expect(logoLink).toHaveClass('focus:ring-2', 'focus:ring-blue-500', 'focus:ring-offset-2', 'focus:ring-offset-gray-900');
    });

    it('should have hover effects for navigation links', () => {
      render(<Navigation />);
      
      const projectsLink = screen.getByRole('link', { name: /projects/i });
      expect(projectsLink).toHaveClass('hover:text-white', 'hover:bg-gray-800/50', 'hover:scale-105');
    });

    it('should have proper focus state for mobile menu button', () => {
      render(<Navigation />);
      
      const menuButton = screen.getByRole('button', { name: /toggle mobile menu/i });
      expect(menuButton).toHaveClass('focus:ring-2', 'focus:ring-blue-500', 'hover:scale-105');
    });
  });

  describe('ContactForm Component', () => {
    it('should have proper focus states for form inputs', () => {
      render(<ContactForm />);
      
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);
      
      expect(nameInput).toHaveClass('focus:ring-2', 'focus:ring-blue-500');
      expect(emailInput).toHaveClass('focus:ring-2', 'focus:ring-blue-500');
      expect(messageInput).toHaveClass('focus:ring-2', 'focus:ring-blue-500');
    });

    it('should have hover effects for form inputs', () => {
      render(<ContactForm />);
      
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);
      
      expect(nameInput).toHaveClass('hover:border-gray-500');
      expect(emailInput).toHaveClass('hover:border-gray-500');
      expect(messageInput).toHaveClass('hover:border-gray-500');
    });

    it('should have proper focus state for submit button', () => {
      render(<ContactForm />);
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      expect(submitButton).toHaveClass('focus:ring-2', 'focus:ring-blue-500');
    });

    it('should have hover effects for submit button', () => {
      render(<ContactForm />);
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      expect(submitButton).toHaveClass('hover:bg-blue-700', 'hover:shadow-lg');
    });
  });

  describe('Accessibility Compliance', () => {
    it('should have consistent focus ring styles across components', () => {
      render(<Navigation />);
      
      // Test that all focusable elements have consistent focus ring styles
      const focusableElements = screen.getAllByRole('link');
      focusableElements.forEach(element => {
        expect(element).toHaveClass('focus:ring-2', 'focus:ring-blue-500');
      });
    });

    it('should maintain keyboard navigation functionality', async () => {
      const user = userEvent.setup();
      render(<Navigation />);
      
      // Test tab navigation
      await user.tab();
      expect(screen.getByRole('link', { name: /tafara rugara/i })).toHaveFocus();
      
      await user.tab();
      expect(screen.getByRole('link', { name: /home/i })).toHaveFocus();
    });
  });

  describe('Transition Performance', () => {
    it('should use appropriate transition durations', () => {
      render(<Navigation />);
      
      const navLinks = screen.getAllByRole('link');
      navLinks.forEach(link => {
        const classes = link.className;
        expect(classes).toMatch(/transition-all|transition-colors/);
        expect(classes).toMatch(/duration-200/);
      });
    });
  });
});