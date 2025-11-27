import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

interface ProductInfo {
  name: string;
  price: string;
}

export class CartPage extends BasePage {
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.checkoutButton = page.locator('#checkout');
  }

  async getCartItem(productName: string): Promise<ProductInfo> {
    const item = this.page.locator('.cart_item').filter({ hasText: productName });
    const name = await item.locator('.inventory_item_name').textContent();
    const price = await item.locator('.inventory_item_price').textContent();
    return { name: name!, price: price! };
  }

  async validateCartItem(productName: string, expectedProduct: ProductInfo): Promise<void> {
    const cartInfo = await this.getCartItem(productName);
    expect(cartInfo.name).toBe(expectedProduct.name);
    expect(cartInfo.price).toBe(expectedProduct.price);
    console.log('🛒 Cart validation successful - Product details match');
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}