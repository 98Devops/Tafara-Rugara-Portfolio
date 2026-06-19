import { test, expect } from '@playwright/test';

test.describe('Integration Testing - Complete End-to-End Validation', () => {
  const pages = [
    { name: 'Home', url: '/', title: 'Tafara Rugara' },
    { name: 'What I Do', url: '/what-i-do', title: 'What I Do' },
    { name: 'Projects', url: '/projects', title: 'Projects' },
    { name: 'Experience', url: '/experience', title: 'Experience' },
    { name: 'Contact', url: '/contact', title: 'Contact' },
  ];

  test.describe('Cross-Page Navigation Flow', () => {
    test('should navigate through all pages in sequence', async ({ page }) => {
      // Start from home page
      await page.goto('/');
      await expect(page).toHaveTitle(/Tafara Rugara/);

      // Navigate through each page and verify content loads
      for (const pageInfo of pages.slice(1)) {
        await page.click(`nav a[href="${pageInfo.url}"]`);
        await expect(page).toHaveURL(pageInfo.url);

        // Wait for main content to load
        await page.waitForSelector('main', { timeout: 5000 });

        // Verify page has proper heading structure
        const h1 = page.locator('h1');
        await expect(h1).toBeVisible();

        // Verify navigation is still present and functional
        const navItems = page.locator('nav a');
        await expect(navItems).toHaveCount(6); // 5 nav items + 1 logo link
      }
    });

    test('should maintain consistent navigation across all pages', async ({
      page,
    }) => {
      for (const pageInfo of pages) {
        await page.goto(pageInfo.url);

        // Check navigation consistency
        const navItems = page
          .locator('nav a')
          .filter({ hasNotText: 'Tafara Rugara' });
        await expect(navItems).toHaveCount(5);

        const navTexts = await navItems.allTextContents();
        expect(navTexts).toEqual([
          'Home',
          'What I Do',
          'Projects',
          'Experience',
          'Contact',
        ]);

        // Verify active state
        const activeLink = page.locator(`nav a[href="${pageInfo.url}"]`);
        if (pageInfo.url !== '/') {
          await expect(activeLink).toHaveClass(/active/);
        }
      }
    });
  });

  test.describe('Contact Form Integration', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/contact');
      // Wait for dynamic form to load
      await page.waitForSelector('form[data-netlify="true"]', {
        timeout: 10000,
      });
    });

    test('should complete full contact form submission flow', async ({
      page,
    }) => {
      // Fill out the form with valid data
      await page.fill('input[name="name"]', 'Integration Test User');
      await page.fill('input[name="email"]', 'test@example.com');
      await page.fill(
        'textarea[name="message"]',
        'This is an integration test message to verify the contact form functionality works correctly.'
      );

      // Verify form validation passes
      const nameInput = page.locator('input[name="name"]');
      const emailInput = page.locator('input[name="email"]');
      const messageInput = page.locator('textarea[name="message"]');

      const nameValid = await nameInput.evaluate(
        (el: HTMLInputElement) => el.validity.valid
      );
      const emailValid = await emailInput.evaluate(
        (el: HTMLInputElement) => el.validity.valid
      );
      const messageValid = await messageInput.evaluate(
        (el: HTMLTextAreaElement) => el.validity.valid
      );

      expect(nameValid).toBe(true);
      expect(emailValid).toBe(true);
      expect(messageValid).toBe(true);

      // Submit the form
      await page.click('button[type="submit"]');

      // Verify form has Netlify attributes for proper submission
      const form = page.locator('form[data-netlify="true"]');
      await expect(form).toHaveAttribute('data-netlify', 'true');
      await expect(form).toHaveAttribute('name', 'contact');
      await expect(form).toHaveAttribute('method', 'POST');
    });

    test('should validate form fields and show errors', async ({ page }) => {
      // Try submitting empty form
      await page.click('button[type="submit"]');

      // Check that required fields are marked as such
      await expect(page.locator('input[name="name"]')).toHaveAttribute(
        'required'
      );
      await expect(page.locator('input[name="email"]')).toHaveAttribute(
        'required'
      );
      await expect(page.locator('textarea[name="message"]')).toHaveAttribute(
        'required'
      );

      // Test email validation
      await page.fill('input[name="name"]', 'Test User');
      await page.fill('input[name="email"]', 'invalid-email');
      await page.fill('textarea[name="message"]', 'Short msg'); // Too short

      await page.click('button[type="submit"]');

      const emailInput = page.locator('input[name="email"]');
      const isEmailValid = await emailInput.evaluate(
        (el: HTMLInputElement) => el.validity.valid
      );
      expect(isEmailValid).toBe(false);
    });
  });

  test.describe('Document Download Integration', () => {
    test('should provide working document downloads', async ({ page }) => {
      await page.goto('/');

      // Check CV download
      const cvButton = page
        .locator('a[href*="cv"], a:has-text("Download CV")')
        .first();
      await expect(cvButton).toBeVisible();

      const cvHref = await cvButton.getAttribute('href');
      expect(cvHref).toContain('.pdf');

      // Verify PDF is accessible
      if (cvHref) {
        const response = await page.evaluate(async url => {
          const res = await fetch(url);
          return {
            status: res.status,
            contentType: res.headers.get('content-type'),
          };
        }, cvHref);

        expect(response.status).toBe(200);
        expect(response.contentType).toContain('application/pdf');
      }

      // Check Reference download
      const refButton = page
        .locator('a[href*="reference"], a:has-text("Download Reference")')
        .first();
      await expect(refButton).toBeVisible();

      const refHref = await refButton.getAttribute('href');
      expect(refHref).toContain('.pdf');

      // Verify PDF is accessible
      if (refHref) {
        const response = await page.evaluate(async url => {
          const res = await fetch(url);
          return {
            status: res.status,
            contentType: res.headers.get('content-type'),
          };
        }, refHref);

        expect(response.status).toBe(200);
        expect(response.contentType).toContain('application/pdf');
      }
    });

    test('should have proper accessibility for download links', async ({
      page,
    }) => {
      await page.goto('/');

      const downloadLinks = page.locator('a[href*=".pdf"]');
      const linkCount = await downloadLinks.count();

      for (let i = 0; i < linkCount; i++) {
        const link = downloadLinks.nth(i);

        // Should have descriptive text
        const text = await link.textContent();
        const ariaLabel = await link.getAttribute('aria-label');

        expect(text || ariaLabel).toBeTruthy();

        const content = (text || ariaLabel || '').toLowerCase();
        expect(content).toMatch(/download|cv|reference/);
      }
    });
  });

  test.describe('Responsive Design Validation', () => {
    const viewports = [
      { name: 'Mobile', width: 375, height: 667 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Desktop', width: 1920, height: 1080 },
    ];

    viewports.forEach(({ name, width, height }) => {
      test(`should be responsive on ${name} (${width}x${height})`, async ({
        page,
      }) => {
        await page.setViewportSize({ width, height });

        for (const pageInfo of pages) {
          await page.goto(pageInfo.url);

          // Wait for content to load
          await page.waitForSelector('main', { timeout: 5000 });

          // Check that navigation is accessible
          const nav = page.locator('nav');
          await expect(nav).toBeVisible();

          // Check that content doesn't overflow horizontally
          const body = page.locator('body');
          const bodyBox = await body.boundingBox();
          expect(bodyBox?.width).toBeLessThanOrEqual(width);

          // Check that main content is visible
          const main = page.locator('main');
          await expect(main).toBeVisible();

          // For mobile, check that mobile menu works
          if (width < 768) {
            const mobileMenuButton = page.locator('button[aria-label*="menu"]');
            if (await mobileMenuButton.isVisible()) {
              await mobileMenuButton.click();
              // Mobile menu should appear
              const mobileMenu = page.locator('nav a[href="/projects"]');
              await expect(mobileMenu).toBeVisible();

              // Close mobile menu
              await mobileMenuButton.click();
            }
          }
        }
      });
    });
  });

  test.describe('Performance and Loading', () => {
    test('should load all pages within performance thresholds', async ({
      page,
    }) => {
      for (const pageInfo of pages) {
        const startTime = Date.now();
        await page.goto(pageInfo.url);
        await page.waitForLoadState('networkidle');
        const loadTime = Date.now() - startTime;

        // Should load within 2 seconds as per requirements
        expect(loadTime).toBeLessThan(2000);

        // Check that main content is visible
        await expect(page.locator('main')).toBeVisible();

        // Check for proper heading structure
        const h1 = page.locator('h1');
        await expect(h1).toHaveCount(1);
      }
    });

    test('should have proper SEO meta tags on all pages', async ({ page }) => {
      for (const pageInfo of pages) {
        await page.goto(pageInfo.url);

        // Check title
        const title = await page.title();
        expect(title).toBeTruthy();
        expect(title.length).toBeGreaterThan(0);

        // Check meta description
        const description = page.locator('meta[name="description"]');
        await expect(description).toHaveAttribute('content');

        // Check Open Graph tags
        const ogTitle = page.locator('meta[property="og:title"]');
        const ogDescription = page.locator('meta[property="og:description"]');

        await expect(ogTitle).toHaveAttribute('content');
        await expect(ogDescription).toHaveAttribute('content');
      }
    });
  });

  test.describe('Accessibility Validation', () => {
    test('should have proper accessibility attributes', async ({ page }) => {
      for (const pageInfo of pages) {
        await page.goto(pageInfo.url);

        // Check for proper heading hierarchy
        const h1 = page.locator('h1');
        await expect(h1).toHaveCount(1);

        // Check that all images have alt text
        const images = page.locator('img');
        const imageCount = await images.count();

        for (let i = 0; i < imageCount; i++) {
          const img = images.nth(i);
          const alt = await img.getAttribute('alt');
          expect(alt).toBeTruthy();
        }

        // Check that all links have descriptive text
        const links = page.locator('a');
        const linkCount = await links.count();

        for (let i = 0; i < linkCount; i++) {
          const link = links.nth(i);
          const text = await link.textContent();
          const ariaLabel = await link.getAttribute('aria-label');

          expect(text || ariaLabel).toBeTruthy();
        }

        // Check for proper form labels on contact page
        if (pageInfo.url === '/contact') {
          await page.waitForSelector('form[data-netlify="true"]', {
            timeout: 10000,
          });

          const nameLabel = page.locator('label[for="name"]');
          const emailLabel = page.locator('label[for="email"]');
          const messageLabel = page.locator('label[for="message"]');

          await expect(nameLabel).toBeVisible();
          await expect(emailLabel).toBeVisible();
          await expect(messageLabel).toBeVisible();
        }
      }
    });
  });

  test.describe('External Links and Social Media', () => {
    test('should have working external links with proper security attributes', async ({
      page,
    }) => {
      await page.goto('/');

      // Check GitHub and LinkedIn links
      const externalLinks = page.locator(
        'a[href*="github.com"], a[href*="linkedin.com"]'
      );
      const linkCount = await externalLinks.count();

      expect(linkCount).toBeGreaterThan(0);

      for (let i = 0; i < linkCount; i++) {
        const link = externalLinks.nth(i);

        // Should open in new tab
        await expect(link).toHaveAttribute('target', '_blank');

        // Should have security attributes
        const rel = await link.getAttribute('rel');
        expect(rel).toMatch(/noopener|noreferrer/);

        // Should have valid href
        const href = await link.getAttribute('href');
        expect(href).toMatch(/^https?:\/\//);
      }
    });
  });

  test.describe('Content Validation', () => {
    test('should display all required professional information', async ({
      page,
    }) => {
      await page.goto('/');

      // Check professional identity
      await expect(page.locator('h1')).toContainText('Tafara Rugara');
      await expect(
        page.getByText('Junior Cloud & DevOps Engineer')
      ).toBeVisible();
      await expect(page.getByText('Harare, Zimbabwe')).toBeVisible();

      // Check for technical keywords in summary
      const content = await page.textContent('main');
      expect(content).toMatch(
        /AWS|Terraform|Docker|Kubernetes|CI\/CD|Automation|Infrastructure as Code|Observability/i
      );
    });

    test('should display all required capability categories', async ({
      page,
    }) => {
      await page.goto('/what-i-do');

      // Check for four capability pillars
      const content = await page.textContent('main');
      expect(content).toContain('Cloud Architecture');
      expect(content).toContain('DevOps & CI/CD');
      expect(content).toContain('Automation Engineering');
      expect(content).toContain('Monitoring & Reliability');
    });

    test('should display all required projects', async ({ page }) => {
      await page.goto('/projects');

      // Check for four specific projects
      const content = await page.textContent('main');
      expect(content).toContain('Acquisitions API');
      expect(content).toContain('Voice-to-Vector Semantic Memory API');
      expect(content).toContain('Serverless Resume');
      expect(content).toContain('Tomcat App Modernization');
    });

    test('should display professional experience with impact metrics', async ({
      page,
    }) => {
      await page.goto('/experience');

      // Check for experience details
      const content = await page.textContent('main');
      expect(content).toContain('DevOps Engineer');
      expect(content).toContain('Excellessence');
      expect(content).toContain('60% downtime reduction');
    });
  });
});
