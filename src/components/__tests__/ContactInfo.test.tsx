import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactInfo from '../ContactInfo';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, initial, whileInView, viewport, transition, ...props }: any) => 
      <div {...props}>{children}</div>,
    a: ({ children, initial, whileInView, viewport, transition, whileHover, ...props }: any) => 
      <a {...props}>{children}</a>,
  },
}));

describe('ContactInfo', () => {
  it('renders contact information correctly', () => {
    render(<ContactInfo />);
    
    expect(screen.getByText("Let's Build Together")).toBeInTheDocument();
    expect(screen.getByText(/Open to Cloud & DevOps engineering roles/)).toBeInTheDocument();
  });

  it('displays all contact methods', () => {
    render(<ContactInfo />);
    
    // Check for contact method labels
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('WhatsApp')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('YouTube')).toBeInTheDocument();
    
    // Check for contact method values
    expect(screen.getByText('tfrsuperfx@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('+263 777 553 271')).toBeInTheDocument();
    expect(screen.getByText('tafara-rugara')).toBeInTheDocument();
    expect(screen.getByText('98Devops')).toBeInTheDocument();
    expect(screen.getByText('@techwithtaf')).toBeInTheDocument();
  });

  it('has correct links with proper attributes', () => {
    render(<ContactInfo />);
    
    const emailLink = screen.getByLabelText(/Email: tfrsuperfx@gmail.com/i);
    const whatsappLink = screen.getByLabelText(/WhatsApp:/i);
    const linkedinLink = screen.getByLabelText(/LinkedIn:/i);
    const githubLink = screen.getByLabelText(/GitHub:/i);
    const youtubeLink = screen.getByLabelText(/YouTube:/i);
    
    expect(emailLink).toHaveAttribute('href', 'mailto:tfrsuperfx@gmail.com');
    expect(whatsappLink).toHaveAttribute('href', 'https://wa.me/263777553271');
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/tafara-rugara-0627b819b/');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/98Devops');
    expect(youtubeLink).toHaveAttribute('href', 'https://www.youtube.com/@techwithtaf');
    
    // Check for security attributes on external links
    expect(whatsappLink).toHaveAttribute('target', '_blank');
    expect(whatsappLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(youtubeLink).toHaveAttribute('target', '_blank');
  });

  it('displays availability status', () => {
    render(<ContactInfo />);
    
    expect(screen.getByText('Open to Opportunities')).toBeInTheDocument();
    expect(screen.getByText('Harare, Zimbabwe & Johannesburg, South Africa')).toBeInTheDocument();
  });

  it('displays document download buttons', () => {
    render(<ContactInfo />);
    
    expect(screen.getByRole('button', { name: /download cv/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reference letter/i })).toBeInTheDocument();
  });

  it('handles document download clicks', async () => {
    const user = userEvent.setup();
    
    render(<ContactInfo />);
    
    // Mock document.createElement and appendChild after render
    const mockAnchor = {
      href: '',
      download: '',
      rel: '',
      click: jest.fn(),
    };
    const createElementSpy = jest.spyOn(document, 'createElement').mockReturnValue(mockAnchor as any);
    const appendChildSpy = jest.spyOn(document.body, 'appendChild').mockImplementation(() => mockAnchor as any);
    const removeChildSpy = jest.spyOn(document.body, 'removeChild').mockImplementation(() => mockAnchor as any);
    const containsSpy = jest.spyOn(document.body, 'contains').mockReturnValue(true);
    
    const cvButton = screen.getByRole('button', { name: /download cv/i });
    await user.click(cvButton);
    
    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(mockAnchor.click).toHaveBeenCalled();
    
    // Cleanup
    createElementSpy.mockRestore();
    appendChildSpy.mockRestore();
    removeChildSpy.mockRestore();
    containsSpy.mockRestore();
  });

  it('has proper accessibility attributes', () => {
    render(<ContactInfo />);
    
    // Check that all links have aria-labels
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('aria-label');
    });
  });

  it('displays section headers', () => {
    render(<ContactInfo />);
    
    expect(screen.getByText('Documents')).toBeInTheDocument();
    expect(screen.getByText('Contact & Socials')).toBeInTheDocument();
  });
});
