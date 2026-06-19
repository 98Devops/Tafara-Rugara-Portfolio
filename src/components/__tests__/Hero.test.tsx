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
  title: 'Cloud & DevOps + AI Automation Specialist',
  location: 'Harare, Zimbabwe & Johannesburg, South Africa',
  summary:
    'Cloud & DevOps Engineer specializing in AI-powered automation systems, container orchestration, and infrastructure that ships. I build production-grade pipelines, automate complex workflows with n8n and LLMs, and turn operational chaos into intelligent, self-managing systems — deployable on AWS, Docker, and Kubernetes.',
  profileImage: '/images/tafara-rugara.jpg',
  socialLinks: {
    github: 'https://github.com/98Devops',
    linkedin: 'https://www.linkedin.com/in/tafara-rugara-0627b819b/',
    email: 'tfrsuperfx@gmail.com',
    youtube: 'https://www.youtube.com/@techwithtaf',
    whatsapp: 'https://wa.me/263777553271',
  },
  documents: {
    cv: '/documents/tafara-rugara-cv.pdf',
    reference: '/documents/tafara-rugara-reference.pdf',
  },
};

describe('Hero Component', () => {
  it('displays the name and professional summary', () => {
    render(<Hero personal={mockPersonalInfo} />);

    // Name is present as a mono eyebrow (redesign: H1 is now the statement)
    expect(screen.getByText('Tafara Rugara')).toBeInTheDocument();

    // The H1 carries the editorial statement headline
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /I build the systems that run quietly/i
    );

    // Check professional summary is displayed (keywords preserved for SEO)
    expect(
      screen.getByText(
        /Cloud & DevOps Engineer specializing in AI-powered automation systems/
      )
    ).toBeInTheDocument();
  });

  it('includes all required technical keywords in summary', () => {
    render(<Hero personal={mockPersonalInfo} />);

    const requiredKeywords = [
      'AI-powered automation',
      'container orchestration',
      'n8n',
      'LLMs',
      'AWS',
      'Docker',
      'Kubernetes',
    ];

    const summaryText = screen.getByText(
      /Cloud & DevOps Engineer specializing in AI-powered automation systems/
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
      screen.getByRole('button', { name: /download cv/i })
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

    // Check Contact link
    expect(screen.getByRole('link', { name: /contact me/i })).toHaveAttribute(
      'href',
      '/contact'
    );
  });

  it('displays the availability status line', () => {
    render(<Hero personal={mockPersonalInfo} />);

    // Status line: availability + location
    expect(screen.getByText(/open to opportunities/i)).toBeInTheDocument();
    expect(screen.getByText(/harare & johannesburg/i)).toBeInTheDocument();
  });

  it('displays the metrics ledger', () => {
    render(<Hero personal={mockPersonalInfo} />);

    // Ledger renders the operating record from real metrics data
    expect(screen.getByText(/operating record/i)).toBeInTheDocument();
    expect(
      screen.getByText(/pipeline downtime removed/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/AI automation systems shipped to real teams/i)
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

    const downloadButton = screen.getByRole('button', { name: /download cv/i });
    await user.click(downloadButton);

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(mockAnchor.click).toHaveBeenCalled();

    // Cleanup
    createElementSpy.mockRestore();
    appendChildSpy.mockRestore();
    removeChildSpy.mockRestore();
  });

  it('displays profile image', () => {
    render(<Hero personal={mockPersonalInfo} />);

    const profileImage = screen.getByAltText('Tafara Rugara');
    expect(profileImage).toBeInTheDocument();
    expect(profileImage).toHaveAttribute('src', '/images/tafara-rugara.jpg');
  });
});
