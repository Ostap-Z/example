import { defineConfig, devices } from '@playwright/test';
import { gitStatus } from 'src/reporter/metadata';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './src/tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: Boolean(process.env.CI),
  /* Retry on CI only */
  retries: 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? parseInt(process.env.CORES || '1') : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
  metadata: gitStatus(),
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://shopdemo-alex-hot.koyeb.app',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   Name: 'Mobile Chrome',
    //   Use: { ...devices['Pixel 5'] },
    // },
    // {
    //   Name: 'Mobile Safari',
    //   Use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   Name: 'Microsoft Edge',
    //   Use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   Name: 'Google Chrome',
    //   Use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // WebServer: {
  //   Command: 'npm run start',
  //   Url: 'http://127.0.0.1:3000',
  //   ReuseExistingServer: !process.env.CI,
  // },
});
