import beet from 'beet-esm';

beet.get("Binance Signature", "BNB").then(beet => {
    beet.BNB.signMessage("This is a message to be signed!").then(res => {
        console.log(res);
    }).catch((err) => {
        console.error(err);
    });
}).catch((err) => {
    console.error(err);
});
