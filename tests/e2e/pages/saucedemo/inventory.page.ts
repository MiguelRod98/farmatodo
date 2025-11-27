import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

interface ProductInfo {
  name: string;
  price: string;
}

export class InventoryPage extends BasePage {
  readonly cartLink: Locator;

  constructor(page: Page) {
    super(page);
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async addProductToCart(productName: string): Promise<ProductInfo> {
    const product = this.page.locator('.inventory_item').filter({ hasText: productName });
    const name = await product.locator('.inventory_item_name').textContent();
    const price = await product.locator('.inventory_item_price').textContent();
    await product.locator('button[id*="add-to-cart"]').click();
    const productInfo = { name: name!, price: price! };
    console.log(`🛍️ Product added: ${productInfo.name} - ${productInfo.price}`);
    return productInfo;
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }

  async addFleeceJacketToCartAndValidate(cartPage: any): Promise<void> {
    const productName = 'Sauce Labs Fleece Jacket';
    const productInfo = await this.addProductToCart(productName);
    await this.goToCart();
    await cartPage.validateCartItem(productName, productInfo);
  }
}