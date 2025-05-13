import { expect, test } from "../playwright/fixtures";

test("should have videos title", async ({ page }) => {
  await page.goto("/videos");
  const title = await page.title();
  expect(title).toBe("Sessions Portal");
});
