import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './playwright',
    use: {
        headless: true,
        viewport: { width: 1280, height: 800 }
    },
    webServer: {
        command: 'npm run dev',
        port: 5173,
        reuseExistingServer: true
    }
});