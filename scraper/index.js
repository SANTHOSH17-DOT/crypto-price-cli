const puppeteer = require('puppeteer')
const scrapePrice = async(crypto) => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(`https://www.coindesk.com/price/${crypto.toLowerCase()}`, { waitUntil: 'load', timeout: 0 })
    const content = await page.evaluate(() => {
        return document.querySelector('.briNjb').textContent
    })
    return content
}
const getAllCrypto = async() => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://www.coindesk.com/data', { waitUntil: 'load', timeout: 0 })
    const content = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.iHVLTJ')).map(el => el.textContent)
    })
    return content
}
module.exports = { scrapePrice, getAllCrypto }