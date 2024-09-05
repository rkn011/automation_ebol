import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://sxstg.shipxpress.net/');
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('eboladmin');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Jc6MEpI@');
  await page.getByRole('button', { name: 'Sign In' }).click();
  expect(page).toHaveTitle('KALERIS iTrax Application');

});


test('Navigate to Create BOl screen', async ({ page }) => {
  await page.getByRole('treeitem', { name: 'EBOL' }).getByRole('img').first().click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Create BOL', exact: true }).click();
  const page1 = await page1Promise;
  await expect(page1.locator('#pageTl')).toContainText('BOL Processing');
});

test('Navigate to Create BOl from excel screen', async ({ page }) => {
  await page.getByRole('treeitem', { name: 'EBOL' }).getByRole('img').first().click();
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Create BOL From Excel', exact: true }).click();
  const page2 = await page2Promise;
  await expect(page2.locator('h3')).toContainText('BOL Creation from Excel');
});

test('Navigate to ebol sysadmin screen', async ({ page }) => {
  await page.getByRole('treeitem', { name: 'EBOL' }).getByRole('img').first().click();
  const page3Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'EBOL System Admin', exact: true }).click();
  const page3 = await page3Promise;
  await expect(page3.locator('#pageTl')).toContainText('Converge utility master administration');
});

test('Navigate to ebol sysadmin V2 screen', async ({ page }) => {
  await page.getByRole('treeitem', { name: 'EBOL' }).getByRole('img').first().click();
  const page4Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'EBOL System Admin V2', exact: true }).click();
  const page4 = await page4Promise;
  await expect(page4.locator('#pageTl')).toContainText('Converge utility master administration');
});

test('Navigate to Search BOL screen', async ({ page }) => {
  await page.getByRole('treeitem', { name: 'EBOL' }).getByRole('img').first().click();
  const page5Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Search BOL', exact: true }).click();
  const page5 = await page5Promise;
  await expect(page5.getByRole('heading')).toContainText('BOL Search');
});

test('Navigate to Patron Master screen', async ({ page }) => {
  await page.getByRole('treeitem', { name: 'EBOL' }).getByRole('img').first().click();
  const page6Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Patron Master', exact: true }).click();
  const page6 = await page6Promise;
  await expect(page6.getByRole('heading')).toContainText('Patron Search');
});

test('Navigate to Patron Master V2 screen', async ({ page }) => {
  await page.getByRole('treeitem', { name: 'EBOL' }).getByRole('img').first().click();
  const page7Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Patron Master V2', exact: true }).click();
  const page7 = await page7Promise;
  await expect(page7.getByRole('heading')).toContainText('Patron Search');
});

test('Navigate to template Master screen', async ({ page }) => {
  await page.getByRole('treeitem', { name: 'EBOL' }).getByRole('img').first().click();
  const page8Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'BOL Template Master', exact: true }).click();
  const page8 = await page8Promise;
  await expect(page8.getByRole('heading')).toContainText('Template Search');
});

test('Navigate to Unit Train Search screen', async ({ page }) => {
  await page.getByRole('treeitem', { name: 'EBOL' }).getByRole('img').first().click();
  const page9Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Unit Train Search', exact: true }).click();
  const page9 = await page9Promise;
  await expect(page9.getByRole('heading')).toContainText('Unit Train Search');
});

