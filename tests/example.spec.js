import { expect, test } from "@playwright/test"
import store from "../src/store"

test("has title", async ({ page }) => {
  await page.goto("/")

  expect(page.getByRole("heading", { name: "Todo List" })).toBeTruthy()
})

test("has input", async ({ page }) => {
  await page.goto("/")

  const input = page.getByTestId("input")
  const button = page.getByTestId("submitBtn")

  await input.fill("Test Input")
  await button.click()

  expect(store.todos.length).toEqual(4)

})
