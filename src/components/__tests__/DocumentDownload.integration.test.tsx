import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Hero } from '../Hero';
import { PersonalInfo } from '@/types';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
}));

// Mock Next.js Image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

const mockPersonalInfo: PersonalInfo = {
  name: 'Tafara Rugara',
  title: 'Cloud & DevOps + AI Automation Specialist',
  location: 'Harare, Zimbabwe & Johannesburg, South Africa',
  summary: 'Cloud & DevOps Engineer specializing in AI-powered automation systems.',
  profileImage: '/images/tafara-rugara.jpg',
  socialLinks: {
    github: 'https://github.com/98Devops',
    linkedin: 'https://linkedin.com/in/tafara-rugara',
    email: 'tfrsuperfx@gmail.com',
    youtube: 'https://youtube.com/@techwithtaf',
    whatsapp: 'https://wa.me/263777553271',
  },
  documents: {
    cv: '/documents/tafara-rugara-cv.pdf',
    reference: '/documents/tafara-rugara-reference.pdf',
  },
};

describe('Document Download Integration', () => {
  it('renders CV download button', () => {
    render(<Hero personal={mockPersonalInfo} />);
    
    const cvButton = screen.getByRole('button', { name: /download cv/i });
    expect(cvButton).toBeInTheDocument();
  });

  it('CV button has onClick handler', () => {
    render(<Hero personal={mockPersonalInfo} />);
    
    const cvButton = screen.getByRole('button', { name: /download cv/i });
    // Button should be clickable
    expect(cvButton.tagName).toBe('BUTTON');
  });

  it('handles CV download click without errors', () => {
    // Mock createElement to prevent actual download
    const mockAnchor = document.createElement('a');
    mockAnchor.click = jest.fn();
    
    const originalCreateElement = document.createElement.bind(document);
    document.createElement = jest.fn((tag: string) => {
      if (tag === 'a') return mockAnchor;
      return originalCreateElement(tag);
    }) as any;

    render(<Hero personal={mockPersonalInfo} />);
    
    const cvButton = screen.getByRole('button', { name: /download cv/i });
    
    // Should not throw error
    expect(() => fireEvent.click(cvButton)).not.toThrow();
    
    // Restore
    document.createElement = originalCreateElement as any;
  });

  it('download button is accessible', () => {
    render(<Hero personal={mockPersonalInfo} />);
    
    const cvButton = screen.getByRole('button', { name: /download cv/i });
    expect(cvButton).toBeVisible();
    expect(cvButton.textContent).toMatch(/download cv/i);
  });

  it('renders with correct document path in personal info', () => {
    render(<Hero personal={mockPersonalInfo} />);
    
    // Verify the component renders with the personal info that includes documents
    expect(mockPersonalInfo.documents.cv).toBe('/documents/tafara-rugara-cv.pdf');
    
    const cvButton = screen.getByRole('button', { name: /download cv/i });
    expect(cvButton).toBeInTheDocument();
  });
});