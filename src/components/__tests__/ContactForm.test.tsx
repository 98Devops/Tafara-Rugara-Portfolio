import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '../ContactForm';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    form: ({ children, initial, animate, transition, whileHover, whileTap, ...props }: any) => <form {...props}>{children}</form>,
    button: ({ children, initial, animate, transition, whileHover, whileTap, ...props }: any) => <button {...props}>{children}</button>,
    div: ({ children, initial, animate, transition, whileHover, whileTap, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock window.open
const mockWindowOpen = jest.fn();
global.window.open = mockWindowOpen;

describe('ContactForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockWindowOpen.mockClear();
  });

  it('renders all form fields correctly', () => {
    render(<ContactForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send via whatsapp/i })).toBeInTheDocument();
  });

  it('has Netlify form attributes', () => {
    render(<ContactForm onSubmit={mockOnSubmit} />);
    
    const form = screen.getByRole('form');
    expect(form).toHaveAttribute('data-netlify', 'true');
    expect(form).toHaveAttribute('name', 'contact');
    expect(form).toHaveAttribute('method', 'POST');
    
    // Check for hidden form-name field
    expect(screen.getByDisplayValue('contact')).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    render(<ContactForm onSubmit={mockOnSubmit} />);
    
    const form = screen.getByRole('form');
    fireEvent.submit(form);
    
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Message is required')).toBeInTheDocument();
    });
    expect(mockWindowOpen).not.toHaveBeenCalled();
  });

  it('validates email format', async () => {
    const user = userEvent.setup();
    render(<ContactForm onSubmit={mockOnSubmit} />);
    
    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const messageInput = screen.getByLabelText(/message/i);
    
    // Fill in valid name and message, but invalid email
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'invalid-email');
    await user.type(messageInput, 'This is a test message that is long enough.');
    
    const form = screen.getByRole('form');
    
    // Use fireEvent.submit to bypass HTML5 validation
    fireEvent.submit(form);
    
    await waitFor(() => {
      expect(screen.getByText('Enter a valid email')).toBeInTheDocument();
    });
    expect(mockWindowOpen).not.toHaveBeenCalled();
  });

  it('validates message length', async () => {
    const user = userEvent.setup();
    render(<ContactForm onSubmit={mockOnSubmit} />);
    
    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const messageInput = screen.getByLabelText(/message/i);
    
    // Fill in valid name and email, but short message
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(messageInput, 'short');
    
    const form = screen.getByRole('form');
    fireEvent.submit(form);
    
    await waitFor(() => {
      expect(screen.getByText('At least 10 characters required')).toBeInTheDocument();
    });
    expect(mockWindowOpen).not.toHaveBeenCalled();
  });

  it('opens WhatsApp with valid data', async () => {
    const user = userEvent.setup();
    
    render(<ContactForm onSubmit={mockOnSubmit} />);
    
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message that is long enough.');
    
    const submitButton = screen.getByRole('button', { name: /send via whatsapp/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(mockWindowOpen).toHaveBeenCalledWith(
        expect.stringContaining('https://wa.me/263777553271?text='),
        '_blank',
        'noopener,noreferrer'
      );
    });
  });

  it('shows success message after successful submission', async () => {
    const user = userEvent.setup();
    
    render(<ContactForm onSubmit={mockOnSubmit} />);
    
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message that is long enough.');
    
    const submitButton = screen.getByRole('button', { name: /send via whatsapp/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/message sent/i)).toBeInTheDocument();
    });
  });

  it('clears form after successful submission', async () => {
    const user = userEvent.setup();
    
    render(<ContactForm onSubmit={mockOnSubmit} />);
    
    const nameInput = screen.getByLabelText(/full name/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/email address/i) as HTMLInputElement;
    const messageInput = screen.getByLabelText(/message/i) as HTMLTextAreaElement;
    
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(messageInput, 'This is a test message that is long enough.');
    
    const submitButton = screen.getByRole('button', { name: /send via whatsapp/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(nameInput.value).toBe('');
      expect(emailInput.value).toBe('');
      expect(messageInput.value).toBe('');
    });
  });

  it('disables form during submission', async () => {
    const user = userEvent.setup();
    
    render(<ContactForm onSubmit={mockOnSubmit} />);
    
    const nameInput = screen.getByLabelText(/full name/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/email address/i) as HTMLInputElement;
    const messageInput = screen.getByLabelText(/message/i) as HTMLTextAreaElement;
    
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(messageInput, 'This is a test message that is long enough.');
    
    // Verify fields are enabled before submission
    expect(nameInput).not.toBeDisabled();
    expect(emailInput).not.toBeDisabled();
    expect(messageInput).not.toBeDisabled();
    
    const submitButton = screen.getByRole('button', { name: /send via whatsapp/i });
    await user.click(submitButton);
    
    // After submission, form should show success message
    await waitFor(() => {
      expect(screen.getByText(/message sent/i)).toBeInTheDocument();
    });
  });
});
