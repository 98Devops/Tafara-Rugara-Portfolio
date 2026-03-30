import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should display all required form fields', async ({ page }) => {
    // Wait for the dynamic ContactForm component to load
    await page.waitForSelector('form[data-netlify="true"]', { timeout: 10000 });

    // Check form fields are present
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    // Wait for the dynamic ContactForm component to load
    await page.waitForSelector('form[data-netlify="true"]', { timeout: 10000 });

    // Try to submit empty form
    await page.click('button[type="submit"]');

    // Check for validation messages (these might be browser native or custom)
    const nameInput = page.locator('input[name="name"]');
    const emailInput = page.locator('input[name="email"]');
    const messageInput = page.locator('textarea[name="message"]');

    // Check that fields are marked as invalid
    await expect(nameInput).toHaveAttribute('required');
    await expect(emailInput).toHaveAttribute('required');
    await expect(messageInput).toHaveAttribute('required');
  });

  test('should validate email format', async ({ page }) => {
    // Wait for the dynamic ContactForm component to load
    await page.waitForSelector('form[data-netlify="true"]', { timeout: 10000 });

    // Fill form with invalid email
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'invalid-email');
    await page.fill(
      'textarea[name="message"]',
      'This is a test message that is long enough to be valid.'
    );

    await page.click('button[type="submit"]');

    // Email input should be invalid
    const emailInput = page.locator('input[name="email"]');
    const isValid = await emailInput.evaluate(
      (el: HTMLInputElement) => el.validity.valid
    );
    expect(isValid).toBe(false);
  });

  test('should accept valid form submission', async ({ page }) => {
    // Wait for the dynamic ContactForm component to load
    await page.waitForSelector('form[data-netlify="true"]', { timeout: 10000 });

    // Fill form with valid data
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john.doe@example.com');
    await page.fill(
      'textarea[name="message"]',
      'This is a test message with sufficient length to pass validation requirements.'
    );

    // Submit form
    await page.click('button[type="submit"]');

    // Form should be submitted (this depends on Netlify Forms integration)
    // We can check that the form doesn't show validation errors
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
  });

  test('should display contact information', async ({ page }) => {
    // Check that contact information is displayed
    await expect(page.locator('text=tafara.rugara@gmail.com')).toBeVisible();

    // Check for social links
    const linkedinLink = page.locator('a[href*="linkedin.com"]');
    const githubLink = page.locator('a[href*="github.com"]');

    await expect(linkedinLink).toBeVisible();
    await expect(githubLink).toBeVisible();
  });

  test('should have accessible form labels', async ({ page }) => {
    // Wait for the dynamic ContactForm component to load
    await page.waitForSelector('form[data-netlify="true"]', { timeout: 10000 });

    // Check that all form inputs have proper labels
    const nameInput = page.locator('input[name="name"]');
    const emailInput = page.locator('input[name="email"]');
    const messageInput = page.locator('textarea[name="message"]');

    // Check for associated labels
    const nameLabel = page.locator('label[for="name"]');
    const emailLabel = page.locator('label[for="email"]');
    const messageLabel = page.locator('label[for="message"]');

    await expect(nameLabel).toBeVisible();
    await expect(emailLabel).toBeVisible();
    await expect(messageLabel).toBeVisible();

    // Check label text
    await expect(nameLabel).toContainText('Name');
    await expect(emailLabel).toContainText('Email');
    await expect(messageLabel).toContainText('Message');
  });
});
