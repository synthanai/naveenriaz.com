import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  testMatch: ['prime_*_flow.spec.js'],
  timeout: 180000,
  reporter: 'line',
  use: {
    baseURL: 'http://127.0.0.1:4330',
    headless: true
  },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 4330',
    url: 'http://127.0.0.1:4330',
    reuseExistingServer: false,
    timeout: 180000
  }
});
