import axios from 'axios';
import * as cheerio from 'cheerio';

interface PageResult {
    GameTitle: string;
    BlockChain: string;
    NFT: string;
    F2P: string;
    P2E: string;
    Social: string;
}

async function main() {
    await axios.get(
        'https://playtoearn.net/blockchaingames?sort=socialscore_24h&direction=desc&page=1')
        .then(Resp => {
            const $ = cheerio.load(Resp.data);
            const bodyList = $('body > div.container > div.indexmaintable.indexpage')
            .map(
                function (i, element){
                    const GameInfo: PageResult = {
                        GameTitle: String($(element)
                        .find('div > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(3) > a > div.dapp_name > span:nth-child(1)')
                        .text()),
                        BlockChain: String($(element)
                        .find('body > div.container > div.indexmaintable.indexpage > div > table:nth-child(2) > tbody > tr.sponsored_tr > td:nth-child(5) > a:nth-child(1)')
                        .text()),
                        NFT: String($(element)
                        .find('body > div.container > div.indexmaintable.indexpage > div > table:nth-child(2) > tbody > tr.sponsored_tr > td:nth-child(8) > a')
                        .text()),
                        F2P: String($(element)
                        .find('body > div.container > div.indexmaintable.indexpage > div > table:nth-child(2) > tbody > tr.sponsored_tr > td:nth-child(9) > a')
                        .text()),
                        P2E: String($(element)
                        .find('body > div.container > div.indexmaintable.indexpage > div > table:nth-child(2) > tbody > tr.sponsored_tr > td:nth-child(10)')
                        .text()),
                        Social: String($(element)
                        .find('body > div.container > div.indexmaintable.indexpage > div > table:nth-child(2) > tbody > tr.sponsored_tr > td:nth-child(11) > span.dailychangepercentage')
                        .text()),
                    }
                    console.log(GameInfo);
                });
            })
        .catch(err => {
            console.error(err);
    
        });
    }


main();
