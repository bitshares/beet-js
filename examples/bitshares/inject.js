import beet from 'beet-esm';
import bitshares from 'bitsharesjs';

let init = async () => {
    try {
        beet.allowLocalhostFallback();
        // establish connection to beet
        let app = await beet.get("BitShares Injection Example", "BTS");

        // inject beet
        TransactionBuilder = app.BTS.inject(bitshares.TransactionBuilder);

        console.log(app.BTS.getAccount());

        // connect to bitshares blockchain
        await bitshares.bitshares_ws.Apis.instance(
            "wss://eu.nodes.bitshares.ws",
            true,
            10000,
            {enableCrypto: false, enableOrders: false},
            (err) => console.log(err)
        ).init_promise;

        // build transfer operation
        let  tr = new TransactionBuilder();
        let transfer_op = tr.get_type_operation("transfer", {
            fee: {
                amount: 0,
                asset_id: "1.3.0"
            },
            from: app.BTS.getAccount().id,
            to: "1.2.886902",
            amount: {amount: 100, asset_id: "1.3.0"},
            memo: undefined
        });
        tr.add_operation(
            transfer_op
        );
        await tr.set_required_fees();
        await tr.update_head_block();
        tr.add_signer("inject_wif");
        await tr.broadcast();
    } catch (err) {
        console.error(err);
    }
};
init();
