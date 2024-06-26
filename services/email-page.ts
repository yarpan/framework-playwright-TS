import { Locator, Page } from "@playwright/test";
import emailData from '../test-data/email-data.json';

const url = "http://email";

export class EmailPage {
  readonly page: Page;
  readonly resetPasswordLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.resetPasswordLink = this.page.locator(emailData.locatorResetPasswordLink);
  }

  async renderContent(content: string) {
    await this.page.route(url, (route) => {
      route.fulfill({ body: content });
    });
    await this.page.goto(url);
  }

  async clickResetPasswordLink() {
    await this.resetPasswordLink.click();
    await this.page.waitForLoadState();
  }
}
