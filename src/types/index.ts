export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  summary: string;
  profileImage?: string;
  socialLinks: {
    github:    string;
    linkedin:  string;
    email:     string;
    youtube?:  string;
    whatsapp?: string;
  };
  documents: {
    cv: string;
    reference: string;
  };
}

export interface TechnicalCapability {
  category: 'Cloud Architecture' | 'DevOps & CI/CD' | 'Automation Engineering' | 'Monitoring & Reliability';
  skills: string[];
  description: string;
  icon?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  problem?: string;
  technicalArchitecture?: string;
  operationalValue?: string;
  outcome?: string;
  technologies: string[];
  highlights: string[];
  demoUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
}

export interface AutomationSystem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  businessContext?: string;
  systemCapabilities?: string[];
  architecture?: string[] | string;
  outcome?: string;
  systemPurpose?: string;
  tools?: string[];
  technologies?: string[];
  demoUrl?: string;
  githubUrl?: string;
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  achievements: string[];
  technologies: string[];
  impact?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  capabilities: TechnicalCapability[];
  projects: Project[];
  experience: Experience[];
}