import { render, screen } from '@testing-library/react';
import ExperienceTimeline from '../ExperienceTimeline';
import { Experience } from '@/types';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    ul: ({ children, ...props }: any) => <ul {...props}>{children}</ul>,
    li: ({ children, ...props }: any) => <li {...props}>{children}</li>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
}));

const mockExperience: Experience = {
  company: 'Excellessence (YourEKA Services)',
  position: 'DevOps Engineer',
  duration: '2023 - Present',
  impact: '60% downtime reduction impact',
  achievements: [
    'Production AI workflow deployment and optimization',
    'Docker Compose environments for development and staging',
    'Secure Linux hardening and system configuration',
    'SSH key authentication and security implementation',
    'Firewall configuration and network security',
    'CI/CD reliability fixes and pipeline optimization',
    'Prompt schema enforcement for AI workflows',
    'System debugging improvements and monitoring',
  ],
  technologies: [
    'Docker',
    'Linux',
    'CI/CD',
    'System Administration',
    'Security Hardening',
    'Monitoring',
    'AI/ML Operations',
  ],
};

describe('ExperienceTimeline', () => {
  it('renders experience information correctly', () => {
    render(<ExperienceTimeline experiences={[mockExperience]} />);

    // Check position and company
    expect(screen.getByText('DevOps Engineer')).toBeInTheDocument();
    expect(
      screen.getByText('Excellessence (YourEKA Services)')
    ).toBeInTheDocument();
    expect(screen.getByText('2023 - Present')).toBeInTheDocument();
  });

  it('prominently displays the 60% downtime reduction impact', () => {
    render(<ExperienceTimeline experiences={[mockExperience]} />);

    // Check that the impact is displayed prominently
    expect(
      screen.getByText('60% downtime reduction impact')
    ).toBeInTheDocument();
    expect(screen.getByText('Key Impact')).toBeInTheDocument();
  });

  it('displays all required achievements', () => {
    render(<ExperienceTimeline experiences={[mockExperience]} />);

    // Check key achievements are present
    expect(
      screen.getByText('Production AI workflow deployment and optimization')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Docker Compose environments for development and staging'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText('Secure Linux hardening and system configuration')
    ).toBeInTheDocument();
    expect(
      screen.getByText('SSH key authentication and security implementation')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Firewall configuration and network security')
    ).toBeInTheDocument();
    expect(
      screen.getByText('CI/CD reliability fixes and pipeline optimization')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Prompt schema enforcement for AI workflows')
    ).toBeInTheDocument();
    expect(
      screen.getByText('System debugging improvements and monitoring')
    ).toBeInTheDocument();
  });

  it('displays all required technologies', () => {
    render(<ExperienceTimeline experiences={[mockExperience]} />);

    // Check technologies are displayed
    expect(screen.getByText('Docker')).toBeInTheDocument();
    expect(screen.getByText('Linux')).toBeInTheDocument();
    expect(screen.getByText('CI/CD')).toBeInTheDocument();
    expect(screen.getByText('System Administration')).toBeInTheDocument();
    expect(screen.getByText('Security Hardening')).toBeInTheDocument();
    expect(screen.getByText('Monitoring')).toBeInTheDocument();
    expect(screen.getByText('AI/ML Operations')).toBeInTheDocument();
  });

  it('renders timeline structure with visual elements', () => {
    render(<ExperienceTimeline experiences={[mockExperience]} />);

    // Check for section headers
    expect(screen.getByText('Key Achievements')).toBeInTheDocument();
    expect(screen.getByText('Technologies')).toBeInTheDocument();
  });

  it('handles multiple experiences', () => {
    const secondExperience: Experience = {
      company: 'Another Company',
      position: 'Junior Developer',
      duration: '2022 - 2023',
      achievements: ['Built web applications'],
      technologies: ['JavaScript', 'React'],
    };

    render(
      <ExperienceTimeline experiences={[mockExperience, secondExperience]} />
    );

    // Check both experiences are rendered
    expect(screen.getByText('DevOps Engineer')).toBeInTheDocument();
    expect(screen.getByText('Junior Developer')).toBeInTheDocument();
    expect(
      screen.getByText('Excellessence (YourEKA Services)')
    ).toBeInTheDocument();
    expect(screen.getByText('Another Company')).toBeInTheDocument();
  });

  it('handles experience without impact field', () => {
    const experienceWithoutImpact: Experience = {
      company: 'Test Company',
      position: 'Test Position',
      duration: '2021 - 2022',
      achievements: ['Test achievement'],
      technologies: ['Test Tech'],
    };

    render(<ExperienceTimeline experiences={[experienceWithoutImpact]} />);

    // Should render without impact section
    expect(screen.getByText('Test Position')).toBeInTheDocument();
    expect(screen.queryByText('Key Impact')).not.toBeInTheDocument();
  });
});
