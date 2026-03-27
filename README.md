# Tafara Rugara Portfolio Website

A production-ready, modern portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion, showcasing the professional capabilities of Tafara Rugara, a Junior Cloud & DevOps Engineer based in Harare, Zimbabwe.

## 🚀 Features

### Core Functionality
- **Five Main Pages**: Home, What I Do, Projects, Experience, and Contact
- **Professional Showcase**: Comprehensive display of Cloud Engineering and DevOps capabilities
- **Interactive Contact Form**: Netlify Forms integration with spam protection
- **Document Downloads**: Direct PDF access for CV and references
- **Project Portfolio**: Four detailed production projects with live demos

### Technical Excellence
- **Modern Tech Stack**: Next.js 14 with App Router, TypeScript, Tailwind CSS, Framer Motion
- **Performance Optimized**: Sub-2 second load times, 90+ Lighthouse scores
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Theme**: Professional dark theme with minimalist design
- **SEO Optimized**: Comprehensive meta tags, structured data, and keyword optimization
- **Accessibility**: WCAG compliant with semantic HTML structure
- **Security Headers**: CSP, HSTS, and other security best practices

## 🛠️ Technology Stack

### Frontend Framework
- **Next.js 14**: App Router architecture with static site generation
- **React 18**: Latest React features with concurrent rendering
- **TypeScript**: Full type safety throughout the codebase

### Styling & Animation
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Framer Motion**: Performant animations with 60fps target
- **Custom Fonts**: Inter (sans-serif) and JetBrains Mono (monospace)

### Development & Testing
- **Jest**: Unit and property-based testing framework
- **React Testing Library**: Component testing utilities
- **fast-check**: Property-based testing library
- **Playwright**: Cross-browser end-to-end testing
- **Lighthouse CI**: Automated performance and SEO auditing

### Deployment & Performance
- **Netlify**: Hosting with global CDN and form handling
- **Bundle Analyzer**: Code splitting and optimization analysis
- **Image Optimization**: WebP/AVIF formats with responsive sizing
- **Compression**: Gzip/Brotli compression enabled

## 📁 Project Structure

```
tafara-portfolio/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI/CD pipeline
├── .kiro/
│   └── specs/                  # Project specifications and design docs
├── e2e/                        # End-to-end tests (Playwright)
│   ├── contact-form.spec.ts    # Contact form functionality tests
│   ├── document-download.spec.ts # PDF download tests
│   ├── navigation.spec.ts      # Navigation system tests
│   ├── performance.spec.ts     # Performance validation tests
│   └── lighthouse-performance.property.spec.ts # Property-based performance tests
├── public/                     # Static assets
│   ├── documents/              # PDF documents (CV, references)
│   │   └── tafara-rugara-cv.pdf
│   ├── images/                 # Optimized images and icons
│   └── *.svg                   # SVG icons and graphics
├── scripts/
│   └── test-deployment.js      # Deployment validation script
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── contact/            # Contact page with form
│   │   ├── experience/         # Professional experience page
│   │   ├── projects/           # Project portfolio page
│   │   ├── what-i-do/          # Technical capabilities page
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Home page
│   │   ├── globals.css         # Global styles and CSS variables
│   │   ├── sitemap.ts          # Dynamic sitemap generation
│   │   └── robots.ts           # SEO robots.txt configuration
│   ├── components/             # Reusable React components
│   │   ├── __tests__/          # Component tests (unit & property-based)
│   │   ├── CapabilityCard.tsx  # Technical capability display
│   │   ├── ContactForm.tsx     # Contact form with validation
│   │   ├── ContactInfo.tsx     # Contact information display
│   │   ├── ErrorBoundary.tsx   # Error handling component
│   │   ├── ExperienceTimeline.tsx # Professional experience timeline
│   │   ├── Hero.tsx            # Home page hero section
│   │   ├── Navigation.tsx      # Site navigation component
│   │   ├── OptimizedImage.tsx  # Performance-optimized image component
│   │   ├── PerformanceMonitor.tsx # Client-side performance monitoring
│   │   ├── ProjectCard.tsx     # Individual project display
│   │   ├── ProjectGrid.tsx     # Project portfolio grid
│   │   ├── SEO.tsx             # SEO meta tags component
│   │   └── StructuredData.tsx  # JSON-LD structured data
│   ├── data/
│   │   └── portfolio.ts        # Static portfolio content and data
│   ├── test-utils/
│   │   └── index.ts            # Testing utilities and helpers
│   ├── types/
│   │   └── index.ts            # TypeScript type definitions
│   └── utils/
│       ├── __tests__/          # Utility function tests
│       ├── downloadUtils.ts    # PDF download functionality
│       └── performance.ts      # Performance monitoring utilities
├── Configuration Files
├── ├── eslint.config.mjs       # ESLint configuration
├── ├── jest.config.js          # Jest testing configuration
├── ├── jest.setup.js           # Jest setup and global mocks
├── ├── lighthouserc.js         # Lighthouse CI configuration
├── ├── netlify.toml            # Netlify deployment configuration
├── ├── next.config.ts          # Next.js configuration with optimizations
├── ├── playwright.config.ts    # Playwright E2E testing configuration
├── ├── postcss.config.mjs      # PostCSS configuration
├── ├── tailwind.config.ts      # Tailwind CSS configuration
├── └── tsconfig.json           # TypeScript configuration
├── Documentation
├── ├── README.md               # This file - comprehensive project guide
├── ├── DEPLOYMENT.md           # Detailed deployment instructions
├── ├── TESTING.md              # Testing strategy and guidelines
└── └── ARCHITECTURE.md         # Code architecture documentation
```

### Key Directories Explained

- **`src/app/`**: Next.js 14 App Router pages with co-located layouts and metadata
- **`src/components/`**: Reusable UI components with comprehensive test coverage
- **`src/data/`**: Static content management for portfolio information
- **`e2e/`**: Cross-browser end-to-end tests covering critical user journeys
- **`public/documents/`**: Professional documents (CV, references) served directly
- **`.github/workflows/`**: CI/CD pipeline with automated testing and deployment

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** (LTS recommended)
- **npm** or **yarn** package manager
- **Git** for version control

### Quick Start

1. **Clone the repository**:
```bash
git clone https://github.com/tafara-rugara/portfolio.git
cd tafara-portfolio
```

2. **Install dependencies**:
```bash
npm install
# or
yarn install
```

3. **Start development server**:
```bash
npm run dev
# or
yarn dev
```

4. **Open in browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

### Development Workflow

1. **Start development server** (terminal 1):
```bash
npm run dev
```

2. **Run tests in watch mode** (terminal 2):
```bash
npm run test:watch
```

3. **Optional: Run E2E tests during development**:
```bash
npm run test:e2e:ui
```

### Environment Setup

Create `.env.local` for local development:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
```

For production deployment, set:
```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

## 📜 Available Scripts

### Development
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm run start` - Start production server (requires build first)

### Code Quality
- `npm run lint` - Run ESLint for code linting
- `npm run lint:fix` - Automatically fix ESLint issues
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting without changes

### Testing
- `npm run test` - Run unit tests with Jest
- `npm run test:watch` - Run tests in watch mode for development
- `npm run test:coverage` - Generate test coverage report
- `npm run test:e2e` - Run end-to-end tests with Playwright
- `npm run test:e2e:ui` - Run E2E tests with interactive UI
- `npm run test:e2e:headed` - Run E2E tests in headed browser mode
- `npm run test:all` - Run complete test suite (unit + E2E + Lighthouse)

### Performance & Analysis
- `npm run lighthouse` - Run Lighthouse performance audit
- `npm run lighthouse:collect` - Collect Lighthouse metrics only
- `npm run analyze` - Analyze bundle size with webpack-bundle-analyzer
- `npm run analyze:server` - Analyze server-side bundle
- `npm run analyze:browser` - Analyze client-side bundle

### Deployment
- `npm run test:deployment` - Validate deployment configuration

## 🎨 Customization

### Content Management

#### Portfolio Data (`src/data/portfolio.ts`)
Update the main portfolio content:

```typescript
export const portfolioData = {
  personal: {
    name: "Your Name",
    title: "Your Professional Title",
    location: "Your Location",
    summary: "Your professional summary...",
    // ... other personal info
  },
  capabilities: [
    {
      category: "Your Capability Category",
      skills: ["Skill 1", "Skill 2", "..."],
      description: "Category description..."
    }
    // ... other capabilities
  ],
  projects: [
    {
      title: "Project Name",
      description: "Project description...",
      technologies: ["Tech 1", "Tech 2"],
      // ... other project details
    }
    // ... other projects
  ],
  // ... experience and contact info
};
```

#### Adding New Pages

1. **Create page directory**:
```bash
mkdir src/app/new-page
```

2. **Add page component** (`src/app/new-page/page.tsx`):
```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New Page - Tafara Rugara',
  description: 'Page description...',
};

export default function NewPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      {/* Your page content */}
    </main>
  );
}
```

3. **Add to navigation** (`src/components/Navigation.tsx`):
```typescript
const navigationItems = [
  // ... existing items
  { label: 'New Page', href: '/new-page' },
];
```

### Styling Customization

#### Tailwind Configuration (`tailwind.config.ts`)
Customize colors, fonts, and animations:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom color palette
        500: '#your-color',
      },
    },
    fontFamily: {
      sans: ['Your-Font', 'system-ui', 'sans-serif'],
    },
    animation: {
      'your-animation': 'yourKeyframes 2s ease-in-out infinite',
    },
  },
},
```

#### Global Styles (`src/app/globals.css`)
Add custom CSS variables and global styles:

```css
:root {
  --your-custom-property: value;
}

.your-custom-class {
  /* Custom styles */
}
```

### Component Customization

#### Creating New Components

1. **Create component file** (`src/components/YourComponent.tsx`):
```typescript
interface YourComponentProps {
  // Define props
}

export default function YourComponent({ }: YourComponentProps) {
  return (
    <div className="your-styles">
      {/* Component content */}
    </div>
  );
}
```

2. **Add tests** (`src/components/__tests__/YourComponent.test.tsx`):
```typescript
import { render, screen } from '@testing-library/react';
import YourComponent from '../YourComponent';

describe('YourComponent', () => {
  it('renders correctly', () => {
    render(<YourComponent />);
    // Add assertions
  });
});
```

#### Animation Customization

Using Framer Motion for custom animations:

```typescript
import { motion } from 'framer-motion';

const customVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export default function AnimatedComponent() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={customVariants}
    >
      {/* Content */}
    </motion.div>
  );
}
```

## 🚀 Deployment

### Quick Deployment to Netlify

1. **Prepare for deployment**:
```bash
npm run test:all          # Run complete test suite
npm run test:deployment   # Validate deployment config
```

2. **Deploy via Git** (Recommended):
   - Push to GitHub/GitLab/Bitbucket
   - Connect repository to Netlify
   - Configure build settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `.next`
     - **Node version**: `18`

3. **Manual deployment**:
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=.next
```

### Environment Configuration

Set these environment variables in Netlify dashboard:
```env
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Custom Domain Setup

1. **Add domain in Netlify**:
   - Site Settings → Domain management
   - Add custom domain

2. **Configure DNS**:
   - Point domain to Netlify's servers
   - HTTPS automatically enabled with Let's Encrypt

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## 📊 Performance & Quality

### Performance Targets
- **Lighthouse Performance**: ≥90
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1
- **Time to Interactive**: <3.5s

### Quality Metrics
- **Test Coverage**: >80% across all metrics
- **TypeScript**: Strict mode enabled
- **ESLint**: Zero warnings/errors
- **Accessibility**: WCAG 2.1 AA compliant

### Monitoring

#### Performance Monitoring
```bash
npm run lighthouse        # Full audit
npm run analyze          # Bundle analysis
```

#### Test Coverage
```bash
npm run test:coverage    # Generate coverage report
open coverage/lcov-report/index.html
```

#### Bundle Analysis
```bash
npm run analyze          # Interactive bundle analyzer
```

### Optimization Features

- **Image Optimization**: WebP/AVIF formats with responsive sizing
- **Code Splitting**: Automatic route-based and manual component splitting
- **Tree Shaking**: Unused code elimination
- **Compression**: Gzip/Brotli compression
- **Caching**: Aggressive caching for static assets
- **CDN**: Global content delivery via Netlify

## 🔧 Development Guidelines

### Code Quality Standards

#### TypeScript
- **Strict mode** enabled for maximum type safety
- **No implicit any** - all types must be explicitly defined
- **Interface over type** for object definitions
- **Consistent naming**: PascalCase for components, camelCase for functions

#### React Best Practices
- **Functional components** with hooks
- **Custom hooks** for reusable logic
- **Error boundaries** for graceful error handling
- **Memoization** for performance optimization when needed

#### Styling Guidelines
- **Tailwind CSS** for all styling (avoid custom CSS when possible)
- **Responsive design** with mobile-first approach
- **Dark theme** consistency across all components
- **Accessibility** considerations in all UI elements

#### Performance Best Practices
- **Next.js Image component** for all images
- **Lazy loading** for non-critical content
- **Code splitting** at route and component level
- **Bundle size monitoring** with webpack-bundle-analyzer

### Testing Strategy

#### Unit Tests
- **Component testing** with React Testing Library
- **Utility function testing** with Jest
- **Accessibility testing** with jest-axe
- **Coverage target**: >80% across all metrics

#### Property-Based Tests
- **Universal properties** validation with fast-check
- **100 iterations** per property test
- **Consistent seed** (42) for reproducible results
- **Requirements traceability** with validation comments

#### End-to-End Tests
- **Critical user journeys** with Playwright
- **Cross-browser testing** (Chrome, Firefox, Safari)
- **Mobile device simulation**
- **Performance validation** with Lighthouse

### Git Workflow

#### Branch Strategy
```bash
main                    # Production-ready code
├── develop            # Integration branch
├── feature/xyz        # Feature development
├── bugfix/xyz         # Bug fixes
└── hotfix/xyz         # Critical production fixes
```

#### Commit Convention
```bash
feat: add new component
fix: resolve navigation issue
docs: update README
test: add property-based tests
perf: optimize image loading
refactor: improve code structure
```

#### Pre-commit Checks
```bash
npm run lint           # ESLint validation
npm run type-check     # TypeScript validation
npm test              # Unit tests
```

## 🧪 Testing

### Test Types & Coverage

#### Unit Tests (`src/**/__tests__/*.test.tsx`)
- Component rendering and behavior
- Form validation and user interactions
- Utility function correctness
- Error boundary functionality

#### Property-Based Tests (`src/**/__tests__/*.property.test.tsx`)
- Universal properties across all inputs
- Content validation with different data sets
- Performance characteristics under various conditions
- SEO compliance across all pages

#### Integration Tests (`src/**/__tests__/*.integration.test.tsx`)
- Component interaction workflows
- API integration testing
- Form submission processes

#### End-to-End Tests (`e2e/*.spec.ts`)
- Complete user journeys
- Cross-browser compatibility
- Mobile responsiveness
- Performance validation

### Running Tests

#### Development Testing
```bash
npm run test:watch     # Unit tests in watch mode
npm run test:e2e:ui    # E2E tests with interactive UI
```

#### CI/CD Testing
```bash
npm run test:all       # Complete test suite
npm run lighthouse     # Performance audit
```

#### Coverage Reports
```bash
npm run test:coverage  # Generate coverage report
open coverage/lcov-report/index.html
```

### Test Configuration

- **Jest**: Unit and property-based testing
- **React Testing Library**: Component testing utilities
- **fast-check**: Property-based testing with 100 iterations
- **Playwright**: Cross-browser E2E testing
- **Lighthouse CI**: Automated performance auditing

## 🛠️ Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors
npm run type-check
```

#### Test Failures
```bash
# Clear Jest cache
npx jest --clearCache

# Run tests with verbose output
npm test -- --verbose

# Run specific test file
npm test -- Hero.test.tsx
```

#### Performance Issues
```bash
# Analyze bundle size
npm run analyze

# Check for large dependencies
npm run lighthouse

# Monitor runtime performance
npm run dev
# Open browser dev tools → Performance tab
```

#### Development Server Issues
```bash
# Kill processes on port 3000
npx kill-port 3000

# Start with different port
npm run dev -- -p 3001

# Clear browser cache and cookies
```

#### Deployment Issues
```bash
# Test build locally
npm run build
npm run start

# Validate deployment configuration
npm run test:deployment

# Check Netlify build logs in dashboard
```

### Getting Help

1. **Check existing documentation**:
   - [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment issues
   - [TESTING.md](./TESTING.md) - Testing problems
   - [ARCHITECTURE.md](./ARCHITECTURE.md) - Code structure questions

2. **Debug steps**:
   - Check browser console for errors
   - Review build logs for warnings
   - Validate environment variables
   - Test in incognito/private browsing mode

3. **Community resources**:
   - [Next.js Documentation](https://nextjs.org/docs)
   - [Tailwind CSS Documentation](https://tailwindcss.com/docs)
   - [Framer Motion Documentation](https://www.framer.com/motion/)
   - [Netlify Community](https://community.netlify.com)

## 📚 Documentation

This project includes comprehensive documentation to help you understand, develop, and maintain the codebase:

### Core Documentation
- **[README.md](./README.md)** - This file: Project overview, setup, and quick start guide
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Detailed code architecture, design patterns, and technical decisions
- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Development workflow, coding standards, and contribution guidelines

### Specialized Guides
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Comprehensive deployment instructions and configuration
- **[TESTING.md](./TESTING.md)** - Testing strategy, frameworks, and best practices
- **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Common issues, solutions, and debugging techniques

### Quick Navigation
- **New to the project?** Start with this README, then read [DEVELOPMENT.md](./DEVELOPMENT.md)
- **Setting up deployment?** See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Understanding the codebase?** Check [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Running into issues?** Consult [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- **Writing tests?** Reference [TESTING.md](./TESTING.md)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Tafara Rugara**
- GitHub: [@tafara-rugara](https://github.com/tafara-rugara)
- LinkedIn: [Tafara Rugara](https://linkedin.com/in/tafara-rugara)
- Email: tafara.rugara@example.com

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/tafara-rugara/portfolio/issues).

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!# Ready for deployment
