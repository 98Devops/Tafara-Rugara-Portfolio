import { test, expect } from '@playwright/test';

test.describe('Website Development Projects Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/projects');
  });

  test('should display Website Development Projects section as first section', async ({
    page,
  }) => {
    // Check that the section heading exists
    const heading = page.locator('h1', {
      hasText: 'Website Development Projects',
    });
    await expect(heading).toBeVisible();

    // Verify it uses the cyan-to-blue gradient
    await expect(heading).toHaveClass(/from-cyan-400/);
    await expect(heading).toHaveClass(/to-blue-400/);
  });

  test('should display subtitle for Website Development section', async ({
    page,
  }) => {
    const subtitle = page.locator('p', {
      hasText:
        'Modern, performant websites built with Next.js, React, and cutting-edge web technologies.',
    });
    await expect(subtitle).toBeVisible();
  });

  test('should display website projects in grid layout', async ({ page }) => {
    // Find the Website Development section
    const section = page.locator('section').first();

    // Check for grid layout
    const grid = section.locator('div.grid');
    await expect(grid).toBeVisible();
    await expect(grid).toHaveClass(/grid-cols-1/);
    await expect(grid).toHaveClass(/lg:grid-cols-2/);
  });

  test('should display at least 4 website projects', async ({ page }) => {
    // Count project cards in the first section (Website Development)
    const section = page.locator('section').first();
    const projectCards = section.locator('[class*="bg-gray-900"]');

    // Should have exactly 4 projects
    const count = await projectCards.count();
    expect(count).toBe(4);
  });

  test('should display project titles for website projects', async ({
    page,
  }) => {
    const section = page.locator('section').first();

    // Check for specific project titles
    await expect(
      section.locator('h2', { hasText: 'Litho Solutions' })
    ).toBeVisible();
    await expect(
      section.locator('h2', { hasText: 'ProAir Zimbabwe' })
    ).toBeVisible();
    await expect(
      section.locator('h2', { hasText: 'Mero Tech AI' })
    ).toBeVisible();
    await expect(
      section.locator('h2', { hasText: 'AWS Cloud Resume Challenge' })
    ).toBeVisible();
  });

  test('should display "Website" badge for each project', async ({ page }) => {
    const section = page.locator('section').first();
    const badges = section.locator('span', { hasText: 'Website' });

    // Should have multiple website badges
    const count = await badges.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test('should display external links with security attributes', async ({
    page,
  }) => {
    const section = page.locator('section').first();

    // Check for demo links
    const demoLinks = section.locator(
      'a[target="_blank"][rel="noopener noreferrer"]',
      {
        hasText: 'View Live Website',
      }
    );
    expect(await demoLinks.count()).toBeGreaterThan(0);

    // Check for GitHub links
    const githubLinks = section.locator(
      'a[target="_blank"][rel="noopener noreferrer"]',
      {
        hasText: 'View Repository',
      }
    );
    expect(await githubLinks.count()).toBeGreaterThan(0);
  });

  test('should display technology badges for each project', async ({
    page,
  }) => {
    const section = page.locator('section').first();

    // Check for technology badges (should have many)
    const techBadges = section.locator('span[class*="bg-gray-800"]');
    const count = await techBadges.count();
    expect(count).toBeGreaterThan(10); // Each project has multiple tech badges
  });

  test('should display key features for each project', async ({ page }) => {
    const section = page.locator('section').first();

    // Check for "Key Features" heading
    const keyFeaturesHeading = section.locator('h3', {
      hasText: 'Key Features',
    });
    expect(await keyFeaturesHeading.count()).toBeGreaterThan(0);
  });

  test('should display Website Development section before Automation section', async ({
    page,
  }) => {
    // Get all section headings
    const headings = page.locator('h1');

    // Get the text of the first two headings
    const firstHeading = await headings.nth(0).textContent();
    const secondHeading = await headings.nth(1).textContent();

    expect(firstHeading).toContain('Website Development Projects');
    expect(secondHeading).toContain('Workflows & Automation Systems');
  });

  test('should have responsive grid layout', async ({ page }) => {
    const section = page.locator('section').first();
    const grid = section.locator('div.grid');

    // Check for responsive classes
    await expect(grid).toHaveClass(/grid-cols-1/); // Mobile
    await expect(grid).toHaveClass(/lg:grid-cols-2/); // Desktop
  });

  test('should display hover effects on project cards', async ({ page }) => {
    const section = page.locator('section').first();
    const firstCard = section.locator('[class*="bg-gray-900"]').first();

    // Check for hover border color class
    await expect(firstCard).toHaveClass(/hover:border-cyan-500/);
  });
});
