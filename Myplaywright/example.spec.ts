import { test, expect } from '@playwright/test';
import { promises as fs } from 'fs';
import path from 'path';

 async function deleteReportFiles() {
    const reportDir = path.join(__dirname, 'reports');

   try {
        // Read the contents of the directory
        const files = await fs.readdir(reportDir);

        // Iterate over each file and delete it
        for (const file of files) {
            const filePath = path.join(reportDir, file);
             await fs.unlink(filePath); // Delete the file
        }

        console.log('All files in playwright-report have been deleted.');
    } catch (error) {
        console.error('Error deleting files:', error);
    }
}

test.beforeAll(async () => {
  console.log('Setting up before all tests');
  deleteReportFiles();
});


test.beforeEach(async ({ page }) => {
  await page.goto('https://sxstg.shipxpress.net/');
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('niroshan_rpmg');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('pLXXoCQj');
  await page.getByRole('button', { name: 'Sign In' }).click();
  
  await page.goto('https://stgportal.kaleris.net/#/home/management/1/YARD%20MANAGEMENT');
  await page.getByRole('link', { name: 'Electronic Bill of Lading' }).click();
  expect(page).toHaveTitle('KALERIS iTrax Application');

});

const BolNumber_1 = "Test BOl number 11";
const BolNumber_2 = "Test BOl number 12";
const BolNumber_3 = "Test BOl number 13";
const BolNumber_4 = "Test BOl number 14";

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

// test('Navigate to ebol sysadmin screen', async ({ page }) => {
//   await page.getByRole('treeitem', { name: 'EBOL' }).getByRole('img').first().click();
//   const page3Promise = page.waitForEvent('popup');
//   await page.getByRole('link', { name: 'EBOL System Admin', exact: true }).click();
//   const page3 = await page3Promise;
//   await expect(page3.locator('#pageTl')).toContainText('Converge utility master administration');
// });


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

test('Dynamic Pattern BOL create Advised Name', async ({ page }) => {
  //await page.getByRole('link', { name: 'Electronic Bill of Lading' }).click();
  await page.getByRole('treeitem', { name: 'EBOL' }).getByRole('img').first().click();
  await page.getByRole('link', { name: 'BOL Template Master', exact: true }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('treeitem', { name: 'BOL Template Master', exact: true }).getByRole('link').click();
  const page1 = await page1Promise;
  await page1.getByRole('link', { name: 'Find' }).click();
  await page1.getByRole('link', { name: 'Next' }).click();
  await page1.getByRole('link', { name: '11ICIMORRISONBAR' }).click();
  const page2Promise = page1.waitForEvent('popup');
  await page1.getByRole('link', { name: 'Dynamic Pattern' }).click();
  const page2 = await page2Promise;
  await page2.getByRole('row', { name: 'Advised Name Required' }).getByLabel('Required').check();
  await page2.getByRole('link', { name: 'Save' }).click();
  await expect(page2.locator('#eBolWrapper')).toContainText('Data saved successfully');
  await page2.getByRole('link', { name: 'Cancel' }).click();
  await page1.close();//------>close Template master Window
  const page3Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Create BOL', exact: true }).click();
  const page3 = await page3Promise;
  await page3.locator('#equipmentInitial').click();
  await page3.locator('#equipmentInitial').fill('TEST 123456');
  await page3.locator('#rwcCode').click();
  await page3.locator('#rwcCode').fill('11ICIMORRISONBAR');
  const page4Promise = page3.waitForEvent('popup');
  await page3.locator('#waybillAddFormBean').getByRole('link').click();
  const page4 = await page4Promise;
  await page4.locator('input[name="rwcRadio"]').check();
  await page4.getByRole('link', { name: 'Close' }).click();
  await page3.locator('#bolNumber').click();
  //await page3.locator('#bolNumber').fill('TEST BOL Number 1');
  await page3.locator('#bolNumber').fill(BolNumber_1);
  await page3.getByRole('button', { name: 'Quick Create' }).click();
  const page5Promise = page3.waitForEvent('popup');
  await page3.getByRole('row', { name: 'Advised Name' }).getByRole('link').click();
  const page5 = await page5Promise;
  await page5.getByRole('link', { name: 'Find' }).click();
  await page5.getByRole('row', { name: '3968 LINN, S.C 3968 LINN SC' }).getByRole('radio').check();
  await page5.getByRole('link', { name: 'Close' }).click();
  await page3.getByRole('button', { name: 'Proceed' }).click();
  await page3.waitForTimeout(3000);
  await page3.getByText(BolNumber_1).click();
  await page3.getByRole('link', { name: 'Other Parties' }).click();
  await expect(page3.locator('input[name="wbPartyFormBeans\\[6\\]\\.name"]')).toHaveValue('3968 LINN SC');
  await page3.getByRole('link', { name: 'Cancel' }).click();
  await page3.close();
  const page7Promise = page.waitForEvent('popup');
  await page.getByRole('treeitem', { name: 'BOL Template Master', exact: true }).getByRole('link').click();
  const page7 = await page7Promise;
  await page7.locator('#RWCSearchCriteria').click();
  await page7.locator('#RWCSearchCriteria').fill('11ICIMORRISONBAR');
  await page7.getByRole('link', { name: 'Find' }).click();
  await page7.getByRole('link', { name: '11ICIMORRISONBAR' }).click();
  const page8Promise = page7.waitForEvent('popup');
  await page7.getByRole('link', { name: 'Dynamic Pattern' }).click();
  const page8 = await page8Promise;
  await page8.getByRole('row', { name: 'Advised Name Required' }).getByLabel('None').check();
  await page8.getByRole('link', { name: 'Save' }).click();
  await expect(page8.locator('#eBolWrapper')).toContainText('Data saved successfully');
  await page8.getByRole('link', { name: 'Cancel' }).click();

});


test('Dynamic Pattern BOL create Consignee Name', async ({ page }) => {
  //await page.getByRole('link', { name: 'Electronic Bill of Lading' }).click();
  await page.getByRole('treeitem', { name: 'EBOL' }).getByRole('img').first().click();
  await page.getByRole('link', { name: 'BOL Template Master', exact: true }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('treeitem', { name: 'BOL Template Master', exact: true }).getByRole('link').click();
  const page1 = await page1Promise;
  await page1.getByRole('link', { name: 'Find' }).click();
  await page1.getByRole('link', { name: 'Next' }).click();
  await page1.getByRole('link', { name: '11ICIMORRISONBAR' }).click();
  const page2Promise = page1.waitForEvent('popup');
  await page1.getByRole('link', { name: 'Dynamic Pattern' }).click();
  const page2 = await page2Promise;
  await page2.getByRole('row', { name: 'Consignee Required' }).getByLabel('Required').check();
  await page2.getByRole('link', { name: 'Save' }).click();
  await expect(page2.locator('#eBolWrapper')).toContainText('Data saved successfully');
  await page2.getByRole('link', { name: 'Cancel' }).click();
  await page1.close();//------>close Template master Window
  const page3Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Create BOL', exact: true }).click();
  const page3 = await page3Promise;
  await page3.locator('#equipmentInitial').click();
  await page3.locator('#equipmentInitial').fill('TEST 123456');
  await page3.locator('#rwcCode').click();
  await page3.locator('#rwcCode').fill('11ICIMORRISONBAR');
  const page4Promise = page3.waitForEvent('popup');
  await page3.locator('#waybillAddFormBean').getByRole('link').click();
  const page4 = await page4Promise;
  await page4.locator('input[name="rwcRadio"]').check();
  await page4.getByRole('link', { name: 'Close' }).click();
  await page3.locator('#bolNumber').click();
  await page3.locator('#bolNumber').fill(BolNumber_2);
  await page3.getByRole('button', { name: 'Quick Create' }).click();
  const page5Promise = page3.waitForEvent('popup');
  await page3.getByRole('row', { name: 'Consignee' }).getByRole('link').click();
  const page5 = await page5Promise;
  await page5.getByRole('link', { name: 'Find' }).click();
  await page5.getByRole('row', { name: '3968 LINN, S.C 3968 LINN SC' }).getByRole('radio').check();
  await page5.getByRole('link', { name: 'Close' }).click();
  await page3.getByRole('button', { name: 'Proceed' }).click();
  await page3.waitForTimeout(3000);
  await page3.getByText(BolNumber_2).click();
  await page3.getByRole('link', { name: 'Other Parties' }).click();
  await page3.waitForTimeout(3000);
  await expect(page3.locator('input[name="wbPartyFormBeans\\[0\\]\\.name"]')).toHaveValue('3968 LINN SC');
  await page3.getByRole('link', { name: 'Cancel' }).click();
  await page3.close();
  const page7Promise = page.waitForEvent('popup');
  await page.getByRole('treeitem', { name: 'BOL Template Master', exact: true }).getByRole('link').click();
  const page7 = await page7Promise;
  await page7.locator('#RWCSearchCriteria').click();
  await page7.locator('#RWCSearchCriteria').fill('11ICIMORRISONBAR');
  await page7.getByRole('link', { name: 'Find' }).click();
  await page7.getByRole('link', { name: '11ICIMORRISONBAR' }).click();
  const page8Promise = page7.waitForEvent('popup');
  await page7.getByRole('link', { name: 'Dynamic Pattern' }).click();
  const page8 = await page8Promise;
  await page8.getByRole('row', { name: 'Consignee Required' }).getByLabel('None').check();
  await page8.getByRole('link', { name: 'Save' }).click();
  await expect(page8.locator('#eBolWrapper')).toContainText('Data saved successfully');
  await page8.getByRole('link', { name: 'Cancel' }).click();

});

test('Dynamic Pattern BOL create Party To Receive Freight Bill', async ({ page }) => {
  //await page.getByRole('link', { name: 'Electronic Bill of Lading' }).click();
  await page.getByRole('treeitem', { name: 'EBOL' }).getByRole('img').first().click();
  await page.getByRole('link', { name: 'BOL Template Master', exact: true }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('treeitem', { name: 'BOL Template Master', exact: true }).getByRole('link').click();
  const page1 = await page1Promise;
  await page1.getByRole('link', { name: 'Find' }).click();
  await page1.getByRole('link', { name: 'Next' }).click();
  await page1.getByRole('link', { name: '11ICIMORRISONBAR' }).click();
  const page2Promise = page1.waitForEvent('popup');
  await page1.getByRole('link', { name: 'Dynamic Pattern' }).click();
  const page2 = await page2Promise;
  await page2.getByRole('row', { name: 'Party To Receive Freight Bill Required' }).getByLabel('Required').check();
  await page2.getByRole('link', { name: 'Save' }).click();
  await expect(page2.locator('#eBolWrapper')).toContainText('Data saved successfully');
  await page2.getByRole('link', { name: 'Cancel' }).click();
  await page1.close();//------>close Template master Window
  const page3Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Create BOL', exact: true }).click();
  const page3 = await page3Promise;
  await page3.locator('#equipmentInitial').click();
  await page3.locator('#equipmentInitial').fill('TEST 123456');
  await page3.locator('#rwcCode').click();
  await page3.locator('#rwcCode').fill('11ICIMORRISONBAR');
  const page4Promise = page3.waitForEvent('popup');
  await page3.locator('#waybillAddFormBean').getByRole('link').click();
  const page4 = await page4Promise;
  await page4.locator('input[name="rwcRadio"]').check();
  await page4.getByRole('link', { name: 'Close' }).click();
  await page3.locator('#bolNumber').click();
  await page3.locator('#bolNumber').fill(BolNumber_3);
  await page3.getByRole('button', { name: 'Quick Create' }).click();
  const page5Promise = page3.waitForEvent('popup');
  await page3.getByRole('row', { name: 'Party To Receive Freight Bill' }).getByRole('link').click();
  const page5 = await page5Promise;
  await page5.getByRole('link', { name: 'Find' }).click();
  await page5.getByRole('row', { name: '3968 LINN, S.C 3968 LINN SC' }).getByRole('radio').check();
  await page5.getByRole('link', { name: 'Close' }).click();
  await page3.getByRole('button', { name: 'Proceed' }).click();
  await page3.waitForTimeout(3000);
  await page3.getByText(BolNumber_3).click();
  await page3.getByRole('link', { name: 'Other Parties' }).click();
  await page3.waitForTimeout(3000);
  await expect(page3.locator('input[name="wbPartyFormBeans\\[2\\]\\.name"]')).toHaveValue('3968 LINN SC');
  await page3.getByRole('link', { name: 'Cancel' }).click();
  await page3.close();
  const page7Promise = page.waitForEvent('popup');
  await page.getByRole('treeitem', { name: 'BOL Template Master', exact: true }).getByRole('link').click();
  const page7 = await page7Promise;
  await page7.locator('#RWCSearchCriteria').click();
  await page7.locator('#RWCSearchCriteria').fill('11ICIMORRISONBAR');
  await page7.getByRole('link', { name: 'Find' }).click();
  await page7.getByRole('link', { name: '11ICIMORRISONBAR' }).click();
  const page8Promise = page7.waitForEvent('popup');
  await page7.getByRole('link', { name: 'Dynamic Pattern' }).click();
  const page8 = await page8Promise;
  await page8.getByRole('row', { name: 'Party To Receive Freight Bill Required' }).getByLabel('None').check();
  await page8.getByRole('link', { name: 'Save' }).click();
  await expect(page8.locator('#eBolWrapper')).toContainText('Data saved successfully');
  await page8.getByRole('link', { name: 'Cancel' }).click();

});

test('Dynamic Pattern BOL create Seal Numbers', async ({ page }) => {
  //await page.getByRole('link', { name: 'Electronic Bill of Lading' }).click();
  await page.getByRole('treeitem', { name: 'EBOL' }).getByRole('img').first().click();
  await page.getByRole('link', { name: 'BOL Template Master', exact: true }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('treeitem', { name: 'BOL Template Master', exact: true }).getByRole('link').click();
  const page1 = await page1Promise;
  await page1.getByRole('link', { name: 'Find' }).click();
  await page1.getByRole('link', { name: 'Next' }).click();
  await page1.getByRole('link', { name: '11ICIMORRISONBAR' }).click();
  const page2Promise = page1.waitForEvent('popup');
  await page1.getByRole('link', { name: 'Dynamic Pattern' }).click();
  const page2 = await page2Promise;

  await page2.getByRole('row', { name: 'Seal01 Required' }).getByLabel('Required').check();
  await page2.getByRole('row', { name: 'Seal02 Required' }).getByLabel('Required').check();
  await page2.getByRole('row', { name: 'Seal03 Required' }).getByLabel('Required').check();
  await page2.getByRole('row', { name: 'Seal04 Required' }).getByLabel('Required').check();
  await page2.getByRole('row', { name: 'Seal05 Required' }).getByLabel('Required').check();
  await page2.getByRole('row', { name: 'Seal06 Required' }).getByLabel('Required').check();
  await page2.getByRole('row', { name: 'Seal07 Required' }).getByLabel('Required').check();
  await page2.getByRole('row', { name: 'Seal08 Required' }).getByLabel('Required').check();
  await page2.getByRole('row', { name: 'Seal09 Required' }).getByLabel('Required').check();
  await page2.getByRole('row', { name: 'Seal10 Required' }).getByLabel('Required').check();

  await page2.getByRole('link', { name: 'Save' }).click();
  await expect(page2.locator('#eBolWrapper')).toContainText('Data saved successfully');
  await page2.getByRole('link', { name: 'Cancel' }).click();
  await page1.close();//------>close Template master Window
  const page3Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Create BOL', exact: true }).click();
  const page3 = await page3Promise;
  await page3.locator('#equipmentInitial').click();
  await page3.locator('#equipmentInitial').fill('TEST 123456');
  await page3.locator('#rwcCode').click();
  await page3.locator('#rwcCode').fill('11ICIMORRISONBAR');
  const page4Promise = page3.waitForEvent('popup');
  await page3.locator('#waybillAddFormBean').getByRole('link').click();
  const page4 = await page4Promise;
  await page4.locator('input[name="rwcRadio"]').check();
  await page4.getByRole('link', { name: 'Close' }).click();
  await page3.locator('#bolNumber').click();
  await page3.locator('#bolNumber').fill(BolNumber_4);


  await page3.getByRole('button', { name: 'Quick Create' }).click();

  await page3.locator('input[name="seal01"]').click();
  await page3.locator('input[name="seal01"]').fill('123');
  await page3.locator('input[name="seal02"]').click();
  await page3.locator('input[name="seal02"]').fill('124');
  await page3.locator('input[name="seal03"]').click();
  await page3.locator('input[name="seal03"]').fill('125');
  await page3.locator('input[name="seal04"]').click();
  await page3.locator('input[name="seal04"]').fill('126');
  await page3.locator('input[name="seal05"]').click();
  await page3.locator('input[name="seal05"]').fill('127');
  await page3.locator('input[name="seal06"]').click();
  await page3.locator('input[name="seal06"]').fill('128');
  await page3.locator('input[name="seal07"]').click();
  await page3.locator('input[name="seal07"]').fill('129');
  await page3.locator('input[name="seal08"]').click();
  await page3.locator('input[name="seal08"]').fill('130');
  await page3.locator('input[name="seal09"]').click();
  await page3.locator('input[name="seal09"]').fill('131');
  await page3.locator('input[name="seal10"]').click();
  await page3.locator('input[name="seal10"]').fill('132');

  await page3.getByRole('button', { name: 'Proceed' }).click();
  await page3.waitForTimeout(3000);
  await page3.getByText(BolNumber_4).click();
  await page3.getByRole('link', { name: 'Equipment' }).click();
  await page3.waitForTimeout(2000);

  await expect(page3.locator('input[name="wbEquipmentFormBeans\\[0\\]\\.wbEquipSealFormBeans\\[0\\]\\.nbr"]')).toHaveValue('123');
  await expect(page3.locator('input[name="wbEquipmentFormBeans\\[0\\]\\.wbEquipSealFormBeans\\[1\\]\\.nbr"]')).toHaveValue('124');
  await expect(page3.locator('input[name="wbEquipmentFormBeans\\[0\\]\\.wbEquipSealFormBeans\\[2\\]\\.nbr"]')).toHaveValue('125');
  await expect(page3.locator('input[name="wbEquipmentFormBeans\\[0\\]\\.wbEquipSealFormBeans\\[3\\]\\.nbr"]')).toHaveValue('126');
  await expect(page3.locator('input[name="wbEquipmentFormBeans\\[0\\]\\.wbEquipSealFormBeans\\[4\\]\\.nbr"]')).toHaveValue('127');
  await expect(page3.locator('input[name="wbEquipmentFormBeans\\[0\\]\\.wbEquipSealFormBeans\\[5\\]\\.nbr"]')).toHaveValue('128');
  await expect(page3.locator('input[name="wbEquipmentFormBeans\\[0\\]\\.wbEquipSealFormBeans\\[6\\]\\.nbr"]')).toHaveValue('129');
  await expect(page3.locator('input[name="wbEquipmentFormBeans\\[0\\]\\.wbEquipSealFormBeans\\[7\\]\\.nbr"]')).toHaveValue('130');
  await expect(page3.locator('input[name="wbEquipmentFormBeans\\[0\\]\\.wbEquipSealFormBeans\\[8\\]\\.nbr"]')).toHaveValue('131');
  await expect(page3.locator('input[name="wbEquipmentFormBeans\\[0\\]\\.wbEquipSealFormBeans\\[9\\]\\.nbr"]')).toHaveValue('132');
  
  await page3.getByRole('link', { name: 'Cancel' }).click();
  await page3.close();
  const page7Promise = page.waitForEvent('popup');
  await page.getByRole('treeitem', { name: 'BOL Template Master', exact: true }).getByRole('link').click();
  const page7 = await page7Promise;
  await page7.locator('#RWCSearchCriteria').click();
  await page7.locator('#RWCSearchCriteria').fill('11ICIMORRISONBAR');
  await page7.getByRole('link', { name: 'Find' }).click();
  await page7.getByRole('link', { name: '11ICIMORRISONBAR' }).click();
  const page8Promise = page7.waitForEvent('popup');
  await page7.getByRole('link', { name: 'Dynamic Pattern' }).click();
  const page8 = await page8Promise;
  //await page8.getByRole('row', { name: 'Party To Receive Freight Bill Required' }).getByLabel('None').check();
  await page8.getByRole('row', { name: 'Seal01 Required' }).getByLabel('None').check();
  await page8.getByRole('row', { name: 'Seal02 Required' }).getByLabel('None').check();
  await page8.getByRole('row', { name: 'Seal03 Required' }).getByLabel('None').check();
  await page8.getByRole('row', { name: 'Seal04 Required' }).getByLabel('None').check();
  await page8.getByRole('row', { name: 'Seal05 Required' }).getByLabel('None').check();
  await page8.getByRole('row', { name: 'Seal06 Required' }).getByLabel('None').check();
  await page8.getByRole('row', { name: 'Seal07 Required' }).getByLabel('None').check();
  await page8.getByRole('row', { name: 'Seal08 Required' }).getByLabel('None').check();
  await page8.getByRole('row', { name: 'Seal09 Required' }).getByLabel('None').check();
  await page8.getByRole('row', { name: 'Seal10 Required' }).getByLabel('None').check();

  await page8.getByRole('link', { name: 'Save' }).click();
  await expect(page8.locator('#eBolWrapper')).toContainText('Data saved successfully');
  await page8.getByRole('link', { name: 'Cancel' }).click();

});


test('Edit BOL', async ({ page }) => {
  await page.getByRole('treeitem', { name: 'EBOL' }).getByRole('img').first().click();
  await page.locator('#isc_12').click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Search BOL', exact: true }).click();
  const page1 = await page1Promise;
  await page1.locator('#waybillNumberSearchString').click();
  await page1.locator('#waybillNumberSearchString').fill(BolNumber_4);
  await page1.getByRole('link', { name: 'Find' }).click();
  await page1.getByText(BolNumber_4).click();
  await page1.locator('#shipmentQualCode').selectOption('1');
  await page1.getByRole('link', { name: 'Save' }).click();
  await expect(page1.locator('#waybillPrimaryFormBean')).toContainText('Data saved successfully');
  await page1.getByRole('link', { name: 'Cancel' }).click();
  await page1.getByRole('link', { name: 'Find' }).click();
  await page1.getByText(BolNumber_4).click();
  await expect(page1.locator('#shipmentQualCode')).toHaveValue('1');
  await page1.locator('#paymentMethodCode').selectOption('NR');
  await page1.getByRole('link', { name: 'Save' }).click();
  await expect(page1.locator('#waybillPrimaryFormBean')).toContainText('Data saved successfully');
  await page1.getByRole('link', { name: 'Cancel' }).click();
  await page1.getByRole('link', { name: 'Find' }).click();
  await page1.getByText(BolNumber_4).click();
  await expect(page1.locator('#paymentMethodCode')).toHaveValue('NR');
  const page2Promise = page1.waitForEvent('popup');
  await page1.locator('.row > a').first().click();
  const page2 = await page2Promise;
  await page2.locator('#roadmark').click();
  await page2.locator('#roadmark').fill('');
  //await page2.locator('#roadmark').press('Shift+CapsLock');
  //await page2.locator('#roadmark').press('CapsLock');
  await page2.locator('#roadmark').fill('BNSF');
  await page2.getByRole('link', { name: 'Find' }).click();
  await page2.getByRole('radio').check();
  await page2.getByRole('link', { name: 'Close' }).click();
  //const page3Promise = page1.waitForEvent('popup');
  //await page1.locator('.row > div:nth-child(2) > div > a').first().click();
  //const page3 = await page3Promise;
  //await page3.getByRole('link', { name: 'Display All' }).click();
  //await page3.getByRole('row', { name: 'ABELL BNSF 53580 TX 671967000' }).getByRole('radio').check();
  //const page4Promise = page1.waitForEvent('popup');
  //await page1.locator('.row > div:nth-child(2) > div > a').first().click();
  //const page4 = await page4Promise;
  //await page4.getByRole('link', { name: 'Display All' }).click();
  //await page4.getByRole('row', { name: 'ABBOTT BNSF 39451 TX' }).getByRole('radio').check();
  await page1.locator('#originFSAC').click();
  await page1.locator('#originFSAC').press('ArrowRight');
  await page1.locator('#originFSAC').fill('39451');
  const page5Promise = page1.waitForEvent('popup');
  await page1.locator('.row > div:nth-child(2) > div > a').first().click();
  const page5 = await page5Promise;
  await page5.getByRole('radio').check();
  await page5.getByRole('link', { name: 'Close' }).click();
  await page1.locator('#destRoad').click();
  await page1.locator('#destRoad').fill('BNSF');
  const page6Promise = page1.waitForEvent('popup');
  await page1.locator('div:nth-child(2) > a').first().click();
  const page6 = await page6Promise;
  await page6.getByRole('radio').check();
  await page6.getByRole('link', { name: 'Close' }).click();
  await page1.locator('#destFSAC').click();
  await page1.locator('#destFSAC').press('ArrowRight');
  await page1.locator('#destFSAC').fill('30104');
  const page7Promise = page1.waitForEvent('popup');
  await page1.locator('div:nth-child(2) > div:nth-child(2) > a').first().click();
  const page7 = await page7Promise;
  await page7.getByRole('radio').check();
  await page7.getByRole('link', { name: 'Close' }).click();
  await page1.getByRole('link', { name: 'Save' }).click();
  await expect(page1.locator('#waybillPrimaryFormBean')).toContainText('Data saved successfully');
  await page1.getByRole('link', { name: 'Cancel' }).click();
  await page1.getByRole('link', { name: 'Find' }).click();
  await page1.getByText(BolNumber_4).click();
  await expect(page1.locator('#originRoad')).toHaveValue('BNSF');
  await expect(page1.locator('#originFSAC')).toHaveValue('39451');
  await expect(page1.locator('#originStationName')).toHaveValue('ABBOTT');
  await expect(page1.locator('#originStateProvCode')).toHaveValue('TX');
  await expect(page1.locator('#destStateProvCode')).toHaveValue('NE');
  await expect(page1.locator('#destStationName')).toHaveValue('ABBOTT');
  await expect(page1.locator('#destFSAC')).toHaveValue('30104');
  await expect(page1.locator('#destRoad')).toHaveValue('BNSF');
  await page1.locator('#weightUnitCode').selectOption('M');
  await page1.getByRole('link', { name: 'Save' }).click();
  await expect(page1.locator('#waybillPrimaryFormBean')).toContainText('Data saved successfully');
  await page1.getByRole('link', { name: 'Cancel' }).click();
  await page1.getByRole('link', { name: 'Find' }).click();
  await page1.getByText(BolNumber_4).click();
  await expect(page1.locator('#weightUnitCode')).toHaveValue('M');
  await page1.getByRole('link', { name: 'Equipment' }).click();
  await page1.locator('[id="wbEquipmentFormBeans0\\.equipInitial"]').click();
  await page1.locator('[id="wbEquipmentFormBeans0\\.equipInitial"]').press('ArrowRight');
  await page1.locator('[id="wbEquipmentFormBeans0\\.equipInitial"]').fill('TEXX');
  await page1.locator('[id="wbEquipmentFormBeans0\\.equipNbr"]').click();
  await page1.locator('[id="wbEquipmentFormBeans0\\.equipNbr"]').press('ArrowRight');
  await page1.locator('[id="wbEquipmentFormBeans0\\.equipNbr"]').press('ArrowRight');
  await page1.locator('[id="wbEquipmentFormBeans0\\.equipNbr"]').press('ArrowRight');
  await page1.locator('[id="wbEquipmentFormBeans0\\.equipNbr"]').fill('121212');
  await page1.getByRole('link', { name: 'Save' }).click();
  await page1.waitForTimeout(3000)
  await expect(page1.locator('#equipmentErrors')).toContainText('Data saved successfully');
  await page1.getByRole('link', { name: 'Cancel' }).click();
  await page1.getByRole('link', { name: 'Find' }).click();
  await page1.getByText(BolNumber_4).click();
  await page1.getByRole('link', { name: 'Equipment' }).click();
  await expect(page1.locator('[id="wbEquipmentFormBeans0\\.equipInitial"]')).toHaveValue('TEXX');
  await expect(page1.locator('[id="wbEquipmentFormBeans0\\.equipNbr"]')).toHaveValue('121212');
  await page1.locator('[id="wbEquipmentFormBeans0\\.weight"]').click();
  await page1.locator('[id="wbEquipmentFormBeans0\\.weight"]').fill('50');
  await page1.locator('[id="wbEquipmentFormBeans0\\.weightQualCode"]').selectOption('G');
  await page1.locator('[id="wbEquipmentFormBeans0\\.grossGallon"]').click();
  await page1.locator('[id="wbEquipmentFormBeans0\\.grossGallon"]').fill('70');
  await page1.getByRole('link', { name: 'Save' }).click();
  await expect(page1.locator('#equipmentErrors')).toContainText('Data saved successfully');
  await page1.getByRole('link', { name: 'Cancel' }).click();
  await page1.getByRole('link', { name: 'Find' }).click();
  await page1.getByText(BolNumber_4).click();
  await page1.getByRole('link', { name: 'Equipment' }).click();
  await page1.getByRole('link', { name: 'Commodity' }).click();
  await page1.locator('textarea[name="wbLineItemFormBeans\\[0\\]\\.desc"]').click();
  await page1.locator('textarea[name="wbLineItemFormBeans\\[0\\]\\.desc"]').fill('This Lading description Test');
  await page1.getByRole('link', { name: 'Save' }).click();
  await expect(page1.locator('#wbLineItemsFB')).toContainText('Data saved successfully');
  await page1.getByRole('link', { name: 'Cancel' }).click();
  await page1.getByRole('link', { name: 'Find' }).click();
  await page1.getByText(BolNumber_4).click();
  await page1.getByRole('link', { name: 'Commodity' }).click();
  await expect(page1.getByText('THIS LADING DESCRIPTION TEST')).toHaveValue('THIS LADING DESCRIPTION TEST');
  await page1.getByRole('link', { name: 'Intermodal' }).click();
  await expect(page1.locator('label')).toContainText('Intermodal Plan Num:');
  //await expect(page1.locator('#intermodalServicePlanCode')).toBeEmpty();
  await page1.getByRole('link', { name: 'HAZMAT' }).click();
  await page1.getByRole('link', { name: 'Other Parties' }).click();
  const page8Promise = page1.waitForEvent('popup');
  await page1.locator('.row > a').first().click();
  const page8 = await page8Promise;
  await page8.getByRole('link', { name: 'Display All' }).click();
  await page8.getByRole('row', { name: 'AA JOSE ANDRES A.A. JOSE' }).getByRole('radio').check();
  await page8.getByRole('link', { name: 'Close' }).click();
  await page1.getByRole('link', { name: 'Save' }).click();
  await expect(page1.locator('#otherPartiesErrors')).toContainText('Data saved successfully');
  await page1.getByRole('link', { name: 'Cancel' }).click();
  await page1.getByRole('link', { name: 'Find' }).click();
  await page1.getByText(BolNumber_4).click();
  await page1.getByRole('link', { name: 'Other Parties' }).click();
  await expect(page1.locator('input[name="wbPartyFormBeans\\[0\\]\\.name"]')).toHaveValue('A.A. JOSE ANDRES MOUNETOU PEREZ');
  await page1.getByRole('link', { name: 'Empty Disp/Price Auth.' }).click();
  await page1.getByRole('link', { name: 'International' }).click();
  await page1.locator('#proFormaCurrencyCode').selectOption('CAD');
  await page1.locator('#proFormaAmount').click();
  await page1.locator('#proFormaAmount').fill('120.00');
  await page1.locator('#proFormaUnitPrice').click();
  await page1.locator('#proFormaUnitPrice').fill('150.00');
  await page1.locator('#proFormaSpecialChargeCode').selectOption('FCB');
  await page1.locator('#proFormaBlock20Code').click();
  await page1.locator('#proFormaBlock20Code').fill('1');
  await page1.locator('#proFormaRelatedCompanyCode').selectOption('N');
  await page1.locator('#proFormaChemicalAnalysisPct').click();
  await page1.locator('#proFormaChemicalAnalysisPct').fill('8');
  await page1.getByRole('link', { name: 'Save' }).click();
  await expect(page1.locator('#wbIntFormBean')).toContainText('Data saved successfully');
  await page1.getByRole('link', { name: 'Cancel' }).click();
  await page1.getByRole('link', { name: 'Find' }).click();
  await page1.getByText(BolNumber_4).click();
  await page1.getByRole('link', { name: 'International' }).click();
  await expect(page1.locator('#proFormaCurrencyCode')).toHaveValue('CAD');
  await expect(page1.locator('#proFormaAmount')).toHaveValue('120.00');
  await expect(page1.locator('#proFormaUnitPrice')).toHaveValue('150.00');
  await expect(page1.locator('#proFormaSpecialChargeCode')).toHaveValue('FCB');
  await expect(page1.locator('#proFormaBlock20Code')).toHaveValue('1');
  await expect(page1.locator('#proFormaRelatedCompanyCode')).toHaveValue('N');
  await expect(page1.locator('#proFormaChemicalAnalysisPct')).toHaveValue('8');
  await page1.getByRole('link', { name: 'Misc.' }).click();
  await page1.waitForTimeout(3000);
  const page9Promise = page1.waitForEvent('popup');
  await page1.waitForTimeout(3000);
  await page1.locator('#refSec').getByRole('link', { name: 'Add' }).click();
  const page9 = await page9Promise;
  await page9.locator('#numberOfRows').click();
  await page9.locator('#numberOfRows').fill('1');
  await page9.waitForTimeout(3000);
  await page9.getByRole('button', { name: 'Ok' }).click();
  await page1.waitForTimeout(3000);
  //await page1.goto('https://sxstg.shipxpress.net/ebol/wbRefAddProcessEBOLAction');
  await page1.locator('[id="wbReferenceFormBeans0\\.number"]').click();
  await page1.locator('[id="wbReferenceFormBeans0\\.number"]').fill('123456');
  await page1.locator('[id="wbReferenceFormBeans0\\.numberQual"]').selectOption('CD');
  await page1.getByRole('link', { name: 'Save' }).click();
  await expect(page1.locator('form')).toContainText('Data saved successfully');
  await page1.getByRole('link', { name: 'Cancel' }).click();
  await page1.getByRole('link', { name: 'Find' }).click();
  await page1.getByText(BolNumber_4).click();
  await page1.getByRole('link', { name: 'Misc.' }).click();
  await expect(page1.locator('[id="wbReferenceFormBeans0\\.number"]')).toHaveValue('123456');
  await expect(page1.locator('[id="wbReferenceFormBeans0\\.numberQual"]')).toHaveValue('CD');
  await page1.getByRole('link', { name: 'Carta Porte' }).click();
  await page1.locator('[id="wbCartaPorteFormBeans0\\.quantity"]').click();
  await page1.locator('[id="wbCartaPorteFormBeans0\\.quantity"]').fill('456');
  await page1.locator('[id="wbCartaPorteFormBeans0\\.quantityType"]').selectOption('CAB');
  await page1.getByRole('link', { name: 'Save' }).click();
  await page1.waitForTimeout(3000);
  await expect(page1.locator('#wbCartaPortesFormBean')).toContainText('Data saved successfully');
  await page1.getByRole('link', { name: 'Cancel' }).click();
  await page1.getByRole('link', { name: 'Find' }).click();
  await page1.getByText(BolNumber_4).click();
  await page1.getByRole('link', { name: 'Carta Porte' }).click();
  await expect(page1.locator('[id="wbCartaPorteFormBeans0\\.quantity"]')).toHaveValue('456');
  await expect(page1.locator('[id="wbCartaPorteFormBeans0\\.quantityType"]')).toHaveValue('CAB');
  await page1.getByRole('link', { name: 'Custom Fields' }).click();
  await page1.getByRole('link', { name: 'Add' }).first().click();
  await page1.locator('[id="wbGenCustomFieldFormBeans0\\.customFieldName"]').click();
  await page1.locator('[id="wbGenCustomFieldFormBeans0\\.customFieldName"]').fill('Custom field Name');
  await page1.locator('[id="wbGenCustomFieldFormBeans0\\.customFieldValue"]').click();
  await page1.locator('[id="wbGenCustomFieldFormBeans0\\.customFieldValue"]').fill('custom field value 1');
  await page1.getByRole('link', { name: 'Save' }).click();
  await expect(page1.locator('#customFieldErrors')).toContainText('Data saved successfully');
  await page1.getByRole('link', { name: 'Cancel' }).click();
  await page1.getByRole('link', { name: 'Find' }).click();
  await page1.getByText(BolNumber_4).click();
  await page1.getByRole('link', { name: 'Custom Fields' }).click();
  await expect(page1.locator('[id="wbGenCustomFieldFormBeans0\\.customFieldName"]')).toHaveValue('Custom field Name');
  await expect(page1.locator('[id="wbGenCustomFieldFormBeans0\\.customFieldValue"]')).toHaveValue('custom field value 1');
  await page1.getByRole('link', { name: 'Cancel' }).click();

});



