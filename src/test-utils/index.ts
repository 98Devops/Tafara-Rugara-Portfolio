import { render, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'
import fc from 'fast-check'

// Custom render function that includes providers if needed
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { ...options })

export * from '@testing-library/react'
export { customRender as render }

// Property-based testing utilities
export const arbitraries = {
  // Generate valid page paths
  pagePath: fc.constantFrom('/', '/what-i-do', '/projects', '/experience', '/contact'),
  
  // Generate navigation items
  navigationItem: fc.record({
    label: fc.constantFrom('Home', 'What I Do', 'Projects', 'Experience', 'Contact'),
    href: fc.constantFrom('/', '/what-i-do', '/projects', '/experience', '/contact'),
  }),
  
  // Generate contact form data
  contactFormData: fc.record({
    name: fc.string({ minLength: 1, maxLength: 100 }),
    email: fc.emailAddress(),
    message: fc.string({ minLength: 10, maxLength: 1000 }),
  }),
  
  // Generate project data
  projectData: fc.record({
    id: fc.string({ minLength: 1, maxLength: 50 }),
    title: fc.string({ minLength: 1, maxLength: 100 }),
    description: fc.string({ minLength: 10, maxLength: 500 }),
    technologies: fc.array(fc.string({ minLength: 1, maxLength: 30 }), { minLength: 1, maxLength: 10 }),
    highlights: fc.array(fc.string({ minLength: 10, maxLength: 200 }), { minLength: 1, maxLength: 5 }),
  }),
  
  // Generate capability data
  capabilityData: fc.record({
    category: fc.constantFrom(
      'Cloud Architecture',
      'DevOps & CI/CD',
      'Automation Engineering',
      'Monitoring & Reliability'
    ),
    skills: fc.array(fc.string({ minLength: 1, maxLength: 50 }), { minLength: 1, maxLength: 15 }),
    description: fc.string({ minLength: 10, maxLength: 300 }),
  }),
}

// Test helpers
export const testHelpers = {
  // Wait for animations to complete
  waitForAnimations: () => new Promise(resolve => setTimeout(resolve, 100)),
  
  // Mock window.matchMedia for responsive tests
  mockMatchMedia: (matches: boolean) => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })
  },
  
  // Create mock router with specific path
  createMockRouter: (pathname: string = '/') => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    pathname,
  }),
}

// Property test configuration
export const propertyTestConfig = {
  numRuns: 100,
  verbose: true,
  seed: 42,
}