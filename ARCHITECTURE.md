# Architecture Documentation

This document provides a comprehensive overview of the Tafara Portfolio website architecture, including code organization, design patterns, data flow, and technical decisions.

## Table of Contents

- [System Overview](#system-overview)
- [Technology Stack](#technology-stack)
- [Architecture Patterns](#architecture-patterns)
- [Component Architecture](#component-architecture)
- [Data Management](#data-management)
- [Performance Architecture](#performance-architecture)
- [Security Architecture](#security-architecture)
- [Testing Architecture](#testing-architecture)
- [Deployment Architecture](#deployment-architecture)

## System Overview

The portfolio website follows a modern JAMstack architecture pattern, built with Next.js 14 and deployed on Netlify's global CDN. The system emphasizes performance, SEO optimization, and maintainability through clean separation of concerns.

```
┌─────────────────────────────────────────────────────────────┐
│                    Client Browser                           │
├─────────────────────────────────────────────────────────────┤
│                    Netlify CDN                             │
├─────────────────────────────────────────────────────────────┤
│                 Next.js Application                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │    Pages    │  │ Components  │  │   Styles    │        │
│  │             │  │             │  │             │        │
│  │ • Home      │  │ • Layout    │  │ • Tailwind  │        │
│  │ • What I Do │  │ • Hero      │  │ • Custom    │        │
│  │ • Projects  │  │ • Project   │  │ • Framer    │        │
│  │ • Experience│  │ • Contact   │  │   Motion    │        │
│  │ • Contact   │  │ • SEO       │  │             │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
├─────────────────────────────────────────────────────────────┤
│                 Static Assets                              │
│              (PDFs, Images, Icons)                         │
└─────────────────────────────────────────────────────────────┘
```

### Key Architectural Principles

1. **Static-First**: All pages are statically generated for optimal performance
2. **Component-Driven**: Reusable, testable components with clear interfaces
3. **Type Safety**: Full TypeScript coverage with strict mode enabled
4. **Performance-Oriented**: Sub-2 second load times with 90+ Lighthouse scores
5. **Accessibility-First**: WCAG 2.1 AA compliance throughout
6. **SEO-Optimized**: Comprehensive meta tags and structured data

## Technology Stack

### Core Framework
- **Next.js 14**: App Router architecture with static site generation
- **React 18**: Concurrent features and modern hooks
- **TypeScript**: Strict type checking and enhanced developer experience

### Styling & Animation
- **Tailwind CSS**: Utility-first CSS with custom design system
- **Framer Motion**: Performant animations with declarative API
- **PostCSS**: CSS processing with autoprefixer

### Development Tools
- **ESLint**: Code linting with Next.js and TypeScript rules
- **Prettier**: Code formatting with Tailwind plugin
- **Jest**: Unit and property-based testing
- **Playwright**: Cross-browser end-to-end testing

### Deployment & Performance
- **Netlify**: Hosting with global CDN and form handling
- **Lighthouse CI**: Automated performance monitoring
- **Bundle Analyzer**: Code splitting and optimization analysis

## Architecture Patterns

### 1. App Router Pattern (Next.js 14)

The application uses Next.js 14's App Router for file-based routing with co-located layouts and metadata:

```
src/app/
├── layout.tsx          # Root layout with global metadata
├── page.tsx            # Home page
├── globals.css         # Global styles
├── contact/
│   ├── layout.tsx      # Contact-specific layout
│   └── page.tsx        # Contact page
├── projects/
│   ├── layout.tsx      # Projects-specific layout
│   └── page.tsx        # Projects page
└── ...
```

**Benefits**:
- Automatic code splitting per route
- Co-located layouts and metadata
- Improved SEO with static generation
- Better developer experience

### 2. Component Composition Pattern

Components are designed with composition in mind, allowing for flexible reuse:

```typescript
// Base component
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

// Specialized components
interface ProjectCardProps extends Omit<CardProps, 'children'> {
  project: Project;
}

interface CapabilityCardProps extends Omit<CardProps, 'children'> {
  capability: Capability;
}
```

### 3. Static Data Management Pattern

Portfolio content is managed through a centralized data file with TypeScript interfaces:

```typescript
// src/data/portfolio.ts
export const portfolioData: PortfolioData = {
  personal: { /* ... */ },
  capabilities: [ /* ... */ ],
  projects: [ /* ... */ ],
  experience: [ /* ... */ ],
};

// src/types/index.ts
export interface PortfolioData {
  personal: PersonalInfo;
  capabilities: TechnicalCapability[];
  projects: Project[];
  experience: Experience[];
}
```

### 4. Error Boundary Pattern

Graceful error handling with React Error Boundaries:

```typescript
class PortfolioErrorBoundary extends React.Component {
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Portfolio Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

## Component Architecture

### Component Hierarchy

```
App Layout
├── Navigation
│   ├── NavigationItem[]
│   └── MobileMenu
├── Page Content
│   ├── Hero Section (Home only)
│   │   ├── Professional Identity
│   │   ├── Call-to-Action Buttons
│   │   └── Animated Background
│   ├── Capabilities Grid (What I Do)
│   │   └── CapabilityCard[]
│   ├── Projects Showcase (Projects)
│   │   ├── ProjectGrid
│   │   └── ProjectCard[]
│   ├── Experience Timeline (Experience)
│   │   └── ExperienceTimeline
│   └── Contact Form (Contact)
│       ├── ContactForm
│       └── ContactInfo
├── SEO Components
│   ├── SEO (meta tags)
│   └── StructuredData (JSON-LD)
└── Performance Components
    ├── PerformanceMonitor
    └── OptimizedImage
```

### Component Design Principles

#### 1. Single Responsibility
Each component has a single, well-defined purpose:

```typescript
// ✅ Good: Single responsibility
function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="project-card">
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <TechStack technologies={project.technologies} />
    </div>
  );
}

// ❌ Bad: Multiple responsibilities
function ProjectCardWithNavigation({ project, onNavigate }) {
  // Handles both project display AND navigation
}
```

#### 2. Props Interface Design
Clear, typed interfaces for all component props:

```typescript
interface ProjectCardProps {
  project: Project;
  className?: string;
  showFullDescription?: boolean;
  onProjectClick?: (project: Project) => void;
}

// Optional props have default values
function ProjectCard({ 
  project, 
  className = '', 
  showFullDescription = false,
  onProjectClick 
}: ProjectCardProps) {
  // Component implementation
}
```

#### 3. Composition over Inheritance
Components are composed rather than extended:

```typescript
// Base layout component
function Card({ children, className }: CardProps) {
  return (
    <div className={`card-base ${className}`}>
      {children}
    </div>
  );
}

// Specialized components using composition
function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="project-specific-styles">
      <ProjectHeader project={project} />
      <ProjectContent project={project} />
      <ProjectActions project={project} />
    </Card>
  );
}
```

### Animation Architecture

Framer Motion is used consistently across components with performance-first principles:

```typescript
// Reusable animation variants
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Usage in components
function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {projects.map((project) => (
        <motion.div key={project.id} variants={fadeInUp}>
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </motion.div>
  );
}
```

## Data Management

### Static Data Architecture

The portfolio uses a static data management approach optimized for performance and maintainability:

```typescript
// src/data/portfolio.ts - Single source of truth
export const portfolioData: PortfolioData = {
  personal: {
    name: "Tafara Rugara",
    title: "Junior Cloud & DevOps Engineer",
    location: "Harare, Zimbabwe (Remote Available)",
    summary: "Passionate about cloud infrastructure...",
    socialLinks: {
      github: "https://github.com/tafara-rugara",
      linkedin: "https://linkedin.com/in/tafara-rugara",
      email: "tafara.rugara@example.com"
    },
    documents: {
      cv: "/documents/tafara-rugara-cv.pdf",
      reference: "/documents/tafara-rugara-reference.pdf"
    }
  },
  capabilities: [
    {
      category: "Cloud Architecture",
      skills: [
        "AWS Services (EC2, S3, Lambda, RDS)",
        "Infrastructure as Code (Terraform, CloudFormation)",
        "Secure IAM Design",
        "Serverless Architecture",
        "Cost Optimization",
        "Cloud Networking"
      ],
      description: "Designing and implementing scalable cloud solutions..."
    }
    // ... other capabilities
  ],
  projects: [
    {
      id: "acquisitions-api",
      title: "Acquisitions API",
      description: "Enterprise-grade REST API for acquisition management...",
      technologies: [
        "Node.js", "Express", "JWT", "RBAC", "Kubernetes", 
        "AWS", "Terraform", "GitHub Actions", "Prometheus", "Grafana"
      ],
      highlights: [
        "JWT authentication with role-based access control",
        "Kubernetes deployment with auto-scaling",
        "AWS Infrastructure as Code with Terraform",
        "CI/CD pipeline with GitHub Actions",
        "Comprehensive monitoring and logging stack"
      ],
      demoUrl: "https://acquisitions-api-demo.com",
      githubUrl: "https://github.com/tafara-rugara/acquisitions-api",
      imageUrl: "/images/projects/acquisitions-api.png"
    }
    // ... other projects
  ],
  experience: [
    {
      company: "Excellessence (YourEKA Services)",
      position: "DevOps Engineer",
      duration: "2023 - Present",
      achievements: [
        "Deployed production AI workflows reducing manual processes by 60%",
        "Implemented Docker Compose environments for development consistency",
        "Secured Linux systems with hardening practices and SSH key authentication",
        "Configured firewall rules and network security protocols",
        "Fixed CI/CD pipeline reliability issues improving deployment success rate",
        "Enforced prompt schema validation for AI model consistency",
        "Improved system debugging processes reducing incident resolution time"
      ],
      technologies: [
        "Docker", "Docker Compose", "Linux", "SSH", "Firewall Configuration",
        "CI/CD", "System Administration", "Security Hardening"
      ],
      impact: "60% downtime reduction impact"
    }
  ]
};
```

### Type Safety

Comprehensive TypeScript interfaces ensure data consistency:

```typescript
// src/types/index.ts
export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  summary: string;
  profileImage?: string;
  socialLinks: {
    github: string;
    linkedin: string;
    email: string;
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
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  highlights: string[];
  demoUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  achievements: string[];
  technologies: string[];
  impact?: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  capabilities: TechnicalCapability[];
  projects: Project[];
  experience: Experience[];
}
```

### Data Access Patterns

Components access data through clean, typed interfaces:

```typescript
// Hook for accessing portfolio data
function usePortfolioData() {
  return portfolioData;
}

// Component usage
function ProjectsPage() {
  const { projects } = usePortfolioData();
  
  return (
    <main>
      <ProjectGrid projects={projects} />
    </main>
  );
}

// Filtered data access
function useProjectsByTechnology(technology: string) {
  const { projects } = usePortfolioData();
  return projects.filter(project => 
    project.technologies.includes(technology)
  );
}
```

## Performance Architecture

### Static Site Generation (SSG)

All pages are statically generated at build time for optimal performance:

```typescript
// All pages use static generation by default
export default function HomePage() {
  return <HomeContent />;
}

// Metadata is also statically generated
export const metadata: Metadata = {
  title: 'Tafara Rugara - Junior Cloud & DevOps Engineer',
  description: 'Professional portfolio showcasing cloud engineering...',
};
```

### Code Splitting Strategy

Automatic and manual code splitting for optimal bundle sizes:

```typescript
// next.config.ts - Automatic splitting configuration
webpack: (config, { dev, isServer }) => {
  if (!dev) {
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: -10,
        },
        framerMotion: {
          test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
          name: 'framer-motion',
          chunks: 'all',
          priority: 10,
        },
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react',
          chunks: 'all',
          priority: 20,
        },
      },
    };
  }
  return config;
};
```

### Image Optimization

Comprehensive image optimization strategy:

```typescript
// src/components/OptimizedImage.tsx
interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width = 800,
  height = 600,
  priority = false,
  className = ''
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
    />
  );
}
```

### Performance Monitoring

Client-side performance monitoring with Web Vitals:

```typescript
// src/components/PerformanceMonitor.tsx
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

export default function PerformanceMonitor() {
  useEffect(() => {
    getCLS(console.log);
    getFID(console.log);
    getFCP(console.log);
    getLCP(console.log);
    getTTFB(console.log);
  }, []);

  return null; // This component doesn't render anything
}
```

## Security Architecture

### Content Security Policy (CSP)

Comprehensive CSP implementation in `netlify.toml`:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    Content-Security-Policy = '''
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      font-src 'self' https://fonts.gstatic.com;
      img-src 'self' data: https:;
      connect-src 'self' https://www.google-analytics.com;
      frame-ancestors 'none';
      base-uri 'self';
      form-action 'self';
    '''
```

### Security Headers

Additional security headers for protection:

```typescript
// next.config.ts
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains',
        },
      ],
    },
  ];
}
```

### Input Validation

Form input validation with TypeScript:

```typescript
// src/components/ContactForm.tsx
interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const validateContactForm = (data: ContactFormData): FormErrors => {
  const errors: FormErrors = {};
  
  if (!data.name.trim()) {
    errors.name = 'Name is required';
  }
  
  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!data.message.trim()) {
    errors.message = 'Message is required';
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long';
  }
  
  return errors;
};
```

## Testing Architecture

### Testing Strategy Overview

The testing architecture follows a pyramid approach with comprehensive coverage:

```
                    E2E Tests (Playwright)
                   /                      \
              Integration Tests          Performance Tests
             /                                          \
        Unit Tests                                Property-Based Tests
       /          \                              /                    \
  Components    Utilities                  Universal Properties    Correctness
```

### Unit Testing Architecture

Component testing with React Testing Library:

```typescript
// src/components/__tests__/Hero.test.tsx
import { render, screen } from '@testing-library/react';
import Hero from '../Hero';

describe('Hero Component', () => {
  it('displays correct professional information', () => {
    render(<Hero />);
    
    expect(screen.getByRole('heading', { level: 1 }))
      .toHaveTextContent('Tafara Rugara');
    expect(screen.getByText('Junior Cloud & DevOps Engineer'))
      .toBeInTheDocument();
    expect(screen.getByText('Harare, Zimbabwe (Remote Available)'))
      .toBeInTheDocument();
  });

  it('provides all required call-to-action buttons', () => {
    render(<Hero />);
    
    expect(screen.getByRole('link', { name: /view projects/i }))
      .toBeInTheDocument();
    expect(screen.getByRole('link', { name: /download cv/i }))
      .toBeInTheDocument();
    expect(screen.getByRole('link', { name: /github/i }))
      .toBeInTheDocument();
    expect(screen.getByRole('link', { name: /linkedin/i }))
      .toBeInTheDocument();
  });
});
```

### Property-Based Testing Architecture

Universal property validation with fast-check:

```typescript
// src/components/__tests__/Navigation.property.test.tsx
import fc from 'fast-check';
import { render } from '@testing-library/react';
import Navigation from '../Navigation';

describe('Navigation System Properties', () => {
  it('maintains consistent navigation across all pages', () => {
    // **Validates: Requirements 1.1, 1.2**
    fc.assert(fc.property(
      fc.constantFrom('/', '/what-i-do', '/projects', '/experience', '/contact'),
      (path) => {
        const { container } = render(<Navigation currentPath={path} />);
        const navItems = container.querySelectorAll('nav a');
        
        expect(navItems).toHaveLength(5);
        expect(Array.from(navItems).map(item => item.textContent)).toEqual([
          'Home', 'What I Do', 'Projects', 'Experience', 'Contact'
        ]);
      }
    ), { numRuns: 100, seed: 42 });
  });
});
```

### End-to-End Testing Architecture

Cross-browser testing with Playwright:

```typescript
// e2e/navigation.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Navigation System', () => {
  test('should navigate to all main pages', async ({ page }) => {
    await page.goto('/');
    
    const pages = [
      { name: 'What I Do', url: '/what-i-do' },
      { name: 'Projects', url: '/projects' },
      { name: 'Experience', url: '/experience' },
      { name: 'Contact', url: '/contact' },
    ];
    
    for (const { name, url } of pages) {
      await page.click(`nav a:has-text("${name}")`);
      await expect(page).toHaveURL(url);
      await expect(page.locator('h1')).toBeVisible();
    }
  });
});
```

### Performance Testing Architecture

Automated Lighthouse auditing:

```typescript
// e2e/lighthouse-performance.property.spec.ts
import { test, expect } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';

test.describe('Lighthouse Performance Properties', () => {
  test('should achieve performance standards for all pages', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'Lighthouse only runs on Chromium');
    
    const pages = ['/', '/what-i-do', '/projects', '/experience', '/contact'];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      
      const audit = await playAudit({
        page,
        thresholds: {
          performance: 90,
          accessibility: 90,
          'best-practices': 90,
          seo: 90,
        },
      });
      
      expect(audit.lhr.categories.performance.score).toBeGreaterThanOrEqual(0.9);
      expect(audit.lhr.categories.accessibility.score).toBeGreaterThanOrEqual(0.9);
      expect(audit.lhr.categories['best-practices'].score).toBeGreaterThanOrEqual(0.9);
      expect(audit.lhr.categories.seo.score).toBeGreaterThanOrEqual(0.9);
    }
  });
});
```

## Deployment Architecture

### Build Process

Optimized build pipeline with Next.js:

```typescript
// next.config.ts - Production optimizations
const nextConfig: NextConfig = {
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['@heroicons/react', 'framer-motion'],
  },
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    minimumCacheTTL: 31536000, // 1 year
  },
  
  // Compression and security
  compress: true,
  poweredByHeader: false,
  
  // Bundle optimization
  webpack: (config, { dev }) => {
    if (!dev) {
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
    }
    return config;
  },
};
```

### Netlify Configuration

Comprehensive deployment configuration:

```toml
# netlify.toml
[build]
  publish = ".next"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"
  NPM_FLAGS = "--production=false"
  NEXT_TELEMETRY_DISABLED = "1"

# Caching strategy
[[headers]]
  for = "/_next/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/documents/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
    X-Content-Type-Options = "nosniff"

# Form handling
[[forms]]
  name = "contact"

# Redirects and rewrites
[[redirects]]
  from = "/cv"
  to = "/documents/tafara-rugara-cv.pdf"
  status = 301

[[redirects]]
  from = "/resume"
  to = "/documents/tafara-rugara-cv.pdf"
  status = 301
```

### CI/CD Pipeline

GitHub Actions workflow for automated testing and deployment:

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test
      - run: npm run build
      
      - name: Run E2E tests
        run: |
          npm run test:e2e
      
      - name: Run Lighthouse audit
        run: |
          npm run lighthouse

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to Netlify
        run: echo "Deployment handled by Netlify Git integration"
```

This architecture provides a solid foundation for a high-performance, maintainable, and scalable portfolio website while ensuring excellent developer experience and code quality.