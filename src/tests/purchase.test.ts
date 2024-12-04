import { loggedInWithNewUserFixture } from 'src/fixtures/fixtures';

loggedInWithNewUserFixture.describe('Purchase', () => {
  loggedInWithNewUserFixture('Logged in user can buy a single product', async ({ app }) => {
    await app.shopPage.open();
    await app.shopPage.products.openByName('CHERRY TOMATOES By Nizhyn');
    await app.productPage.addToCart();
    await app.productPage.miniCart.proceedToPlaceOrder();
    await app.orderPage.expectOrderIsCompleted();
  });

  loggedInWithNewUserFixture('Logged in user can buy multiply products', async ({ app }) => {
    await app.shopPage.open();
    await app.shopPage.products.openByName('CHERRY TOMATOES By Nizhyn');
    await app.productPage.addToCart();

    await app.shopPage.open();
    await app.shopPage.products.openByName('MARINATED CUCUMBERS NEZHIN STYLE');
    await app.productPage.addToCart();

    await app.productPage.miniCart.proceedToPlaceOrder();
    await app.orderPage.expectOrderIsCompleted();
  });
});
