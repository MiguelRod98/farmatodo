import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/saucedemo/login.page';
import { InventoryPage } from '../pages/saucedemo/inventory.page';
import { CartPage } from '../pages/saucedemo/cart.page';
import { CheckoutPage } from '../pages/saucedemo/checkout.page';
import { CheckoutStepTwoPage } from '../pages/saucedemo/checkout-step-two.page';
import { CheckoutCompletePage } from '../pages/saucedemo/checkout-complete.page';

type PageObjects = {
  login: LoginPage;
  inventory: InventoryPage;
  cart: CartPage;
  checkout: CheckoutPage;
  checkoutStepTwo: CheckoutStepTwoPage;
  checkoutComplete: CheckoutCompletePage;
};

type TestFixtures = {
  pages: PageObjects;
};

export const test = base.extend<TestFixtures>({
  pages: async ({ page }, use) => {
    const pages = {
      login: new LoginPage(page),
      inventory: new InventoryPage(page),
      cart: new CartPage(page),
      checkout: new CheckoutPage(page),
      checkoutStepTwo: new CheckoutStepTwoPage(page),
      checkoutComplete: new CheckoutCompletePage(page),
    };
    await use(pages);
  },
});

export { expect } from '@playwright/test';