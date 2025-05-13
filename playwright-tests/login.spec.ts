import { test, expect } from "@playwright/test";

test.describe("Login page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("should have correct page title", async ({ page }) => {
    await expect(page).toHaveTitle("Sessions Portal");
  });

  test("should display the Arbisoft logo", async ({ page }) => {
    const logo = page.getByTestId("logo");
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute("alt", "arbisoft-logo");
    await expect(logo).toHaveAttribute("src", /arbisoft-logo\.png/);
  });

  test("should display the Google login button with correct text", async ({ page }) => {
    const button = page.getByTestId("login-button");
    await expect(button).toBeVisible();

    const buttonText = await button.locator("p").textContent();
    expect(buttonText?.trim()).toBe("Sign in with Google");

    const googleLogo = button.locator("img[alt='google-logo']");
    await expect(googleLogo).toBeVisible();
    await expect(googleLogo).toHaveAttribute("src", /google\.svg/);
  });

  test("should click the login button", async ({ page }) => {
    const button = page.getByTestId("login-button");
    await expect(button).toBeVisible();
    await button.click();
  });
});

test.describe("Google Login Flow", () => {
  test("should clicking Google login opens popup and loads Google OAuth", async ({ page, context }) => {
    await page.goto("/login"); // Update with actual login page

    // Wait for popup
    const [popup] = await Promise.all([context.waitForEvent("page"), page.getByTestId("login-button").click()]);

    // Wait for the popup to load
    await popup.waitForLoadState("domcontentloaded");

    // Assert Google login screen is loaded
    await expect(popup.url()).toContain("accounts.google.com");

    // // Check for Google login form fields
    // const emailField = popup.locator('input[type="email"]');
    // await expect(emailField).toBeVisible();
  });
});
