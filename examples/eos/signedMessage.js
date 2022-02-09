import BeetESM from 'beet-esm';

beet.get("Direct Call: Signed Message", "EOS").then(beet => {
    beet.EOS.signMessage("This is a message to be signed!").then(res => {
        console.log(res);
    }).catch((err) => {
        console.error(err);
    });
}).catch((err) => {
    console.error(err);
});
