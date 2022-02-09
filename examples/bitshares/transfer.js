import BeetESM from 'beet-esm';

function triggerTransfer(targetAccount, amountInSatoshi, assetId) {
    BeetESM.get("BitShares Transfer Example", "BTS", true).then(app => {
        app.BTS.transfer(
            {
                to: targetAccount,
                amount:
                    {
                        satoshis: amountInSatoshi,
                        asset_id: assetId
                    }
            }
        ).then(result => {
            console.log("Success", result);
        }).catch(err => {
            console.error(err);
        });
    }).catch(err => {
        console.error(err);
    });
}

triggerTransfer('sschiessl', 1, '1.3.0')
