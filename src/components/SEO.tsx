import { portfolioData, automationSystems } from '@/data/portfolio';
import { site } from '@/data/site';
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
    title: 'Tafara Rugara — AI Systems, Automation & Full-Stack Engineering',
    description:
      'AI workflows, full-stack applications and dependable infrastructure. Explore Tafara Rugara’s projects, experience and approach to building useful systems.',
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
    canonicalUrl: 'https://tafara.netlify.app',
  },
  whatIDo: {
    title: 'What I Do — Automation, Software & Cloud',
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
    canonicalUrl: 'https://tafara.netlify.app/what-i-do',
  },
  projects: {
    title: 'Projects — Software, AI & Automation',
    description:
      'Explore Trevis, Munda, Synapse, RunProduce and more: client systems, independent products, AI workflows and cloud engineering projects by Tafara Rugara.',
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
    title: 'Experience — Automation & Systems Engineering',
    description:
      'Automation engineering at Clientharvest.io, full-stack systems at Mero Tech and DevOps experience at Excellessence YourEKA. Download Tafara Rugara’s current CV and reference.',
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
    title: 'Contact — Start a Conversation',
    description:
      'Discuss a project, role or collaboration with Tafara Rugara. Prepare an email or WhatsApp message, download the CV, or book a 30-minute call.',
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

// Keep search metadata aligned with the same source as the visible portfolio.
export function generateStructuredData(pageKey: keyof PageSEOConfig) {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': site.url + '/#person',
    name: portfolioData.personal.name,
    jobTitle: portfolioData.personal.title,
    description: portfolioData.personal.summary,
    url: site.url,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Harare',
      addressCountry: 'Zimbabwe',
    },
    sameAs: [
      portfolioData.personal.socialLinks.github,
      portfolioData.personal.socialLinks.linkedin,
    ],
    knowsAbout: [
      'AI workflow automation',
      'n8n',
      'React',
      'TypeScript',
      'Supabase',
      'AWS',
      'Docker',
      'DevOps',
    ],
  };
  if (pageKey === 'projects') {
    const projects = [
      ...portfolioData.projects.filter(
        p => p.id !== 'serverless-platform-pattern'
      ),
      automationSystems.flagship,
      ...automationSystems.supporting,
    ];
    return {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Projects by Tafara Rugara',
      url: site.url + '/projects',
      author: person,
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: projects.length,
        itemListElement: projects.map((project, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: project.title,
          url: site.url + '/projects#' + project.id,
        })),
      },
    };
  }
  if (pageKey === 'contact')
    return {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact Tafara Rugara',
      url: site.url + '/contact',
      mainEntity: person,
    };
  return person;
}
