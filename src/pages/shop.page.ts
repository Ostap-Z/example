import { step } from 'src/decorators/step';
import BasePage from '@pages/base.page';
import ProductsComponent from '@components/products.component';

class ShopPage extends BasePage {
  public override readonly url = 'shop';
  public readonly products = new ProductsComponent(this.page);

  @step()
  public override async expectLoaded(options?: {
    message?: string;
    timeout?: number;
  }): Promise<void> {
    const expectMessage = options?.message ?? 'Shop page is not opened';
    const expectTimeout = options?.timeout ?? 15_000;

    await this.products.expectLoaded({ message: expectMessage, timeout: expectTimeout });
  }
}

export default ShopPage;
