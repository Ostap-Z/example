import { expect } from '@playwright/test';
import { step } from 'src/decorators/step';

import CartComponent from '@components/miniCart.component';
import BasePage from '@pages/base.page';
import ReviewComponent from '@components/review.component';
import NotificationComponent from '@components/notification.component';

class ProductPage extends BasePage {
  public override readonly url = 'product';
  public readonly miniCart = new CartComponent(this.page);
  public readonly review = new ReviewComponent(this.page);
  public readonly notification = new NotificationComponent(this.page);

  private readonly addToCartButton = this.page.getByRole('button', { name: 'Add To Bag' });

  @step()
  public override async expectLoaded(options?: {
    message?: string;
    timeout?: number;
  }): Promise<void> {
    const expectMessage = options?.message ?? 'Product page is not opened';
    const expectTimeout = options?.timeout ?? 10_000;

    await expect(this.addToCartButton, expectMessage).toBeVisible({
      timeout: expectTimeout,
    });
  }

  @step()
  public async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }
}

export default ProductPage;
