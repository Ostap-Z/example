import { expect, type Locator, type Page } from '@playwright/test';
import { step } from 'src/reporter/step';

abstract class BaseComponent {
  protected abstract readonly rootLocator: Locator;

  public constructor(protected readonly page: Page) {}

  @step()
  public async expectLoaded(options?: { message?: string; timeout?: number }): Promise<void> {
    const expectMessage = options?.message ?? `${this.constructor.name} is not loaded`;
    const expectTimeout = options?.timeout ?? 10_000;

    await expect(this.rootLocator, expectMessage).toBeVisible({ timeout: expectTimeout });
  }

  @step()
  public async isLoaded(): Promise<boolean> {
    try {
      await this.expectLoaded();
      return true;
    } catch {
      return false;
    }
  }
}

export default BaseComponent;
