import { defineConfig, devices } from '@playwright/test';
import path from 'node:path';

import { nodeEnv } from './src/env';
import { fileURLToPath } from 'node:url';

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

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

    // Make sure screenshots will have the same size, regardless of monitor's scale factor (retina, etc.)
    deviceScaleFactor: 1,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry'
  },

  expect: {
    toHaveScreenshot: {
      // Make sure screenshots will be compared the same way regardless of monitor's scale factor (retina, etc.)
      scale: 'css'
    }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'web', //chromium
      testDir: './src/web',
      use: { ...devices['Desktop Chrome'] },

      snapshotDir: path.resolve(__dirname, 'src', 'web')
    },

    {
      name: 'desktop',
      testDir: './src/desktop',
      // Screenshots go under src/desktop/<win|mac|linux>/...
      snapshotDir: path.resolve(__dirname, 'src', 'desktop', resolveDesktopSnapshotPlatform()),

      // Safety: ignore snapshot folders if they exist under src/desktop
      testIgnore: ['**/win/**', '**/mac/**', '**/linux/**']
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

function resolveDesktopSnapshotPlatform(): 'win' | 'mac' | 'linux' {
  const raw: string = (process.env.E2E_DESKTOP_PLATFORM || '').toLowerCase().trim();

  // Prefer explicit env (from CI), fall back to runtime platform (local runs).
  if (raw) {
    if (raw === 'win' || raw === 'windows' || raw === 'win32') return 'win';
    if (raw === 'mac' || raw === 'osx' || raw === 'darwin') return 'mac';
    if (raw === 'linux') return 'linux';
  }

  switch (process.platform) {
    case 'win32':
      return 'win';
    case 'darwin':
      return 'mac';
    default:
      return 'linux';
  }
}
