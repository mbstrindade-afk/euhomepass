import { test, expect } from '@playwright/test';

// Tests for authentication system
test.describe('Authentication System', () => {
  test('should allow a user to register', async ({ page }) => {
    // Navigate to register page
    await page.goto('/register');
    
    // Check that we're on the register page
    await expect(page.getByRole('heading', { name: 'Create an Account' })).toBeVisible();
    
    // Generate a unique email for testing
    const testEmail = `test-${Date.now()}@example.com`;
    const testPassword = 'password123';
    
    // Fill the registration form
    await page.getByLabel('Email').fill(testEmail);
    await page.getByLabel('Password').fill(testPassword);
    await page.getByLabel('Confirm Password').fill(testPassword);
    
    // Submit the form
    await page.getByRole('button', { name: 'Register' }).click();
    
    // Check for success message
    await expect(page.getByText('Registration successful')).toBeVisible({ timeout: 5000 });
  });
  
  test('should allow a user to login and access dashboard', async ({ page }) => {
    // First register a new user
    const testEmail = `test-${Date.now()}@example.com`;
    const testPassword = 'password123';
    
    // Navigate to register page and create account
    await page.goto('/register');
    await page.getByLabel('Email').fill(testEmail);
    await page.getByLabel('Password').fill(testPassword);
    await page.getByLabel('Confirm Password').fill(testPassword);
    await page.getByRole('button', { name: 'Register' }).click();
    
    // Wait for success message and redirect to login
    await page.waitForURL('/login', { timeout: 5000 });
    
    // Now login with the created credentials
    await page.getByLabel('Email').fill(testEmail);
    await page.getByLabel('Password').fill(testPassword);
    await page.getByRole('button', { name: 'Sign in' }).click();
    
    // Should be redirected to dashboard
    await page.waitForURL('/dashboard', { timeout: 5000 });
    
    // Check that we're on the dashboard
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    
    // Check that we see the user email displayed
    await expect(page.getByText(`Logged in as ${testEmail}`)).toBeVisible();
    
    // Check that the protected content is displayed
    await expect(page.getByText('Welcome to Your Dashboard')).toBeVisible();
  });
  
  test('should not allow access to dashboard when not authenticated', async ({ page }) => {
    // Try to directly access dashboard without logging in
    await page.goto('/dashboard');
    
    // Should be redirected to login
    await page.waitForURL('/login', { timeout: 5000 });
    
    // Check that we're on the login page
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });
  
  test('should show error message on invalid login', async ({ page }) => {
    // Navigate to login page
    await page.goto('/login');
    
    // Fill with invalid credentials
    await page.getByLabel('Email').fill('invalid@example.com');
    await page.getByLabel('Password').fill('wrongpassword');
    
    // Submit the form
    await page.getByRole('button', { name: 'Sign in' }).click();
    
    // Check for error message
    await expect(page.getByText('Invalid email or password')).toBeVisible({ timeout: 5000 });
  });
  
  test('should allow user to logout', async ({ page }) => {
    // First register and login
    const testEmail = `test-${Date.now()}@example.com`;
    const testPassword = 'password123';
    
    await page.goto('/register');
    await page.getByLabel('Email').fill(testEmail);
    await page.getByLabel('Password').fill(testPassword);
    await page.getByLabel('Confirm Password').fill(testPassword);
    await page.getByRole('button', { name: 'Register' }).click();
    
    await page.waitForURL('/login', { timeout: 5000 });
    
    await page.getByLabel('Email').fill(testEmail);
    await page.getByLabel('Password').fill(testPassword);
    await page.getByRole('button', { name: 'Sign in' }).click();
    
    await page.waitForURL('/dashboard', { timeout: 5000 });
    
    // Click logout button
    await page.getByRole('button', { name: 'Logout' }).click();
    
    // Should be redirected to home page
    await page.waitForURL('/', { timeout: 5000 });
    
    // Try to access dashboard again
    await page.goto('/dashboard');
    
    // Should be redirected to login again
    await expect(page.url()).toContain('/login');
  });
});