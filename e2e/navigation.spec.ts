import { test, expect } from '@playwright/test';

test.describe('Navigation System', () => {
  test('should navigate to all main pages', async ({ page }) => {
    await page.goto('/');

    // Test navigation to each page
    const pages = [
      { name: 'What I Do', url: '/what-i-do' },
      { name: 'Projects', url: '/projects' },
      { name: 'Experience', url: '/experience' },
      { name: 'Contact', url: '/contact' },
      { name: 'Home', url: '/' },
    ];

    for (const { name, url } of pages) {
      await page.click(`nav a[href="${url}"]`);
      await expect(page).toHaveURL(url);
      
      // Verify navigation is still present (5 nav items + 1 logo link = 6 total)
      const navItems = page.locator('nav a');
      await expect(navItems).toHaveCount(6);
    }
  });

  test('should maintain consistent navigation across all pages', async ({ page }) => {
    const pages = ['/', '/what-i-do', '/projects', '/experience', '/contact'];
    
    for (const url of pages) {
      await page.goto(url);
      
      // Check that all navigation items are present (5 nav items + 1 logo link = 6 total)
      const navItems = page.locator('nav a');
      await expect(navItems).toHaveCount(6);
      
      // Check navigation text content (excluding logo link)
      const mainNavItems = page.locator('nav a').filter({ hasNotText: 'Tafara Rugara' });
      await expect(mainNavItems).toHaveCount(5);
      const navTexts = await mainNavItems.allTextContents();
      expect(navTexts).toEqual(['Home', 'What I Do', 'Projects', 'Experience', 'Contact']);
    }
  });

  test('should highlight active page in navigation', async ({ page }) => {
    await page.goto('/projects');
    
    // Check that the Projects link has active styling
    const activeLink = page.locator('nav a[href="/projects"]');
    await expect(activeLink).toHaveClass(/active/);
  });
});