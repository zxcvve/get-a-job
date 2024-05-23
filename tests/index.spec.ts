import { test, expect } from "@playwright/test";

const base_url = process.env.BASE_URL || "http://localhost:3000";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(1000);
});

test("clicking vacancy card opens corresponding vacancy page", async ({
  page,
  context,
}) => {
  const vacancyID = await page
    .getByTestId("vacancy-card-0")
    .getAttribute("href");
  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    page.getByTestId("vacancy-card-0").click(), // click the element that opens a new page
  ]);
  await newPage.waitForLoadState();

  const newPageURL = newPage.url();
  console.log(newPageURL);
  expect(newPageURL).toBe(`${base_url}${vacancyID}`);
});

test("clicking reset button resets the filters", async ({ page }) => {
  const vacancyTextBeforeFilters = await page
    .getByTestId("vacancy-card-9")
    .innerText();
  await page.getByLabel("От 40000").check();
  const vacancyTextAfterFilters = await page
    .getByTestId("vacancy-card-9")
    .innerText();
  await page.getByRole("button", { name: "Сброс" }).click();
  const vacancyTextAfterReset = await page
    .getByTestId("vacancy-card-9")
    .innerText();
  expect(vacancyTextBeforeFilters).toEqual(vacancyTextAfterReset);
});

test("clicking next button moves to second page", async ({ page }) => {
  const nextButton = await page
    .locator(".n-pagination-item--button")
    .last()
    .click();
  await page.waitForTimeout(1000);
  const pageNumber = await page
    .locator(".n-pagination-item--active")
    .innerText();
  expect(pageNumber).toEqual("2");
});

test("changing filters reset page number", async ({ page }) => {
  await page.locator(".n-pagination-item--button").last().click();
  await page.waitForTimeout(1000);
  const pageNumber = await page
    .locator(".n-pagination-item--active")
    .innerText();
  expect(pageNumber).toEqual("2");
  await page.getByLabel("От 10000").check();
  const pageNumberAfterApplyingFilters = await page
    .locator(".n-pagination-item--active")
    .innerText();
  expect(pageNumberAfterApplyingFilters).toEqual("1");
});

test("clicking previous button moves to previous page", async ({ page }) => {
  await page.locator(".n-pagination-item--button").last().click();
  await page.waitForTimeout(1000);
  const pageNumber = await page
    .locator(".n-pagination-item--active")
    .innerText();
  expect(pageNumber).toEqual("2");
  await page.locator(".n-pagination-item--button").first().click();
  const pageNumberAfterClickingPrev = await page
    .locator(".n-pagination-item--active")
    .innerText();
  expect(pageNumberAfterClickingPrev).toEqual("1");
});
