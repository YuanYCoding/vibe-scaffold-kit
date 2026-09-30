import { expect, test } from "@playwright/test";

test("renders AI platform home", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /已经可以开工/ })).toBeVisible();
});
