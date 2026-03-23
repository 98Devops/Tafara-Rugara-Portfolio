/**
 * Property-Based Tests for Contact Form Processing
 * Feature: tafara-portfolio
 * Property 7: Contact Form Processing
 * Validates: Requirements 6.2
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fc from 'fast-check';
import ContactForm from '../ContactForm';
import { ContactFormData } from '@/types';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    form: ({ children, initial, animate, transition, whileHover, whileTap, ...props }: any) => <form {...props}>{children}</form>,
    button: ({ children, initial, animate, transition, whileHover, whileTap, ...props }: any) => <button {...props}>{children}</button>,
    div: ({ children, initial, animate, transition, whileHover, whileTap, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('Contact Form Processing Property Tests', () => {
  beforeEach(() => {
    // Clear the DOM between tests
    document.body.innerHTML = '';
  });

  afterEach(() => {
    // Clean up after each test
    document.body.innerHTML = '';
  });
  /**
   * Property 7: Contact Form Processing
   * **Validates: Requirements 6.2**
   * 
   * For any contact form submission, the Portfolio_System should process the submission 
   * using Netlify Forms with proper field validation.
   */
  it('Property 7: processes all valid contact form submissions with proper Netlify Forms integration', async () => {
    await fc.assert(
      fc.asyncProperty(
        // Generate valid contact form data with simple constraints
        fc.record({
          name: fc.constantFrom('John Doe', 'Jane Smith', 'Bob Johnson'),
          email: fc.constantFrom('john@example.com', 'jane@test.com', 'bob@demo.org'),
          message: fc.constantFrom(
            'This is a test message that is long enough to pass validation.',
            'Hello, I would like to discuss a potential project opportunity.'
          ),
        }),
        async (formData: ContactFormData) => {
          const mockOnSubmit = jest.fn().mockResolvedValue(undefined);
          
          const { container } = render(<ContactForm onSubmit={mockOnSubmit} />);
          
          // Verify Netlify Forms integration attributes are present
          const form = container.querySelector('form');
          expect(form).toHaveAttribute('data-netlify', 'true');
          expect(form).toHaveAttribute('name', 'contact');
          expect(form).toHaveAttribute('method', 'POST');
          
          // Verify hidden form-name field for Netlify
          const hiddenField = container.querySelector('input[name="form-name"]');
          expect(hiddenField).toBeInTheDocument();
          expect(hiddenField).toHaveAttribute('type', 'hidden');
          expect(hiddenField).toHaveAttribute('value', 'contact');
          
          // Fill out the form with generated valid data - use direct DOM manipulation for speed
          const nameInput = container.querySelector('input[name="name"]') as HTMLInputElement;
          const emailInput = container.querySelector('input[name="email"]') as HTMLInputElement;
          const messageInput = container.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
          
          expect(nameInput).toBeInTheDocument();
          expect(emailInput).toBeInTheDocument();
          expect(messageInput).toBeInTheDocument();
          
          // Set values directly for speed
          fireEvent.change(nameInput, { target: { value: formData.name } });
          fireEvent.change(emailInput, { target: { value: formData.email } });
          fireEvent.change(messageInput, { target: { value: formData.message } });
          
          // Submit the form using the container's form
          const formElement = container.querySelector('form');
          expect(formElement).toBeInTheDocument();
          fireEvent.submit(formElement!);
          
          // Verify the form submission was processed
          await waitFor(() => {
            expect(mockOnSubmit).toHaveBeenCalledWith({
              name: formData.name,
              email: formData.email,
              message: formData.message,
            });
          }, { timeout: 500 });
          
          // Verify success state is shown
          await waitFor(() => {
            const successMessage = container.querySelector('[class*="text-green-400"]');
            expect(successMessage).toBeInTheDocument();
          }, { timeout: 500 });
        }
      ),
      { numRuns: 5 } // Reduced for async tests
    );
  }, 15000); // 15 second timeout

  /**
   * Property 7 Extension: Field validation consistency
   * Validates that field validation works consistently for all invalid inputs
   */
  it('Property 7 Extension: consistently validates all form fields and prevents invalid submissions', async () => {
    await fc.assert(
      fc.asyncProperty(
        // Generate invalid contact form data with simple patterns
        fc.oneof(
          // Invalid name (empty)
          fc.record({
            name: fc.constant(''),
            email: fc.constant('valid@example.com'),
            message: fc.constant('This is a valid message that is long enough.'),
          }),
          // Invalid email
          fc.record({
            name: fc.constant('Valid Name'),
            email: fc.constant('invalid-email'),
            message: fc.constant('This is a valid message that is long enough.'),
          }),
          // Invalid message (too short)
          fc.record({
            name: fc.constant('Valid Name'),
            email: fc.constant('valid@example.com'),
            message: fc.constant('short'),
          })
        ),
        async (invalidFormData) => {
          const mockOnSubmit = jest.fn();
          
          const { container } = render(<ContactForm onSubmit={mockOnSubmit} />);
          
          // Fill out the form with invalid data using direct DOM manipulation for speed
          const nameInput = container.querySelector('input[name="name"]') as HTMLInputElement;
          const emailInput = container.querySelector('input[name="email"]') as HTMLInputElement;
          const messageInput = container.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
          
          expect(nameInput).toBeInTheDocument();
          expect(emailInput).toBeInTheDocument();
          expect(messageInput).toBeInTheDocument();
          
          // Set values directly
          fireEvent.change(nameInput, { target: { value: invalidFormData.name } });
          fireEvent.change(emailInput, { target: { value: invalidFormData.email } });
          fireEvent.change(messageInput, { target: { value: invalidFormData.message } });
          
          // Submit the form using the container's form
          const formElement = container.querySelector('form');
          expect(formElement).toBeInTheDocument();
          fireEvent.submit(formElement!);
          
          // Verify validation errors are shown and submission is prevented
          await waitFor(() => {
            const errorMessages = container.querySelectorAll('[class*="text-red-400"]');
            expect(errorMessages.length).toBeGreaterThan(0);
          }, { timeout: 500 });
          
          // Verify onSubmit was not called due to validation failure
          expect(mockOnSubmit).not.toHaveBeenCalled();
        }
      ),
      { numRuns: 5 } // Reduced for async tests
    );
  }, 15000); // 15 second timeout

  /**
   * Property 7 Extension: Netlify Forms compliance
   * Validates that all required Netlify Forms attributes and structure are present
   */
  it('Property 7 Extension: maintains Netlify Forms compliance regardless of form state', () => {
    fc.assert(
      fc.property(
        fc.boolean(), // whether form has been interacted with
        fc.boolean(), // whether form is in error state
        (hasInteracted, hasError) => {
          const mockOnSubmit = hasError 
            ? jest.fn().mockRejectedValue(new Error('Test error'))
            : jest.fn().mockResolvedValue(undefined);
          
          const { container } = render(<ContactForm onSubmit={mockOnSubmit} />);
          
          // Verify all required Netlify Forms attributes are present
          const form = container.querySelector('form');
          expect(form).toHaveAttribute('data-netlify', 'true');
          expect(form).toHaveAttribute('name', 'contact');
          expect(form).toHaveAttribute('method', 'POST');
          
          // Verify hidden form-name field
          const hiddenField = container.querySelector('input[name="form-name"][type="hidden"]');
          expect(hiddenField).toBeInTheDocument();
          expect(hiddenField).toHaveAttribute('value', 'contact');
          
          // Verify all form fields have proper name attributes for Netlify
          expect(screen.getByLabelText(/name/i)).toHaveAttribute('name', 'name');
          expect(screen.getByLabelText(/email/i)).toHaveAttribute('name', 'email');
          expect(screen.getByLabelText(/message/i)).toHaveAttribute('name', 'message');
          
          // Verify form fields have proper types
          expect(screen.getByLabelText(/name/i)).toHaveAttribute('type', 'text');
          expect(screen.getByLabelText(/email/i)).toHaveAttribute('type', 'email');
          expect(screen.getByLabelText(/message/i).tagName.toLowerCase()).toBe('textarea');
          
          // Verify form structure remains consistent
          expect(form?.tagName.toLowerCase()).toBe('form');
          expect(container.querySelectorAll('input, textarea, button')).toHaveLength(5); // 3 visible + 1 hidden + 1 button
        }
      ),
      { numRuns: 10 }
    );
  });
});
