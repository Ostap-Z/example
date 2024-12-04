import { expect, type Locator } from '@playwright/test';
import { step } from 'src/decorators/step';

import BasePage from '@pages/base.page';

class OrderPage extends BasePage {
  public override readonly url = 'order';
  private readonly orderMessageHeading: Locator = this.page.getByRole('heading', {
    name: 'Thank you for your order.',
  });

  @step()
  public override async expectLoaded(options?: {
    message?: string;
    timeout?: number;
  }): Promise<void> {
    const expectMessage = options?.message ?? 'Order page is not opened';
    const expectTimeout = options?.timeout ?? 10_000;

    await expect(this.orderMessageHeading, expectMessage).toBeVisible({
      timeout: expectTimeout,
    });
  }

  @step()
  public async expectOrderIsCompleted(): Promise<void> {
    await expect(this.orderMessageHeading).toBeVisible();
  }
}

export default OrderPage;
