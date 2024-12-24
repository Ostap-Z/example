import DashboardPage from '@pages/dashboard.page';
import LoginPage from '@pages/login.page';
import OrderPage from '@pages/order.page';
import ProductPage from '@pages/product.page';
import ShopPage from '@pages/shop.page';
import { type Page } from '@playwright/test';
import API from 'src/api/api';
import PlaywrightClient from 'src/api/clients/playwright.client';
import { LoginRequest } from 'src/api/models/auth/login.model';
import { step } from 'src/reporter/step';
import logger from 'logger';

class Application {
  public readonly shopPage = new ShopPage(this.page);
  public readonly loginPage = new LoginPage(this.page);
  public readonly productPage = new ProductPage(this.page);
  public readonly orderPage = new OrderPage(this.page);
  public readonly dashboardPage = new DashboardPage(this.page);
  public readonly api = new API(new PlaywrightClient(this.page.request));

  public constructor(private readonly page: Page) {}

  @step()
  public async headlessLogin(data: LoginRequest): Promise<void> {
    logger.info(`Attempting headless login with data: ${JSON.stringify(data)}`);
    const { token } = await this.api.authService.login(data);
    logger.info(`Login successful, received token: ${token}`);
    await this.setToken(token);
  }

  private async setToken(token: string): Promise<void> {
    logger.info(`Setting token in localStorage: ${token}`);
    await this.page.goto('/', { waitUntil: 'commit' });
    await this.page.evaluate((_token) => localStorage.setItem('token', _token), token);
    logger.info(`Token set in localStorage successfully`);
  }
}

export default Application;