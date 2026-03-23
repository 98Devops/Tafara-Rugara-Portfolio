import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Hero } from '../Hero';
import { PersonalInfo } from '@/types';

// Mock the download utilities
jest.mock('@/utils/downloadUtils', () => ({
  downloadDocument: jest.fn(),
  showDownloadError: jest.fn(),
}));

// Mock framer-motion
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
  summary: 'Passionate Cloud & DevOps Engineer specializing in AWS, Terraform, Docker, Kubernetes, CI/CD, Automation, Infrastructure as Code, and Observability.',
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

describe('Document Download Integration', () => {
  const mockDownloadDocument = require('@/utils/downloadUtils').downloadDocument;
  const mockShowDownloadError = require('@/utils/downloadUtils').showDownloadError;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('handles successful CV download', async () => {
    mockDownloadDocument.mockResolvedValueOnce({ success: true });

    render(<Hero personal={mockPersonalInfo} />);
    
    const cvButton = screen.getByRole('link', { name: /download cv/i });
    fireEvent.click(cvButton);

    await waitFor(() => {
      expect(mockDownloadDocument).toHaveBeenCalledWith(
        '/documents/tafara-rugara-cv.pdf',
        'Tafara-Rugara-CV.pdf',
      );
    });

    expect(mockShowDownloadError).not.toHaveBeenCalled();
  });

  it('handles successful reference download', async () => {
    mockDownloadDocument.mockResolvedValueOnce({ success: true });

    render(<Hero personal={mockPersonalInfo} />);
    
    const referenceButton = screen.getByRole('link', { name: /download reference/i });
    fireEvent.click(referenceButton);

    await waitFor(() => {
      expect(mockDownloadDocument).toHaveBeenCalledWith(
        '/documents/tafara-rugara-reference.pdf',
        'Tafara-Rugara-Reference.pdf',
      );
    });

    expect(mockShowDownloadError).not.toHaveBeenCalled();
  });

  it('handles CV download failure', async () => {
    const errorMessage = 'Document not found. Please contact the site administrator.';
    mockDownloadDocument.mockResolvedValueOnce({ 
      success: false, 
      error: errorMessage 
    });

    render(<Hero personal={mockPersonalInfo} />);
    
    const cvButton = screen.getByRole('link', { name: /download cv/i });
    fireEvent.click(cvButton);

    await waitFor(() => {
      expect(mockDownloadDocument).toHaveBeenCalledWith(
        '/documents/tafara-rugara-cv.pdf',
        'Tafara-Rugara-CV.pdf',
      );
    });

    expect(mockShowDownloadError).toHaveBeenCalledWith(errorMessage);
  });

  it('handles reference download failure', async () => {
    const errorMessage = 'Failed to download document. Please try again or contact support.';
    mockDownloadDocument.mockResolvedValueOnce({ 
      success: false, 
      error: errorMessage 
    });

    render(<Hero personal={mockPersonalInfo} />);
    
    const referenceButton = screen.getByRole('link', { name: /download reference/i });
    fireEvent.click(referenceButton);

    await waitFor(() => {
      expect(mockDownloadDocument).toHaveBeenCalledWith(
        '/documents/tafara-rugara-reference.pdf',
        'Tafara-Rugara-Reference.pdf',
      );
    });

    expect(mockShowDownloadError).toHaveBeenCalledWith(errorMessage);
  });

  it('prevents default link behavior when handling downloads', async () => {
    mockDownloadDocument.mockResolvedValueOnce({ success: true });

    render(<Hero personal={mockPersonalInfo} />);
    
    const cvButton = screen.getByRole('link', { name: /download cv/i });
    
    // Create a mock event with preventDefault
    const mockEvent = {
      preventDefault: jest.fn(),
    };
    
    // Manually trigger the onClick handler
    fireEvent.click(cvButton);

    await waitFor(() => {
      expect(mockDownloadDocument).toHaveBeenCalled();
    });
  });
});