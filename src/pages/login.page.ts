import { expect, type Locator } from '@playwright/test';
import { step } from 'src/decorators/step';

import BasePage from '@pages/base.page';

class LoginPage extends BasePage {
  public override readonly url = 'login';

  private readonly emailInput: Locator = this.page
    .getByRole('main')
    .getByPlaceholder('Please Enter Your Email');
  private readonly passwordInput: Locator = this.page.getByPlaceholder(
    'Please Enter Your Password',
  );
  private readonly loginButton: Locator = this.page.getByRole('button', { name: 'Login' });

  @step()
  public override async expectLoaded(options?: {
    message?: string;
    timeout?: number;
  }): Promise<void> {
    const expectMessage = options?.message ?? 'Login page is not opened';
    const expectTimeout = options?.timeout ?? 10_000;

    await expect(this.loginButton, expectMessage).toBeVisible({
      timeout: expectTimeout,
    });
  }

  @step()
  public async login(user: { email: string; password: string }): Promise<void> {
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.loginButton.click();
  }
}

export default LoginPage;
