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
    title: 'Tafara Rugara | Automation Engineer | AI Workflows & CRM',
    description:
      'Automation Engineer building n8n, GoHighLevel and Zapier workflows, REST API integrations and AI systems. Based in Harare, available for remote contracts with Zimbabwean, South African and international teams.',
    keywords: [
      'Automation Engineer',
      'GoHighLevel Automation',
      'Zapier',
      'API Integration',
      'Workflow Automation',
      'CRM Automation',
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
    canonicalUrl: 'https://tafara.netlify.app',
  },
  whatIDo: {
    title: 'What I Do - Technical Capabilities | Tafara Rugara',
    description:
      'Automation engineering with n8n, GoHighLevel, Zapier, JavaScript and APIs. CRM lifecycle workflows, AI integration, quality assurance and cloud deployment.',
    keywords: [
      'Full-Stack Development',
      'Next.js Development',
      'React Development',
      'Web Applications',
      'Frontend Development',
      'Responsive Web Design',
      'Modern Web Technologies',
      'Cloud Architecture',
      'DevOps CI/CD',
      'Automation Engineering',
      'n8n',
      'GoHighLevel',
      'Zapier',
      'REST APIs',
      'JavaScript',
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
    canonicalUrl: 'https://tafara.netlify.app/what-i-do',
  },
  projects: {
    title: 'Featured Projects - Automation Engineering Portfolio | Tafara Rugara',
    description:
      'Automation and software projects: n8n delivery-health pilot, Trevis property operations, Voice-to-Vector semantic search, APIs and cloud deployment.',
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
    canonicalUrl: 'https://tafara.netlify.app/projects',
  },
  experience: {
    title: 'Professional Experience - Automation Engineer | Tafara Rugara',
    description:
      'GoHighLevel and CRM automation at Clientharvest.io, software delivery at Mero Tech and DevOps at Excellessence. Experience with GoHighLevel, Zapier, n8n, JavaScript and AI pipelines.',
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
    canonicalUrl: 'https://tafara.netlify.app/experience',
  },
  contact: {
    title: 'Contact - Get in Touch | Tafara Rugara',
    description:
      'Contact Tafara Rugara for remote Automation Engineer contracts, n8n workflows, GoHighLevel CRM automation, Zapier integrations and AI systems. Based in Harare, Zimbabwe.',
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
    canonicalUrl: 'https://tafara.netlify.app/contact',
  },
};

// Utility function to generate metadata
export function generatePageMetadata(pageKey: keyof PageSEOConfig): Metadata {
  const config = pageSEOConfig[pageKey];

  const baseMetadata: Metadata = {
    metadataBase: new URL('https://tafara.netlify.app'),
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


  return baseMetadata;
}

// Enhanced structured data for different page types
export function generateStructuredData(pageKey: keyof PageSEOConfig) {
  const basePersonData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Tafara Rugara',
    jobTitle: 'Automation Engineer',
    description:
      'Automation Engineer specializing in business workflows, GoHighLevel CRM automation, n8n, Zapier, API integrations and AI pipelines.',
    url: 'https://tafara.netlify.app',
    image: 'https://tafara.netlify.app/images/placeholder.svg',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Harare',
      addressCountry: 'Zimbabwe',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Clientharvest.io',
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
      'n8n',
      'GoHighLevel',
      'Zapier',
      'REST APIs',
      'JavaScript',
      'Monitoring',
      'Observability',
    ],
    sameAs: [
      'https://github.com/98Devops',
      'https://www.linkedin.com/in/tafara-rugara-0627b819b/',
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
          name: 'Automation Engineer',
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
          name: 'Clientharvest.io',
          description: 'Automation and CRM agency',
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
