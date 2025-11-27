import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutCompletePage extends BasePage {
  readonly completeHeader: Locator;
  readonly completeText: Locator;

  constructor(page: Page) {
    super(page);
    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');
  }

  async verifyOrderComplete(): Promise<void> {
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
    console.log('✅ Order completed successfully');
  }
}