import beet from 'beet-esm';

let init = async () => {
    try {
        // link to beet
        let app = await beet.get("Binance Transfer Example", "BNB_TEST");
        console.log("Linked account", app.BNB_TEST.getAccount());

        // todo: need to load browserified binance sdk
        const BinanceClient = class BinanceClient {};

        // initialize client
        const api = "https://testnet-dex.binance.org/";
        let binanceClient = new BinanceClient(api);
        await binanceClient.initChain();

        // inject beet
        binanceClient = app.BNB_TEST.inject(binanceClient);

        // use like usual
        let from = "my_address";
        let sequence = (await (await fetch(`${api}api/v1/account/${from}/sequence`)).json());
        sequence = (!!sequence.data ? sequence.data.sequence : 0) || 0;

        let result = await binanceClient.transfer(
            from,
            "your_address",
            1.05,
            "BNB",
            "Beet transfer test",
            sequence
        );

        console.log("Transfer successfull", result);
    } catch (err) {
        console.error(err);
    }
};
init();
