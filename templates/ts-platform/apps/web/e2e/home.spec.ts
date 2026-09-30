import { expect, test } from "@playwright/test";

test("renders platform home", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /已准备好扩展/ })).toBeVisible();
});
