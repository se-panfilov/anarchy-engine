import { defineConfig, devices } from '@playwright/test';

import { nodeEnv } from './src/env';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './src',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: nodeEnv.CI,
  /* Retry on CI only */
  retries: nodeEnv.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: nodeEnv.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { outputFolder: 'reports/e2e/playwright-report', open: 'never' }]],
  outputDir: 'reports/e2e/test-results/',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: `http://localhost:${nodeEnv.PORT}`,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'web', //chromium
      testDir: './src/web',
      use: { ...devices['Desktop Chrome'] }
    },

    {
      name: 'electron',
      testDir: './src/desktop'
    }

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    //
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start:e2e-server',
  //   url: `http://localhost:${nodeEnv.PORT}`,
  //   reuseExistingServer: !nodeEnv.CI
  // }

  webServer: {
    command: 'npm run start:e2e-server',
    // command: `node_modules/.bin/vite --mode e2e --port ${nodeEnv.PORT}`,
    port: nodeEnv.PORT,
    timeout: 5 * 1000,
    reuseExistingServer: !nodeEnv.CI
  }
});
