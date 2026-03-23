/**
 * Property-Based Tests for UI Element Completeness
 * Feature: tafara-portfolio
 * Property 4: UI Element Completeness
 * Validates: Requirements 2.5
 */

import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import fc from 'fast-check';
import { Hero } from '../Hero';
import { Navigation } from '../Navigation';
import { portfolioData } from '@/data/portfolio';

// Mock Next.js navigation hooks
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, whileHover, whileTap, variants, initial, animate, transition, style, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, whileHover, whileTap, variants, initial, animate, transition, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, whileHover, whileTap, variants, initial, animate, transition, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, whileHover, whileTap, variants, initial, animate, transition, ...props }: any) => <p {...props}>{children}</p>,
    a: ({ children, whileHover, whileTap, variants, initial, animate, transition, ...props }: any) => <a {...props}>{children}</a>,
    section: ({ children, whileHover, whileTap, variants, initial, animate, transition, ...props }: any) => <section {...props}>{children}</section>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe('UI Element Completeness Property Tests', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockUsePathname.mockReset();
  });

  /**
   * Property 4: UI Element Completeness
   * **Validates: Requirements 2.5**
   * 
   * For any page requiring interactive elements, all specified buttons, links, 
   * and form fields should be present and functional (call-to-action buttons, 
   * social links, contact form, download buttons).
   */

  describe('Hero Section Call-to-Action Buttons', () => {
    it('Property 4.1: Hero section contains all required call-to-action buttons with correct functionality', () => {
      fc.assert(
        fc.property(
          // Test with different portfolio data variations to ensure robustness
          fc.constant(portfolioData.personal),
          (personalData) => {
            const { container, unmount } = render(<Hero personal={personalData} />);
            
            // Requirements 2.5: Call-to-action buttons for: View Projects, Download CV (PDF), 
            // Download Reference (PDF), GitHub, and LinkedIn
            
            // Use container queries to avoid conflicts with other rendered components
            const allButtons = container.querySelectorAll('a');
            expect(allButtons.length).toBe(5);
            
            // 1. View Projects button
            const viewProjectsBtn = container.querySelector('a[href="/projects"]');
            expect(viewProjectsBtn).toBeInTheDocument();
            expect(viewProjectsBtn?.textContent?.trim()).toBe('View Projects');
            
            // 2. Download CV button
            const downloadCVBtn = container.querySelector(`a[href="${personalData.documents.cv}"]`);
            expect(downloadCVBtn).toBeInTheDocument();
            expect(downloadCVBtn).toHaveAttribute('download');
            expect(downloadCVBtn?.textContent?.trim()).toBe('Download CV');
            
            // 3. Download Reference button
            const downloadRefBtn = container.querySelector(`a[href="${personalData.documents.reference}"]`);
            expect(downloadRefBtn).toBeInTheDocument();
            expect(downloadRefBtn).toHaveAttribute('download');
            expect(downloadRefBtn?.textContent?.trim()).toBe('Download Reference');
            
            // 4. GitHub social link
            const githubBtn = container.querySelector(`a[href="${personalData.socialLinks.github}"]`);
            expect(githubBtn).toBeInTheDocument();
            expect(githubBtn).toHaveAttribute('target', '_blank');
            expect(githubBtn).toHaveAttribute('rel', 'noopener noreferrer');
            expect(githubBtn?.textContent?.trim()).toBe('GitHub');
            
            // 5. LinkedIn social link
            const linkedinBtn = container.querySelector(`a[href="${personalData.socialLinks.linkedin}"]`);
            expect(linkedinBtn).toBeInTheDocument();
            expect(linkedinBtn).toHaveAttribute('target', '_blank');
            expect(linkedinBtn).toHaveAttribute('rel', 'noopener noreferrer');
            expect(linkedinBtn?.textContent?.trim()).toBe('LinkedIn');
            
            // Verify all buttons are clickable (have proper href attributes)
            allButtons.forEach(button => {
              expect(button).toHaveAttribute('href');
              expect(button.getAttribute('href')).toBeTruthy();
            });
            
            // Clean up to avoid conflicts
            unmount();
          }
        ),
        { numRuns: 10 }
      );
    });

    it('Property 4.2: Call-to-action buttons have proper accessibility attributes', () => {
      fc.assert(
        fc.property(
          fc.constant(portfolioData.personal),
          (personalData) => {
            const { container, unmount } = render(<Hero personal={personalData} />);
            
            // All interactive elements should be keyboard accessible
            const allLinks = container.querySelectorAll('a');
            
            allLinks.forEach(link => {
              // Should have href for keyboard navigation
              expect(link).toHaveAttribute('href');
              
              // Should not have negative tabindex that would make them inaccessible
              const tabIndex = link.getAttribute('tabindex');
              if (tabIndex !== null) {
                expect(parseInt(tabIndex)).toBeGreaterThanOrEqual(0);
              }
              
              // Should have meaningful text content
              expect(link.textContent?.trim()).toBeTruthy();
              expect(link.textContent?.trim().length).toBeGreaterThan(2);
            });
            
            // External links should have proper security attributes
            const externalLinks = container.querySelectorAll('a[target="_blank"]');
            externalLinks.forEach(link => {
              expect(link).toHaveAttribute('rel', 'noopener noreferrer');
            });
            
            // Download links should have download attribute
            const downloadLinks = container.querySelectorAll('a[download]');
            expect(downloadLinks.length).toBeGreaterThanOrEqual(2); // CV and Reference
            
            // Clean up to avoid conflicts
            unmount();
          }
        ),
        { numRuns: 10 }
      );
    });
  });

  describe('Navigation System UI Elements', () => {
    it('Property 4.3: Navigation contains all required interactive elements across all pages', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('/', '/what-i-do', '/projects', '/experience', '/contact'),
          (currentPath) => {
            mockUsePathname.mockReturnValue(currentPath);
            
            const { container, unmount } = render(<Navigation />);
            
            // Navigation should have exactly 5 main navigation links
            const desktopNavLinks = container.querySelectorAll('[class*="hidden md:flex"] a');
            expect(desktopNavLinks).toHaveLength(5);
            
            // Each navigation link should be functional
            const expectedNavItems = [
              { label: 'Home', href: '/' },
              { label: 'What I Do', href: '/what-i-do' },
              { label: 'Projects', href: '/projects' },
              { label: 'Experience', href: '/experience' },
              { label: 'Contact', href: '/contact' }
            ];
            
            expectedNavItems.forEach((expectedItem, index) => {
              const navLink = desktopNavLinks[index] as HTMLAnchorElement;
              expect(navLink.textContent?.trim()).toBe(expectedItem.label);
              expect(navLink.getAttribute('href')).toBe(expectedItem.href);
              expect(navLink).toHaveAttribute('href');
            });
            
            // Mobile menu button should be present and functional
            const mobileMenuButton = container.querySelector('[aria-label="Toggle mobile menu"]');
            expect(mobileMenuButton).toBeInTheDocument();
            expect(mobileMenuButton).toHaveAttribute('aria-expanded');
            
            // Brand/logo link should be present
            const brandLink = container.querySelector('a[href="/"]');
            expect(brandLink).toBeInTheDocument();
            expect(brandLink?.textContent).toContain('Tafara Rugara');
            
            // Clean up to avoid conflicts
            unmount();
          }
        ),
        { numRuns: 10 }
      );
    });

    it('Property 4.4: Navigation elements maintain interactive state consistency', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('/', '/what-i-do', '/projects', '/experience', '/contact'),
          (currentPath) => {
            mockUsePathname.mockReturnValue(currentPath);
            
            const { container, unmount } = render(<Navigation />);
            
            // Active state should be applied to current page
            const activeNavItem = container.querySelector('[class*="text-blue-400"]');
            expect(activeNavItem).toBeInTheDocument();
            
            const activeHref = activeNavItem?.getAttribute('href');
            expect(activeHref).toBe(currentPath);
            
            // Only one item should be active at a time
            const allActiveItems = container.querySelectorAll('[class*="text-blue-400"]');
            expect(allActiveItems).toHaveLength(1);
            
            // All navigation items should be clickable
            const allNavLinks = container.querySelectorAll('a');
            allNavLinks.forEach(link => {
              expect(link).toHaveAttribute('href');
              expect(link.getAttribute('href')).toBeTruthy();
            });
            
            // Clean up to avoid conflicts
            unmount();
          }
        ),
        { numRuns: 10 }
      );
    });
  });

  describe('Interactive Element Functionality', () => {
    it('Property 4.5: All interactive elements have proper functional attributes', () => {
      fc.assert(
        fc.property(
          fc.record({
            personalData: fc.constant(portfolioData.personal),
            currentPath: fc.constantFrom('/', '/what-i-do', '/projects', '/experience', '/contact')
          }),
          ({ personalData, currentPath }) => {
            mockUsePathname.mockReturnValue(currentPath);
            
            // Test Hero component buttons separately
            const { container: heroContainer, unmount: unmountHero } = render(<Hero personal={personalData} />);
            
            // Test Navigation component links separately
            const { container: navContainer, unmount: unmountNav } = render(<Navigation />);
            
            // Hero section should have exactly 5 call-to-action buttons
            const allHeroLinks = heroContainer.querySelectorAll('a');
            expect(allHeroLinks).toHaveLength(5);
            
            // Navigation should have at least 6 links (5 nav + 1 brand)
            const allNavLinks = navContainer.querySelectorAll('a');
            expect(allNavLinks.length).toBeGreaterThanOrEqual(6);
            
            // All links should have valid href attributes
            [...allHeroLinks, ...allNavLinks].forEach(link => {
              const href = link.getAttribute('href');
              expect(href).toBeTruthy();
              expect(href).not.toBe('#');
              expect(href).not.toBe('');
              
              // Should have meaningful text content
              expect(link.textContent?.trim()).toBeTruthy();
            });
            
            // Download links should have download attribute
            const downloadLinks = heroContainer.querySelectorAll('a[download]');
            expect(downloadLinks).toHaveLength(2); // CV and Reference
            
            // External links should have proper target and rel attributes
            const externalLinks = heroContainer.querySelectorAll('a[target="_blank"]');
            expect(externalLinks).toHaveLength(2); // GitHub and LinkedIn
            
            externalLinks.forEach(link => {
              expect(link).toHaveAttribute('rel', 'noopener noreferrer');
            });
            
            // Clean up to avoid conflicts
            unmountHero();
            unmountNav();
          }
        ),
        { numRuns: 10 }
      );
    });

    it('Property 4.6: Interactive elements maintain consistent styling and behavior patterns', () => {
      fc.assert(
        fc.property(
          fc.constant(portfolioData.personal),
          (personalData) => {
            const { container, unmount } = render(<Hero personal={personalData} />);
            
            // All call-to-action buttons should have consistent styling classes
            const allButtons = container.querySelectorAll('a');
            
            allButtons.forEach(button => {
              // Should have padding classes for proper touch targets
              const className = button.className;
              expect(className).toMatch(/px-\d+/); // horizontal padding
              expect(className).toMatch(/py-\d+/); // vertical padding
              
              // Should have transition classes for smooth interactions
              expect(className).toMatch(/transition/);
              
              // Should have proper color classes
              expect(className).toMatch(/(bg-|border-|text-)/);
            });
            
            // Primary action button (View Projects) should have distinct styling
            const primaryButton = container.querySelector('a[href="/projects"]');
            // Accept either a solid blue background or a gradient branding class
            expect(primaryButton?.className).toMatch(/bg-blue-600|bg-gradient-to-r/);
            
            // Secondary buttons should have border styling
            const secondaryButtons = container.querySelectorAll('a[class*="border"]');
            expect(secondaryButtons.length).toBeGreaterThanOrEqual(4); // CV, Reference, GitHub, LinkedIn
            
            // Clean up to avoid conflicts
            unmount();
          }
        ),
        { numRuns: 10 }
      );
    });
  });

  describe('Cross-Page UI Element Consistency', () => {
    it('Property 4.7: UI elements maintain consistency across different page contexts', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('/', '/what-i-do', '/projects', '/experience', '/contact'),
          (currentPath) => {
            mockUsePathname.mockReturnValue(currentPath);
            
            // Navigation should be consistent across all pages
            const { container, unmount } = render(<Navigation />);
            
            // Should always have the same number of navigation items
            const desktopNavLinks = container.querySelectorAll('[class*="hidden md:flex"] a');
            expect(desktopNavLinks).toHaveLength(5);
            
            // Should always have mobile menu button
            const mobileMenuButton = container.querySelector('[aria-label="Toggle mobile menu"]');
            expect(mobileMenuButton).toBeInTheDocument();
            
            // Should always have brand link
            const brandLink = container.querySelector('a[href="/"]');
            expect(brandLink).toBeInTheDocument();
            
            // Navigation structure should be identical regardless of current page
            const navStructure = Array.from(desktopNavLinks).map(link => ({
              text: link.textContent?.trim(),
              href: link.getAttribute('href')
            }));
            
            const expectedStructure = [
              { text: 'Home', href: '/' },
              { text: 'What I Do', href: '/what-i-do' },
              { text: 'Projects', href: '/projects' },
              { text: 'Experience', href: '/experience' },
              { text: 'Contact', href: '/contact' }
            ];
            
            expect(navStructure).toEqual(expectedStructure);
            
            // Clean up to avoid conflicts
            unmount();
          }
        ),
        { numRuns: 10 }
      );
    });
  });

  describe('UI Element Completeness Validation', () => {
    it('Property 4.8: All required UI elements from Requirements 2.5 are present and functional', () => {
      fc.assert(
        fc.property(
          fc.record({
            personalData: fc.constant(portfolioData.personal),
            currentPath: fc.constantFrom('/', '/what-i-do', '/projects', '/experience', '/contact')
          }),
          ({ personalData, currentPath }) => {
            mockUsePathname.mockReturnValue(currentPath);
            
            // Render Hero component to test call-to-action buttons
            const { container: heroContainer, unmount: unmountHero } = render(<Hero personal={personalData} />);
            
            // Render Navigation component to test navigation links
            const { container: navContainer, unmount: unmountNav } = render(<Navigation />);
            
            // Requirements 2.5 checklist:
            
            // 1. Call-to-action buttons for: View Projects
            const viewProjectsBtn = heroContainer.querySelector('a[href="/projects"]');
            expect(viewProjectsBtn).toBeInTheDocument();
            expect(viewProjectsBtn?.textContent?.trim()).toBe('View Projects');
            
            // 2. Download CV (PDF)
            const cvLink = heroContainer.querySelector(`a[href="${personalData.documents.cv}"]`);
            expect(cvLink).toBeInTheDocument();
            expect(cvLink).toHaveAttribute('download');
            expect(cvLink?.getAttribute('href')).toMatch(/\.pdf$/);
            expect(cvLink?.textContent?.trim()).toBe('Download CV');
            
            // 3. Download Reference (PDF)
            const refLink = heroContainer.querySelector(`a[href="${personalData.documents.reference}"]`);
            expect(refLink).toBeInTheDocument();
            expect(refLink).toHaveAttribute('download');
            expect(refLink?.getAttribute('href')).toMatch(/\.pdf$/);
            expect(refLink?.textContent?.trim()).toBe('Download Reference');
            
            // 4. GitHub social link
            const githubLink = heroContainer.querySelector(`a[href="${personalData.socialLinks.github}"]`);
            expect(githubLink).toBeInTheDocument();
            expect(githubLink).toHaveAttribute('target', '_blank');
            expect(githubLink?.getAttribute('href')).toMatch(/github\.com/);
            expect(githubLink?.textContent?.trim()).toBe('GitHub');
            
            // 5. LinkedIn social link
            const linkedinLink = heroContainer.querySelector(`a[href="${personalData.socialLinks.linkedin}"]`);
            expect(linkedinLink).toBeInTheDocument();
            expect(linkedinLink).toHaveAttribute('target', '_blank');
            expect(linkedinLink?.getAttribute('href')).toMatch(/linkedin\.com/);
            expect(linkedinLink?.textContent?.trim()).toBe('LinkedIn');
            
            // Navigation links (consistent across all pages)
            const navLinks = navContainer.querySelectorAll('a');
            expect(navLinks.length).toBeGreaterThanOrEqual(6); // 5 nav + 1 brand minimum
            
            // All interactive elements should be keyboard accessible
            const allInteractiveElements = [
              ...heroContainer.querySelectorAll('a'),
              ...navContainer.querySelectorAll('a')
            ];
            
            allInteractiveElements.forEach(element => {
              // Should be focusable
              const tabIndex = element.getAttribute('tabindex');
              if (tabIndex !== null) {
                expect(parseInt(tabIndex)).toBeGreaterThanOrEqual(0);
              }
              
              // Should have meaningful content (only check links, not buttons)
              if (element.tagName === 'A') {
                expect(element.textContent?.trim()).toBeTruthy();
                expect(element.textContent?.trim().length).toBeGreaterThan(0);
              }
            });
            
            // Clean up to avoid conflicts
            unmountHero();
            unmountNav();
          }
        ),
        { numRuns: 10 }
      );
    });
  });
});
