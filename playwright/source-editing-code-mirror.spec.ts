import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForFunction(() => window.editor !== undefined);
});

test('CodeMirror initializes in source mode', async ({ page }) => {
    await page.click('button.ck-source-editing-button');

    const cm = await page.waitForSelector('.cm-wrapper');
    expect(cm).not.toBeNull();
});

test('CodeMirror destroys when leaving source mode', async ({ page }) => {
    await page.click('button.ck-source-editing-button');
    await page.waitForSelector('.cm-wrapper');

    await page.click('button.ck-source-editing-button');

    const exists = await page.$('.cm-wrapper');
    expect(exists).toBeNull();
});

test('CodeMirror shows gutter when enabled', async ({ page }) => {
    // Enter source editing mode
    await page.click('button.ck-source-editing-button');
    await page.waitForSelector('.cm-wrapper');

    // Assert gutter exists
    const gutter = await page.locator('.cm-gutters').count();
    expect(gutter).toBeGreaterThan(0);
});

test('CodeMirror renders formatted lines', async ({ page }) => {
    // Enter source editing mode
    await page.click('button.ck-source-editing-button');
    await page.waitForSelector('.cm-wrapper');

    // Ensure CodeMirror content exists
    await page.waitForSelector('.cm-content');

    // Check that at least one formatted line exists
    const lineCount = await page.locator('.cm-content .cm-line').count();
    expect(lineCount).toBeGreaterThan(0);
});

test('CodeMirror syncs data back to CKEditor', async ({ page }) => {
    // Enter source editing mode
    await page.click('button.ck-source-editing-button');
    await page.waitForSelector('.cm-wrapper');

    // Focus CodeMirror by clicking a real line
    await page.locator('.cm-line').first().click();

    // Insert a block CKEditor will preserve
    await page.keyboard.type('<p>test</p>');

    // Exit source editing mode
    await page.click('button.ck-source-editing-button');

    // Get CKEditor data
    const data = await page.evaluate(() => window.editor.getData());

    // Assert the update happened
    expect(data).toContain('<p>test</p>');
});