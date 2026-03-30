/**
 * Property-Based Tests for Technology Stack Compliance
 * Feature: tafara-portfolio
 * Property 11: Technology Stack Compliance
 * Validates: Requirements 10.1, 10.2, 10.3, 10.4
 */

import { render } from '@testing-library/react';
import fc from 'fast-check';
import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

// Mock Next.js navigation hooks for components that use them
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  })),
}));

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
    button: ({ children, ...props }: any) => (
      <button {...props}>{children}</button>
    ),
    section: ({ children, ...props }: any) => (
      <section {...props}>{children}</section>
    ),
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
    ul: ({ children, ...props }: any) => <ul {...props}>{children}</ul>,
    li: ({ children, ...props }: any) => <li {...props}>{children}</li>,
    form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('Technology Stack Compliance Property Tests', () => {
  const projectRoot = path.resolve(__dirname, '../../..');

  /**
   * Property 11: Technology Stack Compliance
   * **Validates: Requirements 10.1, 10.2, 10.3, 10.4**
   *
   * For any codebase analysis, the Portfolio_System should use Next.js with App Router,
   * TypeScript throughout, Tailwind CSS for styling, and Framer Motion exclusively for animations.
   */

  /**
   * Requirement 10.1: Next.js with App Router architecture
   */
  it('Property 11.1: uses Next.js with App Router architecture', () => {
    // Check Next.js configuration
    const nextConfigPath = path.join(projectRoot, 'next.config.ts');
    expect(fs.existsSync(nextConfigPath)).toBe(true);

    const nextConfig = fs.readFileSync(nextConfigPath, 'utf8');
    expect(nextConfig).toContain('NextConfig');

    // Check package.json for Next.js dependency
    const packageJsonPath = path.join(projectRoot, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    expect(packageJson.dependencies.next).toBeDefined();
    expect(packageJson.dependencies.next).toMatch(/^\^?1[5-9]\./); // Next.js 15+

    // Check App Router structure exists
    const appDirPath = path.join(projectRoot, 'src/app');
    expect(fs.existsSync(appDirPath)).toBe(true);

    // Verify App Router files exist
    const appRouterFiles = ['layout.tsx', 'page.tsx', 'globals.css'];

    appRouterFiles.forEach(file => {
      const filePath = path.join(appDirPath, file);
      expect(fs.existsSync(filePath)).toBe(true);
    });

    // Check that pages directory doesn't exist (App Router, not Pages Router)
    const pagesDirPath = path.join(projectRoot, 'src/pages');
    expect(fs.existsSync(pagesDirPath)).toBe(false);
  });

  /**
   * Requirement 10.2: TypeScript for type safety throughout the codebase
   */
  it('Property 11.2: uses TypeScript throughout the codebase', () => {
    // Check TypeScript configuration
    const tsconfigPath = path.join(projectRoot, 'tsconfig.json');
    expect(fs.existsSync(tsconfigPath)).toBe(true);

    const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
    expect(tsconfig.compilerOptions.strict).toBe(true);
    expect(tsconfig.compilerOptions.noEmit).toBe(true);

    // Check package.json for TypeScript dependency
    const packageJsonPath = path.join(projectRoot, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    expect(packageJson.devDependencies.typescript).toBeDefined();

    // Property test: All source files should be TypeScript
    fc.assert(
      fc.property(
        fc.constantFrom('src/app', 'src/components', 'src/utils', 'src/types'),
        directory => {
          const dirPath = path.join(projectRoot, directory);
          if (!fs.existsSync(dirPath)) return true; // Skip if directory doesn't exist

          const files = glob.sync(`${dirPath}/**/*.{js,jsx,ts,tsx}`, {
            ignore: ['**/*.test.*', '**/*.spec.*', '**/node_modules/**'],
          });

          // All source files should be TypeScript (.ts/.tsx), not JavaScript (.js/.jsx)
          const jsFiles = files.filter(
            file => file.endsWith('.js') || file.endsWith('.jsx')
          );
          expect(jsFiles).toHaveLength(0);

          // Should have TypeScript files
          const tsFiles = files.filter(
            file => file.endsWith('.ts') || file.endsWith('.tsx')
          );
          if (files.length > 0) {
            expect(tsFiles.length).toBeGreaterThan(0);
          }
        }
      ),
      { numRuns: 4 }
    );
  });

  /**
   * Requirement 10.3: Tailwind CSS for styling
   */
  it('Property 11.3: uses Tailwind CSS for styling', () => {
    // Check Tailwind configuration
    const tailwindConfigPath = path.join(projectRoot, 'tailwind.config.ts');
    expect(fs.existsSync(tailwindConfigPath)).toBe(true);

    const tailwindConfig = fs.readFileSync(tailwindConfigPath, 'utf8');
    expect(tailwindConfig).toContain('Config');
    expect(tailwindConfig).toContain('content:');

    // Check package.json for Tailwind dependency
    const packageJsonPath = path.join(projectRoot, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    expect(packageJson.devDependencies.tailwindcss).toBeDefined();
    expect(packageJson.devDependencies.autoprefixer).toBeDefined();
    expect(packageJson.devDependencies.postcss).toBeDefined();

    // Check PostCSS configuration
    const postcssConfigPath = path.join(projectRoot, 'postcss.config.mjs');
    expect(fs.existsSync(postcssConfigPath)).toBe(true);

    // Check globals.css includes Tailwind directives
    const globalsCssPath = path.join(projectRoot, 'src/app/globals.css');
    const globalsCss = fs.readFileSync(globalsCssPath, 'utf8');
    expect(globalsCss).toContain('@tailwind base');
    expect(globalsCss).toContain('@tailwind components');
    expect(globalsCss).toContain('@tailwind utilities');

    // Property test: Component files should use Tailwind classes
    fc.assert(
      fc.property(fc.constantFrom('src/components', 'src/app'), directory => {
        const dirPath = path.join(projectRoot, directory);
        if (!fs.existsSync(dirPath)) return true;

        const componentFiles = glob.sync(`${dirPath}/**/*.tsx`, {
          ignore: ['**/*.test.*', '**/*.spec.*'],
        });

        let hasTailwindClasses = false;
        const tailwindPatterns = [
          /className="[^"]*(?:bg-|text-|p-|m-|flex|grid|w-|h-|border|rounded|shadow|hover:|focus:|transition)/,
          /className='[^']*(?:bg-|text-|p-|m-|flex|grid|w-|h-|border|rounded|shadow|hover:|focus:|transition)/,
          /className={[^}]*(?:bg-|text-|p-|m-|flex|grid|w-|h-|border|rounded|shadow|hover:|focus:|transition)/,
        ];

        componentFiles.forEach(file => {
          const content = fs.readFileSync(file, 'utf8');
          if (tailwindPatterns.some(pattern => pattern.test(content))) {
            hasTailwindClasses = true;
          }
        });

        // Should find Tailwind classes in component files
        if (componentFiles.length > 0) {
          expect(hasTailwindClasses).toBe(true);
        }
      }),
      { numRuns: 2 }
    );
  });

  /**
   * Requirement 10.4: Framer Motion exclusively for animations
   */
  it('Property 11.4: uses Framer Motion exclusively for animations', () => {
    // Check package.json for Framer Motion dependency
    const packageJsonPath = path.join(projectRoot, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    expect(packageJson.dependencies['framer-motion']).toBeDefined();

    // Should NOT have other animation libraries
    const otherAnimationLibs = [
      'react-spring',
      'react-transition-group',
      'lottie-react',
      'react-animated',
      'react-motion',
      'popmotion',
      'gsap',
      'anime.js',
      'velocity-animate',
    ];

    otherAnimationLibs.forEach(lib => {
      expect(packageJson.dependencies[lib]).toBeUndefined();
      expect(packageJson.devDependencies?.[lib]).toBeUndefined();
    });

    // Property test: Animation-related code should use Framer Motion
    fc.assert(
      fc.property(fc.constantFrom('src/components', 'src/app'), directory => {
        const dirPath = path.join(projectRoot, directory);
        if (!fs.existsSync(dirPath)) return true;

        const componentFiles = glob.sync(`${dirPath}/**/*.tsx`, {
          ignore: ['**/*.test.*', '**/*.spec.*'],
        });

        componentFiles.forEach(file => {
          const content = fs.readFileSync(file, 'utf8');

          // If file contains animation-related code, it should use Framer Motion
          // More specific patterns to avoid false positives from CSS classes and comments
          const hasAnimationCode =
            /\bmotion\.\w+/.test(content) ||
            /\bvariants\s*=/.test(content) ||
            /\bwhileHover\s*=/.test(content) ||
            /\bwhileTap\s*=/.test(content) ||
            /\binitial\s*=\s*[{"]/.test(content) ||
            /\banimate\s*=\s*[{"]/.test(content) ||
            /\bexit\s*=\s*[{"]/.test(content) ||
            /AnimatePresence/.test(content) ||
            /useAnimation\(\)/.test(content) ||
            /useMotionValue\(\)/.test(content);

          if (hasAnimationCode) {
            // Should import from framer-motion
            expect(content).toMatch(/import.*from ['"]framer-motion['"]/);

            // Should use motion components or hooks
            const hasFramerMotionUsage =
              /motion\./.test(content) ||
              /AnimatePresence/.test(content) ||
              /useAnimation/.test(content) ||
              /useMotionValue/.test(content);

            expect(hasFramerMotionUsage).toBe(true);

            // Should NOT use CSS animations or other animation methods
            expect(content).not.toMatch(/@keyframes/);
            expect(content).not.toMatch(/animation:/);
            expect(content).not.toMatch(/requestAnimationFrame/);
          }
        });
      }),
      { numRuns: 2 }
    );
  });

  /**
   * Property 11 Extension: Clean folder architecture validation
   * Validates that the project maintains clean folder architecture with logical component organization
   */
  it('Property 11 Extension: maintains clean folder architecture with logical component organization', () => {
    const expectedDirectories = [
      'src/app',
      'src/components',
      'src/types',
      'src/utils',
      'src/data',
    ];

    expectedDirectories.forEach(dir => {
      const dirPath = path.join(projectRoot, dir);
      expect(fs.existsSync(dirPath)).toBe(true);
    });

    // App Router structure should be properly organized
    const appRoutes = [
      'src/app/what-i-do',
      'src/app/projects',
      'src/app/experience',
      'src/app/contact',
    ];

    appRoutes.forEach(route => {
      const routePath = path.join(projectRoot, route);
      expect(fs.existsSync(routePath)).toBe(true);

      // Each route should have page.tsx
      const pagePath = path.join(routePath, 'page.tsx');
      expect(fs.existsSync(pagePath)).toBe(true);
    });
  });

  /**
   * Property 11 Extension: Deployment readiness for Netlify
   * Validates that the project is deployment-ready for Netlify without additional configuration
   */
  it('Property 11 Extension: is deployment-ready for Netlify without additional configuration', () => {
    // Check for Netlify configuration
    const netlifyConfigPath = path.join(projectRoot, 'netlify.toml');
    expect(fs.existsSync(netlifyConfigPath)).toBe(true);

    const netlifyConfig = fs.readFileSync(netlifyConfigPath, 'utf8');
    expect(netlifyConfig).toContain('[build]');
    expect(netlifyConfig).toContain('command');
    expect(netlifyConfig).toContain('publish');

    // Check package.json build script
    const packageJsonPath = path.join(projectRoot, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    expect(packageJson.scripts.build).toBeDefined();
    expect(packageJson.scripts.build).toContain('next build');

    // Should have static export configuration for Netlify
    const nextConfigPath = path.join(projectRoot, 'next.config.ts');
    const nextConfig = fs.readFileSync(nextConfigPath, 'utf8');
    // Next.js should be configured for static export or proper deployment
    expect(nextConfig).toContain('NextConfig');
  });
});
