import { type Page } from '@playwright/test';
import { step } from 'src/reporter/step';

abstract class BasePage {
  public abstract readonly url: string;
  public abstract expectLoaded(options?: { message?: string; timeout?: number }): Promise<void>;

  public constructor(protected readonly page: Page) {}

  @step()
  public async open(url?: string): Promise<void> {
    await this.page.goto(url ?? this.url);
    await this.expectLoaded();
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

export default BasePage;
