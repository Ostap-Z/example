import BaseComponent from '@components/base.component';
import { type Locator } from '@playwright/test';

import { step } from 'src/decorators/step';

class ProductsComponent extends BaseComponent {
  protected override readonly rootLocator: Locator = this.page.locator('.product-list');

  @step()
  public async openByName(name: string): Promise<void> {
    await this.expectLoaded({ timeout: 15_000 });
    await this.rootLocator.getByRole('link', { name: name }).click();
  }
}

export default ProductsComponent;
