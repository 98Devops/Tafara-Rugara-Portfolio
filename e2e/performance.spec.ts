import { test, expect } from '@playwright/test';

test.describe('Performance and Accessibility', () => {
  const pages = [
    { name: 'Home', url: '/' },
    { name: 'What I Do', url: '/what-i-do' },
    { name: 'Projects', url: '/projects' },
    { name: 'Experience', url: '/experience' },
    { name: 'Contact', url: '/contact' },
  ];

  pages.forEach(({ name, url }) => {
    test(`${name} page should load within 2 seconds`, async ({ page }) => {
      const startTime = Date.now();
      await page.goto(url);
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;

      expect(loadTime).toBeLessThan(2000);
    });

    test(`${name} page should have proper semantic HTML structure`, async ({
      page,
    }) => {
      await page.goto(url);

      // Check for main landmark
      const main = page.locator('main');
      await expect(main).toBeVisible();

      // Check for navigation
      const nav = page.locator('nav');
      await expect(nav).toBeVisible();

      // Check for proper heading hierarchy
      const h1 = page.locator('h1');
      await expect(h1).toHaveCount(1);
    });

    test(`${name} page should be mobile responsive`, async ({ page }) => {
      // Test mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(url);

      // Check that navigation is accessible on mobile
      const nav = page.locator('nav');
      await expect(nav).toBeVisible();

      // Check that content is not horizontally scrollable
      const body = page.locator('body');
      const bodyBox = await body.boundingBox();
      expect(bodyBox?.width).toBeLessThanOrEqual(375);
    });

    test(`${name} page should have proper alt text for images`, async ({
      page,
    }) => {
      await page.goto(url);

      const images = page.locator('img');
      const imageCount = await images.count();

      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        expect(alt).toBeTruthy();
        expect(alt?.length).toBeGreaterThan(0);
      }
    });

    test(`${name} page should have descriptive link text`, async ({ page }) => {
      await page.goto(url);

      const links = page.locator('a');
      const linkCount = await links.count();

      for (let i = 0; i < linkCount; i++) {
        const link = links.nth(i);
        const text = await link.textContent();
        const ariaLabel = await link.getAttribute('aria-label');

        // Link should have either text content or aria-label
        expect(text || ariaLabel).toBeTruthy();

        // Avoid generic link text
        if (text) {
          expect(text.toLowerCase()).not.toBe('click here');
          expect(text.toLowerCase()).not.toBe('read more');
          expect(text.toLowerCase()).not.toBe('link');
        }
      }
    });
  });

  test('Contact form should be accessible and functional', async ({ page }) => {
    await page.goto('/contact');

    // Check form labels
    const nameInput = page.locator('input[name="name"]');
    const emailInput = page.locator('input[name="email"]');
    const messageInput = page.locator('textarea[name="message"]');

    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(messageInput).toBeVisible();

    // Check that inputs have associated labels
    const nameLabel = page.locator('label[for="name"]');
    const emailLabel = page.locator('label[for="email"]');
    const messageLabel = page.locator('label[for="message"]');

    await expect(nameLabel).toBeVisible();
    await expect(emailLabel).toBeVisible();
    await expect(messageLabel).toBeVisible();
  });

  test('All pages should have proper meta tags', async ({ page }) => {
    for (const { url } of pages) {
      await page.goto(url);

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
