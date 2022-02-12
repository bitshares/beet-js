import beet from 'beet-esm';

let init = async function() {
    try {
        let app = await beet.get("BitCoin Testnet Transfer Example", "Mozilla", "website.tld", "BTC_TEST");
        console.log("Linked account", app.BTC_TEST.getAccount());
        await app.BTC_TEST.transfer(
            {
                to: "bitcoin_address",
                amount:
                    {
                        satoshis: 100000,
                        asset_id: "BTC"
                    }
            }
        );
    } catch (err) {
        console.error(err);
    }
};
init();
