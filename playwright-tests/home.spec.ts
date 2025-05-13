import { test, expect } from "@playwright/test";

test("should have home title", async ({ page }) => {
  await page.goto("/");
  const title = await page.title();
  expect(title).toBe("Sessions Portal");
});
