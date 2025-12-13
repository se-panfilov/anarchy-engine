import { expect, test } from '@playwright/test';

const VIEWPORT = { width: 800, height: 600 };

const GAME_URL = `http://localhost:${process.env.PORT}`;

test.use({ viewport: VIEWPORT });

test('Save and load scene (no changes)', async ({ page }) => {
  await page.goto(GAME_URL);

  await page.waitForTimeout(500);

  // Take reference screenshot before saving
  await expect(page).toHaveScreenshot('scene-before-save.png');

  // Trigger save and load
  // await page.click('#save-button');
  // await page.click('#load-button');
  // await page.getByRole('button', { name: /save/i }).click();
  await page.getByRole('button', { name: 'Save' }).click();
  // await page.getByText('Save').click();

  await page.waitForTimeout(500);

  // Take screenshot after load
  await expect(page).toHaveScreenshot('scene-after-load.png');
});

// test('Test 2 — Save and Load after modifying actor', async ({ page }) => {
//   await page.goto(GAME_URL);
//
//   // TODO get actor here
//   const moveButton = await page.getByRole('button', { name: /move actor/i });
//   await moveButton.click();
//
//   await page.waitForTimeout(500);
//
//   await expect(page).toHaveScreenshot('scene-before-save-moved');
//
//   await page.getByRole('button', { name: /save/i }).click();
//   await page.getByRole('button', { name: /load/i }).click();
//
//   await page.waitForTimeout(500);
//
//   await expect(page).toHaveScreenshot('scene-after-load-moved');
// });
