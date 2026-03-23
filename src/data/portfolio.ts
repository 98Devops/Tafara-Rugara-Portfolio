import { PortfolioData } from '@/types';

export const automationSystems = {
  flagship: {
    id: 'voice-to-insight-workflow',
    title: 'AI-Powered Delivery Health & Operations Intelligence System (n8n)',
    subtitle: 'Production-grade automation system for objective delivery health scoring and AI diagnostics',
    description: 'A production-grade automation system that monitors delivery health across multiple projects, scores them objectively, uses AI for diagnostics, and pushes consolidated reports to leadership for real decision-making, not just dashboards.',
    businessContext: 'Multiple projects running concurrently with fragmented visibility; dashboards are often inaccurate and leadership decisions rely on gut-feel without a clear escalation path.',
    systemCapabilities: [
      'Project health scoring that is objective and repeatable across all projects',
      'Status classification using Red / Yellow / Green indicators for immediate visibility',
      'AI-generated diagnostics with key issues and prioritized recommendations per project',
      'Aggregated alerts with anti-spam logic to reduce alert fatigue and deliver meaningful notifications',
      'Manual review and escalation steps for edge-cases requiring human judgement',
      'Two-way sync with ClickUp including verified updates written back into the source system'
    ],
    architecture: [
      'n8n orchestration driving modular workflows with anti-duplication logic',
      'Strict input validation and workflow condition checks before executing actions',
      'AI retry handling with bounded backoff for robustness against external service failures',
      'Human-in-the-loop safeguards at key decision points',
      'Secure deployment patterns with environment validation and secrets management',
      'Observability and monitoring for workflow executions and alert aggregation'
    ],
    outcome: 'Built as a real pilot assignment and shortlisted in senior-facing evaluation. Demonstrates system-level thinking and production readiness for operational automation.',
    technologies: ['n8n', 'Docker', 'ClickUp', 'AI/LLMs', 'Observability', 'Retry Logic', 'Validation Schemas'],
    demoUrl: 'https://www.youtube.com/watch?v=c8ETK5kOh08'
  },
  supporting: [
    {
      id: 'voice-to-vector-workflow',
      title: 'Voice-to-Vector AI Workflow for Knowledge Systems',
      description: 'AI workflow system that transforms voice notes into structured insights and stores them in a vector database for semantic retrieval.',
      systemPurpose: 'Enables teams to capture unstructured voice input and convert it into searchable, structured knowledge for workflow automation',
      architecture: ['End-to-end intelligence pipeline', 'Vector storage using Qdrant', 'Integrates transcription and LLM reasoning', 'Exposed AI capabilities as reliable internal services'],
      tools: ['n8n', 'Qdrant', 'AI/ML', 'Vector Database', 'Workflow Automation'],
      demoUrl: 'https://www.youtube.com/watch?v=b5xatvQ6TQQ'
    },
    {
      id: 'ai-accounting-bw',
      title: 'AI Accounting & Tax Assistant for SMEs (Botswana)',
      description: 'A domain-specific AI agent that helps small and medium enterprises with accounting and tax questions for the Botswana context.',
      systemPurpose: 'Provides retrieval-augmented generation (RAG) for tax and regulatory information with local compliance workflows and SME-focused assistant capabilities.',
      architecture: ['RAG-based retrieval for regulatory information', 'Domain-specific prompt engineering', 'Integration into SME workflows for question answering and task assistance'],
      tools: ['RAG', 'AI/LLMs', 'Document Parsing', 'Workflow Automation'],
      demoUrl: 'https://www.youtube.com/watch?v=IEMl8c1U_4s'
    }
  ]
};

export const portfolioData: PortfolioData = {
  personal: {
    name: 'Tafara Rugara',
    title: 'Cloud & DevOps + AI Automation Specialist',
    location: 'Harare, Zimbabwe & Johannesburg, South Africa · Remote',
    summary: 'Cloud & DevOps Engineer specializing in AI-powered automation systems, container orchestration, and infrastructure that ships. I build production-grade pipelines, automate complex workflows with n8n and LLMs, and turn operational chaos into intelligent, self-managing systems — deployable on AWS, Docker, and Kubernetes.',
    socialLinks: {
      github:    'https://github.com/98Devops',
      linkedin:  'https://www.linkedin.com/in/tafara-rugara-0627b819b/',
      email:     'tfrsuperfx@gmail.com',
      youtube:   'https://www.youtube.com/@techwithtaf',
      whatsapp:  'https://wa.me/263777553271',
    },
    documents: {
      cv: '/documents/tafara-rugara-cv.pdf',
      reference: '/documents/tafara-rugara-reference.pdf',
    },
  },
  capabilities: [
    {
      category: 'Cloud Architecture',
      description: 'Designing and implementing scalable cloud infrastructure solutions with focus on AWS services, cost optimization, and operational excellence.',
      skills: [
        'AWS Services (EC2, S3, Lambda, API Gateway, RDS, CloudFront, Route 53, IAM)',
        'Infrastructure as Code (Terraform)',
        'Cloud Cost Optimization Strategies',
        'Serverless Architecture Design',
        'Multi-Region Deployment Patterns',
        'Cloud Security & IAM Best Practices',
      ],
    },
    {
      category: 'DevOps & CI/CD',
      description: 'Building robust CI/CD pipelines and container orchestration systems for reliable software delivery and infrastructure automation.',
      skills: [
        'GitHub Actions CI/CD Pipelines',
        'Docker Containerization & Multi-Container Environments',
        'Kubernetes Orchestration & Management',
        'Linux Server Administration & Hardening',
        'Configuration Management & Environment Variables',
        'Container Reliability & Scheduling Optimization',
        'Git Workflows & Branching Strategies',
        'Infrastructure Monitoring & Debugging',
      ],
    },
    {
      category: 'Automation Engineering',
      description: 'Creating intelligent automation workflows and systems that streamline operations and enhance productivity through code and low-code solutions.',
      skills: [
        'n8n Workflow Automation & Orchestration',
        'API Integration & Design',
        'Voice-to-Insight Automation Pipelines',
        'Bash & Python Scripting (in progress)',
        'Prompt Engineering & LLM Integration',
        'Data Synchronization (Syncthing)',
        'Custom JavaScript Logic for Workflow Control',
        'Schema Enforcement & Data Validation',
      ],
    },
    {
      category: 'Monitoring & Reliability',
      description: 'Implementing observability solutions and ensuring system reliability through proactive monitoring and continuous deployment practices.',
      skills: [
        'System Debugging & Troubleshooting',
        'Continuous Deployment Strategies',
        'SSH Key Authentication & Security',
        'Firewall Configuration & Network Security',
        'Observability Tools (learning phase)',
        'Pipeline Reliability & Downtime Reduction',
        'Production Environment Management',
        'Operational Integrity & Patching',
      ],
    },
  ],
  projects: [
    {
      id: 'acquisitions-api',
      title: 'Acquisitions — Platform for Buying & Selling SaaS Businesses',
      description: 'Production-ready API platform for SaaS M&A workflows with comprehensive authentication, RBAC, deal management, observability, and complete DevOps lifecycle implementation.',
      problem: 'SaaS businesses needed a secure, scalable platform for managing acquisition transactions with role-based access control, deal state management, and comprehensive monitoring.',
      technicalArchitecture: 'Microservices API with JWT/RBAC authentication, Kubernetes orchestration, Infrastructure as Code on AWS, serverless Postgres with Drizzle ORM, and comprehensive observability stack.',
      operationalValue: 'End-to-end platform delivery demonstrating production-grade security, automation, and DevOps lifecycle for SaaS M&A workflows with complete monitoring and logging.',
      outcome: 'Production-ready API with JWT-based authentication, automated CI/CD pipeline, Kubernetes deployment, and comprehensive monitoring stack serving SaaS acquisition workflows.',
      technologies: ['Node.js', 'JWT', 'Zod', 'Winston', 'Docker', 'Kubernetes', 'GitHub Actions', 'Neon DB', 'Drizzle', 'Prometheus', 'Grafana', 'Jest', 'Arcjet'],
      highlights: [
        'JWT-based authentication and authorization with role-based access control (admins, users)',
        'User account management and business listings (create, update, delete, browse)',
        'Deal management to track deals from pending → completed with state transitions',
        'Request validation using Zod and structured logging via Winston',
        'Health monitoring for endpoints and operational metrics collection',
        'Git with branching strategy, code reviews, and GitHub-hosted repository',
        'CI/CD with GitHub Actions (lint, test, build, deploy gates)',
        'Docker for containerization and Kubernetes for orchestration with rolling deployments',
        'Infrastructure as Code on AWS; Neon DB (serverless Postgres) + Drizzle ORM',
        'Security: Arcjet for bot/spam protection; JWT and RBAC for access control',
        'Monitoring & Logging: Winston, Prometheus, Grafana for dashboards and alerts',
        'Code quality & testing: ESLint, Prettier, Jest, Supertest',
        'Developer workflow: Warp and AI-assisted workflows for productivity'
      ],
      githubUrl: 'https://github.com/98Devops/acqusitions',
    },
    {
      id: 'voice-to-vector-api',
      title: 'Voice-to-Vector API (Platform Variant)',
      description: 'A Flask-based AI platform that exposes an end-to-end intelligence pipeline as an internal service, converting voice inputs into vectors for semantic search and downstream workflows.',
      problem: 'Teams needed an internal platform service to reliably process voice inputs, transcribe, enrich, and store vector embeddings for semantic retrieval.',
      technicalArchitecture: 'Flask-based internal API with transcription, LLM reasoning, and Qdrant vector storage; deployed in containers for portability.',
      operationalValue: 'Turns AI workflows into reliable internal platform services, enabling consistent processing and semantic search across teams.',
      outcome: 'Internal platform-grade service for voice intelligence with vector storage and API endpoints for downstream consumption.',
      technologies: ['Python', 'Flask', 'Qdrant', 'Whisper', 'LLMs', 'Docker', 'REST API'],
      highlights: [
        'Flask Backend with RESTful Architecture',
        'AI-powered voice-to-text processing',
        'Vector database integration for semantic search',
        'Scalable REST API design',
        'Containerized deployment architecture',
        'Real-time voice processing pipeline'
      ],
      githubUrl: 'https://github.com/98Devops/Voice-to-vector',
    },
    {
      id: 'legacy-migration',
      title: 'Managed Legacy Migration — Platform Modernization',
      description: 'Strategic migration of legacy Java application from manual server management to managed AWS platform with documented "Golden Path" for onboarding.',
      problem: 'Legacy Java application faced operational overhead, scalability limits, and manual server management complexity in on-premises environment.',
      technicalArchitecture: 'Managed AWS platform using Elastic Beanstalk for orchestrated deployment, RDS & ElastiCache for managed data layers.',
      operationalValue: 'Drastically reduced operational overhead and improved scalability through platform standardization and managed services.',
      outcome: 'Successfully migrated 15-year-old application with 60% operational overhead reduction and documented reusable migration patterns.',
      technologies: ['Java', 'AWS Elastic Beanstalk', 'RDS', 'ElastiCache', 'CloudFront', 'Platform Engineering'],
      highlights: [
        'Elastic Beanstalk for orchestrated deployment automation',
        'RDS & ElastiCache for managed data layer architecture',
        'Documented "Golden Path" for standardized onboarding',
        'Platform approach reducing operational complexity',
        'Scalability improvements through managed services',
        'Reusable migration patterns for future projects'
      ],
      githubUrl: '',
    },
    {
      id: 'serverless-platform-pattern',
      title: 'Serverless App Pattern — IaC & CI/CD Platform',
      description: 'Reusable serverless application platform pattern built using AWS managed services with Infrastructure as Code and automated CI/CD pipelines.',
      problem: 'Teams needed standardized, repeatable patterns for lightweight API and static application deployments with security-by-default principles.',
      technicalArchitecture: 'Infrastructure entirely defined with Terraform, secure-by-default configuration, and fully automated GitHub Actions CI/CD pipeline.',
      operationalValue: 'Standardizes lightweight API and static application deployments, reducing deployment time from days to minutes.',
      outcome: 'Reusable platform pattern adopted across multiple projects, including this portfolio website, with zero configuration drift.',
      technologies: ['Terraform', 'AWS Lambda', 'GitHub Actions', 'CloudFront', 'API Gateway', 'S3'],
      highlights: [
        'Infrastructure entirely defined with Terraform IaC',
        'Secure-by-default configuration and compliance',
        'Fully automated GitHub Actions CI/CD pipeline',
        'Reusable platform pattern for rapid deployment',
        'Standardized approach for API and static deployments',
        'Zero configuration drift through automation'
      ],
      githubUrl: '',
      demoUrl: 'https://d3tr9ufxy7e85m.cloudfront.net/',
    },
  ],
  experience: [
    {
      company: 'Excellessence (YourEKA Services)',
      position: 'DevOps Engineer',
      duration: 'June 2025 – October 2025',
      impact: '60% pipeline downtime reduction',
      achievements: [
        'Designed and deployed production-ready AI workflow pipeline on Digital Ocean VPS with secure multi-container environment using Docker Compose',
        'Automated voice-to-insight workflows using n8n, Whisper API, and Gemini Pro to generate structured task insights synced with Obsidian via Syncthing',
        'Hardened Linux infrastructure with SSH key authentication, firewalls, and regular patching for operational integrity',
        'Fixed container orchestration scheduling errors by configuring environment variables (EXECUTIONS_PROCESS=main) for resilient CI/CD behavior',
        'Applied prompt engineering to standardize AI outputs, enforcing strict JSON schemas for consistent downstream automation',
        'Improved automation reliability by replacing low-code nodes with custom JavaScript logic for intelligent routing and data flow control',
        'Delivered robust voice-to-insight workflow used for client prototype demos',
        'Enhanced data consistency through LLM prompt schema enforcement and parsing logic',
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
    },
  ],
};