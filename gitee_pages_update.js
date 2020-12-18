const puppeteer = require('puppeteer');

/**
 * about run puppeteer on Travis CI, see more : https://docs.travis-ci.com/user/gui-and-headless-browsers/#using-xvfb-to-run-tests-that-require-a-gui
 */

async function giteeUpdate() {
    const browser = await puppeteer.launch({args: ['--no-sandbox']}); //, '--disable-setuid-sandbox'
    const page = await browser.newPage();
    await page.goto('https://gitee.com/login');

    /* Step 1. check the account control */
    let accountElements = await page.$x('//*[@id="user_login"]') // Here we use xpath to find the control, as below.

    /* Step 2. Fill the account number */
    await accountElements[0].type('miaogs')

    /* Step 3. Check the password control */
    let pwdElements = await page.$x('//*[@id="user_password"]')

    /* Step 4. Fill in the password */
    await pwdElements[0].type('gmiao.1127')

    /* Step 5. Click to login */
    let loginButtons = await page.$x('//*[@id="new_user"]/div[2]/div/div/div[4]/input')
    await loginButtons[0].click()

    /* Step 6. Waiting for successful login */
    await page.waitForTimeout(1000)
    await page.goto('https://gitee.com/miaogs/miaogs/pages'); // Gitee Pages Update button page, such as https://gitee.com/<username>/<username>/pages

    /* Step 7.1. listen for the confirmation pop-up box triggered in Step 7 and click Confirm */
    await page.on('dialog', async dialog => {
        console.log('Confirm update!!!')
        dialog.accept();
    })

    /* Step 7. Click the update button and a confirmation pop-up will appear */
    let updateButtons = await page.$x('//*[@id="pages-branch"]/div[7]')
    await updateButtons[0].click()

    /* Step 8. Poll and confirm if the update is complete */
    while (true) {
        await page.waitForTimeout(2000)
        try {
            /* Step 8.1 Get update status label */
            deploying = await page.$x('//*[@id="pages_deploying"]')
            if (deploying.length > 0) {
                console.log('Be updated...')
            } else {
                console.log('Update completed!!!')
                break;
            }
        } catch (error) {
            break;
        }
    }
    await page.waitForTimeout(500);

    /* Step 9. Update completed, close browser */
    browser.close();
}

giteeUpdate();