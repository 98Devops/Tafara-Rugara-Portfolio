# Testing Guide

This document outlines the comprehensive testing strategy for the Tafara Portfolio website, including unit tests, property-based tests, end-to-end tests, and performance auditing.

## Testing Framework Overview

### Core Technologies
- **Jest**: Primary testing framework for unit and property-based tests
- **React Testing Library**: Component testing utilities
- **fast-check**: Property-based testing library
- **Playwright**: End-to-end testing across multiple browsers
- **Lighthouse CI**: Automated performance and SEO auditing

## Test Types

### 1. Unit Tests
Unit tests validate specific component behavior and functionality.

**Location**: `src/**/__tests__/*.test.tsx`

**Run Command**:
```bash
npm test                    # Run all unit tests
npm run test:watch         # Run tests in watch mode
npm run test:coverage      # Run tests with coverage report
```

**Example**:
```typescript
describe('Hero Component', () => {
  it('displays correct professional information', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Tafara Rugara');
  });
});
```

### 2. Property-Based Tests
Property-based tests validate universal properties that should hold across all inputs.

**Location**: `src/**/__tests__/*.property.test.tsx`

**Configuration**: 100 iterations per property test with consistent seed (42)

**Example**:
```typescript
describe('Navigation System Properties', () => {
  it('maintains consistent navigation across all pages', () => {
    fc.assert(fc.property(
      fc.constantFrom('/', '/what-i-do', '/projects', '/experience', '/contact'),
      (path) => {
        const { container } = render(<App initialPath={path} />);
        const navItems = container.querySelectorAll('nav a');
        expect(navItems).toHaveLength(5);
      }
    ), { numRuns: 100 });
  });
});
```

### 3. End-to-End Tests
E2E tests validate complete user workflows across different browsers and devices.

**Location**: `e2e/*.spec.ts`

**Run Commands**:
```bash
npm run test:e2e           # Run E2E tests headless
npm run test:e2e:ui        # Run E2E tests with UI
npm run test:e2e:headed    # Run E2E tests in headed mode
```

**Browser Coverage**:
- Desktop: Chrome, Firefox, Safari
- Mobile: Chrome Mobile, Safari Mobile

**Test Categories**:
- Navigation functionality
- Contact form validation
- Document downloads
- Performance and accessibility
- Cross-browser compatibility

### 4. Performance Auditing
Lighthouse CI provides automated performance, accessibility, SEO, and best practices auditing.

**Configuration**: `lighthouserc.js`

**Run Commands**:
```bash
npm run lighthouse         # Full Lighthouse audit
npm run lighthouse:collect # Collect metrics only
```

**Quality Gates**:
- Performance: ≥90
- Accessibility: ≥90
- Best Practices: ≥90
- SEO: ≥90

## Test Utilities

### Custom Render Function
```typescript
import { render } from '@/test-utils';

// Includes providers and common setup
render(<Component />);
```

### Property-Based Test Arbitraries
```typescript
import { arbitraries } from '@/test-utils';

// Pre-configured generators for common data types
fc.property(arbitraries.pagePath, (path) => { /* test */ });
fc.property(arbitraries.contactFormData, (data) => { /* test */ });
fc.property(arbitraries.projectData, (project) => { /* test */ });
```

### Test Helpers
```typescript
import { testHelpers } from '@/test-utils';

// Mock responsive behavior
testHelpers.mockMatchMedia(true);

// Wait for animations
await testHelpers.waitForAnimations();
```

## Configuration Files

### Jest Configuration (`jest.config.js`)
- Next.js integration with `next/jest`
- TypeScript support
- Module path mapping (`@/` → `src/`)
- Coverage thresholds (80% across all metrics)
- Extended timeout for property-based tests

### Jest Setup (`jest.setup.js`)
- Testing Library DOM matchers
- fast-check global configuration
- Next.js router mocking
- Framer Motion mocking
- Global test utilities (ResizeObserver, IntersectionObserver)

### Playwright Configuration (`playwright.config.ts`)
- Multi-browser testing
- Mobile device simulation
- Automatic dev server startup
- Trace collection on failures
- HTML reporting

### Lighthouse Configuration (`lighthouserc.js`)
- Multi-page auditing
- Performance thresholds
- Automated server management
- Temporary result storage

## Running Tests

### Development Workflow
```bash
# Start development server
npm run dev

# Run unit tests in watch mode (separate terminal)
npm run test:watch

# Run E2E tests during development
npm run test:e2e:ui
```

### CI/CD Pipeline
```bash
# Full test suite (as run in CI)
npm run test:all

# Individual test types
npm test                   # Unit tests
npm run test:e2e          # E2E tests
npm run lighthouse        # Performance audit
```

### Pre-commit Checks
```bash
npm run lint              # Code linting
npm run type-check        # TypeScript validation
npm test                  # Unit tests
```

## Test Organization

### File Naming Conventions
- Unit tests: `*.test.tsx`
- Property-based tests: `*.property.test.tsx`
- Integration tests: `*.integration.test.tsx`
- E2E tests: `*.spec.ts`

### Test Structure
```
src/
├── components/
│   ├── __tests__/
│   │   ├── Component.test.tsx
│   │   └── Component.property.test.tsx
│   └── Component.tsx
├── test-utils/
│   └── index.ts
└── __tests__/
    └── setup.test.ts

e2e/
├── navigation.spec.ts
├── contact-form.spec.ts
├── document-download.spec.ts
└── performance.spec.ts
```

## Debugging Tests

### Jest Debugging
```bash
# Run specific test file
npm test -- Hero.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="navigation"

# Debug mode
npm test -- --detectOpenHandles --forceExit
```

### Playwright Debugging
```bash
# Debug mode with browser
npx playwright test --debug

# Headed mode
npx playwright test --headed

# Specific browser
npx playwright test --project=chromium
```

### Property-Based Test Debugging
```typescript
// Add verbose logging
fc.assert(fc.property(/* ... */), { 
  verbose: true,
  seed: 42  // Reproduce specific failure
});
```

## Coverage Reports

Coverage reports are generated in the `coverage/` directory:
- `coverage/lcov-report/index.html` - HTML coverage report
- `coverage/lcov.info` - LCOV format for CI integration

**Viewing Coverage**:
```bash
npm run test:coverage
open coverage/lcov-report/index.html
```

## Continuous Integration

The testing pipeline runs on every push and pull request:

1. **Unit Tests**: Jest with coverage reporting
2. **E2E Tests**: Playwright across multiple browsers
3. **Performance Audit**: Lighthouse CI with quality gates
4. **Deployment**: Automated deployment on successful tests

**GitHub Actions Workflow**: `.github/workflows/ci.yml`

## Best Practices

### Writing Tests
1. **Descriptive Names**: Test names should clearly describe what is being tested
2. **Arrange-Act-Assert**: Structure tests with clear setup, execution, and verification
3. **Minimal Mocking**: Prefer real implementations over mocks when possible
4. **Property Focus**: Property-based tests should validate universal properties
5. **Accessibility**: Include accessibility checks in component tests

### Performance
1. **Parallel Execution**: Tests run in parallel for faster feedback
2. **Selective Testing**: Use test patterns to run specific subsets during development
3. **Resource Cleanup**: Ensure tests clean up resources and don't leak memory
4. **Timeout Management**: Set appropriate timeouts for different test types

### Maintenance
1. **Regular Updates**: Keep testing dependencies up to date
2. **Coverage Monitoring**: Maintain high test coverage without obsessing over 100%
3. **Flaky Test Management**: Address flaky tests promptly
4. **Documentation**: Keep this guide updated with testing changes

## Troubleshooting

### Common Issues

**Jest Module Resolution**:
```bash
# Clear Jest cache
npx jest --clearCache
```

**Playwright Browser Issues**:
```bash
# Reinstall browsers
npx playwright install
```

**Lighthouse CI Failures**:
```bash
# Check server startup
npm run build && npm run start
```

**Property Test Failures**:
- Check the seed value for reproducible failures
- Verify generators produce valid test data
- Ensure properties are truly universal

For additional help, refer to the individual tool documentation or create an issue in the project repository.