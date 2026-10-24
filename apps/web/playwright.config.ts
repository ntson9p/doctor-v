import { defineConfig, devices } from '@playwright/test';

// End-to-end checks on the built site (docs/plan.md §3.4: phones first, 320 px, large text).
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  reporter: 'list',
  use: { baseURL: 'http://localhost:4321', trace: 'retain-on-failure' },
  webServer: {
    command: 'npm run build && npx astro preview --port 4321',
    url: 'http://localhost:4321',
    // Always build and serve afresh: a leftover server would test a stale build.
    reuseExistingServer: false,
    timeout: 240_000,
  },
  projects: [
    { name: 'phone', use: { ...devices['Pixel 5'] } },
    { name: 'narrow-320', use: { ...devices['Pixel 5'], viewport: { width: 320, height: 640 } } },
  ],
});
