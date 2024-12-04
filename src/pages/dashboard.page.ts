import { step } from 'src/decorators/step';
import { expect, type Locator } from '@playwright/test';

import BasePage from '@pages/base.page';

class DashboardPage extends BasePage {
  public override readonly url = 'dashboard';
  private readonly customerSection: Locator = this.page.locator('.customer');

  @step()
  public override async expectLoaded(options?: {
    message?: string;
    timeout?: number;
  }): Promise<void> {
    const expectMessage = options?.message ?? 'Dashboard page is not opened';
    const expectTimeout = options?.timeout ?? 15_000;

    await expect(this.customerSection, expectMessage).toBeVisible({
      timeout: expectTimeout,
    });
  }
}

export default DashboardPage;
