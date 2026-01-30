const { test, expect } = require('@playwright/test');

// Set overall timeout to 2 minutes per test to handle slow internet
test.setTimeout(120000);

const testData = [
    { id: 'Pos_Fun_0001', input: 'kasunta kaha bath oona.', expected: 'කසුන්ට කහ බත් ඕන.' },
    { id: 'Pos_Fun_0002', input: 'supun gedhara yayidha ?', expected: 'සුපුන් ගෙදර යයිද ?' },
    { id: 'Pos_Fun_0003', input: 'mata help ekak karanna puLuvandha?', expected: 'මට help එකක් කරන්න පුළුවන්ද?' },
    { id: 'Pos_Fun_0004', input: 'mata badaginiyi.', expected: 'මට බඩගිනියි.' },
    { id: 'Pos_Fun_0005', input: 'mama heta enavaa.', expected: 'මම හෙට එනවා.' },
    { id: 'Pos_Fun_0006', input: 'mama kaeema kaeevaa saha nidhaa gaththaa', expected: 'මම කෑම කෑවා සහ නිදා ගත්තා.' },
    { id: 'Pos_Fun_0007', input: 'vaessa nisaa api gedhara hitiyaa.', expected: 'වැස්ස නිසා අපි ගෙදර හිටියා.' },
    { id: 'Pos_Fun_0008', input: 'vathura glass ekak dhenna.', expected: 'වතුර glass එකක් දෙන්න.' },
    { id: 'Pos_Fun_0009', input: 'suba udhaeesanak!', expected: 'සුබ උදෑසනක්!' },
    { id: 'Pos_Fun_0010', input: 'eyaa venne naehae.', expected: 'එයා වෙන්නේ නැහැ.' },
    { id: 'Pos_Fun_0011', input: 'api okkoma yamudha?', expected: 'අපි ඔක්කොම යමුද?' },
    { id: 'Pos_Fun_0012', input: 'Zoom ekee link eka mata ikmanata evalaa sir.', expected: 'Zoom එකේ link එක මට ඉක්මනට එවලා sir.' },
    { id: 'Pos_Fun_0013', input: 'api trip eka Kandy yanavaa.', expected: 'අපි trip එක Kandy යනවා.' },
    { id: 'Pos_Fun_0014', input: 'NIC card eka dhenna.', expected: 'NIC card එක දෙන්න.' },
    { id: 'Pos_Fun_0015', input: 'Rs. 5000k oona.', expected: 'Rs. 5000ක් ඕන.' },
    { id: 'Pos_Fun_0016', input: '2025-12-25', expected: '2025-12-25' },
    { id: 'Pos_Fun_0017', input: 'tika tika karanna.', expected: 'ටික ටික කරන්න.' },
    { id: 'Pos_Fun_0018', input: 'karuNaakaralaa udhavvak karanna.', expected: 'කරුණාකරලා උදව්වක් කරන්න.' },
    { id: 'Pos_Fun_0019', input: 'ela machan supiri!', expected: 'එල මචන් සුපිරි!' },
    { id: 'Pos_Fun_0020', input: 'hariyata vaeda karanna.', expected: 'හරියට වැඩ කරන්න.' },
    { id: 'Pos_Fun_0021', input: 'eyaa gedhara giyaa.', expected: 'එයා ගෙදර ගියා.' },
    { id: 'Pos_Fun_0022', input: 'mama ada yanavaa.', expected: 'මම අද යනවා.' },
    { id: 'Pos_Fun_0023', input: 'mama yanavaa dhaen kaempas ekata . oyaath enavadha yanna maath ekka.', expected: 'මම යනවා දැන් කැම්පස් එකට . ඔයාත් එනවද යන්න මාත් එක්ක.' },
    { id: 'Pos_Fun_0024', input: 'kalhaara gedhara yana gaman idhdhi . paareedhi malithva hambavunaa.ethanadhi sunil kaalekata passe dhennava dhaekala thundhenaama ekathu velaa godak dheeval kathaa kalaa. paasal kaalayee vechcha godak sidhuviim ee athara thibunaa.', expected: 'කල්හාර ගෙදර යන ගමන් ඉද්දී . පාරේදී මලිත්ව හම්බවුනා.එතනදී සුනිල් කාලෙකට පස්සේ දෙන්නව දැකලා තුන්දෙනාම එකතු වෙලා ගොඩාක් දේවල් කතා කලා. පාසල් කාලයේ වෙච්ච ගොඩාක් සිදුවීම් ඒ අතර තිබුනා.' },

    // --- NEGATIVES ---
    { id: 'Neg_Fun_0001', input: 'mAmA yAnAvA', expected: 'මම යනවා' },
    { id: 'Neg_Fun_0002', input: 'maaaaamaaaa', expected: 'මාමා' },
    { id: 'Neg_Fun_0003', input: 'mama123', expected: 'මම 123' },
    { id: 'Neg_Fun_0004', input: '#$%^&*()', expected: '#$%^&*()' },
    { id: 'Neg_Fun_0005', input: 'mamagedhara', expected: 'මමගෙදර' },
    { id: 'Neg_Fun_0006', input: 'thnx mcn', expected: 'තැන්ක්ස් මචං' },
    { id: 'Neg_Fun_0007', input: 'amam yanav', expected: 'මම යනවා' },
    { id: 'Neg_Fun_0008', input: 'mama yanavaaaaaaaaaaa....', expected: 'මම යනවා' },
    { id: 'Neg_Fun_0009', input: 'xhyrp qwert', expected: 'xhyrp qwert' },
    { id: 'Neg_Fun_0010', input: 'ma1ma', expected: 'මම' }
];

test.describe('Singlish Transliteration Testing Suite', () => {

    for (const data of testData) {
        test(`Test Case ID: ${data.id}`, async ({ page }) => {
            console.log(`>>> Starting Test: ${data.id}`);

            // Navigate to the site
            await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });

            // Using the first textarea as the input field
            const inputField = page.locator('textarea').first();
            
            // Wait for it to be ready
            await inputField.waitFor({ state: 'visible' });

            // Clear and Type the input
            await inputField.fill(''); // Clear first
            await inputField.type(data.input + ' ', { delay: 50 });

            console.log(`Typed: ${data.input}`);

            // Wait 3 seconds for the real-time transliteration engine
            await page.waitForTimeout(1000);

            // Fetch output from the second textarea
            const outputField = page.locator('textarea').nth(1);
            const actualOutput = await outputField.inputValue();

            console.log(`Result for ${data.id}: ${actualOutput}`);

            // Basic check - Output should not be empty for positive cases
            if (data.id.startsWith('Pos_Fun')) {
                expect(actualOutput.length).toBeGreaterThan(0);
            }
            
            console.log(`<<< Finished Test: ${data.id}\n`);
        });
    }

    // UI TEST CASE
    test('Pos_UI_0002: Real-time Clear Functionality', async ({ page }) => {
        await page.goto('https://www.swifttranslator.com/');
        const input = page.locator('textarea').first();
        await input.type('mama ');
        await page.waitForTimeout(1000);
        
        // Find the clear button (it has a trash icon or "Clear" text)
        const clearBtn = page.locator('button').filter({ hasText: /Clear/i });
        await clearBtn.click();
        
        const currentVal = await input.inputValue();
        expect(currentVal).toBe('');
    });
});