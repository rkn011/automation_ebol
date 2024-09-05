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


test('Create a template', async ({ page }) => {
  await page.locator('nobr').filter({ hasText: 'EBOL' }).locator('nobr').click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'BOL Template Master' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('combobox').selectOption('SHPX');
  await page1.getByRole('link', { name: 'Add', exact: true }).click();
  await page1.locator('input[name="RWCCode"]').click();
  await page1.locator('input[name="RWCCode"]').fill('Test Template Name 2');
  await page1.locator('input[name="ediToRoad"]').click();
  await page1.locator('input[name="ediToRoad"]').fill('BNSF');
  const page2Promise = page1.waitForEvent('popup');
  await page1.locator('.row > a').first().click();
  const page2 = await page2Promise;
  await page2.getByRole('radio').check();
  await page2.getByRole('link', { name: 'Close' }).click();
  await page1.locator('input[name="fromRoad"]').click();
  await page1.locator('input[name="fromRoad"]').fill('BNSF');
  const page3Promise = page1.waitForEvent('popup');
  await page1.locator('#templateEditRow1').getByRole('link').first().click();
  const page3 = await page3Promise;
  await page3.getByRole('radio').check();
  await page3.getByRole('link', { name: 'Close' }).click();
  await page1.locator('input[name="fromFSAC"]').click();
  await page1.locator('input[name="fromFSAC"]').fill('3669');
  const page4Promise = page1.waitForEvent('popup');
  await page1.locator('#templateEditRow1').getByRole('link').nth(2).click();
  const page4 = await page4Promise;
  await page4.getByRole('radio').check();
  await page4.getByRole('link', { name: 'Close' }).click();
  await page1.locator('input[name="toRoad"]').click();
  await page1.locator('input[name="toRoad"]').fill('BNSF');
  const page5Promise = page1.waitForEvent('popup');
  await page1.locator('#templateEditRow1').getByRole('link').nth(1).click();
  const page5 = await page5Promise;
  await page5.getByRole('radio').check();
  await page5.getByRole('link', { name: 'Close' }).click();
  await page1.locator('input[name="toFSAC"]').click();
  await page1.locator('input[name="toFSAC"]').fill('36');
  const page7Promise = page1.waitForEvent('popup');
  await page1.locator('#templateEditRow1').getByRole('link').nth(3).click();
  const page7 = await page7Promise;
  await page7.getByRole('row', { name: 'ACHEE BNSF 36027 LA 657609000' }).getByRole('radio').check();
  await page7.getByRole('link', { name: 'Close' }).click();
  await page1.locator('select[name="vecForRouteGrid\\[0\\]\\.AS"]').selectOption('S');
  await page1.locator('input[name="vecForRouteGrid\\[0\\]\\.roadId"]').click();
  await page1.locator('input[name="vecForRouteGrid\\[0\\]\\.roadId"]').fill('BNSF');
  const page8Promise = page1.waitForEvent('popup');
  await page1.locator('#templateRouteInfo div').filter({ hasText: '1 A/S: * A - ORIGIN CARRIER' }).getByRole('link').click();
  const page8 = await page8Promise;
  await page8.getByRole('radio').check();
  await page8.getByRole('link', { name: 'Close' }).click();
  await page1.getByRole('link', { name: 'Save' }).click();
  await expect(page1.locator('form[name="rwcPrimaryDetailsFormBean"]')).toContainText('Data saved successfully');
  await page1.getByRole('link', { name: 'Cancel' }).click();
  await page1.locator('input[name="RWCSearchCriteria"]').click();
  await page1.locator('input[name="RWCSearchCriteria"]').fill('TEST Template name 2');
  await page1.getByRole('link', { name: 'Find' }).click();
  await expect(page1.locator('#searchResultTbl')).toContainText('TEST TEMPLATE NAME 2');

});

test('Edit a template', async ({ page }) => {
  await page.locator('nobr').filter({ hasText: 'EBOL' }).locator('nobr').click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'BOL Template Master' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('combobox').selectOption('SHPX');
 
  await page1.locator('input[name="RWCSearchCriteria"]').click();
  await page1.locator('input[name="RWCSearchCriteria"]').fill('TEST Template name 2');
  await page1.getByRole('link', { name: 'Find' }).click();
  await expect(page1.locator('#searchResultTbl')).toContainText('TEST TEMPLATE NAME 2');

  await page1.getByRole('link', { name: 'TEST TEMPLATE NAME' }).click();
  await page1.getByRole('link', { name: 'Freight' }).click();
  await page1.locator('select[name="paymentMethodCode"]').selectOption('NR');
  await page1.locator('select[name="shipmentWeightCode"]').selectOption('N');
  await page1.getByRole('link', { name: 'Save' }).click();
  await expect(page1.locator('form[name="RWCChargesFormBean"]')).toContainText('Data saved successfully');

});

test('Delete a template', async ({ page }) => {
  await page.locator('nobr').filter({ hasText: 'EBOL' }).locator('nobr').click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'BOL Template Master' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('combobox').selectOption('SHPX');
 
  await page1.locator('input[name="RWCSearchCriteria"]').click();
  await page1.locator('input[name="RWCSearchCriteria"]').fill('TEST Template name 2');
  await page1.getByRole('link', { name: 'Find' }).click();
  await expect(page1.locator('#searchResultTbl')).toContainText('TEST TEMPLATE NAME 2');

  await page1.getByRole('link', { name: 'TEST TEMPLATE NAME' }).click();

  await page1.getByRole('link', { name: 'Inactivate' }).click();
  //await page1.getByRole('link', { name: 'Cancel' }).click();
  //await page1.locator('#activeSec div').filter({ hasText: 'Inactive' }).getByRole('radio').check();
  //await page1.locator('input[name="RWCFormBeans\\[0\\]\\.templateSelected"]').check();
  // page1.once('dialog', dialog => {console.log(`Dialog message: ${dialog.message()}`);
  //   dialog.dismiss().catch(() => {});
  // });
  page1.on('dialog', dialog => dialog.accept());
  await page1.getByRole('Ok').click();

  await page1.getByRole('link', { name: 'Delete' }).click();
  await expect(page1.locator('#eboWaybillSearchTpl')).toContainText('TEST TEMPLATE NAME 2 template deleted successfully. No records found');
  
});


test('Create BOL', async ({ page }) => {
  await page.getByRole('treeitem', { name: 'EBOL' }).getByRole('img').first().click();
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Create BOL', exact: true }).click();
  
  const page2 = await page2Promise;
  await page2.locator('select[name="shipperSearchList"]').selectOption('SHPX');
  await page2.locator('textarea[name="equipmentInitial"]').click();
  await page2.locator('textarea[name="equipmentInitial"]').fill('TEST 123456');
  
  const page3Promise = page2.waitForEvent('popup');
  await page2.locator('#quickCreate').getByRole('link').click();
  const page3 = await page3Promise;
  await page3.getByRole('row', { name: 'CN TEST SANDFRAC2040MES' }).getByRole('radio').check();
  await page3.getByRole('link', { name: 'Close' }).click();
  await page2.locator('input[name="bolNumber"]').click();
  await page2.locator('input[name="bolNumber"]').fill('TEST BOL1');
  await page2.getByRole('button', { name: 'Quick Create' }).click();
  await expect(page2.locator('#searchResult')).toContainText('Total Items: 1');
 
});

 test('Search and Transmit BOL', async ({ page }) => {
   await page.getByRole('treeitem', { name: 'EBOL' }).getByRole('img').first().click();
   const pagePromise = page.waitForEvent('popup');
   await page.getByRole('treeitem', { name: 'Search BOL' }).locator('td').nth(3).click();
   const page1 = await pagePromise;
   await page1.locator('select[name="shipperSearch"]').selectOption('SHPX');

   await page1.getByRole('link', { name: 'Find' }).click();
   await page1.locator('.dataOff > td').first().click();
   const page2Promise = page1.waitForEvent('popup');
   page1.getByRole('link',{name:'Transmit',exact:true}).click();
  const page2 =await page2Promise;
  await page2.getByRole('link',{name:'OK'}).click();
 });

 test('Add Patron Master', async ({ page }) => {
   await page.getByRole('treeitem', { name: 'EBOL' }).getByRole('img').first().click();
   const pagePromise = page.waitForEvent('popup');
   await page.getByRole('treeitem', { name: 'Patron Master V2' }).locator('td').nth(3).click();
  
   const page1 = await pagePromise;
   await page1.locator('#shipperSearch').selectOption('SHPX');
   await page1.getByRole('link', { name: 'Add', exact: true }).click();
   await page1.locator('#patronId').click();
   await page1.locator('#patronId').fill('TEST Patron ID');
   await page1.locator('#patronName').click();
   await page1.locator('#patronName').fill('Test Patron Name');
   await page1.locator('#address1').click();
   await page1.locator('#address1').fill('Address 1');
   await page1.locator('#address1').press('ArrowRight');
   await page1.getByText('State/Prov: AARHUS - AAR').click();
   await page1.locator('#state').selectOption('AAR');
   await page1.locator('#city').click();
   await page1.locator('#city').fill('City 1');
   await page1.getByRole('link', { name: 'Save' }).click();
   await expect(page1.locator('#view-edit-patron-info')).toContainText('Data saved successfully');

 });

 test('Edite Patron Master', async ({ page }) => {
   test.setTimeout(50000);
   await page.getByRole('treeitem', { name: 'EBOL' }).getByRole('img').first().click();
   const pagePromise = page.waitForEvent('popup');
   await page.getByRole('treeitem', { name: 'Patron Master V2' }).locator('td').nth(3).click();

   const page1 = await pagePromise;

   await page1.locator('#shipperSearch').selectOption('SHPX');
   await page1.locator('#patronID').fill('TEST Patron ID');
   await page1.getByRole('link', { name: 'Find' }).click();
   await page1.getByRole('radio').check();
   await page1.getByRole('link', { name: 'Edit' }).click();
   await page1.locator('#patronName').fill('TEST PATRON NAME 23');
   await page1.locator('#address1').fill('Address 23');
   await page1.locator('#city').fill('City 23');
   await page1.getByRole('link', { name: 'Save' }).click();

   await expect(page1.locator('#view-edit-patron-info')).toContainText('Data saved successfully');

 });

 test('Delete Patron Master', async ({ page }) => {
   test.setTimeout(50000);
   await page.getByRole('treeitem', { name: 'EBOL' }).getByRole('img').first().click();
   const pagePromise = page.waitForEvent('popup');
   await page.getByRole('treeitem', { name: 'Patron Master V2' }).locator('td').nth(3).click();
  
   const page1 = await pagePromise;

   await page1.locator('#shipperSearch').selectOption('SHPX');
   await page1.locator('#patronID').fill('TEST Patron ID');
   await page1.getByRole('link', { name: 'Find' }).click();
   await page1.getByRole('radio').check();
  await page1.getByRole('link', { name: 'Delete' }).click();

  await expect(page1.locator('#view-edit-patron-info')).toContainText('Data saved successfully');

 });


