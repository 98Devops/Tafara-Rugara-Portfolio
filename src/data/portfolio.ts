import { PortfolioData } from '@/types';

export const automationSystems = {
  flagship: {
    id: 'delivery-health-ai',
    title: 'AI-Powered Delivery Health & Operations Intelligence System',
    subtitle: 'Production-grade pilot built for Crebos.online — shortlisted in senior-facing evaluation',
    description:
      'A production-grade automation system built for Crebos.online that monitors delivery health across multiple concurrent projects, scores them objectively, uses AI for diagnostics, and pushes consolidated reports to leadership — replacing gut-feel decisions with reliable, data-driven escalation paths.',
    businessContext:
      'Multiple projects running concurrently with fragmented visibility. Dashboards were inaccurate and leadership decisions relied on gut-feel with no clear escalation path.',
    systemCapabilities: [
      'Objective, repeatable project health scoring (Red / Yellow / Green) across all live projects',
      'AI-generated diagnostics with prioritised recommendations per project',
      'Aggregated alerts with anti-spam logic to reduce alert fatigue',
      'Manual review and escalation steps for edge-cases requiring human judgement',
      'Two-way sync with ClickUp — verified updates written back into the source system',
      'Human-in-the-loop safeguards at every critical decision point',
    ],
    architecture: [
      'n8n orchestration with modular workflows and anti-duplication logic',
      'Strict input validation and workflow condition checks before executing actions',
      'AI retry handling with bounded backoff for external service failures',
      'Secure deployment with environment validation and secrets management',
      'Full observability — workflow execution monitoring and alert aggregation',
    ],
    outcome:
      'Delivered as a ClickUp pilot assignment for Crebos.online — shortlisted in senior evaluation. Demonstrates system-level thinking and production readiness for real operational automation.',
    technologies: ['n8n', 'Docker', 'ClickUp', 'AI/LLMs', 'Observability', 'Retry Logic', 'JSON Schema Validation'],
    demoUrl: 'https://www.youtube.com/watch?v=c8ETK5kOh08',
  },
  supporting: [
    {
      id: 'voice-to-vector-workflow',
      title: 'Voice-to-Vector AI Workflow (Your EKA Services)',
      description:
        'AI workflow system built during my role at Your EKA Services — transforms voice notes into structured insights and stores them in a vector database for semantic retrieval and downstream automation.',
      systemPurpose:
        'Enables teams to capture unstructured voice input and convert it into searchable, structured knowledge. Built to prototype AI-first knowledge management for client demos.',
      architecture: [
        'End-to-end voice intelligence pipeline',
        'Vector storage using Qdrant for semantic search',
        'Integrates Whisper transcription and LLM reasoning',
        'Exposed as a reliable internal service for downstream workflows',
      ],
      tools: ['n8n', 'Qdrant', 'Whisper API', 'Gemini Pro', 'Docker', 'Workflow Automation'],
      demoUrl: 'https://www.youtube.com/watch?v=b5xatvQ6TQQ',
    },
    {
      id: 'telegram-ai-bot',
      title: 'AI Accounting & Tax Assistant — Telegram MVP (Personal Project)',
      description:
        'Personal MVP project — a domain-specific AI agent for small businesses navigating accounting and tax questions in the Botswana context. Built to validate retrieval-augmented generation in a productivity chatbot format.',
      systemPurpose:
        'Provides RAG-based retrieval for tax and regulatory information with local compliance workflows. Proof-of-concept for deploying AI agents via Telegram as a low-friction user interface.',
      architecture: [
        'RAG-based retrieval for regulatory and tax information',
        'Domain-specific prompt engineering for local compliance context',
        'Telegram Bot API as the delivery interface',
        'Lightweight deployment for rapid iteration and validation',
      ],
      tools: ['RAG', 'AI/LLMs', 'Telegram Bot API', 'Document Parsing', 'Workflow Automation'],
      demoUrl: 'https://www.youtube.com/watch?v=IEMl8c1U_4s',
    },
  ],
};

export const testimonial = {
  quote:
    "I recommend him without reservation. I would rehire him for DevOps and automation work. He is a systems thinker who traces cause and effect through the stack before he acts. Prototype deployments became routine and recoverable, and non-technical teammates could trigger reliable automations because his n8n flows were robust.",
  author: 'Bongani Wilson',
  title: 'Director',
  company: 'Excellessence (Your EKA Services)',
};

export const certifications = [
  {
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    year: '2024',
    status: 'Certified',
    color: '#FF9900',
    icon: '☁️',
    badge: 'CCP',
  },
  {
    name: 'AWS Solutions Architect — Associate',
    issuer: 'Amazon Web Services',
    year: '2025',
    status: 'In Progress',
    color: '#00D4FF',
    icon: '🏗️',
    badge: 'SAA-C03',
  },
];

export const portfolioData: PortfolioData = {
  personal: {
    name: 'Tafara Rugara',
    title: 'Cloud & DevOps + AI Automation Specialist',
    location: 'Harare, Zimbabwe & Johannesburg, South Africa',
    summary:
      'Cloud & DevOps Engineer specializing in AI-powered automation systems, container orchestration, and infrastructure that ships. I build production-grade pipelines, automate complex workflows with n8n and LLMs, and turn operational chaos into intelligent, self-managing systems — deployable on AWS, Docker, and Kubernetes.',
    profileImage: '/images/tafara-rugara.jpg',
    socialLinks: {
      github:   'https://github.com/98Devops',
      linkedin: 'https://www.linkedin.com/in/tafara-rugara-0627b819b/',
      email:    'tfrsuperfx@gmail.com',
      youtube:  'https://www.youtube.com/@techwithtaf',
      whatsapp: 'https://wa.me/263777553271',
    },
    documents: {
      cv:        '/documents/tafara-rugara-cv.pdf',
      reference: '/documents/tafara-rugara-reference.pdf',
    },
  },
  capabilities: [
    {
      category: 'Cloud Architecture',
      description: 'Designing and deploying scalable cloud infrastructure on AWS with focus on cost efficiency, security, and operational excellence.',
      skills: [
        'AWS (EC2, S3, Lambda, API Gateway, RDS, CloudFront, Route 53, IAM)',
        'Infrastructure as Code — Terraform',
        'Elastic Beanstalk & Managed Services',
        'Serverless Architecture Design',
        'Multi-Region Deployment Patterns',
        'Cloud Security & IAM Best Practices',
      ],
    },
    {
      category: 'DevOps & CI/CD',
      description: 'Building robust CI/CD pipelines and container orchestration for reliable, automated software delivery.',
      skills: [
        'GitHub Actions CI/CD Pipelines',
        'Docker & Multi-Container Environments',
        'Kubernetes Orchestration & Cluster Management',
        'Linux Server Administration & Hardening',
        'GitOps Workflows & Branching Strategies',
        'Container Reliability & Scheduling Optimisation',
        'SSH Key Auth, Firewalls, Security Patching',
        'Pipeline Downtime Reduction (60% achieved)',
      ],
    },
    {
      category: 'Automation Engineering',
      description: 'Creating intelligent automation workflows with n8n, LLMs, and APIs that replace manual processes with reliable, self-managing systems.',
      skills: [
        'n8n Workflow Orchestration',
        'Voice-to-Insight AI Pipelines',
        'Prompt Engineering & LLM Integration',
        'API Integration & Design',
        'Vector Database Workflows (Qdrant)',
        'Custom JavaScript Logic & Schema Enforcement',
        'AI-Driven Operations Monitoring',
        'Bash & Python Scripting',
      ],
    },
    {
      category: 'Monitoring & Reliability',
      description: 'Implementing observability and ensuring system reliability through proactive monitoring, structured logging, and continuous deployment.',
      skills: [
        'Prometheus & Grafana Dashboards',
        'Winston Structured Logging',
        'System Debugging & Root Cause Analysis',
        'Production Environment Management',
        'Workflow Execution Monitoring (n8n)',
        'Continuous Deployment Strategies',
        'Operational Integrity & Patching',
        'Alert Aggregation & Anti-Spam Logic',
      ],
    },
  ],
  projects: [
    {
      id: 'acquisitions-api',
      title: 'Acquisitions — SaaS M&A Platform',
      description:
        'Production-ready API platform for SaaS business acquisitions with JWT/RBAC authentication, deal state management, Kubernetes orchestration, and a full DevOps lifecycle.',
      problem: 'SaaS businesses needed a secure, scalable platform for managing acquisition transactions with role-based access, deal workflows, and comprehensive monitoring.',
      technicalArchitecture:
        'Microservices API on AWS with JWT/RBAC, Kubernetes, Terraform IaC, serverless Postgres (Neon + Drizzle ORM), Prometheus/Grafana observability.',
      operationalValue:
        'Demonstrates end-to-end production engineering: security, automation, and DevOps lifecycle for a real business workflow domain.',
      outcome: 'Fully deployed API with automated CI/CD, rolling Kubernetes deployments, and monitoring stack. Docker image available: devops263/acquisitions-api:latest',
      technologies: ['Node.js', 'JWT', 'Zod', 'Winston', 'Docker', 'Kubernetes', 'GitHub Actions', 'Neon DB', 'Terraform', 'Prometheus', 'Grafana', 'Jest'],
      highlights: [
        'JWT authentication with role-based access control (Admin, User)',
        'Deal lifecycle management — pending → active → completed state transitions',
        'Kubernetes with rolling deployments and health checks',
        'Docker image: devops263/acquisitions-api:latest — pull and test instantly',
        'Terraform IaC on AWS (Lambda, API Gateway, CloudFront, S3)',
        'GitHub Actions pipeline: lint → test → build → deploy gates',
        'Prometheus + Grafana for dashboards and operational alerting',
        'Arcjet bot/spam protection + Winston structured logging',
        'Jest + Supertest for integration and unit tests',
      ],
      githubUrl: 'https://github.com/98Devops/acqusitions',
    },
    {
      id: 'voice-to-vector-api',
      title: 'Voice-to-Vector Platform API',
      description:
        'Flask-based internal platform service exposing an end-to-end AI pipeline — converting voice inputs into vector embeddings for semantic search and downstream workflow automation.',
      problem: 'Teams needed a reliable internal service to process voice inputs, transcribe, enrich, and store vector embeddings for semantic retrieval.',
      technicalArchitecture: 'Flask REST API with Whisper transcription, LLM reasoning, and Qdrant vector storage; containerised for portability.',
      operationalValue: 'Turns AI workflows into reliable internal platform services — consistent voice intelligence processing and semantic search.',
      outcome: 'Containerised internal-service API with vector storage, transcript enrichment, and REST endpoints for downstream consumption.',
      technologies: ['Python', 'Flask', 'Qdrant', 'Whisper', 'LLMs', 'Docker', 'REST API'],
      highlights: [
        'End-to-end voice-to-vector intelligence pipeline',
        'Whisper API transcription + LLM reasoning + Qdrant vector storage',
        'RESTful API with structured endpoints for downstream consumption',
        'Containerised deployment with Docker for environment portability',
        'Semantic search capability over processed voice data',
      ],
      githubUrl: 'https://github.com/98Devops/Voice-to-vector',
    },
    {
      id: 'legacy-migration',
      title: 'Legacy Java App — AWS Platform Migration',
      description:
        'Strategic migration of a 15-year-old Java application from manual on-premises server management to a fully managed AWS platform with a documented "Golden Path" for onboarding.',
      problem: 'Legacy Java app faced operational overhead, scalability limits, and manual server management complexity.',
      technicalArchitecture: 'AWS Elastic Beanstalk for orchestrated deployment, RDS & ElastiCache for managed data layers, CloudFront for distribution.',
      operationalValue: '60% operational overhead reduction, dramatically improved scalability, and reusable migration template for future projects.',
      outcome: 'Successfully migrated with documented patterns adopted as a reusable playbook.',
      technologies: ['Java', 'AWS Elastic Beanstalk', 'RDS', 'ElastiCache', 'CloudFront', 'Platform Engineering'],
      highlights: [
        'Migrated 15-year-old application with zero downtime strategy',
        'Elastic Beanstalk for automated deployment orchestration',
        'RDS + ElastiCache for fully managed data layer',
        'Documented "Golden Path" for standardised team onboarding',
        '60% reduction in operational overhead post-migration',
      ],
      githubUrl: '',
    },
    {
      id: 'serverless-platform-pattern',
      title: 'Serverless IaC Platform Pattern',
      description:
        'Reusable serverless application platform built with Terraform IaC and GitHub Actions — standardising lightweight API and static app deployments with security-by-default principles.',
      problem: 'Teams needed repeatable, secure patterns for rapid API and static application deployments.',
      technicalArchitecture: 'Infrastructure entirely in Terraform; secure-by-default config; fully automated GitHub Actions CI/CD.',
      operationalValue: 'Reduces deployment time from days to minutes with zero configuration drift across projects.',
      outcome: 'Reusable pattern adopted across multiple projects including this portfolio site.',
      technologies: ['Terraform', 'AWS Lambda', 'GitHub Actions', 'CloudFront', 'API Gateway', 'S3'],
      highlights: [
        'Infrastructure-as-Code with Terraform (100% automation)',
        'Secure-by-default: IAM least privilege, HTTPS-only, signed CDN',
        'GitHub Actions pipeline with full deployment gates',
        'Adopted across multiple projects — zero config drift',
      ],
      githubUrl: '',
      demoUrl: 'https://d3tr9ufxy7e85m.cloudfront.net/',
    },
  ],
  experience: [
    {
      company: 'Excellessence (Your EKA Services)',
      position: 'DevOps & Automation Engineer',
      duration: 'May 2025 – November 2025',
      impact: '60% pipeline downtime reduction',
      achievements: [
        'Deployed production-ready AI workflow pipeline on DigitalOcean VPS with secure multi-container environment using Docker Compose',
        'Built voice-to-insight automation system using n8n, Whisper API, and Gemini Pro — used for live client prototype demonstrations',
        'Supported LLM-powered prototypes end-to-end — handling environment variables, queues, and scheduled tasks for AI-driven demos',
        'Hardened Linux infrastructure with SSH key auth, UFW firewalls, and proactive patching — maintaining full operational integrity',
        'Resolved container orchestration scheduling errors by configuring EXECUTIONS_PROCESS=main, reducing pipeline downtime by 60%',
        'Standardised AI outputs via prompt engineering with strict JSON schema enforcement for consistent downstream automation',
        'Replaced low-code nodes with custom JavaScript for intelligent workflow routing and data flow control',
        'Synced voice-to-insight outputs with Obsidian via Syncthing for structured knowledge capture',
      ],
      technologies: ['Docker', 'n8n', 'Linux', 'CI/CD', 'Whisper API', 'Gemini Pro', 'ClickUp', 'SSH', 'Security Hardening', 'AI/ML Ops'],
    },
  ],
};