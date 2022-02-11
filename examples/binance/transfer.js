import beet from 'beet-esm';

let init = async () => {
    try {
        let app = await beet.get("Binance Transfer Example", "BNB_TEST");
        console.log("Linked account", app.BNB_TEST.getAccount());
        await app.BNB_TEST.transfer(
            {
                to: "your_address",
                amount:
                    {
                        satoshis: 1000,
                        asset_id: "BNB"
                    }
            }
        );
    } catch (err) {
        console.error(err);
    }
};
init();
