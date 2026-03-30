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
  it('displays correct professional information', () => {
    render(<Hero personal={mockPersonalInfo} />);

    // Check name is displayed as main heading
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Tafara Rugara'
    );

    // Check professional summary is displayed
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

  it('provides all required call-to-action buttons', () => {
    render(<Hero personal={mockPersonalInfo} />);

    // Check all required buttons/links are present
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

  it('displays availability badge', () => {
    render(<Hero personal={mockPersonalInfo} />);

    // Check availability badge is displayed
    expect(screen.getByText(/open to opportunities/i)).toBeInTheDocument();
    expect(screen.getByText(/harare & johannesburg/i)).toBeInTheDocument();
  });

  it('displays stats section', () => {
    render(<Hero personal={mockPersonalInfo} />);

    // Check stats are displayed
    expect(screen.getByText('60%')).toBeInTheDocument();
    expect(screen.getByText(/pipeline downtime reduced/i)).toBeInTheDocument();
    expect(screen.getByText('3+')).toBeInTheDocument();
    expect(screen.getByText(/ai systems built/i)).toBeInTheDocument();
    expect(screen.getByText('5+')).toBeInTheDocument();
    expect(screen.getByText(/cloud projects delivered/i)).toBeInTheDocument();
  });

  it('displays tech badges', () => {
    render(<Hero personal={mockPersonalInfo} />);

    const expectedTags = [
      'Cloud Platform',
      'DevOps & CI/CD',
      'AI Automation',
      'n8n Workflows',
      'Kubernetes',
      'Terraform',
      'AWS',
    ];

    expectedTags.forEach(tag => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
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
