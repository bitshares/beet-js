import beet from 'beet-esm';

beet.get("Bitcoin Signature", "Mozilla", "website.tld", "BTC").then(beet => {
    beet.BTC.signMessage("This is a message to be signed!").then(res => {
        console.log(res);
    }).catch((err) => {
        console.error(err);
    });
}).catch((err) => {
    console.error(err);
});
