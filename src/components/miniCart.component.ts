import BaseComponent from '@components/base.component';
import { type Locator } from '@playwright/test';
import { step } from 'src/reporter/step';

class CartComponent extends BaseComponent {
  protected override readonly rootLocator: Locator = this.page.locator('.mini-cart');
  private readonly placeOrderButton: Locator = this.rootLocator.getByRole('button', {
    name: 'Place Order',
  });

  @step()
  public async proceedToPlaceOrder(): Promise<void> {
    await this.expectLoaded();
    await this.placeOrderButton.click();
  }
}

export default CartComponent;
