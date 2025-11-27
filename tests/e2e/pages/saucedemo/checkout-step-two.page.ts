import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutStepTwoPage extends BasePage {
  readonly finishButton: Locator;

  constructor(page: Page) {
    super(page);
    this.finishButton = page.locator('#finish');
  }

  async finishOrder(): Promise<void> {
    await this.finishButton.click();
    console.log('🔄 Order processing initiated');
  }
}