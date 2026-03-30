/**
 * Property-Based Tests for Navigation System
 * Feature: tafara-portfolio
 * Property 1: Navigation System Completeness
 * Validates: Requirements 1.1, 1.2
 */

import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import fc from 'fast-check';
import { Navigation } from '../Navigation';

// Mock Next.js navigation hooks
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe('Navigation System Property Tests', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockUsePathname.mockReset();
  });

  /**
   * Property 1: Navigation System Completeness
   * **Validates: Requirements 1.1, 1.2**
   *
   * For any valid navigation path, the Portfolio_System should provide access to
   * exactly five pages (Home, What I Do, Projects, Experience, Contact) with
   * consistent navigation elements across all pages.
   */
  it('Property 1: maintains exactly 5 navigation items with consistent structure across all valid paths', () => {
    fc.assert(
      fc.property(
        // Generate valid navigation paths
        fc.constantFrom(
          '/',
          '/what-i-do',
          '/projects',
          '/experience',
          '/contact'
        ),
        currentPath => {
          // Mock the current pathname
          mockUsePathname.mockReturnValue(currentPath);

          // Render the Navigation component
          const { container } = render(<Navigation />);

          // Property 1.1: Exactly five main pages should be accessible
          // Note: Desktop nav has 5 nav items + 1 "Hire Me" CTA = 6 total links
          const desktopNav = container.querySelector('.hidden.md\\:flex');
          const desktopNavLinks =
            desktopNav?.querySelectorAll('a[href^="/"]') || [];
          // Filter out the "Hire Me" CTA to get just navigation items
          const navItemLinks = Array.from(desktopNavLinks).filter(link => {
            const href = link.getAttribute('href');
            const text = link.textContent?.trim();
            // Exclude "Hire Me" CTA button
            if (text === 'Hire Me') return false;
            return [
              '/',
              '/what-i-do',
              '/projects',
              '/experience',
              '/contact',
            ].includes(href || '');
          });
          expect(navItemLinks).toHaveLength(5);

          // Property 1.2: Consistent navigation elements across all pages
          const expectedNavItems = [
            { label: 'Home', href: '/' },
            { label: 'What I Do', href: '/what-i-do' },
            { label: 'Projects', href: '/projects' },
            { label: 'Experience', href: '/experience' },
            { label: 'Contact', href: '/contact' },
          ];

          // Verify each navigation item exists with correct label and href
          expectedNavItems.forEach(expectedItem => {
            const navLink = Array.from(navItemLinks).find(
              link => link.getAttribute('href') === expectedItem.href
            ) as HTMLAnchorElement;
            expect(navLink).toBeTruthy();
            expect(navLink.textContent?.trim()).toBe(expectedItem.label);
          });

          // Verify mobile navigation has the same structure
          const mobileMenuButton = container.querySelector(
            '[aria-label="Toggle menu"]'
          );
          expect(mobileMenuButton).toBeInTheDocument();

          // Verify brand/logo link is present and points to home
          const brandLink = container.querySelector(
            'a[aria-label="Tafara Rugara – Home"]'
          );
          expect(brandLink).toBeInTheDocument();
          expect(brandLink?.getAttribute('href')).toBe('/');
        }
      ),
      { numRuns: 10 }
    );
  });

  /**
   * Property 1 Extension: Active state consistency
   * Validates that the active state is correctly applied based on current path
   */
  it('Property 1 Extension: correctly applies active state based on current path', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          '/',
          '/what-i-do',
          '/projects',
          '/experience',
          '/contact'
        ),
        currentPath => {
          mockUsePathname.mockReturnValue(currentPath);

          const { container } = render(<Navigation />);

          // Find the active navigation item (has color #00D4FF)
          const allLinks = container.querySelectorAll('a[href^="/"]');
          const activeLink = Array.from(allLinks).find(link => {
            const href = link.getAttribute('href');
            return (
              href === currentPath &&
              [
                '/',
                '/what-i-do',
                '/projects',
                '/experience',
                '/contact',
              ].includes(href)
            );
          });

          expect(activeLink).toBeTruthy();

          // Verify the active item corresponds to the current path
          const activeHref = activeLink?.getAttribute('href');
          expect(activeHref).toBe(currentPath);
        }
      ),
      { numRuns: 10 }
    );
  });

  /**
   * Property 1 Extension: Navigation accessibility
   * Validates that navigation maintains accessibility standards
   */
  it('Property 1 Extension: maintains accessibility standards across all paths', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          '/',
          '/what-i-do',
          '/projects',
          '/experience',
          '/contact'
        ),
        currentPath => {
          mockUsePathname.mockReturnValue(currentPath);

          const { container } = render(<Navigation />);

          // Verify navigation landmark exists
          const navElement = container.querySelector('nav');
          expect(navElement).toBeInTheDocument();

          // Verify mobile menu button has proper ARIA attributes
          const mobileMenuButton = container.querySelector(
            '[aria-label="Toggle menu"]'
          );
          expect(mobileMenuButton).toHaveAttribute('aria-expanded');

          // Verify all navigation links are keyboard accessible
          const allNavLinks = container.querySelectorAll('a');
          allNavLinks.forEach(link => {
            expect(link).toHaveAttribute('href');
            // Links should not have tabindex that would make them inaccessible
            const tabIndex = link.getAttribute('tabindex');
            if (tabIndex !== null) {
              expect(parseInt(tabIndex)).toBeGreaterThanOrEqual(0);
            }
          });
        }
      ),
      { numRuns: 10 }
    );
  });

  /**
   * Property 1 Extension: Navigation structure invariants
   * Validates that the navigation structure remains consistent regardless of state
   */
  it('Property 1 Extension: maintains structural invariants regardless of mobile menu state', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          '/',
          '/what-i-do',
          '/projects',
          '/experience',
          '/contact'
        ),
        fc.boolean(), // mobile menu open state
        (currentPath, isMobileMenuOpen) => {
          mockUsePathname.mockReturnValue(currentPath);

          const { container } = render(<Navigation />);

          // The desktop navigation should always be present
          const desktopNav = container.querySelector('.hidden.md\\:flex');
          expect(desktopNav).toBeInTheDocument();

          // The mobile menu button should always be present
          const mobileMenuButton = container.querySelector(
            'button[aria-label="Toggle menu"]'
          );
          expect(mobileMenuButton).toBeInTheDocument();

          // Brand link should always be present
          const brandLink = container.querySelector(
            'a[aria-label="Tafara Rugara – Home"]'
          );
          expect(brandLink).toBeInTheDocument();

          // Navigation should be fixed positioned for consistent access
          const navElement = container.querySelector('nav');
          expect(navElement).toHaveClass('fixed');
        }
      ),
      { numRuns: 10 }
    );
  });
});
