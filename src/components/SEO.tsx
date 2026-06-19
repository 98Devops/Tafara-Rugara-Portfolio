import { Metadata } from 'next';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  canonicalUrl?: string;
  structuredData?: Record<string, unknown>;
}

export interface PageSEOConfig {
  home: SEOProps;
  whatIDo: SEOProps;
  projects: SEOProps;
  experience: SEOProps;
  contact: SEOProps;
}

// SEO configuration for all pages
export const pageSEOConfig: PageSEOConfig = {
  home: {
    title: 'Tafara Rugara — Cloud & DevOps + AI Automation Specialist',
    description:
      'Cloud & DevOps Engineer specializing in Website Development, AI-powered automation systems, container orchestration, and infrastructure that ships. AWS Certified Cloud Practitioner building production-grade pipelines with n8n, Docker, Kubernetes, and Terraform. Based in Harare & Johannesburg.',
    keywords: [
      'Cloud DevOps Engineer',
      'AI Automation Specialist',
      'Website Developer',
      'AWS Certified Cloud Practitioner',
      'n8n Workflow Automation',
      'Infrastructure as Code',
      'Kubernetes',
      'Terraform',
      'Docker',
      'Platform Engineer',
      'GitOps',
      'MLOps',
      'SRE',
      'Observability',
      'Harare Zimbabwe',
      'Johannesburg South Africa',
      'Remote Developer',
    ],
    ogImage: '/images/placeholder.svg',
    ogType: 'profile',
    canonicalUrl: 'https://tafara-rugara.com',
  },
  whatIDo: {
    title: 'What I Do - Technical Capabilities | Tafara Rugara',
    description:
      'Website Development, Cloud Architecture, DevOps & CI/CD, Automation Engineering, and Monitoring & Reliability expertise. AWS Engineer specializing in Kubernetes, Terraform, Docker, and modern DevOps practices. Platform Engineer with Infrastructure as Code experience.',
    keywords: [
      'Website Development',
      'Next.js Development',
      'React Development',
      'Web Applications',
      'Frontend Development',
      'Responsive Web Design',
      'Modern Web Technologies',
      'Cloud Architecture',
      'DevOps CI/CD',
      'Automation Engineering',
      'Monitoring Reliability',
      'AWS Services',
      'Kubernetes Management',
      'Infrastructure as Code',
      'Docker Containers',
      'GitHub Actions',
      'Prometheus Grafana',
      'System Observability',
    ],
    ogImage: '/images/placeholder.svg',
    canonicalUrl: 'https://tafara-rugara.com/what-i-do',
  },
  projects: {
    title: 'Featured Projects - Cloud & DevOps Portfolio | Tafara Rugara',
    description:
      'Website development projects and Cloud & DevOps projects showcasing AWS infrastructure, Kubernetes deployment, and CI/CD automation. Portfolio featuring website development projects, Acquisitions API, Voice-to-Vector AI workflow, Legacy migration, and Serverless IaC patterns.',
    keywords: [
      'Website Portfolio',
      'Next.js Projects',
      'React Websites',
      'Web Development Portfolio',
      'Modern Websites',
      'Cloud Projects',
      'DevOps Portfolio',
      'AWS Projects',
      'Kubernetes Deployment',
      'Terraform Infrastructure',
      'CI/CD Pipelines',
      'Serverless Architecture',
      'API Development',
      'Docker Containerization',
      'Automation Solutions',
    ],
    ogImage: '/images/placeholder.svg',
    canonicalUrl: 'https://tafara-rugara.com/projects',
  },
  experience: {
    title: 'Professional Experience - DevOps Engineer | Tafara Rugara',
    description:
      'DevOps & Automation Engineer at Your EKA Services — 60% pipeline downtime reduction, production AI workflow deployment, Docker container orchestration, and infrastructure hardening.',
    keywords: [
      'DevOps Engineer Experience',
      'Production Deployment',
      'System Reliability',
      'Infrastructure Optimization',
      'Docker Environments',
      'CI/CD Reliability',
      'Linux Administration',
      'Security Hardening',
      'Monitoring Systems',
      'Downtime Reduction',
    ],
    ogImage: '/images/placeholder.svg',
    canonicalUrl: 'https://tafara-rugara.com/experience',
  },
  contact: {
    title: 'Contact - Get in Touch | Tafara Rugara',
    description:
      'Contact Tafara Rugara for Cloud & DevOps engineering roles, AI automation consulting, and workflow architecture. AWS Certified — based in Harare & Johannesburg.',
    keywords: [
      'Contact Cloud Engineer',
      'Hire DevOps Engineer',
      'Remote Cloud Engineer',
      'AWS Engineer Contact',
      'Kubernetes Expert Hire',
      'Infrastructure Engineer',
      'DevOps Consultant',
      'Cloud Architect Contact',
    ],
    ogImage: '/images/placeholder.svg',
    canonicalUrl: 'https://tafara-rugara.com/contact',
  },
};

// Utility function to generate metadata
export function generatePageMetadata(pageKey: keyof PageSEOConfig): Metadata {
  const config = pageSEOConfig[pageKey];

  const baseMetadata: Metadata = {
    metadataBase: new URL('https://tafara-rugara.com'),
    title:
      pageKey === 'home'
        ? {
            default: config.title!,
            template: '%s | Tafara Rugara',
          }
        : config.title,
    description: config.description,
    keywords: config.keywords,
    authors: [{ name: 'Tafara Rugara' }],
    creator: 'Tafara Rugara',
    publisher: 'Tafara Rugara',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: config.title,
      description: config.description,
      type: config.ogType || 'website',
      locale: 'en_US',
      url: config.canonicalUrl,
      siteName: 'Tafara Rugara Portfolio',
      images: config.ogImage
        ? [
            {
              url: config.ogImage,
              width: 1200,
              height: 630,
              alt: config.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      images: config.ogImage ? [config.ogImage] : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: config.canonicalUrl,
    },
  };

  // Add verification only for home page
  if (pageKey === 'home') {
    baseMetadata.verification = {
      google: 'google-site-verification-code',
    };
  }

  return baseMetadata;
}

// Enhanced structured data for different page types
export function generateStructuredData(pageKey: keyof PageSEOConfig) {
  const basePersonData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Tafara Rugara',
    jobTitle: 'Cloud & DevOps + AI Automation Specialist',
    description:
      'Cloud & DevOps Engineer specializing in AI-powered automation, container orchestration, and production-grade infrastructure on AWS.',
    url: 'https://tafara-rugara.com',
    image: 'https://tafara-rugara.com/images/placeholder.svg',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Harare',
      addressCountry: 'Zimbabwe',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Excellessence (YourEKA Services)',
    },
    knowsAbout: [
      'AWS',
      'Terraform',
      'Docker',
      'Kubernetes',
      'CI/CD',
      'Infrastructure as Code',
      'DevOps',
      'Cloud Architecture',
      'Automation Engineering',
      'Monitoring',
      'Observability',
    ],
    sameAs: [
      'https://github.com/tafara-rugara',
      'https://linkedin.com/in/tafara-rugara',
    ],
  };

  switch (pageKey) {
    case 'projects':
      return {
        ...basePersonData,
        '@type': ['Person', 'CreativeWork'],
        mainEntity: {
          '@type': 'ItemList',
          name: 'Featured Projects',
          description:
            'Website development, cloud infrastructure and DevOps automation projects',
          numberOfItems: 8,
          itemListElement: [
            {
              '@type': 'SoftwareApplication',
              name: 'Litho Solutions',
              description:
                'A cutting-edge web platform dedicated to modernizing mineral exploration with interactive 3D visualizations',
              applicationCategory: 'WebApplication',
              programmingLanguage: ['Next.js', 'React', 'TypeScript'],
              runtimePlatform: 'Netlify',
            },
            {
              '@type': 'SoftwareApplication',
              name: 'ProAir Zimbabwe',
              description:
                "High-performance business website for Zimbabwe's leading air conditioning, heating & ventilation specialists",
              applicationCategory: 'WebApplication',
              programmingLanguage: ['JavaScript', 'HTML5', 'CSS3'],
              runtimePlatform: 'Netlify',
            },
            {
              '@type': 'SoftwareApplication',
              name: 'Mero Tech AI',
              description:
                'A premium, highly interactive marketing website showcasing AI automation and cloud infrastructure services',
              applicationCategory: 'WebApplication',
              programmingLanguage: ['Next.js', 'TypeScript', 'React'],
              runtimePlatform: 'Netlify',
            },
            {
              '@type': 'SoftwareApplication',
              name: 'Serverless Portfolio Website',
              description:
                'Modern, performant showcase of professional work and capabilities built with Next.js',
              applicationCategory: 'WebApplication',
              programmingLanguage: ['Next.js', 'TypeScript', 'React'],
              runtimePlatform: 'Netlify',
            },
            {
              '@type': 'SoftwareApplication',
              name: 'Acquisitions API',
              description:
                'Enterprise-grade REST API with JWT authentication and Kubernetes deployment',
              applicationCategory: 'WebApplication',
              operatingSystem: 'Linux',
              programmingLanguage: ['Node.js', 'JavaScript'],
              runtimePlatform: 'Kubernetes',
            },
            {
              '@type': 'SoftwareApplication',
              name: 'Voice-to-Vector Semantic Memory API',
              description:
                'AI-powered semantic search API with vector embeddings',
              applicationCategory: 'WebApplication',
              programmingLanguage: ['Python'],
              runtimePlatform: 'AWS Lambda',
            },
            {
              '@type': 'SoftwareApplication',
              name: 'Serverless Resume',
              description: 'Dynamic serverless resume built with AWS services',
              applicationCategory: 'WebApplication',
              runtimePlatform: 'AWS Lambda',
            },
            {
              '@type': 'SoftwareApplication',
              name: 'Tomcat App Modernization',
              description:
                'Legacy application modernization using AWS cloud services',
              applicationCategory: 'WebApplication',
              runtimePlatform: 'AWS Elastic Beanstalk',
            },
          ],
        },
      };

    case 'experience':
      return {
        ...basePersonData,
        hasOccupation: {
          '@type': 'Occupation',
          name: 'DevOps Engineer',
          occupationLocation: {
            '@type': 'Place',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Harare',
              addressCountry: 'Zimbabwe',
            },
          },
          skills: [
            'AWS Cloud Services',
            'Infrastructure as Code',
            'Container Orchestration',
            'CI/CD Pipeline Development',
            'System Monitoring',
            'Automation Scripting',
          ],
          experienceRequirements:
            'Production AI workflow deployment, Docker environments, CI/CD optimization',
        },
        worksFor: {
          '@type': 'Organization',
          name: 'Excellessence (YourEKA Services)',
          description: 'Technology services company',
        },
      };

    case 'contact':
      return {
        ...basePersonData,
        '@type': ['Person', 'ContactPoint'],
        contactType: 'Professional Contact',
        availableLanguage: ['English'],
        areaServed: 'Worldwide',
        serviceType: [
          'Cloud Architecture',
          'DevOps Engineering',
          'Infrastructure as Code',
          'CI/CD Implementation',
          'System Monitoring',
        ],
      };

    default:
      return basePersonData;
  }
}
