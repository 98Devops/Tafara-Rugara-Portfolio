import { render, screen } from '@testing-library/react';
import { Hero } from '../Hero';
import { PersonalInfo } from '@/types';
import userEvent from '@testing-library/user-event';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ priority, ...props }: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} data-priority={priority ? 'true' : 'false'} />;
  },
}));

const mockPersonalInfo: PersonalInfo = {
  name: 'Tafara Rugara',
  title: 'Automation Engineer',
  location: 'Harare, Zimbabwe · Remote',
  summary:
    'I build and maintain business automation with n8n, GoHighLevel, Zapier, JavaScript and REST APIs. I deliver tested workflows and AI pipelines for remote clients.',
  profileImage: '/images/tafara-rugara.jpg',
  socialLinks: {
    github: 'https://github.com/98Devops',
    linkedin: 'https://www.linkedin.com/in/tafara-rugara-0627b819b/',
    email: 'tfrsuperfx@gmail.com',
    youtube: 'https://www.youtube.com/@techwithtaf',
    whatsapp: 'https://wa.me/263777553271',
  },
  documents: {
    cv: '/documents/tafara-rugara-automation-engineer-cv.pdf',
    reference: '/documents/tafara-rugara-reference.pdf',
    cvDocx: '/documents/tafara-rugara-automation-engineer-cv.docx',
  },
};

describe('Hero Component', () => {
  it('displays the name and professional summary', () => {
    render(<Hero personal={mockPersonalInfo} />);

    // Name is present as a mono eyebrow (redesign: H1 is now the statement)
    expect(screen.getByText(/Tafara Rugara · Automation Engineer/)).toBeInTheDocument();

    // The H1 carries the editorial statement headline
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /Business workflows, automated with care/i
    );

    // Check professional summary is displayed (keywords preserved for SEO)
    expect(
      screen.getByText(
        /I build and maintain business automation/
      )
    ).toBeInTheDocument();
  });

  it('includes all required technical keywords in summary', () => {
    render(<Hero personal={mockPersonalInfo} />);

    const requiredKeywords = [
      'n8n',
      'GoHighLevel',
      'Zapier',
      'JavaScript',
      'REST APIs',
    ];

    const summaryText = screen.getByText(
      /I build and maintain business automation/
    ).textContent;

    requiredKeywords.forEach(keyword => {
      expect(summaryText).toContain(keyword);
    });
  });

  it('provides the primary call-to-action buttons and contact link', () => {
    render(<Hero personal={mockPersonalInfo} />);

    // Two primary CTAs + inline contact link
    expect(
      screen.getByRole('link', { name: /view projects/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /download automation cv/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /contact me/i })
    ).toBeInTheDocument();
  });

  it('has correct links for call-to-action buttons', () => {
    render(<Hero personal={mockPersonalInfo} />);

    // Check View Projects link
    expect(
      screen.getByRole('link', { name: /view projects/i })
    ).toHaveAttribute('href', '/projects');

    expect(screen.getByRole('link', { name: /download the DOCX CV/i })).toHaveAttribute('href', mockPersonalInfo.documents.cvDocx);

    // Check Contact link
    expect(screen.getByRole('link', { name: /contact me/i })).toHaveAttribute(
      'href',
      '/contact'
    );
  });

  it('displays the availability status line', () => {
    render(<Hero personal={mockPersonalInfo} />);

    // Status line: availability + location
    expect(screen.getByText(/open to remote automation contracts/i)).toBeInTheDocument();
    expect(screen.getByText(/harare, zimbabwe/i)).toBeInTheDocument();
  });

  it('displays the metrics ledger', () => {
    render(<Hero personal={mockPersonalInfo} />);

    // Ledger renders the operating record from real metrics data
    expect(screen.getByText(/operating record/i)).toBeInTheDocument();
    expect(
      screen.getByText(/broken automation triggers repaired/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/lifecycle workflows delivered/i)
    ).toBeInTheDocument();
  });

  it('handles CV download button click', async () => {
    const user = userEvent.setup();

    render(<Hero personal={mockPersonalInfo} />);

    // Mock document.createElement and appendChild after render
    const mockAnchor = {
      href: '',
      download: '',
      rel: '',
      click: jest.fn(),
    };
    const createElementSpy = jest
      .spyOn(document, 'createElement')
      .mockReturnValue(mockAnchor as any);
    const appendChildSpy = jest
      .spyOn(document.body, 'appendChild')
      .mockImplementation(() => mockAnchor as any);
    const removeChildSpy = jest
      .spyOn(document.body, 'removeChild')
      .mockImplementation(() => mockAnchor as any);

    const downloadButton = screen.getByRole('button', { name: /download automation cv/i });
    await user.click(downloadButton);

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(mockAnchor.click).toHaveBeenCalled();
    expect(mockAnchor.href).toBe(mockPersonalInfo.documents.cv);
    expect(mockAnchor.download).toBe('Tafara-Rugara-Automation-Engineer-CV.pdf');

    // Cleanup
    createElementSpy.mockRestore();
    appendChildSpy.mockRestore();
    removeChildSpy.mockRestore();
  });

  it('does not render a profile image', () => {
    render(<Hero personal={mockPersonalInfo} />);

    // Redesign: the hero no longer shows a profile photo.
    expect(screen.queryByAltText('Tafara Rugara')).not.toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
