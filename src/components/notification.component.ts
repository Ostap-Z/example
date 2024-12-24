import BaseComponent from '@components/base.component';
import { expect, type Locator } from '@playwright/test';
import { step } from 'src/reporter/step';

class NotificationComponent extends BaseComponent {
  protected override readonly rootLocator: Locator = this.page.locator('.notification');

  @step()
  async expectHasHeading(heading: string): Promise<void> {
    await this.expectLoaded();
    await expect(this.rootLocator.getByRole('heading', { name: heading })).toBeVisible();
  }

  @step()
  async expectHasHeading1(heading: string): Promise<void> {
    await this.expectLoaded();
    await expect(this.rootLocator.getByRole('heading', { name: heading })).toBeVisible();
  }
}

export default NotificationComponent;
