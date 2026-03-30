import '@testing-library/jest-dom';

// Configure fast-check for property-based testing
import fc from 'fast-check';

// Set global configuration for fast-check
fc.configureGlobal({
  numRuns: 100, // Run each property test 100 times
  verbose: true,
  seed: 42, // Use consistent seed for reproducible tests
});

// Mock Next.js router for testing
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock Framer Motion for testing
jest.mock('framer-motion', () => {
  const React = require('react');

  const createMock =
    tag =>
    ({ children, ...props }) =>
      React.createElement(tag, props, children);

  const motion = {
    div: createMock('div'),
    section: createMock('section'),
    h1: createMock('h1'),
    h2: createMock('h2'),
    p: createMock('p'),
    button: createMock('button'),
    a: createMock('a'),
    nav: createMock('nav'),
    ul: createMock('ul'),
    li: createMock('li'),
    span: createMock('span'),
  };

  return {
    motion,
    AnimatePresence: ({ children }) =>
      React.createElement(React.Fragment, null, children),
    useAnimation: () => ({
      start: jest.fn(),
      stop: jest.fn(),
      set: jest.fn(),
    }),
    useInView: () => true,
  };
});

// Global test utilities
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
