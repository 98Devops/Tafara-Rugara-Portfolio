# Development Workflow Guide

This guide outlines the development workflow, coding standards, and best practices for contributing to the Tafara Portfolio website.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Git Workflow](#git-workflow)
- [Testing Workflow](#testing-workflow)
- [Code Review Process](#code-review-process)
- [Release Process](#release-process)
- [Maintenance Guidelines](#maintenance-guidelines)

## Getting Started

### Initial Setup

1. **Clone and setup**:
```bash
git clone https://github.com/tafara-rugara/portfolio.git
cd tafara-portfolio
npm install
```

2. **Environment configuration**:
```bash
# Copy environment template
cp .env.example .env.local

# Edit environment variables
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
```

3. **Verify setup**:
```bash
npm run dev          # Start development server
npm run test         # Run tests
npm run lint         # Check code quality
```

### Development Environment

**Required Tools**:
- Node.js 18+ (LTS recommended)
- npm or yarn
- Git
- VS Code (recommended) with extensions:
  - TypeScript and JavaScript Language Features
  - Tailwind CSS IntelliSense
  - ESLint
  - Prettier
  - Jest Runner

**Optional Tools**:
- React Developer Tools (browser extension)
- Lighthouse (browser extension)
- Git GUI client (GitKraken, SourceTree, etc.)

## Development Workflow

### Daily Development Process

1. **Start development session**:
```bash
# Pull latest changes
git pull origin main

# Start development server
npm run dev

# In separate terminal, run tests in watch mode
npm run test:watch
```

2. **Make changes**:
   - Edit code in your preferred editor
   - Follow coding standards (see below)
   - Write tests for new functionality
   - Update documentation as needed

3. **Validate changes**:
```bash
npm run lint:fix      # Fix linting issues
npm run type-check    # Verify TypeScript
npm run test          # Run all tests
npm run build         # Test production build
```

4. **Commit changes**:
```bash
git add .
git commit -m "feat: add new component"
git push origin feature-branch
```

### Feature Development Workflow

1. **Create feature branch**:
```bash
git checkout -b feature/component-name
```

2. **Implement feature**:
   - Write component code
   - Add unit tests
   - Add property-based tests (if applicable)
   - Update documentation
   - Add E2E tests (if needed)

3. **Test thoroughly**:
```bash
npm run test:all      # Complete test suite
npm run lighthouse    # Performance audit
```

4. **Create pull request**:
   - Push branch to remote
   - Create PR with detailed description
   - Request code review

### Bug Fix Workflow

1. **Create bug fix branch**:
```bash
git checkout -b bugfix/issue-description
```

2. **Reproduce bug**:
   - Write failing test that demonstrates the bug
   - Understand root cause

3. **Fix bug**:
   - Implement minimal fix
   - Ensure test passes
   - Verify no regression

4. **Validate fix**:
```bash
npm run test:all
npm run test:e2e
```

## Coding Standards

### TypeScript Guidelines

#### Type Safety
```typescript
// ✅ Always use explicit types for function parameters
function processProject(project: Project): ProcessedProject {
  return {
    id: project.id,
    title: project.title.toUpperCase(),
    // ...
  };
}

// ❌ Avoid implicit any
function processProject(project) {
  return project;
}
```

#### Interface Design
```typescript
// ✅ Use interfaces for object shapes
interface ProjectCardProps {
  project: Project;
  className?: string;
  onProjectClick?: (project: Project) => void;
}

// ✅ Extend interfaces when appropriate
interface ExtendedProjectCardProps extends ProjectCardProps {
  showDescription: boolean;
}

// ❌ Avoid inline types for complex objects
function ProjectCard(props: {
  project: { id: string; title: string; description: string };
  className?: string;
}) {
  // ...
}
```

#### Naming Conventions
```typescript
// ✅ PascalCase for components and interfaces
interface ProjectData { }
function ProjectCard() { }

// ✅ camelCase for variables and functions
const projectData = getProjectData();
const handleProjectClick = () => { };

// ✅ UPPER_SNAKE_CASE for constants
const MAX_PROJECTS_PER_PAGE = 10;
const API_ENDPOINTS = {
  PROJECTS: '/api/projects',
} as const;
```

### React Component Guidelines

#### Component Structure
```typescript
// ✅ Recommended component structure
interface ComponentProps {
  // Props interface
}

export default function Component({ prop1, prop2 }: ComponentProps) {
  // 1. Hooks
  const [state, setState] = useState();
  const customHook = useCustomHook();
  
  // 2. Event handlers
  const handleClick = useCallback(() => {
    // Handler logic
  }, [dependencies]);
  
  // 3. Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);
  
  // 4. Render helpers (if needed)
  const renderContent = () => {
    // Complex render logic
  };
  
  // 5. Return JSX
  return (
    <div className="component-styles">
      {/* JSX content */}
    </div>
  );
}
```

#### Performance Optimization
```typescript
// ✅ Use React.memo for expensive components
const ExpensiveComponent = React.memo(({ data }: Props) => {
  return <div>{/* Expensive rendering */}</div>;
});

// ✅ Use useMemo for expensive calculations
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);

// ✅ Use useCallback for event handlers passed to children
const handleClick = useCallback((id: string) => {
  onItemClick(id);
}, [onItemClick]);
```

#### Error Handling
```typescript
// ✅ Use error boundaries for component errors
function ComponentWithErrorBoundary() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <RiskyComponent />
    </ErrorBoundary>
  );
}

// ✅ Handle async errors gracefully
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  fetchData()
    .then(setData)
    .catch(error => {
      setError(error.message);
      console.error('Failed to fetch data:', error);
    });
}, []);
```

### Styling Guidelines

#### Tailwind CSS Best Practices
```typescript
// ✅ Use semantic class grouping
<div className="
  flex items-center justify-between
  p-4 mb-6
  bg-gray-900 text-white
  rounded-lg shadow-lg
  hover:bg-gray-800 transition-colors
">

// ✅ Extract complex styles to components
const cardStyles = "flex items-center justify-between p-4 mb-6 bg-gray-900 text-white rounded-lg shadow-lg hover:bg-gray-800 transition-colors";

// ✅ Use responsive design utilities
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

#### Animation Guidelines
```typescript
// ✅ Use consistent animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

// ✅ Optimize for performance (transform and opacity only)
const performantAnimation = {
  initial: { opacity: 0, transform: 'translateY(20px)' },
  animate: { opacity: 1, transform: 'translateY(0)' },
};

// ❌ Avoid animating layout properties
const badAnimation = {
  initial: { height: 0, width: 0 },
  animate: { height: 'auto', width: 'auto' },
};
```

### File Organization

#### Directory Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── (routes)/          # Route groups
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── __tests__/         # Component tests
│   ├── ui/               # Basic UI components
│   └── features/         # Feature-specific components
├── data/                 # Static data and content
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

#### File Naming
```
// ✅ Component files - PascalCase
ProjectCard.tsx
NavigationMenu.tsx

// ✅ Utility files - camelCase
formatDate.ts
apiHelpers.ts

// ✅ Test files - match source file name
ProjectCard.test.tsx
ProjectCard.property.test.tsx

// ✅ Type files - camelCase
projectTypes.ts
apiTypes.ts
```

## Git Workflow

### Branch Strategy

```
main                    # Production-ready code
├── develop            # Integration branch (optional)
├── feature/xyz        # Feature development
├── bugfix/xyz         # Bug fixes
├── hotfix/xyz         # Critical production fixes
└── release/x.y.z      # Release preparation
```

### Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Format: type(scope): description
feat(components): add project card component
fix(navigation): resolve mobile menu toggle issue
docs(readme): update installation instructions
test(hero): add property-based tests
perf(images): optimize image loading
refactor(utils): improve date formatting function
style(components): fix linting issues
chore(deps): update dependencies
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `perf`: Performance improvements
- `chore`: Maintenance tasks

### Pre-commit Workflow

1. **Automated checks** (via git hooks):
```bash
npm run lint           # ESLint validation
npm run type-check     # TypeScript validation
npm run test           # Unit tests
npm run format:check   # Code formatting
```

2. **Manual checks**:
```bash
npm run build          # Verify build works
npm run test:e2e       # E2E tests (optional)
```

### Pull Request Guidelines

#### PR Title and Description
```markdown
# Title: type(scope): brief description

## Description
Brief description of changes and motivation.

## Changes
- [ ] Added new component
- [ ] Updated tests
- [ ] Updated documentation

## Testing
- [ ] Unit tests pass
- [ ] E2E tests pass
- [ ] Manual testing completed

## Screenshots (if applicable)
[Add screenshots for UI changes]

## Breaking Changes
[List any breaking changes]
```

#### PR Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No console errors/warnings
- [ ] Accessibility considerations addressed
- [ ] Performance impact considered

## Testing Workflow

### Test-Driven Development (TDD)

1. **Write failing test**:
```typescript
// ProjectCard.test.tsx
describe('ProjectCard', () => {
  it('displays project title and description', () => {
    const project = { title: 'Test Project', description: 'Test Description' };
    render(<ProjectCard project={project} />);
    
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });
});
```

2. **Implement minimal code to pass**:
```typescript
// ProjectCard.tsx
export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
    </div>
  );
}
```

3. **Refactor and improve**:
```typescript
// ProjectCard.tsx - Enhanced version
export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors"
      variants={fadeInUp}
    >
      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
      <p className="text-gray-300">{project.description}</p>
    </motion.div>
  );
}
```

### Testing Strategy

#### Unit Tests
```typescript
// Test component behavior
describe('ContactForm', () => {
  it('validates required fields', async () => {
    render(<ContactForm />);
    
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
  });
});
```

#### Property-Based Tests
```typescript
// Test universal properties
describe('Navigation Properties', () => {
  it('maintains consistent structure across all pages', () => {
    fc.assert(fc.property(
      fc.constantFrom('/', '/projects', '/contact'),
      (path) => {
        render(<Navigation currentPath={path} />);
        const navItems = screen.getAllByRole('link');
        expect(navItems).toHaveLength(5);
      }
    ), { numRuns: 100 });
  });
});
```

#### Integration Tests
```typescript
// Test component interactions
describe('Project Portfolio Integration', () => {
  it('filters projects by technology', async () => {
    render(<ProjectsPage />);
    
    fireEvent.click(screen.getByText('React'));
    
    await waitFor(() => {
      const projectCards = screen.getAllByTestId('project-card');
      projectCards.forEach(card => {
        expect(card).toHaveTextContent('React');
      });
    });
  });
});
```

#### E2E Tests
```typescript
// Test complete user workflows
test('user can navigate and submit contact form', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Contact');
  
  await page.fill('[name="name"]', 'John Doe');
  await page.fill('[name="email"]', 'john@example.com');
  await page.fill('[name="message"]', 'Hello, this is a test message.');
  
  await page.click('button[type="submit"]');
  
  await expect(page.locator('text=Thank you')).toBeVisible();
});
```

## Code Review Process

### Review Checklist

#### Functionality
- [ ] Code works as intended
- [ ] Edge cases handled
- [ ] Error handling implemented
- [ ] Performance considerations addressed

#### Code Quality
- [ ] Follows coding standards
- [ ] No code duplication
- [ ] Clear and descriptive naming
- [ ] Appropriate comments/documentation

#### Testing
- [ ] Adequate test coverage
- [ ] Tests are meaningful
- [ ] Property-based tests for universal properties
- [ ] E2E tests for critical workflows

#### Security
- [ ] No sensitive data exposed
- [ ] Input validation implemented
- [ ] XSS prevention considered
- [ ] CSRF protection in place

### Review Guidelines

#### For Reviewers
1. **Be constructive**: Provide specific, actionable feedback
2. **Explain reasoning**: Help the author understand the "why"
3. **Suggest alternatives**: Offer better solutions when possible
4. **Acknowledge good work**: Highlight positive aspects

#### For Authors
1. **Respond to feedback**: Address all comments
2. **Ask questions**: Clarify unclear feedback
3. **Make requested changes**: Or explain why you disagree
4. **Test changes**: Ensure fixes don't break anything

### Review Process
1. **Self-review**: Author reviews their own PR first
2. **Automated checks**: CI/CD pipeline runs tests
3. **Peer review**: Team members review code
4. **Address feedback**: Author makes necessary changes
5. **Final approval**: Reviewer approves changes
6. **Merge**: PR is merged to target branch

## Release Process

### Version Management

Follow [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Workflow

1. **Prepare release**:
```bash
# Create release branch
git checkout -b release/1.2.0

# Update version
npm version minor

# Update CHANGELOG.md
# Update documentation
```

2. **Test release**:
```bash
npm run test:all
npm run build
npm run lighthouse
```

3. **Create release**:
```bash
# Merge to main
git checkout main
git merge release/1.2.0

# Tag release
git tag v1.2.0
git push origin main --tags
```

4. **Deploy**:
   - Netlify automatically deploys from main branch
   - Monitor deployment for issues
   - Verify production functionality

### Hotfix Process

For critical production issues:

1. **Create hotfix branch** from main:
```bash
git checkout -b hotfix/critical-fix main
```

2. **Implement fix** and test thoroughly

3. **Deploy hotfix**:
```bash
git checkout main
git merge hotfix/critical-fix
git tag v1.2.1
git push origin main --tags
```

## Maintenance Guidelines

### Regular Maintenance Tasks

#### Weekly
- [ ] Review and update dependencies
- [ ] Check for security vulnerabilities
- [ ] Monitor performance metrics
- [ ] Review error logs

#### Monthly
- [ ] Update documentation
- [ ] Review and clean up code
- [ ] Optimize bundle size
- [ ] Update browser compatibility

#### Quarterly
- [ ] Major dependency updates
- [ ] Performance audit and optimization
- [ ] Security audit
- [ ] Accessibility audit

### Dependency Management

```bash
# Check for outdated packages
npm outdated

# Update dependencies
npm update

# Check for security vulnerabilities
npm audit
npm audit fix

# Update major versions carefully
npm install package@latest
```

### Performance Monitoring

```bash
# Regular performance checks
npm run lighthouse
npm run analyze

# Monitor bundle size
npm run build -- --analyze
```

### Documentation Maintenance

- Keep README.md up to date
- Update API documentation
- Maintain troubleshooting guide
- Update architecture documentation

This development workflow ensures consistent, high-quality code while maintaining excellent performance and user experience. Follow these guidelines to contribute effectively to the project.