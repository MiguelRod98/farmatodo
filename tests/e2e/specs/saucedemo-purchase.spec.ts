import { test, expect } from '../fixtures/pages.fixture';

test.describe('SauceDemo E2E Purchase Flow', () => {
  test('Complete purchase flow for Sauce Labs Fleece Jacket', async ({ pages }) => {
    await test.step('Navigate and login', async () => {
      await pages.login.navigate();
      await pages.login.login('standard_user', 'secret_sauce');
      await pages.login.verifyLoginSuccess();
    });

    await test.step('Add product to cart and validate', async () => {
      await pages.inventory.addFleeceJacketToCartAndValidate(pages.cart);
    });

    await test.step('Complete checkout process', async () => {
      await pages.cart.proceedToCheckout();
      await pages.checkout.fillInformation('Miguel', 'Rodriguez', '25050051');
      await pages.checkoutStepTwo.finishOrder();
      await pages.checkoutComplete.verifyOrderComplete();
    });
  });
});