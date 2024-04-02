import { test, expect } from "@playwright/test";
import { ContactsPage } from "../pages/contacts";
import { MainEnPage } from "../pages/main";
import testSuiteBodyLinks from "../pages/contacts.BodyLinks.json";
import testSuiteLeftMenu from "../pages/contacts.LeftMenu.json";

test("Check BackToMainPage Button", async ({ page }) => {
  const contactUsPage = new ContactsPage(page);
  await contactUsPage.goto();
  await contactUsPage.isPageLoaded();
  await contactUsPage.clickButtonBack();

  const wikiEnMainPage = new MainEnPage(page);
  await wikiEnMainPage.isPageLoaded();
  await expect(page).toHaveScreenshot();
});

test.describe("Check Body Links - DataDriven by JSON", () => {
  for (const testCase of testSuiteBodyLinks) {
    test(testCase.testName, async ({ page }) => {
      console.log("Test Case: " + testCase.testName);
      const contactUsPage = new ContactsPage(page);
      await contactUsPage.goto();
      await contactUsPage.isPageLoaded();
      await contactUsPage.validateLink(testCase.linkLocator, testCase.linkUri);
    });
  }
});

test.describe("Check Left Menu Items - DataDriven by JSON", () => {
  for (const testCase of testSuiteLeftMenu) {
    test(testCase.testName, async ({ page }) => {
      console.log("Test Case: " + testCase.testName);
      const contactUsPage = new ContactsPage(page);
      await contactUsPage.goto();
      await contactUsPage.isPageLoaded();

      await contactUsPage.openSubPage(testCase.subPageLocator);
      await contactUsPage.isSubPageLoaded(
        testCase.subPageUrl,
        testCase.subPageTitle,
        testCase.subPageUniqueText
      );
    });
  }
});
