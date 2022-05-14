#! /usr/bin/env node

const yargs = require("yargs");
const { scrapePrice, getAllCrypto } = require("../scraper")
const service = async() => {
    try {
        const usage = '\nUsage: crypto-price-cli <crypto>\n Scrapes crypto price from Coindesk website.'
        yargs.usage(usage)
            .option('l', {
                alias: "listAll",
                describe: "List all available cryptos.",
                type: "boolean",
                demandOption: false
            })
            .help(true)
            .argv
        if (yargs.argv.l || yargs.argv.listAll) {
            console.log('Fetching crypto list...')
            let cryptoList = await getAllCrypto()
            cryptoList = cryptoList.map(cr => cr.toLowerCase())
            console.log(cryptoList.join('\n'))
            console.log("To get crypto market price : crypto-price-cli <crypto>")
            process.exit(0)
        }
        const crypto = yargs.argv._[0]
        if (!crypto || yargs.argv._.length > 1) {
            console.log("See 'crypto-price-cli --help'")
            process.exit(0)
        }
        console.log('Welcome to crypto-price-cli !!!')
        console.log('Fetching price...')
        let cryptoList = await getAllCrypto()
        cryptoList = cryptoList.map(cr => cr.toLowerCase())
        if (!(cryptoList.includes(crypto))) {
            console.log(`'${crypto}' is not available. Try using crypto-price-cli -l`)
            process.exit(0)
        }

        const price = await scrapePrice(crypto)
        console.log(`1 ${crypto} = $${price}`)
        process.exit(0)
    } catch (err) {
        if (err.message.includes('ERR_INTERNET_DISCONNECTED')) {
            console.log('Check your internet connection!')
            process.exit(0)
        }
        console.log(err.message)
        process.exit(0)
    }
}
service()