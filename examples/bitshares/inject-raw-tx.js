import BeetESM from 'beet-esm';
import bitshares from 'bitsharesjs';

let init = async () => {
    try {
        // establish connection to beet
        let app = await beet.get("BitShares Injection Example", "BTS");

        // inject beet
        TransactionBuilder = app.BTS.inject(bitshares.TransactionBuilder, {sign: true, broadcast: false});

        console.log(app.BTS.getAccount());

        var tx = {
            "expiration": "2019-05-02T11:05:25",
            "extensions": [],
            "operations": [
                [
                    0,
                    {
                        "amount": {
                            "amount": 100000,
                            "asset_id": "1.3.0"
                        },
                        "extensions": [],
                        "fee": {
                            "amount": 45468,
                            "asset_id": "1.3.0"
                        },
                        "from": "1.2.100",
                        "to": "1.2.90742"
                    }
                ]
            ],
            "ref_block_num": 58580,
            "ref_block_prefix": 2618414547,
            "signatures": []
        }

        // connect to bitshares blockchain
        await bitshares.bitshares_ws.Apis.instance(
            "wss://eu.nodes.bitshares.ws",
            true,
            10000,
            {enableCrypto: false, enableOrders: false},
            (err) => console.log(err)
        ).init_promise;

        // build transfer operation
        let  tr = new TransactionBuilder(tx);
        await tr.set_required_fees();
        tr.add_signer("inject_wif");
        console.log("presign", tr.toObject());
        await tr.finalize();
        await tr.sign();
        console.log("postsign", tr.toObject());
    } catch (err) {
        console.error(err);
    }
};
init();
