/**
 * Property-Based Tests for Lighthouse Performance Standards
 * Feature: tafara-portfolio
 * Property 10: Lighthouse Performance Standards
 * Validates: Requirements 8.4
 */

import { test, expect, chromium } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';
import fc from 'fast-check';

/**
 * Property 10: Lighthouse Performance Standards
 * **Validates: Requirements 8.4**
 * 
 * For any Lighthouse audit, the Portfolio_System should achieve scores of 90 or higher 
 * across Performance, Accessibility, Best Practices, and SEO categories.
 */

// Define all pages to test
const pages = [
  { name: 'Home', url: 'http://localhost:3000/' },
  { name: 'What I Do', url: 'http://localhost:3000/what-i-do' },
  { name: 'Projects', url: 'http://localhost:3000/projects' },
  { name: 'Experience', url: 'http://localhost:3000/experience' },
  { name: 'Contact', url: 'http://localhost:3000/contact' },
];

// Lighthouse thresholds (90 = 0.9 score)
const LIGHTHOUSE_THRESHOLDS = {
  performance: 90,
  accessibility: 90,
  'best-practices': 90,
  seo: 90,
};

test.describe('Lighthouse Performance Standards Property Tests', () => {
  /**
   * Property 10: All pages achieve Lighthouse scores of 90+ across all categories
   * This property validates that performance standards are maintained across all pages
   */
  test('Property 10: achieves Lighthouse scores of 90+ across Performance, Accessibility, Best Practices, and SEO for all pages', async () => {
    // Use fast-check to generate test scenarios for each page
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom(...pages),
        async (pageInfo) => {
          // Launch browser with remote debugging
          const browser = await chromium.launch({
            args: ['--remote-debugging-port=9222'],
          });
          
          const page = await browser.newPage();

          try {
            // Navigate to the page
            await page.goto(pageInfo.url, { waitUntil: 'networkidle' });

            // Run Lighthouse audit
            const audit = await playAudit({
              page,
              thresholds: LIGHTHOUSE_THRESHOLDS,
              port: 9222,
            });

            // Extract scores
            const scores = {
              performance: Math.round(audit.lhr.categories.performance.score * 100),
              accessibility: Math.round(audit.lhr.categories.accessibility.score * 100),
              bestPractices: Math.round(audit.lhr.categories['best-practices'].score * 100),
              seo: Math.round(audit.lhr.categories.seo.score * 100),
            };

            // Log scores for debugging
            console.log(`\n${pageInfo.name} page Lighthouse scores:`);
            console.log(`  Performance: ${scores.performance}`);
            console.log(`  Accessibility: ${scores.accessibility}`);
            console.log(`  Best Practices: ${scores.bestPractices}`);
            console.log(`  SEO: ${scores.seo}`);

            // Validate all scores meet the 90+ threshold
            expect(scores.performance).toBeGreaterThanOrEqual(LIGHTHOUSE_THRESHOLDS.performance);
            expect(scores.accessibility).toBeGreaterThanOrEqual(LIGHTHOUSE_THRESHOLDS.accessibility);
            expect(scores.bestPractices).toBeGreaterThanOrEqual(LIGHTHOUSE_THRESHOLDS['best-practices']);
            expect(scores.seo).toBeGreaterThanOrEqual(LIGHTHOUSE_THRESHOLDS.seo);

            return true;
          } finally {
            await page.close();
            await browser.close();
          }
        }
      ),
      { numRuns: 20 } // Run 20 times as specified in task details (4 runs per page)
    );
  });

  /**
   * Property 10 Extension: Core Web Vitals validation
   * Validates that Core Web Vitals meet performance standards
   */
  test('Property 10 Extension: meets Core Web Vitals standards for all pages', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom(...pages),
        async (pageInfo) => {
          const browser = await chromium.launch({
            args: ['--remote-debugging-port=9222'],
          });
          
          const page = await browser.newPage();

          try {
            await page.goto(pageInfo.url, { waitUntil: 'networkidle' });

            const audit = await playAudit({
              page,
              thresholds: LIGHTHOUSE_THRESHOLDS,
              port: 9222,
            });

            // Extract Core Web Vitals
            const audits = audit.lhr.audits;
            
            // Largest Contentful Paint (LCP) - should be under 2.5s
            const lcp = audits['largest-contentful-paint']?.numericValue || 0;
            expect(lcp).toBeLessThan(2500);

            // First Contentful Paint (FCP) - should be under 1.8s
            const fcp = audits['first-contentful-paint']?.numericValue || 0;
            expect(fcp).toBeLessThan(1800);

            // Cumulative Layout Shift (CLS) - should be under 0.1
            const cls = audits['cumulative-layout-shift']?.numericValue || 0;
            expect(cls).toBeLessThan(0.1);

            // Total Blocking Time (TBT) - should be under 200ms
            const tbt = audits['total-blocking-time']?.numericValue || 0;
            expect(tbt).toBeLessThan(200);

            // Speed Index - should be under 3.4s
            const speedIndex = audits['speed-index']?.numericValue || 0;
            expect(speedIndex).toBeLessThan(3400);

            console.log(`\n${pageInfo.name} page Core Web Vitals:`);
            console.log(`  LCP: ${lcp}ms`);
            console.log(`  FCP: ${fcp}ms`);
            console.log(`  CLS: ${cls}`);
            console.log(`  TBT: ${tbt}ms`);
            console.log(`  Speed Index: ${speedIndex}ms`);

            return true;
          } finally {
            await page.close();
            await browser.close();
          }
        }
      ),
      { numRuns: 20 } // Run 20 times as specified
    );
  });

  /**
   * Property 10 Extension: Accessibility standards validation
   * Validates specific accessibility requirements beyond the score
   */
  test('Property 10 Extension: meets specific accessibility standards for all pages', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom(...pages),
        async (pageInfo) => {
          const browser = await chromium.launch({
            args: ['--remote-debugging-port=9222'],
          });
          
          const page = await browser.newPage();

          try {
            await page.goto(pageInfo.url, { waitUntil: 'networkidle' });

            const audit = await playAudit({
              page,
              thresholds: LIGHTHOUSE_THRESHOLDS,
              port: 9222,
            });

            const audits = audit.lhr.audits;

            // Validate specific accessibility requirements
            
            // All images should have alt text
            const imageAlt = audits['image-alt'];
            expect(imageAlt?.score).toBe(1);

            // Document should have a title
            const documentTitle = audits['document-title'];
            expect(documentTitle?.score).toBe(1);

            // HTML should have lang attribute
            const htmlLang = audits['html-has-lang'];
            expect(htmlLang?.score).toBe(1);

            // Links should have descriptive text
            const linkName = audits['link-name'];
            expect(linkName?.score).toBe(1);

            // Color contrast should be sufficient
            const colorContrast = audits['color-contrast'];
            expect(colorContrast?.score).toBe(1);

            // Form elements should have labels
            const formLabels = audits['label'];
            if (formLabels) {
              expect(formLabels.score).toBe(1);
            }

            // Buttons should have accessible names
            const buttonName = audits['button-name'];
            if (buttonName) {
              expect(buttonName.score).toBe(1);
            }

            return true;
          } finally {
            await page.close();
            await browser.close();
          }
        }
      ),
      { numRuns: 20 } // Run 20 times as specified
    );
  });

  /**
   * Property 10 Extension: SEO best practices validation
   * Validates specific SEO requirements beyond the score
   */
  test('Property 10 Extension: implements SEO best practices for all pages', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom(...pages),
        async (pageInfo) => {
          const browser = await chromium.launch({
            args: ['--remote-debugging-port=9222'],
          });
          
          const page = await browser.newPage();

          try {
            await page.goto(pageInfo.url, { waitUntil: 'networkidle' });

            const audit = await playAudit({
              page,
              thresholds: LIGHTHOUSE_THRESHOLDS,
              port: 9222,
            });

            const audits = audit.lhr.audits;

            // Validate specific SEO requirements
            
            // Document should have meta description
            const metaDescription = audits['meta-description'];
            expect(metaDescription?.score).toBe(1);

            // Page should have successful HTTP status code
            const httpStatusCode = audits['http-status-code'];
            expect(httpStatusCode?.score).toBe(1);

            // Links should be crawlable
            const crawlableAnchors = audits['crawlable-anchors'];
            expect(crawlableAnchors?.score).toBe(1);

            // Viewport should be mobile-friendly
            const viewport = audits['viewport'];
            expect(viewport?.score).toBe(1);

            // Font sizes should be legible
            const fontSize = audits['font-size'];
            expect(fontSize?.score).toBe(1);

            // Tap targets should be appropriately sized
            const tapTargets = audits['tap-targets'];
            if (tapTargets) {
              expect(tapTargets.score).toBeGreaterThanOrEqual(0.9);
            }

            return true;
          } finally {
            await page.close();
            await browser.close();
          }
        }
      ),
      { numRuns: 20 } // Run 20 times as specified
    );
  });
});
