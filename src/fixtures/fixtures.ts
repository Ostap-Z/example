import { randomUUID } from 'node:crypto';

import { test } from '@playwright/test';

import { UserCreateResponse, UserCreateRequest } from 'src/api/models/auth/register.model';
import Application from 'src/app/app';

interface DefaultUserOption {
  defaultUser: {
    email: string;
    password: string;
  };
}

interface UserContext {
  user: { userModel: UserCreateRequest; createdUser: UserCreateResponse };
}

const appFixture = test.extend<{ app: Application }>({
  app: [
    async ({ page }, use) => {
      const app = new Application(page);
      await use(app);
    },
    { auto: true },
  ],
});

const loggedInWithDefaultUserFixture = appFixture.extend<DefaultUserOption & { app: Application }>({
  defaultUser: [
    { email: 'zherebetskyiq7@gamil.com', password: 'AAA!1234567890' },
    { option: true },
  ],

  app: async ({ app, defaultUser }, use) => {
    await app.loginPage.open();
    await app.loginPage.login(defaultUser);
    await app.dashboardPage.expectLoaded();

    await use(app);
  },
});

const loggedInWithNewUserFixture = appFixture.extend<UserContext>({
  user: [
    async ({ app }, use) => {
      const userModel: UserCreateRequest = {
        isSubscribed: false,
        email: `test+${randomUUID()}@test.com`,
        firstName: 'John',
        lastName: 'Doe',
        password: 'AAA!1234567890',
      };

      const createdUser: UserCreateResponse = await app.api.authService.register(userModel);
      await app.headlessLogin(userModel);

      await use({ userModel, createdUser });
    },
    { auto: true },
  ],
});

export { appFixture, loggedInWithDefaultUserFixture, loggedInWithNewUserFixture };
